"use client";

import { useMemo, useState } from "react";
import { Activity, AlertTriangle, CheckCircle2, Gauge, ShieldCheck } from "lucide-react";
import { Surface } from "@/app/_page-system/scene";

type SpecimenKey = "timber" | "concrete" | "steel";

type Specimen = {
  label: string;
  capacity: number;
  rgb: string;
  note: string;
};

const SPECIMENS: Record<SpecimenKey, Specimen> = {
  timber: {
    label: "Timber specimen",
    capacity: 95,
    rgb: "251,191,36",
    note: "Illustrative lower-capacity specimen in this normalized test rig.",
  },
  concrete: {
    label: "Reinforced concrete specimen",
    capacity: 145,
    rgb: "148,163,184",
    note: "Illustrative intermediate-capacity specimen in this normalized test rig.",
  },
  steel: {
    label: "Structural steel specimen",
    capacity: 210,
    rgb: "56,189,248",
    note: "Illustrative higher-capacity specimen in this normalized test rig.",
  },
};

export default function StressTestLab() {
  const [load, setLoad] = useState(80);
  const [specimenKey, setSpecimenKey] = useState<SpecimenKey>("concrete");
  const specimen = SPECIMENS[specimenKey];
  const demandRatio = load / specimen.capacity;
  const safetyFactor = specimen.capacity / Math.max(load, 1);
  const state = demandRatio >= 1 ? "failure" : safetyFactor < 1.25 ? "margin" : "stable";

  const bend = useMemo(() => Math.min(82, 14 + demandRatio * 52), [demandRatio]);

  return (
    <Surface
      variant="glass"
      className="overflow-hidden rounded-[32px] border-sky-100/[0.13]"
      style={{ background: "rgba(5,12,25,0.34)" }}
    >
      <div className="grid border-b border-sky-100/[0.08] lg:grid-cols-[minmax(0,1fr)_330px]">
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-sky-200/66">
            <Activity size={14} /> Structural test bench · normalized specimen
          </div>
          <h2 className="mt-2 text-[clamp(1.8rem,3.3vw,3.2rem)] font-semibold leading-[0.96] tracking-[-0.048em] text-white">
            How much margin remains between demand and resistance?
          </h2>
          <p className="mt-3 max-w-4xl text-[14px] leading-6 text-slate-300/70">
            Change the applied load or specimen profile. The lab compares demand with an illustrative design resistance and reports a safety factor. The bending drawing is a teaching visualization, not a finite-element result.
          </p>
        </div>
        <div className="border-t border-sky-100/[0.08] bg-black/[0.07] p-5 backdrop-blur-[14px] lg:border-l lg:border-t-0">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-violet-200/60">Engineering boundary</div>
          <p className="mt-3 text-[13px] leading-6 text-slate-300/64">
            Real capacity depends on geometry, material behavior, connections, buckling, fatigue, load combinations, uncertainty, codes, and failure mode. The specimen numbers below are intentionally illustrative rather than material constants.
          </p>
        </div>
      </div>

      <div className="grid xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="border-b border-sky-100/[0.08] p-4 sm:p-5 xl:border-b-0 xl:border-r">
          <div className="relative min-h-[300px] overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#061020]/62 backdrop-blur-[8px]">
            <svg viewBox="0 0 720 300" className="absolute inset-0 h-full w-full" role="img" aria-label="Simply supported beam with a central applied load and illustrated deflection">
              <defs>
                <linearGradient id="beam-stroke" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="rgba(125,211,252,0.45)" />
                  <stop offset="0.5" stopColor={state === "failure" ? "rgba(248,113,113,0.95)" : state === "margin" ? "rgba(251,191,36,0.92)" : "rgba(125,211,252,0.92)"} />
                  <stop offset="1" stopColor="rgba(125,211,252,0.45)" />
                </linearGradient>
              </defs>

              <g opacity="0.18" stroke="rgba(125,211,252,0.42)" strokeWidth="1">
                {Array.from({ length: 13 }, (_, index) => <line key={`v-${index}`} x1={index * 60} y1="0" x2={index * 60} y2="300" />)}
                {Array.from({ length: 6 }, (_, index) => <line key={`h-${index}`} x1="0" y1={index * 60} x2="720" y2={index * 60} />)}
              </g>

              <path d={`M 80 174 Q 360 ${174 + bend} 640 174`} fill="none" stroke="url(#beam-stroke)" strokeWidth="12" strokeLinecap="round" />
              <path d="M62 215 L80 176 L98 215 Z" fill="rgba(148,163,184,0.18)" stroke="rgba(203,213,225,0.42)" />
              <circle cx="640" cy="186" r="10" fill="none" stroke="rgba(203,213,225,0.42)" />
              <path d="M620 215 L660 215" stroke="rgba(203,213,225,0.34)" />

              <line x1="360" y1="44" x2="360" y2="126" stroke="rgba(251,191,36,0.72)" strokeWidth="3" />
              <path d="M350 112 L360 130 L370 112" fill="none" stroke="rgba(251,191,36,0.72)" strokeWidth="3" />
              <text x="360" y="31" textAnchor="middle" fill="rgba(254,240,138,0.78)" fontSize="14" fontFamily="ui-monospace, monospace">{load} kN demand</text>

              <line x1="80" y1="252" x2="640" y2="252" stroke="rgba(167,139,250,0.32)" />
              <line x1="80" y1="244" x2="80" y2="260" stroke="rgba(167,139,250,0.32)" />
              <line x1="640" y1="244" x2="640" y2="260" stroke="rgba(167,139,250,0.32)" />
              <text x="360" y="274" textAnchor="middle" fill="rgba(196,181,253,0.50)" fontSize="12" fontFamily="ui-monospace, monospace">normalized simply supported specimen</text>
            </svg>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <Readout label="Demand" value={`${load} kN`} note="illustrative applied load" rgb="251,191,36" />
            <Readout label="Resistance" value={`${specimen.capacity} kN`} note="illustrative design capacity" rgb={specimen.rgb} />
            <Readout label="Safety factor" value={safetyFactor.toFixed(2)} note="resistance ÷ demand" rgb={state === "failure" ? "248,113,113" : state === "margin" ? "251,191,36" : "94,234,212"} />
          </div>
        </div>

        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-slate-500">Test controls</div>
            <Status state={state} />
          </div>

          <label className="mt-4 block rounded-[18px] border border-white/[0.08] bg-black/[0.10] p-4 backdrop-blur-[12px]">
            <span className="flex items-center justify-between gap-3 text-[13px] font-semibold text-slate-300">
              <span className="flex items-center gap-2"><Gauge size={15} className="text-amber-200" /> Applied load</span>
              <strong className="font-mono text-amber-100">{load} kN</strong>
            </span>
            <input
              type="range"
              min="20"
              max="240"
              step="5"
              value={load}
              onChange={(event) => setLoad(Number(event.target.value))}
              className="mt-4 w-full accent-amber-300"
            />
            <div className="mt-2 flex justify-between font-mono text-[11px] text-slate-600"><span>20</span><span>130</span><span>240 kN</span></div>
          </label>

          <div className="mt-4">
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-slate-500">Specimen profile</div>
            <div className="mt-2 grid gap-2">
              {(Object.entries(SPECIMENS) as Array<[SpecimenKey, Specimen]>).map(([key, item]) => {
                const selected = key === specimenKey;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSpecimenKey(key)}
                    className="rounded-[15px] border px-3 py-3 text-left transition"
                    style={{ borderColor: selected ? `rgba(${item.rgb},0.34)` : "rgba(255,255,255,0.07)", background: selected ? `rgba(${item.rgb},0.065)` : "rgba(0,0,0,0.08)" }}
                  >
                    <span className="flex items-center justify-between gap-3">
                      <strong className="text-[13px] text-white/84">{item.label}</strong>
                      <span className="font-mono text-[11px]" style={{ color: `rgba(${item.rgb},0.74)` }}>{item.capacity} kN</span>
                    </span>
                    <span className="mt-1 block text-[11px] leading-4 text-slate-500">{item.note}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 border-t border-white/[0.08] pt-4">
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-violet-200/58"><ShieldCheck size={14} /> Interpretation</div>
            <p className="mt-2 text-[13px] leading-6 text-slate-300/68">
              {state === "failure"
                ? "Demand exceeds the illustrative resistance, so this specimen fails the toy design check. An engineer would revise geometry, material, load path, support conditions, or the requirement itself before release."
                : state === "margin"
                  ? "The specimen still carries the selected load, but the remaining margin is narrow. Whether that is acceptable depends on the governing code, uncertainty, consequence of failure, and applicable load combinations."
                  : "The illustrative resistance exceeds the selected demand with visible margin. Passing one check is not the same as proving the whole design is safe, reliable, manufacturable, or fit for service."}
            </p>
          </div>
        </div>
      </div>
    </Surface>
  );
}

function Readout({ label, value, note, rgb }: { label: string; value: string; note: string; rgb: string }) {
  return (
    <div className="border-l px-3 py-2" style={{ borderColor: `rgba(${rgb},0.32)` }}>
      <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-slate-500">{label}</div>
      <strong className="mt-1 block text-[20px] text-white">{value}</strong>
      <span className="mt-1 block text-[11px] leading-4 text-slate-600">{note}</span>
    </div>
  );
}

function Status({ state }: { state: "failure" | "margin" | "stable" }) {
  const config = state === "failure"
    ? { label: "Demand exceeds resistance", rgb: "248,113,113", icon: AlertTriangle }
    : state === "margin"
      ? { label: "Narrow margin", rgb: "251,191,36", icon: AlertTriangle }
      : { label: "Margin remains", rgb: "94,234,212", icon: CheckCircle2 };
  const Icon = config.icon;
  return (
    <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.07em]" style={{ color: `rgb(${config.rgb})`, borderColor: `rgba(${config.rgb},0.28)`, background: `rgba(${config.rgb},0.055)` }}>
      <Icon size={13} /> {config.label}
    </span>
  );
}
