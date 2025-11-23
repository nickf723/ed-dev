"use client";
import { useEffect, useRef } from "react";

export default function LibraryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let offset = 0;

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#0a0a0a"; 
      ctx.fillRect(0, 0, w, h);
      
      // Draw "Infinite Shelves" - Horizontal Lines
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
      
      const spacing = 100;
      const speed = 0.5;
      offset = (offset + speed) % spacing;
      
      // Vertical pillars
      for (let x = 0; x <= w; x += spacing * 2) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, h);
          ctx.stroke();
      }

      // Moving Horizontal Shelves
      for (let y = -spacing; y <= h; y += spacing) {
          const yPos = y + offset;
          ctx.beginPath();
          ctx.moveTo(0, yPos);
          ctx.lineTo(w, yPos);
          ctx.stroke();
          
          // Draw "Books" (Random Rectangles on shelves)
          // This part needs to be deterministic based on Y to not flicker, 
          // which is hard with moving Y.
          // Simple workaround: Just static lines for now to convey "Grid/Order".
      }
      
      // Central "Hallway" Light
      const g = ctx.createRadialGradient(w/2, h/2, 50, w/2, h/2, h);
      g.addColorStop(0, "rgba(255, 215, 0, 0.05)"); // Gold glow
      g.addColorStop(1, "transparent");
      ctx.fillStyle = g;
      ctx.fillRect(0,0,w,h);

      requestAnimationFrame(animate);
    };
    
    animate();
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-50" />;
}