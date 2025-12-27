"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Activity, RefreshCw, GitFork } from "lucide-react";

export default function PendulumWidget() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [divergence, setDivergence] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    // Constants
    const g = 0.4;
    const m1 = 10;
    const m2 = 10;
    const l1 = 40;
    const l2 = 40;
    const origin = { x: 125, y: 50 };

    // State for Pendulum A (Blue)
    let a1_a = Math.PI / 2;
    let a2_a = Math.PI / 2;
    let a1_v_a = 0;
    let a2_v_a = 0;

    // State for Pendulum B (Red) - Tiny initial difference
    let a1_b = Math.PI / 2 + 0.001;
    let a2_b = Math.PI / 2;
    let a1_v_b = 0;
    let a2_v_b = 0;
    
    // Trails
    let trailA: {x:number, y:number}[] = [];
    let trailB: {x:number, y:number}[] = [];

    const updatePhysics = (a1: number, a2: number, a1_v: number, a2_v: number) => {
         // Simplified Double Pendulum Equations (approximate)
         const num1 = -g * (2 * m1 + m2) * Math.sin(a1);
         const num2 = -m2 * g * Math.sin(a1 - 2 * a2);
         const num3 = -2 * Math.sin(a1 - a2) * m2;
         const num4 = a2_v * a2_v * l2 + a1_v * a1_v * l1 * Math.cos(a1 - a2);
         const den = l1 * (2 * m1 + m2 - m2 * Math.cos(2 * a1 - 2 * a2));
         
         const a1_acc = (num1 + num2 + num3 * num4) / den;

         const num5 = 2 * Math.sin(a1 - a2);
         const num6 = (a1_v * a1_v * l1 * (m1 + m2));
         const num7 = g * (m1 + m2) * Math.cos(a1);
         const num8 = a2_v * a2_v * l2 * m2 * Math.cos(a1 - a2);
         const den2 = l2 * (2 * m1 + m2 - m2 * Math.cos(2 * a1 - 2 * a2));
         
         const a2_acc = (num5 * (num6 + num7 + num8)) / den2;

         return { a1_acc, a2_acc };
    };

    const animate = () => {
        ctx.clearRect(0, 0, 250, 250);

        // Update A
        const accA = updatePhysics(a1_a, a2_a, a1_v_a, a2_v_a);
        a1_v_a += accA.a1_acc;
        a2_v_a += accA.a2_acc;
        a1_a += a1_v_a;
        a2_a += a2_v_a;
        // Dampening to stop explosion
        a1_v_a *= 0.999;
        a2_v_a *= 0.999;

        // Update B
        const accB = updatePhysics(a1_b, a2_b, a1_v_b, a2_v_b);
        a1_v_b += accB.a1_acc;
        a2_v_b += accB.a2_acc;
        a1_b += a1_v_b;
        a2_b += a2_v_b;
        a1_v_b *= 0.999;
        a2_v_b *= 0.999;

        // Calculate Positions A
        const x1_a = origin.x + l1 * Math.sin(a1_a);
        const y1_a = origin.y + l1 * Math.cos(a1_a);
        const x2_a = x1_a + l2 * Math.sin(a2_a);
        const y2_a = y1_a + l2 * Math.cos(a2_a);

        // Calculate Positions B
        const x1_b = origin.x + l1 * Math.sin(a1_b);
        const y1_b = origin.y + l1 * Math.cos(a1_b);
        const x2_b = x1_b + l2 * Math.sin(a2_b);
        const y2_b = y1_b + l2 * Math.cos(a2_b);
        
        // Update React State occasionally
        if (Math.random() > 0.9) {
            const dist = Math.hypot(x2_a - x2_b, y2_a - y2_b);
            setDivergence(Math.min(100, dist));
        }

        // Draw Trails
        trailA.push({x: x2_a, y: y2_a});
        trailB.push({x: x2_b, y: y2_b});
        if(trailA.length > 50) trailA.shift();
        if(trailB.length > 50) trailB.shift();

        // Render A (Blue)
        ctx.strokeStyle = "#3b82f6";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(origin.x, origin.y);
        ctx.lineTo(x1_a, y1_a);
        ctx.lineTo(x2_a, y2_a);
        ctx.stroke();
        
        ctx.beginPath();
        trailA.forEach((p, i) => {
            if(i===0) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
        });
        ctx.globalAlpha = 0.5;
        ctx.stroke();
        ctx.globalAlpha = 1;

        // Render B (Red)
        ctx.strokeStyle = "#ef4444";
        ctx.beginPath();
        ctx.moveTo(origin.x, origin.y);
        ctx.lineTo(x1_b, y1_b);
        ctx.lineTo(x2_b, y2_b);
        ctx.stroke();

        ctx.beginPath();
        trailB.forEach((p, i) => {
            if(i===0) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
        });
        ctx.globalAlpha = 0.5;
        ctx.stroke();
        ctx.globalAlpha = 1;

        animationId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="glass overflow-hidden rounded-xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl">
      <div className="border-b border-white/5 px-5 py-4 flex justify-between items-center">
        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-300">
          <GitFork size={14} className="text-violet-400" /> Butterfly Effect
        </h3>
        <Activity size={14} className="text-neutral-600" />
      </div>

      <div className="relative h-[250px] w-full bg-neutral-950">
         <canvas ref={canvasRef} width={250} height={250} className="w-full h-full" />
         
         {/* HUD */}
         <div className="absolute bottom-4 left-4 right-4 flex justify-between text-[10px] font-mono text-neutral-500 bg-black/50 p-2 rounded border border-white/5">
             <span>Initial Δ: 0.001</span>
             <span className={divergence > 50 ? "text-red-400 font-bold" : "text-green-400"}>
                 Curr Δ: {divergence.toFixed(1)}
             </span>
         </div>
      </div>
      
      <div className="p-4 text-[10px] text-neutral-400 border-t border-white/5 leading-relaxed">
         Two pendulums start almost identically. Watch how tiny differences compound into total chaos over time.
      </div>
    </div>
  );
}