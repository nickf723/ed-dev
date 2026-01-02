"use client";
import { useState } from "react";
import { ToggleLeft, ToggleRight, Plus, ArrowRight, Binary } from "lucide-react";

export default function FullAdder() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [cIn, setCIn] = useState(0);

  // LOGIC GATES
  const xor1 = a ^ b;
  const and1 = a & b;
  
  const sum = xor1 ^ cIn; // SUM OUTPUT
  const and2 = xor1 & cIn;
  const cOut = and1 | and2; // CARRY OUTPUT

  // Helper for LED visualization
  const Led = ({ on, label }: { on: number, label: string }) => (
      <div className="flex flex-col items-center gap-1">
          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shadow-lg transition-all duration-300 ${on ? "bg-green-500 border-green-400 shadow-[0_0_15px_#22c55e]" : "bg-zinc-900 border-zinc-700"}`}>
              <span className={`font-mono font-bold ${on ? "text-white" : "text-zinc-600"}`}>{on}</span>
          </div>
          <span className="text-[10px] font-mono text-zinc-500">{label}</span>
      </div>
  );

  return (
    <div className="bg-[#1c1917] border border-green-500/30 rounded-xl p-6 shadow-2xl w-full max-w-md relative overflow-hidden">
        {/* Schematic Background */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05] pointer-events-none" />

        <div className="flex justify-between items-center mb-8 relative z-10">
            <h3 className="font-bold text-green-400 flex items-center gap-2 font-mono tracking-wider">
                <Binary size={18} /> FULL_ADDER
            </h3>
            <div className="text-[10px] font-mono text-zinc-500 border border-zinc-700 px-2 py-1 rounded">
                1-BIT ALU SLICE
            </div>
        </div>

        <div className="flex justify-between items-center gap-4 relative z-10">
            
            {/* INPUTS */}
            <div className="flex flex-col gap-4">
                <button onClick={() => setA(a ? 0 : 1)} className="flex items-center gap-3 group">
                    <span className="text-xs font-mono text-zinc-400">A</span>
                    {a ? <ToggleRight size={32} className="text-green-500" /> : <ToggleLeft size={32} className="text-zinc-600" />}
                </button>
                <button onClick={() => setB(b ? 0 : 1)} className="flex items-center gap-3 group">
                    <span className="text-xs font-mono text-zinc-400">B</span>
                    {b ? <ToggleRight size={32} className="text-green-500" /> : <ToggleLeft size={32} className="text-zinc-600" />}
                </button>
                <button onClick={() => setCIn(cIn ? 0 : 1)} className="flex items-center gap-3 group">
                    <span className="text-xs font-mono text-yellow-500">C-IN</span>
                    {cIn ? <ToggleRight size={32} className="text-yellow-500" /> : <ToggleLeft size={32} className="text-zinc-600" />}
                </button>
            </div>

            {/* BLACK BOX LOGIC VISUALIZATION */}
            <div className="flex-1 flex flex-col items-center justify-center text-zinc-600">
                <ArrowRight size={24} />
                <div className="my-2 p-2 border border-zinc-700 rounded bg-black/40 text-[10px] font-mono text-center">
                    <div>SUM = A ⊕ B ⊕ C</div>
                    <div className="mt-1">COUT = AB + C(A ⊕ B)</div>
                </div>
                <ArrowRight size={24} />
            </div>

            {/* OUTPUTS */}
            <div className="flex flex-col gap-6">
                <Led on={sum} label="SUM (S)" />
                <Led on={cOut} label="C-OUT" />
            </div>

        </div>

        {/* MATH EQUATION */}
        <div className="mt-8 pt-4 border-t border-white/5 text-center relative z-10">
             <div className="text-sm font-mono text-zinc-400">
                 {a} + {b} + <span className="text-yellow-600">{cIn}</span> = <span className="text-green-500 font-bold">{cOut}{sum}</span> (Binary)
             </div>
             <div className="text-xs font-mono text-zinc-500 mt-1">
                 {a + b + cIn} (Decimal)
             </div>
        </div>

    </div>
  );
}