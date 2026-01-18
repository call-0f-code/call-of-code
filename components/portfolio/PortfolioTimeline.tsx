// components/portfolio/PortfolioTimeline.tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Calendar } from "lucide-react";
import Image from "next/image";

interface Achievement {
  id: number;
  title: string;
  description: string;
  achievedAt: string;
  imageUrl: string | null;
}

function TimelineItem({
  achievement,
  index,
}: {
  achievement: Achievement;
  index: number;
}) {
  const isEven = index % 2 === 0;
  const date = new Date(achievement.achievedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative flex items-center gap-8 ${isEven ? "flex-row" : "flex-row-reverse"
        }`}
    >
      {/* Content Card */}
      <div className="flex-1">
        <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-zinc-900/50 backdrop-blur-xl border border-gray-200 dark:border-white/10 p-6 hover:border-purple-500/50 transition-all duration-300 shadow-sm dark:shadow-none">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="relative z-10">
            {/* Date */}
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
              <Calendar className="w-4 h-4" />
              <span>{date}</span>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
              {achievement.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-400 mb-4">{achievement.description}</p>

            {/* Image */}
            {achievement.imageUrl && (
              <div className="relative h-48 rounded-lg overflow-hidden">
                <Image
                  src={achievement.imageUrl}
                  alt={achievement.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Center Node */}
      <div className="relative flex-shrink-0">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
          className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 border-4 border-white dark:border-zinc-900"
        />
      </div>

      {/* Empty space for alignment */}
      <div className="flex-1" />
    </motion.div>
  );
}

export default function PortfolioTimeline({
  achievements,
}: {
  achievements: Achievement[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative max-w-5xl mx-auto">
      {/* Central Timeline Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 dark:bg-white/10 -translate-x-1/2">
        <motion.div
          className="absolute top-0 left-0 right-0 bg-gradient-to-b from-purple-500 to-pink-500"
          style={{ height: lineHeight }}
        />
      </div>

      {/* Timeline Items */}
      <div className="space-y-16 py-8">
        {achievements
          .sort(
            (a, b) =>
              new Date(b.achievedAt).getTime() - new Date(a.achievedAt).getTime()
          )
          .map((achievement, index) => (
            <TimelineItem
              key={achievement.id}
              achievement={achievement}
              index={index}
            />
          ))}
      </div>
    </div>
  );
}