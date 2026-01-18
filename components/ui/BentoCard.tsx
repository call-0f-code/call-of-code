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
      className={`grid auto-rows-auto sm:auto-rows-[20rem] md:auto-rows-[22rem] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 max-w-7xl mx-auto ${className || ""}`}
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
      className={`relative transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${isHovered ? "z-50" : "z-0"
        } ${className || ""}`}
    >
      {/* Gradient Border */}
      <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 p-[2px] rounded-xl h-full w-full shadow-lg">
        {/* Actual Card */}
        <div
          className="rounded-xl p-3 sm:p-4 h-full w-full bg-white dark:bg-black border border-transparent shadow-lg dark:shadow-purple-500/10 flex flex-col overflow-visible relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Header Image Container */}
          <div className="relative w-full aspect-video sm:aspect-[4/3] md:flex-1 rounded-lg overflow-hidden mb-3 sm:mb-4">
            {header}

            {/* Desktop Hover Overlay */}
            <div
              className={`hidden md:flex absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent items-center justify-center gap-4 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"
                }`}
            >
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-all duration-200 transform hover:scale-110 hover:rotate-12"
                  aria-label="View on GitHub"
                >
                  <Github className="w-6 h-6 text-white drop-shadow-lg" />
                </a>
              )}
              {live && (
                <a
                  href={live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-all duration-200 transform hover:scale-110 hover:rotate-12"
                  aria-label="View Live Demo"
                >
                  <ExternalLink className="w-6 h-6 text-white drop-shadow-lg" />
                </a>
              )}
            </div>

            {/* Mobile/Tablet Always-Visible Buttons */}
            <div className="md:hidden absolute bottom-2 right-2 flex gap-2">
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-white/90 dark:bg-black/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 border border-white/20"
                  aria-label="View on GitHub"
                >
                  <Github className="w-5 h-5 text-gray-800 dark:text-white" />
                </a>
              )}
              {live && (
                <a
                  href={live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-white/90 dark:bg-black/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 border border-white/20"
                  aria-label="View Live Demo"
                >
                  <ExternalLink className="w-5 h-5 text-gray-800 dark:text-white" />
                </a>
              )}
            </div>
          </div>

          {/* Title & Members Section */}
          <div className="flex flex-col gap-2 sm:gap-3">
            {/* Title */}
            <h3 className="font-sans font-bold text-neutral-800 dark:text-neutral-100 text-base sm:text-lg md:text-xl leading-snug line-clamp-2">
              {title}
            </h3>

            {/* Members */}
            {tooltipItems && tooltipItems.length > 0 ? (
              <div className="flex overflow-visible">
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
