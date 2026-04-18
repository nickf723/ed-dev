"use client";
import React from "react";
import Link from "next/link";
import MathBackground from "./MathBackground";
import { 
  ArrowLeft, Calculator, Variable, Triangle, 
  BarChart3, Binary, Sigma, Network, 
  Pi, Braces, BookOpen, Zap, Activity
} from "lucide-react";
import GalaxyBackground from "./GalaxyBackground";
import Assessment, { AssessmentQuestion } from "@/app/_components/Assessment"; 
import InteractiveWave from "./_components/InteractiveWave";
import ChaosGame from "./_components/ChaosGame"; // Import the new widget!

// --- CONFIGURATION ---
const SUBDOMAINS = [
  {
    id: "foundations", title: "Foundations", subtitle: "Elementary - Middle",
    desc: "Arithmetic, pre-algebra, and the building blocks of numerical reasoning.",
    icon: Calculator, color: "text-emerald-400", border: "border-emerald-500/30", bg: "bg-emerald-950/20",
    equation: "1 + 1 = 2", href: "mathematics/foundations",
    span: "col-span-1 md:col-span-2 lg:col-span-2" // NEW: Make it wider!
  },
  {
    id: "algebra", title: "Algebra", subtitle: "Variables & Structures",
    desc: "The study of mathematical symbols and the rules for manipulating these symbols.",
    icon: Variable, color: "text-blue-400", border: "border-blue-500/30", bg: "bg-blue-950/20",
    equation: "x = (-b ± √Δ) / 2a", href: "mathematics/algebra",
    span: "col-span-1 md:col-span-2 lg:col-span-2" // NEW: Make it wider!
  },
  {
    id: "geometry", title: "Geometry", subtitle: "Space & Shape",
    desc: "Properties of space, including distance, shape, size, and relative position.",
    icon: Triangle, color: "text-amber-400", border: "border-amber-500/30", bg: "bg-amber-950/20",
    equation: "a² + b² = c²", href: "mathematics/geometry", span: "col-span-1"
  },
  {
    id: "calculus", title: "Calculus", subtitle: "Change & Motion",
    desc: "The mathematical study of continuous change.",
    icon: Sigma, color: "text-rose-400", border: "border-rose-500/30", bg: "bg-rose-950/20",
    equation: "∫ f(x) dx", href: "mathematics/calculus", span: "col-span-1"
  },
  {
    id: "statistics", title: "Statistics", subtitle: "Data & Probability",
    desc: "Collection, analysis, interpretation, and presentation of data.",
    icon: BarChart3, color: "text-purple-400", border: "border-purple-500/30", bg: "bg-purple-950/20",
    equation: "P(A|B) = P(AB)/P(B)", href: "mathematics/statistics", span: "col-span-1"
  },
  {
    id: "number-theory", title: "Number Theory", subtitle: "The Queen of Math",
    desc: "The properties of integers, primes, and arithmetic structures.",
    icon: Binary, color: "text-cyan-400", border: "border-cyan-500/30", bg: "bg-cyan-950/20",
    equation: "e^(iπ) + 1 = 0", href: "mathematics/number-theory", span: "col-span-1"
  },
  {
    id: "discrete", title: "Discrete Math", subtitle: "Logic & Graphs",
    desc: "Structures that are fundamentally discrete rather than continuous.",
    icon: Network, color: "text-lime-400", border: "border-lime-500/30", bg: "bg-lime-950/20",
    equation: "G = (V, E)", href: "mathematics/discrete", span: "col-span-1 lg:col-span-2" // NEW: Make it wider to balance!
  },
  {
    id: "applied", title: "Applied Math", subtitle: "Modeling the Real World",
    desc: "Mathematical methods used in practical applications across science and engineering.",
    icon: Pi, color: "text-indigo-400", border: "border-indigo-500/30", bg: "bg-indigo-950/20",
    equation: "F = ma", href: "mathematics/applied", span: "col-span-1 lg:col-span-2" // NEW: Make it wider to balance!
  }
];

const mathDomainQuiz: AssessmentQuestion[] = [
  { id: 'm1', type: 'mcq', prompt: 'Which branch of mathematics primarily studies continuous change and motion?', options: ['Geometry', 'Algebra', 'Calculus', 'Discrete Math'], correctAnswer: 'Calculus', explanation: 'Calculus utilizes derivatives and integrals to study continuous change.' },
  { id: 'm2', type: 'matching', prompt: 'Match the mathematical symbol to its domain.', leftItems: ['∑ (Sigma)', '∫ (Integral)', 'Δ (Delta)'], rightItems: ['Summation / Statistics', 'Continuous Area / Calculus', 'Change / Algebra'], correctPairs: { '∑ (Sigma)': 'Summation / Statistics', '∫ (Integral)': 'Continuous Area / Calculus', 'Δ (Delta)': 'Change / Algebra' }, explanation: 'Sigma sums, Integral finds area, Delta finds change.' },
  { id: 'm3', type: 'tf', prompt: 'True or False: Number Theory focuses primarily on predicting the outcomes of random events.', correctAnswer: false, explanation: 'False. Statistics and Probability focus on random events. Number Theory is the study of integers.' }
];

export default function MathPage() {
  return (
    <main className="relative min-h-screen bg-[#050508] text-white overflow-hidden font-mono selection:bg-indigo-500/50">
      
      <div className="fixed inset-0 z-0 pointer-events-none">
          <GalaxyBackground />
          <MathBackground />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-vignette opacity-60 pointer-events-none z-0" />

      <div className="relative z-10 container mx-auto px-6 py-12 min-h-screen flex flex-col">
        
        {/* HEADER */}
        <header className="flex flex-col mb-12">
             <Link href="/" className="flex items-center gap-2 text-xs text-indigo-400 hover:text-white transition-colors mb-4 uppercase tracking-widest group w-max">
                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Academic_Core // Domain_01
             </Link>
             <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-indigo-500/20 pb-8">
                 <div className="flex items-center gap-6">
                     <div className="w-16 h-16 border border-indigo-500/50 flex items-center justify-center bg-black/50 backdrop-blur-sm relative overflow-hidden group">
                        <div className="absolute inset-0 bg-indigo-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        <Pi size={32} className="text-indigo-400 relative z-10" />
                     </div>
                     <div>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-white">
                           MATHEMATICS
                        </h1>
                        <div className="flex gap-4 text-xs text-indigo-300/60 uppercase tracking-widest mt-2">
                            <span>Language: Universal</span>
                            <span>Status: Axiomatic</span>
                        </div>
                     </div>
                 </div>
                 
                 {/* NEW: DOMAIN HUD */}
                 <div className="flex gap-4">
                    <div className="bg-black/40 border border-indigo-500/30 rounded-lg p-3 backdrop-blur-sm">
                        <div className="text-[10px] text-indigo-400 uppercase tracking-widest mb-1">Modules</div>
                        <div className="text-xl font-bold text-white">07</div>
                    </div>
                    <div className="bg-black/40 border border-indigo-500/30 rounded-lg p-3 backdrop-blur-sm">
                        <div className="text-[10px] text-indigo-400 uppercase tracking-widest mb-1">Lab Widgets</div>
                        <div className="text-xl font-bold text-white">02</div>
                    </div>
                 </div>
             </div>
        </header>

        

        {/* CONTENT GRID - ASYMMETRICAL */}
        <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-indigo-500" />
                <h2 className="text-lg font-bold text-indigo-300 uppercase tracking-widest">Course Directory</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {SUBDOMAINS.map((item, i) => (
                    <Link 
                        key={item.id}
                        href={item.href}
                        className={`
                            ${item.span}
                            group relative flex flex-col justify-between
                            p-6 border rounded-lg backdrop-blur-md transition-all duration-300
                            hover:-translate-y-1 hover:shadow-2xl hover:bg-opacity-40
                            ${item.border} ${item.bg}
                        `}
                    >
                        <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-white/20" />
                        <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-white/20" />
                        <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-white/20" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-white/20" />

                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-2 rounded border border-white/10 bg-black/40 ${item.color}`}>
                                <item.icon size={20} />
                            </div>
                            <span className="text-[10px] opacity-40 uppercase tracking-widest">{`0${i+1}`}</span>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">{item.title}</h2>
                            <div className={`text-[10px] font-bold uppercase mb-3 opacity-70 ${item.color}`}>{item.subtitle}</div>
                            <p className="text-xs text-zinc-400 leading-relaxed mb-6 h-10 line-clamp-2">{item.desc}</p>
                        </div>

                        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                            <div className="font-mono text-xs opacity-50 group-hover:opacity-100 transition-opacity">{item.equation}</div>
                            <Braces size={14} className="text-zinc-600 group-hover:text-white transition-colors" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
        
        {/* --- THE MATHEMATICS LAB --- */}
        <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-indigo-500" />
                <h2 className="text-lg font-bold text-indigo-300 uppercase tracking-widest">The Interactive Lab</h2>
            </div>
            
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                 <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 h-full">
                     <InteractiveWave />
                 </div>
                 <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 h-full">
                     <ChaosGame />
                 </div>
            </div>
        </div>

        {/* --- THE DAILY HUB --- */}
        <div className="w-full mt-auto grid grid-cols-1 lg:grid-cols-3 gap-8 pb-16">
          <div className="col-span-1 flex flex-col gap-8">
            <div className="bg-black/40 backdrop-blur-md border border-white/5 rounded-3xl p-8 w-full shadow-2xl relative overflow-hidden group hover:border-indigo-500/30 transition-colors">
                 <div className="absolute top-0 right-0 p-4 text-indigo-500/10 group-hover:text-indigo-500/20 transition-colors"><BookOpen size={64} /></div>
                 <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-400 mb-6"><Zap size={14} className="text-amber-400" /> Core Terminology</div>
                 <h4 className="text-4xl font-serif italic text-white mb-2">Theorem</h4>
                 <div className="text-[10px] text-slate-500 font-mono mb-6 uppercase tracking-wider">noun | [ theer-uhm ] | All Subdomains</div>
                 <p className="text-sm text-slate-300 leading-relaxed mb-6">A general proposition or mathematical statement that has been proven true based on previously established statements, such as other theorems, and generally accepted axioms.</p>
                 <div className="p-4 bg-indigo-950/30 border-l-2 border-indigo-500 rounded-r-lg">
                    <p className="text-xs text-indigo-200/80 italic font-serif">"Pythagoras' Theorem is fundamentally tied to the geometry of right triangles."</p>
                 </div>
            </div>
          </div>
          <div className="col-span-1 lg:col-span-2">
            <Assessment title="Knowledge Check: Mathematical Domains" questions={mathDomainQuiz} onComplete={(score, total) => console.log(`Math Domain Quiz Scored: ${score}/${total}`)} />
          </div>
        </div>
        
        {/* FOOTER */}
        <div className="border-t border-indigo-900/30 pt-6 flex justify-between items-center text-[10px] text-indigo-500/60 font-mono uppercase tracking-widest mt-8">
            <span>Q.E.D.</span>
            <span>Fields Medalist Architecture</span>
        </div>

      </div>
    </main>
  );
}