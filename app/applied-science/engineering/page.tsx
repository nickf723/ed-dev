import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame } from "@/app/_page-system/scene";
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

const CALLOUTS = [
  { left: "4%", top: "8%", width: "31%", anchor: "right" as const },
  { left: "2%", top: "39%", width: "29%", anchor: "right" as const },
  { left: "8%", top: "72%", width: "31%", anchor: "right" as const },
  { left: "65%", top: "8%", width: "31%", anchor: "left" as const },
  { left: "69%", top: "39%", width: "29%", anchor: "left" as const },
  { left: "61%", top: "72%", width: "31%", anchor: "left" as const },
] as const;

export default function EngineeringPage() {
  const context = requireCurriculumPageContext(NODE_ID);

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
          subtitle="Engineering turns requirements into systems that must work under real constraints. Choose the kind of system you want to design, then follow the evidence from need to model, prototype, verification, and iteration."
          accentRgb="56, 189, 248"
          titleClassName="font-sans text-[clamp(2.9rem,5.5vw,6.2rem)] font-semibold leading-[0.84] tracking-[-0.065em] text-[#f4fbff]"
          headerClassName="border-sky-100/[0.09]"
        />
      }
    >
      <section className="relative isolate mt-4 overflow-hidden border-y border-sky-100/[0.12] py-4 sm:py-5">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(3,10,24,0.30),transparent_28%,transparent_72%,rgba(3,10,24,0.30))] backdrop-blur-[2px]" />
        <div className="relative flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-sky-200/68">Primary navigation · discipline drawing</div>
            <h2 className="mt-1 max-w-4xl text-[clamp(1.55rem,2.8vw,2.65rem)] font-semibold leading-[0.96] tracking-[-0.045em] text-white">
              Which system are you trying to make behave?
            </h2>
          </div>
          <Link href="/applied-science" className="group flex shrink-0 items-center gap-3 border-b border-sky-200/[0.18] px-1 pb-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-slate-500 transition hover:text-sky-100">
            Applied Sciences <ArrowRight size={12} className="transition group-hover:translate-x-1" />
          </Link>
        </div>

        <nav aria-label="Engineering disciplines" className="relative mt-4 hidden min-h-[560px] overflow-hidden border border-sky-100/[0.10] bg-[#041022]/[0.12] backdrop-blur-[5px] lg:block">
          <DraftingGrid />
          <ConnectorDrawing />
          <DesignCore />
          {context.children.map((branch, index) => (
            <DisciplineCallout key={branch.id} branch={branch} index={index} />
          ))}
          <div className="absolute bottom-3 left-4 font-mono text-[9px] uppercase tracking-[0.12em] text-sky-100/30">DWG ENG-00 · field map · not to scale</div>
          <div className="absolute bottom-3 right-4 font-mono text-[9px] uppercase tracking-[0.12em] text-slate-600">select a callout to descend</div>
        </nav>

        <nav aria-label="Engineering disciplines" className="mt-4 border-y border-sky-100/[0.10] lg:hidden">
          {context.children.map((branch, index) => (
            <MobileDisciplineRoute key={branch.id} branch={branch} index={index} />
          ))}
        </nav>
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

function DraftingGrid() {
  return (
    <div className="pointer-events-none absolute inset-0 opacity-70">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(125,211,252,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.035)_1px,transparent_1px)] bg-[size:28px_28px]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(125,211,252,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.055)_1px,transparent_1px)] bg-[size:140px_140px]" />
      <div className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-100/[0.07]" />
      <div className="absolute left-1/2 top-1/2 h-[240px] w-px -translate-x-1/2 -translate-y-1/2 bg-sky-100/[0.05]" />
      <div className="absolute left-1/2 top-1/2 h-px w-[240px] -translate-x-1/2 -translate-y-1/2 bg-sky-100/[0.05]" />
    </div>
  );
}

function ConnectorDrawing() {
  return (
    <svg viewBox="0 0 1000 560" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full text-sky-100/20">
      <path d="M350 95 H425 V220" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M310 260 H420" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M390 445 H435 V340" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M650 95 H575 V220" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M690 260 H580" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M610 445 H565 V340" fill="none" stroke="currentColor" strokeWidth="1.2" />
      {["425,220", "420,260", "435,340", "575,220", "580,260", "565,340"].map((point) => {
        const [cx, cy] = point.split(",");
        return <circle key={point} cx={cx} cy={cy} r="3" fill="rgba(186,230,253,0.42)" />;
      })}
    </svg>
  );
}

function DesignCore() {
  return (
    <div className="absolute left-1/2 top-1/2 w-[300px] -translate-x-1/2 -translate-y-1/2">
      <div className="relative border border-sky-100/[0.16] bg-[#061225]/58 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.18)] backdrop-blur-xl">
        <div className="flex items-center justify-between gap-3 border-b border-sky-100/[0.10] pb-3">
          <span>
            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-sky-200/52">common design core</span>
            <strong className="mt-1 block text-[17px] text-white">Need → evidence → release</strong>
          </span>
          <DraftingCompass size={25} className="text-sky-200/45" />
        </div>
        <div className="mt-2 grid grid-cols-2">
          {LOOP.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.label} className="grid grid-cols-[27px_minmax(0,1fr)] gap-2 border-b border-r border-white/[0.055] px-2 py-2.5 even:border-r-0 [&:nth-last-child(-n+2)]:border-b-0">
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-sky-100/[0.10] text-sky-100/55"><Icon size={11} /></span>
                <span><strong className="block text-[11px] text-white/78">{step.label}</strong><span className="block text-[9px] leading-3.5 text-slate-600">{step.text}</span></span>
              </div>
            );
          })}
        </div>
        <div className="mt-3 flex items-center justify-center gap-2 font-mono text-[8px] uppercase tracking-[0.09em] text-violet-200/40"><RefreshCcw size={10} /> test evidence can reopen any earlier decision</div>
      </div>
    </div>
  );
}

function DisciplineCallout({ branch, index }: { branch: CurriculumNode; index: number }) {
  const meta = BRANCH_META[branch.id] ?? {
    icon: DraftingCompass,
    eyebrow: "engineering discipline",
    question: branch.description ?? "Explore this engineering discipline.",
    rgb: "56,189,248",
    code: "ENG",
  };
  const placement = CALLOUTS[index] ?? CALLOUTS[0];
  const Icon = meta.icon;
  const planned = branch.status === "placeholder";

  const content = (
    <div
      className={`group absolute -translate-y-1/2 ${placement.anchor === "right" ? "text-right" : "text-left"} ${planned ? "opacity-50" : ""}`}
      style={{ left: placement.left, top: placement.top, width: placement.width }}
    >
      <div className={`flex items-center gap-3 ${placement.anchor === "right" ? "flex-row-reverse" : ""}`}>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center border bg-[#061020]/60 backdrop-blur-lg" style={{ color: `rgb(${meta.rgb})`, borderColor: `rgba(${meta.rgb},0.28)` }}><Icon size={17} /></span>
        <span className="min-w-0 flex-1">
          <span className={`flex items-center gap-2 ${placement.anchor === "right" ? "justify-end" : "justify-start"}`}>
            <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.09em]" style={{ color: `rgba(${meta.rgb},0.70)` }}>{meta.code}</span>
            <span className="font-mono text-[8px] uppercase tracking-[0.07em] text-slate-600">{planned ? "planned" : "open"}</span>
          </span>
          <strong className="mt-0.5 block text-[18px] font-semibold text-white/92">{branch.label}</strong>
        </span>
      </div>
      <div className={`mt-2 border-t pt-2 ${placement.anchor === "right" ? "ml-auto" : "mr-auto"}`} style={{ borderColor: `rgba(${meta.rgb},0.18)` }}>
        <div className="font-mono text-[9px] uppercase tracking-[0.07em]" style={{ color: `rgba(${meta.rgb},0.52)` }}>{meta.eyebrow}</div>
        <p className={`mt-1 text-[10px] leading-4 text-slate-500 ${placement.anchor === "right" ? "ml-auto max-w-[330px]" : "mr-auto max-w-[330px]"}`}>{meta.question}</p>
      </div>
      {!planned ? <ArrowRight size={12} className={`mt-2 inline-block text-white/28 transition group-hover:text-white/70 ${placement.anchor === "right" ? "group-hover:-translate-x-1 rotate-180" : "group-hover:translate-x-1"}`} /> : null}
    </div>
  );

  return planned ? <div aria-disabled="true">{content}</div> : <Link href={branch.href}>{content}</Link>;
}

function MobileDisciplineRoute({ branch, index }: { branch: CurriculumNode; index: number }) {
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
    <div className={`group grid grid-cols-[42px_42px_minmax(0,1fr)_20px] items-start gap-3 border-b border-white/[0.06] py-4 last:border-b-0 ${planned ? "opacity-50" : ""}`}>
      <span className="font-mono text-[9px] text-sky-100/30">{String(index + 1).padStart(2, "0")}</span>
      <span className="flex h-9 w-9 items-center justify-center border" style={{ color: `rgb(${meta.rgb})`, borderColor: `rgba(${meta.rgb},0.22)` }}><Icon size={15} /></span>
      <span><span className="font-mono text-[8px] uppercase tracking-[0.08em]" style={{ color: `rgba(${meta.rgb},0.58)` }}>{meta.code} · {meta.eyebrow}</span><strong className="mt-1 block text-[15px] text-white/88">{branch.label}</strong><span className="mt-1 block text-[10px] leading-4 text-slate-500">{meta.question}</span></span>
      {planned ? null : <ArrowRight size={13} className="mt-2 text-slate-600 transition group-hover:translate-x-1" />}
    </div>
  );
  return planned ? <div aria-disabled="true">{content}</div> : <Link href={branch.href}>{content}</Link>;
}
