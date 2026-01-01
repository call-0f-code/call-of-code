// components/portfolio/PortfolioProjects.tsx
"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Star, GitFork, Code } from "lucide-react";
import { useState } from "react";

interface Project {
  id: number;
  name: string;
  imageUrl: string | null;
  githubUrl: string | null;
  deployUrl: string | null;
}

interface GithubRepo {
  name: string;
  description: string;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
  url: string;
}

// Card for GitHub pinned repositories
function GithubRepoCard({ repo }: { repo: GithubRepo }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateXValue = ((y - centerY) / centerY) * -5;
    const rotateYValue = ((x - centerX) / centerX) * 5;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block perspective-1000"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="relative h-full min-h-[220px] rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 backdrop-blur-xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 p-6"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX,
          rotateY,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* GitHub Badge */}
        <div className="absolute top-4 right-4">
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-purple-500/20 border border-purple-500/30">
            <Github className="w-3 h-3 text-purple-400" />
            <span className="text-xs font-semibold text-purple-400">Pinned</span>
          </div>
        </div>

        <div className="space-y-4">
          {/* Repo Name */}
          <h3 className="text-xl font-bold text-white pr-20 group-hover:text-purple-400 transition-colors">
            {repo.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
            {repo.description || "No description available"}
          </p>

          {/* Language Badge */}
          {repo.primaryLanguage && (
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: repo.primaryLanguage.color }}
              />
              <span className="text-xs text-gray-500">{repo.primaryLanguage.name}</span>
            </div>
          )}

          {/* Stats */}
          <div className="flex items-center gap-4 pt-2">
            <div className="flex items-center gap-1.5 text-gray-400 group-hover:text-yellow-400 transition-colors">
              <Star className="w-4 h-4" />
              <span className="text-sm font-medium">{repo.stargazerCount}</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-400 group-hover:text-blue-400 transition-colors">
              <GitFork className="w-4 h-4" />
              <span className="text-sm font-medium">{repo.forkCount}</span>
            </div>
          </div>
        </div>

        {/* Hover Indicator */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <ExternalLink className="w-5 h-5 text-purple-400" />
        </div>
      </motion.div>
    </motion.a>
  );
}

// Card for internal API projects
function InternalProjectCard({ project }: { project: Project }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateXValue = ((y - centerY) / centerY) * -8;
    const rotateYValue = ((x - centerX) / centerX) * 8;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      className="group perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="relative h-full min-h-[400px] rounded-2xl overflow-hidden bg-zinc-900/50 backdrop-blur-xl border border-white/10 hover:border-pink-500/50 transition-all duration-300"
        animate={{
          rotateX,
          rotateY,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Project Image */}
        <div className="absolute inset-0">
          {project.imageUrl ? (
            <img
              src={project.imageUrl}
              alt={project.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-blue-500/20 flex items-center justify-center">
              <Code className="w-24 h-24 text-white/20" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
        </div>

        {/* Content */}
        <div
          className="absolute bottom-0 left-0 right-0 p-6 z-10"
          style={{ transform: "translateZ(50px)" }}
        >
          <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-pink-400 transition-colors">
            {project.name}
          </h3>

          <div className="flex gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all duration-300 group/btn"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
                <span className="text-sm font-medium">Code</span>
              </a>
            )}
            {project.deployUrl && (
              <a
                href={project.deployUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-300 group/btn"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                <span className="text-sm font-medium">Live Demo</span>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function PortfolioProjects({ 
  projects,
  githubRepos = [],
}: { 
  projects: Project[];
  githubRepos?: GithubRepo[];
}) {
  const hasGithubRepos = githubRepos && githubRepos.length > 0;
  const hasInternalProjects = projects && projects.length > 0;

  if (!hasGithubRepos && !hasInternalProjects) {
    return null;
  }

  return (
    <div className="space-y-12">
      {/* GitHub Pinned Repositories */}
      {hasGithubRepos && (
        <div>
          <div className="flex items-center gap-3 mb-8">
            <Github className="w-6 h-6 text-purple-400" />
            <h3 className="text-2xl font-bold text-white">Pinned Repositories</h3>
            <div className="flex-1 h-px bg-gradient-to-r from-purple-500/50 to-transparent" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {githubRepos.map((repo, index) => (
              <GithubRepoCard key={index} repo={repo} />
            ))}
          </div>
        </div>
      )}

      {/* Internal Projects */}
      {hasInternalProjects && (
        <div>
          <div className="flex items-center gap-3 mb-8">
            <Code className="w-6 h-6 text-pink-400" />
            <h3 className="text-2xl font-bold text-white">Call Of Code Projects</h3>
            <div className="flex-1 h-px bg-gradient-to-r from-pink-500/50 to-transparent" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <InternalProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}