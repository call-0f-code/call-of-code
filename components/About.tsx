'use client';
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";

const About = () => {
  return (
    <div className="bg-neutral-200 dark:bg-neutral-800">
      <HorizontalScrollCarousel />
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <section
      ref={targetRef}
      className="relative h-[300vh] bg-neutral-100 dark:bg-neutral-900"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card }: { card: CardType }) => {
  return (
    <div
      key={card.id}
      className="group relative h-[450px] w-[450px] overflow-hidden bg-neutral-300 dark:bg-neutral-700"
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
    url: "/coding-difference-1.jpg",
    description: "Innovate and Build Together",
    id: 1,
  },
  {
    url: "/coding-difference-1.jpg",
    description: "Learn New Programming Paradigms",
    id: 2,
  },
  {
    url: "/coding-difference-1.jpg",
    description: "Collaborate on Open Source Projects",
    id: 3,
  },
  {
    url: "/coding-difference-1.jpg",
    description: "Hackathons and Coding Competitions",
    id: 4,
  },
  {
    url: "/coding-difference-1.jpg",
    description: "Master Algorithms and Data Structures",
    id: 5,
  },
  {
    url: "/coding-difference-1.jpg",
    description: "Explore Emerging Technologies",
    id: 6,
  },
  {
    url: "/coding-difference-1.jpg",
    description: "Build a Community of Coders",
    id: 7,
  },
];













