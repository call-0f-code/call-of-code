"use client";

import React, { useState } from "react";
import { FaTwitter, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import Link from "next/link";
import localFont from "next/font/local";
import { motion, AnimatePresence } from "framer-motion";
import Particles from "./ui/particles";
import { useTheme } from "@/components/ui/theme-provider";

const pressStart2P = localFont({
  src: "../app/fonts/PressStart2P-Regular.ttf",
  display: "swap",
  variable: "--font-pressstart",
});

const Footer = () => {
  const { theme } = useTheme();
  const particleColor = theme === "dark" ? "#ffffff" : "#000000";

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const cards = [
    {
      title: "About Us",
      content: (
        <p className="text-[9px] xs:text-[10px] sm:text-xs md:text-sm leading-relaxed text-left text-gray-700 dark:text-gray-300 dark:hover:text-gray-100">
          Call Of Code is your go-to platform for coding tutorials,
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          challenges, and resources. Join us to explore the world
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          of programming and technology.
        </p>
      ),
    },
    {
      title: "Quick Links",
      content: (
        <ul className="space-y-2 sm:space-y-3 text-[9px] xs:text-[10px] sm:text-xs md:text-sm text-left">
          {[
            { href: "#about", text: "About Us" },
            { href: "/projects", text: "Projects" },
            { href: "https://mail.google.com/mail/?view=cm&fs=1&to=callofcode07@gmail.com", text: "Contact" },
            // TODO: add `/privacy` route to display Privacy Policy
            // { href: "/privacy", text: "Privacy Policy" },  
          ].map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-gray-600 hover:text-black dark:hover:text-gray-300 transition-colors duration-300 hover:underline"
              >
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "Follow Us",
      content: (
        <div className="mt-2 sm:mt-4">
          {/* Mobile: 2x2 grid */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 sm:hidden">
            {[
              {
                Icon: FaInstagram,
                href: "https://www.instagram.com/pvpitprogrammingclub?igsh=MWswZ2kxcHpiaXF2dA==",
                label: "Instagram",
              },
              {
                Icon: FaGithub,
                href: "https://github.com/call-0f-code",
                label: "GitHub",
              },
              {
                Icon: FaLinkedin,
                href: "https://www.linkedin.com/company/callofcode/",
                label: "LinkedIn",
              },
              {
                Icon: FaTwitter,
                href: "https://x.com/call_0f_code?t=pBGojoV9Hw5LkDD7-1u0UA&s=09",
                label: "Twitter",
              },
            ].map(({ Icon, href, label }, index) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`text-gray-600 hover:text-black dark:hover:text-gray-300 transition-all duration-300 hover:scale-110 text-2xl ${
                  index % 2 === 0 ? "justify-self-end" : "justify-self-start"
                }`}
              >
                <Icon />
              </a>
            ))}
          </div>

          {/* Desktop: Original layout */}
          <div className="hidden sm:grid sm:grid-cols-2 gap-x-12 md:gap-x-16 gap-y-4">
            {[
              {
                Icon: FaInstagram,
                href: "https://www.instagram.com/pvpitprogrammingclub?igsh=MWswZ2kxcHpiaXF2dA==",
                label: "Instagram",
              },
              {
                Icon: FaGithub,
                href: "https://github.com/call-0f-code",
                label: "GitHub",
              },
              {
                Icon: FaLinkedin,
                href: "https://www.linkedin.com/company/callofcode/",
                label: "LinkedIn",
              },
              {
                Icon: FaTwitter,
                href: "https://x.com/call_0f_code?t=pBGojoV9Hw5LkDD7-1u0UA&s=09",
                label: "Twitter",
              },
            ].map(({ Icon, href, label }, index) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`text-gray-600 hover:text-black dark:hover:text-gray-300 transition-all duration-300 hover:scale-110 text-3xl md:text-4xl ${
                  index % 2 === 0 ? "justify-self-end" : "justify-self-start"
                }`}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      ),
    },
  ];

  // Responsive particle quantity based on screen size
  const getParticleQuantity = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width < 640) return 200; // Mobile
      if (width < 1024) return 300; // Tablet
      return 400; // Desktop
    }
    return 300; // Default fallback
  };

  return (
    <footer
      className={`${pressStart2P.className} relative w-full min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col overflow-hidden`}
    >
      {/* Background particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Particles 
          quantity={getParticleQuantity()} 
          color={particleColor}
          staticity={40}
          ease={25}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 md:px-8 flex-grow flex flex-col justify-evenly py-8 sm:py-12">
        
        {/* Header */}
        <div className="text-center px-2">
          <h1 className="whitespace-nowrap text-sm xs:text-base sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl leading-relaxed">
            &lt;CALL OF CODE/&gt;
          </h1>
          <p className="text-[9px] xs:text-[10px] sm:text-sm md:text-base text-gray-500 dark:text-gray-400 mt-2 sm:mt-4 transition-all duration-300 px-2">
            A platform where coders unite to learn, build, and collaborate.
          </p>
        </div>

        {/* Cards */}
        <div className="relative z-10 w-full">
          {/* Mobile: Single column */}
          <div className="grid gap-4 sm:hidden">
            {cards.map((card, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative group transition-all duration-300"
              >
                {/* Glow effect behind card */}
                <AnimatePresence>
                  {hoveredIndex === idx && (
                    <motion.div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                                 w-[120%] h-[120%] pointer-events-none z-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.3 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="w-full h-full rounded-2xl bg-black/40 dark:bg-white/20 blur-[40px]" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Card */}
                <div className="relative z-10 h-full min-h-[140px] p-4 flex flex-col justify-start 
                               border border-gray-300 dark:border-gray-600 rounded-xl 
                               bg-white dark:bg-[#111111] text-black dark:text-white 
                               transition-all duration-300 shadow-md hover:shadow-lg">
                  <h2 className="text-sm font-semibold mb-2">{card.title}</h2>
                  {card.content}
                </div>
              </div>
            ))}
          </div>

          {/* Tablet and Desktop: Multi-column */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {cards.map((card, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative group transition-all duration-300"
              >
                {/* Glow effect behind card */}
                <AnimatePresence>
                  {hoveredIndex === idx && (
                    <motion.div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                                 w-[150%] h-[150%] pointer-events-none z-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.4 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="w-full h-full rounded-3xl bg-black/50 dark:bg-white/25 blur-[60px]" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Card */}
                <div className="relative z-10 h-full min-h-[180px] lg:min-h-[200px] p-5 sm:p-6 flex flex-col justify-start 
                               border border-gray-300 dark:border-gray-600 rounded-2xl 
                               bg-white dark:bg-[#111111] text-black dark:text-white 
                               transition-all duration-300 shadow-lg hover:shadow-xl">
                  <h2 className="text-base sm:text-lg font-semibold mb-3">{card.title}</h2>
                  {card.content}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="opacity-90 flex items-center justify-center gap-2 text-[10px] xs:text-xs sm:text-sm md:text-base px-4">
          <span>Made with</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/heart.png" 
            alt="heart" 
            className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6" 
          />
          <span>by Our Members</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;