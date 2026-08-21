import type { Metadata } from "next";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame } from "@/app/_page-system/scene";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import type { LucideIcon } from "lucide-react";
import {
  ArrowDown,
  ArrowRight,
  ArrowRightLeft,
  ArrowUpRight,
  BookOpen,
  BookOpenText,
  Clapperboard,
  Database,
  GraduationCap,
  Hand,
  Languages,
  MessageCircle,
  PenLine,
  ScrollText,
  Sparkles,
  Speech,
} from "lucide-react";
import LanguageEvidenceReview from "./LanguageEvidenceReview";
import RosettaWidget from "./RosettaWidget";
import LanguagesBackground from "./_components/LanguagesBackground";
import OmniTranslator from "./_components/OmniTranslator";
import {
  LANGUAGE_DIRECT_BRANCH_IDS,
  LANGUAGE_PRACTICE_STAGES,
  type LanguageBranchId,
} from "./languagesModel";

const NODE_ID = "humanities.languages";

export const metadata: Metadata = {
  title: "Languages | Education Station 64",
  description:
    "Navigate living, signed, historical, and constructed languages alongside writing, translation, proficiency, literature, culture, and sustained communicative practice.",
};

type BranchMeta = {
  icon: LucideIcon;
  code: string;
  question: string;
  rgb: string;
  family: "catalog" | "practice";
};

const BRANCH_META: Record<LanguageBranchId, BranchMeta> = {
  "humanities.languages.modern": {
    icon: Speech,
    code: "MOD",
    question:
      "Which living languages do you want to use for conversation, reading, travel, heritage, work, scholarship, literature, or media?",
    rgb: "125,211,252",
    family: "catalog",
  },
  "humanities.languages.signed": {
    icon: Hand,
    code: "SGN",
    question:
      "How do natural signed languages use visual-spatial form within distinct Deaf communities, histories, literatures, and regional traditions?",
    rgb: "94,234,212",
    family: "catalog",
  },
  "humanities.languages.classical-historical": {
    icon: ScrollText,
    code: "CLS",
    question:
      "How can texts, inscriptions, manuscripts, philology, pronunciation evidence, and historical grammar reopen languages from earlier periods?",
    rgb: "251,191,36",
    family: "catalog",
  },
  "humanities.languages.constructed": {
    icon: Sparkles,
    code: "CON",
    question:
      "What changes when a language is deliberately designed for artistic, auxiliary, experimental, or engineered purposes and then used by communities?",
    rgb: "192,132,252",
    family: "catalog",
  },
  "humanities.languages.writing-literacy": {
    icon: PenLine,
    code: "SCR",
    question:
      "How do scripts, spelling systems, reading direction, handwriting, keyboards, punctuation, and literacy practices make language durable and visible?",
    rgb: "244,114,182",
    family: "practice",
  },
  "humanities.languages.translation-interpreting": {
    icon: ArrowRightLeft,
    code: "TRN",
    question:
      "How do translators and interpreters preserve communicative purpose while negotiating register, ambiguity, terminology, genre, culture, and medium?",
    rgb: "251,146,60",
    family: "practice",
  },
  "humanities.languages.learning-proficiency": {
    icon: GraduationCap,
    code: "LRN",
    question:
      "Which mix of input, retrieval, grammar, pronunciation, interaction, feedback, reading, writing, and assessment helps proficiency grow over time?",
    rgb: "163,230,53",
    family: "practice",
  },
  "humanities.languages.literature-culture": {
    icon: Clapperboard,
    code: "CUL",
    question:
      "How can language study open literature, film, music, humor, conversation, historical documents, everyday genres, and community contexts?",
    rgb: "216,180,254",
    family: "practice",
  },
};

const FIELD_GROUPS = [
  {
    id: "catalog",
    index: "01",
    title: "Languages and language traditions",
    note: "Choose a language tradition and community context. Spoken, signed, historical, and constructed languages are not stages on one ladder.",
    ids: LANGUAGE_DIRECT_BRANCH_IDS.filter(
      (id) => BRANCH_META[id].family === "catalog"
    ),
  },
  {
    id: "practice",
    index: "02",
    title: "Practices for learning and use",
    note: "Develop literacy, translation, interpretation, proficiency, and cultural participation as interacting practices rather than substitute names for a language.",
    ids: LANGUAGE_DIRECT_BRANCH_IDS.filter(
      (id) => BRANCH_META[id].family === "practice"
    ),
  },
] as const satisfies readonly {
  id: BranchMeta["family"];
  index: string;
  title: string;
  note: string;
  ids: readonly LanguageBranchId[];
}[];

const STAGE_ICONS = {
  notice: BookOpenText,
  understand: MessageCircle,
  retrieve: GraduationCap,
  use: Languages,
  adapt: ArrowRightLeft,
} as const;

const STUDY_PRINCIPLES = [
  [
    "Meaning before substitution",
    "A word or phrase belongs to a larger utterance, relationship, genre, and situation. Translation and comprehension both fail when forms become isolated dictionary tokens.",
  ],
  [
    "Input needs attention",
    "Exposure becomes more useful when learners notice form, infer meaning, connect new material to prior knowledge, and meet it repeatedly across useful contexts.",
  ],
  [
    "Output reveals gaps",
    "Speaking, signing, and writing create pressure to retrieve forms and organize meaning. Feedback can expose what passive recognition alone does not.",
  ],
  [
    "Literacy is language-specific",
    "A new script, spelling system, reading direction, keyboard, or orthographic convention may need its own practice rather than acting as a cosmetic layer over speech.",
  ],
  [
    "Culture is not trivia",
    "Language use is embedded in communities, institutions, media, history, humor, politeness, identity, power, and everyday expectations. A phrasebook cannot contain a culture.",
  ],
  [
    "Linguistics is adjacent",
    "Language science can support learning, but this Humanities hub organizes languages and communicative practice rather than duplicating Linguistics as a second structural taxonomy.",
  ],
] as const;

const LANGUAGE_SOURCES = [
  {
    label: "Glottolog Downloads",
    eyebrow: "Languoids · families · references · versioned releases",
    href: "https://glottolog.org/meta/downloads",
    boundary:
      "A future catalog can retain Glottocode, provider version, level, names, classification path, coordinates where supplied, identifiers, references, license, source URL, and retrieval time. A catalog classification is not a census, proficiency profile, community-endorsed name, complete variety map, or definitive account of identity and use.",
    rgb: "125,211,252",
    icon: Languages,
  },
  {
    label: "Unicode CLDR",
    eyebrow: "Locales · names · formats · collation · versioned data",
    href: "https://cldr.unicode.org/index/downloads",
    boundary:
      "A locale-data adapter must preserve CLDR release, locale and inheritance chain, field path, draft or coverage status when relevant, source format, license, and retrieval time. A software locale is not a whole language, speech community, translation, course, grammar, or guarantee that one convention fits every speaker and setting.",
    rgb: "216,180,254",
    icon: Database,
  },
  {
    label: "Open Language Archives Community",
    eyebrow: "Archive metadata · languages · resources · repositories",
    href: "https://www.language-archives.org/",
    boundary:
      "A future resource shelf must preserve repository and record identifiers, metadata format and datestamp, language codes and names, contributor-supplied title and description, resource type, access link, rights statement, source URL, harvest time, set, and resumption state. Discoverable metadata is not the resource itself or permission to display, translate, redistribute, or train on it.",
    rgb: "94,234,212",
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

export default function LanguagesPage() {
  const context = requireCurriculumPageContext(NODE_ID);

  if (context.pageKind !== "hub") {
    throw new Error("Languages must be classified as a navigation hub.");
  }

  const directIds = context.children.map((child) => child.id);
  if (
    directIds.length !== LANGUAGE_DIRECT_BRANCH_IDS.length ||
    directIds.some((id, index) => id !== LANGUAGE_DIRECT_BRANCH_IDS[index])
  ) {
    throw new Error(
      "Languages branch navigation is out of sync with the curriculum registry."
    );
  }

  const children = new Map(context.children.map((child) => [child.id, child]));

  return (
    <SceneFrame
      background={<LanguagesBackground />}
      className="bg-[#0a0c10] text-stone-100 selection:bg-violet-300/25"
      maxWidthClassName="max-w-[1640px]"
      headerBackground="rgba(10,12,16,0.50)"
      header={
        <DomainPageHeader
          breadcrumbs={context.breadcrumbs}
          eyebrow="Listen · watch · speak · sign · read · write · translate"
          eyebrowStyle="rule"
          icon={Languages}
          title={<span>Languages</span>}
          subtitle="Learn languages as living systems of communication and culture: spoken, signed, written, historical, constructed, translated, read, heard, watched, practiced, inherited, and used with people. Linguistic theory remains a neighboring science rather than a duplicate branch here."
          accentRgb="192, 132, 252"
          metadataTextClassName="text-[11px]"
          titleClassName="font-sans text-[clamp(2.9rem,5.4vw,6.1rem)] font-semibold leading-[0.84] tracking-[-0.066em] text-[#faf5ff]"
          headerClassName="border-violet-100/[0.10]"
        />
      }
    >
      <section className="bg-[#100d18]/48 relative isolate mt-8 overflow-hidden rounded-[38px] border border-violet-100/[0.11] px-4 py-6 backdrop-blur-xl sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(192,132,252,0.045),transparent_35%,rgba(251,191,36,0.018))]" />
        <div className="relative">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end">
            <div>
              <div className="text-violet-200/66 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em]">
                <Languages size={14} aria-hidden="true" /> Primary navigation ·
                eight fields
              </div>
              <h2 className="mt-3 max-w-5xl text-[clamp(2.1rem,4vw,4.2rem)] font-semibold leading-[0.93] tracking-[-0.055em] text-white">
                Choose a language tradition, then practice the skills that make
                participation possible.
              </h2>
            </div>
            <p className="text-[14px] leading-6 text-stone-300/70">
              The two folios are visual groupings, not hidden curriculum
              parents. All eight destinations remain direct planned peers while
              the root supplies an orientation lesson.
            </p>
          </div>

          <nav aria-label="Languages branches" className="mt-8 space-y-4">
            {FIELD_GROUPS.map((group) => (
              <section
                key={group.id}
                className="overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/[0.10]"
              >
                <div className="grid border-b border-white/[0.07] md:grid-cols-[300px_minmax(0,1fr)]">
                  <div className="p-4 sm:p-5">
                    <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-violet-200/55">
                      {group.index} · route folio
                    </div>
                    <h3 className="mt-2 text-[18px] font-semibold text-white">
                      {group.title}
                    </h3>
                  </div>
                  <p className="border-t border-white/[0.07] p-4 text-[13px] leading-6 text-stone-400 sm:p-5 md:border-l md:border-t-0">
                    {group.note}
                  </p>
                </div>
                <div className="grid gap-px bg-white/[0.06] md:grid-cols-2 xl:grid-cols-4">
                  {group.ids.map((id) => {
                    const child = children.get(id);
                    if (!child) {
                      throw new Error(`Missing Languages branch: ${id}`);
                    }
                    return <LanguageRoute key={id} branch={child} />;
                  })}
                </div>
              </section>
            ))}
          </nav>
        </div>
      </section>

      <section className="mt-14 border-y border-violet-100/[0.10] py-8 sm:mt-16 sm:py-10">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
          <div>
            <div className="text-violet-200/58 font-mono text-[11px] font-semibold uppercase tracking-[0.11em]">
              Practice loop · feedback changes what you notice next
            </div>
            <h2 className="mt-2 max-w-5xl text-[clamp(2rem,3.7vw,3.6rem)] font-semibold leading-[0.95] tracking-[-0.052em] text-white">
              Knowing about a language and being able to use it are related, not
              identical, achievements.
            </h2>
          </div>
          <Link
            href="/social-science/linguistics"
            className="hover:border-cyan-200/28 group flex items-center justify-between gap-4 rounded-[22px] border border-cyan-200/[0.16] bg-black/[0.09] px-4 py-4 backdrop-blur-[10px] transition hover:bg-black/[0.15] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/60"
          >
            <span>
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-stone-500">
                Neighboring field
              </span>
              <strong className="mt-1 block text-[14px] text-white">
                Linguistics
              </strong>
              <span className="mt-1 block text-[11px] text-stone-600">
                language science & structure
              </span>
            </span>
            <ArrowRight
              size={15}
              className="text-cyan-200/55 transition group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>

        <div className="mt-7 grid overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/[0.08] sm:grid-cols-2 xl:grid-cols-5">
          {LANGUAGE_PRACTICE_STAGES.map((stage, index) => {
            const Icon = STAGE_ICONS[stage.key];
            return (
              <article
                key={stage.key}
                className="relative min-h-[170px] border-b border-white/[0.07] p-5 sm:border-r xl:border-b-0 xl:last:border-r-0"
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-full border"
                    style={{
                      color: `rgb(${stage.rgb})`,
                      borderColor: `rgba(${stage.rgb},0.25)`,
                      background: `rgba(${stage.rgb},0.045)`,
                    }}
                  >
                    <Icon size={15} aria-hidden="true" />
                  </span>
                  <span className="font-mono text-[11px] text-stone-600">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3
                  className="mt-5 text-[15px] font-semibold"
                  style={{ color: `rgba(${stage.rgb},0.84)` }}
                >
                  {stage.label}
                </h3>
                <p className="mt-2 text-[12px] leading-5 text-stone-500">
                  {stage.detail}
                </p>
                {index < LANGUAGE_PRACTICE_STAGES.length - 1 ? (
                  <ArrowDown
                    size={13}
                    className="absolute bottom-3 right-3 text-stone-700 xl:-right-2 xl:bottom-auto xl:top-1/2 xl:-rotate-90"
                    aria-hidden="true"
                  />
                ) : null}
              </article>
            );
          })}
        </div>
      </section>

      <section className="mt-14 sm:mt-16">
        <div className="mb-5">
          <div className="text-violet-200/58 font-mono text-[11px] font-semibold uppercase tracking-[0.11em]">
            Instrument 01 · multilingual phrase window
          </div>
          <h2 className="mt-2 max-w-5xl text-[clamp(1.9rem,3.4vw,3.3rem)] font-semibold leading-[0.96] tracking-[-0.048em] text-white">
            Compare conventional forms without pretending translation is
            one-to-one.
          </h2>
        </div>
        <RosettaWidget />
      </section>

      <section className="mt-14 sm:mt-16">
        <div className="mb-5">
          <div className="text-amber-200/58 font-mono text-[11px] font-semibold uppercase tracking-[0.11em]">
            Instrument 02 · translation choices
          </div>
          <h2 className="mt-2 max-w-5xl text-[clamp(1.9rem,3.4vw,3.3rem)] font-semibold leading-[0.96] tracking-[-0.048em] text-white">
            See why a natural target sentence can reorganize the source grammar
            completely.
          </h2>
        </div>
        <OmniTranslator />
      </section>

      <section className="mt-14 border-t border-violet-100/[0.10] pt-8 sm:mt-16 sm:pt-10">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_440px] lg:items-end">
          <div>
            <div className="text-pink-200/58 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.11em]">
              <BookOpenText size={14} aria-hidden="true" /> Learning principles
              · reference, not navigation
            </div>
            <h2 className="mt-2 max-w-5xl text-[clamp(2rem,3.7vw,3.6rem)] font-semibold leading-[0.95] tracking-[-0.052em] text-white">
              Language ability combines perception, memory, interaction,
              literacy, and social judgment.
            </h2>
          </div>
          <p className="text-stone-400/72 text-[14px] leading-6">
            Different goals need different practice, and proficiency grows
            unevenly across listening, watching, speaking, signing, reading,
            writing, interaction, and mediation.
          </p>
        </div>
        <div className="mt-6 grid overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/[0.08] md:grid-cols-2 xl:grid-cols-3">
          {STUDY_PRINCIPLES.map(([term, text], index) => (
            <article
              key={term}
              className="grid min-h-[190px] grid-cols-[42px_minmax(0,1fr)] gap-3 border-b border-white/[0.07] px-5 py-6 xl:border-r xl:[&:nth-child(3n)]:border-r-0 xl:[&:nth-last-child(-n+3)]:border-b-0"
            >
              <span className="text-violet-200/42 font-mono text-[11px]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>
                <strong className="text-stone-200/86 block text-[14px]">
                  {term}
                </strong>
                <span className="mt-3 block text-[13px] leading-6 text-stone-500">
                  {text}
                </span>
              </span>
            </article>
          ))}
        </div>
      </section>

      <div className="mt-14 sm:mt-16">
        <LanguageEvidenceReview />
      </div>

      <section className="mt-14 pb-16 sm:mt-16 sm:pb-24">
        <div className="grid gap-5 border-t border-white/[0.09] pt-8 sm:pt-10 lg:grid-cols-[minmax(0,1fr)_440px] lg:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-violet-200/65">
              <Database size={14} aria-hidden="true" /> Source shelf · future
              catalog boundary
            </div>
            <h2 className="mt-3 max-w-5xl text-[clamp(2rem,3.7vw,3.6rem)] font-semibold leading-[0.95] tracking-[-0.052em] text-white">
              Keep language catalogs, software locales, archive metadata,
              community knowledge, and content rights distinct.
            </h2>
          </div>
          <p className="text-[14px] leading-6 text-stone-400/75">
            The root makes no provider request during rendering. These public
            interfaces define future adapters, versioning, provenance, access,
            and rights boundaries—not automatic lessons or translations.
          </p>
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-3">
          {LANGUAGE_SOURCES.map((source) => {
            const Icon = source.icon;
            return (
              <a
                key={source.label}
                href={source.href}
                target="_blank"
                rel="noreferrer"
                className="bg-[#100d18]/58 group rounded-[26px] border border-white/[0.08] p-5 backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-violet-100/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-200/60 sm:p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-[14px] border"
                    style={{
                      color: `rgb(${source.rgb})`,
                      borderColor: `rgba(${source.rgb},0.24)`,
                      background: `rgba(${source.rgb},0.055)`,
                    }}
                  >
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="text-stone-600 transition group-hover:text-violet-100/70"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-5 font-mono text-[11px] uppercase tracking-[0.09em] text-stone-500">
                  {source.eyebrow}
                </div>
                <h3 className="mt-2 text-[19px] font-semibold text-white">
                  {source.label}
                </h3>
                <p className="mt-3 text-[13px] leading-6 text-stone-400/80">
                  {source.boundary}
                </p>
              </a>
            );
          })}
        </div>
      </section>
    </SceneFrame>
  );
}

function LanguageRoute({ branch }: { branch: CurriculumNode }) {
  const meta = BRANCH_META[branch.id as LanguageBranchId];
  if (!meta) {
    throw new Error(`Missing Languages presentation metadata: ${branch.id}`);
  }
  const Icon = meta.icon;
  const planned = branch.status === "placeholder";

  if (!planned) {
    throw new Error(
      `Languages branch ${branch.id} is active but the root has no live-link presentation contract.`
    );
  }

  return (
    <div
      aria-disabled="true"
      className="bg-[#100d18]/94 min-h-[230px] p-5 opacity-[0.74] sm:p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className="flex h-11 w-11 items-center justify-center rounded-[14px] border"
          style={{
            color: `rgb(${meta.rgb})`,
            borderColor: `rgba(${meta.rgb},0.26)`,
            background: `rgba(${meta.rgb},0.055)`,
          }}
        >
          <Icon size={18} aria-hidden="true" />
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.11em] text-stone-600">
          planned
        </span>
      </div>
      <div
        className="mt-5 font-mono text-[11px] uppercase tracking-[0.10em]"
        style={{ color: `rgba(${meta.rgb},0.62)` }}
      >
        {meta.code}
      </div>
      <h4 className="mt-2 text-[18px] font-semibold text-white">
        {branch.label}
      </h4>
      <p className="mt-2 text-[13px] leading-6 text-stone-400">
        {meta.question}
      </p>
    </div>
  );
}
