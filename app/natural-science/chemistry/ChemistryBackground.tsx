"use client";
import { useEffect, useRef } from "react";

export default function ChemistryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let time = 0;

    const hexagons: any[] = [];
    for(let i=0; i<15; i++) {
        hexagons.push({
            x: Math.random() * w,
            y: Math.random() * h,
            size: Math.random() * 40 + 20,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            rotation: Math.random() * Math.PI,
            speed: (Math.random() - 0.5) * 0.002
        });
    }

    const drawHex = (x: number, y: number, r: number) => {
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            const px = x + r * Math.cos(angle);
            const py = y + r * Math.sin(angle);
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();
    };

    const render = () => {
      // Dark Chemical Slate
      ctx.fillStyle = "#0f172a"; 
      ctx.fillRect(0, 0, w, h);

      ctx.lineWidth = 2;
      
      hexagons.forEach(hex => {
          hex.x += hex.vx;
          hex.y += hex.vy;
          hex.rotation += hex.speed;

          // Wrap around screen
          if(hex.x < -50) hex.x = w+50;
          if(hex.x > w+50) hex.x = -50;
          if(hex.y < -50) hex.y = h+50;
          if(hex.y > h+50) hex.y = -50;

          ctx.strokeStyle = "rgba(132, 204, 22, 0.05)"; // Lime-500 low opacity
          ctx.save();
          ctx.translate(hex.x, hex.y);
          ctx.rotate(hex.rotation);
          
          // Draw Benzene Ring
          drawHex(0, 0, hex.size);
          // Inner Ring (delocalized electrons)
          ctx.beginPath();
          ctx.arc(0, 0, hex.size * 0.6, 0, Math.PI*2);
          ctx.stroke();
          
          ctx.restore();
      });

      // Bubbles (Rising)
      ctx.fillStyle = "rgba(6, 182, 212, 0.1)"; // Cyan
      for(let i=0; i<10; i++) {
          const x = (Math.sin(time * 0.002 + i) * w/2) + w/2;
          const y = (h - (time + i*100) % h);
          ctx.beginPath(); ctx.arc(x, y, 2 + i, 0, Math.PI*2); ctx.fill();
      }

      time++;
      requestAnimationFrame(render);
    };

    const animId = requestAnimationFrame(render);
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none bg-[#0f172a]" />;
}