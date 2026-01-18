// components/ui/achievement-card.tsx
import React, { useState } from "react";
import { ChevronRight, X, Loader2, ExternalLink } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

// UPDATED: Interface now includes id
interface TeamMember {
  id: string;
  name: string;
  image: string;
}

interface AchievementProps {
  id: number;
  title: string;
  description: string;
  date: string;
  imageSrc: string;
  teamMembers: TeamMember[];
  onClick?: () => void;
}

interface ExpandedCardProps extends AchievementProps {
  onClose: () => void;
  isLoadingMembers: boolean;
}

const getBorderColor = (title: string) => {
  const colors = [
    'bg-gradient-to-br from-blue-400 to-blue-600',
    'bg-gradient-to-br from-red-400 to-red-600',
    'bg-gradient-to-br from-yellow-400 to-yellow-600',
    'bg-gradient-to-br from-green-400 to-green-600',
    'bg-gradient-to-br from-purple-400 to-purple-600',
    'bg-gradient-to-br from-pink-400 to-pink-600',
    'bg-gradient-to-br from-indigo-400 to-indigo-600',
    'bg-gradient-to-br from-orange-400 to-orange-600',
  ];
  return colors[title.length % colors.length];
};

// --- COMPONENT 1: The Compact Card (Grid View) ---
export function AchievementCard({
  id,
  title,
  description,
  date,
  imageSrc,
  onClick,
}: AchievementProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Shimmer animation class
  const shimmer = "bg-[linear-gradient(90deg,_#d1d5db_0%,_#e5e7eb_50%,_#d1d5db_100%)] dark:bg-[linear-gradient(90deg,_#4b5563_0%,_#6b7280_50%,_#4b5563_100%)] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]";

  return (
    <motion.div
      layoutId={`card-${id}`}
      onClick={onClick}
      className="relative w-full h-full group cursor-pointer"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className={`absolute inset-0 rounded-2xl p-3 shadow-2xl transition-all duration-300 group-hover:shadow-3xl ${getBorderColor(title)}`}>
        <div className="w-full h-full bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border-2 border-gray-100 dark:border-gray-700">
          <div className="relative h-60 overflow-hidden">
            <motion.div layoutId={`image-${id}`} className="w-full h-full relative">
              {/* Shimmer loader while image is loading */}
              {!isImageLoaded && (
                <div className={`absolute inset-0 ${shimmer}`} />
              )}
              <Image
                src={imageSrc}
                alt={title}
                fill
                onLoad={() => setIsImageLoaded(true)}
                className={`object-cover transition-all duration-300 group-hover:scale-105 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
              />
              <style jsx>{`
                @keyframes shimmer {
                  0% { background-position: -200% 0; }
                  100% { background-position: 200% 0; }
                }
              `}</style>
            </motion.div>

            <div className="absolute top-3 left-3">
              <span className="px-3 py-1.5 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-700 dark:text-gray-200 shadow-md border border-white/50 dark:border-gray-700/50">
                {date}
              </span>
            </div>

            <div className="absolute top-3 right-3 w-8 h-8 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md border border-white/50 dark:border-gray-700/50 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
              <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </div>
          </div>

          <div className="p-5 bg-white dark:bg-gray-800">
            <motion.h4
              layoutId={`title-${id}`}
              className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2 leading-tight line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300"
            >
              {title}
            </motion.h4>

            <motion.p
              layoutId={`desc-${id}`}
              className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed"
            >
              {description}
            </motion.p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// --- COMPONENT 2: The Expanded Card (Modal View) ---
export function ExpandedAchievementCard({
  id,
  title,
  description,
  date,
  imageSrc,
  teamMembers,
  onClose,
  isLoadingMembers,
}: ExpandedCardProps) {
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [isMainImageLoaded, setIsMainImageLoaded] = useState(false);

  // Shimmer animation class
  const shimmer = "bg-[linear-gradient(90deg,_#d1d5db_0%,_#e5e7eb_50%,_#d1d5db_100%)] dark:bg-[linear-gradient(90deg,_#4b5563_0%,_#6b7280_50%,_#4b5563_100%)] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-0">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        layoutId={`card-${id}`}
        className="w-[90vw] sm:w-[70vw] max-w-[900px] h-[85vh] max-h-[600px] relative z-[101] bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700"
      >
        <div className="flex flex-col sm:flex-row w-full h-full">
          <div className="w-full sm:w-1/2 h-1/2 sm:h-full border-b sm:border-b-0 sm:border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex flex-col">
            <div className="w-full h-full overflow-auto custom-scrollbar">

              <div className="p-6 bg-gradient-to-br from-gray-100 to-white dark:from-gray-800 dark:to-gray-900">
                <div className="mb-4">
                  <span className="px-3 py-1.5 rounded-full text-sm font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 shadow-sm">
                    {date}
                  </span>
                </div>

                <motion.h4
                  layoutId={`title-${id}`}
                  className="text-2xl font-bold bg-gradient-to-br from-gray-800 to-gray-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent mb-3"
                >
                  {title}
                </motion.h4>

                <motion.p
                  layoutId={`desc-${id}`}
                  className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed"
                >
                  {description}
                </motion.p>
              </div>

              <div className="p-6">
                <h5 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                  <span className="w-6 h-0.5 bg-blue-300 dark:bg-blue-600 mr-3"></span>
                  Team Members
                  {isLoadingMembers && (
                    <Loader2 className="ml-2 w-4 h-4 animate-spin text-blue-500" />
                  )}
                </h5>

                {isLoadingMembers ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="flex flex-col items-center space-y-2">
                      <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                      <p className="text-sm text-gray-500 dark:text-gray-400">Loading team members...</p>
                    </div>
                  </div>
                ) : teamMembers.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3">
                    {teamMembers.map((member, index) => (
                      <Link href={`/members/${member.id}`} key={index}>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + (index * 0.1) }}
                          // UPDATED: Added hover styles for interaction feedback
                          className="group/member relative bg-gradient-to-br from-white to-slate-100 dark:from-gray-700 dark:to-gray-800 p-3 rounded-xl hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-500 border border-gray-200 dark:border-gray-600 transition-all duration-300 cursor-pointer"
                        >
                          {/* Visual Indicator Icon (Appears on Hover) */}
                          <div className="absolute top-2 right-2 opacity-0 group-hover/member:opacity-100 transition-opacity duration-300">
                            <ExternalLink className="w-3 h-3 text-blue-500" />
                          </div>

                          <div className="relative w-12 h-12 mb-2 mx-auto rounded-full overflow-hidden ring-2 ring-blue-200 dark:ring-blue-700 ring-offset-2 ring-offset-white dark:ring-offset-gray-800 group-hover/member:ring-blue-400 dark:group-hover/member:ring-blue-500 transition-all">
                            {/* Shimmer loader while image is loading */}
                            {!loadedImages.has(index) && (
                              <div className={`absolute inset-0 ${shimmer}`} />
                            )}
                            <Image
                              src={imageErrors.has(index)
                                ? 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'
                                : member.image
                              }
                              alt={member.name}
                              fill
                              onError={() => setImageErrors(prev => new Set(prev).add(index))}
                              onLoad={() => setLoadedImages(prev => new Set(prev).add(index))}
                              className={`object-cover transition-all duration-300 group-hover/member:scale-110 ${loadedImages.has(index) ? 'opacity-100' : 'opacity-0'}`}
                            />
                          </div>
                          <div className="text-center">
                            <p className="text-xs font-semibold text-gray-800 dark:text-gray-100 group-hover/member:text-blue-600 dark:group-hover/member:text-blue-400 transition-colors">
                              {member.name}
                            </p>
                            <p className="text-[10px] text-gray-400 mt-0.5 group-hover/member:text-gray-500 transition-colors">View Profile</p>
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-sm text-gray-500 dark:text-gray-400">No team members found for this achievement.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="w-full sm:w-1/2 h-64 sm:h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 p-4 sm:p-6 relative">
            <motion.div layoutId={`image-${id}`} className="relative w-full h-full">
              {/* Shimmer loader while image is loading */}
              {!isMainImageLoaded && (
                <div className={`absolute inset-0 ${shimmer} rounded-xl`} />
              )}
              <Image
                src={imageSrc}
                alt={title}
                fill
                onLoad={() => setIsMainImageLoaded(true)}
                className={`object-contain rounded-xl shadow-md transition-opacity duration-300 ${isMainImageLoaded ? 'opacity-100' : 'opacity-0'}`}
              />
            </motion.div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white dark:bg-gray-700 rounded-full hover:bg-gray-50 dark:hover:bg-gray-600 shadow-lg transition-all hover:scale-110 border border-gray-200 dark:border-gray-600 z-50"
        >
          <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
      </motion.div>

      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(229, 231, 235, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(107, 114, 128, 0.4);
          border-radius: 3px;
          transition: all 0.3s;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(75, 85, 99, 0.6);
        }
        @media (prefers-color-scheme: dark) {
          .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(75, 85, 99, 0.3);
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(156, 163, 175, 0.4);
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(156, 163, 175, 0.6);
          }
        }
      `}</style>
    </div>
  );
}