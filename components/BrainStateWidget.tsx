"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Brain, Network, Shuffle, Activity } from "lucide-react";

export default function BrainStateWidget() {
  const [entropy, setEntropy] = useState(0); // 0 = Rigid, 1 = Chaos
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const r = 80;

    // Brain Regions (Nodes in a circle)
    const nodes: {x: number, y: number, group: number}[] = [];
    const count = 12;
    
    for(let i=0; i<count; i++) {
        const a = (i / count) * Math.PI * 2;
        nodes.push({
            x: cx + Math.cos(a) * r,
            y: cy + Math.sin(a) * r,
            group: i % 3 // 3 functional networks (e.g. Visual, Motor, DMN)
        });
    }

    const draw = () => {
        ctx.clearRect(0, 0, w, h);

        // Draw Connections
        // Low Entropy: Only connect within groups (Segregation)
        // High Entropy: Connect everything (Integration/Desegregation)
        
        ctx.lineWidth = 1;
        
        nodes.forEach((n1, i) => {
            nodes.forEach((n2, j) => {
                if (i >= j) return;
                
                const sameGroup = n1.group === n2.group;
                
                // Probability of connection
                // If entropy is low, only sameGroup connects high prob
                // If entropy is high, cross-group connects high prob
                
                let probability = 0;
                if (sameGroup) probability = 1 - entropy * 0.5; // Weakens slightly
                else probability = entropy; // Strenghtens significantly
                
                if (Math.random() < probability) { // Flicker effect for "firing"
                     ctx.beginPath();
                     ctx.moveTo(n1.x, n1.y);
                     ctx.lineTo(n2.x, n2.y);
                     
                     // Color based on state
                     if (sameGroup) ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
                     else ctx.strokeStyle = `hsla(${entropy * 360}, 70%, 60%, ${entropy * 0.5})`; // Rainbow chaos
                     
                     ctx.stroke();
                }
            });
        });

        // Draw Nodes
        nodes.forEach(n => {
            ctx.beginPath();
            ctx.arc(n.x, n.y, 4, 0, Math.PI*2);
            ctx.fillStyle = n.group === 0 ? "#f87171" : n.group === 1 ? "#60a5fa" : "#4ade80";
            ctx.fill();
        });

        animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, [entropy]);

  return (
    <div className="glass overflow-hidden rounded-xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl">
      <div className="border-b border-white/5 px-5 py-4 flex justify-between items-center">
        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-300">
          <Brain size={14} className="text-fuchsia-400" /> Functional Connectivity
        </h3>
      </div>

      <div className="p-6 flex flex-col items-center">
        
        {/* Visualizer */}
        <div className="relative mb-6 bg-black/40 rounded-full border border-white/5 shadow-inner">
            <canvas ref={canvasRef} width={240} height={240} className="w-[240px] h-[240px]" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-700">DMN</span>
            </div>
        </div>

        {/* Slider */}
        <div className="w-full space-y-2">
            <div className="flex justify-between text-[10px] font-bold uppercase text-neutral-500">
                <span>Rigid (Sober)</span>
                <span>Chaotic (Psychedelic)</span>
            </div>
            <input 
                type="range" min="0" max="1" step="0.01" 
                value={entropy} 
                onChange={(e) => setEntropy(Number(e.target.value))}
                className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer"
                style={{
                    background: `linear-gradient(to right, #333 0%, #d946ef 100%)`
                }}
            />
        </div>

        <p className="mt-4 text-[10px] text-neutral-400 text-center leading-relaxed">
            The <strong>Entropic Brain</strong>: Psychedelics relax the brain's top-down constraints (The Default Mode Network), allowing disparate regions to talk to each other freely.
        </p>

      </div>
    </div>
  );
}