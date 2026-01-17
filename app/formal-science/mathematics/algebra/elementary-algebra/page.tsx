"use client";
import React from "react";
import Link from "next/link";
import GraphingBackground from "./GraphingBackground"; 
import { 
  ArrowLeft, TrendingUp, X, MoveHorizontal, 
  Layers, Divide, Hash, Grip, FunctionSquare,
  Radical, Scaling, Calculator, Braces
} from "lucide-react";

// --- 1. CURRICULUM CONFIGURATION ---
// Covering Algebra I & II Concepts
const MODULES = [
  {
    id: "fundamentals",
    title: "Algebra Fundamentals",
    subtitle: "The Language of Math",
    desc: "Real numbers, order of operations, properties of equality, and variable expressions.",
    icon: Hash,
    problem: "3(x - 5) + 2",
    color: "text-emerald-400",
    border: "border-emerald-500/30",
    bg: "bg-emerald-950/20",
    href: "/formal-science/mathematics/algebra/elementary-algebra/fundamentals"
  },
  {
    id: "linear-equations",
    title: "Graphing Linear Eq.",
    subtitle: "Lines & Slopes",
    desc: "Slope-intercept form, point-slope form, and graphing lines on a coordinate plane.",
    icon: TrendingUp,
    problem: "y = -2x + 4",
    color: "text-teal-400",
    border: "border-teal-500/30",
    bg: "bg-teal-950/20",
    href: "/formal-science/mathematics/algebra/elementary-algebra/linear-equations"
  },
  {
    id: "systems",
    title: "Systems of Equations",
    subtitle: "Intersection Points",
    desc: "Solving linear systems via graphing, substitution, and elimination methods.",
    icon: Layers,
    problem: "{ 2x+y=10, x-y=2 }",
    color: "text-cyan-400",
    border: "border-cyan-500/30",
    bg: "bg-cyan-950/20",
    href: "/formal-science/mathematics/algebra/elementary-algebra/systems-of-equations"
  },
  {
    id: "inequalities",
    title: "Algebraic Inequalities",
    subtitle: "Shaded Regions",
    desc: "Solving and graphing single and compound inequalities.",
    icon: MoveHorizontal,
    problem: "-3x < 12",
    color: "text-sky-400",
    border: "border-sky-500/30",
    bg: "bg-sky-950/20",
    href: "/formal-science/mathematics/algebra/elementary-algebra/inequalities"
  },
  {
    id: "quadratics",
    title: "Quadratic Equations",
    subtitle: "Parabolas",
    desc: "Vertex form, standard form, quadratic formula, and completing the square.",
    icon: Scaling, // Visualizes a curve
    problem: "x = (-b±√Δ)/2a",
    color: "text-blue-400",
    border: "border-blue-500/30",
    bg: "bg-blue-950/20",
    href: "/formal-science/mathematics/algebra/elementary-algebra/quadratic-equations"
  },
  {
    id: "factoring",
    title: "Factoring",
    subtitle: "Reverse Multiplication",
    desc: "GCF, difference of squares, and trinomials decomposition.",
    icon: Divide,
    problem: "x² - 9 = (x-3)(x+3)",
    color: "text-indigo-400",
    border: "border-indigo-500/30",
    bg: "bg-indigo-950/20",
    href: "/formal-science/mathematics/algebra/elementary-algebra/factoring"
  },
  {
    id: "rational",
    title: "Rational Expressions",
    subtitle: "Algebraic Fractions",
    desc: "Simplifying, multiplying, and dividing fractions containing variables.",
    icon: Calculator,
    problem: "(x²-1) / (x+1)",
    color: "text-violet-400",
    border: "border-violet-500/30",
    bg: "bg-violet-950/20",
    href: "/formal-science/mathematics/algebra/elementary-algebra/rational-expressions"
  },
  {
    id: "radicals",
    title: "Radical Expressions",
    subtitle: "Roots & Exponents",
    desc: "Simplifying square roots, cube roots, and fractional exponents.",
    icon: Grip, // Abstract structure
    problem: "√(16x⁴) = 4x²",
    color: "text-fuchsia-400",
    border: "border-fuchsia-500/30",
    bg: "bg-fuchsia-950/20",
    href: "/formal-science/mathematics/algebra/elementary-algebra/radical-expressions"
  },
  {
    id: "functions",
    title: "Functions",
    subtitle: "Input / Output",
    desc: "Domain, range, function notation f(x), and composite functions.",
    icon: FunctionSquare,
    problem: "f(g(x))",
    color: "text-pink-400",
    border: "border-pink-500/30",
    bg: "bg-pink-950/20",
    href: "/formal-science/mathematics/algebra/elementary-algebra/functions"
  },
  {
    id: "exponents",
    title: "Exponents",
    subtitle: "Power Rules",
    desc: "Laws of exponents, scientific notation, and exponential growth/decay.",
    icon: X,
    problem: " (x²)³ = x⁶ ",
    color: "text-rose-400",
    border: "border-rose-500/30",
    bg: "bg-rose-950/20",
    href: "/formal-science/mathematics/algebra/elementary-algebra/exponents"
  },
  {
    id: "complex",
    title: "Complex",
    icon: Braces,
    href: "/formal-science/mathematics/algebra/elementary-algebra/complex",
    subtitle: "Numbers & Imaginary",
    desc: "Imaginary numbers, complex plane, and operations with complex numbers.",
    problem: "i = √-1",
    color: "text-amber-400",
    border: "border-amber-500/30",
    bg: "bg-amber-950/20",
  }
];

export default function ElementaryAlgebraPage() {
  return (
    <main className="relative min-h-screen bg-[#080b14] text-white overflow-hidden font-mono selection:bg-cyan-500/30">
      
      {/* 1. VISUAL ENGINE */}
      <GraphingBackground />
      
      {/* VIGNETTE & SCANLINES */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,23,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20" />
      <div className="absolute inset-0 bg-radial-vignette opacity-60 pointer-events-none z-0" />

      {/* 2. UI CONTAINER */}
      <div className="relative z-10 container mx-auto px-6 py-12 min-h-screen flex flex-col">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row justify-between items-start mb-12">
             <div>
                 <Link href="/math/algebra" className="flex items-center gap-2 text-xs text-cyan-500 hover:text-white transition-colors mb-4 uppercase tracking-widest group">
                    <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Algebra // Domain_02.1
                 </Link>
                 <div className="flex items-center gap-6">
                     {/* The "Variable Box" Logo */}
                     <div className="w-16 h-16 border-2 border-cyan-500/50 rounded-lg flex items-center justify-center bg-black/50 backdrop-blur-sm shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                        <span className="text-3xl font-black text-white italic">x</span>
                     </div>
                     <div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
                           INTEGRATED<br/>ALGEBRA
                        </h1>
                        <div className="flex gap-4 text-xs text-cyan-400/60 uppercase tracking-widest mt-1">
                            <span>Core Curriculum</span>
                            <span>•</span>
                            <span>I & II</span>
                            <span>•</span>
                            <span>Analysis</span>
                        </div>
                     </div>
                 </div>
             </div>
        </header>

        {/* CONTENT GRID (3x3 Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-auto mb-12">
            
            {MODULES.map((item, i) => (
                <Link 
                    key={item.id}
                    href={item.href}
                    className={`
                        group relative flex flex-col justify-between
                        p-6 border rounded-xl backdrop-blur-md bg-black/40
                        transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:bg-black/60
                        ${item.border}
                    `}
                >
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                        <div className={`p-2 rounded bg-white/5 ${item.color}`}>
                            <item.icon size={22} strokeWidth={2} />
                        </div>
                        <span className="text-[10px] opacity-30 font-bold uppercase tracking-widest">
                            MOD_0{i+1}
                        </span>
                    </div>

                    {/* Body */}
                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-200 transition-colors">
                            {item.title}
                        </h2>
                        <div className={`text-[10px] font-bold uppercase mb-3 opacity-80 ${item.color}`}>
                            {item.subtitle}
                        </div>
                        <p className="text-sm text-zinc-400 leading-relaxed h-10 line-clamp-2">
                            {item.desc}
                        </p>
                    </div>

                    {/* The "Problem" Strip */}
                    <div className="mt-auto pt-4 border-t border-white/5">
                        <div className="flex justify-between items-center text-xs font-mono">
                            <span className="opacity-50 select-none">Ex:</span>
                            <span className={`bg-white/5 px-2 py-1 rounded ${item.color} group-hover:bg-white/10 transition-colors`}>
                                {item.problem}
                            </span>
                        </div>
                    </div>
                </Link>
            ))}

        </div>

        {/* FOOTER */}
        <div className="border-t border-cyan-900/30 pt-6 flex justify-between items-center text-[10px] text-cyan-600 font-mono uppercase tracking-widest">
            <span>Polynomial Arithmetic</span>
            <span>f(x) = y</span>
        </div>

      </div>
    </main>
  );
}