import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame, Surface } from "@/app/_page-system/scene";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowDown,
  Beef,
  Bot,
  Droplets,
  Fish,
  Flower2,
  Gauge,
  Leaf,
  Scale,
  Sprout,
  Tractor,
  Trees,
  Wheat,
} from "lucide-react";
import AgriBackground from "./AgriBackground";
import NitrogenLab from "./NitrogenLab";

const NODE_ID = "applied.agriculture";

type BranchMeta = {
  icon: LucideIcon;
  code: string;
  question: string;
  rgb: string;
  group: "production" | "resources";
};

const BRANCH_META: Record<string, BranchMeta> = {
  "applied.agriculture.agronomy": {
    icon: Wheat,
    code: "AGR",
    question: "How do crops, rotations, genetics, weeds, pests, water, nutrients, and weather interact across a field season?",
    rgb: "250,204,21",
    group: "production",
  },
  "applied.agriculture.soil-nutrients": {
    icon: Sprout,
    code: "SOI",
    question: "How do soil structure, organisms, organic matter, water, chemistry, erosion, and nutrient cycling constrain what can be grown?",
    rgb: "180,144,92",
    group: "resources",
  },
  "applied.agriculture.horticulture": {
    icon: Flower2,
    code: "HOR",
    question: "How do propagation, protected culture, pruning, harvest timing, postharvest quality, and intensive management shape specialty crops?",
    rgb: "244,114,182",
    group: "production",
  },
  "applied.agriculture.animal-science": {
    icon: Beef,
    code: "ANI",
    question: "How do nutrition, genetics, health, welfare, housing, grazing, manure, and management shape livestock systems?",
    rgb: "248,113,113",
    group: "production",
  },
  "applied.agriculture.aquaculture": {
    icon: Fish,
    code: "AQU",
    question: "How do water quality, stocking, feed, health, breeding, system design, ecology, and biosecurity shape aquatic production?",
    rgb: "56,189,248",
    group: "production",
  },
  "applied.agriculture.forestry-agroforestry": {
    icon: Trees,
    code: "FOR",
    question: "How can tree systems provide products while interacting with soil, water, habitat, fire, carbon, crops, and livestock over long time scales?",
    rgb: "74,222,128",
    group: "production",
  },
  "applied.agriculture.agroecology": {
    icon: Leaf,
    code: "ECO",
    question: "How can managed landscapes use ecological relationships while negotiating production, biodiversity, pests, soil, water, and resilience?",
    rgb: "134,239,172",
    group: "resources",
  },
  "applied.agriculture.engineering-technology": {
    icon: Tractor,
    code: "TEC",
    question: "How do machinery, irrigation, controlled environments, sensing, automation, storage, energy, and precision tools change agricultural work?",
    rgb: "192,132,252",
    group: "resources",
  },
  "applied.agriculture.economics-food-systems": {
    icon: Scale,
    code: "SYS",
    question: "How do risk, labor, land, markets, policy, processing, distribution, access, and externalities connect farms to wider food systems?",
    rgb: "251,146,60",
    group: "resources",
  },
};

const SYSTEM_LAYERS = [
  { label: "Climate & water", detail: "weather · irrigation · drainage · extremes", rgb: "56,189,248", icon: Droplets },
  { label: "Soil & ecology", detail: "structure · organisms · nutrients · habitat", rgb: "134,239,172", icon: Leaf },
  { label: "Managed organisms", detail: "crops · trees · livestock · aquatic species", rgb: "250,204,21", icon: Sprout },
  { label: "Tools & labor", detail: "people · machinery · sensing · infrastructure", rgb: "192,132,252", icon: Bot },
  { label: "Food-system context", detail: "markets · policy · processing · access", rgb: "251,146,60", icon: Scale },
] as const;

const FARM_QUESTIONS = [
  ["Production", "What output matters, at what quality, through which biological system, and across what time horizon?"],
  ["Soil & water", "Which resources are limiting, where can losses occur, and what management protects long-term capacity?"],
  ["Risk", "How do weather, pests, disease, prices, labor, equipment, policy, and biological uncertainty change decisions?"],
  ["Ecology", "Which organisms and landscape processes support or compete with production, and which effects occur beyond the field boundary?"],
  ["Technology", "Which intervention is useful at this scale, and what data, energy, maintenance, skill, or capital does it require?"],
  ["Food system", "Where do products go after harvest, who bears costs or benefits, and which constraints appear beyond the farm gate?"],
] as const;

export default function AgriculturePage() {
  const context = requireCurriculumPageContext(NODE_ID);
  const production = context.children.filter((branch) => BRANCH_META[branch.id]?.group === "production");
  const resources = context.children.filter((branch) => BRANCH_META[branch.id]?.group === "resources");

  return (
    <SceneFrame
      background={<AgriBackground />}
      className="bg-[#11170d] text-stone-100 selection:bg-lime-300/25"
      maxWidthClassName="max-w-[1600px]"
      headerBackground="rgba(17,23,13,0.48)"
      header={
        <DomainPageHeader
          breadcrumbs={context.breadcrumbs}
          eyebrow="Soil · water · organisms · technology · labor · food systems"
          eyebrowStyle="rule"
          icon={Sprout}
          title={<span>Agriculture</span>}
          subtitle="Agriculture manages biological production inside ecological, technical, economic, and social systems. Study the farm above and below ground: crops and animals, soils and water, machinery and labor, landscapes and markets, harvests and residues, short seasons and long-term stewardship."
          accentRgb="163, 230, 53"
          titleClassName="font-sans text-[clamp(2.9rem,5.5vw,6.2rem)] font-semibold leading-[0.84] tracking-[-0.066em] text-[#f7fee7]"
          headerClassName="border-lime-100/[0.10]"
        />
      }
    >
      <section className="relative isolate mt-5 overflow-hidden border-y border-lime-100/[0.11] py-5 sm:py-6">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(17,23,13,0.44),transparent_28%,transparent_72%,rgba(17,20,10,0.36))] backdrop-blur-[2px]" />
        <div className="relative">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-lime-200/66"><Tractor size={14} /> Primary navigation · farm-system transect</div>
          <h2 className="mt-2 max-w-5xl text-[clamp(1.9rem,3.7vw,3.7rem)] font-semibold leading-[0.94] tracking-[-0.052em] text-white">
            Move from production systems into the soil, ecological, technological, and economic machinery that sustains them.
          </h2>
          <p className="mt-3 max-w-4xl text-[14px] leading-6 text-stone-300/70">
            Every destination below is a direct peer in the curriculum. The two banks are only a visual grouping: production on the left, resources and management on the right. The open center keeps the whole-farm relationship visible.
          </p>
        </div>

        <div className="relative mt-5 grid gap-4 xl:grid-cols-[minmax(0,1fr)_300px_minmax(0,1fr)] xl:items-stretch">
          <FarmBank label="Production systems" branches={production} side="left" />
          <FarmSystemCore />
          <FarmBank label="Resources & management" branches={resources} side="right" />
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-sky-200/58">Nutrient instrument</div>
            <h2 className="mt-1 text-[23px] font-semibold tracking-[-0.035em] text-white">Treat nitrogen as a set of pathways and tradeoffs, not three magic crop buttons.</h2>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-stone-600">normalized teaching units</span>
        </div>
        <NitrogenLab />
      </section>

      <section className="mt-8 border-t border-lime-100/[0.10] pt-5">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-amber-200/58"><Gauge size={14} /> System questions · reference, not navigation</div>
            <h2 className="mt-2 max-w-4xl text-[clamp(1.8rem,3.2vw,3rem)] font-semibold leading-[0.96] tracking-[-0.048em] text-white">A productive field can still be a fragile farm system.</h2>
          </div>
          <p className="text-[14px] leading-6 text-stone-400/72">Agricultural decisions combine biology with uncertainty, time, resource constraints, labor, economics, infrastructure, environmental effects, and local knowledge. No single performance metric captures the whole system.</p>
        </div>
        <div className="mt-5 grid border-y border-white/[0.08] md:grid-cols-2 xl:grid-cols-3">
          {FARM_QUESTIONS.map(([term, text], index) => (
            <div key={term} className="grid grid-cols-[42px_minmax(0,1fr)] gap-3 border-b border-white/[0.07] px-4 py-4 md:[&:nth-last-child(-n+2)]:border-b-0 xl:border-b xl:[&:nth-last-child(-n+3)]:border-b-0 xl:border-r xl:[&:nth-child(3n)]:border-r-0">
              <span className="font-mono text-[11px] text-lime-200/42">0{index + 1}</span>
              <span><strong className="block text-[13px] text-stone-200/86">{term}</strong><span className="mt-1 block text-[12px] leading-5 text-stone-500">{text}</span></span>
            </div>
          ))}
        </div>
      </section>
    </SceneFrame>
  );
}

function FarmBank({ label, branches, side }: { label: string; branches: CurriculumNode[]; side: "left" | "right" }) {
  return (
    <div>
      <div className={`mb-2 font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-stone-500 ${side === "right" ? "xl:text-right" : ""}`}>{label}</div>
      <div className="border-y border-white/[0.06]">
        {branches.map((branch) => <FarmLane key={branch.id} branch={branch} side={side} />)}
      </div>
    </div>
  );
}

function FarmLane({ branch, side }: { branch: CurriculumNode; side: "left" | "right" }) {
  const meta = BRANCH_META[branch.id] ?? { icon: Activity, code: "AGR", question: branch.description ?? "Explore this agriculture branch.", rgb: "163,230,53", group: "resources" as const };
  const Icon = meta.icon;
  const planned = branch.status === "placeholder";

  return (
    <div aria-disabled={planned ? "true" : undefined} className="group relative min-h-[88px] border-b border-white/[0.06] bg-black/[0.045] px-3 py-3 backdrop-blur-[8px] last:border-b-0 transition hover:bg-black/[0.09]">
      <div className={`grid grid-cols-[40px_minmax(0,1fr)_52px] gap-3 ${side === "right" ? "xl:grid-cols-[52px_minmax(0,1fr)_40px]" : ""}`}>
        {side === "right" ? <span className="hidden pt-1 text-left font-mono text-[11px] uppercase text-stone-600 xl:block">{planned ? "planned" : "open"}</span> : null}
        <span className={`flex h-9 w-9 items-center justify-center border ${side === "right" ? "xl:order-3" : ""}`} style={{ color: `rgb(${meta.rgb})`, borderColor: `rgba(${meta.rgb},0.26)`, background: `rgba(${meta.rgb},0.045)` }}><Icon size={15} /></span>
        <span className={side === "right" ? "xl:text-right" : ""}><span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em]" style={{ color: `rgba(${meta.rgb},0.70)` }}>{meta.code}</span><strong className="mt-0.5 block text-[14px] text-white/88">{branch.label}</strong><span className="mt-1 block text-[11px] leading-4 text-stone-500">{meta.question}</span></span>
        {side === "left" ? <span className="pt-1 text-right font-mono text-[11px] uppercase text-stone-600">{planned ? "planned" : "open"}</span> : <span className="pt-1 text-right font-mono text-[11px] uppercase text-stone-600 xl:hidden">{planned ? "planned" : "open"}</span>}
      </div>
    </div>
  );
}

function FarmSystemCore() {
  return (
    <Surface variant="open" className="relative min-h-[470px] overflow-hidden rounded-[30px] border-lime-100/[0.08]" style={{ background: "rgba(14,20,9,0.025)" }}>
      <div className="p-4">
        <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-lime-200/54"><Sprout size={13} /> Whole-farm system</div>
        <p className="mt-2 text-[12px] leading-5 text-stone-400/64">Production sits inside interacting resource, ecological, technical, and economic layers.</p>
      </div>
      <div className="mx-4 mt-1 space-y-1">
        {SYSTEM_LAYERS.map((layer, index) => {
          const Icon = layer.icon;
          return (
            <div key={layer.label} className="border-b border-white/[0.06] py-3 last:border-b-0">
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border" style={{ color: `rgb(${layer.rgb})`, borderColor: `rgba(${layer.rgb},0.24)`, background: `rgba(${layer.rgb},0.04)` }}><Icon size={13} /></span>
                <span><strong className="block text-[13px]" style={{ color: `rgba(${layer.rgb},0.84)` }}>{layer.label}</strong><span className="mt-1 block text-[11px] leading-4 text-stone-500">{layer.detail}</span></span>
              </div>
              {index < SYSTEM_LAYERS.length - 1 ? <ArrowDown size={13} className="ml-[10px] mt-2 text-stone-600" /> : null}
            </div>
          );
        })}
      </div>
      <div className="absolute bottom-4 inset-x-4 border-t border-lime-100/[0.07] pt-3 text-center font-mono text-[11px] uppercase tracking-[0.07em] text-lime-200/34">management links the layers, it does not control them completely</div>
    </Surface>
  );
}
