"use client";

import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import HeroSection from "@/components/Home";
import AboutUs from "@/components/About";
import Particles from "@/components/ui/particles";
import { useTheme } from "@/components/ui/theme-provider"; 

export default function Main() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; 

  const particleColor = theme === "dark" ? "#ffffff" : "#000000";

  return (
    <div className="relative bg-white dark:bg-black text-black dark:text-white">
      {/* Background particles */}
      <Particles
        quantity={400}
        className="fixed inset-0 z-0"
        color={particleColor}
      />

      {/* Content above particles */}
      <div className="relative z-10">
        <HeroSection />
        <AboutUs />
        <footer className="bg-white dark:bg-black text-gray-900 dark:text-gray-100 py-4 border-t border-gray-300 dark:border-gray-700">
          <div className="container mx-auto">
            <Footer />
          </div>
        </footer>
      </div>
    </div>
  );
}
