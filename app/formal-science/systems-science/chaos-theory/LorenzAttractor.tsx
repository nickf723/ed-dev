"use client";
import React, { useEffect, useRef, useState } from "react";
import { RefreshCw, Play, Pause } from "lucide-react";

// LORENZ CONSTANTS (The "Weather" Variables)
const SIGMA = 10;
const RHO = 28;
const BETA = 8/3;

export default function LorenzAttractor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [running, setRunning] = useState(true);

  // We track two independent trajectories to show divergence
  // Point A (White)
  const pointA = useRef({ x: 0.1, y: 0, z: 0, points: [] as {x:number, y:number, z:number}[] });
  // Point B (Red - slightly different start)
  const pointB = useRef({ x: 0.10001, y: 0, z: 0, points: [] as {x:number, y:number, z:number}[] });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);
    let animId: number;

    const dt = 0.01; // Time step
    
    // Reset canvas style
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, w, h);

    const update = (p: {x:number, y:number, z:number, points: any[]}) => {
       const dx = (SIGMA * (p.y - p.x)) * dt;
       const dy = (p.x * (RHO - p.z) - p.y) * dt;
       const dz = (p.x * p.y - BETA * p.z) * dt;
       
       p.x += dx;
       p.y += dy;
       p.z += dz;
       
       // Keep history limited for performance/visual clarity
       p.points.push({x: p.x, y: p.y, z: p.z});
       if(p.points.length > 1500) p.points.shift();
    };

    const draw = (p: {points: any[]}, color: string) => {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        
        // Simple projection (perspective-ish)
        const scale = 12;
        const cx = w / 2;
        const cy = h / 2 + 100; // Shift down slightly

        for(let i=0; i<p.points.length - 1; i++) {
            const curr = p.points[i];
            const next = p.points[i+1];
            ctx.moveTo(cx + curr.x * scale, cy - curr.z * scale); // Projecting X/Z plane mostly
            ctx.lineTo(cx + next.x * scale, cy - next.z * scale);
        }
        ctx.stroke();
    };

    const render = () => {
        if(!running) return;

        // Fade effect (Trails)
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, w, h);

        update(pointA.current);
        update(pointB.current);

        draw(pointA.current, "#ef4444"); // Red (Chaos)
        draw(pointB.current, "#ffffff"); // White (Control)

        animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    
    const handleResize = () => {
        w = canvas.width = canvas.offsetWidth;
        h = canvas.height = canvas.offsetHeight;
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener("resize", handleResize);
    };
  }, [running]);

  const reset = () => {
      pointA.current = { x: 0.1, y: 0, z: 0, points: [] };
      pointB.current = { x: 0.1001, y: 0, z: 0, points: [] };
      const canvas = canvasRef.current;
      if(canvas) {
          const ctx = canvas.getContext("2d");
          if(ctx) ctx.fillRect(0,0, canvas.width, canvas.height);
      }
  };

  return (
    <div className="relative w-full h-[500px] bg-black border border-red-900/30 rounded-xl overflow-hidden shadow-2xl group">
        <canvas ref={canvasRef} className="w-full h-full" />
        
        {/* Controls Overlay */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={() => setRunning(!running)} className="p-2 bg-red-950/50 text-red-400 border border-red-900 rounded hover:bg-red-900">
                {running ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <button onClick={reset} className="p-2 bg-red-950/50 text-red-400 border border-red-900 rounded hover:bg-red-900">
                <RefreshCw size={16} />
            </button>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 text-xs font-mono bg-black/50 p-3 rounded backdrop-blur-sm border border-white/5">
            <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-white" />
                <span className="text-stone-400">Trajectory A (Start: 0.1)</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <span className="text-red-400">Trajectory B (Start: 0.1001)</span>
            </div>
            <div className="mt-2 text-[9px] text-stone-600 uppercase">
                Notice the divergence over time
            </div>
        </div>
    </div>
  );
}