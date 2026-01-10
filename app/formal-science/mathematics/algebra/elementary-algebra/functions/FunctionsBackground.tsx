"use client";
import { useEffect, useRef } from "react";

export default function FunctionsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // --- STATE ---
    const particles: {
        x: number;
        y: number;
        baseY: number; // The "Input" value
        processed: boolean;
        speed: number;
        color: string;
        size: number;
    }[] = [];

    const initParticles = () => {
        const count = 200;
        for(let i=0; i<count; i++) {
            spawnParticle(Math.random() * w);
        }
    };

    const spawnParticle = (xStart: number) => {
        const baseY = h/2 + (Math.random() - 0.5) * h * 0.8;
        particles.push({
            x: xStart,
            y: baseY,
            baseY: baseY,
            processed: xStart > w/2,
            speed: 2 + Math.random(),
            color: "#f472b6", // Pink-400
            size: 2
        });
    };

    initParticles();

    const render = () => {
      // Clear with dark void
      ctx.fillStyle = "#0c0a0f"; 
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      // Draw "The Function Gate" (Vertical Line)
      ctx.strokeStyle = "rgba(244, 114, 182, 0.2)";
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(cx, 0);
      ctx.lineTo(cx, h);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw "f(x)" Label
      ctx.fillStyle = "rgba(244, 114, 182, 0.5)";
      ctx.font = "12px monospace";
      ctx.fillText("INPUT (Domain)", cx - 120, h - 20);
      ctx.fillText("OUTPUT (Range)", cx + 20, h - 20);
      
      // Animate Particles
      for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.speed;

          // Logic: Before Gate vs After Gate
          if (p.x < cx) {
              // DOMAIN: Random / Chaotic
              p.y = p.baseY;
              p.color = "#52525b"; // Zinc-600 (Raw)
              p.size = 2;
          } else {
              // RANGE: Processed into a pattern (Sine Wave)
              // f(x) = sin(x) * amplitude
              // We map the random baseY to a structured path to show "mapping"
              const freq = 0.02;
              const amp = 150;
              const mappedY = cy + Math.sin((p.x - cx) * freq + (p.baseY * 0.01)) * amp;
              
              // Smooth lerp to the new Y to avoid jumping
              p.y += (mappedY - p.y) * 0.1;
              
              p.color = "#f472b6"; // Pink-400 (Processed)
              p.size = 3;
          }

          // Draw
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
          ctx.fill();

          // Reset if off screen
          if (p.x > w) {
              particles.splice(i, 1);
              spawnParticle(-10);
          }
      }

      requestAnimationFrame(render);
    };

    const animId = requestAnimationFrame(render);
    const handleResize = () => { 
        w = canvas.width = window.innerWidth; 
        h = canvas.height = window.innerHeight; 
        // Re-init isn't strictly necessary but keeps density correct
    };
    window.addEventListener("resize", handleResize);
    return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-60 pointer-events-none" />;
}