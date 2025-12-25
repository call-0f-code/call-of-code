// components/portfolio/HeatmapDeck.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {ActivityCalendar} from "react-activity-calendar";

export default function HeatmapDeck({
  githubData,
  leetcodeData,
}: {
  githubData: any;
  leetcodeData: any;
}) {
  const [activeView, setActiveView] = useState<"github" | "leetcode">("github");

  // Normalize GitHub data
  const githubContributions = githubData?.contributions || [];
  
  // Normalize LeetCode data
  const leetcodeContributions = leetcodeData?.calendar || [];

  // Group LeetCode contributions by date
  const leetcodeGrouped = leetcodeContributions.reduce((acc: any, item: any) => {
    acc[item.date] = (acc[item.date] || 0) + item.count;
    return acc;
  }, {});

  const leetcodeNormalized = Object.entries(leetcodeGrouped).map(([date, count]) => ({
    date,
    count: count as number,
    level: Math.min(Math.floor((count as number) / 2), 4),
  }));

  const hasGithub = githubData && githubContributions.length > 0;
  const hasLeetcode = leetcodeData && leetcodeNormalized.length > 0;

  if (!hasGithub && !hasLeetcode) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        No activity data available
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Toggle Buttons */}
      <div className="flex gap-2 mb-6">
        {hasGithub && (
          <button
            onClick={() => setActiveView("github")}
            className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
              activeView === "github"
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            }`}
          >
            GitHub
          </button>
        )}
        {hasLeetcode && (
          <button
            onClick={() => setActiveView("leetcode")}
            className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
              activeView === "leetcode"
                ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            }`}
          >
            LeetCode
          </button>
        )}
      </div>

      {/* Heatmap Display */}
      <AnimatePresence mode="wait">
        {activeView === "github" && hasGithub && (
          <motion.div
            key="github"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col"
          >
            <div className="mb-4">
              <p className="text-2xl font-bold">
                {githubData.totalContributions}
                <span className="text-sm text-gray-400 ml-2">
                  contributions this year
                </span>
              </p>
            </div>
            <div className="overflow-x-auto">
              <ActivityCalendar
                data={githubContributions.map((d: any) => ({
                  date: d.date,
                  count: d.count,
                  level: Math.min(Math.floor(d.count / 3), 4),
                }))}
                theme={{
                  light: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
                  dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
                }}
                colorScheme="dark"
                blockSize={12}
                blockMargin={4}
                fontSize={12}
              />
            </div>
          </motion.div>
        )}

        {activeView === "leetcode" && hasLeetcode && (
          <motion.div
            key="leetcode"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col"
          >
            <div className="mb-4">
              <p className="text-2xl font-bold">
                {leetcodeData.totalSolved}
                <span className="text-sm text-gray-400 ml-2">
                  problems solved
                </span>
              </p>
            </div>
            <div className="overflow-x-auto">
              <ActivityCalendar
                data={leetcodeNormalized}
                theme={{
                  light: ["#161b22", "#fbbf24", "#f59e0b", "#f97316", "#ea580c"],
                  dark: ["#161b22", "#fbbf24", "#f59e0b", "#f97316", "#ea580c"],
                }}
                colorScheme="dark"
                blockSize={12}
                blockMargin={4}
                fontSize={12}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}