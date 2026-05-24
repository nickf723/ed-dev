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
    const n = 12; // Order of the group
    let generator = 1; 
    let time = 0;

    const render = () => {
      time += 0.005;
      
      // Animate generator smoothly between 1 and n-1
      generator = 1 + (Math.sin(time * 0.5) + 1) * (n/2 - 1); 

      // Clear with "Void" Purple
      ctx.fillStyle = "#090211"; 
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const r = 250;

      // 1. Calculate Nodes (Group Elements)
      const nodes: {x: number, y: number}[] = [];
      for (let i = 0; i < n; i++) {
          const theta = (i / n) * Math.PI * 2 - Math.PI/2; 
          nodes.push({
              x: cx + Math.cos(theta) * r,
              y: cy + Math.sin(theta) * r
          });
      }

      // 2. Draw Connections (The Action)
      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgba(6, 182, 212, 0.3)"; // Cyan-500 faint
      
      const step = Math.floor(generator);
      const percent = generator - step;

      for (let i = 0; i < n; i++) {
          const p1 = nodes[i];
          
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
          ctx.fillStyle = "#a855f7"; // Purple-500
          ctx.beginPath();
          ctx.arc(p.x, p.y, 4, 0, Math.PI*2);
          ctx.fill();

          // Highlight Identity (Element 0) with Bioluminescent Emerald
          if (i === 0) {
              ctx.shadowBlur = 20;
              ctx.shadowColor = "#10b981"; // Emerald
              ctx.fillStyle = "#10b981";
              ctx.beginPath();
              ctx.arc(p.x, p.y, 8, 0, Math.PI*2);
              ctx.fill();
              ctx.shadowBlur = 0;
          }
      });

      // 4. Center Label
      ctx.fillStyle = "rgba(168, 85, 247, 0.5)"; // Purple
      ctx.font = "16px monospace";
      ctx.textAlign = "center";
      ctx.fillText(`Generator: ${generator.toFixed(2)}`, cx, cy + 8);

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