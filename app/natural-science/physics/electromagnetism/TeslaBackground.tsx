"use client";
import { useEffect, useRef } from "react";

export default function TeslaBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let mouse = { x: w / 2, y: h / 2 };
    let time = 0;

    // "Ground Nodes" that attract lightning
    const nodes: { x: number; y: number }[] = [];
    const gridSize = 150;
    
    // Create a grid of potential targets
    const initNodes = () => {
        nodes.length = 0;
        for (let x = 0; x < w; x += gridSize) {
            for (let y = 0; y < h; y += gridSize) {
                // Jitter them slightly so it's not a perfect grid
                nodes.push({
                    x: x + Math.random() * 50,
                    y: y + Math.random() * 50
                });
            }
        }
    };
    initNodes();

    // Helper: Draw a jagged lightning bolt between two points
    const drawBolt = (x1: number, y1: number, x2: number, y2: number, displace: number) => {
      if (displace < 2) {
        ctx.lineTo(x2, y2);
        return;
      }
      
      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2;
      
      // Calculate normal vector
      const dx = x2 - x1;
      const dy = y2 - y1;
      
      // Add random displacement perpendicular to the line
      const offsetX = midX + (Math.random() - 0.5) * displace;
      const offsetY = midY + (Math.random() - 0.5) * displace;

      drawBolt(x1, y1, offsetX, offsetY, displace / 2);
      drawBolt(offsetX, offsetY, x2, y2, displace / 2);
    };

    const animate = () => {
      // Fast fade for "strobe" effect
      ctx.fillStyle = "rgba(5, 5, 10, 0.2)"; 
      ctx.fillRect(0, 0, w, h);
      
      time++;

      ctx.shadowBlur = 15;
      ctx.shadowColor = "#06b6d4"; // Cyan glow
      ctx.strokeStyle = "rgba(165, 243, 252, 0.8)"; // Cyan-200
      ctx.lineWidth = 2;

      // Find nodes close to mouse to arc to
      nodes.forEach(node => {
          const dx = node.x - mouse.x;
          const dy = node.y - mouse.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          
          // Arc logic: must be close, and random chance (flicker)
          if (dist < 300 && Math.random() > 0.92) {
              ctx.beginPath();
              ctx.moveTo(mouse.x, mouse.y);
              drawBolt(mouse.x, mouse.y, node.x, node.y, 80);
              ctx.stroke();
              
              // Hit flash
              ctx.beginPath();
              ctx.arc(node.x, node.y, Math.random() * 5 + 2, 0, Math.PI*2);
              ctx.fillStyle = "#fff";
              ctx.fill();
          }
      });
      
      // Occasional "Background Static" between random nodes
      if (Math.random() > 0.95) {
           const n1 = nodes[Math.floor(Math.random() * nodes.length)];
           const n2 = nodes[Math.floor(Math.random() * nodes.length)];
           const d = Math.sqrt((n1.x-n2.x)**2 + (n1.y-n2.y)**2);
           if (d < 200) {
               ctx.strokeStyle = "rgba(99, 102, 241, 0.3)"; // Indigo static
               ctx.shadowBlur = 0;
               ctx.lineWidth = 1;
               ctx.beginPath();
               ctx.moveTo(n1.x, n1.y);
               drawBolt(n1.x, n1.y, n2.x, n2.y, 30);
               ctx.stroke();
           }
      }

      ctx.shadowBlur = 0;
      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    
    const handleMouseMove = (e: MouseEvent) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    };
    const handleResize = () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
        initNodes();
    };

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