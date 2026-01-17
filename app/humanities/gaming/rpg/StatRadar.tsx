"use client";
import { useEffect, useRef } from "react";
import { RpgClass, STAT_CONFIG } from "./rpg-data";

export default function StatRadar({ rpgClass }: { rpgClass: RpgClass }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // We use refs to animate values smoothly
  const currentStats = useRef({ ...rpgClass.stats });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);
    let centerX = w / 2;
    let centerY = h / 2;
    let radius = Math.min(w, h) * 0.4;
    
    const statsKeys = Object.keys(rpgClass.stats) as Array<keyof typeof rpgClass.stats>;
    const totalStats = statsKeys.length;
    const angleStep = (Math.PI * 2) / totalStats;

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      
      // LERP stats for smooth transition
      let done = true;
      statsKeys.forEach(key => {
          const target = rpgClass.stats[key];
          const diff = target - currentStats.current[key];
          if (Math.abs(diff) > 0.1) {
              currentStats.current[key] += diff * 0.1;
              done = false;
          } else {
              currentStats.current[key] = target;
          }
      });

      // Draw Grid (Web)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx.lineWidth = 1;
      for (let level = 1; level <= 5; level++) {
          ctx.beginPath();
          for (let i = 0; i < totalStats; i++) {
              const r = (radius / 5) * level;
              const x = centerX + Math.cos(i * angleStep - Math.PI/2) * r;
              const y = centerY + Math.sin(i * angleStep - Math.PI/2) * r;
              if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.stroke();
      }

      // Draw Stat Shape (Filled)
      ctx.fillStyle = `${rpgClass.color}44`; // Transparent fill
      ctx.strokeStyle = rpgClass.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      statsKeys.forEach((key, i) => {
          // Normalize 0-10 stat to radius
          const val = currentStats.current[key];
          const r = (val / 10) * radius;
          const x = centerX + Math.cos(i * angleStep - Math.PI/2) * r;
          const y = centerY + Math.sin(i * angleStep - Math.PI/2) * r;
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Draw Labels & Points
      statsKeys.forEach((key, i) => {
          // Point
          const val = currentStats.current[key];
          const r = (val / 10) * radius;
          const x = centerX + Math.cos(i * angleStep - Math.PI/2) * r;
          const y = centerY + Math.sin(i * angleStep - Math.PI/2) * r;
          
          ctx.fillStyle = "#fff";
          ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI*2); ctx.fill();

          // Text Label
          const labelR = radius + 25;
          const lx = centerX + Math.cos(i * angleStep - Math.PI/2) * labelR;
          const ly = centerY + Math.sin(i * angleStep - Math.PI/2) * labelR;
          
          ctx.font = "10px monospace";
          ctx.fillStyle = STAT_CONFIG[key].color;
          ctx.textAlign = "center";
          ctx.fillText(key, lx, ly);
          ctx.fillStyle = "rgba(255,255,255,0.5)";
          ctx.fillText(Math.round(val).toString(), lx, ly + 12);
      });

      if(!done) requestAnimationFrame(render);
    };

    render();
    
    // Resize handler
    const resize = () => {
        w = canvas.width = canvas.offsetWidth;
        h = canvas.height = canvas.offsetHeight;
        centerX = w/2; centerY = h/2; radius = Math.min(w,h)*0.4;
        render();
    };
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);

  }, [rpgClass]); // Re-run effect when class changes to trigger anim

  return <canvas ref={canvasRef} className="w-full h-full" />;
}