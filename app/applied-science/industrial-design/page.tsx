"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import DraftingBackground from "./DraftingBackground";
import ExplodedView from "./ExplodedViewWidget";
import { 
  PenTool, Box, Settings, Layers, 
  Armchair, Car, Smartphone, Ruler 
} from "lucide-react";

export default function IndustrialDesignPage() {
  const sectors = [
    { title: "Product Design", icon: Smartphone, desc: "Consumer electronics and appliances." },
    { title: "Furniture", icon: Armchair, desc: "Ergonomics and interior aesthetics." },
    { title: "Automotive", icon: Car, desc: "Aerodynamics and transportation systems." },
    { title: "Packaging", icon: Box, desc: "Structural integrity and unboxing experience." }
  ];

  return (
    <main className="relative min-h-screen bg-[#0f172a] text-slate-200 overflow-hidden font-sans selection:bg-orange-500/30">
      <DraftingBackground />
      
      {/* Blueprint Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        
        {/* HEADER */}
        <header className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-orange-500/10 border border-orange-500/30 rounded">
              <PenTool className="text-orange-400" size={20} />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-orange-400">
              Applied Science // Design
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none">
            INDUSTRIAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-200">DESIGN</span>
          </h1>
          <p className="mt-6 text-slate-400 max-w-2xl text-lg font-light border-l-2 border-orange-500/30 pl-6">
            The professional practice of designing products, devices, objects, and services used by millions of people worldwide every day.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: THEORY & SECTORS */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Philosophy Section */}
            <section className="bg-slate-900/80 border border-white/10 p-8 rounded-3xl backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Ruler className="text-orange-500" /> Form Follows Function
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                A principle associated with 20th-century modern architecture and industrial design which says that the shape of a building or object should primarily relate to its intended function or purpose.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                  <span className="text-xs font-bold text-orange-400 uppercase">Aesthetics</span>
                  <p className="text-[10px] text-slate-500 mt-1">Emotional connection and style.</p>
                </div>
                <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                  <span className="text-xs font-bold text-orange-400 uppercase">Ergonomics</span>
                  <p className="text-[10px] text-slate-500 mt-1">Usability and human fit.</p>
                </div>
              </div>
            </section>

            {/* Sectors Grid */}
            <section>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Design Sectors</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sectors.map((s) => (
                  <div key={s.title} className="group p-5 bg-slate-900/60 border border-white/5 hover:border-orange-500/50 rounded-xl transition-all hover:translate-x-1 cursor-default">
                    <s.icon className="text-slate-600 group-hover:text-orange-400 transition-colors mb-3" size={24} />
                    <h5 className="font-bold text-white">{s.title}</h5>
                    <p className="text-xs text-slate-500">{s.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT: INTERACTIVE LAB */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-1 rounded-3xl bg-gradient-to-br from-orange-500/20 to-slate-800/50 border border-orange-500/20">
              <div className="bg-slate-950/90 rounded-[22px] p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-white flex items-center gap-2">
                    <Layers size={18} className="text-orange-400" /> CAD View
                  </h3>
                  <span className="text-[9px] font-mono text-orange-500 bg-orange-500/10 px-2 py-1 rounded">LIVE_RENDER</span>
                </div>
                
                {/* The Widget */}
                <ExplodedView />
                
                <p className="text-[10px] text-slate-500 mt-4 leading-relaxed text-center">
                  Product architecture usually consists of the chassis, internal hardware, and user interface layers.
                </p>
              </div>
            </div>

            {/* Design Process Steps */}
            <div className="bg-slate-900/60 border border-white/5 p-6 rounded-2xl">
              <h4 className="text-xs font-bold text-white uppercase mb-4">The Design Process</h4>
              <div className="space-y-4 relative">
                {/* Vertical Line */}
                <div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/10" />
                
                {["Define", "Ideate", "Prototype", "Test"].map((step, i) => (
                  <div key={step} className="flex items-center gap-4 relative z-10">
                    <div className="w-3.5 h-3.5 rounded-full bg-slate-800 border border-orange-500/50" />
                    <span className="text-xs text-slate-400">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}