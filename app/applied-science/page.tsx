"use client";
import { useState } from "react";
import Link from "next/link";
import InfrastructureBackground from "@/app/applied-science/InfrastructureBackground";
import { motion, AnimatePresence } from "framer-motion";
import {
  Hammer, Cpu, Stethoscope, HardHat, Pickaxe, HeartPulse,
  TreeDeciduous, Building, Globe2, ArrowRight, Layers,
  Terminal, Dna, Box
} from "lucide-react";

// --- DATA ---
const categories = [
  {
    id: "hardware",
    label: "HARDWARE",
    icon: Box,
    desc: "The Physical Layer. Manipulating matter and energy to build structure.",
    color: "text-orange-400",
    bg: "bg-orange-500",
    border: "border-orange-500",
    items: [
      { 
        title: "Engineering", 
        role: "Design & Build", 
        href: "/applied-science/engineering", 
        icon: Hammer,
        desc: "Designing complex systems, structures, and machines."
      },
      { 
        title: "Architecture", 
        role: "Spatial Design", 
        href: "/applied-science/architecture", 
        icon: Building,
        desc: "The art and science of designing built environments."
      },
      { 
        title: "Materials Science", 
        role: "Matter Engineering", 
        href: "/applied-science/materials-science", 
        icon: Pickaxe,
        desc: "Creating new materials with novel properties."
      }
    ]
  },
  {
    id: "software",
    label: "SOFTWARE",
    icon: Terminal,
    desc: "The Digital Layer. Processing information and simulating reality.",
    color: "text-sky-400",
    bg: "bg-sky-500",
    border: "border-sky-500",
    items: [
      { 
        title: "Computer Technology", 
        role: "Computation", 
        href: "/applied-science/computer-technology", 
        icon: Cpu,
        desc: "Hardware and software systems that power the information age."
      }
    ]
  },
  {
    id: "wetware",
    label: "WETWARE",
    icon: Dna,
    desc: "The Biological Layer. Healing, sustaining, and augmenting life.",
    color: "text-emerald-400",
    bg: "bg-emerald-500",
    border: "border-emerald-500",
    items: [
      { 
        title: "Medicine", 
        role: "Human Health", 
        href: "/applied-science/medicine", 
        icon: Stethoscope,
        desc: "Diagnosis, treatment, and prevention of disease."
      },
      { 
        title: "Environmental Science", 
        role: "Planetary Health", 
        href: "/applied-science/environmental-science", 
        icon: Globe2,
        desc: "Protecting and sustaining natural ecosystems."
      },
      { 
        title: "Agriculture", 
        role: "Cultivation", 
        href: "/applied-science/agriculture", 
        icon: TreeDeciduous,
        desc: "The science and practice of farming and food production."
      }
    ]
  }
];

export default function AppliedSciencePage() {
  const [activeTab, setActiveTab] = useState("hardware");
  const activeCategory = categories.find(c => c.id === activeTab) || categories[0];

  return (
    <main className="relative min-h-screen bg-neutral-950 text-white overflow-hidden selection:bg-orange-500/30 font-sans">
      
      {/* 1. VISUAL ENGINE */}
      <InfrastructureBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,#020617_100%)] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none z-0" />

      {/* 2. DASHBOARD UI */}
      <div className="relative z-10 container mx-auto px-6 py-12 min-h-screen flex flex-col">
        
        {/* HEADER */}
        <header className="mb-16">
             <div className="flex items-center gap-2 text-xs font-mono text-orange-500 mb-4 uppercase tracking-widest">
                <Layers size={14} /> Domain_04 // Applied_Sciences
             </div>
             <div className="max-w-4xl">
                 <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter drop-shadow-2xl">
                    APPLIED<br/>SCIENCE
                 </h1>
                 <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl border-l-4 border-orange-500 pl-6">
                    Knowledge in action. We take the laws of physics, the logic of code, and the patterns of biology to build tools, cure diseases, and engineer the future.
                 </p>
             </div>
        </header>

        {/* 3. STACK SWITCHER */}
        <div className="flex flex-wrap gap-4 mb-12">
            {categories.map((cat) => (
                <button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    className={`
                        px-6 py-4 rounded-xl border flex items-center gap-3 transition-all duration-300
                        ${activeTab === cat.id 
                            ? `bg-slate-800 ${cat.border} text-white shadow-[0_0_20px_rgba(0,0,0,0.5)] scale-105` 
                            : "bg-slate-900/50 border-white/10 text-slate-500 hover:bg-slate-800 hover:text-slate-300"
                        }
                    `}
                >
                    <cat.icon size={20} className={activeTab === cat.id ? cat.color : ""} />
                    <span className="font-bold tracking-wide text-sm">{cat.label}</span>
                </button>
            ))}
        </div>

        {/* 4. CONTENT GRID */}
        <div className="flex-1">
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Category Description */}
                    <div className="mb-8 flex items-center gap-4">
                        <div className={`h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent`} />
                        <span className={`font-mono text-xs uppercase tracking-widest ${activeCategory.color}`}>
                            {activeCategory.desc}
                        </span>
                        <div className={`h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent`} />
                    </div>

                    {/* Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {activeCategory.items.map((item) => (
                            <Link 
                                href={item.href} 
                                key={item.title}
                                className="group relative bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-white/30 transition-all hover:-translate-y-1 overflow-hidden"
                            >
                                {/* Hover Glow */}
                                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${activeCategory.bg}`} />
                                
                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className={`p-3 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300 ${activeCategory.color}`}>
                                            <item.icon size={28} />
                                        </div>
                                        <ArrowRight className="text-slate-600 group-hover:text-white transition-colors" />
                                    </div>
                                    
                                    <div className="mb-1">
                                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-white/5 ${activeCategory.color}`}>
                                            {item.role}
                                        </span>
                                    </div>
                                    
                                    <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                                    <p className="text-sm text-slate-400 leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>

      </div>
    </main>
  );
}