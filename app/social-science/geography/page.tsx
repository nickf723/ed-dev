import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame } from "@/app/_page-system/scene";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import { ArrowRight, Compass, Globe2, Map } from "lucide-react";
import GeographyLayerDeck from "./GeographyLayerDeck";
import GlobeBackground from "./GlobeBackground";
import PopulationPyramid from "./PopulationPyramid";

const NODE_ID = "social.geography";

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
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(2,8,23,0.34),transparent_29%,transparent_72%,rgba(2,8,23,0.28))] backdrop-blur-[5px]" />
        <div className="relative grid gap-4 lg:grid-cols-[minmax(0,1fr)_290px] lg:items-end">
          <div className="rounded-[20px] bg-[#03101f]/[0.24] px-3 py-2 backdrop-blur-[18px]">
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-sky-200/68"><Map size={14} /> Primary navigation · GIS light table</div>
            <h2 className="mt-2 max-w-5xl text-[clamp(1.9rem,3.8vw,3.8rem)] font-semibold leading-[0.94] tracking-[-0.052em] text-white">Lay different human-geography questions over the same world and watch what each layer makes visible.</h2>
            <p className="mt-3 max-w-4xl text-[13px] leading-6 text-slate-300/70">Population, migration, settlements, culture, politics, economy, development, and GIS overlap in real places. The layer stack is an orientation device, not a claim that one lens explains the others.</p>
          </div>
          <Link href="/social-science" className="group flex items-center justify-between gap-4 border border-white/[0.08] bg-[#03101f]/[0.34] px-4 py-3 backdrop-blur-[16px] transition hover:bg-[#03101f]/[0.46]">
            <span><span className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-500">Parent field</span><strong className="mt-1 block text-[14px] text-white">Social Science</strong></span>
            <ArrowRight size={15} className="text-sky-200/55 transition group-hover:translate-x-1" />
          </Link>
        </div>

        <GeographyLayerDeck branches={context.children} />
      </section>

      <section className="mt-8">
        <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div className="rounded-[18px] bg-[#03101f]/[0.16] px-3 py-2 backdrop-blur-[14px]">
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-pink-200/62">Demographic instrument</div>
            <h2 className="mt-1 text-[23px] font-semibold tracking-[-0.035em] text-white">A population pyramid is a spatial clue, not a destiny.</h2>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-slate-600">normalized teaching profiles</span>
        </div>
        <PopulationPyramid />
      </section>

      <section className="mt-8 border-t border-sky-100/[0.10] pt-5">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end">
          <div className="rounded-[18px] bg-[#03101f]/[0.15] px-3 py-2 backdrop-blur-[14px]">
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-emerald-200/58"><Compass size={14} /> Spatial reasoning · reference, not navigation</div>
            <h2 className="mt-2 max-w-4xl text-[clamp(1.8rem,3.2vw,3rem)] font-semibold leading-[0.96] tracking-[-0.048em] text-white">Maps become explanations only when the pattern is connected to a mechanism.</h2>
          </div>
          <p className="rounded-[16px] bg-[#03101f]/[0.15] px-3 py-2 text-[14px] leading-6 text-slate-400/72 backdrop-blur-[14px]">A map can reveal clustering, distance, gradients, barriers, or networks. It cannot by itself tell you why the pattern exists. Geographic reasoning links spatial evidence to environmental, social, political, economic, technological, and historical processes.</p>
        </div>

        <div className="mt-5 grid border-y border-white/[0.08] md:grid-cols-2 xl:grid-cols-3">
          {REASONING.map((item, index) => (
            <div key={item.label} className="grid grid-cols-[42px_minmax(0,1fr)] gap-3 border-b border-white/[0.07] bg-[#03101f]/[0.10] px-4 py-4 backdrop-blur-[10px] md:[&:nth-last-child(-n+2)]:border-b-0 xl:border-b xl:[&:nth-last-child(-n+3)]:border-b-0 xl:border-r xl:[&:nth-child(3n)]:border-r-0">
              <span className="font-mono text-[11px] text-sky-200/42">0{index + 1}</span>
              <span><strong className="block text-[13px] text-slate-200/86">{item.label}</strong><span className="mt-1 block text-[12px] leading-5 text-slate-500">{item.text}</span></span>
            </div>
          ))}
        </div>
      </section>
    </SceneFrame>
  );
}
