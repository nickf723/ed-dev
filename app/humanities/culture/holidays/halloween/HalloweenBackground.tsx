"use client";
import { useEffect, useRef } from "react";

export default function HalloweenBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let time = 0;

    // BATS
    const bats: any[] = [];
    for(let i=0; i<15; i++) {
        bats.push({
            x: Math.random() * w,
            y: Math.random() * h * 0.5,
            size: Math.random() * 5 + 2,
            speedX: Math.random() * 4 - 2,
            speedY: Math.random() * 2 - 1,
            wingSpeed: Math.random() * 0.2 + 0.1,
            offset: Math.random() * 10
        });
    }

    const render = () => {
      // Clear with dark purple/black gradient
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, "#000000"); // Deep Purple
      grad.addColorStop(1, "#6d3106"); // Dark Orange
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // FOG LAYERS (Simple Sine Wave stacking)
      ctx.fillStyle = "rgba(87, 0, 158, 0.91)";
      for(let i=0; i<3; i++) {
          ctx.beginPath();
          ctx.moveTo(0, h);
          for(let x=0; x<=w; x+=10) {
              const noise = Math.sin(x * 0.002 + time * 0.002 + i) * 50;
              const y = h - 100 - (i * 50) + noise;
              ctx.lineTo(x, y);
          }
          ctx.lineTo(w, h);
          ctx.fill();
      }

      // DRAW BATS
      ctx.fillStyle = "#000";
      bats.forEach(b => {
          b.x += b.speedX;
          b.y += b.speedY;
          
          // Wrap
          if(b.x > w + 20) b.x = -20;
          if(b.x < -20) b.x = w + 20;
          if(b.y > h) b.y = -20;
          if(b.y < -20) b.y = h;

          // Wing Flap
          const flap = Math.sin(time * b.wingSpeed + b.offset) * 5;

          ctx.beginPath();
          ctx.moveTo(b.x, b.y);
          // Left Wing
          ctx.bezierCurveTo(b.x - 10, b.y - flap, b.x - 20, b.y + 10, b.x, b.y + 5);
          // Right Wing
          ctx.bezierCurveTo(b.x + 20, b.y + 10, b.x + 10, b.y - flap, b.x, b.y);
          ctx.fill();
      });

      time++;
      requestAnimationFrame(render);
    };

    const animId = requestAnimationFrame(render);
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}