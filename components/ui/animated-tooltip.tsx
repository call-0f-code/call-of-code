"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";

export interface Person {
  id: number | string;
  memberId?: string;
  name: string;
  image: string;
}

export const AnimatedTooltip = ({ items }: { items: Person[] }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | string | null>(null);
  const springConfig = { stiffness: 100, damping: 15 };
  const x = useMotionValue(0);

  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );

  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );

  const handleMouseMove = (event: React.MouseEvent<HTMLImageElement>) => {
    const target = event.target as HTMLImageElement;
    const halfWidth = target.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  return (
    <div className="flex flex-row items-center justify-start -space-x-4 overflow-visible">
      {items.map((item) => (
        <Link
          key={item.id}
          href={item.memberId ? `/members/${item.memberId}` : "#"}
          className="relative group w-fit"
        >
          <div
            onMouseEnter={() => setHoveredIndex(item.id)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence mode="popLayout">
              {hoveredIndex === item.id && (
                <div className="absolute -top-14 left-[60%] -translate-x-1/2 flex flex-col items-center justify-center z-50">

                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.6 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        type: "spring",
                        stiffness: 260,
                        damping: 10,
                      },
                    }}
                    exit={{ opacity: 0, y: 20, scale: 0.6 }}
                    style={{
                      rotate: rotate,
                      x: translateX,
                      whiteSpace: "nowrap",
                    }}
                    className="flex flex-col items-center justify-center rounded-md bg-black shadow-xl px-4 py-2 text-xs relative"
                  >
                    <div className="absolute inset-x-10 -bottom-px h-px w-[20%] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
                    <div className="absolute left-10 -bottom-px h-px w-[40%] bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
                    <div className="font-bold text-white relative z-30 text-base">
                      {item.name}
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            <img
              onMouseMove={handleMouseMove}
              src={item.image}
              alt={item.name}
              className="relative !m-0 h-14 w-14 rounded-full border-2 border-white object-cover object-top !p-0 transition duration-500 group-hover:z-30 group-hover:scale-105 cursor-pointer"
            />
          </div>
        </Link>
      ))}
    </div>
  );
};