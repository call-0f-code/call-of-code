'use client';
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import * as LucideIcons from 'lucide-react';

// Add styles to ensure full width and no margins at root level
const styles = {
  root: {
    margin: 0,
    padding: 0,
    width: '100vw',
    position: 'relative',
    left: '50%',
    right: '50%',
    marginLeft: '-50vw',
    marginRight: '-50vw',
    backgroundColor: '#0f172a', // slate-900
  }
};

const About = () => {
  return (
    <div style={styles.root}>
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
    const cardWidth = 450;
    const gap = 16;
    const totalCards = codeBlocks.length;
    const viewportWidth = window.innerWidth;
    const totalScrollWidth = totalCards * (cardWidth + gap) - gap;
    const finalScrollRange = totalScrollWidth - viewportWidth;
    setScrollRange(Math.max(finalScrollRange, 0));
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
      style={{
        height: '300vh',
        backgroundColor: '#0f172a',
        margin: 0,
        padding: 0,
        width: '100vw',
        overflow: 'hidden'
      }}
    >
      <div 
        style={{
          position: 'sticky',
          top: 0,
          display: 'flex',
          height: '100vh',
          alignItems: 'center',
          backgroundColor: '#0f172a',
          margin: 0,
          padding: 0,
          width: '100vw',
          overflow: 'hidden'
        }}
      >
        <motion.div 
          style={{ 
            x,
            display: 'flex',
            gap: '1rem',
          }}
        >
          {codeBlocks.map((block, index) => (
            <CodeBlock block={block} key={block.id} index={index} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

  const IconComponent = block.icon;

  if (!IconComponent) {
    console.error(`Icon not found for block: ${block.title}`);
    return null;
  }

  return (
    <motion.div
      variants={blockVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="group relative h-[450px] w-[450px] overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 p-6 border border-slate-700"
    >
      <div className="absolute top-4 left-4 flex space-x-2">
        <div className="h-3 w-3 rounded-full bg-red-500"></div>
        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
        <div className="h-3 w-3 rounded-full bg-green-500"></div>
      </div>
      
      <div className="mt-8 flex flex-col items-center space-y-6">
        <IconComponent className="h-16 w-16 text-blue-400" />
        
        <h3 className="text-2xl font-bold text-white">{block.title}</h3>
        
        <div className="h-48 w-full overflow-hidden rounded-lg bg-slate-800 p-4">
          <pre className="text-sm">
            <code className="text-blue-300">{block.codeSnippet}</code>
          </pre>
        </div>
        
        <p className="text-center text-slate-300">{block.description}</p>
        
        <div className="flex space-x-3">
          {block.tags.map((tag, i) => (
            <span 
              key={i}
              className="rounded-full bg-blue-500/10 px-3 py-1 text-sm text-blue-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Rest of the code (types and codeBlocks array) remains the same
type CodeBlockType = {
  id: number;
  title: string;
  description: string;
  codeSnippet: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | undefined;
  tags: string[];
};

const codeBlocks: CodeBlockType[] = [
  {
    id: 1,
    title: "Modern JavaScript",
    description: "Master the latest ES6+ features and modern JavaScript practices",
    icon: LucideIcons.Code2,
    codeSnippet: `const fetchData = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};`,
    tags: ["async/await", "ES6+", "Promises"]
  },
  {
    id: 2,
    title: "Command Line Mastery",
    description: "Navigate and control your development environment like a pro",
    icon: LucideIcons.Terminal,
    codeSnippet: `#!/bin/bash
npm install
git checkout -b feature
npm run build
docker-compose up`,
    tags: ["CLI", "Shell", "DevOps"]
  },
  {
    id: 3,
    title: "Version Control",
    description: "Learn Git workflow and collaboration best practices",
    icon: LucideIcons.Git,
    codeSnippet: `git init
git add .
git commit -m "feat: initial commit"
git push origin main`,
    tags: ["Git", "GitHub", "DevOps"]
  },
  {
    id: 4,
    title: "Database Design",
    description: "Master SQL and NoSQL database architecture",
    icon: LucideIcons.Database,
    codeSnippet: `CREATE TABLE users (
  id INT PRIMARY KEY,
  username VARCHAR(50),
  email VARCHAR(100)
);`,
    tags: ["SQL", "NoSQL", "Schema"]
  },
  {
    id: 5,
    title: "Cloud Computing",
    description: "Deploy and scale applications in the cloud",
    icon: LucideIcons.Cloud,
    codeSnippet: `aws ec2 run-instances \
  --image-id ami-123456 \
  --instance-type t2.micro`,
    tags: ["AWS", "Azure", "DevOps"]
  },
  {
    id: 6,
    title: "AI & Machine Learning",
    description: "Implement intelligent features in your applications",
    icon: LucideIcons.Brain,
    codeSnippet: `model = Sequential([
  Dense(64, activation='relu'),
  Dense(10, activation='softmax')
])`,
    tags: ["AI", "ML", "Python"]
  }
];

export default About;