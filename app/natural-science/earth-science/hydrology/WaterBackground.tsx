"use client";
import { useEffect, useRef } from "react";

export default function WaterBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let time = 0;
    let mouse = { x: w / 2, y: h / 2 };

    // Wave Layers
    const layers = [
        { color: "#1e3a8a", amp: 50, speed: 0.01, yOff: 0 },   // Deep Blue
        { color: "#3b82f6", amp: 40, speed: 0.02, yOff: 20 },  // Blue-500
        { color: "#06b6d4", amp: 30, speed: 0.03, yOff: 40 },  // Cyan-500
    ];

    const animate = () => {
      ctx.fillStyle = "#020408"; // Abyss
      ctx.fillRect(0, 0, w, h);
      time += 0.05;

      layers.forEach((layer, i) => {
          ctx.beginPath();
          ctx.moveTo(0, h);

          for (let x = 0; x <= w; x += 10) {
              // Base Wave
              let y = h / 2 + layer.yOff + Math.sin(x * 0.005 + time * layer.speed + i) * layer.amp;
              
              // Mouse Interaction (Ripple)
              const dist = Math.abs(x - mouse.x);
              const mouseInfluence = Math.max(0, (400 - dist) / 400);
              // Calculate wave from mouse Y
              const ripple = Math.sin(dist * 0.05 - time * 2) * 20 * mouseInfluence;
              
              // Add mouse vertical offset
              const dy = (mouse.y - h/2) * 0.1 * mouseInfluence;

              ctx.lineTo(x, y + ripple + dy);
          }

          ctx.lineTo(w, h);
          ctx.lineTo(0, h);
          
          ctx.fillStyle = layer.color;
          ctx.globalAlpha = 0.3 - (i * 0.05); // Fade deeper layers
          ctx.fill();
          
          // Top Line highlight
          ctx.strokeStyle = layer.color;
          ctx.lineWidth = 1;
          ctx.globalAlpha = 0.5;
          ctx.stroke();
      });
      
      // Bubbles
      if (Math.random() > 0.9) {
          // Add bubble logic here (omitted for brevity, keeping it clean)
      }

      ctx.globalAlpha = 1;
      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    const handleMouseMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}