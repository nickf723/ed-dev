import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import ThermoField, { type ThermoFieldMode } from "./_components/ThermoField";
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
    <main className="relative min-h-screen overflow-x-hidden bg-[#07080d] text-slate-100 selection:bg-orange-300/25">
      <ThermoField mode="overview" intensity={1.12} />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 pb-12 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.07] bg-[#07080d]/76 px-4 pb-4 pt-5 backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
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
              <div className="rounded-full border border-red-200/[0.10] bg-black/20 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.11em] text-red-100/65 backdrop-blur-md">
                {context.activeChildren.length} / {context.children.length} lessons live
              </div>
            }
          />
        </div>

        <section className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:items-stretch">
          <div className="rounded-[28px] border border-red-200/[0.10] bg-black/[0.10] p-5 backdrop-blur-lg sm:p-6">
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-red-300/70">Thermal throughline</div>
            <h2 className="mt-2 text-[clamp(1.7rem,3vw,2.5rem)] font-semibold tracking-[-0.04em] text-white">
              Many microscopic motions become a few macroscopic state variables.
            </h2>
            <p className="mt-3 max-w-2xl text-[13px] leading-6 text-slate-400">
              Thermodynamics compresses an enormous microscopic world into quantities such as temperature, pressure, volume, and internal energy. The interesting question is not only what state a system is in, but which changes are possible and which direction they naturally run.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2 font-mono text-[10px] text-slate-500">
              <span className="text-cyan-200/70">microstates</span>
              <ArrowRight size={12} className="text-slate-700" />
              <span>state</span>
              <ArrowRight size={12} className="text-slate-700" />
              <span>transfer</span>
              <ArrowRight size={12} className="text-slate-700" />
              <span>constraint</span>
              <ArrowRight size={12} className="text-slate-700" />
              <span className="text-fuchsia-200/70">direction</span>
            </div>
          </div>

          <ThermalWindow />
        </section>

        <section className="mt-5 overflow-hidden rounded-[32px] border border-white/[0.08] bg-black/[0.07] p-5 backdrop-blur-[3px] sm:p-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-orange-300/68">Thermal pathway</div>
              <h2 className="mt-1 text-[23px] font-semibold tracking-[-0.03em] text-white">Follow energy from state to direction.</h2>
            </div>
            <p className="max-w-xl text-[11px] leading-5 text-slate-500">The laws appear where they become useful. They are consequences and constraints on the physical ideas, not the table of contents.</p>
          </div>

          <div className="relative mt-7 hidden min-h-[360px] lg:block">
            <div className="absolute left-[6%] right-[6%] top-[172px] h-1 rounded-full bg-gradient-to-r from-cyan-300/25 via-yellow-300/32 via-orange-300/34 to-fuchsia-300/28" />
            <div className="absolute left-[6%] top-[154px] font-mono text-[9px] uppercase tracking-[0.13em] text-cyan-200/45">state</div>
            <div className="absolute right-[6%] top-[154px] font-mono text-[9px] uppercase tracking-[0.13em] text-fuchsia-200/45">direction & cycles</div>

            {lessons.map(({ child, presentation }, index) => {
              const Icon = presentation.icon;
              const live = child.status !== "placeholder";
              const top = index % 2 === 0 ? 74 : 205;
              const left = 7 + index * 17.2;
              const inner = (
                <div className="group flex w-[150px] flex-col items-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border bg-[#0b0c12]/88 transition-transform group-hover:scale-105" style={{ color: `rgb(${presentation.rgb})`, borderColor: `rgba(${presentation.rgb},${live ? "0.30" : "0.10"})`, boxShadow: live ? `0 0 34px rgba(${presentation.rgb},0.10)` : undefined }}>
                    <Icon size={20} />
                  </div>
                  <div className="mt-3 font-mono text-[9px]" style={{ color: `rgba(${presentation.rgb},0.58)` }}>{presentation.step}</div>
                  <strong className={`mt-1 text-[12px] ${live ? "text-white" : "text-slate-600"}`}>{child.label}</strong>
                  <span className="mt-1 font-mono text-[9px]" style={{ color: `rgba(${presentation.rgb},${live ? "0.52" : "0.24"})` }}>{presentation.specimen}</span>
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
                <div className="flex items-center gap-3 rounded-[16px] border px-4 py-3" style={{ borderColor: `rgba(${presentation.rgb},${live ? "0.15" : "0.06"})`, background: `rgba(${presentation.rgb},${live ? "0.025" : "0.008"})` }}>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] border" style={{ color: `rgb(${presentation.rgb})`, borderColor: `rgba(${presentation.rgb},0.16)` }}><Icon size={15} /></div>
                  <div className="min-w-0 flex-1"><span className="font-mono text-[9px]" style={{ color: `rgba(${presentation.rgb},0.55)` }}>{presentation.step}</span><strong className={`block text-[12px] ${live ? "text-white" : "text-slate-600"}`}>{child.label}</strong></div>
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
  return (
    <div className="relative min-h-[310px] overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0b0c12]/58 p-5">
      <div className="absolute inset-y-[15%] left-1/2 w-px bg-white/[0.08]" />
      <div className="absolute left-[8%] top-[18%] h-[64%] w-[38%] rounded-[24px] border border-cyan-200/[0.10] bg-cyan-400/[0.035]" />
      <div className="absolute right-[8%] top-[18%] h-[64%] w-[38%] rounded-[24px] border border-red-200/[0.12] bg-red-400/[0.045]" />
      <div className="absolute left-[43%] top-1/2 h-px w-[14%] bg-gradient-to-r from-red-300/55 via-orange-300/55 to-cyan-300/32" />
      <div className="absolute left-[50%] top-[calc(50%-4px)] h-2 w-2 rotate-45 border-b border-r border-cyan-200/55" />

      <div className="relative z-10 flex h-full min-h-[270px] flex-col justify-between">
        <div className="flex justify-between text-[9px] font-semibold uppercase tracking-[0.13em] text-slate-600"><span>macroscopic view</span><span>thermal contact</span></div>
        <div className="grid grid-cols-2 gap-[16%] px-[11%] text-center">
          <div><div className="text-[9px] uppercase tracking-[0.12em] text-cyan-300/55">cooler</div><div className="mt-1 font-mono text-[16px] text-cyan-100/80">T₁</div><p className="mt-2 text-[10px] leading-5 text-slate-600">slower typical microscopic motion</p></div>
          <div><div className="text-[9px] uppercase tracking-[0.12em] text-red-300/55">hotter</div><div className="mt-1 font-mono text-[16px] text-red-100/80">T₂</div><p className="mt-2 text-[10px] leading-5 text-slate-600">faster typical microscopic motion</p></div>
        </div>
        <div className="text-center font-mono text-[10px] text-orange-100/55">energy disperses until the temperature difference disappears</div>
      </div>
    </div>
  );
}

function Idea({ title, text, rgb }: { title: string; text: string; rgb: string }) {
  return <div className="rounded-[18px] border border-white/[0.06] bg-black/[0.10] p-4 backdrop-blur-lg"><div className="h-1 w-10 rounded-full" style={{ background: `rgba(${rgb},0.72)` }} /><strong className="mt-3 block text-[12px] text-white">{title}</strong><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>;
}
