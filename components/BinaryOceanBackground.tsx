"use client";
import { useEffect, useRef } from "react";

export default function BinaryOceanBackground() {
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
    
    // The grid state: 0 or 1
    const grid: { val: number; alpha: number; highlight: number }[] = [];
    
    for (let i = 0; i < cols * rows; i++) {
      grid.push({
        val: Math.random() > 0.5 ? 1 : 0,
        alpha: 0.1, // Base dimness
        highlight: 0 
      });
    }

    // Wave packets traveling through the data
    const waves: { x: number; y: number; vx: number; vy: number }[] = [];
    
    const spawnWave = () => {
        waves.push({
            x: Math.random() * cols,
            y: Math.random() * rows,
            vx: Math.random() * 1 - 0.5,
            vy: Math.random() * 1 - 0.5
        });
    };

    // Initial waves
    for(let i=0; i<5; i++) spawnWave();

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.font = `${fontSize}px monospace`;
      
      // Update Waves
      waves.forEach(wave => {
         wave.x += wave.vx;
         wave.y += wave.vy;
         
         // Wrap around
         if(wave.x < 0) wave.x = cols;
         if(wave.x > cols) wave.x = 0;
         if(wave.y < 0) wave.y = rows;
         if(wave.y > rows) wave.y = 0;
      });

      // Draw Grid
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = y * cols + x;
          const cell = grid[i];
          
          // Randomly flip bit (Noise)
          if (Math.random() > 0.99) {
             cell.val = cell.val === 1 ? 0 : 1;
          }

          // Calculate proximity to waves (Signal)
          let signalStrength = 0;
          waves.forEach(wave => {
             const dist = Math.hypot(x - wave.x, y - wave.y);
             if(dist < 15) {
                 signalStrength += (1 - dist/15);
             }
          });
          
          // Decay highlight
          cell.highlight = Math.max(cell.highlight * 0.95, signalStrength);
          
          // Determine color
          if (cell.highlight > 0.1) {
              ctx.fillStyle = `rgba(34, 211, 238, ${cell.highlight})`; // Cyan highlight
          } else {
              ctx.fillStyle = `rgba(34, 211, 238, 0.05)`; // Dim background
          }
          
          ctx.fillText(cell.val.toString(), x * fontSize, y * fontSize);
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
        <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
        <div className="hd-vignette" />
        {/* Scanline overlay for that retro-terminal feel */}
        <div className="fixed inset-0 pointer-events-none z-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] opacity-20" />
    </>
  );
}