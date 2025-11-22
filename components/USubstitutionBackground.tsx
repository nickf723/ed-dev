"use client";
import { useEffect, useRef } from "react";

export default function USubstitutionBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let time = 0;
    
    const gridSize = 40;
    const cols = Math.ceil(w / gridSize);
    const rows = Math.ceil(h / gridSize);

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      
      // Dark Indigo Background
      ctx.fillStyle = "#020410"; 
      ctx.fillRect(0, 0, w, h);
      
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(99, 102, 241, 0.15)"; // Indigo-500
      
      // Animate the "warp" factor
      // Moves from 0 (straight) to 1 (warped) and back
      const warp = (Math.sin(time) + 1) / 2; 

      // Draw Vertical Lines (The ones that bend)
      for (let x = 0; x <= w; x += gridSize) {
          ctx.beginPath();
          for (let y = 0; y <= h; y += 10) {
              // Apply non-linear transformation
              // x' = x + sin(y) * amount
              const distortion = Math.sin(y * 0.01 + time) * 50 * warp;
              
              if (y === 0) ctx.moveTo(x + distortion, y);
              else ctx.lineTo(x + distortion, y);
          }
          ctx.stroke();
      }

      // Draw Horizontal Lines
      for (let y = 0; y <= h; y += gridSize) {
          ctx.beginPath();
          for (let x = 0; x <= w; x += 10) {
              const distortion = Math.sin(y * 0.01 + time) * 50 * warp;
              // We distort x coordinate to match vertical bending
              // Ideally we'd warp Y too for full effect, but 1D substition usually affects one axis
              const dx = x; // + distortion? No, let's keep horizontals straight-ish to show the "slice"
              
              // Actually, let's just flow them
              if (x === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
          }
          ctx.stroke();
      }

      time += 0.01;
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
    </>
  );
}