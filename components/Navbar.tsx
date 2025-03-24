// components/Navbar.tsx
import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import { IconHome, IconTerminal2 } from "@tabler/icons-react";
import { Trophy, BrickWall, Users } from "lucide-react";
import LoginButton from "@/components/ui/login-button"; // Added import

export function FloatingNavbar() {
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/#home",
    },
    {
      title: "About Us",
      icon: (
        <BrickWall className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/#about",
    },
    {
      title: "Members",
      icon: (
        <Users className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/members",
    },
    {
      title: "Achievements",
      icon: (
        <Trophy className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/achievements", 
    },
    {
      title: "Projects",
      icon: (
        <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/projects",
    },
  ];

  return (
    <>
      {/* Added login button container */}
      <div className="fixed top-4 left-4 z-50">
        <LoginButton />
      </div>
      <div className="fixed bottom-4 left-4 z-50 md:bottom-14 md:left-0 md:w-full md:flex md:justify-center md:pb-4">
        <FloatingDock
          mobileClassName="flex-row space-x-2 origin-left"
          items={links}
        />
      </div>
    </>
  );
}