import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import PhysicsBackground from "./_components/PhysicsBackground";
import {
  ArrowRight,
  Atom,
  Flame,
  Gauge,
  Hourglass,
  Microscope,
  Orbit,
  RefreshCw,
  Waves,
  Zap,
  type LucideIcon,
} from "lucide-react";

type PhysicsField = {
  title: string;
  description: string;
  note: string;
  href: string;
  icon: LucideIcon;
  rgb: string;
};

const CLASSICAL_FIELDS: readonly PhysicsField[] = [
  {
    title: "Mechanics",
    description: "Describe motion, identify interactions, and track energy and momentum through physical systems.",
    note: "motion · forces · energy",
    href: "/natural-science/physics/mechanics",
    icon: Orbit,
    rgb: "251, 146, 60",
  },
  {
    title: "Waves & Optics",
    description: "Study oscillation, propagation, interference, sound, light, reflection, refraction, and imaging.",
    note: "oscillation · light · sound",
    href: "/natural-science/physics/waves-optics",
    icon: Waves,
    rgb: "96, 165, 250",
  },
  {
    title: "Thermodynamics",
    description: "Connect microscopic motion to temperature, heat, internal energy, entropy, and macroscopic change.",
    note: "temperature · transfer · entropy",
    href: "/natural-science/physics/thermodynamics",
    icon: Flame,
    rgb: "248, 113, 113",
  },
  {
    title: "Electromagnetism",
    description: "Model charge, electric and magnetic fields, circuits, induction, and electromagnetic radiation.",
    note: "charge · fields · circuits",
    href: "/natural-science/physics/electromagnetism",
    icon: Zap,
    rgb: "34, 211, 238",
  },
] as const;

const MODERN_FIELDS: readonly PhysicsField[] = [
  {
    title: "Relativity",
    description: "Rebuild space, time, motion, and gravity when speed or gravitational curvature becomes significant.",
    note: "spacetime · speed · gravity",
    href: "/natural-science/physics/relativity",
    icon: Hourglass,
    rgb: "167, 139, 250",
  },
  {
    title: "Quantum Physics",
    description: "Describe states, amplitudes, quantization, uncertainty, measurement, and nonclassical behavior.",
    note: "states · probability · measurement",
    href: "/natural-science/physics/quantum-mechanics",
    icon: Atom,
    rgb: "232, 121, 249",
  },
  {
    title: "Atomic Physics",
    description: "Apply quantum theory to electron structure, spectra, energy levels, transitions, and atom-light interactions.",
    note: "electrons · spectra · photons",
    href: "/natural-science/physics/atomic",
    icon: RefreshCw,
    rgb: "52, 211, 153",
  },
  {
    title: "Nuclear Physics",
    description: "Study nuclei, binding energy, radioactivity, fission, fusion, and nuclear reactions.",
    note: "nuclei · decay · reactions",
    href: "/natural-science/physics/nuclear",
    icon: Microscope,
    rgb: "244, 114, 182",
  },
] as const;

export default function PhysicsPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#03070d] text-slate-100 selection:bg-cyan-400/25">
      <PhysicsBackground mode="overview" />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_50%_18%,rgba(56,189,248,0.07),transparent_34%)]" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-[1480px] px-4 pb-12 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.06] bg-[#03070d]/76 px-4 pb-3 pt-5 shadow-[0_18px_45px_rgba(0,0,0,0.18)] backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={[
              { label: "Natural Science", href: "/natural-science" },
              { label: "Physics" },
            ]}
            eyebrow="Matter · motion · energy · fields · spacetime"
            icon={Atom}
            title={<span>Physics</span>}
            subtitle="Physics builds models of the physical world. Begin with the regime that matches the system: familiar macroscopic conditions, or the high-speed, strong-gravity, atomic, and subatomic regimes where classical assumptions stop working."
            accentRgb="56, 189, 248"
            titleClassName="font-mono text-[clamp(2.6rem,4.6vw,5rem)] font-semibold uppercase leading-[0.86] tracking-[-0.058em] text-[#f7fbff]"
            headerClassName="border-white/[0.08]"
          />
        </div>

        <section className="mt-5 grid gap-5 xl:grid-cols-2">
          <RegimePanel
            kind="classical"
            title="Classical Physics"
            condition="ordinary speeds · macroscopic scales · weak gravity"
            description="Classical models describe most everyday systems extremely well. They treat motion, fields, waves, and bulk matter with continuous quantities and deterministic laws."
            fields={CLASSICAL_FIELDS}
          />

          <RegimePanel
            kind="modern"
            title="Modern Physics"
            condition="near-light speed · strong gravity · atomic and subatomic scales"
            description="Modern physics extends the classical picture when its assumptions fail. Relativity changes spacetime; quantum theory changes how physical states and measurements behave."
            fields={MODERN_FIELDS}
          />
        </section>

        <section className="mt-5 overflow-hidden rounded-[30px] border border-white/[0.09] bg-black/[0.08] shadow-[0_28px_90px_rgba(0,0,0,0.18)] backdrop-blur-md">
          <div className="grid lg:grid-cols-[310px_1fr]">
            <div className="border-b border-white/[0.07] p-6 lg:border-b-0 lg:border-r">
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-cyan-300/72">
                <Gauge size={13} /> Choosing a model
              </div>
              <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.035em] text-white">The conditions tell you which theory to use.</h2>
              <p className="mt-3 text-[12px] leading-6 text-slate-400">
                A newer theory does not make an older one useless. It explains where the older model works, and what must change outside that range.
              </p>
            </div>

            <div className="grid md:grid-cols-3">
              <ModelChoice
                icon={Orbit}
                question="Are speeds far below light speed and gravity relatively weak?"
                answer="Start with classical physics."
                detail="Mechanics, thermodynamics, electromagnetism, and waves cover most human-scale phenomena."
                rgb="251, 146, 60"
                edgeClass="border-b md:border-b-0 md:border-r"
              />
              <ModelChoice
                icon={Hourglass}
                question="Are speeds close to light speed, or is gravity strongly curving spacetime?"
                answer="Use relativity."
                detail="Special relativity handles inertial high-speed motion; general relativity handles gravity as geometry."
                rgb="167, 139, 250"
                edgeClass="border-b md:border-b-0 md:border-r"
              />
              <ModelChoice
                icon={Atom}
                question="Does the system depend on atoms, nuclei, photons, or quantized states?"
                answer="Use quantum physics."
                detail="Atomic and nuclear physics apply quantum rules to particular kinds of matter and interaction."
                rgb="232, 121, 249"
                edgeClass=""
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function RegimePanel({
  kind,
  title,
  condition,
  description,
  fields,
}: {
  kind: "classical" | "modern";
  title: string;
  condition: string;
  description: string;
  fields: readonly PhysicsField[];
}) {
  const classical = kind === "classical";
  const accent = classical ? "251, 146, 60" : "192, 132, 252";

  return (
    <section
      className="relative overflow-hidden rounded-[34px] border shadow-[0_34px_100px_rgba(0,0,0,0.20)]"
      style={{
        borderColor: `rgba(${accent},0.16)`,
        background: classical
          ? "linear-gradient(145deg, rgba(251,146,60,0.055), rgba(3,10,17,0.72) 48%, rgba(34,211,238,0.025))"
          : "linear-gradient(145deg, rgba(167,139,250,0.055), rgba(5,6,16,0.72) 48%, rgba(232,121,249,0.03))",
      }}
    >
      <RegimeArtwork kind={kind} />

      <div className="relative z-10 min-h-[190px] border-b border-white/[0.07] p-6 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em]" style={{ color: `rgba(${accent},0.78)` }}>
              {classical ? "Everyday regime" : "Extended regime"}
            </div>
            <h2 className="mt-2 text-[clamp(1.9rem,3vw,2.7rem)] font-semibold tracking-[-0.045em] text-white">{title}</h2>
          </div>
          <div
            className="max-w-[310px] rounded-full border px-4 py-2 text-right font-mono text-[9px] uppercase tracking-[0.10em] backdrop-blur-md"
            style={{ color: `rgba(${accent},0.72)`, borderColor: `rgba(${accent},0.13)`, background: `rgba(${accent},0.025)` }}
          >
            {condition}
          </div>
        </div>
        <p className="mt-4 max-w-3xl text-[13px] leading-6 text-slate-300/78">{description}</p>
      </div>

      <nav aria-label={`${title} fields`} className="relative z-10 grid sm:grid-cols-2">
        {fields.map((field, index) => (
          <FieldLink key={field.href} field={field} edgeClass={fieldEdgeClass(index)} />
        ))}
      </nav>
    </section>
  );
}

function FieldLink({ field, edgeClass }: { field: PhysicsField; edgeClass: string }) {
  const Icon = field.icon;

  return (
    <Link
      href={field.href}
      className={`group relative flex min-h-[205px] flex-col overflow-hidden p-5 transition-colors duration-300 sm:p-6 ${edgeClass}`}
      style={{ borderColor: "rgba(255,255,255,0.07)" }}
    >
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `radial-gradient(circle at 24% 20%, rgba(${field.rgb},0.105), transparent 56%)` }}
      />

      <div className="relative z-10 flex items-start justify-between gap-4">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-[15px] border"
          style={{ color: `rgb(${field.rgb})`, borderColor: `rgba(${field.rgb},0.23)`, background: `rgba(${field.rgb},0.055)`, boxShadow: `0 0 28px rgba(${field.rgb},0.08)` }}
        >
          <Icon size={19} />
        </div>
        <ArrowRight size={15} className="mt-2 text-slate-600 transition-transform duration-300 group-hover:translate-x-1" style={{ color: `rgba(${field.rgb},0.58)` }} />
      </div>

      <div className="relative z-10 mt-5">
        <h3 className="text-[19px] font-semibold tracking-[-0.025em] text-white">{field.title}</h3>
        <p className="mt-2 text-[12px] leading-5 text-slate-400">{field.description}</p>
      </div>

      <div className="relative z-10 mt-auto pt-5 font-mono text-[9px] uppercase tracking-[0.11em]" style={{ color: `rgba(${field.rgb},0.64)` }}>
        {field.note}
      </div>
    </Link>
  );
}

function RegimeArtwork({ kind }: { kind: "classical" | "modern" }) {
  if (kind === "classical") {
    return (
      <div className="pointer-events-none absolute inset-0 opacity-60" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(56,189,248,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.045) 1px, transparent 1px)",
            backgroundSize: "46px 46px",
            maskImage: "linear-gradient(135deg, black, transparent 72%)",
          }}
        />
        <svg viewBox="0 0 800 680" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          <path d="M50 190 C170 80 305 85 430 205 S650 330 760 180" fill="none" stroke="rgba(251,146,60,0.15)" strokeWidth="2" />
          <path d="M38 500 C120 440 180 560 260 500 S400 440 480 500 S640 560 770 470" fill="none" stroke="rgba(96,165,250,0.16)" strokeWidth="2" />
          <circle cx="590" cy="180" r="74" fill="none" stroke="rgba(34,211,238,0.11)" strokeWidth="1.5" />
          <circle cx="590" cy="180" r="118" fill="none" stroke="rgba(34,211,238,0.06)" strokeWidth="1" strokeDasharray="5 10" />
        </svg>
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 opacity-65" aria-hidden="true">
      <div
        className="absolute inset-0 opacity-45"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(232,121,249,0.13) 0 1px, transparent 1.5px)",
          backgroundSize: "31px 31px",
          maskImage: "linear-gradient(225deg, black, transparent 76%)",
        }}
      />
      <svg viewBox="0 0 800 680" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <path d="M400 82 L245 360 L555 360 Z" fill="rgba(167,139,250,0.022)" stroke="rgba(167,139,250,0.12)" strokeWidth="1.5" />
        <ellipse cx="590" cy="180" rx="122" ry="58" fill="none" stroke="rgba(52,211,153,0.11)" strokeWidth="1.5" transform="rotate(-24 590 180)" />
        <ellipse cx="590" cy="180" rx="122" ry="58" fill="none" stroke="rgba(232,121,249,0.08)" strokeWidth="1.5" transform="rotate(38 590 180)" />
        <circle cx="590" cy="180" r="9" fill="rgba(244,114,182,0.32)" />
        <path d="M80 530 C200 420 310 620 430 500 S650 420 760 550" fill="none" stroke="rgba(232,121,249,0.10)" strokeWidth="2" strokeDasharray="4 9" />
      </svg>
    </div>
  );
}

function ModelChoice({
  icon: Icon,
  question,
  answer,
  detail,
  rgb,
  edgeClass,
}: {
  icon: LucideIcon;
  question: string;
  answer: string;
  detail: string;
  rgb: string;
  edgeClass: string;
}) {
  return (
    <div className={`relative min-h-[245px] p-6 ${edgeClass}`} style={{ borderColor: "rgba(255,255,255,0.07)" }}>
      <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.13em]" style={{ color: `rgba(${rgb},0.68)` }}>
        <Icon size={13} /> condition
      </div>
      <p className="mt-4 text-[13px] font-medium leading-6 text-slate-300">{question}</p>
      <div className="mt-4 text-[17px] font-semibold" style={{ color: `rgba(${rgb},0.9)` }}>{answer}</div>
      <p className="mt-2 text-[11px] leading-5 text-slate-500">{detail}</p>
    </div>
  );
}

function fieldEdgeClass(index: number) {
  if (index === 0) return "border-b sm:border-r";
  if (index === 1) return "border-b";
  if (index === 2) return "border-b sm:border-b-0 sm:border-r";
  return "";
}
