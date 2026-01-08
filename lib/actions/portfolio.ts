// lib/actions/portfolio.ts
"use server";

import {
  fetchGitHubData,
  fetchLeetCodeData,
  fetchCodeforcesData,
  fetchCodeChefData,
  fetchGeeksforGeeksData,
} from "@/lib/api/external-platforms";

const API_URL = process.env.API_BASE_URL || "https://your-api-url.com";

interface Member {
  id: string;
  name: string;
  email: string;
  bio: string | null;
  profilePhoto: string;
  github: string | null;
  linkedin: string | null;
  twitter: string | null;
  geeksforgeeks: string | null;
  leetcode: string | null;
  codechef: string | null;
  codeforces: string | null;
  passoutYear: string;
  isApproved: boolean;
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  achievedAt: string;
  imageUrl: string | null;
}

interface Project {
  id: number;
  name: string;
  imageUrl: string | null;
  githubUrl: string | null;
  deployUrl: string | null;
}

export async function getMemberPortfolioData(memberId: string) {
  // Fetch core member data (critical path)
  const memberResponse = await fetch(`${API_URL}/api/v1/members/${memberId}`, {
    next: { revalidate: 3600 },
  });

  if (!memberResponse.ok) {
    throw new Error("Member not found");
  }

  const memberData = await memberResponse.json();
  const member: Member = memberData.user;
  if(member.profilePhoto == null || member.profilePhoto==""){
    member.profilePhoto = "/fallback.jpg"
  }

  // Parallel fetch for achievements and projects
  const [achievementsRes, projectsRes] = await Promise.allSettled([
    fetch(`${API_URL}/api/v1/members/${memberId}/achievements`, {
      next: { revalidate: 3600 },
    }),
    fetch(`${API_URL}/api/v1/members/${memberId}/projects`, {
      next: { revalidate: 3600 },
    }),
  ]);

  const achievements: Achievement[] =
    achievementsRes.status === "fulfilled" && achievementsRes.value.ok
      ? (await achievementsRes.value.json()).achievements || []
      : [];

  const projects: Project[] =
    projectsRes.status === "fulfilled" && projectsRes.value.ok
      ? (await projectsRes.value.json()).projects || []
      : [];

  // Extract handles and fetch external platform data
  const handles = extractHandles(member);

  // Fetch platform data concurrently with error handling
  const platformResults = await Promise.allSettled([
    handles.github ? fetchGitHubData(handles.github) : Promise.resolve(null),
    handles.leetcode ? fetchLeetCodeData(handles.leetcode) : Promise.resolve(null),
    handles.codeforces ? fetchCodeforcesData(handles.codeforces) : Promise.resolve(null),
    handles.codechef ? fetchCodeChefData(handles.codechef) : Promise.resolve(null),
    handles.geeksforgeeks ? fetchGeeksforGeeksData(handles.geeksforgeeks) : Promise.resolve(null),
  ]);

  const platforms = {
    github: platformResults[0].status === "fulfilled" ? platformResults[0].value : null,
    leetcode: platformResults[1].status === "fulfilled" ? platformResults[1].value : null,
    codeforces: platformResults[2].status === "fulfilled" ? platformResults[2].value : null,
    codechef: platformResults[3].status === "fulfilled" ? platformResults[3].value : null,
    geeksforgeeks: platformResults[4].status === "fulfilled" ? platformResults[4].value : null,
  };

  return {
    member,
    platforms,
    achievements,
    projects,
  };
}


// Platform-specific handle extractors for more reliability
function extractHandles(member: Member) {
  return {
    github: (() => {
      // Handles: github.com/username or www.github.com/username
      const match = member.github?.match(/github\.com\/([^/?]+)/);
      return match ? match[1] : null;
    })(),
    
    leetcode: (() => {
      // Handles: leetcode.com/u/username/ or leetcode.com/username
      const match = member.leetcode?.match(/leetcode\.com\/(?:u\/)?([^/?]+)/);
      return match ? match[1] : null;
    })(),
    
    codeforces: (() => {
      // Handles: codeforces.com/profile/username
      const match = member.codeforces?.match(/codeforces\.com\/profile\/([^/?]+)/);
      return match ? match[1] : null;
    })(),
    
    codechef: (() => {
      // Handles: codechef.com/users/username or www.codechef.com/users/username
      const match = member.codechef?.match(/codechef\.com\/users\/([^/?]+)/);
      return match ? match[1] : null;
    })(),
    
    geeksforgeeks: (() => {
      // Handles multiple formats:
      // - geeksforgeeks.org/user/username
      // - auth.geeksforgeeks.org/user/username
      // - geeksforgeeks.org/profile/username
      const match = member.geeksforgeeks?.match(/geeksforgeeks\.org\/(?:user|profile)\/([^/?]+)/) ||
                    member.geeksforgeeks?.match(/auth\.geeksforgeeks\.org\/user\/([^/?]+)/);
      return match ? match[1] : null;
    })(),
  };
}