"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Droplets,
  Layers3,
  Mountain,
  Waves,
  type LucideIcon,
} from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import BlueprintBackground from "../../BlueprintBackground";

type TerrainType = "slope" | "swale" | "ridge";

const TERRAINS: readonly { id: TerrainType; label: string; note: string }[] = [
  { id: "slope", label: "Uniform slope", note: "parallel contours describe a simplified planar grade" },
  { id: "swale", label: "Swale / valley", note: "contours bend uphill while water concentrates along the low line" },
  { id: "ridge", label: "Ridge / spur", note: "contours bend downhill while water sheds away from the high line" },
] as const;

export default function TopographyWaterPage() {
  const [terrain, setTerrain] = useState<TerrainType>("slope");
  const [spacing, setSpacing] = useState(38);

  const steepness = spacing <= 26 ? "steeper" : spacing >= 52 ? "gentler" : "moderate";
  const behavior = terrain === "slope"
    ? "Water generally moves across the contours toward lower elevation."
    : terrain === "swale"
      ? "Water tends to collect and move along the swale centerline toward lower elevation."
      : "Water tends to split and shed away from the ridge centerline toward lower ground on either side.";

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#06151a] text-slate-100 selection:bg-emerald-400/25">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-54"><BlueprintBackground /></div>
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_82%_14%,rgba(74,222,128,0.09),transparent_28%),radial-gradient(circle_at_16%_82%,rgba(56,189,248,0.065),transparent_27%),linear-gradient(to_bottom,rgba(6,21,26,0.16),rgba(3,10,15,0.92))]" />
      <div className="pointer-events-none fixed inset-0 z-[1] opacity-20 [background-image:linear-gradient(rgba(134,239,172,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.022)_1px,transparent_1px)] [background-size:38px_38px]" />

      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-4 py-4 sm:px-6 xl:px-8 xl:py-5">
        <DomainPageHeader
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Applied Sciences", href: "/applied-science" },
            { label: "Architecture", href: "/applied-science/architecture" },
            { label: "Site & Context", href: "/applied-science/architecture/site-context" },
            { label: "Topography & Water" },
          ]}
          eyebrow="Elevation · Contours · Slope · Ridges · Swales · Drainage"
          icon={Mountain}
          title={<span>Topography & Water</span>}
          subtitle="Read the shape of the ground from contours and use high/low relationships to reason about slope, drainage, and building contact with the site."
          accentRgb="74, 222, 128"
          titleClassName="font-serif text-[clamp(2.7rem,4.9vw,5.15rem)] font-semibold leading-[0.86] tracking-[-0.055em] text-[#f8fbff]"
          iconClassName="rounded-[16px]"
          headerClassName="border-emerald-300/[0.13]"
          aside={<div className="rounded-full border border-emerald-300/[0.14] bg-black/25 px-4 py-2 font-mono text-[12px] text-emerald-200/85 backdrop-blur-md">contours connect equal elevation</div>}
        />

        <section className="mt-3 grid gap-3 rounded-[24px] border border-emerald-200/[0.10] bg-black/[0.22] p-5 backdrop-blur-xl lg:grid-cols-[minmax(0,1.15fr)_minmax(330px,0.85fr)]">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-emerald-300/72">Core idea</div>
            <h2 className="mt-2 text-[28px] font-semibold tracking-[-0.035em] text-white">Contour lines let a flat drawing describe a three-dimensional ground surface.</h2>
            <p className="mt-3 max-w-4xl text-[14px] leading-6 text-slate-400">Every contour connects points at the same elevation. Closely spaced contours indicate faster elevation change across plan distance; wider spacing indicates gentler change. Water responds to the actual surface, moving toward lower potential paths rather than following contour lines themselves.</p>
          </div>
          <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
            <CoreFact icon={Layers3} label="Contour" text="A line of equal elevation, not a wall, path, or property boundary." rgb="74, 222, 128" />
            <CoreFact icon={Mountain} label="Spacing" text="Closer contours mean elevation changes more quickly over horizontal distance." rgb="251, 191, 36" />
            <CoreFact icon={Droplets} label="Drainage" text="Water tends toward lower paths; ridges divide flow while swales collect it." rgb="56, 189, 248" />
          </div>
        </section>

        <section className="mt-3 rounded-[26px] border border-emerald-200/[0.12] bg-black/[0.24] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.025),0_28px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl">
          <div className="flex flex-col gap-2 px-1 pb-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-300/75">Contour studio</div>
              <p className="mt-1 text-[13px] text-slate-500">Compare idealized terrain forms and change contour spacing without changing the conceptual contour interval.</p>
            </div>
            <div className="font-mono text-[11px] text-slate-600">closer spacing → faster grade change</div>
          </div>

          <div className="grid items-stretch gap-3 xl:grid-cols-[300px_minmax(520px,1fr)_340px]">
            <div className="rounded-[20px] border border-emerald-200/[0.08] bg-[#07170f]/74 p-4">
              <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">Terrain form</div>
              <div className="mt-3 grid gap-2">
                {TERRAINS.map((item) => <button key={item.id} type="button" onClick={() => setTerrain(item.id)} className={`rounded-[14px] border p-3 text-left ${terrain === item.id ? "border-emerald-300/[0.26] bg-emerald-400/[0.055]" : "border-white/[0.045] bg-black/[0.14]"}`}><strong className="text-[11px] text-slate-200">{item.label}</strong><p className="mt-1 text-[9px] leading-4 text-slate-600">{item.note}</p></button>)}
              </div>
              <label className="mt-4 block rounded-[14px] border border-white/[0.045] bg-white/[0.012] p-3"><span className="flex items-center justify-between gap-3"><span className="text-[10px] font-semibold text-slate-400">Contour spacing</span><span className="font-mono text-[10px] text-emerald-300">{spacing} plan units</span></span><input type="range" min="22" max="58" step="2" value={spacing} onChange={(event) => setSpacing(Number(event.target.value))} className="mt-2.5 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/[0.07] accent-emerald-400" /></label>
              <div className="mt-3 rounded-[15px] border border-white/[0.05] bg-black/[0.14] p-3"><div className="text-[9px] font-semibold uppercase tracking-[0.10em] text-slate-700">Current reading</div><div className="mt-1 font-mono text-[14px] text-emerald-200">{steepness} idealized terrain</div><p className="mt-1.5 text-[10px] leading-4 text-slate-600">Spacing is shown in drawing units only. Real slope requires surveyed elevations and horizontal distances.</p></div>
            </div>

            <ContourDiagram terrain={terrain} spacing={spacing} />

            <div className="rounded-[20px] border border-sky-200/[0.08] bg-[#061621]/76 p-4">
              <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-sky-300/70">Read the form</div>
              <div className="mt-3 grid gap-2">
                <Readout label="Contour rule" value="each line = one elevation" />
                <Readout label="Spacing cue" value={steepness === "steeper" ? "close contours" : steepness === "gentler" ? "wide contours" : "moderate spacing"} />
                <Readout label="Terrain cue" value={terrain === "swale" ? "V shapes point uphill" : terrain === "ridge" ? "V shapes point downhill" : "approximately parallel contours"} />
              </div>
              <div className="mt-3 rounded-[15px] border border-sky-300/[0.10] bg-sky-400/[0.02] p-3"><div className="flex items-center gap-2 text-sky-300"><Waves size={14} /><strong className="text-[11px]">Water behavior</strong></div><p className="mt-1.5 text-[10px] leading-4 text-slate-500">{behavior}</p></div>
              <div className="mt-3 rounded-[15px] border border-rose-300/[0.09] bg-rose-400/[0.018] p-3"><div className="text-[9px] font-semibold uppercase tracking-[0.10em] text-rose-300/70">Idealized model</div><p className="mt-1.5 text-[10px] leading-4 text-slate-600">Actual runoff depends on detailed microtopography, soils, vegetation, surfaces, rainfall, drainage infrastructure, obstructions, and downstream conditions. Contours are essential evidence, not a complete hydrologic model.</p></div>
            </div>
          </div>
        </section>

        <section className="mt-3 grid gap-3 lg:grid-cols-3">
          <ReferenceCard title="Water crosses contours" text="On a smooth slope, the direction of steepest descent is approximately perpendicular to contour lines. Water does not travel along equal-elevation contours unless another channel or structure redirects it." />
          <ReferenceCard title="Swales and ridges organize flow" text="Valleys concentrate drainage; ridges divide drainage. Recognizing those forms helps keep early building placement from casually blocking a low path or straddling a crest." />
          <ReferenceCard title="Grading changes the evidence" text="Once earth is cut or filled, the proposed contours become a design. Site grading should be coordinated with accessibility, foundations, drainage, landscape, utilities, and construction rather than treated as cosmetic smoothing." />
        </section>

        <nav className="mt-3 pb-8" aria-label="Topography and water navigation">
          <div className="grid gap-3 sm:grid-cols-2">
            <Link href="/applied-science/architecture/site-context/climate-orientation" className="group flex min-h-[72px] items-center gap-3 rounded-[18px] border border-amber-300/[0.10] bg-black/[0.20] px-4 py-3 transition-colors hover:border-amber-300/[0.18]"><ArrowLeft size={15} className="text-amber-300 transition-transform group-hover:-translate-x-0.5" /><span><span className="block text-[9px] font-semibold uppercase tracking-[0.10em] text-slate-600">Previous lesson</span><strong className="mt-0.5 block text-[14px] text-slate-200">Climate & Orientation</strong></span></Link>
            <Link href="/applied-science/architecture/site-context/access-surroundings" className="group flex min-h-[72px] items-center gap-3 rounded-[18px] border border-violet-300/[0.10] bg-black/[0.20] px-4 py-3 transition-colors hover:border-violet-300/[0.18]"><span className="min-w-0 flex-1 text-right"><span className="block text-[9px] font-semibold uppercase tracking-[0.10em] text-slate-600">Next lesson</span><strong className="mt-0.5 block text-[14px] text-slate-200">Access & Surroundings</strong></span><ArrowRight size={15} className="text-violet-300 transition-transform group-hover:translate-x-0.5" /></Link>
          </div>
        </nav>
      </div>
    </main>
  );
}

function ContourDiagram({ terrain, spacing }: { terrain: TerrainType; spacing: number }) {
  const lines = Array.from({ length: Math.max(5, Math.floor(360 / spacing)) }, (_, index) => 86 + index * spacing);
  return <div className="relative flex min-h-[560px] items-center justify-center overflow-hidden rounded-[20px] border border-emerald-200/[0.10] bg-[#041318]/86 p-4"><div className="absolute left-4 top-4 z-10"><div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">Idealized contour plan</div><div className="mt-1 font-mono text-[9px] text-emerald-300/65">{terrain} · spacing {spacing}</div></div><svg viewBox="0 0 620 500" className="w-full max-w-[680px]" role="img" aria-label={`Idealized ${terrain} contour diagram`}><defs><pattern id="topo-grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="rgba(134,239,172,0.05)" strokeWidth="1" /></pattern><marker id="water-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#38bdf8" /></marker></defs><rect width="620" height="500" fill="url(#topo-grid)" /><rect x="70" y="58" width="480" height="382" rx="4" fill="rgba(74,222,128,0.018)" stroke="rgba(134,239,172,0.35)" strokeWidth="2" />{terrain === "slope" ? lines.map((y, index) => <g key={y}><path d={`M95 ${y} C220 ${y - 10} 400 ${y + 10} 525 ${y - 3}`} fill="none" stroke="#4ade80" strokeWidth="1.8" opacity={0.48 + index * 0.03} /><text x="105" y={y - 5} fill="#86efac" fontSize="8">{120 - index * 2}</text></g>) : null}{terrain === "swale" ? lines.map((y, index) => <g key={y}><path d={`M95 ${y} C205 ${y - 7} 260 ${y - 12} 310 ${y - 52} C360 ${y - 12} 420 ${y - 7} 525 ${y}`} fill="none" stroke="#4ade80" strokeWidth="1.8" opacity={0.48 + index * 0.03} /><text x="105" y={y - 5} fill="#86efac" fontSize="8">{120 - index * 2}</text></g>) : null}{terrain === "ridge" ? lines.map((y, index) => <g key={y}><path d={`M95 ${y} C205 ${y + 7} 260 ${y + 12} 310 ${y + 52} C360 ${y + 12} 420 ${y + 7} 525 ${y}`} fill="none" stroke="#4ade80" strokeWidth="1.8" opacity={0.48 + index * 0.03} /><text x="105" y={y - 5} fill="#86efac" fontSize="8">{120 - index * 2}</text></g>) : null}{terrain === "slope" ? <><line x1="310" y1="115" x2="310" y2="390" stroke="#38bdf8" strokeWidth="4" markerEnd="url(#water-arrow)" opacity="0.75"/><text x="325" y="255" fill="#7dd3fc" fontSize="9">DOWNHILL FLOW</text></> : null}{terrain === "swale" ? <><path d="M310 120 V395" stroke="#38bdf8" strokeWidth="5" markerEnd="url(#water-arrow)" opacity="0.80"/><text x="326" y="255" fill="#7dd3fc" fontSize="9">SWALE / LOW LINE</text></> : null}{terrain === "ridge" ? <><path d="M310 120 V390" stroke="#fbbf24" strokeWidth="3" strokeDasharray="8 6" opacity="0.75"/><line x1="295" y1="250" x2="185" y2="345" stroke="#38bdf8" strokeWidth="4" markerEnd="url(#water-arrow)" opacity="0.75"/><line x1="325" y1="250" x2="435" y2="345" stroke="#38bdf8" strokeWidth="4" markerEnd="url(#water-arrow)" opacity="0.75"/><text x="328" y="220" fill="#fde68a" fontSize="9">RIDGE / HIGH LINE</text></> : null}</svg><div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/[0.05] bg-black/60 px-3 py-2 text-[9px] text-slate-600 backdrop-blur-md">Elevation labels are arbitrary teaching values. Read the pattern, not the numbers.</div></div>;
}

function Readout({ label, value }: { label: string; value: string }) { return <div className="rounded-[14px] border border-white/[0.045] bg-white/[0.012] p-3"><div className="text-[9px] font-semibold uppercase tracking-[0.09em] text-slate-700">{label}</div><div className="mt-1 text-[11px] text-emerald-200/80">{value}</div></div>; }
function CoreFact({ icon: Icon, label, text, rgb }: { icon: LucideIcon; label: string; text: string; rgb: string }) { return <div className="grid grid-cols-[38px_minmax(0,1fr)] items-center gap-3 rounded-[15px] border border-white/[0.045] bg-black/[0.14] p-3"><span className="flex h-9 w-9 items-center justify-center rounded-xl border" style={{ color: `rgb(${rgb})`, borderColor: `rgba(${rgb},0.16)`, background: `rgba(${rgb},0.035)` }}><Icon size={15} /></span><span><strong className="block text-[11px] font-semibold text-slate-300">{label}</strong><span className="mt-0.5 block text-[10px] leading-4 text-slate-600">{text}</span></span></div>; }
function ReferenceCard({ title, text }: { title: string; text: string }) { return <div className="rounded-[18px] border border-emerald-200/[0.07] bg-black/[0.18] p-4 backdrop-blur-xl"><h3 className="text-[13px] font-semibold text-slate-200">{title}</h3><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>; }
