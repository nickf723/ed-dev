"use client";
import { useEffect, useRef } from "react";

export default function VectorBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let mouse = { x: w / 2, y: h / 2 };

    const gap = 30; // Distance between vectors
    const rows = Math.ceil(h / gap);
    const cols = Math.ceil(w / gap);

    const animate = () => {
      ctx.fillStyle = "#09090b"; // Zinc-950
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = "rgba(113, 113, 122, 0.2)"; // Zinc-500 low opacity
      ctx.lineWidth = 1;

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const px = x * gap;
          const py = y * gap;

          // Calculate vector angle based on mouse position
          const dx = mouse.x - px;
          const dy = mouse.y - py;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          // Math function: Angle points towards mouse, but decays with distance
          // Creating a "Field" effect
          const angle = Math.atan2(dy, dx);
          
          // Length depends on distance (inverse square law-ish)
          const length = Math.min(gap * 0.8, 1000 / (dist + 1));

          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(px + Math.cos(angle) * length, py + Math.sin(angle) * length);
          ctx.stroke();

          // Draw Arrowhead (small dot for cleanliness)
          // ctx.fillStyle = "rgba(255,255,255,0.1)";
          // ctx.fillRect(px - 1, py - 1, 2, 2);
        }
      }

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

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}