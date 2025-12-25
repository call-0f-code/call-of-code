// components/portfolio/PortfolioBentoGrid.tsx
"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import HeatmapDeck from "./HeatmapDeck";
import PlatformCard from "./PlatformCard";

interface PlatformData {
  github: any;
  leetcode: any;
  codeforces: any;
  codechef: any;
  geeksforgeeks: any;
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
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[280px]"
    >
      {/* Hero Cell - 2x2 */}
      <motion.div
        variants={itemVariants}
        className="md:col-span-2 md:row-span-2 relative overflow-hidden rounded-2xl bg-zinc-900/50 backdrop-blur-xl border border-white/10 p-8 hover:border-purple-500/50 transition-all duration-300 group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-purple-500/50">
            <img
              src={member.profilePhoto}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-3xl font-bold mb-3">{member.name}</h3>
          {member.bio && <p className="text-gray-400 text-lg">{member.bio}</p>}
        </div>
      </motion.div>

      {/* Heatmap Deck - 2x1 */}
      <motion.div
        variants={itemVariants}
        className="md:col-span-2 lg:col-span-2 relative overflow-hidden rounded-2xl bg-zinc-900/50 backdrop-blur-xl border border-white/10 p-6 hover:border-purple-500/50 transition-all duration-300"
      >
        <HeatmapDeck
          githubData={platforms.github}
          leetcodeData={platforms.leetcode}
        />
      </motion.div>

      {/* Platform Cards - 1x1 each */}
      <motion.div variants={itemVariants}>
        <PlatformCard
          platform="leetcode"
          data={platforms.leetcode}
          icon="💻"
          color="from-yellow-500 to-orange-500"
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <PlatformCard
          platform="codeforces"
          data={platforms.codeforces}
          icon="⚔️"
          color="from-blue-500 to-cyan-500"
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <PlatformCard
          platform="codechef"
          data={platforms.codechef}
          icon="🍳"
          color="from-amber-500 to-orange-600"
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <PlatformCard
          platform="geeksforgeeks"
          data={platforms.geeksforgeeks}
          icon="🎓"
          color="from-green-500 to-emerald-600"
        />
      </motion.div>
    </motion.div>
  );
}