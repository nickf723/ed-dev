"use client";
import { useEffect, useRef } from "react";

export default function FluidBackground() {
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

    // "Blobs" of paint
    const blobs = [
        { x: w*0.2, y: h*0.2, r: 300, color: "hsla(320, 80%, 60%, 0.8)", vx: 1, vy: 1 }, // Pink
        { x: w*0.8, y: h*0.8, r: 400, color: "hsla(200, 80%, 60%, 0.8)", vx: -1, vy: -1 }, // Blue
        { x: w*0.5, y: h*0.5, r: 350, color: "hsla(260, 80%, 60%, 0.8)", vx: 1, vy: -1 }, // Purple
        { x: w*0.8, y: h*0.2, r: 250, color: "hsla(40, 90%, 60%, 0.8)", vx: -1, vy: 1 }, // Gold
    ];

    const animate = () => {
      // Clear with very low opacity to create trails/smear effect
      // Actually, for the "fluid" look, we usually just redraw everything 
      // but let's try a trail effect for smoother interaction.
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, w, h);

      time += 0.01;

      // Update Blobs
      blobs.forEach((b, i) => {
          // Automatic movement
          b.x += b.vx + Math.sin(time + i) * 0.5;
          b.y += b.vy + Math.cos(time + i) * 0.5;

          // Mouse Repulsion (Push paint)
          const dx = b.x - mouse.x;
          const dy = b.y - mouse.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 400) {
              const force = (400 - dist) / 400;
              b.x += (dx/dist) * force * 5;
              b.y += (dy/dist) * force * 5;
          }

          // Bounce
          if (b.x < 0 || b.x > w) b.vx *= -1;
          if (b.y < 0 || b.y > h) b.vy *= -1;

          // Draw Gradient
          const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
          g.addColorStop(0, b.color);
          g.addColorStop(1, "transparent");

          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.r, 0, Math.PI*2);
          ctx.fill();
      });

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

  // We add a CSS blur filter to the canvas container to blend the gradients into a smooth "oil paint" look
  return (
    <div className="fixed inset-0 z-0 pointer-events-none filter blur-[80px] opacity-60">
        <canvas ref={canvasRef} />
    </div>
  );
}