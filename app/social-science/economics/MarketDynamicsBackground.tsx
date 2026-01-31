"use client";
import React, { useEffect, useRef } from 'react';

export default function MarketDynamicsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const lines: Array<{ x: number; points: number[]; color: string }> = [];
    const lineCount = 5;
    
    // Initialize "Market Trends"
    for (let i = 0; i < lineCount; i++) {
      lines.push({
        x: 0,
        points: Array.from({ length: 40 }, () => Math.random() * 100),
        color: i % 2 === 0 ? '45, 212, 191' : '59, 130, 246' // Teal and Blue
      });
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawLine = (line: typeof lines[0], index: number) => {
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = `rgba(${line.color}, ${0.1 + (index * 0.05)})`;
      
      const segmentWidth = canvas.width / (line.points.length - 1);
      
      ctx.moveTo(0, canvas.height / 2 + line.points[0]);
      
      for (let i = 1; i < line.points.length; i++) {
        const x = i * segmentWidth;
        const y = canvas.height / 2 + line.points[i];
        ctx.lineTo(x, y);
        
        // Update point with "Market Volatility"
        line.points[i] += (Math.random() - 0.5) * 2;
        // Dampening to keep it near center
        line.points[i] *= 0.99; 
      }
      ctx.stroke();
    };

    const animate = () => {
      // Create a trailing effect instead of clearRect
      ctx.fillStyle = 'rgba(2, 6, 23, 0.1)'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      lines.forEach((line, i) => drawLine(line, i));
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();
    window.addEventListener('resize', init);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', init);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none bg-[#020617]"
    />
  );
}