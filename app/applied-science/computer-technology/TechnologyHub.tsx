import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame, Surface } from "@/app/_page-system/scene";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import type { LucideIcon } from "lucide-react";
import {
  Accessibility,
  Antenna,
  ArrowDown,
  ArrowRight,
  BatteryCharging,
  Bot,
  Box,
  CircuitBoard,
  Cpu,
  Factory,
  Gauge,
  Radio,
  Settings,
  Smartphone,
  Truck,
} from "lucide-react";
import CapabilityChainLab from "./CapabilityChainLab";
import CircuitBackground from "./CircuitBackground";

const NODE_ID = "applied.technology";

type BranchMeta = {
  icon: LucideIcon;
  code: string;
  purpose: string;
  rgb: string;
  focus: readonly number[];
};

const BRANCH_META: Record<string, BranchMeta> = {
  "applied.technology.computing-devices": { icon: Cpu, code: "HW-01", purpose: "physical machines that execute, store, display, and exchange digital information", rgb: "125,211,252", focus: [0, 2, 3, 4] },
  "applied.technology.electronics-embedded": { icon: CircuitBoard, code: "EMB-02", purpose: "electronics embedded inside products, instruments, controls, and infrastructure", rgb: "192,132,252", focus: [0, 1, 2, 4] },
  "applied.technology.networks-telecom": { icon: Antenna, code: "NET-03", purpose: "links that move signals between devices, people, services, vehicles, and places", rgb: "56,189,248", focus: [0, 2, 3] },
  "applied.technology.robotics-automation": { icon: Bot, code: "AUT-04", purpose: "systems that sense, decide, move, manipulate, inspect, or control physical processes", rgb: "94,234,212", focus: [0, 1, 2, 3, 4] },
  "applied.technology.manufacturing-fabrication": { icon: Factory, code: "FAB-05", purpose: "tools and processes that turn materials into repeatable parts, assemblies, and products", rgb: "251,146,60", focus: [0, 1, 2, 4] },
  "applied.technology.energy-power": { icon: BatteryCharging, code: "PWR-06", purpose: "technologies that generate, convert, store, distribute, and use energy", rgb: "251,191,36", focus: [0, 1, 2, 3] },
  "applied.technology.transportation-mobility": { icon: Truck, code: "MOB-07", purpose: "vehicles, navigation, logistics, signaling, charging, safety, and mobility infrastructure", rgb: "248,113,113", focus: [0, 1, 2, 3, 4] },
  "applied.technology.interfaces-assistive": { icon: Accessibility, code: "HCI-08", purpose: "interfaces and adaptive tools that connect technological capability to human bodies and goals", rgb: "244,114,182", focus: [1, 2, 4] },
};

const STACK = [
  { label: "Power", detail: "source · conversion · distribution", rgb: "251,191,36", icon: BatteryCharging },
  { label: "Sense", detail: "sensor · transducer · measurement", rgb: "94,234,212", icon: Radio },
  { label: "Compute", detail: "processing · memory · local control", rgb: "192,132,252", icon: Cpu },
  { label: "Connect", detail: "wired · wireless · protocol · infrastructure", rgb: "56,189,248", icon: Antenna },
  { label: "Act / Interface", detail: "motor · display · control · accessible use", rgb: "244,114,182", icon: Settings },
] as const;

const QUESTIONS = [
  ["Capability", "What useful job does the technology make possible, and for whom?"],
  ["Dependencies", "Which energy, materials, networks, software, standards, infrastructure, skills, and supply chains must exist for the capability to work?"],
  ["Failure", "What happens when a subsystem degrades, a network disappears, energy is scarce, a sensor drifts, or a part cannot be replaced?"],
  ["Human fit", "Can people perceive, understand, operate, maintain, repair, and safely override the system across different abilities and contexts?"],
  ["Lifecycle", "Where do materials come from, how is the product manufactured and maintained, and what happens after its useful life?"],
  ["Tradeoffs", "Which choices exchange cost, efficiency, performance, reliability, accessibility, privacy, safety, repairability, or environmental impact?"],
] as const;

export default function TechnologyHub() {
  const context = requireCurriculumPageContext(NODE_ID);

  return (
    <SceneFrame
      background={<CircuitBackground />}
      className="bg-[#060b12] text-slate-100 selection:bg-sky-300/25"
      maxWidthClassName="max-w-[1600px]"
      headerBackground="rgba(6,11,18,0.50)"
      header={
        <DomainPageHeader
          breadcrumbs={context.breadcrumbs}
          eyebrow="Power · sense · compute · connect · act · maintain"
          eyebrowStyle="rule"
          icon={Smartphone}
          title={<span>Technology</span>}
          subtitle="Technology turns knowledge, materials, energy, computation, communication, and human practice into working capability. Study devices and infrastructures as layered systems that must be manufactured, powered, connected, operated, maintained, repaired, secured, and eventually replaced."
          accentRgb="96, 165, 250"
          titleClassName="font-sans text-[clamp(2.9rem,5.5vw,6.2rem)] font-semibold leading-[0.84] tracking-[-0.066em] text-[#eff6ff]"
          headerClassName="border-sky-100/[0.10]"
        />
      }
    >
      <section className="relative isolate mt-5 overflow-hidden border-y border-sky-100/[0.11] py-5 sm:py-6">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(6,11,18,0.30),transparent_30%,transparent_70%,rgba(9,9,17,0.26))] backdrop-blur-[5px]" />
        <div className="relative grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end">
          <div className="-mx-3 rounded-[20px] bg-[#07101c]/[0.28] px-3 py-2 backdrop-blur-[20px]">
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-sky-200/68"><Gauge size={14} /> Primary navigation · capability matrix</div>
            <h2 className="mt-2 max-w-5xl text-[clamp(1.9rem,3.7vw,3.7rem)] font-semibold leading-[0.94] tracking-[-0.052em] text-white">Choose a technology family by the capabilities it has to coordinate.</h2>
            <p className="mt-3 max-w-4xl text-[14px] leading-6 text-slate-300/72">Rows are direct branches. Columns are recurring technological layers. Filled markers show an illustrative emphasis, not a definition: real systems often cross every column and depend on materials, standards, maintenance, labor, and infrastructure beyond this compact map.</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Neighbor href="/applied-science/engineering" label="Engineering" note="design disciplines" />
            <Neighbor href="/formal-science/computer-science" label="Computer Science" note="computation" />
          </div>
        </div>

        <TechnologyMatrix branches={context.children} />
      </section>

      <section className="mt-7 grid gap-5 xl:grid-cols-[300px_minmax(0,1fr)] xl:items-start">
        <TechnologyStack />
        <div>
          <div className="mb-3 rounded-[18px] bg-[#07101c]/[0.18] px-3 py-2 backdrop-blur-[14px]"><div className="font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-teal-200/58">Capability instrument</div><h2 className="mt-1 text-[22px] font-semibold tracking-[-0.035em] text-white">Break one subsystem and see which technological functions actually disappear.</h2></div>
          <CapabilityChainLab />
        </div>
      </section>

      <section className="mt-8 border-t border-sky-100/[0.10] pt-5">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <div className="rounded-[18px] bg-[#07101c]/[0.16] px-3 py-2 backdrop-blur-[14px]"><div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-amber-200/58"><Box size={14} /> Technology review · reference, not navigation</div><h2 className="mt-2 max-w-4xl text-[clamp(1.8rem,3.2vw,3rem)] font-semibold leading-[0.96] tracking-[-0.048em] text-white">A clever prototype is only the first few centimeters of a technological lifecycle.</h2></div>
          <p className="rounded-[16px] bg-[#07101c]/[0.16] px-3 py-2 text-[14px] leading-6 text-slate-400/72 backdrop-blur-[14px]">Working technology must survive manufacturing variation, deployment conditions, human use, maintenance, compatibility, replacement parts, standards, energy constraints, failures, and eventual obsolescence.</p>
        </div>
        <div className="mt-5 grid border-y border-white/[0.08] md:grid-cols-2 xl:grid-cols-3">
          {QUESTIONS.map(([term, text], index) => <div key={term} className="grid grid-cols-[42px_minmax(0,1fr)] gap-3 border-b border-white/[0.07] bg-[#07101c]/[0.12] px-4 py-4 backdrop-blur-[12px] xl:border-r xl:[&:nth-child(3n)]:border-r-0 xl:[&:nth-last-child(-n+3)]:border-b-0"><span className="font-mono text-[11px] text-sky-200/42">0{index + 1}</span><span><strong className="block text-[13px] text-slate-200/86">{term}</strong><span className="mt-1 block text-[12px] leading-5 text-slate-500">{text}</span></span></div>)}
        </div>
      </section>
    </SceneFrame>
  );
}

function TechnologyMatrix({ branches }: { branches: readonly CurriculumNode[] }) {
  return (
    <nav aria-label="Technology families by capability emphasis" className="relative mt-5 overflow-hidden border border-sky-100/[0.11] bg-[#07101c]/[0.32] shadow-[0_30px_95px_rgba(0,0,0,0.18)] backdrop-blur-[22px] backdrop-saturate-[1.08]">
      <div className="grid grid-cols-[minmax(300px,1.4fr)_repeat(5,minmax(84px,0.55fr))_78px] border-b border-white/[0.07] bg-black/[0.10]">
        <div className="px-4 py-3"><div className="font-mono text-[10px] font-semibold uppercase tracking-[0.10em] text-sky-100/54">Service index</div><p className="mt-1 text-[10px] leading-4 text-slate-600">Direct children · matrix markers are illustrative emphasis</p></div>
        {STACK.map((layer) => { const Icon = layer.icon; return <div key={layer.label} className="flex flex-col items-center justify-center border-l border-white/[0.06] px-2 py-3 text-center"><Icon size={13} style={{ color: `rgba(${layer.rgb},0.68)` }} /><strong className="mt-1 text-[10px] text-white/72">{layer.label}</strong></div>; })}
        <div className="flex items-center justify-center border-l border-white/[0.06] font-mono text-[9px] uppercase tracking-[0.08em] text-slate-600">route</div>
      </div>

      {branches.map((branch, index) => <TechnologyMatrixRow key={branch.id} branch={branch} index={index} />)}

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] bg-black/[0.07] px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.07em] text-slate-600">
        <span>• filled = recurring emphasis · ○ open = supporting layer</span>
        <span>maintenance · materials · standards · infrastructure cross the whole matrix</span>
      </div>
    </nav>
  );
}

function TechnologyMatrixRow({ branch, index }: { branch: CurriculumNode; index: number }) {
  const meta = BRANCH_META[branch.id] ?? { icon: Smartphone, code: `TEC-${index + 1}`, purpose: branch.description ?? "Explore this technology family.", rgb: "96,165,250", focus: [] };
  const Icon = meta.icon;
  const planned = branch.status === "placeholder";
  const content = (
    <div className={`group grid min-h-[72px] grid-cols-[minmax(300px,1.4fr)_repeat(5,minmax(84px,0.55fr))_78px] border-b border-white/[0.06] bg-[#07101c]/[0.08] transition last:border-b-0 ${planned ? "opacity-52" : "hover:bg-white/[0.022]"}`}>
      <div className="flex items-center gap-3 px-4 py-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border" style={{ color: `rgb(${meta.rgb})`, borderColor: `rgba(${meta.rgb},0.25)`, background: `rgba(${meta.rgb},0.045)` }}><Icon size={14} /></span>
        <span className="min-w-0 flex-1"><span className="font-mono text-[9px] font-semibold uppercase tracking-[0.07em]" style={{ color: `rgba(${meta.rgb},0.64)` }}>{meta.code}</span><strong className="mt-0.5 block text-[13px] text-white/86">{branch.label}</strong><span className="mt-0.5 block text-[10px] leading-4 text-slate-500">{meta.purpose}</span></span>
      </div>
      {STACK.map((layer, layerIndex) => {
        const focused = meta.focus.includes(layerIndex);
        return <div key={layer.label} className="flex items-center justify-center border-l border-white/[0.055] bg-black/[0.025]"><span className={`h-3 w-3 rounded-full border transition ${focused ? "shadow-[0_0_18px_rgba(125,211,252,0.10)]" : ""}`} style={{ borderColor: `rgba(${layer.rgb},${focused ? 0.48 : 0.13})`, background: `rgba(${layer.rgb},${focused ? 0.22 : 0.015})` }}><span className="sr-only">{focused ? "recurring emphasis" : "supporting or context-dependent layer"}</span></span></div>;
      })}
      <div className="flex items-center justify-center border-l border-white/[0.055] font-mono text-[9px] uppercase tracking-[0.06em]" style={{ color: planned ? "rgba(100,116,139,0.48)" : `rgba(${meta.rgb},0.62)` }}>{planned ? "planned" : <span className="flex items-center gap-1">open <ArrowRight size={9} className="transition group-hover:translate-x-1" /></span>}</div>
    </div>
  );
  return planned ? <div aria-disabled="true">{content}</div> : <Link href={branch.href}>{content}</Link>;
}

function TechnologyStack() {
  return <Surface variant="open" className="relative min-h-[500px] overflow-hidden rounded-[30px] border-sky-100/[0.08]" style={{ background: "rgba(5,12,24,0.025)" }}><div className="p-4"><div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-sky-200/54"><CircuitBoard size={13} /> Working stack</div><p className="mt-2 text-[12px] leading-5 text-slate-400/64">Many modern tools combine several layers, but not every technology needs all five.</p></div><div className="mx-4 mt-1 space-y-1">{STACK.map((step, index) => { const Icon = step.icon; return <div key={step.label} className="border-b border-white/[0.06] py-3 last:border-b-0"><div className="flex items-start gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border" style={{ color: `rgb(${step.rgb})`, borderColor: `rgba(${step.rgb},0.24)`, background: `rgba(${step.rgb},0.04)` }}><Icon size={13} /></span><span><strong className="block text-[13px]" style={{ color: `rgba(${step.rgb},0.84)` }}>{step.label}</strong><span className="mt-1 block text-[11px] leading-4 text-slate-500">{step.detail}</span></span></div>{index < STACK.length - 1 ? <ArrowDown size={13} className="ml-[10px] mt-2 text-slate-600" /> : null}</div>; })}</div><div className="absolute bottom-4 inset-x-4 border-t border-sky-100/[0.07] pt-3 text-center font-mono text-[11px] uppercase tracking-[0.07em] text-sky-200/34">maintenance crosses every layer</div></Surface>;
}

function Neighbor({ href, label, note }: { href: string; label: string; note: string }) {
  return <Link href={href} className="group flex items-center justify-between gap-2 border border-white/[0.08] bg-[#07101c]/[0.32] px-3 py-3 backdrop-blur-[18px] transition hover:bg-[#07101c]/[0.44]"><span><span className="text-[12px] font-semibold text-white/82">{label}</span><span className="mt-1 block text-[10px] text-slate-500">{note}</span></span><ArrowRight size={12} className="text-slate-500 transition group-hover:translate-x-1" /></Link>;
}
