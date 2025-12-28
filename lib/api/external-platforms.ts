// lib/api/external-platforms.ts

// GitHub GraphQL API
export async function fetchGitHubData(username: string) {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  
  const query = `
    query($username: String!) {
      user(login: $username) {
        name
        bio
        avatarUrl
        repositories(first: 100, ownerAffiliations: OWNER, orderBy: {field: STARGAZERS, direction: DESC}) {
          totalCount
          nodes {
            name
            description
            stargazerCount
            forkCount
            primaryLanguage {
              name
              color
            }
            url
          }
        }
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name
              description
              stargazerCount
              forkCount
              primaryLanguage {
                name
                color
              }
              url
            }
          }
        }
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables: { username } }),
      next: { revalidate: 3600 },
    });

    if (!response.ok) return null;

    const data = await response.json();
    const user = data.data?.user;

    if (!user) return null;

    // Normalize contribution calendar
    const calendar = user.contributionsCollection.contributionCalendar;
    const contributions = calendar.weeks.flatMap((week: any) =>
      week.contributionDays.map((day: any) => ({
        date: day.date,
        count: day.contributionCount,
      }))
    );

    return {
      totalContributions: calendar.totalContributions,
      contributions,
      pinnedRepos: user.pinnedItems.nodes,
      totalRepos: user.repositories.totalCount,
      totalStars: user.repositories.nodes.reduce(
        (sum: number, repo: any) => sum + repo.stargazerCount,
        0
      ),
    };
  } catch (error) {
    console.error("GitHub API Error:", error);
    return null;
  }
}

// LeetCode API (using unofficial GraphQL)
export async function fetchLeetCodeData(username: string) {
  const query = `
    query($username: String!) {
      matchedUser(username: $username) {
        username
        submitStats: submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
        }
        profile {
          ranking
        }
      }
      recentSubmissionList(username: $username, limit: 100) {
        timestamp
      }
    }
  `;

  try {
    // Use alfa-leetcode-api proxy to avoid SSL issues
    const response = await fetch(`https://alfa-leetcode-api.onrender.com/${username}/solved`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0",
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) return null;

    const data = await response.json();

    // The proxy returns a different format
    const totalSolved = data.solvedProblem || 0;
    const easy = data.easySolved || 0;
    const medium = data.mediumSolved || 0;
    const hard = data.hardSolved || 0;

    // Try to get calendar data from submission calendar endpoint
    let calendar: any[] = [];
    try {
      const calendarResponse = await fetch(
        `https://alfa-leetcode-api.onrender.com/${username}/calendar`,
        { next: { revalidate: 3600 } }
      );
      if (calendarResponse.ok) {
        const calendarData = await calendarResponse.json();
        
        // The submissionCalendar is a stringified JSON, need to parse it
        let submissionCalendar: Record<string, number> = {};
        
        if (typeof calendarData.submissionCalendar === 'string') {
          try {
            submissionCalendar = JSON.parse(calendarData.submissionCalendar);
          } catch {
            submissionCalendar = {};
          }
        } else if (typeof calendarData.submissionCalendar === 'object') {
          submissionCalendar = calendarData.submissionCalendar;
        }
        
        // Convert submission calendar object to array of date objects
        if (submissionCalendar && Object.keys(submissionCalendar).length > 0) {
          calendar = Object.entries(submissionCalendar).map(
            ([timestamp, count]) => ({
              date: new Date(parseInt(timestamp) * 1000)
                .toISOString()
                .split("T")[0],
              count: typeof count === 'number' ? count : parseInt(String(count)),
            })
          );
        }
      }
    } catch (err) {
      console.error("LeetCode calendar fetch error:", err);
    }

    return {
      totalSolved,
      easy,
      medium,
      hard,
      ranking: data.ranking || null,
      calendar,
    };
  } catch (error) {
    console.error("LeetCode API Error:", error);
    return null;
  }
}

// Codeforces API
export async function fetchCodeforcesData(username: string) {
  try {
    const [userInfoRes, statusRes] = await Promise.allSettled([
      fetch(`https://codeforces.com/api/user.info?handles=${username}`, {
        next: { revalidate: 3600 },
      }),
      fetch(`https://codeforces.com/api/user.status?handle=${username}&from=1&count=10000`, {
        next: { revalidate: 3600 },
      }),
    ]);

    let rating = null;
    let maxRating = null;

    if (userInfoRes.status === "fulfilled" && userInfoRes.value.ok) {
      const userData = await userInfoRes.value.json();
      const user = userData.result?.[0];
      rating = user?.rating || null;
      maxRating = user?.maxRating || null;
    }

    let totalSolved = 0;

    if (statusRes.status === "fulfilled" && statusRes.value.ok) {
      const statusData = await statusRes.value.json();
      const submissions = statusData.result || [];
      
      // Count unique solved problems
      const solvedProblems = new Set();
      submissions.forEach((submission: any) => {
        if (submission.verdict === "OK") {
          const problemKey = `${submission.problem.contestId}-${submission.problem.index}`;
          solvedProblems.add(problemKey);
        }
      });
      
      totalSolved = solvedProblems.size;
    }

    return {
      rating,
      maxRating,
      totalSolved,
    };
  } catch (error) {
    console.error("Codeforces API Error:", error);
    return null;
  }
}

// CodeChef Scraper
export async function fetchCodeChefData(username: string) {
  try {
    const response = await fetch(`https://www.codechef.com/users/${username}`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) return null;

    const html = await response.text();

    // Extract total problems solved
    const problemsMatch = html.match(/<h3>Total Problems Solved:\s*(\d+)<\/h3>/);
    const totalSolved = problemsMatch ? parseInt(problemsMatch[1]) : null;

    // Extract rating
    const ratingMatch = html.match(/<div class="rating-number">(\d+)<\/div>/);
    const rating = ratingMatch ? parseInt(ratingMatch[1]) : null;

    // Extract highest rating
    const highestMatch = html.match(/Highest Rating\s+(\d+)/);
    const highestRating = highestMatch ? parseInt(highestMatch[1]) : null;

    // Extract stars (count the star symbols)
    const starsMatch = html.match(/rating-star[^>]*>([\s\S]*?)<\/div>/);
    const stars = starsMatch
      ? (starsMatch[1].match(/★|&#9733;/g) || []).length
      : null;

    // Extract global rank
    const globalRankMatch = html.match(
      /<a href="\/ratings\/all"><strong>(\d+)<\/strong><\/a>\s*Global Rank/
    );
    const globalRank = globalRankMatch ? parseInt(globalRankMatch[1]) : null;

    // Extract country rank
    const countryRankMatch = html.match(
      /<a href="[^"]*Country[^"]*"><strong>(\d+)<\/strong><\/a>\s*Country Rank/
    );
    const countryRank = countryRankMatch ? parseInt(countryRankMatch[1]) : null;

    return {
      rating,
      highestRating,
      stars,
      totalSolved,
      globalRank,
      countryRank,
    };
  } catch (error) {
    console.error("CodeChef Scraper Error:", error);
    return null;
  }
}

// GeeksforGeeks Scraper (simplified - you may need to enhance)
export async function fetchGeeksforGeeksData(username: string) {
  try {
    // Note: GFG doesn't have an official API, would need web scraping
    // This is a placeholder - implement actual scraping logic or use a proxy service
    return {
      codingScore: null,
      totalSolved: null,
    };
  } catch (error) {
    console.error("GeeksforGeeks API Error:", error);
    return null;
  }
}