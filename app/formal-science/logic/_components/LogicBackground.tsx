"use client";
import React, { useRef, useEffect } from 'react';

export default function LogicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let time = 0;

    const gridSize = 60;
    const cols = Math.ceil(width / gridSize) + 1;
    const rows = Math.ceil(height / gridSize) + 1;

    const draw = () => {
      ctx.fillStyle = '#05030a'; // Deepest purple-black
      ctx.fillRect(0, 0, width, height);

      ctx.lineWidth = 1;

      // Draw structural matrix
      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          const px = x * gridSize;
          const py = y * gridSize;

          // Pseudo-random logical evaluation based on coordinates and time
          const p = Math.sin(x * 0.5 + time) > 0;
          const q = Math.cos(y * 0.5 - time) > 0;
          
          // XOR evaluation for the visual pattern
          const evaluateXor = (p || q) && !(p && q);

          if (evaluateXor) {
              // Draw active node
              ctx.beginPath();
              ctx.arc(px, py, 2, 0, Math.PI * 2);
              ctx.fillStyle = 'rgba(168, 85, 247, 0.4)'; // Purple-500
              ctx.fill();

              // Draw connecting line to right neighbor if also active
              const rightP = Math.sin((x+1) * 0.5 + time) > 0;
              const rightXor = (rightP || q) && !(rightP && q);
              if (rightXor) {
                  ctx.beginPath();
                  ctx.moveTo(px, py);
                  ctx.lineTo(px + gridSize, py);
                  ctx.strokeStyle = 'rgba(168, 85, 247, 0.15)';
                  ctx.stroke();
              }

              // Draw connecting line to bottom neighbor if also active
              const bottomQ = Math.cos((y+1) * 0.5 - time) > 0;
              const bottomXor = (p || bottomQ) && !(p && bottomQ);
              if (bottomXor) {
                  ctx.beginPath();
                  ctx.moveTo(px, py);
                  ctx.lineTo(px, py + gridSize);
                  ctx.strokeStyle = 'rgba(168, 85, 247, 0.15)';
                  ctx.stroke();
              }
          } else {
              // Faint inactive structural dot
              ctx.beginPath();
              ctx.arc(px, py, 1, 0, Math.PI * 2);
              ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
              ctx.fill();
          }
        }
      }

      time += 0.03;
      requestAnimationFrame(draw);
    };

    const anim = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(anim);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}