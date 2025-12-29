"use client";
import Link from "next/link";
import { M } from "@/components/Math";
import LaserBackground from "@/app/natural-science/physics/waves-optics/LaserBackground";
import { ArrowLeft, Sun, Eye, Triangle, Radio, Waves, Glasses } from "lucide-react";

export default function OpticsPage() {
  return (
    <main className="relative min-h-screen bg-slate-950 text-white overflow-hidden selection:bg-green-500/30 font-sans">
      
      {/* 1. VISUAL ENGINE */}
      <LaserBackground />
      
      {/* VIGNETTE & GRAIN */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none z-0 mix-blend-overlay" />
      <div className="absolute inset-0 bg-radial-vignette opacity-50 pointer-events-none z-0" />

      {/* 2. DASHBOARD */}
      <div className="relative z-10 container mx-auto px-6 py-12 flex flex-col min-h-screen">
        
        {/* HEADER */}
        <header className="mb-16 flex justify-between items-end border-b border-white/10 pb-6">
            <div>
                 <Link href="/natural-science/physics" className="flex items-center gap-2 text-xs font-mono text-green-400 hover:text-green-300 transition-colors mb-4 uppercase tracking-widest">
                    <ArrowLeft size={12} /> Physics_Engine // Mod_Light
                 </Link>
                 <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                    OPTICS
                 </h1>
            </div>
            <div className="hidden md:block text-right">
                <div className="text-xs font-mono text-slate-400 mb-1">SPEED OF LIGHT (c)</div>
                <div className="text-2xl font-bold font-mono text-white">299,792,458 m/s</div>
            </div>
        </header>

        {/* 3. GLASS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1">
            
            {/* COLUMN 1: GEOMETRIC (The Lens) */}
            <div className="space-y-8">
                <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl relative overflow-hidden group hover:border-white/20 transition-all">
                    {/* Glow */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
                    
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-white/10 rounded-full border border-white/20 text-yellow-200">
                            <Triangle size={24} className="rotate-180" /> {/* Prism-ish */}
                        </div>
                        <h2 className="text-2xl font-bold">Geometric</h2>
                    </div>
                    
                    <p className="text-slate-300 leading-relaxed mb-8">
                        Treating light as rays. Reflection, refraction, and the imaging systems of lenses and mirrors.
                    </p>

                    <div className="bg-black/20 rounded-xl p-4 border border-white/5">
                        <div className="text-xs font-mono text-yellow-500/80 mb-2 uppercase">Snell's Law</div>
                        <div className="text-xl font-serif text-center"><M>{"n_1 \\sin \\theta_1 = n_2 \\sin \\theta_2"}</M></div>
                    </div>
                </div>

                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-300">Lens Maker's Eq.</span>
                    <Glasses size={20} className="text-slate-500" />
                </div>
            </div>


            {/* COLUMN 2: WAVE (The Ripple) */}
            <div className="lg:col-span-2 space-y-8">
                <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl relative overflow-hidden group hover:border-white/20 transition-all h-full flex flex-col">
                     {/* Glow */}
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full" />

                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-white/10 rounded-full border border-white/20 text-cyan-200">
                            <Waves size={24} />
                        </div>
                        <h2 className="text-2xl font-bold">Wave Optics</h2>
                    </div>

                    <p className="text-slate-300 leading-relaxed mb-8 max-w-2xl">
                        Light travels as an electromagnetic wave. This creates phenomena like diffraction (bending around corners) and interference (patterns of light and dark).
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-auto">
                        <div className="bg-black/20 rounded-xl p-6 border border-white/5 relative overflow-hidden">
                             <div className="absolute inset-0 flex items-center justify-center opacity-20">
                                 {/* Interference Pattern Graphic */}
                                 <div className="w-full h-full bg-[repeating-linear-gradient(90deg,transparent,transparent_10px,#06b6d4_10px,#06b6d4_20px)] blur-sm" />
                             </div>
                             <div className="relative z-10">
                                <div className="text-xs font-mono text-cyan-400 mb-2">DOUBLE SLIT EXPERIMENT</div>
                                <div className="text-lg font-serif"><M>{"d \\sin \\theta = m \\lambda"}</M></div>
                             </div>
                        </div>

                        <div className="bg-black/20 rounded-xl p-6 border border-white/5">
                             <div className="text-xs font-mono text-cyan-400 mb-2">ENERGY OF A PHOTON</div>
                             <div className="text-lg font-serif"><M>{"E = hf = \\frac{hc}{\\lambda}"}</M></div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        {/* 4. FOOTER: SPECTRUM ANALYZER */}
        <div className="mt-8 border-t border-white/10 pt-8">
            <h3 className="text-xs font-mono text-slate-500 mb-4 uppercase tracking-[0.2em] flex items-center gap-2">
                <Sun size={12} /> The Visible Spectrum
            </h3>
            
            {/* The Rainbow Bar */}
            <div className="w-full h-16 rounded-xl relative overflow-hidden group">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-blue-500 via-green-500 via-yellow-500 to-red-600 opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
                
                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 bg-[length:20px_20px]" />

                {/* Markers */}
                <div className="absolute inset-0 flex justify-between px-4 items-center font-mono text-[10px] text-white/70">
                    <span>400nm (UV)</span>
                    <span className="hidden sm:inline">500nm</span>
                    <span className="hidden sm:inline">600nm</span>
                    <span>700nm (IR)</span>
                </div>
                
                {/* Active Scan Line */}
                <div className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_10px_white] left-1/2 animate-[scanline_4s_linear_infinite]" />
            </div>
        </div>

      </div>
    </main>
  );
}