"use client";
import React, { useEffect, useRef } from 'react';

export default function BlueprintGridEngine() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    interface DraftLine {
      x1: number; y1: number;
      x2: number; y2: number;
      progress: number;
      alpha: number;
      type: 'wall' | 'dim' | 'arc';
    }

    const lines: DraftLine[] = [];

    // Generator
    const spawnBlueprint = () => {
        const cx = Math.random() * width;
        const cy = Math.random() * height;
        const size = 100;
        
        // Create a "Room"
        lines.push({ x1: cx, y1: cy, x2: cx + size, y2: cy, progress: 0, alpha: 1, type: 'wall' });
        lines.push({ x1: cx + size, y1: cy, x2: cx + size, y2: cy + size, progress: 0, alpha: 1, type: 'wall' });
        lines.push({ x1: cx + size, y1: cy + size, x2: cx, y2: cy + size, progress: 0, alpha: 1, type: 'wall' });
        lines.push({ x1: cx, y1: cy + size, x2: cx, y2: cy, progress: 0, alpha: 1, type: 'wall' });
        
        // Dimension Line
        lines.push({ x1: cx, y1: cy - 20, x2: cx + size, y2: cy - 20, progress: 0, alpha: 0.5, type: 'dim' });
    };

    const animate = () => {
      // 1. Blueprint Blue Background
      ctx.fillStyle = '#1e3a8a'; // Blue-900
      ctx.fillRect(0, 0, width, height);

      // 2. Grid (Major/Minor)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      
      const gridSize = 40;
      ctx.beginPath();
      for(let x=0; x<width; x+=gridSize) { ctx.moveTo(x,0); ctx.lineTo(x,height); }
      for(let y=0; y<height; y+=gridSize) { ctx.moveTo(0,y); ctx.lineTo(width,y); }
      ctx.stroke();

      // 3. Spawn Logic
      if (Math.random() > 0.95) spawnBlueprint();

      // 4. Draw Animated Lines
      lines.forEach((l, i) => {
          if (l.progress < 1) l.progress += 0.02;
          else l.alpha -= 0.005;

          if (l.alpha <= 0) {
              lines.splice(i, 1);
              return;
          }

          ctx.strokeStyle = `rgba(255, 255, 255, ${l.alpha})`;
          ctx.lineWidth = l.type === 'wall' ? 2 : 1;
          if (l.type === 'dim') ctx.setLineDash([5, 5]);
          else ctx.setLineDash([]);

          ctx.beginPath();
          ctx.moveTo(l.x1, l.y1);
          const curX = l.x1 + (l.x2 - l.x1) * l.progress;
          const curY = l.y1 + (l.y2 - l.y1) * l.progress;
          ctx.lineTo(curX, curY);
          ctx.stroke();

          // Draw dimensions text if done
          if (l.type === 'dim' && l.progress >= 1) {
              ctx.fillStyle = `rgba(255, 255, 255, ${l.alpha})`;
              ctx.font = '10px monospace';
              ctx.fillText("12' 0\"", (l.x1 + l.x2)/2 - 10, l.y1 - 5);
          }
      });

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