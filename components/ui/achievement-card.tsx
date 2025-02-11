import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { XCircleIcon } from "@heroicons/react/24/solid";

interface AchievementCardProps {
  title: string;
  description: string;
  date: string;
  imageSrc: string;
  imageWidth?: number;
  imageHeight?: number;
}

export default function AchievementCard({
  title,
  description,
  date,
  imageSrc,
  imageWidth = 380,
  imageHeight = 451,
}: AchievementCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = () => {
    if (isMobile) {
      setIsFlipped(!isFlipped);
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      {/* Card for Mobile View */}
      <div
        className="relative"
        style={{ width: imageWidth, height: imageHeight }}
        onClick={handleClick}
      >
        <motion.div
          className="relative w-full h-full"
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front Side */}
          <motion.div
            className="absolute w-full h-full rounded-lg shadow-lg overflow-hidden"
            style={{ backfaceVisibility: "hidden" }}
          >
            <Image
              src={imageSrc}
              alt={title}
              width={imageWidth}
              height={imageHeight}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Back Side */}
          <motion.div
            className="absolute w-full h-full bg-gray-900 text-white flex flex-col justify-center items-center rounded-lg shadow-lg p-4 text-center"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <h4 className="text-xl font-bold mb-2">{title}</h4>
            <p className="text-sm mb-2">{description}</p>
            <span className="text-xs text-gray-400">{date}</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Modal for Laptop View */}
      {isModalOpen && !isMobile && (
  <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-xl flex justify-center items-center z-50 p-4">
    <motion.div
      className="bg-white/40 dark:bg-black/30 backdrop-blur-lg p-8 rounded-2xl shadow-2xl max-w-3xl w-full flex items-center relative border border-white/20"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Image
        src={imageSrc}
        alt={title}
        width={imageWidth}
        height={imageHeight}
        className="rounded-xl shadow-xl object-cover w-1/3"
      />
      <div className="p-6 w-2/3 space-y-4">
        <h4 className="text-3xl font-extrabold text-white">{title}</h4>
        <p className="text-lg text-white">{description}</p>
        <span className="text-sm text-gray-50">{date}</span>
      </div>
      <button
        className="absolute top-4 right-4 text-white hover:text-red-500 transition-all duration-300"
        onClick={() => setIsModalOpen(false)}
      >
        <XCircleIcon className="w-8 h-8" />
      </button>
    </motion.div>
  </div>
)}


    </>
  );
}
