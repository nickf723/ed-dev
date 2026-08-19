"use client";

import { useMemo, useState } from "react";
import { RotateCw, ScanLine, Waves } from "lucide-react";

type FieldId = "radial" | "rotation" | "saddle" | "shear";
type Field = {
  id: FieldId;
  label: string;
  formula: string;
  vector: (x: number, y: number) => [number, number];
  divergence: number;
  curl: number;
  interpretation: string;
  rgb: string;
};

const FIELDS: readonly Field[] = [
  {
    id: "radial",
    label: "Radial source",
    formula: "F(x,y) = (x, y)",
    vector: (x, y) => [x, y],
    divergence: 2,
    curl: 0,
    interpretation: "Vectors point outward and strengthen away from the origin. Positive divergence records local net outflow without local rotation.",
    rgb: "34, 211, 238",
  },
  {
    id: "rotation",
    label: "Rigid rotation",
    formula: "F(x,y) = (−y, x)",
    vector: (x, y) => [-y, x],
    divergence: 0,
    curl: 2,
    interpretation: "Vectors circulate counterclockwise around the origin. Curl detects local rotational tendency while divergence remains zero.",
    rgb: "192, 132, 252",
  },
  {
    id: "saddle",
    label: "Saddle flow",
    formula: "F(x,y) = (x, −y)",
    vector: (x, y) => [x, -y],
    divergence: 0,
    curl: 0,
    interpretation: "Horizontal expansion is balanced by vertical contraction. Neither divergence nor curl alone captures the full deformation pattern.",
    rgb: "52, 211, 153",
  },
  {
    id: "shear",
    label: "Horizontal shear",
    formula: "F(x,y) = (y, 0)",
    vector: (_x, y) => [y, 0],
    divergence: 0,
    curl: -1,
    interpretation: "Horizontal speed changes with height. The field has no net local expansion but has nonzero scalar curl in the plane.",
    rgb: "251, 146, 60",
  },
];

const WIDTH = 620;
const HEIGHT = 360;
const GRID = [-2, -1, 0, 1, 2] as const;

function sx(x: number) {
  return WIDTH / 2 + x * 64;
}

function sy(y: number) {
  return HEIGHT / 2 - y * 64;
}

export default function VectorFieldLab() {
  const [fieldId, setFieldId] = useState<FieldId>("radial");
  const field = FIELDS.find((item) => item.id === fieldId) ?? FIELDS[0];

  const arrows = useMemo(() => GRID.flatMap((y) => GRID.map((x) => {
    const [vx, vy] = field.vector(x, y);
    const magnitude = Math.hypot(vx, vy);
    const scale = magnitude === 0 ? 0 : Math.min(22, 11 + magnitude * 4) / magnitude;
    return { x, y, vx: vx * scale, vy: vy * scale, magnitude };
  })), [field]);

  return (
    <section className="overflow-hidden rounded-[28px] border border-cyan-200/[0.11] bg-black/[0.17] backdrop-blur-xl">
      <div className="grid border-b border-white/[0.07] lg:grid-cols-[minmax(0,1fr)_410px]">
        <div className="px-5 py-5 sm:px-6">
          <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.13em] text-cyan-200/54"><Waves size={13} /> Vector-field laboratory</div>
          <h2 className="mt-2 text-[clamp(1.7rem,3vw,2.7rem)] font-semibold tracking-[-0.045em] text-white">Change the field and compare local outflow with local rotation.</h2>
          <p className="mt-2 text-[11px] leading-5 text-slate-500">In two dimensions, divergence measures infinitesimal net expansion while the scalar curl measures local rotational tendency. These are local derivatives of the field, not global descriptions of every geometric feature.</p>
        </div>
        <div className="border-t border-white/[0.07] p-4 lg:border-l lg:border-t-0">
          <div className="grid grid-cols-2 gap-2">
            {FIELDS.map((item) => <button key={item.id} type="button" onClick={() => setFieldId(item.id)} className={`rounded-[13px] border px-3 py-3 text-left transition ${item.id === field.id ? "bg-white/[0.045]" : "border-white/[0.06] bg-black/[0.08] hover:bg-white/[0.025]"}`} style={item.id === field.id ? { borderColor: `rgba(${item.rgb},0.28)` } : undefined}><strong className="block text-[10px] text-white/82">{item.label}</strong><span className="mt-1 block font-mono text-[8px]" style={{ color: `rgba(${item.rgb},0.56)` }}>{item.formula}</span></button>)}
          </div>
        </div>
      </div>

      <div className="grid xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="border-b border-white/[0.07] p-5 xl:border-b-0 xl:border-r">
          <div className="overflow-hidden rounded-[15px] border border-white/[0.06] bg-black/[0.12]">
            <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="h-[360px] w-full">
              <line x1={0} y1={HEIGHT / 2} x2={WIDTH} y2={HEIGHT / 2} stroke="rgba(255,255,255,0.07)" />
              <line x1={WIDTH / 2} y1={0} x2={WIDTH / 2} y2={HEIGHT} stroke="rgba(255,255,255,0.07)" />
              {arrows.map((arrow) => {
                const x1 = sx(arrow.x);
                const y1 = sy(arrow.y);
                const x2 = x1 + arrow.vx;
                const y2 = y1 - arrow.vy;
                const angle = Math.atan2(y2 - y1, x2 - x1);
                const head = 5;
                return <g key={`${arrow.x}-${arrow.y}`} opacity={arrow.magnitude === 0 ? 0.35 : 0.85}>
                  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={`rgb(${field.rgb})`} strokeWidth="2" />
                  {arrow.magnitude === 0 ? <circle cx={x1} cy={y1} r="2.5" fill={`rgb(${field.rgb})`} /> : <path d={`M ${x2} ${y2} L ${x2 - head * Math.cos(angle - 0.55)} ${y2 - head * Math.sin(angle - 0.55)} M ${x2} ${y2} L ${x2 - head * Math.cos(angle + 0.55)} ${y2 - head * Math.sin(angle + 0.55)}`} stroke={`rgb(${field.rgb})`} strokeWidth="2" fill="none" />}
                </g>;
              })}
            </svg>
          </div>
        </div>

        <aside className="p-5 sm:p-6">
          <div className="font-mono text-[8px] uppercase tracking-[0.10em] text-slate-700">Selected field</div>
          <h3 className="mt-1 text-[24px] font-semibold tracking-[-0.04em] text-white">{field.label}</h3>
          <div className="mt-1 font-mono text-[10px]" style={{ color: `rgba(${field.rgb},0.62)` }}>{field.formula}</div>
          <div className="mt-5 grid grid-cols-2 gap-2">
            <Readout icon={ScanLine} label="div F" value={String(field.divergence)} />
            <Readout icon={RotateCw} label="curl F" value={String(field.curl)} />
          </div>
          <p className="mt-5 text-[10px] leading-5 text-slate-500">{field.interpretation}</p>
          <div className="mt-5 rounded-[15px] border border-white/[0.06] bg-black/[0.10] p-4">
            <div className="font-mono text-[8px] uppercase tracking-[0.09em] text-cyan-200/40">Local-to-global idea</div>
            <p className="mt-2 text-[9px] leading-4 text-slate-600">Vector-calculus theorems connect these local derivatives to integrals over boundaries: circulation to curl and flux to divergence, under the hypotheses of the corresponding theorem.</p>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Readout({ icon: Icon, label, value }: { icon: typeof ScanLine; label: string; value: string }) {
  return <div className="rounded-[14px] border border-white/[0.06] bg-black/[0.10] p-3"><Icon size={12} className="text-cyan-200/44"/><div className="mt-2 font-mono text-[7px] uppercase tracking-[0.09em] text-slate-700">{label}</div><div className="mt-1 text-[20px] font-semibold text-white/82">{value}</div></div>;
}
