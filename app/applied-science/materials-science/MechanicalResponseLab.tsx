"use client";

import { useMemo, useState } from "react";
import { Activity, Gauge, MoveHorizontal, ShieldAlert } from "lucide-react";
import { Surface } from "@/app/_page-system/scene";

type ProfileKey = "brittle" | "ductile" | "elastomer";

type Profile = {
  label: string;
  rgb: string;
  stiffness: string;
  deformation: string;
  limit: number;
  summary: string;
};

const PROFILES: Record<ProfileKey, Profile> = {
  brittle: {
    label: "Brittle-like response",
    rgb: "125,211,252",
    stiffness: "high cue",
    deformation: "mostly elastic → fracture",
    limit: 2,
    summary: "A steep initial slope and little strain before the teaching fracture point. This emphasizes stiffness and limited deformation capacity, not a specific ceramic or glass dataset.",
  },
  ductile: {
    label: "Ductile-like response",
    rgb: "251,191,36",
    stiffness: "moderate-high cue",
    deformation: "elastic → plastic → fracture",
    limit: 20,
    summary: "An initial elastic region is followed by idealized yielding and plastic deformation before the teaching fracture point. Real metals show material-, temperature-, rate-, and processing-dependent curves.",
  },
  elastomer: {
    label: "Elastomer-like response",
    rgb: "244,114,182",
    stiffness: "low initial cue",
    deformation: "large reversible deformation",
    limit: 20,
    summary: "A low initial slope and strongly nonlinear rise illustrate large reversible deformation within this toy window. Real elastomers can show rate dependence, hysteresis, temperature sensitivity, and much larger strains.",
  },
};

export default function MechanicalResponseLab() {
  const [profileKey, setProfileKey] = useState<ProfileKey>("ductile");
  const [strain, setStrain] = useState(4);
  const profile = PROFILES[profileKey];

  const result = useMemo(() => response(profileKey, strain), [profileKey, strain]);
  const curve = useMemo(() => Array.from({ length: 111 }, (_, index) => {
    const x = (index / 110) * 22;
    return { x, ...response(profileKey, x) };
  }), [profileKey]);

  const status = regime(profileKey, strain);

  return (
    <Surface
      variant="glass"
      className="overflow-hidden rounded-[32px] border-slate-100/[0.12]"
      style={{ background: "rgba(5,9,13,0.34)" }}
    >
      <div className="grid border-b border-white/[0.08] lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-sky-200/64">
            <Activity size={14} /> Mechanical response · idealized stress-strain shapes
          </div>
          <h2 className="mt-2 text-[clamp(1.8rem,3.3vw,3.2rem)] font-semibold leading-[0.96] tracking-[-0.048em] text-white">
            What can the shape of a stress-strain curve tell us about response before failure?
          </h2>
          <p className="mt-3 max-w-4xl text-[14px] leading-6 text-slate-300/70">
            Compare three schematic response families while increasing applied strain. The vertical axis is normalized stress, so the curves teach shape and regime rather than claiming measured strength values.
          </p>
        </div>
        <div className="border-t border-white/[0.08] bg-black/[0.07] p-5 backdrop-blur-[14px] lg:border-l lg:border-t-0">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-violet-200/58">Model boundary</div>
          <p className="mt-3 text-[13px] leading-6 text-slate-300/64">
            These are teaching curves, not property data for a named material. Actual stress-strain behavior depends on composition, processing, microstructure, geometry, temperature, loading rate, environment, test method, and direction.
          </p>
        </div>
      </div>

      <div className="grid xl:grid-cols-[minmax(0,1fr)_350px]">
        <div className="border-b border-white/[0.08] p-4 sm:p-5 xl:border-b-0 xl:border-r">
          <div className="relative min-h-[360px] overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#050b10]/68 p-4 backdrop-blur-[8px]">
            <ResponseChart curve={curve} strain={strain} result={result} profile={profile} />
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <Readout label="Applied strain" value={`${strain.toFixed(1)}%`} note="horizontal engineering-strain cue" rgb="203,213,225" />
            <Readout label="Normalized stress" value={result.fractured ? "released" : result.stress.toFixed(2)} note="shape-only vertical scale" rgb={profile.rgb} />
            <Readout label="Response regime" value={status.label} note={status.note} rgb={status.rgb} />
          </div>
        </div>

        <div className="p-4 sm:p-5">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-slate-500">Response family</div>
          <div className="mt-3 grid gap-2">
            {(Object.entries(PROFILES) as Array<[ProfileKey, Profile]>).map(([key, item]) => {
              const selected = key === profileKey;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setProfileKey(key);
                    setStrain(Math.min(strain, key === "brittle" ? 3.5 : 18));
                  }}
                  className="rounded-[16px] border px-3 py-3 text-left transition"
                  style={{ borderColor: selected ? `rgba(${item.rgb},0.34)` : "rgba(255,255,255,0.07)", background: selected ? `rgba(${item.rgb},0.06)` : "rgba(0,0,0,0.08)" }}
                >
                  <span className="flex items-center justify-between gap-3"><strong className="text-[13px] text-white/86">{item.label}</strong><span className="h-2 w-2 rounded-full" style={{ background: `rgb(${item.rgb})`, opacity: selected ? 0.9 : 0.34 }} /></span>
                  <span className="mt-1 block text-[11px] leading-4 text-slate-500">{item.deformation}</span>
                </button>
              );
            })}
          </div>

          <label className="mt-4 block rounded-[18px] border border-white/[0.08] bg-black/[0.10] p-4 backdrop-blur-[12px]">
            <span className="flex items-center justify-between gap-3 text-[13px] font-semibold text-slate-300"><span className="flex items-center gap-2"><MoveHorizontal size={15} style={{ color: `rgb(${profile.rgb})` }} /> Applied strain</span><strong className="font-mono text-white">{strain.toFixed(1)}%</strong></span>
            <input
              type="range"
              min="0"
              max="22"
              step="0.2"
              value={strain}
              onChange={(event) => setStrain(Number(event.target.value))}
              className="mt-4 w-full accent-sky-300"
            />
            <div className="mt-2 flex justify-between font-mono text-[11px] text-slate-600"><span>0%</span><span>11%</span><span>22%</span></div>
          </label>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <MiniFact icon={Gauge} label="Stiffness cue" value={profile.stiffness} />
            <MiniFact icon={ShieldAlert} label="Teaching limit" value={profileKey === "brittle" ? "fracture ≈ 2%" : profileKey === "ductile" ? "fracture ≈ 20%" : "window ends at 20%"} />
          </div>

          <div className="mt-4 border-t border-white/[0.08] pt-4">
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.09em]" style={{ color: `rgba(${profile.rgb},0.72)` }}>What this curve emphasizes</div>
            <p className="mt-2 text-[13px] leading-6 text-slate-300/68">{profile.summary}</p>
          </div>
        </div>
      </div>
    </Surface>
  );
}

function response(profile: ProfileKey, strain: number) {
  if (profile === "brittle") {
    if (strain > 2) return { stress: 0, fractured: true };
    return { stress: Math.min(0.94, strain * 0.47), fractured: false };
  }

  if (profile === "ductile") {
    if (strain > 20) return { stress: 0, fractured: true };
    if (strain <= 2) return { stress: strain * 0.31, fractured: false };
    if (strain <= 14) return { stress: 0.62 + (strain - 2) * 0.021, fractured: false };
    return { stress: Math.max(0.62, 0.872 - (strain - 14) * 0.038), fractured: false };
  }

  if (strain > 20) return { stress: 0, fractured: true };
  return { stress: Math.min(0.96, 0.0122 * Math.pow(strain, 1.45)), fractured: false };
}

function regime(profile: ProfileKey, strain: number) {
  if (profile === "brittle") {
    return strain > 2
      ? { label: "fractured", note: "beyond the teaching fracture point", rgb: "248,113,113" }
      : { label: "elastic", note: "steep reversible-response cue", rgb: "125,211,252" };
  }
  if (profile === "ductile") {
    if (strain > 20) return { label: "fractured", note: "beyond the teaching fracture point", rgb: "248,113,113" };
    if (strain <= 2) return { label: "elastic", note: "initial reversible-response cue", rgb: "125,211,252" };
    return { label: "plastic", note: "idealized permanent-deformation regime", rgb: "251,191,36" };
  }
  return strain > 20
    ? { label: "outside model", note: "toy curve stops at 20% strain", rgb: "248,113,113" }
    : { label: "large reversible", note: "schematic nonlinear elastic cue", rgb: "244,114,182" };
}

function ResponseChart({
  curve,
  strain,
  result,
  profile,
}: {
  curve: Array<{ x: number; stress: number; fractured: boolean }>;
  strain: number;
  result: { stress: number; fractured: boolean };
  profile: Profile;
}) {
  const x0 = 62;
  const y0 = 295;
  const chartW = 590;
  const chartH = 240;
  const toX = (value: number) => x0 + (value / 22) * chartW;
  const toY = (value: number) => y0 - value * chartH;
  const path = curve
    .filter((point) => !point.fractured)
    .map((point, index) => `${index === 0 ? "M" : "L"} ${toX(point.x).toFixed(2)} ${toY(point.stress).toFixed(2)}`)
    .join(" ");

  return (
    <svg viewBox="0 0 700 330" className="absolute inset-0 h-full w-full" role="img" aria-label={`${profile.label} idealized normalized stress-strain curve`}>
      <g stroke="rgba(148,163,184,0.10)" strokeWidth="1">
        {[0, 0.25, 0.5, 0.75, 1].map((tick) => <line key={`y-${tick}`} x1={x0} x2={x0 + chartW} y1={toY(tick)} y2={toY(tick)} />)}
        {[0, 5, 10, 15, 20].map((tick) => <line key={`x-${tick}`} x1={toX(tick)} x2={toX(tick)} y1={y0 - chartH} y2={y0} />)}
      </g>
      <g stroke="rgba(203,213,225,0.36)" strokeWidth="1.4">
        <line x1={x0} x2={x0} y1={y0 - chartH} y2={y0} />
        <line x1={x0} x2={x0 + chartW} y1={y0} y2={y0} />
      </g>
      <path d={path} fill="none" stroke={`rgb(${profile.rgb})`} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />

      {!result.fractured ? (
        <g>
          <line x1={toX(strain)} x2={toX(strain)} y1={y0} y2={toY(result.stress)} stroke={`rgba(${profile.rgb},0.24)`} strokeDasharray="4 5" />
          <circle cx={toX(strain)} cy={toY(result.stress)} r="7" fill={`rgba(${profile.rgb},0.20)`} stroke={`rgba(${profile.rgb},0.88)`} strokeWidth="2" />
        </g>
      ) : (
        <g transform={`translate(${toX(Math.min(strain, profile.limit))} ${toY(profileKeyStress(profile))})`}>
          <line x1="-7" y1="-7" x2="7" y2="7" stroke="rgba(248,113,113,0.78)" strokeWidth="2" />
          <line x1="7" y1="-7" x2="-7" y2="7" stroke="rgba(248,113,113,0.78)" strokeWidth="2" />
        </g>
      )}

      <g fill="rgba(148,163,184,0.54)" fontFamily="ui-monospace, monospace" fontSize="11">
        <text x="20" y="55">normalized</text><text x="20" y="69">stress</text>
        <text x="540" y="321">engineering strain (%)</text>
        {[0, 5, 10, 15, 20].map((tick) => <text key={tick} x={toX(tick) - 7} y="314">{tick}</text>)}
        {[0, 0.5, 1].map((tick) => <text key={tick} x="36" y={toY(tick) + 4}>{tick.toFixed(1)}</text>)}
      </g>
    </svg>
  );
}

function profileKeyStress(profile: Profile) {
  if (profile.label.startsWith("Brittle")) return 0.94;
  if (profile.label.startsWith("Ductile")) return 0.64;
  return 0.90;
}

function Readout({ label, value, note, rgb }: { label: string; value: string; note: string; rgb: string }) {
  return (
    <div className="border-l px-3 py-2" style={{ borderColor: `rgba(${rgb},0.30)` }}>
      <div className="font-mono text-[11px] uppercase tracking-[0.07em] text-slate-500">{label}</div>
      <strong className="mt-1 block text-[18px] text-white">{value}</strong>
      <span className="mt-1 block text-[11px] leading-4 text-slate-600">{note}</span>
    </div>
  );
}

function MiniFact({ icon: Icon, label, value }: { icon: typeof Gauge; label: string; value: string }) {
  return (
    <div className="border-t border-white/[0.08] pt-3">
      <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.07em] text-slate-500"><Icon size={13} /> {label}</div>
      <strong className="mt-1 block text-[12px] leading-5 text-white/72">{value}</strong>
    </div>
  );
}
