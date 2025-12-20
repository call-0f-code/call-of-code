"use client";

import { useState, useEffect, useRef } from "react";
import { Tabs } from "./ui/tabs";
import MembersCard from "./ui/members-card";
import Image from "next/image";
import { motion } from "framer-motion";
import Particles from "./ui/particles";
import { useTheme } from "@/components/ui/theme-provider";
import { cn } from "@/lib/utils";
import MemberSkeletonCard from "./ui/member-skeleton-card";

type Member = {
  name: string;
  profilePhoto?: string;
  github: string;
  linkedin: string;
  passoutYear: number;
  isApproved: boolean;
};

type DisplayMember = {
  name: string;
  imageSrc: string;
  githubLink: string;
  linkedinLink: string;
};

const TabProgressBar = ({ index, total }: { index: number; total: number }) => {
  const barWidth = 100 / total;

  return (
    <div className="relative w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
      <div className="relative w-full h-full">
        <motion.div
          className="absolute h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
          initial={false}
          animate={{ left: `${index * barWidth}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          style={{ width: `${barWidth}%` }}
        />
      </div>
    </div>
  );
};

const MembersSkeletonGrid = () => {
  return (
    <div className="relative rounded-3xl border-[6px] border-purple-500 dark:border-pink-600 bg-white dark:bg-black shadow-xl min-h-[600px] p-6">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
        {Array.from({ length: 8 }).map((_, i) => (
          <MemberSkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
};


const MemberGrid = ({
  members,
  isFounder = false,
}: {
  members: DisplayMember[];
  isFounder?: boolean;
}) => {
  const isCompact = members.length < 4;

  return (
    <div
      className={cn(
        "relative rounded-2xl shadow-xl border border-gray-300 dark:border-gray-700 min-h-[820px] flex items-center justify-center",
        isFounder ? "p-0" : "p-6"
      )}
    >
      {isCompact ? (
        <div className="flex flex-wrap justify-center items-center gap-10">
          {members.map((member, index) => (
            <div
              key={index}
              className={cn(
                "w-full",
                isFounder ? "sm:w-[440px]" : "sm:w-[320px]"
              )}
            >
              <MembersCard
                name={member.name}
                imageSrc={member.imageSrc}
                githubLink={member.githubLink}
                linkedinLink={member.linkedinLink}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
          {members.map((member, index) => (
            <div key={index} className="w-full sm:w-[300px]">
              <MembersCard
                name={member.name}
                imageSrc={member.imageSrc}
                githubLink={member.githubLink}
                linkedinLink={member.linkedinLink}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function MembersPage() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const { theme } = useTheme();
  const tabTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [presentMembers, setPresentMembers] = useState<DisplayMember[]>([]);
  const [superSeniors, setSuperSeniors] = useState<DisplayMember[]>([]);
  const [founders, setFounders] = useState<DisplayMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [tabLoading, setTabLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleTabChange = (idx: number) => {
    setActiveTabIndex(idx);
    setTabLoading(true);

    if (tabTimeoutRef.current) {
      clearTimeout(tabTimeoutRef.current);
    }

    tabTimeoutRef.current = setTimeout(() => {
      setTabLoading(false);
      tabTimeoutRef.current = null;
    }, 500);

  };

  useEffect(() => {
    return () => {
      if (tabTimeoutRef.current) {
        clearTimeout(tabTimeoutRef.current);
      }
    };
  }, []);

  

  useEffect(() => {
    const abortController = new AbortController();
    setLoading(true);
    setError(false);

    const fetchMembers = async () => {
      try {
        const res = await fetch("/api/members", {
          signal: abortController.signal,
        });
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await res.json();

        const rawData: Member[] = Array.isArray(result.data) ? result.data : [];

        if (!result.success) {
          throw new Error("Invalid API response");
        }

        if (rawData.length === 0) {
          setFounders([]);
          setSuperSeniors([]);
          setPresentMembers([]);
          return;
        }

        const currentYear = new Date().getFullYear();

        const approved = rawData.filter((m) => m.isApproved);

        const format = (m: Member): DisplayMember => ({
          name: m.name,
          imageSrc: m.profilePhoto ?? "/fallback.jpg",
          githubLink: m.github ?? "",
          linkedinLink: m.linkedin ?? "",
        });

        const foundersList = approved
          .filter((m) => new Date(m.passoutYear).getFullYear() === 2024)
          .map(format);

        const superSeniorsList = approved
          .filter((m) => new Date(m.passoutYear).getFullYear() === currentYear)
          .map(format);

        const presentList = approved
          .filter((m) => new Date(m.passoutYear).getFullYear() > currentYear)
          .map(format);

        setFounders(foundersList);
        setSuperSeniors(superSeniorsList);
        setPresentMembers(presentList);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }
        console.error("Failed to fetch members", err);
        setError(true);
      } finally{
        setTimeout(() => {
          setLoading(false);
      }, 1000);
      }
    };

    fetchMembers();

    return () => {
      abortController.abort();
    };
  }, []);


  const MembersEmptyState = ({ message }: { message: string }) => (
    <div className="flex items-center justify-center py-40">
      <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
        <svg
          className="h-11 w-11 opacity-80"
          fill="none"
          stroke="url(#purplePinkGradient)"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <defs>
            <linearGradient id="purplePinkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        <p className="text-3xl font-semibold tracking-wide">
          {message}
        </p>
      </div>
    </div>
  );


  const renderMembersTab = (members: DisplayMember[], isFounder = false) => {
    if (loading || tabLoading) {
      return <MembersSkeletonGrid />;
    }

    if (error) {
      return <MembersEmptyState message="Failed to load members" />;
    }

    if (members.length === 0) {
      return <MembersEmptyState message="No members found" />;
    }

    return <MemberGrid members={members} isFounder={isFounder} />;
  };


  const tabs = [
    {
      title: "Present Members",
      value: "present",
      content: renderMembersTab(presentMembers),
    },
    {
      title: "Super Seniors",
      value: "seniors",
      content: renderMembersTab(superSeniors),
    },
    {
      title: "Founders",
      value: "founders",
      content: renderMembersTab(founders, true),
    },
  ];


  return (
    <div>
      <div
        className={`relative min-h-screen w-full h-full ${
          theme === "dark" ? "bg-black" : "bg-white"
        }`}
      >
        <Particles
          quantity={500}
          color={theme === "dark" ? "#ffffff" : "#000000"}
          className="fixed inset-0 z-0 h-full w-full"
          size={1.5}
          staticity={50}
          ease={40}
        />
        <div className="min-h-screen">
          <header className="flex justify-center p-6">
            <Image
              src="/coc-logo.jpg"
              alt="COC Logo"
              width={80}
              height={80}
              className="rounded-md object-contain invert dark:invert-0"
            />
          </header>

          <main className="container mx-auto px-6 py-10 space-y-12">
            <div className="relative w-full aspect-[3/1] sm:aspect-[16/5] md:aspect-[16/4] lg:aspect-[16/3] xl:aspect-[16/3] overflow-hidden rounded-2xl">
              <Image
                src="/coc.jpg"
                alt="Members group photo"
                fill
                priority
                className="object-cover brightness-75"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 px-4 text-center">
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-wide text-white drop-shadow-lg mt-36">
                  MEMBERS
                </h1>
              </div>
            </div>

            <TabProgressBar index={activeTabIndex} total={tabs.length} />

            <div className="relative z-10 min-h-[700px] overflow-visible px-4 sm:px-6 mt-10">
              <Tabs
                tabs={tabs}
                containerClassName="mb-8"
                contentClassName="mt-16"
                onTabChange={handleTabChange}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
