"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

function Ferris() {
  const [mouseCoordinates, setMouseCoordinates] = useState({ x: 0, y: 0 });

  const eyeLeft = useRef<HTMLDivElement>(null);
  const eyeRight = useRef<HTMLDivElement>(null);

  function calculateEyeMovement(eye: React.RefObject<HTMLDivElement>) {
    if (!eye.current) return { x: 0, y: 0 };
    const eyeRect = eye.current.getBoundingClientRect();
    const eyeCenterX = eyeRect.left + eyeRect.width / 2;
    const eyeCenterY = eyeRect.top + eyeRect.height / 2;

    const dx = mouseCoordinates.x - eyeCenterX;
    const dy = mouseCoordinates.y - eyeCenterY;

    const maxOffset = 4;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);

    const offsetX = Math.cos(angle) * Math.min(distance, maxOffset);
    const offsetY = Math.sin(angle) * Math.min(distance, maxOffset);

    return {
      x: offsetX,
      y: offsetY,
    };
  }

  const handleMouseMove = (event: MouseEvent) => {
    setMouseCoordinates({ x: event.clientX, y: event.clientY });
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div>
      {/* Ferris Image */}
      <div>
        <Image
          src="/rustacean-flat-happy.png"
          alt="Ferris the Crab"
          width={250}
          height={250}
          className="absolute top-[250px] right-[100px] object-contain pt-10"
        />
      </div>
      {/* Left Eye */}
      <div
        ref={eyeLeft}
        className="absolute top-[370px] right-[225px] w-[22px] h-[28px] bg-black rounded-[50%] overflow-hidden"
      >
        <div
          className="absolute w-[11px] h-[14px] bg-white rounded-[50%]"
          style={{
            left: `calc(50% + ${calculateEyeMovement(eyeLeft).x}px)`,
            top: `calc(50% + ${calculateEyeMovement(eyeLeft).y}px)`,
            transform: "translate(-50%, -50%)",
          }}
        ></div>
      </div>

      {/* Right Eye */}
      <div
        ref={eyeRight}
        className="absolute top-[370px] right-[190px] w-[22px] h-[28px] bg-black rounded-[50%] overflow-hidden"
      >
        <div
          className="absolute w-[11px] h-[14px] bg-white rounded-[50%]"
          style={{
            left: `calc(50% + ${calculateEyeMovement(eyeRight).x}px)`,
            top: `calc(50% + ${calculateEyeMovement(eyeRight).y}px)`,
            transform: "translate(-50%, -50%)",
          }}
        ></div>
      </div>
    </div>
  );
}

export default Ferris;