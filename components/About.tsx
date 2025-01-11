'use client';

import { motion, useTransform, useScroll } from "framer-motion";
import React, { useRef, useEffect, useState } from "react";
import { Code2, Terminal, Git, Database, Cloud, Brain } from 'lucide-react';

const About = () => {
  return (
    <div className="w-full bg-gradient-to-b from-zinc-200 to-white dark:from-black dark:to-slate-950 transition-colors duration-300">
      <HorizontalScrollCarousel />
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const [scrollRange, setScrollRange] = useState(0);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  useEffect(() => {
    const calculateScrollRange = () => {
      const cardWidth = 450;
      const gap = 16;
      const totalCards = codeBlocks.length;
      const viewportWidth = window.innerWidth;
      const totalScrollWidth = totalCards * (cardWidth + gap) - gap;
      const finalScrollRange = totalScrollWidth - viewportWidth + 48;
      setScrollRange(Math.max(finalScrollRange, 0));
    };

    calculateScrollRange();
    window.addEventListener("resize", calculateScrollRange);

    return () => window.removeEventListener("resize", calculateScrollRange);
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  };

  return (
    <motion.section
      ref={targetRef}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative h-[300vh] bg-transparent w-full transition-colors duration-300"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div 
          style={{ x }} 
          className="flex gap-4 pl-6"
        >
          {codeBlocks.map((block, index) => (
            <CodeBlock block={block} key={block.id} index={index} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

const CodeBlock = ({ block, index }: { block: CodeBlockType; index: number }) => {
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
      className="group relative h-[450px] w-[450px] overflow-hidden rounded-3xl dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 bg-gradient-to-br from-white to-slate-100 p-6 border border-slate-200 dark:border-slate-700 shadow-xl dark:shadow-2xl dark:shadow-slate-900/50 backdrop-blur-sm transition-all duration-300"
    >
      {/* Terminal dots */}
      <div className="absolute top-4 left-4 flex space-x-2">
        <div className="h-3 w-3 rounded-full bg-red-500/80 dark:bg-red-500"></div>
        <div className="h-3 w-3 rounded-full bg-yellow-500/80 dark:bg-yellow-500"></div>
        <div className="h-3 w-3 rounded-full bg-green-500/80 dark:bg-green-500"></div>
      </div>

      <div className="mt-8 flex flex-col items-center space-y-6">
        <IconComponent className="h-16 w-16 text-blue-500 dark:text-blue-400 transition-colors duration-300" />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white transition-colors duration-300">
          {block.title}
        </h3>

        <div className="h-48 w-full overflow-hidden rounded-lg bg-indigo-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors duration-300">
          <pre className="text-sm p-4">
            <code className="text-slate-800 dark:text-blue-300 transition-colors duration-300">
              {block.codeSnippet}
            </code>
          </pre>
        </div>

        <p className="text-center text-slate-600 dark:text-slate-300 transition-colors duration-300">
          {block.description}
        </p>

        <div className="flex flex-wrap justify-center gap-2">
          {block.tags.map((tag, i) => (
            <span
              key={i}
              className="rounded-full bg-blue-500 dark:bg-blue-500/10 px-3 py-1 text-sm text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20 transition-colors duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

type CodeBlockType = {
  id: number;
  title: string;
  description: string;
  codeSnippet: string;
  icon: any;
  tags: string[];
};

const codeBlocks: CodeBlockType[] = [
  {
    id: 1,
    title: "Modern JavaScript",
    description: "Master the latest ES6+ features and modern JavaScript practices",
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
    tags: ["async/await", "ES6+", "Promises"],
  },
  {
    id: 2,
    title: "Command Line Mastery",
    description: "Navigate and control your development environment like a pro",
    icon: Terminal,
    codeSnippet: `#!/bin/bash
    npm install
    git checkout -b feature
    npm run build
    docker-compose up`,
    tags: ["CLI", "Shell", "DevOps"],
  },
  {
    id: 3,
    title: "Version Control",
    description: "Learn Git workflow and collaboration best practices",
    icon: Git,
    codeSnippet: `git init
    git add .
    git commit -m "feat: initial commit"
    git push origin main`,
    tags: ["Git", "GitHub", "DevOps"],
  },
  {
    id: 4,
    title: "Database Design",
    description: "Master SQL and NoSQL database architecture",
    icon: Database,
    codeSnippet: `CREATE TABLE users (
      id INT PRIMARY KEY,
      username VARCHAR(50),
      email VARCHAR(100)
    );`,
    tags: ["SQL", "NoSQL", "Schema"],
  },
  {
    id: 5,
    title: "Cloud Computing",
    description: "Deploy and scale applications in the cloud",
    icon: Cloud,
    codeSnippet: `aws ec2 run-instances \\
      --image-id ami-123456 \\
      --instance-type t2.micro`,
    tags: ["AWS", "Azure", "DevOps"],
  },
  {
    id: 6,
    title: "AI & Machine Learning",
    description: "Implement intelligent features in your applications",
    icon: Brain,
    codeSnippet: `model = Sequential([
      Dense(64, activation='relu'),
      Dense(10, activation='softmax')
    ])`,
    tags: ["AI", "ML", "Python"],
  },
];

export default About;