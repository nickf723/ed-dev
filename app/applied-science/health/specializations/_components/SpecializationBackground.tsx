"use client";
import React, { useRef, useEffect } from 'react';

export default function SpecializationBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const hexRadius = 40;
    const hexWidth = Math.sqrt(3) * hexRadius;
    const hexHeight = 2 * hexRadius;
    const cols = Math.ceil(width / hexWidth) + 1;
    const rows = Math.ceil(height / (hexHeight * 0.75)) + 1;

    // Keep track of glowing hexagons
    const activeHexes = Array.from({ length: 15 }).map(() => ({
      col: Math.floor(Math.random() * cols),
      row: Math.floor(Math.random() * rows),
      life: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.02 + 0.01
    }));

    const drawHexagon = (x: number, y: number, radius: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const hx = x + radius * Math.cos(angle);
        const hy = y + radius * Math.sin(angle);
        if (i === 0) ctx.moveTo(hx, hy);
        else ctx.lineTo(hx, hy);
      }
      ctx.closePath();
    };

    const draw = () => {
      ctx.fillStyle = '#030108'; // Deep violet-black
      ctx.fillRect(0, 0, width, height);

      ctx.lineWidth = 1;

      // Draw base grid
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * hexWidth + (row % 2 ? hexWidth / 2 : 0);
          const y = row * hexHeight * 0.75;

          drawHexagon(x, y, hexRadius - 2);
          ctx.strokeStyle = 'rgba(139, 92, 246, 0.05)'; // Very faint violet
          ctx.stroke();
        }
      }

      // Draw glowing focus hexes
      activeHexes.forEach(hex => {
        hex.life += hex.speed;
        const x = hex.col * hexWidth + (hex.row % 2 ? hexWidth / 2 : 0);
        const y = hex.row * hexHeight * 0.75;

        const opacity = (Math.sin(hex.life) + 1) / 2; // 0 to 1

        drawHexagon(x, y, hexRadius - 2);
        
        ctx.fillStyle = `rgba(139, 92, 246, ${opacity * 0.15})`;
        ctx.fill();

        ctx.strokeStyle = `rgba(167, 139, 250, ${opacity * 0.5})`;
        ctx.stroke();

        // Randomly assign a new hex when one fades out completely
        if (Math.sin(hex.life) < -0.99) {
            hex.col = Math.floor(Math.random() * cols);
            hex.row = Math.floor(Math.random() * rows);
        }
      });

      requestAnimationFrame(draw);
    };

    const anim = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(anim);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}