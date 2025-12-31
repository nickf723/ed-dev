"use client";
import { useEffect, useRef } from "react";

export default function MathBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let time = 0;
    
    // Mathematical Glyphs
    const symbols = ["∑", "∫", "∂", "√", "π", "∞", "≠", "≈", "∇", "∆", "φ", "λ", "θ", "0", "1", "e", "i"];
    
    type FloatingSymbol = { x: number; y: number; char: string; size: number; alpha: number; v: number };
    const glyphs: FloatingSymbol[] = [];

    // Initialize Glyphs
    for(let i=0; i<40; i++) {
        glyphs.push({
            x: Math.random() * w,
            y: Math.random() * h,
            char: symbols[Math.floor(Math.random() * symbols.length)],
            size: 10 + Math.random() * 20,
            alpha: Math.random() * 0.5,
            v: 0.2 + Math.random() * 0.5
        });
    }

    const animate = () => {
      // Deep Blackboard / Void
      ctx.fillStyle = "#0a0a0a"; 
      ctx.fillRect(0, 0, w, h);
      
      time += 0.02;

      // 1. Draw Faint Graph Lines
      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
      ctx.beginPath();
      // Sine Wave
      for(let x=0; x<=w; x+=10) {
          const y = h/2 + Math.sin(x * 0.01 + time) * 100;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Tangent/Complex Wave
      ctx.strokeStyle = "rgba(245, 158, 11, 0.03)"; // Gold tint
      ctx.beginPath();
      for(let x=0; x<=w; x+=10) {
          const y = h/2 + Math.cos(x * 0.02 - time) * 50 + Math.sin(x * 0.05) * 20;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();

      // 2. Draw Floating Glyphs
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      
      glyphs.forEach(g => {
          g.y -= g.v; // Float Up
          if (g.y < -50) {
              g.y = h + 50;
              g.x = Math.random() * w;
              g.char = symbols[Math.floor(Math.random() * symbols.length)];
          }

          ctx.font = `${g.size}px "Times New Roman", serif`; // Classic math font
          ctx.globalAlpha = g.alpha * 0.2; // Very faint
          ctx.fillText(g.char, g.x, g.y);
      });
      ctx.globalAlpha = 1;

      // 3. Grid overlay
      ctx.strokeStyle = "rgba(255,255,255,0.02)";
      ctx.lineWidth = 1;
      const gridSize = 100;
      ctx.beginPath();
      for(let x=0; x<=w; x+=gridSize) { ctx.moveTo(x,0); ctx.lineTo(x,h); }
      for(let y=0; y<=h; y+=gridSize) { ctx.moveTo(0,y); ctx.lineTo(w,y); }
      ctx.stroke();

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