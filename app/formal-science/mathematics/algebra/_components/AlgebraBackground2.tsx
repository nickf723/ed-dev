"use client";
import { useEffect, useRef } from "react";

export default function AlgebraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // --- CONFIG ---
    const gridSpacing = 40;
    const particleCount = 600;
    
    // --- STATE ---
    const particles: { 
        x: number; y: number; z: number; 
        baseX: number; baseY: number; 
        symbol: string; 
        opacity: number 
    }[] = [];

    const symbols = ["x", "y", "z", "α", "β", "θ", "∑", "ƒ", "=", "∅"];

    // Initialize Particles in a Grid (Basis Vectors)
    for (let i = 0; i < particleCount; i++) {
        // Random 3D cloud
        const bx = (Math.random() - 0.5) * w * 1.5;
        const by = (Math.random() - 0.5) * h * 1.5;
        const bz = (Math.random() - 0.5) * 1000;
        
        particles.push({
            x: bx, y: by, z: bz,
            baseX: bx, baseY: by,
            symbol: symbols[Math.floor(Math.random() * symbols.length)],
            opacity: Math.random() * 0.5 + 0.1
        });
    }

    let time = 0;

    const render = () => {
      time += 0.005;

      // Deep Indigo/Black Void
      ctx.fillStyle = "#0c0a1f"; 
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      // --- MATRIX TRANSFORMATIONS ---
      // We create a transformation matrix that evolves over time
      // M = [ cos(t)  -sin(t) ]
      //     [ sin(t)   cos(t) ]
      // Plus some shearing/scaling functions
      
      const scale = 1 + Math.sin(time * 0.5) * 0.2;
      const shearX = Math.cos(time * 0.3) * 0.5;
      
      ctx.font = "12px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      particles.forEach(p => {
         // 1. Apply Transformation Matrix to Base Coordinates
         // x' = x * scale + y * shear
         // y' = y * scale
         // z' = z (rotate around Z axis logic)
         
         const rot = time * 0.2;
         const sin = Math.sin(rot);
         const cos = Math.cos(rot);

         // Rotate/Transform
         let tx = p.baseX * cos - p.baseY * sin;
         let ty = p.baseX * sin + p.baseY * cos;
         
         // Shear distortion (The "Warp")
         tx += ty * shearX;
         
         // 3D Perspective Projection
         const fov = 800;
         const z = p.z + 1000 + Math.sin(time + p.baseX*0.01) * 200; // Z-oscillation
         const perspective = fov / z;
         
         const px = cx + tx * perspective * scale;
         const py = cy + ty * perspective * scale;

         const alpha = p.opacity * (z > 500 ? 1 : 0.2); // Fade distant points
         
         ctx.globalAlpha = alpha;
         ctx.fillStyle = "#818cf8"; // Indigo-400

         // Render Symbol or Dot based on distance
         if (perspective > 0.8) {
             ctx.fillText(p.symbol, px, py);
         } else {
             ctx.beginPath();
             ctx.arc(px, py, 1, 0, Math.PI*2);
             ctx.fill();
         }
      });
      
      // Draw Grid Lines (Basis visualizer)
      // We trace a few sine waves through the noise to show structure
      ctx.strokeStyle = "rgba(99, 102, 241, 0.1)"; // Indigo-500 low opacity
      ctx.beginPath();
      for(let i = -10; i < 10; i++) {
          const yBase = i * 100;
          // Draw horizontal-ish flow lines
          for(let x = -w/2; x < w/2; x+=50) {
              const rot = time * 0.2;
              const sin = Math.sin(rot); const cos = Math.cos(rot);
              
              let tx = x * cos - yBase * sin;
              let ty = x * sin + yBase * cos;
              tx += ty * shearX;
              
              const z = 1000;
              const p = 800 / z;
              
              if (x === -w/2) ctx.moveTo(cx + tx*p, cy + ty*p);
              else ctx.lineTo(cx + tx*p, cy + ty*p);
          }
      }
      ctx.stroke();

      requestAnimationFrame(render);
    };

    render();
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}