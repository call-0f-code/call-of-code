"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        return distance < Math.abs(latest - cardsBreakpoints[acc]) ? index : acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  const backgroundColors = [
    "rgb(15, 23, 42)", // Dark blue
    "rgb(3, 7, 18)",   // Darker blue
    "rgb(17, 24, 39)", // Navy
    "rgb(10, 15, 25)"  // Deep blue
  ];

  const linearGradients = [
    "linear-gradient(to bottom right, rgb(56, 189, 248), rgb(59, 130, 246))", // Sky to blue
    "linear-gradient(to bottom right, rgb(99, 102, 241), rgb(168, 85, 247))", // Indigo to purple
    "linear-gradient(to bottom right, rgb(134, 239, 172), rgb(59, 130, 246))", // Green to blue
    "linear-gradient(to bottom right, rgb(249, 168, 212), rgb(216, 180, 254))"  // Pink to purple
  ];

  const [backgroundGradient, setBackgroundGradient] = useState(linearGradients[0]);

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard]);

  return (
    <motion.div
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      className="h-[45rem] overflow-y-auto flex justify-center relative space-x-20 rounded-xl p-12 border border-slate-800"
      ref={ref}
    >
      <div className="relative flex items-start px-8">
        <div className="max-w-4xl">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-28">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                  y: activeCard === index ? 0 : 20
                }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <motion.h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  {item.title}
                </motion.h2>
                <motion.p className="text-lg text-slate-300 max-w-xl leading-relaxed">
                  {item.description}
                </motion.p>
                <motion.div 
                  className="h-1 w-20 rounded-full"
                  style={{ background: backgroundGradient }}
                />
              </motion.div>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      <motion.div
        style={{ background: backgroundGradient }}
        className={cn(
          "hidden lg:block h-96 w-[28rem] rounded-xl sticky top-16 overflow-hidden backdrop-blur-xl border border-slate-700/50",
          contentClassName
        )}
      >
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
        <div className="relative h-full">
          {content[activeCard].content ?? null}
        </div>
      </motion.div>
    </motion.div>
  );
};