"use client";
import { useEffect, useRef } from "react";

export default function PsychedelicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let t = 0;

    // Low res for performance + retro feel
    const scale = 4;
    const cols = Math.ceil(w / scale);
    const rows = Math.ceil(h / scale);

    const animate = () => {
      // No clearRect, we overwrite every pixel
      
      // Time scalers
      const t1 = t * 0.002;
      const t2 = t * 0.003;
      const t3 = t * 0.004;

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          // Normalize coordinates
          const u = x / 20;
          const v = y / 20;
          
          // Plasma Function: Sum of sines
          const v1 = Math.sin(u + t1);
          const v2 = Math.sin(v + t1);
          const v3 = Math.sin(u + v + t2);
          const v4 = Math.sin(Math.sqrt(u*u + v*v) + t3);
          
          const value = (v1 + v2 + v3 + v4) / 4; // -1 to 1
          
          // Map to color palette (Psychedelic)
          // We use HSL for smooth cycling
          // Hue shifts based on value and time
          const hue = (value * 180 + t * 0.5) % 360;
          const sat = 60 + value * 20;
          const light = 10 + value * 10; // Very dark base
          
          ctx.fillStyle = `hsl(${hue}, ${sat}%, ${light}%)`;
          ctx.fillRect(x * scale, y * scale, scale, scale);
        }
      }

      t += 1;
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
        {/* Oil Slick Overlay */}
        <div className="fixed inset-0 pointer-events-none z-0 opacity-20 mix-blend-color-dodge bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
    </>
  );
}