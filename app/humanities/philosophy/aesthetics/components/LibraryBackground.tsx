"use client";
import { useEffect, useRef } from "react";

export default function LibraryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // --- CONFIG ---
    // Floating "Orbs" of color
    const orbs = [
        { x: w*0.2, y: h*0.2, r: 300, color: "rgba(244, 63, 94, 0.4)", vx: 0.5, vy: 0.2 }, // Rose
        { x: w*0.8, y: h*0.8, r: 400, color: "rgba(167, 139, 250, 0.4)", vx: -0.3, vy: -0.4 }, // Violet
        { x: w*0.5, y: h*0.5, r: 350, color: "rgba(56, 189, 248, 0.4)", vx: 0.2, vy: 0.6 }, // Sky
        { x: w*0.1, y: h*0.9, r: 250, color: "rgba(251, 191, 36, 0.4)", vx: 0.4, vy: -0.2 }  // Amber
    ];

    const render = () => {
      // Clear
      ctx.fillStyle = "#0a0a0a"; 
      ctx.fillRect(0, 0, w, h);

      // We use a heavy blur to blend them
      ctx.filter = "blur(80px)";
      ctx.globalCompositeOperation = "screen";

      orbs.forEach(orb => {
          // Move
          orb.x += orb.vx;
          orb.y += orb.vy;

          // Bounce
          if (orb.x < 0 || orb.x > w) orb.vx *= -1;
          if (orb.y < 0 || orb.y > h) orb.vy *= -1;

          // Draw
          ctx.fillStyle = orb.color;
          ctx.beginPath();
          ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI*2);
          ctx.fill();
      });

      ctx.filter = "none";
      ctx.globalCompositeOperation = "source-over";

      requestAnimationFrame(render);
    };

    const animId = requestAnimationFrame(render);
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-30 pointer-events-none" />;
}