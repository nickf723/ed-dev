import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import { CloudRain, Gauge, SunMedium, ThermometerSun, Wind } from "lucide-react";
import AirParcelLab from "./AirParcelLab";
import WindBackground from "./WindBackground";

const NODE_ID = "natural.earth-science.meteorology";
const WEATHER_ENGINE = [
  { icon: SunMedium, label: "Uneven heating", detail: "Sun angle, surface type, clouds, water, vegetation, and season create temperature contrasts across the surface and atmosphere.", rgb: "250, 204, 21" },
  { icon: Gauge, label: "Pressure gradients", detail: "Density and temperature differences help produce pressure fields. Air accelerates when pressure differs across space.", rgb: "125, 211, 252" },
  { icon: Wind, label: "Wind & rotation", detail: "Pressure-gradient force, Coriolis deflection, friction, and curvature shape the direction and speed of atmospheric flow.", rgb: "56, 189, 248" },
  { icon: CloudRain, label: "Moisture & phase change", detail: "Evaporation adds water vapor; lifting and cooling can bring air to saturation, forming cloud droplets or ice and eventually precipitation.", rgb: "34, 211, 238" },
] as const;
const SYSTEMS = [
  ["Fronts", "Boundaries between contrasting air masses organize lift, clouds, precipitation, wind shifts, and temperature changes."],
  ["Cyclones", "Low-pressure circulations concentrate convergence, ascent, fronts, clouds, and precipitation across large regions."],
  ["Thunderstorms", "Buoyant moist air, instability, lift, and wind shear can produce deep convection, lightning, heavy precipitation, hail, and severe winds."],
  ["Jet streams", "Strong upper-level winds form along large horizontal temperature gradients and help steer weather systems."],
  ["Local circulations", "Sea breezes, mountain-valley winds, lake effects, and urban heat contrasts arise from smaller-scale heating and terrain differences."],
  ["Forecasting", "Observations are assimilated into numerical models that evolve atmospheric state forward while uncertainty grows with time."],
] as const;

export default function MeteorologyPage() {
  const context = requireCurriculumPageContext(NODE_ID);
  return <main className="relative min-h-screen overflow-x-hidden bg-[#030914] text-slate-100 selection:bg-sky-400/25">
    <WindBackground /><div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_78%_14%,rgba(56,189,248,0.13),transparent_29%),radial-gradient(circle_at_16%_84%,rgba(129,140,248,0.05),transparent_28%),linear-gradient(to_bottom,rgba(3,9,20,0.08),rgba(3,9,20,0.74)_76%,rgba(2,6,14,0.97))]" aria-hidden="true" />
    <div className="relative z-10 mx-auto w-full max-w-[1580px] px-4 pb-14 sm:px-6 xl:px-8">
      <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.06] bg-[#030914]/80 px-4 pb-3 pt-5 backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8"><DomainPageHeader breadcrumbs={context.breadcrumbs} eyebrow="Energy · pressure · wind · moisture · instability" eyebrowStyle="rule" icon={Wind} title={<span>Meteorology</span>} subtitle="Meteorology studies the evolving atmosphere as a fluid system. Uneven heating creates pressure and density contrasts, air moves and rotates, moisture changes phase, and those processes organize clouds, fronts, storms, and the weather patterns we observe and forecast." accentRgb="56, 189, 248" titleClassName="font-sans text-[clamp(3rem,5.7vw,6.3rem)] font-semibold leading-[0.83] tracking-[-0.067em] text-[#f3fbff]" headerClassName="border-sky-100/[0.10]" /></div>
      <section className="mt-5 overflow-hidden rounded-[30px] border border-sky-200/[0.10] bg-black/[0.14] backdrop-blur-xl"><div className="grid gap-4 border-b border-white/[0.07] px-5 py-5 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end sm:px-6"><div><div className="flex items-center gap-2 font-mono text-[9px] uppercase text-sky-200/58"><ThermometerSun size={12}/> Weather engine</div><h2 className="mt-2 text-[clamp(1.9rem,3.6vw,3.3rem)] font-semibold leading-[0.94] tracking-[-0.05em] text-white">Weather begins with gradients and becomes motion.</h2></div><p className="text-[12px] leading-6 text-slate-400">The upper atmosphere matters, but most everyday weather is organized in the troposphere. The useful chain is energy contrast → pressure field → wind → vertical motion → moisture and phase change.</p></div><div className="grid md:grid-cols-2 xl:grid-cols-4">{WEATHER_ENGINE.map((item,index)=>{const Icon=item.icon;return <article key={item.label} className="min-h-[220px] border-b border-white/[0.06] px-5 py-5 md:border-r md:[&:nth-child(2n)]:border-r-0 xl:border-b-0 xl:[&:nth-child(2n)]:border-r xl:last:border-r-0"><div className="flex items-center justify-between"><span className="flex h-9 w-9 items-center justify-center rounded-[13px] border" style={{color:`rgb(${item.rgb})`,borderColor:`rgba(${item.rgb},0.22)`,background:`rgba(${item.rgb},0.035)`}}><Icon size={15}/></span><span className="font-mono text-[8px] text-slate-700">0{index+1}</span></div><h3 className="mt-5 text-[14px] font-semibold text-white/86">{item.label}</h3><p className="mt-3 text-[10px] leading-5 text-slate-600">{item.detail}</p></article>})}</div></section>
      <div className="mt-6"><AirParcelLab /></div>
      <section className="mt-6 overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/[0.13] backdrop-blur-xl"><div className="grid gap-4 border-b border-white/[0.07] px-5 py-5 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end sm:px-6"><div><div className="font-mono text-[9px] uppercase text-indigo-200/50">Organized weather systems · reference</div><h2 className="mt-2 text-[clamp(1.7rem,3vw,2.8rem)] font-semibold tracking-[-0.045em] text-white">Atmospheric processes combine into structures across many scales.</h2></div><p className="text-[11px] leading-5 text-slate-500">A cloud, thunderstorm, cyclone, front, and jet stream are organized outcomes of the same fluid, thermodynamic, moisture, and rotation processes acting at different scales.</p></div><div className="grid sm:grid-cols-2 xl:grid-cols-3">{SYSTEMS.map(([name,detail],index)=><article key={name} className="min-h-[150px] border-b border-white/[0.06] px-5 py-4 sm:border-r sm:[&:nth-child(2n)]:border-r-0 xl:[&:nth-child(2n)]:border-r xl:[&:nth-child(3n)]:border-r-0"><span className="font-mono text-[8px] text-sky-200/34">0{index+1}</span><h3 className="mt-3 text-[12px] font-semibold text-white/84">{name}</h3><p className="mt-2 text-[10px] leading-5 text-slate-600">{detail}</p></article>)}</div></section>
    </div>
  </main>;
}
