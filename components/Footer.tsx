"use client";

import React, { useState } from "react";
import { FaTwitter, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import Link from "next/link";
import localFont from "next/font/local";
import { motion, AnimatePresence } from "framer-motion";

// Load the pixel font
const pressStart2P = localFont({
  src: "../app/fonts/PressStart2P-Regular.ttf",
  display: "swap",
  variable: "--font-pressstart",
});

const Footer = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const cards = [
    {
      title: "About Us",
      content: (
        <p className="text-[10px] sm:text-xs leading-relaxed text-left text-gray-700 dark:hover:text-gray-500">
          Call Of Code is your go-to platform for coding tutorials,<br />
          challenges, and resources. Join us to explore the world<br />
          of programming and technology.
        </p>
      ),
    },
    {
      title: "Quick Links",
      content: (
        <ul className="space-y-3 text-[10px] sm:text-xs text-left">
          {[
            { href: "/about", text: "About Us" },
            { href: "/resources", text: "Projects" },
            { href: "/contact", text: "Contact" },
            { href: "/privacy", text: "Privacy Policy" },
          ].map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-gray-600 hover:text-black dark:hover:text-gray-300 transition-colors duration-300"
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
        <div className="flex justify-center gap-6 mt-2">
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
          ].map(({ Icon, href, label }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-gray-600 hover:text-black dark:hover:text-gray-300 transition-all duration-300 hover:scale-110"
            >
              <Icon className="text-2xl sm:text-3xl" />
            </a>
          ))}
        </div>
      ),
    },
  ];

  return (
    <footer
      className={`${pressStart2P.className} w-full bg-white dark:bg-black text-black dark:text-white py-12`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-8 relative">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="whitespace-nowrap text-[1rem] sm:text-3xl md:text-5xl lg:text-6xl leading-relaxed">
            &lt;CALL OF CODE&gt;
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-6 transition-all duration-300">
            A platform where coders unite to learn, build, and collaborate.
          </p>
        </div>

        {/* Cards with Hover Glow */}
        <div className="relative grid gap-8 sm:grid-cols-2 md:grid-cols-3 z-10">
          {cards.map((card, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative group transition-all duration-300"
            >
              {/* Glow behind card */}
              <AnimatePresence>
                {hoveredIndex === idx && (
                  <motion.div
                    layoutId="card-glow"
                    className="absolute inset-0 bg-black/50 dark:bg-white/15 blur-xl rounded-2xl z-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </AnimatePresence>

              {/* Card */}
              <div className="relative z-10 h-full min-h-[200px] p-4 flex flex-col justify-start border border-black dark:border-white rounded-2xl bg-white dark:bg-black/30 shadow-md transition-all duration-300 text-center sm:text-left">
                <h2 className="text-sm sm:text-base mb-2">{card.title}</h2>
                {card.content}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 text-center text-xs text-gray-500 dark:text-gray-400">
          <p className="opacity-75 hover:opacity-100 transition-opacity duration-300">
            © {new Date().getFullYear()} Call Of Code. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
