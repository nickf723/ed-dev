"use client";
import React, { useEffect, useRef } from 'react';

export default function CrawlerBackground() {
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
      indexed: boolean;
      links: number[]; // Indices of connected nodes
    }

    const nodes: Node[] = [];
    const nodeCount = 40;
    
    // Create Sitemap Nodes
    for(let i=0; i<nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        indexed: false,
        links: []
      });
    }

    // Create Links (The Web)
    nodes.forEach((node, i) => {
      const neighbors = Math.floor(Math.random() * 3) + 1;
      for(let j=0; j<neighbors; j++) {
        const target = Math.floor(Math.random() * nodeCount);
        if (target !== i && !node.links.includes(target)) {
           node.links.push(target);
        }
      }
    });

    // The Crawler Bot
    let currentIdx = 0;
    let targetIdx = 0;
    let progress = 0;
    const speed = 0.05;

    const animate = () => {
      ctx.fillStyle = '#020617'; // Slate-950
      ctx.fillRect(0, 0, width, height);

      // Draw Connections
      ctx.lineWidth = 1;
      nodes.forEach((node, i) => {
        node.links.forEach(linkIdx => {
          const target = nodes[linkIdx];
          // Green line if indexed, grey if not
          ctx.strokeStyle = node.indexed ? 'rgba(74, 222, 128, 0.1)' : 'rgba(255, 255, 255, 0.02)';
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(target.x, target.y);
          ctx.stroke();
        });
      });

      // Draw Nodes
      nodes.forEach((node, i) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.indexed ? 4 : 2, 0, Math.PI * 2);
        ctx.fillStyle = node.indexed ? '#4ade80' : '#334155'; // Green-400 or Slate-700
        ctx.fill();
        
        if (node.indexed) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#4ade80';
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // Move Crawler
      const startNode = nodes[currentIdx];
      const endNode = nodes[targetIdx];
      
      progress += speed;
      
      const botX = startNode.x + (endNode.x - startNode.x) * progress;
      const botY = startNode.y + (endNode.y - startNode.y) * progress;

      // Draw Bot
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(botX, botY, 3, 0, Math.PI * 2);
      ctx.fill();
      
      // Scanning Beam
      ctx.strokeStyle = 'rgba(74, 222, 128, 0.5)';
      ctx.beginPath();
      ctx.arc(botX, botY, 20 * (Math.sin(progress * Math.PI) + 1), 0, Math.PI * 2);
      ctx.stroke();

      if (progress >= 1) {
        // Arrived
        nodes[targetIdx].indexed = true;
        currentIdx = targetIdx;
        progress = 0;
        
        // Pick next link
        if (nodes[currentIdx].links.length > 0) {
            const nextLink = Math.floor(Math.random() * nodes[currentIdx].links.length);
            targetIdx = nodes[currentIdx].links[nextLink];
        } else {
            // Dead end? Jump to random
            targetIdx = Math.floor(Math.random() * nodeCount);
        }
      }

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