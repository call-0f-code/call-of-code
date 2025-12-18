"use client";
import { useEffect, useState } from "react";
import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/BentoCard";
import Particles from "@/components/ui/particles";
import { useTheme } from "@/components/ui/theme-provider";
import Image from "next/image";
import { Person } from "@/components/ui/animated-tooltip";
import { SkeletonLoader } from "./skeletonLoader";

interface Project {
  id: number;
  name: string;
  imageUrl: string;
  githubUrl?: string;
  deployUrl?: string;
  members?: Person[];
}

const Skeleton = ({ src, alt = "Preview" }: { src: string; alt?: string }) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <>
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover rounded-lg ${isLoading ? "hidden" : ""}`}
        onLoad={() => setIsLoading(false)}
      />
    </>
  );
};

const ProjectPage: React.FC = () => {
  const { theme } = useTheme();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects-with-members");
        const data = await res.json();
        if (data.success) {
          setProjects(data.data as Project[]);
        } else {
          console.error("Error loading project data");
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally{
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className={`relative min-h-screen w-full ${theme === "dark" ? "bg-black" : "bg-white"}`}>
      <Particles
        quantity={500}
        color={theme === "dark" ? "#ffffff" : "#000000"}
        className="absolute inset-0 z-0"
        size={1.5}
        staticity={50}
        ease={40}
      />

      <div className="relative z-10 min-h-screen">
        <header className="flex justify-center p-6">
          <Image
            src="/coc-logo.jpg"
            alt="COC Logo"
            width={80}
            height={80}
            className="rounded-md object-contain invert dark:invert-0"
          />
        </header>

        <main className="container mx-auto px-6 py-10 space-y-12">
          <h1 className="text-6xl font-extrabold tracking-wider text-center text-black dark:text-white drop-shadow-lg">
            Projects
          </h1>

          <div className="w-full bg-gray-300 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-full w-3/4 rounded-full animate-pulse" />
          </div>

          <BentoGrid>
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonLoader key={i} />
                ))
              : projects.map((project, i) => (
                  <BentoGridItem
                    key={project.id}
                    title={project.name}
                    header={<Skeleton src={project.imageUrl} alt={project.name} />}
                    github={project.githubUrl}
                    live={project.deployUrl}
                    tooltipItems={project.members?.map((member) => ({
                      id: member.id,
                      name: member.name,
                      image: member.image || "/default-avatar.png",
                    }))}
                    className={i === 3 || i === 6 ? "md:col-span-2" : ""}
                  />
                ))}
          </BentoGrid>
        </main>
      </div>
    </div>
  );
};

export default ProjectPage;
