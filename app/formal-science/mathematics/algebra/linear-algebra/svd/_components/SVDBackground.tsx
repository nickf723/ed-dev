"use client";
import { useEffect, useRef } from "react";

export default function SVDBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    let time = 0;
    
    // Generate a structured cloud of "Data Points"
    const points: { x: number; y: number; z: number; origX: number; origY: number; origZ: number }[] = [];
    for (let i = 0; i < 200; i++) {
        points.push({
            origX: (Math.random() - 0.5) * 400,
            origY: (Math.random() - 0.5) * 400,
            origZ: (Math.random() - 0.5) * 400,
            x: 0, y: 0, z: 0
        });
    }

    const render = () => {
      // Clear with deep rose void
      ctx.fillStyle = "#0f0206"; 
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      time += 0.01;

      // The "Singular Values" oscillating to simulate data compression
      // sigmaZ collapses to 0 periodically (simulating rank reduction)
      const sigmaX = 1;
      const sigmaY = 0.5 + Math.sin(time * 0.5) * 0.2;
      const sigmaZ = Math.max(0, Math.sin(time * 0.3)); 

      ctx.fillStyle = "#fb7185"; // Rose-400
      ctx.strokeStyle = "rgba(2fb, 113, 133, 0.1)";

      points.forEach((p, i) => {
          // 1. Scale by Sigma (The Compression)
          p.x = p.origX * sigmaX;
          p.y = p.origY * sigmaY;
          p.z = p.origZ * sigmaZ;

          // 2. Rotate by U (The Projection)
          const angle = time * 0.2;
          const cosA = Math.cos(angle);
          const sinA = Math.sin(angle);
          
          const rotX = p.x * cosA - p.z * sinA;
          const rotZ = p.z * cosA + p.x * sinA;
          const rotY = p.y; // Keep Y static for nice visual band

          // 3. Project to 2D Screen
          const scale = 800 / (800 + rotZ);
          const screenX = cx + rotX * scale;
          const screenY = cy - rotY * scale;

          // Draw connections for the "Mesh" look
          if (i > 0 && i % 5 !== 0) {
              const prev = points[i-1];
              const pRotX = prev.x * cosA - prev.z * sinA;
              const pRotZ = prev.z * cosA + prev.x * sinA;
              const pScale = 800 / (800 + pRotZ);
              ctx.beginPath();
              ctx.moveTo(screenX, screenY);
              ctx.lineTo(cx + pRotX * pScale, cy - prev.y * pScale);
              ctx.stroke();
          }

          // Draw Point
          ctx.globalAlpha = Math.min(1, scale * 0.5);
          ctx.beginPath();
          ctx.arc(screenX, screenY, 1.5 * scale, 0, Math.PI * 2);
          ctx.fill();
      });
      ctx.globalAlpha = 1; // Reset

      requestAnimationFrame(render);
    };

    const animId = requestAnimationFrame(render);
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-60 pointer-events-none" />;
}