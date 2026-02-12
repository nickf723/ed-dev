"use client";
import React, { useEffect, useRef } from 'react';

export default function HoloStructure() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let angle = 0;

    // Simple 3D Point
    class Point3D {
        x: number; y: number; z: number;
        constructor(x: number, y: number, z: number) {
            this.x = x; this.y = y; this.z = z;
        }
    }

    // Define a Cube
    const vertices = [
        new Point3D(-1, -1, -1), new Point3D(1, -1, -1),
        new Point3D(1, 1, -1), new Point3D(-1, 1, -1),
        new Point3D(-1, -1, 1), new Point3D(1, -1, 1),
        new Point3D(1, 1, 1), new Point3D(-1, 1, 1)
    ];

    const edges = [
        [0,1], [1,2], [2,3], [3,0], // Back face
        [4,5], [5,6], [6,7], [7,4], // Front face
        [0,4], [1,5], [2,6], [3,7]  // Connecting lines
    ];

    const project = (p: Point3D, w: number, h: number, rot: number) => {
        // Rotate Y
        const x1 = p.x * Math.cos(rot) - p.z * Math.sin(rot);
        const z1 = p.z * Math.cos(rot) + p.x * Math.sin(rot);
        
        // Rotate X
        const y2 = p.y * Math.cos(rot * 0.5) - z1 * Math.sin(rot * 0.5);
        const z2 = z1 * Math.cos(rot * 0.5) + p.y * Math.sin(rot * 0.5);

        // Perspective
        const scale = 400 / (4 + z2); 
        return {
            x: x1 * scale + w / 2,
            y: y2 * scale + h / 2
        };
    };

    const animate = () => {
      // 1. Background
      ctx.fillStyle = '#0c0a09'; // Stone-950
      ctx.fillRect(0, 0, width, height);

      // 2. Draw Cube
      angle += 0.01;
      
      ctx.strokeStyle = '#f59e0b'; // Amber-500
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      edges.forEach(edge => {
          const p1 = project(vertices[edge[0]], width, height, angle);
          const p2 = project(vertices[edge[1]], width, height, angle);
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
      });
      ctx.stroke();

      // 3. Draw Vertices (Joints)
      ctx.fillStyle = '#fff';
      vertices.forEach(v => {
          const p = project(v, width, height, angle);
          ctx.beginPath();
          ctx.arc(p.x, p.y, 4, 0, Math.PI*2);
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