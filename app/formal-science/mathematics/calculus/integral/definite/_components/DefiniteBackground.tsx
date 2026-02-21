"use client";
import React, { useRef, useEffect } from 'react';

export default function DefiniteBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let time = 0;

    const draw = () => {
      ctx.fillStyle = '#01050a'; // Deep midnight blue
      ctx.fillRect(0, 0, width, height);

      const centerY = height / 2;

      // Draw faint X-axis
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.strokeStyle = '#1e3a8a'; // Blue-900
      ctx.lineWidth = 1;
      ctx.stroke();

      // We'll draw 3 overlapping continuous waves
      for (let j = 0; j < 3; j++) {
          ctx.beginPath();
          
          // Start the fill path from the axis
          ctx.moveTo(0, centerY);

          for (let x = 0; x <= width; x += 5) {
              const wave = Math.sin(x * 0.003 + time * (0.5 + j * 0.2)) * (100 + j * 50) * Math.cos(time * 0.1 + j);
              const y = centerY - wave;
              ctx.lineTo(x, y);
          }

          // Close the path back along the axis to fill the "Area"
          ctx.lineTo(width, centerY);
          ctx.closePath();

          // Smooth gradient fill
          const gradient = ctx.createLinearGradient(0, centerY - 200, 0, centerY + 200);
          gradient.addColorStop(0, `rgba(59, 130, 246, ${0.05 + j * 0.02})`); // Positive area
          gradient.addColorStop(0.5, `rgba(59, 130, 246, 0)`); // Axis
          gradient.addColorStop(1, `rgba(239, 68, 68, ${0.05 + j * 0.02})`); // Negative area

          ctx.fillStyle = gradient;
          ctx.fill();

          // Stroke the actual function line
          ctx.beginPath();
          for (let x = 0; x <= width; x += 5) {
              const wave = Math.sin(x * 0.003 + time * (0.5 + j * 0.2)) * (100 + j * 50) * Math.cos(time * 0.1 + j);
              const y = centerY - wave;
              if (x === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = `rgba(96, 165, 250, ${0.1 + j * 0.1})`; // Blue-400
          ctx.lineWidth = 2;
          ctx.stroke();
      }

      time += 0.02;
      requestAnimationFrame(draw);
    };

    const anim = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(anim);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}