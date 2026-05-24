"use client";
import React, { useState } from 'react';
import { Building, ArrowUp, ArrowDown, Play } from 'lucide-react';

export default function IntegerElevatorLab() {
    const [startFloor, setStartFloor] = useState(0);
    const [operation, setOperation] = useState<'add' | 'subtract'>('add');
    const [modifier, setModifier] = useState(3);
    const [isAnimating, setIsAnimating] = useState(false);
    
    // Calculate the final destination
    const finalFloor = operation === 'add' ? startFloor + modifier : startFloor - modifier;
    
    // Prevent the elevator from breaking through the roof or basement
    const clampedFinal = Math.max(-10, Math.min(10, finalFloor));
    const isOutOfBounds = finalFloor > 10 || finalFloor < -10;

    // Visual State
    const [elevatorPos, setElevatorPos] = useState(0);

    const executeMove = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        
        // 1. Instantly move to start floor (simulating setting the problem up)
        setElevatorPos(startFloor);
        
        // 2. Animate to the final floor
        setTimeout(() => {
            setElevatorPos(clampedFinal);
            setTimeout(() => setIsAnimating(false), 1500); // 1.5s CSS transition
        }, 500);
    };

    return (
        <div className="w-full bg-slate-950/80 backdrop-blur-xl border border-teal-500/20 rounded-3xl overflow-hidden shadow-2xl font-sans">
            
            {/* Header */}
            <div className="bg-slate-900/80 border-b border-white/5 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-teal-500/20 border border-teal-500/30 rounded-lg">
                        <Building size={18} className="text-teal-400" />
                    </div>
                    <h3 className="text-white font-bold tracking-wide">Elevator Logic</h3>
                </div>
            </div>

            <div className="flex flex-col md:flex-row p-6 gap-8 items-center md:items-stretch">
                
                {/* LEFT: Controls */}
                <div className="w-full md:w-1/2 flex flex-col gap-6">
                    
                    {/* Math Readout */}
                    <div className="bg-black/50 p-6 rounded-2xl border border-white/5 flex flex-col items-center justify-center shadow-inner mb-2">
                        <div className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-2">Equation</div>
                        <div className="text-4xl font-black font-mono tracking-tighter text-white flex gap-3 items-center">
                            <span>{startFloor}</span>
                            <span className={operation === 'add' ? 'text-teal-400' : 'text-red-400'}>{operation === 'add' ? '+' : '-'}</span>
                            <span>{modifier < 0 ? `(${modifier})` : modifier}</span>
                            <span className="text-slate-500">=</span>
                            <span className={clampedFinal >= 0 ? 'text-teal-400' : 'text-red-400'}>{finalFloor}</span>
                        </div>
                        {isOutOfBounds && (
                            <div className="text-xs text-red-500 font-bold mt-2 bg-red-500/10 px-2 py-1 rounded">Elevator cannot exceed Floor ±10!</div>
                        )}
                    </div>

                    <div className="space-y-4 bg-slate-900/50 p-5 rounded-2xl border border-white/5">
                        {/* Start Floor */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-400">
                                <span>Start Floor</span>
                                <span className="text-white">{startFloor}</span>
                            </div>
                            <input 
                                type="range" min="-10" max="10" step="1" 
                                value={startFloor} onChange={(e) => setStartFloor(Number(e.target.value))}
                                disabled={isAnimating}
                                className="w-full accent-slate-400 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer disabled:opacity-50"
                            />
                        </div>

                        {/* Operation Toggle */}
                        <div className="flex bg-black/40 p-1 rounded-lg border border-white/5">
                            <button 
                                onClick={() => setOperation('add')} disabled={isAnimating}
                                className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${operation === 'add' ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30' : 'text-slate-500 hover:text-white'}`}
                            >
                                Add (+)
                            </button>
                            <button 
                                onClick={() => setOperation('subtract')} disabled={isAnimating}
                                className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${operation === 'subtract' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'text-slate-500 hover:text-white'}`}
                            >
                                Subtract (-)
                            </button>
                        </div>

                        {/* Modifier */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-400">
                                <span>Action Value</span>
                                <span className="text-white">{modifier}</span>
                            </div>
                            <input 
                                type="range" min="-10" max="10" step="1" 
                                value={modifier} onChange={(e) => setModifier(Number(e.target.value))}
                                disabled={isAnimating}
                                className="w-full accent-slate-400 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer disabled:opacity-50"
                            />
                        </div>
                    </div>

                    <button 
                        onClick={executeMove} disabled={isAnimating}
                        className="w-full py-4 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white font-black uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(20,184,166,0.2)] flex items-center justify-center gap-2"
                    >
                        <Play size={18} /> Execute Move
                    </button>

                </div>

                {/* RIGHT: The Building / Elevator Shaft */}
                <div className="w-full md:w-1/2 flex justify-center py-4">
                    <div className="relative h-[400px] w-32 bg-slate-900 border-4 border-slate-700 rounded-t-xl rounded-b-xl overflow-hidden flex shadow-inner">
                        
                        {/* Floor Markings */}
                        <div className="w-8 border-r border-slate-800 flex flex-col justify-between py-2 bg-slate-950">
                            {Array.from({ length: 21 }).map((_, i) => {
                                const floor = 10 - i;
                                return (
                                    <div key={i} className="flex-1 flex items-center justify-center text-[8px] font-mono font-bold text-slate-500 relative">
                                        {floor}
                                        {floor === 0 && <div className="absolute top-1/2 -translate-y-1/2 right-[-24px] w-6 h-px bg-white/20 z-0" />}
                                    </div>
                                );
                            })}
                        </div>

                        {/* The Shaft */}
                        <div className="flex-1 relative">
                            {/* Ground Line Indicator */}
                            <div className="absolute top-1/2 w-full h-px bg-teal-500/50 shadow-[0_0_10px_rgba(20,184,166,1)]" />

                            {/* The Elevator Car */}
                            <div 
                                className="absolute left-1/2 -translate-x-1/2 w-16 h-8 bg-zinc-200 border-b-4 border-zinc-400 rounded flex flex-col items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.3)] z-10"
                                style={{ 
                                    // Map logic: Floor 10 is top (0%), Floor -10 is bottom (100%)
                                    // We use a math conversion: Y_percent = ((10 - floor) / 20) * 100
                                    top: `calc(${((10 - elevatorPos) / 20) * 100}% - 16px)`, 
                                    transition: isAnimating ? 'top 1.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none' 
                                }}
                            >
                                <div className="w-10 h-4 bg-teal-100 border border-teal-200 rounded flex items-center justify-center">
                                    <span className="text-[10px] font-mono font-black text-teal-900">{elevatorPos}</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}