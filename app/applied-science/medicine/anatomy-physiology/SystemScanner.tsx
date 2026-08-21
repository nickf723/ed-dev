"use client";

import { useState } from "react";
import {
  Brain,
  Heart,
  Scan,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { REGION_PROFILES, type RegionProfileId } from "./anatomyModel";

const REGION_ICONS: Record<RegionProfileId, LucideIcon> = {
  "head-neck": Brain,
  thorax: Heart,
  "abdomen-pelvis": ShieldCheck,
  limbs: Sparkles,
};

export default function SystemScanner() {
  const [activeId, setActiveId] = useState<RegionProfileId>("thorax");
  const active =
    REGION_PROFILES.find((region) => region.id === activeId) ??
    REGION_PROFILES[0];
  const Icon = REGION_ICONS[active.id];

  return (
    <section className="overflow-hidden rounded-[24px] border border-rose-100/[0.10] bg-[#10090c]/60 backdrop-blur-xl">
      <div className="grid gap-3 border-b border-white/[0.07] p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
        <div>
          <div className="text-rose-200/68 flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.09em]">
            <Scan size={13} /> Regional anatomy scanner
          </div>
          <h3 className="mt-2 text-[21px] font-semibold tracking-[-0.035em] text-white">
            A body region is a place where several systems meet.
          </h3>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.07em] text-slate-500">
          region ≠ system
        </span>
      </div>

      <div className="grid lg:grid-cols-[210px_minmax(0,1fr)]">
        <div className="grid grid-cols-2 gap-2 border-b border-white/[0.07] p-3 lg:grid-cols-1 lg:border-b-0 lg:border-r">
          {REGION_PROFILES.map((region) => {
            const RegionIcon = REGION_ICONS[region.id];
            const selected = region.id === active.id;
            return (
              <button
                key={region.id}
                type="button"
                onClick={() => setActiveId(region.id)}
                aria-pressed={selected}
                className="rounded-[15px] border px-3 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-200/60"
                style={{
                  borderColor: selected
                    ? `rgba(${region.accent},0.34)`
                    : "rgba(255,255,255,0.06)",
                  background: selected
                    ? `rgba(${region.accent},0.07)`
                    : "rgba(0,0,0,0.04)",
                }}
              >
                <div className="flex items-center gap-2">
                  <RegionIcon
                    size={14}
                    style={{ color: `rgb(${region.accent})` }}
                  />
                  <strong className="text-white/86 text-[13px]">
                    {region.label}
                  </strong>
                </div>
                <span className="mt-1.5 block text-[11px] leading-4 text-slate-500">
                  {region.cue}
                </span>
              </button>
            );
          })}
        </div>

        <div className="p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] border"
              style={{
                color: `rgb(${active.accent})`,
                borderColor: `rgba(${active.accent},0.26)`,
                background: `rgba(${active.accent},0.045)`,
              }}
            >
              <Icon size={18} />
            </span>
            <div>
              <div
                className="font-mono text-[10px] uppercase tracking-[0.08em]"
                style={{ color: `rgba(${active.accent},0.68)` }}
              >
                Selected region
              </div>
              <h4 className="mt-1 text-[20px] font-semibold text-white">
                {active.label}
              </h4>
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.07em] text-slate-500">
                Systems crossing this region
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {active.systems.map((system) => (
                  <span
                    key={system}
                    className="rounded-full border border-white/[0.07] bg-white/[0.018] px-2.5 py-1.5 text-[11px] text-slate-300"
                  >
                    {system}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.07em] text-slate-500">
                Structures to locate
              </div>
              <p className="text-slate-300/72 mt-2 text-[13px] leading-6">
                {active.structures.join(" · ")}
              </p>
            </div>
          </div>

          <div
            className="mt-4 border-l-2 pl-3"
            style={{ borderColor: `rgba(${active.accent},0.48)` }}
          >
            <p className="text-[13px] leading-6 text-slate-400">
              {active.boundary}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
