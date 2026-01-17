"use client";
import { useEffect, useRef } from "react";

export default function DnaBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let time = 0;
    
    const strandCount = 40; // Number of base pairs visible
    
    // Biology Palette (Green / Lime / Cyan)
    const colorA = "#84cc16"; // Lime
    const colorB = "#22d3ee"; // Cyan
 

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      
      // Dark organic background
      ctx.fillStyle = "#051005"; 
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const spacing = h / strandCount;
      
      ctx.lineWidth = 2;

      for (let i = 0; i < strandCount + 5; i++) {
          const y = i * spacing + (time * 50) % spacing - spacing;
          const progress = i / strandCount;
          
          // Rotation
          const angle = (y * 0.01) + time;
          const radius = 100 + Math.sin(time * 0.5) * 20; // Breathing effect
          
          // Calculate strand positions (3D projection)
          const x1 = cx + Math.cos(angle) * radius;
          const x2 = cx + Math.cos(angle + Math.PI) * radius;
          
          // Z-index simulation (scale/opacity)
          const z1 = Math.sin(angle);
          const z2 = Math.sin(angle + Math.PI);
          
          const scale1 = 1 + z1 * 0.2;
          const scale2 = 1 + z2 * 0.2;
          
          const alpha1 = 0.5 + z1 * 0.4;
          const alpha2 = 0.5 + z2 * 0.4;

          // Draw Connection (Base Pair) - Only if not "broken" (mutation effect)
          if (Math.random() > 0.02) {
             ctx.beginPath();
             ctx.strokeStyle = `rgba(255, 255, 255, ${Math.min(alpha1, alpha2) * 0.2})`;
             ctx.moveTo(x1, y);
             ctx.lineTo(x2, y);
             ctx.stroke();
          }

          // Draw Strand 1
          ctx.beginPath();
          ctx.arc(x1, y, 6 * scale1, 0, Math.PI * 2);
          ctx.fillStyle = colorA;
          ctx.globalAlpha = alpha1;
          ctx.fill();
          
          // Draw Strand 2
          ctx.beginPath();
          ctx.arc(x2, y, 6 * scale2, 0, Math.PI * 2);
          ctx.fillStyle = colorB;
          ctx.globalAlpha = alpha2;
          ctx.fill();
      }

      ctx.globalAlpha = 1;
      time += 0.01;
      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    return () => { window.removeEventListener("resize", handleResize); cancelAnimationFrame(animId); };
  }, []);

  return (
    <>
        <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-40" />
        <div className="hd-vignette" />
    </>
  );
}