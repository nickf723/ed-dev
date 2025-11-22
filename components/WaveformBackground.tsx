"use client";
import { useEffect, useRef } from "react";

export default function WaveformBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let time = 0;

    const lines = 20;
    // Music Palette (Rose / Amber / Violet)
    const colors = ["#fb7185", "#f472b6", "#a78bfa", "#fbbf24"];

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 2;

      for (let i = 0; i < lines; i++) {
        ctx.beginPath();
        const yBase = h / 2 + (i - lines / 2) * 30;
        const color = colors[i % colors.length];
        
        ctx.strokeStyle = color;
        ctx.globalAlpha = 0.15; // Ghostly
        
        for (let x = 0; x <= w; x += 5) {
            // AM/FM Synthesis visualization
            // varying frequency and amplitude based on x and time
            const freq = 0.01 + i * 0.001;
            const amp = 50 + i * 5;
            const phase = time + i * 0.5;
            
            const y = yBase + Math.sin(x * freq + phase) * (Math.sin(x * 0.002 + time * 0.5) * amp);
            
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      time += 0.02;
      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-50 mix-blend-screen"
    />
  );
}