"use client";

import { useMemo, useState } from "react";
import { Activity, FlaskConical, Gauge, Sprout } from "lucide-react";
import { Surface } from "@/app/_page-system/scene";

type MediumKey = "higher" | "limited";

type GrowthModel = {
  key: MediumKey;
  label: string;
  note: string;
  carrying: number;
  lagEnd: number;
  stationaryStart: number;
  rgb: string;
};

const MODELS: readonly GrowthModel[] = [
  {
    key: "higher",
    label: "Higher resource availability",
    note: "The toy population reaches a larger normalized plateau and enters rapid growth sooner.",
    carrying: 0.94,
    lagEnd: 2.0,
    stationaryStart: 7.1,
    rgb: "163,230,53",
  },
  {
    key: "limited",
    label: "Lower resource availability",
    note: "The same abstract population grows more slowly and reaches a smaller normalized plateau.",
    carrying: 0.62,
    lagEnd: 2.7,
    stationaryStart: 7.8,
    rgb: "34,211,238",
  },
] as const;

const MAX_TIME = 10;
const SAMPLE_COUNT = 80;

export default function CulturePlateWidget() {
  const [mediumKey, setMediumKey] = useState<MediumKey>("higher");
  const [time, setTime] = useState(4.2);
  const model = MODELS.find((item) => item.key === mediumKey) ?? MODELS[0];
  const population = growthAt(time, model);
  const resources = Math.max(0.08, 1 - population * (mediumKey === "higher" ? 0.82 : 1.18));
  const phase = phaseAt(time, model);
  const samples = useMemo(() => Array.from({ length: SAMPLE_COUNT }, (_, index) => {
    const t = (index / (SAMPLE_COUNT - 1)) * MAX_TIME;
    return { t, p: growthAt(t, model) };
  }), [model]);

  const chartWidth = 720;
  const chartHeight = 280;
  const padX = 48;
  const padY = 34;
  const x = (value: number) => padX + (value / MAX_TIME) * (chartWidth - padX * 2);
  const y = (value: number) => chartHeight - padY - value * (chartHeight - padY * 2);
  const curve = samples.map((point) => `${x(point.t).toFixed(1)},${y(point.p).toFixed(1)}`).join(" ");
  const visibleCells = Math.round(population * 70);

  return (
    <Surface variant="glass" className="overflow-hidden rounded-[30px] border-lime-100/[0.11]" style={{ background: "rgba(3,14,10,0.30)" }}>
      <div className="grid border-b border-white/[0.07] lg:grid-cols-[minmax(0,1fr)_350px]">
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2 font-mono text-[12px] font-semibold uppercase tracking-[0.09em] text-lime-200/64"><FlaskConical size={14} /> Batch-culture model</div>
          <h3 className="mt-2 text-[clamp(1.8rem,3vw,2.9rem)] font-semibold tracking-[-0.045em] text-white">A population can change rapidly even when every cell follows local chemistry.</h3>
          <p className="mt-3 max-w-3xl text-[14px] leading-6 text-slate-300/74">Scrub time through an idealized closed batch culture. The curves are normalized teaching models, not measurements from a named species or a recipe for culturing microorganisms.</p>
        </div>
        <div className="border-t border-white/[0.07] bg-black/[0.055] p-5 lg:border-l lg:border-t-0">
          <span className="font-mono text-[11px] uppercase tracking-[0.07em] text-slate-500">Current phase</span>
          <strong className="mt-2 block text-[21px]" style={{ color: `rgb(${model.rgb})` }}>{phase.label}</strong>
          <p className="mt-2 text-[12px] leading-5 text-slate-400/72">{phase.explanation}</p>
        </div>
      </div>

      <div className="grid gap-5 p-4 sm:p-5 xl:grid-cols-[220px_minmax(0,1fr)_300px] xl:items-start">
        <div>
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.07em] text-slate-500">Model condition</div>
          <div className="mt-3 space-y-2">
            {MODELS.map((item) => {
              const active = item.key === mediumKey;
              return <button key={item.key} type="button" onClick={() => setMediumKey(item.key)} className="w-full rounded-[15px] border p-3 text-left transition" style={{ borderColor: active ? `rgba(${item.rgb},0.34)` : "rgba(255,255,255,0.06)", background: active ? `rgba(${item.rgb},0.05)` : "rgba(0,0,0,0.05)" }}><strong className="text-[12px] leading-5" style={{ color: active ? `rgb(${item.rgb})` : "rgb(203,213,225)" }}>{item.label}</strong><span className="mt-1 block text-[11px] leading-5 text-slate-500">{item.note}</span></button>;
            })}
          </div>

          <label className="mt-5 block rounded-[15px] border border-white/[0.06] bg-black/[0.08] p-3">
            <span className="flex items-center justify-between gap-3"><span className="text-[12px] font-semibold text-white/80">Relative time</span><strong className="font-mono text-[13px]" style={{ color: `rgb(${model.rgb})` }}>{time.toFixed(1)}</strong></span>
            <input aria-label="Relative culture time" type="range" min="0" max={MAX_TIME} step="0.1" value={time} onChange={(event) => setTime(Number(event.target.value))} className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-lime-400" />
            <div className="mt-2 flex justify-between font-mono text-[10px] text-slate-600"><span>inoculate</span><span>later</span></div>
          </label>
        </div>

        <div>
          <div className="overflow-hidden rounded-[22px] border border-white/[0.07] bg-[#03100c]/70 p-3 sm:p-4">
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="h-auto w-full" role="img" aria-label="Idealized microbial population growth curve over relative time">
              <rect x={x(0)} y={padY} width={x(model.lagEnd) - x(0)} height={chartHeight - padY * 2} fill="rgba(125,211,252,0.025)" />
              <rect x={x(model.lagEnd)} y={padY} width={x(model.stationaryStart) - x(model.lagEnd)} height={chartHeight - padY * 2} fill={`rgba(${model.rgb},0.025)`} />
              <rect x={x(model.stationaryStart)} y={padY} width={x(MAX_TIME) - x(model.stationaryStart)} height={chartHeight - padY * 2} fill="rgba(192,132,252,0.025)" />
              <line x1={padX} x2={chartWidth - padX} y1={chartHeight - padY} y2={chartHeight - padY} stroke="rgba(148,163,184,0.18)" />
              <line x1={padX} x2={padX} y1={padY} y2={chartHeight - padY} stroke="rgba(148,163,184,0.14)" />
              <line x1={x(model.lagEnd)} x2={x(model.lagEnd)} y1={padY} y2={chartHeight - padY} stroke="rgba(125,211,252,0.12)" strokeDasharray="4 6" />
              <line x1={x(model.stationaryStart)} x2={x(model.stationaryStart)} y1={padY} y2={chartHeight - padY} stroke="rgba(192,132,252,0.12)" strokeDasharray="4 6" />
              <polyline points={curve} fill="none" stroke={`rgb(${model.rgb})`} strokeOpacity="0.82" strokeWidth="3" strokeLinecap="round" />
              <line x1={x(time)} x2={x(time)} y1={padY} y2={chartHeight - padY} stroke="rgba(255,255,255,0.16)" strokeDasharray="3 5" />
              <circle cx={x(time)} cy={y(population)} r="7" fill={`rgb(${model.rgb})`} />
              <text x={x(model.lagEnd / 2)} y={25} textAnchor="middle" fill="rgba(186,230,253,0.55)" fontSize="10">lag</text>
              <text x={x((model.lagEnd + model.stationaryStart) / 2)} y={25} textAnchor="middle" fill={`rgba(${model.rgb},0.65)`} fontSize="10">rapid growth</text>
              <text x={x((model.stationaryStart + MAX_TIME) / 2)} y={25} textAnchor="middle" fill="rgba(216,180,254,0.55)" fontSize="10">stationary</text>
            </svg>
          </div>

          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            <Readout label="Relative population" value={`${Math.round(population * 100)}%`} note="normalized model abundance" rgb={model.rgb} />
            <Readout label="Relative resources" value={`${Math.round(resources * 100)}%`} note="conceptual remaining supply" rgb="251,191,36" />
            <Readout label="Growth phase" value={phase.short} note="idealized batch-culture phase" rgb={phase.rgb} />
          </div>
        </div>

        <aside className="xl:sticky xl:top-[172px] xl:self-start">
          <div className="rounded-[20px] border border-white/[0.07] bg-black/[0.07] p-4">
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.07em] text-emerald-200/52"><Sprout size={13} /> Culture field</div>
            <div className="relative mx-auto mt-4 aspect-square w-full max-w-[220px] overflow-hidden rounded-full border-4 border-white/[0.08] bg-[radial-gradient(circle_at_34%_28%,rgba(217,249,157,0.09),rgba(63,98,18,0.12)_52%,rgba(4,12,8,0.60)_100%)] shadow-[inset_0_0_45px_rgba(0,0,0,0.28)]">
              {Array.from({ length: 70 }, (_, index) => {
                const visible = index < visibleCells;
                const left = 8 + ((index * 37) % 84);
                const top = 8 + ((index * 53) % 84);
                const size = 4 + (index % 4);
                return <span key={index} className="absolute rounded-full transition-opacity duration-300" style={{ left: `${left}%`, top: `${top}%`, width: size, height: size, opacity: visible ? 0.72 : 0.035, background: index % 3 === 0 ? "rgb(163,230,53)" : index % 3 === 1 ? "rgb(110,231,183)" : "rgb(34,211,238)", transform: "translate(-50%,-50%)" }} />;
              })}
            </div>
            <p className="mt-4 text-[12px] leading-5 text-slate-400/72">The dots visualize relative abundance only. They do not represent colony morphology, cell counts, species identity, or a literal microscope field.</p>
          </div>

          <div className="mt-3 rounded-[16px] border border-amber-200/[0.10] bg-amber-200/[0.025] p-3">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.06em] text-amber-200/56"><Gauge size={11} /> Model boundary</div>
            <p className="mt-2 text-[11px] leading-5 text-slate-500">Real microbial growth depends on organism, medium, temperature, pH, oxygen, interactions, inhibitors, history, and many other conditions. The familiar phase labels summarize one useful batch-culture pattern, not a universal timetable.</p>
          </div>
        </aside>
      </div>
    </Surface>
  );
}

function growthAt(time: number, model: GrowthModel) {
  const baseline = 0.055;
  if (time <= model.lagEnd) return baseline + (time / model.lagEnd) * 0.012;
  if (time >= model.stationaryStart) return model.carrying;
  const progress = (time - model.lagEnd) / (model.stationaryStart - model.lagEnd);
  const shaped = (Math.exp(progress * 3.2) - 1) / (Math.exp(3.2) - 1);
  return baseline + shaped * (model.carrying - baseline);
}

function phaseAt(time: number, model: GrowthModel) {
  if (time < model.lagEnd) return { label: "Lag phase", short: "lag", rgb: "125,211,252", explanation: "Population size changes slowly while cells adjust to the modeled environment; this is a conceptual phase label, not inactivity." };
  if (time < model.stationaryStart) return { label: "Exponential-growth region", short: "growth", rgb: model.rgb, explanation: "The model population rises rapidly while available resources still support net growth." };
  return { label: "Stationary region", short: "stationary", rgb: "192,132,252", explanation: "Net population growth approaches a plateau as the closed model reaches its resource-defined limit." };
}

function Readout({ label, value, note, rgb }: { label: string; value: string; note: string; rgb: string }) {
  return <div className="rounded-[15px] border border-white/[0.06] bg-black/[0.08] p-3"><div className="font-mono text-[10px] uppercase tracking-[0.06em] text-slate-500">{label}</div><div className="mt-1 text-[20px] font-semibold" style={{ color: `rgb(${rgb})` }}>{value}</div><p className="mt-1 text-[11px] leading-4 text-slate-500">{note}</p></div>;
}
