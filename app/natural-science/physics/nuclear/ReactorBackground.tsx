"use client";
import { useEffect, useRef } from "react";

export default function ReactorBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // Entities
    type Isotope = { x: number; y: number; r: number; unstable: boolean; id: number };
    type Neutron = { x: number; y: number; vx: number; vy: number; life: number };
    
    let isotopes: Isotope[] = [];
    let neutrons: Neutron[] = [];
    let particles: {x: number, y: number, vx: number, vy: number, alpha: number, color: string}[] = [];
    
    // Initialize Grid of U-235
    const initReactor = () => {
        isotopes = [];
        const spacing = 100;
        const rows = Math.ceil(h/spacing);
        const cols = Math.ceil(w/spacing);
        
        for(let i=0; i<cols; i++) {
            for(let j=0; j<rows; j++) {
                // Add some jitter
                if(Math.random() > 0.3) { // 70% density
                    isotopes.push({
                        x: i * spacing + spacing/2 + (Math.random()-0.5)*40,
                        y: j * spacing + spacing/2 + (Math.random()-0.5)*40,
                        r: 15,
                        unstable: true,
                        id: Math.random()
                    });
                }
            }
        }
    };
    initReactor();

    const animate = () => {
      // Dark Reactor Core
      ctx.fillStyle = "#1a1a05"; // Very dark yellow/black
      ctx.fillRect(0, 0, w, h);

      // 1. Update & Draw Isotopes
      isotopes.forEach(iso => {
          ctx.beginPath();
          ctx.arc(iso.x, iso.y, iso.r, 0, Math.PI*2);
          // Vibrating effect
          const jitter = Math.random() * 1;
          
          const g = ctx.createRadialGradient(iso.x, iso.y, 0, iso.x, iso.y, iso.r);
          g.addColorStop(0, "#fef08a"); // Yellow-200
          g.addColorStop(1, "#854d0e"); // Yellow-800
          
          ctx.fillStyle = g;
          ctx.fill();
          
          // Nucleus detail
          ctx.beginPath();
          ctx.arc(iso.x + jitter, iso.y + jitter, iso.r*0.4, 0, Math.PI*2);
          ctx.fillStyle = "rgba(0,0,0,0.3)";
          ctx.fill();
      });

      // 2. Update & Draw Neutrons
      for(let i=neutrons.length-1; i>=0; i--) {
          const n = neutrons[i];
          n.x += n.vx;
          n.y += n.vy;
          n.life--;
          
          // Draw Neutron (Fast white streak)
          ctx.beginPath();
          ctx.arc(n.x, n.y, 3, 0, Math.PI*2);
          ctx.fillStyle = "#fff";
          ctx.shadowBlur = 10;
          ctx.shadowColor = "#fff";
          ctx.fill();
          ctx.shadowBlur = 0;
          
          // Collision Detection
          for(let j=isotopes.length-1; j>=0; j--) {
              const iso = isotopes[j];
              const dx = n.x - iso.x;
              const dy = n.y - iso.y;
              const dist = Math.sqrt(dx*dx + dy*dy);
              
              if(dist < iso.r + 3) {
                  // BOOM: Fission Event
                  
                  // 1. Remove Neutron
                  neutrons.splice(i, 1);
                  
                  // 2. Remove Isotope
                  isotopes.splice(j, 1);
                  
                  // 3. Spawn Explosion Particles
                  for(let k=0; k<20; k++) {
                      particles.push({
                          x: iso.x, y: iso.y,
                          vx: (Math.random()-0.5)*10,
                          vy: (Math.random()-0.5)*10,
                          alpha: 1,
                          color: Math.random() > 0.5 ? "#facc15" : "#f97316" // Yellow/Orange
                      });
                  }
                  
                  // 4. Spawn New Neutrons (Chain Reaction)
                  for(let k=0; k<3; k++) {
                      const angle = Math.random() * Math.PI * 2;
                      const speed = 8 + Math.random() * 4;
                      neutrons.push({
                          x: iso.x, y: iso.y,
                          vx: Math.cos(angle) * speed,
                          vy: Math.sin(angle) * speed,
                          life: 200
                      });
                  }
                  
                  break; // Neutron handled
              }
          }
          
          // Remove if dead or off screen
          if(n.life <= 0 || n.x < 0 || n.x > w || n.y < 0 || n.y > h) {
             if(neutrons[i]) neutrons.splice(i, 1);
          }
      }

      // 3. Update & Draw Particles (Explosions)
      for(let i=particles.length-1; i>=0; i--) {
          const p = particles[i];
          p.x += p.vx; p.y += p.vy;
          p.alpha -= 0.05;
          
          if(p.alpha <= 0) {
              particles.splice(i, 1);
              continue;
          }
          
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.random()*5, 0, Math.PI*2);
          ctx.fill();
      }
      ctx.globalAlpha = 1;

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    const handleClick = (e: MouseEvent) => {
        // Fire a neutron from click
        neutrons.push({
            x: e.clientX, y: e.clientY,
            vx: (Math.random()-0.5) * 10,
            vy: (Math.random()-0.5) * 10,
            life: 200
        });
    };
    
    const handleResize = () => { 
        w = canvas.width = window.innerWidth; 
        h = canvas.height = window.innerHeight;
        initReactor();
    };

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