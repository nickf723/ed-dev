"use client";
import { useEffect, useRef } from "react";

export default function SynesthesiaBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let time = 0;

    // "Sensory Sources"
    const sources = [
        { x: 0.2, y: 0.3, freq: 0.05, amp: 20, color: [255, 0, 100] },   // Red/Pink
        { x: 0.8, y: 0.7, freq: 0.03, amp: 30, color: [0, 255, 200] },   // Cyan/Teal
        { x: 0.5, y: 0.5, freq: 0.07, amp: 15, color: [100, 50, 255] },  // Violet
    ];

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, w, h);

      // Optimization: Draw fewer, larger shapes instead of per-pixel
      // to simulate the interference pattern for performance in JS
      ctx.globalCompositeOperation = "screen";

      sources.forEach((s, i) => {
          const cx = s.x * w;
          const cy = s.y * h;
          const radius = (Math.sin(time * s.freq) + 1) * 200 + 100;
          
          const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
          const c = s.color;
          
          // Pulse alpha
          const alpha = (Math.sin(time * 0.5 + i) + 1) * 0.15;
          
          g.addColorStop(0, `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${alpha})`);
          g.addColorStop(1, "transparent");
          
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, Math.PI*2);
          ctx.fill();
      });
      
      // Add "Rain" of symbols (Grapheme-Color)
      const t = time * 0.5;
      for(let i=0; i<10; i++) {
          const x = (i * w / 10) + Math.sin(t + i) * 50;
          const y = (t * 20 + i * 100) % h;
          
          ctx.fillStyle = `hsla(${(i * 36) + t * 10}, 70%, 60%, 0.1)`;
          ctx.font = "20px serif";
          ctx.fillText(String.fromCharCode(65+i), x, y);
      }

      ctx.globalCompositeOperation = "source-over";
      time += 0.02;
      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    return () => { window.removeEventListener("resize", handleResize); cancelAnimationFrame(animId); };
  }, []);

  return (
    <>
        <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-60" />
        <div className="hd-vignette" />
        {/* Prismatic aberration overlay */}
        <div className="fixed inset-0 pointer-events-none z-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/shattered-island.png')] mix-blend-overlay" />
    </>
  );
}