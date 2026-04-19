"use client";
import React from "react";
import Link from "next/link";
import AbstractBackground from "./AbstractBackground";
import { 
  ArrowLeft, Gem, Hexagon, Circle, 
  RefreshCcw, Infinity, Boxes, 
  Network
} from "lucide-react";
import SymmetryBackground from "./SymmetryBackground";

// --- CURRICULUM ---
const MODULES = [
  {
    id: "groups",
    title: "Groups",
    subtitle: "Symmetry",
    desc: "The study of reversibility. Rotations, reflections, and the Rubik's Cube.",
    notation: "(G, •)",
    icon: RefreshCcw,
    color: "text-rose-400",
    border: "border-rose-500/30",
    bg: "bg-rose-900/10",
    href: "abstract-algebra/group-theory"
  },
  {
    id: "homomorphisms",
    title: "Maps",
    subtitle: "Relation",
    desc: "Structure-preserving functions. The translation layer between algebraic worlds.",
    notation: "φ(xy)=φ(x)φ(y)",
    icon: Network,
    color: "text-violet-400",
    border: "border-violet-500/30",
    bg: "bg-violet-900/10",
    href: "abstract-algebra/maps"
  },
  {
    id: "rings",
    title: "Rings",
    subtitle: "Arithmetic",
    desc: "Sets with Addition and Multiplication. Where integers and polynomials live.",
    notation: "(R, +, •)",
    icon: Circle,
    color: "text-fuchsia-400",
    border: "border-fuchsia-500/30",
    bg: "bg-fuchsia-900/10",
    href: "abstract-algebra/ring-theory"
  },
  {
    id: "fields",
    title: "Fields",
    subtitle: "Continuum",
    desc: "Rings where division works. The foundations of Calculus and Linear Algebra.",
    notation: "F = R / M",
    icon: Infinity,
    color: "text-purple-400",
    border: "border-purple-500/30",
    bg: "bg-purple-900/10",
    href: "abstract-algebra/field-theory"
  },
  {
    id: "vector-spaces",
    title: "Vector Spaces",
    subtitle: "Linearity",
    desc: "Abelian groups scaled by a Field. The abstract version of grid-based space.",
    notation: "V over F",
    icon: Boxes,
    color: "text-indigo-400",
    border: "border-indigo-500/30",
    bg: "bg-indigo-900/10",
    href: "abstract-algebra/vector-spaces"
  },
  {
    id: "galois",
    title: "Galois Theory",
    subtitle: "Unification",
    desc: "The bridge between Groups and Fields. Proves why some equations are unsolvable.",
    notation: "Gal(E/F)",
    icon: Hexagon,
    color: "text-pink-400",
    border: "border-pink-500/30",
    bg: "bg-pink-900/10",
    href: "abstract-algebra/galois-theory"
  }
];

export default function AbstractAlgebraPage() {
  return (
    <main className="relative min-h-screen bg-[#0f050a] text-white overflow-hidden font-mono selection:bg-rose-500/30 flex flex-col">
      
      {/* 1. VISUAL ENGINE */}
      
      <SymmetryBackground />
      <AbstractBackground />
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(244,63,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(244,63,94,0.03)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-vignette opacity-50 pointer-events-none z-0" />

      {/* 2. HEADER */}
      <header className="relative z-10 p-8 pb-4">
         <div className="max-w-7xl mx-auto flex justify-between items-end border-b border-white/10 pb-6">
             <div>
                 <Link href="/math" className="flex items-center gap-2 text-xs text-rose-500 hover:text-white transition-colors mb-2 uppercase tracking-widest group">
                    <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Mathematics // Domain_04
                 </Link>
                 <div className="flex items-center gap-4">
                    <div className="bg-rose-500/10 p-2 rounded-lg border border-rose-500/30">
                        <Gem size={32} className="text-rose-400" />
                    </div>
                    <h1 className="text-5xl font-black tracking-tighter text-white">
                       ABSTRACT ALGEBRA
                    </h1>
                 </div>
             </div>
             
             <div className="hidden md:block text-right">
                 <div className="text-xs text-rose-300 font-bold uppercase tracking-widest mb-1">
                     Structure & Symmetry
                 </div>
                 <div className="text-[10px] text-zinc-500 max-w-xs leading-relaxed">
                     
                     Visualizing the Direct Product <span className="text-white">C₁₂ × C₈</span>
                 </div>
             </div>
         </div>
      </header>

      {/* 3. CONTENT GRID (Glass Wall) */}
      <div className="relative z-10 flex-1 p-6 md:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full">
            
            {MODULES.map((item, i) => (
                <Link 
                    key={item.id}
                    href={item.href}
                    className={`
                        group relative flex flex-col p-6 rounded-xl
                        border backdrop-blur-sm transition-all duration-500
                        hover:backdrop-blur-md hover:-translate-y-1 hover:shadow-2xl
                        ${item.border} ${item.bg} hover:bg-black/60
                    `}
                >
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />

                    {/* Header Row */}
                    <div className="relative z-10 flex justify-between items-start mb-4">
                        <div className={`p-3 rounded-lg bg-black/40 border border-white/10 ${item.color} group-hover:scale-110 transition-transform`}>
                            <item.icon size={24} strokeWidth={1.5} />
                        </div>
                        <div className="text-right">
                            <span className="text-[10px] opacity-40 font-bold uppercase tracking-widest block">
                                0{i+1}
                            </span>
                            <span className={`text-xs font-serif italic opacity-60 ${item.color}`}>
                                {item.notation}
                            </span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 mt-auto">
                        <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-rose-100 transition-colors">
                            {item.title}
                        </h2>
                        <div className={`text-[10px] font-bold uppercase mb-3 opacity-80 ${item.color}`}>
                            {item.subtitle}
                        </div>
                        <p className="text-sm text-zinc-300 leading-relaxed min-h-[4em] opacity-80 group-hover:opacity-100 transition-opacity">
                            {item.desc}
                        </p>
                    </div>

                    {/* Bottom Bar decoration */}
                    <div className="absolute bottom-0 left-6 right-6 h-px bg-white/10 group-hover:bg-white/30 transition-colors" />
                </Link>
            ))}

          </div>
      </div>

    </main>
  );
}