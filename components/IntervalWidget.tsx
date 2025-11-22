"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Music, Divide, Activity } from "lucide-react";

const INTERVALS = [
  { name: "Unison", ratio: 1/1, desc: "Perfect blending (1:1)", consonance: "Perfect" },
  { name: "Octave", ratio: 2/1, desc: "Same note, higher (2:1)", consonance: "Perfect" },
  { name: "Perfect 5th", ratio: 3/2, desc: "Rich & stable (3:2)", consonance: "High" },
  { name: "Major 3rd", ratio: 5/4, desc: "Happy & bright (5:4)", consonance: "Medium" },
  { name: "Tritone", ratio: 45/32, desc: "Tension & unrest (45:32)", consonance: "Low" },
];

export default function IntervalWidget() {
  const [active, setActive] = useState(INTERVALS[2]); // Default to 5th
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;

    // Visualizer Settings
    const w = canvas.width;
    const h = canvas.height;
    const centerY = h / 2;
    const baseFreq = 0.05;
    const amp = 15;

    const draw = () => {
        ctx.clearRect(0, 0, w, h);
        
        // Draw Base Wave (Root Note)
        ctx.beginPath();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
        ctx.lineWidth = 2;
        for (let x = 0; x < w; x++) {
            const y = centerY + Math.sin(x * baseFreq + time) * amp;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Draw Interval Wave (Harmony Note)
        ctx.beginPath();
        ctx.strokeStyle = "rgba(251, 113, 133, 0.3)"; // Rose-400
        for (let x = 0; x < w; x++) {
            const y = centerY + Math.sin(x * baseFreq * active.ratio + time) * amp;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Draw Combined Interference Pattern (The Resulting Sound)
        ctx.beginPath();
        ctx.strokeStyle = "#fb7185"; // Rose-400 Bright
        ctx.lineWidth = 3;
        for (let x = 0; x < w; x++) {
            // Sum of both waves
            const y1 = Math.sin(x * baseFreq + time) * amp;
            const y2 = Math.sin(x * baseFreq * active.ratio + time) * amp;
            const y = centerY + (y1 + y2);
            
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();

        time += 0.05;
        animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, [active]);

  return (
    <div className="glass overflow-hidden rounded-xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl">
      <div className="border-b border-white/5 px-5 py-4 flex justify-between items-center">
        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-300">
          <Activity size={14} className="text-rose-400" /> Interval Math
        </h3>
      </div>

      {/* Visualizer */}
      <div className="relative h-32 w-full bg-neutral-950/50 border-b border-white/5">
        <canvas ref={canvasRef} width={300} height={128} className="w-full h-full" />
        <div className="absolute bottom-2 right-2 text-[10px] font-mono text-neutral-500">
            Ratio: {active.ratio.toFixed(2)}
        </div>
      </div>

      {/* Controls */}
      <div className="p-4 grid grid-cols-1 gap-2">
        {INTERVALS.map((interval) => (
            <button
                key={interval.name}
                onClick={() => setActive(interval)}
                className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all border text-xs
                    ${active.name === interval.name 
                        ? "bg-rose-500/10 border-rose-500/50 text-white" 
                        : "bg-transparent border-transparent text-neutral-400 hover:bg-white/5 hover:text-neutral-200"}
                `}
            >
                <span className="font-bold">{interval.name}</span>
                <span className="font-mono opacity-50">{interval.desc}</span>
            </button>
        ))}
      </div>
      
      <div className="bg-neutral-950/50 px-5 py-3 border-t border-white/5">
        <p className="text-[10px] text-neutral-500 leading-relaxed">
           <strong>Consonance:</strong> {active.consonance}. Simpler ratios (like 3:2) create patterns that align frequently, sounding smooth to the ear.
        </p>
      </div>
    </div>
  );
}