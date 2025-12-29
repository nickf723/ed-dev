"use client";
import { useEffect, useRef } from "react";

export default function MyceliumBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    
    // Growth Tips
    type Tip = { x: number; y: number; angle: number; life: number; width: number };
    let tips: Tip[] = [];

    // Initialize with a central colony
    const spawnColony = (x: number, y: number) => {
        for(let i=0; i<8; i++) {
            tips.push({
                x, y,
                angle: (i / 8) * Math.PI * 2,
                life: 100 + Math.random() * 50,
                width: 2
            });
        }
    };
    spawnColony(w/2, h/2);

    const animate = () => {
      // No clearRect - we want the network to build up permanently (like ink)
      // But we can fade very slowly for a dreamlike feel
      // ctx.fillStyle = "rgba(12, 10, 9, 0.01)"; // Very slow fade
      // ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = "rgba(230, 210, 200, 0.1)"; // Off-white/Bone color
      ctx.lineCap = "round";

      for (let i = tips.length - 1; i >= 0; i--) {
          const t = tips[i];
          
          // Move
          const speed = 1;
          const nextX = t.x + Math.cos(t.angle) * speed;
          const nextY = t.y + Math.sin(t.angle) * speed;
          
          // Draw Segment
          ctx.beginPath();
          ctx.moveTo(t.x, t.y);
          ctx.lineTo(nextX, nextY);
          ctx.lineWidth = t.width;
          ctx.stroke();
          
          // Update
          t.x = nextX;
          t.y = nextY;
          t.life--;
          
          // Wiggle
          t.angle += (Math.random() - 0.5) * 0.2;
          
          // Branching
          if (Math.random() < 0.03 && t.width > 0.5) {
              tips.push({
                  x: t.x, y: t.y,
                  angle: t.angle + (Math.random() - 0.5) * 1.5, // Split off
                  life: t.life * 0.8,
                  width: t.width * 0.8
              });
          }
          
          // Death
          if (t.life <= 0 || t.x < 0 || t.x > w || t.y < 0 || t.y > h) {
              tips.splice(i, 1);
          }
      }

      requestAnimationFrame(animate);
    };

    // Initial Fill
    ctx.fillStyle = "#1c1917"; // Stone-900 (Dark Soil)
    ctx.fillRect(0, 0, w, h);
    
    const animId = requestAnimationFrame(animate);
    
    const handleClick = (e: MouseEvent) => spawnColony(e.clientX, e.clientY);
    const handleResize = () => { 
        w = canvas.width = window.innerWidth; 
        h = canvas.height = window.innerHeight;
        ctx.fillStyle = "#1c1917";
        ctx.fillRect(0, 0, w, h);
        spawnColony(w/2, h/2);
    };

    window.addEventListener("mousedown", handleClick);
    window.addEventListener("resize", handleResize);

    return () => {
        window.removeEventListener("mousedown", handleClick);
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-auto cursor-crosshair" />;
}