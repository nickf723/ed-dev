"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Cpu, ArrowRight, Zap, Power, CheckCircle2, XCircle } from "lucide-react";

const GATES = [
  { id: "AND", label: "AND", desc: "True only if BOTH are True", op: (a: boolean, b: boolean) => a && b },
  { id: "OR", label: "OR", desc: "True if EITHER is True", op: (a: boolean, b: boolean) => a || b },
  { id: "XOR", label: "XOR", desc: "True if DIFFERENT", op: (a: boolean, b: boolean) => a !== b },
  { id: "NAND", label: "NAND", desc: "False only if BOTH are True", op: (a: boolean, b: boolean) => !(a && b) },
];

export default function LogicGateWidget() {
  const [inputA, setInputA] = useState(false);
  const [inputB, setInputB] = useState(false);
  const [activeGate, setActiveGate] = useState("AND");

  const currentGate = GATES.find(g => g.id === activeGate) || GATES[0];
  const result = currentGate.op(inputA, inputB);

  return (
    <div className="glass overflow-hidden rounded-xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl">
      <div className="border-b border-white/5 px-5 py-4 flex justify-between items-center">
        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-300">
          <Cpu size={14} className="text-green-400" /> Logic Core
        </h3>
        <div className={`w-2 h-2 rounded-full ${result ? "bg-green-400 shadow-[0_0_10px_#4ade80]" : "bg-neutral-700"}`} />
      </div>

      <div className="p-6 space-y-6">
        
        {/* Inputs */}
        <div className="flex justify-between gap-4">
            <InputSwitch label="Input A" value={inputA} onChange={() => setInputA(!inputA)} />
            <InputSwitch label="Input B" value={inputB} onChange={() => setInputB(!inputB)} />
        </div>

        {/* Gate Selector */}
        <div className="grid grid-cols-4 gap-1 bg-neutral-950 p-1 rounded-lg border border-white/5">
            {GATES.map(g => (
                <button
                    key={g.id}
                    onClick={() => setActiveGate(g.id)}
                    className={`text-[10px] font-bold py-2 rounded transition-all
                        ${activeGate === g.id ? "bg-neutral-800 text-white shadow" : "text-neutral-500 hover:text-neutral-300"}
                    `}
                >
                    {g.label}
                </button>
            ))}
        </div>

        {/* Visualization */}
        <div className="relative h-24 rounded-xl border border-white/5 bg-neutral-950/50 flex items-center justify-between px-6">
            {/* Wires */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                <div className="w-full h-[2px] bg-white" />
            </div>

            {/* Input Nodes */}
            <div className="flex flex-col gap-4 z-10">
                <div className={`w-3 h-3 rounded-full border-2 transition-colors ${inputA ? "bg-green-500 border-green-400" : "bg-neutral-900 border-neutral-700"}`} />
                <div className={`w-3 h-3 rounded-full border-2 transition-colors ${inputB ? "bg-green-500 border-green-400" : "bg-neutral-900 border-neutral-700"}`} />
            </div>

            {/* The Gate */}
            <div className="z-10 bg-neutral-900 border border-white/10 px-4 py-2 rounded-lg shadow-xl">
                <span className="text-lg font-black text-white tracking-wider">{currentGate.label}</span>
            </div>

            {/* Output Node */}
            <div className="z-10 relative">
                 <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300
                    ${result ? "bg-green-500 border-green-400 shadow-[0_0_20px_rgba(74,222,128,0.5)]" : "bg-neutral-900 border-neutral-700"}
                 `}>
                    <Zap size={12} className={result ? "text-white fill-white" : "text-neutral-700"} />
                 </div>
            </div>
        </div>
        
        <div className="text-center">
            <p className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider">
                {currentGate.desc}
            </p>
        </div>

      </div>
    </div>
  );
}

function InputSwitch({ label, value, onChange }: { label: string, value: boolean, onChange: () => void }) {
    return (
        <button onClick={onChange} className="flex-1 flex flex-col gap-2 group">
            <span className="text-[10px] uppercase font-bold text-neutral-500 group-hover:text-neutral-300 transition-colors">{label}</span>
            <div className={`w-full h-10 rounded-lg border flex items-center justify-center transition-all
                ${value ? "bg-green-500/20 border-green-500/50 text-green-400" : "bg-neutral-900 border-neutral-800 text-neutral-600"}
            `}>
                <span className="font-mono font-bold text-lg">{value ? "1" : "0"}</span>
            </div>
        </button>
    );
}