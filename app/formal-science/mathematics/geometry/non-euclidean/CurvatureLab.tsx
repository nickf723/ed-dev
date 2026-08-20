"use client";

import { useState } from "react";
import { CircleDot, Minus, Plus, Waves } from "lucide-react";

type ModelId = "spherical" | "euclidean" | "hyperbolic";

type Model = {
  id: ModelId;
  label: string;
  curvature: string;
  sign: string;
  parallel: string;
  triangle: string;
  intuition: string;
  rgb: string;
};

const MODELS: readonly Model[] = [
  {
    id: "spherical",
    label: "Positive curvature",
    curvature: "K > 0",
    sign: "+",
    parallel: "No globally parallel geodesics in the complete elliptic model",
    triangle: "α + β + γ > 180°",
    intuition: "Geodesics bend toward one another on a sphere-like surface.",
    rgb: "56, 189, 248",
  },
  {
    id: "euclidean",
    label: "Zero curvature",
    curvature: "K = 0",
    sign: "0",
    parallel: "Exactly one parallel through a point off a line",
    triangle: "α + β + γ = 180°",
    intuition: "Flat geometry is the boundary case between positive and negative curvature.",
    rgb: "226, 232, 240",
  },
  {
    id: "hyperbolic",
    label: "Negative curvature",
    curvature: "K < 0",
    sign: "−",
    parallel: "Infinitely many nonintersecting geodesics through the point",
    triangle: "α + β + γ < 180°",
    intuition: "Space opens faster than Euclidean intuition expects.",
    rgb: "192, 132, 252",
  },
];

export default function CurvatureLab() {
  const [activeId, setActiveId] = useState<ModelId>("spherical");
  const active = MODELS.find((model) => model.id === activeId) ?? MODELS[0];

  return (
    <section className="overflow-hidden rounded-[30px] border border-indigo-200/[0.10] bg-[#09051a]/62 shadow-[0_28px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl">
      <div className="grid gap-4 border-b border-white/[0.07] px-5 py-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-end">
        <div>
          <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-indigo-200/64">
            <Waves size={13} /> Curvature comparator
          </div>
          <h2 className="mt-2 text-[clamp(1.9rem,3.4vw,3.2rem)] font-semibold leading-[0.94] tracking-[-0.05em] text-white">
            One local question, three different global geometries.
          </h2>
        </div>
        <p className="text-[12px] leading-6 text-slate-400">
          Pick a constant-curvature model and compare geodesics, parallel behavior, and triangle angle sums. Euclidean geometry appears as the zero-curvature middle case.
        </p>
      </div>

      <div className="grid xl:grid-cols-[310px_minmax(0,1fr)]">
        <div className="border-b border-white/[0.07] p-4 xl:border-b-0 xl:border-r sm:p-5">
          <div className="space-y-2">
            {MODELS.map((model) => {
              const selected = model.id === active.id;
              return (
                <button
                  key={model.id}
                  type="button"
                  onClick={() => setActiveId(model.id)}
                  className="group grid w-full grid-cols-[42px_minmax(0,1fr)_auto] items-center gap-3 rounded-[18px] border px-3 py-3 text-left transition"
                  style={{
                    borderColor: selected ? `rgba(${model.rgb},0.30)` : "rgba(255,255,255,0.06)",
                    background: selected ? `rgba(${model.rgb},0.07)` : "rgba(255,255,255,0.012)",
                  }}
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border font-mono text-[12px]" style={{ color: `rgb(${model.rgb})`, borderColor: `rgba(${model.rgb},0.25)` }}>
                    {model.sign === "+" ? <Plus size={14} /> : model.sign === "−" ? <Minus size={14} /> : <CircleDot size={14} />}
                  </span>
                  <span className="min-w-0">
                    <strong className="block text-[12px] text-white/88">{model.label}</strong>
                    <span className="mt-0.5 block font-mono text-[9px] uppercase tracking-[0.1em]" style={{ color: `rgba(${model.rgb},0.62)` }}>{model.curvature}</span>
                  </span>
                  <span className="font-mono text-[7px] uppercase tracking-[0.08em] text-slate-600">{selected ? "selected" : "compare"}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-5 border-t border-white/[0.06] pt-4">
            <div className="font-mono text-[8px] font-semibold uppercase tracking-[0.13em] text-slate-600">Constant-curvature relation</div>
            <div className="mt-3 rounded-[16px] border border-white/[0.06] bg-black/[0.15] p-3 font-mono text-[12px] text-slate-300">
              α + β + γ − π = K · A
            </div>
            <p className="mt-2 text-[10px] leading-5 text-slate-600">
              For a geodesic triangle on a constant-curvature surface, the angle excess or deficit tracks curvature and area. Positive K adds angle; negative K removes it.
            </p>
          </div>
        </div>

        <div className="p-5 sm:p-6 lg:p-7">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_330px] lg:items-start">
            <div>
              <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.15em]" style={{ color: `rgba(${active.rgb},0.68)` }}>{active.curvature} · {active.label}</div>
              <h3 className="mt-1 text-[28px] font-semibold tracking-[-0.045em] text-white">{active.triangle}</h3>
              <p className="mt-3 max-w-2xl text-[13px] leading-6 text-slate-400">{active.intuition}</p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <InfoCell label="Parallel behavior" value={active.parallel} rgb={active.rgb} />
                <InfoCell label="Triangle test" value={active.triangle} rgb={active.rgb} />
              </div>
            </div>

            <GeometrySketch model={active} />
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoCell({ label, value, rgb }: { label: string; value: string; rgb: string }) {
  return (
    <div className="rounded-[18px] border border-white/[0.06] bg-black/[0.10] p-4">
      <div className="font-mono text-[8px] font-semibold uppercase tracking-[0.12em]" style={{ color: `rgba(${rgb},0.58)` }}>{label}</div>
      <p className="mt-2 text-[11px] leading-5 text-slate-400">{value}</p>
    </div>
  );
}

function GeometrySketch({ model }: { model: Model }) {
  return (
    <div className="overflow-hidden rounded-[22px] border border-white/[0.07] bg-black/[0.18] p-3">
      <svg viewBox="0 0 300 240" className="h-auto w-full" role="img" aria-label={`${model.label} geometry sketch`}>
        <defs>
          <radialGradient id={`glow-${model.id}`} cx="50%" cy="45%" r="65%">
            <stop offset="0%" stopColor={`rgba(${model.rgb},0.20)`} />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
        </defs>
        <rect width="300" height="240" rx="18" fill={`url(#glow-${model.id})`} />
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          {model.id === "spherical" ? <SphericalSketch rgb={model.rgb} /> : null}
          {model.id === "euclidean" ? <EuclideanSketch rgb={model.rgb} /> : null}
          {model.id === "hyperbolic" ? <HyperbolicSketch rgb={model.rgb} /> : null}
        </g>
      </svg>
      <div className="border-t border-white/[0.05] px-2 py-2 font-mono text-[8px] uppercase tracking-[0.1em] text-slate-700">schematic geodesic comparison · not to scale</div>
    </div>
  );
}

function SphericalSketch({ rgb }: { rgb: string }) {
  return (
    <>
      <circle cx="150" cy="118" r="82" stroke={`rgba(${rgb},0.34)`} strokeWidth="2" />
      <ellipse cx="150" cy="118" rx="82" ry="28" stroke={`rgba(${rgb},0.25)`} strokeWidth="1.5" />
      <path d="M150 36 C118 72 118 164 150 200" stroke={`rgba(${rgb},0.78)`} strokeWidth="2.5" />
      <path d="M150 36 C182 72 182 164 150 200" stroke={`rgba(${rgb},0.78)`} strokeWidth="2.5" />
      <path d="M91 131 C116 72 179 72 209 131" stroke="rgba(255,255,255,0.68)" strokeWidth="2" />
      <circle cx="150" cy="36" r="3.5" fill={`rgb(${rgb})`} stroke="none" />
      <circle cx="91" cy="131" r="3.5" fill={`rgb(${rgb})`} stroke="none" />
      <circle cx="209" cy="131" r="3.5" fill={`rgb(${rgb})`} stroke="none" />
    </>
  );
}

function EuclideanSketch({ rgb }: { rgb: string }) {
  return (
    <>
      <path d="M42 66 H258" stroke={`rgba(${rgb},0.38)`} strokeWidth="2" />
      <path d="M42 174 H258" stroke={`rgba(${rgb},0.72)`} strokeWidth="2.5" />
      <circle cx="150" cy="119" r="4" fill={`rgb(${rgb})`} stroke="none" />
      <path d="M150 119 H258" stroke={`rgba(${rgb},0.72)`} strokeDasharray="7 7" strokeWidth="2" />
      <path d="M86 174 L150 72 L218 174 Z" stroke="rgba(255,255,255,0.68)" strokeWidth="2" />
      <path d="M150 119 V66" stroke={`rgba(${rgb},0.24)`} strokeDasharray="5 6" strokeWidth="1.5" />
    </>
  );
}

function HyperbolicSketch({ rgb }: { rgb: string }) {
  return (
    <>
      <circle cx="150" cy="120" r="88" stroke={`rgba(${rgb},0.30)`} strokeWidth="2" />
      <path d="M68 157 C104 116 196 116 232 157" stroke={`rgba(${rgb},0.76)`} strokeWidth="2.5" />
      <circle cx="150" cy="87" r="4" fill={`rgb(${rgb})`} stroke="none" />
      <path d="M150 87 C112 94 91 118 78 146" stroke={`rgba(${rgb},0.55)`} strokeWidth="1.8" />
      <path d="M150 87 C188 94 209 118 222 146" stroke={`rgba(${rgb},0.55)`} strokeWidth="1.8" />
      <path d="M150 87 C128 100 113 119 101 143" stroke={`rgba(${rgb},0.38)`} strokeWidth="1.5" />
      <path d="M150 87 C172 100 187 119 199 143" stroke={`rgba(${rgb},0.38)`} strokeWidth="1.5" />
      <path d="M94 160 C113 106 184 103 209 160" stroke="rgba(255,255,255,0.66)" strokeWidth="2" />
      <path d="M94 160 C143 184 182 180 209 160" stroke="rgba(255,255,255,0.66)" strokeWidth="2" />
    </>
  );
}
