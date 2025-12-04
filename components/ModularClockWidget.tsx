"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { RotateCw, Plus } from "lucide-react";

export default function ModularClockWidget() {
  const [modulus, setModulus] = useState(12);
  const [valueA, setValueA] = useState(0);
  const [valueB, setValueB] = useState(1);

  // Calculate Result
  const result = (valueA + valueB) % modulus;

  // Generate clock points
  const points = Array.from({ length: modulus }, (_, i) => {
      const angle = (i / modulus) * Math.PI * 2 - Math.PI / 2; // Start at top
      const r = 120;
      return {
          val: i,
          x: Math.cos(angle) * r,
          y: Math.sin(angle) * r
      };
  });

  return (
    <div className="w-full max-w-2xl bg-neutral-900/80 border border-pink-500/30 rounded-3xl p-8 backdrop-blur-xl flex flex-col md:flex-row gap-8 shadow-2xl">
      
      {/* LEFT: Controls */}
      <div className="md:w-1/3 flex flex-col gap-6">
          <div>
              <h3 className="text-xs font-bold uppercase text-pink-400 mb-2 flex items-center gap-2">
                  <RotateCw size={14} /> Modulus (Zₙ)
              </h3>
              <input 
                  type="range" min="3" max="24" value={modulus}
                  onChange={(e) => setModulus(parseInt(e.target.value))}
                  className="w-full accent-pink-500 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-500 font-mono mt-1">
                  <span>Z₃</span>
                  <span>Z₂₄</span>
              </div>
          </div>

          <div className="p-4 rounded-xl bg-black/40 border border-white/5 font-mono text-center">
              <div className="text-[10px] text-neutral-500 uppercase tracking-widest mb-1">Equation</div>
              <div className="text-xl text-white">
                  <span className="text-cyan-400">{valueA}</span> + <span className="text-yellow-400">{valueB}</span> ≡ <span className="text-pink-500 font-bold">{result}</span>
              </div>
              <div className="text-[10px] text-neutral-600 mt-1">(mod {modulus})</div>
          </div>

          <p className="text-xs text-neutral-400 leading-relaxed">
              In a Cyclic Group, operations wrap around. This is the logic behind cryptography, clocks, and music theory.
          </p>
      </div>

      {/* RIGHT: Visualizer */}
      <div className="md:w-2/3 flex items-center justify-center relative h-64 md:h-auto">
          
          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="-150 -150 300 300">
              {/* Line A (Cyan) */}
              <line x1="0" y1="0" x2={points[valueA].x} y2={points[valueA].y} stroke="#22d3ee" strokeWidth="2" opacity="0.5" />
              {/* Line B (Yellow) - Shows the 'add' step relative to A? Or just from center? Let's just show from center for clarity */}
              <line x1="0" y1="0" x2={points[valueB].x} y2={points[valueB].y} stroke="#facc15" strokeWidth="2" opacity="0.5" />
              
              {/* Result Arc or Indicator */}
              <circle cx={points[result].x} cy={points[result].y} r="8" fill="#ec4899" className="animate-pulse" />
          </svg>

          {/* Points */}
          {points.map((p) => (
              <button
                  key={p.val}
                  onClick={() => setValueA(p.val)} // Simple click sets A
                  onContextMenu={(e) => { e.preventDefault(); setValueB(p.val); }} // Right click sets B
                  className={`
                    absolute w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all border
                    ${p.val === result ? "bg-pink-500 text-white border-pink-400 scale-125 z-20 shadow-[0_0_15px_#ec4899]" : 
                      p.val === valueA ? "bg-cyan-900/80 text-cyan-200 border-cyan-500/50 z-10" :
                      p.val === valueB ? "bg-yellow-900/80 text-yellow-200 border-yellow-500/50 z-10" :
                      "bg-neutral-900/50 text-neutral-500 border-white/5 hover:bg-white/10"
                    }
                  `}
                  style={{ transform: `translate(${p.x}px, ${p.y}px)` }}
              >
                  {p.val}
              </button>
          ))}
          
          <div className="absolute text-[10px] text-neutral-600 font-mono bottom-[-20px]">
              L-Click: A / R-Click: B
          </div>

      </div>

    </div>
  );
}