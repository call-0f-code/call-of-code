"use client"
import { motion } from "framer-motion"
import { StickyScroll } from "../ui/sticky-scroll-reveal"
import { Code, Terminal, Database, Cpu } from "lucide-react"

const content = [
  {
    title: "Master the Code",
    description:
      "Dive into the world of programming with our comprehensive learning paths. From web development to algorithms, we cover everything you need to become a proficient developer in today's tech landscape.",
    content: (
      <div className="relative h-full w-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-8">
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="h-full w-full bg-[url('/grid.svg')] opacity-20" />
        </motion.div>
        <motion.div
          className="relative h-full w-full flex flex-col items-center justify-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Code className="w-20 h-20 text-blue-300 mb-6" />
          <div className="space-y-2 text-center">
            <h3 className="text-2xl font-bold text-blue-700 dark:text-white text-blue-800">{"<Code />"}</h3>
            <p className="text-blue-200/80 dark:text-blue-200/80 text-blue-800/80 text-sm">Master modern programming</p>
          </div>
        </motion.div>
      </div>
    ),
  },
  {
    title: "Command Line Mastery",
    description:
      "Learn to harness the power of the command line interface. Our advanced terminal workshops will teach you essential DevOps skills, shell scripting, and automation techniques used by professional developers.",
    content: (
      <div className="relative h-full w-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 p-8">
        <motion.div
          className="h-full w-full flex flex-col items-center justify-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Terminal className="w-20 h-20 text-indigo-300 mb-6" />
          <motion.div
            className="text-center space-y-2"
            animate={{
              opacity: [1, 0.8, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
            }}
          >
            <h3 className="text-2xl font-mono text-gray dark:text-white text-gray-800">&gt;_</h3>
            <p className="text-indigo-200/80 dark:text-indigo-200/80 text-indigo-800/80 text-sm">Terminal expertise</p>
          </motion.div>
        </motion.div>
      </div>
    ),
  },
  {
    title: "Database Design",
    description:
      "Explore the fundamentals of database architecture and management. Learn how to design efficient schemas, optimize queries, and master both SQL and NoSQL databases for building scalable applications.",
    content: (
      <div className="relative h-full w-full bg-gradient-to-br from-green-500/10 to-blue-500/10 p-8">
        <motion.div className="h-full w-full flex flex-col items-center justify-center" whileHover={{ scale: 1.02 }}>
          <motion.div
            animate={{
              rotateY: [0, 360],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            <Database className="w-20 h-20 text-green-300 mb-6" />
          </motion.div>
          <div className="space-y-2 text-center">
            <h3 className="text-2xl font-bold text-green-700 dark:text-white text-green-800">DB</h3>
            <p className="text-green-200/80 dark:text-green-200/80 text-green-800/80 text-sm">Data architecture</p>
          </div>
        </motion.div>
      </div>
    ),
  },
  {
    title: "System Architecture",
    description:
      "Learn to design and implement robust system architectures. Understand microservices, distributed systems, and cloud computing principles to build scalable and resilient applications.",
    content: (
      <div className="relative h-full w-full bg-gradient-to-br from-pink-500/10 to-purple-500/10 p-8">
        <motion.div
          className="h-full w-full flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{
              y: [-10, 10],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <Cpu className="w-20 h-20 text-pink-300 mb-6" />
          </motion.div>
          <div className="space-y-2 text-center">
            <h3 className="text-2xl font-bold text-pink-700 dark:text-white text-pink-800">Systems</h3>
            <p className="text-pink-200/80 dark:text-pink-200/80 text-pink-500 text-sm">Build at scale</p>
          </div>
        </motion.div>
      </div>
    ),
  },
]

export default function EnhancedStickyScrollDemo() {
  return (
    <div className="bg-gray-100 dark:bg-slate-950">
      <StickyScroll
        content={content}
        contentClassName="bg-white/50 dark:bg-slate-900/50 backdrop-blur-lg ring-1 dark:ring-slate-700/50 ring-gray-200/50 shadow-lg dark:shadow-slate-900/50 shadow-gray-200/50"
      />
    </div>
  )
}

