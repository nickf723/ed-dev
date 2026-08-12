"use client";

import { useState } from "react";
import Link from "next/link";
import LinearAlgebraBackground from "./_components/LinearAlgebraBackground";
import {
  ArrowLeft,
  ArrowRightLeft,
  Axis3d,
  Box,
  BoxSelect,
  Grid3X3,
  Layers,
  MoveUpRight,
  Scaling,
  Shapes,
  Sigma,
  Variable,
  type LucideIcon,
} from "lucide-react";

export type LinearAlgebraNode = {
  id: string;
  label: string;
  href: string;
  description: string;
  status: "active" | "placeholder";
};

type LinearAlgebraClientProps = {
  modules: readonly LinearAlgebraNode[];
  parentHref: string;
};

type MatrixPresentation = {
  idx: string;
  icon: LucideIcon;
  caption: string;
  displayTitle?: string;
  color: string;
  border: string;
  bg: string;
};

const MATRIX_PRESENTATION: Record<string, MatrixPresentation> = {
  "formal.mathematics.algebra.linear-algebra.vectors": {
    idx: "1,1",
    icon: MoveUpRight,
    caption: "Direction & Magnitude",
    color: "text-red-400",
    border: "group-hover:border-red-500/50",
    bg: "group-hover:bg-red-950/30",
  },
  "formal.mathematics.algebra.linear-algebra.matrices": {
    idx: "1,2",
    icon: Grid3X3,
    caption: "The Grid Structure",
    color: "text-emerald-400",
    border: "group-hover:border-emerald-500/50",
    bg: "group-hover:bg-emerald-950/30",
  },
  "formal.mathematics.algebra.linear-algebra.systems": {
    idx: "1,3",
    icon: ArrowRightLeft,
    caption: "Gaussian RREF",
    displayTitle: "Solvers",
    color: "text-blue-400",
    border: "group-hover:border-blue-500/50",
    bg: "group-hover:bg-blue-950/30",
  },
  "formal.mathematics.algebra.linear-algebra.determinants": {
    idx: "2,1",
    icon: BoxSelect,
    caption: "Area Scaling Factor",
    color: "text-amber-400",
    border: "group-hover:border-amber-500/50",
    bg: "group-hover:bg-amber-950/30",
  },
  "formal.mathematics.algebra.linear-algebra.transformations": {
    idx: "2,2",
    icon: Shapes,
    caption: "Spatial Warping",
    displayTitle: "Transforms",
    color: "text-orange-400",
    border: "group-hover:border-orange-500/50",
    bg: "group-hover:bg-orange-950/30",
  },
  "formal.mathematics.algebra.linear-algebra.spaces": {
    idx: "2,3",
    icon: Layers,
    caption: "Basis & Span",
    color: "text-violet-400",
    border: "group-hover:border-violet-500/50",
    bg: "group-hover:bg-violet-950/30",
  },
  "formal.mathematics.algebra.linear-algebra.eigen": {
    idx: "3,1",
    icon: Scaling,
    caption: "Invariant Vectors",
    color: "text-fuchsia-400",
    border: "group-hover:border-fuchsia-500/50",
    bg: "group-hover:bg-fuchsia-950/30",
  },
  "formal.mathematics.algebra.linear-algebra.orthogonality": {
    idx: "3,2",
    icon: Axis3d,
    caption: "Projections & Gram",
    color: "text-cyan-400",
    border: "group-hover:border-cyan-500/50",
    bg: "group-hover:bg-cyan-950/30",
  },
  "formal.mathematics.algebra.linear-algebra.svd": {
    idx: "3,3",
    icon: Box,
    caption: "Data Compression",
    displayTitle: "SVD",
    color: "text-pink-400",
    border: "group-hover:border-pink-500/50",
    bg: "group-hover:bg-pink-950/30",
  },
};

function buildMatrixElements(modules: readonly LinearAlgebraNode[]) {
  return modules.map((module) => {
    const presentation = MATRIX_PRESENTATION[module.id];
    if (!presentation) {
      throw new Error(`Linear Algebra module ${module.id} is missing its local presentation config.`);
    }

    return {
      ...module,
      title: presentation.displayTitle ?? module.label,
      desc: presentation.caption,
      ...presentation,
    };
  });
}

export default function LinearAlgebraClient({
  modules,
  parentHref,
}: LinearAlgebraClientProps) {
  const matrixElements = buildMatrixElements(modules);
  const [hoveredIdx, setHoveredIdx] = useState<string | null>(null);

  const getRelation = (targetIdx: string) => {
    if (!hoveredIdx) return "opacity-100";
    const [hRow, hCol] = hoveredIdx.split(",");
    const [tRow, tCol] = targetIdx.split(",");

    if (hRow === tRow && hCol === tCol) return "opacity-100 scale-105 z-30 shadow-[0_0_40px_rgba(99,102,241,0.4)]";
    if (hRow === tRow || hCol === tCol) return "opacity-80 scale-[1.02] z-20";
    return "opacity-20 blur-[2px] scale-95";
  };

  return (
    <main className="relative min-h-screen bg-[#020410] text-white overflow-hidden font-mono selection:bg-indigo-500/30 flex flex-col items-center justify-center pt-24 pb-12">
      <LinearAlgebraBackground />

      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none z-0" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-500/30 shadow-[0_0_20px_#6366f1] animate-[scanDown_8s_linear_infinite] z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none z-0" />

      <header className="absolute top-0 left-0 w-full p-8 z-20 flex justify-between items-start">
        <div>
          <Link href={parentHref} className="flex items-center gap-2 text-xs text-indigo-500 hover:text-white transition-colors mb-2 uppercase tracking-widest group bg-black/40 px-4 py-2 rounded-full border border-indigo-500/30 backdrop-blur-md w-max">
            <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" /> Math // Domain_03
          </Link>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-indigo-500/50 mt-4 drop-shadow-lg">
            LINEAR<br />ALGEBRA
          </h1>
        </div>

        <div className="hidden lg:flex flex-col gap-2 text-[10px] uppercase tracking-widest text-indigo-300/50 text-right bg-black/40 p-4 rounded-xl border border-white/5 backdrop-blur-md">
          <div className="text-white font-bold mb-1 border-b border-white/10 pb-2">Matrix Specs</div>
          <div>Dimensions: <span className="text-indigo-400">3 × 3</span></div>
          <div>Space: <span className="text-emerald-400">ℝ³</span></div>
          <div>Status: <span className="text-amber-400 animate-pulse">Computing</span></div>
        </div>
      </header>

      <div className="relative z-10 w-full max-w-5xl px-4 md:px-12 mt-12 transition-transform">
        <div className="absolute top-1/2 -left-4 -translate-y-1/2 text-indigo-500/40 font-bold text-6xl font-serif italic hidden lg:block">
          M =
        </div>

        <div className="flex items-stretch justify-center relative">
          <div className="w-12 md:w-24 border-l-8 border-t-8 border-b-8 border-white/20 rounded-l-3xl -mr-4 relative shadow-[-10px_0_20px_rgba(255,255,255,0.05)]">
            <div className="absolute top-1/2 -left-8 -translate-y-1/2 text-xs text-indigo-400/50 -rotate-90 whitespace-nowrap tracking-[0.3em] uppercase hidden md:block font-bold">
              Rows (Basis)
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 md:p-8 flex-1 relative z-10">
            {matrixElements.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onMouseEnter={() => setHoveredIdx(item.idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`group relative w-full h-40 flex flex-col justify-between p-6 bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl transition-all duration-500 ease-out ${item.border} ${item.bg} ${getRelation(item.idx)}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br from-current to-transparent opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-500 pointer-events-none ${item.color}`} />

                <div className="absolute top-4 right-4 text-xs font-serif italic text-zinc-600 group-hover:text-white/70 transition-colors">
                  a<sub className="not-italic text-[10px] ml-0.5">{item.idx}</sub>
                </div>

                <div className={`w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center transition-all duration-300 border border-white/5 ${item.color} group-hover:bg-black/80 group-hover:scale-110 shadow-inner`}>
                  <item.icon size={24} strokeWidth={1.5} />
                </div>

                <div className="mt-auto">
                  <div className="text-xl font-bold text-white group-hover:text-indigo-200 transition-colors tracking-tight">
                    {item.title}
                  </div>
                  <div className="text-xs text-zinc-500 group-hover:text-zinc-300 font-sans mt-1">
                    {item.desc}
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-white/0 group-hover:border-current transition-colors rounded-bl-lg" />
                <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-white/0 group-hover:border-current transition-colors rounded-tr-lg" />
              </Link>
            ))}
          </div>

          <div className="w-12 md:w-24 border-r-8 border-t-8 border-b-8 border-white/20 rounded-r-3xl -ml-4 relative shadow-[10px_0_20px_rgba(255,255,255,0.05)]">
            <div className="absolute top-1/2 -right-8 -translate-y-1/2 text-xs text-indigo-400/50 rotate-90 whitespace-nowrap tracking-[0.3em] uppercase hidden md:block font-bold">
              Cols (Transforms)
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 w-full text-center pointer-events-none z-20">
        <div className="inline-flex items-center gap-4 md:gap-8 px-8 py-3 rounded-full bg-black/60 border border-indigo-500/20 backdrop-blur-xl text-xs font-mono text-indigo-300 shadow-[0_0_30px_rgba(99,102,241,0.2)]">
          <span className="flex items-center gap-2">
            <Variable size={14} className="text-indigo-500" /> DET(M) ≠ 0
          </span>
          <span className="w-px h-4 bg-indigo-500/30" />
          <span className="flex items-center gap-2">
            <Sigma size={14} className="text-indigo-500" /> Rank = 3
          </span>
          <span className="w-px h-4 bg-indigo-500/30" />
          <span className="text-emerald-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> System Active
          </span>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scanDown {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      ` }} />
    </main>
  );
}
