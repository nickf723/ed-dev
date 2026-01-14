"use client";
import { useEffect, useRef } from "react";

export default function PerformingArtsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let time = 0;

    const render = () => {
      ctx.fillStyle = "#020202"; // Deep black
      ctx.fillRect(0, 0, w, h);

      // 1. VOLUMETRIC RAYS (Subtle background beams)
      const rayCount = 4;
      for(let i=0; i<rayCount; i++) {
          const x = (w / rayCount) * i + (w/rayCount)/2;
          const gradient = ctx.createLinearGradient(x, 0, x, h);
          gradient.addColorStop(0, "rgba(255, 255, 255, 0.02)");
          gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.moveTo(x - 100, 0);
          ctx.lineTo(x + 100, 0);
          ctx.lineTo(x + (i%2===0 ? 300 : -300), h);
          ctx.lineTo(x + (i%2===0 ? 100 : -500), h);
          ctx.fill();
      }

      // 2. THE WMP VISUALIZER (Sine Waves)
      // We draw 3 overlapping waves with different frequencies
      ctx.lineWidth = 2;
      
      [
        { color: "rgba(244, 63, 94, 0.15)", speed: 0.002, freq: 0.003, amp: 100 }, // Rose
        { color: "rgba(14, 165, 233, 0.15)", speed: 0.003, freq: 0.005, amp: 150 }, // Cyan
        { color: "rgba(217, 70, 239, 0.15)", speed: 0.001, freq: 0.002, amp: 200 }, // Fuchsia
        
      ].forEach((wave, i) => {
          ctx.beginPath();
          ctx.strokeStyle = wave.color;
          
          for (let x = 0; x < w; x+=5) {
              // Sine wave formula: y = Amplitude * sin(Frequency * x + Time)
              const y = (h/2) + 
                        Math.sin(x * wave.freq + time * wave.speed) * wave.amp + 
                        Math.sin(x * 0.01 + time) * 50; // Add complexity
              
              if (x === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
          }
          ctx.stroke();
      });

      // 3. DUST MOTES
      // (Optional: Keep it clean or add dust if you want texture. Leaving out for clean WMP look)

      time += .05;
      requestAnimationFrame(render);
    };

    const animId = requestAnimationFrame(render);
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}