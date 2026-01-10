"use client";
import { useEffect, useRef } from "react";

export default function FundamentalsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // --- STATE ---
    let offset = 0; // Camera position
    const tickSpacing = 100; // Pixels between integers
    const speed = 0.5;

    const render = () => {
      // Clear with dark teal void
      ctx.fillStyle = "#022c22"; // Emerald-950/darker
      ctx.fillRect(0, 0, w, h);

      const cy = h / 2;
      offset += speed;

      ctx.strokeStyle = "rgba(52, 211, 153, 0.2)"; // Emerald-400
      ctx.fillStyle = "rgba(52, 211, 153, 0.4)";
      ctx.textAlign = "center";
      ctx.font = "12px monospace";

      // --- DRAW NUMBER LINE ---
      // We calculate which integers are visible on screen based on 'offset'
      const startInt = Math.floor(offset / tickSpacing) - Math.floor(w / (2 * tickSpacing)) - 1;
      const endInt = startInt + Math.ceil(w / tickSpacing) + 2;

      ctx.beginPath();
      ctx.moveTo(0, cy);
      ctx.lineTo(w, cy);
      ctx.stroke();

      for (let i = startInt; i <= endInt; i++) {
          // Screen X position
          const x = (i * tickSpacing) - offset + w/2;
          
          // Major Tick (Integer)
          ctx.beginPath();
          ctx.moveTo(x, cy - 15);
          ctx.lineTo(x, cy + 15);
          ctx.lineWidth = 2;
          ctx.stroke();

          // Label
          ctx.fillText(i.toString(), x, cy + 30);

          // Minor Ticks (Fractions)
          ctx.lineWidth = 1;
          for(let j=1; j<4; j++) {
              const mx = x + (j * tickSpacing / 4);
              ctx.beginPath();
              ctx.moveTo(mx, cy - 5);
              ctx.lineTo(mx, cy + 5);
              ctx.stroke();
          }

          // Special Constants (Decorations)
          if (i === 3) {
              const piX = x + (0.14159 * tickSpacing);
              ctx.fillStyle = "rgba(52, 211, 153, 0.8)";
              ctx.fillText("π", piX, cy - 25);
              ctx.fillRect(piX - 1, cy - 2, 2, 4);
              ctx.fillStyle = "rgba(52, 211, 153, 0.4)"; // Reset
          }
          if (i === 2) {
             const eX = x + (0.718 * tickSpacing);
             ctx.fillText("e", eX, cy - 25);
          }
      }

      // --- DRAW FLOATING OPERATORS ---
      // Background noise of +, -, ÷ symbols
      // (Simplified for performance: static overlay in CSS is often better, 
      // but let's add a few drifting ones here)
      const time = Date.now() * 0.001;
      ctx.font = "24px monospace";
      ctx.globalAlpha = 0.05;
      ctx.fillText("+", w*0.2, h*0.2 + Math.sin(time)*20);
      ctx.fillText("÷", w*0.8, h*0.8 + Math.cos(time)*20);
      ctx.fillText("≠", w*0.6, h*0.3 + Math.sin(time*0.5)*30);
      ctx.globalAlpha = 1;

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

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-50 pointer-events-none" />;
}