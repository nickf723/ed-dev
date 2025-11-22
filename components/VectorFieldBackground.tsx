"use client";
import { useEffect, useRef } from "react";

export default function VectorFieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let time = 0;
    
    // Configuration
    const spacing = 30;
    const length = 15;
    const cols = Math.ceil(w / spacing);
    const rows = Math.ceil(h / spacing);
    
    // Math function for the field
    // Uses basic trig to simulate "Perlin noise" flow
    const getAngle = (x: number, y: number, t: number) => {
        return Math.sin(x * 0.005 + t) + Math.cos(y * 0.005 + t) * Math.PI;
    };

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;
      
      // Draw the field
      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
            const px = x * spacing;
            const py = y * spacing;
            
            const angle = getAngle(px, py, time);
            
            // Draw vector
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, 0.1)`;
            ctx.moveTo(px, py);
            ctx.lineTo(
                px + Math.cos(angle) * length, 
                py + Math.sin(angle) * length
            );
            ctx.stroke();
            
            // Highlight tip slightly
            ctx.fillStyle = `rgba(6, 182, 212, 0.3)`; // Cyan glow
            ctx.fillRect(
                px + Math.cos(angle) * length, 
                py + Math.sin(angle) * length, 
                1, 1
            );
        }
      }

      time += 0.002; // Speed
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
      className="fixed inset-0 pointer-events-none z-0 opacity-40 mix-blend-screen"
    />
  );
}