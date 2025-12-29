"use client";
import { useEffect, useRef } from "react";

export default function UnifiedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let time = 0;

    // --- ENTITIES ---
    
    // 1. Astronomy: Stars
    const stars = Array.from({ length: 150 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 1.5,
      alpha: Math.random(),
    }));

    // 2. Chemistry: Hexagons
    const molecules = Array.from({ length: 15 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: 20 + Math.random() * 30,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      rotation: Math.random() * Math.PI,
      dr: (Math.random() - 0.5) * 0.02,
    }));

    // 3. Biology: Cells
    const cells = Array.from({ length: 10 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 30 + Math.random() * 20,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      phase: Math.random() * Math.PI * 2,
    }));

    const drawHex = (x: number, y: number, r: number, angle: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const theta = angle + (i * Math.PI) / 3;
        ctx.lineTo(x + r * Math.cos(theta), y + r * Math.sin(theta));
      }
      ctx.closePath();
      ctx.strokeStyle = "rgba(14, 165, 233, 0.15)"; // Sky blue
      ctx.lineWidth = 1.5;
      ctx.stroke();
      
      // Bonds (Internal lines)
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + r * Math.cos(angle), y + r * Math.sin(angle));
      ctx.strokeStyle = "rgba(14, 165, 233, 0.05)";
      ctx.stroke();
    };

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.005;

      // 1. PHYSICS LAYER: Sine Wave Fields (Spacetime fabric)
      ctx.beginPath();
      ctx.strokeStyle = "rgba(99, 102, 241, 0.08)"; // Indigo
      ctx.lineWidth = 1;
      for (let i = 0; i < h; i += 80) {
        ctx.moveTo(0, i);
        for (let j = 0; j < w; j += 10) {
          ctx.lineTo(j, i + Math.sin(j * 0.01 + time) * 20);
        }
      }
      ctx.stroke();

      // 2. ASTRONOMY LAYER: Stars
      ctx.fillStyle = "white";
      stars.forEach((s) => {
        ctx.globalAlpha = 0.3 + Math.sin(time * 2 + s.x) * 0.2; // Twinkle
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      // 3. CHEMISTRY LAYER: Floating Hexagons
      molecules.forEach((m) => {
        m.x += m.vx;
        m.y += m.vy;
        m.rotation += m.dr;
        if (m.x < -50) m.x = w + 50;
        if (m.x > w + 50) m.x = -50;
        if (m.y < -50) m.y = h + 50;
        if (m.y > h + 50) m.y = -50;
        drawHex(m.x, m.y, m.size, m.rotation);
      });

      // 4. BIOLOGY LAYER: Organic Cells
      cells.forEach((c) => {
        c.x += c.vx;
        c.y += c.vy;
        if (c.x < -50) c.x = w + 50;
        if (c.x > w + 50) c.x = -50;
        if (c.y < -50) c.y = h + 50;
        if (c.y > h + 50) c.y = -50;

        // Cell Body (Wobbly circle)
        ctx.beginPath();
        const r = c.r + Math.sin(time * 3 + c.phase) * 2;
        ctx.arc(c.x, c.y, r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(16, 185, 129, 0.05)"; // Emerald
        ctx.fill();
        ctx.strokeStyle = "rgba(16, 185, 129, 0.1)";
        ctx.stroke();

        // Nucleus
        ctx.beginPath();
        ctx.arc(c.x + Math.sin(time) * 5, c.y + Math.cos(time) * 5, r * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(16, 185, 129, 0.1)";
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <canvas ref={canvasRef} className="absolute inset-0" />
      {/* Vignette to focus center */}
      <div className="absolute inset-0 bg-radial-vignette opacity-80" />
    </div>
  );
}