"use client";
import { useEffect, useRef } from "react";

export default function AbstractBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // --- CONFIG ---
    const rings = 12; // Major circle segments
    const ringNodes = 8; // Minor circle segments (tube thickness)
    const R = 250; // Major radius
    const r = 80;  // Minor radius (tube thickness)

    let time = 0;

    const render = () => {
      time += 0.003;
      
      // Clear with "Void" Rose
      ctx.fillStyle = "#0f050a"; 
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      // Rotation Matrices
      const cosX = Math.cos(time * 0.5);
      const sinX = Math.sin(time * 0.5);
      const cosY = Math.cos(time * 0.3);
      const sinY = Math.sin(time * 0.3);

      const points: { x: number, y: number, z: number, px: number, py: number, scale: number }[] = [];

      // 1. Generate Torus Points
      for (let i = 0; i < rings; i++) {
          const theta = (i / rings) * Math.PI * 2; // Major angle
          
          for (let j = 0; j < ringNodes; j++) {
              const phi = (j / ringNodes) * Math.PI * 2; // Minor angle
              
              // Torus parametric equation
              // x = (R + r*cos(phi)) * cos(theta)
              // y = (R + r*cos(phi)) * sin(theta)
              // z = r * sin(phi)
              
              let x = (R + r * Math.cos(phi)) * Math.cos(theta);
              let y = (R + r * Math.cos(phi)) * Math.sin(theta);
              let z = r * Math.sin(phi);

              // 2. Rotate in 3D
              // Rotate Y
              let x2 = x * cosY - z * sinY;
              let z2 = x * sinY + z * cosY;
              let y2 = y;

              // Rotate X
              let y3 = y2 * cosX - z2 * sinX;
              let z3 = y2 * sinX + z2 * cosX;

              // 3. Project
              const perspective = 1000 / (1000 + z3);
              points.push({
                  x: x2, y: y3, z: z3,
                  px: cx + x2 * perspective,
                  py: cy + y3 * perspective,
                  scale: perspective
              });
          }
      }

      // 4. Draw Connections (The Cayley Graph Edges)
      ctx.lineWidth = 1;
      
      // Draw Rings (The "Generator A")
      ctx.strokeStyle = "rgba(244, 63, 94, 0.15)"; // Rose-500
      for (let i = 0; i < rings; i++) {
          ctx.beginPath();
          for (let j = 0; j < ringNodes; j++) {
              const idx1 = i * ringNodes + j;
              const idx2 = i * ringNodes + ((j + 1) % ringNodes);
              ctx.moveTo(points[idx1].px, points[idx1].py);
              ctx.lineTo(points[idx2].px, points[idx2].py);
          }
          ctx.stroke();
      }

      // Draw Longitudinal Lines (The "Generator B")
      ctx.strokeStyle = "rgba(168, 85, 247, 0.15)"; // Purple-500
      for (let j = 0; j < ringNodes; j++) {
          ctx.beginPath();
          for (let i = 0; i < rings; i++) {
              const idx1 = i * ringNodes + j;
              const idx2 = ((i + 1) % rings) * ringNodes + j;
              ctx.moveTo(points[idx1].px, points[idx1].py);
              ctx.lineTo(points[idx2].px, points[idx2].py);
          }
          ctx.stroke();
      }

      // 5. Draw Nodes
      points.forEach(p => {
          // Size based on depth
          const size = 2 * p.scale;
          
          ctx.fillStyle = "#fff";
          ctx.globalAlpha = 0.8;
          ctx.beginPath();
          ctx.arc(p.px, p.py, size, 0, Math.PI*2);
          ctx.fill();

          // Occasional glow
          if (Math.random() > 0.99) {
             ctx.shadowBlur = 10;
             ctx.shadowColor = "#fff";
             ctx.fill();
             ctx.shadowBlur = 0;
          }
      });
      ctx.globalAlpha = 1;

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

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-70 pointer-events-none" />;
}