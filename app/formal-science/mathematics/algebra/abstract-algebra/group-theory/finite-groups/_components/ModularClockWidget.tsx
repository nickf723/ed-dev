"use client";
import { useState, useEffect } from "react";
import { RotateCw } from "lucide-react";
import { M } from "@/app/_components/Math";

export default function ModularClockWidget() {
  const [mounted, setMounted] = useState(false);
  const [modulus, setModulus] = useState(12);
  const [valueA, setValueA] = useState(0);
  const [valueB, setValueB] = useState(1);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-full h-64 bg-black/40 border border-cyan-500/20 rounded-3xl animate-pulse" />;

  const result = (valueA + valueB) % modulus;

  const points = Array.from({ length: modulus }, (_, i) => {
      const angle = (i / modulus) * Math.PI * 2 - Math.PI / 2;
      const r = 120;
      // Fixed to 4 decimals to strictly prevent Server/Client float hydration mismatches
      return { 
        val: i, 
        x: parseFloat((Math.cos(angle) * r).toFixed(4)), 
        y: parseFloat((Math.sin(angle) * r).toFixed(4)) 
      };
  });

  return (
    <div className="w-full bg-black/40 border border-cyan-500/20 rounded-3xl p-8 backdrop-blur-xl flex flex-col md:flex-row gap-12 shadow-2xl">
      
      {/* LEFT: Controls */}
      <div className="md:w-1/2 flex flex-col gap-8 justify-center">
          <div className="bg-cyan-950/20 p-6 rounded-2xl border border-cyan-500/20 shadow-inner">
              <h3 className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-6 flex items-center gap-2">
                  <RotateCw size={16} /> Modulus <M>{"(\\mathbb{Z}_n)"}</M>
              </h3>
              <input 
                  type="range" min="3" max="24" value={modulus}
                  onChange={(e) => {
                      const newMod = parseInt(e.target.value);
                      setModulus(newMod);
                      if (valueA >= newMod) setValueA(0);
                      if (valueB >= newMod) setValueB(0);
                  }}
                  className="w-full accent-cyan-500 h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-cyan-500/50 font-mono mt-3 uppercase tracking-widest">
                  <M>{"\\mathbb{Z}_3"}</M>
                  <M>{"\\mathbb{Z}_{24}"}</M>
              </div>
          </div>

          <div className="p-6 rounded-2xl bg-black/60 border border-white/5 font-mono text-center shadow-inner">
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-4">Modular Equation</div>
              <div className="text-3xl text-white flex items-center justify-center gap-4">
                  <span className="text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.3)]">{valueA}</span> 
                  <span className="text-zinc-600 text-xl">+</span> 
                  <span className="text-fuchsia-400 drop-shadow-[0_0_10px_rgba(217,70,239,0.3)]">{valueB}</span> 
                  <span className="text-zinc-600 text-xl">≡</span> 
                  <span className="text-white font-black drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]">{result}</span>
              </div>
              <div className="text-xs text-zinc-500 mt-4 font-bold">
                  <M>{`\\pmod{${modulus}}`}</M>
              </div>
          </div>
      </div>

      {/* RIGHT: Visualizer */}
      <div className="md:w-1/2 flex items-center justify-center relative min-h-[300px]">
          <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="-150 -150 300 300">
              <circle cx="0" cy="0" r="120" fill="none" stroke="rgba(6, 182, 212, 0.1)" strokeWidth="1" strokeDasharray="4 4" />
              
              <line x1="0" y1="0" x2={points[valueA]?.x} y2={points[valueA]?.y} stroke="#06b6d4" strokeWidth="2" opacity="0.6" />
              <line x1="0" y1="0" x2={points[valueB]?.x} y2={points[valueB]?.y} stroke="#d946ef" strokeWidth="2" opacity="0.6" />
              
              {points[result] && (
                  <circle cx={points[result].x} cy={points[result].y} r="14" fill="none" stroke="#fff" strokeWidth="2" className="animate-[spin_4s_linear_infinite]" strokeDasharray="8 8" />
              )}
          </svg>

          {points.map((p) => (
              <button
                  key={p.val}
                  onClick={() => setValueA(p.val)}
                  onContextMenu={(e) => { e.preventDefault(); setValueB(p.val); }}
                  className={`
                    absolute w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-all border
                    ${p.val === result ? "bg-white text-black border-white scale-125 z-20 shadow-[0_0_20px_rgba(255,255,255,0.6)]" : 
                      p.val === valueA ? "bg-cyan-900/80 text-cyan-200 border-cyan-500 z-10 shadow-[0_0_15px_rgba(6,182,212,0.5)] scale-110" :
                      p.val === valueB ? "bg-fuchsia-900/80 text-fuchsia-200 border-fuchsia-500 z-10 shadow-[0_0_15px_rgba(217,70,239,0.5)] scale-110" :
                      "bg-black/80 text-zinc-500 border-white/10 hover:bg-white/10 hover:text-white"
                    }
                  `}
                  style={{ transform: `translate(${p.x}px, ${p.y}px)` }}
              >
                  {p.val}
              </button>
          ))}
          
          <div className="absolute text-[10px] text-zinc-500 font-mono bottom-0 bg-black/80 px-4 py-2 rounded-full border border-white/5">
              L-Click: Set A <span className="text-zinc-700 mx-2">|</span> R-Click: Set B
          </div>
      </div>
    </div>
  );
}