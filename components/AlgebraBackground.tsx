"use client";
import { useEffect, useRef } from "react";

export default function AlgebraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let time = 0;

    // --- CONFIGURATION ---
    const GRID_LINES = 20; // Number of lines from center
    const SPACING = 60;    // Base spacing units

    // Floating constants for texture
    const SYMBOLS = ["x", "y", "z", "α", "β", "λ", "θ", "π", "∑", "∫"];
    const particles = Array.from({ length: 25 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      char: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      color: ["#FDE047", "#67E8F9", "#F472B6"][Math.floor(Math.random() * 3)], // Yellow, Cyan, Pink
      size: Math.random() * 14 + 10,
      opacity: Math.random() * 0.5 + 0.1,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3
    }));

    const animate = () => {
      // 0. Setup
      ctx.clearRect(0, 0, w, h);
      
      // Deep Background (Navy Void)
      const grad = ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, w);
      grad.addColorStop(0, "#020617"); // Slate 950
      grad.addColorStop(1, "#000000");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // --- 1. CALCULATE BASIS VECTORS ---
      // We animate i_hat and j_hat directly to define the coordinate space.
      
      // Time factors for smooth oscillation
      const t1 = time * 0.2;
      const t2 = time * 0.3;

      // i_hat: Generally points Right (1, 0), but rotates and scales
      // Angle oscillates slightly around 0
      const angI = Math.cos(t1) * 0.2; 
      const lenI = 1 + Math.sin(t2) * 0.2; // Scale X
      const i_x = Math.cos(angI) * lenI * SPACING;
      const i_y = Math.sin(angI) * lenI * SPACING;

      // j_hat: Generally points Down (0, 1), but shears independently
      // Angle oscillates around PI/2 (90 deg). Deviating from PI/2 creates SHEAR.
      const shearFactor = Math.sin(time * 0.15) * 0.5; // Significant shear
      const angJ = (Math.PI / 2) + shearFactor; 
      const lenJ = 1 + Math.cos(t1) * 0.2; // Scale Y
      const j_x = Math.cos(angJ) * lenJ * SPACING;
      const j_y = Math.sin(angJ) * lenJ * SPACING;

      // Center of the screen is the Origin (0,0)
      const cx = w / 2;
      const cy = h / 2;

      // --- 2. DRAW GRID (TRANSFORMED) ---
      
      // Helper to project grid coordinates (u, v) into screen space (px, py)
      // P = Origin + u*i_hat + v*j_hat
      const project = (u: number, v: number) => ({
          x: cx + u * i_x + v * j_x,
          y: cy + u * i_y + v * j_y
      });

      ctx.lineWidth = 1;
      // Add 'Add' blend mode for glowing overlapping lines
      ctx.globalCompositeOperation = "lighter"; 

      // Draw "Vertical" lines (lines of constant u, varying v)
      // These follow the direction of j_hat
      ctx.strokeStyle = "rgba(34, 211, 238, 0.15)"; // Cyan Neon
      for (let u = -GRID_LINES; u <= GRID_LINES; u++) {
          ctx.beginPath();
          const start = project(u, -GRID_LINES);
          const end = project(u, GRID_LINES);
          ctx.moveTo(start.x, start.y);
          ctx.lineTo(end.x, end.y);
          ctx.stroke();
      }

      // Draw "Horizontal" lines (lines of constant v, varying u)
      // These follow the direction of i_hat
      ctx.strokeStyle = "rgba(232, 121, 249, 0.15)"; // Fuchsia Neon
      for (let v = -GRID_LINES; v <= GRID_LINES; v++) {
          ctx.beginPath();
          const start = project(-GRID_LINES, v);
          const end = project(GRID_LINES, v);
          ctx.moveTo(start.x, start.y);
          ctx.lineTo(end.x, end.y);
          ctx.stroke();
      }

      // --- 3. DRAW BASIS VECTORS (HIGHLIGHT) ---
      ctx.lineWidth = 3;
      ctx.shadowBlur = 15;
      
      // Draw i_hat vector (The X Axis)
      ctx.strokeStyle = "#22d3ee"; // Cyan
      ctx.shadowColor = "#22d3ee";
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      const tipI = project(1, 0);
      ctx.lineTo(tipI.x, tipI.y);
      ctx.stroke();

      // Draw j_hat vector (The Y Axis)
      ctx.strokeStyle = "#e879f9"; // Fuchsia
      ctx.shadowColor = "#e879f9";
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      const tipJ = project(0, 1);
      ctx.lineTo(tipJ.x, tipJ.y);
      ctx.stroke();

      // Draw Origin Dot
      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = "#ffffff";
      ctx.beginPath();
      ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fill();

      // Reset blending and shadow
      ctx.globalCompositeOperation = "source-over";
      ctx.shadowBlur = 0;

      // --- 4. FLOATING PARTICLES ---
      ctx.font = 'italic 16px "Times New Roman"';
      particles.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;
          
          if (p.x > w) p.x = 0; if (p.x < 0) p.x = w;
          if (p.y > h) p.y = 0; if (p.y < 0) p.y = h;

          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity;
          ctx.fillText(p.char, p.x, p.y);
      });

      time += 0.005;
      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    return () => { window.removeEventListener("resize", handleResize); cancelAnimationFrame(animId); };
  }, []);

  return (
    <>
        <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
        {/* Subtle Vignette */}
        <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]" />
    </>
  );
}