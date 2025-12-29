"use client";
import { useEffect, useRef } from "react";

export default function BlueprintBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let time = 0;
    
    type Point = { x: number, y: number, life: number };
    let path: Point[] = [];
    let lastMouse = { x: w/2, y: h/2 };
    let currentMouse = { x: w/2, y: h/2 };
    let isDrawing = false;

    // Grid pattern
    const drawGrid = () => {
        ctx.strokeStyle = "rgba(56, 189, 248, 0.1)"; // Sky-400, low opacity
        ctx.lineWidth = 1;
        ctx.beginPath();
        const gridSize = 50;
        for(let x=0; x<=w; x+=gridSize) { ctx.moveTo(x,0); ctx.lineTo(x,h); }
        for(let y=0; y<=h; y+=gridSize) { ctx.moveTo(0,y); ctx.lineTo(w,y); }
        ctx.stroke();
    };

    const animate = () => {
      // Deep Blueprint Background
      ctx.fillStyle = "#0f172a"; // Slate-900
      ctx.fillRect(0, 0, w, h);
      drawGrid();
      time++;

      // Add points if moving quickly
      const dx = currentMouse.x - lastMouse.x;
      const dy = currentMouse.y - lastMouse.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      
      if (dist > 5) {
          path.push({ x: currentMouse.x, y: currentMouse.y, life: 100 });
          
          // Add "Construction guides" occasionally
          if (Math.random() > 0.8) {
              // Vertical or horizontal guide line
              path.push({ x: currentMouse.x, y: -100, life: 50 }); // Start off screen
              path.push({ x: currentMouse.x, y: h+100, life: 50 });
          }
          lastMouse = { ...currentMouse };
      }

      // Draw Path
      ctx.lineWidth = 2;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';

      for (let i = 0; i < path.length - 1; i++) {
          const p1 = path[i];
          const p2 = path[i+1];
          
          // Fade out
          p1.life--;
          if (p1.life <= 0) { path.splice(i, 1); continue; }
          
          const alpha = p1.life / 100;
          
          // Main sketch line
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`; // Cyan glow
          ctx.shadowColor = "rgba(56, 189, 248, 0.5)";
          ctx.shadowBlur = 10;
          ctx.stroke();

          // "Architectural Sketch" effect: Add perpendicular dashes or circles
          if (i % 5 === 0 && p1.life > 80) {
              ctx.beginPath();
              ctx.arc(p1.x, p1.y, 3, 0, Math.PI*2);
              ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.5})`;
              ctx.fill();
              
              // Dimension line hint
              ctx.beginPath();
              ctx.moveTo(p1.x - 10, p1.y);
              ctx.lineTo(p1.x + 10, p1.y);
              ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.3})`;
              ctx.lineWidth = 1;
              ctx.stroke();
          }
      }
      ctx.shadowBlur = 0;
      ctx.lineWidth = 1;

      // Cursor
      ctx.beginPath();
      ctx.arc(currentMouse.x, currentMouse.y, 5, 0, Math.PI*2);
      ctx.strokeStyle = "#38bdf8";
      ctx.stroke();
      // Crosshairs
      ctx.beginPath();
      ctx.moveTo(currentMouse.x - 15, currentMouse.y); ctx.lineTo(currentMouse.x + 15, currentMouse.y);
      ctx.moveTo(currentMouse.x, currentMouse.y - 15); ctx.lineTo(currentMouse.x, currentMouse.y + 15);
      ctx.strokeStyle = "rgba(56, 189, 248, 0.3)";
      ctx.stroke();

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    const handleMouseMove = (e: MouseEvent) => { currentMouse.x = e.clientX; currentMouse.y = e.clientY; };
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