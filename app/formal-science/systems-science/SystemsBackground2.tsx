"use client";
import { useEffect, useRef } from "react";

export default function SystemsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // NODES
    const nodes: any[] = [];
    const count = 60;
    
    for(let i=0; i<count; i++) {
        nodes.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1
        });
    }

    const render = () => {
      ctx.fillStyle = "#050202"; // Very dark red/black
      ctx.fillRect(0, 0, w, h);

      // Update & Draw Nodes
      ctx.fillStyle = "#ef4444"; // Red-500
      nodes.forEach(node => {
          node.x += node.vx;
          node.y += node.vy;

          if(node.x < 0 || node.x > w) node.vx *= -1;
          if(node.y < 0 || node.y > h) node.vy *= -1;

          ctx.beginPath();
          ctx.arc(node.x, node.y, node.size, 0, Math.PI*2);
          ctx.fill();
      });

      // Draw Connections
      ctx.lineWidth = 1;
      for(let i=0; i<count; i++) {
          for(let j=i+1; j<count; j++) {
              const dx = nodes[i].x - nodes[j].x;
              const dy = nodes[i].y - nodes[j].y;
              const dist = Math.sqrt(dx*dx + dy*dy);

              if(dist < 150) {
                  // Opacity based on distance
                  const opacity = 1 - (dist / 150);
                  ctx.strokeStyle = `rgba(239, 68, 68, ${opacity * 0.4})`;
                  ctx.beginPath();
                  ctx.moveTo(nodes[i].x, nodes[i].y);
                  ctx.lineTo(nodes[j].x, nodes[j].y);
                  ctx.stroke();
              }
          }
      }

      requestAnimationFrame(render);
    };

    const animId = requestAnimationFrame(render);
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}