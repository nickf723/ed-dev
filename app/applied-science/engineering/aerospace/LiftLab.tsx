"use client";

import { useState } from "react";
import { ArrowDown, ArrowLeft, ArrowUp, Gauge, Wind } from "lucide-react";
import { Surface } from "@/app/_page-system/scene";

const WEIGHT_DEMAND = 1;
const SEPARATION_START = 13;

export default function LiftLab() {
  const [relativeSpeed, setRelativeSpeed] = useState(100);
  const [angle, setAngle] = useState(7);

  const speed = relativeSpeed / 100;
  const preSeparation = angle <= SEPARATION_START;
  const liftShape = preSeparation
    ? Math.max(0.08, 0.25 + (angle + 2) * 0.055)
    : Math.max(0.12, 1.075 - (angle - SEPARATION_START) * 0.085);
  const liftTendency = speed * speed * liftShape * 1.25;
  const dragShape = 0.18 + 0.18 * liftShape * liftShape + (preSeparation ? 0 : (angle - SEPARATION_START) * 0.06);
  const dragTendency = speed * speed * dragShape;
  const trimError = liftTendency - WEIGHT_DEMAND;
  const trimmed = Math.abs(trimError) <= 0.07;
  const status = trimmed ? "near level-flight balance" : trimError < 0 ? "lift below weight demand" : "lift above weight demand";

  const liftVector = 38 + Math.min(116, liftTendency * 76);
  const dragVector = 28 + Math.min(92, dragTendency * 110);

  return (
    <Surface variant="glass" className="overflow-hidden rounded-[30px] border-sky-100/[0.12]" style={{ background: "rgba(3,12,24,0.30)" }}>
      <div className="grid border-b border-white/[0.07] lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2 font-mono text-[12px] font-semibold uppercase tracking-[0.09em] text-sky-200/64"><Wind size={14} /> Flight-trim model</div>
          <h3 className="mt-2 text-[clamp(1.8rem,3vw,2.9rem)] font-semibold tracking-[-0.045em] text-white">The same weight can be supported by different combinations of speed and angle.</h3>
          <p className="mt-3 max-w-3xl text-[14px] leading-6 text-slate-300/74">Adjust a generic wing's relative airspeed and angle of attack. The model compares normalized lift tendency with a fixed weight demand. It is intentionally not an airfoil-performance calculator.</p>
        </div>
        <div className="border-t border-white/[0.07] bg-black/[0.055] p-5 lg:border-l lg:border-t-0">
          <span className="font-mono text-[11px] uppercase tracking-[0.07em] text-slate-500">Current relation</span>
          <strong className={`mt-2 block text-[20px] ${trimmed ? "text-emerald-200" : trimError < 0 ? "text-amber-200" : "text-cyan-200"}`}>{status}</strong>
          <p className="mt-2 text-[12px] leading-5 text-slate-400/72">{preSeparation ? "The toy wing is in its attached-flow region." : "The toy model has entered a separated-flow region where extra angle no longer produces the same lift trend."}</p>
        </div>
      </div>

      <div className="grid gap-5 p-4 sm:p-5 xl:grid-cols-[230px_minmax(0,1fr)_310px] xl:items-start">
        <div>
          <Control label="Relative airspeed" value={relativeSpeed} min={55} max={135} step={1} suffix="%" onChange={setRelativeSpeed} rgb="56,189,248" />
          <Control label="Angle of attack" value={angle} min={-2} max={20} step={1} suffix="°" onChange={setAngle} rgb="251,146,60" />

          <div className="mt-4 rounded-[16px] border border-white/[0.06] bg-black/[0.06] p-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.06em] text-slate-500">Try these questions</div>
            <p className="mt-2 text-[11px] leading-5 text-slate-400/72">Can you reach near-trim at a lower angle by increasing speed? What happens if you keep increasing angle after the model's separation threshold?</p>
          </div>
        </div>

        <div>
          <div className="relative overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#041422]/76 p-4">
            <svg viewBox="0 0 760 390" className="h-auto w-full" role="img" aria-label="Generic wing with relative airflow, lift, weight, and drag vectors">
              <defs>
                <marker id="aero-up" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="rgba(74,222,128,0.82)" /></marker>
                <marker id="aero-down" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="rgba(251,191,36,0.82)" /></marker>
                <marker id="aero-left" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="rgba(244,114,182,0.78)" /></marker>
                <marker id="aero-flow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="rgba(125,211,252,0.72)" /></marker>
              </defs>

              <line x1="86" y1="198" x2="284" y2="198" stroke="rgba(125,211,252,0.65)" strokeWidth={3 + speed * 2} markerEnd="url(#aero-flow)" />
              <text x="88" y="178" fill="rgba(186,230,253,0.66)" fontSize="14">relative airflow</text>

              <g transform={`translate(380 198) rotate(${-angle})`}>
                <path d="M-132 2 C-72 -25 54 -23 138 -4 C75 18 -52 22 -132 2 Z" fill="rgba(226,232,240,0.82)" stroke="rgba(255,255,255,0.30)" strokeWidth="2" />
                <line x1="-145" y1="0" x2="145" y2="0" stroke="rgba(251,146,60,0.25)" strokeDasharray="5 6" />
              </g>

              <line x1="380" y1="198" x2="380" y2={198 - liftVector} stroke="rgba(74,222,128,0.82)" strokeWidth="4" markerEnd="url(#aero-up)" />
              <text x="394" y={Math.max(38, 190 - liftVector)} fill="rgba(187,247,208,0.82)" fontSize="14">lift tendency</text>

              <line x1="380" y1="198" x2="380" y2="318" stroke="rgba(251,191,36,0.82)" strokeWidth="4" markerEnd="url(#aero-down)" />
              <text x="394" y="328" fill="rgba(253,230,138,0.80)" fontSize="14">fixed weight demand</text>

              <line x1="370" y1="218" x2={370 - dragVector} y2="218" stroke="rgba(244,114,182,0.78)" strokeWidth="3" markerEnd="url(#aero-left)" />
              <text x={Math.max(70, 340 - dragVector)} y="244" fill="rgba(251,207,232,0.70)" fontSize="13">drag tendency</text>

              <path d="M560 74 H694" stroke="rgba(255,255,255,0.08)" />
              <text x="560" y="62" fill="rgba(148,163,184,0.52)" fontSize="12">toy separation marker: α = 13°</text>
              <circle cx="380" cy="198" r="5" fill={trimmed ? "rgba(74,222,128,0.88)" : "rgba(226,232,240,0.42)"} />
            </svg>
            <div className="absolute bottom-3 left-3 rounded-full border border-white/[0.06] bg-black/55 px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.05em] text-slate-500 backdrop-blur-md">normalized generic wing · not an aircraft prediction</div>
          </div>

          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            <Readout label="Lift / weight" value={liftTendency.toFixed(2)} note="1.00 is the toy balance target" rgb={trimmed ? "74,222,128" : "251,191,36"} />
            <Readout label="Drag tendency" value={dragTendency.toFixed(2)} note="normalized relative demand" rgb="244,114,182" />
            <Readout label="Flow region" value={preSeparation ? "attached" : "separated"} note="model regime, not measured flow" rgb={preSeparation ? "56,189,248" : "251,146,60"} />
          </div>
        </div>

        <aside className="xl:sticky xl:top-[172px] xl:self-start">
          <div className="rounded-[20px] border border-white/[0.07] bg-black/[0.07] p-4">
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.07em] text-sky-200/52"><Gauge size={13} /> What to notice</div>
            <p className="mt-3 text-[13px] leading-6 text-slate-300/72">The model makes relative airspeed matter quadratically, so a faster flow can support the same normalized weight at a smaller modeled angle. Increasing angle initially raises lift tendency, but the toy separated-flow region breaks that simple trend.</p>
          </div>
          <div className="mt-3 rounded-[17px] border border-orange-100/[0.08] bg-orange-300/[0.02] p-4">
            <strong className="text-[11px] text-orange-100/80">Angle is not a throttle</strong>
            <p className="mt-2 text-[12px] leading-5 text-slate-400/72">Angle of attack describes the orientation between a wing reference line and the relative airflow. Real stall behavior depends on wing geometry, Reynolds number, Mach number, surface condition, unsteadiness, and many other factors.</p>
          </div>
          <div className="mt-3 rounded-[17px] border border-violet-100/[0.08] bg-violet-300/[0.02] p-4">
            <strong className="text-[11px] text-violet-100/80">Atmospheric flight is not orbital flight</strong>
            <p className="mt-2 text-[12px] leading-5 text-slate-400/72">This instrument is about a wing moving through an atmosphere. Spacecraft trajectory design uses a different dominant model once aerodynamic forces become negligible.</p>
          </div>
        </aside>
      </div>
    </Surface>
  );
}

function Control({ label, value, min, max, step, suffix, onChange, rgb }: { label: string; value: number; min: number; max: number; step: number; suffix: string; onChange: (value: number) => void; rgb: string }) {
  return <label className="mb-3 block rounded-[16px] border border-white/[0.06] bg-black/[0.07] p-3.5"><span className="flex items-center justify-between gap-3"><span className="text-[12px] font-semibold text-white/82">{label}</span><strong className="font-mono text-[13px]" style={{ color: `rgb(${rgb})` }}>{value}{suffix}</strong></span><input aria-label={label} type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-sky-400" /></label>;
}

function Readout({ label, value, note, rgb }: { label: string; value: string; note: string; rgb: string }) {
  return <div className="rounded-[15px] border border-white/[0.06] bg-black/[0.08] p-3"><div className="font-mono text-[10px] uppercase tracking-[0.06em] text-slate-500">{label}</div><div className="mt-1 text-[19px] font-semibold" style={{ color: `rgb(${rgb})` }}>{value}</div><p className="mt-1 text-[11px] leading-4 text-slate-500">{note}</p></div>;
}
