"use client";
import { useState, useEffect } from "react";
import { Cpu, Play, RotateCcw, ArrowDown } from "lucide-react";

type Instruction = { op: string, arg: number };
// Simple Program: Load 5, Add 3, Store 8
const MEMORY_SIZE = 8;
const INITIAL_RAM = [
    { type: 'INS', val: 'LOAD', arg: 6 }, // Addr 0: Load data from addr 6
    { type: 'INS', val: 'ADD', arg: 7 },  // Addr 1: Add data from addr 7
    { type: 'INS', val: 'STORE', arg: 5 },// Addr 2: Store result in addr 5
    { type: 'INS', val: 'HALT', arg: 0 }, // Addr 3: Stop
    { type: 'DATA', val: 0, arg: 0 },     // Addr 4: Empty (placeholder)
    { type: 'DATA', val: 0, arg: 0 },     // Addr 5: Output Destination
    { type: 'DATA', val: 10, arg: 0 },    // Addr 6: Data (10)
    { type: 'DATA', val: 25, arg: 0 },    // Addr 7: Data (25)
];

export default function CpuSimulator() {
  const [ram, setRam] = useState<any[]>(INITIAL_RAM);
  const [pc, setPc] = useState(0); // Program Counter
  const [acc, setAcc] = useState(0); // Accumulator
  const [ir, setIr] = useState("NOP"); // Instruction Register
  const [state, setState] = useState<"FETCH" | "DECODE" | "EXECUTE" | "HALTED">("FETCH");
  const [bus, setBus] = useState<string | number>(""); // Data Bus Visualization
  const [running, setRunning] = useState(false);

  // Cycle Logic
  useEffect(() => {
      if (!running || state === "HALTED") return;

      const timer = setTimeout(() => {
          if (state === "FETCH") {
              const instr = ram[pc];
              setIr(`${instr.val} ${instr.type === 'INS' && instr.val !== 'HALT' ? instr.arg : ''}`);
              setBus(`FETCH: ${instr.val}`);
              setState("DECODE");
          } 
          else if (state === "DECODE") {
              const instr = ram[pc];
              if (instr.val === "HALT") {
                  setState("HALTED");
                  setRunning(false);
              } else {
                  setState("EXECUTE");
              }
          } 
          else if (state === "EXECUTE") {
              const instr = ram[pc];
              const newRam = [...ram];
              
              if (instr.val === "LOAD") {
                  setAcc(ram[instr.arg].val);
                  setBus(`READ MEM[${instr.arg}] -> ACC`);
              } else if (instr.val === "ADD") {
                  setAcc(prev => prev + ram[instr.arg].val);
                  setBus(`ACC + MEM[${instr.arg}]`);
              } else if (instr.val === "STORE") {
                  newRam[instr.arg] = { ...newRam[instr.arg], val: acc };
                  setRam(newRam);
                  setBus(`ACC -> MEM[${instr.arg}]`);
              }

              setPc(prev => prev + 1);
              setState("FETCH");
          }
      }, 1000); // 1 Second per clock tick

      return () => clearTimeout(timer);
  }, [running, state, pc, ram, acc]);

  const reset = () => {
      setRam(INITIAL_RAM);
      setPc(0);
      setAcc(0);
      setIr("NOP");
      setState("FETCH");
      setBus("");
      setRunning(false);
  };

  return (
    <div className="bg-[#171717] border-2 border-zinc-800 rounded-xl p-1 shadow-2xl w-full max-w-lg relative overflow-hidden">
        {/* Screw holes (Visual Detail) */}
        <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-zinc-800 flex items-center justify-center"><div className="w-1 h-0.5 bg-zinc-900 rotate-45"/></div>
        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-zinc-800 flex items-center justify-center"><div className="w-1 h-0.5 bg-zinc-900 rotate-45"/></div>

        <div className="bg-[#0a0a0a] p-6 rounded-lg border border-zinc-800/50">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-zinc-800 rounded flex items-center justify-center border border-zinc-700">
                        <Cpu size={20} className="text-amber-500" />
                    </div>
                    <div>
                        <h3 className="font-bold text-zinc-200 font-mono tracking-wider">CPU_ARCH.SIM</h3>
                        <div className="text-[10px] text-zinc-500 font-mono">Von Neumann Model</div>
                    </div>
                </div>
                <div className={`px-3 py-1 rounded font-mono text-xs font-bold border ${running ? "bg-amber-500/10 border-amber-500 text-amber-500 animate-pulse" : "bg-zinc-800 border-zinc-700 text-zinc-500"}`}>
                    {state}
                </div>
            </div>

            {/* MAIN ARCHITECTURE VISUAL */}
            <div className="grid grid-cols-3 gap-4 mb-6 relative">
                
                {/* 1. CPU CORE */}
                <div className="col-span-2 space-y-3">
                    {/* Registers */}
                    <div className="bg-zinc-900 border border-zinc-700 p-3 rounded relative">
                        <div className="text-[10px] text-zinc-500 font-mono mb-1">REGISTERS</div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="bg-black border border-zinc-800 p-2 rounded">
                                <div className="text-[9px] text-blue-400">PC (Counter)</div>
                                <div className="text-lg font-mono text-white">{pc}</div>
                            </div>
                            <div className="bg-black border border-zinc-800 p-2 rounded">
                                <div className="text-[9px] text-green-400">ACC (Value)</div>
                                <div className="text-lg font-mono text-white">{acc}</div>
                            </div>
                        </div>
                    </div>
                    {/* ALU / Control */}
                    <div className="bg-zinc-900 border border-zinc-700 p-3 rounded">
                        <div className="text-[10px] text-zinc-500 font-mono mb-1">CURRENT INSTRUCTION (IR)</div>
                        <div className="text-xl font-mono text-amber-500 font-bold">{ir}</div>
                    </div>
                </div>

                {/* 2. RAM (MEMORY) */}
                <div className="bg-zinc-900 border border-zinc-700 p-3 rounded h-full flex flex-col">
                    <div className="text-[10px] text-zinc-500 font-mono mb-2">RAM (8 Bytes)</div>
                    <div className="flex-1 space-y-1 overflow-hidden">
                        {ram.map((cell, i) => (
                            <div 
                                key={i} 
                                className={`
                                    flex justify-between items-center text-[10px] font-mono p-1 rounded border
                                    ${i === pc ? "bg-blue-900/30 border-blue-500 text-white" : "bg-black border-zinc-800 text-zinc-600"}
                                `}
                            >
                                <span className="opacity-50">{i}:</span>
                                <span>{cell.type === 'INS' ? cell.val : cell.val}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* DATA BUS (Visual connection) */}
                <div className="absolute top-1/2 left-[66%] w-4 h-full -translate-x-1/2 -z-10 flex flex-col justify-center items-center">
                    <div className={`w-full h-1 bg-zinc-800 ${bus ? "bg-amber-500 shadow-[0_0_10px_orange]" : ""}`} />
                </div>
            </div>

            {/* BUS READOUT */}
            <div className="h-8 bg-black border border-zinc-800 rounded mb-4 flex items-center justify-center font-mono text-xs text-zinc-400">
                DATA BUS: <span className="text-amber-500 ml-2">{bus || "IDLE"}</span>
            </div>

            {/* CONTROLS */}
            <div className="flex gap-2">
                <button 
                    onClick={() => setRunning(!running)}
                    className={`flex-1 py-3 font-bold font-mono rounded flex items-center justify-center gap-2 transition-colors border-b-4 active:border-b-0 active:translate-y-1 ${running ? "bg-red-600 border-red-800 text-white" : "bg-emerald-600 border-emerald-800 text-white"}`}
                >
                    {running ? "PAUSE" : <><Play size={14} fill="currentColor" /> POWER ON</>}
                </button>
                <button 
                    onClick={reset}
                    className="px-4 bg-zinc-700 border-b-4 border-zinc-900 hover:bg-zinc-600 text-white rounded flex items-center justify-center transition-colors active:border-b-0 active:translate-y-1"
                >
                    <RotateCcw size={16} />
                </button>
            </div>
        </div>
    </div>
  );
}