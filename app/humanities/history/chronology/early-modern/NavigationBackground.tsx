"use client";
import { useEffect, useRef } from "react";

export default function NavigationBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let time = 0;
    let mouse = { x: w / 2, y: h / 2 };

    // Stars (Fixed background)
    const stars = Array.from({ length: 200 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 1.5,
        alpha: 0.2 + Math.random() * 0.5
    }));

    // Ships (Explorers)
    const ships = Array.from({ length: 20 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random()-0.5), 
        vy: (Math.random()-0.5),
        trail: [] as {x: number, y: number}[]
    }));

    const animate = () => {
      // Deep Indigo Background (Night Sea)
      ctx.fillStyle = "#1e1b4b"; // Indigo-950
      ctx.fillRect(0, 0, w, h);
      time++;

      // Draw Grid / Lat-Lon lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for(let x=0; x<=w; x+=100) { ctx.moveTo(x,0); ctx.lineTo(x,h); }
      for(let y=0; y<=h; y+=100) { ctx.moveTo(0,y); ctx.lineTo(w,y); }
      ctx.stroke();

      // Draw Stars
      ctx.fillStyle = "#fff";
      stars.forEach(s => {
          ctx.globalAlpha = s.alpha;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI*2);
          ctx.fill();
      });
      ctx.globalAlpha = 1;

      // Update Ships
      ships.forEach(s => {
          // Move towards mouse (The Destination)
          const dx = mouse.x - s.x;
          const dy = mouse.y - s.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          
          // Steer
          if (dist > 100) {
            s.vx += (dx/dist) * 0.02;
            s.vy += (dy/dist) * 0.02;
          }
          
          // Friction & Limit
          s.vx *= 0.99;
          s.vy *= 0.99;
          const speed = Math.sqrt(s.vx*s.vx + s.vy*s.vy);
          if(speed > 1.5) { s.vx *= 0.95; s.vy *= 0.95; }

          s.x += s.vx;
          s.y += s.vy;

          // Trail Logic
          if (time % 10 === 0) {
              s.trail.push({x: s.x, y: s.y});
              if(s.trail.length > 20) s.trail.shift();
          }

          // Draw Trail (Rhumb line style)
          ctx.beginPath();
          ctx.strokeStyle = "rgba(251, 191, 36, 0.2)"; // Faint Gold
          ctx.lineWidth = 1;
          // Dashed line
          ctx.setLineDash([5, 5]);
          if(s.trail.length > 1) {
              ctx.moveTo(s.trail[0].x, s.trail[0].y);
              for(let i=1; i<s.trail.length; i++) ctx.lineTo(s.trail[i].x, s.trail[i].y);
              ctx.lineTo(s.x, s.y);
          }
          ctx.stroke();
          ctx.setLineDash([]);

          // Draw Ship (Triangle)
          ctx.save();
          ctx.translate(s.x, s.y);
          ctx.rotate(Math.atan2(s.vy, s.vx) + Math.PI/2);
          ctx.beginPath();
          ctx.moveTo(0, -8);
          ctx.lineTo(5, 5);
          ctx.lineTo(0, 2); // Indent
          ctx.lineTo(-5, 5);
          ctx.closePath();
          ctx.fillStyle = "#fbbf24"; // Amber-400
          ctx.fill();
          ctx.restore();
      });

      // Draw Mouse Compass
      ctx.save();
      ctx.translate(mouse.x, mouse.y);
      // Outer ring
      ctx.beginPath();
      ctx.arc(0, 0, 30, 0, Math.PI*2);
      ctx.strokeStyle = "rgba(255,255,255,0.2)";
      ctx.stroke();
      // North pointer
      ctx.rotate(time * 0.01);
      ctx.beginPath();
      ctx.moveTo(0, -20);
      ctx.lineTo(5, 5);
      ctx.lineTo(-5, 5);
      ctx.fillStyle = "#f87171"; // Red tip
      ctx.fill();
      ctx.restore();

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    const handleMouseMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-auto cursor-crosshair" />;
}