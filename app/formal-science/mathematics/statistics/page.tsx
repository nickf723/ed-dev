import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  Dices,
  Filter,
  FlaskConical,
  Gauge,
  ScatterChart,
  Sigma,
  type LucideIcon,
} from "lucide-react";
import GaltonBoardBackground from "./GaltonBoardBackground";
import RegressionLab from "./RegressionLab";
import SamplingDistributionLab from "./SamplingDistributionLab";

const NODE_ID = "formal.mathematics.statistics";

type BranchMeta = {
  icon: LucideIcon;
  code: string;
  role: string;
  rgb: string;
};

const BRANCH_META: Record<string, BranchMeta> = {
  "formal.mathematics.statistics.descriptive": {
    icon: BarChart3,
    code: "DES",
    role: "summarize observed data",
    rgb: "45, 212, 191",
  },
  "formal.mathematics.statistics.probability": {
    icon: Dices,
    code: "PRB",
    role: "model uncertainty",
    rgb: "192, 132, 252",
  },
  "formal.mathematics.statistics.inferential": {
    icon: FlaskConical,
    code: "INF",
    role: "learn beyond the sample",
    rgb: "96, 165, 250",
  },
  "formal.mathematics.statistics.bayesian": {
    icon: BrainCircuit,
    code: "BAY",
    role: "update uncertainty with evidence",
    rgb: "244, 114, 182",
  },
};

const WORKFLOW = [
  { number: "01", label: "Observe", detail: "Define units, variables, measurement, sampling, and the process that generated the data.", rgb: "125, 211, 252" },
  { number: "02", label: "Describe", detail: "Summarize distributions with center, spread, shape, relationships, and visual displays.", rgb: "45, 212, 191" },
  { number: "03", label: "Model", detail: "Represent randomness and uncertainty with probability models and assumptions.", rgb: "192, 132, 252" },
  { number: "04", label: "Infer", detail: "Use sample information to estimate, compare, predict, or update claims while keeping uncertainty visible.", rgb: "244, 114, 182" },
] as const;

const GUARDRAILS = [
  ["Statistic ≠ parameter", "A statistic is calculated from a sample. A parameter describes a population or model and is usually unknown."],
  ["Association ≠ causation", "A relationship in observed data does not identify a causal mechanism without a design or assumptions that justify that conclusion."],
  ["Uncertainty is part of the answer", "Sampling variability, measurement error, model uncertainty, and selection effects should be quantified or discussed rather than hidden."],
  ["A model is conditional", "Statistical conclusions inherit the assumptions, data-generating process, and scope of the model used to produce them."],
] as const;

export default function StatisticsPage() {
  const context = requireCurriculumPageContext(NODE_ID);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#020617] text-slate-100 selection:bg-indigo-400/25">
      <GaltonBoardBackground />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_78%_18%,rgba(99,102,241,0.13),transparent_30%),radial-gradient(circle_at_18%_82%,rgba(45,212,191,0.055),transparent_28%),linear-gradient(to_bottom,rgba(2,6,23,0.10),rgba(2,6,23,0.75)_74%,rgba(2,6,23,0.96))]" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-[1560px] px-4 pb-14 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.06] bg-[#020617]/78 px-4 pb-3 pt-5 shadow-[0_18px_58px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={context.breadcrumbs}
            eyebrow="Data · variability · probability · inference"
            eyebrowStyle="rule"
            icon={BarChart3}
            title={<span>Statistics</span>}
            subtitle="Statistics studies how data vary, how samples relate to larger populations or processes, and how uncertainty changes what conclusions are justified. The subject links measurement, description, probability models, estimation, prediction, and inference."
            accentRgb="129, 140, 248"
            titleClassName="font-sans text-[clamp(3rem,5.7vw,6.2rem)] font-semibold leading-[0.83] tracking-[-0.067em] text-[#fafaff]"
            headerClassName="border-indigo-100/[0.10]"
          />
        </div>

        <section className="mt-5 overflow-hidden rounded-[30px] border border-indigo-200/[0.10] bg-black/[0.16] backdrop-blur-xl">
          <div className="grid gap-4 border-b border-white/[0.07] px-5 py-5 lg:grid-cols-[minmax(0,1fr)_410px] lg:items-end sm:px-6">
            <div>
              <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-indigo-200/62"><Filter size={13} /> Statistical workflow</div>
              <h2 className="mt-2 text-[clamp(1.9rem,3.6vw,3.3rem)] font-semibold leading-[0.94] tracking-[-0.05em] text-white">A number becomes evidence only after you understand how it was produced.</h2>
            </div>
            <p className="text-[12px] leading-6 text-slate-400">Good statistical reasoning moves back and forth among data, design, probability, and interpretation. Calculation is one piece of the pipeline, not the pipeline itself.</p>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-4">
            {WORKFLOW.map((step) => (
              <article key={step.label} className="min-h-[190px] border-b border-white/[0.06] px-5 py-5 md:border-r md:[&:nth-child(2n)]:border-r-0 xl:border-b-0 xl:[&:nth-child(2n)]:border-r xl:last:border-r-0">
                <div className="flex items-center justify-between gap-3"><span className="font-mono text-[8px] text-slate-700">{step.number}</span><span className="h-2 w-2 rounded-full" style={{ background: `rgb(${step.rgb})`, boxShadow: `0 0 16px rgba(${step.rgb},0.25)` }} /></div>
                <h3 className="mt-5 text-[15px] font-semibold text-white">{step.label}</h3>
                <p className="mt-2 text-[10px] leading-5 text-slate-600">{step.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-5 grid gap-5 xl:grid-cols-[420px_minmax(0,1fr)]">
          <nav aria-label="Statistics branches" className="overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/[0.14] backdrop-blur-xl">
            <div className="border-b border-white/[0.07] px-5 py-4"><div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-indigo-200/58">Primary branches</div><p className="mt-1 text-[10px] leading-5 text-slate-600">Only Probability currently has a built route. Planned fields remain visible without becoming dead links.</p></div>
            <div className="px-4 py-2">
              {context.children.map((branch: CurriculumNode, index: number) => <BranchRoute key={branch.id} branch={branch} index={index} />)}
            </div>
          </nav>

          <section className="rounded-[28px] border border-white/[0.08] bg-black/[0.13] p-5 backdrop-blur-xl sm:p-6">
            <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end">
              <div><div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-cyan-200/54"><Gauge size={13} /> Variability is signal about the process</div><h2 className="mt-2 text-[clamp(1.7rem,3vw,2.8rem)] font-semibold tracking-[-0.045em] text-white">The same population can produce many different samples.</h2><p className="mt-3 max-w-3xl text-[12px] leading-6 text-slate-500">Sampling distributions describe how a statistic varies across hypothetical repeated samples. They are the bridge between one observed statistic and uncertainty about the process that generated it.</p></div>
              <div className="rounded-[18px] border border-indigo-200/[0.10] bg-indigo-200/[0.025] p-4 font-mono text-[10px] leading-5 text-indigo-100/58">standard error ≈ typical sample-to-sample variation in a statistic</div>
            </div>
          </section>
        </section>

        <div className="mt-5"><SamplingDistributionLab /></div>

        <section className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1.25fr)_360px] xl:items-start">
          <RegressionLab />
          <aside className="overflow-hidden rounded-[26px] border border-white/[0.08] bg-black/[0.14] backdrop-blur-xl">
            <div className="p-5"><div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.13em] text-emerald-200/52"><ScatterChart size={13} /> Interpretation guardrails</div><h2 className="mt-2 text-[22px] font-semibold tracking-[-0.04em] text-white">A model can fit and still mislead.</h2><p className="mt-2 text-[11px] leading-5 text-slate-500">Statistical strength depends on design, assumptions, uncertainty, and scope, not just a clean chart or impressive coefficient.</p></div>
            <div className="border-t border-white/[0.07]">
              {GUARDRAILS.map(([term, detail], index) => <div key={term} className="grid grid-cols-[30px_minmax(0,1fr)] gap-3 border-b border-white/[0.055] px-4 py-3 last:border-b-0"><span className="font-mono text-[8px] text-indigo-200/34">0{index + 1}</span><span><strong className="block text-[11px] text-slate-200/82">{term}</strong><span className="mt-1 block text-[9px] leading-4 text-slate-600">{detail}</span></span></div>)}
            </div>
          </aside>
        </section>

        <section className="mt-6 grid gap-3 sm:grid-cols-3">
          <Neighbor href="/formal-science/mathematics/statistics/probability" label="Probability Theory" note="Model random events and distributions." rgb="192, 132, 252" />
          <Neighbor href="/formal-science/data-science" label="Data Science" note="Build computational workflows around data and models." rgb="52, 211, 153" />
          <Neighbor href="/formal-science/mathematics/calculus" label="Calculus" note="Continuous distributions and optimization rely heavily on calculus." rgb="248, 113, 113" />
        </section>
      </div>
    </main>
  );
}

function BranchRoute({ branch, index }: { branch: CurriculumNode; index: number }) {
  const meta = BRANCH_META[branch.id] ?? BRANCH_META["formal.mathematics.statistics.probability"];
  const Icon = meta.icon;
  const planned = branch.status === "placeholder";
  const content = (
    <div className={`group grid min-h-[84px] grid-cols-[42px_minmax(0,1fr)_auto] items-center gap-3 border-b border-white/[0.06] px-2 py-3 ${planned ? "opacity-45" : "transition hover:bg-white/[0.025]"}`}>
      <span className="flex h-9 w-9 items-center justify-center rounded-[12px] border" style={{ color: `rgb(${meta.rgb})`, borderColor: `rgba(${meta.rgb},0.20)`, background: `rgba(${meta.rgb},0.03)` }}><Icon size={15} /></span>
      <span className="min-w-0"><span className="flex items-center gap-2"><strong className="text-[12px] text-white/84">{branch.label}</strong><span className="font-mono text-[7px] text-slate-700">0{index + 1}</span></span><span className="mt-1 block font-mono text-[8px] uppercase tracking-[0.1em]" style={{ color: `rgba(${meta.rgb},0.56)` }}>{meta.code} · {meta.role}</span><span className="mt-1 line-clamp-1 block text-[9px] text-slate-700">{branch.description}</span></span>
      <span className="font-mono text-[7px] uppercase tracking-[0.08em] text-slate-600">{planned ? "planned" : "open"}</span>
    </div>
  );
  return planned ? <div aria-label={`${branch.label}, planned`}>{content}</div> : <Link href={branch.href}>{content}</Link>;
}

function Neighbor({ href, label, note, rgb }: { href: string; label: string; note: string; rgb: string }) {
  return <Link href={href} className="group flex min-h-[82px] items-center gap-3 rounded-[18px] border border-white/[0.07] bg-black/[0.12] px-4 py-3 backdrop-blur-md transition hover:bg-white/[0.025]"><span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: `rgb(${rgb})`, boxShadow: `0 0 18px rgba(${rgb},0.22)` }} /><span className="min-w-0 flex-1"><strong className="block text-[12px] text-white/82">{label}</strong><span className="mt-1 block text-[10px] leading-4 text-slate-600">{note}</span></span><ArrowRight size={12} className="text-slate-600 transition group-hover:translate-x-1" /></Link>;
}
