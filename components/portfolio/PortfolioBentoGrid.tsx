// components/portfolio/PortfolioBentoGrid.tsx
"use client";

import { motion } from "framer-motion";
import HeatmapDeck from "./HeatmapDeck";
import PlatformCard from "./PlatformCard";
import { PlatformIcons } from "./PlatformIcons";
import Image from "next/image";

// --- Return Types ---
export interface GitHubData {
  totalContributions: number;
  contributions: {
    date: string;
    count: number;
  }[];
  pinnedRepos: {
    name: string;
    description: string;
    stargazerCount: number;
    forkCount: number;
    primaryLanguage: {
      name: string;
      color: string;
    };
    url: string;
  }[];
  totalRepos: number;
  totalStars: number;
}

export interface LeetCodeData {
  totalSolved: number;
  easy: number;
  medium: number;
  hard: number;
  ranking: number | null;
  calendar: {
    date: string;
    count: number;
  }[];
}

export interface CodeforcesData {
  rating: number | null;
  maxRating: number | null;
  totalSolved: number | null;
}

export interface CodeChefData {
  rating: number | null;
  highestRating: number | null;
  stars: number | null;
  totalSolved: number | null;
  globalRank: number | null;
  countryRank: number | null;
}

export interface GeeksForGeeksData {
  totalSolved: number | null;
  easy: number | null;
  medium: number | null;
  hard: number | null;
}

// FIX: Updated interface to allow 'null' for all platforms
interface PlatformData {
  github: GitHubData | null;
  leetcode: LeetCodeData | null;      // Added | null
  codeforces: CodeforcesData | null;  // Added | null
  codechef: CodeChefData | null;      // Added | null
  geeksforgeeks: GeeksForGeeksData | null; // Added | null
}

interface Member {
  name: string;
  profilePhoto: string;
  bio: string | null;
}

export default function PortfolioBentoGrid({
  platforms,
  member,
}: {
  platforms: PlatformData;
  member: Member;
}) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-6"
    >
      {/* Heatmaps - 9 cols (approx 75% width) */}
      <motion.div
        variants={itemVariants}
        className="lg:col-span-9 relative rounded-2xl bg-white dark:bg-zinc-900/50 backdrop-blur-xl border border-gray-200 dark:border-white/10 p-6 hover:border-purple-500/30 transition-all duration-300 shadow-sm dark:shadow-none"
      >
        <HeatmapDeck
          githubData={platforms.github}
          leetcodeData={platforms.leetcode}
        />
      </motion.div>

      {/* Profile Summary - 3 cols (approx 25% width) */}
      <motion.div
        variants={itemVariants}
        className="lg:col-span-3 relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-gray-200 dark:border-white/10 p-8 hover:border-purple-500/50 transition-all duration-300 group shadow-sm dark:shadow-none"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 dark:from-purple-500/5 to-pink-500/10 dark:to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center space-y-6">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-purple-500/50 ring-4 ring-purple-500/20 relative">
            <Image
              src={member.profilePhoto}
              alt={member.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-purple-600 dark:from-purple-400 to-pink-600 dark:to-pink-500 bg-clip-text text-transparent">
              {member.name}
            </h3>
            {member.bio && (
              <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">{member.bio}</p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Platform Stats Cards - 3 cols each */}
      <motion.div variants={itemVariants} className="lg:col-span-3">
        <PlatformCard
          platform="leetcode"
          data={platforms.leetcode}
          icon={<PlatformIcons.LeetCode />}
          color="from-yellow-500 to-orange-500"
        />
      </motion.div>

      <motion.div variants={itemVariants} className="lg:col-span-3">
        <PlatformCard
          platform="codeforces"
          data={platforms.codeforces}
          icon={<PlatformIcons.CodeForces />}
          color="from-blue-500 to-cyan-500"
        />
      </motion.div>

      <motion.div variants={itemVariants} className="lg:col-span-3 ">
        <PlatformCard
          platform="codechef"
          data={platforms.codechef}
          icon={<PlatformIcons.CodeChef />}
          color="from-amber-500 to-orange-600"
        />
      </motion.div>

      <motion.div variants={itemVariants} className="lg:col-span-3">
        <PlatformCard
          platform="geeksforgeeks"
          data={platforms.geeksforgeeks}
          icon={<PlatformIcons.GeeksForGeeks />}
          color="from-green-500 to-emerald-600"
        />
      </motion.div>
    </motion.div>
  );
}