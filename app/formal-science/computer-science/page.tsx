import type { Metadata } from "next";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame } from "@/app/_page-system/scene";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import {
  ArrowRight,
  Binary,
  BookOpen,
  BrainCircuit,
  Braces,
  Code2,
  Cpu,
  Database,
  Github,
  Layers3,
  Network,
  ShieldCheck,
  Terminal,
  type LucideIcon,
} from "lucide-react";
import { ComputerScienceBackground } from "./ComputerScienceBackground";
import ComputerScienceEvidenceReview from "./ComputerScienceEvidenceReview";
import { COMPUTER_SCIENCE_DIRECT_BRANCH_IDS } from "./computerScienceModel";

const NODE_ID = "formal.computer-science";

export const metadata: Metadata = {
  title: "Computer Science",
  description:
    "Follow computation from representation through algorithms, execution, interfaces, intelligent systems, formal limits, and secure communication.",
};

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
    question:
      "How does information become electrical state and executed instruction?",
    rgb: "52,211,153",
    index: "01",
  },
  "formal.computer-science.software": {
    icon: Code2,
    layer: "programmed behavior",
    question:
      "How do languages and systems organize behavior above the machine?",
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
    question:
      "What can be computed, and what resources must computation require?",
    rgb: "148,163,184",
    index: "05",
  },
  "formal.computer-science.security": {
    icon: ShieldCheck,
    layer: "communication and trust",
    question:
      "How can information move without losing confidentiality or integrity?",
    rgb: "96,165,250",
    index: "06",
  },
};

const LOOP_STEPS = [
  {
    number: "01",
    label: "Represent",
    note: "encode information as machine state",
    rgb: "52,211,153",
  },
  {
    number: "02",
    label: "Transform",
    note: "apply a procedure under explicit rules",
    rgb: "34,211,238",
  },
  {
    number: "03",
    label: "Execute",
    note: "change memory, processor, or network state",
    rgb: "167,139,250",
  },
  {
    number: "04",
    label: "Communicate",
    note: "expose a result through an interface",
    rgb: "96,165,250",
  },
] as const;

const TRACE_CASES = [
  {
    label: "Load a webpage",
    path: "network → software → hardware",
    rgb: "34,211,238",
  },
  {
    label: "Train a model",
    path: "data → algorithm → processor",
    rgb: "251,146,60",
  },
  {
    label: "Secure a message",
    path: "theory → software → network",
    rgb: "96,165,250",
  },
] as const;

const COMPUTER_SCIENCE_SOURCES = [
  {
    label: "GitHub repository API",
    eyebrow: "Code · identity · revision · license",
    href: "https://docs.github.com/en/rest/repos/repos",
    boundary:
      "Repository metadata can seed a code collection, but stars are not correctness, safety, maintainability, or educational quality. Retain provider, owner/name, stable repository ID, default branch, selected commit or release, license fields, source URL, pagination, API version, and refresh time; inspect the referenced code and license before teaching from it.",
    rgb: "52,211,153",
    icon: Github,
  },
  {
    label: "RFC Editor repository",
    eyebrow: "Protocols · status · updates · errata",
    href: "https://www.rfc-editor.org/search/",
    boundary:
      "RFCs include standards-track, best-current-practice, informational, experimental, and historic documents. Preserve RFC number, title, stream, status, publication date, obsoletes/updates relationships, errata link, and retrieval date; publication is not proof that every RFC is a current Internet Standard or that an implementation conforms.",
    rgb: "34,211,238",
    icon: BookOpen,
  },
  {
    label: "NVD vulnerability API",
    eyebrow: "CVE · source · status · applicability",
    href: "https://nvd.nist.gov/developers/vulnerabilities",
    boundary:
      "NVD records can support a defensive security repository. Retain CVE ID, source, publication and modification times, status, descriptions, affected-product assertions, metrics with version and source, references, API response version, pagination, and refresh context. A CVE or score alone does not establish exploitability, local exposure, priority, or the safety of a specific deployment.",
    rgb: "96,165,250",
    icon: Database,
  },
] as const;

export default function ComputerScienceHub() {
  const context = requireCurriculumPageContext(NODE_ID);

  if (context.pageKind !== "hub") {
    throw new Error("Computer Science must be classified as a navigation hub.");
  }

  const actualIds = context.children.map((child) => child.id);
  if (
    actualIds.length !== COMPUTER_SCIENCE_DIRECT_BRANCH_IDS.length ||
    actualIds.some(
      (id, index) => id !== COMPUTER_SCIENCE_DIRECT_BRANCH_IDS[index]
    )
  ) {
    throw new Error(
      "Computer Science page branch navigation is out of sync with the curriculum registry."
    );
  }

  return (
    <SceneFrame
      background={<ComputerScienceBackground />}
      className="bg-[#02080b] text-slate-100 selection:bg-emerald-400/25"
      maxWidthClassName="max-w-[1580px]"
      headerBackground="rgba(2,8,11,0.52)"
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
      <section className="relative isolate mt-5 overflow-hidden border-y border-emerald-100/[0.12] py-5 sm:py-6">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(1,10,12,0.34),rgba(1,10,12,0.10)_48%,transparent_72%)]" />
        <div className="pointer-events-none absolute left-[61%] top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-cyan-200/[0.16] to-transparent xl:block" />

        <div className="relative grid gap-5 xl:grid-cols-[minmax(0,1.08fr)_minmax(380px,0.72fr)]">
          <div className="min-w-0">
            <div className="max-w-4xl px-1">
              <div className="text-emerald-200/72 font-mono text-[11px] font-semibold uppercase tracking-[0.13em]">
                Primary navigation · computing stack
              </div>
              <h2 className="mt-2 text-[clamp(2rem,4vw,4.1rem)] font-semibold leading-[0.93] tracking-[-0.055em] text-white">
                Follow computation from physical state to abstract behavior.
              </h2>
              <p className="text-slate-300/72 mt-3 max-w-3xl text-[14px] leading-6">
                These six routes are the direct children of Computer Science.
                The stack is compact enough to preserve the runtime world around
                it, but every destination remains unmistakably navigational.
              </p>
            </div>

            <nav
              aria-label="Computer Science branches"
              className="relative mt-5 space-y-2.5"
            >
              <div className="from-emerald-300/38 via-cyan-300/24 pointer-events-none absolute bottom-5 left-[20px] top-5 hidden w-px bg-gradient-to-b to-blue-300/20 sm:block" />
              {context.children.map((child) => (
                <StackRow key={child.id} child={child} />
              ))}
            </nav>
          </div>

          <RuntimeMap />
        </div>
      </section>

      <section className="mt-24 border-t border-white/[0.10] pt-7">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end">
          <div>
            <div className="text-cyan-200/68 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em]">
              <Braces size={14} /> Field principles · reference, not navigation
            </div>
            <h2 className="mt-2 max-w-5xl text-[clamp(1.9rem,3.6vw,3.6rem)] font-semibold leading-[0.95] tracking-[-0.052em] text-white">
              Abstraction hides detail so another question can become tractable.
            </h2>
          </div>
          <p className="text-slate-400/74 text-[14px] leading-6">
            A function can ignore transistor timing, an algorithm can ignore
            syntax, and computation theory can ignore the processor brand.
            Hidden layers still matter, but not every layer must be solved at
            once.
          </p>
        </div>

        <div className="mt-5 grid border-y border-white/[0.08] md:grid-cols-3">
          <Principle
            icon={Binary}
            label="Representation"
            title="Data structure changes the available moves."
            text="Arrays, graphs, trees, streams, machine words, and symbolic expressions expose different operations and hide different costs."
            rgb="52,211,153"
          />
          <Principle
            icon={Cpu}
            label="Execution"
            title="A description becomes computation through state change."
            text="Instructions, runtimes, processors, memory, and networks cooperate to turn formal procedures into actual behavior."
            rgb="34,211,238"
          />
          <Principle
            icon={Network}
            label="Composition"
            title="Large systems depend on contracts between layers."
            text="Interfaces let components cooperate without requiring every layer to understand every implementation detail beneath it."
            rgb="167,139,250"
          />
        </div>
      </section>

      <section className="mt-24">
        <ComputerScienceEvidenceReview />
      </section>

      <section className="mt-24 border-t border-cyan-100/[0.10] pb-7 pt-7">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end">
          <div className="rounded-[18px] bg-[#020b10]/[0.18] px-4 py-3 backdrop-blur-[14px]">
            <div className="text-cyan-100/58 font-mono text-[11px] font-semibold uppercase tracking-[0.10em]">
              Repositories with contracts, revisions, and provenance
            </div>
            <h2 className="mt-2 max-w-4xl text-[clamp(1.9rem,3.4vw,3.3rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-white">
              A record is useful when identity and interpretation survive the
              fetch.
            </h2>
          </div>
          <p className="rounded-[16px] bg-[#020b10]/[0.18] px-4 py-3 text-[13px] leading-6 text-slate-400/75 backdrop-blur-[14px]">
            These official resources define future code, protocol, and security
            collections. The root performs no render-time fetch. Each adapter
            must preserve source identity, version or revision, pagination,
            uncertainty, and the difference between metadata and an evaluated
            claim.
          </p>
        </div>
        <div className="mt-6 grid gap-3 lg:grid-cols-3">
          {COMPUTER_SCIENCE_SOURCES.map((source) => (
            <ComputerScienceSource key={source.label} source={source} />
          ))}
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
      className={`group relative grid min-h-[78px] gap-3 overflow-hidden rounded-l-[16px] rounded-r-[30px] border px-4 py-3 sm:grid-cols-[40px_42px_185px_minmax(0,1fr)_24px] sm:items-center sm:px-5 ${
        planned ? "opacity-58" : "transition hover:translate-x-1"
      }`}
      style={{
        borderColor: `rgba(${meta.rgb},${planned ? 0.08 : 0.18})`,
        background: `linear-gradient(90deg,rgba(1,10,13,0.72),rgba(${meta.rgb},0.045) 52%,rgba(1,8,11,0.10))`,
        boxShadow: planned ? undefined : `inset 3px 0 0 rgba(${meta.rgb},0.48)`,
      }}
    >
      <span className="bg-[#031014]/76 relative z-10 flex h-7 w-7 items-center justify-center rounded-full border border-white/[0.10] font-mono text-[11px] text-slate-500">
        {meta.index}
      </span>
      <span
        className="flex h-10 w-10 items-center justify-center rounded-[12px] border"
        style={{
          color: `rgb(${meta.rgb})`,
          borderColor: `rgba(${meta.rgb},0.24)`,
          background: `rgba(${meta.rgb},0.045)`,
        }}
      >
        <Icon size={17} />
      </span>
      <span>
        <span
          className="font-mono text-[11px] font-semibold uppercase tracking-[0.09em]"
          style={{ color: `rgba(${meta.rgb},0.70)` }}
        >
          {meta.layer}
        </span>
        <strong className="mt-0.5 block text-[17px] font-semibold text-white">
          {child.label}
        </strong>
      </span>
      <span className="text-slate-400/76 text-[13px] leading-5">
        {meta.question}
      </span>
      {planned ? (
        <span className="h-2 w-2 rounded-full border border-white/[0.14]" />
      ) : (
        <ArrowRight
          size={16}
          className="group-hover:text-white/82 text-white/30 transition group-hover:translate-x-1"
        />
      )}
    </div>
  );

  return planned ? (
    <div aria-disabled="true">{body}</div>
  ) : (
    <Link
      href={child.href}
      className="block rounded-l-[16px] rounded-r-[30px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/60"
    >
      {body}
    </Link>
  );
}

function RuntimeMap() {
  return (
    <aside className="relative min-h-[590px] overflow-hidden rounded-[30px] border border-white/[0.08] bg-black/[0.035]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_52%_42%,rgba(34,211,238,0.08),transparent_25%),linear-gradient(180deg,rgba(2,12,15,0.14),transparent_72%)]" />
      <div className="pointer-events-none absolute bottom-[116px] left-1/2 top-[84px] w-px -translate-x-1/2 bg-gradient-to-b from-emerald-200/[0.08] via-cyan-200/[0.32] to-blue-200/[0.10]" />

      <div className="relative px-5 pt-5">
        <div className="text-cyan-200/68 font-mono text-[11px] font-semibold uppercase tracking-[0.11em]">
          Shared computation loop
        </div>
        <p className="mt-2 max-w-md text-[13px] leading-5 text-slate-400/70">
          Different branches inspect different layers of the same state-changing
          process.
        </p>
      </div>

      <div className="relative mt-4 h-[350px]">
        {LOOP_STEPS.map((step, index) => {
          const top = 18 + index * 25;
          const leftSide = index % 2 === 0;
          return (
            <div
              key={step.number}
              className="absolute inset-x-4"
              style={{ top: `${top}%` }}
            >
              <div className="relative flex items-center justify-center">
                <div
                  className={`absolute w-[42%] border-t ${leftSide ? "left-[7%]" : "right-[7%]"}`}
                  style={{ borderColor: `rgba(${step.rgb},0.18)` }}
                />
                <span
                  className="bg-[#041017]/82 relative z-10 flex h-9 w-9 items-center justify-center rounded-full border font-mono text-[11px] font-semibold"
                  style={{
                    color: `rgb(${step.rgb})`,
                    borderColor: `rgba(${step.rgb},0.34)`,
                  }}
                >
                  {step.number}
                </span>
                <div
                  className={`absolute w-[42%] max-w-[210px] rounded-[13px] border px-3 py-2 ${leftSide ? "right-[4%] text-left" : "left-[4%] text-right"}`}
                  style={{
                    borderColor: `rgba(${step.rgb},0.15)`,
                    background: `linear-gradient(${leftSide ? "90deg" : "270deg"},rgba(${step.rgb},0.055),rgba(1,8,12,0.34))`,
                  }}
                >
                  <strong className="text-white/88 block text-[13px]">
                    {step.label}
                  </strong>
                  <span className="mt-0.5 block text-[11px] leading-4 text-slate-500">
                    {step.note}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="absolute inset-x-5 bottom-5 border-t border-white/[0.08] pt-4">
        <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-slate-500">
          Cross-layer traces
        </div>
        <div className="mt-3 grid gap-2">
          {TRACE_CASES.map((trace) => (
            <div
              key={trace.label}
              className="grid grid-cols-[120px_minmax(0,1fr)] items-center gap-3 text-[12px]"
            >
              <strong className="text-slate-200/82">{trace.label}</strong>
              <span
                className="border-l pl-3 font-mono text-[11px]"
                style={{
                  color: `rgba(${trace.rgb},0.72)`,
                  borderColor: `rgba(${trace.rgb},0.22)`,
                }}
              >
                {trace.path}
              </span>
            </div>
          ))}
        </div>
      </div>
    </aside>
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
    <article className="relative min-h-[185px] border-b border-white/[0.07] px-5 py-5 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
      <div
        className="absolute left-0 top-5 h-12 w-px"
        style={{ background: `rgba(${rgb},0.46)` }}
      />
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
      <p className="text-slate-400/72 mt-2 text-[14px] leading-6">{text}</p>
    </article>
  );
}

function ComputerScienceSource({
  source,
}: {
  source: (typeof COMPUTER_SCIENCE_SOURCES)[number];
}) {
  const Icon = source.icon;
  return (
    <a
      href={source.href}
      target="_blank"
      rel="noreferrer"
      className="group grid min-h-[270px] grid-rows-[auto_auto_1fr] border border-white/[0.08] bg-[#020b10]/[0.22] px-5 py-5 backdrop-blur-[16px] transition hover:bg-[#04151b]/[0.36] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/60"
      style={{ borderTopColor: `rgba(${source.rgb},0.38)` }}
    >
      <span
        className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.09em]"
        style={{ color: `rgba(${source.rgb},0.70)` }}
      >
        <Icon size={13} aria-hidden="true" /> {source.eyebrow}
      </span>
      <strong className="mt-3 flex items-center justify-between gap-3 text-[18px] text-white">
        {source.label}
        <ArrowRight
          size={14}
          className="transition group-hover:translate-x-1"
          aria-hidden="true"
        />
      </strong>
      <span className="mt-5 border-t border-white/[0.07] pt-4 text-[12px] leading-6 text-slate-500">
        {source.boundary}
      </span>
    </a>
  );
}
