"use client";
import React, { useEffect, useRef } from 'react';

export default function EdgeNetworkBackground() {
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
      size: number;
      active: number; // 0 to 1
      connections: Node[];
    }

    const nodes: Node[] = [];
    const count = 50;

    // Initialize Nodes (The Edge Network)
    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1,
        active: 0,
        connections: []
      });
    }

    // Connect nearby nodes
    nodes.forEach((node, i) => {
      nodes.forEach((target, j) => {
        if (i === j) return;
        const dist = Math.hypot(node.x - target.x, node.y - target.y);
        if (dist < 150) {
          node.connections.push(target);
        }
      });
    });

    const animate = () => {
      ctx.fillStyle = '#000000'; // Pure Black
      ctx.fillRect(0, 0, width, height);

      // Random "Requests" hitting the edge
      if (Math.random() > 0.95) {
        const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
        randomNode.active = 1;
      }

      ctx.lineWidth = 1;

      nodes.forEach(node => {
        // Decay activity
        if (node.active > 0) node.active -= 0.02;

        // Draw Connections
        node.connections.forEach(target => {
          const sharedActivity = (node.active + target.active) / 2;
          if (sharedActivity > 0.01) {
             const gradient = ctx.createLinearGradient(node.x, node.y, target.x, target.y);
             gradient.addColorStop(0, `rgba(255, 255, 255, ${node.active * 0.5})`);
             gradient.addColorStop(1, `rgba(255, 255, 255, ${target.active * 0.5})`);
             ctx.strokeStyle = gradient;
             ctx.beginPath();
             ctx.moveTo(node.x, node.y);
             ctx.lineTo(target.x, target.y);
             ctx.stroke();
          }
        });

        // Draw Node
        ctx.fillStyle = `rgba(255, 255, 255, ${0.1 + node.active})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size + (node.active * 3), 0, Math.PI * 2);
        ctx.fill();

        // Glow
        if (node.active > 0.1) {
            ctx.shadowBlur = 15;
            ctx.shadowColor = 'white';
            ctx.fill();
            ctx.shadowBlur = 0;
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