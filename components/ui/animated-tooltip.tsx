"use client";
import React, { useState } from "react";

interface Person {
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
    <div className="flex flex-row items-center justify-start mb-4 w-full">
      {items.map((item, idx) => (
        <div
          className="relative group"
          key={item.id}
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div
            className={`object-cover !m-0 !p-0 object-top rounded-full h-14 w-14 border-2 group-hover:scale-105 group-hover:z-30 border-white relative transition duration-500 ${
              idx !== 0 ? "-ml-4" : ""
            }`}
          >
            <img
              src={item.image}
              alt={item.name}
              className="object-cover !m-0 !p-0 object-top rounded-full h-full w-full"
            />
          </div>
          
          {hoveredIndex === item.id && (
            <div className="absolute -top-16 -left-1/2 translate-x-1/2 flex text-xs flex-col items-center justify-center rounded-md bg-gray-600 z-50 shadow-xl px-4 py-2">
              <div className="absolute inset-x-10 z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px" />
              <div className="absolute left-10 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px" />
              <div className="font-bold text-white relative z-30 text-base">
                {item.name}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};