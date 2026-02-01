"use client";
import React, { useEffect, useRef } from "react";

interface Props {
  mode: string;
}

// 1. CONFIGURATION
const THEMES: Record<string, any> = {
  "astronomy": {
    color: "255, 255, 255", 
    shape: "circle",      // <--- Standard Stars
    speed: 0.5,
    connections: false,
    sizeBase: 1.5,
    flow: "random",
    density: 150
  },
  "biology": {
    color: "16, 185, 129", 
    shape: "ring",        // <--- Cellular Membranes
    speed: 0.2,
    connections: false,
    sizeBase: 8,          // Bigger cells
    flow: "wobble",
    density: 40
  },
  "physics": {
    color: "59, 130, 246",
    shape: "square",      // <--- Digital/Quantum bits
    speed: 0.6,
    connections: true,    // The Network
    connectionDist: 100,
    sizeBase: 3,
    flow: "random",
    density: 70
  },
  "chemistry": {
    color: "6, 182, 212", 
    shape: "hexagon",     // <--- Molecular structures
    speed: 1.2,
    connections: false,
    sizeBase: 6,
    flow: "up",           // Bubbling reaction
    density: 60
  },
  "earth-science": {
    color: "249, 115, 22", 
    shape: "triangle",    // <--- Terrain/Geology
    speed: 0.3,
    connections: false,
    sizeBase: 4,
    flow: "down",         // Erosion/Gravity
    density: 80
  }
};

export function NaturalScienceBackground({ mode }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | null>(null);
  const particles = useRef<any[]>([]);
  
  const activeTheme = THEMES[mode] || THEMES["astronomy"];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // RESIZE HANDLER
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };
    window.addEventListener("resize", resize);
    resize(); 

    // INITIALIZER
    function initParticles() {
      particles.current = [];
      const count = activeTheme.density;
      for (let i = 0; i < count; i++) {
        particles.current.push({
          x: Math.random() * canvas!.width,
          y: Math.random() * canvas!.height,
          vx: (Math.random() - 0.5) * activeTheme.speed,
          vy: (Math.random() - 0.5) * activeTheme.speed,
          size: Math.random() * activeTheme.sizeBase + 2,
          rotation: Math.random() * Math.PI * 2,
          spin: (Math.random() - 0.5) * 0.02, // Some shapes spin!
          phase: Math.random() * Math.PI * 2
        });
      }
    }

    // DRAWING HELPER: POLYGONS (Hexagons, Triangles)
    function drawPolygon(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, sides: number, rotation: number) {
      ctx.beginPath();
      for (let i = 0; i < sides; i++) {
        const angle = rotation + (i * 2 * Math.PI) / sides;
        const px = x + radius * Math.cos(angle);
        const py = y + radius * Math.sin(angle);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
    }

    // ANIMATION LOOP
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.current.forEach((p, i) => {
        // 1. UPDATE PHYSICS
        if (activeTheme.flow === "up") {
          p.y -= Math.abs(p.vy) + 0.5;
          p.x += Math.sin(p.phase + Date.now() / 800) * 0.5;
        } else if (activeTheme.flow === "down") {
          p.y += Math.abs(p.vy) + 0.2;
          p.x += p.vx * 0.2;
        } else if (activeTheme.flow === "wobble") {
          p.x += Math.sin(Date.now() / 1500 + p.phase) * 0.3;
          p.y += Math.cos(Date.now() / 1500 + p.phase) * 0.3;
        } else {
          p.x += p.vx;
          p.y += p.vy;
        }
        
        // Spin the shape
        p.rotation += p.spin;

        // Wrap Logic
        if (p.x < -20) p.x = canvas.width + 20;
        if (p.x > canvas.width + 20) p.x = -20;
        if (p.y < -20) p.y = canvas.height + 20;
        if (p.y > canvas.height + 20) p.y = -20;

        // 2. RENDER SHAPES
        ctx.fillStyle = `rgba(${activeTheme.color}, ${activeTheme.flow === 'wobble' ? 0.3 : 0.6})`;
        ctx.strokeStyle = `rgba(${activeTheme.color}, 0.8)`;
        ctx.lineWidth = 1.5;

        if (activeTheme.shape === "circle") {
           ctx.beginPath();
           ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
           ctx.fill();
        } 
        else if (activeTheme.shape === "ring") {
           // Biology: Hollow rings
           ctx.beginPath();
           ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
           ctx.stroke();
           // Optional Nucleus
           ctx.beginPath();
           ctx.arc(p.x, p.y, p.size * 0.2, 0, Math.PI * 2);
           ctx.fill();
        }
        else if (activeTheme.shape === "square") {
           ctx.save();
           ctx.translate(p.x, p.y);
           ctx.rotate(p.rotation);
           ctx.fillRect(-p.size, -p.size, p.size * 2, p.size * 2);
           ctx.restore();
        }
        else if (activeTheme.shape === "hexagon") {
           // Chemistry: Hexagons
           drawPolygon(ctx, p.x, p.y, p.size * 1.5, 6, p.rotation);
           ctx.stroke(); // Hollow Benzene rings look cooler
        }
        else if (activeTheme.shape === "triangle") {
           // Earth: Solid Triangles
           drawPolygon(ctx, p.x, p.y, p.size * 1.5, 3, p.rotation);
           ctx.fill();
        }

        // 3. DRAW CONNECTIONS (Physics Only)
        if (activeTheme.connections) {
          for (let j = i + 1; j < particles.current.length; j++) {
            const p2 = particles.current[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < activeTheme.connectionDist) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(${activeTheme.color}, ${0.5 * (1 - dist / activeTheme.connectionDist)})`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [mode]); 

  return (
    <div className="fixed inset-0 -z-50 pointer-events-none transition-colors duration-1000">
      <div 
        className="absolute inset-0 transition-colors duration-1000"
        style={{
             background: `radial-gradient(circle at center, rgba(${activeTheme.color}, 0.1) 0%, rgba(0,0,0,1) 90%)`
        }} 
      />
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 opacity-80 mix-blend-screen"
      />
    </div>
  );
}