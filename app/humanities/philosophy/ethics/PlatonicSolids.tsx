"use client";
import React, { useEffect, useRef } from 'react';

export default function PlatonicSolids() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let angle = 0;

    // Define an Icosahedron (roughly)
    const t = (1.0 + Math.sqrt(5.0)) / 2.0;
    const vertices = [
      { x: -1, y:  t, z:  0 }, { x:  1, y:  t, z:  0 }, { x: -1, y: -t, z:  0 }, { x:  1, y: -t, z:  0 },
      { x:  0, y: -1, z:  t }, { x:  0, y:  1, z:  t }, { x:  0, y: -1, z: -t }, { x:  0, y:  1, z: -t },
      { x:  t, y:  0, z: -1 }, { x:  t, y:  0, z:  1 }, { x: -t, y:  0, z: -1 }, { x: -t, y:  0, z:  1 }
    ];

    // Simple edges connecting nearest neighbors would be complex to map manually here,
    // so we'll just draw a "cloud" of connections for the aesthetic.
    
    const animate = () => {
      // Clear
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, '#f8fafc'); // Slate-50
      grad.addColorStop(1, '#e2e8f0'); // Slate-200
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const scale = 150;
      angle += 0.005;

      // Project and Draw
      const projected = vertices.map(v => {
          // Rotate Y
          let x = v.x * Math.cos(angle) - v.z * Math.sin(angle);
          let z = v.z * Math.cos(angle) + v.x * Math.sin(angle);
          
          // Rotate X
          let y = v.y * Math.cos(angle * 0.5) - z * Math.sin(angle * 0.5);
          z = z * Math.cos(angle * 0.5) + v.y * Math.sin(angle * 0.5);

          return {
              x: cx + x * scale,
              y: cy + y * scale,
              z: z
          };
      });

      ctx.strokeStyle = 'rgba(100, 116, 139, 0.3)'; // Slate-500
      ctx.lineWidth = 1;

      // Connect vertices (naive approach for visual effect)
      for(let i=0; i<projected.length; i++) {
          for(let j=i+1; j<projected.length; j++) {
              const p1 = projected[i];
              const p2 = projected[j];
              
              // Only connect if close in 3D space (approximate edge)
              const dist = Math.sqrt(Math.pow(vertices[i].x - vertices[j].x, 2) + Math.pow(vertices[i].y - vertices[j].y, 2) + Math.pow(vertices[i].z - vertices[j].z, 2));
              
              if(dist < 2.5) {
                  ctx.beginPath();
                  ctx.moveTo(p1.x, p1.y);
                  ctx.lineTo(p2.x, p2.y);
                  ctx.stroke();
              }
          }
      }
      
      // Draw Nodes
      ctx.fillStyle = '#f59e0b'; // Amber-500
      projected.forEach(p => {
          const size = Math.max(2, (p.z + 2) * 2);
          ctx.beginPath();
          ctx.arc(p.x, p.y, size, 0, Math.PI*2);
          ctx.fill();
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