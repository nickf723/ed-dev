"use client";
import { useEffect, useRef } from "react";

export default function FolkloreBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let time = 0;

    const stars: any[] = [];
    for(let i=0; i<50; i++) {
        stars.push({
            x: Math.random() * w, y: Math.random() * h,
            size: Math.random() * 1.5,
            blinkSpeed: Math.random() * 0.05 + 0.01,
            blinkOffset: Math.random() * Math.PI
        });
    }

    const render = () => {
      ctx.fillStyle = "#050205"; ctx.fillRect(0, 0, w, h);
      
      // Draw Stars
      stars.forEach(s => {
          const alpha = (Math.sin(time * s.blinkSpeed + s.blinkOffset) + 1) / 2 * 0.8 + 0.2;
          ctx.fillStyle = `rgba(167, 139, 250, ${alpha})`; // Violet
          ctx.beginPath(); ctx.arc(s.x, s.y, s.size, 0, Math.PI*2); ctx.fill();
      });

      // Draw "Constellations" (Random connections)
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = "rgba(167, 139, 250, 0.1)";
      ctx.beginPath();
      for(let i=0; i<stars.length; i++) {
          for(let j=i+1; j<stars.length; j++) {
              const d = Math.hypot(stars[i].x - stars[j].x, stars[i].y - stars[j].y);
              if(d < 100) {
                  ctx.moveTo(stars[i].x, stars[i].y);
                  ctx.lineTo(stars[j].x, stars[j].y);
              }
          }
      }
      ctx.stroke();

      time++;
      requestAnimationFrame(render);
    };

    const animId = requestAnimationFrame(render);
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none bg-[#050205]" />;
}