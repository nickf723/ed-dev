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
    let animId: number;
    
    let angleX = 0;
    let angleY = 0;
    
    // Configuration
    const r = 400; // Radius
    const numPoints = 180; // Reduced slightly for aesthetics
    const basePoints: {x: number, y: number, z: number}[] = [];

    // Initialize Points on a Sphere (Fibonacci Sphere)
    const phi = Math.PI * (3 - Math.sqrt(5)); 
    for (let i = 0; i < numPoints; i++) {
        const y = 1 - (i / (numPoints - 1)) * 2; 
        const radius = Math.sqrt(1 - y * y);
        const theta = phi * i;
        const x = Math.cos(theta) * radius;
        const z = Math.sin(theta) * radius;
        basePoints.push({ x: x * r, y: y * r, z: z * r });
    }

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;

      // Pre-calculate rotated points
      const rotatedPoints = basePoints.map(p => {
        // Rotate Y
        const x1 = p.x * Math.cos(angleY) - p.z * Math.sin(angleY);
        const z1 = p.z * Math.cos(angleY) + p.x * Math.sin(angleY);
        // Rotate X
        const y2 = p.y * Math.cos(angleX) - z1 * Math.sin(angleX);
        const z2 = z1 * Math.cos(angleX) + p.y * Math.sin(angleX);
        return { x: x1, y: y2, z: z2 };
      });

      // Draw Connections
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(100, 100, 100, 0.1)";

      // We check distance between projected points to draw lines
      // This is O(N^2) but N=80 is very fast (3200 pairs)
      for (let i = 0; i < rotatedPoints.length; i++) {
        const p1 = rotatedPoints[i];
        const scale1 = 800 / (800 + p1.z);
        const x1 = p1.x * scale1 + cx;
        const y1 = p1.y * scale1 + cy;

        // Draw Node
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
        ctx.beginPath();
        ctx.arc(x1, y1, 2 * scale1, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < rotatedPoints.length; j++) {
            const p2 = rotatedPoints[j];
            
            // 3D Distance check (connect neighbors on the sphere)
            const d3 = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2) + Math.pow(p1.z - p2.z, 2));

            if (d3 < 150) { // Connection threshold
                const scale2 = 800 / (800 + p2.z);
                const x2 = p2.x * scale2 + cx;
                const y2 = p2.y * scale2 + cy;

                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            }
        }
      }

      angleY += 0.001;
      angleX += 0.0005;
      animId = requestAnimationFrame(animate);
    };

    animate();

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