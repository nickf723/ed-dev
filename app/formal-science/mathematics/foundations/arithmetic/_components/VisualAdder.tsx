"use client";
import React, { useState, useEffect } from 'react';
import { Plus, Minus, Layers, RotateCcw } from 'lucide-react';

export default function VisualAdder() {
    const [ones, setOnes] = useState(0);
    const [tens, setTens] = useState(0);
    const [isSnapping, setIsSnapping] = useState(false);

    // The Magic Base-10 Snapping Logic
    useEffect(() => {
        if (ones >= 10) {
            setIsSnapping(true);
            const timeout = setTimeout(() => {
                setTens(t => t + 1);
                setOnes(o => o - 10);
                setIsSnapping(false);
            }, 400); // 400ms for the snapping animation to complete
            return () => clearTimeout(timeout);
        }
        if (ones < 0 && tens > 0) {
            // Borrowing logic
            setIsSnapping(true);
            const timeout = setTimeout(() => {
                setTens(t => t - 1);
                setOnes(o => o + 10);
                setIsSnapping(false);
            }, 400);
            return () => clearTimeout(timeout);
        }
        // Hard floor at 0
        if (ones < 0 && tens === 0) setOnes(0);
    }, [ones, tens]);

    const total = tens * 10 + Math.max(0, ones);

    return (
        <div className="w-full bg-zinc-950/80 backdrop-blur-xl border border-cyan-500/20 rounded-2xl overflow-hidden shadow-2xl font-sans">
            <div className="bg-cyan-950/30 border-b border-cyan-500/20 p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-cyan-500/20 border border-cyan-500/30 rounded-lg">
                        <Layers size={18} className="text-cyan-400" />
                    </div>
                    <div>
                        <h3 className="text-white font-bold tracking-wide">Base-10 Engine</h3>
                        <p className="text-[10px] text-cyan-300/60 font-mono uppercase tracking-widest">Physical Place Value</p>
                    </div>
                </div>
                <div className="text-2xl font-black text-white bg-black/50 px-4 py-1 rounded-lg border border-white/10 shadow-inner">
                    {total}
                </div>
            </div>

            <div className="p-6 md:p-8 flex flex-col items-center min-h-[300px] relative">
                
                {/* Visual Block Area */}
                <div className="w-full flex-1 flex flex-col md:flex-row items-center justify-center gap-12 mb-8">
                    
                    {/* Tens Area */}
                    <div className="flex flex-col items-center gap-2">
                        <div className="text-[10px] font-mono text-fuchsia-400 uppercase tracking-widest">Tens</div>
                        <div className="flex gap-2 min-h-[120px] items-end">
                            {Array.from({ length: tens }).map((_, i) => (
                                <div key={`ten-${i}`} className="w-6 h-32 bg-fuchsia-500 border border-fuchsia-400 rounded-sm shadow-[0_0_15px_rgba(217,70,239,0.3)] animate-in fade-in slide-in-from-bottom-4 flex flex-col justify-between p-0.5">
                                    {/* Make it look like a rod of 10 */}
                                    {Array.from({length: 9}).map((_, j) => (
                                        <div key={j} className="w-full h-px bg-fuchsia-900/50" />
                                    ))}
                                </div>
                            ))}
                            {tens === 0 && <div className="text-zinc-700 font-mono text-xs opacity-50 mb-2">Empty</div>}
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="hidden md:block w-px h-32 bg-white/10" />

                    {/* Ones Area */}
                    <div className="flex flex-col items-center gap-2">
                        <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">Ones</div>
                        <div className="flex flex-wrap gap-2 w-[120px] min-h-[120px] content-end">
                            {Array.from({ length: Math.max(0, ones) }).map((_, i) => (
                                <div 
                                    key={`one-${i}`} 
                                    className={`w-6 h-6 bg-cyan-500 border border-cyan-400 rounded-sm shadow-[0_0_10px_rgba(6,182,212,0.3)] transition-all duration-300 
                                        ${isSnapping ? 'translate-x-[-100px] opacity-0 scale-50' : 'animate-in fade-in zoom-in'}
                                    `}
                                />
                            ))}
                            {ones === 0 && !isSnapping && <div className="text-zinc-700 font-mono text-xs opacity-50 mb-2 w-full text-center">Empty</div>}
                        </div>
                    </div>

                </div>

                {/* Controls */}
                <div className="grid grid-cols-3 gap-4 w-full max-w-sm">
                    <button 
                        onClick={() => setOnes(o => o - 1)} disabled={isSnapping || total === 0}
                        className="flex justify-center items-center py-4 bg-rose-500/10 hover:bg-rose-500/20 disabled:opacity-50 border border-rose-500/30 rounded-xl text-rose-400 transition-colors"
                    >
                        <Minus size={24} />
                    </button>
                    <button 
                        onClick={() => { setOnes(0); setTens(0); }}
                        className="flex justify-center items-center py-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-zinc-500 transition-colors"
                    >
                        <RotateCcw size={20} />
                    </button>
                    <button 
                        onClick={() => setOnes(o => o + 1)} disabled={isSnapping}
                        className="flex justify-center items-center py-4 bg-cyan-500/10 hover:bg-cyan-500/20 disabled:opacity-50 border border-cyan-500/30 rounded-xl text-cyan-400 transition-colors shadow-[0_0_15px_rgba(6,182,212,0.1)]"
                    >
                        <Plus size={24} />
                    </button>
                </div>

            </div>
        </div>
    );
}