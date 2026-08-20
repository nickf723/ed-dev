import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import {
  ArrowRight,
  Binoculars,
  Bot,
  BrainCircuit,
  Compass,
  Languages,
  Network,
  Route,
  Search,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import NeuralNetworkBackground from "./NeuralNetworkBackground";

const NODE_ID = "formal.computer-science.artificial-intelligence";

type BranchMeta = {
  icon: LucideIcon;
  role: string;
  question: string;
  rgb: string;
};

const BRANCH_META: Record<string, BranchMeta> = {
  "formal.computer-science.artificial-intelligence.search-planning": {
    icon: Search,
    role: "choose a path",
    question: "How can an agent efficiently explore possible states and action sequences toward a goal?",
    rgb: "34, 211, 238",
  },
  "formal.computer-science.artificial-intelligence.knowledge-reasoning": {
    icon: Network,
    role: "represent and infer",
    question: "How can structured knowledge, rules, probabilities, or beliefs support computational reasoning?",
    rgb: "250, 204, 21",
  },
  "formal.computer-science.artificial-intelligence.machine-learning": {
    icon: BrainCircuit,
    role: "improve from data",
    question: "How can model parameters or representations be fitted from examples and evaluated on new cases?",
    rgb: "139, 92, 246",
  },
  "formal.computer-science.artificial-intelligence.reinforcement-learning": {
    icon: Compass,
    role: "learn from consequences",
    question: "How can an agent learn a policy when actions influence future observations and delayed rewards?",
    rgb: "52, 211, 153",
  },
  "formal.computer-science.artificial-intelligence.language-perception": {
    icon: Languages,
    role: "interpret rich signals",
    question: "How can systems extract, represent, or generate meaning from language, images, audio, and other observations?",
    rgb: "244, 114, 182",
  },
};

const AGENT_LOOP = [
  {
    icon: Binoculars,
    label: "Observe",
    detail: "Receive a state description, sensor stream, language input, database, or other evidence about the environment and task.",
    rgb: "34, 211, 238",
  },
  {
    icon: Network,
    label: "Represent",
    detail: "Encode relevant state, goals, uncertainty, relationships, features, beliefs, memory, or learned representations in a computational form.",
    rgb: "250, 204, 21",
  },
  {
    icon: Search,
    label: "Reason / search",
    detail: "Infer consequences, compare alternatives, solve constraints, search a state space, or estimate likely outcomes under the model.",
    rgb: "192, 132, 252",
  },
  {
    icon: Compass,
    label: "Choose & act",
    detail: "Select an answer, plan, control action, prediction, generated output, or other behavior according to the system's objective and constraints.",
    rgb: "52, 211, 153",
  },
  {
    icon: Sparkles,
    label: "Learn / revise",
    detail: "Use feedback, data, reward, errors, or new evidence to update models, parameters, representations, strategies, or beliefs.",
    rgb: "244, 114, 182",
  },
] as const;

const METHOD_FAMILIES = [
  ["Symbolic & search methods", "Represent states, rules, constraints, goals, or logical relationships explicitly, then manipulate those structures with search, inference, planning, or optimization."],
  ["Probabilistic methods", "Represent uncertainty directly and update beliefs or decisions using probability models, graphical structures, estimation, and expected outcomes."],
  ["Learning methods", "Fit functions, representations, policies, or generative models from data or interaction instead of specifying every behavior rule manually."],
  ["Hybrid systems", "Combine learned perception or prediction with symbolic constraints, search, planning, tools, memory, optimization, simulation, or human oversight."],
] as const;

export default function ArtificialIntelligencePage() {
  const context = requireCurriculumPageContext(NODE_ID);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#06030b] text-slate-100 selection:bg-violet-300/25">
      <NeuralNetworkBackground />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_78%_14%,rgba(139,92,246,0.12),transparent_29%),radial-gradient(circle_at_17%_84%,rgba(34,211,238,0.045),transparent_28%),linear-gradient(to_bottom,rgba(6,3,11,0.08),rgba(6,3,11,0.80)_78%,rgba(4,2,8,0.98))]" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-[1580px] px-4 pb-14 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.06] bg-[#06030b]/80 px-4 pb-3 pt-5 shadow-[0_18px_58px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={context.breadcrumbs}
            eyebrow="Perception · representation · reasoning · learning · action"
            eyebrowStyle="rule"
            icon={Bot}
            title={<span>Artificial Intelligence</span>}
            subtitle="Artificial intelligence studies computational systems that perceive or receive information, represent a task or environment, reason or search, choose actions or outputs, and sometimes improve from experience. Machine learning is one important method family inside that broader problem."
            accentRgb="139, 92, 246"
            titleClassName="font-sans text-[clamp(2.8rem,5.4vw,6.1rem)] font-semibold leading-[0.84] tracking-[-0.067em] text-[#fcf8ff]"
            headerClassName="border-violet-100/[0.10]"
          />
        </div>

        <section className="mt-5 overflow-hidden rounded-[32px] border border-violet-200/[0.10] bg-black/[0.14] backdrop-blur-xl">
          <div className="grid gap-4 border-b border-white/[0.07] px-5 py-5 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end sm:px-6">
            <div>
              <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-200/56"><Route size={13} /> Agent loop</div>
              <h2 className="mt-2 text-[clamp(1.9rem,3.6vw,3.3rem)] font-semibold leading-[0.94] tracking-[-0.05em] text-white">Intelligence problems couple information to choice.</h2>
            </div>
            <p className="text-[12px] leading-6 text-slate-400">Not every AI system needs every stage, and the stages can be tightly fused. The loop is a useful way to ask what information the system has, what structure it maintains, how it chooses, and what can change with experience.</p>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-5">
            {AGENT_LOOP.map((item, index) => {
              const Icon = item.icon;
              return (
                <article key={item.label} className="min-h-[220px] border-b border-white/[0.06] px-5 py-5 md:border-r md:[&:nth-child(2n)]:border-r-0 xl:border-b-0 xl:[&:nth-child(2n)]:border-r xl:last:border-r-0">
                  <div className="flex items-center justify-between"><span className="flex h-9 w-9 items-center justify-center rounded-[13px] border" style={{ color: `rgb(${item.rgb})`, borderColor: `rgba(${item.rgb},0.22)`, background: `rgba(${item.rgb},0.035)` }}><Icon size={15} /></span><span className="font-mono text-[8px] text-slate-700">0{index + 1}</span></div>
                  <h3 className="mt-5 text-[13px] font-semibold text-white/86">{item.label}</h3>
                  <p className="mt-2 text-[10px] leading-5 text-slate-600">{item.detail}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-6 overflow-hidden rounded-[30px] border border-white/[0.08] bg-black/[0.13] backdrop-blur-xl">
          <div className="border-b border-white/[0.07] px-5 py-5 sm:px-6">
            <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-cyan-200/48">Primary branches · navigation</div>
            <h2 className="mt-2 text-[clamp(1.7rem,3vw,2.7rem)] font-semibold tracking-[-0.045em] text-white">Different AI problems emphasize different parts of the loop.</h2>
          </div>
          <nav aria-label="Artificial Intelligence branches" className="grid md:grid-cols-2 xl:grid-cols-5">
            {context.children.map((branch, index) => <AiBranch key={branch.id} branch={branch} index={index} />)}
          </nav>
        </section>

        <section className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1.1fr)_minmax(340px,0.9fr)]">
          <div className="overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/[0.13] backdrop-blur-xl">
            <div className="border-b border-white/[0.07] px-5 py-5 sm:px-6"><div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-fuchsia-200/46">Method families</div><h2 className="mt-2 text-[clamp(1.6rem,2.8vw,2.5rem)] font-semibold tracking-[-0.043em] text-white">AI is not one algorithmic paradigm.</h2></div>
            <div className="grid sm:grid-cols-2">
              {METHOD_FAMILIES.map(([name, detail], index) => (
                <article key={name} className="min-h-[175px] border-b border-white/[0.06] px-5 py-4 sm:border-r sm:[&:nth-child(2n)]:border-r-0 sm:[&:nth-last-child(-n+2)]:border-b-0"><span className="font-mono text-[8px] text-violet-200/30">0{index + 1}</span><h3 className="mt-3 text-[12px] font-semibold text-white/84">{name}</h3><p className="mt-2 text-[10px] leading-5 text-slate-600">{detail}</p></article>
              ))}
            </div>
          </div>

          <aside className="rounded-[28px] border border-white/[0.08] bg-black/[0.13] p-5 backdrop-blur-xl sm:p-6">
            <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-cyan-200/44">AI ≠ machine learning</div>
            <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.04em] text-white">Learning can supply a component, a policy, a representation, or nearly the whole system.</h2>
            <p className="mt-3 text-[11px] leading-5 text-slate-500">A route planner can use search without learning. A vision model can learn perception while a separate planner chooses actions. A language model can generate outputs from learned representations. The system architecture determines how these pieces interact.</p>
            <Link href="/formal-science/computer-science/artificial-intelligence/machine-learning" className="group mt-5 flex items-center justify-between rounded-[15px] border border-violet-200/[0.12] bg-violet-200/[0.025] px-4 py-3"><span className="text-[10px] font-semibold text-violet-100/72">Open Machine Learning</span><ArrowRight size={12} className="text-violet-200/42 transition group-hover:translate-x-1" /></Link>
          </aside>
        </section>

        <section className="mt-6 grid gap-3 sm:grid-cols-3">
          <Neighbor href="/formal-science/computer-science/algorithms" label="Algorithms & Data" note="Search, optimization, graph traversal, and representation are core tools throughout AI." rgb="167, 139, 250" />
          <Neighbor href="/formal-science/logic" label="Formal Logic" note="Symbolic representation and inference connect AI to formal semantics and proof." rgb="248, 113, 113" />
          <Neighbor href="/formal-science/mathematics/statistics" label="Statistics" note="Probability, inference, experimental design, and uncertainty support learning and evaluation." rgb="129, 140, 248" />
        </section>
      </div>
    </main>
  );
}

function AiBranch({ branch, index }: { branch: CurriculumNode; index: number }) {
  const meta = BRANCH_META[branch.id] ?? BRANCH_META["formal.computer-science.artificial-intelligence.machine-learning"];
  const Icon = meta.icon;
  const planned = branch.status === "placeholder";
  const body = (
    <div className={`group min-h-[230px] border-b border-white/[0.06] px-5 py-5 md:border-r md:[&:nth-child(2n)]:border-r-0 xl:border-b-0 xl:[&:nth-child(2n)]:border-r xl:last:border-r-0 ${planned ? "opacity-50" : "transition hover:bg-white/[0.025]"}`}>
      <div className="flex items-center justify-between"><span className="flex h-9 w-9 items-center justify-center rounded-[13px] border" style={{ color: `rgb(${meta.rgb})`, borderColor: `rgba(${meta.rgb},0.22)`, background: `rgba(${meta.rgb},0.035)` }}><Icon size={15} /></span><span className="font-mono text-[8px] text-slate-700">0{index + 1}</span></div>
      <div className="mt-5 font-mono text-[8px] uppercase tracking-[0.09em]" style={{ color: `rgba(${meta.rgb},0.58)` }}>{meta.role}</div>
      <h3 className="mt-1 text-[14px] font-semibold text-white/86">{branch.label}</h3>
      <p className="mt-3 text-[10px] leading-5 text-slate-600">{meta.question}</p>
      <div className="mt-4 flex items-center justify-between font-mono text-[8px] uppercase text-slate-700"><span>{planned ? "planned" : "open"}</span>{planned ? null : <ArrowRight size={12} className="transition group-hover:translate-x-1" />}</div>
    </div>
  );
  return planned ? <div aria-label={`${branch.label}, planned`}>{body}</div> : <Link href={branch.href}>{body}</Link>;
}

function Neighbor({ href, label, note, rgb }: { href: string; label: string; note: string; rgb: string }) {
  return <Link href={href} className="group flex min-h-[88px] items-center gap-3 rounded-[18px] border border-white/[0.07] bg-black/[0.12] px-4 py-3 backdrop-blur-md transition hover:bg-white/[0.025]"><span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: `rgb(${rgb})`, boxShadow: `0 0 18px rgba(${rgb},0.22)` }} /><span className="min-w-0 flex-1"><strong className="block text-[12px] text-white/82">{label}</strong><span className="mt-1 block text-[10px] leading-4 text-slate-600">{note}</span></span><ArrowRight size={12} className="text-slate-600 transition group-hover:translate-x-1" /></Link>;
}
