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
    // Calculate the total scrollable width dynamically
    const cardWidth = 450; // Width of each card
    const gap = 16; // Gap between cards (Tailwind's `gap-4` = 16px)
    const totalCards = cards.length;
    const viewportWidth = window.innerWidth; // Current viewport width

    const totalScrollWidth = totalCards * (cardWidth + gap) - gap; // Total width of all cards
    const finalScrollRange = totalScrollWidth - viewportWidth;

    setScrollRange(Math.max(finalScrollRange, 0)); // Ensure scroll range is not negative
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  return (
    <section
      ref={targetRef}
      className="relative h-[300vh] bg-white dark:bg-black"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div
          style={{ x }}
          className="flex gap-4"
        >
          {cards.map((card) => (
            <Card card={card} key={card.id} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card }: { card: CardType }) => {
  return (
    <div
      key={card.id}
      className="group relative h-[450px] w-[450px] overflow-hidden bg-white dark:bg-neutral-700 rounded-3xl"
    >
      <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
      ></div>
      <div className="absolute inset-0 z-10 grid place-content-center">
        <p className="bg-gradient-to-br from-white/30 to-white/0 dark:from-black/30 dark:to-black/0 p-8 text-4xl font-black text-black dark:text-white backdrop-blur-lg">
          {card.description}
        </p>
      </div>
    </div>
  );
};

export default About;

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














