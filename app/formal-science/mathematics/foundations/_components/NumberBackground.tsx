"use client";
import { useEffect, useRef } from "react";

export default function NumberBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // Grid configuration
    const spacing = 40;
    const cols = Math.floor(w / spacing) + 2;
    const rows = Math.floor(h / spacing) + 2;
    let time = 0;

    const animate = () => {
      // Deep zinc background with slight trail for smoothness
      ctx.fillStyle = "rgba(9, 9, 11, 0.4)"; 
      ctx.fillRect(0, 0, w, h);

      ctx.lineWidth = 1;
      
      // Draw undulating grid
      for (let y = 0; y < rows; y++) {
        ctx.beginPath();
        for (let x = 0; x < cols; x++) {
          // Calculate physical coordinates
          const px = x * spacing;
          const py = y * spacing;

          // Apply 2D Sine wave distortion based on time, x, and y
          const distortionX = Math.sin(x * 0.2 + time) * 15;
          const distortionY = Math.cos(y * 0.2 + time) * 15;
          const elevation = Math.sin((x + y) * 0.1 + time * 1.5) * 10;

          const finalX = px + distortionX;
          const finalY = py + distortionY + elevation;

          if (x === 0) ctx.moveTo(finalX, finalY);
          else ctx.lineTo(finalX, finalY);
        }
        // Gradient from rose to transparent
        const gradient = ctx.createLinearGradient(0, 0, w, 0);
        gradient.addColorStop(0, "rgba(244, 63, 94, 0.0)"); // Rose transparent
        gradient.addColorStop(0.5, "rgba(244, 63, 94, 0.15)"); // Rose glowing
        gradient.addColorStop(1, "rgba(244, 63, 94, 0.0)");
        
        ctx.strokeStyle = gradient;
        ctx.stroke();
      }

      time += 0.02;
      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    
    const handleResize = () => { 
        w = canvas.width = window.innerWidth; 
        h = canvas.height = window.innerHeight; 
    };
    window.addEventListener("resize", handleResize);

    return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}