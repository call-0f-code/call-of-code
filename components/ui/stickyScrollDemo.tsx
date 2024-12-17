"use client";
import React from "react";
import { StickyScroll } from "../ui/sticky-scroll-reveal";
import Image from "next/image";

const content = [
  {
    title: "Welcome to Call of Code",
    description:
      "Call of Code, our college's official coding club, is a dynamic hub for tech enthusiasts eager to explore the world of programming. The club serves as a collaborative space where creativity and innovation come together, empowering students to master coding while building a strong community.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white bg-gradient-to-br from-cyan-500 to-emerald-500 dark:from-cyan-800 dark:to-emerald-800">
        Welcome to CALL OF CODE
      </div>
    ),
  },
  {
    title: "Igniting Passion Through Events",
    description:
      "Call of Code organizes exciting hackathons, coding contests, and interactive workshops throughout the year. These events are designed to challenge members, spark creativity, and encourage teamwork, helping students sharpen their technical and problem-solving skills.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <Image
          src="/keep-coding.webp"
          width={300}
          height={300}
          className="h-full w-full object-cover dark:opacity-90"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Learn and Grow Together",
    description:
      "With a strong focus on mentorship, Call of Code ensures every member feels supported. Whether you're a beginner or an advanced coder, you’ll benefit from expert guidance on trending topics like app development, machine learning, and competitive programming.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white bg-gradient-to-br from-orange-500 to-yellow-500 dark:from-orange-800 dark:to-yellow-800">
        Learn and Grow Together
      </div>
    ),
  },
  {
    title: "Launchpad to Success",
    description:
      "As part of Call of Code, members gain access to unique networking opportunities, industry insights, and real-world projects. The club provides a platform to enhance your resume, collaborate on groundbreaking ideas, and prepare for a successful career in tech.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white bg-gradient-to-br from-cyan-500 to-emerald-500 dark:from-cyan-800 dark:to-emerald-800">
        Running out of content
      </div>
    ),
  },
];

export function StickyScrollRevealDemo() {
  return (
    <div className="p-0 bg-white dark:bg-black transition-colors duration-300">
      <StickyScroll content={content} />
    </div>
  );
}


