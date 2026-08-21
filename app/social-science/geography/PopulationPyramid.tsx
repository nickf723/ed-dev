"use client";

import { useState } from "react";
import { Baby, BarChart3, UsersRound } from "lucide-react";
import { Surface } from "@/app/_page-system/scene";
import {
  AGE_GROUPS,
  POPULATION_PROFILES,
  getPopulationProfileShares,
  type PopulationProfileKey,
} from "./geographyModel";

export default function PopulationPyramid() {
  const [profileKey, setProfileKey] =
    useState<PopulationProfileKey>("expansive");
  const profile = POPULATION_PROFILES[profileKey];
  const shares = getPopulationProfileShares(profileKey);

  return (
    <Surface
      variant="glass"
      className="overflow-hidden rounded-[32px] border-sky-100/[0.12]"
      style={{ background: "rgba(4,14,28,0.34)" }}
    >
      <div className="grid border-b border-sky-100/[0.08] lg:grid-cols-[minmax(0,1fr)_350px]">
        <div className="p-5 sm:p-6">
          <div className="text-sky-200/66 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.11em]">
            <UsersRound size={14} aria-hidden="true" /> Demographic instrument ·
            stylized age structure
          </div>
          <h2 className="mt-2 text-[clamp(1.8rem,3.3vw,3.2rem)] font-semibold leading-[0.96] tracking-[-0.048em] text-white">
            What does the shape of a population reveal before we know its story?
          </h2>
          <p className="mt-3 max-w-4xl text-[14px] leading-6 text-slate-300/70">
            Compare three deliberately simplified age profiles. A population
            pyramid is a snapshot of cohort structure, not a complete
            explanation of fertility, mortality, migration, policy, or future
            change.
          </p>
        </div>
        <div className="border-t border-sky-100/[0.08] bg-black/[0.07] p-5 backdrop-blur-[14px] lg:border-l lg:border-t-0">
          <div className="text-amber-200/62 font-mono text-[11px] font-semibold uppercase tracking-[0.09em]">
            Data boundary
          </div>
          <p className="text-slate-300/64 mt-3 text-[13px] leading-6">
            These bars are normalized teaching profiles, not measurements from a
            real country. The left and right halves are intentionally symmetric
            so the exercise isolates age structure rather than sex differences.
          </p>
        </div>
      </div>

      <div className="grid xl:grid-cols-[minmax(0,1fr)_330px]">
        <div className="border-b border-sky-100/[0.08] p-4 sm:p-5 xl:border-b-0 xl:border-r">
          <div
            className="bg-[#03101e]/62 relative min-h-[360px] overflow-hidden rounded-[24px] border border-white/[0.08] p-4 backdrop-blur-[8px] sm:p-5"
            role="img"
            aria-label={`${profile.label} symmetric teaching population pyramid with age groups from 0–9 through 80 and older.`}
          >
            <div className="grid grid-cols-[minmax(0,1fr)_56px_minmax(0,1fr)] gap-x-2">
              {[...profile.values].reverse().map((value, reverseIndex) => {
                const index = profile.values.length - 1 - reverseIndex;
                const age = AGE_GROUPS[index];
                return (
                  <div key={age} className="contents">
                    <div className="flex min-h-[31px] items-center justify-end">
                      <div
                        className="h-5 rounded-l-[6px] border-r transition-[width] duration-500"
                        style={{
                          width: `${value}%`,
                          background: `rgba(56,189,248,${0.18 + value / 380})`,
                          borderColor: "rgba(125,211,252,0.45)",
                        }}
                      />
                    </div>
                    <div className="flex min-h-[31px] items-center justify-center font-mono text-[11px] text-slate-400">
                      {age}
                    </div>
                    <div className="flex min-h-[31px] items-center justify-start">
                      <div
                        className="h-5 rounded-r-[6px] border-l transition-[width] duration-500"
                        style={{
                          width: `${value}%`,
                          background: `rgba(244,114,182,${0.16 + value / 420})`,
                          borderColor: "rgba(249,168,212,0.42)",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 grid grid-cols-[1fr_56px_1fr] gap-2 border-t border-white/[0.07] pt-3 font-mono text-[11px] uppercase tracking-[0.08em]">
              <span className="text-sky-200/58 text-right">Left half</span>
              <span />
              <span className="text-pink-200/58">Right half</span>
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <Readout
              icon={Baby}
              label="Young cohorts"
              value={`${shares.young}%`}
              note="relative share in ages 0–19"
              rgb="56,189,248"
            />
            <Readout
              icon={BarChart3}
              label="Core adult cohorts"
              value={`${shares.working}%`}
              note="relative share in ages 20–59"
              rgb="94,234,212"
            />
            <Readout
              icon={UsersRound}
              label="Older cohorts"
              value={`${shares.older}%`}
              note="relative share in ages 60+"
              rgb="244,114,182"
            />
          </div>
        </div>

        <div className="p-4 sm:p-5">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-slate-500">
            Shape presets
          </div>
          <div className="mt-3 grid gap-2">
            {(
              Object.entries(POPULATION_PROFILES) as Array<
                [
                  PopulationProfileKey,
                  (typeof POPULATION_PROFILES)[PopulationProfileKey],
                ]
              >
            ).map(([key, item]) => {
              const selected = key === profileKey;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setProfileKey(key)}
                  aria-pressed={selected}
                  className="rounded-[16px] border px-3 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-200/60"
                  style={{
                    borderColor: selected
                      ? `rgba(${item.rgb},0.34)`
                      : "rgba(255,255,255,0.07)",
                    background: selected
                      ? `rgba(${item.rgb},0.065)`
                      : "rgba(0,0,0,0.08)",
                  }}
                >
                  <span className="flex items-center justify-between gap-3">
                    <strong className="text-white/86 text-[13px]">
                      {item.label}
                    </strong>
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{
                        background: `rgb(${item.rgb})`,
                        opacity: selected ? 0.9 : 0.35,
                      }}
                    />
                  </span>
                  <span className="mt-1 block text-[11px] leading-4 text-slate-500">
                    {item.description}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            className="mt-4 border-t border-white/[0.08] pt-4"
            aria-live="polite"
          >
            <div
              className="font-mono text-[11px] font-semibold uppercase tracking-[0.09em]"
              style={{ color: `rgba(${profile.rgb},0.72)` }}
            >
              Interpretation
            </div>
            <p className="text-slate-300/68 mt-2 text-[13px] leading-6">
              {profile.implication}
            </p>
          </div>

          <div className="mt-4 border-l border-sky-200/20 pl-3">
            <div className="text-sky-200/46 font-mono text-[11px] uppercase tracking-[0.08em]">
              Next question
            </div>
            <p className="text-slate-400/62 mt-1 text-[12px] leading-5">
              What combination of births, deaths, migration, and cohort aging
              could have produced this shape, and how might those processes
              differ from place to place?
            </p>
          </div>
        </div>
      </div>
    </Surface>
  );
}

function Readout({
  icon: Icon,
  label,
  value,
  note,
  rgb,
}: {
  icon: typeof Baby;
  label: string;
  value: string;
  note: string;
  rgb: string;
}) {
  return (
    <div
      className="border-l px-3 py-2"
      style={{ borderColor: `rgba(${rgb},0.30)` }}
    >
      <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.07em] text-slate-500">
        <Icon size={13} style={{ color: `rgb(${rgb})` }} aria-hidden="true" />{" "}
        {label}
      </div>
      <strong className="mt-1 block text-[20px] text-white">{value}</strong>
      <span className="mt-1 block text-[11px] leading-4 text-slate-600">
        {note}
      </span>
    </div>
  );
}
