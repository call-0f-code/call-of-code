'use client';
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const About = () => {
  return (
    <div className="bg-white dark:bg-black">
      <HorizontalScrollCarousel />
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const [scrollRange, setScrollRange] = useState(0);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  useEffect(() => {
    const cardWidth = 450;
    const gap = 16;
    const totalCards = cards.length;
    const viewportWidth = window.innerWidth;
    const totalScrollWidth = totalCards * (cardWidth + gap) - gap;
    const finalScrollRange = totalScrollWidth - viewportWidth;
    setScrollRange(Math.max(finalScrollRange, 0));
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);
  
  // Add fade-in animation for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  };

  return (
    <motion.section
      ref={targetRef}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative h-[300vh] bg-white dark:bg-black"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div
          style={{ x }}
          className="flex gap-4"
        >
          {cards.map((card, index) => (
            <Card card={card} key={card.id} index={index} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

const Card = ({ card, index }: { card: CardType; index: number }) => {
  // Card animation variants
  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 50
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.2,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  // Text animation variants
  const textVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        delay: 0.2
      }
    }
  };

  return (
    <motion.div
      key={card.id}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="group relative h-[450px] w-[450px] overflow-hidden bg-white dark:bg-neutral-700 rounded-3xl"
    >
      <motion.div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 z-0"
      />
      <div className="absolute inset-0 z-10 grid place-content-center">
        <motion.p
          variants={textVariants}
          className="bg-gradient-to-br from-white/30 to-white/0 dark:from-black/30 dark:to-black/0 p-8 text-4xl font-black text-black dark:text-white backdrop-blur-lg"
        >
          {card.description}
        </motion.p>
      </div>
    </motion.div>
  );
};

type CardType = {
  url: string;
  description: string;
  id: number;
};

const cards: CardType[] = [
  {
    url: "/cartoon-students.jpg",
    description: "Innovate and Build Together",
    id: 1,
  },
  {
    url: "/cartoon-students.jpg",
    description: "Learn New Programming Paradigms",
    id: 2,
  },
  {
    url: "/cartoon-students.jpg",
    description: "Collaborate on Open Source Projects",
    id: 3,
  },
  {
    url: "/cartoon-students.jpg",
    description: "Hackathons and Coding Competitions",
    id: 4,
  },
  {
    url: "/cartoon-students.jpg",
    description: "Master Algorithms and Data Structures",
    id: 5,
  },
  {
    url: "/cartoon-students.jpg",
    description: "Explore Emerging Technologies",
    id: 6,
  },
];

export default About;