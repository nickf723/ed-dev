import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame, Surface } from "@/app/_page-system/scene";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import {
  ArrowRight,
  Building2,
  Compass,
  Database,
  Factory,
  Globe2,
  Landmark,
  Map,
  MoveRight,
  Network,
  Ruler,
  Satellite,
  UsersRound,
  Waypoints,
  type LucideIcon,
} from "lucide-react";
import GlobeBackground from "./GlobeBackground";
import PopulationPyramid from "./PopulationPyramid";

const NODE_ID = "social.geography";

type BranchMeta = {
  icon: LucideIcon;
  code: string;
  prompt: string;
  rgb: string;
};

const BRANCH_META: Record<string, BranchMeta> = {
  "social.geography.population": {
    icon: UsersRound,
    code: "POP",
    prompt: "Where are people concentrated, and how does population structure differ between places?",
    rgb: "56,189,248",
  },
  "social.geography.migration": {
    icon: Waypoints,
    code: "MOV",
    prompt: "What moves people, what blocks movement, and how do routes reshape origins and destinations?",
    rgb: "167,139,250",
  },
  "social.geography.urban": {
    icon: Building2,
    code: "URB",
    prompt: "Why do settlements form where they do, and how do cities organize land, housing, work, and infrastructure?",
    rgb: "251,191,36",
  },
  "social.geography.cultural": {
    icon: Network,
    code: "CUL",
    prompt: "How do language, belief, identity, diffusion, and memory become visible in landscapes and regions?",
    rgb: "244,114,182",
  },
  "social.geography.political": {
    icon: Landmark,
    code: "POL",
    prompt: "How do borders, territory, states, elections, and conflict organize political power across space?",
    rgb: "248,113,113",
  },
  "social.geography.economic": {
    icon: Factory,
    code: "ECO",
    prompt: "Why are production, trade, labor, logistics, and wealth distributed unevenly across locations and networks?",
    rgb: "94,234,212",
  },
  "social.geography.development": {
    icon: MoveRight,
    code: "DEV",
    prompt: "How do infrastructure, institutions, health, wealth, inequality, and opportunity vary across regions and scales?",
    rgb: "74,222,128",
  },
  "social.geography.methods": {
    icon: Satellite,
    code: "GIS",
    prompt: "How do maps, field observations, remote sensing, spatial data, and GIS change what geographic questions can be answered?",
    rgb: "125,211,252",
  },
};

const SCALE_LEVELS = [
  { label: "Site", text: "a building, intersection, parcel, habitat, or immediate setting" },
  { label: "Local", text: "a neighborhood, settlement, district, watershed, or commuting area" },
  { label: "Regional", text: "a metropolitan system, state, cultural region, biome, or trade corridor" },
  { label: "Global", text: "planetary networks, migration systems, climate, trade, and worldwide distributions" },
] as const;

const REASONING = [
  { label: "Location", text: "Where is it, and why there rather than somewhere else?" },
  { label: "Distribution", text: "Is the pattern clustered, dispersed, linear, concentrated, or uneven?" },
  { label: "Connection", text: "What flows between places: people, goods, money, ideas, water, energy, or risk?" },
  { label: "Scale", text: "Does the pattern look different when the unit of analysis changes?" },
  { label: "Place", text: "Which material, environmental, historical, and cultural traits make this location distinctive?" },
  { label: "Change", text: "How do movement, policy, environment, technology, and time reorganize the spatial pattern?" },
] as const;

export default function GeographyPage() {
  const context = requireCurriculumPageContext(NODE_ID);

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
        />
      }
    >
      <section className="relative isolate mt-5 overflow-hidden border-y border-sky-100/[0.12] py-5 sm:py-6">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(2,8,23,0.42),transparent_29%,transparent_72%,rgba(2,8,23,0.32))] backdrop-blur-[2px]" />
        <div className="relative grid gap-4 lg:grid-cols-[minmax(0,1fr)_290px] lg:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-sky-200/68"><Map size={14} /> Primary navigation · human geography atlas</div>
            <h2 className="mt-2 max-w-5xl text-[clamp(1.9rem,3.8vw,3.8rem)] font-semibold leading-[0.94] tracking-[-0.052em] text-white">
              Read the same world as population, movement, settlement, culture, power, economy, development, or spatial evidence.
            </h2>
            <p className="mt-3 max-w-4xl text-[14px] leading-6 text-slate-300/70">
              These are the direct branches planned beneath Geography. They are different lenses on overlapping places, not isolated maps. A city can be demographic, political, cultural, economic, and infrastructural at the same time.
            </p>
          </div>
          <Link href="/social-science" className="group flex items-center justify-between gap-4 border-l border-sky-200/[0.18] bg-black/[0.09] px-4 py-3 backdrop-blur-[8px] transition hover:bg-black/[0.16]">
            <span><span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">Parent field</span><strong className="mt-1 block text-[14px] text-white">Social Science</strong></span>
            <ArrowRight size={15} className="text-sky-200/55 transition group-hover:translate-x-1" />
          </Link>
        </div>

        <AtlasNavigation branches={context.children} />
      </section>

      <section className="mt-8">
        <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-pink-200/62">Demographic instrument</div>
            <h2 className="mt-1 text-[23px] font-semibold tracking-[-0.035em] text-white">A population pyramid is a spatial clue, not a destiny.</h2>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-slate-600">normalized teaching profiles</span>
        </div>
        <PopulationPyramid />
      </section>

      <section className="mt-8 border-t border-sky-100/[0.10] pt-5">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-emerald-200/58"><Compass size={14} /> Spatial reasoning · reference, not navigation</div>
            <h2 className="mt-2 max-w-4xl text-[clamp(1.8rem,3.2vw,3rem)] font-semibold leading-[0.96] tracking-[-0.048em] text-white">Maps become explanations only when the pattern is connected to a mechanism.</h2>
          </div>
          <p className="text-[14px] leading-6 text-slate-400/72">A map can reveal clustering, distance, gradients, barriers, or networks. It cannot by itself tell you why the pattern exists. Geographic reasoning links spatial evidence to environmental, social, political, economic, technological, and historical processes.</p>
        </div>

        <div className="mt-5 grid border-y border-white/[0.08] md:grid-cols-2 xl:grid-cols-3">
          {REASONING.map((item, index) => (
            <div key={item.label} className="grid grid-cols-[42px_minmax(0,1fr)] gap-3 border-b border-white/[0.07] px-4 py-4 md:[&:nth-last-child(-n+2)]:border-b-0 xl:border-b xl:[&:nth-last-child(-n+3)]:border-b-0 xl:border-r xl:[&:nth-child(3n)]:border-r-0">
              <span className="font-mono text-[11px] text-sky-200/42">0{index + 1}</span>
              <span><strong className="block text-[13px] text-slate-200/86">{item.label}</strong><span className="mt-1 block text-[12px] leading-5 text-slate-500">{item.text}</span></span>
            </div>
          ))}
        </div>
      </section>
    </SceneFrame>
  );
}

function AtlasNavigation({ branches }: { branches: readonly CurriculumNode[] }) {
  const left = branches.slice(0, 4);
  const right = branches.slice(4);
  return (
    <div className="relative mt-5 min-h-[540px] overflow-hidden border border-sky-100/[0.09] bg-black/[0.025] backdrop-blur-[1px]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(2,8,23,0.34),transparent_30%,transparent_70%,rgba(2,8,23,0.30))]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[78%] w-[44%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-100/[0.06]" />

      <div className="relative grid min-h-[540px] gap-4 p-4 xl:grid-cols-[minmax(0,1fr)_300px_minmax(0,1fr)] xl:items-center sm:p-5">
        <div className="space-y-2.5">{left.map((branch) => <AtlasRoute key={branch.id} branch={branch} side="left" />)}</div>
        <ScaleStack />
        <div className="space-y-2.5">{right.map((branch) => <AtlasRoute key={branch.id} branch={branch} side="right" />)}</div>
      </div>

      <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[11px] uppercase tracking-[0.08em] text-sky-100/28">background routes are conceptual mobility traces · city lights are illustrative</div>
    </div>
  );
}

function AtlasRoute({ branch, side }: { branch: CurriculumNode; side: "left" | "right" }) {
  const meta = BRANCH_META[branch.id] ?? { icon: Map, code: "GEO", prompt: branch.description ?? "Explore this branch of geography.", rgb: "56,189,248" };
  const Icon = meta.icon;
  const planned = branch.status === "placeholder";
  const content = (
    <div className="group relative min-h-[96px] border-y border-white/[0.07] bg-black/[0.08] px-3 py-3 backdrop-blur-[9px] transition hover:bg-black/[0.13]" style={{ boxShadow: `inset ${side === "left" ? "3px" : "-3px"} 0 0 rgba(${meta.rgb},0.40)` }}>
      <div className="grid grid-cols-[38px_minmax(0,1fr)_54px] items-start gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full border" style={{ color: `rgb(${meta.rgb})`, borderColor: `rgba(${meta.rgb},0.28)`, background: `rgba(${meta.rgb},0.05)` }}><Icon size={15} /></span>
        <span><span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em]" style={{ color: `rgba(${meta.rgb},0.70)` }}>{meta.code}</span><strong className="mt-0.5 block text-[15px] text-white/88">{branch.label}</strong><span className="mt-1 block text-[11px] leading-4 text-slate-500">{meta.prompt}</span></span>
        <span className="pt-1 text-right font-mono text-[11px] uppercase text-slate-600">{planned ? "planned" : "open"}</span>
      </div>
    </div>
  );
  return planned ? <div aria-disabled="true">{content}</div> : <Link href={branch.href}>{content}</Link>;
}

function ScaleStack() {
  return (
    <Surface variant="ghost" className="relative min-h-[390px] overflow-hidden rounded-[28px] border-sky-100/[0.09]" style={{ background: "rgba(2,8,23,0.06)" }}>
      <div className="relative p-4">
        <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-sky-200/54"><Ruler size={13} /> Change the scale</div>
        <p className="mt-2 text-[12px] leading-5 text-slate-400/64">The same phenomenon can reverse, disappear, or become visible when the unit of analysis changes.</p>
      </div>
      <div className="relative mx-4 mt-1">
        <div className="pointer-events-none absolute bottom-5 left-[17px] top-5 w-px bg-gradient-to-b from-sky-200/32 via-violet-200/26 to-emerald-200/26" />
        {SCALE_LEVELS.map((level, index) => (
          <div key={level.label} className="relative grid grid-cols-[36px_minmax(0,1fr)] gap-3 py-4">
            <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-sky-100/[0.12] bg-[#03101e]/76 font-mono text-[11px] text-sky-100/58">0{index + 1}</span>
            <span className="border-b border-white/[0.06] pb-4"><strong className="block text-[13px] text-white/82">{level.label}</strong><span className="mt-1 block text-[11px] leading-4 text-slate-500">{level.text}</span></span>
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 right-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.07em] text-emerald-200/38"><Database size={12} /> unit of analysis matters</div>
    </Surface>
  );
}
