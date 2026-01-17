"use client";
import { useEffect, useRef } from "react";

export default function MicrobiologyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // MICROBE FACTORY
    const count = 60;
    const microbes: any[] = [];
    
    for(let i=0; i<count; i++) {
        const type = Math.random();
        microbes.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 5 + 2,
            angle: Math.random() * Math.PI * 2,
            spin: (Math.random() - 0.5) * 0.05,
            type: type > 0.7 ? 'ROD' : type > 0.4 ? 'COCCUS' : 'SPIROCHETE', 
            color: type > 0.7 ? "rgba(34, 211, 238," : type > 0.4 ? "rgba(16, 185, 129," : "rgba(244, 63, 94," // Cyan / Green / Rose
        });
    }

    const render = () => {
      // Clear with very slight trails for "fluid" feel
      ctx.fillStyle = "rgba(0, 5, 5, 0.2)"; 
      ctx.fillRect(0, 0, w, h);

      microbes.forEach(m => {
          // Brownian Motion Jitter
          m.vx += (Math.random() - 0.5) * 0.05;
          m.vy += (Math.random() - 0.5) * 0.05;
          
          // Friction (Liquid drag)
          m.vx *= 0.98;
          m.vy *= 0.98;
          
          m.x += m.vx;
          m.y += m.vy;
          m.angle += m.spin;

          // Wrap
          if(m.x < -20) m.x = w+20; if(m.x > w+20) m.x = -20;
          if(m.y < -20) m.y = h+20; if(m.y > h+20) m.y = -20;

          // DRAW
          ctx.save();
          ctx.translate(m.x, m.y);
          ctx.rotate(m.angle);
          
          ctx.fillStyle = `${m.color} 0.5)`;
          ctx.strokeStyle = `${m.color} 0.8)`;
          ctx.lineWidth = 1;
          
          // Glow
          ctx.shadowBlur = 10;
          ctx.shadowColor = `${m.color} 1)`;

          if (m.type === 'ROD') {
              // Draw Bacillus (Capsule shape)
              ctx.beginPath();
              ctx.roundRect(-m.size*2, -m.size/2, m.size*4, m.size, m.size/2);
              ctx.stroke();
              ctx.fill();
          } else if (m.type === 'COCCUS') {
              // Draw Coccus (Circle)
              ctx.beginPath();
              ctx.arc(0, 0, m.size, 0, Math.PI * 2);
              ctx.stroke();
          } else {
              // Draw Spirochete (Wavy Line)
              ctx.beginPath();
              ctx.moveTo(-m.size*2, 0);
              for(let j=0; j<10; j++) {
                  ctx.lineTo(-m.size*2 + (j * m.size/2), Math.sin(j)*3);
              }
              ctx.stroke();
          }

          ctx.restore();
      });

      requestAnimationFrame(render);
    };

    const animId = requestAnimationFrame(render);
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none bg-[#000505]" />;
}