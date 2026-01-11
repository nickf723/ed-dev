"use client";
import { useState } from "react";
import Link from "next/link";
import LinearAlgebraBackground from "./LinearAlgebraBackground";
import { 
  ArrowLeft, Grid3X3, MoveUpRight, 
  BoxSelect, Scaling, Layers, ArrowRightLeft,
  Braces, Sigma, Variable
} from "lucide-react";

// --- CURRICULUM MATRIX (2 Rows x 3 Columns) ---
const MATRIX_ELEMENTS = [
  // ROW 1
  {
    id: "vectors",
    idx: "1,1", // a_11
    title: "Vectors",
    icon: MoveUpRight,
    desc: "Direction & Magnitude",
    color: "text-red-400",
    border: "group-hover:border-red-500/50",
    bg: "group-hover:bg-red-950/30",
    href: "linear-algebra/vectors"
  },
  {
    id: "matrices",
    idx: "1,2", // a_12
    title: "Matrices",
    icon: Grid3X3,
    desc: "The Grid Structure",
    color: "text-emerald-400",
    border: "group-hover:border-emerald-500/50",
    bg: "group-hover:bg-emerald-950/30",
    href: "linear-algebra/matrices"
  },
  {
    id: "systems",
    idx: "1,3", // a_13
    title: "Solvers",
    icon: ArrowRightLeft,
    desc: "Gaussian RREF",
    color: "text-blue-400",
    border: "group-hover:border-blue-500/50",
    bg: "group-hover:bg-blue-950/30",
    href: "linear-algebra/systems"
  },
  // ROW 2
  {
    id: "determinants",
    idx: "2,1", // a_21
    title: "Determinants",
    icon: BoxSelect,
    desc: "Area Scaling",
    color: "text-amber-400",
    border: "group-hover:border-amber-500/50",
    bg: "group-hover:bg-amber-950/30",
    href: "linear-algebra/determinants"
  },
  {
    id: "spaces",
    idx: "2,2", // a_22
    title: "Spaces",
    icon: Layers,
    desc: "Basis & Span",
    color: "text-violet-400",
    border: "group-hover:border-violet-500/50",
    bg: "group-hover:bg-violet-950/30",
    href: "linear-algebra/spaces"
  },
  {
    id: "eigen",
    idx: "2,3", // a_23
    title: "Eigen",
    icon: Scaling,
    desc: "Invariant Vectors",
    color: "text-fuchsia-400",
    border: "group-hover:border-fuchsia-500/50",
    bg: "group-hover:bg-fuchsia-950/30",
    href: "linear-algebra/eigen"
  }
];

export default function LinearAlgebraPage() {
  const [hoveredIdx, setHoveredIdx] = useState<string | null>(null);

  // Helper to determine if a card is in the same Row or Column as the hovered card
  const getRelation = (targetIdx: string) => {
    if (!hoveredIdx) return "opacity-100";
    const [hRow, hCol] = hoveredIdx.split(",");
    const [tRow, tCol] = targetIdx.split(",");
    
    if (hRow === tRow || hCol === tCol) return "opacity-100"; // Same row/col stays bright
    return "opacity-30 blur-[1px]"; // Others fade out
  };

  return (
    <main className="relative min-h-screen bg-[#020410] text-white overflow-hidden font-mono selection:bg-indigo-500/30 flex flex-col items-center justify-center">
      
      {/* 1. VISUAL ENGINE */}
      <LinearAlgebraBackground />
      
      {/* OVERLAY: MATH PAPER TEXTURE */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none z-0" />
      
      {/* 2. HEADER (Top Left) */}
      <header className="absolute top-0 left-0 p-8 z-20">
         <Link href="/mathematics" className="flex items-center gap-2 text-xs text-indigo-500 hover:text-white transition-colors mb-2 uppercase tracking-widest group">
            <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Mathematics // Domain_03
         </Link>
         <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-indigo-500/50">
             LINEAR<br/>ALGEBRA
         </h1>
      </header>

      {/* 3. THE NAVIGATION MATRIX */}
      <div className="relative z-10 p-4 md:p-12 scale-90 md:scale-100 transition-transform">
          
          {/* Matrix Label */}
          <div className="absolute -top-8 left-0 text-indigo-500/50 font-bold text-xl font-serif italic">
              A =
          </div>

          <div className="flex items-stretch">
              
              {/* LEFT BRACKET */}
              <div className="w-8 md:w-16 border-l-4 border-t-4 border-b-4 border-white/20 rounded-l-xl -mr-2 relative">
                  <div className="absolute top-1/2 -left-6 -translate-y-1/2 text-[10px] text-zinc-600 -rotate-90 whitespace-nowrap tracking-widest uppercase hidden md:block">
                      2 Rows (Dimensions)
                  </div>
              </div>

              {/* THE GRID (The Matrix Elements) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 p-4">
                  {MATRIX_ELEMENTS.map((item) => (
                      <Link
                          key={item.id}
                          href={item.href}
                          onMouseEnter={() => setHoveredIdx(item.idx)}
                          onMouseLeave={() => setHoveredIdx(null)}
                          className={`
                              group relative w-full md:w-64 h-32 
                              flex flex-col justify-between p-5
                              bg-black/40 backdrop-blur-md border border-white/10 rounded-lg
                              transition-all duration-300
                              ${item.border} ${item.bg}
                              ${getRelation(item.idx)}
                              hover:!opacity-100 hover:scale-105 hover:z-20 hover:shadow-2xl
                          `}
                      >
                          {/* Math Index (a_11) */}
                          <div className="absolute top-3 right-3 text-[10px] font-serif italic text-zinc-600 group-hover:text-white/50">
                              a<sub className="not-italic">{item.idx}</sub>
                          </div>

                          {/* Icon */}
                          <div className={`
                              w-10 h-10 rounded bg-white/5 flex items-center justify-center
                              transition-colors duration-300
                              ${item.color} group-hover:bg-black/50
                          `}>
                              <item.icon size={20} />
                          </div>

                          {/* Text */}
                          <div>
                              <div className="text-lg font-bold text-white group-hover:text-indigo-200 transition-colors">
                                  {item.title}
                              </div>
                              <div className="text-xs text-zinc-500 group-hover:text-zinc-300">
                                  {item.desc}
                              </div>
                          </div>
                          
                          {/* Corner Accent */}
                          <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-white/0 group-hover:border-white/40 transition-colors" />
                          <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-white/0 group-hover:border-white/40 transition-colors" />
                      </Link>
                  ))}
              </div>

              {/* RIGHT BRACKET */}
              <div className="w-8 md:w-16 border-r-4 border-t-4 border-b-4 border-white/20 rounded-r-xl -ml-2 relative">
                  <div className="absolute top-1/2 -right-6 -translate-y-1/2 text-[10px] text-zinc-600 rotate-90 whitespace-nowrap tracking-widest uppercase hidden md:block">
                      3 Columns (Attributes)
                  </div>
              </div>
          </div>

          {/* Matrix Dimension Label */}
          <div className="absolute -bottom-8 right-0 text-indigo-500/50 font-mono text-xs">
              2 × 3 Matrix (Real)
          </div>

      </div>

      {/* FOOTER - Calculation Ticker */}
      <div className="absolute bottom-6 left-0 w-full text-center pointer-events-none">
          <div className="inline-flex items-center gap-6 px-6 py-2 rounded-full bg-white/5 border border-white/5 backdrop-blur-md text-[10px] font-mono text-indigo-300">
              <span className="flex items-center gap-2">
                  <Variable size={10} /> DET(A) ≠ 0
              </span>
              <span className="w-px h-3 bg-white/10"></span>
              <span className="flex items-center gap-2">
                  <Sigma size={10} /> Rank = 2
              </span>
              <span className="w-px h-3 bg-white/10"></span>
              <span className="text-zinc-500">System: Consistent</span>
          </div>
      </div>

    </main>
  );
}