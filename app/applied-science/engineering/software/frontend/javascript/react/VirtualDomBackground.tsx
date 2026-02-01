"use client";
import React, { useEffect, useRef } from 'react';

export default function VirtualDomBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    interface Node {
      x: number; y: number;
      children: Node[];
      flash: number;
    }

    const root: Node = { x: width / 2, y: 50, children: [], flash: 0 };

    const buildTree = (parent: Node, depth: number) => {
      if (depth > 4) return;
      const count = Math.floor(Math.random() * 3) + 1;
      const span = width / (Math.pow(2, depth) * 2);
      
      for (let i = 0; i < count; i++) {
        const child: Node = {
          x: parent.x + (i - (count - 1) / 2) * span + (Math.random() * 20 - 10),
          y: parent.y + 100 + (Math.random() * 20),
          children: [],
          flash: 0
        };
        parent.children.push(child);
        buildTree(child, depth + 1);
      }
    };

    const drawNode = (node: Node, parent: Node | null) => {
      // Draw Link
      if (parent) {
        ctx.beginPath();
        ctx.moveTo(parent.x, parent.y);
        ctx.lineTo(node.x, node.y);
        ctx.strokeStyle = `rgba(97, 218, 251, ${0.1 + node.flash})`; // Cyan link
        ctx.stroke();
      }

      // Draw Node (Atom)
      ctx.beginPath();
      ctx.arc(node.x, node.y, 6 + node.flash * 4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(97, 218, 251, ${0.2 + node.flash})`;
      ctx.fill();
      
      // Core
      ctx.beginPath();
      ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#61DAFB';
      ctx.fill();

      // Decay flash
      if (node.flash > 0) node.flash -= 0.05;

      // Trigger random updates (Re-render)
      if (Math.random() > 0.995) {
        node.flash = 1;
        // Propagate down? (Optional complexity)
      }

      node.children.forEach(c => drawNode(c, node));
    };

    buildTree(root, 0);

    const animate = () => {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, width, height);
      drawNode(root, null);
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