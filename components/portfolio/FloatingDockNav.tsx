// components/portfolio/FloatingDockNav.tsx
"use client";

import { motion } from "framer-motion";
import { Home, BarChart3, FolderOpen, Trophy, Github, Linkedin } from "lucide-react";
import { useState } from "react";

interface Member {
  github: string | null;
  linkedin: string | null;
}

interface DockItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  action: () => void;
}

export default function FloatingDockNav({ member }: { member: Member }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const items: DockItem[] = [
    {
      id: "home",
      icon: <Home className="w-5 h-5" />,
      label: "Home",
      action: () => scrollToSection("hero"),
    },
    {
      id: "stats",
      icon: <BarChart3 className="w-5 h-5" />,
      label: "Stats",
      action: () => scrollToSection("stats"),
    },
    {
      id: "projects",
      icon: <FolderOpen className="w-5 h-5" />,
      label: "Projects",
      action: () => scrollToSection("projects"),
    },
    {
      id: "timeline",
      icon: <Trophy className="w-5 h-5" />,
      label: "Achievements",
      action: () => scrollToSection("timeline"),
    },
  ];

  // Add social links if available
  if (member.github) {
    items.push({
      id: "github",
      icon: <Github className="w-5 h-5" />,
      label: "GitHub",
      action: () => window.open(member.github!, "_blank"),
    });
  }

  if (member.linkedin) {
    items.push({
      id: "linkedin",
      icon: <Linkedin className="w-5 h-5" />,
      label: "LinkedIn",
      action: () => window.open(member.linkedin!, "_blank"),
    });
  }

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="flex items-end gap-2 px-4 py-3 bg-zinc-900/80 backdrop-blur-xl rounded-full border border-white/10">
        {items.map((item, index) => {
          const distance = hoveredIndex !== null ? Math.abs(hoveredIndex - index) : 2;
          const scale = hoveredIndex !== null ? Math.max(1, 1.5 - distance * 0.2) : 1;

          return (
            <motion.button
              key={item.id}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={item.action}
              animate={{ scale }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors duration-200"
            >
              <div className="text-gray-400 group-hover:text-purple-500 transition-colors">
                {item.icon}
              </div>

              {/* Tooltip */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: hoveredIndex === index ? 1 : 0,
                  y: hoveredIndex === index ? -60 : -50,
                }}
                className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-1 bg-zinc-900 text-white text-xs rounded-lg whitespace-nowrap pointer-events-none border border-white/10"
              >
                {item.label}
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
                  <div className="border-4 border-transparent border-t-zinc-900" />
                </div>
              </motion.div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}