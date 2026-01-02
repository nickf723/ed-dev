"use client";
import { useEffect, useRef } from "react";

export default function CivilBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // Structural Node
    class Node {
        x: number;
        y: number;
        anchor: boolean;
        connections: Node[];

        constructor(x: number, y: number, anchor = false) {
            this.x = x;
            this.y = y;
            this.anchor = anchor;
            this.connections = [];
        }
    }

    const nodes: Node[] = [];
    const gridSize = 80;

    // Build the Grid (The "Scaffold")
    const init = () => {
        nodes.length = 0;
        const cols = Math.ceil(w / gridSize);
        const rows = Math.ceil(h / gridSize);

        for (let x = 0; x <= cols; x++) {
            for (let y = 0; y <= rows; y++) {
                // Hexagonal offset for truss-like look
                const offsetX = (y % 2 === 0) ? 0 : gridSize / 2;
                const node = new Node(x * gridSize + offsetX, y * gridSize);
                nodes.push(node);
            }
        }
    };

    let time = 0;

    const animate = () => {
      // Concrete Grey Background
      ctx.fillStyle = "#18181b"; 
      ctx.fillRect(0, 0, w, h);
      time += 0.005;

      ctx.lineWidth = 1;

      // Draw The Structure
      nodes.forEach((n, i) => {
          // Calculate a "Load" wave passing through the structure
          const wave = Math.sin(n.x * 0.01 + n.y * 0.01 + time) * 0.5 + 0.5;
          
          // Draw Connections (Triangulation)
          // Connect to specific neighbors to simulate a truss
          nodes.forEach((n2, j) => {
              if (i === j) return;
              const dx = Math.abs(n.x - n2.x);
              const dy = Math.abs(n.y - n2.y);
              
              // Only connect close neighbors
              if (dx <= gridSize && dy <= gridSize) {
                   const dist = Math.sqrt((n.x-n2.x)**2 + (n.y-n2.y)**2);
                   if (dist < gridSize * 1.2) { // Allow diagonal connections
                       
                       // Dynamic Stress Coloring
                       // If wave is high, strut is under "load" (Yellow/Orange)
                       // Otherwise "steel" (Blue/Grey)
                       const stress = (wave + Math.sin(n2.x*0.01 + time)) / 2;
                       
                       ctx.beginPath();
                       ctx.moveTo(n.x, n.y);
                       ctx.lineTo(n2.x, n2.y);
                       
                       if (stress > 0.8) {
                           ctx.strokeStyle = `rgba(250, 204, 21, ${stress})`; // Safety Yellow
                           ctx.lineWidth = 2;
                       } else {
                           ctx.strokeStyle = "rgba(148, 163, 184, 0.1)"; // Slate-400
                           ctx.lineWidth = 1;
                       }
                       ctx.stroke();
                   }
              }
          });
      });

      // Draw Nodes (Joints)
      ctx.fillStyle = "#52525b"; // Zinc-600
      nodes.forEach(n => {
          ctx.beginPath();
          ctx.arc(n.x, n.y, 2, 0, Math.PI*2);
          ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    init();
    const animId = requestAnimationFrame(animate);
    const handleResize = () => { 
        w = canvas.width = window.innerWidth; 
        h = canvas.height = window.innerHeight; 
        init();
    };
    window.addEventListener("resize", handleResize);

    return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}