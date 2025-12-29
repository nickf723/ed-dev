"use client";
import { useEffect, useRef } from "react";

export default function TextBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let mouse = { x: -200, y: -200 };

    // Literary Snippets
    const lines = [
        "To be, or not to be, that is the question:",
        "It was the best of times, it was the worst of times,",
        "Call me Ishmael.",
        "In the beginning was the Word,",
        "I sing of arms and the man,",
        "Midway upon the journey of our life",
        "The woods are lovely, dark and deep,",
        "Do not go gentle into that good night,",
        "So we beat on, boats against the current,",
        "Whatever is fitted in any sort to excite the ideas of pain and danger...",
    ];

    type FloatingText = { x: number; y: number; text: string; speed: number; opacity: number };
    const entities: FloatingText[] = [];

    // Init lines
    for(let i=0; i<30; i++) {
        entities.push({
            x: Math.random() * w,
            y: Math.random() * h,
            text: lines[Math.floor(Math.random() * lines.length)],
            speed: 0.2 + Math.random() * 0.5,
            opacity: 0.1
        });
    }

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      
      // Background base
      ctx.fillStyle = "#1a0f0d"; // Deep Leather Brown
      ctx.fillRect(0, 0, w, h);

      ctx.font = "italic 20px serif";
      
      entities.forEach(e => {
          e.x -= e.speed;
          if (e.x < -300) {
              e.x = w + 50;
              e.y = Math.random() * h;
          }

          // Distance to mouse
          const dx = e.x - mouse.x;
          const dy = e.y - mouse.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          
          // Illumination Logic
          let activeOpacity = 0.05; // Base fade
          if (dist < 250) {
              activeOpacity = Math.min(1, 1 - (dist / 250)) * 0.8 + 0.05;
          }

          // Draw Text
          ctx.fillStyle = dist < 250 ? "#fbbf24" : "#a8a29e"; // Gold vs Stone
          ctx.globalAlpha = activeOpacity;
          ctx.fillText(e.text, e.x, e.y);
      });
      ctx.globalAlpha = 1;

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    const handleMouseMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}