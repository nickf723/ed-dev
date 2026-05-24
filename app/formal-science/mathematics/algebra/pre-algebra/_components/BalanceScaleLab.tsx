"use client";
import React, { useState } from 'react';
import { Scale, Minus, Divide, RefreshCw, CheckCircle2, Info } from 'lucide-react';

export default function BalanceScaleLab() {
  const [leftX, setLeftX] = useState(2);
  const [leftOnes, setLeftOnes] = useState(4);
  const [rightOnes, setRightOnes] = useState(10);
  const [tilt, setTilt] = useState(0); 
  const [history, setHistory] = useState<string[]>([]);

  const checkBalance = (newLeftX: number, newLeftOnes: number, newRightOnes: number) => {
    const xVal = 3; // The true weight of x in this scenario
    const leftWeight = (newLeftX * xVal) + newLeftOnes;
    const rightWeight = newRightOnes;

    if (leftWeight > rightWeight) setTilt(-15);
    else if (leftWeight < rightWeight) setTilt(15);
    else setTilt(0);
  };

  const handleOp = (op: string) => {
    if (op === 'sub') {
        const nLeftO = leftOnes - 4;
        const nRightO = rightOnes - 4;
        setLeftOnes(nLeftO);
        setRightOnes(nRightO);
        setHistory([...history, `Subtracted 4 from both sides.`]);
        checkBalance(leftX, nLeftO, nRightO);
    }
    if (op === 'div') {
        const nLeftX = leftX / 2;
        const nRightO = rightOnes / 2;
        setLeftX(nLeftX);
        setRightOnes(nRightO);
        setHistory([...history, `Divided both sides by 2.`]);
        checkBalance(nLeftX, leftOnes, nRightO);
    }
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
    <div className="w-full bg-black/60 border border-blue-500/20 rounded-3xl backdrop-blur-xl overflow-hidden flex flex-col shadow-2xl">
      
      {/* Header */}
      <div className="p-4 bg-blue-950/30 border-b border-blue-500/20 flex justify-between items-center">
        <h3 className="font-bold text-blue-400 text-xs uppercase tracking-widest flex items-center gap-2">
            <Scale size={16} /> Equation Balancer
        </h3>
        <button onClick={reset} className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest">
            <RefreshCw size={12}/> Reset
        </button>
      </div>

      <div className="p-6 md:p-8 flex flex-col items-center">
        
        {/* THE EQUATION DISPLAY */}
        <div className={`mb-12 text-4xl md:text-5xl font-mono font-black flex gap-4 items-center transition-colors duration-500 ${isSolved ? 'text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'text-white'}`}>
            <span className="text-blue-400">{leftX > 0 ? (leftX === 1 ? 'x' : `${leftX}x`) : ''}</span>
            {leftOnes > 0 && <span className="text-slate-400">+ {leftOnes}</span>}
            <span className={isSolved ? 'text-emerald-400' : 'text-slate-600'}>=</span>
            <span className="text-yellow-400">{rightOnes}</span>
        </div>

        {/* THE SCALE VISUAL */}
        <div className="relative w-full max-w-lg h-56 mb-8 mt-4">
            
            {/* Beam Mechanism */}
            <div 
                className="absolute top-1/2 left-4 right-4 h-3 bg-slate-700 rounded-full shadow-lg"
                style={{ transform: `rotate(${tilt}deg)`, transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }}
            >
                {/* Left Pan */}
                <div className="absolute left-0 top-1.5 flex flex-col-reverse items-center -translate-x-1/2 w-40" style={{ transform: `rotate(${-tilt}deg)`, transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }}>
                    <div className="w-40 h-2 bg-slate-500 rounded-full shadow-lg" />
                    <div className="w-1 h-24 bg-slate-500/50" />
                    
                    {/* Items on Left Pan */}
                    <div className="flex flex-wrap justify-center content-end gap-1.5 mb-1 w-full bottom-full absolute pb-1">
                        {Array.from({length: leftX}).map((_, i) => (
                            <div key={`x-${i}`} className="w-12 h-12 bg-blue-500 rounded-lg border-b-4 border-blue-700 flex items-center justify-center text-white font-black text-xl shadow-md transition-all duration-300 transform scale-100">x</div>
                        ))}
                        {Array.from({length: leftOnes}).map((_, i) => (
                            <div key={`1-${i}`} className="w-8 h-8 bg-yellow-400 rounded-full border-b-4 border-yellow-600 flex items-center justify-center text-xs text-yellow-900 font-black shadow-md transition-all duration-300 transform scale-100">1</div>
                        ))}
                    </div>
                </div>

                {/* Right Pan */}
                <div className="absolute right-0 top-1.5 flex flex-col-reverse items-center translate-x-1/2 w-40" style={{ transform: `rotate(${-tilt}deg)`, transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }}>
                    <div className="w-40 h-2 bg-slate-500 rounded-full shadow-lg" />
                    <div className="w-1 h-24 bg-slate-500/50" />
                    
                    {/* Items on Right Pan */}
                    <div className="flex flex-wrap justify-center content-end gap-1.5 mb-1 w-[90%] bottom-full absolute pb-1">
                        {Array.from({length: rightOnes}).map((_, i) => (
                            <div key={`r1-${i}`} className="w-8 h-8 bg-yellow-400 rounded-full border-b-4 border-yellow-600 flex items-center justify-center text-xs text-yellow-900 font-black shadow-md transition-all duration-300 transform scale-100">1</div>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Center Fulcrum Base */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-1.5 z-10 flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-slate-400 border-2 border-slate-800 z-20" />
                <div className="w-0 h-0 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent border-b-[60px] border-b-slate-800 -mt-2" />
                <div className="w-24 h-4 bg-slate-900 rounded-full mt-[-4px] shadow-xl" />
            </div>
        </div>

        {/* CONTROLS */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
            <button 
                onClick={() => handleOp('sub')}
                disabled={leftOnes === 0 || isSolved}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-30 disabled:hover:bg-blue-600 rounded-xl flex items-center gap-2 font-bold text-white transition-all"
            >
                <Minus size={18} /> Subtract 4
            </button>
            <button 
                onClick={() => handleOp('div')}
                disabled={leftX < 2 || leftOnes > 0 || isSolved} // Must subtract constants first!
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-30 disabled:hover:bg-blue-600 rounded-xl flex items-center gap-2 font-bold text-white transition-all"
            >
                <Divide size={18} /> Divide by 2
            </button>
        </div>
        
        {/* Info / Success Panel */}
        <div className="w-full max-w-lg mt-2 min-h-[60px]">
            {isSolved ? (
                <div className="p-4 bg-emerald-500/20 border border-emerald-500/50 rounded-xl flex items-center justify-center gap-3 text-emerald-400 animate-in fade-in zoom-in duration-300">
                    <CheckCircle2 size={24} />
                    <span className="font-bold">Perfect! You isolated the variable. x = 3!</span>
                </div>
            ) : (
                <div className="flex items-start gap-3 text-slate-400 text-sm bg-white/5 p-4 rounded-xl border border-white/5">
                    <Info className="text-blue-400 shrink-0" size={18} />
                    <p>
                        {history.length === 0 
                            ? "Use the Inverse Operations below to isolate the blue 'x' blocks. Remember, whatever you do to one side, you must do to the other!" 
                            : history[history.length - 1]}
                    </p>
                </div>
            )}
        </div>

      </div>
    </div>
  );
}