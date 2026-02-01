"use client";
import React, { useEffect, useRef } from 'react';

export default function FocusPathBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Nodes representing focusable elements
    const nodes: { x: number; y: number; active: number }[] = [];
    const path: number[] = []; // Indices of nodes in tab order

    const init = () => {
      nodes.length = 0;
      path.length = 0;
      const cols = Math.floor(width / 100);
      const rows = Math.floor(height / 80);
      
      for(let r = 0; r < rows; r++) {
        for(let c = 0; c < cols; c++) {
           if (Math.random() > 0.7) { // Sparse UI
             nodes.push({
               x: c * 100 + 50 + (Math.random() * 20),
               y: r * 80 + 40 + (Math.random() * 10),
               active: 0
             });
           }
        }
      }

      // Create a logical "Tab Order" (Zig-zag left to right, top to bottom)
      nodes.sort((a, b) => a.y - b.y || a.x - b.x);
      nodes.forEach((_, i) => path.push(i));
    };

    let cursorIndex = 0;
    let frame = 0;

    const animate = () => {
      ctx.fillStyle = '#0f172a'; // Slate-900
      ctx.fillRect(0, 0, width, height);

      // Draw Connection Lines (The DOM Order)
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(234, 179, 8, 0.1)'; // Faint Yellow

      if (nodes.length > 0) {
        ctx.moveTo(nodes[0].x, nodes[0].y);
        for(let i = 1; i < nodes.length; i++) {
            ctx.lineTo(nodes[i].x, nodes[i].y);
        }
      }
      ctx.stroke();

      // Draw Nodes
      nodes.forEach((node, i) => {
        // Decay focus ring
        if (node.active > 0) node.active -= 0.05;

        // Base Element
        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.arc(node.x, node.y, 6, 0, Math.PI * 2);
        ctx.fill();

        // Focus Ring (Simulating outline: 2px solid yellow)
        if (node.active > 0) {
            ctx.beginPath();
            ctx.arc(node.x, node.y, 12 * node.active + 6, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(234, 179, 8, ${node.active})`; // Yellow
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Highlight Center
            ctx.fillStyle = '#facc15';
            ctx.beginPath();
            ctx.arc(node.x, node.y, 6, 0, Math.PI * 2);
            ctx.fill();
        }
      });

      // Move Cursor
      if (frame % 30 === 0 && nodes.length > 0) {
        cursorIndex = (cursorIndex + 1) % nodes.length;
        nodes[cursorIndex].active = 1;
      }

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