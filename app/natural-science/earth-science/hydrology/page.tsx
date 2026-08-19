import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import {
  ArrowDownToLine,
  CloudRain,
  Droplets,
  Layers3,
  MountainSnow,
  Waves,
} from "lucide-react";
import WaterBackground from "./WaterBackground";
import WaterBudgetLab from "./WaterBudgetLab";

const NODE_ID = "natural.earth-science.hydrology";

const RESERVOIRS = [
  {
    icon: Waves,
    label: "Surface water",
    examples: "rivers · lakes · wetlands · reservoirs",
    detail: "Fast-moving and highly visible stores that integrate runoff from across a watershed.",
    rgb: "34, 211, 238",
  },
  {
    icon: Layers3,
    label: "Groundwater",
    examples: "aquifers · pore water · springs",
    detail: "Subsurface storage moving through connected pores and fractures, often on slower timescales than surface flow.",
    rgb: "96, 165, 250",
  },
  {
    icon: MountainSnow,
    label: "Snow & ice",
    examples: "snowpack · glaciers · seasonal ice",
    detail: "Frozen storage delays the release of water and strongly shapes seasonal runoff in many regions.",
    rgb: "186, 230, 253",
  },
  {
    icon: Droplets,
    label: "Soil & biosphere",
    examples: "soil moisture · plants · organisms",
    detail: "A thin but active reservoir where infiltration, root uptake, evaporation, and transpiration meet.",
    rgb: "45, 212, 191",
  },
] as const;

const PATHWAYS = [
  ["Infiltration", "Water crosses the land surface and enters soil or porous material."],
  ["Percolation", "Water moves deeper through soil and rock toward groundwater storage."],
  ["Runoff", "Water moves across the land surface or through shallow subsurface pathways toward channels."],
  ["Streamflow", "Channels integrate upstream water and transport it through the drainage network."],
  ["Evapotranspiration", "Evaporation plus plant transpiration returns water to the atmosphere."],
  ["Recharge & discharge", "Groundwater enters or leaves storage as water crosses the water table or emerges to springs, streams, wetlands, and coasts."],
] as const;

export default function HydrologyPage() {
  const context = requireCurriculumPageContext(NODE_ID);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#02070c] text-slate-100 selection:bg-sky-400/25">
      <WaterBackground />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_78%_16%,rgba(14,165,233,0.12),transparent_28%),radial-gradient(circle_at_16%_82%,rgba(45,212,191,0.055),transparent_27%),linear-gradient(to_bottom,rgba(2,7,12,0.10),rgba(2,7,12,0.74)_76%,rgba(1,5,9,0.97))]" aria-hidden="true" />
      <div className="pointer-events-none fixed inset-0 z-[1] opacity-[0.09] [background-image:linear-gradient(rgba(125,211,252,0.08)_1px,transparent_1px)] [background-size:100%_48px] [mask-image:linear-gradient(to_bottom,black,transparent_92%)]" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-[1580px] px-4 pb-14 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.06] bg-[#02070c]/80 px-4 pb-3 pt-5 shadow-[0_18px_58px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={context.breadcrumbs}
            eyebrow="Reservoirs · fluxes · watersheds · groundwater"
            eyebrowStyle="rule"
            icon={Droplets}
            title={<span>Hydrology</span>}
            subtitle="Hydrology follows water through connected reservoirs and pathways. Rain and snow become infiltration, runoff, soil moisture, groundwater, streamflow, evaporation, transpiration, ice, and stored water, all constrained by landscape, climate, geology, and time."
            accentRgb="14, 165, 233"
            titleClassName="font-sans text-[clamp(3rem,5.7vw,6.3rem)] font-semibold leading-[0.83] tracking-[-0.067em] text-[#f3fbff]"
            headerClassName="border-sky-100/[0.10]"
          />
        </div>

        <section className="mt-5 overflow-hidden rounded-[30px] border border-sky-200/[0.10] bg-black/[0.14] backdrop-blur-xl">
          <div className="grid gap-4 border-b border-white/[0.07] px-5 py-5 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end sm:px-6">
            <div>
              <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-sky-200/58"><CloudRain size={12} /> Hydrologic system</div>
              <h2 className="mt-2 text-[clamp(1.9rem,3.6vw,3.3rem)] font-semibold leading-[0.94] tracking-[-0.05em] text-white">The water cycle is really a map of reservoirs connected by fluxes.</h2>
            </div>
            <p className="text-[12px] leading-6 text-slate-400">The familiar evaporation–condensation–precipitation loop is only the atmospheric slice. Hydrology asks where water is stored, how quickly it moves, what controls its path, and how one part of the watershed affects another.</p>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-4">
            {RESERVOIRS.map((item, index) => {
              const Icon = item.icon;
              return (
                <article key={item.label} className="min-h-[220px] border-b border-white/[0.06] px-5 py-5 md:border-r md:[&:nth-child(2n)]:border-r-0 xl:border-b-0 xl:[&:nth-child(2n)]:border-r xl:last:border-r-0">
                  <div className="flex items-center justify-between gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-[13px] border" style={{ color: `rgb(${item.rgb})`, borderColor: `rgba(${item.rgb},0.22)`, background: `rgba(${item.rgb},0.035)` }}><Icon size={15} /></span><span className="font-mono text-[8px] text-slate-700">0{index + 1}</span></div>
                  <h3 className="mt-5 text-[14px] font-semibold text-white/86">{item.label}</h3>
                  <div className="mt-1 font-mono text-[8px] uppercase tracking-[0.09em]" style={{ color: `rgba(${item.rgb},0.58)` }}>{item.examples}</div>
                  <p className="mt-3 text-[10px] leading-5 text-slate-600">{item.detail}</p>
                </article>
              );
            })}
          </div>
        </section>

        <div className="mt-6"><WaterBudgetLab /></div>

        <section className="mt-6 overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/[0.13] backdrop-blur-xl">
          <div className="grid gap-4 border-b border-white/[0.07] px-5 py-5 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end sm:px-6">
            <div><div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-cyan-200/54"><ArrowDownToLine size={12} /> Flow pathways · reference</div><h2 className="mt-2 text-[clamp(1.7rem,3vw,2.8rem)] font-semibold tracking-[-0.045em] text-white">Water can take many routes from precipitation to discharge.</h2></div>
            <p className="text-[11px] leading-5 text-slate-500">Which pathway dominates depends on soil, slope, vegetation, geology, rainfall intensity, antecedent moisture, snow and ice, land use, and the scale at which the watershed is observed.</p>
          </div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3">
            {PATHWAYS.map(([name, detail], index) => (
              <article key={name} className="min-h-[145px] border-b border-white/[0.06] px-5 py-4 sm:border-r sm:[&:nth-child(2n)]:border-r-0 xl:[&:nth-child(2n)]:border-r xl:[&:nth-child(3n)]:border-r-0 xl:[&:nth-last-child(-n+3)]:border-b-0">
                <span className="font-mono text-[8px] text-sky-200/34">0{index + 1}</span><h3 className="mt-3 text-[12px] font-semibold text-white/84">{name}</h3><p className="mt-2 text-[10px] leading-5 text-slate-600">{detail}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
