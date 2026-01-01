// components/portfolio/FloatingDockNav.tsx
"use client";

import { motion } from "framer-motion";
import { Home, BarChart3, FolderOpen, Trophy, Github, Linkedin, Code } from "lucide-react";
import { useState } from "react";

interface Member {
  github: string | null;
  linkedin: string | null;
  leetcode: string | null;
  codeforces: string | null;
  codechef: string | null;
  geeksforgeeks: string | null;
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

  // Add a divider
  items.push({
    id: "divider",
    icon: <div className="w-px h-8 bg-white/20" />,
    label: "",
    action: () => {},
  });

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

  // Add platform links
  const platformLinks = [
    { url: member.leetcode, label: "LC", name: "LeetCode" },
    { url: member.codeforces, label: "CF", name: "Codeforces" },
    { url: member.codechef, label: "CC", name: "CodeChef" },
    { url: member.geeksforgeeks, label: "GFG", name: "GeeksforGeeks" },
  ].filter(p => p.url);

  if (platformLinks.length > 0) {
    platformLinks.forEach(platform => {
      items.push({
        id: platform.label.toLowerCase(),
        icon: <span className="text-xs font-bold">{platform.label}</span>,
        label: platform.name,
        action: () => window.open(platform.url!, "_blank"),
      });
    });
  }

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="flex items-end gap-1 px-3 py-2.5 bg-zinc-900/90 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl">
        {items.map((item, index) => {
          if (item.id === "divider") {
            return <div key={item.id} className="mx-1">{item.icon}</div>;
          }

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
              className="group relative p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-200"
            >
              <div className="text-gray-400 group-hover:text-purple-400 transition-colors">
                {item.icon}
              </div>

              {/* Tooltip */}
              {item.label && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: hoveredIndex === index ? 1 : 0,
                    y: hoveredIndex === index ? -65 : -55,
                  }}
                  className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-1.5 bg-zinc-900 text-white text-xs font-medium rounded-lg whitespace-nowrap pointer-events-none border border-white/10 shadow-xl"
                >
                  {item.label}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
                    <div className="border-4 border-transparent border-t-zinc-900" />
                  </div>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}