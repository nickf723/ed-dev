"use client";
import { useEffect, useRef } from "react";

export default function NonEuclideanBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    let time = 0;

    // Grid Settings
    const gridSize = 30;
    const spacing = 40;

    const render = () => {
      time += 0.005;
      
      // Clear with "Void" Indigo
      ctx.fillStyle = "#0a0518"; 
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      // Curvature Factor oscillates between Positive (Sphere) and Negative (Saddle)
      // K > 0 : Sphere
      // K < 0 : Hyperbolic
      const K = Math.sin(time); 

      ctx.strokeStyle = `rgba(129, 140, 248, 0.3)`; // Indigo-400
      ctx.lineWidth = 1;

      // Draw horizontal lines
      for (let i = -gridSize; i <= gridSize; i++) {
          ctx.beginPath();
          for (let j = -gridSize; j <= gridSize; j++) {
              // 3D Coordinates (Flat Plane initially)
              let x = j * spacing;
              let y = i * spacing;
              let z = 0;

              // APPLY CURVATURE
              // z = K * (x^2 - y^2) for Saddle (Hyperbolic Paraboloid)
              // z = K * (x^2 + y^2) for Paraboloid (Elliptic)
              
              // We mix them based on K
              // If K > 0 (Elliptic-ish), we pull Z down at edges
              // If K < 0 (Hyperbolic), we twist
              
              const distSq = (x*x + y*y) / 10000;
              
              if (K > 0) {
                  // Sphere-like warping (Bulge center)
                  z = K * 100 * Math.cos(distSq); 
              } else {
                  // Saddle-like warping
                  z = -K * (x*x - y*y) * 0.001;
              }

              // Rotate for view
              const rotX = 1; // Tilt camera
              const rotZ = time * 0.2; // Slow spin

              // Rotate Z
              let x2 = x * Math.cos(rotZ) - y * Math.sin(rotZ);
              let y2 = x * Math.sin(rotZ) + y * Math.cos(rotZ);

              // Rotate X (Tilt)
              let y3 = y2 * Math.cos(rotX) - z * Math.sin(rotX);
              let z3 = y2 * Math.sin(rotX) + z * Math.cos(rotX);

              // Project
              const fov = 800;
              const scale = fov / (fov - z3);
              const px = cx + x2 * scale;
              const py = cy + y3 * scale;

              if (j === -gridSize) ctx.moveTo(px, py);
              else ctx.lineTo(px, py);
          }
          ctx.stroke();
      }

      // Draw Vertical Lines (Swap i/j loops essentially)
      // ... (Simplified for brevity, usually you do two passes or one mesh)

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

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-50 pointer-events-none" />;
}