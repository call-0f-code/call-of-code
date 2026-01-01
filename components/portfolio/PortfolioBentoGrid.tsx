// components/portfolio/PortfolioBentoGrid.tsx
"use client";

import { motion } from "framer-motion";
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
      className="grid grid-cols-1 lg:grid-cols-12 gap-6"
    >
      {/* Heatmaps - Full width on mobile, 8 cols on desktop */}
      <motion.div
        variants={itemVariants}
        className="lg:col-span-9 relative overflow-hidden rounded-2xl bg-zinc-900/50 backdrop-blur-xl border border-white/10 p-6 hover:border-purple-500/30 transition-all duration-300"
      >
        <HeatmapDeck
          githubData={platforms.github}
          leetcodeData={platforms.leetcode}
        />
      </motion.div>

      {/* Profile Summary - 4 cols on desktop */}
      <motion.div
        variants={itemVariants}
        className="lg:col-span-3 relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-white/10 p-8 hover:border-purple-500/50 transition-all duration-300 group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center space-y-6">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-purple-500/50 ring-4 ring-purple-500/20">
            <img
              src={member.profilePhoto}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              {member.name}
            </h3>
            {member.bio && (
              <p className="text-gray-400 text-sm leading-relaxed">{member.bio}</p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Platform Stats Cards - 3 cols each on desktop */}
      <motion.div variants={itemVariants} className="lg:col-span-3">
        <PlatformCard
          platform="leetcode"
          data={platforms.leetcode}
          icon="💻"
          color="from-yellow-500 to-orange-500"
        />
      </motion.div>

      <motion.div variants={itemVariants} className="lg:col-span-3">
        <PlatformCard
          platform="codeforces"
          data={platforms.codeforces}
          icon="⚔️"
          color="from-blue-500 to-cyan-500"
        />
      </motion.div>

      <motion.div variants={itemVariants} className="lg:col-span-3">
        <PlatformCard
          platform="codechef"
          data={platforms.codechef}
          icon="🍳"
          color="from-amber-500 to-orange-600"
        />
      </motion.div>

      <motion.div variants={itemVariants} className="lg:col-span-3">
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