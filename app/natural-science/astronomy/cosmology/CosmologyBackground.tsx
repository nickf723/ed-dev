"use client";
import React, { useEffect, useRef } from "react";

export function CosmologyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // CONFIGURATION
    const NODE_COUNT = 150;
    const CONNECTION_DIST = 150;
    const DRIFT_SPEED = 0.2;

    // DATA
    const nodes: any[] = [];
    
    // INITIALIZE NODES (Galaxy Clusters)
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * DRIFT_SPEED,
        vy: (Math.random() - 0.5) * DRIFT_SPEED,
        size: Math.random() * 1.5 + 0.5
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // UPDATE & DRAW NODES
      ctx.fillStyle = "rgba(100, 100, 255, 0.8)";
      
      for (let i = 0; i < nodes.length; i++) {
        const p = nodes[i];
        
        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges (Closed Universe Model?)
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Draw Node (Galaxy Cluster)
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // DRAW FILAMENTS (Connections)
        // We only check nodes *ahead* of us to avoid double drawing
        for (let j = i + 1; j < nodes.length; j++) {
          const p2 = nodes[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx*dx + dy*dy);

          if (dist < CONNECTION_DIST) {
            ctx.beginPath();
            // Opacity is based on distance (Closer = Brighter)
            const opacity = 1 - (dist / CONNECTION_DIST);
            ctx.strokeStyle = `rgba(100, 149, 237, ${opacity * 0.4})`; // Cornflower Blue
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", handleResize);
    const frameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-50 bg-[#050510]">
      <canvas ref={canvasRef} className="absolute inset-0" />
      {/* VIGNETTE & COLOR GRADING */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-blue-900/10 mix-blend-screen" />
    </div>
  );
}