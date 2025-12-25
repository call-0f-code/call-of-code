// components/portfolio/PortfolioSkeleton.tsx
"use client";

export default function PortfolioSkeleton() {
  return (
    <div className="min-h-screen bg-[#050505] p-4">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Hero Skeleton */}
        <div className="flex flex-col items-center justify-center min-h-screen space-y-8 animate-pulse">
          <div className="w-48 h-48 rounded-full bg-white/10" />
          <div className="h-12 w-96 bg-white/10 rounded-lg" />
          <div className="h-6 w-64 bg-white/10 rounded-lg" />
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-white/10" />
            <div className="w-12 h-12 rounded-full bg-white/10" />
            <div className="w-12 h-12 rounded-full bg-white/10" />
          </div>
        </div>

        {/* Bento Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[280px] animate-pulse">
          <div className="md:col-span-2 md:row-span-2 rounded-2xl bg-white/10" />
          <div className="md:col-span-2 rounded-2xl bg-white/10" />
          <div className="rounded-2xl bg-white/10" />
          <div className="rounded-2xl bg-white/10" />
          <div className="rounded-2xl bg-white/10" />
          <div className="rounded-2xl bg-white/10" />
        </div>

        {/* Projects Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
          <div className="h-[400px] rounded-2xl bg-white/10" />
          <div className="h-[400px] rounded-2xl bg-white/10" />
          <div className="h-[400px] rounded-2xl bg-white/10" />
        </div>
      </div>
    </div>
  );
}