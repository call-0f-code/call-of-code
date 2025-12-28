// components/portfolio/PlatformCard.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

interface PlatformCardProps {
  platform: string;
  data: any;
  icon: string;
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
      <div className="relative h-full rounded-2xl bg-zinc-900/30 backdrop-blur-xl border border-white/5 p-6 flex items-center justify-center">
        <div className="text-center text-gray-600">
          <AlertCircle className="w-8 h-8 mx-auto mb-2" />
          <p className="text-sm">Data Unavailable</p>
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
          { label: "Easy", value: data.easy || 0, color: "text-green-500" },
          { label: "Medium", value: data.medium || 0, color: "text-yellow-500" },
          { label: "Hard", value: data.hard || 0, color: "text-red-500" },
        ];
      case "codeforces":
        return [
          { label: "Current", value: data.rating || "N/A", color: "text-blue-500" },
          { label: "Max", value: data.maxRating || "N/A", color: "text-purple-500" },
          { label: "Solved", value: data.totalSolved || 0, color: "text-green-500" },
        ];
      case "codechef":
        return [
          { label: "Current", value: data.rating || "N/A", color: "text-orange-500" },
          { label: "Highest", value: data.highestRating || "N/A", color: "text-amber-500" },
          { label: "Stars", value: data.stars ? "⭐".repeat(data.stars) : "N/A", color: "text-yellow-500" },
        ];
      case "geeksforgeeks":
        return [
          { label: "Easy", value: data.easy || 0, color: "text-green-500" },
          { label: "Medium", value: data.medium || 0, color: "text-yellow-500" },
          { label: "Hard", value: data.hard || 0, color: "text-red-500" },
        ];
      default:
        return [];
    }
  };

  const metric = getPrimaryMetric();
  const breakdown = getBreakdown();

  return (
    <div
      className="relative h-full perspective-1000"
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
          className="absolute inset-0 rounded-2xl bg-zinc-900/50 backdrop-blur-xl border border-white/10 p-6 hover:border-purple-500/50 transition-all duration-300 flex flex-col justify-between"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div>
            <div className={`text-5xl mb-3 bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
              {icon}
            </div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
              {platform}
            </h3>
          </div>

          <div>
            <p className="text-4xl font-bold mb-1">
              {metric.value}
            </p>
            <p className="text-xs text-gray-500">{metric.label}</p>
          </div>

          {breakdown.length > 0 && (
            <div className="absolute bottom-2 right-2 text-xs text-gray-600">
              Hover for details
            </div>
          )}
        </div>

        {/* Back */}
        {breakdown.length > 0 && (
          <div
            className="absolute inset-0 rounded-2xl bg-zinc-900/50 backdrop-blur-xl border border-white/10 p-6 flex flex-col justify-center gap-4"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Breakdown
            </h3>
            {breakdown.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <span className={`text-sm ${item.color}`}>{item.label}</span>
                <span className="text-xl font-bold">{item.value}</span>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}