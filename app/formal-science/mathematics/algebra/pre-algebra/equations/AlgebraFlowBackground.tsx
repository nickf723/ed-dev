"use client";
import React, { useEffect, useRef } from 'react';

export default function AlgebraFlowBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    interface Solver {
      x: number; y: number;
      lines: string[];
      step: number;
      opacity: number;
    }

    const solvers: Solver[] = [];

    // Generator for simple math problems
    const spawnSolver = () => {
        const type = Math.floor(Math.random() * 4);
        let lines: string[] = [];
        
        if (type === 0) { // Add: x + 5 = 12
            const add = Math.floor(Math.random() * 9) + 1;
            const res = Math.floor(Math.random() * 10) + 10;
            lines = [`x + ${add} = ${res}`, `- ${add}   - ${add}`, `x = ${res - add}`];
        } else if (type === 1) { // Sub: x - 3 = 8
            const sub = Math.floor(Math.random() * 9) + 1;
            const res = Math.floor(Math.random() * 10) + 5;
            lines = [`x - ${sub} = ${res}`, `+ ${sub}   + ${sub}`, `x = ${res + sub}`];
        } else if (type === 2) { // Mult: 3x = 12
            const mult = Math.floor(Math.random() * 4) + 2;
            const ans = Math.floor(Math.random() * 9) + 2;
            lines = [`${mult}x = ${mult * ans}`, `÷ ${mult}   ÷ ${mult}`, `x = ${ans}`];
        } else { // Div: x/2 = 5
            const div = Math.floor(Math.random() * 4) + 2;
            const ans = Math.floor(Math.random() * 9) + 2;
            lines = [`x / ${div} = ${ans}`, `× ${div}   × ${div}`, `x = ${ans * div}`];
        }

        solvers.push({
            x: Math.random() * (width - 200) + 50,
            y: Math.random() * (height - 100) + 50,
            lines,
            step: 0,
            opacity: 1
        });
    };

    let frame = 0;

    const animate = () => {
      ctx.fillStyle = '#022c22'; // Dark Emerald
      ctx.fillRect(0, 0, width, height);

      if (frame % 60 === 0 && solvers.length < 5) spawnSolver();

      solvers.forEach((s, i) => {
          ctx.font = '20px monospace';
          
          // Draw Lines
          s.lines.forEach((line, idx) => {
              if (s.step >= idx) {
                  // Color logic: Problem is White, Op is Slate, Answer is Green
                  if (idx === 0) ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
                  else if (idx === 1) ctx.fillStyle = `rgba(148, 163, 184, ${s.opacity})`;
                  else ctx.fillStyle = `rgba(52, 211, 153, ${s.opacity})`; // Green
                  
                  ctx.fillText(line, s.x, s.y + (idx * 30));
              }
          });

          // Progress through steps
          if (frame % 40 === 0) s.step++;
          
          // Fade out after finished
          if (s.step > 4) {
              s.opacity -= 0.02;
              if (s.opacity <= 0) solvers.splice(i, 1);
          }
      });

      frame++;
      requestAnimationFrame(animate);
    };

    const handleResize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    animate();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}