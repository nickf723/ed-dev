"use client";
import { useEffect, useRef } from "react";

export default function WireframeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    
    let angle = 0;
    const points: {x: number, y: number, z: number}[] = [];
    const r = 300; // Radius

    // Generate points on a sphere (Fibonacci Sphere algorithm for even distribution)
    const numPoints = 100;
    const phi = Math.PI * (3 - Math.sqrt(5)); 

    for (let i = 0; i < numPoints; i++) {
        const y = 1 - (i / (numPoints - 1)) * 2; 
        const radius = Math.sqrt(1 - y * y);
        const theta = phi * i;
        const x = Math.cos(theta) * radius;
        const z = Math.sin(theta) * radius;
        points.push({ x: x * r, y: y * r, z: z * r });
    }

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = "rgba(100, 100, 100, 0.15)";
      ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
      ctx.lineWidth = 1;

      const cx = w / 2;
      const cy = h / 2;

      // Rotate and Project
      points.forEach((p, i) => {
        // Rotation around Y
        const x1 = p.x * Math.cos(angle) - p.z * Math.sin(angle);
        const z1 = p.z * Math.cos(angle) + p.x * Math.sin(angle);
        
        // Rotation around X
        const y2 = p.y * Math.cos(angle * 0.5) - z1 * Math.sin(angle * 0.5);
        const z2 = z1 * Math.cos(angle * 0.5) + p.y * Math.sin(angle * 0.5);

        // Perspective projection
        const scale = 600 / (600 + z2);
        const x2D = x1 * scale + cx;
        const y2D = y2 * scale + cy;

        // Draw Point
        ctx.beginPath();
        ctx.arc(x2D, y2D, 2 * scale, 0, Math.PI * 2);
        ctx.fill();

        // Connect to nearest neighbors (simple triangulation effect)
        for(let j = i + 1; j < points.length; j++) {
            const p2 = points[j];
            // Calculate rotated p2
            const p2x1 = p2.x * Math.cos(angle) - p2.z * Math.sin(angle);
            const p2z1 = p2.z * Math.cos(angle) + p2.x * Math.sin(angle);
            const p2y2 = p2.y * Math.cos(angle * 0.5) - p2z1 * Math.sin(angle * 0.5);
            const p2z2 = p2z1 * Math.cos(angle * 0.5) + p2.y * Math.sin(angle * 0.5);
            
            const dist = Math.sqrt(Math.pow(x1 - p2x1, 2) + Math.pow(y2 - p2y2, 2) + Math.pow(z2 - p2z2, 2));
            
            // If close enough, draw line
            if(dist < 100) {
                const p2scale = 600 / (600 + p2z2);
                const p2x2D = p2x1 * p2scale + cx;
                const p2y2D = p2y2 * p2scale + cy;
                
                ctx.beginPath();
                ctx.moveTo(x2D, y2D);
                ctx.lineTo(p2x2D, p2y2D);
                ctx.globalAlpha = 1 - (dist / 100); // Fade out
                ctx.stroke();
                ctx.globalAlpha = 1;
            }
        }
      });

      angle += 0.002;
      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}