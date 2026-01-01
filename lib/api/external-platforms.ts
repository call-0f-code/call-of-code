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
        userCalendar {
          submissionCalendar
        }
      }
    }
  `;

  try {
    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        // Adding a User-Agent is often necessary for LeetCode's direct API
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
      },
      body: JSON.stringify({ query, variables: { username } }),
      next: { revalidate: 3600 },
    });

    if (!response.ok) return null;

    const data = await response.json();
    const user = data.data?.matchedUser;

    if (!user) return null;

    // Parse submission stats
    const stats = user.submitStats.acSubmissionNum.reduce(
      (acc: any, item: any) => {
        acc[item.difficulty.toLowerCase()] = item.count;
        return acc;
      },
      {}
    );

    // --- New Calendar Logic ---
    let calendar: { date: string; count: number }[] = [];
    
    if (user.userCalendar?.submissionCalendar) {
      try {
        // LeetCode returns submissionCalendar as a stringified JSON: "{\"1704067200\": 5, ...}"
        const submissionMap = JSON.parse(user.userCalendar.submissionCalendar);
        
        // Convert the map { timestamp: count } to your array format
        calendar = Object.entries(submissionMap).map(([timestamp, count]) => ({
          // Convert unix timestamp (seconds) to YYYY-MM-DD
          date: new Date(parseInt(timestamp) * 1000).toISOString().split("T")[0],
          count: Number(count),
        }));
      } catch (e) {
        console.error("Failed to parse LeetCode calendar JSON", e);
      }
    }

    return {
      totalSolved: stats.all || 0,
      easy: stats.easy || 0,
      medium: stats.medium || 0,
      hard: stats.hard || 0,
      ranking: user.profile?.ranking || null,
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
export async function fetchGeeksforGeeksData(userName: string) {
console.log("Fetching GFG data via API...");

    try {
        const response = await fetch("https://practiceapi.geeksforgeeks.org/api/v1/user/problems/submissions/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // The Referer is often required for these internal APIs to verify the origin
                "Referer": "https://www.geeksforgeeks.org/",
            },
            body: JSON.stringify({
                handle: userName,
                requestType: "",
                year: "",
                month: ""
            }),
            next: { revalidate: 3600 }
        });

        if (!response.ok) {
            throw new Error(`GFG API failed: ${response.status}`);
        }

        const data = await response.json();
        
        // The API returns distinct objects for difficulty levels in data.result
        // Example: data.result.Medium = { "id": { pname: "..." }, ... }
        const result = data.result || {};

        // Helper to extract difficulty counts from a specific difficulty object
        const extractProblemCount = (difficultyKey: string) : number => {
            const difficultyObj = result[difficultyKey];
            if (!difficultyObj) return 0;
            
            // Map the values of the object to get the problem names
            return Object.keys(difficultyObj).length
        };

        const easy = extractProblemCount("Easy");
        const medium = extractProblemCount("Medium");
        const hard = extractProblemCount("Hard");
        

        // Calculate total manually or use the count provided by API
        const totalSolved = data.count || (easy + medium + hard);

        console.log("Fetched GFG data");

        return {
            overallScore: "N/A", // This API does not provide the coding score
            totalSolved: totalSolved.toString(),
            easy,
            medium,
            hard,
        };

    } catch (error) {
        console.error("Error fetching GFG API:", error);
        return {
            overallScore: null,
            totalSolved: null,
            easy: null,
            medium: null,
            hard: null,
        };
    }
}
