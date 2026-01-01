// components/portfolio/PlatformCard.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

interface PlatformCardProps {
  platform: string;
  data: any;
  icon: React.ReactNode;
  color: string;
}

export default function PlatformCard({
  platform,
  data,
  icon,
  color,
}: PlatformCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  if (!data) {
    return (
      <div className="relative h-full min-h-[280px] rounded-2xl bg-zinc-900/30 backdrop-blur-xl border border-white/5 p-8 flex items-center justify-center">
        <div className="text-center text-gray-600">
          <AlertCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p className="text-sm font-medium">Data Unavailable</p>
          <p className="text-xs text-gray-700 mt-1">Check platform profile</p>
        </div>
      </div>
    );
  }

  const getPrimaryMetric = () => {
    switch (platform) {
      case "leetcode":
        return { label: "Problems Solved", value: data.totalSolved || 0 };
      case "codeforces":
        return { label: "Rating", value: data.rating || data.maxRating || "N/A" };
      case "codechef":
        return { label: "Rating", value: data.rating || "N/A" };
      case "geeksforgeeks":
        return { label: "Problems Solved", value: data.totalSolved || 0 };
      default:
        return { label: "Score", value: "N/A" };
    }
  };

  const getBreakdown = () => {
    switch (platform) {
      case "leetcode":
        return [
          { label: "Easy", value: data.easy || 0, color: "text-green-400" },
          { label: "Medium", value: data.medium || 0, color: "text-yellow-400" },
          { label: "Hard", value: data.hard || 0, color: "text-red-400" },
        ];
      case "codeforces":
        return [
          { label: "Current", value: data.rating || "N/A", color: "text-blue-400" },
          { label: "Max", value: data.maxRating || "N/A", color: "text-purple-400" },
          { label: "Solved", value: data.totalSolved || 0, color: "text-green-400" },
        ];
      case "codechef":
        return [
          { label: "Current", value: data.rating || "N/A", color: "text-orange-400" },
          { label: "Highest", value: data.highestRating || "N/A", color: "text-amber-400" },
          { label: "Stars", value: data.stars ? "⭐".repeat(data.stars) : "N/A", color: "text-yellow-400" },
        ];
      case "geeksforgeeks":
        return [
          { label: "Easy", value: data.easy || 0, color: "text-green-400" },
          { label: "Medium", value: data.medium || 0, color: "text-yellow-400" },
          { label: "Hard", value: data.hard || 0, color: "text-red-400" },
        ];
      default:
        return [];
    }
  };

  const metric = getPrimaryMetric();
  const breakdown = getBreakdown();

  return (
    <div
      className="relative h-full min-h-[280px] perspective-1000 cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-2xl bg-zinc-900/50 backdrop-blur-xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-5`} />
          
          <div className="relative z-10 p-8 flex flex-col justify-between h-full">
            <div className="flex items-start justify-between">
              <div className={`text-6xl bg-gradient-to-br ${color} bg-clip-text text-transparent`}>
                {icon}
              </div>
              <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${color} opacity-50 text-xs font-bold uppercase tracking-wider`}>
                {platform}
              </div>
            </div>

            <div className="space-y-3">
              <div className={`text-5xl font-black bg-gradient-to-br ${color} bg-clip-text text-transparent`}>
                {metric.value}
              </div>
              <div className="text-sm text-gray-400 font-medium uppercase tracking-wider">
                {metric.label}
              </div>
            </div>
          </div>

          {breakdown.length > 0 && (
            <div className="absolute bottom-4 right-4 text-xs text-gray-600 flex items-center gap-1">
              <span>Hover for details</span>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          )}
        </div>

        {/* Back */}
        {breakdown.length > 0 && (
          <div
            className="absolute inset-0 rounded-2xl bg-zinc-900/50 backdrop-blur-xl border border-white/10 overflow-hidden"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-10`} />
            
            <div className="relative z-10 p-8 flex flex-col justify-center h-full">
              <h3 className={`text-sm font-bold uppercase tracking-wider mb-6 bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
                Breakdown
              </h3>
              <div className="space-y-4">
                {breakdown.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center group">
                    <span className={`text-sm font-medium ${item.color} group-hover:scale-105 transition-transform`}>
                      {item.label}
                    </span>
                    <span className="text-2xl font-bold text-white group-hover:scale-110 transition-transform">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}