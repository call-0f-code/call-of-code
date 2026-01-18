"use client";

import { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const isDarkMode = () => document.documentElement.classList.contains("dark");

    const lightColors = ["147, 51, 234", "236, 72, 153", "59, 130, 246"];

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      lightColor: string; 

      constructor() {
        this.x = Math.random() * (canvas?.width || window.innerWidth);
        this.y = Math.random() * (canvas?.height || window.innerHeight);
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.3;
        
        // Assign a random beautiful color for Light Mode
        this.lightColor = lightColors[Math.floor(Math.random() * lightColors.length)];
      }

      update() {
        if (!canvas) return;
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        if (!ctx) return;
        const isDark = isDarkMode();
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

        const color = isDark ? "255, 255, 255" : this.lightColor;
        
        ctx.fillStyle = `rgba(${color}, ${this.opacity})`;
        ctx.fill();
      }
    }

    const particleCount = 150;
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      if (!ctx || !canvas) return;
      const isDark = isDarkMode();

      const fadeColor = isDark ? "rgba(5, 5, 5, 0.05)" : "rgba(255, 255, 255, 0.3)";
      
      ctx.fillStyle = fadeColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();

        particles.forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            
            // CONNECTION LINES:
            // Dark Mode: Original Purple
            // Light Mode: Use the particle's own color for the line (creates nice mixing effect)
            const strokeColor = isDark 
                ? `rgba(138, 43, 226, ${0.1 * (1 - distance / 100)})`
                : `rgba(${particle.lightColor}, ${0.15 * (1 - distance / 100)})`;

            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = 0.5;
            ctx.stroke();  
          }
        });

        // Mouse Interaction
        const dxMouse = particle.x - mouseX;
        const dyMouse = particle.y - mouseY;
        const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distanceMouse < 150) {
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(mouseX, mouseY);
          
          const mouseLineColor = isDark 
             ? `rgba(236, 72, 153, ${0.3 * (1 - distanceMouse / 150)})`
             : `rgba(236, 72, 153, ${0.4 * (1 - distanceMouse / 150)})`; // Pink interaction

          ctx.strokeStyle = mouseLineColor;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 
                 bg-gradient-to-br from-white via-purple-50 to-blue-50 
                 dark:bg-[#050505] dark:from-transparent dark:to-transparent"
    />
  );
}