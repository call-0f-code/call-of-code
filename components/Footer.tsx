// components/Footer.tsx
import React from 'react';
import { FaTwitter, FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'; // Importing actual icons from react-icons

const Footer: React.FC = () => {
  return (
    <footer className="relative w-full bg-gray-900 dark:bg-white text-gray-300 dark:text-gray-900 py-6 mt-8">
      <div className="container mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h1 className="text-lg font-bold text-white dark:text-gray-900">Call Of Code</h1>
            <p className="text-sm text-gray-400 dark:text-black">Your go-to platform for all things coding.</p>
          </div>

          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 text-sm">
            <a href="/about" className="hover:text-white dark:hover:text-gray-900">About</a>
            <a href="/resources" className="hover:text-white dark:hover:text-gray-900">Resources</a>
            <a href="/contact" className="hover:text-white dark:hover:text-gray-900">Contact</a>
            <a href="/privacy" className="hover:text-white dark:hover:text-gray-900">Privacy Policy</a>
          </div>
        </div>

        <div className="flex justify-between mt-8 md:mt-6 space-x-6 items-center">
          <div className="flex space-x-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white dark:hover:text-gray-900"
            >
              <FaInstagram className="text-2xl" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white dark:hover:text-gray-900"
            >
              <FaGithub className="text-2xl" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white dark:hover:text-gray-900"
            >
              <FaLinkedin className="text-2xl" />
            </a>
          </div>

          <div className="text-center md:text-right text-sm text-gray-500 dark:text-gray-600">
            <p>© {new Date().getFullYear()} Call Of Code. All rights reserved.</p>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-16 bg-gray-900 dark:bg-white" style={{ zIndex: -1 }}></div>
    </footer>
  );
};

export default Footer;

