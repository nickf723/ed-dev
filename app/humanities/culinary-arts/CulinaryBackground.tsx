"use client";
import { useEffect, useRef } from "react";

export default function CulinaryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let time = 0;

    const steam: any[] = [];
    const embers: any[] = [];

    // Steam Init
    for(let i=0; i<20; i++) {
        steam.push({
            x: Math.random() * w, y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.5, vy: -(Math.random() * 0.5 + 0.2),
            size: Math.random() * 100 + 50
        });
    }
    // Embers Init
    for(let i=0; i<30; i++) {
        embers.push({
            x: Math.random() * w, y: h + Math.random() * 100,
            vx: (Math.random() - 0.5) * 1, vy: -(Math.random() * 2 + 1),
            size: Math.random() * 2, life: Math.random() * 100
        });
    }

    const render = () => {
      ctx.fillStyle = "#1c1917"; ctx.fillRect(0, 0, w, h);

      // Draw Steam
      steam.forEach(p => {
          p.y += p.vy; p.x += Math.sin(time * 0.01 + p.y * 0.01) * 0.2;
          if(p.y < -p.size) { p.y = h + p.size; p.x = Math.random() * w; }
          const alpha = (Math.sin(time * 0.01 + p.x) + 1) / 2 * 0.05;
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
          grad.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
          grad.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = grad; ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI*2); ctx.fill();
      });

      // Draw Embers
      ctx.globalCompositeOperation = "screen";
      embers.forEach(p => {
          p.y += p.vy; p.x += p.vx + Math.sin(time * 0.1) * 0.5; p.life--;
          if(p.y < 0 || p.life <= 0) {
              p.y = h + Math.random() * 50; p.x = Math.random() * w;
              p.life = Math.random() * 100 + 50;
          }
          const opacity = p.life / 150;
          ctx.fillStyle = `rgba(251, 146, 60, ${opacity})`;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI*2); ctx.fill();
          ctx.shadowBlur = 10; ctx.shadowColor = "rgba(251, 146, 60, 1)";
      });
      ctx.shadowBlur = 0; ctx.globalCompositeOperation = "source-over";

      // Vignette
      const vig = ctx.createRadialGradient(w/2, h/2, h*0.5, w/2, h/2, h);
      vig.addColorStop(0, "transparent"); vig.addColorStop(1, "rgba(0,0,0,0.6)");
      ctx.fillStyle = vig; ctx.fillRect(0,0,w,h);

      time++;
      requestAnimationFrame(render);
    };

    const animId = requestAnimationFrame(render);
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none bg-[#1c1917]" />;
}