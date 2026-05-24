"use client";
import React from 'react';
import Link from 'next/link';
import { 
    ArrowLeft, Ruler, Weight, Clock, 
    Map, CheckCircle2, ArrowRight, Focus
} from 'lucide-react';
import MeasurementBackground from './_components/MeasurementBackground';
import CoordinateExplorer from './_components/CoordinateExplorer'; // The widget generated above!

export default function MeasurementPage() {
    return (
        <main className="relative min-h-screen bg-[#050a14] text-zinc-300 font-sans selection:bg-blue-500/30 overflow-x-hidden pb-32">
            
            <MeasurementBackground />

            <div className="relative z-10 max-w-[55rem] mx-auto px-6 py-12 md:py-20">
                
                {/* =========================================
                    HEADER
                ========================================= */}
                <header className="mb-16 backdrop-blur-sm">
                    <Link href="/formal-science/mathematics/foundations" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-[10px] font-black uppercase tracking-widest mb-8 transition-colors bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20">
                        <ArrowLeft size={14} /> Back to Foundations
                    </Link>
                    
                    <div className="flex items-center gap-3 mb-6">
                        <span className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.15)]">
                            <Ruler size={32} />
                        </span>
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-400">
                            Core Unit 05
                        </span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-8 drop-shadow-lg">
                        MEASUREMENT
                    </h1>
                    <p className="text-xl text-zinc-300 font-medium leading-relaxed">
                        Math is not just something that happens on a piece of paper. Measurement is how we use numbers to understand the physical universe: how tall, how heavy, how long, and where things are.
                    </p>
                </header>

                {/* =========================================
                    CHAPTER 1: PHYSICAL PROPERTIES
                ========================================= */}
                <section className="mb-20">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 border border-cyan-500/30">
                            <Weight size={24} strokeWidth={3} />
                        </div>
                        <h2 className="text-3xl font-black text-white tracking-tight">The Physical World</h2>
                    </div>

                    <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-xl mb-8">
                        <p className="text-lg text-zinc-300 leading-relaxed mb-8">
                            To measure something, we have to agree on a <strong>Standard Unit</strong>. If I say a table is "5 long," that means nothing! Is it 5 inches? 5 miles? 5 pencils? By agreeing on units, scientists and builders around the world can share exactly how big things are.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                            <div className="bg-cyan-500/10 border border-cyan-500/30 p-6 rounded-2xl flex flex-col items-center text-center gap-3">
                                <Ruler size={40} className="text-cyan-400" strokeWidth={1.5} />
                                <h3 className="text-xl font-black text-white">Length</h3>
                                <p className="text-xs text-zinc-400">How far apart two points are. Measured in <strong>Meters</strong> or <strong>Feet</strong>.</p>
                            </div>
                            
                            <div className="bg-blue-500/10 border border-blue-500/30 p-6 rounded-2xl flex flex-col items-center text-center gap-3">
                                <Weight size={40} className="text-blue-400" strokeWidth={1.5} />
                                <h3 className="text-xl font-black text-white">Mass</h3>
                                <p className="text-xs text-zinc-400">How much "stuff" is inside an object. Measured in <strong>Grams</strong> or <strong>Pounds</strong>.</p>
                            </div>

                            <div className="bg-indigo-500/10 border border-indigo-500/30 p-6 rounded-2xl flex flex-col items-center text-center gap-3">
                                <div className="text-4xl">💧</div>
                                <h3 className="text-xl font-black text-white">Volume</h3>
                                <p className="text-xs text-zinc-400">How much space a liquid or 3D object takes up. Measured in <strong>Liters</strong> or <strong>Gallons</strong>.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* =========================================
                    CHAPTER 2: THE FOURTH DIMENSION
                ========================================= */}
                <section className="mb-20">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-full bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-400 border border-fuchsia-500/30">
                            <Clock size={24} strokeWidth={3} />
                        </div>
                        <h2 className="text-3xl font-black text-white tracking-tight">Measuring Time</h2>
                    </div>

                    <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-xl">
                        <p className="text-lg text-zinc-300 leading-relaxed mb-6">
                            Unlike distance or weight, time is constantly moving forward. To measure it, ancient humans looked at the sky and noticed patterns that repeated themselves.
                        </p>
                        
                        <ul className="space-y-4 text-zinc-300 mb-6">
                            <li className="flex items-center justify-between bg-black/30 p-4 rounded-xl border border-white/5">
                                <span className="font-bold text-white">1 Year</span>
                                <span className="text-fuchsia-400 font-mono text-sm">One orbit of Earth around the Sun</span>
                            </li>
                            <li className="flex items-center justify-between bg-black/30 p-4 rounded-xl border border-white/5">
                                <span className="font-bold text-white">1 Day</span>
                                <span className="text-fuchsia-400 font-mono text-sm">One full spin of the Earth</span>
                            </li>
                            <li className="flex items-center justify-between bg-black/30 p-4 rounded-xl border border-white/5">
                                <span className="font-bold text-white">Hours, Minutes, Seconds</span>
                                <span className="text-fuchsia-400 font-mono text-sm">Human inventions to slice up the day!</span>
                            </li>
                        </ul>
                        
                        <div className="p-4 bg-fuchsia-500/10 border-l-4 border-fuchsia-500 text-sm text-fuchsia-100/90 font-medium rounded-r-xl">
                            💡 Did you know? We group time in <strong>Base-60</strong> (60 seconds, 60 minutes) because the ancient Babylonians invented it over 4,000 years ago!
                        </div>
                    </div>
                </section>

                {/* =========================================
                    CHAPTER 3: THE COORDINATE PLANE
                ========================================= */}
                <section className="mb-20">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 border border-blue-500/30">
                            <Map size={24} strokeWidth={3} />
                        </div>
                        <h2 className="text-3xl font-black text-white tracking-tight">Navigating Space</h2>
                    </div>

                    <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-xl mb-8">
                        <p className="text-lg text-zinc-300 leading-relaxed mb-6">
                            How do you tell a pirate exactly where a treasure is buried? You need a map! In math, our map is called the <strong>Cartesian Coordinate Plane</strong>.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="p-6 bg-black/40 border-t-4 border-rose-400 rounded-b-2xl rounded-t-sm">
                                <span className="text-rose-400 font-bold uppercase tracking-widest text-xs">The X-Axis (Left / Right)</span>
                                <p className="text-zinc-300 mt-2 text-sm">The horizontal line. Positive numbers mean step right. Negative numbers mean step left.</p>
                            </div>

                            <div className="p-6 bg-black/40 border-t-4 border-cyan-400 rounded-b-2xl rounded-t-sm">
                                <span className="text-cyan-400 font-bold uppercase tracking-widest text-xs">The Y-Axis (Up / Down)</span>
                                <p className="text-zinc-300 mt-2 text-sm">The vertical line. Positive numbers mean fly up. Negative numbers mean dig down.</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 bg-blue-900/30 p-4 rounded-xl border border-blue-500/30">
                            <Focus className="text-blue-400 shrink-0" />
                            <p className="text-sm text-blue-100">
                                The exact center where the lines cross is called the <strong>Origin</strong>. Its coordinates are always <strong>(0, 0)</strong>. Every journey starts here!
                            </p>
                        </div>
                    </div>

                    {/* INTERACTIVE LAB WIDGET */}
                    <div className="bg-black/40 backdrop-blur-xl border border-blue-500/20 p-4 md:p-8 rounded-[2rem] shadow-2xl relative">
                        <div className="absolute -top-3 left-8 bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                            Interactive Lab
                        </div>
                        {/* Assuming the widget was saved as CoordinateExplorer.tsx */}
                        <CoordinateExplorer />
                    </div>

                </section>

                {/* =========================================
                    MODULE COMPLETION
                ========================================= */}
                <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 border border-blue-500/30">
                            <CheckCircle2 size={32} />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-white">Unit Complete!</h3>
                            <p className="text-zinc-400">You can now measure and navigate the universe.</p>
                        </div>
                    </div>
                    
                    <Link href="/formal-science/mathematics/foundations/grouping" className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-black uppercase tracking-widest hover:bg-blue-100 transition-colors">
                        Next: Sets & Grouping <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

            </div>
        </main>
    );
}