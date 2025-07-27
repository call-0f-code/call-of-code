"use client";

import { useState, useEffect } from "react";
import { Tabs } from "./ui/tabs";
import MembersCard from "./ui/members-card";
import Image from "next/image";
import { motion } from "framer-motion";
import Particles from "./ui/particles";
import { useTheme } from "@/components/ui/theme-provider";
import { cn } from "@/lib/utils";

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

  const [presentMembers, setPresentMembers] = useState<DisplayMember[]>([]);
  const [superSeniors, setSuperSeniors] = useState<DisplayMember[]>([]);
  const [founders, setFounders] = useState<DisplayMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchMembers = async () => {
    try {
      const res = await fetch("/api/members");
      const result = await res.json();
      console.log("Fetched result", result);

      const rawData: Member[] = Array.isArray(result.data) ? result.data : [];

      if (!result.success || !rawData) {
        throw new Error("Invalid API response");
      }

      if (rawData.length === 0) {
        console.warn("No members found");
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
        githubLink: m.github ?? "#",
        linkedinLink: m.linkedin ?? "#",
      });

      const founders = approved
        .filter((m) => new Date(m.passoutYear).getFullYear() === 2024)
        .map(format);

      const superSeniors = approved
        .filter((m) => new Date(m.passoutYear).getFullYear() === currentYear)
        .map(format);

      const present = approved
        .filter((m) => new Date(m.passoutYear).getFullYear() > currentYear)
        .map(format);

      console.log("Founders:", founders);
      console.log("Super Seniors:", superSeniors);
      console.log("Present:", present);

      setFounders(founders);
      setSuperSeniors(superSeniors);
      setPresentMembers(present);
    } catch (err) {
      console.error("Failed to fetch members", err);
    } finally {
      setLoading(false);
    }
  };

  fetchMembers();
}, []);



  const tabs = [
    {
      title: "Present Members",
      value: "present",
      content: <MemberGrid members={presentMembers} />,
    },
    {
      title: "Super Seniors",
      value: "seniors",
      content: <MemberGrid members={superSeniors} />,
    },
    {
      title: "Founders",
      value: "founders",
      content: <MemberGrid members={founders} isFounder={true} />,
    },
  ];

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-lg text-center">
        Loading members...
      </div>
    );
  }

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
          className="absolute inset-0 z-0 h-full w-full"
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
                onTabChange={(idx) => setActiveTabIndex(idx)}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
