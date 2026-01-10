"use client";
import { useEffect, useRef } from "react";

export default function FactoringBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // --- STATE ---
    // Floating "Area Models" (Rectangles)
    const blocks: {
        x: number; y: number;
        w: number; h_dim: number; // width/height
        dx: number; dy: number;
        rotation: number;
        rotSpeed: number;
        scanPhase: number;
        color: string;
    }[] = [];

    const initBlocks = () => {
        blocks.length = 0;
        const count = 15;
        for(let i=0; i<count; i++) {
            const size = 60 + Math.random() * 100;
            blocks.push({
                x: Math.random() * w,
                y: Math.random() * h,
                w: size,
                h_dim: size * (0.5 + Math.random() * 0.5), // varying aspect ratios
                dx: (Math.random() - 0.5) * 0.3,
                dy: (Math.random() - 0.5) * 0.3,
                rotation: Math.random() * Math.PI * 2,
                rotSpeed: (Math.random() - 0.5) * 0.002,
                scanPhase: Math.random() * Math.PI * 2,
                color: Math.random() > 0.5 ? "#818cf8" : "#a78bfa" // Indigo or Violet
            });
        }
    };

    initBlocks();

    const render = () => {
      ctx.fillStyle = "#0c0a1f"; // Deep Indigo Void
      ctx.fillRect(0, 0, w, h);

      blocks.forEach(b => {
          b.x += b.dx;
          b.y += b.dy;
          b.rotation += b.rotSpeed;
          b.scanPhase += 0.02; // Speed of the "X-Ray" scan

          // Wrap around
          if (b.x > w + 100) b.x = -100;
          if (b.x < -100) b.x = w + 100;
          if (b.y > h + 100) b.y = -100;
          if (b.y < -100) b.y = h + 100;

          ctx.save();
          ctx.translate(b.x, b.y);
          ctx.rotate(b.rotation);

          // Draw Container (The Polynomial)
          ctx.strokeStyle = `rgba(129, 140, 248, 0.2)`;
          ctx.lineWidth = 2;
          ctx.strokeRect(-b.w/2, -b.h_dim/2, b.w, b.h_dim);

          // Draw "Factors" (The Grid Lines)
          // We oscillate the opacity to make it look like it's being scanned
          const scanStrength = (Math.sin(b.scanPhase) + 1) / 2; // 0 to 1
          
          if (scanStrength > 0.1) {
              ctx.strokeStyle = b.color;
              ctx.globalAlpha = scanStrength * 0.3;
              ctx.lineWidth = 1;

              // Vertical Cut (x * x)
              ctx.beginPath();
              ctx.moveTo(-b.w * 0.2, -b.h_dim/2);
              ctx.lineTo(-b.w * 0.2, b.h_dim/2);
              ctx.stroke();

              // Horizontal Cut
              ctx.beginPath();
              ctx.moveTo(-b.w/2, 0);
              ctx.lineTo(b.w/2, 0);
              ctx.stroke();
              
              // Highlight the "Intersections" (The Terms)
              ctx.fillStyle = b.color;
              ctx.globalAlpha = scanStrength * 0.1;
              ctx.fillRect(-b.w/2, -b.h_dim/2, b.w/2 - b.w*0.2 + b.w/2, b.h_dim/2);
          }

          ctx.restore();
      });

      requestAnimationFrame(render);
    };

    const animId = requestAnimationFrame(render);
    const handleResize = () => { 
        w = canvas.width = window.innerWidth; 
        h = canvas.height = window.innerHeight; 
        initBlocks();
    };
    window.addEventListener("resize", handleResize);
    return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-60 pointer-events-none" />;
}