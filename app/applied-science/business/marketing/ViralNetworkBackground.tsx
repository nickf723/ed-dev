"use client";
import React, { useEffect, useRef } from 'react';

export default function ViralNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Network Config
    const nodeCount = 80;
    const connectionDist = 150;
    
    interface Node {
      x: number; y: number;
      vx: number; vy: number;
      size: number;
      activation: number; // 0 to 1 (brightness)
      isInfluencer: boolean;
    }

    const nodes: Node[] = [];

    // Initialize Nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        activation: 0,
        isInfluencer: Math.random() > 0.95 // 5% chance to be a "source"
      });
    }

    const animate = () => {
      ctx.fillStyle = '#020617'; // Deep slate
      ctx.fillRect(0, 0, width, height);

      // Update Nodes
      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off walls
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Decay activation
        if (node.activation > 0) node.activation -= 0.01;

        // Influencers pulse randomly
        if (node.isInfluencer && Math.random() > 0.98) {
          node.activation = 1;
        }
      });

      // Draw Connections & Propagate Signal
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            // Logic: If one node is active, it "infects" the neighbor
            if (nodes[i].activation > 0.5 && nodes[j].activation < 0.1) {
               nodes[j].activation = nodes[i].activation - 0.05; // Slight decay
            } else if (nodes[j].activation > 0.5 && nodes[i].activation < 0.1) {
               nodes[i].activation = nodes[j].activation - 0.05;
            }

            // Draw Line
            const alpha = 1 - dist / connectionDist;
            const sharedHeat = (nodes[i].activation + nodes[j].activation) / 2;
            
            if (sharedHeat > 0.1) {
                // Hot signal line
                ctx.strokeStyle = `rgba(244, 63, 94, ${sharedHeat * alpha})`; // Rose-500
            } else {
                // Dormant line
                ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.05})`;
            }
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw Nodes
      nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        // Rose for active, Slate for dormant
        ctx.fillStyle = `rgba(244, 63, 94, ${node.activation > 0.1 ? node.activation : 0.1})`; 
        ctx.fill();
        
        // Glow for influencers
        if (node.isInfluencer) {
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.size * 4, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(244, 63, 94, ${0.2 + Math.random() * 0.1})`;
            ctx.fill();
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