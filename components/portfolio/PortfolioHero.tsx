// components/portfolio/PortfolioHero.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Github, Linkedin, Twitter } from "lucide-react";
import { siLeetcode, siCodechef, siGeeksforgeeks, siCodeforces } from "simple-icons/icons";

interface Member {
  name: string;
  bio: string | null;
  profilePhoto: string;
  github: string | null;
  linkedin: string | null;
  twitter: string | null;
  leetcode: string | null;
  codeforces: string | null;
  codechef: string | null;
  geeksforgeeks: string | null;
}

export default function PortfolioHero({ member }: { member: Member }) {
  const socialLinks = [
    {
      url: member.github,
      icon: Github,
      label: "GitHub",
      color: "hover:text-white hover:bg-gray-800"
    },
    {
      url: member.linkedin,
      icon: Linkedin,
      label: "LinkedIn",
      color: "hover:text-blue-500 hover:bg-blue-500/10"
    },
    {
      url: member.twitter,
      icon: Twitter,
      label: "Twitter",
      color: "hover:text-sky-400 hover:bg-sky-400/10"
    },
  ];

  const platformLinks = [
    {
      url: member.leetcode,
      label: "LC",
      icon: siLeetcode,
      name: "LeetCode",
      color: "hover:bg-gradient-to-r from-yellow-500 to-orange-500 hover:text-white"
    },
    {
      url: member.codeforces,
      label: "CF",
      icon: siCodeforces,
      name: "Codeforces",
      color: "hover:bg-gradient-to-r from-blue-500 to-cyan-500 hover:text-white"
    },
    {
      url: member.codechef,
      label: "CC",
      icon: siCodechef,
      name: "CodeChef",
      color: "hover:bg-gradient-to-r from-amber-500 to-orange-600 hover:text-white"
    },
    {
      url: member.geeksforgeeks,
      label: "GFG",
      icon: siGeeksforgeeks,
      name: "GeeksforGeeks",
      color: "hover:bg-gradient-to-r from-green-500 to-emerald-600 hover:text-white"
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="max-w-5xl mx-auto text-center"
    >
      {/* Profile Photo */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="relative w-48 h-48 mx-auto mb-8"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-full blur-2xl opacity-60 animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-40" />
        <Image
          src={member.profilePhoto}
          alt={member.name}
          fill
          className="rounded-full object-cover relative z-10 border-4 border-white/20 shadow-2xl"
          priority
        />
      </motion.div>

      {/* Name */}
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent"
      >
        {member.name}
      </motion.h1>

      {/* Bio */}
      {member.bio && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          {member.bio}
        </motion.p>
      )}

      {/* Social Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="flex flex-wrap justify-center gap-3 mb-6"
      >
        {socialLinks.filter(link => link.url).map((link, index) => {
          const Icon = link.icon;
          return (
            <motion.a
              key={link.label}
              href={link.url!}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.9 + index * 0.1, type: "spring" }}
              className={`group relative p-4 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 transition-all duration-300 hover:scale-110 hover:border-transparent ${link.color}`}
            >
              <Icon className="w-6 h-6 text-gray-400 group-hover:text-current transition-colors" />
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {link.label}
              </span>
            </motion.a>
          );
        })}
      </motion.div>

      {/* Platform Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.6 }}
        className="flex flex-wrap justify-center gap-2"
      >
        {platformLinks.filter(link => link.url).map((link, index) => {
          return (
            <motion.a
              key={link.label}
              href={link.url!}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.1 + index * 0.1, type: "spring" }}
              className={`group relative px-4 py-2 bg-white/5 backdrop-blur-xl rounded-lg border border-white/10 transition-all duration-300 hover:scale-105 hover:border-transparent ${link.color}`}
            >
              {link.icon ? (
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 fill-gray-400 group-hover:fill-current transition-colors"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d={link.icon.path} />
                </svg>
              ) : (
                <span className="text-sm font-bold text-gray-400 group-hover:text-current">
                  {link.label}
                </span>
              )}
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {link.name}
              </span>
            </motion.a>
          )
        })}
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="mt-20"
      >
        <a
          href="#stats"
          className="inline-block text-gray-500 hover:text-purple-500 transition-colors"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-gray-600 rounded-full flex items-start justify-center p-2"
          >
            <motion.div className="w-1 h-2 bg-purple-500 rounded-full" />
          </motion.div>
        </a>
      </motion.div>
    </motion.div>
  );
}