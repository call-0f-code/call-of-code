// app/achievements/AchievementsClient.tsx (Client Component)
"use client";
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import AchievementCard from "@/components/ui/achievement-card";
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
    name: string;
    image: string;
  }>;
}

interface AchievementsClientProps {
  achievements: Achievement[];
}

// Predefined positions and rotations for scattered layout - these will repeat cyclically
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

// Function to calculate dynamic container height based on number of achievements
const calculateContainerHeight = (totalCards: number, positionsPerCycle: number) => {
  const cycles = Math.ceil(totalCards / positionsPerCycle);
  return cycles * 300; // 300px per cycle to ensure proper spacing
};

export default function AchievementsClient({ achievements }: AchievementsClientProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [loadingMembers, setLoadingMembers] = useState<Record<number, boolean>>({});
  const [error, setError] = useState<string | null>(null);
  const [achievementsWithMembers, setAchievementsWithMembers] = useState<Achievement[]>(achievements);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { theme } = useTheme();

  // Function to fetch members for a specific achievement
  const fetchMembersForAchievement = async (achievementId: number, index: number) => {
    // If members are already loaded, don't fetch again
    if (achievementsWithMembers[index].teamMembers.length > 0) {
      return;
    }

    setLoadingMembers(prev => ({ ...prev, [achievementId]: true }));

    try {
      const response = await fetch(`/api/achievements/${achievementId}`);
      const data = await response.json();

      if (data.success && data.members) {
        // Update the specific achievement with loaded members
        setAchievementsWithMembers(prev => {
          const updated = [...prev];
          updated[index] = {
            ...updated[index],
            teamMembers: data.members
          };
          return updated;
        });
      }
    } catch (error) {
      setError("Failed to load acheivements")
      console.error('Error fetching acheivements:', error);
    } finally {
      setLoadingMembers(prev => ({ ...prev, [achievementId]: false }));
    }
  };

  const handleCardExpand = (index: number) => {
    const isExpanding = expandedIndex !== index;
    setExpandedIndex(expandedIndex === index ? null : index);
    
    // If expanding and members haven't been loaded, fetch them
    if (isExpanding) {
      const achievement = sortedAchievements[index];
      fetchMembersForAchievement(achievement.id, index);
    }
  };

  // Data is already sorted from the server component
  const sortedAchievements = achievementsWithMembers;

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center text-lg text-center text-red-500 px-4">
        {error}
      </div>
    );
  }


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

      {/* Header */}
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

        {/* Loading state or no achievements */}
        {!sortedAchievements || sortedAchievements.length === 0 ? (
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p>No achievements to display at the moment.</p>
          </div>
        ) : (
          <>
            {isMobile ? (
              (() => {
                const cardHeight = 26 * 16 + 120; // 26rem + 120px margin
                const totalHeight = sortedAchievements.length * cardHeight + 200;

                return (
                  <div
                    className="relative w-full max-w-md mx-auto overflow-visible pt-20 pb-40"
                    style={{ minHeight: `${totalHeight}px` }}
                  >
                    {/* Curly Dotted Line */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 z-0 pointer-events-none overflow-hidden">
                      <svg
                        width="12"
                        height="100%"
                        viewBox="0 0 12 3000"
                        preserveAspectRatio="none"
                        className="h-full"
                      >
                        <path
                          d={Array.from({ length: 20 }, (_, i) => {
                            const y1 = i * 150;
                            const y2 = y1 + 50;
                            const y3 = y1 + 150;
                            return `${i === 0 ? 'M6 0' : ''} C 12 ${y2}, 0 ${y2 + 50}, 6 ${y3}`;
                          }).join(' ')}
                          stroke={theme === 'dark' ? '#ffffff' : '#000000'}
                          strokeDasharray="6,12"
                          fill="transparent"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>

                    {/* Achievement Cards */}
                    <div className="relative z-10">
                      {sortedAchievements.map((achievement, index) => {
                        if (expandedIndex !== null && expandedIndex !== index) return null;
                        const position = cardPositions[index % cardPositions.length];

                        return (
                          <motion.div
                            key={index}
                            className="relative w-80 md:w-96 h-[26rem] mx-auto"
                            style={{
                              marginTop: index === 0 ? "0px" : "120px",
                              zIndex: expandedIndex === index ? 50 : position.zIndex,
                              transform:
                                expandedIndex === null
                                  ? `rotate(${position.rotation}deg)`
                                  : "rotate(0deg)",
                            }}
                            initial={{
                              opacity: 0,
                              scale: 0.8,
                              rotate: position.rotation + 20,
                            }}
                            animate={{
                              opacity:
                                expandedIndex !== null && expandedIndex !== index
                                  ? 0.3
                                  : 1,
                              scale: 1,
                              rotate: expandedIndex === null ? position.rotation : 0,
                            }}
                            transition={{
                              duration: 0.6,
                              delay: index * 0.1,
                              type: "spring",
                              stiffness: 100,
                            }}
                            whileHover={{
                              scale: expandedIndex === null ? 1.05 : 1,
                              rotate:
                                expandedIndex === null
                                  ? position.rotation - 2
                                  : 0,
                              zIndex: expandedIndex === null ? 10 : position.zIndex,
                              transition: { duration: 0.3 },
                            }}
                          >
                            <AchievementCard
                              {...achievement}
                              isExpanded={expandedIndex === index}
                              onExpand={() => handleCardExpand(index)}
                              isLoadingMembers={loadingMembers[achievement.id] || false}
                            />
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()
            ) : (
              <div
                className="relative w-full max-w-7xl mx-auto" 
                style={{
                  height: `${calculateContainerHeight(sortedAchievements.length, cardPositions.length)}vh`,
                }}
              >
                {sortedAchievements.map((achievement, index) => {
                  if (expandedIndex !== null && expandedIndex !== index) return null;
                  // Calculate which cycle this card belongs to
                  const cycleIndex = Math.floor(index / cardPositions.length);
                  const positionIndex = index % cardPositions.length;
                  const basePosition = cardPositions[positionIndex];
                  
                  // Adjust the Y position based on the cycle
                  const adjustedPosition = {
                    ...basePosition,
                    y: `${parseFloat(basePosition.y) + (cycleIndex * 120)}%`, // Add 120% for each cycle
                  };
                  
                  return (
                    <motion.div
                      key={index}
                      className="absolute w-80 md:w-96 h-[26rem]"
                      style={{
                        left: adjustedPosition.x,
                        top: adjustedPosition.y,
                        zIndex: expandedIndex === index ? 50 : adjustedPosition.zIndex,
                        transform:
                          expandedIndex === null
                            ? `rotate(${adjustedPosition.rotation}deg)`
                            : "rotate(0deg)",
                      }}
                      initial={{
                        opacity: 0,
                        scale: 0.8,
                        rotate: adjustedPosition.rotation + 20,
                      }}
                      animate={{
                        opacity:
                          expandedIndex !== null && expandedIndex !== index
                            ? 0.3
                            : 1,
                        scale: 1,
                        rotate: expandedIndex === null ? adjustedPosition.rotation : 0,
                      }}
                      transition={{
                        duration: 0.6,
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 100,
                      }}
                      whileHover={{
                        scale: expandedIndex === null ? 1.05 : 1,
                        rotate:
                          expandedIndex === null
                            ? adjustedPosition.rotation - 2
                            : 0,
                        zIndex:
                          expandedIndex === null ? 10 : adjustedPosition.zIndex,
                        transition: { duration: 0.3 },
                      }}
                    >
                      <AchievementCard
                        {...achievement}
                        isExpanded={expandedIndex === index}
                        onExpand={() => handleCardExpand(index)}
                        isLoadingMembers={loadingMembers[achievement.id] || false}
                      />
                    </motion.div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}