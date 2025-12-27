"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Radio, Calculator, HelpCircle } from "lucide-react";

export default function DrakeWidget() {
  // Drake Equation Factors
  const [R, setR] = useState(1.5);   // Rate of star formation
  const [fp, setFp] = useState(0.5); // Fraction with planets
  const [ne, setNe] = useState(1);   // Planets per star capable of life
  const [fl, setFl] = useState(0.1); // Fraction where life evolves
  const [fi, setFi] = useState(0.1); // Fraction where intelligence evolves
  const [fc, setFc] = useState(0.1); // Fraction that communicates
  const [L, setL] = useState(10000); // Lifetime of civilization

  // Calculate N
  const N = Math.floor(R * fp * ne * fl * fi * fc * L);

  return (
    <div className="glass overflow-hidden rounded-xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl">
      <div className="border-b border-white/5 px-5 py-4 flex justify-between items-center">
        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-300">
          <Radio size={14} className="text-lime-400" /> The Drake Equation
        </h3>
      </div>

      <div className="p-6 space-y-5">
        
        {/* Result Display */}
        <div className="text-center py-4 bg-neutral-950/50 rounded-lg border border-white/5">
            <span className="text-[10px] font-mono text-neutral-500 uppercase mb-1 block">Estimated Civilizations</span>
            <motion.span 
                key={N}
                initial={{ scale: 1.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-4xl font-black text-lime-400 block"
            >
                {N.toLocaleString()}
            </motion.span>
        </div>

        {/* Sliders */}
        <div className="space-y-3">
            <Control label="Star Formation (R*)" value={R} set={setR} min={0.1} max={10} step={0.1} />
            <Control label="Planets (fp)" value={fp} set={setFp} min={0} max={1} step={0.1} />
            <Control label="Habitable (ne)" value={ne} set={setNe} min={0} max={5} step={0.1} />
            <Control label="Life (fl)" value={fl} set={setFl} min={0} max={1} step={0.01} />
            <Control label="Intelligence (fi)" value={fi} set={setFi} min={0} max={1} step={0.01} />
            <Control label="Communicate (fc)" value={fc} set={setFc} min={0} max={1} step={0.01} />
            <Control label="Lifetime (L years)" value={L} set={setL} min={100} max={1000000} step={100} />
        </div>

      </div>
    </div>
  );
}

function Control({ label, value, set, min, max, step }: any) {
    return (
        <div className="flex flex-col gap-1">
            <div className="flex justify-between text-[10px] uppercase font-bold text-neutral-500">
                <span>{label}</span>
                <span className="text-white font-mono">{value}</span>
            </div>
            <input 
                type="range" 
                min={min} max={max} step={step}
                value={value} 
                onChange={(e) => set(Number(e.target.value))}
                className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-lime-500"
            />
        </div>
    );
}