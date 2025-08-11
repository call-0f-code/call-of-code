"use client";
import React, { useState } from "react";

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
        className="
          flex items-center justify-start 
          w-full overflow-visible
          sm:flex-row flex-wrap gap-3
        "
      >
        {items.map((item, idx) => (
          <div
            key={item.id}
            className={`relative group transition-transform duration-300
              ${idx !== 0 ? "-ml-4 sm:-ml-4 ml-0" : ""}
            `}
            onMouseEnter={() => setHoveredIndex(item.id)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Avatar */}
            <div
              className="
                rounded-full border-2 border-white dark:border-black
                overflow-hidden transition-all duration-300 transform 
                group-hover:scale-110 group-hover:z-30 bg-gray-100
                w-10 h-10 sm:w-14 sm:h-14
              "
            >
              <img
                src={item.image}
                alt={item.name}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Tooltip */}
            {hoveredIndex === item.id && (
              <div
                className="
                  absolute -top-10 left-1/2 transform -translate-x-1/2 
                  bg-black text-white dark:bg-white dark:text-black 
                  text-xs sm:text-base font-medium px-2 sm:px-3 py-1 rounded-md shadow-md 
                  z-50 fade-in-tooltip pointer-events-none whitespace-nowrap
                  sm:left-1/2 sm:translate-x-[-50%]
                "
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
