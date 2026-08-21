import type { Metadata } from "next";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame } from "@/app/_page-system/scene";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import {
  ArrowRight,
  CloudRain,
  Database,
  Droplets,
  Gem,
  Globe2,
  Layers3,
  Map,
  Mountain,
  RefreshCw,
  Satellite,
  ThermometerSun,
  type LucideIcon,
} from "lucide-react";
import EarthScienceEvidenceReview from "./EarthScienceEvidenceReview";
import EarthSystemLedger from "./EarthSystemLedger";
import EarthSystemsBackground from "./EarthSystemsBackground";
import {
  EARTH_SCIENCE_BRANCH_IDS,
  MINERALOGY_NODE_ID,
  type EarthScienceBranchId,
} from "./earthScienceModel";

const NODE_ID = "natural.earth-science";

export const metadata: Metadata = {
  title: "Earth Science",
  description:
    "Study Earth as a coupled system of rock, minerals, water, atmosphere, climate, landforms, life, and processes across space and deep time.",
};

type BranchPresentation = {
  icon: LucideIcon;
  layer: string;
  cue: string;
  question: string;
  index: string;
  classes: {
    border: string;
    surface: string;
    icon: string;
    marker: string;
  };
};

const BRANCH_PRESENTATIONS: Record<
  EarthScienceBranchId,
  BranchPresentation
> = {
  "natural.earth-science.geology": {
    icon: Mountain,
    layer: "Solid Earth",
    cue: "rock · tectonics · deep time",
    question: "How does a moving planet build, transform, bury, and expose material?",
    index: "01",
    classes: {
      border: "border-orange-200/22",
      surface: "bg-orange-300/[0.035]",
      icon: "text-orange-200",
      marker: "bg-orange-300/70",
    },
  },
  "natural.earth-science.hydrology": {
    icon: Droplets,
    layer: "Hydrosphere",
    cue: "reservoir · flux · watershed",
    question: "Where is water stored, how does it move, and what redirects its path?",
    index: "02",
    classes: {
      border: "border-blue-200/22",
      surface: "bg-blue-300/[0.035]",
      icon: "text-blue-200",
      marker: "bg-blue-300/70",
    },
  },
  "natural.earth-science.meteorology": {
    icon: CloudRain,
    layer: "Atmosphere",
    cue: "energy · pressure · moisture",
    question: "How do gradients and fluid motion organize weather?",
    index: "03",
    classes: {
      border: "border-sky-200/22",
      surface: "bg-sky-300/[0.035]",
      icon: "text-sky-200",
      marker: "bg-sky-300/70",
    },
  },
  "natural.earth-science.geography": {
    icon: Map,
    layer: "Surface interface",
    cue: "landform · terrain · spatial pattern",
    question: "Why does a process leave this form and distribution in this place?",
    index: "04",
    classes: {
      border: "border-lime-200/22",
      surface: "bg-lime-300/[0.035]",
      icon: "text-lime-200",
      marker: "bg-lime-300/70",
    },
  },
  "natural.earth-science.climatology": {
    icon: ThermometerSun,
    layer: "Cross-system time",
    cue: "forcing · variability · feedback",
    question: "How do long-term distributions emerge and change across the system?",
    index: "05",
    classes: {
      border: "border-rose-200/22",
      surface: "bg-rose-300/[0.035]",
      icon: "text-rose-200",
      marker: "bg-rose-300/70",
    },
  },
};

const COUPLINGS = [
  {
    title: "Weathering & erosion",
    input: "rock + water + air + life",
    output: "sediment + dissolved material",
    detail:
      "Materials alter in place, move through slopes and channels, and accumulate where transport energy changes.",
    tone: "amber" as const,
  },
  {
    title: "Water & energy cycle",
    input: "ocean + land + atmosphere",
    output: "phase change + flow + heat exchange",
    detail:
      "Water changes reservoir and phase while transporting energy and material through the atmosphere, surface, ice, soils, life, and oceans.",
    tone: "sky" as const,
  },
  {
    title: "Tectonic relief",
    input: "interior energy + moving lithosphere",
    output: "uplift + volcanism + basins",
    detail:
      "Topography redirects water and air, exposes rock, reorganizes habitats, and supplies gradients for erosion and sedimentation.",
    tone: "orange" as const,
  },
  {
    title: "Climate feedback",
    input: "forcing + coupled reservoirs",
    output: "amplified or damped response",
    detail:
      "Atmosphere, ocean, ice, land, and life exchange energy and matter, so a response can alter the process that produced it.",
    tone: "rose" as const,
  },
] as const;

export default function EarthSciencePage() {
  const context = requireCurriculumPageContext(NODE_ID);

  if (context.pageKind !== "hub") {
    throw new Error("Earth Science must be classified as a navigation hub.");
  }

  assertBranchCoverage(context.children);

  return (
    <SceneFrame
      background={<EarthSystemsBackground />}
      className="bg-[#02090d] text-slate-100 selection:bg-cyan-300/25"
      maxWidthClassName="max-w-[1600px]"
      headerBackground="rgba(2,9,13,0.48)"
      header={
        <DomainPageHeader
          breadcrumbs={context.breadcrumbs}
          eyebrow="Rock · water · air · ice · life · space · deep time"
          eyebrowStyle="rule"
          icon={Globe2}
          title={<span>Earth Science</span>}
          subtitle="Earth Science reads one planet through coupled reservoirs and processes. Rock, minerals, water, atmosphere, ice, life, landforms, and climate exchange matter and energy across scales from crystals and storms to watersheds, plate cycles, and deep time."
          accentRgb="34, 211, 238"
          titleClassName="font-sans text-[clamp(2.9rem,5.5vw,6.2rem)] font-semibold leading-[0.84] tracking-[-0.067em] text-[#f0fdff]"
          headerClassName="border-cyan-100/[0.09]"
          aside={
            <div className="grid grid-cols-3 border border-cyan-100/[0.12] bg-black/20 font-mono">
              <HeaderMeasure value="5" label="fields" />
              <HeaderMeasure value="5" label="spheres" bordered />
              <HeaderMeasure value="1" label="planet" />
            </div>
          }
        />
      }
    >
      <section className="relative isolate mt-7 overflow-hidden border-y border-cyan-100/[0.12] py-6 sm:py-7">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(3,16,23,0.38),transparent_31%,transparent_73%,rgba(3,16,23,0.32))] backdrop-blur-[5px]" />
        <div className="relative grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
          <div className="rounded-[20px] bg-[#031017]/[0.25] px-4 py-3 backdrop-blur-[18px]">
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-cyan-200/68">
              <Layers3 size={14} aria-hidden="true" /> Primary navigation ·
              field transect
            </div>
            <h2 className="mt-2 max-w-5xl text-[clamp(1.9rem,3.8vw,3.8rem)] font-semibold leading-[0.94] tracking-[-0.052em] text-white">
              Enter through one field, then follow the exchange across the
              planet.
            </h2>
            <p className="mt-3 max-w-4xl text-[14px] leading-6 text-slate-300/75">
              The direct branches emphasize different materials, measurements,
              spaces, and clocks. Mineralogy now sits inside Geology at the
              material scale; Climatology crosses the entire system rather than
              forming another physical layer.
            </p>
          </div>
          <Link
            href={context.parent?.href ?? "/natural-science"}
            className="group flex items-center justify-between gap-4 border border-white/[0.08] bg-[#031017]/[0.34] px-4 py-4 backdrop-blur-[16px] transition hover:bg-[#031017]/[0.48] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/60"
          >
            <span>
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-500">
                Parent field
              </span>
              <strong className="mt-1 block text-[15px] text-white">
                {context.parent?.label ?? "Natural Science"}
              </strong>
            </span>
            <ArrowRight
              size={15}
              className="text-cyan-200/55 transition group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>

        <nav
          aria-label="Earth Science fields"
          className="relative mt-6 grid gap-3"
        >
          {context.children.map((child) => (
            <BranchBand key={child.id} child={child} />
          ))}
        </nav>
      </section>

      <section className="mt-24">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <div className="rounded-[18px] bg-[#031017]/[0.20] px-4 py-3 backdrop-blur-[14px]">
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-emerald-200/60">
              <RefreshCw size={14} aria-hidden="true" /> Coupled processes ·
              reference, not navigation
            </div>
            <h2 className="mt-2 max-w-5xl text-[clamp(1.9rem,3.5vw,3.5rem)] font-semibold leading-[0.94] tracking-[-0.052em] text-white">
              Most Earth-science explanations cross more than one branch.
            </h2>
          </div>
          <p className="rounded-[16px] bg-[#031017]/[0.20] px-4 py-3 text-[14px] leading-6 text-slate-400/78 backdrop-blur-[14px]">
            A disciplinary boundary identifies the measurements and mechanisms
            to emphasize. A system explanation reconnects those pieces without
            pretending every field uses the same methods or timescale.
          </p>
        </div>

        <div className="mt-6 grid border-y border-white/[0.08] md:grid-cols-2 xl:grid-cols-4">
          {COUPLINGS.map((coupling, index) => (
            <Coupling key={coupling.title} coupling={coupling} index={index} />
          ))}
        </div>
      </section>

      <section className="mt-24">
        <EarthSystemLedger />
      </section>

      <section className="mt-24">
        <EarthScienceEvidenceReview />
      </section>

      <section className="mt-20 grid gap-5 pb-8 lg:grid-cols-2">
        <div className="border-l border-sky-200/25 bg-sky-300/[0.025] px-5 py-5 backdrop-blur-xl">
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-sky-100/58">
            <Database size={13} aria-hidden="true" /> Observation repositories ·
            source data, not decoration
          </div>
          <p className="mt-2 text-[14px] leading-6 text-slate-400">
            Earth-system claims often combine satellite, station, field,
            laboratory, map, core, and model records. These official portals are
            future collection sources; this root currently uses only invented
            teaching fixtures and does not present live provider measurements.
          </p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[12px] font-semibold text-sky-100/70">
            <a
              href="https://science.nasa.gov/earth-science/research/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              NASA Earth-system research ↗
            </a>
            <a
              href="https://www.usgs.gov/water-science-school/science/water-pools-and-fluxes-data-tables"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              USGS water pools & fluxes ↗
            </a>
            <a
              href="https://www.ncei.noaa.gov/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              NOAA NCEI archive ↗
            </a>
          </div>
        </div>

        <div className="border-l border-emerald-200/25 bg-emerald-300/[0.025] px-5 py-5 backdrop-blur-xl">
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-100/58">
            <Satellite size={13} aria-hidden="true" /> Representation boundary ·
            model, map, and record
          </div>
          <p className="mt-2 text-[14px] leading-6 text-slate-400">
            The ridge-to-coast scenery, field stations, flux bars, and water
            budget are schematic. Real interpretation depends on location,
            interval, units, calibration, uncertainty, sampling design, spatial
            resolution, and a declared system boundary.
          </p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[12px] font-semibold text-emerald-100/70">
            <a
              href="https://oceanservice.noaa.gov/facts/weather_climate.html"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              NOAA weather vs. climate ↗
            </a>
            <a
              href="https://www.ncei.noaa.gov/products/land-based-station/us-climate-normals"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              NOAA climate normals ↗
            </a>
          </div>
          <p className="mt-4 text-[12px] leading-5 text-slate-600">
            The deeper Mineralogy route remains the curated Earth-material
            collection; this root does not duplicate its specimen cabinet.
          </p>
        </div>
      </section>
    </SceneFrame>
  );
}

function BranchBand({ child }: { child: CurriculumNode }) {
  const presentation =
    BRANCH_PRESENTATIONS[child.id as EarthScienceBranchId];
  const Icon = presentation.icon;
  const planned = child.status === "placeholder";

  return (
    <div
      className={`grid min-h-[132px] gap-4 border-l px-4 py-5 backdrop-blur-[16px] lg:grid-cols-[52px_minmax(0,1fr)_minmax(250px,0.68fr)] lg:items-center ${presentation.classes.border} ${presentation.classes.surface}`}
    >
      <span
        className={`flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.08] bg-black/20 ${presentation.classes.icon}`}
      >
        <Icon size={17} aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-slate-500">
            {presentation.layer} · {presentation.index}
          </span>
          <span className={`h-1.5 w-1.5 rounded-full ${presentation.classes.marker}`} />
        </span>
        <strong className="mt-1 block text-[18px] tracking-[-0.025em] text-white">
          {child.label}
        </strong>
        <span className="mt-1 block text-[13px] leading-5 text-slate-300/76">
          {presentation.question}
        </span>
        <span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.08em] text-slate-600">
          {presentation.cue}
        </span>
      </span>

      <div className="min-w-0 border-t border-white/[0.07] pt-4 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
        <p className="text-[12px] leading-5 text-slate-500">
          {child.description}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          {planned ? (
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-600">
              planned branch
            </span>
          ) : (
            <Link
              href={child.href}
              className={`group inline-flex items-center gap-2 text-[12px] font-semibold ${presentation.classes.icon} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/60`}
            >
              Open {child.label}
              <ArrowRight
                size={13}
                className="transition group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          )}
          {child.children?.map((nested) => (
            <Link
              key={nested.id}
              href={nested.href}
              className="group inline-flex items-center gap-2 rounded-full border border-fuchsia-200/15 bg-fuchsia-300/[0.035] px-3 py-1.5 text-[11px] font-semibold text-fuchsia-100/76 transition hover:bg-fuchsia-300/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-200/60"
            >
              <Gem size={12} aria-hidden="true" /> {nested.label}
              <ArrowRight
                size={11}
                className="transition group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          ))}
          {child.id === "natural.earth-science.geography" ? (
            <Link
              href="/social-science/geography"
              className="group inline-flex items-center gap-2 text-[11px] font-semibold text-violet-100/64 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-200/60"
            >
              Human Geography cross-link
              <ArrowRight
                size={11}
                className="transition group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}

type CouplingTone = (typeof COUPLINGS)[number]["tone"];

const COUPLING_TONES: Record<
  CouplingTone,
  { marker: string; label: string }
> = {
  amber: { marker: "bg-amber-300/70", label: "text-amber-100/68" },
  sky: { marker: "bg-sky-300/70", label: "text-sky-100/68" },
  orange: { marker: "bg-orange-300/70", label: "text-orange-100/68" },
  rose: { marker: "bg-rose-300/70", label: "text-rose-100/68" },
};

function Coupling({
  coupling,
  index,
}: {
  coupling: (typeof COUPLINGS)[number];
  index: number;
}) {
  const tone = COUPLING_TONES[coupling.tone];

  return (
    <article className="min-h-[250px] border-b border-white/[0.07] bg-[#031017]/[0.14] px-5 py-5 backdrop-blur-[12px] md:border-r md:[&:nth-child(2n)]:border-r-0 xl:border-b-0 xl:[&:nth-child(2n)]:border-r xl:last:border-r-0">
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[10px] text-slate-600">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className={`h-2 w-2 rounded-full ${tone.marker}`} />
      </div>
      <h3 className="mt-5 text-[16px] font-semibold text-white">
        {coupling.title}
      </h3>
      <div className={`mt-3 font-mono text-[11px] leading-5 ${tone.label}`}>
        {coupling.input}
        <br />
        <span className="text-slate-600">↓</span>
        <br />
        {coupling.output}
      </div>
      <p className="mt-3 text-[13px] leading-5 text-slate-500">
        {coupling.detail}
      </p>
    </article>
  );
}

function HeaderMeasure({
  value,
  label,
  bordered = false,
}: {
  value: string;
  label: string;
  bordered?: boolean;
}) {
  return (
    <div
      className={`px-3 py-3 text-center ${
        bordered ? "border-x border-cyan-100/[0.10]" : ""
      }`}
    >
      <strong className="block text-[18px] text-cyan-100">{value}</strong>
      <span className="mt-1 block text-[9px] uppercase tracking-[0.08em] text-slate-600">
        {label}
      </span>
    </div>
  );
}

function assertBranchCoverage(children: readonly CurriculumNode[]) {
  const childIds = children.map((child) => child.id);
  const exact =
    childIds.length === EARTH_SCIENCE_BRANCH_IDS.length &&
    childIds.every((id, index) => id === EARTH_SCIENCE_BRANCH_IDS[index]);

  if (!exact) {
    throw new Error(
      `Earth Science branch presentation must match the curriculum registry. Expected ${EARTH_SCIENCE_BRANCH_IDS.join(", ")}; received ${childIds.join(", ")}.`,
    );
  }

  const geology = children.find(
    (child) => child.id === "natural.earth-science.geology",
  );
  const geologyChildren = geology?.children?.map((child) => child.id) ?? [];
  if (
    geologyChildren.length !== 1 ||
    geologyChildren[0] !== MINERALOGY_NODE_ID
  ) {
    throw new Error(
      `Geology must contain exactly the Mineralogy child. Received ${geologyChildren.join(", ")}.`,
    );
  }
}
