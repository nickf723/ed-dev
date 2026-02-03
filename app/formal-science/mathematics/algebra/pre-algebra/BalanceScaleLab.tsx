"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, Minus, Divide, RefreshCw, CheckCircle } from 'lucide-react';

export default function BalanceScaleLab() {
  const [level, setLevel] = useState(1);
  // Equation: 2x + 4 = 10  (x = 3)
  const [leftX, setLeftX] = useState(2);
  const [leftOnes, setLeftOnes] = useState(4);
  const [rightOnes, setRightOnes] = useState(10);
  const [tilt, setTilt] = useState(0); // -1 (Left heavy), 0 (Balanced), 1 (Right heavy)
  const [history, setHistory] = useState<string[]>([]);

  const checkBalance = () => {
    // Current value of X is 3 for this level
    const xVal = 3;
    const leftWeight = (leftX * xVal) + leftOnes;
    const rightWeight = rightOnes;

    if (leftWeight > rightWeight) setTilt(-10);
    else if (leftWeight < rightWeight) setTilt(10);
    else setTilt(0);
  };

  const handleOp = (op: string, val: number) => {
    if (op === 'sub') {
        if (leftOnes >= val && rightOnes >= val) {
            setLeftOnes(l => l - val);
            setRightOnes(r => r - val);
            setHistory(h => [...h, `Subtract ${val}`]);
        } else {
            // Error shake?
        }
    }
    if (op === 'div') {
        if (leftX % val === 0 && rightOnes % val === 0 && leftOnes % val === 0) {
            setLeftX(l => l / val);
            setLeftOnes(l => l / val);
            setRightOnes(r => r / val);
            setHistory(h => [...h, `Divide by ${val}`]);
        }
    }
    // Check balance is implicit because we did it to both sides, but let's re-verify visually
    setTimeout(checkBalance, 100);
  };

  const reset = () => {
    setLeftX(2);
    setLeftOnes(4);
    setRightOnes(10);
    setHistory([]);
    setTilt(0);
  };

  const isSolved = leftX === 1 && leftOnes === 0 && tilt === 0;

  return (
    <div className="w-full bg-slate-900/90 border border-blue-500/20 rounded-2xl backdrop-blur-md overflow-hidden flex flex-col">
      <div className="p-4 bg-black/20 border-b border-white/5 flex justify-between items-center">
        <h3 className="font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
            <Scale className="text-blue-400" size={16} /> Equation Balancer
        </h3>
        <button onClick={reset} className="text-slate-400 hover:text-white"><RefreshCw size={14}/></button>
      </div>

      <div className="p-8 flex flex-col items-center">
        
        {/* THE EQUATION DISPLAY */}
        <div className="mb-8 text-3xl font-mono font-bold text-white flex gap-4 items-center">
            <span className="text-blue-400">{leftX > 0 ? `${leftX}x` : ''}</span>
            {leftOnes > 0 && <span>+ {leftOnes}</span>}
            <span className="text-slate-500">=</span>
            <span className="text-yellow-400">{rightOnes}</span>
        </div>

        {/* THE SCALE VISUAL */}
        <div className="relative w-full max-w-lg h-40 mb-8">
            {/* Beam */}
            <motion.div 
                className="absolute top-1/2 left-0 right-0 h-2 bg-slate-600 rounded"
                animate={{ rotate: tilt }}
                transition={{ type: "spring", stiffness: 100 }}
            >
                {/* Left Pan */}
                <div className="absolute left-0 top-2 flex flex-col-reverse items-center -translate-x-1/2 w-32">
                    <div className="w-32 h-1 bg-slate-500" />
                    <div className="w-0.5 h-16 bg-slate-500/50" />
                    {/* Items */}
                    <div className="flex flex-wrap justify-center gap-1 mb-1 w-full bottom-full absolute">
                        <AnimatePresence>
                            {Array.from({length: leftX}).map((_, i) => (
                                <motion.div 
                                    key={`x-${i}`} 
                                    initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                                    className="w-10 h-10 bg-blue-500 rounded border border-blue-300 flex items-center justify-center text-white font-bold"
                                >x</motion.div>
                            ))}
                            {Array.from({length: leftOnes}).map((_, i) => (
                                <motion.div 
                                    key={`1-${i}`} 
                                    initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                                    className="w-6 h-6 bg-yellow-500 rounded-full border border-yellow-300 flex items-center justify-center text-[10px] text-black font-bold"
                                >1</motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Right Pan */}
                <div className="absolute right-0 top-2 flex flex-col-reverse items-center translate-x-1/2 w-32">
                    <div className="w-32 h-1 bg-slate-500" />
                    <div className="w-0.5 h-16 bg-slate-500/50" />
                    {/* Items */}
                    <div className="flex flex-wrap justify-center gap-1 mb-1 w-full bottom-full absolute">
                        <AnimatePresence>
                            {Array.from({length: rightOnes}).map((_, i) => (
                                <motion.div 
                                    key={`r1-${i}`} 
                                    initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                                    className="w-6 h-6 bg-yellow-500 rounded-full border border-yellow-300 flex items-center justify-center text-[10px] text-black font-bold"
                                >1</motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>
            
            {/* Fulcrum */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-2 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[40px] border-b-slate-700" />
        </div>

        {/* CONTROLS */}
        <div className="flex gap-4">
            <button 
                onClick={() => handleOp('sub', 4)}
                disabled={leftOnes < 4 || isSolved}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 rounded-lg flex items-center gap-2 border border-white/10"
            >
                <Minus size={16} /> Subtract 4
            </button>
            <button 
                onClick={() => handleOp('div', 2)}
                disabled={leftX < 2 || leftOnes > 0 || isSolved} // Can only divide once constants are gone (classic strat)
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 rounded-lg flex items-center gap-2 border border-white/10"
            >
                <Divide size={16} /> Divide by 2
            </button>
        </div>
        
        {isSolved && (
            <motion.div 
                initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                className="mt-6 p-4 bg-green-500/20 border border-green-500 rounded-xl flex items-center gap-3 text-green-300"
            >
                <CheckCircle size={24} />
                <span className="font-bold">Solved! x = {rightOnes}</span>
            </motion.div>
        )}

      </div>
    </div>
  );
}