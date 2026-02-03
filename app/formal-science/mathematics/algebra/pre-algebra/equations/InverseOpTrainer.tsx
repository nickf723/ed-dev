"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, ArrowRight, RefreshCw, CheckCircle } from 'lucide-react';

export default function InverseOpTrainer() {
  const [level, setLevel] = useState(0);
  const [solved, setSolved] = useState(false);
  const [wrongShake, setWrongShake] = useState(false);

  const equations = [
    { text: "x + 5 = 12", key: "sub", val: 5, ans: 7, correctOp: "- 5" },
    { text: "x - 8 = 3", key: "add", val: 8, ans: 11, correctOp: "+ 8" },
    { text: "4x = 20", key: "div", val: 4, ans: 5, correctOp: "÷ 4" },
    { text: "x / 3 = 6", key: "mult", val: 3, ans: 18, correctOp: "× 3" },
  ];

  const current = equations[level];

  const handleOp = (op: string) => {
    if (solved) return;
    if (op === current.key) {
        setSolved(true);
        setTimeout(() => {
            if (level < equations.length - 1) {
                setLevel(l => l + 1);
                setSolved(false);
            }
        }, 2000);
    } else {
        setWrongShake(true);
        setTimeout(() => setWrongShake(false), 500);
    }
  };

  return (
    <div className="w-full bg-slate-900/90 border border-emerald-500/20 rounded-2xl backdrop-blur-md overflow-hidden flex flex-col min-h-[450px]">
      <div className="p-4 bg-black/20 border-b border-white/5 flex justify-between items-center">
        <h3 className="font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
            {solved ? <Unlock className="text-emerald-400" size={16} /> : <Lock className="text-rose-400" size={16} />}
            Equation Unlocker
        </h3>
        <button onClick={() => {setLevel(0); setSolved(false);}} className="text-slate-500 hover:text-white"><RefreshCw size={14}/></button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8">
        
        {/* THE EQUATION CARD */}
        <motion.div 
            animate={wrongShake ? { x: [-5, 5, -5, 5, 0] } : {}}
            className="relative bg-slate-800 border border-white/10 rounded-2xl p-8 mb-12 w-full max-w-sm text-center shadow-2xl"
        >
            <div className="text-4xl font-mono font-bold text-white mb-2">
                {current.text}
            </div>
            <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">
                Isolate X
            </div>

            {/* Visualizing the Operation Step */}
            <AnimatePresence>
                {solved && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 10 }} exit={{ opacity: 0 }}
                        className="absolute left-0 right-0 top-full"
                    >
                        <div className="flex justify-center gap-12 text-emerald-400 font-mono text-xl font-bold">
                            <span>{current.correctOp}</span>
                            <span>{current.correctOp}</span>
                        </div>
                        <div className="mt-4 p-2 bg-emerald-500/20 border border-emerald-500 rounded text-emerald-300 font-bold flex justify-center items-center gap-2">
                            <CheckCircle size={16} /> x = {current.ans}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>

        {/* THE KEYPAD */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
            <button 
                onClick={() => handleOp('add')} disabled={solved}
                className="p-4 bg-slate-700 hover:bg-slate-600 rounded-xl font-bold text-white border-b-4 border-slate-900 active:border-b-0 active:translate-y-1 transition-all flex flex-col items-center gap-1"
            >
                <span className="text-xl">+ {current.val}</span>
                <span className="text-[9px] uppercase text-slate-400">Add</span>
            </button>
            <button 
                onClick={() => handleOp('sub')} disabled={solved}
                className="p-4 bg-slate-700 hover:bg-slate-600 rounded-xl font-bold text-white border-b-4 border-slate-900 active:border-b-0 active:translate-y-1 transition-all flex flex-col items-center gap-1"
            >
                <span className="text-xl">- {current.val}</span>
                <span className="text-[9px] uppercase text-slate-400">Subtract</span>
            </button>
            <button 
                onClick={() => handleOp('mult')} disabled={solved}
                className="p-4 bg-slate-700 hover:bg-slate-600 rounded-xl font-bold text-white border-b-4 border-slate-900 active:border-b-0 active:translate-y-1 transition-all flex flex-col items-center gap-1"
            >
                <span className="text-xl">× {current.val}</span>
                <span className="text-[9px] uppercase text-slate-400">Multiply</span>
            </button>
            <button 
                onClick={() => handleOp('div')} disabled={solved}
                className="p-4 bg-slate-700 hover:bg-slate-600 rounded-xl font-bold text-white border-b-4 border-slate-900 active:border-b-0 active:translate-y-1 transition-all flex flex-col items-center gap-1"
            >
                <span className="text-xl">÷ {current.val}</span>
                <span className="text-[9px] uppercase text-slate-400">Divide</span>
            </button>
        </div>

      </div>
    </div>
  );
}