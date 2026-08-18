import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame, Surface } from "@/app/_page-system/scene";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Briefcase,
  Building2,
  Globe,
  PieChart,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import GlobalTradeBackground from "./GlobalTradeBackground";
import GrowthSimulator from "./GrowthSimulator";

const NODE_ID = "applied.business";

type BranchMeta = { icon: LucideIcon; code: string; rgb: string };

const BRANCH_META: Record<string, BranchMeta> = {
  "applied.business.accounting": { icon: PieChart, code: "ACC", rgb: "192,132,252" },
  "applied.business.marketing": { icon: Target, code: "MKT", rgb: "244,114,182" },
  "applied.business.finance": { icon: TrendingUp, code: "FIN", rgb: "94,234,212" },
  "applied.business.operations": { icon: Building2, code: "OPS", rgb: "251,191,36" },
  "applied.business.management": { icon: Users, code: "MGT", rgb: "125,211,252" },
  "applied.business.strategy": { icon: Briefcase, code: "STR", rgb: "134,239,172" },
  "applied.business.entrepreneurship": { icon: Briefcase, code: "ENT", rgb: "253,186,116" },
  "applied.business.analytics": { icon: TrendingUp, code: "ANA", rgb: "103,232,249" },
  "applied.business.governance-risk": { icon: Users, code: "GRC", rgb: "248,113,113" },
  "applied.business.international": { icon: Globe, code: "INT", rgb: "147,197,253" },
};

export default function BusinessPage() {
  const { node } = requireCurriculumPageContext(NODE_ID);
  const children = node.children ?? [];

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
      <section className="mt-5">
        <div className="mb-3 grid gap-3 border-b border-emerald-100/[0.08] pb-3 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <div><div className="font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-emerald-100/55">Operating model · primary navigation + strategy lab</div><h2 className="mt-1 text-[clamp(1.8rem,3.2vw,3rem)] font-semibold tracking-[-0.046em] text-white">An organization is a bundle of interdependent choices, not a revenue graph.</h2></div>
          <div className="grid grid-cols-2 gap-2">
            <Neighbor href="/social-science/economics" label="Economics" note="markets · incentives · allocation" />
            <Neighbor href="/social-science/law" label="Law" note="institutions · rights · obligations" />
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[250px_minmax(0,1fr)] xl:items-start">
          <FieldIndex children={children} />
          <GrowthSimulator />
        </div>
      </section>

      <section className="mt-8 border-t border-emerald-100/[0.09] pt-5">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end">
          <div><div className="font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-amber-100/52">Operating principles</div><h2 className="mt-2 max-w-4xl text-[clamp(1.8rem,3.2vw,3rem)] font-semibold leading-[0.96] tracking-[-0.048em] text-white">Performance depends on flows, constraints, incentives, tradeoffs, and what the organization chooses to measure.</h2></div>
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

function FieldIndex({ children }: { children: readonly CurriculumNode[] }) {
  return (
    <Surface variant="open" className="overflow-hidden rounded-[26px] border-emerald-100/[0.08]" style={{ background: "rgba(5,17,12,0.025)" }}>
      <div className="border-b border-white/[0.06] px-3.5 py-3"><div className="font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-emerald-100/48">Business disciplines</div><p className="mt-1 text-[10px] leading-4 text-slate-600">Accounting and Marketing are active. Planned routes stay visibly planned.</p></div>
      <div>
        {children.map((child, index) => {
          const meta = BRANCH_META[child.id] ?? { icon: Briefcase, code: `B${index + 1}`, rgb: "148,163,184" };
          const Icon = meta.icon;
          const active = child.status === "active";
          const content = <><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border" style={{ color: `rgb(${meta.rgb})`, borderColor: `rgba(${meta.rgb},0.24)` }}><Icon size={12} /></span><span className="min-w-0 flex-1"><span className="block font-mono text-[9px] uppercase tracking-[0.05em]" style={{ color: `rgba(${meta.rgb},0.52)` }}>{meta.code}</span><strong className="mt-0.5 block text-[11px] leading-4 text-white/76">{child.label}</strong></span>{active ? <ArrowRight size={11} className="text-slate-600" /> : <span className="font-mono text-[8px] uppercase text-slate-700">planned</span>}</>;
          return active ? <Link key={child.id} href={child.href ?? "#"} className="group flex items-center gap-2 border-b border-white/[0.055] px-3 py-2.5 transition last:border-b-0 hover:bg-emerald-200/[0.035]">{content}</Link> : <div key={child.id} aria-disabled="true" className="flex items-center gap-2 border-b border-white/[0.055] px-3 py-2.5 last:border-b-0">{content}</div>;
        })}
      </div>
    </Surface>
  );
}

function Neighbor({ href, label, note }: { href: string; label: string; note: string }) {
  return <Link href={href} className="group flex min-h-[68px] flex-col justify-between border border-white/[0.07] bg-black/[0.055] px-3 py-2.5 backdrop-blur-[8px] transition hover:bg-black/[0.11]"><span className="text-[11px] font-semibold text-white/78">{label}</span><span className="flex items-end justify-between gap-2"><span className="text-[9px] leading-3 text-slate-600">{note}</span><ArrowRight size={11} className="text-slate-600 transition group-hover:translate-x-1" /></span></Link>;
}

function Principle({ number, title, text }: { number: string; title: string; text: string }) {
  return <div className="grid min-h-[130px] grid-cols-[38px_minmax(0,1fr)] gap-2 border-b border-white/[0.06] px-4 py-4 xl:border-r xl:border-b-0 xl:last:border-r-0"><span className="font-mono text-[10px] text-emerald-100/35">{number}</span><span><strong className="text-[12px] text-white/80">{title}</strong><span className="mt-2 block text-[11px] leading-5 text-slate-500">{text}</span></span></div>;
}
