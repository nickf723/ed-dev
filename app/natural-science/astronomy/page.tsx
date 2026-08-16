import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import GalacticExpeditionBackground from "@/app/_page-system/backgrounds/GalacticExpeditionBackground";
import ExpeditionRouteTopology, {
  type ExpeditionStop,
} from "@/app/_page-system/topologies/ExpeditionRouteTopology";
import LightTravelTime, {
  type LightTravelExample,
} from "@/app/_page-system/widgets/LightTravelTime";
import MethodLens from "@/app/_page-system/widgets/MethodLens";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import {
  Aperture,
  ArrowRight,
  Eye,
  Gauge,
  Orbit,
  Radio,
  Sigma,
  Sparkles,
  Telescope,
  Waves,
  type LucideIcon,
} from "lucide-react";

const NODE_ID = "natural.astronomy";

type AstronomyMeta = {
  scaleLabel?: string;
  icon: LucideIcon;
  rgb: string;
  kind: "destination" | "method";
};

const META: Record<string, AstronomyMeta> = {
  "natural.astronomy.planetary": {
    scaleLabel: "10⁶–10⁹ m",
    icon: Orbit,
    rgb: "34, 211, 238",
    kind: "destination",
  },
  "natural.astronomy.stellar": {
    scaleLabel: "10⁸–10¹³ m",
    icon: Sparkles,
    rgb: "250, 204, 21",
    kind: "destination",
  },
  "natural.astronomy.galactic": {
    scaleLabel: "~10²¹ m",
    icon: Aperture,
    rgb: "52, 211, 153",
    kind: "destination",
  },
  "natural.astronomy.extragalactic": {
    scaleLabel: "10²²–10²⁵ m",
    icon: Aperture,
    rgb: "192, 132, 252",
    kind: "destination",
  },
  "natural.astronomy.cosmology": {
    scaleLabel: "~10²⁶ m",
    icon: Sigma,
    rgb: "244, 114, 182",
    kind: "destination",
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
    note: "Andromeda appears as it was long before written history.",
    accentRgb: "167, 139, 250",
  },
  {
    id: "cmb",
    label: "Cosmic microwave background",
    travelTime: "~13.8 billion years",
    distance: "early universe",
    note: "The oldest observable light was released when the universe first became transparent.",
    accentRgb: "34, 211, 238",
  },
];

export default function AstronomyHub() {
  const context = requireCurriculumPageContext(NODE_ID);
  const destinations: ExpeditionStop[] = context.children
    .filter((child) => META[child.id]?.kind === "destination")
    .map((child) => {
      const meta = META[child.id];
      return {
        id: child.id,
        label: child.label,
        scaleLabel: meta.scaleLabel ?? "cosmic scale",
        summary: child.description ?? "",
        accentRgb: meta.rgb,
        icon: meta.icon,
        href: child.href,
        status: child.status === "placeholder" ? "planned" : "active",
      };
    });
  const methods = context.children.find(
    (child) => META[child.id]?.kind === "method",
  );

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#010208] text-slate-100 selection:bg-violet-400/25">
      <GalacticExpeditionBackground />

      <div className="relative z-10 mx-auto w-full max-w-[1580px] px-4 pb-14 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-cyan-100/[0.07] bg-[#02040e]/76 px-4 pb-3 pt-5 shadow-[0_18px_70px_rgba(0,0,0,0.34)] backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={[
              { label: "Natural Science", href: "/natural-science" },
              { label: "Astronomy" },
            ]}
            eyebrow="Mission route · cosmic scale · signals · inference"
            eyebrowStyle="dot"
            icon={Telescope}
            title={<span>Astronomy</span>}
            subtitle="Launch from nearby worlds and travel outward through stars, galaxies, large-scale structure, and the universe itself. Every destination is reached through signals, instruments, and physical inference."
            accentRgb="167, 139, 250"
            titleClassName="font-sans text-[clamp(2.9rem,5.6vw,6.4rem)] font-semibold leading-[0.82] tracking-[-0.068em] text-[#faf9ff]"
            headerClassName="border-white/[0.08]"
          />
        </div>

        <section className="mt-5">
          <ExpeditionRouteTopology
            title="Plot a route through the observable universe."
            description="Planetary, stellar, galactic, extragalactic, and cosmological astronomy are the direct destinations. Their order communicates changing scale without pretending that methods are another kind of object."
            stops={destinations}
          />
        </section>

        <section className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
          <MissionBrief />
          {methods ? <InstrumentBay href={methods.href} status={methods.status} description={methods.description ?? ""} /> : null}
        </section>

        <section className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)]">
          <MethodLens />
          <SignalPipeline />
        </section>

        <section className="mt-5">
          <LightTravelTime examples={LIGHT_TIMES} />
        </section>
      </div>
    </main>
  );
}

function MissionBrief() {
  return (
    <article className="relative overflow-hidden rounded-[30px] border border-cyan-100/[0.11] bg-[#071020]/[0.78] p-6 shadow-[0_28px_100px_rgba(0,0,0,0.30)] sm:p-7">
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border border-cyan-100/[0.08]">
        <span className="absolute inset-8 rounded-full border border-cyan-100/[0.06]" />
        <span className="absolute inset-16 rounded-full border border-cyan-100/[0.05]" />
      </div>
      <div className="relative z-10 flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-cyan-100/60">
        <Gauge size={13} /> Mission brief
      </div>
      <h2 className="relative z-10 mt-2 max-w-3xl text-[clamp(1.7rem,3vw,2.8rem)] font-semibold leading-[0.96] tracking-[-0.045em] text-white">
        Scale changes the object, the timescale, and the useful model.
      </h2>
      <p className="relative z-10 mt-3 max-w-3xl text-[11px] leading-6 text-slate-300/52">
        The route is not merely a list of topics. Moving outward changes what counts as a system: a world becomes part of a planetary system, stars become a galaxy, galaxies become populations and filaments, and the whole observable universe becomes the object of study.
      </p>
      <div className="relative z-10 mt-5 grid gap-2 sm:grid-cols-3">
        <MissionFact label="Navigate by" value="physical scale" rgb="34, 211, 238" />
        <MissionFact label="Observe through" value="arriving signals" rgb="167, 139, 250" />
        <MissionFact label="Explain with" value="models + inference" rgb="244, 114, 182" />
      </div>
    </article>
  );
}

function InstrumentBay({
  href,
  status,
  description,
}: {
  href: string;
  status?: "active" | "placeholder";
  description: string;
}) {
  const active = status !== "placeholder";
  const body = (
    <article className={`group relative flex h-full min-h-[270px] flex-col overflow-hidden rounded-[30px] border p-6 shadow-[0_28px_100px_rgba(0,0,0,0.30)] sm:p-7 ${active ? "border-violet-100/[0.12] bg-[#100b28]/[0.82] transition hover:-translate-y-1 hover:border-violet-100/[0.22]" : "border-white/[0.06] bg-[#070913]/75 opacity-60"}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_84%_16%,rgba(139,92,246,0.18),transparent_34%)]" />
      <div className="relative z-10 flex items-start justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-[15px] border border-violet-200/[0.17] bg-violet-300/[0.055] text-violet-100"><Radio size={19} /></span>
        {active ? <ArrowRight size={15} className="mt-2 text-violet-100/30 transition group-hover:translate-x-1 group-hover:text-violet-100/70" /> : null}
      </div>
      <div className="relative z-10 mt-6 font-mono text-[8px] font-semibold uppercase tracking-[0.14em] text-violet-200/55">Cross-cutting methods</div>
      <h2 className="relative z-10 mt-1 text-[24px] font-semibold tracking-[-0.04em] text-white">Instrument bay</h2>
      <p className="relative z-10 mt-3 text-[10px] leading-5 text-slate-400/60">{description}</p>
      <span className="relative z-10 mt-auto pt-5 font-mono text-[7px] uppercase tracking-[0.10em] text-violet-200/40">{active ? "open astronomical methods" : "planned branch"}</span>
    </article>
  );
  return active ? <Link href={href}>{body}</Link> : body;
}

function SignalPipeline() {
  const steps = [
    { icon: Sparkles, label: "Source", text: "A system produces light, particles, motion, or spacetime disturbances.", rgb: "250, 204, 21" },
    { icon: Waves, label: "Travel", text: "The signal crosses space and may be shifted, absorbed, scattered, or delayed.", rgb: "34, 211, 238" },
    { icon: Telescope, label: "Detector", text: "An instrument converts the arriving signal into measurements with noise and finite resolution.", rgb: "167, 139, 250" },
    { icon: Sigma, label: "Inference", text: "Models connect measurements back to temperature, mass, composition, distance, motion, and history.", rgb: "244, 114, 182" },
  ];
  return (
    <article className="rounded-[30px] border border-white/[0.09] bg-[#050817]/[0.80] p-5 shadow-[0_28px_100px_rgba(0,0,0,0.28)] sm:p-6">
      <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-200/60">Signal pipeline</div>
      <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.04em] text-white">Astronomy usually cannot touch its subject.</h2>
      <p className="mt-3 text-[10px] leading-5 text-slate-400/55">The expedition advances by turning remote signals into evidence, not by confusing a detector reading with the distant object itself.</p>
      <div className="mt-5 space-y-2">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={step.label} className="grid grid-cols-[32px_42px_82px_1fr] items-start gap-3 rounded-[15px] border border-white/[0.06] bg-white/[0.012] p-3">
              <span className="font-mono text-[7px] text-slate-700">{String(index + 1).padStart(2, "0")}</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-[10px] border" style={{ color: `rgb(${step.rgb})`, borderColor: `rgba(${step.rgb},0.18)`, background: `rgba(${step.rgb},0.04)` }}><Icon size={13} /></span>
              <strong className="pt-1.5 text-[9px] text-slate-300">{step.label}</strong>
              <p className="pt-1 text-[8px] leading-4 text-slate-600">{step.text}</p>
            </div>
          );
        })}
      </div>
    </article>
  );
}

function MissionFact({ label, value, rgb }: { label: string; value: string; rgb: string }) {
  return (
    <div className="rounded-[15px] border border-white/[0.07] bg-black/[0.16] p-3">
      <div className="font-mono text-[7px] uppercase tracking-[0.10em] text-slate-700">{label}</div>
      <div className="mt-1 text-[11px] font-medium" style={{ color: `rgb(${rgb})` }}>{value}</div>
    </div>
  );
}
