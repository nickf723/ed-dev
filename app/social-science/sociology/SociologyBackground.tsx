"use client";
import { useEffect, useRef } from "react";

export default function SociologyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const nodes: any[] = [];
    // Create clusters of nodes
    const clusters = 5;
    const nodesPerCluster = 15;

    for(let i=0; i<clusters; i++) {
        const cx = Math.random() * w;
        const cy = Math.random() * h;
        for(let j=0; j<nodesPerCluster; j++) {
            nodes.push({
                x: cx + (Math.random() - 0.5) * 300,
                y: cy + (Math.random() - 0.5) * 300,
                vx: (Math.random() - 0.5) * 0.2,
                vy: (Math.random() - 0.5) * 0.2,
                group: i // Group ID for color
            });
        }
    }

    const render = () => {
      ctx.fillStyle = "#0a0510"; // Dark Violet/Black
      ctx.fillRect(0, 0, w, h);

      // Draw Connections
      ctx.lineWidth = 0.5;
      for(let i=0; i<nodes.length; i++) {
          const a = nodes[i];
          a.x += a.vx;
          a.y += a.vy;

          // Wrap
          if(a.x < 0) a.x = w; if(a.x > w) a.x = 0;
          if(a.y < 0) a.y = h; if(a.y > h) a.y = 0;

          // Draw connections
          for(let j=i+1; j<nodes.length; j++) {
              const b = nodes[j];
              const dx = a.x - b.x;
              const dy = a.y - b.y;
              const dist = Math.sqrt(dx*dx + dy*dy);

              if(dist < 100) {
                  // Connect if close
                  const opacity = 1 - (dist / 100);
                  // Different colors if different groups connect (Social Bridge)
                  ctx.strokeStyle = a.group === b.group 
                    ? `rgba(139, 92, 246, ${opacity * 0.3})` // Violet (Intra-group)
                    : `rgba(255, 255, 255, ${opacity * 0.1})`; // White (Inter-group)
                  
                  ctx.beginPath();
                  ctx.moveTo(a.x, a.y);
                  ctx.lineTo(b.x, b.y);
                  ctx.stroke();
              }
          }
          
          // Draw Node
          ctx.fillStyle = "#8b5cf6";
          ctx.beginPath();
          ctx.arc(a.x, a.y, 1.5, 0, Math.PI*2);
          ctx.fill();
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