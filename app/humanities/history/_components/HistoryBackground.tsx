"use client";
import { useEffect, useRef } from "react";

export default function HistoryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // --- STATE ---
    const starCount = 300;
    const stars: {x: number, y: number, z: number, o_z: number}[] = [];
    
    // Initialize Stars
    const initStar = () => ({
        x: (Math.random() - 0.5) * w,
        y: (Math.random() - 0.5) * h,
        z: Math.random() * w,    // Depth
        o_z: Math.random() * w   // Original Depth (for resetting)
    });

    for(let i=0; i<starCount; i++) stars.push(initStar());

    let speed = 2; // Base speed

    const render = () => {
      // Clear with trail effect for "warp" feeling
      ctx.fillStyle = "rgba(5, 5, 5, 0.2)"; 
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      stars.forEach((star) => {
          // Move star towards screen
          star.z -= speed;

          // Reset if it passes screen
          if (star.z <= 0) {
              star.z = w;
              star.x = (Math.random() - 0.5) * w;
              star.y = (Math.random() - 0.5) * h;
          }

          // Project 3D to 2D
          // The closer the star (low z), the larger the scale
          const scale = w / star.z; 
          const x2d = cx + star.x * scale;
          const y2d = cy + star.y * scale;

          // Size grows as it gets closer
          const size = Math.max(0.5, (1 - star.z / w) * 3);
          const alpha = (1 - star.z / w); // Fade in as it approaches

          if (x2d >= 0 && x2d <= w && y2d >= 0 && y2d <= h) {
              ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
              ctx.beginPath();
              ctx.arc(x2d, y2d, size, 0, Math.PI*2);
              ctx.fill();
          }
      });

      requestAnimationFrame(render);
    };

    const animId = requestAnimationFrame(render);
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-60 pointer-events-none" />;
}