"use client";
import { useEffect, useRef } from "react";

interface Props {
  activeId: string | null;
  onHover: (id: string | null) => void;
}

export default function CellVisualizer({ activeId, onHover }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);
    let time = 0;

    // --- ENTITY CONFIG ---
    // We hardcode positions relative to center (0,0 is center of screen)
    const entities = [
      { id: 'nucleus', x: 0, y: 0, r: 80, color: '#a855f7' },
      { id: 'mitochondria', x: -120, y: -80, r: 25, color: '#f59e0b', angle: 0.5 },
      { id: 'mitochondria', x: 100, y: 90, r: 25, color: '#f59e0b', angle: -0.5 },
      { id: 'mitochondria', x: 140, y: -40, r: 25, color: '#f59e0b', angle: 2 },
      { id: 'golgi', x: -100, y: 100, r: 40, color: '#ec4899' },
      { id: 'lysosome', x: -60, y: -120, r: 15, color: '#ef4444' },
      { id: 'lysosome', x: 80, y: -100, r: 12, color: '#ef4444' },
      { id: 'lysosome', x: -130, y: 40, r: 18, color: '#ef4444' },
    ];

    const particles: any[] = []; // ATP sparks

    // MOUSE TRACKING
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
       const rect = canvas.getBoundingClientRect();
       mouseX = e.clientX - rect.left - w/2;
       mouseY = e.clientY - rect.top - h/2;
    };
    canvas.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.translate(w/2, h/2); // Center coordinate system

      // 1. DRAW MEMBRANE (The Blob)
      ctx.beginPath();
      const radius = 220;
      for (let i = 0; i <= Math.PI * 2; i += 0.1) {
          // Wobbly radius
          const r = radius + Math.sin(i * 5 + time * 0.02) * 5 + Math.cos(i * 3 - time * 0.03) * 5;
          const x = Math.cos(i) * r;
          const y = Math.sin(i) * r;
          ctx.lineTo(x, y);
      }
      ctx.fillStyle = "rgba(16, 185, 129, 0.05)"; // Cytoplasm
      ctx.fill();
      ctx.strokeStyle = activeId === 'membrane' ? "#10b981" : "rgba(16, 185, 129, 0.5)";
      ctx.lineWidth = 3;
      ctx.stroke();

      // 2. DRAW ORGANELLES
      let hovered: string | null = null;

      // Check membrane hover (if mouse is inside radius but far from center)
      const distToCenter = Math.sqrt(mouseX*mouseX + mouseY*mouseY);
      if (distToCenter > 180 && distToCenter < 240) hovered = 'membrane';

      entities.forEach(ent => {
          // Drift Animation
          const floatX = Math.sin(time * 0.02 + ent.x) * 5;
          const floatY = Math.cos(time * 0.02 + ent.y) * 5;
          const finalX = ent.x + floatX;
          const finalY = ent.y + floatY;

          // Mouse Hit Test
          const dx = mouseX - finalX;
          const dy = mouseY - finalY;
          if (Math.sqrt(dx*dx + dy*dy) < ent.r) hovered = ent.id;

          const isActive = activeId === ent.id || hovered === ent.id;

          // DRAW
          ctx.save();
          ctx.translate(finalX, finalY);
          if (ent.angle) ctx.rotate(ent.angle);

          // Shadow/Glow
          ctx.shadowBlur = isActive ? 20 : 0;
          ctx.shadowColor = ent.color;
          ctx.fillStyle = ent.color;
          
          if (ent.id === 'nucleus') {
              // Nucleus (Gradient Sphere)
              const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, ent.r);
              grad.addColorStop(0, "rgba(168, 85, 247, 0.8)");
              grad.addColorStop(1, "rgba(88, 28, 135, 0.8)");
              ctx.fillStyle = grad;
              ctx.beginPath(); ctx.arc(0, 0, ent.r, 0, Math.PI*2); ctx.fill();
              // Nucleolus
              ctx.fillStyle = "rgba(255,255,255,0.3)";
              ctx.beginPath(); ctx.arc(20, -10, 20, 0, Math.PI*2); ctx.fill();
          } 
          else if (ent.id === 'mitochondria') {
              // Mitochondria (Capsule)
              ctx.beginPath();
              ctx.roundRect(-ent.r, -ent.r/2, ent.r*2, ent.r, ent.r/2);
              ctx.fill();
              // Cristae (Squiggles inside)
              ctx.strokeStyle = "rgba(255,255,255,0.5)";
              ctx.lineWidth = 2;
              ctx.beginPath();
              ctx.moveTo(-10, 0); ctx.lineTo(-5, 5); ctx.lineTo(0, -5); ctx.lineTo(5, 5); ctx.lineTo(10, 0);
              ctx.stroke();

              // Emit Particles
              if(Math.random() > 0.9) {
                  particles.push({ x: finalX, y: finalY, vx: (Math.random()-0.5), vy: (Math.random()-0.5), life: 60 });
              }
          }
          else if (ent.id === 'golgi') {
              // Golgi (Stacked Curves)
              ctx.strokeStyle = ent.color;
              ctx.lineWidth = 4;
              ctx.lineCap = "round";
              for(let j=-2; j<=2; j++) {
                  ctx.beginPath();
                  ctx.arc(0, j*10, 25 - Math.abs(j)*5, Math.PI, 0); // Half circles
                  ctx.stroke();
              }
          }
          else {
              // Generic (Lysosome)
              ctx.beginPath(); ctx.arc(0, 0, ent.r, 0, Math.PI*2); ctx.fill();
          }

          ctx.restore();
      });

      // 3. DRAW PARTICLES (ATP)
      ctx.fillStyle = "#fff";
      for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.life--;
          if (p.life <= 0) particles.splice(i, 1);
          
          ctx.globalAlpha = p.life / 60;
          ctx.beginPath(); ctx.arc(p.x, p.y, 1.5, 0, Math.PI*2); ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Report Hover back to React
      if (hovered !== activeId) {
          onHover(hovered);
      }

      ctx.restore();
      time++;
      requestAnimationFrame(render);
    };

    const animId = requestAnimationFrame(render);
    const handleResize = () => { 
        if(canvasRef.current) {
            w = canvasRef.current.width = canvasRef.current.offsetWidth;
            h = canvasRef.current.height = canvasRef.current.offsetHeight;
        }
    };
    window.addEventListener("resize", handleResize);
    return () => { 
        canvas.removeEventListener('mousemove', handleMouseMove);
        cancelAnimationFrame(animId);
    };
  }, [activeId, onHover]);

  return <canvas ref={canvasRef} className="w-full h-full cursor-crosshair" />;
}