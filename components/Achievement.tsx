'use client'

import { motion } from "framer-motion"
import AchievementCard from "./ui/achievement-card"

const achievements = [
  {
    title: "Winner of Hunar Intern Web Development Hackathon",
    description: (
      <>
        Developed the award-winning healthcare website, WellnessWave. <br />
        <b>Team Webwizards</b> <br/> 1.Shubham Tohake<br/>2.Shashwati Meshram
      </>
    ),
    date: "August 2024",
    imageSrc: "/Hunar.jpg",
  },
  {
    title: "BITS Pilani Postman API Hackathon 3.0",
    description: "First Runner Up Team",
    date: "November 2023",
    imageSrc: "/Hunar.jpg",
  },
  {
    title: "BITS Pilani Postman API Hackathon 3.0",
    description: "First Runner Up Team",
    date: "November 2023",
    imageSrc: "/Hunar.jpg",
  },
  {
    title: "BITS Pilani Postman API Hackathon 3.0",
    description: "First Runner Up Team",
    date: "November 2023",
    imageSrc: "/Hunar.jpg",
  },
  
];

export default function AchievementsPage() {
  return (
    <div className="relative min-h-screen w-full dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2]">
      {/* Background overlay */}
      <div className="absolute pointer-events-none inset-0 dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-10">
        <motion.h1 
          className="text-6xl text-center font-bold mb-8 bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Achievements
        </motion.h1>
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <AchievementCard
                title={achievement.title}
                description={achievement.description}
                date={achievement.date}
                imageSrc={achievement.imageSrc}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

