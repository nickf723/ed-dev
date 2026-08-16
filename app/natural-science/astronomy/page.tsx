import DomainPageHeader from "@/app/_components/DomainPageHeader";
import DeepFieldBackground from "@/app/_page-system/backgrounds/DeepFieldBackground";
import CosmicScaleTopology, { type ScaleNode } from "@/app/_page-system/topologies/CosmicScaleTopology";
import LightTravelTime, { type LightTravelExample } from "@/app/_page-system/widgets/LightTravelTime";
import MethodLens from "@/app/_page-system/widgets/MethodLens";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import {
  Aperture,
  Eye,
  Maximize2,
  Orbit,
  Sigma,
  Sparkles,
  Telescope,
  type LucideIcon,
} from "lucide-react";

const NODE_ID = "natural.astronomy";

type AstronomyMeta = {
  exponent?: number;
  scaleLabel?: string;
  icon: LucideIcon;
  rgb: string;
  kind: "scale" | "method";
};

const META: Record<string, AstronomyMeta> = {
  "natural.astronomy.planetary": {
    exponent: 7,
    scaleLabel: "10⁶–10⁹ m",
    icon: Orbit,
    rgb: "34, 211, 238",
    kind: "scale",
  },
  "natural.astronomy.stellar": {
    exponent: 9,
    scaleLabel: "10⁸–10¹³ m",
    icon: Sparkles,
    rgb: "250, 204, 21",
    kind: "scale",
  },
  "natural.astronomy.galactic": {
    exponent: 21,
    scaleLabel: "~10²¹ m",
    icon: Aperture,
    rgb: "52, 211, 153",
    kind: "scale",
  },
  "natural.astronomy.extragalactic": {
    exponent: 23,
    scaleLabel: "10²²–10²⁵ m",
    icon: Aperture,
    rgb: "192, 132, 252",
    kind: "scale",
  },
  "natural.astronomy.cosmology": {
    exponent: 26,
    scaleLabel: "~10²⁶ m",
    icon: Sigma,
    rgb: "244, 114, 182",
    kind: "scale",
  },
  "natural.astronomy.methods": {
    icon: Eye,
    rgb: "96, 165, 250",
    kind: "method",
  },
};

const LIGHT_TIMES: LightTravelExample[] = [
  {
    id: "moon",
    label: "Moon",
    travelTime: "1.3 seconds",
    distance: "384,400 km",
    note: "When you look at the Moon, you see its surface roughly 1.3 seconds in the past.",
    accentRgb: "203, 213, 225",
  },
  {
    id: "sun",
    label: "Sun",
    travelTime: "8 min 20 sec",
    distance: "1 AU",
    note: "Sunlight reaching Earth left the solar surface more than eight minutes earlier.",
    accentRgb: "250, 204, 21",
  },
  {
    id: "proxima",
    label: "Proxima Centauri",
    travelTime: "4.24 years",
    distance: "4.24 light-years",
    note: "The nearest star beyond the Sun is already seen years in the past.",
    accentRgb: "248, 113, 113",
  },
  {
    id: "andromeda",
    label: "Andromeda Galaxy",
    travelTime: "~2.5 million years",
    distance: "~2.5 million light-years",
    note: "The Andromeda Galaxy appears as it was long before Homo sapiens built cities or written archives.",
    accentRgb: "167, 139, 250",
  },
  {
    id: "cmb",
    label: "Cosmic microwave background",
    travelTime: "~13.8 billion years",
    distance: "early universe",
    note: "The oldest light we can observe was released when the universe first became transparent, about 380,000 years after the Big Bang.",
    accentRgb: "34, 211, 238",
  },
];

export default function AstronomyHub() {
  const context = requireCurriculumPageContext(NODE_ID);
  const scaleNodes: ScaleNode[] = context.children
    .filter((child) => META[child.id]?.kind === "scale")
    .map((child) => {
      const meta = META[child.id];
      return {
        id: child.id,
        label: child.label,
        exponent: meta.exponent ?? 7,
        scaleLabel: meta.scaleLabel ?? "",
        summary: child.description ?? "",
        accentRgb: meta.rgb,
        href: child.href,
        status: child.status === "placeholder" ? "planned" : "active",
      };
    });

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#02030a] text-slate-100 selection:bg-violet-400/25">
      <DeepFieldBackground />

      <div className="relative z-10 mx-auto w-full max-w-[1540px] px-4 pb-14 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.06] bg-[#02030a]/78 px-4 pb-3 pt-5 shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={[
              { label: "Natural Science", href: "/natural-science" },
              { label: "Astronomy" },
            ]}
            eyebrow="Worlds · stars · galaxies · universe · evidence"
            eyebrowStyle="dot"
            icon={Telescope}
            title={<span>Astronomy</span>}
            subtitle="Astronomy is organized by two different questions: what scale of the universe are we studying, and how can distant signals be turned into evidence? Keep those dimensions distinct and the field becomes much easier to navigate."
            accentRgb="167, 139, 250"
            titleClassName="font-sans text-[clamp(2.9rem,5.6vw,6.4rem)] font-semibold leading-[0.82] tracking-[-0.068em] text-[#faf9ff]"
            headerClassName="border-white/[0.08]"
          />
        </div>

        <section className="mt-5 grid gap-4 lg:grid-cols-2">
          <OrientationCard
            icon={Maximize2}
            label="Objects & scale"
            question="What kind of system are we trying to explain?"
            text="Planetary, stellar, galactic, extragalactic, and cosmological astronomy are primarily distinguished by the scale and kind of object under study."
            rgb="167, 139, 250"
          />
          <OrientationCard
            icon={Eye}
            label="Methods"
            question="How can we know anything about something so far away?"
            text="Observation and theory are cross-cutting methods. Astronomers use both at every scale, from nearby planets to the early universe."
            rgb="34, 211, 238"
          />
        </section>

        <section className="mt-5">
          <CosmicScaleTopology nodes={scaleNodes} />
        </section>

        <section className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)]">
          <MethodLens />
          <div className="rounded-[28px] border border-white/[0.08] bg-black/[0.13] p-5 backdrop-blur-xl sm:p-6">
            <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-200/65">The remote-sensing constraint</div>
            <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.04em] text-white">Astronomy cannot usually touch the thing it studies.</h2>
            <p className="mt-3 text-[11px] leading-6 text-slate-400">
              Most astronomical knowledge comes from information that arrives at the observer: electromagnetic radiation, particles, gravitational waves, positions, and timing. The job is to infer physical properties from those signals without confusing the measurement with the object itself.
            </p>
            <div className="mt-5 space-y-2">
              <SignalStep number="01" label="Source" text="A physical system produces light, particles, motion, or spacetime disturbances." />
              <SignalStep number="02" label="Travel" text="The signal crosses space and may be redshifted, absorbed, scattered, or delayed." />
              <SignalStep number="03" label="Instrument" text="A detector converts the arriving signal into measurements with finite resolution and noise." />
              <SignalStep number="04" label="Inference" text="Models connect those measurements back to temperature, mass, composition, distance, motion, and history." />
            </div>
          </div>
        </section>

        <section className="mt-5">
          <LightTravelTime examples={LIGHT_TIMES} />
        </section>
      </div>
    </main>
  );
}

function OrientationCard({
  icon: Icon,
  label,
  question,
  text,
  rgb,
}: {
  icon: LucideIcon;
  label: string;
  question: string;
  text: string;
  rgb: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-[28px] border bg-black/[0.12] p-5 shadow-[0_25px_90px_rgba(0,0,0,0.20)] backdrop-blur-xl sm:p-6" style={{ borderColor: `rgba(${rgb},0.13)` }}>
      <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full blur-[45px]" style={{ background: `rgba(${rgb},0.09)` }} />
      <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-[14px] border" style={{ color: `rgb(${rgb})`, borderColor: `rgba(${rgb},0.22)`, background: `rgba(${rgb},0.04)` }}><Icon size={18} /></span>
      <div className="relative z-10 mt-5 font-mono text-[8px] font-semibold uppercase tracking-[0.14em]" style={{ color: `rgba(${rgb},0.68)` }}>{label}</div>
      <h2 className="relative z-10 mt-1 text-[20px] font-semibold tracking-[-0.03em] text-white">{question}</h2>
      <p className="relative z-10 mt-2 max-w-2xl text-[10px] leading-5 text-slate-500">{text}</p>
    </div>
  );
}

function SignalStep({ number, label, text }: { number: string; label: string; text: string }) {
  return (
    <div className="grid grid-cols-[34px_90px_1fr] items-start gap-3 rounded-[15px] border border-white/[0.06] bg-white/[0.012] p-3">
      <span className="font-mono text-[8px] text-violet-200/42">{number}</span>
      <strong className="text-[9px] text-slate-300">{label}</strong>
      <p className="text-[8px] leading-4 text-slate-700">{text}</p>
    </div>
  );
}
