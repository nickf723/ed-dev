"use client";
import { useEffect, useRef } from "react";

export default function CultureBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let time = 0;

    const nodes: any[] = [];
    const count = 40;

    for(let i=0; i<count; i++) {
        nodes.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.2,
            vy: (Math.random() - 0.5) * 0.2,
            size: Math.random() * 3,
            color: Math.random() > 0.5 ? "rgba(251, 146, 60," : "rgba(244, 63, 94," // Orange or Rose
        });
    }

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      
      // Draw Connections
      ctx.lineWidth = 0.5;
      for(let i=0; i<count; i++) {
          const a = nodes[i];
          a.x += a.vx; a.y += a.vy;
          if(a.x < 0 || a.x > w) a.vx *= -1;
          if(a.y < 0 || a.y > h) a.vy *= -1;

          for(let j=i+1; j<count; j++) {
              const b = nodes[j];
              const dist = Math.hypot(a.x - b.x, a.y - b.y);
              if(dist < 200) {
                  const alpha = 1 - (dist / 200);
                  ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.1})`;
                  ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
              }
          }
          
          ctx.fillStyle = `${a.color} 0.5)`;
          ctx.beginPath(); ctx.arc(a.x, a.y, a.size, 0, Math.PI*2); ctx.fill();
      }
      
      requestAnimationFrame(render);
    };

    const animId = requestAnimationFrame(render);
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none bg-[#0f0a0a]" />;
}