"use client";
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useMemo } from "react"
import { AchievementCard, ExpandedAchievementCard } from "@/components/ui/achievement-card";
import Particles from "@/components/ui/particles";
import { useTheme } from "@/components/ui/theme-provider";
import Image from "next/image";

// Type definition for achievement data
interface Achievement {
  id: number;
  title: string;
  description: string;
  date: string;
  imageSrc: string;
  teamMembers: Array<{
    id: string;
    name: string;
    image: string;
  }>;
}

interface AchievementsClientProps {
  achievements: Achievement[];
}

const cardPositions = [
  // Row 1
  { x: '4%', y: '2%', rotation: -7, zIndex: 5 },
  { x: '35%', y: '4%', rotation: 5, zIndex: 7 },
  { x: '65%', y: '1%', rotation: -6, zIndex: 6 },
  // Row 2
  { x: '6%', y: '23%', rotation: 6, zIndex: 5 },
  { x: '35%', y: '25%', rotation: -4, zIndex: 6 },
  { x: '65%', y: '23%', rotation: 3, zIndex: 4 },
  // Row 3
  { x: '6%', y: '45%', rotation: -3, zIndex: 5 },
  { x: '35%', y: '50%', rotation: 2, zIndex: 4 },
  { x: '65%', y: '45%', rotation: -5, zIndex: 3 },
  // Row 4
  { x: '8%', y: '70%', rotation: 4, zIndex: 4 },
  { x: '38%', y: '69%', rotation: -2, zIndex: 5 },
  { x: '70%', y: '63%', rotation: 3, zIndex: 3 },
  // Row 5
  { x: '10%', y: '90%', rotation: -4, zIndex: 5 },
  { x: '40%', y: '90%', rotation: 4, zIndex: 4 },
  { x: '65%', y: '85%', rotation: -3, zIndex: 3 },
];

const calculateContainerHeight = (totalCards: number, positionsPerCycle: number) => {
  const cycles = Math.ceil(totalCards / positionsPerCycle);
  return cycles * 300; 
};

export default function AchievementsClient({ achievements }: AchievementsClientProps) {
  // FIX 1: Only store the ID of the active card, not the whole object.
  const [activeId, setActiveId] = useState<number | null>(null);
  
  const [isMobile, setIsMobile] = useState(false);
  const [loadingMembers, setLoadingMembers] = useState<Record<number, boolean>>({});
  const [achievementsWithMembers, setAchievementsWithMembers] = useState<Achievement[]>(achievements);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { theme } = useTheme();

  // FIX 2: Derive the active object directly from the main state array.
  // This ensures that when 'achievementsWithMembers' updates, the modal updates instantly.
  const activeAchievement = useMemo(
    () => achievementsWithMembers.find((a) => a.id === activeId),
    [achievementsWithMembers, activeId]
  );

  const fetchMembersForAchievement = async (achievementId: number) => {
    // Find index in current state
    const index = achievementsWithMembers.findIndex(a => a.id === achievementId);
    
    // If we already have members, don't re-fetch
    if (index === -1 || achievementsWithMembers[index].teamMembers.length > 0) {
      return;
    }

    setLoadingMembers(prev => ({ ...prev, [achievementId]: true }));

    try {
      const response = await fetch(`/api/achievements/${achievementId}`);
      const data = await response.json();

      if (data.success && data.members) {
        setAchievementsWithMembers(prev => {
          const updated = [...prev];
          // Update the specific item in the main list
          updated[index] = {
            ...updated[index],
            teamMembers: data.members
          };
          return updated;
        });
      }
    } catch (error) {
      console.error('Error fetching members:', error);
    } finally {
      setLoadingMembers(prev => ({ ...prev, [achievementId]: false }));
    }
  };

  const handleCardClick = (id: number) => {
    setActiveId(id);
    fetchMembersForAchievement(id);
  };

  const sortedAchievements = achievementsWithMembers;

  return (
    <div className="relative min-h-screen w-full bg-white dark:bg-black transition-colors duration-300 pb-40">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Particles
          quantity={400}
          size={1.5}
          staticity={60}
          color={theme === "dark" ? "#ffffff" : "#000000"}
          className="w-full h-full"
        />
      </div>

      <header className="flex justify-center p-6">
        <Image
          src="/coc-logo.jpg"
          alt="COC Logo"
          width={80}
          height={80}
          className="rounded-md object-contain invert dark:invert-0"
        />
      </header>

      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,rgba(0,0,0,0.15)_1px,transparent_0)] bg-[length:30px_30px] dark:bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.15)_1px,transparent_0)]" />
      </div>

      <div className="relative z-10 px-4 py-10 sm:px-6 lg:px-16">
        <motion.h1
          className="text-4xl md:text-6xl text-center font-bold mb-12 text-gray-800 dark:text-gray-100"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Achievements
        </motion.h1>

        {/* Progress Bar */}
        <div className="w-full bg-gray-300 dark:bg-gray-700 h-2 rounded-full overflow-hidden mb-14">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-full w-3/4 rounded-full animate-pulse" />
        </div>

        {!sortedAchievements || sortedAchievements.length === 0 ? (
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
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-3xl font-semibold tracking-wide">Failed to load achievements</p>
            </div>
          </div>
          ) : (
          <>
            {isMobile ? (
              // MOBILE LAYOUT
              (() => {
                const cardHeight = 26 * 16 + 120;
                const totalHeight = sortedAchievements.length * cardHeight + 200;

                return (
                  <div
                    className="relative w-full max-w-md mx-auto overflow-visible pt-20 pb-40"
                    style={{ minHeight: `${totalHeight}px` }}
                  >
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 z-0 pointer-events-none overflow-hidden">
                       <svg width="12" height="100%" viewBox="0 0 12 3000" preserveAspectRatio="none" className="h-full">
                        <path
                          d={Array.from({ length: 20 }, (_, i) => {
                            const y1 = i * 150; const y2 = y1 + 50; const y3 = y1 + 150;
                            return `${i === 0 ? 'M6 0' : ''} C 12 ${y2}, 0 ${y2 + 50}, 6 ${y3}`;
                          }).join(' ')}
                          stroke={theme === 'dark' ? '#ffffff' : '#000000'}
                          strokeDasharray="6,12"
                          fill="transparent"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>

                    <div className="relative z-10">
                      {sortedAchievements.map((achievement, index) => {
                        const position = cardPositions[index % cardPositions.length];
                        return (
                          <motion.div
                            key={index}
                            className="relative w-80 md:w-96 h-[26rem] mx-auto"
                            style={{
                              marginTop: index === 0 ? "0px" : "120px",
                              zIndex: position.zIndex,
                              transform: `rotate(${position.rotation}deg)`,
                            }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                          >
                            <AchievementCard
                              {...achievement}
                              onClick={() => handleCardClick(achievement.id)}
                            />
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()
            ) : (
              // DESKTOP SCATTER LAYOUT
              <div
                className="relative w-full max-w-7xl mx-auto" 
                style={{
                  height: `${calculateContainerHeight(sortedAchievements.length, cardPositions.length)}vh`,
                }}
              >
                {sortedAchievements.map((achievement, index) => {
                  const cycleIndex = Math.floor(index / cardPositions.length);
                  const positionIndex = index % cardPositions.length;
                  const basePosition = cardPositions[positionIndex];
                  
                  const adjustedPosition = {
                    ...basePosition,
                    y: `${parseFloat(basePosition.y) + (cycleIndex * 120)}%`,
                  };
                  
                  return (
                    <motion.div
                      key={index}
                      className="absolute w-80 md:w-96 h-[26rem]"
                      style={{
                        left: adjustedPosition.x,
                        top: adjustedPosition.y,
                        zIndex: adjustedPosition.zIndex,
                        transform: `rotate(${adjustedPosition.rotation}deg)`,
                      }}
                      initial={{ opacity: 0, scale: 0.8, rotate: adjustedPosition.rotation + 20 }}
                      animate={{ opacity: 1, scale: 1, rotate: adjustedPosition.rotation }}
                      transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 100 }}
                      whileHover={{
                        scale: 1.05,
                        rotate: adjustedPosition.rotation - 2,
                        zIndex: 40,
                        transition: { duration: 0.3 },
                      }}
                    >
                      <AchievementCard
                        {...achievement}
                        onClick={() => handleCardClick(achievement.id)}
                      />
                    </motion.div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>

      {/* --- OVERLAY FOR EXPANDED CARD --- */}
      <AnimatePresence>
        {activeAchievement && (
          <ExpandedAchievementCard
            {...activeAchievement}
            onClose={() => setActiveId(null)}
            isLoadingMembers={loadingMembers[activeAchievement.id] || false}
          />
        )}
      </AnimatePresence>
    </div>
  );
}