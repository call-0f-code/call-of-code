// components/portfolio/PortfolioHero.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Github, Linkedin, Twitter } from "lucide-react";

interface Member {
  name: string;
  bio: string | null;
  profilePhoto: string;
  github: string | null;
  linkedin: string | null;
  twitter: string | null;
}

export default function PortfolioHero({ member }: { member: Member }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="max-w-4xl mx-auto text-center"
    >
      {/* Profile Photo */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="relative w-48 h-48 mx-auto mb-8"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-2xl opacity-50 animate-pulse" />
        <Image
          src={member.profilePhoto}
          alt={member.name}
          fill
          className="rounded-full object-cover relative z-10 border-4 border-white/10"
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
          className="text-xl md:text-2xl text-gray-400 mb-8 max-w-2xl mx-auto"
        >
          {member.bio}
        </motion.p>
      )}

      {/* Social Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="flex justify-center gap-6"
      >
        {member.github && (
          <a
            href={member.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-4 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 hover:border-purple-500 transition-all duration-300 hover:scale-110"
          >
            <Github className="w-6 h-6 text-gray-400 group-hover:text-purple-500 transition-colors" />
          </a>
        )}
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-4 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 hover:border-blue-500 transition-all duration-300 hover:scale-110"
          >
            <Linkedin className="w-6 h-6 text-gray-400 group-hover:text-blue-500 transition-colors" />
          </a>
        )}
        {member.twitter && (
          <a
            href={member.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-4 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 hover:border-sky-500 transition-all duration-300 hover:scale-110"
          >
            <Twitter className="w-6 h-6 text-gray-400 group-hover:text-sky-500 transition-colors" />
          </a>
        )}
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
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