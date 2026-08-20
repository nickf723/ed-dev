import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import { ArrowRight, FlaskConical, Gauge, ScanLine, SearchCheck, Target } from "lucide-react";
import ConfidenceIntervalLab from "./ConfidenceIntervalLab";

const NODE_ID = "formal.mathematics.statistics.inferential";

const PIPELINE = [
  {
    icon: Target,
    label: "Target",
    question: "What population quantity or model feature is unknown?",
    detail: "Define the estimand or hypothesis before seeing a convenient statistic. The target might be a mean, proportion, difference, effect, or model parameter.",
    rgb: "96, 165, 250",
  },
  {
    icon: ScanLine,
    label: "Sample",
    question: "How was information selected or generated?",
    detail: "Sampling design, randomization, missingness, measurement, and dependence determine what uncertainty model is defensible.",
    rgb: "45, 212, 191",
  },
  {
    icon: Gauge,
    label: "Uncertainty",
    question: "How much would the statistic vary across repeated data?",
    detail: "Sampling distributions, standard errors, bootstrap procedures, and probability models quantify variation induced by the data-generating process.",
    rgb: "192, 132, 252",
  },
  {
    icon: SearchCheck,
    label: "Inference",
    question: "Which conclusions remain compatible with the data and assumptions?",
    detail: "Intervals, tests, estimates, model comparisons, and predictions translate sample evidence into bounded claims about a larger target.",
    rgb: "244, 114, 182",
  },
] as const;

const INTERPRETATION = [
  ["Confidence interval", "A procedure that produces intervals with a specified repeated-sampling coverage under the model. Wider intervals usually reflect more uncertainty."],
  ["p-value", "Under a specified null model, the probability of obtaining a test statistic at least as incompatible with the null as the observed one. It is not the probability that the null hypothesis is true."],
  ["Statistical significance", "A decision threshold applied to a test statistic or p-value. It does not measure practical importance, effect size, replication probability, or truth by itself."],
  ["Generalizability", "Whether an inference extends beyond the observed sample depends on sampling, design, context, and assumptions, not merely on a small standard error."],
] as const;

export default function StatisticalInferencePage() {
  const context = requireCurriculumPageContext(NODE_ID);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#06101d] text-slate-100 selection:bg-blue-400/25">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_78%_18%,rgba(96,165,250,0.12),transparent_29%),radial-gradient(circle_at_16%_82%,rgba(192,132,252,0.06),transparent_28%),linear-gradient(to_bottom,#06101d,#040b15_62%,#030810)]" aria-hidden="true" />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.10] [background-image:radial-gradient(circle_at_center,rgba(147,197,253,0.18)_1px,transparent_1.2px)] [background-size:34px_34px] [mask-image:linear-gradient(to_bottom,black,transparent_91%)]" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-[1540px] px-4 pb-14 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.06] bg-[#06101d]/78 px-4 pb-3 pt-5 shadow-[0_18px_58px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={context.breadcrumbs}
            eyebrow="Samples · estimands · standard errors · evidence"
            eyebrowStyle="rule"
            icon={FlaskConical}
            title={<span>Statistical Inference</span>}
            subtitle="Statistical inference uses sample data and an uncertainty model to make bounded claims about a larger population or process. The strength of an inference depends on how the data were generated, what is being estimated, and which assumptions connect the sample to the target."
            accentRgb="96, 165, 250"
            titleClassName="font-sans text-[clamp(2.8rem,5.4vw,6rem)] font-semibold leading-[0.84] tracking-[-0.066em] text-[#f4faff]"
            headerClassName="border-blue-100/[0.10]"
          />
        </div>

        <section className="mt-5 overflow-hidden rounded-[30px] border border-blue-200/[0.10] bg-black/[0.15] backdrop-blur-xl">
          <div className="grid gap-4 border-b border-white/[0.07] px-5 py-5 lg:grid-cols-[minmax(0,1fr)_410px] lg:items-end sm:px-6">
            <div><div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-blue-200/62">Inference pipeline</div><h2 className="mt-2 text-[clamp(1.9rem,3.6vw,3.3rem)] font-semibold leading-[0.94] tracking-[-0.05em] text-white">Inference begins before the calculation, with the target and the design.</h2></div>
            <p className="text-[12px] leading-6 text-slate-400">A precise standard error cannot repair a biased sampling process, an irrelevant target, or a model whose assumptions disconnect it from the data-generating mechanism.</p>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-4">
            {PIPELINE.map((item, index) => {
              const Icon = item.icon;
              return <article key={item.label} className="min-h-[220px] border-b border-white/[0.06] px-5 py-5 md:border-r md:[&:nth-child(2n)]:border-r-0 xl:border-b-0 xl:[&:nth-child(2n)]:border-r xl:last:border-r-0"><div className="flex items-center justify-between gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full border" style={{ color: `rgb(${item.rgb})`, borderColor: `rgba(${item.rgb},0.22)` }}><Icon size={14} /></span><span className="font-mono text-[8px] text-slate-700">0{index + 1}</span></div><h3 className="mt-5 text-[14px] font-semibold text-white">{item.label}</h3><div className="mt-1 font-mono text-[8px] uppercase tracking-[0.08em]" style={{ color: `rgba(${item.rgb},0.58)` }}>{item.question}</div><p className="mt-3 text-[10px] leading-5 text-slate-600">{item.detail}</p></article>;
            })}
          </div>
        </section>

        <div className="mt-5"><ConfidenceIntervalLab /></div>

        <section className="mt-6 overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/[0.13] backdrop-blur-xl">
          <div className="grid gap-4 border-b border-white/[0.07] px-5 py-5 lg:grid-cols-[minmax(0,1fr)_410px] lg:items-end sm:px-6"><div><div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-200/52">Interpretation guardrails</div><h2 className="mt-2 text-[clamp(1.7rem,3vw,2.8rem)] font-semibold tracking-[-0.045em] text-white">An inferential output has a narrower meaning than its everyday wording suggests.</h2></div><p className="text-[11px] leading-5 text-slate-500">Confidence, significance, and evidence are technical ideas. Translating them carelessly into certainty, truth, importance, or causality creates statistical errors even when the arithmetic is flawless.</p></div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-4">
            {INTERPRETATION.map(([term, detail], index) => <div key={term} className="min-h-[190px] border-b border-white/[0.06] px-4 py-4 sm:border-r sm:[&:nth-child(2n)]:border-r-0 xl:border-b-0 xl:[&:nth-child(2n)]:border-r xl:last:border-r-0"><span className="font-mono text-[8px] text-blue-200/34">0{index + 1}</span><strong className="mt-4 block text-[12px] text-white/82">{term}</strong><p className="mt-2 text-[10px] leading-5 text-slate-600">{detail}</p></div>)}
          </div>
        </section>

        <section className="mt-6 grid gap-3 sm:grid-cols-3">
          <Neighbor href="/formal-science/mathematics/statistics" label="Statistics" note="Return to the complete observe-to-infer workflow." rgb="129, 140, 248" />
          <Neighbor href="/formal-science/mathematics/statistics/probability" label="Probability" note="Supply the uncertainty models inference relies on." rgb="192, 132, 252" />
          <Neighbor href="/formal-science/data-science" label="Data Science" note="Fit, validate, and deploy statistical models computationally." rgb="52, 211, 153" />
        </section>
      </div>
    </main>
  );
}

function Neighbor({ href, label, note, rgb }: { href: string; label: string; note: string; rgb: string }) {
  return <Link href={href} className="group flex min-h-[82px] items-center gap-3 rounded-[18px] border border-white/[0.07] bg-black/[0.12] px-4 py-3 backdrop-blur-md transition hover:bg-white/[0.025]"><span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: `rgb(${rgb})`, boxShadow: `0 0 18px rgba(${rgb},0.22)` }} /><span className="min-w-0 flex-1"><strong className="block text-[12px] text-white/82">{label}</strong><span className="mt-1 block text-[10px] leading-4 text-slate-600">{note}</span></span><ArrowRight size={12} className="text-slate-600 transition group-hover:translate-x-1" /></Link>;
}
