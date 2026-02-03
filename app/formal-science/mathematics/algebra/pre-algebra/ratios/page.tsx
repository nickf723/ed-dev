"use client";
import Link from "next/link";
import ScalingGridBackground from "./ScalingGridBackground";
import ProportionSolverLab from "./ProportionSolverLab";
import { 
  Percent, Scale, Divide, X, 
  ArrowRight, Box, ShoppingCart, Map 
} from "lucide-react";

export default function RatiosPage() {
  return (
    <main className="relative min-h-screen bg-[#172554] text-slate-200 overflow-hidden font-sans selection:bg-rose-500/30">
      <ScalingGridBackground />
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* HERO */}
        <header className="mb-16 border-b border-rose-500/20 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/formal-science/mathematics/algebra" className="p-2 bg-rose-500/10 border border-rose-500/30 rounded hover:bg-rose-500/20 transition-colors">
              <Percent className="text-rose-400" size={20} />
            </Link>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-rose-400">
              Pre-Algebra // Scale
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
            RATIOS <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-200">&</span><br/>
            PROPORTIONS
          </h1>
          <p className="mt-6 text-slate-300 max-w-2xl text-lg font-light leading-relaxed border-l-2 border-rose-500/50 pl-6">
            A ratio is just a comparison of two things. A proportion is a promise that the relationship stays the same, even if the numbers get bigger. It's the math of "Zooming In."
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: THEORY */}
          <div className="lg:col-span-5 space-y-12">
            
            {/* The Concept */}
            <div className="p-6 bg-slate-900/60 border border-white/5 rounded-2xl backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Scale size={20} className="text-rose-400" /> Comparison
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                We can write ratios in three ways:
              </p>
              <div className="grid grid-cols-3 gap-2 text-center">
                 <div className="p-2 bg-black/40 rounded border border-white/10 font-bold text-white">2 to 3</div>
                 <div className="p-2 bg-black/40 rounded border border-white/10 font-bold text-white">2 : 3</div>
                 <div className="p-2 bg-black/40 rounded border border-white/10 font-bold text-white">2 / 3</div>
              </div>
              <p className="text-xs text-slate-400 mt-4 text-center">
                  "For every 2 of these, we have 3 of those."
              </p>
            </div>
            
            

            {/* Unit Rate */}
            <div className="p-6 bg-blue-900/20 border border-blue-500/20 rounded-xl">
                <h4 className="text-sm font-bold text-white uppercase mb-2 flex items-center gap-2">
                    <ShoppingCart size={16} className="text-blue-400" /> The Unit Rate
                </h4>
                <p className="text-xs text-slate-400 mb-3">
                    The most useful ratio is "Per One." It helps us compare prices.
                </p>
                <div className="bg-black/40 p-3 rounded font-mono text-xs">
                    <div className="flex justify-between border-b border-white/10 pb-1 mb-1">
                        <span>$12 for 4 Apples</span>
                        <span className="text-red-400">Confusing</span>
                    </div>
                    <div className="flex justify-between font-bold text-blue-300">
                        <span>$3 per Apple</span>
                        <span>Unit Rate</span>
                    </div>
                </div>
            </div>

            {/* Map Scale */}
            <div className="flex gap-4 p-4 bg-slate-900/50 border border-white/10 rounded-xl">
                <Map className="text-rose-500 shrink-0" />
                <div>
                    <h4 className="text-sm font-bold text-white uppercase">Scale Drawings</h4>
                    <p className="text-xs text-slate-400 mt-1">
                        Maps use ratios (1 inch = 100 miles) to fit the world into your pocket without distorting the shape.
                    </p>
                </div>
            </div>

          </div>

          {/* RIGHT: THE LAB */}
          <div className="lg:col-span-7 space-y-8">
            <ProportionSolverLab />
            
            <div className="p-6 bg-slate-900/50 border border-white/5 rounded-2xl">
               <h4 className="text-sm font-bold text-white uppercase mb-4 flex items-center gap-2">
                   <X size={16} className="text-rose-400" /> The Butterfly Method
               </h4>
               <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  To solve for a missing number ($x$) in a proportion, use <strong>Cross Multiplication</strong>.
               </p>
               
               <div className="flex items-center justify-center gap-8 font-mono text-sm">
                   <div className="flex flex-col items-center">
                        <span className="text-rose-400">3</span>
                        <div className="w-6 h-px bg-white/20 my-1"/>
                        <span className="text-white">4</span>
                   </div>
                   <span>=</span>
                   <div className="flex flex-col items-center">
                        <span className="text-white">x</span>
                        <div className="w-6 h-px bg-white/20 my-1"/>
                        <span className="text-rose-400">8</span>
                   </div>
                   <ArrowRight size={16} className="text-slate-600" />
                   <div className="bg-black/40 p-3 rounded text-rose-300">
                       3 • 8 = 4 • x
                   </div>
               </div>
            </div>
            
            
          </div>

        </div>
      </div>
    </main>
  );
}