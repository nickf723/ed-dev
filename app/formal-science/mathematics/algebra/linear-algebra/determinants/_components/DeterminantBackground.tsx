"use client";
import { useEffect, useRef } from "react";

export default function DeterminantBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const render = () => {
      // Clear with dark amber void
      ctx.fillStyle = "#0c0602"; 
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const scale = 150; // Unit size

      // Continuous time-based matrix values for buttery smooth animation
      const time = Date.now() * 0.0005;
      const a = 1.2 + Math.sin(time) * 0.8;
      const b = Math.cos(time * 0.7) * 0.8;
      const c = Math.sin(time * 1.1) * 0.8;
      const d = 1.2 + Math.cos(time * 0.9) * 0.8;

      // 1. DRAW TRANSFORMED BACKGROUND GRID
      ctx.lineWidth = 1;
      const gridSteps = 10;
      for (let x = -gridSteps; x <= gridSteps; x++) {
          for (let y = -gridSteps; y <= gridSteps; y++) {
              // Transform (x, y) by Matrix [a b ; c d]
              const tx = x * a + y * b;
              const ty = x * c + y * d;

              // Project to screen
              const px = cx + tx * (scale / 4);
              const py = cy - ty * (scale / 4); // Invert Y

              ctx.fillStyle = "rgba(245, 158, 11, 0.15)";
              ctx.beginPath();
              ctx.arc(px, py, 1.5, 0, Math.PI*2);
              ctx.fill();
          }
      }

      // 2. DRAW UNIT SQUARE (Ghost)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx.setLineDash([5, 5]);
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + scale, cy);
      ctx.lineTo(cx + scale, cy - scale);
      ctx.lineTo(cx, cy - scale);
      ctx.closePath();
      ctx.stroke();
      ctx.setLineDash([]);

      // 3. DRAW TRANSFORMED PARALLELOGRAM
      const ix = a * scale;
      const iy = c * scale; // Inverted Y later
      const jx = b * scale;
      const jy = d * scale;

      const p0 = { x: cx, y: cy }; 
      const p1 = { x: cx + ix, y: cy - iy }; 
      const p2 = { x: cx + jx, y: cy - jy }; 
      const p3 = { x: cx + ix + jx, y: cy - iy - jy }; 

      const det = a * d - b * c;
      const isFlipped = det < 0;

      // Fill Shape (Amber if positive, Red if flipped)
      ctx.fillStyle = isFlipped ? "rgba(239, 68, 68, 0.15)" : "rgba(245, 158, 11, 0.15)";
      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      ctx.lineTo(p1.x, p1.y);
      ctx.lineTo(p3.x, p3.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.closePath();
      ctx.fill();

      // Stroke Shape
      ctx.strokeStyle = isFlipped ? "#ef4444" : "#f59e0b";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw Basis Vectors
      ctx.strokeStyle = "#38bdf8"; // i-hat (Cyan)
      ctx.beginPath(); ctx.moveTo(p0.x, p0.y); ctx.lineTo(p1.x, p1.y); ctx.stroke();
      
      ctx.strokeStyle = "#a3e635"; // j-hat (Lime)
      ctx.beginPath(); ctx.moveTo(p0.x, p0.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();

      // 4. SHOW DETERMINANT VALUE
      ctx.fillStyle = "#fff";
      ctx.font = "bold 24px monospace";
      ctx.textAlign = "center";
      ctx.fillText(`det(A) = ${det.toFixed(2)}`, cx, cy + 80);

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

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-60 pointer-events-none" />;
}