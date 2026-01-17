"use client";
import { useEffect, useRef } from "react";

export default function RpgBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let time = 0;

    // RUNES (Simple geometric circles)
    const runes: any[] = [];
    for(let i=0; i<5; i++) {
        runes.push({
            x: Math.random() * w, y: Math.random() * h,
            r: Math.random() * 100 + 50,
            speed: (Math.random() - 0.5) * 0.002,
            segments: Math.floor(Math.random() * 5) + 3,
            offset: Math.random() * Math.PI
        });
    }

    const render = () => {
      // Dark Parchment/Dungeon Color
      ctx.fillStyle = "#0f0e13"; 
      ctx.fillRect(0, 0, w, h);

      ctx.lineWidth = 1;
      
      runes.forEach(rune => {
          ctx.strokeStyle = "rgba(234, 179, 8, 0.05)"; // Faint Gold
          ctx.save();
          ctx.translate(rune.x, rune.y);
          ctx.rotate(time * rune.speed + rune.offset);

          // Draw Outer Ring
          ctx.beginPath(); ctx.arc(0, 0, rune.r, 0, Math.PI * 2); ctx.stroke();
          
          // Draw Inner Shape (Triangle, Square, Pent, etc)
          ctx.beginPath();
          for(let i=0; i<=rune.segments; i++) {
              const theta = (i / rune.segments) * Math.PI * 2;
              const x = Math.cos(theta) * rune.r;
              const y = Math.sin(theta) * rune.r;
              if (i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
          }
          ctx.stroke();

          // Draw Inner Ring
          ctx.beginPath(); ctx.arc(0, 0, rune.r * 0.7, 0, Math.PI * 2); ctx.stroke();
          
          ctx.restore();
      });

      // Dust Motes
      ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
      for(let i=0; i<20; i++) {
          const x = (Math.sin(time * 0.001 + i) * w/2) + w/2;
          const y = (Math.cos(time * 0.002 + i*2) * h/2) + h/2;
          ctx.beginPath(); ctx.arc(x, y, 1, 0, Math.PI*2); ctx.fill();
      }

      time++;
      requestAnimationFrame(render);
    };

    const animId = requestAnimationFrame(render);
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none bg-[#0f0e13]" />;
}