import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import { ArrowRight, BrainCircuit, GitMerge, Layers3, RefreshCw, ScanSearch } from "lucide-react";
import BayesUpdateLab from "./BayesUpdateLab";

const NODE_ID = "formal.mathematics.statistics.bayesian";

const CYCLE = [
  {
    icon: Layers3,
    label: "Prior",
    question: "What uncertainty exists before the new data?",
    detail: "A prior distribution represents model uncertainty about an unknown quantity before incorporating the current evidence.",
    rgb: "244, 114, 182",
  },
  {
    icon: ScanSearch,
    label: "Likelihood",
    question: "How compatible is the observed data with each parameter value?",
    detail: "The likelihood comes from a data model: it describes how the observed evidence would behave under different possible parameter values.",
    rgb: "52, 211, 153",
  },
  {
    icon: GitMerge,
    label: "Posterior",
    question: "How should uncertainty change after observing the data?",
    detail: "Bayes’ rule combines prior and likelihood, then normalizes the result into a posterior probability distribution.",
    rgb: "192, 132, 252",
  },
  {
    icon: RefreshCw,
    label: "Predict / update",
    question: "What does the posterior imply for future observations or decisions?",
    detail: "Posterior predictive distributions propagate parameter uncertainty into predictions and can become the prior for a later update.",
    rgb: "96, 165, 250",
  },
] as const;

const PRINCIPLES = [
  ["The prior is part of the model", "Priors can encode previous information, structural constraints, regularization, or deliberately weak information. Their influence should be examined rather than hidden."],
  ["The likelihood carries the sampling model", "Bayesian updating does not bypass model assumptions. A misspecified likelihood can produce a precise posterior about the wrong model."],
  ["Posterior probability is conditional", "Statements such as P(θ > 0 | data) are probabilities conditional on the prior, likelihood, observed data, and other model choices."],
  ["Check sensitivity and fit", "Posterior predictive checks, alternative priors, alternative likelihoods, and model comparison help reveal whether conclusions depend strongly on fragile assumptions."],
] as const;

export default function BayesianStatisticsPage() {
  const context = requireCurriculumPageContext(NODE_ID);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#140715] text-slate-100 selection:bg-pink-400/25">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_78%_18%,rgba(244,114,182,0.12),transparent_29%),radial-gradient(circle_at_16%_82%,rgba(192,132,252,0.065),transparent_28%),linear-gradient(to_bottom,#140715,#0d0712_62%,#09050d)]" aria-hidden="true" />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.10] [background-image:radial-gradient(circle_at_center,rgba(251,207,232,0.16)_1px,transparent_1.2px)] [background-size:36px_36px] [mask-image:linear-gradient(to_bottom,black,transparent_91%)]" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-[1540px] px-4 pb-14 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.06] bg-[#140715]/78 px-4 pb-3 pt-5 shadow-[0_18px_58px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={context.breadcrumbs}
            eyebrow="Prior · likelihood · posterior · prediction"
            eyebrowStyle="rule"
            icon={BrainCircuit}
            title={<span>Bayesian Statistics</span>}
            subtitle="Bayesian statistics represents uncertainty with probability distributions and updates that uncertainty when data arrive. The result is conditional on a prior model, a likelihood for the data, and the observed evidence, making assumptions part of the calculation rather than invisible scenery."
            accentRgb="244, 114, 182"
            titleClassName="font-sans text-[clamp(2.8rem,5.4vw,6rem)] font-semibold leading-[0.84] tracking-[-0.066em] text-[#fff6fb]"
            headerClassName="border-pink-100/[0.10]"
          />
        </div>

        <section className="mt-5 overflow-hidden rounded-[30px] border border-pink-200/[0.10] bg-black/[0.15] backdrop-blur-xl">
          <div className="grid gap-4 border-b border-white/[0.07] px-5 py-5 lg:grid-cols-[minmax(0,1fr)_410px] lg:items-end sm:px-6">
            <div><div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-pink-200/62">Bayesian update cycle</div><h2 className="mt-2 text-[clamp(1.9rem,3.6vw,3.3rem)] font-semibold leading-[0.94] tracking-[-0.05em] text-white">Evidence does not replace uncertainty. It reshapes a distribution over possibilities.</h2></div>
            <p className="text-[12px] leading-6 text-slate-400">The familiar one-line Bayes formula is the discrete shadow of a broader workflow: specify uncertainty, specify how data would arise, update, then propagate the posterior into prediction or decision-making.</p>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-4">
            {CYCLE.map((item, index) => {
              const Icon = item.icon;
              return <article key={item.label} className="min-h-[220px] border-b border-white/[0.06] px-5 py-5 md:border-r md:[&:nth-child(2n)]:border-r-0 xl:border-b-0 xl:[&:nth-child(2n)]:border-r xl:last:border-r-0"><div className="flex items-center justify-between gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full border" style={{ color: `rgb(${item.rgb})`, borderColor: `rgba(${item.rgb},0.22)` }}><Icon size={14} /></span><span className="font-mono text-[8px] text-slate-700">0{index + 1}</span></div><h3 className="mt-5 text-[14px] font-semibold text-white">{item.label}</h3><div className="mt-1 font-mono text-[8px] uppercase tracking-[0.08em]" style={{ color: `rgba(${item.rgb},0.58)` }}>{item.question}</div><p className="mt-3 text-[10px] leading-5 text-slate-600">{item.detail}</p></article>;
            })}
          </div>
        </section>

        <div className="mt-5"><BayesUpdateLab /></div>

        <section className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1.1fr)_minmax(330px,0.9fr)]">
          <div className="rounded-[28px] border border-pink-200/[0.10] bg-black/[0.14] p-5 backdrop-blur-xl sm:p-6">
            <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-pink-200/56">Credible statements</div>
            <h2 className="mt-2 text-[clamp(1.7rem,3vw,2.7rem)] font-semibold tracking-[-0.045em] text-white">A posterior distribution supports direct probability statements about model parameters.</h2>
            <p className="mt-3 text-[12px] leading-6 text-slate-500">For example, a 95% posterior credible interval can be constructed so that 95% of the posterior probability for a parameter lies inside the interval. That interpretation differs from the repeated-sampling coverage definition of a frequentist 95% confidence interval.</p>
            <Link href="/formal-science/mathematics/statistics/inferential" className="group mt-4 inline-flex items-center gap-2 rounded-full border border-blue-200/[0.12] bg-blue-200/[0.025] px-4 py-2 text-[10px] font-semibold text-blue-100/64 transition hover:bg-blue-200/[0.05]">Compare frequentist intervals <ArrowRight size={12} className="transition group-hover:translate-x-1" /></Link>
          </div>
          <div className="rounded-[28px] border border-white/[0.08] bg-black/[0.13] p-5 backdrop-blur-xl sm:p-6">
            <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-200/52">Bayes’ rule</div>
            <div className="mt-4 rounded-[18px] border border-pink-200/[0.10] bg-pink-200/[0.025] p-4 text-center font-mono text-[13px] text-pink-100/70">p(θ | y) ∝ p(y | θ) p(θ)</div>
            <p className="mt-3 text-[10px] leading-5 text-slate-600">Posterior ∝ likelihood × prior. The missing proportionality constant is the marginal probability of the observed data, which normalizes the posterior so it integrates or sums to 1.</p>
          </div>
        </section>

        <section className="mt-6 overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/[0.13] backdrop-blur-xl">
          <div className="border-b border-white/[0.07] px-5 py-5 sm:px-6"><div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-fuchsia-200/52">Model discipline</div><h2 className="mt-2 text-[clamp(1.7rem,3vw,2.8rem)] font-semibold tracking-[-0.045em] text-white">A posterior can be mathematically exact and still depend on a poor model.</h2></div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-4">{PRINCIPLES.map(([term, detail], index) => <div key={term} className="min-h-[190px] border-b border-white/[0.06] px-4 py-4 sm:border-r sm:[&:nth-child(2n)]:border-r-0 xl:border-b-0 xl:[&:nth-child(2n)]:border-r xl:last:border-r-0"><span className="font-mono text-[8px] text-pink-200/34">0{index + 1}</span><strong className="mt-4 block text-[12px] text-white/82">{term}</strong><p className="mt-2 text-[10px] leading-5 text-slate-600">{detail}</p></div>)}</div>
        </section>

        <section className="mt-6 grid gap-3 sm:grid-cols-3">
          <Neighbor href="/formal-science/mathematics/statistics" label="Statistics" note="Return to the complete statistics workflow." rgb="129, 140, 248" />
          <Neighbor href="/formal-science/mathematics/statistics/probability" label="Probability" note="Bayesian inference is built from conditional probability." rgb="192, 132, 252" />
          <Neighbor href="/formal-science/data-science" label="Data Science" note="Bayesian models are widely implemented computationally." rgb="52, 211, 153" />
        </section>
      </div>
    </main>
  );
}

function Neighbor({ href, label, note, rgb }: { href: string; label: string; note: string; rgb: string }) {
  return <Link href={href} className="group flex min-h-[82px] items-center gap-3 rounded-[18px] border border-white/[0.07] bg-black/[0.12] px-4 py-3 backdrop-blur-md transition hover:bg-white/[0.025]"><span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: `rgb(${rgb})`, boxShadow: `0 0 18px rgba(${rgb},0.22)` }} /><span className="min-w-0 flex-1"><strong className="block text-[12px] text-white/82">{label}</strong><span className="mt-1 block text-[10px] leading-4 text-slate-600">{note}</span></span><ArrowRight size={12} className="text-slate-600 transition group-hover:translate-x-1" /></Link>;
}
