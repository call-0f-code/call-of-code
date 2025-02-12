"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import AchievementCard from "./ui/achievement-card"

const achievements = [
  {
    title: "Winner of Hunar Intern Web Development Hackathon",
    description: "Developed the award-winning healthcare website, WellnessWave.",
    date: "August 2024",
    imageSrc: "/Hunar.jpg",
    teamMembers: [
      { name: "John Doe", image: "/batman.png" },
      { name: "Jane Smith", image: "/batman.png" },
      { name: "Vansh", image: "/vansh.jpg" },
    ],
    slideshowImages: ["/batman.png", "/vansh.jpg", "/batman.png", "/batman.png"],
  },
  {
    title: "BITS Pilani Postman API Hackathon 3.0",
    description: "First Runner Up Team",
    date: "November 2023",
    imageSrc: "/batman.png",
    teamMembers: [
      { name: "John Doe", image: "/batman.png" },
      { name: "Jane Smith", image: "/batman.png" },
      { name: "Mike Johnson", image: "/batman.png" },
    ],
    slideshowImages: ["/batman.png", "/batman.png", "/batman.png", "/batman.png"],
  },
  {
    title: "BITS Pilani Postman API Hackathon 3.0",
    description: "First Runner Up Team",
    date: "November 2023",
    imageSrc: "/batman.png",
    teamMembers: [
      { name: "John Doe", image: "/batman.png" },
      { name: "Jane Smith", image: "/batman.png" },
      { name: "Mike Johnson", image: "/batman.png" },
      { name: "Mike Johnson", image: "/batman.png" },
    ],
    slideshowImages: ["/batman.png", "/batman.png", "/batman.png", "/batman.png"],
  },
  {
    title: "BITS Pilani Postman API Hackathon 3.0",
    description: "First Runner Up Team",
    date: "November 2023",
    imageSrc: "/batman.png",
    teamMembers: [
      { name: "John Doe", image: "/batman.png" },
      { name: "Jane Smith", image: "/batman.png" },
      { name: "Mike Johnson", image: "/batman.png" },
    ],
    slideshowImages: ["/batman.png", "/vansh.jpg", "/batman.png", "/batman.png"],
  },
  {
    title: "BITS Pilani Postman API Hackathon 3.0",
    description: "First Runner Up Team",
    date: "November 2023",
    imageSrc: "/batman.png",
    teamMembers: [
      { name: "John Doe", image: "/batman.png" },
      { name: "Jane Smith", image: "/batman.png" },
      { name: "Mike Johnson", image: "/batman.png" },
    ],
    slideshowImages: ["/batman.png", "/batman.png", "/batman.png", "/batman.png"],
  },
  {
    title: "BITS Pilani Postman API Hackathon 3.0",
    description: "First Runner Up Team",
    date: "November 2023",
    imageSrc: "/batman.png",
    teamMembers: [
      { name: "John Doe", image: "/batman.png" },
      { name: "Jane Smith", image: "/batman.png" },
      { name: "Mike Johnson", image: "/batman.png" },
    ],
    slideshowImages: ["/batman.png", "/batman.png", "/batman.png", "/batman.png"],
  },
  {
    title: "BITS Pilani Postman API Hackathon 3.0",
    description: "First Runner Up Team",
    date: "November 2023",
    imageSrc: "/batman.png",
    teamMembers: [
      { name: "John Doe", image: "/batman.png" },
      { name: "Jane Smith", image: "/batman.png" },
      { name: "Mike Johnson", image: "/batman.png" },
    ],
    slideshowImages: ["/batman.png", "/batman.png", "/batman.png", "/batman.png"],
  },
  {
    title: "BITS Pilani Postman API Hackathon 3.0",
    description: "First Runner Up Team",
    date: "November 2023",
    imageSrc: "/batman.png",
    teamMembers: [
      { name: "John Doe", image: "/batman.png" },
      { name: "Jane Smith", image: "/batman.png" },
      { name: "Mike Johnson", image: "/batman.png" },
    ],
    slideshowImages: ["/batman.png", "/batman.png", "/batman.png", "/batman.png"],
  },
  {
    title: "BITS Pilani Postman API Hackathon 3.0",
    description: "First Runner Up Team",
    date: "November 2023",
    imageSrc: "/batman.png",
    teamMembers: [
      { name: "John Doe", image: "/batman.png" },
      { name: "Jane Smith", image: "/batman.png" },
      { name: "Mike Johnson", image: "/batman.png" },
    ],
    slideshowImages: ["/batman.png", "/batman.png", "/batman.png", "/batman.png"],
  },
  {
    title: "BITS Pilani Postman API Hackathon 3.0",
    description: "First Runner Up Team",
    date: "November 2023",
    imageSrc: "/batman.png",
    teamMembers: [
      { name: "John Doe", image: "/batman.png" },
      { name: "Jane Smith", image: "/batman.png" },
      { name: "Mike Johnson", image: "/batman.png" },
    ],
    slideshowImages: ["/batman.png", "/batman.png", "/batman.png", "/batman.png"],
  },
]
export default function AchievementsPage() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Function to handle card expansion
  const handleCardExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="relative min-h-screen w-full dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2]">
      {/* Background overlay */}
      <div className="absolute pointer-events-none inset-0 dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-10">
        <motion.h1
          className="text-6xl text-center font-bold mb-12 bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Achievements
        </motion.h1>

        <div className="relative">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className={`relative ${
                  expandedIndex === index 
                    ? "z-50" 
                    : expandedIndex !== null 
                    ? "opacity-50" 
                    : "z-0"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={expandedIndex === index ? "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" : ""}>
                  <AchievementCard
                    {...achievement}
                    isExpanded={expandedIndex === index}
                    onExpand={() => handleCardExpand(index)}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
