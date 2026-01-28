"use client";
import { useEffect, useRef } from "react";

export default function SynthwaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let time = 0;

    const render = () => {
      // 1. Cyber Gradient
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, "#090014"); // Deep Purple
      grad.addColorStop(1, "#1a0b2e"); // Lighter Purple
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // 2. The Grid (Perspective)
      const horizon = h * 0.4; // Horizon line
      const speed = (time * 2) % 40; // Movement speed

      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(216, 180, 254, 0.2)"; // Neon Pink/Purple
      ctx.shadowBlur = 10;
      ctx.shadowColor = "rgba(232, 121, 249, 0.8)";

      // Vertical Lines (Fan out)
      const centerX = w / 2;
      for (let x = -w; x < w * 2; x += 100) {
          ctx.beginPath();
          ctx.moveTo(x, h);
          ctx.lineTo(centerX, horizon);
          ctx.stroke();
      }

      // Horizontal Lines (Move down)
      // We use an exponential gap to simulate depth
      for (let y = 0; y < h - horizon; y += 40) {
          const depth = y + speed; 
          // Map linear Y to perspective Y
          // The closer to horizon (0), the smaller the gap. 
          // Actually, let's just draw linear lines on the bottom half for simplicity + style
          const drawY = horizon + (depth * (depth/300)); // Quadratic spacing
          
          if(drawY > h) continue;

          ctx.beginPath();
          ctx.moveTo(0, drawY);
          ctx.lineTo(w, drawY);
          ctx.stroke();
      }

      // 3. Sun
      const sunGrad = ctx.createLinearGradient(centerX, horizon - 150, centerX, horizon);
      sunGrad.addColorStop(0, "#facc15"); // Yellow
      sunGrad.addColorStop(1, "#ec4899"); // Pink
      ctx.fillStyle = sunGrad;
      ctx.beginPath();
      ctx.arc(centerX, horizon - 50, 80, 0, Math.PI * 2);
      ctx.fill();

      // Sun Scanlines (Cuts)
      ctx.fillStyle = "#090014";
      for(let i=0; i<10; i++) {
          ctx.fillRect(centerX - 90, horizon - 50 + (i*8) + (i*i*0.5), 180, 2 + i);
      }

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