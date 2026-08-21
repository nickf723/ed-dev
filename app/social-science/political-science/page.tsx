import type { Metadata } from "next";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame } from "@/app/_page-system/scene";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Building2,
  CircleDollarSign,
  Database,
  Globe2,
  Landmark,
  Microscope,
  Scale,
  Vote,
} from "lucide-react";
import ParliamentWidget from "./ParliamentWidget";
import PoliticalScienceBackground from "./PoliticalScienceBackground";
import PoliticalScienceEvidenceReview from "./PoliticalScienceEvidenceReview";
import {
  POLITICAL_SCIENCE_DIRECT_BRANCH_IDS,
  type PoliticalScienceBranchId,
} from "./politicalScienceModel";

const NODE_ID = "social.political-science";

export const metadata: Metadata = {
  title: "Political Science | Education Station 64",
  description:
    "Navigate political science through analytical lenses, governing mechanisms, and cross-border contexts, then test coalition arithmetic and evidence claims.",
};

type BranchMeta = {
  icon: LucideIcon;
  group: "lens" | "mechanism" | "context";
  question: string;
  rgb: string;
  marker: string;
};

const BRANCH_META: Record<PoliticalScienceBranchId, BranchMeta> = {
  "social.political-science.theory": {
    icon: BookOpen,
    group: "lens",
    question: "What makes authority legitimate, just, free, equal, or binding?",
    rgb: "251,191,36",
    marker: "norm",
  },
  "social.political-science.comparative": {
    icon: BarChart3,
    group: "lens",
    question:
      "Why do political systems differ, persist, democratize, or break down?",
    rgb: "96,165,250",
    marker: "compare",
  },
  "social.political-science.institutions": {
    icon: Building2,
    group: "mechanism",
    question:
      "How do constitutions, legislatures, executives, courts, and rules shape outcomes?",
    rgb: "167,139,250",
    marker: "rules",
  },
  "social.political-science.behavior": {
    icon: Vote,
    group: "mechanism",
    question:
      "How do citizens, parties, campaigns, identities, and information shape participation?",
    rgb: "244,114,182",
    marker: "input",
  },
  "social.political-science.policy": {
    icon: Landmark,
    group: "mechanism",
    question:
      "How do problems reach agendas, become policy, and survive implementation?",
    rgb: "52,211,153",
    marker: "output",
  },
  "social.political-science.international-relations": {
    icon: Globe2,
    group: "context",
    question:
      "Why do political actors cooperate, compete, bargain, deter, or fight across borders?",
    rgb: "34,211,238",
    marker: "borders",
  },
  "social.political-science.political-economy": {
    icon: CircleDollarSign,
    group: "context",
    question:
      "How do political rules, material resources, and economic interests shape one another?",
    rgb: "250,204,21",
    marker: "resources",
  },
  "social.political-science.methods": {
    icon: Microscope,
    group: "lens",
    question:
      "What evidence could distinguish rival explanations of political outcomes?",
    rgb: "148,163,184",
    marker: "evidence",
  },
};

const NAVIGATION_GROUPS = [
  {
    id: "lens",
    eyebrow: "Analytical lenses",
    title: "Frame the question",
    note: "Normative argument, comparison, and research design can be applied across every political process.",
    ids: [
      "social.political-science.theory",
      "social.political-science.comparative",
      "social.political-science.methods",
    ],
  },
  {
    id: "mechanism",
    eyebrow: "Governing mechanisms",
    title: "Trace collective choice",
    note: "Preferences and participation meet institutional rules; policies then enter implementation and feed back into politics.",
    ids: [
      "social.political-science.behavior",
      "social.political-science.institutions",
      "social.political-science.policy",
    ],
  },
  {
    id: "context",
    eyebrow: "Material and cross-border context",
    title: "Follow power beyond one chamber",
    note: "Political economy and international relations track resources, interdependence, bargaining, institutions, and conflict across boundaries.",
    ids: [
      "social.political-science.political-economy",
      "social.political-science.international-relations",
    ],
  },
] as const satisfies readonly {
  id: BranchMeta["group"];
  eyebrow: string;
  title: string;
  note: string;
  ids: readonly PoliticalScienceBranchId[];
}[];

const RECURRING_QUESTIONS = [
  {
    label: "Authority",
    text: "Who can make binding decisions, through which recognized office or rule, and why are those decisions accepted or resisted?",
    rgb: "251,191,36",
  },
  {
    label: "Institutions",
    text: "Which formal and informal rules structure incentives, veto points, representation, enforcement, and accountability?",
    rgb: "167,139,250",
  },
  {
    label: "Collective choice",
    text: "How do many preferences become one policy, government, coalition, budget, agreement, or public outcome?",
    rgb: "244,114,182",
  },
  {
    label: "Power",
    text: "Who can shape agendas, resources, information, participation, implementation, and the range of feasible choices?",
    rgb: "34,211,238",
  },
] as const;

const POLITICAL_SCIENCE_SOURCES = [
  {
    label: "Congress.gov API",
    eyebrow: "Bills · actions · votes · committees · members",
    href: "https://api.congress.gov/",
    boundary:
      "A future legislative shelf can preserve congress, chamber, bill type and number, action date, text version, committee, vote identifier, member identifier, update date, source URL, and retrieval time. An official legislative record documents procedure and text; it does not by itself establish intent, implementation, effect, or causal importance.",
    rgb: "251,191,36",
    icon: Landmark,
  },
  {
    label: "World Bank Indicators API",
    eyebrow: "Countries · indicators · years · sources · metadata",
    href: "https://datahelpdesk.worldbank.org/knowledgebase/articles/889392",
    boundary:
      "Version 2 can support cross-national series while retaining country and indicator codes, year, value, unit, source database, source note and organization, update or retrieval time, pagination, and missingness. A comparable-looking indicator may still be revised, modeled, aggregated, or measured differently; correlation is not a political mechanism.",
    rgb: "34,211,238",
    icon: BarChart3,
  },
  {
    label: "V-Dem Dataset",
    eyebrow: "Versioned indicators · indices · codebooks · uncertainty",
    href: "https://www.v-dem.net/data/the-v-dem-dataset/",
    boundary:
      "A democracy-data repository must retain dataset version, country-year or country-date unit, variable and scale, codebook definition, model output and uncertainty where supplied, citation, cautionary notes, and license. Expert-coded latent estimates are modeled measurements—not raw observations, neutral rankings, or automatic explanations of change.",
    rgb: "167,139,250",
    icon: Database,
  },
] as const satisfies readonly {
  label: string;
  eyebrow: string;
  href: string;
  boundary: string;
  rgb: string;
  icon: LucideIcon;
}[];

export default function PoliticalSciencePage() {
  const context = requireCurriculumPageContext(NODE_ID);

  if (context.pageKind !== "hub") {
    throw new Error(
      "Political Science must be classified as a navigation hub."
    );
  }

  const directIds = context.children.map((child) => child.id);
  if (
    directIds.length !== POLITICAL_SCIENCE_DIRECT_BRANCH_IDS.length ||
    directIds.some(
      (id, index) => id !== POLITICAL_SCIENCE_DIRECT_BRANCH_IDS[index]
    )
  ) {
    throw new Error(
      "Political Science branch navigation is out of sync with the curriculum registry."
    );
  }

  const children = new Map(context.children.map((child) => [child.id, child]));

  return (
    <SceneFrame
      background={<PoliticalScienceBackground />}
      className="bg-[#070604] text-slate-100 selection:bg-amber-400/25"
      maxWidthClassName="max-w-[1580px]"
      headerBackground="rgba(7,6,4,0.54)"
      header={
        <DomainPageHeader
          breadcrumbs={context.breadcrumbs}
          eyebrow="Power · legitimacy · institutions · behavior · policy · international order"
          eyebrowStyle="rule"
          icon={Landmark}
          title={<span>Political Science</span>}
          subtitle="Political science explains how collective decisions are authorized, contested, translated through institutions, implemented, and evaluated. Choose a branch by the mechanism or question—not by a preferred political team."
          accentRgb="251, 191, 36"
          titleClassName="font-sans text-[clamp(2.8rem,5.3vw,6rem)] font-semibold leading-[0.84] tracking-[-0.066em] text-[#fffaf0]"
          headerClassName="border-amber-100/[0.09]"
        />
      }
    >
      <section className="bg-[#0b0906]/48 relative isolate mt-8 overflow-hidden rounded-[38px] border border-amber-100/[0.12] px-4 py-6 backdrop-blur-xl sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(251,191,36,0.045),transparent_32%,rgba(148,163,184,0.018))]" />
        <div className="relative">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end">
            <div>
              <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.13em] text-amber-200/70">
                <Scale size={14} aria-hidden="true" /> Primary navigation ·
                eight curriculum peers
              </div>
              <h2 className="mt-3 max-w-5xl text-[clamp(2.1rem,4vw,4.2rem)] font-semibold leading-[0.93] tracking-[-0.055em] text-white">
                Start with the question, then locate the rules that turn power
                into outcomes.
              </h2>
            </div>
            <p className="text-[14px] leading-6 text-slate-300/70">
              These bands are analytical groupings, not hidden curriculum
              parents. Every destination remains a direct child of Political
              Science, and planned pages are labeled without pretending their
              routes exist.
            </p>
          </div>

          <nav
            aria-label="Political Science branches"
            className="mt-8 space-y-4"
          >
            {NAVIGATION_GROUPS.map((group, groupIndex) => (
              <section
                key={group.id}
                className="overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/[0.10]"
              >
                <div className="grid border-b border-white/[0.07] md:grid-cols-[220px_minmax(0,1fr)]">
                  <div className="p-4 sm:p-5">
                    <div className="font-mono text-[11px] uppercase tracking-[0.13em] text-amber-100/55">
                      0{groupIndex + 1} · {group.eyebrow}
                    </div>
                    <h3 className="mt-2 text-[18px] font-semibold text-white">
                      {group.title}
                    </h3>
                  </div>
                  <p className="border-t border-white/[0.07] p-4 text-[13px] leading-6 text-slate-400 sm:p-5 md:border-l md:border-t-0">
                    {group.note}
                  </p>
                </div>
                <div
                  className={`grid gap-px bg-white/[0.06] ${
                    group.ids.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"
                  }`}
                >
                  {group.ids.map((id, index) => {
                    const child = children.get(id);
                    if (!child) {
                      throw new Error(
                        `Missing Political Science branch: ${id}`
                      );
                    }
                    return (
                      <PoliticalRoute
                        key={id}
                        branch={child}
                        sequence={index + 1}
                      />
                    );
                  })}
                </div>
              </section>
            ))}
          </nav>
        </div>
      </section>

      <section className="mt-14 sm:mt-16">
        <div className="mb-4 flex items-center gap-3">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-amber-200/70">
            Institutional instrument
          </span>
          <span className="h-px flex-1 bg-gradient-to-r from-amber-200/[0.18] to-transparent" />
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-slate-600">
            preferences → seats → coalition constraint
          </span>
        </div>
        <ParliamentWidget />
      </section>

      <section className="mt-14 border-t border-white/[0.09] pt-8 sm:mt-16 sm:pt-10">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end">
          <div>
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
              Recurring questions · reference, not navigation
            </div>
            <h2 className="mt-3 max-w-5xl text-[clamp(2rem,3.7vw,3.6rem)] font-semibold leading-[0.95] tracking-[-0.052em] text-white">
              Political systems differ, but four analytical questions keep
              returning.
            </h2>
          </div>
          <p className="text-[14px] leading-6 text-slate-400/75">
            Elections are only one part of the field. The unit under study may
            be a person, group, district, institution, policy, state, treaty,
            network, historical process, or international system.
          </p>
        </div>

        <div className="mt-6 grid overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/[0.10] md:grid-cols-2 xl:grid-cols-4">
          {RECURRING_QUESTIONS.map((item) => (
            <QuestionBand key={item.label} {...item} />
          ))}
        </div>
      </section>

      <div className="mt-14 sm:mt-16">
        <PoliticalScienceEvidenceReview />
      </div>

      <section className="mt-14 pb-16 sm:mt-16 sm:pb-24">
        <div className="grid gap-5 border-t border-white/[0.09] pt-8 sm:pt-10 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-amber-100/65">
              <Database size={14} aria-hidden="true" /> Source shelf · future
              collection boundary
            </div>
            <h2 className="mt-3 max-w-5xl text-[clamp(2rem,3.7vw,3.6rem)] font-semibold leading-[0.95] tracking-[-0.052em] text-white">
              Gather political records without flattening records, indicators,
              and explanations.
            </h2>
          </div>
          <p className="text-[14px] leading-6 text-slate-400/75">
            The root makes no provider request during rendering. These official
            interfaces define future adapters, provenance, versioning, and the
            limits of what each record can support.
          </p>
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-3">
          {POLITICAL_SCIENCE_SOURCES.map((source) => {
            const Icon = source.icon;
            return (
              <a
                key={source.label}
                href={source.href}
                target="_blank"
                rel="noreferrer"
                className="bg-[#0b0906]/54 group rounded-[26px] border border-white/[0.08] p-5 backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-amber-100/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/60 sm:p-6"
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
                    className="text-slate-600 transition group-hover:text-amber-100/70"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-5 font-mono text-[11px] uppercase tracking-[0.09em] text-slate-500">
                  {source.eyebrow}
                </div>
                <h3 className="mt-2 text-[19px] font-semibold text-white">
                  {source.label}
                </h3>
                <p className="mt-3 text-[13px] leading-6 text-slate-400/80">
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

function PoliticalRoute({
  branch,
  sequence,
}: {
  branch: CurriculumNode;
  sequence: number;
}) {
  const meta = BRANCH_META[branch.id as PoliticalScienceBranchId];
  if (!meta) {
    throw new Error(
      `Missing Political Science presentation metadata: ${branch.id}`
    );
  }
  const Icon = meta.icon;
  const planned = branch.status === "placeholder";
  const card = (
    <article
      className={`bg-[#0a0806]/92 group min-h-[218px] p-5 sm:p-6 ${
        planned ? "opacity-[0.72]" : "transition hover:bg-[#100c08]"
      }`}
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
        <span className="font-mono text-[11px] uppercase tracking-[0.11em] text-slate-600">
          {planned ? "planned" : `open · ${sequence}`}
        </span>
      </div>
      <div className="mt-5 font-mono text-[11px] uppercase tracking-[0.12em] text-slate-600">
        {meta.marker}
      </div>
      <h4 className="mt-2 text-[18px] font-semibold text-white">
        {branch.label}
      </h4>
      <p className="mt-2 text-[13px] leading-6 text-slate-400">
        {meta.question}
      </p>
      {!planned ? (
        <span className="mt-4 inline-flex items-center gap-2 text-[12px] font-semibold text-amber-100/70">
          Enter branch <ArrowRight size={13} aria-hidden="true" />
        </span>
      ) : null}
    </article>
  );

  return planned ? (
    <div aria-disabled="true">{card}</div>
  ) : (
    <Link
      href={branch.href}
      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-amber-200/60"
    >
      {card}
    </Link>
  );
}

function QuestionBand({
  label,
  text,
  rgb,
}: {
  label: string;
  text: string;
  rgb: string;
}) {
  return (
    <article className="relative min-h-[190px] border-b border-white/[0.07] px-5 py-6 last:border-b-0 md:border-r xl:border-b-0 xl:last:border-r-0 md:[&:nth-child(2n)]:border-r-0 xl:[&:nth-child(2n)]:border-r">
      <div
        className="absolute left-0 top-6 h-12 w-px"
        style={{ background: `rgba(${rgb},0.48)` }}
      />
      <div
        className="font-mono text-[11px] font-semibold uppercase tracking-[0.10em]"
        style={{ color: `rgb(${rgb})` }}
      >
        {label}
      </div>
      <p className="mt-4 text-[14px] leading-6 text-slate-300/70">{text}</p>
    </article>
  );
}
