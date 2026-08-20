import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import {
  ArrowRight,
  Binary,
  Dices,
  GitBranch,
  Repeat2,
  Scale,
  Shuffle,
  Target,
} from "lucide-react";
import MonteCarloBackground from "./MonteCarloBackground";
import MontyHallLab from "./MontyHallLab";

const NODE_ID = "formal.mathematics.statistics.probability";

const PATHWAY = [
  {
    icon: Binary,
    label: "Sample space",
    question: "What outcomes are possible?",
    detail: "Define the experiment, the set of outcomes, and the events whose probabilities you want to study.",
    rgb: "129, 140, 248",
  },
  {
    icon: Dices,
    label: "Distribution",
    question: "How is probability allocated?",
    detail: "A probability model assigns coherent weights to events or values. Equal likelihood is a special case, not a universal assumption.",
    rgb: "192, 132, 252",
  },
  {
    icon: GitBranch,
    label: "Conditioning",
    question: "What changes after information arrives?",
    detail: "Conditional probability restricts attention to outcomes consistent with known information and renormalizes uncertainty within that context.",
    rgb: "244, 114, 182",
  },
  {
    icon: Repeat2,
    label: "Repeated behavior",
    question: "What stabilizes over many trials?",
    detail: "Long-run frequencies and averages can approach model quantities even though individual outcomes remain uncertain.",
    rgb: "45, 212, 191",
  },
] as const;

const DEFINITIONS = [
  ["Event", "A set of outcomes from the sample space. Probability is assigned to events, not only to single outcomes."],
  ["Random variable", "A function that maps outcomes to numerical values, letting probability models describe quantities such as counts, times, or measurements."],
  ["Expected value", "A probability-weighted average of possible values. It describes the center of a distribution, not a guarantee for any one trial."],
  ["Independence", "Two events are independent when learning that one occurred does not change the probability of the other: P(A|B) = P(A), when defined."],
] as const;

export default function ProbabilityPage() {
  const context = requireCurriculumPageContext(NODE_ID);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#020617] text-slate-100 selection:bg-purple-400/25">
      <MonteCarloBackground />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_76%_18%,rgba(192,132,252,0.13),transparent_29%),radial-gradient(circle_at_16%_82%,rgba(45,212,191,0.045),transparent_26%),linear-gradient(to_bottom,rgba(2,6,23,0.10),rgba(2,6,23,0.75)_74%,rgba(2,6,23,0.96))]" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-[1560px] px-4 pb-14 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.06] bg-[#020617]/78 px-4 pb-3 pt-5 shadow-[0_18px_58px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={context.breadcrumbs}
            eyebrow="Outcomes · distributions · conditioning · expectation"
            eyebrowStyle="rule"
            icon={Dices}
            title={<span>Probability Theory</span>}
            subtitle="Probability gives mathematical structure to uncertainty. It defines possible outcomes, assigns probabilities consistently, updates those probabilities when information changes, and studies distributions and long-run behavior without pretending individual random events become certain."
            accentRgb="192, 132, 252"
            titleClassName="font-sans text-[clamp(2.9rem,5.5vw,6rem)] font-semibold leading-[0.84] tracking-[-0.066em] text-[#fdf9ff]"
            headerClassName="border-purple-100/[0.10]"
          />
        </div>

        <section className="mt-5 overflow-hidden rounded-[30px] border border-purple-200/[0.10] bg-black/[0.16] backdrop-blur-xl">
          <div className="grid gap-4 border-b border-white/[0.07] px-5 py-5 lg:grid-cols-[minmax(0,1fr)_410px] lg:items-end sm:px-6">
            <div>
              <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-purple-200/62"><Shuffle size={13} /> Probability workflow</div>
              <h2 className="mt-2 text-[clamp(1.9rem,3.6vw,3.3rem)] font-semibold leading-[0.94] tracking-[-0.05em] text-white">Start with what could happen before asking how likely it is.</h2>
            </div>
            <p className="text-[12px] leading-6 text-slate-400">Probability models are built from a sample space and rules for assigning probability. Counting formulas, simulations, and familiar percentages are techniques inside that structure, not the definition of the subject.</p>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-4">
            {PATHWAY.map((item, index) => {
              const Icon = item.icon;
              return (
                <article key={item.label} className="min-h-[210px] border-b border-white/[0.06] px-5 py-5 md:border-r md:[&:nth-child(2n)]:border-r-0 xl:border-b-0 xl:[&:nth-child(2n)]:border-r xl:last:border-r-0">
                  <div className="flex items-center justify-between gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full border" style={{ color: `rgb(${item.rgb})`, borderColor: `rgba(${item.rgb},0.22)` }}><Icon size={14} /></span><span className="font-mono text-[8px] text-slate-700">0{index + 1}</span></div>
                  <h3 className="mt-5 text-[14px] font-semibold text-white">{item.label}</h3>
                  <div className="mt-1 font-mono text-[8px] uppercase tracking-[0.08em]" style={{ color: `rgba(${item.rgb},0.58)` }}>{item.question}</div>
                  <p className="mt-3 text-[10px] leading-5 text-slate-600">{item.detail}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.1fr)_minmax(340px,0.9fr)]">
          <div className="rounded-[28px] border border-purple-200/[0.10] bg-black/[0.14] p-5 backdrop-blur-xl sm:p-6">
            <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-fuchsia-200/56"><Target size={13} /> Monte Carlo · area as probability</div>
            <h2 className="mt-2 text-[clamp(1.7rem,3vw,2.8rem)] font-semibold tracking-[-0.045em] text-white">Random points can estimate π because geometry becomes an event probability.</h2>
            <p className="mt-3 max-w-4xl text-[12px] leading-6 text-slate-500">The background samples points uniformly from a square whose inscribed circle has radius r. The area ratio is P(inside) = πr² / (2r)² = π/4, so the estimator is <span className="font-mono text-purple-100/70">π̂ = 4 × inside / total</span>. With independent identically distributed samples, the sample proportion tends toward the true event probability as the trial count grows.</p>
            <div className="mt-4 rounded-[16px] border border-white/[0.06] bg-black/[0.14] px-4 py-3 text-[10px] leading-5 text-slate-600">Long-run convergence describes aggregate behavior. It does not make the next random point predictable.</div>
          </div>

          <div className="rounded-[28px] border border-white/[0.08] bg-black/[0.13] p-5 backdrop-blur-xl sm:p-6">
            <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-cyan-200/52">A common special case</div>
            <div className="mt-4 rounded-[18px] border border-cyan-200/[0.10] bg-cyan-200/[0.025] p-4 text-center font-mono text-[15px] text-cyan-100/76">P(A) = |A| / |Ω|</div>
            <p className="mt-3 text-[10px] leading-5 text-slate-600">This counting formula applies when Ω is finite and all elementary outcomes are equally likely. General probability theory does not require outcomes to be equally likely, countable, or even discrete.</p>
            <div className="mt-5 border-t border-white/[0.06] pt-4"><div className="font-mono text-[8px] uppercase tracking-[0.1em] text-slate-700">Bayes’ rule</div><div className="mt-2 font-mono text-[12px] text-purple-100/66">P(A|B) = P(B|A)P(A) / P(B)</div><p className="mt-2 text-[9px] leading-4 text-slate-700">For P(B) &gt; 0, Bayes’ rule reverses conditioning by combining a likelihood with prior probability.</p></div>
          </div>
        </section>

        <div className="mt-5"><MontyHallLab /></div>

        <section className="mt-6 overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/[0.13] backdrop-blur-xl">
          <div className="grid gap-4 border-b border-white/[0.07] px-5 py-5 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-end sm:px-6">
            <div><div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-200/52"><Scale size={13} /> Reference concepts</div><h2 className="mt-2 text-[clamp(1.7rem,3vw,2.8rem)] font-semibold tracking-[-0.045em] text-white">Uncertainty has structure, vocabulary, and algebra.</h2></div>
            <p className="text-[11px] leading-5 text-slate-500">Precise definitions matter because everyday words such as “random,” “expected,” and “independent” have narrower mathematical meanings here.</p>
          </div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-4">
            {DEFINITIONS.map(([term, detail], index) => <div key={term} className="min-h-[170px] border-b border-white/[0.06] px-4 py-4 sm:border-r sm:[&:nth-child(2n)]:border-r-0 xl:border-b-0 xl:[&:nth-child(2n)]:border-r xl:last:border-r-0"><span className="font-mono text-[8px] text-purple-200/34">0{index + 1}</span><strong className="mt-4 block text-[12px] text-white/82">{term}</strong><p className="mt-2 text-[10px] leading-5 text-slate-600">{detail}</p></div>)}
          </div>
        </section>

        <section className="mt-6 grid gap-3 sm:grid-cols-3">
          <Neighbor href="/formal-science/mathematics/statistics" label="Statistics" note="Use probability to reason from samples under uncertainty." rgb="129, 140, 248" />
          <Neighbor href="/formal-science/mathematics/discrete" label="Discrete Mathematics" note="Counting and combinatorics organize finite sample spaces." rgb="163, 230, 53" />
          <Neighbor href="/natural-science/physics/quantum-mechanics" label="Quantum Physics" note="Probability models measurement outcomes in quantum theory." rgb="56, 189, 248" />
        </section>
      </div>
    </main>
  );
}

function Neighbor({ href, label, note, rgb }: { href: string; label: string; note: string; rgb: string }) {
  return <Link href={href} className="group flex min-h-[82px] items-center gap-3 rounded-[18px] border border-white/[0.07] bg-black/[0.12] px-4 py-3 backdrop-blur-md transition hover:bg-white/[0.025]"><span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: `rgb(${rgb})`, boxShadow: `0 0 18px rgba(${rgb},0.22)` }} /><span className="min-w-0 flex-1"><strong className="block text-[12px] text-white/82">{label}</strong><span className="mt-1 block text-[10px] leading-4 text-slate-600">{note}</span></span><ArrowRight size={12} className="text-slate-600 transition group-hover:translate-x-1" /></Link>;
}
