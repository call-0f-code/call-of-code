"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useScroll } from "framer-motion"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string
    description: string
    content?: React.ReactNode
  }[]
  contentClassName?: string
}) => {
  const [activeCard, setActiveCard] = useState(0)
  const { scrollY } = useScroll()

  useEffect(() => {
    const handleScroll = () => {
      const sectionHeight = window.innerHeight * 0.7
      const newIndex = Math.min(Math.floor(window.scrollY / sectionHeight), content.length - 1)
      setActiveCard(newIndex)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [content.length])

  const backgrounds = {
    light: [
      "linear-gradient(to bottom right, #E6F0FF, #B3D9FF)",
      "linear-gradient(to bottom right, #F0E6FF, #D9B3FF)",
      "linear-gradient(to bottom right, #E6FFE6, #B3FFB3)",
      "linear-gradient(to bottom right, #FFE6E6, #FFB3B3)",
    ],
    dark: [
      "linear-gradient(to bottom right, #E6F0FF, #B3D9FF)",
      "linear-gradient(to bottom right, #F0E6FF, #D9B3FF)",
      "linear-gradient(to bottom right, #E6FFE6, #B3FFB3)",
      "linear-gradient(to bottom right, #FFE6E6, #FFB3B3)",
    ],
  }

  return (
    <motion.div
      className={cn(
        "min-h-screen flex justify-center relative space-x-10 p-12 transition-colors duration-500 bg-cover bg-center",
        "text-gray-800 dark:text-white",
      )}
      data-theme-bg={backgrounds.dark[activeCard % backgrounds.dark.length]}
      style={{
        background: `var(--sticky-scroll-bg, ${[activeCard % backgrounds.light.length]})`,
      }}
    >
      <style jsx global>{`
        [data-theme='dark'] .min-h-screen {
          --sticky-scroll-bg: var(--theme-bg) !important;
        }
        .min-h-screen {
          --theme-bg: attr(data-theme-bg);
        }
      `}</style>
      <div className="relative flex flex-col items-start px-8 max-w-3xl">
        {content.map((item, index) => (
          <div key={item.title + index} className="my-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: activeCard === index ? 1 : 0.4,
                y: activeCard === index ? 0 : 10,
              }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              <motion.h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                {item.title}
              </motion.h2>
              <motion.p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                {item.description}
              </motion.p>
              <motion.div className="h-1 w-20 rounded-full bg-gray-300 dark:bg-gray-700" />
            </motion.div>
          </div>
        ))}
      </div>
      <motion.div
        className={cn(
          "hidden lg:block h-96 w-[28rem] rounded-xl sticky top-32 overflow-hidden backdrop-blur-xl border-2",
          "border-black/10 dark:border-white/20 bg-white/70 dark:bg-black/30",
          contentClassName,
        )}
      >
        <div className="relative h-full flex items-center justify-center">
          {content[activeCard]?.content ?? null}
        </div>
      </motion.div>
    </motion.div>
  )
}