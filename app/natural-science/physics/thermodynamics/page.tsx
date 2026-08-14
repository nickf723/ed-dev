import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import ThermoAtmosphere from "./_components/ThermoAtmosphere";
import ThermoPathway, { type ThermoIconKey } from "./_components/ThermoPathway";
import type { ThermoFieldMode } from "./_components/ThermoField";
import { ArrowRight, Flame } from "lucide-react";

const NODE_ID = "natural.physics.thermodynamics";

type Presentation = {
  step: string;
  question: string;
  specimen: string;
  icon: ThermoIconKey;
  rgb: string;
  mode: ThermoFieldMode;
};

const PRESENTATIONS: Record<string, Presentation> = {
  "natural.physics.thermodynamics.temperature": {
    step: "01",
    question: "What does temperature measure, and what does equilibrium actually mean?",
    specimen: "T_A = T_B",
    icon: "thermometer",
    rgb: "250, 204, 21",
    mode: "equilibrium",
  },
  "natural.physics.thermodynamics.heat-transfer": {
    step: "02",
    question: "Why does energy move from hotter regions toward colder ones?",
    specimen: "hot → cold",
    icon: "waves",
    rgb: "251, 146, 60",
    mode: "transfer",
  },
  "natural.physics.thermodynamics.first-law": {
    step: "03",
    question: "How do heat and work change the energy inside a system?",
    specimen: "ΔU = Q − W",
    icon: "gauge",
    rgb: "45, 212, 191",
    mode: "first-law",
  },
  "natural.physics.thermodynamics.phase-change": {
    step: "04",
    question: "How can energy enter matter while temperature stays constant?",
    specimen: "Q = mL",
    icon: "layers",
    rgb: "34, 211, 238",
    mode: "phase",
  },
  "natural.physics.thermodynamics.entropy": {
    step: "05",
    question: "Why do spontaneous processes have a preferred direction?",
    specimen: "S = k ln Ω",
    icon: "atom",
    rgb: "232, 121, 249",
    mode: "entropy",
  },
  "natural.physics.thermodynamics.processes": {
    step: "06",
    question: "How do constraints create thermodynamic paths, cycles, and engines?",
    specimen: "P ↔ V ↔ T",
    icon: "refresh",
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
      icon: "flame" as ThermoIconKey,
      rgb: "248, 113, 113",
      mode: "overview" as ThermoFieldMode,
    },
  }));

  const pathwayLessons = lessons.map(({ child, presentation }) => ({
    id: child.id,
    label: child.label,
    href: child.href,
    live: child.status !== "placeholder",
    step: presentation.step,
    question: presentation.question,
    specimen: presentation.specimen,
    rgb: presentation.rgb,
    mode: presentation.mode,
    icon: presentation.icon,
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

        <ThermoPathway lessons={pathwayLessons} />

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
