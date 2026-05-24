"use client";
import React, { useState } from 'react';
import { Grid3X3, ArrowRight, Equal, Combine } from 'lucide-react';
import { M } from "@/app/_components/Math";

export default function MatrixMultiplierLab() {
    // Transformation Matrix A (2x2)
    const [a11, setA11] = useState(1);
    const [a12, setA12] = useState(2);
    const [a21, setA21] = useState(3);
    const [a22, setA22] = useState(4);

    // Vector B (2x1)
    const [b1, setB1] = useState(5);
    const [b2, setB2] = useState(6);

    // Resultant Vector C (2x1)
    const c1 = (a11 * b1) + (a12 * b2);
    const c2 = (a21 * b1) + (a22 * b2);

    return (
        <div className="w-full bg-slate-950/80 backdrop-blur-2xl border border-emerald-500/30 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(16,185,129,0.15)] flex flex-col relative z-10">
            
            {/* HEADER */}
            <div className="bg-emerald-950/30 border-b border-emerald-500/20 p-4 flex items-center gap-3">
                <div className="p-2 bg-emerald-500/20 border border-emerald-500/30 rounded-lg">
                    <Grid3X3 size={18} className="text-emerald-400" />
                </div>
                <h3 className="text-white font-bold tracking-wide text-sm uppercase">The Multiplication Engine</h3>
            </div>

            <div className="p-6 md:p-8 flex flex-col items-center gap-8">
                
                {/* THE MATRIX UI */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 w-full">
                    
                    {/* Matrix A Input */}
                    <div className="flex flex-col items-center">
                        <div className="text-[10px] text-emerald-500 uppercase tracking-widest font-bold mb-2">Matrix A (2×2)</div>
                        <div className="relative flex items-center justify-center p-4 bg-black/60 rounded-xl border border-white/5 shadow-inner">
                            <div className="w-2 absolute left-2 top-2 bottom-2 border-l-2 border-t-2 border-b-2 border-emerald-500/50 rounded-l" />
                            
                            <div className="grid grid-cols-2 gap-4 relative z-10 px-4">
                                <input type="number" value={a11} onChange={e => setA11(Number(e.target.value))} className="w-12 bg-emerald-950/50 border border-emerald-500/30 text-white text-center font-mono font-bold rounded outline-none focus:border-emerald-400" />
                                <input type="number" value={a12} onChange={e => setA12(Number(e.target.value))} className="w-12 bg-emerald-950/50 border border-emerald-500/30 text-white text-center font-mono font-bold rounded outline-none focus:border-emerald-400" />
                                <input type="number" value={a21} onChange={e => setA21(Number(e.target.value))} className="w-12 bg-emerald-950/50 border border-emerald-500/30 text-white text-center font-mono font-bold rounded outline-none focus:border-emerald-400" />
                                <input type="number" value={a22} onChange={e => setA22(Number(e.target.value))} className="w-12 bg-emerald-950/50 border border-emerald-500/30 text-white text-center font-mono font-bold rounded outline-none focus:border-emerald-400" />
                            </div>

                            <div className="w-2 absolute right-2 top-2 bottom-2 border-r-2 border-t-2 border-b-2 border-emerald-500/50 rounded-r" />
                        </div>
                    </div>

                    <Combine className="text-zinc-600 hidden md:block" size={24} />

                    {/* Vector B Input */}
                    <div className="flex flex-col items-center">
                        <div className="text-[10px] text-emerald-500 uppercase tracking-widest font-bold mb-2">Vector B (2×1)</div>
                        <div className="relative flex items-center justify-center p-4 bg-black/60 rounded-xl border border-white/5 shadow-inner">
                            <div className="w-2 absolute left-2 top-2 bottom-2 border-l-2 border-t-2 border-b-2 border-emerald-500/50 rounded-l" />
                            
                            <div className="grid grid-cols-1 gap-4 relative z-10 px-4">
                                <input type="number" value={b1} onChange={e => setB1(Number(e.target.value))} className="w-12 bg-sky-950/50 border border-sky-500/30 text-white text-center font-mono font-bold rounded outline-none focus:border-sky-400" />
                                <input type="number" value={b2} onChange={e => setB2(Number(e.target.value))} className="w-12 bg-sky-950/50 border border-sky-500/30 text-white text-center font-mono font-bold rounded outline-none focus:border-sky-400" />
                            </div>

                            <div className="w-2 absolute right-2 top-2 bottom-2 border-r-2 border-t-2 border-b-2 border-emerald-500/50 rounded-r" />
                        </div>
                    </div>

                    <Equal className="text-emerald-500 hidden md:block" size={24} />

                    {/* Result Vector C */}
                    <div className="flex flex-col items-center">
                        <div className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold mb-2">Result C (2×1)</div>
                        <div className="relative flex items-center justify-center p-4 bg-emerald-950/30 rounded-xl border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                            <div className="w-2 absolute left-2 top-2 bottom-2 border-l-2 border-t-2 border-b-2 border-emerald-400 rounded-l" />
                            
                            <div className="grid grid-cols-1 gap-4 relative z-10 px-4 font-mono font-black text-2xl text-emerald-300">
                                <div>{c1}</div>
                                <div>{c2}</div>
                            </div>

                            <div className="w-2 absolute right-2 top-2 bottom-2 border-r-2 border-t-2 border-b-2 border-emerald-400 rounded-r" />
                        </div>
                    </div>
                </div>

                {/* THE BREAKDOWN (The Dot Products) */}
                <div className="w-full max-w-2xl bg-black/80 rounded-2xl border border-white/5 p-6 mt-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 border-b border-white/10 pb-2">Dot Product Breakdown</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-sm">
                        {/* Top Row Calculation */}
                        <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                            <div className="text-[10px] text-emerald-500 mb-2 uppercase tracking-widest">Row 1 • Col 1 = C₁</div>
                            <div className="flex items-center gap-2 text-white">
                                (<span className="text-emerald-300">{a11}</span> × <span className="text-sky-300">{b1}</span>) + (<span className="text-emerald-300">{a12}</span> × <span className="text-sky-300">{b2}</span>)
                            </div>
                            <div className="mt-2 text-emerald-400 font-bold border-t border-white/10 pt-2">
                                {a11 * b1} + {a12 * b2} = {c1}
                            </div>
                        </div>

                        {/* Bottom Row Calculation */}
                        <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                            <div className="text-[10px] text-emerald-500 mb-2 uppercase tracking-widest">Row 2 • Col 1 = C₂</div>
                            <div className="flex items-center gap-2 text-white">
                                (<span className="text-emerald-300">{a21}</span> × <span className="text-sky-300">{b1}</span>) + (<span className="text-emerald-300">{a22}</span> × <span className="text-sky-300">{b2}</span>)
                            </div>
                            <div className="mt-2 text-emerald-400 font-bold border-t border-white/10 pt-2">
                                {a21 * b1} + {a22 * b2} = {c2}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}