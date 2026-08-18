import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame, Surface } from "@/app/_page-system/scene";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import {
  ArrowRight,
  Atom,
  Braces,
  Building2,
  Cable,
  CheckCircle2,
  CircuitBoard,
  Cog,
  DraftingCompass,
  Gauge,
  GitCompareArrows,
  Plane,
  RefreshCcw,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import BlueprintBackground from "./BlueprintBackground";
import StressTestLab from "./StressTestLab";

const NODE_ID = "applied.engineering";

type BranchMeta = {
  icon: LucideIcon;
  eyebrow: string;
  question: string;
  rgb: string;
  code: string;
};

const BRANCH_META: Record<string, BranchMeta> = {
  "applied.engineering.mechanical": {
    icon: Cog,
    eyebrow: "motion · force · heat · machines",
    question: "How should physical components move, carry load, exchange energy, and survive repeated use?",
    rgb: "203,213,225",
    code: "ME",
  },
  "applied.engineering.civil": {
    icon: Building2,
    eyebrow: "structures · water · transport · ground",
    question: "How can shared infrastructure remain safe and useful across long lifetimes and uncertain conditions?",
    rgb: "251,146,60",
    code: "CE",
  },
  "applied.engineering.electrical": {
    icon: CircuitBoard,
    eyebrow: "power · signals · control · electronics",
    question: "How should energy and information move through circuits, devices, sensors, and control systems?",
    rgb: "250,204,21",
    code: "EE",
  },
  "applied.engineering.software": {
    icon: Braces,
    eyebrow: "requirements · architecture · test · operations",
    question: "How can a large software system remain understandable, reliable, changeable, and operable over time?",
    rgb: "74,222,128",
    code: "SE",
  },
  "applied.engineering.aerospace": {
    icon: Plane,
    eyebrow: "flight · propulsion · structures · control",
    question: "How can a vehicle remain stable, efficient, controllable, and structurally sound in flight or space?",
    rgb: "56,189,248",
    code: "AE",
  },
  "applied.engineering.chemical": {
    icon: Atom,
    eyebrow: "transport · reactions · separations · scale-up",
    question: "How can matter be transformed safely and efficiently from laboratory behavior into a controlled process?",
    rgb: "192,132,252",
    code: "ChE",
  },
};

const LOOP = [
  { label: "Need", text: "What must change?", icon: DraftingCompass },
  { label: "Constraints", text: "What cannot be violated?", icon: ShieldCheck },
  { label: "Model", text: "What predicts behavior?", icon: Gauge },
  { label: "Prototype", text: "What can be tested cheaply?", icon: Cable },
  { label: "Verify", text: "What evidence supports release?", icon: CheckCircle2 },
  { label: "Iterate", text: "What did the test expose?", icon: RefreshCcw },
] as const;

const TRADEOFFS = [
  { label: "Performance", text: "Does the design actually meet the required function?" },
  { label: "Reliability", text: "How does it behave under uncertainty, wear, faults, and variation?" },
  { label: "Safety", text: "What failure modes can harm people, property, or environment?" },
  { label: "Cost & manufacture", text: "Can it be built, operated, repaired, and scaled with available resources?" },
  { label: "Human use", text: "Can people understand, access, control, and maintain the system?" },
  { label: "Lifecycle", text: "What happens during maintenance, reuse, decommissioning, and disposal?" },
] as const;

export default function EngineeringPage() {
  const context = requireCurriculumPageContext(NODE_ID);
  const left = context.children.slice(0, 3);
  const right = context.children.slice(3);

  return (
    <SceneFrame
      background={<BlueprintBackground />}
      className="bg-[#040914] text-slate-100 selection:bg-sky-300/25"
      maxWidthClassName="max-w-[1600px]"
      headerBackground="rgba(4,9,20,0.48)"
      header={
        <DomainPageHeader
          breadcrumbs={context.breadcrumbs}
          eyebrow="Requirements · constraints · models · prototypes · verification"
          eyebrowStyle="rule"
          icon={DraftingCompass}
          title={<span>Engineering</span>}
          subtitle="Engineering turns requirements into systems that must work under real constraints. Define the need, expose the tradeoffs, model what matters, build something testable, measure failure modes, and iterate before the consequences become expensive."
          accentRgb="56, 189, 248"
          titleClassName="font-sans text-[clamp(2.9rem,5.5vw,6.2rem)] font-semibold leading-[0.84] tracking-[-0.065em] text-[#f4fbff]"
          headerClassName="border-sky-100/[0.09]"
        />
      }
    >
      <section className="relative isolate mt-5 overflow-hidden border-y border-sky-100/[0.12] py-5 sm:py-6">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(3,10,24,0.35),transparent_34%,transparent_66%,rgba(3,10,24,0.32))] backdrop-blur-[2px]" />
        <div className="relative">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_330px] lg:items-end">
            <div>
              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-sky-200/68">Primary navigation · engineering disciplines</div>
              <h2 className="mt-2 max-w-5xl text-[clamp(1.9rem,3.8vw,3.8rem)] font-semibold leading-[0.94] tracking-[-0.052em] text-white">
                Different media, same obligation: make a claim about performance and prove it before release.
              </h2>
              <p className="mt-3 max-w-4xl text-[14px] leading-6 text-slate-300/70">
                Choose the material system you want to engineer. The disciplines differ in what they model and build, but all negotiate requirements, constraints, uncertainty, verification, and consequences of failure.
              </p>
            </div>
            <Link href="/applied-science" className="group flex items-center justify-between gap-4 border-l border-sky-200/[0.18] bg-black/[0.10] px-4 py-3 backdrop-blur-[8px] transition hover:bg-black/[0.18]">
              <span><span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">Parent field</span><strong className="mt-1 block text-[14px] text-white">Applied Sciences</strong></span>
              <ArrowRight size={15} className="text-sky-200/55 transition group-hover:translate-x-1" />
            </Link>
          </div>

          <nav aria-label="Engineering disciplines" className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,1fr)_270px_minmax(0,1fr)] xl:items-stretch">
            <BranchRail branches={left} side="left" />
            <DesignLoop />
            <BranchRail branches={right} side="right" />
          </nav>
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-amber-200/65">Verification instrument</div>
            <h2 className="mt-1 text-[23px] font-semibold tracking-[-0.035em] text-white">One requirement, one test, one visible margin.</h2>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-slate-600">conceptual structural test bench</span>
        </div>
        <StressTestLab />
      </section>

      <section className="mt-8 border-t border-sky-100/[0.10] pt-5">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-violet-200/62"><GitCompareArrows size={14} /> Design tradeoffs · reference, not navigation</div>
            <h2 className="mt-2 max-w-4xl text-[clamp(1.8rem,3.2vw,3rem)] font-semibold leading-[0.96] tracking-[-0.048em] text-white">An optimum in one dimension can be a bad design overall.</h2>
          </div>
          <p className="text-[14px] leading-6 text-slate-400/72">Engineering decisions are usually multi-objective. Higher performance may raise cost, lower mass may reduce robustness, extra redundancy may increase complexity, and a safe component can still belong to an unsafe system.</p>
        </div>

        <div className="mt-5 grid border-y border-white/[0.08] md:grid-cols-2 xl:grid-cols-3">
          {TRADEOFFS.map((item, index) => (
            <div key={item.label} className="grid grid-cols-[42px_minmax(0,1fr)] gap-3 border-b border-white/[0.07] px-4 py-4 md:[&:nth-last-child(-n+2)]:border-b-0 xl:border-b xl:[&:nth-last-child(-n+3)]:border-b-0 xl:border-r xl:[&:nth-child(3n)]:border-r-0">
              <span className="font-mono text-[11px] text-sky-200/42">0{index + 1}</span>
              <span><strong className="block text-[13px] text-slate-200/86">{item.label}</strong><span className="mt-1 block text-[12px] leading-5 text-slate-500">{item.text}</span></span>
            </div>
          ))}
        </div>
      </section>
    </SceneFrame>
  );
}

function BranchRail({ branches, side }: { branches: readonly CurriculumNode[]; side: "left" | "right" }) {
  return (
    <div className="space-y-2.5">
      {branches.map((branch) => <BranchRoute key={branch.id} branch={branch} side={side} />)}
    </div>
  );
}

function BranchRoute({ branch, side }: { branch: CurriculumNode; side: "left" | "right" }) {
  const meta = BRANCH_META[branch.id] ?? {
    icon: DraftingCompass,
    eyebrow: "engineering discipline",
    question: branch.description ?? "Explore this engineering discipline.",
    rgb: "56,189,248",
    code: "ENG",
  };
  const Icon = meta.icon;
  const planned = branch.status === "placeholder";
  const content = (
    <div
      className={`group relative min-h-[122px] overflow-hidden border bg-[#061020]/[0.26] px-4 py-4 backdrop-blur-[12px] transition ${planned ? "opacity-55" : side === "left" ? "hover:-translate-x-1" : "hover:translate-x-1"}`}
      style={{ borderColor: `rgba(${meta.rgb},0.18)`, boxShadow: `inset ${side === "left" ? "3px" : "-3px"} 0 0 rgba(${meta.rgb},0.42)` }}
    >
      <div className="flex items-start gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center border" style={{ color: `rgb(${meta.rgb})`, borderColor: `rgba(${meta.rgb},0.28)`, background: `rgba(${meta.rgb},0.055)` }}><Icon size={17} /></span>
        <span className="min-w-0 flex-1">
          <span className="flex items-center justify-between gap-3">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em]" style={{ color: `rgba(${meta.rgb},0.72)` }}>{meta.code} · {meta.eyebrow}</span>
            {planned ? <span className="font-mono text-[11px] uppercase text-slate-600">planned</span> : <ArrowRight size={14} className="text-white/30 transition group-hover:text-white/70" />}
          </span>
          <strong className="mt-1 block text-[18px] font-semibold text-white">{branch.label}</strong>
          <span className="mt-2 block text-[12px] leading-5 text-slate-400/72">{meta.question}</span>
        </span>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px" style={{ background: `linear-gradient(90deg,transparent,rgba(${meta.rgb},0.32),transparent)` }} />
    </div>
  );

  return planned ? <div aria-disabled="true">{content}</div> : <Link href={branch.href}>{content}</Link>;
}

function DesignLoop() {
  return (
    <Surface variant="ghost" className="relative min-h-[408px] overflow-hidden rounded-[24px] border-sky-100/[0.10]" style={{ background: "rgba(3,10,24,0.08)" }}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,rgba(56,189,248,0.09),transparent_25%)]" />
      <div className="relative p-4">
        <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-sky-200/56">Engineering loop</div>
        <p className="mt-2 text-[12px] leading-5 text-slate-400/68">Not a waterfall. Test results can send the design backward at any stage.</p>
      </div>
      <div className="relative mx-4 mt-1 space-y-1">
        {LOOP.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={step.label} className="grid grid-cols-[34px_36px_minmax(0,1fr)] items-center gap-3 border-b border-white/[0.06] py-3 last:border-b-0">
              <span className="font-mono text-[11px] text-sky-200/38">0{index + 1}</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-sky-100/[0.12] bg-sky-200/[0.035] text-sky-100/64"><Icon size={14} /></span>
              <span><strong className="block text-[13px] text-white/82">{step.label}</strong><span className="mt-0.5 block text-[11px] leading-4 text-slate-500">{step.text}</span></span>
            </div>
          );
        })}
      </div>
      <div className="absolute bottom-3 right-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.07em] text-violet-200/42"><RefreshCcw size={12} /> evidence loops back</div>
    </Surface>
  );
}
