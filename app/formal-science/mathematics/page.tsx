"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import MathBackground from "@/app/formal-science/mathematics/MathBackground";
import { 
  Calculator, Variable, Shapes, Spline, ChartScatter, Tally5, 
  ArrowRight, Sigma, ShieldQuestion, User, Globe, Cpu, Lightbulb, 
  Atom, Box
} from "lucide-react";

// --- DATA: THE MATHEMATICAL STACK ---
const LAYERS = [
  {
    id: "M6",
    label: "Uncertainty",
    title: "Statistics & Probability",
    subtitle: "The Science of Risk",
    desc: "The mathematics of data and the unknown. We quantify uncertainty to predict the behavior of complex systems, from stock markets to quantum states.",
    href: "/formal-science/mathematics/statistics",
    icon: ChartScatter,
    color: "text-amber-400",
    bg: "bg-amber-950/30",
    border: "border-amber-500/50",
    visual: "P(A|B) = [P(B|A)P(A)] / P(B)",
    visualLabel: "Bayes' Theorem",
    titan: "Thomas Bayes",
    frontier: "Artificial General Intelligence",
    apps: ["Machine Learning", "Finance", "Thermodynamics"]
  },
  {
    id: "M5",
    label: "Change",
    title: "Calculus",
    subtitle: "The Mathematics of Motion",
    desc: "The study of continuous change. Through limits, derivatives, and integrals, we model the fluidity of the universe and the accumulation of quantities.",
    href: "/formal-science/mathematics/calculus",
    icon: Spline,
    color: "text-red-400",
    bg: "bg-red-950/30",
    border: "border-red-500/50",
    visual: "∫ f(x) dx = F(b) - F(a)",
    visualLabel: "Fundamental Theorem",
    titan: "Isaac Newton / Leibniz",
    frontier: "Navier-Stokes Existence",
    apps: ["Physics Engines", "Aerodynamics", "Economics"]
  },
  {
    id: "M4",
    label: "Space",
    title: "Geometry & Topology",
    subtitle: "The Structure of Shape",
    desc: "The properties of space. From Euclidean planes to non-Euclidean manifolds, we map the structure of dimensionality and the concept of 'nearness'.",
    href: "/formal-science/mathematics/geometry",
    icon: Shapes,
    color: "text-cyan-400",
    bg: "bg-cyan-950/30",
    border: "border-cyan-500/50",
    visual: "V - E + F = 2",
    visualLabel: "Euler Characteristic",
    titan: "Bernhard Riemann",
    frontier: "Hodge Conjecture",
    apps: ["Computer Graphics", "General Relativity", "Robotics"]
  },
  {
    id: "M3",
    label: "Structure",
    title: "Algebra",
    subtitle: "The Grammar of Logic",
    desc: "The study of mathematical symbols and the rules for manipulating them. It abstracts specific numbers into general variables to solve universal problems.",
    href: "/formal-science/mathematics/algebra",
    icon: Variable,
    color: "text-blue-400",
    bg: "bg-blue-950/30",
    border: "border-blue-500/50",
    visual: "e^(iπ) + 1 = 0",
    visualLabel: "Euler's Identity",
    titan: "Evariste Galois",
    frontier: "Birch and Swinnerton-Dyer",
    apps: ["Cryptography", "Coding Theory", "Search Algorithms"]
  },
  {
    id: "M2",
    label: "Logic",
    title: "Discrete Mathematics",
    subtitle: "The Math of Distinction",
    desc: "The study of countable, distinct elements. It forms the foundation of computer science, focusing on combinatorics, graph theory, and the theory of computation.",
    href: "/formal-science/mathematics/discrete-mathematics",
    icon: Box,
    color: "text-green-400",
    bg: "bg-green-950/30",
    border: "border-green-500/50",
    visual: "P ≠ NP ?",
    visualLabel: "P vs NP Problem",
    titan: "George Boole",
    frontier: "Quantum Computing",
    apps: ["Algorithms", "Network Theory", "Data Structures"]
  },
  {
    id: "M1",
    label: "Quantity",
    title: "Number Theory",
    subtitle: "The Queen of Mathematics",
    desc: "The pure study of integers. It explores the atomic nature of numbers (primes) and the mysterious patterns hidden within counting itself.",
    href: "/formal-science/mathematics/number-theory",
    icon: Tally5,
    color: "text-purple-400",
    bg: "bg-purple-950/30",
    border: "border-purple-500/50",
    visual: "ζ(s) = 0 ⇒ Re(s) = 1/2",
    visualLabel: "Riemann Hypothesis",
    titan: "Carl Friedrich Gauss",
    frontier: "Prime Distribution",
    apps: ["RSA Encryption", "Hash Functions", "Quantum Computing"]
  },
  {
    id: "M0",
    label: "Basics",
    title: "Foundations",
    subtitle: "The Building Blocks of Math",
    desc: "The basic operations and properties of numbers. It establishes the rules for addition, subtraction, multiplication, and division that underpin all higher mathematics.",
    href: "/formal-science/mathematics/foundations",
    icon: Lightbulb,
    color: "text-yellow-400",
    bg: "bg-yellow-950/30",
    border: "border-yellow-500/50",
    visual: "a + b = b + a",
    visualLabel: "Commutative Property",
    titan: "Pythagoras",
    frontier: "Formal Systems",
    apps: ["Basic Computing", "Financial Calculations", "Measurement Systems"]
  }
];

export default function MathPage() {
  const [activeLayer, setActiveLayer] = useState<string>("M3");

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#050505] text-white selection:bg-cyan-500/30 font-sans">
      
      {/* 1. Background Engine */}
      <MathBackground />
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 min-h-screen flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-12 border-b border-white/10 pb-6">
            <div>
                <h1 className="text-4xl font-black tracking-tight text-white mb-2">Mathematics</h1>
                <p className="text-sm text-neutral-400 font-mono">DOMAIN_01.2 // THE_UNIVERSAL_LANGUAGE</p>
            </div>
            
            {/* Header Widget */}
            <div className="hidden md:flex items-center gap-6">
                <div className="flex flex-col items-end">
                    <span className="text-[10px] font-bold uppercase text-neutral-500">System State</span>
                    <span className="text-xs font-mono text-cyan-400">CONSISTENT</span>
                </div>
                <div className="h-8 w-[1px] bg-white/10" />
                <div className="p-2 rounded bg-white/5 border border-white/10">
                    <Calculator size={18} className="text-white" />
                </div>
            </div>
        </div>

        {/* 2. The Math Monolith */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT: The Stack */}
            <div className="lg:col-span-4 flex flex-col gap-3">
                {LAYERS.map((layer) => {
                    const isActive = activeLayer === layer.id;
                    return (
                        <div 
                            key={layer.id}
                            onMouseEnter={() => setActiveLayer(layer.id)}
                            className={`
                                group relative cursor-pointer overflow-hidden rounded-xl border transition-all duration-300
                                ${isActive ? `h-32 ${layer.bg} ${layer.border} shadow-[0_0_30px_rgba(0,0,0,0.5)]` : "h-20 bg-neutral-900/60 border-white/5 hover:border-white/20 hover:bg-neutral-900/80"}
                            `}
                        >
                            {/* Active Indicator */}
                            {isActive && (
                                <motion.div 
                                    layoutId="active-glow"
                                    className={`absolute left-0 top-0 bottom-0 w-1 ${layer.color.replace('text', 'bg')}`} 
                                />
                            )}

                            <div className="relative z-10 p-5 h-full flex flex-col justify-center">
                                {/* Top Row */}
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <span className={`text-xs font-mono font-bold ${isActive ? layer.color : "text-neutral-600"}`}>
                                            {layer.id}
                                        </span>
                                        <span className="text-[10px] uppercase tracking-widest text-neutral-500">
                                            {layer.label}
                                        </span>
                                    </div>
                                    <layer.icon 
                                        size={20} 
                                        className={`transition-colors ${isActive ? layer.color : "text-neutral-700 group-hover:text-neutral-500"}`} 
                                    />
                                </div>
                                
                                {/* Main Title */}
                                <h3 className={`text-lg font-bold transition-colors ${isActive ? "text-white" : "text-neutral-400 group-hover:text-white"}`}>
                                    {layer.title}
                                </h3>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* RIGHT: The Knowledge Console */}
            <div className="lg:col-span-8 min-h-[60vh] relative pl-4 border-l border-white/5">
                <AnimatePresence mode="wait">
                    {LAYERS.map((layer) => {
                        if (layer.id !== activeLayer) return null;
                        
                        return (
                            <motion.div
                                key={layer.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="h-full flex flex-col"
                            >
                                <Link 
                                    href={layer.href}
                                    className="group relative flex-1 rounded-3xl border border-white/10 bg-neutral-900/40 backdrop-blur-xl overflow-hidden hover:border-white/20 transition-all flex flex-col"
                                >
                                    {/* Ambient Glow */}
                                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br ${layer.color.replace('text', 'from')} to-transparent`} />
                                    
                                    <div className="relative z-10 p-8 flex-1 flex flex-col">
                                        
                                        {/* 1. Header Section */}
                                        <div className="flex justify-between items-start mb-6">
                                            <div>
                                                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/10 ${layer.color} mb-4`}>
                                                    <layer.icon size={14} />
                                                    <span className="text-[10px] font-bold uppercase tracking-widest">{layer.title}</span>
                                                </div>
                                                <h2 className="text-4xl md:text-6xl font-black text-white mb-2 tracking-tight">
                                                    {layer.subtitle}
                                                </h2>
                                            </div>
                                        </div>

                                        {/* 2. Visual Equation (Centerpiece) */}
                                        <div className="w-full bg-black/40 rounded-2xl border border-white/5 p-8 my-4 flex flex-col items-center justify-center text-center group-hover:border-white/10 transition-colors relative overflow-hidden">
                                            {/* Grid Background in visual box */}
                                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />
                                            
                                            <span className="relative z-10 text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-4 block">
                                                {layer.visualLabel}
                                            </span>
                                            <div className={`relative z-10 font-serif italic text-2xl md:text-4xl ${layer.color} opacity-90`}>
                                                {layer.visual}
                                            </div>
                                        </div>

                                        {/* 3. Description */}
                                        <p className="text-lg text-neutral-300 font-light leading-relaxed mb-8">
                                            {layer.desc}
                                        </p>

                                        {/* 4. The Knowledge Matrix (Grid) */}
                                        <div className="mt-auto grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white/10 pt-6">
                                            
                                            {/* Column: Titan */}
                                            <div className="p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                                <div className="flex items-center gap-2 mb-2 text-neutral-400">
                                                    <User size={12} />
                                                    <span className="text-[10px] font-bold uppercase tracking-wider">The Titan</span>
                                                </div>
                                                <div className="text-sm font-medium text-white">{layer.titan}</div>
                                            </div>

                                            {/* Column: Frontier */}
                                            <div className="p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                                <div className="flex items-center gap-2 mb-2 text-neutral-400">
                                                    <ShieldQuestion size={12} />
                                                    <span className="text-[10px] font-bold uppercase tracking-wider">The Frontier</span>
                                                </div>
                                                <div className="text-sm font-medium text-white">{layer.frontier}</div>
                                            </div>

                                            {/* Column: Applications */}
                                            <div className="p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                                <div className="flex items-center gap-2 mb-2 text-neutral-400">
                                                    <Cpu size={12} />
                                                    <span className="text-[10px] font-bold uppercase tracking-wider">Real World</span>
                                                </div>
                                                <div className="text-xs text-white flex flex-wrap gap-1">
                                                    {layer.apps.map((app, i) => (
                                                        <span key={i} className="after:content-[','] last:after:content-[''] mr-1">{app}</span>
                                                    ))}
                                                </div>
                                            </div>

                                        </div>

                                        {/* CTA */}
                                        <div className="absolute top-8 right-8 hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity text-white">
                                            <span>Enter Domain</span>
                                            <ArrowRight size={16} />
                                        </div>

                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

        </div>
      </div>
    </main>
  );
}