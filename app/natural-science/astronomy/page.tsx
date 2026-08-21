import type { Metadata } from "next";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import SceneFrame from "@/app/_page-system/scene/SceneFrame";
import WorldWindow from "@/app/_page-system/scene/WorldWindow";
import ExpeditionRouteTopology, {
  type ExpeditionStop,
} from "@/app/_page-system/topologies/ExpeditionRouteTopology";
import LightTravelTime from "@/app/_page-system/widgets/LightTravelTime";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CircleDashed,
  Database,
  Eye,
  RadioTower,
  Satellite,
  Telescope,
} from "lucide-react";
import AstronomyEvidenceReview from "./AstronomyEvidenceReview";
import AstronomyRootBackground from "./AstronomyRootBackground";
import AstronomyScaleField from "./AstronomyScaleField";
import AstronomySignalLab from "./AstronomySignalLab";
import {
  ASTRONOMY_DIRECT_BRANCH_IDS,
  ASTRONOMY_LIGHT_TRAVEL_EXAMPLES,
  type AstronomyBranchId,
} from "./astronomyModel";

const NODE_ID = "natural.astronomy";

export const metadata: Metadata = {
  title: "Astronomy | Education Station 64",
  description:
    "Navigate astronomy by cosmic scale, then follow light and other messengers from distant sources through detectors into physical models.",
};

type AstronomyMeta = {
  scaleLabel?: string;
  icon: ExpeditionStop["icon"];
  scene: "local" | "galaxy" | "web";
  rgb: string;
  kind: "destination" | "method";
};

const META: Record<AstronomyBranchId, AstronomyMeta> = {
  "natural.astronomy.planetary": {
    scaleLabel: "worlds · moons · systems",
    icon: "orbit",
    scene: "local",
    rgb: "34, 211, 238",
    kind: "destination",
  },
  "natural.astronomy.stellar": {
    scaleLabel: "stars · formation · evolution",
    icon: "sparkles",
    scene: "local",
    rgb: "250, 204, 21",
    kind: "destination",
  },
  "natural.astronomy.galactic": {
    scaleLabel: "galaxies · structure · dynamics",
    icon: "aperture",
    scene: "galaxy",
    rgb: "52, 211, 153",
    kind: "destination",
  },
  "natural.astronomy.extragalactic": {
    scaleLabel: "populations · clusters · filaments",
    icon: "aperture",
    scene: "web",
    rgb: "192, 132, 252",
    kind: "destination",
  },
  "natural.astronomy.cosmology": {
    scaleLabel: "origin · expansion · whole universe",
    icon: "sigma",
    scene: "web",
    rgb: "244, 114, 182",
    kind: "destination",
  },
  "natural.astronomy.methods": {
    icon: "eye",
    scene: "local",
    rgb: "96, 165, 250",
    kind: "method",
  },
};

const ASTRONOMY_SCENES = [
  {
    id: "local",
    label: "Local systems",
    description: "Orbiting worlds, stellar motion, and nearby physical scale.",
    accentRgb: "34, 211, 238",
  },
  {
    id: "galaxy",
    label: "Galactic survey",
    description:
      "Differential rotation, dust, lensing, and stellar populations.",
    accentRgb: "167, 139, 250",
  },
  {
    id: "web",
    label: "Cosmic web",
    description: "Clusters and filaments emerging across the largest scales.",
    accentRgb: "244, 114, 182",
  },
] as const;

const ASTRONOMY_SOURCES = [
  {
    label: "MAST API",
    eyebrow: "Missions · observations · products · catalogs",
    href: "https://mast.stsci.edu/api/v0/",
    boundary:
      "A future archive can query mission observations and products by target, sky position, instrument, wavelength, time, and other documented fields. Preserve observation and product identifiers, mission and instrument, coordinates, exposure, calibration level, data rights, product URI, pagination, source URL, and retrieval time. A processed image is a data product, not an unmediated view of an object.",
    rgb: "34,211,238",
    icon: Satellite,
  },
  {
    label: "GWOSC API",
    eyebrow: "Runs · event catalogs · strain · data quality",
    href: "https://gwosc.org/api/",
    boundary:
      "The read-only public API can support a gravitational-wave event shelf. Retain catalog and event IDs, observing run, detector network, GPS time, parameter-estimation version, data-quality context, strain-product links, source URL, and retrieval time. A catalog parameter is a modeled estimate with uncertainty, not a direct photograph or a final interpretation detached from its analysis version.",
    rgb: "244,114,182",
    icon: RadioTower,
  },
  {
    label: "NASA ADS API",
    eyebrow: "Literature · search · metrics · exports",
    href: "https://ui.adsabs.harvard.edu/help/api/",
    boundary:
      "ADS can support a literature trail using stable bibliographic codes, titles, authors, publication dates, abstracts, citations, references, and links where supplied. It requires an API token and rate-aware caching. Bibliographic metadata and citation counts are not observational measurements, full-text permission, or automatic evidence of a claim’s quality.",
    rgb: "167,139,250",
    icon: BookOpen,
  },
] as const satisfies readonly {
  label: string;
  eyebrow: string;
  href: string;
  boundary: string;
  rgb: string;
  icon: LucideIcon;
}[];

export default function AstronomyHub() {
  const context = requireCurriculumPageContext(NODE_ID);

  if (context.pageKind !== "hub") {
    throw new Error("Astronomy must be classified as a navigation hub.");
  }

  const directIds = context.children.map((child) => child.id);
  if (
    directIds.length !== ASTRONOMY_DIRECT_BRANCH_IDS.length ||
    directIds.some((id, index) => id !== ASTRONOMY_DIRECT_BRANCH_IDS[index])
  ) {
    throw new Error(
      "Astronomy page branch navigation is out of sync with the curriculum registry."
    );
  }

  const destinations: ExpeditionStop[] = context.children
    .filter(
      (child) => META[child.id as AstronomyBranchId].kind === "destination"
    )
    .map((child) => {
      const meta = META[child.id as AstronomyBranchId];
      return {
        id: child.id,
        label: child.label,
        scaleLabel: meta.scaleLabel ?? "cosmic scale",
        summary: child.description ?? "",
        accentRgb: meta.rgb,
        icon: meta.icon,
        scene: meta.scene,
        href: child.href,
        status: child.status === "placeholder" ? "planned" : "active",
      };
    });
  const methods = context.children.find(
    (child) => META[child.id as AstronomyBranchId].kind === "method"
  );

  if (!methods) {
    throw new Error(
      "Astronomical Methods must remain a direct Astronomy branch."
    );
  }

  return (
    <SceneFrame
      background={<AstronomyRootBackground />}
      className="bg-[#010208] text-slate-100 selection:bg-violet-400/[0.25]"
      initialScene="local"
      maxWidthClassName="max-w-[1580px]"
      headerBackground="rgba(2,4,14,0.56)"
      header={
        <DomainPageHeader
          breadcrumbs={context.breadcrumbs}
          eyebrow="Cosmic scale · arriving signals · physical inference"
          eyebrowStyle="dot"
          icon={Telescope}
          title={<span>Astronomy</span>}
          subtitle="Travel outward from nearby worlds to the observable universe, then follow the evidence back through light, instruments, calibration, and physical models. Farther away also means earlier in the history carried by the signal."
          accentRgb="167, 139, 250"
          titleClassName="font-sans text-[clamp(3rem,5.8vw,6.6rem)] font-semibold leading-[0.82] tracking-[-0.068em] text-[#faf9ff]"
          headerClassName="border-white/[0.08]"
        />
      }
    >
      <section className="mt-6">
        <WorldWindow
          eyebrow="Direct branches · five scales crossed by shared methods"
          title="Choose a system by scale; carry the evidence cycle everywhere."
          description="Planetary, stellar, galactic, extragalactic, and cosmological astronomy move outward by physical scale. Astronomical Methods cuts across all five: no signal becomes a claim without a detector, calibration, comparison, and model."
          scenes={[...ASTRONOMY_SCENES]}
        >
          <div className="relative">
            <AstronomyScaleField />
            <div className="relative">
              <ExpeditionRouteTopology
                title="Choose a system by scale; carry the evidence cycle everywhere."
                description="Five branches move outward by system size. Methods remains the shared evidence route rather than a sixth size step."
                stops={destinations}
                presentation="world"
              />
            </div>
            <MethodsRail
              label={methods.label}
              description={methods.description ?? ""}
              href={methods.href}
              status={methods.status}
            />
          </div>
        </WorldWindow>
      </section>

      <section className="mt-24">
        <AstronomySignalLab
          methods={{
            href: methods.href,
            status: methods.status,
            description: methods.description ?? "",
          }}
        />
      </section>

      <section className="mt-24">
        <LightTravelTime examples={[...ASTRONOMY_LIGHT_TRAVEL_EXAMPLES]} />
      </section>

      <section className="mt-24">
        <AstronomyEvidenceReview />
      </section>

      <section className="mt-24 pb-8">
        <div className="border-y border-white/[0.09] py-7">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-violet-100/65">
            <Database size={14} aria-hidden="true" /> Future archive spine ·
            official interfaces, no render-time fetch
          </div>
          <h2 className="mt-2 max-w-5xl text-[clamp(2rem,3.7vw,3.6rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-white">
            Observations, events, and papers are different records.
          </h2>
          <p className="text-slate-300/68 mt-3 max-w-4xl text-[14px] leading-6">
            These official interfaces define a future multi-messenger
            repository. Provider facts keep their identifiers, versions, rights,
            uncertainty, and retrieval context; Education Station interpretation
            remains a separate layer.
          </p>

          <div className="mt-6 grid gap-3 lg:grid-cols-3">
            {ASTRONOMY_SOURCES.map((source) => (
              <AstronomySource key={source.label} source={source} />
            ))}
          </div>
        </div>
      </section>
    </SceneFrame>
  );
}

function MethodsRail({
  label,
  description,
  href,
  status,
}: {
  label: string;
  description: string;
  href: string;
  status?: "active" | "placeholder";
}) {
  const active = status === "active";
  const body = (
    <article className="grid gap-4 border-y border-blue-200/[0.14] bg-blue-300/[0.045] px-5 py-5 backdrop-blur-md md:grid-cols-[60px_minmax(0,1fr)_auto] md:items-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-200/25 bg-blue-300/[0.07] text-blue-100">
        <Eye size={20} aria-hidden="true" />
      </span>
      <span>
        <span className="text-blue-200/64 font-mono text-[11px] font-semibold uppercase tracking-[0.12em]">
          Shared across every scale · direct branch
        </span>
        <strong className="mt-1 block text-[18px] text-white">{label}</strong>
        <span className="text-slate-300/68 mt-1 block max-w-4xl text-[13px] leading-6">
          {description}
        </span>
      </span>
      <span className="inline-flex min-h-11 items-center gap-2 justify-self-start rounded-full border border-white/[0.09] px-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400 md:justify-self-end">
        {active ? (
          <>
            Open field <ArrowRight size={13} aria-hidden="true" />
          </>
        ) : (
          <>
            <CircleDashed size={13} aria-hidden="true" /> Planned field
          </>
        )}
      </span>
    </article>
  );

  return active ? (
    <Link
      href={href}
      className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200/60"
    >
      {body}
    </Link>
  ) : (
    <div aria-disabled="true">{body}</div>
  );
}

function AstronomySource({
  source,
}: {
  source: (typeof ASTRONOMY_SOURCES)[number];
}) {
  const Icon = source.icon;

  return (
    <a
      href={source.href}
      target="_blank"
      rel="noreferrer"
      className="bg-[#050817]/52 hover:bg-[#081025]/64 group border-x border-b border-t-2 border-white/[0.08] p-5 backdrop-blur-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/60"
      style={{ borderTopColor: `rgba(${source.rgb},0.42)` }}
    >
      <span
        className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.09em]"
        style={{ color: `rgba(${source.rgb},0.72)` }}
      >
        <Icon size={13} aria-hidden="true" /> {source.eyebrow}
      </span>
      <span className="mt-3 flex items-center justify-between gap-3 text-[18px] font-semibold text-white">
        {source.label}
        <ArrowUpRight
          size={14}
          className="text-white/35 transition group-hover:text-white/70"
          aria-hidden="true"
        />
      </span>
      <span className="mt-3 block text-[13px] leading-6 text-slate-400">
        {source.boundary}
      </span>
    </a>
  );
}
