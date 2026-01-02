"use client";
import { useEffect, useRef } from "react";

export default function ElectricBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // Lightning Nodes
    const nodes = Array.from({ length: 15 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      charge: 0
    }));

    // Recursive Lightning Function
    const drawLightning = (x1: number, y1: number, x2: number, y2: number, displacement: number) => {
      if (displacement < 5) {
        ctx.lineTo(x2, y2);
        return;
      }
      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2;
      const midX_displaced = midX + (Math.random() - 0.5) * displacement;
      const midY_displaced = midY + (Math.random() - 0.5) * displacement;
      drawLightning(x1, y1, midX_displaced, midY_displaced, displacement / 2);
      drawLightning(midX_displaced, midY_displaced, x2, y2, displacement / 2);
    };

    const animate = () => {
      // Clear with rapid fade for "afterimage" effect
      ctx.fillStyle = "rgba(2, 6, 23, 0.2)"; 
      ctx.fillRect(0, 0, w, h);

      // Update Nodes
      nodes.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        
        // Randomly build charge
        if (Math.random() > 0.98) n.charge = 20;
        if (n.charge > 0) n.charge--;
      });

      // Discharge
      ctx.lineWidth = 2;
      ctx.shadowBlur = 15;
      ctx.shadowColor = "#22d3ee"; // Cyan Glow
      
      nodes.forEach((n1, i) => {
        nodes.forEach((n2, j) => {
          if (i >= j) return;
          const dist = Math.sqrt((n1.x - n2.x) ** 2 + (n1.y - n2.y) ** 2);
          
          // Arcing Condition: Close enough AND one is charged
          if (dist < 250 && (n1.charge > 0 || n2.charge > 0) && Math.random() > 0.8) {
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            
            // Varied Colors: Cyan (Standard) or Yellow (Overload)
            const isOverload = Math.random() > 0.8;
            ctx.strokeStyle = isOverload ? "#facc15" : "rgba(34, 211, 238, 0.8)";
            ctx.shadowColor = isOverload ? "#facc15" : "#22d3ee";
            
            drawLightning(n1.x, n1.y, n2.x, n2.y, 40);
            ctx.stroke();
          }
        });
      });
      
      ctx.shadowBlur = 0;
      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);

    return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}