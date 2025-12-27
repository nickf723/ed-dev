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
    const GRID_SIZE = 80; // Distance between lines
    const GRID_COLS = Math.ceil(w / GRID_SIZE) + 5;
    const GRID_ROWS = Math.ceil(h / GRID_SIZE) + 5;

    // Floating Variables (kept for texture, but subtle)
    const SYMBOLS = ["x", "y", "z", "A", "b", "λ", "det"];
    const particles = Array.from({ length: 20 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      char: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      opacity: Math.random() * 0.3 + 0.05,
      vx: (Math.random() - 0.5) * 0.1,
      vy: (Math.random() - 0.5) * 0.1
    }));

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      
      // 1. Background (Deep Space)
      const grad = ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, w);
      grad.addColorStop(0, "#020617");
      grad.addColorStop(1, "#000000");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // --- 2. TRANSFORMATION MATRIX CALCULATION ---
      
      // We oscillate the parameters smoothly
      const t = time * 0.5;
      
      // SHEAR: This is the key "slant" factor
      // A pure horizontal shear moves x based on y.
      const k = Math.sin(t * 0.3) * 0.8; // Oscilates between -0.8 and 0.8
      
      // ROTATION: Slowly tumbling the whole view
      const theta = time * 0.05;
      const cos = Math.cos(theta);
      const sin = Math.sin(theta);

      // SCALE: Breathing effect
      const s = 1 + Math.sin(t * 0.2) * 0.1;

      // The Transformation Function
      // Applies Scale -> Shear -> Rotation -> Translation
      const transform = (x: number, y: number) => {
          // 1. Scale
          let tx = x * s;
          let ty = y * s;

          // 2. Shear (Horizontal: x' = x + ky)
          tx = tx + k * ty;

          // 3. Rotate
          const rx = tx * cos - ty * sin;
          const ry = tx * sin + ty * cos;

          // 4. Translate to Center
          return {
              x: rx + w/2,
              y: ry + h/2
          };
      };

      // --- 3. DRAW THE GRID ---
      
      const drawGridLayer = (color: string, offsetFactor: number) => {
          ctx.beginPath();
          ctx.strokeStyle = color;
          
          // Draw Vertical Lines
          for (let i = -GRID_COLS; i <= GRID_COLS; i++) {
              const xBase = i * GRID_SIZE;
              // Start far top, end far bottom to cover rotation
              const start = transform(xBase, -GRID_ROWS * GRID_SIZE * 1.5);
              const end = transform(xBase, GRID_ROWS * GRID_SIZE * 1.5);
              
              ctx.moveTo(start.x + offsetFactor, start.y + offsetFactor);
              ctx.lineTo(end.x + offsetFactor, end.y + offsetFactor);
          }

          // Draw Horizontal Lines
          for (let j = -GRID_ROWS; j <= GRID_ROWS; j++) {
              const yBase = j * GRID_SIZE;
              const start = transform(-GRID_COLS * GRID_SIZE * 1.5, yBase);
              const end = transform(GRID_COLS * GRID_SIZE * 1.5, yBase);
              
              ctx.moveTo(start.x + offsetFactor, start.y + offsetFactor);
              ctx.lineTo(end.x + offsetFactor, end.y + offsetFactor);
          }
          ctx.stroke();
      };

      // Layer 1: Cyan (Main)
      ctx.lineWidth = 1;
      ctx.globalCompositeOperation = "screen"; // Additive blending
      ctx.shadowBlur = 8;
      ctx.shadowColor = "rgba(34, 211, 238, 0.5)"; // Cyan Glow
      drawGridLayer("rgba(34, 211, 238, 0.2)", 0);

      // Layer 2: Magenta (Offset for Chromatic Effect)
      // We apply the same transform but slightly offset pixels to create 'vibration'
      ctx.shadowColor = "rgba(232, 121, 249, 0.5)"; // Pink Glow
      drawGridLayer("rgba(232, 121, 249, 0.15)", 2);

      ctx.shadowBlur = 0;
      ctx.globalCompositeOperation = "source-over";

      // --- 4. DRAW ORIGIN & INTERSECTIONS ---
      // Highlight the center (0,0) and a few points
      const origin = transform(0, 0);
      
      // Center Point
      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = "#ffffff";
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.arc(origin.x, origin.y, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw Basis Vectors from Origin
      ctx.lineWidth = 3;
      
      // Basis i (1, 0)
      const tipI = transform(GRID_SIZE, 0);
      ctx.strokeStyle = "#4ade80"; // Green
      ctx.beginPath();
      ctx.moveTo(origin.x, origin.y);
      ctx.lineTo(tipI.x, tipI.y);
      ctx.stroke();

      // Basis j (0, 1)
      const tipJ = transform(0, GRID_SIZE);
      ctx.strokeStyle = "#fb7185"; // Red
      ctx.beginPath();
      ctx.moveTo(origin.x, origin.y);
      ctx.lineTo(tipJ.x, tipJ.y);
      ctx.stroke();

      // --- 5. PARTICLES ---
      ctx.font = '14px "Courier New"';
      ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
      particles.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;
          if(p.x > w) p.x = 0; if(p.x < 0) p.x = w;
          if(p.y > h) p.y = 0; if(p.y < 0) p.y = h;
          ctx.fillText(p.char, p.x, p.y);
      });

      time += 0.01;
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
        <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
    </>
  );
}