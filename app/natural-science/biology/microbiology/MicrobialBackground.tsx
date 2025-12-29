"use client";
import { useEffect, useRef } from "react";

export default function MicrobialBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let time = 0;

    // Entities
    type Microbe = { 
        x: number; y: number; 
        type: 'coccus' | 'bacillus' | 'virus'; 
        angle: number; 
        speed: number; 
        color: string;
        dead: boolean;
    };
    
    let microbes: Microbe[] = [];
    let antibodies: {x: number, y: number, target?: Microbe}[] = [];

    // Spawn initial population
    const spawn = () => {
        microbes = [];
        const count = 60;
        for(let i=0; i<count; i++) {
            const type = Math.random() > 0.7 ? 'virus' : Math.random() > 0.5 ? 'bacillus' : 'coccus';
            microbes.push({
                x: Math.random() * w,
                y: Math.random() * h,
                type,
                angle: Math.random() * Math.PI * 2,
                speed: 0.2 + Math.random() * 0.5,
                color: type === 'virus' ? "#ef4444" : type === 'bacillus' ? "#a3e635" : "#22d3ee", // Red, Lime, Cyan
                dead: false
            });
        }
    };
    spawn();

    const animate = () => {
      ctx.fillStyle = "#020402"; // Dark substrate
      ctx.fillRect(0, 0, w, h);
      time += 0.05;

      // 1. Update Antibodies (Hunters)
      for (let i = antibodies.length - 1; i >= 0; i--) {
          const ab = antibodies[i];
          
          // Find target if none
          if (!ab.target || ab.target.dead) {
              let minDist = 1000;
              let closest = null;
              microbes.forEach(m => {
                  if(m.dead) return;
                  const d = Math.sqrt((ab.x-m.x)**2 + (ab.y-m.y)**2);
                  if (d < minDist) { minDist = d; closest = m; }
              });
              if(closest) ab.target = closest;
              else {
                  // No targets left, fade out or wander
                  antibodies.splice(i, 1); 
                  continue;
              }
          }

          // Move towards target
          if (ab.target) {
              const dx = ab.target.x - ab.x;
              const dy = ab.target.y - ab.y;
              const dist = Math.sqrt(dx*dx + dy*dy);
              
              if (dist < 5) {
                  // KILL
                  ab.target.dead = true;
                  antibodies.splice(i, 1);
                  
                  // Explosion effect (simple)
                  ctx.fillStyle = "#fff";
                  ctx.beginPath();
                  ctx.arc(ab.x, ab.y, 10, 0, Math.PI*2);
                  ctx.fill();
                  continue;
              }
              
              ab.x += (dx/dist) * 4; // Fast speed
              ab.y += (dy/dist) * 4;
          }

          // Draw Antibody (Y shape approx)
          ctx.strokeStyle = "white";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(ab.x, ab.y);
          ctx.lineTo(ab.x - 4, ab.y - 6);
          ctx.moveTo(ab.x, ab.y);
          ctx.lineTo(ab.x + 4, ab.y - 6);
          ctx.moveTo(ab.x, ab.y);
          ctx.lineTo(ab.x, ab.y + 6);
          ctx.stroke();
      }

      // 2. Update Microbes
      microbes.forEach(m => {
          if (m.dead) return;

          // Brownian-ish motion
          m.angle += (Math.random() - 0.5) * 0.2;
          m.x += Math.cos(m.angle) * m.speed;
          m.y += Math.sin(m.angle) * m.speed;

          // Wrap
          if(m.x < -20) m.x = w+20; if(m.x > w+20) m.x = -20;
          if(m.y < -20) m.y = h+20; if(m.y > h+20) m.y = -20;

          // Draw
          ctx.fillStyle = m.color;
          ctx.beginPath();
          
          if (m.type === 'coccus') {
              // Sphere
              ctx.arc(m.x, m.y, 4, 0, Math.PI*2);
              ctx.fill();
              // Glow
              ctx.shadowColor = m.color;
              ctx.shadowBlur = 10;
              ctx.stroke();
              ctx.shadowBlur = 0;
          } else if (m.type === 'bacillus') {
              // Rod
              ctx.save();
              ctx.translate(m.x, m.y);
              ctx.rotate(m.angle);
              ctx.roundRect(-8, -3, 16, 6, 3);
              ctx.fill();
              ctx.restore();
          } else {
              // Virus (Spiky)
              const spikes = 6;
              for(let j=0; j<spikes; j++) {
                  const a = (j/spikes)*Math.PI*2 + time;
                  ctx.moveTo(m.x, m.y);
                  ctx.lineTo(m.x + Math.cos(a)*6, m.y + Math.sin(a)*6);
              }
              ctx.strokeStyle = m.color;
              ctx.stroke();
              ctx.beginPath();
              ctx.arc(m.x, m.y, 2, 0, Math.PI*2);
              ctx.fill();
          }
      });

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    
    const handleClick = (e: MouseEvent) => {
        // Spawn Antibodies
        for(let i=0; i<3; i++) {
            antibodies.push({ 
                x: e.clientX + (Math.random()-0.5)*20, 
                y: e.clientY + (Math.random()-0.5)*20 
            });
        }
    };

    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; spawn(); };
    window.addEventListener("mousedown", handleClick);
    window.addEventListener("resize", handleResize);

    return () => {
        window.removeEventListener("mousedown", handleClick);
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-auto cursor-crosshair" />;
}