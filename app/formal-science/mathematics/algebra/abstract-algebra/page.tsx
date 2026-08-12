import Link from "next/link";
import AbstractBackground from "./_components/AbstractBackground";
import SymmetryBackground from "./_components/SymmetryBackground";
import { M } from "@/app/_components/Math";
import {
  ArrowLeft,
  ArrowRight,
  Boxes,
  Circle,
  Gem,
  Hexagon,
  Infinity,
  Network,
  RefreshCcw,
  type LucideIcon,
} from "lucide-react";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";

type AbstractPresentation = {
  subtitle: string;
  notation: string;
  icon: LucideIcon;
  color: string;
  border: string;
  bg: string;
  glow: string;
};

const MODULE_PRESENTATION: Record<string, AbstractPresentation> = {
  "formal.mathematics.algebra.abstract-algebra.group-theory": {
    subtitle: "Symmetry",
    notation: "(G, \\bullet)",
    icon: RefreshCcw,
    color: "text-purple-400",
    border: "group-hover:border-purple-500/50",
    bg: "group-hover:bg-purple-900/20",
    glow: "group-hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]",
  },
  "formal.mathematics.algebra.abstract-algebra.maps": {
    subtitle: "Relation",
    notation: "\\phi(xy)=\\phi(x)\\phi(y)",
    icon: Network,
    color: "text-blue-400",
    border: "group-hover:border-blue-500/50",
    bg: "group-hover:bg-blue-900/20",
    glow: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]",
  },
  "formal.mathematics.algebra.abstract-algebra.ring-theory": {
    subtitle: "Arithmetic",
    notation: "(R, +, \\bullet)",
    icon: Circle,
    color: "text-emerald-400",
    border: "group-hover:border-emerald-500/50",
    bg: "group-hover:bg-emerald-900/20",
    glow: "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]",
  },
  "formal.mathematics.algebra.abstract-algebra.field-theory": {
    subtitle: "Continuum",
    notation: "\\mathbb{F} = R / M",
    icon: Infinity,
    color: "text-cyan-400",
    border: "group-hover:border-cyan-500/50",
    bg: "group-hover:bg-cyan-900/20",
    glow: "group-hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]",
  },
  "formal.mathematics.algebra.abstract-algebra.vector-spaces": {
    subtitle: "Linearity",
    notation: "V \\text{ over } \\mathbb{F}",
    icon: Boxes,
    color: "text-indigo-400",
    border: "group-hover:border-indigo-500/50",
    bg: "group-hover:bg-indigo-900/20",
    glow: "group-hover:shadow-[0_0_30px_rgba(99,102,241,0.3)]",
  },
  "formal.mathematics.algebra.abstract-algebra.galois-theory": {
    subtitle: "Unification",
    notation: "\\text{Gal}(E/F)",
    icon: Hexagon,
    color: "text-fuchsia-400",
    border: "group-hover:border-fuchsia-500/50",
    bg: "group-hover:bg-fuchsia-900/20",
    glow: "group-hover:shadow-[0_0_30px_rgba(217,70,239,0.3)]",
  },
};

function buildModules(nodes: readonly CurriculumNode[]) {
  return nodes.map((module) => {
    const presentation = MODULE_PRESENTATION[module.id];
    if (!presentation) {
      throw new Error(`Abstract Algebra module ${module.id} is missing its local presentation config.`);
    }

    return {
      ...module,
      title: module.label,
      desc: module.description ?? "",
      ...presentation,
    };
  });
}

type AbstractModule = ReturnType<typeof buildModules>[number];

export default function AbstractAlgebraPage() {
  const context = requireCurriculumPageContext("formal.mathematics.algebra.abstract-algebra");
  const modules = buildModules(context.children);

  return (
    <main className="relative min-h-screen bg-[#05020a] text-white overflow-hidden font-sans selection:bg-purple-500/30 flex flex-col pb-20">
      <SymmetryBackground />
      <AbstractBackground />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none z-0" />

      <header className="relative z-10 p-8 pt-16 pb-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-8 gap-6">
          <div>
            <Link href={context.parent?.href ?? "/formal-science/mathematics/algebra"} className="flex items-center gap-2 text-xs text-purple-400 hover:text-white transition-colors mb-6 uppercase tracking-widest group bg-black/40 px-4 py-2 rounded-full border border-purple-500/30 backdrop-blur-md w-max shadow-lg">
              <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" /> Algebra // Domain_04
            </Link>
            <div className="flex items-center gap-6">
              <div className="bg-purple-500/10 p-4 rounded-2xl border border-purple-500/30 backdrop-blur-xl shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                <Gem size={48} className="text-purple-400" />
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white drop-shadow-lg">
                ABSTRACT<br />ALGEBRA
              </h1>
            </div>
          </div>

          <div className="hidden lg:block text-right bg-black/40 p-5 rounded-2xl border border-white/10 backdrop-blur-md shadow-xl">
            <div className="text-xs text-purple-300 font-bold uppercase tracking-widest mb-3 border-b border-white/10 pb-2">
              Structure & Symmetry
            </div>
            <div className="text-xs text-zinc-400 max-w-xs leading-relaxed font-mono flex items-center justify-end gap-3">
              Visualizing Direct Product:
              <span className="text-white bg-purple-900/50 px-2 py-1 rounded border border-purple-500/30">
                <M>{"C_{12} \\times C_8"}</M>
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 flex-1 px-6 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((item, index) => (
            <ModuleCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </main>
  );
}

function ModuleCard({ item, index }: { item: AbstractModule; index: number }) {
  const isPlanned = item.status === "placeholder";
  const className = `group relative flex flex-col p-8 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 transition-all duration-500 ease-out ${isPlanned ? "opacity-60 cursor-default border-dashed" : `hover:-translate-y-2 ${item.border} ${item.bg} ${item.glow}`}`;

  const content = (
    <>
      {isPlanned ? (
        <span className="absolute top-5 left-5 rounded-full border border-white/10 bg-black/60 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-zinc-400">
          Planned
        </span>
      ) : null}

      <div className="flex justify-between items-start mb-8 relative z-10">
        <div className={`p-4 rounded-xl bg-black/60 border border-white/10 ${item.color} ${isPlanned ? "" : "group-hover:scale-110"} transition-transform shadow-inner`}>
          <item.icon size={28} strokeWidth={1.5} />
        </div>
        <div className="text-right">
          <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest block mb-2">
            Mod {String(index + 1).padStart(2, "0")}
          </span>
          <span className={`text-sm font-bold bg-black/60 px-3 py-1.5 rounded-lg border border-white/5 ${item.color} shadow-inner inline-block`}>
            <M>{item.notation}</M>
          </span>
        </div>
      </div>

      <div className="relative z-10 mt-auto">
        <h2 className="text-3xl font-black text-white mb-2 group-hover:text-purple-100 transition-colors tracking-tight">
          {item.title}
        </h2>
        <div className={`text-xs font-bold uppercase tracking-widest mb-4 ${item.color}`}>
          {item.subtitle}
        </div>
        <p className="text-sm text-zinc-400 leading-relaxed min-h-[3rem] group-hover:text-zinc-300 transition-colors">
          {item.desc}
        </p>
      </div>

      {!isPlanned ? (
        <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
          <ArrowRight className={item.color} size={24} />
        </div>
      ) : null}
    </>
  );

  if (isPlanned) return <article className={className} aria-disabled="true">{content}</article>;
  return <Link href={item.href} className={className}>{content}</Link>;
}
