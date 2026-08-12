import Link from "next/link";
import PreAlgebraBackground from "./_components/PreAlgebraBackground";
import {
  ArrowLeft,
  ArrowRight,
  Brackets,
  Calculator,
  Divide,
  Hash,
  ListOrdered,
  Percent,
  Scale,
  Superscript,
  Variable,
  type LucideIcon,
} from "lucide-react";
import Assessment from "@/app/_components/Assessment";
import VocabApplet from "@/app/_components/VocabApplet";
import { preAlgebraVocab } from "@/app/_data/vocab/p/pre-algebra";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import { preAlgebraQuiz } from "./_components/assessment";

type ModulePresentation = {
  icon: LucideIcon;
  color: string;
  border: string;
  bg: string;
};

const MODULE_PRESENTATION: Record<string, ModulePresentation> = {
  "formal.mathematics.algebra.pre-algebra.integers": {
    icon: Hash,
    color: "text-blue-400",
    border: "hover:border-blue-500/50",
    bg: "hover:bg-blue-900/20",
  },
  "formal.mathematics.algebra.pre-algebra.pemdas": {
    icon: ListOrdered,
    color: "text-yellow-400",
    border: "hover:border-yellow-500/50",
    bg: "hover:bg-yellow-900/20",
  },
  "formal.mathematics.algebra.pre-algebra.properties": {
    icon: Brackets,
    color: "text-emerald-400",
    border: "hover:border-emerald-500/50",
    bg: "hover:bg-emerald-900/20",
  },
  "formal.mathematics.algebra.pre-algebra.ratios": {
    icon: Percent,
    color: "text-rose-400",
    border: "hover:border-rose-500/50",
    bg: "hover:bg-rose-900/20",
  },
  "formal.mathematics.algebra.pre-algebra.fractions": {
    icon: Divide,
    color: "text-orange-400",
    border: "hover:border-orange-500/50",
    bg: "hover:bg-orange-900/20",
  },
  "formal.mathematics.algebra.pre-algebra.exponents": {
    icon: Superscript,
    color: "text-purple-400",
    border: "hover:border-purple-500/50",
    bg: "hover:bg-purple-900/20",
  },
  "formal.mathematics.algebra.pre-algebra.expressions": {
    icon: Variable,
    color: "text-cyan-400",
    border: "hover:border-cyan-500/50",
    bg: "hover:bg-cyan-900/20",
  },
  "formal.mathematics.algebra.pre-algebra.equations": {
    icon: Scale,
    color: "text-indigo-400",
    border: "hover:border-indigo-500/50",
    bg: "hover:bg-indigo-900/20",
  },
};

const PAGE_CONTEXT = requireCurriculumPageContext(
  "formal.mathematics.algebra.pre-algebra",
);

if (PAGE_CONTEXT.pageKind !== "unit") {
  throw new Error("Pre-Algebra must be classified as a unit.");
}

const MODULES = PAGE_CONTEXT.activeChildren.map((module) => {
  const presentation = MODULE_PRESENTATION[module.id];
  if (!presentation) {
    throw new Error(`Pre-Algebra module ${module.id} is missing its local presentation config.`);
  }

  return {
    ...module,
    title: module.label,
    desc: module.description ?? "",
    ...presentation,
  };
});

export default function PreAlgebraPage() {
  const parent = PAGE_CONTEXT.parent;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020617] pb-32 font-sans text-slate-200 selection:bg-blue-500/30">
      <PreAlgebraBackground />
      <div className="pointer-events-none absolute inset-0 z-0 bg-radial-vignette opacity-80" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1200px] flex-col px-6 py-12">
        <header className="mb-16 mt-8 border-b border-blue-500/20 pb-8">
          <Link
            href={parent?.href ?? "/formal-science/mathematics/algebra"}
            className="group mb-8 flex w-max items-center gap-2 rounded-full border border-blue-500/30 bg-black/50 px-4 py-2 text-[10px] uppercase tracking-widest text-blue-400 backdrop-blur-sm transition-colors hover:text-white"
          >
            <ArrowLeft size={12} className="transition-transform group-hover:-translate-x-1" /> Return to {parent?.label ?? "Algebra"}
          </Link>

          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="flex items-center gap-6">
              <div className="group relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-blue-500/50 bg-black/50 shadow-[0_0_30px_rgba(59,130,246,0.2)] backdrop-blur-sm">
                <div className="absolute inset-0 translate-y-full bg-blue-500/20 transition-transform duration-500 group-hover:translate-y-0" />
                <Calculator size={40} className="relative z-10 text-blue-400" />
              </div>
              <div>
                <div className="mb-2 flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-blue-500">
                  <Hash size={12} /> Arithmetic → Symbols <span className="h-px w-12 bg-blue-500/50" />
                </div>
                <h1 className="text-5xl font-black uppercase tracking-tighter text-white drop-shadow-[0_0_20px_rgba(59,130,246,0.3)] md:text-6xl">
                  PRE-<span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">ALGEBRA</span>
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-400">
                  Build the bridge from arithmetic into algebra: extend the number system, combine operations safely, compare quantities, work with powers, then introduce variables and equations.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-blue-500/30 bg-black/60 p-4 shadow-xl backdrop-blur-sm">
              <div className="text-[9px] uppercase tracking-widest text-blue-400">Throughline</div>
              <div className="mt-1 font-mono text-xs text-slate-300">numbers → operations → relationships → symbols</div>
            </div>
          </div>
        </header>

        <section className="mb-24">
          <div className="mb-8 flex items-center gap-3">
            <div className="h-4 w-1 rounded-full bg-blue-500" />
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-blue-300">Learning Path</h2>
              <p className="mt-1 text-xs text-slate-500">Follow the sequence or jump directly to the idea you need.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {MODULES.map((module, i) => (
              <Link
                key={module.id}
                href={module.href}
                className={`group relative flex flex-col justify-between rounded-2xl border border-white/5 bg-black/40 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] ${module.border} ${module.bg}`}
              >
                <div className="mb-6 flex items-start justify-between">
                  <div className={`rounded-xl border border-white/5 bg-black/60 p-3 shadow-inner transition-colors ${module.color}`}>
                    <module.icon size={24} strokeWidth={1.5} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 opacity-30 transition-opacity group-hover:opacity-70">
                    {`STEP ${String(i + 1).padStart(2, "0")}`}
                  </span>
                </div>

                <div>
                  <h2 className="mb-2 font-sans text-lg font-bold text-white transition-colors group-hover:text-blue-100">
                    {module.title}
                  </h2>
                  <p className="font-sans text-xs leading-relaxed text-slate-400">{module.desc}</p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 transition-colors group-hover:text-blue-400">
                    Study topic
                  </span>
                  <ArrowRight size={14} className="text-slate-600 transition-all group-hover:translate-x-1 group-hover:text-blue-400" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-auto pb-16">
          <div className="mb-8 flex items-center gap-3">
            <div className="h-4 w-1 rounded-full bg-blue-500" />
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-blue-300">Reference & Check</h2>
              <p className="mt-1 text-xs text-slate-500">Review key vocabulary, then check the ideas that connect the unit.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="col-span-1">
              <VocabApplet currentDomain="Pre-Algebra" localTerms={preAlgebraVocab || []} accentColor="blue" />
            </div>
            <div className="col-span-1 lg:col-span-2">
              <Assessment
                title="Pre-Algebra Checkpoint"
                questions={preAlgebraQuiz || []}
                accentColor="blue"
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
