"use client";
import { useEffect, useRef } from "react";

export default function SoftwareBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    
    // Matrix characters (Katakana + Latin)
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$<>?[]{}";
    const fontSize = 14;
    const columns = Math.floor(w / fontSize);
    
    // Array to track y-coordinate of each column
    const drops: number[] = new Array(columns).fill(1);

    const render = () => {
      // Fade out effect (Black with low opacity)
      ctx.fillStyle = "rgba(0, 5, 2, 0.05)";
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = "#0f0"; // Matrix Green
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Random char
        const text = chars[Math.floor(Math.random() * chars.length)];
        
        // Draw
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        
        // Randomly highlight some chars brighter
        ctx.fillStyle = Math.random() > 0.95 ? "#fff" : "#22c55e"; 
        ctx.fillText(text, x, y);

        // Reset drop to top randomly
        if (y > h && Math.random() > 0.975) {
            drops[i] = 0;
        }
        
        // Move down
        drops[i]++;
      }

      requestAnimationFrame(render);
    };

    const animId = requestAnimationFrame(render);
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none bg-black" />;
}