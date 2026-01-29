"use client";
import { useEffect, useRef } from "react";

export default function InfrastructureBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let time = 0;
    let mouse = { x: w / 2, y: h / 2 };

    // Isometric Constants
    const tileW = 40;
    const tileH = 20; // Flattened for iso look
    const gridSize = 40; // NxN grid
    
    // Grid State
    type Cell = { x: number; y: number; h: number; targetH: number; color: string };
    const grid: Cell[] = [];

    // Initialize Grid
    const initGrid = () => {
        grid.length = 0;
        const centerX = w / 2;
        const centerY = h / 3; // Shift up slightly

        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                // Iso Coordinates
                const isoX = (i - j) * tileW + centerX;
                const isoY = (i + j) * tileH + centerY;
                
                // Color Palette (Industrial/City)
                const colors = ["#334155", "#475569", "#1e293b"]; // Slate-700/600/800
                const color = colors[Math.floor(Math.random() * colors.length)];

                grid.push({
                    x: isoX,
                    y: isoY,
                    h: 0,
                    targetH: Math.random() * 50, // Initial variation
                    color
                });
            }
        }
    };
    initGrid();

    const drawBlock = (x: number, y: number, height: number, color: string) => {
        // Top Face
        ctx.fillStyle = color; // Base
        ctx.beginPath();
        ctx.moveTo(x, y - height);
        ctx.lineTo(x + tileW, y - tileH - height);
        ctx.lineTo(x, y - tileH * 2 - height);
        ctx.lineTo(x - tileW, y - tileH - height);
        ctx.closePath();
        ctx.fill();
        
        // Highlight Top
        ctx.fillStyle = "rgba(255,255,255,0.1)";
        ctx.fill();
        
        // Right Face
        ctx.fillStyle = "rgba(0,0,0,0.2)"; // Shadow
        ctx.beginPath();
        ctx.moveTo(x + tileW, y - tileH - height);
        ctx.lineTo(x, y - height);
        ctx.lineTo(x, y);
        ctx.lineTo(x + tileW, y - tileH);
        ctx.closePath();
        ctx.fill();

        // Left Face
        ctx.fillStyle = "rgba(0,0,0,0.4)"; // Darker Shadow
        ctx.beginPath();
        ctx.moveTo(x - tileW, y - tileH - height);
        ctx.lineTo(x, y - height);
        ctx.lineTo(x, y);
        ctx.lineTo(x - tileW, y - tileH);
        ctx.closePath();
        ctx.fill();
        
        // Edges
        ctx.strokeStyle = "rgba(255,255,255,0.05)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y - height); // Vertical
        ctx.lineTo(x, y - height - tileH * 2); // Top corner
        ctx.stroke();
    };

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      
      // Background gradient
      const bg = ctx.createLinearGradient(0, 0, 0, h);
      bg.addColorStop(0, "#0f172a"); // Slate-900
      bg.addColorStop(1, "#020617"); // Slate-950
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      time += 0.05;

      // Sort by Y for correct occlusion (Painter's Algorithm)
      // Since our generation order is structured, we can just iterate carefully or sort
      // Simple grid iteration (i+j) usually works for iso if consistent
      // But let's simple sort by Y to be safe
      grid.sort((a, b) => a.y - b.y);

      grid.forEach(cell => {
          // Interaction
          const dx = cell.x - mouse.x;
          const dy = (cell.y - cell.h/2) - mouse.y; // approximate center
          const dist = Math.sqrt(dx*dx + dy*dy);
          
          // "Build" near mouse
          if (dist < 150) {
              cell.targetH = 100 + Math.sin(time + cell.x)*20;
          } else {
              // Idle breathing
              cell.targetH = 20 + Math.sin(time * 0.5 + cell.x * 0.1) * 15;
          }

          // Lerp height
          cell.h += (cell.targetH - cell.h) * 0.1;

          drawBlock(cell.x, cell.y, cell.h, cell.color);
      });

      // Data streams (Traffic)
      // (Optional simple particles moving along grid lines)

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    
    const handleMouseMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; initGrid(); };

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