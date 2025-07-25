import React from 'react';
import { Github, Linkedin } from 'lucide-react';

interface MembersCardProps {
  name: string;
  imageSrc: string;
  githubLink: string;
  linkedinLink: string;
}

export default function MembersCard({
  name,
  imageSrc,
  githubLink,
  linkedinLink,
}: MembersCardProps) {
  return (

    <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-black shadow-md hover:shadow-[0_0_30px_5px_rgba(128,128,128,0.4)] transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-800 w-full max-w-[320px] mx-auto">
      {/* Image */}
      <div className="aspect-square overflow-hidden">
        <img
          src={imageSrc}
          alt={`Profile picture of ${name}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      {/* Name + Socials */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-center text-black dark:text-white mb-3 break-words">
          {name}
        </h3>

        <div className="flex justify-center space-x-4">
          {/* GitHub */}
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${name}'s GitHub`}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-200"
          >
            <Github size={18} className="text-black dark:text-white" />
          </a>

          {/* LinkedIn */}
          <a
            href={linkedinLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${name}'s LinkedIn`}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-200"
          >
            <Linkedin size={18} className="text-black dark:text-white" />
          </a>
        </div>
      </div>
    </div>
  );
}
