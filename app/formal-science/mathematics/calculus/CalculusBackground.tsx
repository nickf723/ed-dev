"use client";
import { useEffect, useRef } from "react";

export default function CalculusBackground() {
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
      // Blueprint Background
      ctx.fillStyle = "#0f172a"; // Slate-900
      ctx.fillRect(0, 0, w, h);

      // Draw Grid
      ctx.strokeStyle = "rgba(255,255,255,0.05)";
      ctx.lineWidth = 1;
      const gridSize = 50;
      
      // Moving Grid Effect
      const offsetX = time % gridSize;
      
      ctx.beginPath();
      for(let x = -offsetX; x < w; x += gridSize) { ctx.moveTo(x, 0); ctx.lineTo(x, h); }
      for(let y = 0; y < h; y += gridSize) { ctx.moveTo(0, y); ctx.lineTo(w, y); }
      ctx.stroke();

      // COORDINATE SYSTEM CENTER
      const cy = h / 2;
      ctx.strokeStyle = "rgba(255,255,255,0.2)";
      ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(w, cy); ctx.stroke();

      // --- THE FUNCTION: y = sin(x) ---
      // We scale it to look nice
      const amplitude = h * 0.15;
      const frequency = 0.01;
      const speed = 2;

      // 1. Draw The Curve
      ctx.strokeStyle = "#38bdf8"; // Cyan
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let x = 0; x < w; x++) {
          const y = cy + Math.sin((x + time * speed) * frequency) * amplitude;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // 2. THE SCANNER (The "Current x")
      // We fix the scanner at the center of the screen, or let it oscillate
      const scannerX = w / 2;
      // Calculate the specific math at this point
      const angle = (scannerX + time * speed) * frequency;
      const valY = cy + Math.sin(angle) * amplitude;
      
      // Derivative (Slope) = cos(x)
      const slope = Math.cos(angle); 

      // Draw Vertical Scanner Line
      ctx.strokeStyle = "rgba(255,255,255,0.5)";
      ctx.setLineDash([5, 5]);
      ctx.beginPath(); ctx.moveTo(scannerX, 0); ctx.lineTo(scannerX, h); ctx.stroke();
      ctx.setLineDash([]);

      // 3. VISUALIZE DERIVATIVE (Tangent Line)
      // Tangent length
      const tanLen = 100;
      // Calculate start and end of tangent line based on slope
      // dy/dx = slope. 
      // y - y1 = m(x - x1)
      ctx.strokeStyle = "#f472b6"; // Pink
      ctx.lineWidth = 2;
      ctx.beginPath();
      // Draw a line segment with slope 'slope' centered at (scannerX, valY)
      // This is an approximation for visual effect
      ctx.moveTo(scannerX - tanLen, valY + (Math.sin(angle - tanLen*frequency)*amplitude - Math.sin(angle)*amplitude)); // Simplified visual anchor
      // Actually, let's use the exact derivative for the visual line
      // slope = cos(angle) * amplitude * frequency (chain rule for pixels)
      const pixSlope = slope * amplitude * frequency;
      ctx.moveTo(scannerX - 50, valY + 50 * pixSlope); // Left point (reversed y for canvas)
      ctx.lineTo(scannerX + 50, valY - 50 * pixSlope); // Right point
      ctx.stroke();

      // Draw Tangent Point
      ctx.fillStyle = "#fff";
      ctx.beginPath(); ctx.arc(scannerX, valY, 4, 0, Math.PI*2); ctx.fill();

      // 4. VISUALIZE INTEGRAL (Area under curve)
      // We shade from x=0 to scannerX
      ctx.fillStyle = "rgba(56, 189, 248, 0.1)"; // Faint Cyan
      ctx.beginPath();
      ctx.moveTo(0, cy);
      for (let x = 0; x <= scannerX; x++) {
          const y = cy + Math.sin((x + time * speed) * frequency) * amplitude;
          ctx.lineTo(x, y);
      }
      ctx.lineTo(scannerX, cy);
      ctx.fill();

      time++;
      requestAnimationFrame(render);
    };

    const animId = requestAnimationFrame(render);
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none bg-[#0f172a]" />;
}