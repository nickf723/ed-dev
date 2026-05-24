"use client";
import { useEffect, useRef } from "react";

export default function LinearAlgebraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    let time = 0;

    // --- 3D PROJECTION ENGINE ---
    // Projects a 3D coordinate (x, y, z) onto a 2D screen
    const project3D = (x: number, y: number, z: number, pitch: number, yaw: number) => {
        // 1. Rotate around Y axis (Yaw)
        const cosY = Math.cos(yaw);
        const sinY = Math.sin(yaw);
        const x1 = x * cosY - z * sinY;
        const z1 = z * cosY + x * sinY;

        // 2. Rotate around X axis (Pitch)
        const cosX = Math.cos(pitch);
        const sinX = Math.sin(pitch);
        const y2 = y * cosX - z1 * sinX;
        const z2 = z1 * cosX + y * sinX;

        // 3. Simple Orthographic Projection with depth scaling
        const scale = 150; 
        const perspective = 800 / (800 + z2); // Adds slight depth
        
        return {
            screenX: w / 2 + x1 * scale * perspective,
            screenY: h / 2 - y2 * scale * perspective, // Invert Y for canvas
            depth: z2
        };
    };

    const render = () => {
      time += 0.003;
      
      // The Void (Deep Space)
      ctx.fillStyle = "#020410"; 
      ctx.fillRect(0, 0, w, h);

      // Orbital Rotation Math
      const yaw = time; 
      const pitch = 0.4 + Math.sin(time * 0.5) * 0.2; // Slight camera bob

      // 1. DRAW 3D FLOOR GRID (XZ Plane)
      ctx.strokeStyle = "rgba(99, 102, 241, 0.1)"; // Indigo faint
      ctx.lineWidth = 1;
      
      const gridSpan = 3;
      for (let i = -gridSpan; i <= gridSpan; i += 0.5) {
          // Lines parallel to Z
          let p1 = project3D(i, -1, -gridSpan, pitch, yaw);
          let p2 = project3D(i, -1, gridSpan, pitch, yaw);
          ctx.beginPath(); ctx.moveTo(p1.screenX, p1.screenY); ctx.lineTo(p2.screenX, p2.screenY); ctx.stroke();

          // Lines parallel to X
          p1 = project3D(-gridSpan, -1, i, pitch, yaw);
          p2 = project3D(gridSpan, -1, i, pitch, yaw);
          ctx.beginPath(); ctx.moveTo(p1.screenX, p1.screenY); ctx.lineTo(p2.screenX, p2.screenY); ctx.stroke();
      }

      // 2. DRAW BASIS VECTORS (i, j, k)
      const drawVector = (x: number, y: number, z: number, color: string, label: string) => {
          const origin = project3D(0, 0, 0, pitch, yaw);
          const head = project3D(x, y, z, pitch, yaw);

          ctx.strokeStyle = color;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(origin.screenX, origin.screenY);
          ctx.lineTo(head.screenX, head.screenY);
          ctx.stroke();

          // Glowing Head
          ctx.fillStyle = color;
          ctx.shadowBlur = 15;
          ctx.shadowColor = color;
          ctx.beginPath();
          ctx.arc(head.screenX, head.screenY, 4, 0, Math.PI*2);
          ctx.fill();
          ctx.shadowBlur = 0; // Reset

          // Label
          ctx.font = "14px monospace";
          ctx.fillStyle = "#ffffff";
          ctx.fillText(label, head.screenX + 10, head.screenY);
      };

      // i-hat (X axis - Red)
      drawVector(1.5, 0, 0, "#ef4444", "î");
      
      // j-hat (Y axis - Green)
      drawVector(0, 1.5, 0, "#22c55e", "ĵ");
      
      // k-hat (Z axis - Blue)
      drawVector(0, 0, 1.5, "#3b82f6", "k̂");

      // 3. DRAW ORIGIN
      const origin = project3D(0, 0, 0, pitch, yaw);
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(origin.screenX, origin.screenY, 4, 0, Math.PI*2);
      ctx.fill();

      requestAnimationFrame(render);
    };

    const animId = requestAnimationFrame(render);
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

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-60 pointer-events-none" />;
}