"use client";
import Link from "next/link";
import VectorBackground from "@/app/formal-science/mathematics/VectorBackground";
import MathLattice from "@/app/formal-science/mathematics/MathLattice";
import { ArrowLeft, Sigma, MousePointer2 } from "lucide-react";

export default function MathematicsPage() {
  return (
    <main className="relative h-screen w-screen bg-[#09090b] text-zinc-200 overflow-hidden font-sans flex flex-col items-center justify-center">
      
      {/* 1. VISUAL ENGINE */}
      <VectorBackground />
      
      {/* 2. HEADER (Fixed Top Left) */}
      <header className="absolute top-0 left-0 p-8 z-50">
         <div className="flex items-center gap-6">
             <Link href="/" className="flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-white transition-colors uppercase tracking-widest">
                <ArrowLeft size={12} /> Formal Science
             </Link>
             <div className="h-4 w-px bg-white/10" />
             <div className="flex items-center gap-3">
                 <div className="p-2 bg-zinc-900 border border-white/10 rounded">
                    <Sigma size={16} className="text-white" />
                 </div>
                 <h1 className="text-xl font-black text-white tracking-tight font-sans">
                    MATHEMATICS
                 </h1>
             </div>
         </div>
      </header>

      {/* 3. FOOTER INFO (Fixed Bottom Right) */}
      <div className="absolute bottom-8 right-8 text-right pointer-events-none z-40">
         <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-1">
             Visualization: 7-Vertex Complete Graph
         </div>
         <div className="flex items-center justify-end gap-2 text-[10px] text-zinc-500">
             <MousePointer2 size={10} /> Interact to Explore Domains
         </div>
      </div>

      {/* 4. MAIN LATTICE (Centered) */}
      {/* We use scale to ensure it fits on smaller screens */}
      <div className="relative z-10 scale-75 md:scale-90 lg:scale-100 transition-transform duration-500">
         <MathLattice />
      </div>

    </main>
  );
}