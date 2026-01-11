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

    // --- STATE ---
    // Matrix A = [[a, b], [c, d]]
    // Target Matrix (we lerp towards this)
    let targetM = { a: 1, b: 0, c: 0, d: 1 };
    // Current Matrix (interpolated)
    let currentM = { a: 1, b: 0, c: 0, d: 1 };
    
    let timer = 0;

    const generateTarget = () => {
        // Random shear/scale matrix
        targetM = {
            a: 1 + (Math.random() - 0.5) * 1.5,
            b: (Math.random() - 0.5) * 1.5,
            c: (Math.random() - 0.5) * 1.5,
            d: 1 + (Math.random() - 0.5) * 1.5
        };
    };

    const lerp = (start: number, end: number, amt: number) => (1 - amt) * start + amt * end;

    const render = () => {
      // Clear with dark amber/black
      ctx.fillStyle = "#0c0602"; 
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const scale = 150; // Unit size

      timer++;
      if (timer > 200) {
          generateTarget();
          timer = 0;
      }

      // Smoothly transition matrix values
      const speed = 0.05;
      currentM.a = lerp(currentM.a, targetM.a, speed);
      currentM.b = lerp(currentM.b, targetM.b, speed);
      currentM.c = lerp(currentM.c, targetM.c, speed);
      currentM.d = lerp(currentM.d, targetM.d, speed);

      // 1. DRAW UNIT SQUARE (Ghost)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.setLineDash([5, 5]);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.rect(cx, cy - scale, scale, scale); // 1x1 square in Q1 (Cartesian)
      // Note: Canvas Y is inverted, so (1,1) is (cx+scale, cy-scale)
      // Actually let's draw centered logic: Unit square usually from (0,0) to (1,0), (1,1), (0,1)
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + scale, cy);
      ctx.lineTo(cx + scale, cy - scale);
      ctx.lineTo(cx, cy - scale);
      ctx.closePath();
      ctx.stroke();
      ctx.setLineDash([]);

      // 2. DRAW TRANSFORMED PARALLELOGRAM
      // Basis Vectors
      // i_hat = [a, c] (First col of matrix)
      // j_hat = [b, d] (Second col of matrix)
      // Note: In standard math:
      // [x'] = [a b] [x]
      // [y']   [c d] [y]
      // i (1,0) -> (a, c)
      // j (0,1) -> (b, d)
      
      const ix = currentM.a * scale;
      const iy = currentM.c * scale; // Inverted Y later
      const jx = currentM.b * scale;
      const jy = currentM.d * scale;

      // Points
      const p0 = { x: cx, y: cy }; // Origin
      const p1 = { x: cx + ix, y: cy - iy }; // i_hat tip
      const p2 = { x: cx + jx, y: cy - jy }; // j_hat tip
      const p3 = { x: cx + ix + jx, y: cy - iy - jy }; // (i+j) tip

      // Fill Shape (Amber)
      ctx.fillStyle = "rgba(245, 158, 11, 0.1)"; // Amber-500 low opacity
      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      ctx.lineTo(p1.x, p1.y);
      ctx.lineTo(p3.x, p3.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.closePath();
      ctx.fill();

      // Stroke Shape
      ctx.strokeStyle = "#f59e0b";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw Basis Vectors
      // i_hat (Red-ish Amber)
      ctx.strokeStyle = "#ef4444";
      ctx.beginPath(); ctx.moveTo(p0.x, p0.y); ctx.lineTo(p1.x, p1.y); ctx.stroke();
      // j_hat (Green-ish Amber)
      ctx.strokeStyle = "#22c55e";
      ctx.beginPath(); ctx.moveTo(p0.x, p0.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();

      // 3. SHOW DETERMINANT VALUE
      const det = currentM.a * currentM.d - currentM.b * currentM.c;
      ctx.fillStyle = "#fff";
      ctx.font = "bold 20px monospace";
      ctx.fillText(`Area Scale: ${det.toFixed(2)}x`, cx, cy + 50);

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