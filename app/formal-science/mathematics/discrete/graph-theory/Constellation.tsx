"use client";
import React, { useEffect, useRef } from 'react';

export default function Constellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Graph Structure
    const nodes = Array.from({ length: 30 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2 + 2
    }));

    // Pre-calculate edges (random connections)
    const edges: {source: number, target: number}[] = [];
    nodes.forEach((n, i) => {
        nodes.forEach((n2, j) => {
            if (i < j && Math.hypot(n.x - n2.x, n.y - n2.y) < 200) {
                if(Math.random() > 0.7) edges.push({ source: i, target: j });
            }
        });
    });

    // Packets traveling
    const packets = Array.from({ length: 10 }, () => ({
        edgeIdx: Math.floor(Math.random() * edges.length),
        prog: Math.random(),
        speed: Math.random() * 0.01 + 0.005
    }));

    const animate = () => {
      // 1. Dark Background
      ctx.fillStyle = '#020617'; // Slate-950
      ctx.fillRect(0, 0, width, height);

      // 2. Draw Edges
      ctx.lineWidth = 1;
      edges.forEach(e => {
          const s = nodes[e.source];
          const t = nodes[e.target];
          const dist = Math.hypot(s.x - t.x, s.y - t.y);
          const alpha = 1 - (dist / 200);
          
          ctx.strokeStyle = `rgba(16, 185, 129, ${alpha * 0.3})`;
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(t.x, t.y);
          ctx.stroke();
      });

      // 3. Draw Packets (Data Flow)
      ctx.fillStyle = '#fff';
      packets.forEach(p => {
          const edge = edges[p.edgeIdx];
          const s = nodes[edge.source];
          const t = nodes[edge.target];
          
          p.prog += p.speed;
          if (p.prog >= 1) {
              p.prog = 0;
              p.edgeIdx = Math.floor(Math.random() * edges.length);
          }

          const x = s.x + (t.x - s.x) * p.prog;
          const y = s.y + (t.y - s.y) * p.prog;

          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#10b981';
      });
      ctx.shadowBlur = 0;

      // 4. Draw Nodes
      ctx.fillStyle = '#10b981';
      nodes.forEach(n => {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
          ctx.fill();
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