"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Gauge, Pause, Play, RotateCcw, Settings2 } from "lucide-react";

export default function SteamEngine() {
  const [radius, setRadius] = useState(38);
  const [rodLength, setRodLength] = useState(150);
  const [angle, setAngle] = useState(35);
  const [playing, setPlaying] = useState(false);
  const frameRef = useRef(0);
  const lastRef = useRef<number | null>(null);

  useEffect(() => {
    if (!playing) {
      lastRef.current = null;
      cancelAnimationFrame(frameRef.current);
      return;
    }
    const tick = (now: number) => {
      const last = lastRef.current ?? now;
      const dt = Math.min(50, now - last);
      lastRef.current = now;
      setAngle((current) => (current + dt * 0.035) % 360);
      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [playing]);

  const model = useMemo(() => crankSlider(radius, rodLength, angle), [radius, rodLength, angle]);
  const visual = useMemo(() => makeVisual(radius, rodLength, angle), [radius, rodLength, angle]);

  return (
    <div className="overflow-hidden rounded-[28px] border border-amber-200/[0.14] bg-[#1b140f]/55 backdrop-blur-[18px] shadow-[0_22px_70px_rgba(0,0,0,0.22)]">
      <div className="grid border-b border-amber-100/[0.08] lg:grid-cols-[minmax(0,1fr)_250px]">
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-amber-200/62"><Settings2 size={14} /> Crank-slider kinematics</div>
          <h3 className="mt-2 text-[clamp(1.6rem,2.6vw,2.45rem)] font-semibold tracking-[-0.045em] text-white">Turn rotation into reciprocating motion.</h3>
          <p className="mt-3 max-w-3xl text-[13px] leading-6 text-stone-300/72">A crank-slider is a simple mechanism found in piston machines and many other linkages. Change geometry or crank angle and watch the piston location follow from the linkage constraint.</p>
        </div>
        <div className="border-t border-amber-100/[0.08] bg-black/[0.06] p-5 backdrop-blur-[10px] lg:border-l lg:border-t-0">
          <span className="font-mono text-[10px] uppercase tracking-[0.07em] text-stone-600">Geometric model</span>
          <p className="mt-2 text-[11px] leading-5 text-stone-500">Rigid links, fixed crank center, slider constrained horizontally, no clearance or elastic deformation. This is kinematics, not a thermodynamic engine model.</p>
        </div>
      </div>

      <div className="grid gap-5 p-4 sm:p-5 xl:grid-cols-[220px_minmax(0,1fr)_230px]">
        <div className="space-y-4">
          <Control label="Crank radius r" value={radius} min={22} max={50} unit=" mm" onChange={setRadius} />
          <Control label="Rod length l" value={rodLength} min={110} max={200} unit=" mm" onChange={setRodLength} />
          <Control label="Crank angle θ" value={Math.round(angle)} min={0} max={360} unit="°" onChange={(value) => { setPlaying(false); setAngle(value); }} />
          <div className="grid grid-cols-2 gap-2 border-t border-white/[0.07] pt-4">
            <button type="button" onClick={() => setPlaying((value) => !value)} className="flex items-center justify-center gap-2 border border-amber-200/[0.14] bg-amber-300/[0.04] px-3 py-2.5 text-[11px] font-semibold text-amber-100/78 transition hover:bg-amber-300/[0.08]">{playing ? <Pause size={12} /> : <Play size={12} />}{playing ? "Pause" : "Rotate"}</button>
            <button type="button" onClick={() => { setPlaying(false); setRadius(38); setRodLength(150); setAngle(35); }} className="flex items-center justify-center gap-2 border border-white/[0.07] bg-black/[0.04] px-3 py-2.5 text-[11px] text-stone-400 transition hover:text-white"><RotateCcw size={12} /> Reset</button>
          </div>
        </div>

        <div className="relative min-h-[350px] overflow-hidden border border-white/[0.07] bg-[#130f0c]/48 backdrop-blur-[8px]">
          <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(245,158,11,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.07)_1px,transparent_1px)] [background-size:38px_38px]" />
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 340" aria-label="Crank-slider mechanism geometry">
            <line x1="70" y1="250" x2="555" y2="250" stroke="rgba(203,213,225,0.09)" strokeWidth="2" />
            <circle cx={visual.cx} cy={visual.cy} r={visual.crankRadiusPx} fill="rgba(245,158,11,0.025)" stroke="rgba(245,158,11,0.28)" strokeWidth="5" />
            <line x1={visual.cx} y1={visual.cy} x2={visual.crankX} y2={visual.crankY} stroke="rgba(251,191,36,0.62)" strokeWidth="7" strokeLinecap="round" />
            <circle cx={visual.cx} cy={visual.cy} r="9" fill="rgba(120,53,15,0.82)" stroke="rgba(251,191,36,0.42)" />
            <circle cx={visual.crankX} cy={visual.crankY} r="8" fill="rgba(251,191,36,0.82)" />
            <line x1={visual.crankX} y1={visual.crankY} x2={visual.pistonPinX} y2={visual.cy} stroke="rgba(203,213,225,0.72)" strokeWidth="9" strokeLinecap="round" />
            <circle cx={visual.pistonPinX} cy={visual.cy} r="7" fill="rgba(226,232,240,0.70)" />
            <rect x="345" y="105" width="190" height="130" rx="12" fill="rgba(120,113,108,0.055)" stroke="rgba(203,213,225,0.16)" strokeWidth="2" />
            <rect x={visual.pistonPinX - 28} y={visual.cy - 44} width="56" height="88" rx="6" fill="rgba(217,119,6,0.18)" stroke="rgba(251,191,36,0.42)" strokeWidth="2" />
            <line x1="344" y1={visual.cy} x2="548" y2={visual.cy} stroke="rgba(125,211,252,0.10)" strokeDasharray="5 7" />
            <path d={`M ${visual.cx + 34} ${visual.cy} A 34 34 0 0 0 ${visual.arcEndX} ${visual.arcEndY}`} fill="none" stroke="rgba(251,146,60,0.35)" strokeWidth="2" />
            <text x={visual.cx + 47} y={visual.cy - 18} fill="rgba(253,186,116,0.66)" fontSize="11">θ {Math.round(angle)}°</text>
            <text x="82" y="82" fill="rgba(253,186,116,0.44)" fontSize="11">rotation</text>
            <text x="410" y="82" fill="rgba(125,211,252,0.42)" fontSize="11">constrained translation</text>
            <line x1="355" y1="275" x2="530" y2="275" stroke="rgba(203,213,225,0.13)" />
            <line x1="355" y1="270" x2="355" y2="280" stroke="rgba(203,213,225,0.13)" />
            <line x1="530" y1="270" x2="530" y2="280" stroke="rgba(203,213,225,0.13)" />
            <text x="402" y="297" fill="rgba(203,213,225,0.34)" fontSize="10">slider axis</text>
          </svg>
        </div>

        <div className="space-y-2">
          <Readout label="Piston distance x" value={`${model.position.toFixed(1)} mm`} note="Slider-pin distance from the crank center along the axis." />
          <Readout label="Stroke" value={`${model.stroke.toFixed(0)} mm`} note="Total ideal travel between dead centers, equal to 2r." />
          <Readout label="Rod angle φ" value={`${Math.abs(model.rodAngle).toFixed(1)}°`} note="Connecting-rod angle relative to the slider axis." />
          <Readout label="l / r ratio" value={model.ratio.toFixed(2)} note="Longer rods reduce angularity for the same crank radius." />
          <div className="border-l-2 border-cyan-300/22 bg-cyan-300/[0.025] px-3 py-3 text-[11px] leading-5 text-stone-500">
            The piston does not move sinusoidally when the connecting rod has finite length. The linkage geometry makes its position slightly asymmetric around mid-stroke.
          </div>
        </div>
      </div>
    </div>
  );
}

function crankSlider(radius: number, rodLength: number, angleDegrees: number) {
  const theta = (angleDegrees * Math.PI) / 180;
  const underRoot = Math.max(0, rodLength * rodLength - radius * radius * Math.sin(theta) * Math.sin(theta));
  const position = radius * Math.cos(theta) + Math.sqrt(underRoot);
  const rodAngle = Math.asin(Math.max(-1, Math.min(1, (radius / rodLength) * Math.sin(theta)))) * 180 / Math.PI;
  return { position, rodAngle, stroke: 2 * radius, ratio: rodLength / radius };
}

function makeVisual(radius: number, rodLength: number, angleDegrees: number) {
  const cx = 165;
  const cy = 170;
  const crankRadiusPx = radius * 1.15;
  const theta = (angleDegrees * Math.PI) / 180;
  const crankX = cx + crankRadiusPx * Math.cos(theta);
  const crankY = cy - crankRadiusPx * Math.sin(theta);
  const model = crankSlider(radius, rodLength, angleDegrees);
  const minPosition = rodLength - radius;
  const maxPosition = rodLength + radius;
  const normalized = (model.position - minPosition) / Math.max(1, maxPosition - minPosition);
  const pistonPinX = 365 + normalized * 135;
  const arcAngle = -theta;
  const arcEndX = cx + 34 * Math.cos(arcAngle);
  const arcEndY = cy + 34 * Math.sin(arcAngle);
  return { cx, cy, crankRadiusPx, crankX, crankY, pistonPinX, arcEndX, arcEndY };
}

function Control({ label, value, min, max, unit, onChange }: { label: string; value: number; min: number; max: number; unit: string; onChange: (value: number) => void }) {
  return <label className="block"><span className="flex items-center justify-between gap-3 text-[11px]"><strong className="font-semibold text-stone-300">{label}</strong><span className="font-mono text-amber-200/68">{Math.round(value)}{unit}</span></span><input type="range" min={min} max={max} value={value} onChange={(event) => onChange(Number(event.target.value))} className="mt-3 h-1.5 w-full cursor-pointer accent-amber-400" /></label>;
}

function Readout({ label, value, note }: { label: string; value: string; note: string }) {
  return <div className="border-l-2 border-amber-300/24 bg-black/[0.045] px-3 py-3"><div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.06em] text-amber-100/48"><Gauge size={11} /> {label}</div><strong className="mt-1 block text-[17px] tracking-[-0.03em] text-white">{value}</strong><p className="mt-1 text-[10px] leading-4 text-stone-600">{note}</p></div>;
}
