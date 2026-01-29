"use client";
import { useEffect, useRef } from "react";

export default function PulseBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    
    // EKG Parameters
    let x = 0;
    const speed = 2;
    const baseline = h / 2;
    let pulses: {x: number, y: number}[] = []; // Trail points
    
    // Medical Palette (Teal / Green / Red alerts)
    const color = "#14b8a6"; // Teal-500

    const animate = () => {
      // Fade effect (phosphor persistence)
      ctx.fillStyle = "rgba(0, 5, 5, 0.1)";
      ctx.fillRect(0, 0, w, h);

      // Draw Grid
      ctx.strokeStyle = "rgba(20, 184, 166, 0.05)";
      ctx.lineWidth = 1;
      const gridSize = 50;
      
      ctx.beginPath();
      for(let gx=0; gx<=w; gx+=gridSize) { ctx.moveTo(gx,0); ctx.lineTo(gx,h); }
      for(let gy=0; gy<=h; gy+=gridSize) { ctx.moveTo(0,gy); ctx.lineTo(w,gy); }
      ctx.stroke();

      // Calculate new Y
      let y = baseline;
      
      // Simple EKG Rhythm simulation
      // P wave, QRS complex, T wave
      const cycle = x % 600; // Repeat every 600px
      
      if (cycle > 50 && cycle < 80) y -= Math.sin((cycle-50)/30 * Math.PI) * 20; // P
      else if (cycle > 100 && cycle < 120) y += 10; // Q
      else if (cycle >= 120 && cycle < 140) y -= 150; // R (Spike)
      else if (cycle >= 140 && cycle < 160) y += 40; // S
      else if (cycle > 200 && cycle < 260) y -= Math.sin((cycle-200)/60 * Math.PI) * 30; // T
      
      // Add jitter/noise
      y += (Math.random() - 0.5) * 4;

      // Store point
      pulses.push({x, y});
      
      // Draw Line
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.shadowBlur = 10;
      ctx.shadowColor = color;
      
      // Only draw visible segment
      const tailLength = 800;
      const startIdx = Math.max(0, pulses.length - tailLength);
      
      if (pulses.length > 0) {
          ctx.moveTo(pulses[startIdx].x, pulses[startIdx].y);
          for(let i = startIdx; i < pulses.length; i++) {
             ctx.lineTo(pulses[i].x, pulses[i].y); 
          }
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Draw "Head"
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI*2);
      ctx.fill();

      // Advance
      x += speed;
      if (x > w) {
          x = 0;
          pulses = [];
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
        <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-50" />
        <div className="hd-vignette" />
        <div className="hd-scanlines opacity-20" />
    </>
  );
}