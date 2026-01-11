"use client";
import React from "react";
import Link from "next/link";
import GeometryBackground from "./GeometryBackground";
import { 
  ArrowLeft, Ruler, Globe, 
  Activity, Combine, Axis3d, 
  Triangle, Shapes
} from "lucide-react";

// --- DOMAINS DATA ---
const LEFT_COL = [
  {
    id: "euclidean",
    title: "Euclidean",
    subtitle: "Axiomatic / Flat",
    desc: "The geometry of flat surfaces. Triangles add to 180°. Parallel lines never meet.",
    icon: Ruler,
    color: "text-sky-400",
    border: "border-sky-500/30",
    href: "geometry/euclidean"
  },
  {
    id: "non-euclidean",
    title: "Non-Euclidean",
    subtitle: "Hyperbolic / Elliptic",
    desc: "Curved space where parallel lines diverge or intersect. The geometry of gravity.",
    icon: Globe,
    color: "text-indigo-400",
    border: "border-indigo-500/30",
    href: "geometry/non-euclidean"
  },
  {
    id: "trigonometry",
    title: "Trigonometry",
    subtitle: "Ratios / Cycles",
    desc: "The bridge between angles and lengths. Sine waves and circular motion.",
    icon: Triangle,
    color: "text-teal-400",
    border: "border-teal-500/30",
    href: "geometry/trigonometry"
  }
];

const RIGHT_COL = [
  {
    id: "analytic",
    title: "Analytic",
    subtitle: "Coordinate Systems",
    desc: "Descartes' grid. Translating shapes into algebraic equations (y = mx + b).",
    icon: Axis3d,
    color: "text-blue-400",
    border: "border-blue-500/30",
    href: "geometry/analytic"
  },
  {
    id: "topology",
    title: "Topology",
    subtitle: "Deformation",
    desc: "Geometry without distance. Properties preserved under stretching and bending.",
    icon: Combine,
    color: "text-violet-400",
    border: "border-violet-500/30",
    href: "geometry/topology"
  },
  {
    id: "fractal",
    title: "Fractal",
    subtitle: "Recursion / Chaos",
    desc: "Self-similar structures. Fractional dimensions found in nature (coastlines, ferns).",
    icon: Activity,
    color: "text-fuchsia-400",
    border: "border-fuchsia-500/30",
    href: "geometry/fractal"
  }
];

export default function GeometryPage() {
  return (
    <main className="relative min-h-screen bg-[#02040a] text-white overflow-hidden font-mono selection:bg-sky-500/30 flex flex-col">
      
      {/* 1. VISUAL ENGINE */}
      <GeometryBackground />
      
      {/* OVERLAY: Clean Vignette */}
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none z-0" />
      
      {/* 2. HEADER */}
      <header className="relative z-10 w-full p-8 flex justify-between items-start pointer-events-none">
           <div className="pointer-events-auto">
               <Link href="./" className="flex items-center gap-2 text-xs text-sky-500 hover:text-white transition-colors mb-2 uppercase tracking-widest group">
                  <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Mathematics // Domain_02
               </Link>
               <h1 className="text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-sky-500/50">
                   GEOMETRY
               </h1>
           </div>
           
           <div className="text-right hidden md:block">
               <div className="text-[10px] text-sky-500/50 uppercase font-bold tracking-[0.2em] mb-1">
                   Platonic Solid: Dodecahedron
               </div>
               <div className="text-[10px] text-zinc-600">
                   Faces: 12 (Pentagons)
               </div>
           </div>
      </header>

      {/* 3. DUAL COLUMN LAYOUT */}
      <div className="relative z-10 flex-1 flex flex-col md:flex-row justify-between items-center w-full max-w-7xl mx-auto px-6 pb-12 gap-12 md:gap-0">
          
          {/* LEFT BANK */}
          <div className="flex flex-col gap-4 w-full md:w-80 pointer-events-auto">
              {LEFT_COL.map((item) => (
                  <Link 
                      key={item.id}
                      href={item.href}
                      className={`
                          group relative p-5 rounded-xl border backdrop-blur-sm
                          bg-black/30 hover:bg-black/60 transition-all duration-300
                          hover:-translate-y-1 hover:shadow-lg ${item.border}
                      `}
                  >
                      <div className="flex items-center gap-4 mb-3">
                          <div className={`p-2 rounded bg-white/5 ${item.color}`}>
                              <item.icon size={20} />
                          </div>
                          <div>
                              <div className="font-bold text-white leading-none">{item.title}</div>
                              <div className={`text-[9px] uppercase font-bold tracking-wider mt-1 ${item.color} opacity-70`}>
                                  {item.subtitle}
                              </div>
                          </div>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed pl-1">
                          {item.desc}
                      </p>
                  </Link>
              ))}
          </div>

          {/* CENTER SPACER (The Stage) */}
          <div className="flex-1 h-full min-h-[300px] flex items-center justify-center pointer-events-none">
              {/* Optional: Center label floating under the shape */}
              <div className="mt-64 text-[10px] text-white/20 uppercase tracking-[0.5em] animate-pulse">
                  Structure of Space
              </div>
          </div>

          {/* RIGHT BANK */}
          <div className="flex flex-col gap-4 w-full md:w-80 pointer-events-auto">
              {RIGHT_COL.map((item) => (
                  <Link 
                      key={item.id}
                      href={item.href}
                      className={`
                          group relative p-5 rounded-xl border backdrop-blur-sm
                          bg-black/30 hover:bg-black/60 transition-all duration-300
                          hover:-translate-y-1 hover:shadow-lg ${item.border}
                      `}
                  >
                      <div className="flex flex-row-reverse items-center gap-4 mb-3">
                          <div className={`p-2 rounded bg-white/5 ${item.color}`}>
                              <item.icon size={20} />
                          </div>
                          <div className="text-right">
                              <div className="font-bold text-white leading-none">{item.title}</div>
                              <div className={`text-[9px] uppercase font-bold tracking-wider mt-1 ${item.color} opacity-70`}>
                                  {item.subtitle}
                              </div>
                          </div>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed text-right pr-1">
                          {item.desc}
                      </p>
                  </Link>
              ))}
          </div>

      </div>

    </main>
  );
}