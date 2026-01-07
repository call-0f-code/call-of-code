// app/members/[id]/loading.tsx
import PortfolioSkeleton from "@/components/portfolio/PortfolioSkeleton";
import ParticleBackground from "@/components/portfolio/ParticleBackground";

export default function Loading() {
  return (
    <div className="relative min-h-screen bg-[#050505]">
      <ParticleBackground />
      <div className="relative z-10">
        <PortfolioSkeleton />
      </div>
    </div>
  );
}