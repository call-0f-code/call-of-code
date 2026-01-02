// components/portfolio/HeatmapDeck.tsx
"use client";

import { motion } from "framer-motion";
import { ActivityCalendar } from "react-activity-calendar";
import { useContainerWidth } from "@/app/hooks/useContainerWidth";

interface ContributionData {
  date: string;
  count: number;
}
interface GitHubData {
  contributions: ContributionData[];
  totalContributions: number;
}
interface LeetCodeData {
  calendar: ContributionData[];
  totalSolved: number;
}

export default function HeatmapDeck({
  githubData,
  leetcodeData,
}: {
  githubData: GitHubData | null;
  leetcodeData: LeetCodeData | null;
}) {

  const github = useContainerWidth();
  const leetcode = useContainerWidth();


  const WEEKS = 53;
  const BLOCK_MARGIN = 3;

  const getBlockSize = (width: number) =>
  width
    ? Math.max(6, Math.floor((width - WEEKS * BLOCK_MARGIN) / WEEKS))
    : 12;

  // Normalize GitHub data
  const githubContributions = githubData?.contributions || [];
  
  // Normalize LeetCode data
  const leetcodeCalendar = leetcodeData?.calendar || [];

  const leetcodeGrouped = leetcodeCalendar.reduce((acc: Record<string, number>, item: ContributionData) => {
    if (item.date && item.count) {
      acc[item.date] = (acc[item.date] || 0) + item.count;
    }
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
    <div className="space-y-8">
      {/* GitHub Heatmap */}
      {hasGithub && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">GitHub Activity</h3>
                <p className="text-sm text-gray-400">
                  {githubData.totalContributions} contributions this year
                </p>
              </div>
            </div>
          </div>
          
          {/* FIX APPLIED HERE */}
          <div ref={github.ref} className="w-full mx-auto">
            <ActivityCalendar
              data={githubContributions.map((d: ContributionData) => ({
                date: d.date,
                count: d.count,
                level: Math.min(Math.floor(d.count / 3), 4),
              }))}
              theme={{
                light: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
                dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
              }}
              colorScheme="dark"
              blockSize={getBlockSize(github.width)}
              blockMargin={BLOCK_MARGIN}
              style={{
                maxWidth: 'fit-content',
                margin: '0 auto' 
              }}
            />
          </div>
        </motion.div>
      )}

      {/* LeetCode Heatmap */}
      {hasLeetcode && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center text-white font-bold text-lg">
                LC
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">LeetCode Activity</h3>
                <p className="text-sm text-gray-400">
                  {leetcodeData.totalSolved} problems solved
                </p>
              </div>
            </div>
          </div>

          {/* FIX APPLIED HERE */}
          <div ref={leetcode.ref} className="w-full mx-auto">
            <ActivityCalendar
              data={leetcodeNormalized}
              theme={{
                light: ["#161b22", "#fbbf24", "#f59e0b", "#f97316", "#ea580c"],
                dark: ["#161b22", "#fbbf24", "#f59e0b", "#f97316", "#ea580c"],
              }}
              colorScheme="dark"
              blockSize={getBlockSize(leetcode.width)}
              blockMargin={BLOCK_MARGIN}
              fontSize={12}
              style={{
                maxWidth: 'fit-content',
                margin: '0 auto' 
              }}
    
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}