"use client";
import { useEffect, useRef } from "react";

export default function GroupBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // --- STATE ---
    const n = 12; // Order of the group (Like a clock)
    let generator = 1; // The step size (e.g., connect i to i+generator)
    let time = 0;

    const render = () => {
      time += 0.005;
      
      // Animate generator smoothly between 1 and n-1
      // oscillating to show different structures
      generator = 1 + (Math.sin(time * 0.5) + 1) * (n/2 - 1); 

      // Clear with "Void" Rose
      ctx.fillStyle = "#0f050a"; 
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const r = 200;

      // 1. Calculate Nodes (Group Elements)
      const nodes: {x: number, y: number}[] = [];
      for (let i = 0; i < n; i++) {
          const theta = (i / n) * Math.PI * 2 - Math.PI/2; // Start at top
          nodes.push({
              x: cx + Math.cos(theta) * r,
              y: cy + Math.sin(theta) * r
          });
      }

      // 2. Draw Connections (The Action)
      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgba(244, 63, 94, 0.4)"; // Rose-500
      
      // We draw 'n' lines. Each node i connects to (i + generator) mod n
      // Since generator is float, we interpolate for smooth animation
      const step = Math.floor(generator);
      const percent = generator - step;

      for (let i = 0; i < n; i++) {
          const p1 = nodes[i];
          
          // Interpolate target: blend between target(step) and target(step+1)
          const targetIndexA = (i + step) % n;
          const targetIndexB = (i + step + 1) % n;
          
          const pA = nodes[targetIndexA];
          const pB = nodes[targetIndexB];

          // Lerp between targets
          const tx = pA.x + (pB.x - pA.x) * percent;
          const ty = pA.y + (pB.y - pA.y) * percent;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(tx, ty);
          ctx.stroke();
      }

      // 3. Draw Nodes (The Set)
      nodes.forEach((p, i) => {
          ctx.fillStyle = "#fff";
          ctx.beginPath();
          ctx.arc(p.x, p.y, 4, 0, Math.PI*2);
          ctx.fill();

          // Highlight Identity (Element 0)
          if (i === 0) {
              ctx.shadowBlur = 15;
              ctx.shadowColor = "#f43f5e";
              ctx.fillStyle = "#f43f5e";
              ctx.beginPath();
              ctx.arc(p.x, p.y, 8, 0, Math.PI*2);
              ctx.fill();
              ctx.shadowBlur = 0;
          }
      });

      // 4. Center Label
      ctx.fillStyle = "rgba(244, 63, 94, 0.5)";
      ctx.font = "20px monospace";
      ctx.textAlign = "center";
      ctx.fillText(`Generator: ${generator.toFixed(1)}`, cx, cy + 10);

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