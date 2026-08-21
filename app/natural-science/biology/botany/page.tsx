import type { Metadata } from "next";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame, Surface } from "@/app/_page-system/scene";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import {
  Archive,
  ArrowRight,
  Droplets,
  FlaskConical,
  Flower2,
  GitBranch,
  Leaf,
  Microscope,
  MoveUp,
  Network,
  Sprout,
  Sun,
  Trees,
  Wind,
  type LucideIcon,
} from "lucide-react";
import BotanyBackground from "./BotanyBackground";
import BotanyEvidenceLab from "./BotanyEvidenceLab";
import PhotosynthesisWidget from "./PhotosynthesisWidget";
import { BOTANY_BRANCH_IDS, type BotanyBranchId } from "./botanyModel";

const NODE_ID = "natural.biology.botany";

export const metadata: Metadata = {
  title: "Botany",
  description:
    "Study plants as integrated living systems through structure, physiology, reproduction, evolution, ecology, and collection methods.",
};

const BRANCH_PRESENTATION: Record<
  BotanyBranchId,
  { icon: LucideIcon; rgb: string; specimen: string }
> = {
  "natural.biology.botany.structure-development": {
    icon: Microscope,
    rgb: "74,222,128",
    specimen: "cell → tissue → organ → body",
  },
  "natural.biology.botany.physiology": {
    icon: Droplets,
    rgb: "34,211,238",
    specimen: "water → carbon → energy → response",
  },
  "natural.biology.botany.reproduction": {
    icon: Flower2,
    rgb: "244,114,182",
    specimen: "spore → gamete → embryo → dispersal",
  },
  "natural.biology.botany.diversity-evolution": {
    icon: GitBranch,
    rgb: "192,132,252",
    specimen: "evidence → lineage → trait change",
  },
  "natural.biology.botany.ecology": {
    icon: Trees,
    rgb: "134,239,172",
    specimen: "individual → population → community",
  },
  "natural.biology.botany.methods-collections": {
    icon: Archive,
    rgb: "251,191,36",
    specimen: "observe → preserve → identify → compare",
  },
};

const TRANSPORT = [
  {
    title: "Root interface",
    question: "What enters from soil and what limits uptake?",
    detail:
      "Roots interact with water, dissolved ions, soil structure, microbes, oxygen availability, and mycorrhizal partners. Uptake is selective and physiologically regulated.",
    icon: Sprout,
    rgb: "251,191,36",
  },
  {
    title: "Xylem",
    question: "How can water move from roots toward leaves?",
    detail:
      "Xylem transports water and dissolved minerals through conducting cells. Transpiration, cohesion, pressure, anatomy, and soil–plant–air gradients all matter.",
    icon: MoveUp,
    rgb: "34,211,238",
  },
  {
    title: "Leaf exchange",
    question: "How does a leaf acquire CO₂ without losing unlimited water?",
    detail:
      "Stomata regulate a diffusion pathway between internal leaf air spaces and the atmosphere. Carbon gain and water loss are coupled to a larger control system.",
    icon: Leaf,
    rgb: "74,222,128",
  },
  {
    title: "Phloem & sinks",
    question: "Where do sugars and other transported compounds go?",
    detail:
      "Phloem moves products from source tissues toward growing, consuming, or storing sinks. Source–sink direction can change with development and season.",
    icon: Network,
    rgb: "244,114,182",
  },
] as const;

const DISTINCTIONS = [
  [
    "Photosynthesis ≠ growth",
    "Photosynthesis supplies chemical energy and fixed carbon, but growth also depends on respiration, nutrients, water, temperature, development, allocation, transport, and damage.",
  ],
  [
    "Plants respire too",
    "Plants carry out cellular respiration. Describing them as simply taking in CO₂ and releasing O₂ hides the changing gas exchange of living tissues.",
  ],
  [
    "Xylem ≠ pump pipe",
    "Cohesion, tension, pressure, resistance, cavitation, anatomy, and environmental gradients matter; the system is not a rigid pipe pushed by a mechanical pump.",
  ],
  [
    "Phloem ≠ always downward",
    "Transport follows source–sink relationships. Leaves, roots, fruits, storage organs, and growing tissues can change roles over time.",
  ],
  [
    "Use ≠ classification",
    "Medicinal, edible, ornamental, toxic, fiber, timber, and crop are human-use categories, not evolutionary lineages.",
  ],
  [
    "Green ≠ plant",
    "Some photosynthetic organisms are not plants and some plants contain little chlorophyll. Botanical identity depends on evolutionary evidence, not color alone.",
  ],
] as const;

export default function BotanyPage() {
  const context = requireCurriculumPageContext(NODE_ID);

  if (context.pageKind !== "hub") {
    throw new Error("Botany must be classified as a navigation hub.");
  }

  assertBranchCoverage(context.children);

  return (
    <SceneFrame
      background={<BotanyBackground />}
      className="bg-[#020704] text-slate-100 selection:bg-emerald-300/25"
      maxWidthClassName="max-w-[1580px]"
      headerBackground="rgba(2,7,4,0.58)"
      header={
        <DomainPageHeader
          breadcrumbs={context.breadcrumbs}
          eyebrow="Structure · physiology · reproduction · evolution · ecology · collections"
          eyebrowStyle="rule"
          icon={Leaf}
          title={<span>Botany</span>}
          subtitle="Botany studies plants as integrated living systems. Begin with six durable lenses, then follow a leaf-scale exchange problem into roots, vascular transport, growing tissues, life cycles, environments, and evolutionary relationships."
          accentRgb="74, 222, 128"
          titleClassName="font-sans text-[clamp(2.9rem,5.3vw,5.9rem)] font-semibold leading-[0.84] tracking-[-0.064em] text-[#f0fdf4]"
          headerClassName="border-emerald-100/[0.10]"
          aside={
            <div className="grid grid-cols-3 border border-emerald-100/[0.12] bg-black/20 font-mono">
              <HeaderMeasure value="6" label="lenses" />
              <HeaderMeasure value="4" label="flows" bordered />
              <HeaderMeasure value="1" label="plant" />
            </div>
          }
        />
      }
    >
      <section className="relative isolate mt-8 overflow-hidden border-y border-emerald-100/[0.11] py-7 sm:py-8">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(2,7,4,0.30),transparent_32%,transparent_70%,rgba(2,7,4,0.24))] backdrop-blur-[6px]" />
        <div className="relative grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
          <div className="rounded-[20px] bg-[#041108]/30 px-4 py-3 backdrop-blur-[18px]">
            <div className="text-emerald-200/62 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em]">
              <Sprout size={14} aria-hidden="true" /> Primary navigation · six
              ways into a plant
            </div>
            <h2 className="mt-2 max-w-5xl text-[clamp(1.9rem,3.8vw,3.7rem)] font-semibold leading-[0.94] tracking-[-0.052em] text-white">
              Choose the question you want to ask before choosing the specimen
              you want to name.
            </h2>
            <p className="mt-3 max-w-4xl text-[14px] leading-6 text-slate-300/75">
              These branches divide the field by durable kinds of inquiry. They
              overlap in every real organism, but each gives future lessons a
              clear home without turning every plant lineage into a sidebar
              route.
            </p>
          </div>
          <Link
            href={context.parent?.href ?? "/natural-science/biology"}
            className="group flex items-center justify-between gap-4 border border-white/[0.08] bg-[#041108]/35 px-4 py-4 backdrop-blur-[16px] transition hover:bg-[#041108]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200/60"
          >
            <span>
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-500">
                Parent field
              </span>
              <strong className="mt-1 block text-[15px] text-white">
                {context.parent?.label ?? "Biology"}
              </strong>
            </span>
            <ArrowRight
              size={15}
              className="text-emerald-200/55 transition group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>

        <div className="relative mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {context.children.map((child, index) => (
            <BotanyBranchCard key={child.id} child={child} index={index} />
          ))}
        </div>
      </section>

      <section className="mt-24">
        <div className="mb-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_410px] lg:items-end">
          <div className="bg-[#041108]/24 rounded-[18px] px-4 py-3 backdrop-blur-[16px]">
            <div className="text-emerald-200/62 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.11em]">
              <Wind size={14} aria-hidden="true" /> Overview lesson · leaf
              exchange laboratory
            </div>
            <h2 className="mt-2 max-w-5xl text-[clamp(1.9rem,3.7vw,3.6rem)] font-semibold leading-[0.94] tracking-[-0.052em] text-white">
              A leaf cannot open itself to carbon dioxide without also opening
              itself to the atmosphere.
            </h2>
          </div>
          <p className="bg-[#041108]/24 text-slate-300/72 rounded-[16px] px-4 py-3 text-[14px] leading-6 backdrop-blur-[16px]">
            Start with a physiological tradeoff instead of a gallery of names.
            Once gas exchange is visible, photosynthesis, water transport,
            stomatal regulation, and whole-plant allocation have somewhere
            concrete to attach.
          </p>
        </div>
        <PhotosynthesisWidget />
      </section>

      <section className="mt-24 border-t border-emerald-100/[0.09] pt-7">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <div className="bg-[#041108]/22 rounded-[18px] px-4 py-3 backdrop-blur-[14px]">
            <div className="text-cyan-200/58 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.11em]">
              <Droplets size={14} aria-hidden="true" /> Whole-plant transport
            </div>
            <h2 className="mt-2 max-w-5xl text-[clamp(1.8rem,3.4vw,3.2rem)] font-semibold leading-[0.95] tracking-[-0.048em] text-white">
              Soil, atmosphere, and growing tissues connect through moving
              gradients and source–sink relationships.
            </h2>
          </div>
          <p className="bg-[#041108]/22 text-slate-300/68 rounded-[16px] px-4 py-3 text-[14px] leading-6 backdrop-blur-[14px]">
            The arrows are a reading order, not four departments. Root uptake
            changes leaf water status; stomata change transpiration; carbon
            fixation changes sugar supply; sinks change where resources go.
          </p>
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {TRANSPORT.map((item, index) => (
            <TransportCell
              key={item.title}
              item={item}
              number={String(index + 1).padStart(2, "0")}
            />
          ))}
        </div>
      </section>

      <section className="mt-24 grid gap-5 xl:grid-cols-[minmax(0,1.1fr)_430px] xl:items-start">
        <Surface
          variant="glass"
          className="overflow-hidden rounded-[28px] border-lime-100/[0.08]"
          style={{ background: "rgba(5,14,6,0.18)" }}
        >
          <div className="p-5 sm:p-7">
            <div className="text-lime-200/54 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.10em]">
              <Sun size={13} aria-hidden="true" /> Scale ladder
            </div>
            <h2 className="mt-2 text-[clamp(1.7rem,2.8vw,2.6rem)] font-semibold tracking-[-0.043em] text-white">
              No single process explains a plant.
            </h2>
            <p className="text-slate-400/78 mt-3 max-w-3xl text-[14px] leading-6">
              A complete explanation moves between cell-scale mechanisms, tissue
              architecture, whole-organism allocation, life cycles, populations,
              communities, and ecosystems. The same trait can mean something
              different at each scale.
            </p>
          </div>
          <div className="grid border-t border-white/[0.07] sm:grid-cols-2 xl:grid-cols-3">
            {[
              ["Cell", "membranes · chloroplasts · metabolism"],
              ["Tissue", "epidermis · mesophyll · vascular tissue"],
              ["Organ", "root · stem · leaf · flower · fruit"],
              ["Organism", "allocation · growth · response · life history"],
              ["Population", "variation · reproduction · selection · range"],
              ["Community", "competition · mutualism · herbivory · succession"],
            ].map(([title, note], index) => (
              <ScaleCell key={title} title={title} note={note} index={index} />
            ))}
          </div>
        </Surface>

        <Surface
          variant="open"
          className="overflow-hidden rounded-[28px] border-emerald-100/[0.08] xl:sticky xl:top-[172px]"
          style={{ background: "rgba(3,12,6,0.12)" }}
        >
          <div className="p-5">
            <div className="text-emerald-200/48 font-mono text-[11px] uppercase tracking-[0.09em]">
              Useful distinctions
            </div>
            <h3 className="mt-2 text-[21px] font-semibold tracking-[-0.035em] text-white">
              Plant diagrams collect shortcuts. Keep the shortcuts labeled.
            </h3>
          </div>
          <div className="divide-y divide-white/[0.06] border-y border-white/[0.07]">
            {DISTINCTIONS.map(([term, text], index) => (
              <div
                key={term}
                className="grid grid-cols-[36px_minmax(0,1fr)] gap-3 px-4 py-4"
              >
                <span className="text-emerald-200/38 font-mono text-[10px]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>
                  <strong className="text-white/82 block text-[13px]">
                    {term}
                  </strong>
                  <span className="mt-1 block text-[12px] leading-5 text-slate-500">
                    {text}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </Surface>
      </section>

      <section className="mt-24">
        <BotanyEvidenceLab />
      </section>

      <section className="mt-20 grid gap-5 lg:grid-cols-2">
        <div className="border-l border-lime-200/25 bg-lime-300/[0.025] px-5 py-5 backdrop-blur-xl">
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-lime-100/55">
            <Archive size={13} aria-hidden="true" /> Collection boundary
          </div>
          <strong className="mt-2 block text-[20px] text-white">
            A flora atlas needs specimen-grade records, not decorative search
            results.
          </strong>
          <p className="mt-2 text-[14px] leading-6 text-slate-400">
            A future Botany collection will keep accepted identity, specimen or
            observation evidence, place, time, collector, license, and provider
            provenance visible. The existing animal API adapter is intentionally
            not reused because its taxonomy and record shape are Animalia-only.
          </p>
          <a
            href="https://naturalhistory.si.edu/research/botany/collections/collections-database"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-[12px] font-semibold text-lime-100/70 hover:text-white"
          >
            Explore the U.S. National Herbarium database
            <ArrowRight size={13} aria-hidden="true" />
          </a>
        </div>

        <div className="border-l border-cyan-200/25 bg-cyan-300/[0.025] px-5 py-5 backdrop-blur-xl">
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-cyan-100/55">
            <FlaskConical size={13} aria-hidden="true" /> Reviewed teaching
            sources
          </div>
          <p className="mt-2 text-[14px] leading-6 text-slate-400">
            The leaf-exchange and transport sequence follows OpenStax’s reviewed
            plant structure and function material. The collections branch is
            grounded in the Smithsonian’s description of herbarium records as a
            worldwide scientific collection spanning major plant groups.
          </p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[12px] font-semibold text-cyan-100/70">
            <a
              href="https://openstax.org/books/biology-2e/pages/30-5-transport-of-water-and-solutes-in-plants"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              Plant transport ↗
            </a>
            <a
              href="https://openstax.org/books/biology-2e/pages/26-1-evolution-of-seed-plants"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              Plant evolution ↗
            </a>
            <a
              href="https://naturalhistory.si.edu/research/botany/overview-us-herbarium"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              Herbarium scope ↗
            </a>
          </div>
          <p className="mt-4 text-[12px] leading-5 text-slate-600">
            All pore percentages, scale cards, flow arrows, and branch motifs on
            this page are schematic teaching models—not measurements from a real
            species or specimen.
          </p>
        </div>
      </section>

      <section className="mt-12 grid gap-3 border-t border-white/[0.07] pb-8 pt-6 sm:grid-cols-3">
        <Neighbor
          href="/natural-science/biology/cytology"
          label="Cytology"
          note="membranes, organelles, cell division, molecular traffic"
          icon={Microscope}
          rgb="52,211,153"
        />
        <Neighbor
          href="/natural-science/biology/mycology"
          label="Mycology"
          note="fungal networks, decomposition, symbiosis, ecology"
          icon={Sprout}
          rgb="192,132,252"
        />
        <Neighbor
          href="/natural-science/chemistry"
          label="Chemistry"
          note="molecular structure, reactions, energy, measurement"
          icon={FlaskConical}
          rgb="34,211,238"
        />
      </section>
    </SceneFrame>
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
      className={`px-4 py-3 text-center ${bordered ? "border-x border-white/[0.08]" : ""}`}
    >
      <strong className="block text-[18px] text-emerald-100">{value}</strong>
      <span className="text-[10px] uppercase tracking-[0.12em] text-slate-600">
        {label}
      </span>
    </div>
  );
}

function BotanyBranchCard({
  child,
  index,
}: {
  child: CurriculumNode;
  index: number;
}) {
  const presentation =
    BRANCH_PRESENTATION[child.id as BotanyBranchId] ??
    BRANCH_PRESENTATION[BOTANY_BRANCH_IDS[0]];
  const Icon = presentation.icon;
  const content = (
    <>
      <div className="flex items-start justify-between gap-4">
        <span
          className="flex h-11 w-11 items-center justify-center rounded-[15px] border"
          style={{
            color: `rgb(${presentation.rgb})`,
            borderColor: `rgba(${presentation.rgb},0.26)`,
            background: `rgba(${presentation.rgb},0.055)`,
          }}
        >
          <Icon size={17} aria-hidden="true" />
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.10em] text-slate-600">
          {child.status === "placeholder" ? "planned" : "open"} ·{" "}
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h3 className="mt-4 text-[18px] font-semibold tracking-[-0.025em] text-white/90">
        {child.label}
      </h3>
      <p className="text-slate-400/78 mt-2 text-[13px] leading-6">
        {child.description}
      </p>
      <div
        className="mt-4 border-t pt-3 font-mono text-[10px] uppercase tracking-[0.08em]"
        style={{
          color: `rgba(${presentation.rgb},0.62)`,
          borderColor: `rgba(${presentation.rgb},0.12)`,
        }}
      >
        {presentation.specimen}
      </div>
    </>
  );
  const className =
    "min-h-[238px] rounded-[22px] border border-white/[0.07] bg-[#041108]/30 p-5 backdrop-blur-[16px]";

  if (child.status === "placeholder")
    return <article className={className}>{content}</article>;
  return (
    <Link
      href={child.href}
      className={`${className} hover:bg-[#041108]/48 group transition hover:border-white/[0.15] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200/60`}
    >
      {content}
    </Link>
  );
}

function TransportCell({
  item,
  number,
}: {
  item: (typeof TRANSPORT)[number];
  number: string;
}) {
  const Icon = item.icon;
  return (
    <div
      className="min-h-[265px] rounded-[20px] border border-white/[0.07] bg-black/[0.08] p-5 backdrop-blur-[12px]"
      style={{ boxShadow: `inset 0 3px 0 rgba(${item.rgb},0.28)` }}
    >
      <div className="flex items-start justify-between">
        <span
          className="flex h-10 w-10 items-center justify-center rounded-[13px] border"
          style={{
            color: `rgb(${item.rgb})`,
            borderColor: `rgba(${item.rgb},0.24)`,
            background: `rgba(${item.rgb},0.04)`,
          }}
        >
          <Icon size={16} aria-hidden="true" />
        </span>
        <span className="font-mono text-[10px] text-slate-600">{number}</span>
      </div>
      <h3 className="text-white/88 mt-4 text-[16px] font-semibold">
        {item.title}
      </h3>
      <strong
        className="mt-2 block text-[13px] leading-5"
        style={{ color: `rgba(${item.rgb},0.76)` }}
      >
        {item.question}
      </strong>
      <p className="mt-2 text-[13px] leading-6 text-slate-400/75">
        {item.detail}
      </p>
    </div>
  );
}

function ScaleCell({
  title,
  note,
  index,
}: {
  title: string;
  note: string;
  index: number;
}) {
  return (
    <div className="min-h-[138px] border-b border-white/[0.06] p-5 sm:border-r sm:[&:nth-child(2n)]:border-r-0 xl:[&:nth-child(2n)]:border-r xl:[&:nth-child(3n)]:border-r-0 xl:[&:nth-last-child(-n+3)]:border-b-0">
      <span className="text-lime-200/42 font-mono text-[10px]">
        {String(index + 1).padStart(2, "0")}
      </span>
      <strong className="text-white/84 mt-3 block text-[14px]">{title}</strong>
      <span className="mt-2 block text-[12px] leading-5 text-slate-500">
        {note}
      </span>
    </div>
  );
}

function Neighbor({
  href,
  label,
  note,
  icon: Icon,
  rgb,
}: {
  href: string;
  label: string;
  note: string;
  icon: LucideIcon;
  rgb: string;
}) {
  return (
    <Link
      href={href}
      className="group flex min-h-[96px] items-center gap-3 rounded-[18px] border border-white/[0.07] bg-black/[0.09] p-4 backdrop-blur-[12px] transition hover:bg-black/[0.16] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200/60"
    >
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] border"
        style={{ color: `rgb(${rgb})`, borderColor: `rgba(${rgb},0.22)` }}
      >
        <Icon size={16} aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <strong className="text-white/84 text-[13px]">{label}</strong>
        <span className="mt-1 block text-[12px] leading-5 text-slate-500">
          {note}
        </span>
      </span>
      <ArrowRight
        size={13}
        className="text-white/28 transition group-hover:translate-x-1"
        aria-hidden="true"
      />
    </Link>
  );
}

function assertBranchCoverage(children: readonly CurriculumNode[]) {
  const expected = new Set<string>(BOTANY_BRANCH_IDS);
  const actual = new Set(children.map((child) => child.id));
  const missing = BOTANY_BRANCH_IDS.filter((id) => !actual.has(id));
  const unexpected = children.filter((child) => !expected.has(child.id));

  if (
    missing.length > 0 ||
    unexpected.length > 0 ||
    actual.size !== children.length ||
    children.length !== BOTANY_BRANCH_IDS.length
  ) {
    throw new Error(
      `Botany branch atlas and curriculum disagree. Missing: ${missing.join(", ") || "none"}; unexpected: ${unexpected.map((node) => node.id).join(", ") || "none"}.`
    );
  }
}
