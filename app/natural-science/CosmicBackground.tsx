"use client";
import { useEffect, useRef } from "react";

export default function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    
    // Stars
    const stars: {x: number, y: number, size: number, alpha: number}[] = [];
    for(let i=0; i<200; i++) {
        stars.push({
            x: Math.random() * w,
            y: Math.random() * h,
            size: Math.random() * 1.5,
            alpha: Math.random()
        });
    }

    // Nebula Clouds (Large moving gradients)
    const clouds = [
        { x: w*0.2, y: h*0.2, r: 400, color: "rgba(76, 29, 149, 0.1)", vx: 0.2, vy: 0.1 }, // Indigo
        { x: w*0.8, y: h*0.8, r: 500, color: "rgba(6, 182, 212, 0.1)", vx: -0.1, vy: -0.2 }, // Cyan
        { x: w*0.5, y: h*0.5, r: 300, color: "rgba(236, 72, 153, 0.05)", vx: 0.1, vy: 0.1 }, // Pink
    ];

    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      // 1. Draw Stars (Background)
      ctx.fillStyle = "white";
      stars.forEach(s => {
          ctx.globalAlpha = s.alpha * 0.8; // Twinkle base
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI*2);
          ctx.fill();
          
          // Slow drift
          s.y -= 0.05; 
          if(s.y < 0) s.y = h;
      });

      // 2. Draw Nebula (Foreground Volumetrics)
      // Using lighter composite operation for glow
      ctx.globalCompositeOperation = "screen";
      
      clouds.forEach(c => {
          c.x += c.vx; 
          c.y += c.vy;
          // Bounce clouds
          if(c.x < 0 || c.x > w) c.vx *= -1;
          if(c.y < 0 || c.y > h) c.vy *= -1;

          const g = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.r);
          g.addColorStop(0, c.color);
          g.addColorStop(1, "transparent");
          
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(c.x, c.y, c.r, 0, Math.PI*2);
          ctx.fill();
      });

      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;

      requestAnimationFrame(animate);
    };

    animate();
    
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
        <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-60" />
        <div className="hd-vignette" />
        {/* Subtle color grade overlay */}
        <div className="fixed inset-0 z-0 pointer-events-none bg-indigo-950/10 mix-blend-overlay" />
    </>
  );
}