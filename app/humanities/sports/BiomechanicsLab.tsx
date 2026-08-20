"use client";

import { useMemo, useState } from "react";
import { Activity, Gauge, Ruler, Timer } from "lucide-react";

const GRAVITY = 9.81;

export default function BiomechanicsLab() {
  const [angle, setAngle] = useState(38);
  const [speed, setSpeed] = useState(22);

  const model = useMemo(() => {
    const radians = (angle * Math.PI) / 180;
    const horizontalSpeed = speed * Math.cos(radians);
    const verticalSpeed = speed * Math.sin(radians);
    const flightTime = (2 * verticalSpeed) / GRAVITY;
    const range = horizontalSpeed * flightTime;
    const apex = (verticalSpeed * verticalSpeed) / (2 * GRAVITY);
    return { horizontalSpeed, verticalSpeed, flightTime, range, apex };
  }, [angle, speed]);

  const graphMaxX = Math.max(36, Math.ceil(model.range / 10) * 10 + 4);
  const graphMaxY = Math.max(8, Math.ceil(model.apex / 4) * 4 + 2);
  const path = buildTrajectoryPath(angle, speed, graphMaxX, graphMaxY);

  return (
    <div className="overflow-hidden rounded-[28px] border border-emerald-100/[0.12] bg-[#06100d]/46 backdrop-blur-[18px]">
      <div className="grid border-b border-white/[0.07] lg:grid-cols-[minmax(0,1fr)_260px]">
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-emerald-200/62">
            <Activity size={14} /> Mechanics lens · projectile model
          </div>
          <h3 className="mt-2 text-[clamp(1.55rem,2.6vw,2.35rem)] font-semibold tracking-[-0.04em] text-white">Change the launch. Read the consequence.</h3>
          <p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400/78">
            This idealized model isolates two variables that matter in many airborne sport objects: launch speed and launch angle. It is useful for seeing relationships, not for predicting a real kick, throw, serve, shot, or jump.
          </p>
        </div>
        <div className="border-t border-white/[0.07] bg-black/[0.06] p-5 backdrop-blur-[10px] lg:border-l lg:border-t-0">
          <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-slate-600">Model boundary</span>
          <p className="mt-2 text-[11px] leading-5 text-slate-500">No air resistance, no lift or spin, flat ground, point mass, constant gravity, and equal launch/landing height.</p>
        </div>
      </div>

      <div className="grid gap-5 p-4 sm:p-5 xl:grid-cols-[220px_minmax(0,1fr)_240px]">
        <div className="space-y-5">
          <Control label="Launch angle" value={angle} min={5} max={80} unit="°" onChange={setAngle} />
          <Control label="Launch speed" value={speed} min={8} max={38} unit=" m/s" onChange={setSpeed} />
          <div className="border-t border-white/[0.07] pt-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.07em] text-slate-600">Components</div>
            <div className="mt-3 grid grid-cols-2 gap-2 xl:grid-cols-1">
              <MiniMetric label="Horizontal" value={`${model.horizontalSpeed.toFixed(1)} m/s`} />
              <MiniMetric label="Vertical" value={`${model.verticalSpeed.toFixed(1)} m/s`} />
            </div>
          </div>
        </div>

        <div className="relative min-h-[330px] overflow-hidden border border-white/[0.07] bg-[#06100d]/44 backdrop-blur-[8px]">
          <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(110,231,183,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(110,231,183,0.07)_1px,transparent_1px)] [background-size:38px_38px]" />
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 700 360" preserveAspectRatio="none" aria-label="Idealized projectile trajectory">
            <line x1="50" y1="316" x2="660" y2="316" stroke="rgba(110,231,183,0.28)" strokeWidth="2" />
            <line x1="50" y1="316" x2="50" y2="36" stroke="rgba(148,163,184,0.14)" strokeWidth="1" />
            {Array.from({ length: 6 }, (_, index) => {
              const x = 50 + (610 / 5) * index;
              const metres = (graphMaxX / 5) * index;
              return <g key={index}><line x1={x} y1="312" x2={x} y2="320" stroke="rgba(148,163,184,0.16)" /><text x={x} y="340" textAnchor="middle" fill="rgba(148,163,184,0.48)" fontSize="11">{metres.toFixed(0)} m</text></g>;
            })}
            <path d={path} fill="none" stroke="rgba(52,211,153,0.82)" strokeWidth="3" />
            <circle cx="50" cy="316" r="6" fill="rgba(251,146,60,0.85)" />
            <line x1="50" y1="316" x2={50 + Math.cos((angle * Math.PI) / 180) * 62} y2={316 - Math.sin((angle * Math.PI) / 180) * 62} stroke="rgba(251,146,60,0.48)" strokeWidth="2" />
            <text x="60" y="292" fill="rgba(253,186,116,0.62)" fontSize="11">{angle}°</text>
            <text x="56" y="52" fill="rgba(148,163,184,0.44)" fontSize="11">height</text>
            <text x="590" y="298" fill="rgba(148,163,184,0.44)" fontSize="11">distance</text>
          </svg>
          <div className="absolute bottom-3 left-3 rounded-full border border-emerald-200/[0.12] bg-black/25 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.06em] text-emerald-100/52">same-height ideal trajectory</div>
        </div>

        <div className="space-y-2">
          <Readout icon={Ruler} label="Ideal range" value={`${model.range.toFixed(1)} m`} note="Horizontal distance until the model returns to launch height." />
          <Readout icon={Gauge} label="Apex" value={`${model.apex.toFixed(1)} m`} note="Maximum height above the launch point." />
          <Readout icon={Timer} label="Flight time" value={`${model.flightTime.toFixed(2)} s`} note="Time until equal-height landing in the ideal model." />
          <div className="border-t border-white/[0.07] pt-3 text-[11px] leading-5 text-slate-500">
            Real sport trajectories can diverge sharply because drag, spin-induced forces, release height, equipment, wind, ball shape, contact mechanics, and athlete technique matter.
          </div>
        </div>
      </div>
    </div>
  );
}

function buildTrajectoryPath(angle: number, speed: number, maxX: number, maxY: number) {
  const radians = (angle * Math.PI) / 180;
  const vx = speed * Math.cos(radians);
  const vy = speed * Math.sin(radians);
  const totalTime = (2 * vy) / GRAVITY;
  const points = Array.from({ length: 45 }, (_, index) => {
    const t = (totalTime * index) / 44;
    const x = vx * t;
    const y = Math.max(0, vy * t - 0.5 * GRAVITY * t * t);
    const sx = 50 + (x / maxX) * 610;
    const sy = 316 - (y / maxY) * 260;
    return `${index === 0 ? "M" : "L"}${sx.toFixed(1)} ${sy.toFixed(1)}`;
  });
  return points.join(" ");
}

function Control({ label, value, min, max, unit, onChange }: { label: string; value: number; min: number; max: number; unit: string; onChange: (value: number) => void }) {
  return (
    <label className="block">
      <span className="flex items-center justify-between gap-3 text-[11px] text-slate-400"><strong className="font-semibold text-slate-300">{label}</strong><span className="font-mono text-emerald-200/68">{value}{unit}</span></span>
      <input type="range" min={min} max={max} value={value} onChange={(event) => onChange(Number(event.target.value))} className="mt-3 h-1.5 w-full cursor-pointer accent-emerald-400" />
    </label>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return <div className="border border-white/[0.06] bg-black/[0.04] px-3 py-2"><span className="block font-mono text-[9px] uppercase tracking-[0.06em] text-slate-600">{label}</span><strong className="mt-1 block text-[12px] text-white/80">{value}</strong></div>;
}

function Readout({ icon: Icon, label, value, note }: { icon: typeof Ruler; label: string; value: string; note: string }) {
  return <div className="border-l-2 border-emerald-300/24 bg-black/[0.045] px-3 py-3"><div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.06em] text-emerald-100/52"><Icon size={12} /> {label}</div><strong className="mt-1 block text-[20px] tracking-[-0.03em] text-white">{value}</strong><p className="mt-1 text-[10px] leading-4 text-slate-600">{note}</p></div>;
}
