"use client";
import { useEffect, useRef } from "react";

export default function BotanyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let frame = 0;
    let growthProgress = 0; // 0 to 1

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      
      // Animate Growth on Load
      if(growthProgress < 1) growthProgress += 0.005;

      // Draw Soil Line
      const grad = ctx.createLinearGradient(0, h-50, 0, h);
      grad.addColorStop(0, "rgba(0,0,0,0)");
      grad.addColorStop(1, "rgba(20, 83, 45, 0.2)"); // Deep Green Soil
      ctx.fillStyle = grad;
      ctx.fillRect(0, h-100, w, 100);

      // Recursive Fractal Tree
      const drawBranch = (x: number, y: number, len: number, angle: number, depth: number) => {
        ctx.beginPath();
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);

        // Wind Sway Calculation (Sine wave based on depth and time)
        const wind = Math.sin(frame * 0.01 + depth) * 0.02 * (depth * 0.5);
        ctx.rotate(wind);

        // Draw the branch
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -len * growthProgress); // Grow length over time
        
        // Color: Dark Grey trunks -> Neon Green tips
        ctx.strokeStyle = depth < 3 
            ? `rgba(52, 211, 153, ${0.3 + depth * 0.1})` // Emerald Leaves
            : `rgba(87, 83, 78, ${0.2 + depth * 0.05})`; // Stone Trunk

        ctx.lineWidth = depth * 0.8;
        ctx.stroke();

        // Recursion Condition
        if (len > 5 && depth > 0) {
            // Branch split logic
            drawBranch(0, -len * growthProgress, len * 0.75, Math.PI / 5, depth - 1);
            drawBranch(0, -len * growthProgress, len * 0.75, -Math.PI / 6, depth - 1);
        }
        ctx.restore();
      };

      // Generate The Forest (Position, Height, Thickness)
      // Background Trees
      drawBranch(w * 0.15, h, 80, 0, 9);
      drawBranch(w * 0.85, h, 90, 0, 8);
      
      // Foreground Hero Trees
      drawBranch(w * 0.5, h + 20, 130, 0, 10);

      frame++;
      requestAnimationFrame(render);
    };

    const animId = requestAnimationFrame(render);
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none bg-[#020604]" />;
}