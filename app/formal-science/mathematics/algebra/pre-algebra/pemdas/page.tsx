"use client";
import Link from "next/link";
import OperationStackBackground from "./OperationStackBackground";
import ExpressionSolverLab from "./ExpressionSolverLab";
import { 
  Calculator, ListOrdered, AlertTriangle, 
  ArrowRight, ShieldAlert, CheckCircle2 
} from "lucide-react";

export default function PemdasPage() {
  return (
    <main className="relative min-h-screen bg-[#0f172a] text-slate-200 overflow-hidden font-sans selection:bg-orange-500/30">
      <OperationStackBackground />
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* HERO */}
        <header className="mb-16 border-b border-orange-500/20 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/formal-science/mathematics/algebra" className="p-2 bg-orange-500/10 border border-orange-500/30 rounded hover:bg-orange-500/20 transition-colors">
              <Calculator className="text-orange-400" size={20} />
            </Link>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-orange-400">
              Pre-Algebra // Rules
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
            ORDER OF <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-200">OPERATIONS</span>
          </h1>
          <p className="mt-6 text-slate-400 max-w-2xl text-lg font-light leading-relaxed border-l-2 border-orange-500/50 pl-6">
            Math is a language with strict grammar. You cannot simply read an equation from left to right. You must follow the hierarchy of command, known as <strong>PEMDAS</strong>.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: THEORY */}
          <div className="lg:col-span-5 space-y-12">
            
            {/* The Pyramid */}
            <div className="p-6 bg-slate-900/60 border border-white/5 rounded-2xl backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <ListOrdered size={20} className="text-orange-400" /> The Hierarchy
              </h3>
              
              <div className="space-y-2">
                  <Level char="P" name="Parentheses" desc="Groupings first. ( ) { } [ ]" color="bg-orange-500" />
                  <Level char="E" name="Exponents" desc="Powers and Square Roots. x² √" color="bg-amber-500" />
                  <Level char="MD" name="Mult / Div" desc="Left to Right! They are equal rank." color="bg-sky-500" />
                  <Level char="AS" name="Add / Sub" desc="Left to Right! They are equal rank." color="bg-slate-500" />
              </div>

              

              <div className="mt-6 p-3 bg-red-900/20 border border-red-500/30 rounded-lg flex gap-3">
                  <ShieldAlert className="text-red-400 shrink-0" />
                  <div>
                      <h4 className="text-xs font-bold text-red-300 uppercase">The Left-To-Right Trap</h4>
                      <p className="text-[10px] text-red-200/70 mt-1">
                          The most common mistake: Thinking Multiplication comes before Division. They are <strong>Equal</strong>. You just do whichever comes first from left to right.
                      </p>
                  </div>
              </div>
            </div>

            {/* Example Card */}
            <div className="p-6 bg-slate-900/50 border border-white/5 rounded-2xl">
               <h4 className="text-sm font-bold text-white uppercase mb-4">Why it Matters</h4>
               <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Without rules, one equation could have two answers.
               </p>
               <div className="font-mono bg-black/40 p-4 rounded-xl text-center space-y-4">
                  <div className="text-xl text-white font-bold">10 - 2 + 5</div>
                  <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
                      <div className="opacity-50">
                          <div className="text-xs text-red-400 uppercase font-bold mb-1">Wrong</div>
                          <div>10 - 7</div>
                          <div className="text-red-400 font-bold">= 3</div>
                      </div>
                      <div>
                          <div className="text-xs text-emerald-400 uppercase font-bold mb-1">Correct</div>
                          <div>8 + 5</div>
                          <div className="text-emerald-400 font-bold">= 13</div>
                      </div>
                  </div>
               </div>
            </div>

          </div>

          {/* RIGHT: THE LAB */}
          <div className="lg:col-span-7 space-y-8">
            <ExpressionSolverLab />
            
            <div className="grid grid-cols-2 gap-4">
               <div className="p-4 bg-slate-900/60 border border-white/10 rounded-xl">
                   <div className="text-orange-400 font-black text-lg mb-1">GEMA</div>
                   <p className="text-xs text-slate-400">
                       A modern alternative acronym: <strong>G</strong>rouping, <strong>E</strong>xponents, <strong>M</strong>ultiplication (includes Div), <strong>A</strong>ddition (includes Sub).
                   </p>
               </div>
               <div className="p-4 bg-slate-900/60 border border-white/10 rounded-xl">
                   <div className="text-orange-400 font-black text-lg mb-1">Implied Mult</div>
                   <p className="text-xs text-slate-400">
                       A number touching a parenthesis means multiply. <br/>
                       <code>2(3)</code> is the same as <code>2 × 3</code>.
                   </p>
               </div>
            </div>

            

          </div>

        </div>
      </div>
    </main>
  );
}

function Level({ char, name, desc, color }: any) {
    return (
        <div className="flex items-center gap-4 p-2 bg-black/20 rounded-lg group hover:bg-white/5 transition-colors">
            <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center text-white font-black text-lg shadow-lg`}>
                {char}
            </div>
            <div>
                <div className="text-sm font-bold text-white">{name}</div>
                <div className="text-[10px] text-slate-400 group-hover:text-slate-300 transition-colors">{desc}</div>
            </div>
        </div>
    )
}