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

    // WISPS (Spirits)
    const wisps: any[] = [];
    const wispCount = 15;
    
    for(let i=0; i<wispCount; i++) {
        wisps.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 20 + 10,
            pulseOffset: Math.random() * Math.PI
        });
    }

    const render = () => {
      // Clear with dark purple/orange tint
      ctx.fillStyle = "#050205"; 
      ctx.fillRect(0, 0, w, h);

      // 1. DRAW FOG (Simulated by large, soft circles moving slowly)
      ctx.globalCompositeOperation = "screen";
      for(let i=0; i<10; i++) {
          const x = (Math.sin(time * 0.0005 + i) * w/2) + w/2;
          const y = (Math.cos(time * 0.001 + i) * h/2) + h/2;
          const r = 300 + Math.sin(time * 0.002) * 100;
          
          const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
          grad.addColorStop(0, "rgba(76, 29, 149, 0.05)"); // Deep Purple
          grad.addColorStop(1, "rgba(0,0,0,0)");
          
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI*2);
          ctx.fill();
      }

      // 2. DRAW WISPS
      wisps.forEach(wisp => {
          wisp.x += wisp.vx;
          wisp.y += wisp.vy;

          // Gentle float
          wisp.y += Math.sin(time * 0.02 + wisp.pulseOffset) * 0.2;

          // Bounce
          if(wisp.x < 0 || wisp.x > w) wisp.vx *= -1;
          if(wisp.y < 0 || wisp.y > h) wisp.vy *= -1;

          const opacity = (Math.sin(time * 0.05 + wisp.pulseOffset) + 1) / 2 * 0.3 + 0.1;
          
          // Core
          const grad = ctx.createRadialGradient(wisp.x, wisp.y, 0, wisp.x, wisp.y, wisp.size);
          grad.addColorStop(0, `rgba(251, 146, 60, ${opacity})`); // Orange Core
          grad.addColorStop(1, "rgba(0,0,0,0)");
          
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(wisp.x, wisp.y, wisp.size, 0, Math.PI*2);
          ctx.fill();
      });

      // 3. FLICKER OVERLAY (Old Film / Candle effect)
      if (Math.random() > 0.95) {
          ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.1})`;
          ctx.fillRect(0, 0, w, h);
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