import type { Metadata } from "next";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame } from "@/app/_page-system/scene";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import {
  ArrowRight,
  Compass,
  Globe2,
  Layers3,
  Map,
  Mountain,
} from "lucide-react";
import GeographyEvidenceLab from "./GeographyEvidenceLab";
import GeographyLayerDeck from "./GeographyLayerDeck";
import GlobeBackground from "./GlobeBackground";
import PopulationPyramid from "./PopulationPyramid";
import { GEOGRAPHY_BRANCH_IDS } from "./geographyModel";

const NODE_ID = "social.geography";

export const metadata: Metadata = {
  title: "Geography",
  description:
    "Study how population, movement, settlements, culture, politics, economies, development, and spatial methods connect people and places across scale.",
};

const REASONING = [
  {
    label: "Location",
    text: "Where is it, and why there rather than somewhere else?",
  },
  {
    label: "Distribution",
    text: "Is the pattern clustered, dispersed, linear, concentrated, or uneven?",
  },
  {
    label: "Connection",
    text: "What flows between places: people, goods, money, ideas, water, energy, or risk?",
  },
  {
    label: "Scale",
    text: "Does the pattern look different when the unit of analysis changes?",
  },
  {
    label: "Place",
    text: "Which material, environmental, historical, and cultural traits make this location distinctive?",
  },
  {
    label: "Change",
    text: "How do movement, policy, environment, technology, and time reorganize the spatial pattern?",
  },
] as const;

export default function GeographyPage() {
  const context = requireCurriculumPageContext(NODE_ID);

  if (context.pageKind !== "hub") {
    throw new Error("Geography must be classified as a navigation hub.");
  }

  assertBranchCoverage(context.children);

  return (
    <SceneFrame
      background={<GlobeBackground />}
      className="bg-[#020817] text-slate-100 selection:bg-sky-300/25"
      maxWidthClassName="max-w-[1600px]"
      headerBackground="rgba(2,8,23,0.46)"
      header={
        <DomainPageHeader
          breadcrumbs={context.breadcrumbs}
          eyebrow="Location · pattern · connection · scale · place · change"
          eyebrowStyle="rule"
          icon={Globe2}
          title={<span>Geography</span>}
          subtitle="Geography asks why patterns are where they are, how places are connected, and what changes when the scale of observation changes. In social science, the emphasis is human spatial organization: population, movement, settlements, culture, politics, economies, development, and the tools used to map them."
          accentRgb="56, 189, 248"
          titleClassName="font-sans text-[clamp(2.9rem,5.5vw,6.2rem)] font-semibold leading-[0.84] tracking-[-0.065em] text-[#f2fbff]"
          headerClassName="border-sky-100/[0.09]"
          aside={
            <div className="grid grid-cols-3 border border-sky-100/[0.12] bg-black/20 font-mono">
              <HeaderMeasure value="8" label="layers" />
              <HeaderMeasure value="4" label="scales" bordered />
              <HeaderMeasure value="1" label="world" />
            </div>
          }
        />
      }
    >
      <section className="relative isolate mt-7 overflow-hidden border-y border-sky-100/[0.12] py-6 sm:py-7">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(2,8,23,0.34),transparent_29%,transparent_72%,rgba(2,8,23,0.28))] backdrop-blur-[5px]" />
        <div className="relative grid gap-5 lg:grid-cols-[minmax(0,1fr)_310px] lg:items-end">
          <div className="rounded-[20px] bg-[#03101f]/[0.24] px-4 py-3 backdrop-blur-[18px]">
            <div className="text-sky-200/68 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em]">
              <Map size={14} aria-hidden="true" /> Primary navigation · GIS
              light table
            </div>
            <h2 className="mt-2 max-w-5xl text-[clamp(1.9rem,3.8vw,3.8rem)] font-semibold leading-[0.94] tracking-[-0.052em] text-white">
              Lay different human-geography questions over the same world and
              watch what each layer makes visible.
            </h2>
            <p className="mt-3 max-w-4xl text-[14px] leading-6 text-slate-300/75">
              Population, migration, settlements, culture, politics, economy,
              development, and GIS overlap in real places. The layer stack is an
              orientation device, not a claim that one lens explains the others.
            </p>
          </div>
          <Link
            href={context.parent?.href ?? "/social-science"}
            className="group flex items-center justify-between gap-4 border border-white/[0.08] bg-[#03101f]/[0.34] px-4 py-4 backdrop-blur-[16px] transition hover:bg-[#03101f]/[0.46] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-200/60"
          >
            <span>
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-500">
                Parent field
              </span>
              <strong className="mt-1 block text-[15px] text-white">
                {context.parent?.label ?? "Social Science"}
              </strong>
            </span>
            <ArrowRight
              size={15}
              className="text-sky-200/55 transition group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>

        <GeographyLayerDeck branches={context.children} />
      </section>

      <section className="mt-24">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="rounded-[18px] bg-[#03101f]/[0.18] px-4 py-3 backdrop-blur-[14px]">
            <div className="text-pink-200/62 font-mono text-[11px] font-semibold uppercase tracking-[0.11em]">
              Demographic instrument
            </div>
            <h2 className="mt-1 text-[clamp(1.6rem,2.6vw,2.35rem)] font-semibold tracking-[-0.04em] text-white">
              A population pyramid is a spatial clue, not a destiny.
            </h2>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-slate-600">
            normalized teaching profiles
          </span>
        </div>
        <PopulationPyramid />
      </section>

      <section className="mt-24 border-t border-sky-100/[0.10] pt-7">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end">
          <div className="rounded-[18px] bg-[#03101f]/[0.18] px-4 py-3 backdrop-blur-[14px]">
            <div className="text-emerald-200/58 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.11em]">
              <Compass size={14} aria-hidden="true" /> Spatial reasoning ·
              reference, not navigation
            </div>
            <h2 className="mt-2 max-w-4xl text-[clamp(1.8rem,3.2vw,3rem)] font-semibold leading-[0.96] tracking-[-0.048em] text-white">
              Maps become explanations only when the pattern is connected to a
              mechanism.
            </h2>
          </div>
          <p className="text-slate-400/78 rounded-[16px] bg-[#03101f]/[0.18] px-4 py-3 text-[14px] leading-6 backdrop-blur-[14px]">
            A map can reveal clustering, distance, gradients, barriers, or
            networks. It cannot by itself tell you why the pattern exists.
            Geographic reasoning links spatial evidence to environmental,
            social, political, economic, technological, and historical
            processes.
          </p>
        </div>

        <div className="mt-6 grid border-y border-white/[0.08] md:grid-cols-2 xl:grid-cols-3">
          {REASONING.map((item, index) => (
            <div
              key={item.label}
              className="grid grid-cols-[44px_minmax(0,1fr)] gap-3 border-b border-white/[0.07] bg-[#03101f]/[0.12] px-4 py-5 backdrop-blur-[10px] xl:border-b xl:border-r xl:[&:nth-child(3n)]:border-r-0 md:[&:nth-last-child(-n+2)]:border-b-0 xl:[&:nth-last-child(-n+3)]:border-b-0"
            >
              <span className="text-sky-200/42 font-mono text-[11px]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>
                <strong className="block text-[14px] text-slate-200/90">
                  {item.label}
                </strong>
                <span className="mt-1 block text-[13px] leading-5 text-slate-500">
                  {item.text}
                </span>
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-24">
        <GeographyEvidenceLab />
      </section>

      <section className="mt-20 grid gap-5 pb-8 lg:grid-cols-2">
        <Link
          href="/natural-science/earth-science/geography"
          className="group border-l border-emerald-200/25 bg-emerald-300/[0.025] px-5 py-5 backdrop-blur-xl transition hover:bg-emerald-300/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200/60"
        >
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-100/55">
            <Mountain size={13} aria-hidden="true" /> Conceptual cross-link ·
            Natural Science
          </div>
          <strong className="mt-2 block text-[20px] text-white">
            Physical Geography
          </strong>
          <p className="mt-2 max-w-2xl text-[14px] leading-6 text-slate-400">
            Follow landforms, climate, water, soils, and Earth-surface processes
            there. This hub owns the social organization of people, places,
            networks, and landscapes.
          </p>
          <span className="mt-4 inline-flex items-center gap-2 text-[12px] font-semibold text-emerald-100/70">
            Open the Earth-systems branch
            <ArrowRight
              size={13}
              className="transition group-hover:translate-x-1"
              aria-hidden="true"
            />
          </span>
        </Link>

        <div className="border-l border-sky-200/25 bg-sky-300/[0.025] px-5 py-5 backdrop-blur-xl">
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-sky-100/55">
            <Layers3 size={13} aria-hidden="true" /> Reviewed teaching sources
          </div>
          <p className="mt-2 text-[14px] leading-6 text-slate-400">
            The spatial-reasoning contract follows the Association of American
            Geographers’ discipline framing and College Board’s emphasis on
            patterns, visual evidence, and scale. The population instrument’s
            representation boundary is checked against U.S. Census Bureau
            guidance.
          </p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[12px] font-semibold text-sky-100/70">
            <a
              href="https://www.aag.org/program/geoweek/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              AAG discipline framing ↗
            </a>
            <a
              href="https://apstudents.collegeboard.org/courses/ap-human-geography"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              Human Geography skills ↗
            </a>
            <a
              href="https://www.census.gov/library/visualizations/interactive/age-sex-pyramid-for-the-united-states.html"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              Census age-sex pyramid ↗
            </a>
          </div>
          <p className="mt-4 text-[12px] leading-5 text-slate-600">
            All globe lights, routes, layer motifs, population shapes, and map
            cases on this page are schematic teaching models—not measured claims
            about a real place.
          </p>
        </div>
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
      <strong className="block text-[18px] text-sky-100">{value}</strong>
      <span className="text-[10px] uppercase tracking-[0.12em] text-slate-600">
        {label}
      </span>
    </div>
  );
}

function assertBranchCoverage(children: readonly CurriculumNode[]) {
  const expected = new Set<string>(GEOGRAPHY_BRANCH_IDS);
  const actual = new Set(children.map((child) => child.id));
  const missing = GEOGRAPHY_BRANCH_IDS.filter((id) => !actual.has(id));
  const unexpected = children.filter((child) => !expected.has(child.id));

  if (
    missing.length > 0 ||
    unexpected.length > 0 ||
    actual.size !== children.length ||
    children.length !== GEOGRAPHY_BRANCH_IDS.length
  ) {
    throw new Error(
      `Geography layer deck and curriculum disagree. Missing: ${missing.join(", ") || "none"}; unexpected: ${unexpected.map((node) => node.id).join(", ") || "none"}.`
    );
  }
}
