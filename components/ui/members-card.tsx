// components/ui/members-card.tsx
"use client"; // Required for Framer Motion

import React, { useState } from "react";
import { Github, Linkedin } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

interface MembersCardProps {
  memberId: string;
  name: string;
  imageSrc: string;
  githubLink: string;
  linkedinLink: string;
}

export default function MembersCard({
  memberId,
  name,
  imageSrc,
  githubLink,
  linkedinLink,
}: MembersCardProps) {
  const [isDesktopImageLoaded, setIsDesktopImageLoaded] = useState(false);
  const [isMobileImageLoaded, setIsMobileImageLoaded] = useState(false);

  // Shimmer animation class
  const shimmer = "bg-[linear-gradient(90deg,_#d1d5db_0%,_#e5e7eb_50%,_#d1d5db_100%)] dark:bg-[linear-gradient(90deg,_#4b5563_0%,_#6b7280_50%,_#4b5563_100%)] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]";

  // Animation variants for cleaner code
  const cardVariants = {
    rest: { scale: 1, y: 0 },
    hover: {
      y: -5,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  return (
    <div className="w-full max-w-[200px] sm:max-w-[320px] mx-auto">
      {/* Desktop Card */}
      <Link href={`/members/${memberId}`}>
        <motion.div
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          variants={cardVariants}
          className="hidden sm:block group relative overflow-hidden rounded-2xl bg-white dark:bg-black shadow-md hover:shadow-[0_0_30px_5px_rgba(236,72,153,0.3)] dark:hover:shadow-[0_0_30px_5px_rgba(168,85,247,0.3)] border border-pink-500 dark:border-purple-500 cursor-pointer"
        >
          {/* Image */}
          <div className="aspect-square overflow-hidden relative">
            {/* Skeleton shimmer while loading */}
            {!isDesktopImageLoaded && (
              <div className={`absolute inset-0 ${shimmer}`} />
            )}
            <motion.img
              src={imageSrc}
              alt={`Profile picture of ${name}`}
              className={`w-full h-full object-cover transition-opacity duration-300 ${isDesktopImageLoaded ? 'opacity-100' : 'opacity-0'}`}
              transition={{ duration: 0.3 }}
              variants={{
                hover: { scale: 1.05 },
                rest: { scale: 1 }
              }}
              loading="lazy"
              onLoad={() => setIsDesktopImageLoaded(true)}
            />
            <style jsx>{`
              @keyframes shimmer {
                0% { background-position: -200% 0; }
                100% { background-position: 200% 0; }
              }
            `}</style>
          </div>

          {/* Name + Socials */}
          <div className="p-4">
            <h3 className="font-semibold text-lg text-center text-black dark:text-white mb-3 break-words">
              {name}
            </h3>

            <div className="flex justify-center space-x-4">
              {githubLink && (
                <motion.a
                  href={githubLink}
                  target="_blank"
                  rel="noopener"
                  onClick={(e) => e.stopPropagation()}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.8 }}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-200 z-10 relative"
                >
                  <Github size={18} className="text-black dark:text-white" />
                </motion.a>
              )}
              {linkedinLink && (
                <motion.a
                  href={linkedinLink}
                  target="_blank"
                  rel="noopener"
                  onClick={(e) => e.stopPropagation()}
                  whileHover={{ scale: 1.2, rotate: -5 }}
                  whileTap={{ scale: 0.8 }}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-200 z-10 relative"
                >
                  <Linkedin size={18} className="text-black dark:text-white" />
                </motion.a>
              )}
            </div>
          </div>
        </motion.div>
      </Link>

      {/* Mobile Version - Added tap animation here too */}
      <Link href={`/members/${memberId}`}>
        <motion.div
          whileTap={{ scale: 0.95 }}
          className="block sm:hidden flex flex-col items-center gap-3 py-4 cursor-pointer"
        >
          <div className="relative w-28 h-28">
            {/* Skeleton shimmer while loading */}
            {!isMobileImageLoaded && (
              <div className={`absolute inset-0 rounded-full ${shimmer} border-4 border-pink-500 dark:border-purple-500`} />
            )}
            <Image
              src={imageSrc}
              alt={`Profile picture of ${name}`}
              width={112}
              height={112}
              className={`w-28 h-28 rounded-full object-cover shadow-md border-4 border-pink-500 dark:border-purple-500 transition-opacity duration-300 ${isMobileImageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setIsMobileImageLoaded(true)}
            />
          </div>
          <h3 className="text-center text-base font-semibold text-black dark:text-white px-4">
            {name}
          </h3>

          {/* Mobile Socials */}
          <div className="flex space-x-4">
            {/* Note: In mobile view, clicking socials might be tricky if the whole card is a link. 
                 Since the parent is a Link, we keep stopPropagation. */}
            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener"
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-900 active:scale-90 transition-transform"
              >
                <Github size={18} className="text-black dark:text-white" />
              </a>
            )}

            {linkedinLink && (
              <a
                href={linkedinLink}
                target="_blank"
                rel="noopener"
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-900 active:scale-90 transition-transform"
              >
                <Linkedin size={18} className="text-black dark:text-white" />
              </a>
            )}
          </div>
        </motion.div>
      </Link>
    </div>
  );
}