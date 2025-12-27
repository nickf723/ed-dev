"use client";
import { useEffect, useRef } from "react";

export default function CipherBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    
    const fontSize = 14;
    const cols = Math.ceil(w / fontSize);
    const rows = Math.ceil(h / fontSize);
    
    // "Hacker" Characters
    const chars = "01XYZØΩΠΣ";
    
    // Grid state
    const grid: { char: string; lock: number; alpha: number }[] = [];
    
    for(let i=0; i<cols*rows; i++) {
        grid.push({ 
            char: chars[Math.floor(Math.random() * chars.length)], 
            lock: 0,
            alpha: 0.05
        });
    }
    
    // Scanning lines
    const scanners: { y: number; speed: number }[] = [
        { y: 0, speed: 2 },
        { y: h/2, speed: 3 }
    ];

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#020617"; // Slate-950
      ctx.fillRect(0, 0, w, h);
      
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
      ctx.textBaseline = "top";

      // Update Scanners
      scanners.forEach(s => {
          s.y += s.speed;
          if(s.y > h) s.y = -100;
      });

      // Draw Grid
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
           const i = y * cols + x;
           const cell = grid[i];
           const py = y * fontSize;
           const px = x * fontSize;

           // Scramble effect if near a scanner
           let active = false;
           scanners.forEach(s => {
               if (Math.abs(py - s.y) < 50) {
                   active = true;
                   if (Math.random() > 0.8) {
                       cell.char = chars[Math.floor(Math.random() * chars.length)];
                       cell.alpha = 1;
                   }
               }
           });
           
           // Decay
           if (!active) {
               cell.alpha *= 0.95;
               if (cell.alpha < 0.05) cell.alpha = 0.05;
           }
           
           ctx.fillStyle = `rgba(16, 185, 129, ${cell.alpha})`; // Emerald
           ctx.fillText(cell.char, px, py);
        }
      }

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
        {/* CRT Line Overlay */}
        <div className="fixed inset-0 pointer-events-none z-0 opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,6px_100%]" />
    </>
  );
}