"use client";
import React, { useEffect, useRef } from 'react';

export default function TaxonomyTreeBackground() {
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
      depth: number;
      children: Node[];
      active: number;
    }

    let root: Node;

    const buildTree = (x: number, y: number, depth: number, heightSpan: number): Node => {
      const node: Node = { x, y, depth, children: [], active: 0 };
      
      if (depth < 5) {
        const childCount = Math.floor(Math.random() * 3) + 1; // 1 to 3 children
        const nextSpan = heightSpan / childCount;
        
        for(let i=0; i<childCount; i++) {
           const childY = (y - heightSpan/2) + (nextSpan * i) + (nextSpan/2);
           const childX = x + (width / 7); // Horizontal spacing
           node.children.push(buildTree(childX, childY, depth + 1, nextSpan));
        }
      }
      return node;
    };

    const init = () => {
        root = buildTree(50, height / 2, 0, height * 0.8);
    };

    const drawNode = (node: Node, parent: Node | null) => {
      // Draw Connection (Orthogonal: Horizontal then Vertical)
      if (parent) {
        ctx.strokeStyle = `rgba(99, 102, 241, ${0.1 + node.active})`; // Indigo
        ctx.lineWidth = node.active > 0 ? 2 : 1;
        
        ctx.beginPath();
        ctx.moveTo(parent.x, parent.y);
        ctx.lineTo(parent.x + (node.x - parent.x)/2, parent.y); // Horizontal half
        ctx.lineTo(parent.x + (node.x - parent.x)/2, node.y);   // Vertical
        ctx.lineTo(node.x, node.y);                              // Horizontal finish
        ctx.stroke();
      }

      // Draw Node
      ctx.fillStyle = node.active > 0 ? '#fbbf24' : '#1e1b4b'; // Amber active, dark indigo passive
      ctx.beginPath();
      // Rectangles for "Folder" look
      ctx.rect(node.x - 3, node.y - 3, 6, 6);
      ctx.fill();

      // Decay activity
      if (node.active > 0) node.active -= 0.01;

      // Random activation from parent
      if (parent && parent.active > 0.5 && Math.random() > 0.9) {
          node.active = 1;
      }
      // Root pulse
      if (!parent && Math.random() > 0.98) node.active = 1;

      node.children.forEach(c => drawNode(c, node));
    };

    const animate = () => {
      ctx.fillStyle = '#020617'; // Slate-950
      ctx.fillRect(0, 0, width, height);
      
      if (root) drawNode(root, null);
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