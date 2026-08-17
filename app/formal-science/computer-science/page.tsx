import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame } from "@/app/_page-system/scene";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import {
  ArrowRight,
  Binary,
  BrainCircuit,
  Braces,
  Code2,
  Cpu,
  Layers3,
  Network,
  ShieldCheck,
  Terminal,
  type LucideIcon,
} from "lucide-react";
import { ComputerScienceBackground } from "./ComputerScienceBackground";

const NODE_ID = "formal.computer-science";

type ChildMeta = {
  icon: LucideIcon;
  layer: string;
  question: string;
  rgb: string;
  index: string;
};

const CHILD_META: Record<string, ChildMeta> = {
  "formal.computer-science.hardware": {
    icon: Cpu,
    layer: "physical machine",
    question: "How does information become electrical state and executed instruction?",
    rgb: "52,211,153",
    index: "01",
  },
  "formal.computer-science.software": {
    icon: Code2,
    layer: "programmed behavior",
    question: "How do languages and systems organize behavior above the machine?",
    rgb: "34,211,238",
    index: "02",
  },
  "formal.computer-science.algorithms": {
    icon: Binary,
    layer: "procedures and data",
    question: "How can state be transformed correctly with bounded resources?",
    rgb: "167,139,250",
    index: "03",
  },
  "formal.computer-science.artificial-intelligence": {
    icon: BrainCircuit,
    layer: "reasoning and learning",
    question: "How can systems infer, plan, learn, and act under uncertainty?",
    rgb: "251,146,60",
    index: "04",
  },
  "formal.computer-science.theory": {
    icon: Layers3,
    layer: "limits of computation",
    question: "What can be computed, and what resources must computation require?",
    rgb: "148,163,184",
    index: "05",
  },
  "formal.computer-science.security": {
    icon: ShieldCheck,
    layer: "communication and trust",
    question: "How can information move between systems without losing confidentiality or integrity?",
    rgb: "96,165,250",
    index: "06",
  },
};

export default function ComputerScienceHub() {
  const context = requireCurriculumPageContext(NODE_ID);

  return (
    <SceneFrame
      background={<ComputerScienceBackground />}
      className="bg-[#02080b] text-slate-100 selection:bg-emerald-400/25"
      maxWidthClassName="max-w-[1580px]"
      headerBackground="rgba(2,8,11,0.60)"
      header={
        <DomainPageHeader
          breadcrumbs={context.breadcrumbs}
          eyebrow="Representation · procedure · execution · system · communication"
          eyebrowStyle="rule"
          icon={Terminal}
          title={<span>Computer Science</span>}
          subtitle="Computer science studies computation across layers: physical machines, software, algorithms, intelligent systems, mathematical limits, and secure communication. Start with the layer that matches the question you want to ask."
          accentRgb="52, 211, 153"
          titleClassName="font-sans text-[clamp(2.8rem,5.4vw,6.1rem)] font-semibold leading-[0.84] tracking-[-0.067em] text-[#f2fff8]"
          headerClassName="border-white/[0.08]"
        />
      }
    >
      <section className="mt-5 overflow-hidden rounded-[32px] border border-emerald-100/[0.13] bg-[#020a0d]/70 shadow-[0_34px_120px_rgba(0,0,0,0.29)] backdrop-blur-lg">
        <div className="grid border-b border-emerald-100/[0.09] lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="p-5 sm:p-6">
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.13em] text-emerald-200/72">
              Primary navigation · computing stack
            </div>
            <h2 className="mt-2 max-w-4xl text-[clamp(2rem,4vw,4.2rem)] font-semibold leading-[0.93] tracking-[-0.055em] text-white">
              The same computation looks different at each layer of the machine.
            </h2>
            <p className="mt-3 max-w-3xl text-[14px] leading-6 text-slate-300/68">
              These six routes are the direct children of Computer Science. Their order moves from physical execution toward abstraction, reasoning, limits, and communication without pretending the layers are independent.
            </p>
          </div>
          <div className="border-t border-emerald-100/[0.08] bg-emerald-300/[0.025] p-5 lg:border-l lg:border-t-0">
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-cyan-200/65">
              Shared computation loop
            </div>
            <div className="mt-4 space-y-2">
              <LoopStep number="01" label="Represent information" />
              <LoopStep number="02" label="Apply a procedure" />
              <LoopStep number="03" label="Change machine state" />
              <LoopStep number="04" label="Observe and communicate the result" />
            </div>
          </div>
        </div>

        <nav aria-label="Computer Science branches" className="relative">
          <div className="pointer-events-none absolute bottom-0 left-[47px] top-0 hidden w-px bg-gradient-to-b from-emerald-300/35 via-cyan-300/24 to-blue-300/18 sm:block" />
          <div className="divide-y divide-white/[0.07]">
            {context.children.map((child) => (
              <StackRow key={child.id} child={child} />
            ))}
          </div>
        </nav>
      </section>

      <section className="mt-10 grid gap-5 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
        <div>
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-cyan-200/68">
            <Braces size={14} /> One field, several abstractions
          </div>
          <h2 className="mt-3 max-w-5xl text-[clamp(2rem,3.8vw,3.8rem)] font-semibold leading-[0.95] tracking-[-0.052em] text-white">
            Abstraction hides detail so another question can become tractable.
          </h2>
        </div>
        <p className="text-[14px] leading-6 text-slate-400/72">
          A software function can ignore transistor timing. An algorithm can ignore programming syntax. Computation theory can ignore the brand of processor. The hidden details still matter, but not at every layer at once.
        </p>
      </section>

      <section className="mt-5 overflow-hidden rounded-[24px] border-y border-white/[0.10] bg-black/[0.12] backdrop-blur-md">
        <div className="flex flex-col gap-2 border-b border-white/[0.08] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-slate-400">
              Field principles · reference, not navigation
            </div>
            <h2 className="mt-1 text-[20px] font-semibold tracking-[-0.03em] text-white">
              Three ideas recur across every branch.
            </h2>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-slate-600">
            no routes in this band
          </span>
        </div>
        <div className="grid md:grid-cols-3">
          <Principle
            icon={Binary}
            label="Representation"
            title="A problem changes when its data structure changes."
            text="Arrays, graphs, trees, streams, machine words, and symbolic expressions expose different operations and hide different costs."
            rgb="52,211,153"
          />
          <Principle
            icon={Cpu}
            label="Execution"
            title="A description becomes computation only through state change."
            text="Instructions, interpreters, runtimes, processors, memory, and networks cooperate to turn formal procedures into actual behavior."
            rgb="34,211,238"
          />
          <Principle
            icon={Network}
            label="Composition"
            title="Large systems are built from contracts between smaller ones."
            text="Interfaces let components cooperate without requiring every layer to understand every implementation detail beneath it."
            rgb="167,139,250"
          />
        </div>
      </section>
    </SceneFrame>
  );
}

function StackRow({ child }: { child: CurriculumNode }) {
  const meta = CHILD_META[child.id] ?? {
    icon: Braces,
    layer: "computing branch",
    question: child.description ?? "Explore this branch of computer science.",
    rgb: "52,211,153",
    index: "--",
  };
  const Icon = meta.icon;
  const planned = child.status === "placeholder";
  const body = (
    <div
      className={`group grid min-h-[104px] gap-4 px-5 py-4 sm:grid-cols-[52px_54px_220px_minmax(0,1fr)_28px] sm:items-center sm:px-6 ${
        planned ? "opacity-58" : "transition hover:bg-white/[0.026]"
      }`}
    >
      <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.10] bg-[#031014] font-mono text-[11px] text-slate-500">
        {meta.index}
      </span>
      <span
        className="flex h-11 w-11 items-center justify-center rounded-[13px] border"
        style={{
          color: `rgb(${meta.rgb})`,
          borderColor: `rgba(${meta.rgb},0.25)`,
          background: `rgba(${meta.rgb},0.05)`,
        }}
      >
        <Icon size={18} />
      </span>
      <span>
        <span
          className="font-mono text-[11px] font-semibold uppercase tracking-[0.09em]"
          style={{ color: `rgba(${meta.rgb},0.70)` }}
        >
          {meta.layer}
        </span>
        <strong className="mt-1 block text-[18px] font-semibold text-white">
          {child.label}
        </strong>
      </span>
      <span className="text-[14px] leading-6 text-slate-400/72">
        {meta.question}
      </span>
      {planned ? (
        <span className="h-2 w-2 rounded-full border border-white/[0.14]" />
      ) : (
        <ArrowRight
          size={16}
          className="text-white/28 transition group-hover:translate-x-1 group-hover:text-white/78"
        />
      )}
    </div>
  );

  return planned ? (
    <div aria-disabled="true">{body}</div>
  ) : (
    <Link href={child.href}>{body}</Link>
  );
}

function LoopStep({ number, label }: { number: string; label: string }) {
  return (
    <div className="grid grid-cols-[34px_minmax(0,1fr)] items-center gap-3 rounded-[12px] border border-white/[0.07] bg-black/[0.16] px-3 py-2.5">
      <span className="font-mono text-[11px] text-emerald-200/58">{number}</span>
      <span className="text-[13px] text-slate-200/76">{label}</span>
    </div>
  );
}

function Principle({
  icon: Icon,
  label,
  title,
  text,
  rgb,
}: {
  icon: LucideIcon;
  label: string;
  title: string;
  text: string;
  rgb: string;
}) {
  return (
    <article className="min-h-[205px] border-b border-white/[0.07] px-5 py-5 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
      <Icon size={18} style={{ color: `rgb(${rgb})` }} />
      <div
        className="mt-4 font-mono text-[11px] font-semibold uppercase tracking-[0.10em]"
        style={{ color: `rgba(${rgb},0.70)` }}
      >
        {label}
      </div>
      <h3 className="mt-2 text-[18px] font-semibold tracking-[-0.025em] text-white">
        {title}
      </h3>
      <p className="mt-2 text-[14px] leading-6 text-slate-400/70">{text}</p>
    </article>
  );
}
