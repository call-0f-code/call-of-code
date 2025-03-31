"use client";

import { useState, useEffect, useRef } from "react";

function Gopher() {
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

    const maxOffset = 9;
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
      {/* Gopher Image */}
      <div>
        <img
          src="/gopher.png"
          alt="Gopher"
          className="absolute top-[265px] left-[156px] w-[135px] h-[135px]overflow-hidden"
        />
      </div>
      {/* Left Eye */}
      <div
        ref={eyeLeft}
        className="absolute top-[300px] left-[185px] w-[50px] h-[50px] rounded-full overflow-hidden"
        style={{ transform: "rotate(-10deg)" }}
      >
        <div className="absolute w-full h-full bg-white">
          <div
            className="absolute w-[10px] h-[10px] bg-black rounded-full"
            style={{
              left: `calc(50% + ${calculateEyeMovement(eyeLeft).x}px)`,
              top: `calc(50% + ${calculateEyeMovement(eyeLeft).y}px)`,
              transform: "translate(-50%, -50%)",
            }}
          ></div>
        </div>
      </div>

      {/* Right Eye */}
      <div
        ref={eyeRight}
        className="absolute top-[305px] left-[250px] w-[30px] h-[40px] rounded-full overflow-hidden"
        style={{ transform: "rotate(-5deg)" }}
      >
        <div className="absolute w-full h-full bg-white">
          <div
            className="absolute w-[10px] h-[10px] bg-black rounded-full"
            style={{
              left: `calc(50% + ${calculateEyeMovement(eyeRight).x}px)`,
              top: `calc(50% + ${calculateEyeMovement(eyeRight).y}px)`,
              transform: "translate(-50%, -50%)",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Gopher;
