// app/members/[id]/page.tsx
import { notFound } from "next/navigation";
import { Suspense } from "react";
import PortfolioHero from "@/components/portfolio/PortfolioHero";
import PortfolioBentoGrid from "@/components/portfolio/PortfolioBentoGrid";
import PortfolioProjects from "@/components/portfolio/PortfolioProjects";
import PortfolioTimeline from "@/components/portfolio/PortfolioTimeline";
import ParticleBackground from "@/components/portfolio/ParticleBackground";
import PortfolioSkeleton from "@/components/portfolio/PortfolioSkeleton";
import { getMemberPortfolioData } from "@/lib/actions/portfolio";
import { Member } from "@/components/Members-Text";
export const revalidate = 3600; // 1 hour cache

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  try {
    const resolvedParams = await params;
    const data = await getMemberPortfolioData(resolvedParams.id);
    return {
      title: `${data.member.name} - Call of Code`,
      description: data.member.bio || `Portfolio of ${data.member.name}`,
      openGraph: {
        images: [data.member.profilePhoto],
      },
    };
  } catch {
    return {
      title: "Member Not Found - Call of Code",
    };
  }
}
export async function generateStaticParams() {
  // Fetch all member IDs at build time
  try {
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/members`);
    if (!res.ok) {
      throw new Error("Failed to fetch member IDs: " + res.statusText);
    }
    const members = await res.json();
    const data = members.data || [];
    return data.map((member: Member) => ({
      id: member.id.toString(),
    }));
  } catch (error) {
    console.error("Error fetching member IDs:", error);
    return []; // Return empty array on error
  }
}
export default async function MemberPortfolioPage({ params }: PageProps) {
  let portfolioData;
  
  try {
    const resolvedParams = await params;
    portfolioData = await getMemberPortfolioData(resolvedParams.id);
  } catch (error) {
    console.error("Error fetching portfolio data:", error);
    notFound();
  }

  const { member, platforms, achievements, projects } = portfolioData;
  const githubRepos = platforms.github?.pinnedRepos || [];
  const hasProjects = projects.length > 0 || githubRepos.length > 0;

  return (
    <div className="relative min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <ParticleBackground />
      
      <div className="relative z-10">
        <Suspense fallback={<PortfolioSkeleton />}>
          {/* Hero Section */}
          <section id="hero" className="min-h-screen flex items-center justify-center px-4 py-20">
            <PortfolioHero member={member} />
          </section>

          {/* Stats Section */}
          <section id="stats" className="min-h-screen px-4 py-20">
            <div className="container mx-auto max-w-7xl">
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent pb-1">
                Coding Statistics
              </h2>
              <PortfolioBentoGrid platforms={platforms} member={member} />
            </div>
          </section>

          {/* Projects Section */}
          {hasProjects && (
            <section id="projects" className="min-h-screen px-4 py-20">
              <div className="container mx-auto max-w-7xl">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent pb-1">
                  Projects
                </h2>
                <PortfolioProjects projects={projects} githubRepos={githubRepos} />
              </div>
            </section>
          )}

          {/* Achievements Section */}
          {achievements.length > 0 && (
            <section id="timeline" className="min-h-screen px-4 py-20">
              <div className="container mx-auto max-w-7xl">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                  Achievements
                </h2>
                <PortfolioTimeline achievements={achievements} />
              </div>
            </section>
          )}
        </Suspense>
      </div>

    </div>
  );
}