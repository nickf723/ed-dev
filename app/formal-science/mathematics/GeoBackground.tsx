"use client";
import { useEffect, useRef } from "react";

export default function GeoBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let time = 0;
    let mouse = { x: w / 2, y: h / 2 };

    const animate = () => {
      // Stark White Background
      ctx.fillStyle = "#fafafa"; 
      ctx.fillRect(0, 0, w, h);
      
      time += 0.005;

      const centerX = w / 2;
      const centerY = h / 2;

      // Mouse interaction influences scale/phi
      const dx = mouse.x - centerX;
      const dy = mouse.y - centerY;
      const dist = Math.sqrt(dx*dx + dy*dy);
      const interaction = Math.min(1, dist / 500);
      
      // The Golden Ratio
      const phi = 1.618;
      
      ctx.strokeStyle = "rgba(0,0,0,0.05)"; // Very faint black lines
      ctx.lineWidth = 1;

      // Draw Nested Geometric Shapes (Simulating 3D rotation via 2D projection)
      const drawShape = (radius: number, sides: number, offset: number, color: string) => {
          ctx.beginPath();
          for (let i = 0; i <= sides; i++) {
              const angle = (i * 2 * Math.PI) / sides + time + offset;
              const x = centerX + Math.cos(angle) * radius * Math.cos(time * 0.2); // X-rotation
              const y = centerY + Math.sin(angle) * radius;
              if (i === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = color;
          ctx.stroke();
      };

      // Recursive Rings
      for(let i=1; i<20; i++) {
          const radius = (i * 40) + (Math.sin(time + i*0.2) * 20 * interaction);
          // Alternating shapes: Hexagon, Triangle, Square
          const sides = i % 3 === 0 ? 6 : i % 2 === 0 ? 4 : 3;
          drawShape(radius, sides, i * 0.1, `rgba(23, 23, 23, ${0.1 - i * 0.005})`);
      }

      // The Golden Spiral Overlay
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      let r = 5;
      let angle = 0;
      for(let i=0; i<500; i++) {
          r *= 1.005 + (interaction * 0.002);
          angle += 0.1;
          const x = centerX + Math.cos(angle + time) * r;
          const y = centerY + Math.sin(angle + time) * r;
          ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "rgba(245, 158, 11, 0.2)"; // Faint Gold
      ctx.stroke();

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