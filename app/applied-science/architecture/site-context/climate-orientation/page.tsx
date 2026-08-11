"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Compass,
  RotateCw,
  SunMedium,
  Wind,
  type LucideIcon,
} from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import BlueprintBackground from "../../BlueprintBackground";

type FaceId = "A" | "B" | "C" | "D";
type Face = {
  id: FaceId;
  label: string;
  bearing: number;
  kind: "long" | "short";
  sun: number;
  wind: number;
};

const SCENARIOS = [
  { id: "east-west", label: "East–west long axis", axis: 90, sun: 180, wind: 270 },
  { id: "diagonal", label: "Diagonal building", axis: 45, sun: 135, wind: 315 },
  { id: "north-south", label: "North–south long axis", axis: 0, sun: 225, wind: 90 },
] as const;

type ScenarioId = (typeof SCENARIOS)[number]["id"];

export default function ClimateOrientationPage() {
  const [activeScenario, setActiveScenario] = useState<ScenarioId | null>("east-west");
  const [axisBearing, setAxisBearing] = useState(90);
  const [sunBearing, setSunBearing] = useState(180);
  const [windBearing, setWindBearing] = useState(270);

  const faces = useMemo<Face[]>(() => {
    const base = [
      { id: "A" as const, label: "Long face A", bearing: normalize(axisBearing - 90), kind: "long" as const },
      { id: "B" as const, label: "Long face B", bearing: normalize(axisBearing + 90), kind: "long" as const },
      { id: "C" as const, label: "Short face C", bearing: normalize(axisBearing), kind: "short" as const },
      { id: "D" as const, label: "Short face D", bearing: normalize(axisBearing + 180), kind: "short" as const },
    ];
    return base.map((face) => ({
      ...face,
      sun: facingExposure(face.bearing, sunBearing),
      wind: facingExposure(face.bearing, windBearing),
    }));
  }, [axisBearing, sunBearing, windBearing]);

  const strongestSun = faces.reduce((best, face) => face.sun > best.sun ? face : best, faces[0]);
  const strongestWind = faces.reduce((best, face) => face.wind > best.wind ? face : best, faces[0]);

  const applyScenario = (id: ScenarioId) => {
    const scenario = SCENARIOS.find((item) => item.id === id) ?? SCENARIOS[0];
    setActiveScenario(id);
    setAxisBearing(scenario.axis);
    setSunBearing(scenario.sun);
    setWindBearing(scenario.wind);
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#07131a] text-slate-100 selection:bg-amber-400/25">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-54"><BlueprintBackground /></div>
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_82%_14%,rgba(251,191,36,0.10),transparent_28%),radial-gradient(circle_at_16%_82%,rgba(192,132,252,0.055),transparent_27%),linear-gradient(to_bottom,rgba(7,19,26,0.16),rgba(3,10,15,0.92))]" />
      <div className="pointer-events-none fixed inset-0 z-[1] opacity-20 [background-image:linear-gradient(rgba(125,211,252,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.018)_1px,transparent_1px)] [background-size:38px_38px]" />

      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-4 py-4 sm:px-6 xl:px-8 xl:py-5">
        <DomainPageHeader
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Applied Sciences", href: "/applied-science" },
            { label: "Architecture", href: "/applied-science/architecture" },
            { label: "Site & Context", href: "/applied-science/architecture/site-context" },
            { label: "Climate & Orientation" },
          ]}
          eyebrow="Bearing · Exposure · Orientation · Shade · Wind · Response"
          icon={Compass}
          title={<span>Climate & Orientation</span>}
          subtitle="Relate directional environmental forces to building orientation without confusing geometric exposure with architectural performance."
          accentRgb="251, 191, 36"
          titleClassName="font-serif text-[clamp(2.7rem,4.9vw,5.15rem)] font-semibold leading-[0.86] tracking-[-0.055em] text-[#f8fbff]"
          iconClassName="rounded-[16px]"
          headerClassName="border-amber-300/[0.13]"
          aside={<div className="rounded-full border border-amber-300/[0.14] bg-black/25 px-4 py-2 font-mono text-[12px] text-amber-200/85 backdrop-blur-md">orientation changes exposure</div>}
        />

        <section className="mt-3 grid gap-3 rounded-[24px] border border-amber-200/[0.10] bg-black/[0.22] p-5 backdrop-blur-xl lg:grid-cols-[minmax(0,1.15fr)_minmax(330px,0.85fr)]">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-amber-300/72">Core idea</div>
            <h2 className="mt-2 text-[28px] font-semibold tracking-[-0.035em] text-white">Rotating a building changes which faces meet a directional force most directly.</h2>
            <p className="mt-3 max-w-4xl text-[14px] leading-6 text-slate-400">Sun and wind arrive from directions that vary with place and time. A façade pointed toward a source is more directly exposed geometrically, but that does not tell us whether the exposure is desirable. Climate strategy comes from connecting orientation to season, program, glazing, shading, ventilation, envelope design, landscape, and real weather data.</p>
          </div>
          <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
            <CoreFact icon={Compass} label="Bearing" text="Describe direction consistently. This lesson uses degrees clockwise from north." rgb="56, 189, 248" />
            <CoreFact icon={SunMedium} label="Solar direction" text="Actual sun position depends on location, date, and time; this studio uses an illustrative bearing." rgb="251, 191, 36" />
            <CoreFact icon={Wind} label="Wind direction" text="Real wind is variable and statistical. One bearing is a simplified directional snapshot." rgb="192, 132, 252" />
          </div>
        </section>

        <section className="mt-3 rounded-[26px] border border-amber-200/[0.12] bg-black/[0.24] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.025),0_28px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl">
          <div className="flex flex-col gap-2 px-1 pb-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-amber-300/75">Orientation studio</div>
              <p className="mt-1 text-[13px] text-slate-500">Rotate the building and the two illustrative source bearings independently.</p>
            </div>
            <div className="font-mono text-[11px] text-slate-600">0° north · 90° east · 180° south · 270° west</div>
          </div>

          <div className="grid items-stretch gap-3 xl:grid-cols-[310px_minmax(520px,1fr)_350px]">
            <div className="rounded-[20px] border border-amber-200/[0.08] bg-[#171109]/72 p-4">
              <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">Directional scenarios</div>
              <div className="mt-3 grid gap-2">
                {SCENARIOS.map((scenario) => (
                  <button key={scenario.id} type="button" onClick={() => applyScenario(scenario.id)} className={`rounded-[14px] border p-3 text-left ${activeScenario === scenario.id ? "border-amber-300/[0.26] bg-amber-400/[0.055]" : "border-white/[0.045] bg-black/[0.14]"}`}>
                    <strong className="text-[11px] text-slate-200">{scenario.label}</strong>
                    <div className="mt-1 font-mono text-[9px] text-slate-600">axis {scenario.axis}° · sun {scenario.sun}° · wind {scenario.wind}°</div>
                  </button>
                ))}
              </div>
              <div className="mt-3 grid gap-2">
                <BearingControl label="Building long-axis bearing" value={axisBearing} rgb="56, 189, 248" onChange={(value) => { setActiveScenario(null); setAxisBearing(value); }} max={170} step={10} />
                <BearingControl label="Illustrative sun bearing" value={sunBearing} rgb="251, 191, 36" onChange={(value) => { setActiveScenario(null); setSunBearing(value); }} />
                <BearingControl label="Illustrative wind bearing" value={windBearing} rgb="192, 132, 252" onChange={(value) => { setActiveScenario(null); setWindBearing(value); }} />
              </div>
            </div>

            <OrientationDiagram faces={faces} axisBearing={axisBearing} sunBearing={sunBearing} windBearing={windBearing} />

            <div className="rounded-[20px] border border-sky-200/[0.08] bg-[#061621]/76 p-4">
              <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-sky-300/70">Read the exposure</div>
              <div className="mt-3 rounded-[15px] border border-white/[0.05] bg-black/[0.16] p-3">
                <div className="grid grid-cols-2 gap-2">
                  <Summary label="Most sun-facing" value={`${strongestSun.id} · ${bearingLabel(strongestSun.bearing)}`} rgb="251, 191, 36" />
                  <Summary label="Most wind-facing" value={`${strongestWind.id} · ${bearingLabel(strongestWind.bearing)}`} rgb="192, 132, 252" />
                </div>
              </div>

              <div className="mt-3 grid gap-2">
                {faces.map((face) => (
                  <div key={face.id} className="rounded-[14px] border border-white/[0.045] bg-white/[0.012] p-3">
                    <div className="flex items-center justify-between gap-3"><strong className="text-[11px] text-slate-300">Face {face.id} · {face.kind}</strong><span className="font-mono text-[10px] text-sky-300/75">{bearingLabel(face.bearing)}</span></div>
                    <div className="mt-2 grid grid-cols-2 gap-2"><Exposure label="sun facing" value={face.sun} rgb="251, 191, 36" /><Exposure label="wind facing" value={face.wind} rgb="192, 132, 252" /></div>
                  </div>
                ))}
              </div>

              <div className="mt-3 rounded-[15px] border border-rose-300/[0.10] bg-rose-400/[0.02] p-3">
                <div className="text-[9px] font-semibold uppercase tracking-[0.10em] text-rose-300/70">Facing is not performance</div>
                <p className="mt-1.5 text-[10px] leading-4 text-slate-600">The percentages are only geometric alignment between a façade normal and a directional source. They do not calculate heat gain, daylight, energy use, ventilation, comfort, pressure, or structural wind load.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-3 grid gap-3 lg:grid-cols-3">
          <ReferenceCard title="Actual solar study needs place and time" text="Latitude, longitude, date, time, horizon, neighboring obstructions, facade geometry, glazing, and shading all affect solar exposure. A single compass bearing is only one geometric ingredient." />
          <ReferenceCard title="Wind is a distribution, not one arrow" text="Wind speed and direction change by season, weather pattern, terrain, height, and surrounding buildings. Design studies use local climate data rather than one permanent prevailing arrow." />
          <ReferenceCard title="Orientation is one variable among many" text="A useful building orientation may emerge from climate together with site access, views, noise, program, structure, urban context, landscape, and project priorities." />
        </section>

        <nav className="mt-3 pb-8" aria-label="Climate and orientation navigation">
          <div className="grid gap-3 sm:grid-cols-2">
            <Link href="/applied-science/architecture/site-context/analysis-constraints" className="group flex min-h-[72px] items-center gap-3 rounded-[18px] border border-sky-300/[0.10] bg-black/[0.20] px-4 py-3 transition-colors hover:border-sky-300/[0.18]"><ArrowLeft size={15} className="text-sky-300 transition-transform group-hover:-translate-x-0.5" /><span><span className="block text-[9px] font-semibold uppercase tracking-[0.10em] text-slate-600">Previous lesson</span><strong className="mt-0.5 block text-[14px] text-slate-200">Site Analysis & Constraints</strong></span></Link>
            <div className="flex min-h-[72px] items-center justify-end rounded-[18px] border border-white/[0.05] bg-black/[0.14] px-4 py-3 opacity-60"><span className="text-right"><span className="block text-[9px] font-semibold uppercase tracking-[0.10em] text-slate-700">Next lesson · planned</span><strong className="mt-0.5 block text-[14px] text-slate-500">Topography & Water</strong></span></div>
          </div>
        </nav>
      </div>
    </main>
  );
}

function OrientationDiagram({ faces, axisBearing, sunBearing, windBearing }: { faces: Face[]; axisBearing: number; sunBearing: number; windBearing: number }) {
  const cx = 310;
  const cy = 250;
  const sourcePoint = (bearing: number, radius: number) => ({ x: cx + Math.sin(toRadians(bearing)) * radius, y: cy - Math.cos(toRadians(bearing)) * radius });
  const sun = sourcePoint(sunBearing, 195);
  const wind = sourcePoint(windBearing, 218);
  const face = (id: FaceId) => faces.find((item) => item.id === id) ?? faces[0];
  return (
    <div className="relative flex min-h-[570px] items-center justify-center overflow-hidden rounded-[20px] border border-amber-200/[0.10] bg-[#041318]/86 p-4">
      <div className="absolute left-4 top-4 z-10"><div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">Plan orientation</div><div className="mt-1 font-mono text-[9px] text-amber-300/65">long axis {axisBearing}° · {bearingLabel(axisBearing)}</div></div>
      <svg viewBox="0 0 620 500" className="w-full max-w-[680px]" role="img" aria-label="Rotatable building plan with illustrative sun and wind bearings">
        <defs>
          <pattern id="orientation-grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="rgba(125,211,252,0.055)" strokeWidth="1" /></pattern>
          <marker id="sun-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#fbbf24" /></marker>
          <marker id="wind-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#c084fc" /></marker>
        </defs>
        <rect width="620" height="500" fill="url(#orientation-grid)" />
        <circle cx={cx} cy={cy} r="205" fill="none" stroke="rgba(148,163,184,0.16)" strokeWidth="1.5" />
        <g fill="#94a3b8" fontSize="10"><text x={cx} y="28" textAnchor="middle">N · 0°</text><text x="592" y={cy + 4} textAnchor="end">E · 90°</text><text x={cx} y="486" textAnchor="middle">S · 180°</text><text x="28" y={cy + 4}>W · 270°</text></g>

        <line x1={sun.x} y1={sun.y} x2={cx} y2={cy} stroke="#fbbf24" strokeWidth="3" markerEnd="url(#sun-arrow)" opacity="0.78" />
        <circle cx={sun.x} cy={sun.y} r="11" fill="#fbbf24" opacity="0.85" /><text x={sun.x} y={sun.y - 18} textAnchor="middle" fill="#fde68a" fontSize="9">SUN {sunBearing}°</text>
        <line x1={wind.x} y1={wind.y} x2={cx} y2={cy} stroke="#c084fc" strokeWidth="3" strokeDasharray="8 6" markerEnd="url(#wind-arrow)" opacity="0.72" />
        <text x={wind.x} y={wind.y + 20} textAnchor="middle" fill="#d8b4fe" fontSize="9">WIND {windBearing}°</text>

        <g transform={`rotate(${axisBearing - 90} ${cx} ${cy})`}>
          <rect x={cx - 130} y={cy - 60} width="260" height="120" rx="5" fill="rgba(56,189,248,0.055)" stroke="rgba(226,232,240,0.46)" strokeWidth="2" />
          <line x1={cx - 130} y1={cy - 60} x2={cx + 130} y2={cy - 60} stroke="#fbbf24" strokeWidth="7" opacity={0.18 + face("A").sun * 0.78} />
          <line x1={cx - 130} y1={cy + 60} x2={cx + 130} y2={cy + 60} stroke="#fbbf24" strokeWidth="7" opacity={0.18 + face("B").sun * 0.78} />
          <line x1={cx + 130} y1={cy - 60} x2={cx + 130} y2={cy + 60} stroke="#fbbf24" strokeWidth="7" opacity={0.18 + face("C").sun * 0.78} />
          <line x1={cx - 130} y1={cy - 60} x2={cx - 130} y2={cy + 60} stroke="#fbbf24" strokeWidth="7" opacity={0.18 + face("D").sun * 0.78} />

          <line x1={cx - 130} y1={cy - 53} x2={cx + 130} y2={cy - 53} stroke="#c084fc" strokeWidth="3" strokeDasharray="8 5" opacity={0.15 + face("A").wind * 0.85} />
          <line x1={cx - 130} y1={cy + 53} x2={cx + 130} y2={cy + 53} stroke="#c084fc" strokeWidth="3" strokeDasharray="8 5" opacity={0.15 + face("B").wind * 0.85} />
          <line x1={cx + 123} y1={cy - 60} x2={cx + 123} y2={cy + 60} stroke="#c084fc" strokeWidth="3" strokeDasharray="8 5" opacity={0.15 + face("C").wind * 0.85} />
          <line x1={cx - 123} y1={cy - 60} x2={cx - 123} y2={cy + 60} stroke="#c084fc" strokeWidth="3" strokeDasharray="8 5" opacity={0.15 + face("D").wind * 0.85} />

          <g fill="#f8fafc" fontSize="11" fontWeight="600"><text x={cx} y={cy - 72} textAnchor="middle">A</text><text x={cx} y={cy + 82} textAnchor="middle">B</text><text x={cx + 145} y={cy + 4} textAnchor="middle">C</text><text x={cx - 145} y={cy + 4} textAnchor="middle">D</text></g>
          <line x1={cx - 95} y1={cy} x2={cx + 95} y2={cy} stroke="#38bdf8" strokeWidth="2" strokeDasharray="10 7" />
        </g>
      </svg>
      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-x-4 gap-y-2 rounded-xl border border-white/[0.05] bg-black/60 px-3 py-2 text-[9px] text-slate-600 backdrop-blur-md"><span className="text-amber-300">amber thickness = sun-facing alignment</span><span className="text-violet-300">violet dashed = wind-facing alignment</span></div>
    </div>
  );
}

function BearingControl({ label, value, rgb, onChange, max = 350, step = 10 }: { label: string; value: number; rgb: string; onChange: (value: number) => void; max?: number; step?: number }) {
  return <label className="block rounded-[14px] border border-white/[0.045] bg-white/[0.012] p-3"><span className="flex items-center justify-between gap-3"><span className="text-[10px] font-semibold text-slate-400">{label}</span><span className="rounded-md px-2 py-1 font-mono text-[10px]" style={{ color: `rgb(${rgb})`, background: `rgba(${rgb},0.06)` }}>{value}° · {bearingLabel(value)}</span></span><input type="range" min="0" max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className="mt-2.5 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/[0.07] accent-amber-400" /></label>;
}

function Exposure({ label, value, rgb }: { label: string; value: number; rgb: string }) {
  const percent = Math.round(value * 100);
  return <div className="rounded-xl border border-white/[0.04] bg-black/[0.13] p-2"><div className="flex items-center justify-between gap-2"><span className="text-[8px] uppercase tracking-[0.08em] text-slate-700">{label}</span><span className="font-mono text-[9px]" style={{ color: `rgb(${rgb})` }}>{percent}%</span></div><div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/[0.05]"><div className="h-full rounded-full" style={{ width: `${percent}%`, background: `rgba(${rgb},0.65)` }} /></div></div>;
}

function Summary({ label, value, rgb }: { label: string; value: string; rgb: string }) {
  return <div className="rounded-xl border border-white/[0.045] bg-white/[0.012] p-2.5"><div className="text-[8px] uppercase tracking-[0.08em] text-slate-700">{label}</div><div className="mt-1 font-mono text-[10px]" style={{ color: `rgb(${rgb})` }}>{value}</div></div>;
}

function CoreFact({ icon: Icon, label, text, rgb }: { icon: LucideIcon; label: string; text: string; rgb: string }) {
  return <div className="grid grid-cols-[38px_minmax(0,1fr)] items-center gap-3 rounded-[15px] border border-white/[0.045] bg-black/[0.14] p-3"><span className="flex h-9 w-9 items-center justify-center rounded-xl border" style={{ color: `rgb(${rgb})`, borderColor: `rgba(${rgb},0.16)`, background: `rgba(${rgb},0.035)` }}><Icon size={15} /></span><span><strong className="block text-[11px] font-semibold text-slate-300">{label}</strong><span className="mt-0.5 block text-[10px] leading-4 text-slate-600">{text}</span></span></div>;
}

function ReferenceCard({ title, text }: { title: string; text: string }) {
  return <div className="rounded-[18px] border border-amber-200/[0.07] bg-black/[0.18] p-4 backdrop-blur-xl"><h3 className="text-[13px] font-semibold text-slate-200">{title}</h3><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>;
}

function facingExposure(faceBearing: number, sourceBearing: number) {
  const difference = angularDifference(faceBearing, sourceBearing);
  return Math.max(0, Math.cos(toRadians(difference)));
}

function angularDifference(a: number, b: number) {
  const difference = Math.abs(normalize(a) - normalize(b));
  return Math.min(difference, 360 - difference);
}

function normalize(value: number) {
  return ((value % 360) + 360) % 360;
}

function toRadians(value: number) {
  return value * Math.PI / 180;
}

function bearingLabel(value: number) {
  const names = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"] as const;
  return names[Math.round(normalize(value) / 45) % 8];
}
