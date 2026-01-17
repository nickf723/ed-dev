"use client";
import { useEffect, useRef } from "react";

export default function GrimoireBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let time = 0;

    // CANDLE FLICKER CONFIG
    let lightRadius = h * 0.6;
    let lightX = w / 2;
    let lightY = h * 0.7;

    // SMOKE CONFIG
    const smoke: any[] = [];
    const smokeCount = 50;
    for(let i=0; i<smokeCount; i++) {
        smoke.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.2,
            vy: -(Math.random() * 0.5 + 0.2), // Always rise
            size: Math.random() * 100 + 50,
            alpha: Math.random() * 0.1
        });
    }

    const render = () => {
      // 1. FLICKER EFFECT (Randomize light source slightly)
      if(Math.random() > 0.8) {
         lightRadius = h * 0.6 + (Math.random() - 0.5) * 50;
         lightX = w / 2 + (Math.random() - 0.5) * 20;
      }

      // Base dark layer
      ctx.fillStyle = "#080202"; 
      ctx.fillRect(0, 0, w, h);

      // Draw the light (Radial Gradient)
      const grad = ctx.createRadialGradient(lightX, lightY, 0, lightX, lightY, lightRadius);
      grad.addColorStop(0, "rgba(255, 100, 0, 0.4)"); // Hot Orange center
      grad.addColorStop(0.5, "rgba(153, 27, 27, 0.2)"); // Deep Red mid
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // 2. SMOKE LAYER (Overlay)
      ctx.globalCompositeOperation = "overlay";
      smoke.forEach(p => {
          p.x += p.vx + Math.sin(time * 0.01 + p.y * 0.01) * 0.2; // Wavy rise
          p.y += p.vy;
          if(p.y < -p.size) { p.y = h + p.size; p.x = Math.random() * w; } // Reset

          const smokeGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
          smokeGrad.addColorStop(0, `rgba(40, 10, 10, ${p.alpha})`);
          smokeGrad.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = smokeGrad;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI*2); ctx.fill();
      });
      ctx.globalCompositeOperation = "source-over";

      // VIGNETTE
      const vig = ctx.createRadialGradient(w/2, h/2, h*0.4, w/2, h/2, h);
      vig.addColorStop(0, "transparent");
      vig.addColorStop(1, "rgba(0,0,0,0.9)");
      ctx.fillStyle = vig;
      ctx.fillRect(0,0,w,h);


      time++;
      requestAnimationFrame(render);
    };

    const animId = requestAnimationFrame(render);
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none bg-[#080202]" />;
}