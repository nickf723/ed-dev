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
};

const BRANCH_META: Record<string, BranchMeta> = {
  "applied.technology.computing-devices": { icon: Cpu, code: "HW-01", purpose: "physical machines that execute, store, display, and exchange digital information", rgb: "125,211,252" },
  "applied.technology.electronics-embedded": { icon: CircuitBoard, code: "EMB-02", purpose: "electronics embedded inside products, instruments, controls, and infrastructure", rgb: "192,132,252" },
  "applied.technology.networks-telecom": { icon: Antenna, code: "NET-03", purpose: "links that move signals between devices, people, services, vehicles, and places", rgb: "56,189,248" },
  "applied.technology.robotics-automation": { icon: Bot, code: "AUT-04", purpose: "systems that sense, decide, move, manipulate, inspect, or control physical processes", rgb: "94,234,212" },
  "applied.technology.manufacturing-fabrication": { icon: Factory, code: "FAB-05", purpose: "tools and processes that turn materials into repeatable parts, assemblies, and products", rgb: "251,146,60" },
  "applied.technology.energy-power": { icon: BatteryCharging, code: "PWR-06", purpose: "technologies that generate, convert, store, distribute, and use energy", rgb: "251,191,36" },
  "applied.technology.transportation-mobility": { icon: Truck, code: "MOB-07", purpose: "vehicles, navigation, logistics, signaling, charging, safety, and mobility infrastructure", rgb: "248,113,113" },
  "applied.technology.interfaces-assistive": { icon: Accessibility, code: "HCI-08", purpose: "interfaces and adaptive tools that connect technological capability to human bodies and goals", rgb: "244,114,182" },
};

const STACK = [
  { label: "Energy", detail: "power source · conversion · distribution", rgb: "251,191,36", icon: BatteryCharging },
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
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(6,11,18,0.47),transparent_30%,transparent_70%,rgba(9,9,17,0.38))] backdrop-blur-[2px]" />
        <div className="relative grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-sky-200/66"><Gauge size={14} /> Primary navigation · service manual index</div>
            <h2 className="mt-2 max-w-5xl text-[clamp(1.9rem,3.7vw,3.7rem)] font-semibold leading-[0.94] tracking-[-0.052em] text-white">Open the machine by technological family, not by whichever algorithm happens to run inside it.</h2>
            <p className="mt-3 max-w-4xl text-[14px] leading-6 text-slate-300/70">The exploded device behind the page exposes battery, sensor, processor, memory, radio, actuator, interface, service ports, fasteners, power rails, and signal paths. One diagnostic pulse moves slowly from sensing to actuation.</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Neighbor href="/applied-science/engineering" label="Engineering" note="design disciplines" />
            <Neighbor href="/formal-science/computer-science" label="Computer Science" note="computation" />
          </div>
        </div>

        <div className="relative mt-5 grid border-y border-white/[0.07] lg:grid-cols-2">
          {context.children.map((branch, index) => <ServiceRecord key={branch.id} branch={branch} index={index} />)}
        </div>
      </section>

      <section className="mt-7 grid gap-5 xl:grid-cols-[300px_minmax(0,1fr)] xl:items-start">
        <TechnologyStack />
        <div>
          <div className="mb-3"><div className="font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-teal-200/58">Capability instrument</div><h2 className="mt-1 text-[22px] font-semibold tracking-[-0.035em] text-white">Break one subsystem and see which technological functions actually disappear.</h2></div>
          <CapabilityChainLab />
        </div>
      </section>

      <section className="mt-8 border-t border-sky-100/[0.10] pt-5">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <div><div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-amber-200/58"><Box size={14} /> Technology review · reference, not navigation</div><h2 className="mt-2 max-w-4xl text-[clamp(1.8rem,3.2vw,3rem)] font-semibold leading-[0.96] tracking-[-0.048em] text-white">A clever prototype is only the first few centimeters of a technological lifecycle.</h2></div>
          <p className="text-[14px] leading-6 text-slate-400/72">Working technology must survive manufacturing variation, deployment conditions, human use, maintenance, compatibility, replacement parts, standards, energy constraints, failures, and eventual obsolescence.</p>
        </div>
        <div className="mt-5 grid border-y border-white/[0.08] md:grid-cols-2 xl:grid-cols-3">
          {QUESTIONS.map(([term, text], index) => <div key={term} className="grid grid-cols-[42px_minmax(0,1fr)] gap-3 border-b border-white/[0.07] px-4 py-4 xl:border-r xl:[&:nth-child(3n)]:border-r-0 xl:[&:nth-last-child(-n+3)]:border-b-0"><span className="font-mono text-[11px] text-sky-200/42">0{index + 1}</span><span><strong className="block text-[13px] text-slate-200/86">{term}</strong><span className="mt-1 block text-[12px] leading-5 text-slate-500">{text}</span></span></div>)}
        </div>
      </section>
    </SceneFrame>
  );
}

function ServiceRecord({ branch, index }: { branch: CurriculumNode; index: number }) {
  const meta = BRANCH_META[branch.id] ?? { icon: Smartphone, code: `TEC-${index + 1}`, purpose: branch.description ?? "Explore this technology family.", rgb: "96,165,250" };
  const Icon = meta.icon;
  const planned = branch.status === "placeholder";
  const body = <div className="group grid min-h-[110px] grid-cols-[66px_minmax(0,1fr)_76px] gap-3 border-b border-white/[0.06] px-3 py-3 backdrop-blur-[8px] transition hover:bg-black/[0.08] lg:border-r lg:[&:nth-child(2n)]:border-r-0"><span><span className="font-mono text-[11px] font-semibold" style={{ color: `rgba(${meta.rgb},0.70)` }}>{meta.code}</span><span className="mt-3 flex h-8 w-8 items-center justify-center rounded-full border" style={{ color: `rgb(${meta.rgb})`, borderColor: `rgba(${meta.rgb},0.25)` }}><Icon size={13} /></span></span><span><strong className="block text-[15px] text-white/88">{branch.label}</strong><span className="mt-2 block text-[11px] leading-4 text-slate-500">{meta.purpose}</span></span><span className="pt-1 text-right font-mono text-[10px] uppercase text-slate-600">{planned ? "planned" : "open"}</span></div>;
  return planned ? <div aria-disabled="true">{body}</div> : <Link href={branch.href}>{body}</Link>;
}

function TechnologyStack() {
  return <Surface variant="open" className="relative min-h-[500px] overflow-hidden rounded-[30px] border-sky-100/[0.08]" style={{ background: "rgba(5,12,24,0.025)" }}><div className="p-4"><div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-sky-200/54"><CircuitBoard size={13} /> Working stack</div><p className="mt-2 text-[12px] leading-5 text-slate-400/64">Many modern tools combine several layers, but not every technology needs all five.</p></div><div className="mx-4 mt-1 space-y-1">{STACK.map((step, index) => { const Icon = step.icon; return <div key={step.label} className="border-b border-white/[0.06] py-3 last:border-b-0"><div className="flex items-start gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border" style={{ color: `rgb(${step.rgb})`, borderColor: `rgba(${step.rgb},0.24)`, background: `rgba(${step.rgb},0.04)` }}><Icon size={13} /></span><span><strong className="block text-[13px]" style={{ color: `rgba(${step.rgb},0.84)` }}>{step.label}</strong><span className="mt-1 block text-[11px] leading-4 text-slate-500">{step.detail}</span></span></div>{index < STACK.length - 1 ? <ArrowDown size={13} className="ml-[10px] mt-2 text-slate-600" /> : null}</div>; })}</div><div className="absolute bottom-4 inset-x-4 border-t border-sky-100/[0.07] pt-3 text-center font-mono text-[11px] uppercase tracking-[0.07em] text-sky-200/34">maintenance crosses every layer</div></Surface>;
}

function Neighbor({ href, label, note }: { href: string; label: string; note: string }) {
  return <Link href={href} className="group flex items-center justify-between gap-2 border border-white/[0.07] bg-black/[0.055] px-3 py-3 backdrop-blur-[8px] transition hover:bg-black/[0.10]"><span><span className="text-[12px] font-semibold text-white/78">{label}</span><span className="mt-1 block text-[10px] text-slate-600">{note}</span></span><ArrowRight size={12} className="text-slate-600 transition group-hover:translate-x-1" /></Link>;
}
