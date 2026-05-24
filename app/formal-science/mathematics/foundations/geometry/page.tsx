"use client";
import React from 'react';
import Link from 'next/link';
import { 
    ArrowLeft, Shapes, Ruler, Grid3X3, 
    CircleDot, MoveRight, Minus, Square, 
    Triangle, Circle, CheckCircle2, ArrowRight
} from 'lucide-react';
import GeometryBackground from './_components/GeometryBackground';
import AreaPerimeterLab from './_components/AreaPerimeterLab';
import AngleExplorer from './_components/AngleExplorer';

export default function BasicGeometryPage() {
    return (
        <main className="relative min-h-screen bg-[#050a0a] text-zinc-300 font-sans selection:bg-emerald-500/30 overflow-x-hidden pb-32">
            
            <GeometryBackground />

            <div className="relative z-10 max-w-[55rem] mx-auto px-6 py-12 md:py-20">
                
                {/* =========================================
                    HEADER
                ========================================= */}
                <header className="mb-16 backdrop-blur-sm">
                    <Link href="/formal-science/mathematics/foundations" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-[10px] font-black uppercase tracking-widest mb-8 transition-colors bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20">
                        <ArrowLeft size={14} /> Back to Foundations
                    </Link>
                    
                    <div className="flex items-center gap-3 mb-6">
                        <span className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                            <Shapes size={32} />
                        </span>
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400">
                            Core Unit 04
                        </span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-8 drop-shadow-lg">
                        GEOMETRY
                    </h1>
                    <p className="text-xl text-zinc-300 font-medium leading-relaxed">
                        Math isn't just invisible numbers; it is the study of physical space! Geometry is how we build, draw, and measure the entire world around us.
                    </p>
                </header>

                {/* =========================================
                    CHAPTER 1: POINTS & LINES (1D)
                ========================================= */}
                <section className="mb-20">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 border border-cyan-500/30">
                            <CircleDot size={24} strokeWidth={3} />
                        </div>
                        <h2 className="text-3xl font-black text-white tracking-tight">Dimensions of Space</h2>
                    </div>

                    <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-xl mb-8">
                        <p className="text-lg text-zinc-300 leading-relaxed mb-8">
                            Before we can draw a shape, we need a pencil. And the moment that pencil touches the paper, we create the smallest building block in the universe: a point.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            <div className="p-6 bg-black/40 rounded-2xl border border-white/5 flex flex-col gap-3">
                                <div className="text-cyan-400"><CircleDot size={24} /></div>
                                <h3 className="text-xl font-bold text-white">The Point</h3>
                                <p className="text-sm text-zinc-400">An exact location in space. It has no size, no width, and no length. It is simply a "dot."</p>
                            </div>
                            <div className="p-6 bg-black/40 rounded-2xl border border-white/5 flex flex-col gap-3">
                                <div className="text-emerald-400"><Minus size={24} /></div>
                                <h3 className="text-xl font-bold text-white">The Line</h3>
                                <p className="text-sm text-zinc-400">If you drag a point forever in two directions, you get a line. It has length, but no thickness.</p>
                            </div>
                            <div className="p-6 bg-black/40 rounded-2xl border border-white/5 flex flex-col gap-3">
                                <div className="text-emerald-400"><Minus size={24} className="scale-x-50 origin-left" /></div>
                                <h3 className="text-xl font-bold text-white">Line Segment</h3>
                                <p className="text-sm text-zinc-400">A piece of a line that has a clear start and a clear end. (Like a piece of spaghetti).</p>
                            </div>
                            <div className="p-6 bg-black/40 rounded-2xl border border-white/5 flex flex-col gap-3">
                                <div className="text-amber-400"><MoveRight size={24} /></div>
                                <h3 className="text-xl font-bold text-white">The Ray</h3>
                                <p className="text-sm text-zinc-400">Starts at a solid point, but goes on forever in the other direction. (Like a laser pointer!).</p>
                            </div>
                        </div>

                        
                    </div>
                </section>

                {/* =========================================
                    CHAPTER 2: ANGLES
                ========================================= */}
                <section className="mb-20">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 border border-amber-500/30">
                            <Shapes size={24} strokeWidth={3} />
                        </div>
                        <h2 className="text-3xl font-black text-white tracking-tight">Angles & Corners</h2>
                    </div>

                    <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-xl">
                        <p className="text-lg text-zinc-300 leading-relaxed mb-6">
                            When two lines crash into each other, they create a corner. In geometry, we call that corner an <strong>Angle</strong>. We name angles based on how wide they open like a mouth:
                        </p>
                        
                        <ul className="space-y-4 mb-8 text-zinc-300">
                            <li className="flex items-start gap-3 bg-black/20 p-4 rounded-xl border border-white/5">
                                <span className="text-amber-400 font-black mt-1">1.</span>
                                <div>
                                    <strong className="text-white text-lg">Right Angle:</strong> 
                                    <p className="text-sm text-zinc-400 mt-1">A perfect square corner. Look at the corner of your screen or a piece of paper—that is a Right Angle!</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3 bg-black/20 p-4 rounded-xl border border-white/5">
                                <span className="text-amber-400 font-black mt-1">2.</span>
                                <div>
                                    <strong className="text-white text-lg">Acute Angle:</strong> 
                                    <p className="text-sm text-zinc-400 mt-1">A small, sharp, pinched corner. It's "a-cute" little angle!</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3 bg-black/20 p-4 rounded-xl border border-white/5">
                                <span className="text-amber-400 font-black mt-1">3.</span>
                                <div>
                                    <strong className="text-white text-lg">Obtuse Angle:</strong> 
                                    <p className="text-sm text-zinc-400 mt-1">A wide, lazy, leaned-back corner. It opens up wider than a square corner.</p>
                                </div>
                            </li>
                        </ul>
                    <div className="mt-8">
                        <AngleExplorer />
                    </div>
                        
                    </div>

                   
                </section>

                {/* =========================================
                    CHAPTER 3: BASIC SHAPES (2D)
                ========================================= */}
                <section className="mb-20">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-full bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-400 border border-fuchsia-500/30">
                            <Square size={24} strokeWidth={3} />
                        </div>
                        <h2 className="text-3xl font-black text-white tracking-tight">Closing the Loop (Shapes)</h2>
                    </div>

                    <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-xl mb-8">
                        <p className="text-lg text-zinc-300 leading-relaxed mb-8">
                            If you take three or more Line Segments and connect them so there are no open gaps, you create a flat, 2D shape called a <strong>Polygon</strong> ("poly" means many, "gon" means angle).
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-fuchsia-500/10 border border-fuchsia-500/30 p-6 rounded-2xl flex flex-col items-center text-center gap-3">
                                <Triangle size={48} className="text-fuchsia-400" strokeWidth={1.5} />
                                <h3 className="text-xl font-black text-white">Triangles</h3>
                                <p className="text-xs text-zinc-400">3 sides and 3 angles. The strongest shape in engineering!</p>
                            </div>
                            
                            <div className="bg-emerald-500/10 border border-emerald-500/30 p-6 rounded-2xl flex flex-col items-center text-center gap-3">
                                <Square size={48} className="text-emerald-400" strokeWidth={1.5} />
                                <h3 className="text-xl font-black text-white">Quadrilaterals</h3>
                                <p className="text-xs text-zinc-400">Any shape with 4 sides. Includes squares, rectangles, and diamonds.</p>
                            </div>

                            <div className="bg-cyan-500/10 border border-cyan-500/30 p-6 rounded-2xl flex flex-col items-center text-center gap-3">
                                <Circle size={48} className="text-cyan-400" strokeWidth={1.5} />
                                <h3 className="text-xl font-black text-white">Circles</h3>
                                <p className="text-xs text-zinc-400">Not a polygon! A perfect curve where the edge is always the exact same distance from the center.</p>
                            </div>
                        </div>

                        
                    </div>
                </section>

                {/* =========================================
                    CHAPTER 4: MEASURING SPACE + LAB
                ========================================= */}
                <section className="mb-20">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/30">
                            <Grid3X3 size={24} strokeWidth={3} />
                        </div>
                        <h2 className="text-3xl font-black text-white tracking-tight">Area vs. Perimeter</h2>
                    </div>

                    <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-xl mb-8">
                        <p className="text-lg text-zinc-300 leading-relaxed mb-6">
                            Once you have a closed shape, you can measure it in two very different ways depending on what you are trying to build.
                        </p>
                        
                        <div className="flex flex-col md:flex-row gap-6 mb-8">
                            <div className="flex-1 p-6 bg-black/40 border-t-4 border-cyan-400 rounded-b-2xl rounded-t-sm">
                                <span className="text-cyan-400 font-bold uppercase tracking-widest text-xs">The Perimeter</span>
                                <p className="text-zinc-300 mt-2">The total distance around the <strong>outside edge</strong> of the shape. Imagine you are building a wooden fence around a yard. You only care about the edges.</p>
                            </div>

                            <div className="flex-1 p-6 bg-black/40 border-t-4 border-emerald-400 rounded-b-2xl rounded-t-sm">
                                <span className="text-emerald-400 font-bold uppercase tracking-widest text-xs">The Area</span>
                                <p className="text-zinc-300 mt-2">The amount of flat space on the <strong>inside</strong> of the shape. Imagine you are planting grass seeds to fill up the yard. You care about the total space inside.</p>
                            </div>
                        </div>

                        <div className="p-5 bg-black/40 border-l-4 border-emerald-500 text-sm text-zinc-300 font-serif italic rounded-r-xl">
                            <strong>Lab Challenge:</strong> Can you draw a shape that has a tiny Area (inside space) but a massively long Perimeter (outside edge)? Try it below!
                        </div>

                        
                    </div>

                    {/* INTERACTIVE LAB WIDGET */}
                    <div className="bg-black/40 backdrop-blur-xl border border-emerald-500/20 p-4 md:p-8 rounded-[2rem] shadow-2xl relative">
                        <div className="absolute -top-3 left-8 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                            Interactive Lab
                        </div>
                        <AreaPerimeterLab />
                    </div>

                </section>

                {/* =========================================
                    MODULE COMPLETION
                ========================================= */}
                <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/30">
                            <CheckCircle2 size={32} />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-white">Unit Complete!</h3>
                            <p className="text-zinc-400">You've mastered points, lines, angles, and shapes.</p>
                        </div>
                    </div>
                    
                    <Link href="/formal-science/mathematics/foundations/measurement" className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-black uppercase tracking-widest hover:bg-emerald-100 transition-colors">
                        Next: Measurement <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

            </div>
        </main>
    );
}