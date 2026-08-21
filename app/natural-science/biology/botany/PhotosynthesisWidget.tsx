"use client";

import { useState } from "react";
import { Droplets, Gauge, Leaf, Wind } from "lucide-react";
import { Surface } from "@/app/_page-system/scene";
import {
  AIR_PROFILES,
  calculateStomatalExchange,
  type AirProfileKey,
} from "./botanyModel";

export default function PhotosynthesisWidget() {
  const [aperture, setAperture] = useState(48);
  const [airKey, setAirKey] = useState<AirProfileKey>("humid");
  const air = AIR_PROFILES[airKey];
  const { openness, carbonDioxideCapacity, waterVaporFlux } =
    calculateStomatalExchange(aperture, airKey);
  const gap = 5 + openness * 28;

  return (
    <Surface
      variant="glass"
      className="overflow-hidden rounded-[30px] border-emerald-100/[0.11]"
      style={{ background: "rgba(3,15,8,0.28)" }}
    >
      <div className="grid border-b border-white/[0.07] lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="p-5 sm:p-6">
          <div className="text-emerald-200/64 flex items-center gap-2 font-mono text-[12px] font-semibold uppercase tracking-[0.09em]">
            <Leaf size={14} /> Stomatal exchange model
          </div>
          <h3 className="mt-2 text-[clamp(1.8rem,3vw,2.9rem)] font-semibold tracking-[-0.045em] text-white">
            Opening a pore helps CO₂ enter, but it also opens a path for water
            vapor to leave.
          </h3>
          <p className="text-slate-300/74 mt-3 max-w-3xl text-[14px] leading-6">
            Change stomatal aperture and outside-air dryness. The outputs are
            normalized diffusion-capacity indicators, not measured
            photosynthesis or transpiration rates for a real species.
          </p>
        </div>
        <div className="border-t border-white/[0.07] bg-black/[0.055] p-5 lg:border-l lg:border-t-0">
          <span className="font-mono text-[11px] uppercase tracking-[0.07em] text-slate-500">
            Current tradeoff
          </span>
          <strong className="mt-2 block text-[20px] text-emerald-200">
            {aperture < 30
              ? "Restricted exchange"
              : aperture > 72
                ? "Open exchange"
                : "Intermediate exchange"}
          </strong>
          <p className="text-slate-400/72 mt-2 text-[12px] leading-5">
            A wider modeled pore increases both diffusion pathways. Outside
            humidity changes the water-loss side without changing the aperture
            itself.
          </p>
        </div>
      </div>

      <div className="grid gap-5 p-4 sm:p-5 xl:grid-cols-[230px_minmax(0,1fr)_300px] xl:items-start">
        <div>
          <label className="block rounded-[16px] border border-white/[0.06] bg-black/[0.07] p-3.5">
            <span className="flex items-center justify-between gap-3">
              <span className="text-white/82 text-[12px] font-semibold">
                Stomatal aperture
              </span>
              <strong className="font-mono text-[13px] text-emerald-200">
                {aperture}%
              </strong>
            </span>
            <input
              aria-label="Stomatal aperture"
              type="range"
              min="0"
              max="100"
              step="1"
              value={aperture}
              onChange={(event) => setAperture(Number(event.target.value))}
              className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-emerald-400"
            />
            <div className="mt-2 flex justify-between font-mono text-[10px] text-slate-600">
              <span>closed</span>
              <span>open</span>
            </div>
          </label>

          <div className="mt-4 font-mono text-[11px] font-semibold uppercase tracking-[0.07em] text-slate-500">
            Outside air
          </div>
          <div className="mt-2 space-y-2">
            {(Object.keys(AIR_PROFILES) as AirProfileKey[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setAirKey(key)}
                className={`w-full rounded-[14px] border p-3 text-left transition ${airKey === key ? "border-cyan-200/[0.22] bg-cyan-300/[0.035]" : "border-white/[0.06] bg-black/[0.05]"}`}
              >
                <strong className="text-white/82 text-[12px]">
                  {AIR_PROFILES[key].label}
                </strong>
                <span className="mt-1 block text-[11px] leading-5 text-slate-500">
                  {AIR_PROFILES[key].note}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="bg-[#04110a]/72 relative overflow-hidden rounded-[24px] border border-white/[0.07] p-4">
            <svg
              viewBox="0 0 700 330"
              className="h-auto w-full"
              role="img"
              aria-label="Simplified stoma showing carbon dioxide entering and water vapor leaving"
            >
              <defs>
                <radialGradient id="guard-cell" cx="50%" cy="42%" r="70%">
                  <stop offset="0%" stopColor="rgba(134,239,172,0.30)" />
                  <stop offset="100%" stopColor="rgba(22,101,52,0.12)" />
                </radialGradient>
                <marker
                  id="arrow-cyan"
                  markerWidth="8"
                  markerHeight="8"
                  refX="6"
                  refY="3"
                  orient="auto"
                >
                  <path d="M0 0 L6 3 L0 6 Z" fill="rgba(103,232,249,0.72)" />
                </marker>
                <marker
                  id="arrow-blue"
                  markerWidth="8"
                  markerHeight="8"
                  refX="6"
                  refY="3"
                  orient="auto"
                >
                  <path d="M0 0 L6 3 L0 6 Z" fill="rgba(125,211,252,0.68)" />
                </marker>
              </defs>
              <rect
                x="80"
                y="55"
                width="540"
                height="220"
                rx="42"
                fill="rgba(22,101,52,0.055)"
                stroke="rgba(134,239,172,0.10)"
              />
              <ellipse
                cx={350 - gap}
                cy="166"
                rx="68"
                ry="100"
                fill="url(#guard-cell)"
                stroke="rgba(134,239,172,0.40)"
                strokeWidth="3"
                transform={`rotate(${9 + openness * 8} ${350 - gap} 166)`}
              />
              <ellipse
                cx={350 + gap}
                cy="166"
                rx="68"
                ry="100"
                fill="url(#guard-cell)"
                stroke="rgba(134,239,172,0.40)"
                strokeWidth="3"
                transform={`rotate(${-9 - openness * 8} ${350 + gap} 166)`}
              />
              <ellipse
                cx="350"
                cy="166"
                rx={4 + openness * 23}
                ry="82"
                fill="rgba(1,5,3,0.90)"
                stroke="rgba(226,232,240,0.10)"
              />

              <line
                x1="350"
                y1="20"
                x2="350"
                y2="76"
                stroke="rgba(103,232,249,0.72)"
                strokeWidth={2 + openness * 5}
                markerEnd="url(#arrow-cyan)"
              />
              <text x="365" y="32" fill="rgba(165,243,252,0.72)" fontSize="15">
                CO₂ in
              </text>
              <line
                x1="305"
                y1="255"
                x2="230"
                y2="310"
                stroke="rgba(125,211,252,0.68)"
                strokeWidth={2 + openness * air.dryness * 6}
                markerEnd="url(#arrow-blue)"
              />
              <line
                x1="395"
                y1="255"
                x2="470"
                y2="310"
                stroke="rgba(125,211,252,0.68)"
                strokeWidth={2 + openness * air.dryness * 6}
                markerEnd="url(#arrow-blue)"
              />
              <text x="480" y="307" fill="rgba(186,230,253,0.68)" fontSize="15">
                H₂O vapor out
              </text>
            </svg>
            <div className="absolute bottom-3 left-3 rounded-full border border-white/[0.06] bg-black/55 px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.05em] text-slate-500 backdrop-blur-md">
              conceptual diffusion model · not to scale
            </div>
          </div>

          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <Readout
              label="CO₂ diffusion capacity"
              value={`${carbonDioxideCapacity}%`}
              note="normalized aperture-dependent indicator"
              rgb="103,232,249"
            />
            <Readout
              label="Water-vapor flux"
              value={`${waterVaporFlux}%`}
              note="normalized aperture × dryness indicator"
              rgb="125,211,252"
            />
          </div>
        </div>

        <aside className="xl:sticky xl:top-[172px] xl:self-start">
          <div className="rounded-[20px] border border-white/[0.07] bg-black/[0.07] p-4">
            <div className="text-cyan-200/52 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.07em]">
              <Wind size={13} /> What to notice
            </div>
            <p className="text-slate-300/72 mt-3 text-[13px] leading-6">
              The pore does not selectively open for carbon dioxide while
              keeping water vapor trapped. Gas exchange creates a physiological
              tradeoff, and plants regulate stomata as part of a larger system
              involving light, water status, hormones, temperature,
              photosynthesis, boundary layers, and species-specific anatomy.
            </p>
          </div>
          <div className="mt-3 rounded-[17px] border border-cyan-100/[0.08] bg-cyan-300/[0.02] p-4">
            <div className="text-cyan-200/48 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.06em]">
              <Droplets size={11} /> Dryness matters
            </div>
            <p className="text-slate-400/72 mt-2 text-[12px] leading-5">
              In the toy model, drier outside air increases the vapor gradient
              and therefore the outward water-vapor indicator at the same
              aperture. Real transpiration depends on additional plant and
              atmospheric variables.
            </p>
          </div>
          <div className="mt-3 rounded-[17px] border border-amber-100/[0.08] bg-amber-200/[0.02] p-4">
            <div className="text-amber-200/48 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.06em]">
              <Gauge size={11} /> Model boundary
            </div>
            <p className="mt-2 text-[11px] leading-5 text-slate-500">
              The percentages are relative indicators invented for this
              visualization. They are not stomatal conductance, assimilation,
              transpiration, water-use efficiency, or any measured physiological
              rate.
            </p>
          </div>
        </aside>
      </div>
    </Surface>
  );
}

function Readout({
  label,
  value,
  note,
  rgb,
}: {
  label: string;
  value: string;
  note: string;
  rgb: string;
}) {
  return (
    <div className="rounded-[15px] border border-white/[0.06] bg-black/[0.08] p-3">
      <div className="font-mono text-[10px] uppercase tracking-[0.06em] text-slate-500">
        {label}
      </div>
      <div
        className="mt-1 text-[20px] font-semibold"
        style={{ color: `rgb(${rgb})` }}
      >
        {value}
      </div>
      <p className="mt-1 text-[11px] leading-4 text-slate-500">{note}</p>
    </div>
  );
}
