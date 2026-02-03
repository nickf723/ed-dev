"use client";
import Link from "next/link";
import NumberLineBackground from "./NumberLineBackground";
import IntegerElevatorLab from "./IntegerElevatorLab";
import { 
  Hash, ArrowRight, Thermometer, 
  TrendingDown, CheckCircle, XCircle 
} from "lucide-react";

export default function IntegersPage() {
  return (
    <main className="relative min-h-screen bg-[#0f172a] text-slate-200 overflow-hidden font-sans selection:bg-teal-500/30">
      <NumberLineBackground />
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* HERO */}
        <header className="mb-16 border-b border-white/10 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/formal-science/mathematics/algebra" className="p-2 bg-white/10 border border-white/20 rounded hover:bg-white/20 transition-colors">
              <Hash className="text-white" size={20} />
            </Link>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-400">
              Pre-Algebra // Foundations
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
            INTEGERS <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-teal-400">&</span><br/>
            NEGATIVES
          </h1>
          <p className="mt-6 text-slate-400 max-w-2xl text-lg font-light leading-relaxed border-l-2 border-white/20 pl-6">
            Numbers don't stop at zero. Just like you can go underground or owe money, numbers can go negative. An integer is any whole number, positive or negative, including zero.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: THEORY */}
          <div className="lg:col-span-5 space-y-12">
            
            {/* The Concept */}
            <div className="p-6 bg-slate-900/60 border border-white/5 rounded-2xl backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Thermometer size={20} className="text-teal-400" /> Real World Context
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                Negative numbers aren't imaginary. We use them every day:
              </p>
              <ul className="space-y-3">
                 <li className="flex items-center gap-3 text-xs text-slate-400">
                     <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                     <span><strong>Temperature:</strong> -10°C is colder than 0°C.</span>
                 </li>
                 <li className="flex items-center gap-3 text-xs text-slate-400">
                     <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                     <span><strong>Money:</strong> If you have $5 and spend $10, you have -$5 (Debt).</span>
                 </li>
                 <li className="flex items-center gap-3 text-xs text-slate-400">
                     <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                     <span><strong>Elevation:</strong> Death Valley is -86m (Below Sea Level).</span>
                 </li>
              </ul>
            </div>
            
            

            {/* The Rules of Signs Card */}
            <div className="p-6 bg-indigo-900/20 border border-indigo-500/20 rounded-xl">
                <h4 className="text-sm font-bold text-white uppercase mb-4">The Double Negative Rule</h4>
                <div className="flex gap-4 items-center mb-2">
                    <div className="bg-black/40 px-3 py-1 rounded font-mono text-red-400">-</div>
                    <span className="text-slate-500">+</span>
                    <div className="bg-black/40 px-3 py-1 rounded font-mono text-red-400">-</div>
                    <span className="text-slate-500">=</span>
                    <div className="bg-black/40 px-3 py-1 rounded font-mono text-teal-400 font-bold">+</div>
                </div>
                <p className="text-xs text-slate-400 mt-2 italic">
                    "Subtracting a negative is like removing a debt. You get richer!"
                </p>
            </div>

            {/* Absolute Value */}
            <div className="flex gap-4 p-4 bg-slate-900/50 border border-white/10 rounded-xl">
                <div className="text-2xl font-black text-white px-2 border-x-2 border-slate-500">x</div>
                <div>
                    <h4 className="text-sm font-bold text-white uppercase">Absolute Value</h4>
                    <p className="text-xs text-slate-400 mt-1">
                        Distance from zero. Distance is always positive.<br/>
                        |-5| = 5.
                    </p>
                </div>
            </div>

          </div>

          {/* RIGHT: THE LAB */}
          <div className="lg:col-span-7 space-y-8">
            <IntegerElevatorLab />
            
            <div className="p-6 bg-slate-900/50 border border-white/5 rounded-2xl">
               <h4 className="text-sm font-bold text-white uppercase mb-4 flex items-center gap-2">
                   <TrendingDown size={16} className="text-slate-400" /> Cheat Sheet: Multiplication
               </h4>
               <div className="grid grid-cols-2 gap-4">
                  <Rule a="Pos" b="Pos" res="Pos" icon={CheckCircle} color="text-teal-400" />
                  <Rule a="Neg" b="Neg" res="Pos" icon={CheckCircle} color="text-teal-400" />
                  <Rule a="Pos" b="Neg" res="Neg" icon={XCircle} color="text-red-400" />
                  <Rule a="Neg" b="Pos" res="Neg" icon={XCircle} color="text-red-400" />
               </div>
            </div>
            
            
          </div>

        </div>
      </div>
    </main>
  );
}

function Rule({ a, b, res, icon: Icon, color }: any) {
    return (
        <div className="flex items-center justify-between p-3 bg-black/40 rounded border border-white/5">
            <div className="text-xs font-mono text-slate-400">
                {a} × {b}
            </div>
            <div className={`flex items-center gap-2 font-bold ${color}`}>
                = {res} <Icon size={14} />
            </div>
        </div>
    )
}