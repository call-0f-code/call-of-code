import Image from "next/image";
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface AchievementCardProps {
  title: string;
  description: string;
  date: string;
  imageSrc: string;
  teamMembers: {
    name: string;
    image: string;
    role: string;
  }[];
  additionalInfo?: string;
  slideshowImages: string[];
  isExpanded?: boolean;
  onExpand?: () => void;
}

export default function AchievementCard({
  title,
  description,
  date,
  imageSrc,
  teamMembers,
  additionalInfo,
  slideshowImages,
  isExpanded,
  onExpand,
}: AchievementCardProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
  };

  const previousSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + slideshowImages.length) % slideshowImages.length);
  };

  return (
    <div 
      className={`transform-gpu transition-all duration-700 cursor-pointer [perspective:2000px] ${
        isExpanded 
          ? "w-[90vw] max-w-[1200px] h-[80vh] max-h-[800px]" 
          : "w-full max-w-[400px] h-[350px] hover:scale-105"
      }`}
      onClick={onExpand}
    >
      <div 
        className={`relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] ${
          isExpanded ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* Front Card */}
        <div className="absolute w-full h-full [backface-visibility:hidden] rounded-xl overflow-hidden shadow-2xl">
          <div className="relative w-full h-full group">
            <Image 
              src={imageSrc} 
              alt={title} 
              fill 
              className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:blur-[2px]" 
            />
            
            {/* Improved Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/50 to-transparent opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-transparent to-emerald-500/30 mix-blend-overlay" />
            
            {/* Refined Border Effect */}
            <div className="absolute inset-0 border border-white/10 rounded-xl group-hover:border-white/20 transition-all duration-500" />
            
            {/* Card Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-8">
              <div className="transform translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium 
                  bg-white/20 backdrop-blur-md text-white border border-white/20 shadow-lg">
                  {date}
                </span>
              </div>
              
              <h4 className="text-3xl font-bold text-white mt-4 mb-3 
                transform translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                {title}
              </h4>
              
              <p className="text-white/90 text-sm line-clamp-2 transform translate-y-4 opacity-0 
                transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {description}
              </p>
              
              <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 
                backdrop-blur-md flex items-center justify-center opacity-0 transform scale-50 
                transition-all duration-500 group-hover:opacity-100 group-hover:scale-100
                border border-white/20 shadow-lg">
                <ChevronRight className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Back (expanded state) */}
        <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-xl shadow-2xl overflow-hidden
          bg-slate-50 dark:bg-gray-900">
          <div className="flex w-full h-full">
            {/* Left Panel */}
            <div className="w-1/3 h-full border-r border-slate-200 dark:border-sky-800/30 backdrop-blur-xl">
              <div 
                ref={contentRef} 
                className="w-full h-full overflow-auto custom-scrollbar"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'rgba(51, 65, 85, 0.5) rgba(51, 65, 85, 0.1)',
                }}
              >
                <style jsx global>{`
                  .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                  }
                  
                  .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(226, 232, 240, 0.5);
                    border-radius: 3px;
                  }
                  
                  .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(71, 85, 105, 0.4);
                    border-radius: 3px;
                    transition: all 0.3s;
                  }
                  
                  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(51, 65, 85, 0.6);
                  }
                  
                  @media (prefers-color-scheme: dark) {
                    .custom-scrollbar::-webkit-scrollbar-track {
                      background: rgba(56, 189, 248, 0.1);
                    }
                    
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                      background: rgba(56, 189, 248, 0.4);
                    }
                    
                    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                      background: rgba(56, 189, 248, 0.6);
                    }
                  }
                `}</style>

                {/* Header Section */}
                <div className="p-8 bg-gradient-to-br from-slate-100 to-white dark:from-sky-950/50 dark:to-indigo-950/50">
                  <div className="mb-6">
                    <span className="px-4 py-2 rounded-full text-sm font-medium bg-slate-200 text-slate-700
                      dark:bg-sky-900/40 dark:text-sky-300 shadow-sm">
                      {date}
                    </span>
                  </div>
                  <h4 className="text-3xl font-bold bg-gradient-to-br from-slate-800 to-slate-600 dark:from-sky-400 
                    dark:to-indigo-400 bg-clip-text text-transparent mb-4">{title}</h4>
                  <p className="text-base text-slate-600 dark:text-gray-300 leading-relaxed">{description}</p>
                </div>

                {/* Team Members Section */}
                <div className="p-8">
                  <h5 className="text-lg font-semibold text-slate-800 dark:text-gray-200 mb-6 flex items-center">
                    <span className="w-8 h-0.5 bg-slate-300 dark:bg-sky-700 mr-3"></span>
                    Team Members
                  </h5>
                  <div className="grid grid-cols-2 gap-4">
                    {teamMembers.map((member, index) => (
                      <div key={index} className="group/member relative bg-gradient-to-br from-white to-slate-100 
                        dark:from-gray-800 dark:to-sky-900/30 p-4 rounded-xl hover:shadow-lg transition-all duration-300 
                        border border-slate-200 dark:border-sky-800/30">
                        <div className="relative w-16 h-16 mb-3 mx-auto rounded-full overflow-hidden ring-2 
                          ring-slate-200 dark:ring-sky-800 ring-offset-2 ring-offset-white dark:ring-offset-gray-900">
                          <Image
                            src={member.image}
                            alt={member.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover/member:scale-110"
                          />
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-semibold text-slate-800 dark:text-gray-100 mb-1">{member.name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional Info Section */}
                {additionalInfo && (
                  <div className="px-8 pb-8">
                    <div className="p-6 bg-gradient-to-br from-slate-100 to-white dark:from-sky-900/20 
                      dark:to-indigo-900/20 rounded-xl border border-slate-200 dark:border-sky-800/30">
                      <h5 className="text-lg font-semibold text-slate-800 dark:text-gray-200 mb-3 flex items-center">
                        <span className="w-8 h-0.5 bg-slate-300 dark:bg-sky-700 mr-3"></span>
                        Additional Information
                      </h5>
                      <p className="text-sm text-slate-600 dark:text-gray-300 leading-relaxed">
                        {additionalInfo}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Panel - Slideshow */}
            <div className="w-2/3 h-full relative bg-gradient-to-br from-slate-100 to-white dark:from-sky-950/30 dark:to-indigo-950/30">
              <Image 
                src={slideshowImages[currentSlide]} 
                alt={`Slide ${currentSlide + 1}`} 
                fill 
                className="object-contain p-8"
              />
              
              {/* Navigation Buttons */}
              <button 
                onClick={previousSlide}
                className="absolute left-6 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800/90 p-3 rounded-full 
                  hover:bg-slate-50 dark:hover:bg-sky-900/50 shadow-lg transition-all hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6 text-slate-600 dark:text-sky-300" />
              </button>
              
              <button 
                onClick={nextSlide}
                className="absolute right-6 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800/90 p-3 rounded-full 
                  hover:bg-slate-50 dark:hover:bg-sky-900/50 shadow-lg transition-all hover:scale-110"
              >
                <ChevronRight className="w-6 h-6 text-slate-600 dark:text-sky-300" />
              </button>

              {/* Slideshow Navigation */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 p-2 
                bg-white dark:bg-gray-800/90 rounded-full shadow-lg">
                {slideshowImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentSlide(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentSlide === index 
                        ? 'bg-slate-800 dark:bg-sky-400 w-6' 
                        : 'bg-slate-300 dark:bg-sky-800 hover:bg-slate-400 dark:hover:bg-sky-700'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onExpand?.();
            }}
            className="absolute top-6 right-6 p-3 bg-white dark:bg-gray-800/90 rounded-full 
              hover:bg-slate-50 dark:hover:bg-sky-900/50 shadow-lg transition-all hover:scale-110"
          >
            <X className="w-6 h-6 text-slate-600 dark:text-sky-300" />
          </button>
        </div>
      </div>
    </div>
  );
}