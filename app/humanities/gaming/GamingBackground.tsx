"use client";
import { useEffect, useRef } from "react";

export default function GamingBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let time = 0;

    // Artifacts representing different eras
    const artifacts: any[] = [];
    const icons = ['👾', '🎲', '♟️', '🎮', '🕹️'];

    for(let i=0; i<20; i++) {
        artifacts.push({
            x: Math.random() * w,
            y: Math.random() * h,
            z: Math.random() * 5, // Depth
            icon: icons[Math.floor(Math.random() * icons.length)],
            speed: 0.5 + Math.random()
        });
    }

    const animate = () => {
      ctx.fillStyle = "#020617"; // Deep midnight
      ctx.fillRect(0, 0, w, h);
      
      // Synthwave Grid Effect
      ctx.strokeStyle = "rgba(217, 70, 239, 0.3)"; // Magenta glow
      ctx.lineWidth = 1;
      ctx.beginPath();
      
      // Perspective horizon line
      const horizon = h * 0.6;
      
      // Vertical converging lines
      for (let i = -w; i < w * 2; i += 50) {
        // Introduce perspective curve
        const perspectiveX = (i - w/2) * (h/horizon) + w/2;
        ctx.moveTo(perspectiveX, h);
        ctx.lineTo(i, horizon);
      }

      // Horizontal scrolling lines
      const gridSpeed = (time * 50) % 50;
      for (let y = horizon; y < h; y += 50) {
          const perspectiveY = y + gridSpeed;
          if(perspectiveY < h) {
            ctx.moveTo(0, perspectiveY);
            ctx.lineTo(w, perspectiveY);
          }
      }
      ctx.stroke();

      // Draw Grid Glow
      ctx.shadowBlur = 20;
      ctx.shadowColor = "#d946ef";
      ctx.stroke();
      ctx.shadowBlur = 0;


      // Floating Artifacts
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      artifacts.forEach(a => {
          // Parallax movement
          a.y -= a.speed * a.z * 0.5;
          if(a.y < -50) {
              a.y = h + 50;
              a.x = Math.random() * w;
          }

          // Scale by depth
          const scale = 10 + a.z * 10;
          ctx.font = `${scale}px monospace`;
          
          // Glow effect based on icon type
          if(a.icon === '🎲') ctx.shadowColor = "#ef4444";
          else if(a.icon === '👾') ctx.shadowColor = "#22c55e";
          else ctx.shadowColor = "#06b6d4";
          
          ctx.shadowBlur = scale / 2;
          ctx.fillStyle = "rgba(255,255,255,0.8)";
          ctx.fillText(a.icon, a.x, a.y);
          ctx.shadowBlur = 0;
      });

      time += 0.01;
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

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none mix-blend-screen" />;
}