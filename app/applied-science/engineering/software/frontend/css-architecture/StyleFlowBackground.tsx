"use client";
import React, { useEffect, useRef } from 'react';

export default function StyleFlowBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let frame = 0;

    const boxes: { x: number; y: number; w: number; h: number; hue: number }[] = [];
    const cols = 8;
    const gap = 20;

    const init = () => {
      boxes.length = 0;
      const colWidth = (width - (gap * (cols + 1))) / cols;
      
      for(let i=0; i<40; i++) {
        boxes.push({
          x: 0, 
          y: 0, 
          w: colWidth, 
          h: Math.random() * 100 + 50,
          hue: Math.random() * 60 + 300 // Pinks/Purples (300-360)
        });
      }
    };

    const animate = () => {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, width, height);

      // Simulate a "breathing" container width
      const containerWidth = width * (0.6 + Math.sin(frame * 0.005) * 0.3); // 30% to 90% width
      const startX = (width - containerWidth) / 2;
      
      // Calculate responsive columns based on width
      const currentCols = Math.floor(containerWidth / 150);
      const colWidth = (containerWidth - (gap * (currentCols - 1))) / currentCols;

      let currentX = startX;
      let currentY = 50;
      let colIndex = 0;
      const colHeights = new Array(Math.max(1, currentCols)).fill(0);

      // Masonry Layout Algorithm
      boxes.forEach((box, i) => {
        // Find shortest column
        const minH = Math.min(...colHeights);
        const colIdx = colHeights.indexOf(minH);
        
        const targetX = startX + colIdx * (colWidth + gap);
        const targetY = 50 + minH;

        // Smooth Lerp to position
        box.x += (targetX - box.x) * 0.1;
        box.y += (targetY - box.y) * 0.1;
        box.w += (colWidth - box.w) * 0.1;

        colHeights[colIdx] += box.h + gap;

        // Draw Box
        ctx.fillStyle = `hsla(${box.hue}, 70%, 60%, 0.1)`;
        ctx.strokeStyle = `hsla(${box.hue}, 70%, 60%, 0.3)`;
        ctx.lineWidth = 1;
        
        ctx.beginPath();
        ctx.roundRect(box.x, box.y, box.w, box.h, 8);
        ctx.fill();
        ctx.stroke();
      });

      // Draw Container Boundary
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.setLineDash([5, 5]);
      ctx.strokeRect(startX - 10, 40, containerWidth + 20, height - 80);
      ctx.setLineDash([]);

      frame++;
      requestAnimationFrame(animate);
    };

    const handleResize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        init();
    };
    window.addEventListener('resize', handleResize);
    init();
    animate();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}