import type { Metadata } from "next";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame, Surface } from "@/app/_page-system/scene";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import type { LucideIcon } from "lucide-react";
import {
  Archive,
  ArrowDown,
  ArrowRight,
  BookOpenText,
  Database,
  Footprints,
  Landmark,
  Library,
  MessageCircleQuestion,
  Network,
  Scale,
  ScrollText,
  UsersRound,
} from "lucide-react";
import ReligionBackground from "./_components/ReligionBackground";
import TheologyVisualizer from "./_components/TheologyVisualizer";
import ReligionEvidenceReview from "./ReligionEvidenceReview";
import { RELIGION_DIRECT_BRANCH_IDS } from "./religionModel";

const NODE_ID = "humanities.religion";

export const metadata: Metadata = {
  title: "Religion",
  description:
    "Study religion through methods, communities, texts, practices, material life, society, theology, and sacred narrative while preserving context and internal diversity.",
};

type BranchMeta = {
  icon: LucideIcon;
  code: string;
  question: string;
  rgb: string;
};

const BRANCH_META: Record<string, BranchMeta> = {
  "humanities.religion.methods": {
    icon: Archive,
    code: "MTH",
    question:
      "Which questions, sources, methods, categories, and ethical limits shape academic claims about religion?",
    rgb: "251,191,36",
  },
  "humanities.religion.traditions": {
    icon: UsersRound,
    code: "TRD",
    question:
      "How do particular communities develop internally diverse beliefs, institutions, practices, identities, and local histories?",
    rgb: "125,211,252",
  },
  "humanities.religion.texts-interpretation": {
    icon: BookOpenText,
    code: "TXT",
    question:
      "How are texts composed, transmitted, translated, authorized, interpreted, performed, and contested?",
    rgb: "192,132,252",
  },
  "humanities.religion.ritual-practice": {
    icon: Footprints,
    code: "RIT",
    question:
      "What do people do through ritual, discipline, celebration, prayer, movement, food, sound, and embodied practice?",
    rgb: "244,114,182",
  },
  "humanities.religion.material-place": {
    icon: Landmark,
    code: "MAT",
    question:
      "How do buildings, objects, landscapes, images, clothing, technologies, and sensory environments participate in religious life?",
    rgb: "94,234,212",
  },
  "humanities.religion.society-politics": {
    icon: Network,
    code: "SOC",
    question:
      "How does religion interact with institutions, identity, law, migration, power, secularism, pluralism, and public life?",
    rgb: "96,165,250",
  },
  "humanities.religion.theology-philosophy": {
    icon: Scale,
    code: "THP",
    question:
      "How do theological and philosophical arguments reason about divinity, ultimacy, revelation, evil, liberation, ethics, and religious knowledge?",
    rgb: "251,146,60",
  },
  "humanities.religion.mythology": {
    icon: ScrollText,
    code: "MYT",
    question:
      "How do sacred narratives, cosmologies, hero cycles, oral traditions, ritual settings, and later receptions change across communities and time?",
    rgb: "216,180,254",
  },
};

const STUDY_SPINE = [
  {
    label: "Source",
    detail: "text · object · fieldnote · archive · interview",
    rgb: "251,191,36",
  },
  {
    label: "Context",
    detail: "speaker · place · genre · institution · history",
    rgb: "125,211,252",
  },
  {
    label: "Interpretation",
    detail: "comparison · argument · category · explanation",
    rgb: "192,132,252",
  },
  {
    label: "Corroboration",
    detail: "other sources · other voices · other methods",
    rgb: "94,234,212",
  },
  {
    label: "Claim",
    detail: "bounded conclusion with uncertainty visible",
    rgb: "244,114,182",
  },
] as const;

const BOUNDARIES = [
  [
    "Religious studies",
    "An academic field that can use historical, anthropological, sociological, literary, philosophical, archaeological, and other methods to study religion.",
  ],
  [
    "Theology",
    "Reasoning within, across, or about theological traditions. It can overlap with religious studies, but the two are not synonyms.",
  ],
  [
    "Tradition",
    "A historically changing, internally diverse set of communities, practices, institutions, texts, ideas, and identities, not a single personality or checklist.",
  ],
  [
    "Comparison",
    "A research operation that must say what is being compared and why. Similarity in one dimension does not make two traditions globally equivalent.",
  ],
] as const;

const RELIGION_SOURCES = [
  {
    label: "AAR responsible research practices",
    eyebrow: "Method · fairness · human subjects · accountability",
    href: "https://aarweb.org/news/responsible-research-practices/",
    boundary:
      "These professional guidelines foreground honest communication, methodological transparency, fair treatment, accountability, human-subject responsibilities, and the special authority communities may attribute to religious beliefs and practices. They guide reflection rather than replacing institutional review, consent, community relationships, local law, or method-specific ethics.",
    rgb: "251,191,36",
    icon: Scale,
  },
  {
    label: "Library of Congress JSON/YAML API",
    eyebrow: "Items · collections · facets · resources",
    href: "https://www.loc.gov/apis/json-and-yaml/",
    boundary:
      "The API can support a faceted archive of digitized books, manuscripts, photographs, maps, recordings, and curated collections. Retain stable item/resource IDs, collection, title, contributors, dates, places, formats, subjects as catalog assertions, rights/access fields, traditional-knowledge labels when present, source URL, pagination, and retrieval time. Search results are not a complete catalog, and historical metadata may be partial or contested.",
    rgb: "125,211,252",
    icon: Database,
  },
  {
    label: "The Met Collection API",
    eyebrow: "Object · culture · period · rights-aware media",
    href: "https://metmuseum.github.io/",
    boundary:
      "The Met API can support a material-religion collection using object identity, department, culture and classification fields as museum assertions, dates, geography, credit line, object URL, public-domain status, and image availability. An object record is not a transparent account of belief, ritual use, community authority, legal ownership, or unrestricted cultural reuse.",
    rgb: "94,234,212",
    icon: Landmark,
  },
] as const;

export default function ReligionPage() {
  const context = requireCurriculumPageContext(NODE_ID);

  if (context.pageKind !== "hub") {
    throw new Error("Religion must be classified as a navigation hub.");
  }

  const actualIds = context.children.map((child) => child.id);
  if (
    actualIds.length !== RELIGION_DIRECT_BRANCH_IDS.length ||
    actualIds.some((id, index) => id !== RELIGION_DIRECT_BRANCH_IDS[index])
  ) {
    throw new Error(
      "Religion page branch navigation is out of sync with the curriculum registry."
    );
  }

  const left = context.children.slice(0, 4);
  const right = context.children.slice(4);

  return (
    <SceneFrame
      background={<ReligionBackground />}
      className="bg-[#130b09] text-stone-100 selection:bg-amber-300/25"
      maxWidthClassName="max-w-[1600px]"
      headerBackground="rgba(19,11,9,0.48)"
      header={
        <DomainPageHeader
          breadcrumbs={context.breadcrumbs}
          eyebrow="Traditions · practices · texts · communities · histories · ideas"
          eyebrowStyle="rule"
          icon={Library}
          title={<span>Religion</span>}
          subtitle="The academic study of religion examines traditions as lived, historical, material, social, textual, philosophical, and contested human phenomena. It asks careful questions about evidence and interpretation without requiring traditions to fit one universal diagram."
          accentRgb="251, 191, 36"
          titleClassName="font-serif text-[clamp(2.9rem,5.4vw,6.1rem)] font-normal leading-[0.86] tracking-[-0.055em] text-[#fff8e7]"
          headerClassName="border-amber-100/[0.10]"
        />
      }
    >
      <section className="relative isolate mt-5 overflow-hidden border-y border-amber-100/[0.11] py-5 sm:py-6">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(19,11,9,0.40),transparent_31%,transparent_69%,rgba(15,10,18,0.34))] backdrop-blur-[2px]" />
        <div className="relative grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-end">
          <div>
            <div className="text-amber-200/66 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em]">
              <MessageCircleQuestion size={14} /> Primary navigation · direct
              study fields
            </div>
            <h2 className="mt-2 max-w-5xl text-[clamp(1.9rem,3.7vw,3.7rem)] font-semibold leading-[0.94] tracking-[-0.052em] text-white">
              Enter through methods, communities, texts, practice, material
              life, society, theology, or sacred narrative.
            </h2>
            <p className="mt-3 max-w-4xl text-[14px] leading-6 text-stone-300/70">
              The background is a comparative reading table, not sacred
              geometry. Archive fragments, oral records, material traces, and
              analytical lenses converge on one bounded claim while the source
              files remain visible at the edges.
            </p>
          </div>
          <Link
            href="/humanities"
            className="group flex items-center justify-between gap-4 border-l border-amber-200/[0.18] bg-black/[0.08] px-4 py-3 backdrop-blur-[10px] transition hover:bg-black/[0.15] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/60"
          >
            <span>
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-stone-500">
                Parent field
              </span>
              <strong className="mt-1 block text-[14px] text-white">
                Humanities
              </strong>
            </span>
            <ArrowRight
              size={15}
              className="text-amber-200/55 transition group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="relative mt-5 grid gap-4 xl:grid-cols-[minmax(0,1fr)_280px_minmax(0,1fr)] xl:items-stretch">
          <div className="space-y-2.5">
            {left.map((branch) => (
              <ReligionRoute key={branch.id} branch={branch} side="left" />
            ))}
          </div>
          <StudyCore />
          <div className="space-y-2.5">
            {right.map((branch) => (
              <ReligionRoute key={branch.id} branch={branch} side="right" />
            ))}
          </div>
        </div>
      </section>

      <section className="mt-24">
        <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-rose-200/58 font-mono text-[11px] font-semibold uppercase tracking-[0.11em]">
              Method instrument
            </div>
            <h2 className="mt-1 text-[23px] font-semibold tracking-[-0.035em] text-white">
              Use multiple lenses on the same evidence instead of sorting
              religions into cosmic bins.
            </h2>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-stone-600">
            fictional fieldnote packet
          </span>
        </div>
        <TheologyVisualizer />
      </section>

      <section className="mt-24 border-t border-amber-100/[0.10] pt-7">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end">
          <div>
            <div className="text-violet-200/58 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.11em]">
              <Archive size={14} /> Study boundaries · reference, not navigation
            </div>
            <h2 className="mt-2 max-w-4xl text-[clamp(1.8rem,3.2vw,3rem)] font-semibold leading-[0.96] tracking-[-0.048em] text-white">
              Useful categories should sharpen questions, not flatten the people
              being studied.
            </h2>
          </div>
          <p className="text-stone-400/72 text-[14px] leading-6">
            Religious traditions can contain competing interpretations,
            different institutions, regional variation, historical rupture,
            conversion, reform, revival, secularization, syncretism, and
            individual disagreement. The page treats internal diversity as
            normal rather than exceptional.
          </p>
        </div>
        <div className="mt-5 grid border-y border-white/[0.08] md:grid-cols-2">
          {BOUNDARIES.map(([term, text], index) => (
            <div
              key={term}
              className="grid grid-cols-[42px_minmax(0,1fr)] gap-3 border-b border-white/[0.07] px-4 py-4 md:border-r md:[&:nth-child(2n)]:border-r-0 md:[&:nth-last-child(-n+2)]:border-b-0"
            >
              <span className="text-amber-200/42 font-mono text-[11px]">
                0{index + 1}
              </span>
              <span>
                <strong className="text-stone-200/86 block text-[13px]">
                  {term}
                </strong>
                <span className="mt-1 block text-[12px] leading-5 text-stone-500">
                  {text}
                </span>
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-24">
        <ReligionEvidenceReview />
      </section>

      <section className="mt-24 border-t border-amber-100/[0.10] pb-7 pt-7">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end">
          <div className="rounded-[18px] bg-[#160d09]/[0.16] px-4 py-3 backdrop-blur-[14px]">
            <div className="text-amber-100/58 font-mono text-[11px] font-semibold uppercase tracking-[0.10em]">
              Archives with communities, histories, and rights still attached
            </div>
            <h2 className="mt-2 max-w-4xl font-serif text-[clamp(1.9rem,3.4vw,3.3rem)] leading-[1] tracking-[-0.04em] text-white">
              Collection access expands the evidence. It does not settle its
              meaning.
            </h2>
          </div>
          <p className="rounded-[16px] bg-[#160d09]/[0.16] px-4 py-3 text-[13px] leading-6 text-stone-400/75 backdrop-blur-[14px]">
            These official resources define future archive, object, and ethics
            boundaries. The root performs no render-time fetch. A searchable
            record remains a source assertion whose genre, provenance, rights,
            community relationships, selection, and missing context must stay
            visible.
          </p>
        </div>
        <div className="mt-6 grid gap-3 lg:grid-cols-3">
          {RELIGION_SOURCES.map((source) => (
            <ReligionSource key={source.label} source={source} />
          ))}
        </div>
      </section>
    </SceneFrame>
  );
}

function ReligionRoute({
  branch,
  side,
}: {
  branch: CurriculumNode;
  side: "left" | "right";
}) {
  const meta = BRANCH_META[branch.id] ?? {
    icon: ScrollText,
    code: "REL",
    question: branch.description ?? "Explore this religion branch.",
    rgb: "251,191,36",
  };
  const Icon = meta.icon;
  const planned = branch.status === "placeholder";
  const card = (
    <div
      className="group relative min-h-[108px] border-y border-white/[0.07] bg-black/[0.07] px-3 py-3 backdrop-blur-[10px] transition hover:bg-black/[0.13]"
      style={{
        boxShadow: `inset ${side === "left" ? "3px" : "-3px"} 0 0 rgba(${meta.rgb},0.38)`,
      }}
    >
      <div className="grid grid-cols-[40px_minmax(0,1fr)_54px] gap-3">
        <span
          className="flex h-9 w-9 items-center justify-center border"
          style={{
            color: `rgb(${meta.rgb})`,
            borderColor: `rgba(${meta.rgb},0.26)`,
            background: `rgba(${meta.rgb},0.045)`,
          }}
        >
          <Icon size={15} />
        </span>
        <span>
          <span
            className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em]"
            style={{ color: `rgba(${meta.rgb},0.70)` }}
          >
            {meta.code}
          </span>
          <strong className="text-white/88 mt-0.5 block text-[15px]">
            {branch.label}
          </strong>
          <span className="mt-1 block text-[11px] leading-4 text-stone-500">
            {meta.question}
          </span>
        </span>
        <span className="pt-1 text-right font-mono text-[11px] uppercase text-stone-600">
          {planned ? "planned" : "open"}
        </span>
      </div>
    </div>
  );
  return planned ? (
    <div aria-disabled="true">{card}</div>
  ) : (
    <Link
      href={branch.href}
      className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/60"
    >
      {card}
    </Link>
  );
}

function StudyCore() {
  return (
    <Surface
      variant="open"
      className="relative min-h-[452px] overflow-hidden rounded-[28px] border-amber-100/[0.08]"
      style={{ background: "rgba(19,11,9,0.025)" }}
    >
      <div className="relative p-4">
        <div className="text-amber-200/54 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.09em]">
          <Archive size={13} /> Claim-making spine
        </div>
        <p className="text-stone-400/64 mt-2 text-[12px] leading-5">
          Evidence gains meaning through context, interpretation, corroboration,
          and explicit limits.
        </p>
      </div>
      <div className="relative mx-4 mt-1 space-y-1">
        {STUDY_SPINE.map((step, index) => (
          <div
            key={step.label}
            className="relative border-b border-white/[0.06] py-3 last:border-b-0"
          >
            <div className="flex items-start gap-3">
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border font-mono text-[11px]"
                style={{
                  color: `rgb(${step.rgb})`,
                  borderColor: `rgba(${step.rgb},0.24)`,
                  background: `rgba(${step.rgb},0.04)`,
                }}
              >
                0{index + 1}
              </span>
              <span>
                <strong
                  className="block text-[13px]"
                  style={{ color: `rgba(${step.rgb},0.84)` }}
                >
                  {step.label}
                </strong>
                <span className="mt-1 block text-[11px] leading-4 text-stone-500">
                  {step.detail}
                </span>
              </span>
            </div>
            {index < STUDY_SPINE.length - 1 ? (
              <ArrowDown size={13} className="ml-[10px] mt-2 text-stone-600" />
            ) : null}
          </div>
        ))}
      </div>
      <div className="text-amber-200/34 absolute inset-x-4 bottom-4 border-t border-amber-100/[0.07] pt-3 text-center font-mono text-[11px] uppercase tracking-[0.07em]">
        interpretation remains revisable
      </div>
    </Surface>
  );
}

function ReligionSource({
  source,
}: {
  source: (typeof RELIGION_SOURCES)[number];
}) {
  const Icon = source.icon;
  return (
    <a
      href={source.href}
      target="_blank"
      rel="noreferrer"
      className="group grid min-h-[290px] grid-rows-[auto_auto_1fr] border border-white/[0.08] bg-[#160d09]/[0.20] px-5 py-5 backdrop-blur-[16px] transition hover:bg-[#1e110d]/[0.34] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/60"
      style={{ borderTopColor: `rgba(${source.rgb},0.38)` }}
    >
      <span
        className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.09em]"
        style={{ color: `rgba(${source.rgb},0.70)` }}
      >
        <Icon size={13} aria-hidden="true" /> {source.eyebrow}
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
