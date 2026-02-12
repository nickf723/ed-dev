"use client";
import React, { useEffect, useRef } from 'react';

export default function FractalTree() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let angleOffset = 0;

    const drawBranch = (startX: number, startY: number, length: number, angle: number, depth: number) => {
      ctx.beginPath();
      ctx.save();
      
      ctx.translate(startX, startY);
      ctx.rotate(angle * Math.PI / 180);
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -length);
      
      // Color based on depth
      ctx.strokeStyle = `hsl(${270 + depth * 10}, 80%, ${50 + depth * 5}%)`; // Purple to Pink
      ctx.lineWidth = depth < 2 ? 0.5 : depth; // Thinner at tips
      ctx.stroke();

      if (depth < 1) {
          ctx.restore();
          return;
      }

      // Recursive Calls
      // Draw left branch
      drawBranch(0, -length, length * 0.75, -25 + angleOffset, depth - 1);
      // Draw right branch
      drawBranch(0, -length, length * 0.75, 25 + angleOffset, depth - 1);

      ctx.restore();
    };

    let time = 0;
    const animate = () => {
      // 1. Dark Violet BG
      ctx.fillStyle = '#1e1b4b'; // Indigo-950
      ctx.fillRect(0, 0, width, height);

      time += 0.01;
      // Swaying effect
      angleOffset = Math.sin(time) * 5;

      // Start Recursion
      // Base trunk at bottom center
      drawBranch(width / 2, height, 180, 0, 10); // Depth 10

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