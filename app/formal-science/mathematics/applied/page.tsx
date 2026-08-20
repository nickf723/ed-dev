import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import {
  ArrowRight,
  Calculator,
  ChartNoAxesCombined,
  Cpu,
  Dices,
  FlaskConical,
  KeyRound,
  Network,
  Route,
  Scale,
  Sigma,
  type LucideIcon,
} from "lucide-react";
import CipherWidget from "./_components/CipherWidget";

const NODE_ID = "formal.mathematics.applied";

type BranchMeta = {
  icon: LucideIcon;
  code: string;
  question: string;
  rgb: string;
};

const BRANCH_META: Record<string, BranchMeta> = {
  "formal.mathematics.applied.optimization": {
    icon: Scale,
    code: "OPT",
    question: "What choice best meets an objective while respecting constraints?",
    rgb: "52, 211, 153",
  },
  "formal.mathematics.applied.game-theory": {
    icon: Network,
    code: "GAM",
    question: "What should an agent do when outcomes depend on other agents too?",
    rgb: "250, 204, 21",
  },
  "formal.mathematics.applied.modeling": {
    icon: FlaskConical,
    code: "MOD",
    question: "Which mathematical structure captures the mechanism well enough to answer the question?",
    rgb: "56, 189, 248",
  },
  "formal.mathematics.applied.numerical": {
    icon: Cpu,
    code: "NUM",
    question: "How can computation approximate a useful solution when exact analysis is unavailable?",
    rgb: "167, 139, 250",
  },
  "formal.mathematics.applied.financial-risk": {
    icon: ChartNoAxesCombined,
    code: "RSK",
    question: "How should uncertain future outcomes be valued, compared, hedged, or controlled?",
    rgb: "244, 114, 182",
  },
  "formal.mathematics.applied.cryptography": {
    icon: KeyRound,
    code: "CRY",
    question: "How can mathematical structure make information difficult to recover or alter without the right key?",
    rgb: "34, 211, 238",
  },
};

const MODEL_LOOP = [
  {
    number: "01",
    label: "Frame",
    detail: "Define the question, system boundary, objective, outputs, and what a useful answer would mean.",
    rgb: "125, 211, 252",
  },
  {
    number: "02",
    label: "Represent",
    detail: "Choose variables, parameters, states, relationships, constraints, randomness, and assumptions.",
    rgb: "167, 139, 250",
  },
  {
    number: "03",
    label: "Solve",
    detail: "Analyze symbolically, optimize, simulate, approximate numerically, or compute strategic and probabilistic outcomes.",
    rgb: "52, 211, 153",
  },
  {
    number: "04",
    label: "Validate",
    detail: "Compare the model with data, limiting cases, known behavior, alternative models, and domain knowledge.",
    rgb: "250, 204, 21",
  },
  {
    number: "05",
    label: "Stress-test",
    detail: "Vary assumptions and parameters to see which conclusions are robust and where uncertainty matters most.",
    rgb: "244, 114, 182",
  },
  {
    number: "06",
    label: "Revise",
    detail: "Change the model when evidence, scale, purpose, or decision context shows that its simplifications are no longer useful.",
    rgb: "34, 211, 238",
  },
] as const;

const MODEL_CHOICES = [
  ["Deterministic ↔ stochastic", "Are uncertain influences negligible for this question, or must randomness be represented explicitly?"],
  ["Discrete ↔ continuous", "Does the system change in countable events or states, continuously through time and space, or through both?"],
  ["Mechanistic ↔ empirical", "Should the model encode proposed causal mechanisms, fit observed relationships, or combine both approaches?"],
  ["Exact ↔ approximate", "Is a closed-form solution possible and useful, or is numerical approximation the practical mathematical object?"],
] as const;

export default function AppliedMathematicsPage() {
  const context = requireCurriculumPageContext(NODE_ID);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#03070a] text-slate-100 selection:bg-cyan-300/25">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_78%_14%,rgba(34,211,238,0.11),transparent_29%),radial-gradient(circle_at_18%_84%,rgba(167,139,250,0.065),transparent_28%),linear-gradient(to_bottom,rgba(3,7,10,0.05),rgba(3,7,10,0.80)_78%,rgba(2,5,7,0.98))]" aria-hidden="true" />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.12] [background-image:linear-gradient(rgba(34,211,238,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.08)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_92%)]" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-[1580px] px-4 pb-14 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.06] bg-[#03070a]/80 px-4 pb-3 pt-5 shadow-[0_18px_58px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={context.breadcrumbs}
            eyebrow="Model · optimize · simulate · decide · validate"
            eyebrowStyle="rule"
            icon={Calculator}
            title={<span>Applied Mathematics</span>}
            subtitle="Applied mathematics turns real questions into mathematical objects that can be analyzed, computed, tested, and revised. The central skill is not merely selecting a formula: it is deciding what to represent, what to ignore, which method fits the structure, and how strongly the result should be trusted."
            accentRgb="34, 211, 238"
            titleClassName="font-sans text-[clamp(2.9rem,5.5vw,6.1rem)] font-semibold leading-[0.84] tracking-[-0.066em] text-[#f2fdff]"
            headerClassName="border-cyan-100/[0.10]"
          />
        </div>

        <section className="mt-5 overflow-hidden rounded-[32px] border border-cyan-200/[0.10] bg-black/[0.14] backdrop-blur-xl">
          <div className="grid gap-4 border-b border-white/[0.07] px-5 py-5 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end sm:px-6">
            <div>
              <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-cyan-200/58"><Route size={13} /> Modeling cycle</div>
              <h2 className="mt-2 text-[clamp(1.9rem,3.7vw,3.4rem)] font-semibold leading-[0.94] tracking-[-0.052em] text-white">A useful model is a controlled simplification, not a miniature copy of reality.</h2>
            </div>
            <p className="text-[12px] leading-6 text-slate-400">The mathematics depends on the question. A routing problem, epidemic model, fluid flow, pricing problem, strategic interaction, and encryption scheme may use very different methods while sharing the same modeling discipline.</p>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-3">
            {MODEL_LOOP.map((step) => (
              <article key={step.label} className="min-h-[180px] border-b border-white/[0.06] px-5 py-5 md:border-r md:[&:nth-child(2n)]:border-r-0 xl:[&:nth-child(2n)]:border-r xl:[&:nth-child(3n)]:border-r-0 xl:[&:nth-last-child(-n+3)]:border-b-0">
                <div className="flex items-center justify-between gap-3"><span className="font-mono text-[8px] text-slate-700">{step.number}</span><span className="h-2 w-2 rounded-full" style={{ background: `rgb(${step.rgb})`, boxShadow: `0 0 18px rgba(${step.rgb},0.24)` }} /></div>
                <h3 className="mt-4 text-[14px] font-semibold text-white/86">{step.label}</h3>
                <p className="mt-2 text-[10px] leading-5 text-slate-600">{step.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1fr)_390px]">
          <nav aria-label="Applied Mathematics branches" className="overflow-hidden rounded-[30px] border border-white/[0.08] bg-black/[0.14] backdrop-blur-xl">
            <div className="border-b border-white/[0.07] px-5 py-5 sm:px-6">
              <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-cyan-200/58">Problem families · primary navigation</div>
              <h2 className="mt-2 text-[clamp(1.7rem,3vw,2.7rem)] font-semibold tracking-[-0.045em] text-white">Choose the structure of the problem, not the industry label.</h2>
            </div>
            <div className="grid sm:grid-cols-2">
              {context.children.map((branch: CurriculumNode, index: number) => <BranchRoute key={branch.id} branch={branch} index={index} />)}
            </div>
          </nav>

          <aside className="rounded-[30px] border border-white/[0.08] bg-black/[0.14] p-5 backdrop-blur-xl sm:p-6">
            <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-200/54"><Sigma size={13} /> Modeling choices</div>
            <h2 className="mt-2 text-[23px] font-semibold tracking-[-0.04em] text-white">Different abstractions answer different questions.</h2>
            <p className="mt-3 text-[11px] leading-5 text-slate-500">A model can be mathematically correct and still be inappropriate for the decision, scale, data, mechanism, or uncertainty that matters.</p>
            <div className="mt-5 space-y-1">
              {MODEL_CHOICES.map(([choice, detail], index) => (
                <div key={choice} className="grid grid-cols-[30px_minmax(0,1fr)] gap-3 border-b border-white/[0.055] py-3 last:border-b-0">
                  <span className="font-mono text-[8px] text-cyan-200/34">0{index + 1}</span>
                  <span><strong className="block text-[11px] text-slate-200/82">{choice}</strong><span className="mt-1 block text-[9px] leading-4 text-slate-600">{detail}</span></span>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section className="mt-6">
          <div className="mb-3 grid gap-3 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end">
            <div><div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-cyan-200/50">Small example · discrete transformation</div><h2 className="mt-1 text-[24px] font-semibold tracking-[-0.04em] text-white">Cryptography shows how simple mathematical rules can produce useful transformations.</h2></div>
            <p className="text-[11px] leading-5 text-slate-500">The Caesar cipher is intentionally elementary and insecure. It is included as a compact example of modular structure and algorithmic transformation, not as a representative model of modern cryptography or applied mathematics as a whole.</p>
          </div>
          <CipherWidget />
        </section>

        <section className="mt-6 grid gap-3 sm:grid-cols-3">
          <Neighbor href="/formal-science/mathematics/statistics" label="Statistics" note="Estimate, infer, quantify uncertainty, and validate models against data." rgb="129, 140, 248" icon={Dices} />
          <Neighbor href="/formal-science/mathematics/calculus" label="Calculus" note="Describe continuous change, accumulation, optimization, and differential systems." rgb="248, 113, 113" icon={Sigma} />
          <Neighbor href="/formal-science/computer-science" label="Computer Science" note="Algorithms and computation turn many applied models into executable methods." rgb="167, 139, 250" icon={Cpu} />
        </section>
      </div>
    </main>
  );
}

function BranchRoute({ branch, index }: { branch: CurriculumNode; index: number }) {
  const meta = BRANCH_META[branch.id] ?? BRANCH_META["formal.mathematics.applied.modeling"];
  const Icon = meta.icon;
  const planned = branch.status === "placeholder";
  const content = (
    <div className={`group min-h-[170px] border-b border-white/[0.06] px-5 py-5 sm:border-r sm:[&:nth-child(2n)]:border-r-0 ${planned ? "opacity-55" : "transition hover:bg-white/[0.025]"}`}>
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-[13px] border" style={{ color: `rgb(${meta.rgb})`, borderColor: `rgba(${meta.rgb},0.22)`, background: `rgba(${meta.rgb},0.035)` }}><Icon size={16} /></span>
        <span className="font-mono text-[8px] text-slate-700">0{index + 1} · {meta.code}</span>
      </div>
      <h3 className="mt-4 text-[13px] font-semibold text-white/86">{branch.label}</h3>
      <p className="mt-2 text-[10px] leading-5 text-slate-600">{meta.question}</p>
      <div className="mt-3 flex items-center justify-between gap-3 font-mono text-[7px] uppercase tracking-[0.08em] text-slate-700"><span className="line-clamp-1">{branch.description}</span><span className="shrink-0">{planned ? "planned" : "open"}</span></div>
    </div>
  );
  return planned ? <div aria-label={`${branch.label}, planned`}>{content}</div> : <Link href={branch.href}>{content}</Link>;
}

function Neighbor({ href, label, note, rgb, icon: Icon }: { href: string; label: string; note: string; rgb: string; icon: LucideIcon }) {
  return <Link href={href} className="group flex min-h-[88px] items-center gap-3 rounded-[18px] border border-white/[0.07] bg-black/[0.12] px-4 py-3 backdrop-blur-md transition hover:bg-white/[0.025]"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border" style={{ color: `rgb(${rgb})`, borderColor: `rgba(${rgb},0.20)`, background: `rgba(${rgb},0.03)` }}><Icon size={14} /></span><span className="min-w-0 flex-1"><strong className="block text-[12px] text-white/82">{label}</strong><span className="mt-1 block text-[10px] leading-4 text-slate-600">{note}</span></span><ArrowRight size={12} className="text-slate-600 transition group-hover:translate-x-1" /></Link>;
}
