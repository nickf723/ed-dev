import DomainPageHeader from "@/app/_components/DomainPageHeader";
import MarketFlowBackground from "@/app/_page-system/backgrounds/MarketFlowBackground";
import CurveShiftLab from "@/app/_page-system/instruments/CurveShiftLab";
import ResourceFlowTopology from "@/app/_page-system/topologies/ResourceFlowTopology";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import {
  ArrowRight,
  Brain,
  ChartLine,
  Coins,
  Globe2,
  Landmark,
  Scale,
  Sigma,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";

const NODE_ID = "social.economics";

type FieldMeta = {
  question: string;
  icon: LucideIcon;
  rgb: string;
  role: "core" | "applied";
};

const FIELD_META: Record<string, FieldMeta> = {
  "social.economics.microeconomics": {
    question: "How do people, firms, and individual markets choose?",
    icon: ChartLine,
    rgb: "34, 197, 94",
    role: "core",
  },
  "social.economics.macroeconomics": {
    question: "How does the economy behave as a connected whole?",
    icon: Globe2,
    rgb: "59, 130, 246",
    role: "core",
  },
  "social.economics.econometrics": {
    question: "How do we estimate relationships from economic data?",
    icon: Sigma,
    rgb: "167, 139, 250",
    role: "core",
  },
  "social.economics.behavioral": {
    question: "What changes when real decision-makers are not perfectly rational?",
    icon: Brain,
    rgb: "244, 114, 182",
    role: "applied",
  },
  "social.economics.international": {
    question: "What changes when exchange crosses borders?",
    icon: Globe2,
    rgb: "34, 211, 238",
    role: "applied",
  },
  "social.economics.public": {
    question: "How do taxes, public goods, and government policy change outcomes?",
    icon: Landmark,
    rgb: "250, 204, 21",
    role: "applied",
  },
  "social.economics.development": {
    question: "Why do living standards and institutions diverge across places and time?",
    icon: TrendingUp,
    rgb: "20, 184, 166",
    role: "applied",
  },
};

export default function EconomicsPage() {
  const context = requireCurriculumPageContext(NODE_ID);
  const core = context.children.filter((child) => FIELD_META[child.id]?.role === "core");
  const applied = context.children.filter((child) => FIELD_META[child.id]?.role === "applied");

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#040b08] text-slate-100 selection:bg-emerald-400/25">
      <MarketFlowBackground />

      <div className="relative z-10 mx-auto w-full max-w-[1540px] px-4 pb-14 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.06] bg-[#040b08]/78 px-4 pb-3 pt-5 shadow-[0_18px_55px_rgba(0,0,0,0.22)] backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={[
              { label: "Social Science", href: "/social-science" },
              { label: "Economics" },
            ]}
            eyebrow="Scarcity · choice · exchange · institutions · measurement"
            eyebrowStyle="pill"
            icon={Coins}
            title={<span>Economics</span>}
            subtitle="Economics studies how scarce resources move through choices, markets, institutions, and whole economies. The same flow can be examined close-up, at system scale, or through data."
            accentRgb="34, 197, 94"
            titleClassName="font-sans text-[clamp(2.8rem,5.4vw,6rem)] font-semibold leading-[0.84] tracking-[-0.065em] text-[#f3fff7]"
            headerClassName="border-white/[0.08]"
          />
        </div>

        <section className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] xl:items-stretch">
          <div className="rounded-[28px] border border-emerald-200/[0.11] bg-black/[0.11] p-5 shadow-[0_28px_95px_rgba(0,0,0,0.20)] backdrop-blur-xl sm:p-6">
            <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-emerald-200/70">The starting constraint</div>
            <h2 className="mt-2 max-w-4xl text-[clamp(1.8rem,3.3vw,3rem)] font-semibold tracking-[-0.05em] text-white">
              Wants can exceed available time, labor, land, materials, money, and attention.
            </h2>
            <p className="mt-3 max-w-3xl text-[11px] leading-6 text-slate-400">
              Scarcity forces tradeoffs. Economics follows how those tradeoffs become prices, production, income, institutions, inequality, growth, and policy choices.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 rounded-[28px] border border-white/[0.08] bg-black/[0.11] p-3 backdrop-blur-xl">
            <Principle icon={Scale} label="Tradeoff" text="Choosing one use means giving up another." rgb="250, 204, 21" />
            <Principle icon={TrendingUp} label="Margin" text="Many choices depend on the next unit, not the average." rgb="34, 197, 94" />
            <Principle icon={Users} label="Institution" text="Rules change incentives and who bears costs or gains." rgb="59, 130, 246" />
          </div>
        </section>

        <section className="mt-5">
          <ResourceFlowTopology />
        </section>

        <section className="mt-5 overflow-hidden rounded-[30px] border border-white/[0.08] bg-black/[0.12] shadow-[0_30px_100px_rgba(0,0,0,0.20)] backdrop-blur-xl">
          <div className="grid gap-5 border-b border-white/[0.07] p-5 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end sm:p-6">
            <div>
              <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-blue-200/65">Fields by scale and question</div>
              <h2 className="mt-2 text-[clamp(1.7rem,3vw,2.7rem)] font-semibold tracking-[-0.045em] text-white">Do not confuse the scale of a question with the tools used to answer it.</h2>
            </div>
            <p className="text-[10px] leading-5 text-slate-500">
              Microeconomics and macroeconomics primarily differ by scale. Econometrics is a measurement toolkit that can be used in both. Applied fields cut across those foundations with a particular kind of problem.
            </p>
          </div>

          <div className="grid xl:grid-cols-[minmax(0,1fr)_350px]">
            <div className="relative border-b border-white/[0.07] p-5 sm:p-6 xl:border-b-0 xl:border-r">
              <div className="absolute left-[9%] right-[9%] top-[82px] hidden h-px bg-gradient-to-r from-emerald-300/30 via-violet-300/30 to-blue-300/30 md:block" />
              <div className="grid gap-3 md:grid-cols-3">
                {core.map((child, index) => (
                  <FieldNode key={child.id} child={child} index={index} />
                ))}
              </div>
              <div className="mt-4 rounded-[18px] border border-white/[0.06] bg-white/[0.014] p-4 text-center font-mono text-[8px] uppercase tracking-[0.11em] text-slate-600">
                individual decisions <span className="mx-3 text-slate-800">→</span> measured relationships <span className="mx-3 text-slate-800">→</span> economy-wide feedback
              </div>
            </div>

            <div className="p-5 sm:p-6">
              <div className="font-mono text-[8px] font-semibold uppercase tracking-[0.14em] text-slate-600">Cross-cutting applications</div>
              <div className="mt-3 space-y-2">
                {applied.map((child) => (
                  <AppliedField key={child.id} child={child} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)]">
          <CurveShiftLab />
          <div className="rounded-[28px] border border-white/[0.08] bg-black/[0.12] p-5 backdrop-blur-xl sm:p-6">
            <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-200/65">One microeconomic model</div>
            <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.04em] text-white">A model isolates a relationship so you can reason about change.</h2>
            <p className="mt-3 text-[11px] leading-6 text-slate-400">
              Supply and demand deliberately ignore enormous amounts of detail. That is the point: hold many things fixed, change one relationship, and ask what the model predicts about price and quantity.
            </p>
            <div className="mt-5 space-y-2">
              <ModelRule number="01" title="State what is held fixed" text="A useful prediction depends on the assumptions around the model." />
              <ModelRule number="02" title="Distinguish shift from movement" text="Changing price moves along a curve; changing the underlying relationship shifts the curve." />
              <ModelRule number="03" title="Return to evidence" text="The model predicts direction and mechanism; data tests how well it describes a real market." />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function Principle({ icon: Icon, label, text, rgb }: { icon: LucideIcon; label: string; text: string; rgb: string }) {
  return (
    <div className="flex min-h-[138px] flex-col justify-between rounded-[18px] border border-white/[0.06] bg-white/[0.012] p-3">
      <Icon size={15} style={{ color: `rgb(${rgb})` }} />
      <div>
        <div className="font-mono text-[8px] uppercase tracking-[0.1em]" style={{ color: `rgba(${rgb},0.72)` }}>{label}</div>
        <p className="mt-1.5 text-[9px] leading-4 text-slate-600">{text}</p>
      </div>
    </div>
  );
}

function FieldNode({ child, index }: { child: CurriculumNode; index: number }) {
  const meta = FIELD_META[child.id] ?? FIELD_META["social.economics.econometrics"];
  const Icon = meta.icon;
  const planned = child.status === "placeholder";
  const content = (
    <div className={`relative z-10 flex min-h-[180px] flex-col rounded-[22px] border p-4 ${planned ? "opacity-65" : "transition hover:-translate-y-1"}`} style={{ borderColor: `rgba(${meta.rgb},0.16)`, background: `linear-gradient(145deg,rgba(${meta.rgb},0.055),rgba(0,0,0,0.16))` }}>
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-[13px] border" style={{ color: `rgb(${meta.rgb})`, borderColor: `rgba(${meta.rgb},0.22)` }}><Icon size={16} /></span>
        <span className="font-mono text-[7px] uppercase tracking-[0.09em] text-slate-700">0{index + 1}</span>
      </div>
      <h3 className="mt-5 text-[15px] font-semibold text-white">{child.label}</h3>
      <p className="mt-2 text-[9px] leading-4 text-slate-600">{meta.question}</p>
      <span className="mt-auto pt-4 font-mono text-[7px] uppercase tracking-[0.1em]" style={{ color: `rgba(${meta.rgb},0.58)` }}>{planned ? "planned branch" : "open branch"}</span>
    </div>
  );
  return planned ? content : <a href={child.href}>{content}</a>;
}

function AppliedField({ child }: { child: CurriculumNode }) {
  const meta = FIELD_META[child.id];
  const Icon = meta?.icon ?? Coins;
  const rgb = meta?.rgb ?? "34, 197, 94";
  const planned = child.status === "placeholder";
  const content = (
    <div className={`group flex items-center gap-3 rounded-[15px] border border-white/[0.06] bg-white/[0.014] px-3 py-3 ${planned ? "opacity-60" : "transition hover:bg-white/[0.03]"}`}>
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] border" style={{ color: `rgb(${rgb})`, borderColor: `rgba(${rgb},0.18)` }}><Icon size={13} /></span>
      <div className="min-w-0 flex-1">
        <strong className="block truncate text-[10px] text-slate-300">{child.label}</strong>
        <span className="mt-1 block truncate text-[8px] text-slate-700">{meta?.question}</span>
      </div>
      {planned ? <span className="font-mono text-[7px] uppercase text-slate-800">planned</span> : <ArrowRight size={11} className="text-slate-700" />}
    </div>
  );
  return planned ? content : <a href={child.href}>{content}</a>;
}

function ModelRule({ number, title, text }: { number: string; title: string; text: string }) {
  return (
    <div className="grid grid-cols-[34px_1fr] gap-3 rounded-[15px] border border-white/[0.06] bg-white/[0.012] p-3">
      <div className="font-mono text-[8px] text-emerald-200/45">{number}</div>
      <div><strong className="block text-[10px] text-slate-300">{title}</strong><p className="mt-1 text-[8px] leading-4 text-slate-700">{text}</p></div>
    </div>
  );
}
