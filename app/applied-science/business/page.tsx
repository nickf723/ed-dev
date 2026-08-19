import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame } from "@/app/_page-system/scene";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  Building2,
  Coins,
  Globe,
  Lightbulb,
  PieChart,
  Scale,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import GlobalTradeBackground from "./GlobalTradeBackground";
import GrowthSimulator from "./GrowthSimulator";

const NODE_ID = "applied.business";

type BranchMeta = { icon: LucideIcon; code: string; rgb: string; prompt: string };

const BRANCH_META: Record<string, BranchMeta> = {
  "applied.business.accounting": { icon: PieChart, code: "ACC", rgb: "192,132,252", prompt: "What happened, how should it be classified, and what can the records support?" },
  "applied.business.marketing": { icon: Target, code: "MKT", rgb: "244,114,182", prompt: "Whose problem matters, how is demand understood, and how does an offer reach people?" },
  "applied.business.finance": { icon: Coins, code: "FIN", rgb: "94,234,212", prompt: "How should capital, liquidity, risk, and time be traded against one another?" },
  "applied.business.operations": { icon: Building2, code: "OPS", rgb: "251,191,36", prompt: "How do inputs become reliable products or services without queues, defects, or waste taking over?" },
  "applied.business.management": { icon: Users, code: "MGT", rgb: "125,211,252", prompt: "How are people, authority, incentives, communication, and change coordinated?" },
  "applied.business.strategy": { icon: Briefcase, code: "STR", rgb: "134,239,172", prompt: "Which goals, capabilities, positions, and tradeoffs will the organization actually commit to?" },
  "applied.business.entrepreneurship": { icon: Lightbulb, code: "ENT", rgb: "253,186,116", prompt: "How can an uncertain opportunity be tested before resources are committed at scale?" },
  "applied.business.analytics": { icon: BarChart3, code: "ANA", rgb: "103,232,249", prompt: "Which measurements, models, experiments, and forecasts improve a decision, and which do not?" },
  "applied.business.governance-risk": { icon: Scale, code: "GRC", rgb: "248,113,113", prompt: "Who is accountable, what can fail, and which obligations constrain the organization?" },
  "applied.business.international": { icon: Globe, code: "INT", rgb: "147,197,253", prompt: "How do borders, institutions, currencies, logistics, regulation, and local context change the operating model?" },
};

const LANES = [
  {
    id: "discover",
    code: "01",
    label: "Discover & position",
    note: "Understand needs, choose where to compete, and test an opportunity.",
    ids: ["applied.business.marketing", "applied.business.strategy", "applied.business.entrepreneurship"],
    rgb: "244,114,182",
  },
  {
    id: "deliver",
    code: "02",
    label: "Coordinate & deliver",
    note: "Organize people and processes so a promise can be fulfilled in real settings.",
    ids: ["applied.business.management", "applied.business.operations", "applied.business.international"],
    rgb: "251,191,36",
  },
  {
    id: "steward",
    code: "03",
    label: "Measure & steward",
    note: "Record activity, allocate capital, learn from evidence, and manage accountability and risk.",
    ids: ["applied.business.accounting", "applied.business.finance", "applied.business.analytics", "applied.business.governance-risk"],
    rgb: "192,132,252",
  },
] as const;

const OPERATING_FLOW = ["Need", "Offer", "Capability", "Delivery", "Outcome", "Cash + evidence", "Reinvestment"] as const;

export default function BusinessPage() {
  const { node } = requireCurriculumPageContext(NODE_ID);
  const children = node.children ?? [];
  const byId = new Map(children.map((child) => [child.id, child]));

  return (
    <SceneFrame
      background={<GlobalTradeBackground />}
      className="bg-[#07100c] text-slate-100 selection:bg-emerald-300/25"
      maxWidthClassName="max-w-[1680px]"
      headerBackground="rgba(7,16,12,0.54)"
      header={
        <DomainPageHeader
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Applied Sciences", href: "/applied-science" }, { label: "Business" }]}
          eyebrow="Customers · people · operations · information · capital · risk"
          eyebrowStyle="rule"
          icon={Briefcase}
          title={<span>Business</span>}
          subtitle="Study how organizations create and deliver value by coordinating customers, people, capabilities, operations, information, capital, accounting, marketing, strategy, governance, and adaptation under real resource constraints."
          accentRgb="52, 211, 153"
          titleClassName="font-sans text-[clamp(3rem,5.5vw,6rem)] font-semibold leading-[0.84] tracking-[-0.066em] text-[#ecfdf5]"
          headerClassName="border-emerald-100/[0.10]"
        />
      }
    >
      <section className="relative isolate mt-4 border-y border-emerald-100/[0.10] py-4 sm:py-5">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(6,20,13,0.34),transparent_25%,transparent_75%,rgba(6,20,13,0.28))] backdrop-blur-[2px]" />
        <div className="relative flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-emerald-100/55">Primary navigation · operating map</div>
            <h2 className="mt-1 max-w-5xl text-[clamp(1.65rem,3vw,2.9rem)] font-semibold leading-[0.96] tracking-[-0.046em] text-white">Where inside an organization do you want to ask the next question?</h2>
          </div>
          <div className="flex gap-4 font-mono text-[9px] uppercase tracking-[0.08em]">
            <Neighbor href="/social-science/economics" label="Economics" />
            <Neighbor href="/social-science/law" label="Law" />
          </div>
        </div>

        <div className="relative mt-4 hidden min-h-[650px] overflow-hidden border border-white/[0.07] bg-[#06130d]/[0.08] backdrop-blur-[4px] lg:block">
          <OperatingFlow />
          <div className="absolute inset-x-[4%] top-[11%] space-y-[18px]">
            {LANES.map((lane) => (
              <OperatingLane key={lane.id} lane={lane} byId={byId} />
            ))}
          </div>
          <div className="absolute bottom-3 left-4 font-mono text-[8px] uppercase tracking-[0.11em] text-emerald-100/28">conceptual grouping · disciplines overlap lanes in real organizations</div>
          <div className="absolute bottom-3 right-4 font-mono text-[8px] uppercase tracking-[0.11em] text-slate-700">active stations open · muted stations are planned</div>
        </div>

        <div className="mt-4 space-y-3 lg:hidden">
          {LANES.map((lane) => <MobileOperatingLane key={lane.id} lane={lane} byId={byId} />)}
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-3 grid gap-3 border-b border-emerald-100/[0.08] pb-3 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <div><div className="font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-emerald-100/55">Strategy instrument · after the field map</div><h2 className="mt-1 text-[clamp(1.55rem,2.6vw,2.45rem)] font-semibold tracking-[-0.042em] text-white">Scarce resources make priorities visible.</h2></div>
          <p className="text-[11px] leading-5 text-slate-500">This normalized teaching model asks a different question from the navigation above: once an organization has choices, how does a finite resource pool create tradeoffs among them?</p>
        </div>
        <GrowthSimulator />
      </section>

      <section className="mt-8 border-t border-emerald-100/[0.09] pt-5">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end">
          <div><div className="font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-amber-100/52">Operating principles · reference, not navigation</div><h2 className="mt-2 max-w-4xl text-[clamp(1.8rem,3.2vw,3rem)] font-semibold leading-[0.96] tracking-[-0.048em] text-white">Performance depends on flows, constraints, incentives, tradeoffs, and what the organization chooses to measure.</h2></div>
          <p className="text-[13px] leading-6 text-slate-400/72">Frameworks such as stakeholder analysis, the Triple Bottom Line, balanced scorecards, lean systems, or portfolio models can illuminate different questions. None is a universal law of how every organization should be run.</p>
        </div>
        <div className="mt-5 grid border-y border-white/[0.07] md:grid-cols-2 xl:grid-cols-4">
          <Principle number="01" title="Revenue is not profit" text="Sales, costs, assets, liabilities, cash timing, working capital, taxes, financing, and investment describe different parts of financial performance." />
          <Principle number="02" title="Strategy means saying no" text="A strategy concentrates scarce resources and creates tradeoffs. Trying to maximize every capability at once is not a strategy." />
          <Principle number="03" title="Local optimization can hurt flow" text="A department can improve its own metric while increasing queues, inventory, delays, rework, handoff failures, or cost elsewhere in the system." />
          <Principle number="04" title="Value has stakeholders" text="Customers, workers, owners, suppliers, communities, regulators, and environmental systems can experience different benefits, costs, and risks." />
        </div>
      </section>
    </SceneFrame>
  );
}

function OperatingFlow() {
  return (
    <div className="pointer-events-none absolute inset-x-[7%] top-1/2 -translate-y-1/2">
      <div className="relative flex items-center justify-between">
        <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-pink-300/15 via-emerald-200/22 to-violet-300/15" />
        {OPERATING_FLOW.map((step, index) => (
          <div key={step} className="relative z-10 flex flex-col items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full border border-emerald-100/20 bg-[#07100c] shadow-[0_0_18px_rgba(52,211,153,0.08)]" />
            <span className="font-mono text-[8px] uppercase tracking-[0.08em] text-slate-700">{String(index + 1).padStart(2, "0")}</span>
            <span className="text-[9px] text-slate-600">{step}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center font-mono text-[8px] uppercase tracking-[0.11em] text-emerald-100/22">value, cash, and information loop through the organization rather than moving only one way</div>
    </div>
  );
}

function OperatingLane({ lane, byId }: { lane: (typeof LANES)[number]; byId: Map<string, CurriculumNode> }) {
  const branches = lane.ids.map((id) => byId.get(id)).filter((branch): branch is CurriculumNode => Boolean(branch));
  return (
    <section className="grid min-h-[164px] grid-cols-[190px_minmax(0,1fr)] border-b border-white/[0.06] last:border-b-0">
      <div className="flex flex-col justify-between border-r border-white/[0.06] py-4 pr-5">
        <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.10em]" style={{ color: `rgba(${lane.rgb},0.56)` }}>{lane.code}</span>
        <span><strong className="block text-[15px] text-white/82">{lane.label}</strong><span className="mt-1 block text-[10px] leading-4 text-slate-600">{lane.note}</span></span>
      </div>
      <div className={`grid divide-x divide-white/[0.055] ${branches.length === 4 ? "grid-cols-4" : "grid-cols-3"}`}>
        {branches.map((branch) => <BusinessStation key={branch.id} branch={branch} />)}
      </div>
    </section>
  );
}

function BusinessStation({ branch }: { branch: CurriculumNode }) {
  const meta = BRANCH_META[branch.id] ?? { icon: Briefcase, code: "BUS", rgb: "148,163,184", prompt: branch.description ?? "Explore this business discipline." };
  const Icon = meta.icon;
  const active = branch.status === "active";
  const content = (
    <div className={`group relative flex h-full min-h-[164px] flex-col px-4 py-4 transition ${active ? "hover:bg-white/[0.018]" : "opacity-48"}`}>
      <div className="flex items-center justify-between gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-full border" style={{ color: `rgb(${meta.rgb})`, borderColor: `rgba(${meta.rgb},0.22)`, background: `rgba(${meta.rgb},0.03)` }}><Icon size={14} /></span>
        <span className="font-mono text-[8px] uppercase tracking-[0.08em] text-slate-700">{active ? "open" : "planned"}</span>
      </div>
      <div className="mt-3 font-mono text-[9px] font-semibold uppercase tracking-[0.08em]" style={{ color: `rgba(${meta.rgb},0.56)` }}>{meta.code}</div>
      <strong className="mt-1 block text-[13px] leading-5 text-white/82">{branch.label}</strong>
      <p className="mt-2 text-[9px] leading-4 text-slate-600">{meta.prompt}</p>
      {active ? <span className="mt-auto flex items-center justify-end gap-1 pt-2 font-mono text-[8px] uppercase tracking-[0.08em]" style={{ color: `rgba(${meta.rgb},0.58)` }}>open station <ArrowRight size={9} className="transition group-hover:translate-x-1" /></span> : null}
    </div>
  );
  return active ? <Link href={branch.href ?? "#"}>{content}</Link> : <div aria-disabled="true">{content}</div>;
}

function MobileOperatingLane({ lane, byId }: { lane: (typeof LANES)[number]; byId: Map<string, CurriculumNode> }) {
  const branches = lane.ids.map((id) => byId.get(id)).filter((branch): branch is CurriculumNode => Boolean(branch));
  return (
    <section className="border border-white/[0.07] bg-black/[0.04] backdrop-blur-lg">
      <div className="grid grid-cols-[38px_minmax(0,1fr)] gap-2 border-b border-white/[0.06] px-3 py-3"><span className="font-mono text-[8px]" style={{ color: `rgba(${lane.rgb},0.52)` }}>{lane.code}</span><span><strong className="text-[12px] text-white/78">{lane.label}</strong><span className="mt-1 block text-[9px] leading-4 text-slate-600">{lane.note}</span></span></div>
      {branches.map((branch) => {
        const meta = BRANCH_META[branch.id] ?? { icon: Briefcase, code: "BUS", rgb: "148,163,184", prompt: branch.description ?? "Explore this business discipline." };
        const Icon = meta.icon;
        const active = branch.status === "active";
        const content = <div className={`group grid grid-cols-[34px_minmax(0,1fr)_18px] gap-2 border-b border-white/[0.055] px-3 py-3 last:border-b-0 ${active ? "" : "opacity-48"}`}><span className="flex h-8 w-8 items-center justify-center rounded-full border" style={{ color: `rgb(${meta.rgb})`, borderColor: `rgba(${meta.rgb},0.20)` }}><Icon size={12} /></span><span><span className="font-mono text-[8px] uppercase tracking-[0.07em]" style={{ color: `rgba(${meta.rgb},0.54)` }}>{meta.code}</span><strong className="mt-0.5 block text-[11px] text-white/80">{branch.label}</strong><span className="mt-1 block text-[9px] leading-4 text-slate-600">{meta.prompt}</span></span>{active ? <ArrowRight size={11} className="mt-2 text-slate-600 transition group-hover:translate-x-1" /> : null}</div>;
        return active ? <Link key={branch.id} href={branch.href ?? "#"}>{content}</Link> : <div key={branch.id} aria-disabled="true">{content}</div>;
      })}
    </section>
  );
}

function Neighbor({ href, label }: { href: string; label: string }) {
  return <Link href={href} className="group flex items-center gap-1 border-b border-white/[0.06] pb-1 text-slate-600 transition hover:border-emerald-100/20 hover:text-slate-300">{label}<ArrowRight size={9} className="transition group-hover:translate-x-0.5" /></Link>;
}

function Principle({ number, title, text }: { number: string; title: string; text: string }) {
  return <div className="grid min-h-[130px] grid-cols-[38px_minmax(0,1fr)] gap-2 border-b border-white/[0.06] px-4 py-4 xl:border-r xl:border-b-0 xl:last:border-r-0"><span className="font-mono text-[10px] text-emerald-100/35">{number}</span><span><strong className="text-[12px] text-white/80">{title}</strong><span className="mt-2 block text-[11px] leading-5 text-slate-500">{text}</span></span></div>;
}
