"use client";
import React, { useEffect, useRef } from 'react';

export default function WireframeTurntable() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let angle = 0;

    // Define a simple cube/shape in 3D coordinates
    const vertices = [
        {x: -1, y: -1, z: -1}, {x: 1, y: -1, z: -1}, {x: 1, y: 1, z: -1}, {x: -1, y: 1, z: -1},
        {x: -1, y: -1, z: 1}, {x: 1, y: -1, z: 1}, {x: 1, y: 1, z: 1}, {x: -1, y: 1, z: 1},
    ];

    const edges = [
        [0,1], [1,2], [2,3], [3,0], // Back face
        [4,5], [5,6], [6,7], [7,4], // Front face
        [0,4], [1,5], [2,6], [3,7]  // Connecting lines
    ];

    const animate = () => {
      // Clear with trail effect
      ctx.fillStyle = 'rgba(9, 9, 11, 0.2)'; // Zinc-950
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const scale = 300;

      angle += 0.005;

      // Projection Logic
      const projected = vertices.map(v => {
          // Rotate Y
          const x1 = v.x * Math.cos(angle) - v.z * Math.sin(angle);
          const z1 = v.z * Math.cos(angle) + v.x * Math.sin(angle);
          
          // Rotate X (tilted view)
          const y2 = v.y * Math.cos(0.4) - z1 * Math.sin(0.4);
          const z2 = z1 * Math.cos(0.4) + v.y * Math.sin(0.4);

          // Perspective
          const perspective = 3 / (3 - z2); // Simple z-divide
          return {
              x: cx + x1 * scale * perspective * 0.5,
              y: cy + y2 * scale * perspective * 0.5,
              z: z2
          };
      });

      ctx.lineWidth = 1;
      
      edges.forEach(edge => {
          const p1 = projected[edge[0]];
          const p2 = projected[edge[1]];
          
          // Depth cueing: lines further back are dimmer
          const avgZ = (p1.z + p2.z) / 2;
          const alpha = (avgZ + 1) / 2; // Map -1..1 to 0..1 roughly
          
          ctx.strokeStyle = `rgba(214, 211, 209, ${Math.max(0.1, alpha * 0.5)})`; // Stone-300
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
      });

      requestAnimationFrame(animate);
    };

    const handleResize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    animate();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}