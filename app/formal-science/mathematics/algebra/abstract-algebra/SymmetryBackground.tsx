"use client";
import { useEffect, useRef } from "react";

export default function SymmetryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let time = 0;

    // --- CAYLEY GRAPH SIMULATION ---
    // We simulate a rotating hypercube / complex graph structure
    const nodes: {x: number, y: number, z: number}[] = [];
    const edges: [number, number][] = [];
    
    // Generate Nodes on a Sphere (Fibonacci Sphere algo for even distribution)
    const numNodes = 60;
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden Angle

    for (let i = 0; i < numNodes; i++) {
        const y = 1 - (i / (numNodes - 1)) * 2; // y from 1 to -1
        const radius = Math.sqrt(1 - y * y);
        const theta = phi * i;
        
        const x = Math.cos(theta) * radius;
        const z = Math.sin(theta) * radius;
        nodes.push({ x: x * 300, y: y * 300, z: z * 300 });
    }

    // Connect neighbors
    for (let i = 0; i < numNodes; i++) {
        for (let j = i + 1; j < numNodes; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const dz = nodes[i].z - nodes[j].z;
            const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
            if (dist < 120) {
                edges.push([i, j]);
            }
        }
    }

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      
      // 1. Deep Void Background
      const grad = ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, w);
      grad.addColorStop(0, "#0f0518"); // Deep Violet
      grad.addColorStop(1, "#000000");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Center
      const cx = w / 2;
      const cy = h / 2;

      // Rotation Speed
      const angleX = time * 0.005;
      const angleY = time * 0.008;

      // Project and Draw
      const projectedNodes = nodes.map(node => {
          // Rotate Y
          let x = node.x * Math.cos(angleY) - node.z * Math.sin(angleY);
          let z = node.z * Math.cos(angleY) + node.x * Math.sin(angleY);
          // Rotate X
          let y = node.y * Math.cos(angleX) - z * Math.sin(angleX);
          z = z * Math.cos(angleX) + node.y * Math.sin(angleX);

          // Perspective
          const scale = 1000 / (1000 + z);
          return { x: cx + x * scale, y: cy + y * scale, z };
      });

      ctx.lineWidth = 1;
      
      // Draw Edges
      edges.forEach(([i, j]) => {
          const p1 = projectedNodes[i];
          const p2 = projectedNodes[j];
          
          // Depth based opacity
          const alpha = (p1.z + 500) / 1000; 
          if(alpha < 0) return;

          ctx.strokeStyle = `rgba(167, 139, 250, ${alpha * 0.2})`; // Violet Neon
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
      });

      // Draw Nodes
      projectedNodes.forEach(p => {
          const alpha = (p.z + 500) / 1000;
          if(alpha < 0) return;
          
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.5})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
          ctx.fill();
      });

      time += 1;
      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    return () => { window.removeEventListener("resize", handleResize); cancelAnimationFrame(animId); };
  }, []);

  return (
    <>
        <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
        <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
    </>
  );
}