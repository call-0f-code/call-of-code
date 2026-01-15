"use client";
import React, { useState } from "react";
import Image from "next/image";

export interface Person {
  id: number;
  name: string;
  image: string;
}

interface AnimatedTooltipProps {
  items: Person[];
}

export const AnimatedTooltip: React.FC<AnimatedTooltipProps> = ({ items }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <>
      <div
        className="flex items-center justify-start w-full overflow-visible flex-wrap sm:flex-row -space-x-4"
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="relative group transition-transform duration-300"
            onMouseEnter={() => setHoveredIndex(item.id)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Avatar */}
            <div
              className="rounded-full border-2 border-white dark:border-black overflow-hidden transition-all duration-300 transform group-hover:scale-110 group-hover:z-30 bg-gray-100 w-10 h-10 sm:w-14 sm:h-14 relative"
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Tooltip */}
            {hoveredIndex === item.id && (
              <div
                className="absolute -top-10 left-1/2 -translate-x-1/2 transform bg-black text-white dark:bg-white dark:text-black text-xs sm:text-base font-medium py-1 rounded-md shadow-md z-50 fade-in-tooltip pointer-events-none whitespace-nowrap"
                role="tooltip"
              >
                {item.name}
              </div>
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeInTooltip {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .fade-in-tooltip {
          animation: fadeInTooltip 0.2s ease-in-out;
        }
      `}</style>
    </>
  );
};
