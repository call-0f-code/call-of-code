"use client";

import { motion } from "framer-motion";

import {
  Code2,
  Users,
  Terminal,
  GitBranch,
  BookOpen,
  Sparkles,
} from "lucide-react";

import React from "react";
import HorizontalScrollCarousel from "./ui/horizontal-scroll";

const whyChooseUs = [
  {
    title: "Since 2021",
    subtitle: "A Trusted Coding Club.",
    icon: <Users className="h-8 w-8" />,
    colSpan: "md:col-span-2",
  },
  {
    title: "15+",
    subtitle: "Tech Events Hosted",
    icon: <Terminal className="h-8 w-8" />,
    colSpan: "",
  },
  {
    title: "Open Source",
    subtitle: "Active Contributions",
    icon: <GitBranch className="h-8 w-8" />,
    colSpan: "",
  },
  {
    title: "Flexible Learning",
    subtitle: "Workshops & Peer Sessions",
    icon: <BookOpen className="h-8 w-8" />,
    colSpan: "",
  },
  {
    title: "Agile Team",
    subtitle: "Collaborative Projects",
    icon: <Code2 className="h-8 w-8" />,
    colSpan: "",
  },
  {
    title: "Certified Members",
    subtitle: "Recognized by Industry",
    icon: <Sparkles className="h-8 w-8" />,
    colSpan: "md:col-span-2",
  },
];

export default function AboutUs() {
  return (
    <>
      <section className="max-w-6xl mx-auto px-4 pb-20 mt-20">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8">
          <div>
            <h2 className="text-4xl font-bold mb-2">About Us</h2>
          </div>
          <p className="text-gray-700 dark:text-gray-300 max-w-xl md:ml-8 mt-2 md:mt-0 text-lg">
            We consistently craft meaningful experiences for our members and
            community every time they interact with Call of Code.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Large left card */}
            <motion.div
            className="rounded-2xl bg-white dark:bg-gradient-to-br dark:from-[#23234a] dark:to-[#181829] text-primary p-8 border-2 border-purple-700 flex flex-col justify-between min-h-[180px] md:col-span-2 shadow-lg relative overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, type: "spring" }}
            whileHover={{ scale: 1.04 }}
            viewport={{ once: true }}
            >
            <div className="text-3xl font-bold mb-2">Coding culture</div>
            <div className="text-lg mb-4">Fostering a passion for clean code, best practices, and continuous learning in a collaborative environment.</div>
            <div className="absolute bottom-6 right-6 opacity-80">
              {whyChooseUs[0].icon}
            </div>
            </motion.div>
          {/* Top row cards */}
          <motion.div
            className="rounded-2xl dark:bg-gradient-to-br  dark:from-[#23234a] dark:to-[#181829] dark:text-white p-8 border-2 border-purple-700 flex flex-col justify-between min-h-[180px] shadow-lg relative overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, type: "spring" }}
            whileHover={{ scale: 1.04 }}
            viewport={{ once: true }}
          >
            <div className="text-3xl font-bold mb-2">Open Source</div>
            <div className="text-lg mb-4">Encouraging contributions to open-source projects and building impactful software for the community.</div>
            <div className="absolute bottom-6 right-6 opacity-80">
              {whyChooseUs[1].icon}
            </div>
          </motion.div>
          <motion.div
            className="rounded-2xl dark:bg-gradient-to-br dark:from-[#23234a] dark:to-[#181829] dark:text-white  p-8 border-2 border-purple-700 flex flex-col justify-between min-h-[180px] shadow-lg relative overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, type: "spring" }}
            whileHover={{ scale: 1.04 }}
            viewport={{ once: true }}
          >
            <div className="text-3xl font-bold mb-2">Learning Opportunities</div>
            <div className="text-lg mb-4"> Peer-to-peer sessions to upskill and stay ahead in the tech world.</div>
            <div className="absolute bottom-6 right-6 opacity-80">
              {whyChooseUs[2].icon}
            </div>
          </motion.div>
          <motion.div
            className="rounded-2xl dark:bg-gradient-to-br dark:from-[#23234a] dark:to-[#181829] dark:text-white p-8 border-2 border-purple-700 flex flex-col justify-between min-h-[180px] shadow-lg relative overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, type: "spring" }}
            whileHover={{ scale: 1.04 }}
            viewport={{ once: true }}
          >
            <div className="text-3xl font-bold mb-2">Hackathons</div>
            <div className="text-lg mb-4">Organizing and participating in hackathons to solve real-world problems and innovate as a team.</div>
            <div className="absolute bottom-6 right-6 opacity-80">
              {whyChooseUs[3].icon}
            </div>
          </motion.div>
          {/* Bottom row cards */}
          <motion.div
            className="rounded-2xl dark:bg-gradient-to-br dark:from-[#23234a] dark:to-[#181829] dark:text-white p-8 border-2 border-purple-700 flex flex-col justify-between min-h-[180px] shadow-lg relative overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, type: "spring" }}
            whileHover={{ scale: 1.04 }}
            viewport={{ once: true }}
          >
            <div className="text-3xl font-bold mb-2">Our Vision</div>
            <div className="text-lg mb-4">To develop a healthy and competitive coding culture where members learn and take inspiration frome each other.</div>
            <div className="absolute bottom-6 right-6 opacity-80">
              {whyChooseUs[4].icon}
            </div>
          </motion.div>
          <motion.div
            className="rounded-2xl dark:bg-gradient-to-br dark:from-[#23234a] dark:to-[#181829] dark:text-white p-8 border-2 border-purple-700 flex flex-col justify-between min-h-[180px] md:col-span-2 shadow-lg relative overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, type: "spring" }}
            whileHover={{ scale: 1.04 }}
            viewport={{ once: true }}
          >
            <div className="text-3xl font-bold mb-2">Community & Collaboration</div>
            <div className="text-lg mb-4">Building a supportive network where members help each other grow and succeed together.</div>
            <div className="absolute bottom-6 right-6 opacity-80">
              {whyChooseUs[5].icon}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="w-full bg-white dark:bg-black transition-colors duration-300">
        <HorizontalScrollCarousel />
      </div>
    </>
  );
}
