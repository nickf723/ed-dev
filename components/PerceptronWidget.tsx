"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { BrainCircuit, Calculator, ArrowRight } from "lucide-react";

export default function PerceptronWidget() {
  // Inputs (x)
  const [x1, setX1] = useState(1);
  const [x2, setX2] = useState(0);
  
  // Weights (w)
  const [w1, setW1] = useState(0.5);
  const [w2, setW2] = useState(0.5);
  
  // Bias (b)
  const [bias, setBias] = useState(-0.5);

  // Math: y = step(w1*x1 + w2*x2 + b)
  const sum = (x1 * w1) + (x2 * w2) + bias;
  const output = sum > 0 ? 1 : 0;

  return (
    <div className="glass overflow-hidden rounded-xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl">
      <div className="border-b border-white/5 px-5 py-4 flex justify-between items-center">
        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-300">
          <BrainCircuit size={14} className="text-violet-400" /> Perceptron Lab
        </h3>
      </div>

      <div className="p-6 flex flex-col items-center">
        
        {/* Visual Diagram */}
        <div className="relative flex items-center gap-4 mb-8">
            {/* Inputs */}
            <div className="flex flex-col gap-4">
                <InputNode label="x1" val={x1} set={setX1} />
                <InputNode label="x2" val={x2} set={setX2} />
            </div>

            {/* Synapses (Lines) */}
            <div className="flex flex-col gap-8 relative w-12">
                <SvgLine weight={w1} />
                <SvgLine weight={w2} className="-scale-y-100" />
            </div>

            {/* Neuron Body */}
            <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center z-10 transition-all duration-300
                ${output ? "bg-cyan-500 border-cyan-400 shadow-[0_0_20px_cyan]" : "bg-neutral-800 border-neutral-600"}
            `}>
                <div className="text-center">
                    <span className="text-[8px] uppercase font-bold text-neutral-400 block">Sum</span>
                    <span className={`text-xs font-mono font-bold ${output ? "text-white" : "text-neutral-500"}`}>
                        {sum.toFixed(1)}
                    </span>
                </div>
            </div>

            {/* Output */}
            <ArrowRight size={20} className={output ? "text-cyan-400" : "text-neutral-600"} />
            <div className={`w-8 h-8 rounded flex items-center justify-center font-mono font-bold border ${output ? "bg-cyan-500/20 border-cyan-500 text-cyan-300" : "bg-neutral-900 border-neutral-700 text-neutral-500"}`}>
                {output}
            </div>
        </div>

        {/* Controls */}
        <div className="w-full space-y-3 bg-neutral-950/50 p-4 rounded-lg border border-white/5">
            <Slider label="Weight 1" val={w1} set={setW1} min={-1} max={1} />
            <Slider label="Weight 2" val={w2} set={setW2} min={-1} max={1} />
            <Slider label="Bias" val={bias} set={setBias} min={-2} max={2} />
        </div>
        
        <div className="mt-4 text-center">
             <p className="text-[10px] font-mono text-neutral-500">
                Formula: Activation if <span className="text-violet-300"> (x1·w1 + x2·w2 + b) {">"} 0 </span>
             </p>
        </div>

      </div>
    </div>
  );
}

function InputNode({ label, val, set }: any) {
    return (
        <button onClick={() => set(val === 0 ? 1 : 0)} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold transition-colors
                ${val ? "bg-white text-black border-white" : "bg-neutral-900 text-neutral-500 border-neutral-700"}
            `}>
                {val}
            </div>
            <span className="text-[10px] font-mono text-neutral-500">{label}</span>
        </button>
    );
}

function Slider({ label, val, set, min, max }: any) {
    return (
        <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase font-bold text-neutral-500 w-12">{label}</span>
            <input 
                type="range" min={min} max={max} step={0.1} value={val} 
                onChange={(e) => set(parseFloat(e.target.value))}
                className="flex-1 h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-violet-500"
            />
            <span className="text-[10px] font-mono text-neutral-300 w-6 text-right">{val.toFixed(1)}</span>
        </div>
    );
}

function SvgLine({ weight, className="" }: any) {
    // Thickness based on absolute weight, Color based on sign
    const color = weight > 0 ? "#22d3ee" : "#f43f5e";
    const width = Math.abs(weight) * 4;
    
    return (
        <div className={`absolute left-[-20px] top-[18px] w-16 h-8 pointer-events-none ${className}`}>
            <svg width="100%" height="100%">
                <line x1="0" y1="0" x2="100%" y2="100%" stroke={color} strokeWidth={Math.max(1, width)} opacity={0.6} />
            </svg>
        </div>
    );
}