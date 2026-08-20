"use client";

import { Activity, Gauge, MoveHorizontal } from "lucide-react";

export type ComparisonSpecimen = {
  id: string;
  label: string;
  scientificName: string;
  accentRgb: string;
  shape: "quadruped" | "bird" | "fish" | "cephalopod";
  activeLabel: string;
  activeDetail: string;
  tradeoff: string;
};

export default function SynchronizedComparisonTopology({
  specimens,
  phase,
  functionLabel,
  onSelect,
  selectedId,
}: {
  specimens: ComparisonSpecimen[];
  phase: number;
  functionLabel: string;
  onSelect?: (id: string) => void;
  selectedId?: string;
}) {
  return (
    <div className="overflow-hidden rounded-[30px] border border-white/[0.08] bg-black/[0.18] shadow-[0_34px_120px_rgba(0,0,0,0.28)] backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] px-5 py-4 sm:px-6">
        <div className="flex items-center gap-2 font-mono text-[8px] font-semibold uppercase tracking-[0.14em] text-cyan-100/60">
          <MoveHorizontal size={12} /> synchronized function · {functionLabel}
        </div>
        <div className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.1em] text-slate-600">
          phase <strong className="text-slate-300">{phase}%</strong>
        </div>
      </div>
      <div className={`grid ${specimens.length === 2 ? "lg:grid-cols-2" : specimens.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
        {specimens.map((specimen, index) => (
          <SpecimenColumn
            key={specimen.id}
            specimen={specimen}
            phase={phase}
            selected={selectedId === specimen.id}
            onSelect={onSelect}
            edge={index < specimens.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

function SpecimenColumn({
  specimen,
  phase,
  selected,
  onSelect,
  edge,
}: {
  specimen: ComparisonSpecimen;
  phase: number;
  selected: boolean;
  onSelect?: (id: string) => void;
  edge: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(specimen.id)}
      className={`group relative min-h-[520px] overflow-hidden p-5 text-left transition sm:p-6 ${edge ? "border-b border-white/[0.07] lg:border-b-0 lg:border-r" : ""}`}
      style={{
        background: selected
          ? `radial-gradient(circle at 50% 35%, rgba(${specimen.accentRgb},0.11), transparent 54%)`
          : undefined,
      }}
    >
      <div className="relative z-10 flex items-start justify-between gap-3">
        <div>
          <div className="font-mono text-[8px] uppercase tracking-[0.14em]" style={{ color: `rgba(${specimen.accentRgb},0.66)` }}>
            specimen
          </div>
          <h3 className="mt-1 text-[20px] font-semibold tracking-[-0.035em] text-white">{specimen.label}</h3>
          <p className="mt-1 font-serif text-[10px] italic text-slate-500">{specimen.scientificName}</p>
        </div>
        <span
          className="flex h-9 w-9 items-center justify-center rounded-[12px] border"
          style={{ color: `rgb(${specimen.accentRgb})`, borderColor: `rgba(${specimen.accentRgb},0.20)`, background: `rgba(${specimen.accentRgb},0.045)` }}
        >
          <Activity size={14} />
        </span>
      </div>

      <div className="relative z-10 mt-5 flex min-h-[255px] items-center justify-center rounded-[22px] border border-white/[0.06] bg-black/[0.18]">
        <SpecimenSilhouette shape={specimen.shape} accentRgb={specimen.accentRgb} phase={phase} />
        <div className="absolute inset-x-4 bottom-3 flex items-center justify-between font-mono text-[7px] uppercase tracking-[0.1em] text-slate-700">
          <span>same clock</span><span>{phase}%</span>
        </div>
      </div>

      <div className="relative z-10 mt-5">
        <div className="font-mono text-[8px] font-semibold uppercase tracking-[0.12em]" style={{ color: `rgba(${specimen.accentRgb},0.70)` }}>{specimen.activeLabel}</div>
        <p className="mt-2 text-[11px] leading-5 text-slate-400">{specimen.activeDetail}</p>
      </div>
      <div className="relative z-10 mt-4 rounded-[14px] border border-white/[0.06] bg-white/[0.018] p-3">
        <div className="flex items-center gap-2 font-mono text-[7px] uppercase tracking-[0.12em] text-slate-600"><Gauge size={10} /> tradeoff</div>
        <p className="mt-2 text-[9px] leading-4 text-slate-500">{specimen.tradeoff}</p>
      </div>
    </button>
  );
}

function SpecimenSilhouette({ shape, accentRgb, phase }: { shape: ComparisonSpecimen["shape"]; accentRgb: string; phase: number }) {
  const theta = (phase / 100) * Math.PI * 2;
  const sway = Math.sin(theta);
  const flap = Math.cos(theta);
  const pulse = 0.72 + (Math.sin(theta) + 1) * 0.12;

  if (shape === "fish") {
    return (
      <svg viewBox="0 0 320 180" className="h-[210px] w-[92%]">
        <g fill="none" stroke={`rgba(${accentRgb},0.72)`} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="155" cy="90" rx="88" ry="43" fill={`rgba(${accentRgb},0.055)`} />
          <path d={`M70 90 L${32 + sway * 13} 52 L${42 - sway * 13} 90 L${32 + sway * 13} 128 Z`} fill={`rgba(${accentRgb},0.07)`} />
          <path d="M150 50 Q172 23 197 48" />
          <path d="M150 130 Q173 157 199 132" />
          <circle cx="214" cy="80" r="4" fill={`rgb(${accentRgb})`} />
          <path d="M115 74 C140 86 164 92 205 94" stroke={`rgba(${accentRgb},${pulse})`} strokeWidth="7" />
        </g>
      </svg>
    );
  }

  if (shape === "bird") {
    return (
      <svg viewBox="0 0 320 200" className="h-[220px] w-[94%]">
        <g fill="none" stroke={`rgba(${accentRgb},0.72)`} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="172" cy="105" rx="58" ry="38" fill={`rgba(${accentRgb},0.05)`} />
          <circle cx="231" cy="80" r="22" fill={`rgba(${accentRgb},0.045)`} />
          <path d="M252 80 L286 91 L252 96" />
          <path d={`M166 96 Q${112 - flap * 18} ${46 + flap * 22} ${64 - flap * 22} ${60 + flap * 18}`} />
          <path d={`M175 102 Q${128 + flap * 18} ${158 - flap * 18} ${78 + flap * 20} ${151 - flap * 16}`} />
          <path d="M151 139 L142 174 M188 139 L194 176" />
          <path d="M228 96 C205 92 189 100 172 121" stroke={`rgba(${accentRgb},${pulse})`} strokeWidth="7" />
        </g>
      </svg>
    );
  }

  if (shape === "cephalopod") {
    return (
      <svg viewBox="0 0 320 210" className="h-[225px] w-[92%]">
        <g fill="none" stroke={`rgba(${accentRgb},0.72)`} strokeWidth="3" strokeLinecap="round">
          <ellipse cx="165" cy="80" rx="50" ry="58" fill={`rgba(${accentRgb},0.05)`} />
          {Array.from({ length: 8 }, (_, index) => {
            const x = 112 + index * 15;
            const bend = sway * (index % 2 ? 20 : -20);
            return <path key={index} d={`M${x} 123 Q${x + bend} 158 ${x - bend * 0.5} 198`} />;
          })}
          <circle cx="144" cy="75" r="6" fill={`rgba(${accentRgb},0.60)`} />
          <circle cx="185" cy="75" r="6" fill={`rgba(${accentRgb},0.60)`} />
          <path d="M164 38 C146 67 150 101 166 130" stroke={`rgba(${accentRgb},${pulse})`} strokeWidth="8" />
        </g>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 340 200" className="h-[220px] w-[96%]">
      <g fill="none" stroke={`rgba(${accentRgb},0.72)`} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="166" cy="95" rx="78" ry="42" fill={`rgba(${accentRgb},0.05)`} />
        <circle cx="254" cy="75" r="28" fill={`rgba(${accentRgb},0.045)`} />
        <path d="M280 78 L311 85 L281 94" />
        <path d="M90 95 Q55 78 37 91" />
        <path d={`M120 128 L${105 + sway * 14} 180 M145 132 L${154 - sway * 14} 180`} />
        <path d={`M190 132 L${180 - sway * 14} 180 M218 124 L${232 + sway * 14} 178`} />
        <path d="M112 83 C145 70 184 76 223 92" stroke={`rgba(${accentRgb},${pulse})`} strokeWidth="8" />
      </g>
    </svg>
  );
}
