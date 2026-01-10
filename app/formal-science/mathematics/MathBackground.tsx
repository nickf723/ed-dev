"use client";
import { useEffect, useRef } from "react";

export default function MathBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // --- LORENZ ATTRACTOR CONFIG ---
    // The classic "Chaos" constants
    const sigma = 10;
    const rho = 28;
    const beta = 8 / 3;

    // Simulation State
    // We simulate multiple independent points to create "flow"
    const numTrails = 60;
    const trails: { x: number; y: number; z: number; color: string; history: {x:number, y:number}[] }[] = [];

    // Initialize random start points near the center
    for (let i = 0; i < numTrails; i++) {
        trails.push({
            x: 0.1, 
            y: 0, 
            z: 0,
            // Math gradient: Cyan -> Indigo -> Purple
            color: `hsl(${200 + Math.random() * 60}, 70%, 50%)`,
            history: []
        });
    }

    let dt = 0.008; // Time step
    let scale = 15; // Zoom level

    const render = () => {
      // Fade effect for trails (creates the "drawing" look)
      ctx.fillStyle = "rgba(10, 10, 15, 0.1)"; 
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      ctx.lineWidth = 1.5;

      trails.forEach((p, i) => {
        // --- DIFFERENTIAL EQUATIONS ---
        // dx/dt = sigma * (y - x)
        // dy/dt = x * (rho - z) - y
        // dz/dt = x * y - beta * z
        
        const dx = sigma * (p.y - p.x) * dt;
        const dy = (p.x * (rho - p.z) - p.y) * dt;
        const dz = (p.x * p.y - beta * p.z) * dt;

        p.x += dx;
        p.y += dy;
        p.z += dz;

        // Project 3D to 2D
        // Simple rotation to make it look cool
        const angle = Date.now() * 0.0001; 
        const rx = p.x * Math.cos(angle) - p.y * Math.sin(angle);
        const ry = p.x * Math.sin(angle) + p.y * Math.cos(angle);

        const screenX = cx + rx * scale;
        const screenY = cy + (p.z - 25) * scale; // Offset Z to center it

        p.history.push({ x: screenX, y: screenY });
        if (p.history.length > 20) p.history.shift(); // Keep tails short

        // Draw
        ctx.strokeStyle = p.color;
        ctx.beginPath();
        if (p.history.length > 1) {
            ctx.moveTo(p.history[0].x, p.history[0].y);
            for (let j = 1; j < p.history.length; j++) {
                ctx.lineTo(p.history[j].x, p.history[j].y);
            }
        }
        ctx.stroke();
      });

      requestAnimationFrame(render);
    };

    const animId = requestAnimationFrame(render);
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-40 pointer-events-none" />;
}