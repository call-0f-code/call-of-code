"use client";
import React, { useState } from "react";
import { Github, ExternalLink } from "lucide-react";
import { AnimatedTooltip, Person } from "./animated-tooltip";
import { MemberSkeleton } from "@/app/projects/skeletonLoader";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={`grid md:auto-rows-[22rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ${className || ""}`}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  header,
  github,
  live,
  tooltipItems,
}: {
  className?: string;
  title?: string | React.ReactNode;
  header?: React.ReactNode;
  github?: string;
  live?: string;
  tooltipItems?: Array<Person>;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl ${
        isHovered ? "z-50" : "z-0"
      } ${className || ""}`}
    >
      {/* Gradient Border */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-[2px] rounded-xl h-full w-full">
        {/* Actual Card */}
        <div
          className="rounded-xl p-4 h-full w-full bg-white dark:bg-black border border-transparent shadow-input dark:shadow-none flex flex-col space-y-4 overflow-visible relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Header Image */}
          <div className="relative h-full w-full rounded-lg overflow-hidden">
            {header}
            {/* Overlay Buttons */}
            <div
              className={`absolute inset-0 bg-black/50 flex items-center justify-center gap-4 transition-opacity duration-300 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-200 transform hover:scale-110"
                >
                  <Github className="w-6 h-6 text-white" />
                </a>
              )}
              {live && (
                <a
                  href={live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-200 transform hover:scale-110"
                >
                  <ExternalLink className="w-6 h-6 text-white" />
                </a>
              )}
            </div>
          </div>

          {/* Title & Tooltip */}
          <div className="transition duration-200 relative overflow-visible">
            <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2 text-xl">
              {title}
            </div>
            {tooltipItems && tooltipItems.length > 0 ? (
              <div className="mt-2 flex justify-end overflow-visible ">
                <AnimatedTooltip items={tooltipItems} />
              </div>
            ) : (
              <MemberSkeleton />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
