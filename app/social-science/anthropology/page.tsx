import type { Metadata } from "next";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame, Surface } from "@/app/_page-system/scene";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import {
  ArrowRight,
  BookOpen,
  Database,
  Dna,
  Languages,
  Layers3,
  Search,
  Shovel,
  ShieldCheck,
  Sparkles,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import PaleoBackground from "./PaleoBackground";
import SkullTimeline from "./SkullTimeline";
import AnthropologyEvidenceReview from "./AnthropologyEvidenceReview";
import { ANTHROPOLOGY_DIRECT_BRANCH_IDS } from "./anthropologyModel";

const NODE_ID = "social.anthropology";

export const metadata: Metadata = {
  title: "Anthropology",
  description:
    "Study human life through cultural, biological, archaeological, and linguistic evidence while preserving context, comparison, and ethical responsibility.",
};

type FieldMeta = {
  icon: LucideIcon;
  evidence: string;
  question: string;
  rgb: string;
  index: string;
  motif: "culture" | "biology" | "archaeology" | "language";
};

const FIELD_META: Record<string, FieldMeta> = {
  "social.anthropology.cultural": {
    icon: UsersRound,
    evidence: "practice · meaning · relationship",
    question:
      "How do people make social worlds meaningful, durable, and changeable?",
    rgb: "250,204,21",
    index: "01",
    motif: "culture",
  },
  "social.anthropology.biological": {
    icon: Dna,
    evidence: "body · variation · deep time",
    question:
      "How did human biology evolve, vary, and interact with environments and culture?",
    rgb: "52,211,153",
    index: "02",
    motif: "biology",
  },
  "social.anthropology.archaeology": {
    icon: Shovel,
    evidence: "site · artifact · context",
    question:
      "What can material traces reveal about people who are no longer present to explain them?",
    rgb: "251,146,60",
    index: "03",
    motif: "archaeology",
  },
  "social.anthropology.linguistic": {
    icon: Languages,
    evidence: "speech · interaction · identity",
    question:
      "How does language both express and produce social relationships, identities, and power?",
    rgb: "34,211,238",
    index: "04",
    motif: "language",
  },
};

const METHOD_ROWS = [
  {
    label: "Observe",
    text: "Record behavior, context, interaction, material conditions, and the researcher's own position in the encounter.",
    rgb: "250,204,21",
  },
  {
    label: "Compare",
    text: "Ask what changes across communities, environments, periods, populations, or cases without assuming one universal path.",
    rgb: "52,211,153",
  },
  {
    label: "Contextualize",
    text: "Treat an artifact, word, trait, or custom as evidence whose meaning depends on relationships around it.",
    rgb: "251,146,60",
  },
  {
    label: "Collaborate",
    text: "Research ethics include consent, reciprocity, stewardship, descendant communities, and consequences beyond publication.",
    rgb: "34,211,238",
  },
] as const;

const ANTHROPOLOGY_SOURCES = [
  {
    label: "AAA anthropological ethics",
    eyebrow: "Consent · harm · records · access",
    href: "https://americananthro.org/about/anthropological-ethics/",
    boundary:
      "Professional principles guide decisions about harm, honesty, informed consent, competing obligations, accessible results, records, and relationships. A linked principle is not automatic project approval, consent, community endorsement, or a substitute for local law and review.",
    rgb: "250,204,21",
    icon: ShieldCheck,
  },
  {
    label: "Smithsonian Open Access tools",
    eyebrow: "Object metadata · media · record identity",
    href: "https://www.si.edu/openaccess/devtools",
    boundary:
      "The API and weekly JSON releases can support a curated material-culture repository. Retain unit, record ID, title, people/culture fields, dates, places, credit, rights, media availability, source URL, and refresh context; metadata access does not erase cultural sensitivity or make every media asset unrestricted.",
    rgb: "34,211,238",
    icon: Database,
  },
  {
    label: "National NAGPRA databases",
    eyebrow: "Consultation · inventories · notices · return",
    href: "https://www.nps.gov/subjects/nagpra/databases.htm",
    boundary:
      "These are compliance-document abstractions, not a shopping catalog or complete map of consulting parties. Human remains and cultural items require dignity, rights-aware stewardship, consultation, legal context, and return processes; absence from a table is not permission to display, publish, or possess.",
    rgb: "52,211,153",
    icon: BookOpen,
  },
] as const;

export default function AnthropologyPage() {
  const context = requireCurriculumPageContext(NODE_ID);

  if (context.pageKind !== "hub") {
    throw new Error("Anthropology must be classified as a navigation hub.");
  }

  const actualIds = context.children.map((child) => child.id);
  if (
    actualIds.length !== ANTHROPOLOGY_DIRECT_BRANCH_IDS.length ||
    actualIds.some((id, index) => id !== ANTHROPOLOGY_DIRECT_BRANCH_IDS[index])
  ) {
    throw new Error(
      "Anthropology page branch navigation is out of sync with the curriculum registry."
    );
  }

  return (
    <SceneFrame
      background={<PaleoBackground />}
      className="bg-[#160d09] text-stone-100 selection:bg-amber-300/25"
      maxWidthClassName="max-w-[1580px]"
      headerBackground="rgba(20,12,8,0.48)"
      header={
        <DomainPageHeader
          breadcrumbs={context.breadcrumbs}
          eyebrow="Culture · biology · material traces · language · comparison"
          eyebrowStyle="rule"
          icon={Search}
          title={<span>Anthropology</span>}
          subtitle="Anthropology studies human life by combining evidence that rarely lives in one place: bodies, objects, language, relationships, environments, memory, and deep time. The four fields ask different questions, but their strongest explanations overlap."
          accentRgb="245, 158, 11"
          titleClassName="font-serif text-[clamp(3rem,5.7vw,6.4rem)] font-semibold leading-[0.82] tracking-[-0.058em] text-[#fff3d6]"
          headerClassName="border-amber-100/[0.10]"
        />
      }
    >
      <section className="relative isolate mt-5 overflow-hidden border-y border-amber-100/[0.12] py-5 sm:py-6">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(25,13,7,0.24),rgba(14,11,9,0.08)_54%,transparent_82%)] backdrop-blur-[3px]" />
        <div className="relative grid gap-5 xl:grid-cols-[minmax(0,1.08fr)_minmax(390px,0.72fr)]">
          <div className="min-w-0">
            <div className="max-w-4xl px-1">
              <div className="text-amber-200/72 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.13em]">
                <Layers3 size={14} /> Primary navigation · four-field
                anthropology
              </div>
              <h2 className="mt-2 text-[clamp(2rem,4vw,4rem)] font-semibold leading-[0.94] tracking-[-0.052em] text-white">
                One species leaves many kinds of evidence.
              </h2>
              <p className="text-stone-300/72 mt-3 max-w-3xl text-[14px] leading-6">
                Choose the evidence stream that matches the question. Cultural
                anthropology studies living social worlds, biological
                anthropology studies human biology and evolution, archaeology
                reconstructs activity from material remains, and linguistic
                anthropology studies language in social life.
              </p>
            </div>

            <nav aria-label="Anthropology fields" className="mt-5 grid gap-3">
              {context.children.map((child) => (
                <FieldRoute key={child.id} child={child} />
              ))}
            </nav>
          </div>

          <EvidenceCompass />
        </div>
      </section>

      <section className="mt-24 grid gap-7 xl:grid-cols-[minmax(0,0.86fr)_minmax(420px,1.14fr)] xl:items-start">
        <div>
          <div className="text-emerald-200/68 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em]">
            <Dna size={14} /> Preserved specimen viewer · reference, not
            navigation
          </div>
          <h2 className="mt-2 text-[clamp(1.8rem,3.4vw,3.3rem)] font-semibold leading-[0.96] tracking-[-0.048em] text-white">
            Deep time is a branching story, not a ladder toward the present.
          </h2>
          <p className="mt-3 max-w-2xl text-[14px] leading-6 text-stone-300/70">
            The existing hominin viewer remains as a compact
            biological-anthropology preview. Read each specimen as one branch in
            a larger, overlapping evolutionary history rather than as a simple
            sequence of replacements.
          </p>
          <div className="mt-5 max-w-[620px]">
            <SkullTimeline />
          </div>
        </div>

        <CrossFieldCase />
      </section>

      <section className="mt-24 border-t border-stone-100/[0.10] pt-7">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end">
          <div>
            <div className="text-cyan-100/62 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em]">
              <BookOpen size={14} /> Field practice · reference, not navigation
            </div>
            <h2 className="mt-2 max-w-5xl text-[clamp(1.9rem,3.6vw,3.5rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-white">
              Context is not decoration around evidence. It is part of the
              evidence.
            </h2>
          </div>
          <p className="text-stone-400/74 text-[14px] leading-6">
            Anthropology often becomes most powerful where methods meet:
            excavation gains meaning from ethnography, biological variation
            gains meaning from history and environment, and language becomes
            evidence through the relationships in which it is used.
          </p>
        </div>

        <div className="mt-5 grid border-y border-stone-100/[0.09] md:grid-cols-2 xl:grid-cols-4">
          {METHOD_ROWS.map((row, index) => (
            <MethodRow key={row.label} {...row} index={index + 1} />
          ))}
        </div>
      </section>

      <section className="mt-24">
        <AnthropologyEvidenceReview />
      </section>

      <section className="mt-24 border-t border-amber-100/[0.10] pb-7 pt-7">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end">
          <div className="rounded-[18px] bg-[#160d09]/[0.16] px-4 py-3 backdrop-blur-[14px]">
            <div className="text-amber-100/58 font-mono text-[11px] font-semibold uppercase tracking-[0.10em]">
              Collections with people still in the record
            </div>
            <h2 className="mt-2 max-w-4xl text-[clamp(1.9rem,3.4vw,3.3rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-white">
              Access is a field to preserve, not a reason to forget rights and
              relationships.
            </h2>
          </div>
          <p className="rounded-[16px] bg-[#160d09]/[0.16] px-4 py-3 text-[13px] leading-6 text-stone-400/75 backdrop-blur-[14px]">
            These official resources define future collection and ethics
            boundaries. The root performs no render-time fetch. Searchable does
            not automatically mean appropriate to display, reuse, interpret, or
            detach from a source community.
          </p>
        </div>
        <div className="mt-6 grid gap-3 lg:grid-cols-3">
          {ANTHROPOLOGY_SOURCES.map((source) => (
            <AnthropologySource key={source.label} source={source} />
          ))}
        </div>
      </section>
    </SceneFrame>
  );
}

function FieldRoute({ child }: { child: CurriculumNode }) {
  const meta = FIELD_META[child.id] ?? {
    icon: Search,
    evidence: "anthropological evidence",
    question: child.description ?? "Explore this field of anthropology.",
    rgb: "245,158,11",
    index: "--",
    motif: "culture" as const,
  };
  const Icon = meta.icon;
  const planned = child.status === "placeholder";
  const content = (
    <Surface
      variant="glass"
      className={`group relative overflow-hidden rounded-l-[18px] rounded-r-[34px] p-0 transition ${planned ? "opacity-58" : "hover:translate-x-1"}`}
      style={{
        borderColor: `rgba(${meta.rgb},${planned ? 0.09 : 0.2})`,
        background: `linear-gradient(90deg,rgba(24,13,8,0.52),rgba(${meta.rgb},0.045)_58%,rgba(8,7,7,0.08))`,
        boxShadow: planned ? undefined : `inset 3px 0 0 rgba(${meta.rgb},0.54)`,
      }}
    >
      <div className="grid min-h-[108px] gap-4 px-4 py-4 sm:grid-cols-[42px_52px_220px_minmax(0,1fr)_28px] sm:items-center sm:px-5">
        <span className="font-mono text-[12px] text-stone-600">
          {meta.index}
        </span>
        <span
          className="flex h-11 w-11 items-center justify-center rounded-[13px] border"
          style={{
            color: `rgb(${meta.rgb})`,
            borderColor: `rgba(${meta.rgb},0.28)`,
            background: `rgba(${meta.rgb},0.055)`,
          }}
        >
          <Icon size={18} />
        </span>
        <span>
          <span
            className="font-mono text-[11px] font-semibold uppercase tracking-[0.09em]"
            style={{ color: `rgba(${meta.rgb},0.74)` }}
          >
            {meta.evidence}
          </span>
          <strong className="mt-1 block text-[18px] font-semibold text-white">
            {child.label}
          </strong>
        </span>
        <span className="text-stone-300/72 text-[13px] leading-5">
          {meta.question}
        </span>
        {planned ? (
          <span className="font-mono text-[11px] uppercase text-stone-600">
            planned
          </span>
        ) : (
          <ArrowRight
            size={16}
            className="group-hover:text-white/82 text-white/30 transition group-hover:translate-x-1"
          />
        )}
      </div>
      <FieldMotif motif={meta.motif} rgb={meta.rgb} />
    </Surface>
  );

  return planned ? (
    <div aria-disabled="true">{content}</div>
  ) : (
    <Link
      href={child.href}
      className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/60"
    >
      {content}
    </Link>
  );
}

function FieldMotif({
  motif,
  rgb,
}: {
  motif: FieldMeta["motif"];
  rgb: string;
}) {
  if (motif === "archaeology") {
    return (
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[28%] opacity-50">
        {[0, 1, 2, 3].map((row) => (
          <span
            key={row}
            className="absolute left-0 right-0 h-px"
            style={{
              top: `${28 + row * 18}%`,
              background: `rgba(${rgb},${0.24 - row * 0.03})`,
              transform: `rotate(${row % 2 ? -1.2 : 1.1}deg)`,
            }}
          />
        ))}
        <span
          className="absolute bottom-[18%] right-[22%] h-5 w-4 rotate-[18deg] border"
          style={{ borderColor: `rgba(${rgb},0.34)` }}
        />
      </div>
    );
  }
  if (motif === "biology") {
    return (
      <svg
        className="opacity-38 pointer-events-none absolute inset-y-0 right-0 h-full w-[26%]"
        viewBox="0 0 220 108"
        aria-hidden="true"
      >
        <path
          d="M24 8 C80 32 80 76 190 102"
          fill="none"
          stroke={`rgba(${rgb},0.48)`}
          strokeWidth="1.5"
        />
        <path
          d="M190 8 C134 34 140 77 34 102"
          fill="none"
          stroke={`rgba(${rgb},0.32)`}
          strokeWidth="1.5"
        />
        {[18, 36, 54, 72, 90].map((y, index) => (
          <line
            key={y}
            x1={54 + index * 13}
            y1={y}
            x2={164 - index * 13}
            y2={y}
            stroke={`rgba(${rgb},0.24)`}
          />
        ))}
      </svg>
    );
  }
  if (motif === "language") {
    return (
      <svg
        className="pointer-events-none absolute inset-y-0 right-0 h-full w-[28%] opacity-40"
        viewBox="0 0 240 108"
        aria-hidden="true"
      >
        <path
          d="M0 54 C18 18 34 90 52 54 S86 18 104 54 S138 90 156 54 S190 18 208 54 S230 82 240 54"
          fill="none"
          stroke={`rgba(${rgb},0.50)`}
          strokeWidth="1.8"
        />
        <path
          d="M0 54 C24 37 34 71 58 54 S94 37 118 54 S154 71 178 54 S216 39 240 54"
          fill="none"
          stroke={`rgba(${rgb},0.22)`}
        />
      </svg>
    );
  }
  return (
    <svg
      className="opacity-38 pointer-events-none absolute inset-y-0 right-0 h-full w-[28%]"
      viewBox="0 0 240 108"
      aria-hidden="true"
    >
      {[
        { x: 50, y: 30 },
        { x: 110, y: 20 },
        { x: 168, y: 45 },
        { x: 88, y: 80 },
        { x: 190, y: 82 },
      ].map((point, index, points) => (
        <g key={`${point.x}-${point.y}`}>
          {index > 0 ? (
            <line
              x1={points[index - 1].x}
              y1={points[index - 1].y}
              x2={point.x}
              y2={point.y}
              stroke={`rgba(${rgb},0.25)`}
            />
          ) : null}
          <circle cx={point.x} cy={point.y} r="5" fill={`rgba(${rgb},0.30)`} />
        </g>
      ))}
    </svg>
  );
}

function EvidenceCompass() {
  const streams = [
    {
      label: "Culture",
      note: "meaning in practice",
      rgb: "250,204,21",
      left: "13%",
      top: "18%",
    },
    {
      label: "Biology",
      note: "variation through time",
      rgb: "52,211,153",
      left: "66%",
      top: "17%",
    },
    {
      label: "Material",
      note: "traces in context",
      rgb: "251,146,60",
      left: "12%",
      top: "70%",
    },
    {
      label: "Language",
      note: "interaction made audible",
      rgb: "34,211,238",
      left: "65%",
      top: "72%",
    },
  ] as const;

  return (
    <Surface
      variant="ghost"
      className="relative min-h-[500px] overflow-hidden rounded-[30px] border-amber-100/[0.09]"
      style={{ background: "rgba(13,9,7,0.08)" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.10),transparent_23%)]" />
      <div className="relative p-5">
        <div className="text-amber-200/64 font-mono text-[11px] font-semibold uppercase tracking-[0.11em]">
          Evidence compass
        </div>
        <p className="text-stone-400/72 mt-2 max-w-md text-[13px] leading-5">
          Anthropological questions often become clearer when several evidence
          streams point toward the same human problem.
        </p>
      </div>
      <div className="absolute inset-x-5 bottom-5 top-[105px]">
        <div className="absolute left-1/2 top-1/2 flex h-40 w-40 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-amber-100/[0.16] bg-black/[0.12] p-5 text-center backdrop-blur-[12px]">
          <span>
            <Sparkles size={22} className="text-amber-200/76 mx-auto" />
            <strong className="mt-3 block text-[18px] leading-5 text-white">
              Human life
            </strong>
            <span className="mt-2 block text-[12px] leading-5 text-stone-400">
              adaptation · meaning · memory · relationship
            </span>
          </span>
        </div>
        {streams.map((stream) => (
          <div
            key={stream.label}
            className="absolute w-[150px]"
            style={{ left: stream.left, top: stream.top }}
          >
            <div
              className="h-px w-full"
              style={{
                background: `linear-gradient(90deg,rgba(${stream.rgb},0.08),rgba(${stream.rgb},0.42),rgba(${stream.rgb},0.08))`,
              }}
            />
            <strong
              className="mt-2 block text-[14px]"
              style={{ color: `rgb(${stream.rgb})` }}
            >
              {stream.label}
            </strong>
            <span className="mt-1 block text-[11px] leading-4 text-stone-500">
              {stream.note}
            </span>
          </div>
        ))}
      </div>
    </Surface>
  );
}

function CrossFieldCase() {
  const rows = [
    {
      label: "Cultural",
      text: "How is food shared, valued, restricted, celebrated, or tied to identity?",
      rgb: "250,204,21",
    },
    {
      label: "Biological",
      text: "How do nutrition, disease, activity, ancestry, and environment shape bodies?",
      rgb: "52,211,153",
    },
    {
      label: "Archaeological",
      text: "What do hearths, vessels, animal remains, tools, and residues reveal about past meals?",
      rgb: "251,146,60",
    },
    {
      label: "Linguistic",
      text: "How do names, stories, categories, politeness, and conversation organize food practices?",
      rgb: "34,211,238",
    },
  ] as const;

  return (
    <Surface
      variant="glass"
      className="overflow-hidden rounded-[32px] border-amber-100/[0.11]"
      style={{ background: "rgba(18,11,8,0.28)" }}
    >
      <div className="grid border-b border-amber-100/[0.08] lg:grid-cols-[minmax(0,1fr)_250px]">
        <div className="p-5 sm:p-6">
          <div className="text-amber-200/68 font-mono text-[11px] font-semibold uppercase tracking-[0.11em]">
            Cross-field synthesis
          </div>
          <h2 className="mt-2 text-[clamp(1.8rem,3vw,2.8rem)] font-semibold tracking-[-0.045em] text-white">
            One ordinary meal can become four different datasets.
          </h2>
          <p className="mt-3 text-[13px] leading-6 text-stone-300/70">
            No single field owns the question. Each changes what counts as
            evidence and what kinds of claims can be supported.
          </p>
        </div>
        <div className="border-t border-amber-100/[0.08] bg-black/[0.08] p-5 backdrop-blur-[12px] lg:border-l lg:border-t-0">
          <div className="font-mono text-[11px] uppercase tracking-[0.09em] text-stone-500">
            Shared question
          </div>
          <p className="text-amber-50/88 mt-3 text-[16px] font-medium leading-7">
            What can food reveal about human adaptation, identity, inequality,
            memory, and social connection?
          </p>
        </div>
      </div>
      <div className="divide-y divide-white/[0.07]">
        {rows.map((row, index) => (
          <div
            key={row.label}
            className="grid gap-3 px-5 py-4 sm:grid-cols-[34px_110px_minmax(0,1fr)] sm:items-start"
          >
            <span className="font-mono text-[11px] text-stone-600">
              0{index + 1}
            </span>
            <strong
              className="text-[13px]"
              style={{ color: `rgb(${row.rgb})` }}
            >
              {row.label}
            </strong>
            <p className="text-stone-400/74 text-[13px] leading-5">
              {row.text}
            </p>
          </div>
        ))}
      </div>
    </Surface>
  );
}

function MethodRow({
  label,
  text,
  rgb,
  index,
}: {
  label: string;
  text: string;
  rgb: string;
  index: number;
}) {
  return (
    <article className="relative min-h-[170px] border-b border-white/[0.07] px-5 py-5 xl:border-b-0 xl:border-r xl:last:border-r-0 md:[&:nth-last-child(-n+2)]:border-b-0">
      <span
        className="font-mono text-[11px]"
        style={{ color: `rgba(${rgb},0.56)` }}
      >
        0{index}
      </span>
      <h3
        className="mt-4 text-[17px] font-semibold"
        style={{ color: `rgb(${rgb})` }}
      >
        {label}
      </h3>
      <p className="text-stone-400/72 mt-2 text-[13px] leading-6">{text}</p>
    </article>
  );
}

function AnthropologySource({
  source,
}: {
  source: (typeof ANTHROPOLOGY_SOURCES)[number];
}) {
  const Icon = source.icon;
  return (
    <a
      href={source.href}
      target="_blank"
      rel="noreferrer"
      className="group grid min-h-[270px] grid-rows-[auto_auto_1fr] border border-white/[0.08] bg-[#160d09]/[0.20] px-5 py-5 backdrop-blur-[16px] transition hover:bg-[#160d09]/[0.34] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/60"
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
