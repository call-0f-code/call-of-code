"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
  const [loadedImages, setLoadedImages] = useState<Set<number | string>>(new Set());
  const springConfig = { stiffness: 100, damping: 15 };
  const x = useMotionValue(0);

  // Shimmer animation class
  const shimmer = "bg-[linear-gradient(90deg,_#d1d5db_0%,_#e5e7eb_50%,_#d1d5db_100%)] dark:bg-[linear-gradient(90deg,_#4b5563_0%,_#6b7280_50%,_#4b5563_100%)] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]";

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

  const handleImageLoad = (itemId: number | string) => {
    setLoadedImages(prev => new Set(prev).add(itemId));
  };

  return (
    <div className="flex flex-row items-center justify-start -space-x-2 sm:-space-x-3 md:-space-x-4 overflow-visible">
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
                <div className="absolute -top-12 sm:-top-14 left-[60%] -translate-x-1/2 flex flex-col items-center justify-center z-50">

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
                    className="flex flex-col items-center justify-center rounded-md bg-black shadow-xl px-3 py-1.5 sm:px-4 sm:py-2 text-xs relative"
                  >
                    <div className="absolute inset-x-10 -bottom-px h-px w-[20%] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
                    <div className="absolute left-10 -bottom-px h-px w-[40%] bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
                    <div className="font-bold text-white relative z-30 text-sm sm:text-base">
                      {item.name}
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            <div className="relative">
              {/* Shimmer overlay while loading */}
              {!loadedImages.has(item.id) && (
                <div className={`absolute inset-0 rounded-full ${shimmer} border-[1.5px] sm:border-2 border-white dark:border-gray-200`} />
              )}
              <Image
                onMouseMove={handleMouseMove}
                src={item.image}
                alt={item.name}
                width={56}
                height={56}
                className={`relative !m-0 h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-full border-[1.5px] sm:border-2 border-white dark:border-gray-200 object-cover object-top !p-0 transition-all duration-500 group-hover:z-30 group-hover:scale-105 cursor-pointer ${loadedImages.has(item.id) ? 'opacity-100' : 'opacity-0'
                  }`}
                onLoad={() => handleImageLoad(item.id)}
              />
            </div>
            <style jsx>{`
              @keyframes shimmer {
                0% { background-position: -200% 0; }
                100% { background-position: 200% 0; }
              }
            `}</style>
          </div>
        </Link>
      ))}
    </div>
  );
};