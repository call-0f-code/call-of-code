import React from "react";
import { BackgroundLines } from "@/components/ui/background-lines";

export function HomePage() {
  return (
    <BackgroundLines className="flex items-center justify-center w-full min-h-screen p-4 sm:p-6 md:p-8 lg:p-12">
      <div className="max-w-4xl w-full space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10">
        <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-r from-red-600 via-purple-600 to-blue-500 dark:from-red-600 dark:via-purple-600 dark:to-blue-500 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-sans relative z-20 font-bold tracking-tight leading-tight">
          &lt;&gt; CALL OF CODE &lt;/&gt;
        </h2>
        <p className="max-w-xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl text-neutral-700 dark:text-neutral-400 text-center leading-relaxed">
          Welcome to Call of Code! Join us to explore, innovate, and collaborate on exciting projects while enhancing your coding skills through workshops, hackathons, and peer learning.
        </p>
      </div>
    </BackgroundLines>
  );
}