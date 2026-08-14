import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import ThermoAtmosphere from "./_components/ThermoAtmosphere";
import type { ThermoFieldMode } from "./_components/ThermoField";
import {
  ArrowRight,
  Atom,
  CircleDashed,
  Flame,
  Gauge,
  Layers3,
  RefreshCw,
  Thermometer,
  Waves,
  type LucideIcon,
} from "lucide-react";

const NODE_ID = "natural.physics.thermodynamics";

type Presentation = {
  step: string;
  question: string;
  specimen: string;
  icon: LucideIcon;
  rgb: string;
  mode: ThermoFieldMode;
};

const PRESENTATIONS: Record<string, Presentation> = {
  "natural.physics.thermodynamics.temperature": {
    step: "01",
    question: "What does temperature measure, and what does equilibrium actually mean?",
    specimen: "T_A = T_B",
    icon: Thermometer,
    rgb: "250, 204, 21",
    mode: "equilibrium",
  },
  "natural.physics.thermodynamics.heat-transfer": {
    step: "02",
    question: "Why does energy move from hotter regions toward colder ones?",
    specimen: "hot → cold",
    icon: Waves,
    rgb: "251, 146, 60",
    mode: "transfer",
  },
  "natural.physics.thermodynamics.first-law": {
    step: "03",
    question: "How do heat and work change the energy inside a system?",
    specimen: "ΔU = Q − W",
    icon: Gauge,
    rgb: "45, 212, 191",
    mode: "first-law",
  },
  "natural.physics.thermodynamics.phase-change": {
    step: "04",
    question: "How can energy enter matter while temperature stays constant?",
    specimen: "Q = mL",
    icon: Layers3,
    rgb: "34, 211, 238",
    mode: "phase",
  },
  "natural.physics.thermodynamics.entropy": {
    step: "05",
    question: "Why do spontaneous processes have a preferred direction?",
    specimen: "S = k ln Ω",
    icon: Atom,
    rgb: "232, 121, 249",
    mode: "entropy",
  },
  "natural.physics.thermodynamics.processes": {
    step: "06",
    question: "How do constraints create thermodynamic paths, cycles, and engines?",
    specimen: "P ↔ V ↔ T",
    icon: RefreshCw,
    rgb: "167, 139, 250",
    mode: "process",
  },
};

export default function ThermodynamicsPage() {
  const context = requireCurriculumPageContext(NODE_ID);
  const lessons = context.children.map((child, index) => ({
    child,
    presentation: PRESENTATIONS[child.id] ?? {
      step: String(index + 1).padStart(2, "0"),
      question: child.description ?? "",
      specimen: child.label,
      icon: Flame,
      rgb: "248, 113, 113",
      mode: "overview" as ThermoFieldMode,
    },
  }));

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#050508] text-slate-100 selection:bg-orange-300/25">
      <ThermoAtmosphere />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 pb-12 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.07] bg-[#07070b]/62 px-4 pb-4 pt-5 backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={[
              { label: "Physics", href: "/natural-science/physics" },
              { label: "Thermodynamics" },
            ]}
            eyebrow="Temperature · transfer · direction"
            icon={Flame}
            title={<span>Thermodynamics</span>}
            subtitle="Study large collections of particles through temperature, energy transfer, internal energy, phase, entropy, and the constrained processes that connect macroscopic states."
            accentRgb="248, 113, 113"
            titleClassName="font-mono text-[clamp(2.25rem,4.8vw,5rem)] font-semibold uppercase leading-[0.88] tracking-[-0.055em] text-[#fff7f4]"
            headerClassName="border-transparent"
            aside={
              <div className="rounded-full border border-red-200/[0.12] bg-black/15 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.11em] text-red-100/70 backdrop-blur-md">
                {context.activeChildren.length} / {context.children.length} lessons live
              </div>
            }
          />
        </div>

        <section className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:items-stretch">
          <div className="rounded-[28px] border border-red-200/[0.12] bg-black/[0.055] p-5 shadow-[0_20px_80px_rgba(248,113,113,0.035)] backdrop-blur-md sm:p-6">
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-red-300/78">Thermal throughline</div>
            <h2 className="mt-2 text-[clamp(1.7rem,3vw,2.5rem)] font-semibold tracking-[-0.04em] text-white">
              Many microscopic motions become a few macroscopic state variables.
            </h2>
            <p className="mt-3 max-w-2xl text-[13px] leading-6 text-slate-300/80">
              Thermodynamics compresses an enormous microscopic world into quantities such as temperature, pressure, volume, and internal energy. The interesting question is not only what state a system is in, but which changes are possible and which direction they naturally run.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2 font-mono text-[10px] text-slate-500">
              <span className="text-cyan-200/80">microstates</span>
              <ArrowRight size={12} className="text-slate-700" />
              <span>state</span>
              <ArrowRight size={12} className="text-slate-700" />
              <span>transfer</span>
              <ArrowRight size={12} className="text-slate-700" />
              <span>constraint</span>
              <ArrowRight size={12} className="text-slate-700" />
              <span className="text-fuchsia-200/80">direction</span>
            </div>
          </div>

          <ThermalWindow />
        </section>

        <section className="mt-5 overflow-hidden rounded-[32px] border border-white/[0.09] bg-black/[0.035] p-5 shadow-[0_24px_90px_rgba(0,0,0,0.18)] backdrop-blur-[2px] sm:p-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-orange-300/75">Thermal pathway</div>
              <h2 className="mt-1 text-[23px] font-semibold tracking-[-0.03em] text-white">Follow energy from state to direction.</h2>
            </div>
            <p className="max-w-xl text-[11px] leading-5 text-slate-400/75">The laws appear where they become useful. They are consequences and constraints on the physical ideas, not the table of contents.</p>
          </div>

          <div className="relative mt-7 hidden min-h-[360px] lg:block">
            <div className="absolute left-[6%] right-[6%] top-[172px] h-1 rounded-full bg-gradient-to-r from-cyan-300/35 via-yellow-300/42 via-orange-300/44 to-fuchsia-300/38 shadow-[0_0_28px_rgba(251,146,60,0.08)]" />
            <div className="absolute left-[6%] top-[154px] font-mono text-[9px] uppercase tracking-[0.13em] text-cyan-200/60">state</div>
            <div className="absolute right-[6%] top-[154px] font-mono text-[9px] uppercase tracking-[0.13em] text-fuchsia-200/60">direction & cycles</div>

            {lessons.map(({ child, presentation }, index) => {
              const Icon = presentation.icon;
              const live = child.status !== "placeholder";
              const top = index % 2 === 0 ? 74 : 205;
              const left = 7 + index * 17.2;
              const inner = (
                <div className="group flex w-[150px] flex-col items-center text-center">
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-full border bg-[#09090d]/66 transition-all duration-200 group-hover:scale-110" style={{ color: `rgb(${presentation.rgb})`, borderColor: `rgba(${presentation.rgb},${live ? "0.38" : "0.10"})`, boxShadow: live ? `0 0 42px rgba(${presentation.rgb},0.16), inset 0 0 22px rgba(${presentation.rgb},0.035)` : undefined }}>
                    <div className="absolute inset-[-7px] rounded-full border opacity-0 transition-opacity group-hover:opacity-100" style={{ borderColor: `rgba(${presentation.rgb},0.16)` }} />
                    <Icon size={20} />
                  </div>
                  <div className="mt-3 font-mono text-[9px]" style={{ color: `rgba(${presentation.rgb},0.72)` }}>{presentation.step}</div>
                  <strong className={`mt-1 text-[12px] ${live ? "text-white" : "text-slate-600"}`}>{child.label}</strong>
                  <span className="mt-1 font-mono text-[9px]" style={{ color: `rgba(${presentation.rgb},${live ? "0.68" : "0.24"})` }}>{presentation.specimen}</span>
                </div>
              );
              return (
                <div key={child.id} className="absolute -translate-x-1/2" style={{ left: `${left}%`, top }}>
                  {live ? <Link href={child.href}>{inner}</Link> : <div aria-disabled="true">{inner}</div>}
                </div>
              );
            })}
          </div>

          <div className="mt-6 space-y-2 lg:hidden">
            {lessons.map(({ child, presentation }) => {
              const Icon = presentation.icon;
              const live = child.status !== "placeholder";
              const inner = (
                <div className="flex items-center gap-3 rounded-[16px] border px-4 py-3" style={{ borderColor: `rgba(${presentation.rgb},${live ? "0.20" : "0.06"})`, background: `rgba(${presentation.rgb},${live ? "0.035" : "0.008"})` }}>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] border" style={{ color: `rgb(${presentation.rgb})`, borderColor: `rgba(${presentation.rgb},0.22)` }}><Icon size={15} /></div>
                  <div className="min-w-0 flex-1"><span className="font-mono text-[9px]" style={{ color: `rgba(${presentation.rgb},0.65)` }}>{presentation.step}</span><strong className={`block text-[12px] ${live ? "text-white" : "text-slate-600"}`}>{child.label}</strong></div>
                  {live ? <ArrowRight size={14} style={{ color: `rgb(${presentation.rgb})` }} /> : <CircleDashed size={13} className="text-slate-700" />}
                </div>
              );
              return live ? <Link key={child.id} href={child.href}>{inner}</Link> : <div key={child.id} aria-disabled="true">{inner}</div>;
            })}
          </div>
        </section>

        <section className="mt-4 grid gap-3 md:grid-cols-3">
          <Idea title="Temperature is a state variable" text="It is not heat and it is not the total energy stored by an object. It helps describe the distribution of microscopic energy." rgb="250, 204, 21" />
          <Idea title="Heat is energy in transit" text="Heat names transfer driven by a temperature difference. Once transferred, that energy contributes to the receiving system's internal energy." rgb="251, 146, 60" />
          <Idea title="Entropy gives direction" text="Energy conservation says what balances. Entropy adds a statistical constraint on which macroscopic changes are overwhelmingly favored." rgb="232, 121, 249" />
        </section>
      </div>
    </main>
  );
}

function ThermalWindow() {
  const coolMotes = Array.from({ length: 12 }, (_, index) => ({ left: 10 + ((index * 31) % 72), top: 20 + ((index * 43) % 54), size: 2 + (index % 3) }));
  const hotMotes = Array.from({ length: 16 }, (_, index) => ({ right: 9 + ((index * 23) % 72), top: 16 + ((index * 37) % 60), size: 2 + (index % 4) }));

  return (
    <div className="relative min-h-[310px] overflow-hidden rounded-[28px] border border-white/[0.10] bg-[#09090d]/38 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.035),0_24px_80px_rgba(0,0,0,0.16)] backdrop-blur-[3px]">
      <div className="absolute inset-y-[12%] left-1/2 w-px bg-gradient-to-b from-transparent via-white/[0.14] to-transparent" />
      <div className="absolute left-[6%] top-[14%] h-[68%] w-[40%] rounded-[28px] border border-cyan-200/[0.14] bg-cyan-400/[0.045] shadow-[inset_0_0_55px_rgba(34,211,238,0.025),0_0_45px_rgba(34,211,238,0.04)]" />
      <div className="absolute right-[6%] top-[14%] h-[68%] w-[40%] rounded-[28px] border border-red-200/[0.16] bg-red-400/[0.055] shadow-[inset_0_0_60px_rgba(248,113,113,0.035),0_0_50px_rgba(248,113,113,0.05)]" />

      {coolMotes.map((mote, index) => (
        <span key={`cool-${index}`} className="absolute animate-pulse rounded-full bg-cyan-300/65 shadow-[0_0_12px_rgba(34,211,238,0.35)]" style={{ left: `${mote.left}%`, top: `${mote.top}%`, width: mote.size, height: mote.size, animationDuration: `${3.2 + index * 0.14}s` }} />
      ))}
      {hotMotes.map((mote, index) => (
        <span key={`hot-${index}`} className="absolute animate-pulse rounded-full bg-red-300/70 shadow-[0_0_15px_rgba(248,113,113,0.42)]" style={{ right: `${mote.right}%`, top: `${mote.top}%`, width: mote.size, height: mote.size, animationDuration: `${1.4 + index * 0.09}s` }} />
      ))}

      {[0, 1, 2].map((index) => (
        <div key={index} className="absolute left-[42%] h-px w-[16%] -rotate-3 animate-pulse" style={{ top: `${43 + index * 7}%`, background: "linear-gradient(90deg, rgba(248,113,113,0.60), rgba(251,146,60,0.54), rgba(34,211,238,0.26))", animationDuration: `${1.7 + index * 0.4}s` }} />
      ))}
      <div className="absolute left-[50%] top-[calc(50%-4px)] h-2 w-2 rotate-45 border-b border-r border-cyan-100/65" />

      <div className="relative z-10 flex h-full min-h-[270px] flex-col justify-between">
        <div className="flex justify-between text-[9px] font-semibold uppercase tracking-[0.13em] text-slate-500"><span>microscopic motion</span><span>thermal contact</span></div>
        <div className="grid grid-cols-2 gap-[16%] px-[11%] text-center">
          <div><div className="text-[9px] uppercase tracking-[0.12em] text-cyan-300/70">cooler</div><div className="mt-1 font-mono text-[17px] text-cyan-100/90">T₁</div><p className="mt-2 text-[10px] leading-5 text-slate-500">slower typical microscopic motion</p></div>
          <div><div className="text-[9px] uppercase tracking-[0.12em] text-red-300/70">hotter</div><div className="mt-1 font-mono text-[17px] text-red-100/90">T₂</div><p className="mt-2 text-[10px] leading-5 text-slate-500">faster typical microscopic motion</p></div>
        </div>
        <div className="text-center font-mono text-[10px] text-orange-100/70">energy transfer reduces the temperature difference</div>
      </div>
    </div>
  );
}

function Idea({ title, text, rgb }: { title: string; text: string; rgb: string }) {
  return <div className="rounded-[18px] border border-white/[0.07] bg-black/[0.055] p-4 backdrop-blur-md"><div className="h-1 w-10 rounded-full" style={{ background: `rgba(${rgb},0.82)`, boxShadow: `0 0 16px rgba(${rgb},0.18)` }} /><strong className="mt-3 block text-[12px] text-white">{title}</strong><p className="mt-2 text-[11px] leading-5 text-slate-400/80">{text}</p></div>;
}
