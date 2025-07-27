"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Tab = {
  title: string;
  value: string;
  content?: React.ReactNode;
};

export const Tabs = ({
  tabs: propTabs,
  containerClassName,
  contentClassName,
  onTabChange,
}: {
  tabs: Tab[];
  containerClassName?: string;
  contentClassName?: string;
  onTabChange?: (index: number) => void;
}) => {
  const [active, setActive] = useState<Tab>(propTabs[0]);
  const [tabs, setTabs] = useState<Tab[]>(propTabs);
  const [hovering, setHovering] = useState(false);

  const moveSelectedTabToTop = (idx: number) => {
    if (idx < 0 || idx >= propTabs.length) return;
    const newTabs = [...propTabs];
    const selectedTab = newTabs.splice(idx, 1);
    newTabs.unshift(selectedTab[0]);
    setTabs(newTabs);
    setActive(newTabs[0]);
    onTabChange?.(idx);
  };

  return (
    <>
      <div
        className={cn(
          "flex flex-wrap sm:flex-nowrap space-x-4 sm:space-x-8 border-b border-white/20 overflow-x-auto sm:overflow-visible no-visible-scrollbar w-full",
          containerClassName
        )}
      >
        {propTabs.map((tab, idx) => (
          <button
            key={tab.value}
            onClick={() => moveSelectedTabToTop(idx)}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className="relative pb-2 text-base sm:text-lg md:text-xl font-semibold text-white transition-colors"
          >
            <span
              className={cn(
                "relative z-10 font-bold transition",
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

      <FadeInDiv
        tabs={tabs}
        active={active}
        key={active.value}
        hovering={hovering}
        className={cn("mt-10 sm:mt-14 md:mt-16", contentClassName)}
      />
    </>
  );
};

export const FadeInDiv = ({
  className,
  tabs,
  hovering,
}: {
  className?: string;
  tabs: Tab[];
  active: Tab;
  hovering?: boolean;
}) => {
  const isActive = (tab: Tab) => tab.value === tabs[0].value;

  return (
    <div className="relative w-full min-h-[400px] sm:min-h-[520px] md:min-h-[600px]">
      {tabs.map((tab, idx) => (
        <motion.div
          key={tab.value}
          layoutId={tab.value}
          style={{
            scale: 1 - idx * 0.1,
            top: hovering ? idx * -50 : 0,
            zIndex: -idx,
            opacity: idx < 3 ? 1 - idx * 0.1 : 0,
          }}
          animate={{
            y: isActive(tab) ? [0, 40, 0] : 0,
          }}
          transition={{ duration: 0.5 }}
          className={cn("w-full h-full absolute top-0 left-0", className)}
        >
          {tab.content}
        </motion.div>
      ))}
    </div>
  );
};
