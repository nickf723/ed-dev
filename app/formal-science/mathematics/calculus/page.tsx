import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import {
  Activity,
  ArrowRight,
  Infinity as InfinityIcon,
  Layers3,
  Sigma,
  TrendingUp,
  Wind,
  type LucideIcon,
} from "lucide-react";
import IntegrationWidget from "./IntegrationWidget";
import RiemannBackground from "./RiemannBackground";
import TangentSurfer from "./TangentSurfer";
import VectorFieldBackground from "./VectorFieldBackground";

const NODE_ID = "formal.mathematics.calculus";

type BranchMeta = { icon: LucideIcon; role: string; question: string; rgb: string };
const BRANCH_META: Record<string, BranchMeta> = {
  "formal.mathematics.calculus.limits": { icon: InfinityIcon, role: "approach behavior", question: "What value or behavior does a function approach as the input moves toward a point?", rgb: "52, 211, 153" },
  "formal.mathematics.calculus.differential": { icon: TrendingUp, role: "local change", question: "What is the instantaneous rate of change and the best local linear approximation?", rgb: "34, 211, 238" },
  "formal.mathematics.calculus.integral": { icon: Sigma, role: "accumulation", question: "How much total effect accumulates when infinitely many small contributions are combined?", rgb: "251, 146, 60" },
  "formal.mathematics.calculus.multivariate": { icon: Layers3, role: "many input directions", question: "How does change behave when a function depends on several variables instead of one?", rgb: "192, 132, 252" },
  "formal.mathematics.calculus.vector": { icon: Wind, role: "fields and flux", question: "How do vector fields change locally and accumulate along curves, surfaces, and volumes?", rgb: "244, 114, 182" },
  "formal.mathematics.calculus.differential-equations": { icon: Activity, role: "change determines state", question: "What functions satisfy a relationship between a system's state and its rates of change?", rgb: "248, 113, 113" },
};

const CORE_SPINE = [
  ["01", "Limit", "Describe approach behavior without requiring the input to equal the point being approached."],
  ["02", "Derivative", "Take a limit of average rates of change to obtain instantaneous rate and local linear behavior."],
  ["03", "Integral", "Take a limit of finite sums to define accumulated quantity across an interval or region."],
  ["04", "Fundamental Theorem", "Under suitable conditions, accumulation and instantaneous change are inverse views: differentiating accumulated area recovers the original rate, and integrating a derivative recovers net change."],
] as const;

const EXTENSIONS = [
  ["One variable → many variables", "Replace a single input direction with partial and directional derivatives, gradients, multiple integrals, constrained optimization, and geometry in higher-dimensional domains."],
  ["Scalar function → vector field", "When outputs have direction as well as magnitude, divergence, curl, circulation, and flux connect local field behavior to integrals over boundaries."],
  ["Known function → unknown trajectory", "Differential equations ask for the function itself when relations among values and derivatives are known, turning calculus into a language for dynamical systems."],
] as const;

export default function CalculusPage() {
  const context = requireCurriculumPageContext(NODE_ID);
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#050815] text-slate-100 selection:bg-cyan-300/25">
      <RiemannBackground /><VectorFieldBackground />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_78%_14%,rgba(34,211,238,0.10),transparent_29%),radial-gradient(circle_at_18%_84%,rgba(248,113,113,0.045),transparent_28%),linear-gradient(to_bottom,rgba(5,8,21,0.08),rgba(5,8,21,0.80)_78%,rgba(3,5,14,0.98))]" aria-hidden="true" />
      <div className="relative z-10 mx-auto w-full max-w-[1580px] px-4 pb-14 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.06] bg-[#050815]/80 px-4 pb-3 pt-5 shadow-[0_18px_58px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader breadcrumbs={context.breadcrumbs} eyebrow="Limits · local change · accumulation · dynamics" eyebrowStyle="rule" icon={Sigma} title={<span>Calculus</span>} subtitle="Calculus studies continuous change by moving between local and accumulated views. Limits make approach behavior precise, derivatives measure instantaneous change, integrals measure accumulated effect, and differential equations describe systems whose evolution is specified through rates of change." accentRgb="34, 211, 238" titleClassName="font-sans text-[clamp(3rem,5.7vw,6.3rem)] font-semibold leading-[0.83] tracking-[-0.067em] text-[#f5fbff]" headerClassName="border-cyan-100/[0.10]" />
        </div>

        <section className="mt-5 overflow-hidden rounded-[32px] border border-cyan-200/[0.10] bg-black/[0.14] backdrop-blur-xl">
          <div className="grid gap-4 border-b border-white/[0.07] px-5 py-5 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end sm:px-6"><div><div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-cyan-200/52">Core spine</div><h2 className="mt-2 text-[clamp(1.9rem,3.6vw,3.3rem)] font-semibold leading-[0.94] tracking-[-0.05em] text-white">Two limiting processes reveal two complementary views of change.</h2></div><p className="text-[12px] leading-6 text-slate-400">Derivatives arise from shrinking an interval around a point. Integrals arise from refining a partition across an interval. The Fundamental Theorem is the bridge between them.</p></div>
          <div className="grid md:grid-cols-2 xl:grid-cols-4">{CORE_SPINE.map(([number,label,detail])=><article key={number} className="min-h-[190px] border-b border-white/[0.06] px-5 py-5 md:border-r md:[&:nth-child(2n)]:border-r-0 xl:border-b-0 xl:[&:nth-child(2n)]:border-r xl:last:border-r-0"><span className="font-mono text-[8px] text-cyan-200/28">{number}</span><h3 className="mt-3 text-[13px] font-semibold text-white/86">{label}</h3><p className="mt-2 text-[10px] leading-5 text-slate-600">{detail}</p></article>)}</div>
        </section>

        <section className="mt-6 grid gap-5 xl:grid-cols-2"><div><div className="mb-3 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-cyan-200/48">Local change · derivative</div><TangentSurfer /></div><div><div className="mb-3 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-rose-200/46">Accumulated change · integral</div><IntegrationWidget /></div></section>

        <section className="mt-6 overflow-hidden rounded-[30px] border border-white/[0.08] bg-black/[0.13] backdrop-blur-xl">
          <div className="border-b border-white/[0.07] px-5 py-5 sm:px-6"><div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-200/46">Primary branches · navigation</div><h2 className="mt-2 text-[clamp(1.7rem,3vw,2.7rem)] font-semibold tracking-[-0.045em] text-white">Choose the kind of change or accumulation the problem asks about.</h2></div>
          <nav aria-label="Calculus branches" className="grid md:grid-cols-2 xl:grid-cols-3">{context.children.map((branch,index)=><CalculusBranch key={branch.id} branch={branch} index={index}/>)}</nav>
        </section>

        <section className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1fr)_390px]">
          <div className="overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/[0.13] backdrop-blur-xl"><div className="border-b border-white/[0.07] px-5 py-5 sm:px-6"><div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-purple-200/46">How the subject expands</div><h2 className="mt-2 text-[clamp(1.6rem,2.8vw,2.5rem)] font-semibold tracking-[-0.043em] text-white">Change the domain, output, or unknown and calculus grows with it.</h2></div>{EXTENSIONS.map(([name,detail],index)=><div key={name} className="grid gap-3 border-b border-white/[0.06] px-5 py-4 last:border-b-0 sm:grid-cols-[34px_190px_minmax(0,1fr)] sm:items-start"><span className="font-mono text-[8px] text-purple-200/28">0{index+1}</span><strong className="text-[11px] text-white/82">{name}</strong><span className="text-[10px] leading-5 text-slate-600">{detail}</span></div>)}</div>
          <aside className="rounded-[28px] border border-white/[0.08] bg-black/[0.13] p-5 backdrop-blur-xl sm:p-6"><div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-amber-200/42">A modeling habit</div><h2 className="mt-2 text-[24px] font-semibold tracking-[-0.04em] text-white">Units travel through calculus.</h2><p className="mt-3 text-[11px] leading-5 text-slate-500">If position is measured in meters and time in seconds, its derivative has units meters per second. Integrating a rate multiplies its units by the integration variable. Dimensional reasoning is often a fast check that a calculus model means what you think it means.</p></aside>
        </section>

        <section className="mt-6 grid gap-3 sm:grid-cols-3"><Neighbor href="/formal-science/mathematics/geometry/trigonometry" label="Trigonometry" note="Periodic functions and angle-based models become core calculus examples and differential-equation solutions." rgb="192, 132, 252"/><Neighbor href="/formal-science/mathematics/algebra" label="Algebra" note="Manipulation, functions, equations, and symbolic structure remain the language in which most calculus work is expressed." rgb="248, 113, 113"/><Neighbor href="/natural-science/physics" label="Physics" note="Motion, fields, energy, waves, thermodynamics, and relativity provide some of calculus's richest applications." rgb="239, 68, 68"/></section>
      </div>
    </main>
  );
}

function CalculusBranch({branch,index}:{branch:CurriculumNode;index:number}){const meta=BRANCH_META[branch.id]??BRANCH_META["formal.mathematics.calculus.limits"];const Icon=meta.icon;const planned=branch.status==="placeholder";const body=<div className={`group min-h-[215px] border-b border-white/[0.06] px-5 py-5 md:border-r md:[&:nth-child(2n)]:border-r-0 xl:[&:nth-child(2n)]:border-r xl:[&:nth-child(3n)]:border-r-0 ${planned?"opacity-50":"transition hover:bg-white/[0.025]"}`}><div className="flex items-center justify-between"><span className="flex h-9 w-9 items-center justify-center rounded-[13px] border" style={{color:`rgb(${meta.rgb})`,borderColor:`rgba(${meta.rgb},0.22)`,background:`rgba(${meta.rgb},0.035)`}}><Icon size={15}/></span><span className="font-mono text-[8px] text-slate-700">0{index+1}</span></div><div className="mt-4 font-mono text-[8px] uppercase tracking-[0.09em]" style={{color:`rgba(${meta.rgb},0.56)`}}>{meta.role}</div><h3 className="mt-1 text-[13px] font-semibold text-white/84">{branch.label}</h3><p className="mt-2 text-[10px] leading-5 text-slate-600">{meta.question}</p><div className="mt-4 flex items-center justify-between font-mono text-[8px] uppercase text-slate-700"><span>{planned?"planned":"open"}</span>{planned?null:<ArrowRight size={12} className="transition group-hover:translate-x-1"/>}</div></div>;return planned?<div aria-label={`${branch.label}, planned`}>{body}</div>:<Link href={branch.href}>{body}</Link>}
function Neighbor({href,label,note,rgb}:{href:string;label:string;note:string;rgb:string}){return <Link href={href} className="group flex min-h-[88px] items-center gap-3 rounded-[18px] border border-white/[0.07] bg-black/[0.12] px-4 py-3 backdrop-blur-md transition hover:bg-white/[0.025]"><span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{background:`rgb(${rgb})`,boxShadow:`0 0 18px rgba(${rgb},0.22)`}}/><span className="min-w-0 flex-1"><strong className="block text-[12px] text-white/82">{label}</strong><span className="mt-1 block text-[10px] leading-4 text-slate-600">{note}</span></span><ArrowRight size={12} className="text-slate-600 transition group-hover:translate-x-1"/></Link>}
