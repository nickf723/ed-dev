"use client";
import Link from "next/link";
import NumberLineBackground from "./_components/NumberLineBackground";
import IntegerElevatorLab from "./_components/IntegerElevatorLab";
import {
  Hash, Thermometer,
  TrendingDown, CheckCircle, XCircle, ArrowLeft
} from "lucide-react";

import Assessment from "@/app/_components/Assessment";
import VocabApplet from "@/app/_components/VocabApplet";
import { integersVocab } from "@/app/_data/vocab/i/integers";
import { integersQuiz } from "./_components/assessment";

type SignRuleProps = {
  a: string;
  b: string;
  res: string;
  icon: typeof CheckCircle;
  color: string;
  bg: string;
  border: string;
};

export default function IntegersPage() {
  return (
    <main className="relative min-h-screen bg-[#0f172a] text-slate-200 overflow-hidden font-sans selection:bg-teal-500/30 pb-32">
      <NumberLineBackground />
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        <header className="mb-16 border-b border-white/10 pb-8 mt-8">
          <Link href="/formal-science/mathematics/algebra/pre-algebra" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors mb-8 bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <ArrowLeft size={12} /> Back to Pre-Algebra
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="p-3 bg-white/5 border border-white/10 rounded-xl shadow-inner">
              <Hash className="text-teal-400" size={24} />
            </span>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-teal-500 font-bold">
              Number line · sign · absolute value
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
            INTEGERS <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-teal-400">&</span><br/>
            NEGATIVES
          </h1>
          <p className="mt-6 text-slate-400 max-w-2xl text-lg font-light leading-relaxed border-l-2 border-white/20 pl-6">
            Integers extend whole-number steps in both directions from zero. Positive integers, negative integers, and zero all live on the same number line, where position tells us order and distance.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
          <div className="lg:col-span-5 space-y-12">
            <div className="p-6 bg-slate-900/60 border border-white/5 rounded-2xl backdrop-blur-md shadow-xl">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Thermometer size={20} className="text-teal-400" /> Values Around a Reference Point
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Negative values describe quantities below a chosen reference point:
              </p>
              <ul className="space-y-4">
                 <li className="flex items-start gap-3 text-sm text-slate-300">
                     <span className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0 shadow-[0_0_10px_red]" />
                     <span><strong>Temperature:</strong> −10°C is colder than 0°C.</span>
                 </li>
                 <li className="flex items-start gap-3 text-sm text-slate-300">
                     <span className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0 shadow-[0_0_10px_red]" />
                     <span><strong>Money:</strong> If a balance is $5 and $10 is spent, the new balance is −$5.</span>
                 </li>
                 <li className="flex items-start gap-3 text-sm text-slate-300">
                     <span className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0 shadow-[0_0_10px_red]" />
                     <span><strong>Elevation:</strong> A location 86 m below sea level can be represented as −86 m.</span>
                 </li>
              </ul>
            </div>

            <div className="p-8 bg-indigo-900/20 border border-indigo-500/20 rounded-2xl shadow-lg relative overflow-hidden">
                <div className="absolute right-0 top-0 text-[100px] text-indigo-500/5 -translate-y-8 translate-x-4 font-black">+</div>
                <h4 className="text-base font-bold text-white uppercase mb-4 relative z-10">Subtracting a Negative</h4>
                <div className="flex gap-4 items-center mb-4 relative z-10 text-xl font-mono">
                    <div className="bg-black/60 px-4 py-2 rounded-lg text-white border border-white/10 shadow-inner">a − (−b)</div>
                    <span className="text-slate-500 font-bold">=</span>
                    <div className="bg-black/60 px-4 py-2 rounded-lg text-teal-400 font-black border border-teal-500/30 shadow-[0_0_15px_rgba(20,184,166,0.2)]">a + b</div>
                </div>
                <p className="text-sm text-slate-300 mt-2 relative z-10">
                    Subtracting a number means adding its opposite. The opposite of a negative number is positive.
                </p>
            </div>

            <div className="flex gap-6 p-6 bg-slate-900/50 border border-white/10 rounded-2xl shadow-lg items-center">
                <div className="text-4xl font-black text-white px-4 border-x-4 border-slate-600 font-mono">x</div>
                <div>
                    <h4 className="text-base font-bold text-teal-400 uppercase mb-2">Absolute Value</h4>
                    <p className="text-sm text-slate-300">
                        Absolute value measures distance from zero, so it is never negative.<br/>
                        <span className="font-mono bg-black/40 px-2 py-1 rounded mt-2 inline-block">|−5| = 5 &nbsp; · &nbsp; |0| = 0</span>
                    </p>
                </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-8">
            <div className="relative">
                <div className="absolute -top-3 left-8 bg-teal-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-[0_0_10px_rgba(20,184,166,0.5)] z-20">
                    Number-line lab
                </div>
                <IntegerElevatorLab />
            </div>

            <div className="p-8 bg-slate-900/50 border border-white/5 rounded-3xl shadow-xl">
               <h4 className="text-base font-bold text-white uppercase mb-6 flex items-center gap-2">
                   <TrendingDown size={20} className="text-slate-400" /> Multiplication Sign Reference
               </h4>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Rule a="Pos" b="Pos" res="Pos" icon={CheckCircle} color="text-teal-400" bg="bg-teal-950/20" border="border-teal-500/20" />
                  <Rule a="Neg" b="Neg" res="Pos" icon={CheckCircle} color="text-teal-400" bg="bg-teal-950/20" border="border-teal-500/20" />
                  <Rule a="Pos" b="Neg" res="Neg" icon={XCircle} color="text-red-400" bg="bg-red-950/20" border="border-red-500/20" />
                  <Rule a="Neg" b="Pos" res="Neg" icon={XCircle} color="text-red-400" bg="bg-red-950/20" border="border-red-500/20" />
               </div>
               <p className="text-xs text-slate-500 text-center mt-6">Same signs produce a positive product; different signs produce a negative product.</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-8">
            <div className="h-4 w-1 bg-teal-500 rounded-full" />
            <h2 className="text-sm font-bold text-teal-300 uppercase tracking-widest">Reference & Check</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="col-span-1">
                <VocabApplet
                    currentDomain="Integers"
                    localTerms={integersVocab || []}
                    accentColor="teal"
                />
            </div>
            <div className="col-span-1 lg:col-span-2">
                 <Assessment
                     title="Knowledge Check: Negatives"
                     questions={integersQuiz || []}
                     accentColor="teal"
                     onComplete={(score, total) => console.log(`Integers Quiz Scored: ${score}/${total}`)}
                 />
            </div>
        </div>
      </div>
    </main>
  );
}

function Rule({ a, b, res, icon: Icon, color, bg, border }: SignRuleProps) {
    return (
        <div className={`flex items-center justify-between p-4 ${bg} rounded-xl border ${border} shadow-inner`}>
            <div className="text-sm font-mono font-bold text-white tracking-widest">
                {a} × {b}
            </div>
            <div className={`flex items-center gap-2 font-black text-lg ${color}`}>
                = {res} <Icon size={18} strokeWidth={2.5} />
            </div>
        </div>
    );
}