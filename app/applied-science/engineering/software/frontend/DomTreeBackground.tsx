"use client";
import React, { useEffect, useRef } from 'react';

export default function DomTreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let frame = 0;

    interface Node {
      x: number; y: number;
      level: number;
      children: Node[];
      active: number; // For flash effect
    }

    const root: Node = { x: width / 2, y: -50, level: 0, children: [], active: 0 };
    
    // Procedurally build tree
    const buildTree = (parent: Node, depth: number) => {
      if (depth > 5) return;
      const childCount = Math.floor(Math.random() * 3) + 1;
      const span = width / (Math.pow(2, depth) * 1.5);
      
      for (let i = 0; i < childCount; i++) {
        const offset = (i - (childCount - 1) / 2) * span;
        const child: Node = {
          x: parent.x + offset + (Math.random() * 20 - 10),
          y: parent.y + 120 + (Math.random() * 40),
          level: depth + 1,
          children: [],
          active: 0
        };
        parent.children.push(child);
        buildTree(child, depth + 1);
      }
    };

    // Rebuild occasionally to simulate navigation
    const reset = () => {
      root.children = [];
      root.x = width / 2; // Recenter
      buildTree(root, 0);
    };

    // Traversing to draw connections
    const drawNode = (node: Node, parent: Node | null) => {
      // Draw Line
      if (parent) {
        ctx.beginPath();
        ctx.moveTo(parent.x, parent.y);
        // Bezier curve for organic "branch" feel
        ctx.bezierCurveTo(parent.x, (parent.y + node.y)/2, node.x, (parent.y + node.y)/2, node.x, node.y);
        
        ctx.strokeStyle = node.active > 0 
          ? `rgba(56, 189, 248, ${node.active})` // Active: Sky Blue
          : 'rgba(255, 255, 255, 0.03)'; // Passive: Faint Grey
        ctx.lineWidth = node.active > 0 ? 2 : 1;
        ctx.stroke();
      }

      // Draw Node (Tag)
      ctx.fillStyle = '#0f172a'; // Background
      ctx.beginPath();
      ctx.arc(node.x, node.y, 4, 0, Math.PI * 2);
      ctx.fill();
      
      // Node Outline
      ctx.strokeStyle = node.active > 0 ? '#38bdf8' : 'rgba(255, 255, 255, 0.1)';
      ctx.stroke();

      // Decay activity
      if (node.active > 0) node.active -= 0.02;

      // Random "Re-render" trigger
      if (Math.random() > 0.999) node.active = 1;

      // Recurse
      node.children.forEach(child => drawNode(child, node));
    };

    const animate = () => {
      ctx.fillStyle = '#0f172a'; // Slate-900
      ctx.fillRect(0, 0, width, height);

      drawNode(root, null);

      frame++;
      // Full re-render every ~10 seconds
      if (frame % 600 === 0) reset();

      requestAnimationFrame(animate);
    };

    reset();
    animate();

    const handleResize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        reset();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}