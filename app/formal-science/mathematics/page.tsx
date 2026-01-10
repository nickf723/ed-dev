"use client";
import React from "react";
import Link from "next/link";
import MathBackground from "./MathBackground";
import { 
  ArrowLeft, Calculator, Variable, Triangle, 
  BarChart3, Binary, Sigma, Network, 
  FunctionSquare, Pi, Braces
} from "lucide-react";
import GalaxyBackground from "./GalaxyBackground";

// --- CONFIGURATION ---
const SUBDOMAINS = [
  {
    id: "foundations",
    title: "Foundations",
    subtitle: "Elementary - Middle",
    desc: "Arithmetic, pre-algebra, and the building blocks of numerical reasoning.",
    icon: Calculator, // Or Blocks
    color: "text-emerald-400",
    border: "border-emerald-500/30",
    bg: "bg-emerald-950/20",
    equation: "1 + 1 = 2",
    href: "mathematics/foundations"
  },
  {
    id: "algebra",
    title: "Algebra",
    subtitle: "Variables & Structures",
    desc: "The study of mathematical symbols and the rules for manipulating these symbols.",
    icon: Variable,
    color: "text-blue-400",
    border: "border-blue-500/30",
    bg: "bg-blue-950/20",
    equation: "x = (-b ± √Δ) / 2a",
    href: "mathematics/algebra"
  },
  {
    id: "geometry",
    title: "Geometry",
    subtitle: "Space & Shape",
    desc: "Properties of space, including distance, shape, size, and relative position.",
    icon: Triangle,
    color: "text-amber-400",
    border: "border-amber-500/30",
    bg: "bg-amber-950/20",
    equation: "a² + b² = c²",
    href: "mathematics/geometry"
  },
  {
    id: "calculus",
    title: "Calculus",
    subtitle: "Change & Motion",
    desc: "The mathematical study of continuous change.",
    icon: Sigma,
    color: "text-rose-400",
    border: "border-rose-500/30",
    bg: "bg-rose-950/20",
    equation: "∫ f(x) dx",
    href: "mathematics/calculus"
  },
  {
    id: "statistics",
    title: "Statistics",
    subtitle: "Data & Probability",
    desc: "Collection, analysis, interpretation, and presentation of data.",
    icon: BarChart3,
    color: "text-purple-400",
    border: "border-purple-500/30",
    bg: "bg-purple-950/20",
    equation: "P(A|B) = P(AB)/P(B)",
    href: "mathematics/statistics"
  },
  {
    id: "number-theory",
    title: "Number Theory",
    subtitle: "The Queen of Math",
    desc: "The properties of integers, primes, and arithmetic structures.",
    icon: Binary, // Or Hash
    color: "text-cyan-400",
    border: "border-cyan-500/30",
    bg: "bg-cyan-950/20",
    equation: "e^(iπ) + 1 = 0",
    href: "mathematics/number-theory"
  },
  {
    id: "discrete",
    title: "Discrete Math",
    subtitle: "Logic & Graphs",
    desc: "Structures that are fundamentally discrete rather than continuous.",
    icon: Network,
    color: "text-lime-400",
    border: "border-lime-500/30",
    bg: "bg-lime-950/20",
    equation: "G = (V, E)",
    href: "mathematics/discrete"
  }
];

export default function MathPage() {
  return (
    <main className="relative min-h-screen bg-[#050508] text-white overflow-hidden font-mono selection:bg-indigo-500/50">
      
      {/* 1. VISUAL ENGINE */}
      <GalaxyBackground />
      <MathBackground />

      {/* VIGNETTE & GRID OVERLAY */}
      {/* A Graph Paper overlay adds a nice touch */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-vignette opacity-60 pointer-events-none z-0" />

      {/* 2. UI CONTAINER */}
      <div className="relative z-10 container mx-auto px-6 py-12 min-h-screen flex flex-col">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row justify-between items-start mb-16">
             <div>
                 <Link href="/" className="flex items-center gap-2 text-xs text-indigo-400 hover:text-white transition-colors mb-4 uppercase tracking-widest group">
                    <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Academic_Core // Domain_01
                 </Link>
                 <div className="flex items-center gap-6">
                     {/* Animated Pi Logo */}
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
             </div>
        </header>

        {/* CONTENT GRID - MASONRY FEEL */}
        {/* We use grid-cols-12 to create varying card sizes if we wanted, but equal sizing works well for consistency */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-auto mb-12">
            
            {SUBDOMAINS.map((item, i) => (
                <Link 
                    key={item.id}
                    href={item.href}
                    className={`
                        group relative flex flex-col justify-between
                        p-6 border rounded-lg backdrop-blur-md transition-all duration-300
                        hover:-translate-y-1 hover:shadow-2xl
                        ${item.border} ${item.bg}
                        hover:bg-opacity-40
                    `}
                >
                    {/* Corner Decorations (Like definition markers) */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-white/20" />
                    <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-white/20" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-white/20" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-white/20" />

                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                        <div className={`p-2 rounded border border-white/10 bg-black/40 ${item.color}`}>
                            <item.icon size={20} />
                        </div>
                        <span className="text-[10px] opacity-40 uppercase tracking-widest">
                            {`0${i+1}`}
                        </span>
                    </div>

                    {/* Body */}
                    <div>
                        <h2 className="text-xl font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">
                            {item.title}
                        </h2>
                        <div className={`text-[10px] font-bold uppercase mb-3 opacity-70 ${item.color}`}>
                            {item.subtitle}
                        </div>
                        <p className="text-xs text-zinc-400 leading-relaxed mb-6 h-10 line-clamp-2">
                            {item.desc}
                        </p>
                    </div>

                    {/* Footer / Equation */}
                    <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                         <div className="font-mono text-xs opacity-50 group-hover:opacity-100 transition-opacity">
                            {item.equation}
                         </div>
                         <Braces size={14} className="text-zinc-600 group-hover:text-white transition-colors" />
                    </div>
                </Link>
            ))}

        </div>
        
        {/* FOOTER */}
        <div className="border-t border-indigo-900/30 pt-6 flex justify-between items-center text-[10px] text-indigo-500/60 font-mono uppercase tracking-widest">
            <span>Q.E.D.</span>
            <span>Fields Medalist Architecture</span>
        </div>

      </div>
    </main>
  );
}