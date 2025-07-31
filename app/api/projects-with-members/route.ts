import { NextResponse } from "next/server";

export const runtime = "edge";

interface MemberWrapper {
  member: {
    id: string;
    name: string;
    email: string;
    profilePhoto: string;
  };
}

interface Project {
  id: number;
  name: string;
  imageUrl: string;
  githubUrl: string | null;
  deployUrl: string | null;
  members: MemberWrapper[];
}

export async function GET() {
  const apiUrl = process.env.API_BASE_URL;

  if (!apiUrl) {
    return NextResponse.json(
      { success: false, message: "API_BASE_URL not set", data: [] },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(`${apiUrl}/projects`, {
      cache: "no-store",
      headers: { "Content-Type": "application/json" }
    });

    if (!res.ok) {
      console.error("❌ Backend fetch failed:", res.status);
      return NextResponse.json(
        { success: false, message: `Failed to fetch projects`, data: [] },
        { status: 500 }
      );
    }

    const projects: Project[] = await res.json();

    if (!Array.isArray(projects)) {
      console.error("❌ Expected an array but got:", typeof projects);
      return NextResponse.json(
        { success: false, message: "Invalid response format", data: [] },
        { status: 500 }
      );
    }

    const enriched = projects.map((proj) => ({
      id: proj.id,
      name: proj.name,
      imageUrl: proj.imageUrl,
      githubUrl: proj.githubUrl,
      deployUrl: proj.deployUrl,
      members: (proj.members || []).map((m, idx) => ({
  id: `${proj.id}-${m.member.id || idx}`,  // always unique
  name: m.member.name,
  image: m.member.profilePhoto || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(m.member.name)}`
}))

    }));

    return NextResponse.json({ success: true, data: enriched });
  } catch (err) {
    console.error("❌ Unexpected error:", err);
    return NextResponse.json(
      { success: false, message: "Unexpected error", data: [] },
      { status: 500 }
    );
  }
}
