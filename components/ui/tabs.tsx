"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type Tab = {
  title: string;
  value: string;
  content?: React.ReactNode;
};

export const Tabs = ({
  tabs,
  containerClassName,
  tabClassName,
  contentClassName,
  onTabChange,
}: {
  tabs: Tab[];
  containerClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
  onTabChange?: (index: number) => void;
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const active = tabs[activeIndex];

  const handleTabChange = (index: number) => {  
    setActiveIndex(index);  
    onTabChange?.(index);  
  };
  
  return (
    <>
      {/* Tab headers */}
      <div
        className={cn(
          "flex flex-row whitespace-nowrap overflow-x-auto space-x-3 sm:space-x-8 scrollbar-hide",
          containerClassName
        )}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {tabs.map((tab, idx) => (
          <button
            key={tab.value}
            onClick={() => moveSelectedTabToTop(idx)}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className="relative pb-2 sm:text-sm md:text-md font-semibold text-white transition-colors"

          >
            <span
              className={cn(
                "relative z-10 transition",
                active.value === tab.value
                  ? "bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent"
                  : "text-black/50 dark:text-white/30 hover:text-black dark:hover:text-white"
              )}
            >
              {tab.title}
            </span>

            {active.value === tab.value && (
              <motion.div
                layoutId="underline"
                className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-purple-400 to-pink-600"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <FadeInDiv
        key={active.value}
        tabs={tabs}
        active={active}
        activeIndex={activeIndex}
        hovering={hovering}
        className={cn("mt-32", contentClassName)}
      />
    </>
  );
};

export const FadeInDiv = ({
  className,
  tabs,
  active,
  activeIndex,
  hovering,
}: {
  className?: string;
  tabs: Tab[];
  active: Tab;
  activeIndex: number;
  hovering: boolean;
}) => {
  return (
    <div className="relative w-full h-full min-h-[600px]">
      {/* Blurred stacked cards: only show on hover */}
      {hovering &&
        tabs
          .filter((_, idx) => idx !== activeIndex)
          .slice(0, 2)
          .map((tab, idx) => (
            <div
              key={`stacked-${tab.value}`}
              style={{
                top: (idx + 1) * -30,
                scale: 0.95 - idx * 0.03,
                zIndex: 5 - idx,
                filter: "blur(2px) brightness(0.8)",
                opacity: 0.8 - idx * 0.2,
              }}
              className={cn(
                "absolute top-0 left-0 w-full min-h-[400px] sm:min-h-[520px] md:min-h-[600px] rounded-3xl border-[6px] border-purple-500 dark:border-pink-600 bg-white dark:bg-black shadow-xl pointer-events-none transition-all duration-300",
                className
              )}
            />
          ))}

      {/* Active tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active.value}
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={cn(
            "absolute top-0 left-0 w-full min-h-[400px] sm:min-h-[520px] md:min-h-[600px] rounded-3xl border-[6px] border-purple-500 dark:border-pink-600 bg-white dark:bg-black shadow-xl z-10",
            className
          )}
        >
          {active.content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
