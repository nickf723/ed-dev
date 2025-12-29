"use client";
import { useEffect, useRef } from "react";

// Helper hook for mouse interaction
const useInteractiveCanvas = (
  render: (ctx: CanvasRenderingContext2D, w: number, h: number, t: number, mouse: {x: number, y: number}) => void
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    let t = 0;
    let mouse = { x: w / 2, y: h / 2 };

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const animate = () => {
      // Clear with slight fade for trails (optional, depending on sim)
      ctx.clearRect(0, 0, w, h);
      render(ctx, w, h, t, mouse);
      t += 1;
      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [render]);

  return canvasRef;
};

// --- 1. ASTRONOMY: Parallax Solar System ---
export function AstronomySimulation() {
  const canvasRef = useInteractiveCanvas((ctx, w, h, t, mouse) => {
      // Background Space
      ctx.fillStyle = "rgba(10, 10, 15, 1)"; 
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      
      // Calculate Parallax Offset
      const dx = (mouse.x - cx) * 0.05;
      const dy = (mouse.y - cy) * 0.05;

      // Stars (Background Layer)
      for(let i=0; i<50; i++) {
          const x = (Math.sin(i * 132.1) * w + t * 0.1) % w;
          const y = (Math.cos(i * 453.2) * h) % h;
          ctx.beginPath();
          ctx.arc(Math.abs(x), Math.abs(y), Math.random() * 2, 0, Math.PI*2);
          ctx.fillStyle = "rgba(255,255,255,0.3)";
          ctx.fill();
      }

      // Sun (Center, slight movement)
      ctx.beginPath();
      ctx.arc(cx - dx * 0.2, cy - dy * 0.2, 25, 0, Math.PI * 2);
      ctx.fillStyle = "#f59e0b";
      ctx.shadowBlur = 50;
      ctx.shadowColor = "#f59e0b";
      ctx.fill();
      ctx.shadowBlur = 0;

      // Planets
      const planets = [
        { r: 120, speed: 0.02, size: 4, color: "#94a3b8" },
        { r: 200, speed: 0.015, size: 8, color: "#38bdf8" },
        { r: 320, speed: 0.01, size: 6, color: "#f87171" },
        { r: 550, speed: 0.005, size: 14, color: "#eab308" },
      ];

      planets.forEach((p, i) => {
        const angle = t * p.speed + (i * 10);
        // Apply parallax to orbit center
        const ox = cx - dx * (0.5 + i * 0.1);
        const oy = cy - dy * (0.5 + i * 0.1);
        
        const x = ox + Math.cos(angle) * p.r;
        const y = oy + Math.sin(angle) * (p.r * 0.4);

        // Orbit Path
        ctx.beginPath();
        ctx.ellipse(ox, oy, p.r, p.r * 0.4, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
        ctx.stroke();

        // Planet
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });
  });

  return <canvas ref={canvasRef} className="absolute inset-0 block" />;
}

// --- 2. EARTH SCIENCE: Reactive Terrain ---
export function EarthSimulation() {
  const canvasRef = useInteractiveCanvas((ctx, w, h, t, mouse) => {
      // Wind/Offset based on time and mouse x
      const offset = t * 0.5 + mouse.x * 0.1;
      
      // Draw multiple layers
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        const yBase = h * 0.55 + (i * 60);
        
        ctx.moveTo(0, h);
        for (let x = 0; x <= w; x += 15) {
          // Complex noise function for terrain
          const noise = Math.sin((x + offset * (1 - i*0.1)) * 0.003) * 60 + 
                        Math.sin((x + offset * 0.5) * 0.01) * 20 +
                        Math.cos(x * 0.05) * 5;
          
          // Mouse Y influences peak height locally
          const dist = Math.abs(x - mouse.x);
          const influence = Math.max(0, 1 - dist / 300) * (mouse.y - h/2) * 0.2;
          
          ctx.lineTo(x, yBase - noise + influence);
        }
        
        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.fillStyle = `rgba(16, 185, 129, ${0.05 + i * 0.03})`;
        ctx.fill();
        ctx.strokeStyle = `rgba(16, 185, 129, ${0.3 + i * 0.1})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
  });

  return <canvas ref={canvasRef} className="absolute inset-0 block" />;
}

// --- 3. BIOLOGY: Cells Avoiding Cursor ---
export function BiologySimulation() {
  // Store cell state in a closure variable (persists between renders)
  const cellsRef = useRef<any[]>([]);
  
  const canvasRef = useInteractiveCanvas((ctx, w, h, t, mouse) => {
    // Initialize if empty
    if (cellsRef.current.length === 0) {
       for(let i=0; i<20; i++) {
         cellsRef.current.push({
           x: Math.random() * w,
           y: Math.random() * h,
           vx: (Math.random() - 0.5) * 0.5,
           vy: (Math.random() - 0.5) * 0.5,
           r: 15 + Math.random() * 25,
           pulse: Math.random() * Math.PI
         });
       }
    }

    const cells = cellsRef.current;

    cells.forEach(c => {
      // Basic movement
      c.x += c.vx;
      c.y += c.vy;

      // Mouse Avoidance
      const dx = c.x - mouse.x;
      const dy = c.y - mouse.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if(dist < 200) {
          const force = (200 - dist) / 200;
          c.x += (dx / dist) * force * 2;
          c.y += (dy / dist) * force * 2;
      }

      // Wrap
      if(c.x < -50) c.x = w + 50;
      if(c.x > w + 50) c.x = -50;
      if(c.y < -50) c.y = h + 50;
      if(c.y > h + 50) c.y = -50;

      // Draw
      const breathing = Math.sin(t * 0.05 + c.pulse) * 3;
      
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.r + breathing, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(236, 72, 153, 0.1)"; 
      ctx.fill();
      ctx.strokeStyle = "rgba(236, 72, 153, 0.3)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Nucleus
      ctx.beginPath();
      ctx.arc(c.x, c.y, (c.r * 0.3), 0, Math.PI * 2);
      ctx.fillStyle = "rgba(236, 72, 153, 0.4)";
      ctx.fill();
    });
  });

  return <canvas ref={canvasRef} className="absolute inset-0 block" />;
}

// --- 4. CHEMISTRY: 3D-ish Lattice Rotation ---
export function ChemistrySimulation() {
  const canvasRef = useInteractiveCanvas((ctx, w, h, t, mouse) => {
      const centerX = w/2;
      const centerY = h/2;

      // Rotation based on mouse
      const rotX = (mouse.y - centerY) * 0.002;
      const rotY = (mouse.x - centerX) * 0.002;

      ctx.strokeStyle = "rgba(56, 189, 248, 0.2)";
      ctx.lineWidth = 1;

      const spacing = 100;
      const rows = 5;
      const cols = 8;

      for(let r=-2; r<rows-2; r++) {
        for(let c=-3; c<cols-3; c++) {
             // 3D Point
             let x = c * spacing;
             let y = r * spacing;
             let z = 0;

             // Apply Rotation matrix (simplified)
             // Rotate around Y
             let x1 = x * Math.cos(rotY) - z * Math.sin(rotY);
             let z1 = x * Math.sin(rotY) + z * Math.cos(rotY);
             // Rotate around X
             let y1 = y * Math.cos(rotX) - z1 * Math.sin(rotX);
             
             // Project to 2D
             const px = centerX + x1 + Math.sin(t * 0.01 + r)*20;
             const py = centerY + y1 + Math.cos(t * 0.01 + c)*20;

             // Atom
             ctx.beginPath();
             ctx.arc(px, py, 4, 0, Math.PI*2);
             ctx.fillStyle = "rgba(56, 189, 248, 0.6)"; // Sky blue
             ctx.fill();
             
             // Bond Lines (Simple Grid)
             // (Omitted complex connecting logic for performance, focusing on particles)
             ctx.beginPath();
             ctx.moveTo(px, py);
             ctx.lineTo(px + spacing * Math.cos(rotY), py + spacing * Math.cos(rotX));
             ctx.stroke();
        }
      }
  });

  return <canvas ref={canvasRef} className="absolute inset-0 block" />;
}

// --- 5. PHYSICS: Quantum Field Ripples ---
export function PhysicsSimulation() {
  const canvasRef = useInteractiveCanvas((ctx, w, h, t, mouse) => {
      ctx.strokeStyle = "#818cf8"; // Indigo
      ctx.lineWidth = 1.5;
      
      // Draw 20 horizontal lines
      for (let i = 0; i < 20; i++) {
        ctx.beginPath();
        const yBase = (h / 20) * i;
        
        for (let x = 0; x < w; x+=10) {
          // Base wave
          let dy = Math.sin(x * 0.02 + t * 0.05 + i) * 10;
          
          // Mouse Interaction: Gaussian Ripple
          const dist = Math.abs(x - mouse.x);
          const yDist = Math.abs(yBase - mouse.y);
          if (dist < 200 && yDist < 100) {
             const force = Math.cos(dist * 0.05 - t * 0.2) * (200 - dist) * 0.2;
             dy += force;
          }

          ctx.lineTo(x, yBase + dy);
        }
        ctx.globalAlpha = 0.3;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
  });

  return <canvas ref={canvasRef} className="absolute inset-0 block" />;
}