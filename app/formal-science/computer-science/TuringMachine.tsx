"use client";
import { useState, useEffect } from "react";
import { Cpu, Play, Square, RotateCcw, ArrowRight, ArrowLeft } from "lucide-react";

export default function TuringMachine() {
  const [tape, setTape] = useState<number[]>([0, 1, 1, 0, 1, 0, 0, 0, 0, 0]);
  const [head, setHead] = useState(0);
  const [state, setState] = useState("A"); // States: A, B, HALT
  const [isRunning, setIsRunning] = useState(false);

  // A Simple Program: Invert Bits (NOT Gate) then Halt
  // Rules: { State: { ReadVal: [WriteVal, MoveDir, NextState] } }
  const rules: any = {
      "A": {
          0: [1, 1, "A"], // Read 0 -> Write 1, Move Right, Stay A
          1: [0, 1, "A"], // Read 1 -> Write 0, Move Right, Stay A
          undefined: [0, 0, "HALT"] // End of tape (undefined) -> Halt
      }
  };

  const step = () => {
      if (state === "HALT") {
          setIsRunning(false);
          return;
      }

      const currentVal = tape[head];
      // Check if we hit end of tape logic (simulate infinite 0s)
      const val = currentVal === undefined ? 0 : currentVal;

      const rule = rules[state] && rules[state][val];
      
      if (rule) {
          const [writeVal, moveDir, nextState] = rule;
          
          // Update Tape
          const newTape = [...tape];
          if (head >= newTape.length) newTape.push(0); // Extend tape
          newTape[head] = writeVal;
          setTape(newTape);

          // Move Head (1 = Right, -1 = Left)
          setHead(h => Math.max(0, h + moveDir));
          
          // Update State
          setState(nextState);
      } else {
          setState("HALT"); // No rule = Halt
      }
  };

  useEffect(() => {
      let interval: NodeJS.Timeout;
      if (isRunning) {
          interval = setInterval(step, 500);
      }
      return () => clearInterval(interval);
  }, [isRunning, tape, head, state]);

  const reset = () => {
      setTape([0, 1, 1, 0, 1, 0, 0, 0, 0, 0]);
      setHead(0);
      setState("A");
      setIsRunning(false);
  };

  return (
    <div className="bg-slate-900 border border-green-500/30 rounded-xl p-6 shadow-2xl w-full max-w-md font-mono">
        
        <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-green-400 flex items-center gap-2 tracking-wider text-sm">
                <Cpu size={16} /> TURING_MACHINE_SIM
            </h3>
            <div className={`text-[10px] px-2 py-1 rounded font-bold ${state === "HALT" ? "bg-red-500 text-white" : "bg-green-900 text-green-400"}`}>
                STATE: {state}
            </div>
        </div>

        {/* TAPE VISUALIZER */}
        <div className="relative mb-6">
            {/* The Head Pointer */}
            <div 
                className="absolute -top-4 w-8 h-4 flex justify-center transition-all duration-300"
                style={{ left: `${head * 32}px` }} // 32px is cell width
            >
                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-green-500" />
            </div>

            {/* The Tape Strip */}
            <div className="flex overflow-hidden border-y-2 border-slate-700 bg-black/40 h-10 items-center">
                {tape.map((bit, i) => (
                    <div 
                        key={i} 
                        className={`
                            min-w-[32px] w-[32px] h-full flex items-center justify-center border-r border-white/5 text-sm font-bold transition-colors duration-300
                            ${i === head ? "bg-green-500/20 text-green-400" : "text-slate-500"}
                        `}
                    >
                        {bit}
                    </div>
                ))}
                {/* Infinite placeholder */}
                <div className="min-w-[32px] flex items-center justify-center text-slate-700">0</div>
                <div className="min-w-[32px] flex items-center justify-center text-slate-700">0</div>
            </div>
        </div>

        {/* CONTROLS */}
        <div className="bg-black/20 p-4 rounded border border-white/5 mb-4 text-xs space-y-2">
            <div className="flex justify-between text-slate-400">
                <span>READ HEAD:</span>
                <span className="text-white font-bold">{tape[head] ?? 0}</span>
            </div>
            <div className="flex justify-between text-slate-400">
                <span>PROGRAM:</span>
                <span className="text-blue-400">INVERT_BITS</span>
            </div>
            <div className="flex justify-between text-slate-400">
                <span>ACTION:</span>
                <span className="text-yellow-400">{state === "A" ? `WRITE ${tape[head] === 1 ? 0 : 1} -> MOVE RIGHT` : "HALT"}</span>
            </div>
        </div>

        <div className="flex gap-2">
            <button 
                onClick={() => setIsRunning(!isRunning)}
                disabled={state === "HALT"}
                className="flex-1 py-2 bg-green-600 hover:bg-green-500 text-black font-bold rounded flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                {isRunning ? <Square size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
                {isRunning ? "PAUSE" : "RUN"}
            </button>
            <button 
                onClick={step}
                disabled={state === "HALT" || isRunning}
                className="px-4 bg-slate-800 hover:bg-slate-700 text-white rounded flex items-center justify-center transition-colors disabled:opacity-50"
            >
                <ArrowRight size={16} />
            </button>
            <button 
                onClick={reset}
                className="px-4 bg-slate-800 hover:bg-slate-700 text-white rounded flex items-center justify-center transition-colors"
            >
                <RotateCcw size={16} />
            </button>
        </div>

    </div>
  );
}