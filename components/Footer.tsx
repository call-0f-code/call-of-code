import React from "react";
import { FaTwitter, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import Link from "next/link";
import localFont from "next/font/local";

// Load the font from app/fonts
const pressStart2P = localFont({
  src: "../app/fonts/PressStart2P-Regular.ttf",
  display: "swap",
  variable: "--font-pressstart",
});

const Footer = () => {
  return (
    <>
      <footer className={`${pressStart2P.className} w-full bg-white dark:bg-black text-gray-300 dark:text-white py-12`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          {/* Header Section */}
          <div className="overflow-x-auto text-center mb-10">
            <h1 className="whitespace-nowrap text-[1rem] sm:text-3xl md:text-5xl lg:text-6xl text-black dark:text-white leading-relaxed">
              &lt;CALL OF CODE&gt;
            </h1>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-6 hover:text-black dark:hover:text-white transition-all duration-300">
              A platform where coders unite to learn, build, and collaborate.
            </p>
          </div>

          {/* Footer Sections */}
          <div className="space-y-12">
            {/* About Us Section */}
            <div className="hover:scale-105 transition-transform duration-300">
              <h2 className="text-base sm:text-lg text-black dark:text-gray-400 mb-3 text-center">
                About Us
              </h2>
              <p className="text-[0.5rem] sm:text-xs text-gray-800 dark:text-gray-400 text-center">
                Call Of Code is your go-to platform for coding tutorials,
                challenges, and resources. Join us to explore the world of
                programming and technology.
              </p>
            </div>

            {/* Quick Links Section */}
            <div>
              <h2 className="text-base sm:text-lg text-black dark:text-gray-400 mb-4 text-center">
                Quick Links
              </h2>
              <ul className="flex flex-wrap justify-center gap-10 text-xs sm:text-sm">
                {[
                  { href: "/about", text: "About Us" },
                  { href: "/resources", text: "Projects" },
                  { href: "/contact", text: "Contact" },
                  { href: "/privacy", text: "Privacy Policy" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="relative group text-black dark:text-white dark:hover:text-gray-400 transition-colors duration-300"
                    >
                      {link.text}
                      <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-black dark:bg-gray-400 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Follow Us Section */}
            <div>
              <h2
                className="text-base sm:text-lg text-black dark:text-gray-400 mb-4 text-center">
                Follow Us
              </h2>
              <div className="flex justify-center space-x-6">
                {[
                  { Icon: FaInstagram, href: "https://www.instagram.com/pvpitprogrammingclub?igsh=eGhnN2MzMjA1MXVz", label: "Instagram" },
                  { Icon: FaGithub, href: "https://github.com/call-0f-code", label: "GitHub" },
                  { Icon: FaLinkedin, href: "https://www.linkedin.com/company/callofcode/", label: "LinkedIn" },
                  { Icon: FaTwitter, href: "https://x.com/call_0f_code?t=pBGojoV9Hw5LkDD7-1u0UA&s=09", label: "Twitter" },
                ].map(({ Icon, href, label }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-gray-900 dark:text-gray-400 transition-all duration-300 hover:text-black dark:hover:text-white hover:scale-125"
                  >
                    <Icon className="text-2xl sm:text-3xl" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Bottom Section */}
          <div className="mt-14 text-center text-sm sm:text-base text-gray-600 dark:text-gray-500">  
            <p className="transition-opacity duration-300 hover:opacity-100 opacity-75">
              © {new Date().getFullYear()} Call Of Code. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
