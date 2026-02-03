"use client";
import Link from "next/link";
import AlgebraFlowBackground from "./AlgebraFlowBackground";
import InverseOpTrainer from "./InverseOpTrainer";
import { 
  Scale, Key, ShieldCheck, 
  ArrowRight, Undo2, ArrowLeftRight 
} from "lucide-react";

export default function OneStepEquationsPage() {
  return (
    <main className="relative min-h-screen bg-[#022c22] text-slate-200 overflow-hidden font-sans selection:bg-emerald-500/30">
      <AlgebraFlowBackground />
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* HERO */}
        <header className="mb-16 border-b border-emerald-500/20 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/formal-science/mathematics/algebra" className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded hover:bg-emerald-500/20 transition-colors">
              <Scale className="text-emerald-400" size={20} />
            </Link>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-400">
              Pre-Algebra // Solving
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
            ONE STEP <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-200">EQUATIONS</span>
          </h1>
          <p className="mt-6 text-slate-300 max-w-2xl text-lg font-light leading-relaxed border-l-2 border-emerald-500/50 pl-6">
            The goal of Algebra is to be alone. We want the variable ($x$) by itself on one side of the equals sign. To do that, we must unlock the numbers trapping it.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: THEORY */}
          <div className="lg:col-span-5 space-y-12">
            
            {/* The Inverse Operation Concept */}
            <div className="p-6 bg-slate-900/60 border border-white/5 rounded-2xl backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Undo2 size={20} className="text-emerald-400" /> The Undo Button
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                In math, every action has an opposite that cancels it out. This is called an <strong>Inverse Operation</strong>.
              </p>
              
              <div className="space-y-2">
                  <OperationPair a="Addition (+)" b="Subtraction (-)" />
                  <OperationPair a="Multiplication (×)" b="Division (÷)" />
                  <OperationPair a="Squaring (x²)" b="Square Root (√)" />
              </div>
            </div>

            

            {/* The Process Card */}
            <div className="p-6 bg-emerald-900/20 border border-emerald-500/20 rounded-xl">
                <h4 className="text-sm font-bold text-white uppercase mb-4 flex items-center gap-2">
                    <Key size={16} className="text-emerald-400" /> How to Pick the Lock
                </h4>
                <ol className="space-y-4 text-xs text-slate-300">
                    <li className="flex gap-3">
                        <span className="font-bold text-emerald-400">1.</span>
                        <span>Look at what is happening to $x$. <br/><span className="text-slate-500 italic">(e.g., "It is being multiplied by 4")</span></span>
                    </li>
                    <li className="flex gap-3">
                        <span className="font-bold text-emerald-400">2.</span>
                        <span>Do the <strong>Opposite</strong> to both sides. <br/><span className="text-slate-500 italic">(e.g., "Divide by 4")</span></span>
                    </li>
                    <li className="flex gap-3">
                        <span className="font-bold text-emerald-400">3.</span>
                        <span>Check your answer.</span>
                    </li>
                </ol>
            </div>

            {/* Scale Analogy Reminder */}
            <div className="flex gap-4 p-4 bg-slate-900/50 border border-white/10 rounded-xl">
                <ArrowLeftRight className="text-emerald-500 shrink-0" />
                <div>
                    <h4 className="text-sm font-bold text-white uppercase">The Balance Rule</h4>
                    <p className="text-xs text-slate-400 mt-1">
                        Whatever you do to the Left side, you <strong>MUST</strong> do to the Right side.
                    </p>
                </div>
            </div>

          </div>

          {/* RIGHT: THE LAB */}
          <div className="lg:col-span-7 space-y-8">
            <InverseOpTrainer />
            
            <div className="p-6 bg-slate-900/50 border border-white/5 rounded-2xl">
               <h4 className="text-sm font-bold text-white uppercase mb-4 flex items-center gap-2">
                   <ShieldCheck size={16} className="text-slate-400" /> Why this works?
               </h4>
               <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  We aren't just making numbers disappear magicially. We are creating <strong>Identities</strong>.
               </p>
               <div className="grid grid-cols-2 gap-4">
                   <div className="bg-black/40 p-3 rounded">
                       <div className="text-[10px] text-emerald-400 uppercase font-bold mb-1">Add/Sub</div>
                       <div className="text-sm text-white">5 - 5 = 0</div>
                       <div className="text-[9px] text-slate-500 mt-1">Creates Zero (Disappears)</div>
                   </div>
                   <div className="bg-black/40 p-3 rounded">
                       <div className="text-[10px] text-emerald-400 uppercase font-bold mb-1">Mult/Div</div>
                       <div className="text-sm text-white">4 ÷ 4 = 1</div>
                       <div className="text-[9px] text-slate-500 mt-1">Creates One (1x is just x)</div>
                   </div>
               </div>
            </div>
            
            
          </div>

        </div>
      </div>
    </main>
  );
}

function OperationPair({ a, b }: any) {
    return (
        <div className="flex items-center justify-between p-3 bg-black/40 rounded border border-white/5 hover:border-emerald-500/30 transition-colors">
            <span className="text-xs font-bold text-white">{a}</span>
            <ArrowLeftRight size={14} className="text-slate-500" />
            <span className="text-xs font-bold text-emerald-400">{b}</span>
        </div>
    )
}