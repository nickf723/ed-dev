"use client";
import Link from "next/link";
import GeometryBackground from "@/app/formal-science/mathematics/geometry/GeometryBackground";
import UnitCircleLab from "@/app/formal-science/mathematics/geometry/UnitCircleLab";
import { 
  ArrowLeft, Triangle, Globe, Compass, 
  Hexagon, Ruler
} from "lucide-react";

export default function GeometryPage() {
  return (
    <main className="relative min-h-screen bg-[#022c22] text-emerald-50 overflow-hidden font-sans selection:bg-white/30">
      
      {/* 1. VISUAL ENGINE */}
      <GeometryBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none z-0" />

      {/* 2. HEADER */}
      <header className="relative z-20 flex items-center justify-between px-8 py-6 border-b border-white/10 bg-[#022c22]/90 backdrop-blur-md sticky top-0">
         <div className="flex items-center gap-6">
             <Link href="/formal-science/mathematics" className="flex items-center gap-2 text-xs font-mono text-emerald-400 hover:text-emerald-300 transition-colors uppercase tracking-widest">
                <ArrowLeft size={12} /> Mathematics
             </Link>
             <div className="h-4 w-px bg-white/10" />
             <div className="flex items-center gap-3">
                 <div className="p-1.5 bg-emerald-950 border border-emerald-500/50 rounded">
                    <Triangle size={18} className="text-emerald-500" />
                 </div>
                 <h1 className="text-xl font-bold text-white tracking-tight">
                    GEOMETRY
                 </h1>
             </div>
         </div>
         <div className="hidden md:block text-[10px] font-mono text-emerald-500/50 uppercase tracking-widest">
            Measure of Earth
         </div>
      </header>

      {/* 3. CONTENT GRID */}
      <div className="relative z-10 container mx-auto p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* LEFT: THE CONCEPTS */}
                <div className="lg:col-span-7 space-y-6">
                    
                    {/* HERO CARD */}
                    <div className="bg-emerald-950/60 backdrop-blur-md border border-white/10 rounded-2xl p-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-24 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold text-white mb-4">The Shape of Logic</h2>
                            <p className="text-sm text-emerald-100/80 leading-relaxed mb-6">
                                From the Greek <em>geo</em> (earth) and <em>metron</em> (measure). It is the study of properties of space that are preserved under various transformations. It starts with points and lines (Euclidean) and expands to curved space (Riemannian), which Einstein used to describe gravity.
                            </p>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-black/30 rounded border border-white/5">
                                    <Compass size={14} className="text-emerald-400" />
                                    <span className="text-xs font-mono">Axioms</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-black/30 rounded border border-white/5">
                                    <Hexagon size={14} className="text-emerald-400" />
                                    <span className="text-xs font-mono">Polygons</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    

                    {/* DOMAINS GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        <div className="bg-emerald-950/40 border border-white/5 p-5 rounded-xl hover:border-emerald-500/30 transition-colors group">
                            <div className="flex items-center gap-3 mb-2">
                                <Ruler className="text-emerald-500" size={20} />
                                <h3 className="font-bold text-white">Euclidean</h3>
                            </div>
                            <p className="text-xs text-emerald-100/60">
                                Flat space. The geometry of everyday experience. $180^\circ$ in a triangle.
                            </p>
                        </div>

                        <div className="bg-emerald-950/40 border border-white/5 p-5 rounded-xl hover:border-emerald-500/30 transition-colors group">
                            <div className="flex items-center gap-3 mb-2">
                                <Globe className="text-emerald-500" size={20} />
                                <h3 className="font-bold text-white">Non-Euclidean</h3>
                            </div>
                            <p className="text-xs text-emerald-100/60">
                                Curved space. Hyperbolic and Elliptic geometry. Lines can intersect twice or never.
                            </p>
                        </div>
                        
                        <div className="bg-emerald-950/40 border border-white/5 p-5 rounded-xl hover:border-emerald-500/30 transition-colors group">
                            <div className="flex items-center gap-3 mb-2">
                                <Compass className="text-emerald-500" size={20} />
                                <h3 className="font-bold text-white">Trigonometry</h3>
                            </div>
                            <p className="text-xs text-emerald-100/60">
                                The study of triangles and the relationships between lengths and angles.
                            </p>
                        </div>

                    </div>
                </div>

                {/* RIGHT: INTERACTIVE LAB */}
                <div className="lg:col-span-5 space-y-6 flex flex-col items-center">
                    
                    {/* WIDGET */}
                    <UnitCircleLab />

                    {/* PYTHAGORAS CARD */}
                    <div className="bg-emerald-950/60 border border-white/10 rounded-xl p-6 w-full">
                        <h3 className="font-bold text-white mb-2">Euclid's Elements</h3>
                        <p className="text-xs text-emerald-100/60 leading-relaxed mb-3">
                            Written around 300 BC, it is one of the most influential textbooks in history. It deduces the properties of geometric objects from a small set of axioms.
                        </p>
                        <div className="p-3 bg-black/20 rounded font-mono text-center text-lg text-emerald-400 font-bold border border-white/5">
                            a² + b² = c²
                        </div>
                    </div>

                </div>

            </div>
      </div>
    </main>
  );
}