"use client";
import { useEffect, useRef } from "react";

export default function TopologyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // --- STATE ---
    let time = 0;

    // Torus Knot Parameters (p/q)
    // Try (3, 7) or (2, 3)
    const p = 3; 
    const q = 7;
    
    // Points count
    const segments = 600;

    const render = () => {
      time += 0.005;
      
      // Clear with "Void" Violet
      ctx.fillStyle = "#000000ff"; 
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const scale = 175; // Size of the knot

      // Rotation
      const rotX = time * 0.5;
      const rotY = time * 0.3;

      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);

      ctx.beginPath();
      ctx.strokeStyle = "rgba(167, 139, 250, 0.5)"; // Violet-400
      ctx.lineWidth = 6;
      // Gradient stroke would be cool but complex, stick to solid for performance

      // Generate and Draw Path
      for (let i = 0; i <= segments; i++) {
          const t = (i / segments) * Math.PI * 2;
          
          // Parametric Equations for Torus Knot
          // r = cos(q * t) + 2;
          // x = r * cos(p * t);
          // y = r * sin(p * t);
          // z = -sin(q * t);
          
          const r_tube = Math.cos(q * t) + 3; // +3 pushes it out from center
          const rawX = r_tube * Math.cos(p * t);
          const rawY = r_tube * Math.sin(p * t);
          const rawZ = -Math.sin(q * t) * 2; // Z depth

          // 3D Rotation
          // Rotate Y
          let x = rawX * cosY - rawZ * sinY;
          let z = rawX * sinY + rawZ * cosY;
          let y = rawY;

          // Rotate X
          let y2 = y * cosX - z * sinX;
          let z2 = y * sinX + z * cosX;
          
          // Project (Perspective)
          const fov = 1000;
          const perspective = fov / (fov + z2 * 30); // scale Z for depth effect
          
          const px = cx + x * scale * perspective * 0.4;
          const py = cy + y2 * scale * perspective * 0.4;

          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
      }
      
      // Close the loop
      ctx.closePath();
      
      // Glow effect
      ctx.shadowBlur = 15;
      ctx.shadowColor = "#a78bfa";
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Draw faint "Ghost" (Previous frame echo) for motion blur feel
      // Not implemented here to keep clean, but could add.

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