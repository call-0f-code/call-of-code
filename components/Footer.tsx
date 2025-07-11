import React from "react";
import { FaTwitter, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import Head from "next/head";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
        />
      </Head>
      <footer className="w-full bg-white dark:bg-black text-gray-300 dark:text-white py-16">
        <div className="container mx-auto px-6">
          {/* Header Section with Animation */}
          <div className="text-center mb-12 transition-all duration-700">
            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-normal text-black dark:text-white pixel-shadow whitespace-nowrap"
              style={{
                fontFamily: "'Press Start 2P', cursive",
                lineHeight: "1.5",
              }}
            >
              &lt;CALL OF CODE&gt;
            </h1>
            <p className="text-xl text-gray-400 dark:text-gray-700 mt-8 transition-all duration-300 hover:text-black dark:hover:text-white">
              A platform where coders unite to learn, build, and collaborate.
            </p>
          </div>

          {/* Footer Sections */}
          <div className="space-y-16">
            {/* About Us Section */}
            <div className="transition-all duration-300 hover:transform hover:scale-105">
              <h2
                className="text-lg font-bold text-black dark:text-gray-400 mb-4 text-center"
                style={{ fontFamily: "'Press Start 2P', cursive", fontSize: "1rem" }}
              >
                About Us
              </h2>
              <p 
                className="text-sm text-gray-800 dark:text-gray-400 text-center"
                style={{ fontFamily: "'Press Start 2P', cursive", fontSize: "0.5rem" }}
              >
                Call Of Code is your go-to platform for coding tutorials,
                challenges, and resources. Join us to explore the world of
                programming and technology.
              </p>
            </div>

            {/* Quick Links Section */}
            <div>
              <h2
                className="text-lg font-bold text-black dark:text-gray-400 mb-4 text-center"
                style={{ fontFamily: "'Press Start 2P', cursive", fontSize: "1rem" }}
              >
                Quick Links
              </h2>
              <ul className="flex flex-wrap justify-center space-x-8 text-sm">
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
                className="text-lg font-bold text-black dark:text-gray-400 mb-4 text-center"
                style={{ fontFamily: "'Press Start 2P', cursive", fontSize: "1rem" }}
              >
                Follow Us
              </h2>
              <div className="flex justify-center space-x-8">
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
                    className="text-gray-900 dark:text-gray-400 transition-all duration-300 hover:text-black dark:hover:text-white hover:transform hover:scale-125"
                  >
                    <Icon className="text-3xl" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Bottom Section */}
          <div className="mt-16 text-center text-sm text-gray-600 dark:text-gray-500">
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
