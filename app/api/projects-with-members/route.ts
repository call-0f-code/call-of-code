// app/api/projects-with-members/route.ts
import { NextRequest, NextResponse } from "next/server";

interface Project {
  id: string;
  name: string;
  // Add other fields based on your API response
  [key: string]: unknown;
}

interface Member {
  // Define member fields if known, otherwise allow any properties
  [key: string]: unknown;
}

interface MemberData {
  members: Member[];
}

export async function GET(): Promise<NextResponse> {
  const apiUrl = process.env.API_BASE_URL;

  if (!apiUrl) {
    return NextResponse.json(
      { success: false, message: "API_BASE_URL not set" },
      { status: 500 }
    );
  }

  try {
    const projectsRes = await fetch(`${apiUrl}/projects`, { cache: "no-store" });
    const projects: Project[] = await projectsRes.json();

    if (!Array.isArray(projects)) {
      throw new Error("Projects API did not return an array");
    }

    const enrichedProjects = await Promise.all(
      projects.map(async (proj: Project) => {
        try {
          const membersRes = await fetch(
            `${apiUrl}/projects/${proj.id}/members`,
            { cache: "no-store" }
          );
          const membersData: MemberData = await membersRes.json();
          return { ...proj, members: membersData.members ?? [] };
        } catch {
          return { ...proj, members: [] };
        }
      })
    );

    return NextResponse.json({ success: true, data: enrichedProjects });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Something went wrong";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}
