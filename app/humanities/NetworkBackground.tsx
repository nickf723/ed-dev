"use client";
import { useEffect, useRef } from "react";

export default function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let mouse = { x: -1000, y: -1000 };

    // Graph Nodes
    const nodeCount = 80;
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: 1.5 + Math.random() * 2,
    }));

    // Pre-calculate connections (simple distance based, but static-ish for stability)
    // We'll calculate dynamic connections in the loop for that "organic" feel

    const animate = () => {
      // Deep Maroon/Black Background
      ctx.fillStyle = "#1a0505"; // Very dark red/black
      ctx.fillRect(0, 0, w, h);

      // Update Nodes
      nodes.forEach(n => {
          n.x += n.vx;
          n.y += n.vy;

          // Bounce off walls
          if(n.x < 0 || n.x > w) n.vx *= -1;
          if(n.y < 0 || n.y > h) n.vy *= -1;
          
          // Mouse interaction (Repel slightly)
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 150) {
              const force = (150 - dist) / 150;
              n.x += (dx/dist) * force * 2;
              n.y += (dy/dist) * force * 2;
          }
      });

      // Draw Connections
      ctx.lineWidth = 0.5;
      for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
              const n1 = nodes[i];
              const n2 = nodes[j];
              const dist = Math.sqrt((n1.x - n2.x)**2 + (n1.y - n2.y)**2);

              if (dist < 150) {
                  // Interactive Highlight
                  const mouseDist = Math.sqrt(((n1.x+n2.x)/2 - mouse.x)**2 + ((n1.y+n2.y)/2 - mouse.y)**2);
                  const isHovered = mouseDist < 100;
                  
                  ctx.beginPath();
                  ctx.moveTo(n1.x, n1.y);
                  ctx.lineTo(n2.x, n2.y);
                  
                  if (isHovered) {
                      ctx.strokeStyle = "rgba(251, 191, 36, 0.6)"; // Amber Gold
                      ctx.lineWidth = 1;
                  } else {
                      ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 - dist/1500})`; // Faint white
                      ctx.lineWidth = 0.5;
                  }
                  ctx.stroke();
              }
          }
      }

      // Draw Nodes
      nodes.forEach(n => {
          // Check proximity to mouse for glow
          const d = Math.sqrt((n.x - mouse.x)**2 + (n.y - mouse.y)**2);
          const isActive = d < 150;

          ctx.beginPath();
          ctx.arc(n.x, n.y, n.size, 0, Math.PI*2);
          ctx.fillStyle = isActive ? "#fbbf24" : "#7f1d1d"; // Gold vs Dark Red
          ctx.fill();
          
          if (isActive) {
              ctx.shadowColor = "#fbbf24";
              ctx.shadowBlur = 15;
              ctx.stroke();
              ctx.shadowBlur = 0;
          }
      });

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    const handleMouseMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}