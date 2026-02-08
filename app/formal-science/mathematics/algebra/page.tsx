"use client";
import React from "react";
import Link from "next/link";
import AlgebraBackground2 from "./AlgebraBackground2";
import { 
  ArrowLeft, Variable, FunctionSquare, 
  Grid3X3, Infinity, Braces, Equal, Divide
} from "lucide-react";
import AlgebraBackground from "../page";

const SUBDOMAINS = [
  {
    id: "pre-algebra",
    title: "Pre-Algebra",
    subtitle: "Foundations",
    desc: "Integers, order of operations, and introduction to variables.",
    icon: Divide,
    equation: "2(x + 3) = 10",
    color: "text-emerald-400",
    border: "group-hover:border-emerald-500/50",
    href: "/formal-science/mathematics/algebra/pre-algebra"
  },
  {
    id: "elementary-algebra",
    title: "Integrated Algebra",
    subtitle: "Solving for X",
    desc: "Linear equations, inequalities, graphing, and polynomials.",
    icon: Variable,
    equation: "ax² + bx + c = 0",
    color: "text-blue-400",
    border: "group-hover:border-blue-500/50",
    href: "/formal-science/mathematics/algebra/elementary-algebra"
  },
  {
    id: "linear-algebra",
    title: "Linear Algebra",
    subtitle: "Vectors & Spaces",
    desc: "Vector spaces, linear mappings, eigenvalues, and matrix theory.",
    icon: Grid3X3,
    equation: "Ax = λx",
    color: "text-indigo-400",
    border: "group-hover:border-indigo-500/50",
    href: "/formal-science/mathematics/algebra/linear-algebra"
  },
  {
    id: "abstract-algebra",
    title: "Abstract Algebra",
    subtitle: "Structures",
    desc: "Algebraic structures such as groups, rings, fields, and modules.",
    icon: Infinity,
    equation: "G/Ker(φ) ≅ Im(φ)",
    color: "text-violet-400",
    border: "group-hover:border-violet-500/50",
    href: "/formal-science/mathematics/algebra/abstract-algebra"
  }
];

export default function AlgebraPage() {
  return (
    <main className="relative min-h-screen bg-[#0c0a1f] text-white overflow-hidden font-mono selection:bg-indigo-500/50">
      
      {/* 1. VISUAL ENGINE */}
      
      <AlgebraBackground2 />
      
      {/* OVERLAY: GRAPH PAPER */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-vignette opacity-50 pointer-events-none z-0" />

      {/* 2. UI CONTAINER */}
      <div className="relative z-10 container mx-auto px-6 py-12 min-h-screen flex flex-col items-center">
        
        {/* HEADER CENTERED */}
        <header className="w-full max-w-4xl flex flex-col items-center text-center mb-20 relative">
             <Link href="/math" className="absolute left-0 top-0 flex items-center gap-2 text-xs text-indigo-400 hover:text-white transition-colors uppercase tracking-widest group">
                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Math // Domain_02
             </Link>
             
             <div className="mt-8 flex items-center gap-6">
                 <Braces size={64} strokeWidth={0.5} className="text-indigo-500/50" />
                 <div>
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-indigo-400">
                       ALGEBRA
                    </h1>
                    <div className="flex justify-center gap-4 text-xs text-indigo-300/60 uppercase tracking-widest mt-4">
                        <span>Balance</span>
                        <span className="text-indigo-500">•</span>
                        <span>Structure</span>
                        <span className="text-indigo-500">•</span>
                        <span>Unknowns</span>
                    </div>
                 </div>
                 <Braces size={64} strokeWidth={0.5} className="text-indigo-500/50 rotate-180" />
             </div>
        </header>

        {/* CONTENT GRID - Symmetrical Layout */}
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            
            {SUBDOMAINS.map((item, i) => (
                <Link 
                    key={item.id}
                    href={item.href}
                    className={`
                        group relative flex items-center gap-6 p-8
                        bg-black/20 backdrop-blur-sm border border-white/5 rounded-2xl
                        transition-all duration-300 hover:bg-black/40 hover:-translate-y-1 hover:shadow-2xl
                        ${item.border}
                    `}
                >
                    {/* Visual: Matrix Bracket Left */}
                    <div className="absolute left-0 top-4 bottom-4 w-1 border-l-2 border-t-2 border-b-2 border-white/10 rounded-l group-hover:border-indigo-400/50 transition-colors" />
                    
                    {/* Icon Box */}
                    <div className={`
                        flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center
                        bg-black/50 border border-white/10 group-hover:scale-110 transition-transform
                        ${item.color}
                    `}>
                        <item.icon size={32} strokeWidth={1.5} />
                    </div>

                    {/* Text Content */}
                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                             <h2 className="text-2xl font-bold text-white group-hover:text-indigo-200 transition-colors">
                                {item.title}
                             </h2>
                             <span className="text-[10px] opacity-30 font-bold uppercase tracking-widest">
                                MOD_0{i+1}
                             </span>
                        </div>
                        <div className={`text-xs font-bold uppercase mb-2 opacity-70 ${item.color}`}>
                            {item.subtitle}
                        </div>
                        <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                            {item.desc}
                        </p>
                        
                        {/* Equation Footer */}
                        <div className="inline-block px-3 py-1 bg-white/5 rounded text-xs font-mono text-indigo-300 group-hover:bg-indigo-500/20 group-hover:text-white transition-colors">
                            {item.equation}
                        </div>
                    </div>

                    {/* Visual: Matrix Bracket Right */}
                    <div className="absolute right-0 top-4 bottom-4 w-1 border-r-2 border-t-2 border-b-2 border-white/10 rounded-r group-hover:border-indigo-400/50 transition-colors" />
                </Link>
            ))}

        </div>
        
        {/* FOOTER: THE ULTIMATE EQUATION */}
        <div className="flex items-center gap-8 opacity-40 hover:opacity-100 transition-opacity duration-700">
             <span className="text-2xl font-mono">f(x)</span>
             <Equal size={24} />
             <span className="text-2xl font-mono">y</span>
        </div>

      </div>
    </main>
  );
}