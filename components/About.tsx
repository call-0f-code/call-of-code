'use client';

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/project-card";
import { Code2, Users, Terminal, GitBranch, BookOpen, Sparkles } from "lucide-react";


import {  useTransform, useScroll } from "framer-motion";
import React, { useRef, useEffect, useState } from "react";
import {  GitBranchIcon as Git, Database, Cloud, Brain } from 'lucide-react';

const aboutCards = [
  {
    icon: <Code2 className="h-7 w-7" />, // Coding culture
    title: "Coding Culture",
    description: "Fostering a passion for clean code, best practices, and continuous learning in a collaborative environment.",
  },
  {
    icon: <GitBranch className="h-7 w-7" />, // Open Source
    title: "Open Source",
    description: "Encouraging contributions to open-source projects and building impactful software for the community.",
  },
  {
    icon: <Terminal className="h-7 w-7" />, // Hackathons
    title: "Hackathons",
    description: "Organizing and participating in hackathons to solve real-world problems and innovate as a team.",
  },
  {
    icon: <BookOpen className="h-7 w-7" />, // Learning
    title: "Learning Opportunities",
    description: "Workshops, talks, and peer-to-peer sessions to upskill and stay ahead in the tech world.",
  },
  {
    icon: <Users className="h-7 w-7" />, // Community
    title: "Community & Collaboration",
    description: "Building a supportive network where members help each other grow and succeed together.",
  },
  {
    icon: <Sparkles className="h-7 w-7" />, // Vision
    title: "Our Vision",
    description: "To empower coders to innovate, collaborate, and make a positive impact through technology.",
  },
];

const whyChooseUs = [
  {
    title: "Since 2021",
    subtitle: "A Trusted Coding Club.",
    icon: <Users className="h-10 w-10" />,
    colSpan: "md:col-span-2",
  },
  {
    title: "15+",
    subtitle: "Tech Events Hosted",
    icon: <Terminal className="h-10 w-10" />,
    colSpan: "",
  },
  {
    title: "Open Source",
    subtitle: "Active Contributions",
    icon: <GitBranch className="h-10 w-10" />,
    colSpan: "",
  },
  {
    title: "Flexible Learning",
    subtitle: "Workshops & Peer Sessions",
    icon: <BookOpen className="h-10 w-10" />,
    colSpan: "",
  },
  {
    title: "Agile Team",
    subtitle: "Collaborative Projects",
    icon: <Code2 className="h-10 w-10" />,
    colSpan: "",
  },
  {
    title: "Certified Members",
    subtitle: "Recognized by Industry",
    icon: <Sparkles className="h-10 w-10" />,
    colSpan: "md:col-span-2",
  },
];

export default function AboutUs() {
  return (
    <>
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            About Us
          </motion.h2>
          <motion.p
            className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Discover our vision, agenda, and the coding culture that drives Call of Code.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {aboutCards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.1 }}
              style={{ cursor: 'pointer' }}
              transition={{ duration: 0.7, delay: idx * 0.03, type: 'spring' }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-white/5 dark:bg-black/40 border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3 text-primary">
                    {card.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold">{card.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-700 dark:text-gray-300">
                    {card.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
      {/* Why Choose Us Section */}
      <section className="max-w-6xl mx-auto px-4 pb-20 mt-20">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8">
          <div>
            <h2 className="text-4xl font-bold mb-2">Why Choose Us?</h2>
          </div>
          <p className="text-gray-700 dark:text-gray-300 max-w-xl md:ml-8 mt-2 md:mt-0 text-lg">
            We consistently craft meaningful experiences for our members and community every time they interact with Call of Code.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Large left card */}
          <motion.div
            className="rounded-2xl bg-gradient-to-br from-[#23234a] to-[#181829] text-white p-8 flex flex-col justify-between min-h-[180px] md:col-span-2 shadow-lg relative overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, type: 'spring' }}
            whileHover={{ scale: 1.04 }}
            viewport={{ once: true }}
          >
            <div className="text-3xl font-bold mb-2">Since 2021</div>
            <div className="text-lg mb-4">A Trusted Coding Club.</div>
            <div className="absolute bottom-6 right-6 opacity-80">{whyChooseUs[0].icon}</div>
          </motion.div>
          {/* Top row cards */}
          <motion.div
            className="rounded-2xl bg-gradient-to-br from-[#23234a] to-[#181829] text-white p-8 flex flex-col justify-between min-h-[180px] shadow-lg relative overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, type: 'spring' }}
            whileHover={{ scale: 1.04 }}
            viewport={{ once: true }}
          >
            <div className="text-3xl font-bold mb-2">15+</div>
            <div className="text-lg mb-4">Tech Events Hosted</div>
            <div className="absolute bottom-6 right-6 opacity-80">{whyChooseUs[1].icon}</div>
          </motion.div>
          <motion.div
            className="rounded-2xl bg-gradient-to-br from-[#23234a] to-[#181829] text-white p-8 flex flex-col justify-between min-h-[180px] shadow-lg relative overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, type: 'spring' }}
            whileHover={{ scale: 1.04 }}
            viewport={{ once: true }}
          >
            <div className="text-3xl font-bold mb-2">Open Source</div>
            <div className="text-lg mb-4">Active Contributions</div>
            <div className="absolute bottom-6 right-6 opacity-80">{whyChooseUs[2].icon}</div>
          </motion.div>
          <motion.div
            className="rounded-2xl bg-gradient-to-br from-[#23234a] to-[#181829] text-white p-8 flex flex-col justify-between min-h-[180px] shadow-lg relative overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, type: 'spring' }}
            whileHover={{ scale: 1.04 }}
            viewport={{ once: true }}
          >
            <div className="text-3xl font-bold mb-2">Flexible Learning</div>
            <div className="text-lg mb-4">Workshops & Peer Sessions</div>
            <div className="absolute bottom-6 right-6 opacity-80">{whyChooseUs[3].icon}</div>
          </motion.div>
          {/* Bottom row cards */}
          <motion.div
            className="rounded-2xl bg-gradient-to-br from-[#23234a] to-[#181829] text-white p-8 flex flex-col justify-between min-h-[180px] shadow-lg relative overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, type: 'spring' }}
            whileHover={{ scale: 1.04 }}
            viewport={{ once: true }}
          >
            <div className="text-3xl font-bold mb-2">Agile Team</div>
            <div className="text-lg mb-4">Collaborative Projects</div>
            <div className="absolute bottom-6 right-6 opacity-80">{whyChooseUs[4].icon}</div>
          </motion.div>
          <motion.div
            className="rounded-2xl bg-gradient-to-br from-[#23234a] to-[#181829] text-white p-8 flex flex-col justify-between min-h-[180px] md:col-span-2 shadow-lg relative overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, type: 'spring' }}
            whileHover={{ scale: 1.04 }}
            viewport={{ once: true }}
          >
            <div className="text-3xl font-bold mb-2">Certified Members</div>
            <div className="text-lg mb-4">Recognized by Industry</div>
            <div className="absolute bottom-6 right-6 opacity-80">{whyChooseUs[5].icon}</div>
          </motion.div>
        </div>
      </section>

      <div className="w-full bg-gradient-to-b from-zinc-200 to-white dark:from-black dark:to-slate-950 transition-colors duration-300">
      <HorizontalScrollCarousel />
    </div>
    </>
  );
}



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
    <>
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
    </>
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
    <div>
    
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
    </div>
  );
};

type CodeBlockType = {
  id: number;
  title: string;
  description: string;
  codeSnippet: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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




// "use client";

// import { motion, useTransform, useScroll } from "framer-motion";
// import React, { useRef, useEffect, useState } from "react";
// import {
//   Code2,
//   Users,
//   Terminal,
//   GitBranch,
//   BookOpen,
//   Sparkles,
//   GitBranchIcon as Git,
//   Database,
//   Cloud,
//   Brain,
// } from "lucide-react";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
// } from "@/components/ui/project-card";

// const aboutCards = [
//   {
//     icon: <Code2 className="h-7 w-7" />, // Coding culture
//     title: "Coding Culture",
//     description:
//       "Fostering a passion for clean code, best practices, and continuous learning in a collaborative environment.",
//   },
//   {
//     icon: <GitBranch className="h-7 w-7" />,
//     title: "Open Source",
//     description:
//       "Encouraging contributions to open-source projects and building impactful software for the community.",
//   },
//   {
//     icon: <Terminal className="h-7 w-7" />,
//     title: "Hackathons",
//     description:
//       "Organizing and participating in hackathons to solve real-world problems and innovate as a team.",
//   },
//   {
//     icon: <BookOpen className="h-7 w-7" />,
//     title: "Learning Opportunities",
//     description:
//       "Workshops, talks, and peer-to-peer sessions to upskill and stay ahead in the tech world.",
//   },
//   {
//     icon: <Users className="h-7 w-7" />,
//     title: "Community & Collaboration",
//     description:
//       "Building a supportive network where members help each other grow and succeed together.",
//   },
//   {
//     icon: <Sparkles className="h-7 w-7" />,
//     title: "Our Vision",
//     description:
//       "To empower coders to innovate, collaborate, and make a positive impact through technology.",
//   },
// ];

// const whyChooseUs = [
//   {
//     title: "Since 2021",
//     subtitle: "A Trusted Coding Club.",
//     icon: <Users className="h-10 w-10" />,
//   },
//   {
//     title: "15+",
//     subtitle: "Tech Events Hosted",
//     icon: <Terminal className="h-10 w-10" />,
//   },
//   {
//     title: "Open Source",
//     subtitle: "Active Contributions",
//     icon: <GitBranch className="h-10 w-10" />,
//   },
//   {
//     title: "Flexible Learning",
//     subtitle: "Workshops & Peer Sessions",
//     icon: <BookOpen className="h-10 w-10" />,
//   },
//   {
//     title: "Agile Team",
//     subtitle: "Collaborative Projects",
//     icon: <Code2 className="h-10 w-10" />,
//   },
//   {
//     title: "Certified Members",
//     subtitle: "Recognized by Industry",
//     icon: <Sparkles className="h-10 w-10" />,
//   },
// ];

// export default function AboutUs() {
//   return (
//     <>
//       <section className="py-12 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
//         <div className="text-center mb-12">
//           <motion.h2
//             className="text-4xl font-bold mb-4"
//             initial={{ opacity: 0, y: -30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7 }}
//             viewport={{ once: true }}
//           >
//             About Us
//           </motion.h2>
//           <motion.p
//             className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7, delay: 0.2 }}
//             viewport={{ once: true }}
//           >
//             Discover our vision, agenda, and the coding culture that drives Call of Code.
//           </motion.p>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {aboutCards.map((card, idx) => (
//             <motion.div
//               key={card.title}
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               whileHover={{ scale: 1.1 }}
//               style={{ cursor: "pointer" }}
//               transition={{ duration: 0.7, delay: idx * 0.03, type: "spring" }}
//               viewport={{ once: true }}
//             >
//               <Card className="h-full bg-white/5 dark:bg-black/40 border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
//                 <CardHeader className="flex flex-row items-center gap-4">
//                   <div className="rounded-full bg-primary/10 p-3 text-primary">{card.icon}</div>
//                   <CardTitle className="text-xl font-semibold">{card.title}</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <CardDescription className="text-base text-gray-700 dark:text-gray-300">
//                     {card.description}
//                   </CardDescription>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20 mt-20">
//         <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8">
//           <h2 className="text-4xl font-bold mb-4 md:mb-0">Why Choose Us?</h2>
//           <p className="text-gray-700 dark:text-gray-300 max-w-xl md:ml-8 text-lg">
//             We consistently craft meaningful experiences for our members and community every time they interact with Call of Code.
//           </p>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {whyChooseUs.map((card, idx) => (
//             <motion.div
//               key={idx}
//               className="rounded-2xl bg-gradient-to-br from-[#23234a] to-[#181829] text-white p-8 flex flex-col justify-between min-h-[180px] shadow-lg relative overflow-hidden"
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               whileHover={{ scale: 1.04 }}
//               transition={{ duration: 0.7, delay: idx * 0.05, type: "spring" }}
//               viewport={{ once: true }}
//             >
//               <div className="text-3xl font-bold mb-2">{card.title}</div>
//               <div className="text-lg mb-4">{card.subtitle}</div>
//               <div className="absolute bottom-6 right-6 opacity-80">{card.icon}</div>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       <div className="w-full bg-gradient-to-b from-zinc-200 to-white dark:from-black dark:to-slate-950 transition-colors duration-300">
//         <HorizontalScrollCarousel />
//       </div>
//     </>
//   );
// }

// const HorizontalScrollCarousel = () => {
//   const targetRef = useRef(null);
//   const [scrollRange, setScrollRange] = useState(0);
//   const { scrollYProgress } = useScroll({ target: targetRef });

//   useEffect(() => {
//     const calculateScrollRange = () => {
//       const cardWidth = 350;
//       const gap = 16;
//       const totalCards = codeBlocks.length;
//       const viewportWidth = window.innerWidth;
//       const totalScrollWidth = totalCards * (cardWidth + gap) - gap;
//       const finalScrollRange = totalScrollWidth - viewportWidth + 48;
//       setScrollRange(Math.max(finalScrollRange, 0));
//     };

//     calculateScrollRange();
//     window.addEventListener("resize", calculateScrollRange);
//     return () => window.removeEventListener("resize", calculateScrollRange);
//   }, []);

//   const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

//   return (
//     <motion.section
//       ref={targetRef}
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.8 }}
//       className="relative h-[300vh] bg-transparent w-full"
//     >
//       <div className="sticky top-0 h-screen w-full flex items-center overflow-x-auto md:overflow-hidden scroll-smooth touch-auto">
//         <motion.div style={{ x }} className="flex gap-4 pl-6">
//           {codeBlocks.map((block, index) => (
//             <CodeBlock block={block} key={block.id} index={index} />
//           ))}
//         </motion.div>
//       </div>
//     </motion.section>
//   );
// };

// type CodeBlockType = {
//   id: number;
//   title: string;
//   description: string;
//   codeSnippet: string;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   icon: any;
//   tags: string[];
// };

// const CodeBlock = ({ block, index }: { block: CodeBlockType; index: number }) => {
//   const IconComponent = block.icon || Code2;

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 50 }}
//       animate={{ opacity: 1, y: 0 }}
//       whileHover={{ y: -10, scale: 1.02 }}
//       transition={{ duration: 0.3, delay: index * 0.2, ease: "easeInOut" }}
//       className="w-[90vw] max-w-[450px] h-[450px] rounded-3xl bg-gradient-to-br from-white to-slate-100 dark:from-slate-800 dark:to-slate-900 p-6 border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden"
//     >
//       <div className="absolute top-4 left-4 flex space-x-2">
//         <div className="h-3 w-3 rounded-full bg-red-500"></div>
//         <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
//         <div className="h-3 w-3 rounded-full bg-green-500"></div>
//       </div>

//       <div className="mt-8 flex flex-col items-center space-y-6">
//         <IconComponent className="h-16 w-16 text-blue-500 dark:text-blue-400" />
//         <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{block.title}</h3>
//         <div className="h-48 w-full overflow-hidden rounded-lg bg-indigo-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
//           <pre className="text-sm p-4">
//             <code className="text-slate-800 dark:text-blue-300">{block.codeSnippet}</code>
//           </pre>
//         </div>
//         <p className="text-center text-slate-600 dark:text-slate-300">{block.description}</p>
//         <div className="flex flex-wrap justify-center gap-2">
//           {block.tags.map((tag, i) => (
//             <span
//               key={i}
//               className="rounded-full bg-blue-500 dark:bg-blue-500/10 px-3 py-1 text-sm text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20"
//             >
//               {tag}
//             </span>
//           ))}
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// const codeBlocks = [
//   {
//     id: 1,
//     title: "Modern JavaScript",
//     description: "Master the latest ES6+ features and modern JavaScript practices",
//     icon: Code2,
//     codeSnippet: `const fetchData = async () => {
//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error(error);
//   }
// };`,
//     tags: ["async/await", "ES6+", "Promises"],
//   },
//   {
//     id: 2,
//     title: "Command Line Mastery",
//     description: "Navigate and control your development environment like a pro",
//     icon: Terminal,
//     codeSnippet: `#!/bin/bash
// npm install
// git checkout -b feature
// npm run build
// docker-compose up`,
//     tags: ["CLI", "Shell", "DevOps"],
//   },
//   {
//     id: 3,
//     title: "Version Control",
//     description: "Learn Git workflow and collaboration best practices",
//     icon: Git,
//     codeSnippet: `git init
// git add .
// git commit -m "feat: initial commit"
// git push origin main`,
//     tags: ["Git", "GitHub", "DevOps"],
//   },
//   {
//     id: 4,
//     title: "Database Design",
//     description: "Master SQL and NoSQL database architecture",
//     icon: Database,
//     codeSnippet: `CREATE TABLE users (
//   id INT PRIMARY KEY,
//   username VARCHAR(50),
//   email VARCHAR(100)
// );`,
//     tags: ["SQL", "NoSQL", "Schema"],
//   },
//   {
//     id: 5,
//     title: "Cloud Computing",
//     description: "Deploy and scale applications in the cloud",
//     icon: Cloud,
//     codeSnippet: `aws ec2 run-instances \\
//   --image-id ami-123456 \\
//   --instance-type t2.micro`,
//     tags: ["AWS", "Azure", "DevOps"],
//   },
//   {
//     id: 6,
//     title: "AI & Machine Learning",
//     description: "Implement intelligent features in your applications",
//     icon: Brain,
//     codeSnippet: `model = Sequential([
//   Dense(64, activation='relu'),
//   Dense(10, activation='softmax')
// ])`,
//     tags: ["AI", "ML", "Python"],
//   },
// ];

