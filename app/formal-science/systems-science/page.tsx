import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame, Surface } from "@/app/_page-system/scene";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowDown,
  ArrowRight,
  Boxes,
  GitMerge,
  Gauge,
  Network,
  Orbit,
  RefreshCw,
  Sparkles,
  Triangle,
  Waypoints,
  Waves,
} from "lucide-react";
import FeedbackWidget from "./FeedbackWidget";
import GameOfLife from "./GameOfLife";
import SystemsBackground2 from "./SystemsBackground2";

const NODE_ID = "formal.systems-science";

type BranchMeta = {
  icon: LucideIcon;
  code: string;
  question: string;
  rgb: string;
  family: "structure" | "dynamics";
};

const BRANCH_META: Record<string, BranchMeta> = {
  "formal.systems-science.general-systems": {
    icon: Boxes,
    code: "SYS",
    question: "Where is the boundary, what is inside it, what crosses it, and which relationships define the system being modeled?",
    rgb: "248,113,113",
    family: "structure",
  },
  "formal.systems-science.feedback-cybernetics": {
    icon: RefreshCw,
    code: "FBK",
    question: "How do sensing, comparison, communication, delays, and feedback amplify or reduce changes in state?",
    rgb: "94,234,212",
    family: "dynamics",
  },
  "formal.systems-science.system-dynamics": {
    icon: Gauge,
    code: "DYN",
    question: "How do stocks accumulate, flows change them, delays shift responses, and interacting loops create behavior over time?",
    rgb: "251,191,36",
    family: "dynamics",
  },
  "formal.systems-science.network-science": {
    icon: Network,
    code: "NET",
    question: "How does the pattern of connections change access, diffusion, fragility, coordination, clustering, and influence?",
    rgb: "244,114,182",
    family: "structure",
  },
  "formal.systems-science.agent-cellular": {
    icon: Waypoints,
    code: "AGT",
    question: "Which local rules and neighborhoods are sufficient for population-level patterns to emerge after repeated interaction?",
    rgb: "125,211,252",
    family: "structure",
  },
  "formal.systems-science.complexity-chaos": {
    icon: Sparkles,
    code: "CMP",
    question: "How can interacting parts self-organize, adapt, generate patterns, or settle into attractors without a central controller?",
    rgb: "251,146,60",
    family: "dynamics",
  },
  "formal.systems-science.chaos-theory": {
    icon: Orbit,
    code: "CHS",
    question: "When does deterministic nonlinear evolution become highly sensitive to initial conditions and limit long-range prediction?",
    rgb: "192,132,252",
    family: "dynamics",
  },
  "formal.systems-science.resilience-adaptation": {
    icon: Waves,
    code: "RES",
    question: "How does a system absorb disturbance, recover, adapt, cross thresholds, or reorganize into a different regime?",
    rgb: "134,239,172",
    family: "structure",
  },
};

const SYSTEM_SPINE = [
  { label: "Boundary", detail: "what is inside · outside · exchanged", rgb: "248,113,113", icon: Boxes },
  { label: "State", detail: "stocks · variables · configuration", rgb: "251,191,36", icon: Gauge },
  { label: "Interaction", detail: "flows · links · rules · feedback", rgb: "94,234,212", icon: GitMerge },
  { label: "Time", detail: "updates · delays · accumulation · memory", rgb: "125,211,252", icon: Activity },
  { label: "Behavior", detail: "stability · growth · cycles · emergence · regimes", rgb: "192,132,252", icon: Orbit },
] as const;

const DISTINCTIONS = [
  ["Complicated vs. complex", "A system can have many parts yet remain predictable when decomposed. Complex behavior usually emphasizes interacting parts, nonlinearities, adaptation, emergence, or strong dependence on organization."],
  ["Positive vs. beneficial", "Positive feedback means a change is reinforced. Negative feedback means a change is counteracted. The signs describe loop structure, not whether an outcome is morally or practically good."],
  ["Emergence vs. surprise", "Emergent properties depend on organization and interactions among parts. They do not have to be mysterious, random, or impossible to explain from a model."],
  ["Chaos vs. randomness", "Chaotic systems can be deterministic. Their practical unpredictability can come from sensitive dependence on initial conditions rather than random update rules."],
  ["Model vs. world", "Every systems model draws a boundary and omits detail. A useful model can still fail when the excluded environment, heterogeneity, delay, adaptation, or scale becomes important."],
  ["Resilience vs. optimality", "A system optimized for one steady condition may be brittle under disturbance. Robustness, redundancy, adaptability, efficiency, and performance can trade against one another."],
] as const;

export default function SystemsPage() {
  const context = requireCurriculumPageContext(NODE_ID);
  const structure = context.children.filter((branch) => BRANCH_META[branch.id]?.family === "structure");
  const dynamics = context.children.filter((branch) => BRANCH_META[branch.id]?.family === "dynamics");

  return (
    <SceneFrame
      background={<SystemsBackground2 />}
      className="bg-[#0a080b] text-slate-100 selection:bg-red-300/25"
      maxWidthClassName="max-w-[1600px]"
      headerBackground="rgba(10,8,11,0.50)"
      header={
        <DomainPageHeader
          breadcrumbs={context.breadcrumbs}
          eyebrow="Boundary · state · interaction · feedback · time · emergence"
          eyebrowStyle="rule"
          icon={GitMerge}
          title={<span>Systems Science</span>}
          subtitle="Systems science studies organized wholes through boundaries, state, relationships, flows, feedback, delays, networks, local rules, nonlinear dynamics, emergence, adaptation, and the models used to connect mechanism with behavior over time."
          accentRgb="248, 113, 113"
          titleClassName="font-sans text-[clamp(2.8rem,5.2vw,5.9rem)] font-semibold leading-[0.84] tracking-[-0.066em] text-[#fff1f2]"
          headerClassName="border-red-100/[0.10]"
        />
      }
    >
      <section className="relative isolate mt-5 overflow-hidden border-y border-red-100/[0.11] py-5 sm:py-6">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(10,8,11,0.46),transparent_28%,transparent_72%,rgba(9,10,17,0.38))] backdrop-blur-[2px]" />
        <div className="relative grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-red-200/66"><GitMerge size={14} /> Primary navigation · system mechanisms</div>
            <h2 className="mt-2 max-w-5xl text-[clamp(1.9rem,3.7vw,3.7rem)] font-semibold leading-[0.94] tracking-[-0.052em] text-white">
              Study system structure on one side, system behavior through time on the other.
            </h2>
            <p className="mt-3 max-w-4xl text-[14px] leading-6 text-slate-300/70">
              The control-room world behind the page shows stocks, flows, a delay, disturbance, sensing, a setpoint, a controller, and both reinforcing and balancing paths. Only one feedback pulse moves slowly around the diagram.
            </p>
          </div>
          <Link href="/formal-science" className="group flex items-center justify-between gap-4 border-l border-red-200/[0.18] bg-black/[0.08] px-4 py-3 backdrop-blur-[10px] transition hover:bg-black/[0.15]">
            <span><span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">Parent field</span><strong className="mt-1 block text-[14px] text-white">Formal Sciences</strong></span>
            <ArrowRight size={15} className="text-red-200/55 transition group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="relative mt-5 grid gap-4 xl:grid-cols-[minmax(0,1fr)_290px_minmax(0,1fr)] xl:items-stretch">
          <SystemBank label="Structure & organization" branches={structure} />
          <SystemCore />
          <SystemBank label="Dynamics & change" branches={dynamics} align="right" />
        </div>
      </section>

      <section className="mt-8 grid gap-6 2xl:grid-cols-2 2xl:items-start">
        <div>
          <div className="mb-3"><div className="font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-emerald-200/58">Instrument 01 · feedback</div><h2 className="mt-1 text-[22px] font-semibold tracking-[-0.035em] text-white">Amplify or correct state through a loop with optional delay.</h2></div>
          <FeedbackWidget />
        </div>
        <div>
          <div className="mb-3"><div className="font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-red-200/58">Instrument 02 · emergence</div><h2 className="mt-1 text-[22px] font-semibold tracking-[-0.035em] text-white">Let global patterns arise from nothing but local update rules.</h2></div>
          <GameOfLife />
        </div>
      </section>

      <section className="mt-8 border-t border-red-100/[0.10] pt-5">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <div><div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-amber-200/58"><Triangle size={14} /> Useful distinctions · reference, not navigation</div><h2 className="mt-2 max-w-4xl text-[clamp(1.8rem,3.2vw,3rem)] font-semibold leading-[0.96] tracking-[-0.048em] text-white">Systems vocabulary gets dangerous when similar words are treated as synonyms.</h2></div>
          <p className="text-[14px] leading-6 text-slate-400/72">A systems diagram is useful because it discards detail. Good systems work makes those omissions visible and checks whether the chosen boundary still supports the question being asked.</p>
        </div>
        <div className="mt-5 grid border-y border-white/[0.08] md:grid-cols-2 xl:grid-cols-3">
          {DISTINCTIONS.map(([term, text], index) => (
            <div key={term} className="grid grid-cols-[42px_minmax(0,1fr)] gap-3 border-b border-white/[0.07] px-4 py-4 xl:border-r xl:[&:nth-child(3n)]:border-r-0 xl:[&:nth-last-child(-n+3)]:border-b-0"><span className="font-mono text-[11px] text-red-200/42">0{index + 1}</span><span><strong className="block text-[13px] text-slate-200/86">{term}</strong><span className="mt-1 block text-[12px] leading-5 text-slate-500">{text}</span></span></div>
          ))}
        </div>
      </section>
    </SceneFrame>
  );
}

function SystemBank({ label, branches, align = "left" }: { label: string; branches: CurriculumNode[]; align?: "left" | "right" }) {
  return <div><div className={`mb-2 font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-slate-500 ${align === "right" ? "xl:text-right" : ""}`}>{label}</div><div className="border-y border-white/[0.06]">{branches.map((branch) => <SystemRoute key={branch.id} branch={branch} align={align} />)}</div></div>;
}

function SystemRoute({ branch, align }: { branch: CurriculumNode; align: "left" | "right" }) {
  const meta = BRANCH_META[branch.id] ?? { icon: GitMerge, code: "SYS", question: branch.description ?? "Explore this systems branch.", rgb: "248,113,113", family: "structure" as const };
  const Icon = meta.icon;
  const planned = branch.status === "placeholder";
  const body = <div className="group grid min-h-[94px] grid-cols-[52px_minmax(0,1fr)_52px] gap-3 border-b border-white/[0.06] bg-black/[0.045] px-3 py-3 backdrop-blur-[8px] last:border-b-0 transition hover:bg-black/[0.09]"><span className={`flex h-9 w-9 items-center justify-center rounded-full border ${align === "right" ? "xl:order-3" : ""}`} style={{ color: `rgb(${meta.rgb})`, borderColor: `rgba(${meta.rgb},0.26)`, background: `rgba(${meta.rgb},0.04)` }}><Icon size={14} /></span><span className={align === "right" ? "xl:text-right" : ""}><span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em]" style={{ color: `rgba(${meta.rgb},0.70)` }}>{meta.code}</span><strong className="mt-0.5 block text-[14px] text-white/88">{branch.label}</strong><span className="mt-1 block text-[11px] leading-4 text-slate-500">{meta.question}</span></span><span className={`pt-1 font-mono text-[11px] uppercase text-slate-600 ${align === "right" ? "text-right xl:order-first xl:text-left" : "text-right"}`}>{planned ? "planned" : "open"}</span></div>;
  return planned ? <div aria-disabled="true">{body}</div> : <Link href={branch.href}>{body}</Link>;
}

function SystemCore() {
  return (
    <Surface variant="open" className="relative min-h-[480px] overflow-hidden rounded-[30px] border-red-100/[0.08]" style={{ background: "rgba(10,8,11,0.025)" }}>
      <div className="p-4"><div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-red-200/54"><GitMerge size={13} /> System model spine</div><p className="mt-2 text-[12px] leading-5 text-slate-400/64">A model declares a boundary, represents state, specifies interactions, advances time, and produces behavior.</p></div>
      <div className="mx-4 mt-1 space-y-1">{SYSTEM_SPINE.map((step, index) => { const Icon = step.icon; return <div key={step.label} className="border-b border-white/[0.06] py-3 last:border-b-0"><div className="flex items-start gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border" style={{ color: `rgb(${step.rgb})`, borderColor: `rgba(${step.rgb},0.24)`, background: `rgba(${step.rgb},0.04)` }}><Icon size={13} /></span><span><strong className="block text-[13px]" style={{ color: `rgba(${step.rgb},0.84)` }}>{step.label}</strong><span className="mt-1 block text-[11px] leading-4 text-slate-500">{step.detail}</span></span></div>{index < SYSTEM_SPINE.length - 1 ? <ArrowDown size={13} className="ml-[10px] mt-2 text-slate-600" /> : null}</div>; })}</div>
      <div className="absolute bottom-4 inset-x-4 border-t border-red-100/[0.07] pt-3 text-center font-mono text-[11px] uppercase tracking-[0.07em] text-red-200/34">behavior feeds back into the next state</div>
    </Surface>
  );
}
