"use client";
import { useEffect, useRef } from "react";

export default function RiverBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let time = 0;

    // Generate Rivers (Sine wave paths)
    const rivers = [
        { x: w * 0.3, width: 20, flow: 1, color: "#d97706", offset: 0 }, // Tigris-ish (Amber)
        { x: w * 0.4, width: 25, flow: 0.8, color: "#b45309", offset: 100 }, // Euphrates-ish
        { x: w * 0.7, width: 40, flow: 1.2, color: "#f59e0b", offset: 200 }, // Nile-ish (Gold)
    ];

    // Particles (Trade/People)
    const particles = Array.from({ length: 200 }, () => ({
        y: Math.random() * h,
        riverIndex: Math.floor(Math.random() * rivers.length),
        speed: 0.5 + Math.random(),
        size: 1 + Math.random() * 2
    }));

    const animate = () => {
      // Deep Lapis Lazuli Background
      ctx.fillStyle = "#0f172a"; // Slate-900 (acting as deep blue base)
      ctx.fillRect(0, 0, w, h);
      
      // Overlay Lapis Blue Tint
      ctx.fillStyle = "rgba(30, 58, 138, 0.3)"; // Blue-900
      ctx.fillRect(0, 0, w, h);

      time += 0.01;

      // Draw Rivers
      rivers.forEach((r, i) => {
          ctx.beginPath();
          // Draw winding path
          for (let y = 0; y <= h; y += 10) {
              const x = r.x + Math.sin(y * 0.005 + time + r.offset) * 50;
              if (y === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
          }
          
          ctx.strokeStyle = "rgba(251, 191, 36, 0.1)"; // Faint Gold
          ctx.lineWidth = r.width;
          ctx.lineCap = "round";
          ctx.stroke();
          
          // Inner core
          ctx.strokeStyle = "rgba(251, 191, 36, 0.2)";
          ctx.lineWidth = r.width * 0.3;
          ctx.stroke();
      });

      // Draw Particles
      ctx.fillStyle = "#fbbf24"; // Gold
      particles.forEach(p => {
          const r = rivers[p.riverIndex];
          p.y += p.speed;
          if (p.y > h) p.y = -10;

          // Calculate X based on river path at current Y
          const riverX = r.x + Math.sin(p.y * 0.005 + time + r.offset) * 50;
          // Add some scatter
          const x = riverX + (Math.random() - 0.5) * r.width;

          ctx.beginPath();
          ctx.arc(x, p.y, p.size, 0, Math.PI*2);
          ctx.fill();
      });
      
      // Draw "Cities" (Static glowing nodes on river banks)
      // Hardcoded positions relative to river math
      [0.2, 0.5, 0.8].forEach(pct => {
          rivers.forEach(r => {
             const cy = h * pct;
             const cx = r.x + Math.sin(cy * 0.005 + time + r.offset) * 50;
             
             // City Glow
             const pulse = 10 + Math.sin(time * 5 + pct * 10) * 5;
             const g = ctx.createRadialGradient(cx, cy, 2, cx, cy, pulse);
             g.addColorStop(0, "#fff");
             g.addColorStop(0.5, "rgba(251, 191, 36, 0.8)");
             g.addColorStop(1, "transparent");
             
             ctx.fillStyle = g;
             ctx.beginPath();
             ctx.arc(cx, cy, pulse, 0, Math.PI*2);
             ctx.fill();
          });
      });

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