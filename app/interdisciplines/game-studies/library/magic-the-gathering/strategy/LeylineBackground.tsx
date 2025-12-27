"use client";
import { useEffect, useRef } from "react";

export default function LeylineBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let time = 0;
    
    // Leyline nodes
    const nodes: {x: number, y: number, size: number}[] = [];
    const cols = 6;
    const rows = 4;
    const spacingX = w / cols;
    const spacingY = h / rows;

    // Create a grid of nodes
    for(let x=0; x<=cols; x++) {
        for(let y=0; y<=rows; y++) {
            // Jitter them slightly
            nodes.push({
                x: x * spacingX + (Math.random() * 40 - 20),
                y: y * spacingY + (Math.random() * 40 - 20),
                size: Math.random() * 3 + 2
            });
        }
    }

    // Energy pulses
    const pulses: {from: number, to: number, progress: number, color: string}[] = [];
    
    // Colors: White (Order), Blue (Knowledge), Amber (Artifacts)
    const colors = ["#f8fafc", "#60a5fa", "#fbbf24"]; 

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      
      // Dark Blueprint Background
      ctx.fillStyle = "#0f172a"; // Slate-900
      ctx.fillRect(0, 0, w, h);

      // Draw Static Grid (Faint)
      ctx.strokeStyle = "rgba(148, 163, 184, 0.05)";
      ctx.lineWidth = 1;
      
      // Connect neighbors
      nodes.forEach((node, i) => {
          // Simple proximity connection for visual grid
          nodes.forEach((other, j) => {
              if (i >= j) return;
              const d = Math.hypot(node.x - other.x, node.y - other.y);
              if (d < spacingX * 1.2) {
                  ctx.beginPath();
                  ctx.moveTo(node.x, node.y);
                  ctx.lineTo(other.x, other.y);
                  ctx.stroke();
              }
          });
      });
      
      // Draw Nodes (Hedrons)
      nodes.forEach(n => {
          ctx.fillStyle = "#334155";
          ctx.beginPath();
          // Diamond shape
          ctx.moveTo(n.x, n.y - n.size*2);
          ctx.lineTo(n.x + n.size, n.y);
          ctx.lineTo(n.x, n.y + n.size*2);
          ctx.lineTo(n.x - n.size, n.y);
          ctx.closePath();
          ctx.fill();
      });

      // Spawn Pulses
      if (Math.random() > 0.92) {
          const startIdx = Math.floor(Math.random() * nodes.length);
          // Find neighbors
          const neighbors = nodes
             .map((n, i) => ({ idx: i, d: Math.hypot(n.x - nodes[startIdx].x, n.y - nodes[startIdx].y) }))
             .filter(n => n.d < spacingX * 1.5 && n.d > 0);
          
          if (neighbors.length > 0) {
              const target = neighbors[Math.floor(Math.random() * neighbors.length)];
              pulses.push({
                  from: startIdx,
                  to: target.idx,
                  progress: 0,
                  color: colors[Math.floor(Math.random() * colors.length)]
              });
          }
      }

      // Update & Draw Pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
          const p = pulses[i];
          p.progress += 0.02;
          
          const n1 = nodes[p.from];
          const n2 = nodes[p.to];
          
          const cx = n1.x + (n2.x - n1.x) * p.progress;
          const cy = n1.y + (n2.y - n1.y) * p.progress;

          ctx.shadowBlur = 10;
          ctx.shadowColor = p.color;
          ctx.fillStyle = p.color;
          
          ctx.beginPath();
          ctx.arc(cx, cy, 3, 0, Math.PI*2);
          ctx.fill();
          ctx.shadowBlur = 0;

          if (p.progress >= 1) pulses.splice(i, 1);
      }

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    return () => { window.removeEventListener("resize", handleResize); cancelAnimationFrame(animId); };
  }, []);

  return (
    <>
        <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-60 mix-blend-screen" />
        <div className="hd-vignette" />
        <div className="hd-scanlines opacity-10" />
    </>
  );
}