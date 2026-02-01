"use client";
import React, { useEffect, useRef } from 'react';

export default function WireframeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let frame = 0;

    const boxes: { x: number; y: number; w: number; h: number; life: number; maxLife: number }[] = [];

    const addBox = () => {
      // Create a random layout box
      const w = Math.random() * 300 + 50;
      const h = Math.random() * 200 + 50;
      const x = Math.random() * (width - w);
      const y = Math.random() * (height - h);
      
      boxes.push({
        x, y, w, h,
        life: 0,
        maxLife: 200 + Math.random() * 100
      });
    };

    const animate = () => {
      ctx.fillStyle = '#0f172a'; // Slate-900
      ctx.fillRect(0, 0, width, height);

      // Add new boxes occasionally
      if (frame % 10 === 0) addBox();

      ctx.lineWidth = 1;

      boxes.forEach((box, i) => {
        box.life++;
        
        // Fade in then out
        const opacity = box.life < 50 
            ? box.life / 50 
            : 1 - (box.life - 50) / (box.maxLife - 50);

        if (opacity <= 0) {
            boxes.splice(i, 1);
            return;
        }

        // Draw the "Wireframe"
        ctx.strokeStyle = `rgba(249, 115, 22, ${opacity * 0.15})`; // Orange-500
        ctx.strokeRect(box.x, box.y, box.w, box.h);

        // Draw "Tag" label in corner
        if (box.life > 20) {
            ctx.fillStyle = `rgba(249, 115, 22, ${opacity * 0.1})`;
            ctx.font = '10px monospace';
            ctx.fillText('<div />', box.x + 5, box.y + 12);
        }

        // Crosshairs for structure feel
        ctx.beginPath();
        ctx.moveTo(box.x, box.y);
        ctx.lineTo(box.x + 5, box.y + 5);
        ctx.moveTo(box.x + box.w, box.y);
        ctx.lineTo(box.x + box.w - 5, box.y + 5);
        ctx.moveTo(box.x, box.y + box.h);
        ctx.lineTo(box.x + 5, box.y + box.h - 5);
        ctx.moveTo(box.x + box.w, box.y + box.h);
        ctx.lineTo(box.x + box.w - 5, box.y + box.h - 5);
        ctx.stroke();
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