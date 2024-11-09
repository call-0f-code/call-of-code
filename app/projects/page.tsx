"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/project-card"
import { Button } from "@/components/ui/project-button"
import { Github, ExternalLink } from "lucide-react"
import {motion } from "framer-motion"

// Mock data for projects
const projects = [
  {
    id: 1,
    title: "CoC Website",
    description: "Official Website",
    github: "https://github.com/call-0f-code/call-of-code",
    live: "https://callofcode.in",
    color: "border-blue-500",
    backgroundImage : "/batman.png",
  },
  {
    id: 2,
    title: "CoC Website",
    description: "Official Website",
    github: "https://github.com/call-0f-code/call-of-code",
    color: "border-green-500",
    backgroundImage : "/batman.png",
  },
  {
    id: 3,
    title: "CoC Website",
    description: "Official Website",
    github: "https://github.com/call-0f-code/call-of-code",
    live: "https://callofcode.in",
    color: "border-purple-500",
    backgroundImage : "/batman.png",
  },
  {
    id: 4,
    title: "CoC Website",
    description: "Official Website",
    github: "https://github.com/call-0f-code/call-of-code",
    color: "border-red-500",
    backgroundImage : "/batman.png",
  },
  {
    id: 5,
    title: "CoC Website",
    description: "Official Website",
    github: "https://github.com/call-0f-code/call-of-code",
    live: "https://callofcode.in",
    color: "border-yellow-500",
    backgroundImage : "/batman.png",
    
  },
  {
    id: 6,
    title: "CoC Website",
    description: "Official Website",
    github: "https://github.com/call-0f-code/call-of-code",
    live: "https://callofcode.in",
    color: "border-green-500",
    backgroundImage : "/batman.png",
    
  },
  {
    id: 7,
    title: "CoC Website",
    description: "Official Website",
    github: "https://github.com/call-0f-code/call-of-code",
    live: "https://callofcode.in",
    color: "border-yellow-500",
    backgroundImage : "/batman.png",
    
  },
]

export default function ProjectsPage() {
  return (
    <div className="container mx-auto py-16">
      
      <div className="relative z-10 text-center">
          <motion.h1 
            className="text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            PROJECTS
          </motion.h1>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <Card backgroundImage={project.backgroundImage} key={project.id} className={`${project.color} border-2 transition-all hover:shadow-lg hover:scale-105`}>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add any additional content here if needed */}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" asChild>
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </a>
              </Button>
              {project.live && (
                <Button variant="outline" size="sm" asChild>
                  <a href={project.live} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </a>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

