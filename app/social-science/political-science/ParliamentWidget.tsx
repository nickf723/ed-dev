"use client";

import { useMemo, useState } from "react";
import { Gavel, RotateCcw, Users } from "lucide-react";
import { Surface } from "@/app/_page-system/scene";
import {
  POLITICAL_MAJORITY,
  POLITICAL_PARTIES,
  POLITICAL_TOTAL_SEATS,
  buildPoliticalHemicycle,
  calculateCoalitionSeats,
} from "./politicalScienceModel";

export default function ParliamentWidget() {
  const [coalition, setCoalition] = useState<string[]>([]);
  const coalitionSeats = calculateCoalitionSeats(coalition);
  const seatsNeeded = Math.max(0, POLITICAL_MAJORITY - coalitionSeats);
  const dots = useMemo(() => buildPoliticalHemicycle(), []);

  function toggleParty(id: string) {
    setCoalition((current) =>
      current.includes(id)
        ? current.filter((partyId) => partyId !== id)
        : [...current, id]
    );
  }

  return (
    <Surface
      variant="glass"
      className="overflow-hidden rounded-[32px] border-amber-100/[0.14]"
      style={{ background: "rgba(9,8,7,0.34)" }}
    >
      <div className="grid border-b border-amber-100/[0.09] lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-amber-200/70">
            <Users size={14} /> Assembly laboratory · coalition arithmetic
          </div>
          <h2 className="mt-2 text-[clamp(1.9rem,3.6vw,3.5rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-white">
            A seat distribution constrains which coalitions can command a
            majority.
          </h2>
          <p className="mt-3 max-w-4xl text-[14px] leading-6 text-slate-300/70">
            Select fictional parties to build a governing coalition. The
            hemicycle only answers the arithmetic question of seat support; real
            coalition bargaining also depends on institutions, policy
            commitments, party strategy, confidence rules, and political
            context.
          </p>
        </div>
        <div className="border-t border-amber-100/[0.08] bg-black/[0.08] p-5 backdrop-blur-[14px] lg:border-l lg:border-t-0">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-slate-500">
            Majority threshold
          </div>
          <div className="mt-2 font-mono text-[clamp(2rem,3.5vw,3rem)] font-semibold text-amber-100">
            {POLITICAL_MAJORITY} / {POLITICAL_TOTAL_SEATS}
          </div>
          <p className="mt-2 text-[12px] leading-5 text-slate-400/70">
            One more than half of all seats in this simplified single-chamber
            legislature.
          </p>
        </div>
      </div>

      <div className="grid xl:grid-cols-[minmax(0,1fr)_390px]">
        <div className="border-b border-amber-100/[0.08] p-4 sm:p-5 xl:border-b-0 xl:border-r">
          <div className="relative mx-auto h-[330px] w-full max-w-[700px] overflow-hidden rounded-[24px] border border-white/[0.08] bg-black/[0.10] backdrop-blur-[8px]">
            <svg
              viewBox="0 0 700 330"
              className="absolute inset-0 h-full w-full"
              role="img"
              aria-label="Fictional parliament hemicycle showing coalition seats"
            >
              <path
                d="M96 280 A254 254 0 0 1 604 280"
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="2"
              />
              <path
                d="M176 280 A174 174 0 0 1 524 280"
                fill="none"
                stroke="rgba(255,255,255,0.05)"
              />
              {dots.map((dot) => {
                const selected = coalition.includes(dot.partyId);
                return (
                  <circle
                    key={dot.key}
                    cx={dot.x}
                    cy={dot.y}
                    r={selected ? 7 : 5.3}
                    fill={`rgb(${dot.rgb})`}
                    opacity={coalition.length === 0 || selected ? 0.94 : 0.22}
                    stroke={
                      selected
                        ? "rgba(255,255,255,0.72)"
                        : "rgba(255,255,255,0.12)"
                    }
                    strokeWidth={selected ? 1.5 : 0.7}
                  />
                );
              })}
              <rect
                x="316"
                y="272"
                width="68"
                height="30"
                rx="10"
                fill="rgba(15,15,17,0.9)"
                stroke="rgba(251,191,36,0.28)"
              />
              <g transform="translate(343 279)">
                <path
                  d="M4 3 l16 16"
                  stroke="rgba(251,191,36,0.72)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path
                  d="M10 2 l12 12"
                  stroke="rgba(251,191,36,0.72)"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </g>
            </svg>
          </div>

          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            <Readout
              label="Coalition seats"
              value={String(coalitionSeats)}
              rgb="251,191,36"
            />
            <Readout
              label="Seats needed"
              value={String(seatsNeeded)}
              rgb="96,165,250"
            />
            <Readout
              label="Status"
              value={
                coalitionSeats >= POLITICAL_MAJORITY
                  ? "majority"
                  : coalition.length
                    ? "minority"
                    : "none"
              }
              rgb={
                coalitionSeats >= POLITICAL_MAJORITY
                  ? "52,211,153"
                  : "244,114,182"
              }
            />
          </div>
        </div>

        <div className="p-4 sm:p-5">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-amber-200/70">
            Build a coalition
          </div>
          <div className="mt-3 space-y-2">
            {POLITICAL_PARTIES.map((party) => {
              const selected = coalition.includes(party.id);
              return (
                <button
                  key={party.id}
                  type="button"
                  onClick={() => toggleParty(party.id)}
                  className="grid min-h-[52px] w-full grid-cols-[18px_minmax(0,1fr)_54px] items-center gap-3 rounded-[14px] border px-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/60"
                  style={{
                    borderColor: selected
                      ? `rgba(${party.rgb},0.34)`
                      : "rgba(255,255,255,0.08)",
                    background: selected
                      ? `rgba(${party.rgb},0.07)`
                      : "rgba(0,0,0,0.10)",
                  }}
                >
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ background: `rgb(${party.rgb})` }}
                  />
                  <span className="text-[13px] font-medium text-slate-200">
                    {party.label}
                  </span>
                  <strong
                    className="text-right font-mono text-[13px]"
                    style={{ color: `rgb(${party.rgb})` }}
                  >
                    {party.seats}
                  </strong>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setCoalition([])}
            className="mt-3 flex min-h-[42px] w-full items-center justify-center gap-2 rounded-[12px] border border-white/[0.08] bg-black/[0.10] text-[12px] font-semibold text-slate-400 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/60"
          >
            <RotateCcw size={14} /> Clear coalition
          </button>

          <div className="mt-4 border-l-2 border-amber-300/45 pl-4">
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-amber-200/70">
              <Gavel size={13} /> What the model omits
            </div>
            <p className="mt-2 text-[13px] leading-5 text-slate-400/70">
              Seat arithmetic tells us which coalitions are numerically
              possible, not which are politically plausible, stable, lawful, or
              likely to agree on a governing program.
            </p>
          </div>
        </div>
      </div>
    </Surface>
  );
}

function Readout({
  label,
  value,
  rgb,
}: {
  label: string;
  value: string;
  rgb: string;
}) {
  return (
    <div
      className="border-l px-3 py-2"
      style={{ borderColor: `rgba(${rgb},0.42)` }}
    >
      <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">
        {label}
      </div>
      <div
        className="mt-1 text-[19px] font-semibold"
        style={{ color: `rgb(${rgb})` }}
      >
        {value}
      </div>
    </div>
  );
}
