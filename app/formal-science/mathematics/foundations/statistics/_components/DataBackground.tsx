"use client";
import React, { useEffect, useRef } from 'react';

export default function DataBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // Deep Indigo/Slate theme
    const colors = ["#818cf8", "#c084fc", "#f472b6"]; // Indigo, Violet, Pink

    // Generate Data Nodes
    const nodes = Array.from({ length: 50 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 3 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    const animate = () => {
      ctx.fillStyle = "#0c0a1a"; // Deep midnight indigo
      ctx.fillRect(0, 0, w, h);

      // Draw Grid Lines (Graph Paper effect)
      ctx.strokeStyle = "rgba(129, 140, 248, 0.03)";
      ctx.lineWidth = 1;
      for(let i = 0; i < w; i += 50) {
          ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke();
      }
      for(let i = 0; i < h; i += 50) {
          ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(w, i); ctx.stroke();
      }

      // Update & Draw Nodes
      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;

        // Wrap around screen
        if (node.x < 0) node.x = w;
        if (node.x > w) node.x = 0;
        if (node.y < 0) node.y = h;
        if (node.y > h) node.y = 0;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.globalAlpha = 0.6;
        ctx.fill();

        // Draw connecting lines if nodes are close (Clustering/Line Chart effect)
        nodes.forEach(otherNode => {
            const dx = node.x - otherNode.x;
            const dy = node.y - otherNode.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                ctx.beginPath();
                ctx.moveTo(node.x, node.y);
                ctx.lineTo(otherNode.x, otherNode.y);
                ctx.strokeStyle = node.color;
                ctx.globalAlpha = 1 - (distance / 100); // Fade out as they get further
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        });
        ctx.globalAlpha = 1.0;
      });

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c0a1a]/40 via-transparent to-[#0c0a1a] opacity-90" />
    </div>
  );
}