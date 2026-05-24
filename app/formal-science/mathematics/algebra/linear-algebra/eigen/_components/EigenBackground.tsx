"use client";
import { useEffect, useRef } from "react";

export default function EigenBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // --- STATE ---
    // We visualize a simple 2x2 matrix transformation:
    // A = [ 3  1 ]
    //     [ 0  2 ]
    // Eigenvalues: 3, 2
    // Eigenvectors: [1, 0] (x-axis) and [1, -1] (diagonal)
    
    let time = 0;

    const render = () => {
      // Clear with "Void" Fuchsia
      ctx.fillStyle = "#0f0518"; 
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const scale = 100;
      
      time += 0.02;

      // Animate the "Transform" effect
      // We oscillate between Identity (I) and Matrix (A) to show the stretch
      const t = (Math.sin(time) + 1) / 2; // 0 to 1

      // Interpolated Matrix M
      // I = [1, 0 / 0, 1]
      // A = [2, 1 / 0, 1.5] (Simplified for visuals)
      const m11 = 1 + t * 1;   // 1 -> 2
      const m12 = t * 1;       // 0 -> 1
      const m21 = 0;           // 0 -> 0
      const m22 = 1 + t * 0.5; // 1 -> 1.5

      // 1. DRAW FIELD VECTORS (The Chaos)
      const count = 24;
      for (let i = 0; i < count; i++) {
          const angle = (i / count) * Math.PI * 2;
          const px = Math.cos(angle);
          const py = Math.sin(angle);

          // Transform
          const tx = m11 * px + m12 * py;
          const ty = m21 * px + m22 * py;

          // Draw Line from Origin
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx + tx * scale, cy - ty * scale);
          ctx.strokeStyle = "rgba(232, 121, 249, 0.1)"; // Faint Fuchsia
          ctx.stroke();

          // Draw Tip
          ctx.beginPath();
          ctx.arc(cx + tx * scale, cy - ty * scale, 2, 0, Math.PI*2);
          ctx.fillStyle = "rgba(232, 121, 249, 0.2)";
          ctx.fill();
      }

      // 2. DRAW EIGENVECTORS (The Stability)
      // Eigen 1: [1, 0] (Horizontal) -> Scales by eigenvalue 2
      // Eigen 2: [-1, 1] (Diagonal) -> Scales by eigenvalue ~1ish visually
      
      const drawEigen = (vx: number, vy: number, label: string, lambda: number) => {
          // Transform
          const tx = m11 * vx + m12 * vy;
          const ty = m21 * vx + m22 * vy;
          
          // Draw "Beam"
          ctx.shadowBlur = 20;
          ctx.shadowColor = "#d946ef";
          ctx.strokeStyle = "#d946ef"; // Bright Fuchsia
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(cx - tx * scale * 5, cy + ty * scale * 5); // Infinite line
          ctx.lineTo(cx + tx * scale * 5, cy - ty * scale * 5);
          ctx.stroke();
          ctx.shadowBlur = 0;

          // Draw Vector Arrow
          const ex = cx + tx * scale;
          const ey = cy - ty * scale;
          
          ctx.fillStyle = "#fff";
          ctx.beginPath();
          ctx.arc(ex, ey, 5, 0, Math.PI*2);
          ctx.fill();

          // Label
          ctx.font = "bold 12px monospace";
          ctx.fillText(`${label} (λ ≈ ${(1 + t * (lambda-1)).toFixed(1)})`, ex + 10, ey - 10);
      };

      // EV1 (Horizontal Axis)
      drawEigen(1, 0, "v1", 2);
      
      // EV2 (The other stable axis in this specific shear)
      // For [2 1; 0 1.5], e-vecs are [1, 0] and [1, -0.5] roughly
      drawEigen(0.9, -0.45, "v2", 1.5); 

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