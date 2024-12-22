import React from "react";
import { FaTwitter, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-black dark:bg-white text-gray-300 dark:text-black py-16">
      <div className="container mx-auto px-6">
        {/* Google Fonts Import in the style tag */}
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

            .pixel-shadow {
              text-shadow: 
                2px 2px 0 #4355f3,
                4px 4px 0 #2a3af5;
              animation: textFloat 3s ease-in-out infinite;
            }

            @keyframes textFloat {
              0%, 100% {
                transform: translateY(0);
              }
              50% {
                transform: translateY(-10px);
              }
            }
          `}
        </style>

        {/* Header Section with Animation */}
        <div className="text-center mb-12 transition-all duration-700">
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-normal text-white dark:text-black pixel-shadow whitespace-nowrap"
            style={{
              fontFamily: "'Press Start 2P', cursive",
              lineHeight: "1.5"
            }}
          >
            &lt;CALL OF CODE&gt;
          </h1>
          <p className="text-xl text-gray-400 dark:text-gray-700 mt-8 transition-all duration-300 hover:text-white dark:hover:text-black">
            A platform where coders unite to learn, build, and collaborate.
          </p>
        </div>

        {/* Footer Sections */}
        <div className="space-y-16">
          {/* About Us Section */}
          <div className="transition-all duration-300 hover:transform hover:scale-105">
            <h2 className="text-lg font-bold text-white dark:text-gray-900 mb-4 text-center"
                style={{ fontFamily: "'Press Start 2P', cursive", fontSize: "1rem" }}>
              About Us
            </h2>
            <p className="text-sm text-gray-400 dark:text-gray-700 text-center">
              Call Of Code is your go-to platform for coding tutorials,
              challenges, and resources. Join us to explore the world of
              programming and technology.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h2 className="text-lg font-bold text-white dark:text-gray-900 mb-4 text-center"
                style={{ fontFamily: "'Press Start 2P', cursive", fontSize: "1rem" }}>
              Quick Links
            </h2>
            <ul className="flex flex-wrap justify-center space-x-40 text-sm">
              {[
                { href: "/about", text: "About Us" },
                { href: "/resources", text: "Projects" },
                { href: "/contact", text: "Contact" },
                { href: "/privacy", text: "Privacy Policy" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="relative group hover:text-white dark:hover:text-gray-900 transition-colors duration-300"
                  >
                    {link.text}
                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white dark:bg-gray-900 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us Section */}
          <div>
            <h2 className="text-lg font-bold text-white dark:text-gray-900 mb-4 text-center"
                style={{ fontFamily: "'Press Start 2P', cursive", fontSize: "1rem" }}>
              Follow Us
            </h2>
            <div className="flex justify-center space-x-40">
              {[
                { Icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
                { Icon: FaGithub, href: "https://github.com", label: "GitHub" },
                { Icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
                { Icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-gray-400 transition-all duration-300 hover:text-white dark:hover:text-gray-900 hover:transform hover:scale-125"
                >
                  <Icon className="text-3xl" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-16 text-center text-sm text-gray-500 dark:text-gray-600">
          <p className="transition-opacity duration-300 hover:opacity-100 opacity-75">
            © {new Date().getFullYear()} Call Of Code. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;