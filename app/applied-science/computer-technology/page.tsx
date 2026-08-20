import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import {
  Accessibility,
  ArrowRight,
  BatteryCharging,
  Bot,
  Boxes,
  CircuitBoard,
  Cpu,
  Factory,
  RadioTower,
  Route,
  ScanSearch,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import CircuitBackground from "./CircuitBackground";

const NODE_ID = "applied.technology";

type TechMeta = {
  icon: LucideIcon;
  code: string;
  role: string;
  systemLayer: string;
  rgb: string;
};

const META: Record<string, TechMeta> = {
  "applied.technology.computing-devices": { icon: Cpu, code: "CMP", role: "Compute & store", systemLayer: "information processing", rgb: "96, 165, 250" },
  "applied.technology.electronics-embedded": { icon: CircuitBoard, code: "EMB", role: "Sense & control", systemLayer: "embedded electronics", rgb: "34, 211, 238" },
  "applied.technology.networks-telecom": { icon: RadioTower, code: "NET", role: "Connect & transmit", systemLayer: "communications", rgb: "45, 212, 191" },
  "applied.technology.robotics-automation": { icon: Bot, code: "ROB", role: "Act & automate", systemLayer: "physical control", rgb: "192, 132, 252" },
  "applied.technology.manufacturing-fabrication": { icon: Factory, code: "MFG", role: "Make & assemble", systemLayer: "production", rgb: "251, 146, 60" },
  "applied.technology.energy-power": { icon: BatteryCharging, code: "PWR", role: "Supply & convert energy", systemLayer: "power infrastructure", rgb: "250, 204, 21" },
  "applied.technology.transportation-mobility": { icon: Route, code: "MOB", role: "Move people & goods", systemLayer: "mobility systems", rgb: "74, 222, 128" },
  "applied.technology.interfaces-assistive": { icon: Accessibility, code: "HMI", role: "Connect systems to people", systemLayer: "human interface", rgb: "244, 114, 182" },
};

const SYSTEM_FLOW = [
  ["Energy", "power, storage, conversion"],
  ["Sense", "signals, sensors, measurement"],
  ["Compute", "logic, memory, control"],
  ["Connect", "networks, radio, protocols"],
  ["Act", "motors, automation, movement"],
  ["Interface", "controls, displays, accessibility"],
] as const;

const DESIGN_TESTS = [
  ["Performance", "Does it do the intended job at the required speed, precision, capacity, and scale?"],
  ["Reliability", "Does it keep working across time, environments, faults, wear, and imperfect inputs?"],
  ["Safety", "What can fail, who can be harmed, and what layers prevent or limit that failure?"],
  ["Maintainability", "Can the system be inspected, repaired, updated, replaced, calibrated, and understood later?"],
  ["Interoperability", "Can parts exchange power, signals, data, dimensions, protocols, and expectations without bespoke glue everywhere?"],
  ["Human fit", "Does the technology respect human bodies, attention, accessibility, skills, error, comfort, and real use conditions?"],
] as const;

export default function TechnologyPage() {
  const context = requireCurriculumPageContext(NODE_ID);
  const branches = context.children
    .map((branch) => ({ branch, meta: META[branch.id] }))
    .filter((item): item is { branch: CurriculumNode; meta: TechMeta } => Boolean(item.meta));

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#030706] text-slate-100 selection:bg-emerald-300/25">
      <CircuitBackground />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_82%_14%,rgba(16,185,129,0.11),transparent_28%),radial-gradient(circle_at_16%_84%,rgba(34,211,238,0.06),transparent_27%),linear-gradient(to_bottom,rgba(3,7,6,0.10),rgba(3,7,6,0.75)_76%,rgba(2,5,4,0.97))]" aria-hidden="true" />
      <div className="pointer-events-none fixed inset-0 z-[1] opacity-[0.11] [background-image:linear-gradient(rgba(74,222,128,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(74,222,128,0.09)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:linear-gradient(to_bottom,black,transparent_92%)]" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-4 pb-14 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.06] bg-[#030706]/80 px-4 pb-3 pt-4 backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={context.breadcrumbs}
            eyebrow="Energy · sensing · computation · communication · actuation · interface"
            eyebrowStyle="rule"
            icon={CircuitBoard}
            title={<span>Technology</span>}
            subtitle="Technology turns scientific knowledge, engineering constraints, materials, energy, computation, and human needs into working systems. Follow the roles inside the system rather than treating each gadget as an isolated object."
            accentRgb="74, 222, 128"
            titleClassName="font-sans text-[clamp(3rem,5.5vw,6rem)] font-semibold leading-[0.83] tracking-[-0.064em] text-[#f2fff7]"
            headerClassName="border-emerald-100/[0.10]"
          />
        </div>

        <section className="relative mt-5 overflow-hidden rounded-[30px] border border-emerald-200/[0.11] bg-[#03100b]/58 backdrop-blur-xl">
          <div className="grid gap-4 border-b border-white/[0.07] px-5 py-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-end">
            <div>
              <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.10em] text-emerald-200/68"><Boxes size={14} /> Technology systems map</div>
              <h2 className="mt-2 max-w-5xl text-[clamp(1.9rem,3.8vw,3.6rem)] font-semibold leading-[0.93] tracking-[-0.05em] text-white">Follow the system, not the gadget.</h2>
            </div>
            <p className="text-[14px] leading-6 text-slate-300/76">A modern device can draw on every branch below. Each branch is easier to understand as a role inside a larger flow of energy, information, physical action, and human use.</p>
          </div>

          <div className="grid xl:grid-cols-[minmax(0,1fr)_360px]">
            <div className="border-b border-white/[0.07] p-4 sm:p-5 xl:border-b-0 xl:border-r">
              <div className="grid gap-2.5 sm:grid-cols-2">
                {branches.map(({ branch, meta }, index) => (
                  <BranchCard key={branch.id} branch={branch} meta={meta} index={index} />
                ))}
              </div>
            </div>

            <aside className="p-5 xl:sticky xl:top-[172px] xl:self-start">
              <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-cyan-200/62"><ScanSearch size={14} /> Generic system path</div>
              <h3 className="mt-2 text-[23px] font-semibold tracking-[-0.035em] text-white">Most technologies move energy and information through a loop.</h3>
              <p className="mt-3 text-[13px] leading-6 text-slate-400">Not every system uses every stage, and the order can branch or loop. This spine is a reading aid for seeing how hardware, communications, automation, power, and interfaces cooperate.</p>

              <div className="mt-4">
                {SYSTEM_FLOW.map(([label, detail], index) => (
                  <div key={label} className="grid grid-cols-[32px_80px_minmax(0,1fr)] items-center gap-3 border-b border-white/[0.055] py-2.5 last:border-b-0">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-emerald-200/[0.13] bg-emerald-200/[0.025] font-mono text-[9px] text-emerald-200/55">0{index + 1}</span>
                    <strong className="text-[13px] text-slate-100/86">{label}</strong>
                    <span className="text-[11px] leading-4 text-slate-500">{detail}</span>
                  </div>
                ))}
              </div>

              <Link href="/formal-science/computer-science" className="group mt-5 flex items-center justify-between gap-4 rounded-[14px] border border-sky-200/[0.12] bg-sky-200/[0.025] px-4 py-3 transition hover:bg-sky-200/[0.05]">
                <span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.07em] text-sky-200/50">Neighboring formal field</span>
                  <strong className="mt-1 block text-[14px] text-white/86">Computer Science</strong>
                  <span className="mt-1 block text-[11px] leading-5 text-slate-500">Algorithms, software, computation, and theory live there rather than being duplicated here.</span>
                </span>
                <ArrowRight size={14} className="shrink-0 text-sky-200/45 transition group-hover:translate-x-1" />
              </Link>
            </aside>
          </div>
        </section>

        <section className="mt-6 overflow-hidden rounded-[24px] border border-white/[0.08] bg-black/[0.13] backdrop-blur-xl">
          <div className="grid gap-4 border-b border-white/[0.07] px-5 py-5 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end sm:px-6">
            <div>
              <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-amber-200/58"><Wrench size={13} /> Engineering reality check</div>
              <h2 className="mt-2 text-[clamp(1.65rem,3vw,2.6rem)] font-semibold tracking-[-0.04em] text-white">A technology succeeds only when the whole lifecycle works.</h2>
            </div>
            <p className="text-[13px] leading-6 text-slate-400">Prototype performance is only one dimension. Deployment adds reliability, safety, standards, cost, maintenance, supply chains, accessibility, repair, and eventual replacement.</p>
          </div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3">
            {DESIGN_TESTS.map(([title, detail], index) => (
              <article key={title} className="min-h-[158px] border-b border-white/[0.06] px-5 py-4 sm:border-r sm:[&:nth-child(2n)]:border-r-0 xl:[&:nth-child(2n)]:border-r xl:[&:nth-child(3n)]:border-r-0 xl:[&:nth-last-child(-n+3)]:border-b-0">
                <span className="font-mono text-[9px] text-emerald-200/38">0{index + 1}</span>
                <h3 className="mt-2 text-[15px] font-semibold text-white/90">{title}</h3>
                <p className="mt-2 text-[12px] leading-5 text-slate-400">{detail}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function BranchCard({ branch, meta, index }: { branch: CurriculumNode; meta: TechMeta; index: number }) {
  const Icon = meta.icon;
  const planned = branch.status === "placeholder";
  const body = (
    <div className={`group flex min-h-[172px] flex-col rounded-[18px] border px-4 py-4 transition ${planned ? "border-white/[0.06] opacity-65" : "border-white/[0.08] hover:-translate-y-0.5 hover:bg-white/[0.025]"}`}>
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-[12px] border" style={{ color: `rgb(${meta.rgb})`, borderColor: `rgba(${meta.rgb},0.24)`, background: `rgba(${meta.rgb},0.045)` }}><Icon size={17} /></span>
        <span className="font-mono text-[9px] text-slate-600">0{index + 1} · {meta.code}</span>
      </div>
      <div className="mt-3 font-mono text-[9px] font-semibold uppercase tracking-[0.075em]" style={{ color: `rgba(${meta.rgb},0.64)` }}>{meta.role}</div>
      <h3 className="mt-1 text-[16px] font-semibold text-white/92">{branch.label}</h3>
      <p className="mt-2 line-clamp-2 text-[12px] leading-5 text-slate-400">{branch.description}</p>
      <div className="mt-auto flex items-center justify-between gap-3 pt-3 font-mono text-[8px] uppercase tracking-[0.055em] text-slate-600">
        <span>{meta.systemLayer}</span><span>{planned ? "planned" : "open"}</span>
      </div>
    </div>
  );

  return planned ? <div aria-label={`${branch.label}, planned`}>{body}</div> : <Link href={branch.href}>{body}</Link>;
}
