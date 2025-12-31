"use client";
import Link from "next/link";
import RiemannBackground from "@/app/formal-science/mathematics/calculus/RiemannBackground";
import TangentSurfer from "@/app/formal-science/mathematics/calculus/TangentSurfer";
import { 
  ArrowLeft, Activity, Divide, Sigma, 
  Infinity as Inf, TrendingUp, Anchor 
} from "lucide-react";

export default function CalculusPage() {
  return (
    <main className="relative min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-blue-500/30">
      
      {/* 1. VISUAL ENGINE */}
      <RiemannBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none z-0" />

      {/* 2. HEADER */}
      <header className="relative z-20 flex items-center justify-between px-8 py-6 border-b border-white/10 bg-[#050505]/90 backdrop-blur-md sticky top-0">
         <div className="flex items-center gap-6">
             <Link href="/formal-science/mathematics" className="flex items-center gap-2 text-xs text-blue-500 hover:text-blue-400 transition-colors uppercase tracking-widest font-mono">
                <ArrowLeft size={12} /> Mathematics
             </Link>
             <div className="h-4 w-px bg-white/10" />
             <div className="flex items-center gap-3">
                 <div className="p-1.5 bg-slate-900 border border-blue-500/50 rounded">
                    <Activity size={18} className="text-blue-500" />
                 </div>
                 <h1 className="text-xl font-bold text-white tracking-tight">
                    CALCULUS
                 </h1>
             </div>
         </div>
         <div className="hidden md:block text-[10px] font-mono text-slate-500 uppercase tracking-widest">
            The Mathematics of Change
         </div>
      </header>

      {/* 3. CONTENT GRID */}
      <div className="relative z-10 container mx-auto p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* LEFT: THE CONCEPTS */}
                <div className="lg:col-span-7 space-y-6">
                    
                    {/* HERO CARD */}
                    <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-24 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold text-white mb-4">The Engine of Change</h2>
                            <p className="text-sm text-slate-300 leading-relaxed mb-6">
                                While Algebra solves for unknown numbers, Calculus solves for changing relationships. It allows us to freeze time to see the instant (Differentiation) and sum up the infinitesimals to see the whole (Integration).
                            </p>
                            <div className="flex gap-4 items-center text-xs font-mono text-blue-300">
                                <span className="flex items-center gap-1"><Divide size={12}/> Derivatives</span>
                                <span className="w-1 h-1 bg-white/20 rounded-full" />
                                <span className="flex items-center gap-1"><Sigma size={12}/> Integrals</span>
                                <span className="w-1 h-1 bg-white/20 rounded-full" />
                                <span className="flex items-center gap-1"><Inf size={12}/> Limits</span>
                            </div>
                        </div>
                    </div>

                    {/* FUNDAMENTAL THEOREM */}
                    <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-white/10 p-6 rounded-xl flex items-center justify-between gap-6">
                        <div>
                            <h3 className="font-bold text-white mb-1">The Fundamental Theorem</h3>
                            <p className="text-xs text-slate-400">
                                Isaac Newton and Gottfried Leibniz discovered that Differentiation and Integration are <strong>inverse operations</strong>.
                            </p>
                        </div>
                        <div className="text-2xl font-serif italic text-white/80 bg-black/20 px-4 py-2 rounded border border-white/5">
                            ∫ f'(x) dx = f(x)
                        </div>
                    </div>

                    {/* DOMAINS GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        <div className="bg-slate-900/40 border border-white/5 p-5 rounded-xl hover:border-blue-500/30 transition-colors group">
                            <div className="flex items-center gap-3 mb-2">
                                <TrendingUp className="text-blue-500" size={20} />
                                <h3 className="font-bold text-white">Differentiation</h3>
                            </div>
                            <p className="text-xs text-slate-400">
                                The study of rates of change. How fast is a car moving at exactly 2:00 PM?
                            </p>
                        </div>

                        <div className="bg-slate-900/40 border border-white/5 p-5 rounded-xl hover:border-pink-500/30 transition-colors group">
                            <div className="flex items-center gap-3 mb-2">
                                <Sigma className="text-pink-500" size={20} />
                                <h3 className="font-bold text-white">Integration</h3>
                            </div>
                            <p className="text-xs text-slate-400">
                                The study of accumulation. Calculating the total distance traveled or the volume of a weird shape.
                            </p>
                        </div>

                    </div>
                </div>

                {/* RIGHT: INTERACTIVE LAB */}
                <div className="lg:col-span-5 space-y-6 flex flex-col items-center">
                    
                    {/* WIDGET */}
                    <TangentSurfer />

                    {/* ZENO'S PARADOX */}
                    <div className="bg-slate-900/60 border border-white/10 rounded-xl p-6 w-full">
                        <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                            <Anchor size={18} className="text-slate-400" /> Limits: Taming Infinity
                        </h3>
                        
                        <p className="text-xs text-slate-400 leading-relaxed mb-3">
                            Before calculus, mathematicians struggled with Zeno's Paradox: "To walk across a room, you must first go halfway, then half of the remaining distance... you will never arrive." 
                            <br/><br/>
                            Calculus solved this by proving that an infinite sum of getting smaller steps can equal a <strong>finite</strong> result.
                        </p>
                    </div>

                </div>

            </div>
      </div>
    </main>
  );
}