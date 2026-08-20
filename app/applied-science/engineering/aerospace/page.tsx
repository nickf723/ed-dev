import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame, Surface } from "@/app/_page-system/scene";
import {
  ArrowRight,
  CircuitBoard,
  Flame,
  Gauge,
  GitCompareArrows,
  Layers3,
  Navigation,
  Orbit,
  Plane,
  Rocket,
  ShieldCheck,
  ThermometerSun,
  Wind,
  type LucideIcon,
} from "lucide-react";
import AeroBackground from "./AeroBackground";
import LiftLab from "./LiftLab";

const LENSES: readonly { title: string; question: string; detail: string; icon: LucideIcon; rgb: string }[] = [
  {
    title: "Aerodynamics & flight mechanics",
    question: "How does motion through an atmosphere create forces, moments, stability, and control demands?",
    detail: "Pressure, shear, compressibility, boundary layers, geometry, motion, and atmospheric conditions interact across very different speed and altitude regimes.",
    icon: Wind,
    rgb: "56,189,248",
  },
  {
    title: "Propulsion & energy",
    question: "How is stored or supplied energy converted into useful momentum change?",
    detail: "Air-breathing engines, rockets, electric propulsion, propellers, rotors, and other systems solve different mission and environment problems with different constraints.",
    icon: Flame,
    rgb: "251,146,60",
  },
  {
    title: "Structures & thermal environment",
    question: "Can the vehicle carry loads, survive temperature extremes, and remain light enough to perform its mission?",
    detail: "Aerospace structures trade mass, stiffness, strength, fatigue, buckling, vibration, thermal expansion, protection, inspectability, and damage tolerance.",
    icon: Layers3,
    rgb: "203,213,225",
  },
  {
    title: "Guidance, navigation & control",
    question: "How does the vehicle estimate state, choose a trajectory, and remain stable while conditions change?",
    detail: "Sensors, estimation, actuators, feedback, flight software, navigation references, redundancy, and failure handling connect desired motion to actual motion.",
    icon: Navigation,
    rgb: "74,222,128",
  },
  {
    title: "Astrodynamics & spaceflight",
    question: "How does a spacecraft move when orbital mechanics dominates instead of aerodynamic lift?",
    detail: "Orbits, transfers, gravity assists, rendezvous, attitude dynamics, propulsion events, and reference frames determine trajectories once the space environment dominates.",
    icon: Orbit,
    rgb: "192,132,252",
  },
  {
    title: "Mission & systems engineering",
    question: "Do all subsystems close together into one feasible, verifiable mission?",
    detail: "Mass, power, thermal control, communication, reliability, operations, manufacturing, human factors, environment, cost, and margins interact across the full lifecycle.",
    icon: GitCompareArrows,
    rgb: "244,114,182",
  },
] as const;

const REGIMES = [
  { label: "Atmospheric cruise", dominant: "aerodynamic efficiency · propulsion · stability · weather", icon: Plane, rgb: "56,189,248" },
  { label: "High-speed atmosphere", dominant: "compressibility · heating · wave drag · structural/thermal coupling", icon: Gauge, rgb: "251,146,60" },
  { label: "Launch & ascent", dominant: "thrust · mass · changing atmosphere · vibration · guidance · staging", icon: Rocket, rgb: "244,114,182" },
  { label: "Orbit & deep space", dominant: "trajectory · attitude · power · thermal control · communication · radiation", icon: Orbit, rgb: "192,132,252" },
  { label: "Entry / descent", dominant: "energy dissipation · heating · deceleration · control · landing constraints", icon: ThermometerSun, rgb: "251,191,36" },
] as const;

const BOUNDARIES = [
  ["Lift is not one explanation", "Lift is the net aerodynamic force component perpendicular to the relative flow. Different models can explain pressure and momentum changes at different levels; slogans about faster air on top are not a complete theory."],
  ["Stall angle is not universal", "Flow separation and stall depend on geometry, Reynolds number, Mach number, surface condition, motion, control state, and other factors. A single fixed angle is only meaningful inside a specified model or test."],
  ["Rocket thrust is not 'pushing on air'", "A rocket changes momentum by accelerating exhaust. It can operate in vacuum; atmospheric pressure changes nozzle behavior and performance but is not the reaction surface that makes thrust possible."],
  ["Orbit is continuous falling, but the slogan is incomplete", "Orbital motion is governed by state, gravity, geometry, perturbations, and energy/angular-momentum relationships. A useful trajectory calculation needs more than the phrase 'falling around Earth.'"],
] as const;

export default function AerospacePage() {
  return (
    <SceneFrame
      background={<AeroBackground />}
      className="bg-[#03101c] text-slate-100 selection:bg-sky-300/25"
      maxWidthClassName="max-w-[1580px]"
      headerBackground="rgba(3,16,28,0.56)"
      header={
        <DomainPageHeader
          breadcrumbs={[
            { label: "Applied Sciences", href: "/applied-science" },
            { label: "Engineering", href: "/applied-science/engineering" },
            { label: "Aerospace Engineering" },
          ]}
          eyebrow="Flight · propulsion · structures · control · orbit · mission"
          eyebrowStyle="rule"
          icon={Plane}
          title={<span>Aerospace Engineering</span>}
          subtitle="Aerospace engineering designs vehicles and systems that move through atmospheres and space. The dominant physics changes with flight regime, but every mission still has to close forces, energy, structure, control, environment, reliability, operations, and verification into one workable system."
          accentRgb="56, 189, 248"
          titleClassName="font-sans text-[clamp(2.55rem,4.9vw,5.5rem)] font-semibold leading-[0.85] tracking-[-0.061em] text-[#f0f9ff]"
          headerClassName="border-sky-100/[0.10]"
        />
      }
    >
      <section className="mt-5">
        <div className="mb-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-[12px] font-semibold uppercase tracking-[0.09em] text-sky-200/62"><Wind size={14} /> Atmospheric-flight laboratory</div>
            <h2 className="mt-2 max-w-5xl text-[clamp(1.9rem,3.7vw,3.6rem)] font-semibold leading-[0.94] tracking-[-0.052em] text-white">Trim is a relationship among forces, not a magic angle.</h2>
          </div>
          <p className="text-[14px] leading-6 text-slate-300/72">Start with one deliberately narrow flight model. Once speed, angle, lift demand, drag demand, and flow regime are linked, the rest of aerospace engineering can be layered around what that toy model omits.</p>
        </div>
        <LiftLab />
      </section>

      <section className="mt-10 border-t border-sky-100/[0.09] pt-5">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-[12px] font-semibold uppercase tracking-[0.09em] text-orange-200/58"><Rocket size={14} /> Flight regimes</div>
            <h2 className="mt-2 max-w-5xl text-[clamp(1.8rem,3.4vw,3.2rem)] font-semibold leading-[0.95] tracking-[-0.048em] text-white">The vehicle can be the same project while the dominant model changes underneath it.</h2>
          </div>
          <p className="text-[14px] leading-6 text-slate-300/68">Aerospace is not cleanly split into “airplane physics” and “space physics.” Launch, high-speed flight, entry, rotorcraft, atmospheric vehicles, spacecraft, and mixed missions move through overlapping regimes with different dominant constraints.</p>
        </div>
        <div className="mt-5 grid border-y border-white/[0.07] md:grid-cols-2 xl:grid-cols-5">
          {REGIMES.map((item, index) => <Regime key={item.label} item={item} number={`0${index + 1}`} />)}
        </div>
      </section>

      <section className="mt-10 grid gap-5 xl:grid-cols-[minmax(0,1.15fr)_420px] xl:items-start">
        <Surface variant="glass" className="overflow-hidden rounded-[28px] border-sky-100/[0.08]" style={{ background: "rgba(3,12,24,0.17)" }}>
          <div className="p-5 sm:p-6"><div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-sky-200/54"><CircuitBoard size={13} /> Engineering lenses</div><h3 className="mt-2 text-[clamp(1.7rem,2.8vw,2.6rem)] font-semibold tracking-[-0.043em] text-white">Every vehicle is a coupled system before it is an icon.</h3><p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400/74">A lighter structure can change control response; a new trajectory can change thermal load; extra redundancy can change mass and power; a propulsion decision can reshape the entire mission. Aerospace design lives in those couplings.</p></div>
          <div className="grid border-t border-white/[0.07] sm:grid-cols-2 xl:grid-cols-3">
            {LENSES.map((lens) => <Lens key={lens.title} {...lens} />)}
          </div>
        </Surface>

        <Surface variant="open" className="overflow-hidden rounded-[28px] border-orange-100/[0.08] xl:sticky xl:top-[172px]" style={{ background: "rgba(15,8,4,0.055)" }}>
          <div className="p-5"><div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-orange-200/48"><ShieldCheck size={12} /> Model boundaries</div><h3 className="mt-2 text-[21px] font-semibold tracking-[-0.035em] text-white">Aerospace slogans are useful until they start pretending to be derivations.</h3></div>
          <div className="divide-y divide-white/[0.06] border-y border-white/[0.07]">
            {BOUNDARIES.map(([term, text], index) => <div key={term} className="grid grid-cols-[34px_minmax(0,1fr)] gap-3 px-4 py-3.5"><span className="font-mono text-[10px] text-orange-200/38">0{index + 1}</span><span><strong className="block text-[12px] text-white/82">{term}</strong><span className="mt-1 block text-[11px] leading-5 text-slate-500">{text}</span></span></div>)}
          </div>
        </Surface>
      </section>

      <section className="mt-9 grid gap-3 border-t border-white/[0.07] pt-5 sm:grid-cols-3">
        <Neighbor href="/applied-science/engineering" label="Engineering" note="requirements, verification, tradeoffs, lifecycle" icon={GitCompareArrows} rgb="56,189,248" />
        <Neighbor href="/natural-science/physics" label="Physics" note="mechanics, fluids, thermodynamics, electromagnetism, relativity" icon={Gauge} rgb="248,113,113" />
        <Neighbor href="/applied-science/materials-science" label="Materials Science" note="processing, structure, properties, failure, environment" icon={Layers3} rgb="192,132,252" />
      </section>
    </SceneFrame>
  );
}

function Regime({ item, number }: { item: (typeof REGIMES)[number]; number: string }) {
  const Icon = item.icon;
  return <div className="min-h-[165px] border-b border-white/[0.06] p-4 xl:border-r xl:border-b-0 xl:last:border-r-0"><div className="flex items-start justify-between"><Icon size={16} style={{ color: `rgb(${item.rgb})` }} /><span className="font-mono text-[10px] text-slate-600">{number}</span></div><strong className="mt-4 block text-[13px] text-white/86">{item.label}</strong><span className="mt-2 block text-[11px] leading-5 text-slate-500">{item.dominant}</span></div>;
}

function Lens({ title, question, detail, icon: Icon, rgb }: { title: string; question: string; detail: string; icon: LucideIcon; rgb: string }) {
  return <article className="min-h-[235px] border-b border-white/[0.06] p-4 sm:border-r sm:[&:nth-child(2n)]:border-r-0 xl:[&:nth-child(2n)]:border-r xl:[&:nth-child(3n)]:border-r-0 xl:[&:nth-last-child(-n+3)]:border-b-0"><span className="flex h-9 w-9 items-center justify-center rounded-[12px] border" style={{ color: `rgb(${rgb})`, borderColor: `rgba(${rgb},0.24)`, background: `rgba(${rgb},0.04)` }}><Icon size={15} /></span><h3 className="mt-3 text-[15px] font-semibold text-white/88">{title}</h3><strong className="mt-2 block text-[11px] leading-5" style={{ color: `rgba(${rgb},0.74)` }}>{question}</strong><p className="mt-2 text-[11px] leading-5 text-slate-500">{detail}</p></article>;
}

function Neighbor({ href, label, note, icon: Icon, rgb }: { href: string; label: string; note: string; icon: LucideIcon; rgb: string }) {
  return <Link href={href} className="group flex min-h-[92px] items-center gap-3 rounded-[18px] border border-white/[0.07] bg-black/[0.08] p-4 backdrop-blur-[10px] transition hover:bg-black/[0.15]"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] border" style={{ color: `rgb(${rgb})`, borderColor: `rgba(${rgb},0.22)` }}><Icon size={16} /></span><span className="min-w-0 flex-1"><strong className="text-[13px] text-white/84">{label}</strong><span className="mt-1 block text-[11px] leading-4 text-slate-500">{note}</span></span><ArrowRight size={13} className="text-white/28 transition group-hover:translate-x-1" /></Link>;
}
