/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion, useTransform, useScroll } from "framer-motion";
import React, { useRef, useEffect, useState } from "react";
import {
  Code2,
  Terminal,
  GitBranchIcon as Git,
  Database,
  Cloud,
  Brain,
} from "lucide-react";
import { useTheme } from "@/components/ui/theme-provider";
import Particles from "./particles";

const HorizontalScrollCarousel = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const [scrollRange, setScrollRange] = useState(0);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  useEffect(() => {
    const calculateScrollRange = () => {
      const viewportWidth = window.innerWidth;
      let cardWidth, gap, padding;

      // Responsive card dimensions
      if (viewportWidth < 640) {
        // sm
        cardWidth = Math.min(350, viewportWidth - 32);
        gap = 12;
        padding = 16;
      } else if (viewportWidth < 768) {
        // md
        cardWidth = 380;
        gap = 16;
        padding = 24;
      } else if (viewportWidth < 1024) {
        // lg
        cardWidth = 420;
        gap = 16;
        padding = 32;
      } else {
        // xl and above
        cardWidth = 450;
        gap = 16;
        padding = 48;
      }

      const totalCards = codeBlocks.length;
      const totalScrollWidth = totalCards * (cardWidth + gap) - gap;
      const finalScrollRange = totalScrollWidth - viewportWidth + padding;
      setScrollRange(Math.max(finalScrollRange, 0));
    };

    calculateScrollRange();
    window.addEventListener("resize", calculateScrollRange);

    return () => window.removeEventListener("resize", calculateScrollRange);
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  const { theme } = useTheme();
  const particleColor = theme === "dark" ? "#ffffff" : "#000000";

  return (
    <>
      <motion.section
        ref={targetRef}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative h-[200vh] sm:h-[250vh] md:h-[300vh] bg-transparent w-full transition-colors duration-300"
      >
        {/* Background particles that cover the entire viewport */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Particles
            quantity={
              window.innerWidth < 640
                ? 150
                : window.innerWidth < 1024
                ? 200
                : 300
            }
            className="h-full w-full"
            color={particleColor}
            staticity={30}
            ease={20}
          />
        </div>

        <div className="sticky top-0 flex flex-col  h-screen items-center overflow-hidden">
          <div className="mb-8 xs:mb-10 sm:mb-12 md:mb-14">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
              Join Us To Learn About
            </h2>
          </div>

          <motion.div
            style={{ x }}
            className="flex gap-3 sm:gap-4 pl-4 sm:pl-6 md:pl-8 relative z-10"
          >
            {codeBlocks.map((block, index) => (
              <CodeBlock block={block} key={block.id} index={index} />
            ))}
          </motion.div>
        </div>
      </motion.section>
    </>
  );
};

const CodeBlock = ({
  block,
  index,
}: {
  block: CodeBlockType;
  index: number;
}) => {
  const blockVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.2,
        ease: "easeOut",
      },
    },
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const IconComponent = block.icon || Code2;

  return (
    <motion.div
      variants={blockVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="group relative 
        h-[350px] w-[350px] 
        sm:h-[380px] sm:w-[380px] 
        md:h-[420px] md:w-[420px] 
        lg:h-[450px] lg:w-[450px] 
        overflow-hidden rounded-2xl sm:rounded-3xl
        bg-gradient-to-br from-white/90 to-slate-100/90
        dark:bg-gradient-to-br dark:from-[#23234a]/90 dark:to-[#181829]/90
        p-4 sm:p-6 border-2 border-purple-700
        shadow-xl dark:shadow-2xl dark:shadow-slate-900/50
        backdrop-blur-md transition-all duration-300"
    >
      {/* Terminal dots */}
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex space-x-2">
        <div className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-red-500/80 dark:bg-red-500"></div>
        <div className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-yellow-500/80 dark:bg-yellow-500"></div>
        <div className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-green-500/80 dark:bg-green-500"></div>
      </div>

      <div className="mt-6 sm:mt-8 flex flex-col items-center space-y-4 sm:space-y-6">
        <IconComponent className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 text-blue-500 dark:text-blue-400 transition-colors duration-300" />

        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 dark:text-white transition-colors duration-300 text-center px-2">
          {block.title}
        </h3>

        <div className="h-36 sm:h-40 md:h-48 w-full overflow-hidden rounded-lg bg-indigo-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 transition-colors duration-300 backdrop-blur-sm">
          <pre className="text-xs sm:text-sm p-3 sm:p-4 overflow-auto h-full">
            <code className="text-slate-800 dark:text-blue-300 transition-colors duration-300 leading-relaxed">
              {block.codeSnippet}
            </code>
          </pre>
        </div>
      </div>
    </motion.div>
  );
};

type CodeBlockType = {
  id: number;
  title: string;
  codeSnippet: string;
  icon: any;
};

const codeBlocks: CodeBlockType[] = [
  {
    id: 1,
    title: "Modern JavaScript",
    icon: Code2,
    codeSnippet: `const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(error);
      }
    };`,
  },
  {
    id: 2,
    title: "Command Line Mastery",
    icon: Terminal,
    codeSnippet: `#!/bin/bash
    npm install
    git checkout -b feature
    npm run build
    docker-compose up`,
  },
  {
    id: 3,
    title: "Version Control",
    icon: Git,
    codeSnippet: `git init
    git add .
    git commit -m "feat: initial commit"
    git push origin main`,
  },
  {
    id: 4,
    title: "Database Design",
    icon: Database,
    codeSnippet: `CREATE TABLE users (
      id INT PRIMARY KEY,
      username VARCHAR(50),
      email VARCHAR(100)
    );`,
  },
  {
    id: 5,
    title: "Cloud Computing",
    icon: Cloud,
    codeSnippet: `aws ec2 run-instances \\
      --image-id ami-123456 \\
      --instance-type t2.micro`,
  },
  {
    id: 6,
    title: "AI & Machine Learning",
    icon: Brain,
    codeSnippet: `model = Sequential([
      Dense(64, activation='relu'),
      Dense(10, activation='softmax')
    ])`,
  },
];

export default HorizontalScrollCarousel;
