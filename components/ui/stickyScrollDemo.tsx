"use client";
import React from "react";
import { StickyScroll } from "../ui/sticky-scroll-reveal";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Code, Users, Rocket, Trophy } from "lucide-react";

const IconMap = {
  0: Code,
  1: Trophy,
  2: Users,
  3: Rocket,
};

const content = [
  {
    title: "Welcome to Call of Code",
    description:
      "Call of Code, our college's official coding club, is a dynamic hub for tech enthusiasts eager to explore the world of programming. The club serves as a collaborative space where creativity and innovation come together, empowering students to master coding while building a strong community.",
    content: (
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        className="h-full w-full flex flex-col items-center justify-center text-black dark:text-white bg-gradient-to-br from-cyan-500 to-emerald-500 dark:from-cyan-800 dark:to-emerald-800 rounded-xl p-6"
      >
        <Code className="w-16 h-16 mb-4" />
        <motion.h2 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-center"
        >
          Welcome to CALL OF CODE
        </motion.h2>
      </motion.div>
    ),
  },
  {
    title: "Igniting Passion Through Events",
    description:
      "Call of Code organizes exciting hackathons, coding contests, and interactive workshops throughout the year. These events are designed to challenge members, spark creativity, and encourage teamwork, helping students sharpen their technical and problem-solving skills.",
    content: (
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="h-full w-full flex items-center justify-center text-black dark:text-white relative group"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative w-full h-full overflow-hidden rounded-xl"
        >
          <Image
            src="/keep-coding.webp"
            width={300}
            height={300}
            className="h-full w-full object-cover dark:opacity-90 transition-transform duration-300 group-hover:scale-110"
            alt="linear board demo"
          />
          <motion.div 
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-black/40 flex items-center justify-center"
          >
            <Trophy className="w-16 h-16" />
          </motion.div>
        </motion.div>
      </motion.div>
    ),
  },
  {
    title: "Learn and Grow Together",
    description:
      "With a strong focus on mentorship, Call of Code ensures every member feels supported. Whether you're a beginner or an advanced coder, you'll benefit from expert guidance on trending topics like app development, machine learning, and competitive programming.",
    content: (
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        className="h-full w-full flex flex-col items-center justify-center text-black dark:text-white bg-gradient-to-br from-orange-500 to-yellow-500 dark:from-orange-800 dark:to-yellow-800 rounded-xl p-6"
      >
        <Users className="w-16 h-16 mb-4" />
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2"
        >
          <span className="text-2xl font-bold">Learn</span>
          <ArrowRight className="w-6 h-6" />
          <span className="text-2xl font-bold">Grow</span>
        </motion.div>
      </motion.div>
    ),
  },
  {
    title: "Launchpad to Success",
    description:
      "As part of Call of Code, members gain access to unique networking opportunities, industry insights, and real-world projects. The club provides a platform to enhance your resume, collaborate on groundbreaking ideas, and prepare for a successful career in tech.",
    content: (
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        className="h-full w-full flex flex-col items-center justify-center text-black dark:text-white bg-gradient-to-br from-cyan-500 to-emerald-500 dark:from-cyan-800 dark:to-emerald-800 rounded-xl p-6 relative overflow-hidden"
      >
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Rocket className="w-16 h-16 mb-4" />
        </motion.div>
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold"
        >
          Launch Your Career
        </motion.span>
      </motion.div>
    ),
  },
];

export function StickyScrollRevealDemo() {
  return (
    <div className="p-0 bg-white dark:bg-black transition-colors duration-300">
      <StickyScroll content={content} />
    </div>
  );
}
