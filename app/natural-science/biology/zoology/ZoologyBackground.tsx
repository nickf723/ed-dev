"use client";
import { useEffect, useRef } from "react";

interface Props {
  weather: string; 
}

export default function ZoologyBackground({ weather }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let time = 0;

    const particles: any[] = [];
    
    // PARTICLE FACTORY
    const initWeather = () => {
      particles.length = 0;
      const count = 100;
      
      for(let i=0; i<count; i++) {
        if (weather === 'RAIN') {
           particles.push({ x: Math.random() * w, y: Math.random() * h, speed: Math.random() * 15 + 10, len: Math.random() * 20 + 10 });
        } else if (weather === 'SNOW_STORM') {
           particles.push({ x: Math.random() * w, y: Math.random() * h, speed: Math.random() * 3 + 1, size: Math.random() * 3, drift: Math.random() * 5 });
        } else if (weather === 'FOG') {
           particles.push({ x: Math.random() * w, y: Math.random() * h, w: Math.random() * 300 + 100, h: Math.random() * 50 + 20, speed: Math.random() * 0.5 + 0.1 });
        } else if (weather === 'BUBBLES') {
           particles.push({ x: Math.random() * w, y: h + Math.random() * 100, speed: Math.random() * 1 + 0.5, size: Math.random() * 4 });
        }
      }
    };
    initWeather();

    const render = () => {
      ctx.clearRect(0, 0, w, h);

      // --- 1. GOD RAYS (Savanna) ---
      if (weather === 'GOD_RAYS') {
         ctx.globalCompositeOperation = "screen";
         const cx = w * 0.8; 
         const cy = -100;
         for(let i=0; i<8; i++) {
            const angle = (Math.sin(time * 0.001 + i) * 0.2) + (Math.PI / 2.5) + (i * 0.1);
            
            const grad = ctx.createLinearGradient(cx, cy, cx - Math.cos(angle)*h, h);
            grad.addColorStop(0, "rgba(251, 191, 36, 0.15)"); // Amber Light
            grad.addColorStop(1, "rgba(0,0,0,0)");
            
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(cx - Math.cos(angle - 0.1) * h * 1.5, h);
            ctx.lineTo(cx - Math.cos(angle + 0.1) * h * 1.5, h);
            ctx.fill();
         }
         ctx.globalCompositeOperation = "source-over";
      }

      // --- 2. HEAT HAZE (Desert) ---
      else if (weather === 'HEAT_HAZE') {
         ctx.strokeStyle = "rgba(255, 160, 0, 0.05)";
         ctx.lineWidth = 20;
         for(let i=0; i<20; i++) {
             const x = (i * w/20) + Math.sin(time * 0.01 + i) * 20;
             ctx.beginPath();
             ctx.moveTo(x, h);
             ctx.bezierCurveTo(x + 50, h*0.7, x - 50, h*0.3, x + Math.sin(time*0.02)*50, 0);
             ctx.stroke();
         }
      }

      // --- 3. FOG (Wetlands) ---
      else if (weather === 'FOG') {
         ctx.fillStyle = "rgba(20, 184, 166, 0.05)"; // Teal Mist
         particles.forEach(p => {
             p.x -= p.speed;
             if(p.x + p.w < 0) p.x = w;
             const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.w/2);
             grad.addColorStop(0, "rgba(20, 184, 166, 0.08)");
             grad.addColorStop(1, "rgba(0,0,0,0)");
             ctx.fillStyle = grad;
             ctx.fillRect(p.x - p.w, p.y - p.h, p.w * 2, p.h * 2);
         });
      }

      // --- 4. PARTICLES (Rain/Snow/Bubbles) ---
      else {
          particles.forEach(p => {
             if (weather === 'RAIN') {
                p.y += p.speed;
                if(p.y > h) p.y = -p.len;
                ctx.strokeStyle = "rgba(16, 185, 129, 0.5)";
                ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x, p.y + p.len); ctx.stroke();
             } else if (weather === 'SNOW_STORM') {
                p.y += p.speed; p.x += Math.sin(time * 0.01 + p.drift);
                if(p.y > h) p.y = -5;
                ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
                ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI*2); ctx.fill();
             } else if (weather === 'BUBBLES') {
                p.y -= p.speed;
                if (p.y < -10) p.y = h + 10;
                ctx.fillStyle = "rgba(56, 189, 248, 0.3)";
                ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI*2); ctx.fill();
             }
          });
      }

      time++;
      requestAnimationFrame(render);
    };

    const animId = requestAnimationFrame(render);
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; initWeather(); };
    window.addEventListener("resize", handleResize);
    return () => { window.removeEventListener("resize", handleResize); cancelAnimationFrame(animId); };
  }, [weather]);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}