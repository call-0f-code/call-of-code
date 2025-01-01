"use client";

import { useEffect, useState } from "react";
import Particles from "@/components/ui/particles";
import Gopher from "./ui/gopher-eyes";

export default function Particle() {
  const [color, setColor] = useState("#000000");

  useEffect(() => {
    const updateColor = () => {
      const isDarkTheme = document.documentElement.classList.contains("dark");
      setColor(isDarkTheme ? "#ffffff" : "#000000");
    };
    updateColor();
    const observer = new MutationObserver(updateColor);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-background">
      <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-r from-red-600 via-purple-600 to-blue-500 dark:from-red-600 dark:via-purple-600 dark:to-blue-500 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-sans relative z-20 font-bold tracking-tight leading-tight mb-4 px-4">
        &lt;&gt; CALL OF CODE &lt;/&gt;
      </h2>
      <p className="max-w-xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-neutral-700 dark:text-neutral-400 text-center leading-relaxed px-4 mb-8">
        Welcome to Call of Code! Join us to explore, innovate, and collaborate
        on exciting projects while enhancing your coding skills through
        workshops, hackathons, and peer learning.
      </p>
      <div className="hidden md:block">
        <Gopher />
      </div>

      <Particles
        className="absolute inset-0"
        quantity={400}
        ease={90}
        size={1.25}
        color={color}
        refresh
      />
    </div>
  );
}
