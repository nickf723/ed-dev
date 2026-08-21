import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Atom,
  Bug,
  Dna,
  Globe2,
  HeartPulse,
  Leaf,
  Microscope,
  PawPrint,
  Sparkles,
  Sprout,
  type LucideIcon,
} from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import type { CurriculumBreadcrumb } from "@/lib/curriculum/page-context";
import DnaBackground from "../DnaBackground";
import BiologyEvidenceReview from "../BiologyEvidenceReview";
import MagnificationBench from "../MagnificationBench";
import {
  BIOLOGY_RECURRING_THEMES,
  BIOLOGY_SCALE_BANDS,
  type BiologyScaleBand,
} from "../biologyModel";

export type BiologyHubNode = {
  id: string;
  label: string;
  href: string;
  description?: string;
  status?: "active" | "placeholder";
};

type DisciplineMeta = { icon: LucideIcon; rgb: string; short: string };
type ResolvedNode = BiologyHubNode & DisciplineMeta;

const META: Record<string, DisciplineMeta> = {
  "natural.biology.cytology": {
    icon: Microscope,
    rgb: "34, 211, 238",
    short: "Cells",
  },
  "natural.biology.genetics": {
    icon: Dna,
    rgb: "168, 85, 247",
    short: "Inheritance",
  },
  "natural.biology.molecular": {
    icon: Atom,
    rgb: "96, 165, 250",
    short: "Molecules",
  },
  "natural.biology.microbiology": {
    icon: Bug,
    rgb: "45, 212, 191",
    short: "Microbes",
  },
  "natural.biology.mycology": {
    icon: Sprout,
    rgb: "192, 132, 252",
    short: "Fungi",
  },
  "natural.biology.botany": {
    icon: Leaf,
    rgb: "132, 204, 22",
    short: "Plants",
  },
  "natural.biology.zoology": {
    icon: PawPrint,
    rgb: "251, 146, 60",
    short: "Animals",
  },
  "natural.biology.anatomy": {
    icon: HeartPulse,
    rgb: "251, 113, 133",
    short: "Body systems",
  },
  "natural.biology.ecology": {
    icon: Globe2,
    rgb: "52, 211, 153",
    short: "Ecosystems",
  },
  "natural.biology.evolution": {
    icon: Activity,
    rgb: "250, 204, 21",
    short: "Generational change",
  },
};

const BIOLOGY_SOURCES = [
  {
    label: "NCBI Taxonomy & Datasets",
    eyebrow: "Names · ranks · TaxIds · sequences",
    href: "https://www.ncbi.nlm.nih.gov/datasets/docs/v2/data-processing/taxonomy-processing/taxonomy/",
    boundary:
      "A curated classification framework for organisms represented in sequence databases. Retain TaxId, current name, synonyms, rank, lineage, release context, and linked record type; classification is revisable and approximately phylogenetic.",
    rgb: "34,211,238",
  },
  {
    label: "GBIF occurrence API",
    eyebrow: "Specimens · observations · place · time",
    href: "https://techdocs.gbif.org/en/openapi/v1/occurrence",
    boundary:
      "An occurrence record supports a claim that an organism was recorded under stated evidence, identification, place, time, dataset, license, and quality flags. It is not automatically a population estimate or proof of absence elsewhere.",
    rgb: "52,211,153",
  },
  {
    label: "Open Tree of Life",
    eyebrow: "Synthetic phylogeny · source trees · release",
    href: "https://tree.opentreeoflife.org/about/open-tree-of-life",
    boundary:
      "A synthesis of published phylogenetic trees and taxonomy. Retain synthesis release, taxonomy version, node identity, supporting studies, conflict, branch annotations, and citation; topology is a revisable hypothesis, not a ladder of progress.",
    rgb: "132,204,22",
  },
] as const;

function resolveNode(
  byId: Map<string, BiologyHubNode>,
  id: string
): ResolvedNode {
  const node = byId.get(id);
  const meta = META[id];
  if (!node || !meta) throw new Error(`Biology hub node ${id} is incomplete.`);
  return { ...node, ...meta };
}

export default function BiologyHub({
  nodes,
  breadcrumbs,
}: {
  nodes: readonly BiologyHubNode[];
  breadcrumbs: readonly CurriculumBreadcrumb[];
}) {
  const byId = new Map(nodes.map((node) => [node.id, node]));
  const bands = BIOLOGY_SCALE_BANDS.map((band) => ({
    ...band,
    nodes: band.nodeIds.map((id) => resolveNode(byId, id)),
  }));
  const evolution = resolveNode(byId, "natural.biology.evolution");

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#020b06] text-stone-100 selection:bg-emerald-400/30">
      <DnaBackground />
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_12%_14%,rgba(34,197,94,0.15),transparent_27%),radial-gradient(circle_at_88%_70%,rgba(34,211,238,0.08),transparent_30%),linear-gradient(to_bottom,rgba(2,12,7,0.04),rgba(1,7,4,0.76))]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.13] [background-image:radial-gradient(circle_at_center,rgba(187,247,208,0.24)_1px,transparent_1.2px)] [background-size:38px_38px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1540px] px-4 pb-12 pt-4 sm:px-6 lg:px-8 lg:pt-5">
        <DomainPageHeader
          breadcrumbs={breadcrumbs}
          eyebrow="Life across scale"
          icon={Dna}
          accentRgb="34, 197, 94"
          title="Biology"
          titleClassName="text-[clamp(3.4rem,6vw,6.4rem)] font-semibold leading-[0.84] tracking-[-0.064em] text-[#f5fff7] drop-shadow-[0_0_30px_rgba(34,197,94,0.11)]"
          subtitle="Zoom from molecules to cells, organisms, populations, and ecosystems. Biology changes its tools as scale changes, while the same living processes keep connecting the whole system."
          aside={
            <div className="hidden min-w-[250px] text-right sm:block">
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-300/55">
                Observation scale
              </div>
              <div className="mt-2 flex items-center justify-end gap-2 font-mono text-[11px] uppercase tracking-[0.11em] text-stone-400">
                <span>molecules</span>
                <span className="h-px w-12 bg-gradient-to-r from-violet-400/60 via-cyan-400/60 to-emerald-400/60" />
                <span>biosphere</span>
              </div>
            </div>
          }
        />

        <section className="bg-[#020a06]/58 relative mt-8 overflow-hidden rounded-[34px] border border-emerald-300/[0.12] shadow-[0_30px_100px_rgba(0,0,0,0.28)] backdrop-blur-xl">
          <div
            className="pointer-events-none absolute -right-24 -top-28 h-[390px] w-[390px] rounded-full border border-emerald-300/[0.06]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -right-6 -top-12 h-[250px] w-[250px] rounded-full border border-cyan-300/[0.07]"
            aria-hidden="true"
          />

          <div className="relative grid gap-5 border-b border-white/[0.07] px-5 py-6 sm:px-7 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-end lg:px-8 lg:py-7">
            <div>
              <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.17em] text-emerald-300/65">
                <Microscope size={13} aria-hidden="true" /> Scale atlas
              </div>
              <h2 className="mt-2 max-w-4xl text-[clamp(2rem,4vw,4rem)] font-semibold leading-[0.92] tracking-[-0.052em] text-white">
                Biology is a zoom lens on the same living world.
              </h2>
            </div>
            <p className="max-w-xl text-[13px] leading-6 text-stone-400 lg:text-[14px]">
              Start at the scale of the system you want to explain. The fields
              overlap because living systems cross boundaries constantly.
            </p>
          </div>

          <div className="relative">
            <div
              className="pointer-events-none absolute bottom-0 left-[78px] top-0 hidden w-px bg-gradient-to-b from-violet-400/35 via-cyan-400/35 via-lime-400/35 to-emerald-400/35 lg:block"
              aria-hidden="true"
            />
            {bands.map((band, index) => (
              <ScaleBandRow key={band.id} band={band} index={index} />
            ))}
          </div>
        </section>

        <EvolutionRail node={evolution} />

        <section className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 rounded-[20px] border border-white/[0.07] bg-black/[0.14] px-5 py-4 backdrop-blur-md sm:px-6">
          <div className="mr-auto flex items-center gap-2 text-[11px] text-stone-400">
            <Sparkles size={13} className="text-emerald-300/70" /> Recurring at
            every scale
          </div>
          {BIOLOGY_RECURRING_THEMES.map((theme) => (
            <span
              key={theme}
              className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-100/55"
            >
              {theme}
            </span>
          ))}
        </section>

        <section className="mt-24">
          <MagnificationBench />
        </section>

        <section className="mt-24">
          <BiologyEvidenceReview />
        </section>

        <section className="mt-24 border-t border-emerald-100/[0.10] pb-6 pt-7">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end">
            <div className="rounded-[18px] bg-[#03110b]/[0.18] px-4 py-3 backdrop-blur-[14px]">
              <div className="text-cyan-100/58 font-mono text-[11px] font-semibold uppercase tracking-[0.10em]">
                Living records · identity, occurrence, relationship
              </div>
              <h2 className="mt-2 max-w-4xl text-[clamp(1.8rem,3.2vw,3rem)] font-semibold leading-[0.96] tracking-[-0.048em] text-white">
                A name, a sighting, and a branch point are three different kinds
                of biological record.
              </h2>
            </div>
            <p className="rounded-[16px] bg-[#03110b]/[0.18] px-4 py-3 text-[13px] leading-6 text-stone-400/75 backdrop-blur-[14px]">
              These sources establish collection boundaries for future biology
              repositories. The root performs no render-time fetch, and no one
              provider is treated as a complete tree of life, abundance census,
              or final taxonomic authority for every group.
            </p>
          </div>
          <div className="mt-6 grid gap-3 lg:grid-cols-3">
            {BIOLOGY_SOURCES.map((source) => (
              <BiologySource key={source.label} source={source} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function ScaleBandRow({
  band,
  index,
}: {
  band: BiologyScaleBand & { nodes: ResolvedNode[] };
  index: number;
}) {
  return (
    <section
      className={`relative grid gap-4 px-5 py-6 sm:px-7 lg:grid-cols-[125px_300px_minmax(0,1fr)] lg:gap-6 lg:px-8 lg:py-7 ${index ? "border-t border-white/[0.065]" : ""}`}
    >
      <div className="relative flex items-center gap-3 lg:block">
        <div
          className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-[#06110a] font-mono text-[11px] font-semibold lg:ml-[30px]"
          style={{
            color: `rgb(${band.rgb})`,
            borderColor: `rgba(${band.rgb},0.34)`,
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>
        <div
          className="font-mono text-[11px] uppercase tracking-[0.14em] lg:mt-3 lg:text-center"
          style={{ color: `rgba(${band.rgb},0.64)` }}
        >
          {band.measure}
        </div>
      </div>

      <div>
        <div
          className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em]"
          style={{ color: `rgba(${band.rgb},0.66)` }}
        >
          {band.eyebrow}
        </div>
        <h3 className="mt-1 text-[22px] font-semibold tracking-[-0.035em] text-white sm:text-[24px]">
          {band.title}
        </h3>
        <p className="mt-2 max-w-md text-[13px] leading-6 text-stone-500">
          {band.description}
        </p>
      </div>

      <nav
        aria-label={`${band.title} biology fields`}
        className="grid gap-x-7 sm:grid-cols-2"
      >
        {band.nodes.map((node) => (
          <DisciplineLink key={node.id} node={node} />
        ))}
      </nav>
    </section>
  );
}

function DisciplineLink({ node }: { node: ResolvedNode }) {
  const Icon = node.icon;
  const planned = node.status === "placeholder";
  const className = `group flex min-h-[84px] items-center gap-3 border-b px-1 py-3 transition-colors ${planned ? "cursor-default border-white/[0.045] opacity-45" : "border-white/[0.07] hover:bg-white/[0.025]"}`;
  const content = (
    <>
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] border"
        style={{
          color: `rgb(${node.rgb})`,
          borderColor: `rgba(${node.rgb},0.22)`,
          background: `rgba(${node.rgb},0.055)`,
        }}
      >
        <Icon size={17} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <strong className="text-[13px] font-semibold text-stone-100">
            {node.label}
          </strong>
          {planned ? (
            <span className="font-mono text-[11px] uppercase tracking-[0.11em] text-stone-600">
              planned
            </span>
          ) : null}
        </span>
        <span
          className="mt-0.5 block font-mono text-[11px] uppercase tracking-[0.11em]"
          style={{ color: `rgba(${node.rgb},0.62)` }}
        >
          {node.short}
        </span>
        <span className="mt-1 block text-[11px] leading-4 text-stone-500">
          {node.description}
        </span>
      </span>
      {!planned ? (
        <ArrowRight
          size={13}
          className="shrink-0 transition-transform group-hover:translate-x-1"
          style={{ color: `rgba(${node.rgb},0.62)` }}
        />
      ) : null}
    </>
  );
  return planned ? (
    <div className={className} aria-label={`${node.label}, planned`}>
      {content}
    </div>
  ) : (
    <Link
      href={node.href}
      className={`${className} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200/60`}
    >
      {content}
    </Link>
  );
}

function EvolutionRail({ node }: { node: ResolvedNode }) {
  const Icon = node.icon;
  const planned = node.status === "placeholder";
  const inner = (
    <div className="grid gap-4 rounded-[26px] border border-yellow-300/[0.14] bg-[linear-gradient(100deg,rgba(250,204,21,0.075),rgba(8,13,7,0.62)_46%,rgba(34,197,94,0.05))] px-5 py-5 backdrop-blur-lg sm:px-7 lg:grid-cols-[125px_300px_minmax(0,1fr)_auto] lg:items-center lg:gap-6 lg:px-8">
      <div className="flex items-center gap-3 lg:justify-center">
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-yellow-300/30 bg-yellow-300/[0.07] text-yellow-200">
          <Icon size={17} />
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-yellow-200/55 lg:hidden">
          all scales
        </span>
      </div>
      <div>
        <div className="text-yellow-200/62 font-mono text-[11px] font-semibold uppercase tracking-[0.16em]">
          Cross-scale process
        </div>
        <h3 className="mt-1 text-[22px] font-semibold tracking-[-0.035em] text-white">
          Evolution crosses the whole atlas.
        </h3>
      </div>
      <p className="max-w-2xl text-[13px] leading-6 text-stone-400">
        Inheritance begins within organisms, selection acts on populations, and
        change accumulates across generations. Evolution links every biological
        scale.
      </p>
      <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-yellow-200/70">
        {planned ? (
          "planned field"
        ) : (
          <>
            open evolution <ArrowRight size={13} />
          </>
        )}
      </div>
    </div>
  );
  return planned ? (
    <div className="mt-4 opacity-55">{inner}</div>
  ) : (
    <Link
      href={node.href}
      className="group mt-4 block transition-transform hover:-translate-y-0.5"
    >
      {inner}
    </Link>
  );
}

function BiologySource({
  source,
}: {
  source: (typeof BIOLOGY_SOURCES)[number];
}) {
  return (
    <a
      href={source.href}
      target="_blank"
      rel="noreferrer"
      className="group grid min-h-[245px] grid-rows-[auto_auto_1fr] border border-white/[0.08] bg-[#03110b]/[0.22] px-5 py-5 backdrop-blur-[16px] transition hover:bg-[#03110b]/[0.38] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200/60"
      style={{ borderTopColor: `rgba(${source.rgb},0.38)` }}
    >
      <span
        className="font-mono text-[11px] font-semibold uppercase tracking-[0.09em]"
        style={{ color: `rgba(${source.rgb},0.70)` }}
      >
        {source.eyebrow}
      </span>
      <strong className="mt-3 flex items-center justify-between gap-3 text-[18px] text-white">
        {source.label}
        <ArrowRight
          size={14}
          className="transition group-hover:translate-x-1"
          aria-hidden="true"
        />
      </strong>
      <span className="mt-5 border-t border-white/[0.07] pt-4 text-[12px] leading-6 text-stone-500">
        {source.boundary}
      </span>
    </a>
  );
}
