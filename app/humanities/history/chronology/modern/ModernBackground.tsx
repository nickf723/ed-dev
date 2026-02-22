"use client";
import { useEffect, useRef } from "react";

export default function ModernBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let time = 0;

    // Grid System
    const gridSize = 40;
    const cols = Math.ceil(w / gridSize);
    const rows = Math.ceil(h / gridSize);

    // "Packets" of data
    type Packet = { x: number; y: number; vx: number; vy: number; life: number; color: string };
    const packets: Packet[] = [];

    // Spawn a packet
    const spawnPacket = (x?: number, y?: number) => {
        const startX = x !== undefined ? Math.floor(x/gridSize)*gridSize : Math.floor(Math.random()*cols)*gridSize;
        const startY = y !== undefined ? Math.floor(y/gridSize)*gridSize : Math.floor(Math.random()*rows)*gridSize;
        
        // Pick random cardinal direction
        const dir = Math.floor(Math.random() * 4);
        let vx = 0, vy = 0;
        if(dir===0) vx=2; else if(dir===1) vx=-2; else if(dir===2) vy=2; else vy=-2;

        packets.push({
            x: startX, y: startY,
            vx, vy,
            life: 100 + Math.random()*100,
            color: Math.random() > 0.5 ? "#06b6d4" : "#f43f5e" // Cyan or Rose
        });
    };

    const animate = () => {
      // Fade effect (Trails)
      ctx.fillStyle = "rgba(10, 10, 10, 0.1)"; 
      ctx.fillRect(0, 0, w, h);
      time++;

      // Random spawns
      if (time % 5 === 0) spawnPacket();

      // Draw Grid (Faint)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for(let x=0; x<=w; x+=gridSize) { ctx.moveTo(x,0); ctx.lineTo(x,h); }
      for(let y=0; y<=h; y+=gridSize) { ctx.moveTo(0,y); ctx.lineTo(w,y); }
      ctx.stroke();

      // Update Packets
      for (let i = packets.length - 1; i >= 0; i--) {
          const p = packets[i];
          p.x += p.vx;
          p.y += p.vy;
          p.life--;

          // Random turn at grid intersection
          if (p.x % gridSize === 0 && p.y % gridSize === 0 && Math.random() > 0.8) {
              if (p.vx !== 0) { // Moving X, switch to Y
                  p.vx = 0;
                  p.vy = Math.random() > 0.5 ? 2 : -2;
              } else { // Moving Y, switch to X
                  p.vy = 0;
                  p.vx = Math.random() > 0.5 ? 2 : -2;
              }
          }

          // Draw Head
          ctx.fillStyle = p.color;
          ctx.fillRect(p.x - 1, p.y - 1, 3, 3);
          
          // Glow
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 10;
          ctx.fillRect(p.x - 1, p.y - 1, 3, 3);
          ctx.shadowBlur = 0;

          if (p.life <= 0 || p.x < 0 || p.x > w || p.y < 0 || p.y > h) {
              packets.splice(i, 1);
          }
      }

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    
    const handleClick = (e: MouseEvent) => {
        // Burst of packets
        for(let i=0; i<8; i++) spawnPacket(e.clientX, e.clientY);
    };

    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("mousedown", handleClick);
    window.addEventListener("resize", handleResize);

    return () => {
        window.removeEventListener("mousedown", handleClick);
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-auto" />;
}