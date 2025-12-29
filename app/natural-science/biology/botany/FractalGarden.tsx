"use client";
import { useEffect, useRef } from "react";

export default function FractalGarden() {
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

    // Tree Configuration
    const trees = [
        { x: w * 0.2, color: "#15803d", height: 120, swayOffset: 0 },
        { x: w * 0.5, color: "#166534", height: 160, swayOffset: 2 },
        { x: w * 0.8, color: "#14532d", height: 140, swayOffset: 4 },
    ];

    const drawBranch = (x: number, y: number, len: number, angle: number, depth: number, color: string) => {
      ctx.beginPath();
      ctx.save();
      ctx.strokeStyle = color;
      ctx.lineWidth = depth < 2 ? 0.5 : depth * 0.8;
      ctx.lineCap = "round";
      
      ctx.translate(x, y);
      ctx.rotate(angle);
      
      // Draw Limb
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -len);
      ctx.stroke();
      
      if (depth > 0) {
          // Wind effect: deeper branches sway more
          const sway = Math.sin(time * 0.02 + depth * 0.5) * 0.05;
          // Mouse interaction: lean away/towards
          // (Simplified for performance recursion)
          
          ctx.translate(0, -len);
          
          // Recursion
          const spread = 0.4 + Math.sin(time * 0.01) * 0.05; // Breathing branches
          const scale = 0.75;
          
          drawBranch(0, 0, len * scale, -spread + sway, depth - 1, color);
          drawBranch(0, 0, len * scale, spread + sway, depth - 1, color);
          
          // Occasional 3rd branch for fullness
          if (depth % 2 === 0) {
             drawBranch(0, 0, len * scale * 0.8, sway, depth - 1, color);
          }
      } else {
          // Leaf / Flower at tip
          ctx.beginPath();
          ctx.fillStyle = depth === 0 && Math.random() > 0.9 ? "#f472b6" : color; // Rare flower
          ctx.globalAlpha = 0.6;
          ctx.arc(0, -len, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
      }
      
      ctx.restore();
    };

    const animate = () => {
      // Dark Forest Background
      ctx.fillStyle = "#020402"; 
      ctx.fillRect(0, 0, w, h);
      time++;

      // Draw "Fireflies" or Pollen
      ctx.fillStyle = "#bef264"; // Lime-200
      for(let i=0; i<30; i++) {
          const x = (Math.sin(i * 132.1 + time * 0.005) * w + w) % w;
          const y = (Math.cos(i * 453.2 + time * 0.005) * h + h) % h;
          // Interaction: Pollen flees mouse
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const d = Math.sqrt(dx*dx + dy*dy);
          const alpha = Math.max(0, 1 - d/300); // Glow near mouse
          
          ctx.globalAlpha = 0.3 + alpha * 0.7;
          ctx.beginPath();
          ctx.arc(x, y, 1 + alpha * 2, 0, Math.PI*2);
          ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Draw Trees
      trees.forEach((t, i) => {
          // Parallax-ish sway
          const baseSway = Math.sin(time  + t.swayOffset) * 0.05;
          drawBranch(t.x, h, t.height, baseSway, 9, t.color);
      });

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