import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import { ArrowRight, BarChart3, Crosshair, Gauge, Layers3, ScanSearch } from "lucide-react";
import DataShapeLab from "./DataShapeLab";

const NODE_ID = "formal.mathematics.statistics.descriptive";

const QUESTIONS = [
  {
    icon: BarChart3,
    label: "Shape",
    question: "What does the distribution look like?",
    detail: "Look for symmetry, skew, clusters, gaps, tails, modes, and unusual observations before compressing the data into a few numbers.",
    rgb: "45, 212, 191",
  },
  {
    icon: Crosshair,
    label: "Center",
    question: "Where are typical values located?",
    detail: "Mean, median, mode, and other location summaries answer related but different questions and respond differently to skew and outliers.",
    rgb: "129, 140, 248",
  },
  {
    icon: Gauge,
    label: "Spread",
    question: "How much do observations vary?",
    detail: "Range, IQR, variance, standard deviation, and robust alternatives describe different aspects of dispersion.",
    rgb: "251, 146, 60",
  },
  {
    icon: Layers3,
    label: "Position",
    question: "Where does one observation sit relative to the rest?",
    detail: "Quantiles, percentiles, ranks, and standardized scores locate individual values within a distribution.",
    rgb: "192, 132, 252",
  },
] as const;

const PRINCIPLES = [
  ["Plot first", "A summary can hide multimodality, skew, truncation, data-entry errors, or subgroups. Visual structure should inform which numerical summaries are appropriate."],
  ["Units stay attached", "Means, medians, IQRs, and standard deviations inherit the variable’s units; variance has squared units."],
  ["Resistance is a tradeoff", "Median and IQR resist extreme observations, while mean and standard deviation use every value and can be more efficient under suitable symmetric models."],
  ["Description stops at the observed data", "Descriptive statistics organize what was measured. Generalizing to a population or causal process requires additional design and inferential reasoning."],
] as const;

export default function DescriptiveStatisticsPage() {
  const context = requireCurriculumPageContext(NODE_ID);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#031013] text-slate-100 selection:bg-teal-300/25">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_78%_18%,rgba(45,212,191,0.11),transparent_29%),radial-gradient(circle_at_18%_82%,rgba(129,140,248,0.055),transparent_28%),linear-gradient(to_bottom,#031013,#031013_58%,#02090b)]" aria-hidden="true" />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.12] [background-image:linear-gradient(rgba(94,234,212,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(94,234,212,0.08)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-[1540px] px-4 pb-14 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.06] bg-[#031013]/78 px-4 pb-3 pt-5 shadow-[0_18px_58px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={context.breadcrumbs}
            eyebrow="Shape · center · spread · position"
            eyebrowStyle="rule"
            icon={BarChart3}
            title={<span>Descriptive Statistics</span>}
            subtitle="Descriptive statistics organize observed data without claiming more than the data show. Good description combines distribution shape with measures of center, spread, and relative position, chosen to match the variable and the question."
            accentRgb="45, 212, 191"
            titleClassName="font-sans text-[clamp(2.8rem,5.4vw,6rem)] font-semibold leading-[0.84] tracking-[-0.066em] text-[#f2fffc]"
            headerClassName="border-teal-100/[0.10]"
          />
        </div>

        <section className="mt-5 overflow-hidden rounded-[30px] border border-teal-200/[0.10] bg-black/[0.15] backdrop-blur-xl">
          <div className="grid gap-4 border-b border-white/[0.07] px-5 py-5 lg:grid-cols-[minmax(0,1fr)_410px] lg:items-end sm:px-6">
            <div><div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-teal-200/62"><ScanSearch size={13} /> Distribution reading order</div><h2 className="mt-2 text-[clamp(1.9rem,3.6vw,3.3rem)] font-semibold leading-[0.94] tracking-[-0.05em] text-white">Describe the shape before deciding which summaries deserve trust.</h2></div>
            <p className="text-[12px] leading-6 text-slate-400">Two datasets can share the same mean and standard deviation while having very different shapes. Statistical summaries are compressions, so the first job is to see what information the compression might erase.</p>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-4">
            {QUESTIONS.map((item, index) => {
              const Icon = item.icon;
              return <article key={item.label} className="min-h-[210px] border-b border-white/[0.06] px-5 py-5 md:border-r md:[&:nth-child(2n)]:border-r-0 xl:border-b-0 xl:[&:nth-child(2n)]:border-r xl:last:border-r-0"><div className="flex items-center justify-between gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full border" style={{ color: `rgb(${item.rgb})`, borderColor: `rgba(${item.rgb},0.22)` }}><Icon size={14} /></span><span className="font-mono text-[8px] text-slate-700">0{index + 1}</span></div><h3 className="mt-5 text-[14px] font-semibold text-white">{item.label}</h3><div className="mt-1 font-mono text-[8px] uppercase tracking-[0.08em]" style={{ color: `rgba(${item.rgb},0.58)` }}>{item.question}</div><p className="mt-3 text-[10px] leading-5 text-slate-600">{item.detail}</p></article>;
            })}
          </div>
        </section>

        <div className="mt-5"><DataShapeLab /></div>

        <section className="mt-6 overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/[0.13] backdrop-blur-xl">
          <div className="grid gap-4 border-b border-white/[0.07] px-5 py-5 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-end sm:px-6"><div><div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-cyan-200/52">Interpretation principles</div><h2 className="mt-2 text-[clamp(1.7rem,3vw,2.8rem)] font-semibold tracking-[-0.045em] text-white">A summary statistic is useful only when you know what it summarizes.</h2></div><p className="text-[11px] leading-5 text-slate-500">Context, units, data quality, and distribution shape determine whether a numerical summary clarifies the data or hides its most important structure.</p></div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-4">
            {PRINCIPLES.map(([term, detail], index) => <div key={term} className="min-h-[180px] border-b border-white/[0.06] px-4 py-4 sm:border-r sm:[&:nth-child(2n)]:border-r-0 xl:border-b-0 xl:[&:nth-child(2n)]:border-r xl:last:border-r-0"><span className="font-mono text-[8px] text-teal-200/34">0{index + 1}</span><strong className="mt-4 block text-[12px] text-white/82">{term}</strong><p className="mt-2 text-[10px] leading-5 text-slate-600">{detail}</p></div>)}
          </div>
        </section>

        <section className="mt-6 grid gap-3 sm:grid-cols-3">
          <Neighbor href="/formal-science/mathematics/statistics" label="Statistics" note="Return to the full data-to-inference workflow." rgb="129, 140, 248" />
          <Neighbor href="/formal-science/mathematics/statistics/probability" label="Probability" note="Model uncertainty and random variation." rgb="192, 132, 252" />
          <Neighbor href="/formal-science/data-science" label="Data Science" note="Scale descriptive workflows into computational data analysis." rgb="52, 211, 153" />
        </section>
      </div>
    </main>
  );
}

function Neighbor({ href, label, note, rgb }: { href: string; label: string; note: string; rgb: string }) {
  return <Link href={href} className="group flex min-h-[82px] items-center gap-3 rounded-[18px] border border-white/[0.07] bg-black/[0.12] px-4 py-3 backdrop-blur-md transition hover:bg-white/[0.025]"><span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: `rgb(${rgb})`, boxShadow: `0 0 18px rgba(${rgb},0.22)` }} /><span className="min-w-0 flex-1"><strong className="block text-[12px] text-white/82">{label}</strong><span className="mt-1 block text-[10px] leading-4 text-slate-600">{note}</span></span><ArrowRight size={12} className="text-slate-600 transition group-hover:translate-x-1" /></Link>;
}
