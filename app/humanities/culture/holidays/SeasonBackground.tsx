"use client";
import { useEffect, useRef } from "react";
import { Season } from "./holidays-data";

export default function SeasonBackground({ season }: { season: Season }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let time = 0;

    // Particle Config based on Season
    const getParticles = () => {
        const count = 50;
        const arr = [];
        for(let i=0; i<count; i++) {
            arr.push({
                x: Math.random() * w,
                y: Math.random() * h,
                size: Math.random() * 3 + 1,
                speedY: Math.random() * 1 + 0.5,
                speedX: (Math.random() - 0.5) * 2,
                opacity: Math.random() * 0.5 + 0.1
            });
        }
        return arr;
    };
    
    let particles = getParticles();

    const render = () => {
      ctx.clearRect(0,0,w,h);
      
      // Determine Color
      let color = "255, 255, 255"; // Winter (Snow)
      if (season === "SPRING") color = "249, 168, 212"; // Pink (Petals)
      if (season === "SUMMER") color = "250, 204, 21"; // Yellow (Fireflies/Pollen)
      if (season === "AUTUMN") color = "249, 115, 22"; // Orange (Leaves)
      if (season === "HALLOWEEN") color = "255, 69, 0"; // Orange-Red (Spooky)

      particles.forEach(p => {
          ctx.fillStyle = `rgba(${color}, ${p.opacity})`;
          
          // Movement Logic
          if (season === "WINTER") { p.y += p.speedY; p.x += Math.sin(time * 0.01 + p.y * 0.01); } // Falling Snow
          if (season === "SPRING") { p.y += p.speedY * 0.5; p.x += p.speedX; } // Floating Petals
          if (season === "SUMMER") { p.y -= p.speedY * 0.2; p.x += Math.sin(time * 0.02) * 0.5; } // Rising Fireflies
          if (season === "AUTUMN") { p.y += p.speedY; p.x += Math.sin(time * 0.01) * 2; } // Falling Leaves
          if (season === "HALLOWEEN") { p.y += p.speedY; p.x += Math.sin(time * 0.01) * 2; } // Falling Spooky Particles

          // Wrap
          if(p.y > h) p.y = -10;
          if(p.y < -10) p.y = h;
          if(p.x > w) p.x = 0;
          if(p.x < 0) p.x = w;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
          ctx.fill();
      });

      time++;
      requestAnimationFrame(render);
    };

    const animId = requestAnimationFrame(render);
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    
    // Reset particles on season change to create a "gust" effect
    particles = getParticles();
    
    return () => cancelAnimationFrame(animId);
  }, [season]);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}