// components/scroll-to-top.tsx
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // 1. Try scrolling the window (standard behavior)
    window.scrollTo(0, 0);

    // 2. If you have a scrolling container (e.g., a div with overflow-y-scroll), 
    // you need to scroll THAT element to top. 
    // Replace 'main-scroll-container' with the ID of your scrolling div if window.scrollTo doesn't work.
    const scrollableDiv = document.getElementById("main-scroll-container");
    if (scrollableDiv) {
      scrollableDiv.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}