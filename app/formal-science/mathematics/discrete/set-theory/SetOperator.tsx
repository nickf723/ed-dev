"use client";

import { useState } from "react";
import { Braces, ScanLine } from "lucide-react";

type OperationId = "union" | "intersection" | "difference";
type RegionId = "aOnly" | "both" | "bOnly" | "neither";

type SetPreset = {
  id: "numbers" | "library" | "disjoint";
  label: string;
  note: string;
  universe: readonly string[];
  a: readonly string[];
  b: readonly string[];
  aRule: string;
  bRule: string;
};

const PRESETS: readonly SetPreset[] = [
  {
    id: "numbers",
    label: "Numbers",
    note: "A clean case with members in all four regions.",
    universe: ["1", "2", "3", "4", "5", "6"],
    a: ["2", "4", "6"],
    b: ["4", "5", "6"],
    aRule: "even",
    bRule: "greater than 3",
  },
  {
    id: "library",
    label: "Library",
    note: "The same operations work on words and records.",
    universe: ["Atlas", "Dune", "Hamlet", "Sapiens", "Beloved", "Cosmos"],
    a: ["Dune", "Hamlet", "Beloved"],
    b: ["Atlas", "Dune", "Beloved"],
    aRule: "fiction",
    bRule: "currently borrowed",
  },
  {
    id: "disjoint",
    label: "Disjoint",
    note: "Both sets have members, but they share none.",
    universe: ["1", "2", "3", "4", "5"],
    a: ["2", "4"],
    b: ["1", "3", "5"],
    aRule: "even",
    bRule: "odd",
  },
] as const;

const OPERATIONS = [
  {
    id: "union",
    name: "Union",
    symbol: "A ∪ B",
    logic: "A OR B",
    instruction: "Keep members of A, B, or both.",
  },
  {
    id: "intersection",
    name: "Intersection",
    symbol: "A ∩ B",
    logic: "A AND B",
    instruction: "Keep only members shared by A and B.",
  },
  {
    id: "difference",
    name: "Difference",
    symbol: "A ∖ B",
    logic: "A AND NOT B",
    instruction: "Keep members of A that are not in B.",
  },
] as const satisfies readonly {
  id: OperationId;
  name: string;
  symbol: string;
  logic: string;
  instruction: string;
}[];

const REGION_POINTS: Record<RegionId, readonly (readonly [number, number])[]> =
  {
    aOnly: [
      [172, 132],
      [150, 205],
      [182, 278],
    ],
    both: [
      [310, 120],
      [310, 200],
      [310, 280],
    ],
    bOnly: [
      [448, 132],
      [470, 205],
      [438, 278],
    ],
    neither: [
      [56, 72],
      [562, 78],
      [56, 314],
      [562, 312],
    ],
  };

function includes(values: readonly string[], value: string) {
  return values.includes(value);
}

function regionFor(preset: SetPreset, value: string): RegionId {
  const inA = includes(preset.a, value);
  const inB = includes(preset.b, value);
  if (inA && inB) return "both";
  if (inA) return "aOnly";
  if (inB) return "bOnly";
  return "neither";
}

function passesOperation(operation: OperationId, inA: boolean, inB: boolean) {
  if (operation === "union") return inA || inB;
  if (operation === "intersection") return inA && inB;
  return inA && !inB;
}

function roster(values: readonly string[]) {
  return values.length > 0 ? `{${values.join(", ")}}` : "∅";
}

export default function SetOperator() {
  const [presetId, setPresetId] = useState<SetPreset["id"]>("numbers");
  const [operationId, setOperationId] = useState<OperationId>("union");

  const preset =
    PRESETS.find((candidate) => candidate.id === presetId) ?? PRESETS[0];
  const operation =
    OPERATIONS.find((candidate) => candidate.id === operationId) ??
    OPERATIONS[0];
  const result = preset.universe.filter((value) =>
    passesOperation(
      operationId,
      includes(preset.a, value),
      includes(preset.b, value)
    )
  );

  const regionCounts: Record<RegionId, number> = {
    aOnly: 0,
    both: 0,
    bOnly: 0,
    neither: 0,
  };

  const positionedMembers = preset.universe.map((value) => {
    const region = regionFor(preset, value);
    const points = REGION_POINTS[region];
    const point = points[regionCounts[region] % points.length];
    regionCounts[region] += 1;
    return { value, region, x: point[0], y: point[1] };
  });

  return (
    <div className="bg-[#050e16]/76 overflow-hidden border border-cyan-100/[0.15] shadow-[0_38px_110px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
      <div className="grid xl:grid-cols-[355px_minmax(0,1fr)]">
        <div className="border-b border-white/[0.08] p-5 sm:p-7 xl:border-b-0 xl:border-r">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.15em] text-cyan-100/60">
                Curated specimens
              </div>
              <h3 className="mt-2 text-[27px] font-semibold tracking-[-0.04em] text-white">
                Membership scanner
              </h3>
            </div>
            <ScanLine className="text-cyan-200/72 mt-1" size={24} />
          </div>

          <fieldset className="mt-6">
            <legend className="text-[11px] font-semibold uppercase tracking-[0.13em] text-slate-500">
              1 · Load a pair of sets
            </legend>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {PRESETS.map((candidate) => {
                const active = candidate.id === presetId;
                return (
                  <button
                    key={candidate.id}
                    type="button"
                    onClick={() => setPresetId(candidate.id)}
                    aria-pressed={active}
                    className={`min-h-12 border px-2 py-2 text-[12px] font-semibold transition-colors ${
                      active
                        ? "border-cyan-200/45 bg-cyan-300/[0.08] text-cyan-50"
                        : "border-white/[0.08] bg-white/[0.02] text-slate-400 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    {candidate.label}
                  </button>
                );
              })}
            </div>
            <p className="mt-3 min-h-12 text-[12px] leading-5 text-slate-500">
              {preset.note}
            </p>
          </fieldset>

          <div className="mt-5 space-y-3 border-y border-white/[0.08] py-5">
            <div>
              <div className="text-cyan-100/52 text-[11px] font-semibold uppercase tracking-[0.12em]">
                Set A · {preset.aRule}
              </div>
              <div className="mt-1 font-mono text-[13px] leading-6 text-cyan-100 [overflow-wrap:anywhere]">
                {roster(preset.a)}
              </div>
            </div>
            <div>
              <div className="text-violet-100/52 text-[11px] font-semibold uppercase tracking-[0.12em]">
                Set B · {preset.bRule}
              </div>
              <div className="mt-1 font-mono text-[13px] leading-6 text-violet-100 [overflow-wrap:anywhere]">
                {roster(preset.b)}
              </div>
            </div>
          </div>

          <fieldset className="mt-6">
            <legend className="text-[11px] font-semibold uppercase tracking-[0.13em] text-slate-500">
              2 · Choose a membership rule
            </legend>
            <div className="mt-3 space-y-2">
              {OPERATIONS.map((candidate) => {
                const active = candidate.id === operationId;
                return (
                  <button
                    key={candidate.id}
                    type="button"
                    onClick={() => setOperationId(candidate.id)}
                    aria-pressed={active}
                    className={`flex min-h-14 w-full items-center justify-between gap-4 border px-4 py-3 text-left transition-colors ${
                      active
                        ? "border-amber-200/42 bg-amber-300/[0.065] text-white"
                        : "border-white/[0.08] bg-white/[0.018] text-slate-400 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    <span>
                      <strong className="block text-[13px]">
                        {candidate.name}
                      </strong>
                      <span className="mt-1 block font-mono text-[11px] text-slate-500">
                        {candidate.logic}
                      </span>
                    </span>
                    <span className="font-mono text-[18px] text-amber-100">
                      {candidate.symbol}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>
        </div>

        <div className="p-4 sm:p-7 lg:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.15em] text-amber-100/60">
                Active filter · {operation.logic}
              </div>
              <h3 className="mt-2 font-mono text-[clamp(1.7rem,3.2vw,2.65rem)] font-semibold text-white">
                {operation.symbol} = {roster(result)}
              </h3>
            </div>
            <div className="border-amber-200/18 max-w-xs border-l pl-4 text-[12px] leading-5 text-slate-500">
              {operation.instruction}
            </div>
          </div>

          <div className="bg-[#02070c]/72 relative mt-6 overflow-hidden border border-white/[0.08]">
            <svg
              viewBox="0 0 620 360"
              className="h-auto min-h-[340px] w-full"
              role="img"
              aria-labelledby="set-operator-svg-title set-operator-svg-desc"
            >
              <title id="set-operator-svg-title">
                Venn diagram for {operation.name}
              </title>
              <desc id="set-operator-svg-desc">
                Set A and set B are shown as overlapping enclosures. Highlighted
                members satisfy {operation.logic}.
              </desc>
              <defs>
                <clipPath id="operator-b-clip">
                  <circle cx="380" cy="200" r="146" />
                </clipPath>
                <mask id="operator-a-only-mask">
                  <rect width="620" height="360" fill="white" />
                  <circle cx="380" cy="200" r="146" fill="black" />
                </mask>
                <filter
                  id="operator-region-glow"
                  x="-40%"
                  y="-40%"
                  width="180%"
                  height="180%"
                >
                  <feGaussianBlur stdDeviation="10" />
                </filter>
              </defs>

              <rect width="620" height="360" fill="#02070c" />
              <path
                d="M24 32 H596 V330 H24 Z"
                fill="none"
                stroke="#94a3b8"
                strokeOpacity="0.14"
              />

              {operationId === "union" ? (
                <g filter="url(#operator-region-glow)" opacity="0.88">
                  <circle
                    cx="240"
                    cy="200"
                    r="146"
                    fill="#22d3ee"
                    fillOpacity="0.22"
                  />
                  <circle
                    cx="380"
                    cy="200"
                    r="146"
                    fill="#a78bfa"
                    fillOpacity="0.22"
                  />
                </g>
              ) : null}
              {operationId === "intersection" ? (
                <circle
                  cx="240"
                  cy="200"
                  r="146"
                  fill="#fcd34d"
                  fillOpacity="0.34"
                  clipPath="url(#operator-b-clip)"
                  filter="url(#operator-region-glow)"
                />
              ) : null}
              {operationId === "difference" ? (
                <circle
                  cx="240"
                  cy="200"
                  r="146"
                  fill="#22d3ee"
                  fillOpacity="0.28"
                  mask="url(#operator-a-only-mask)"
                  filter="url(#operator-region-glow)"
                />
              ) : null}

              <circle
                cx="240"
                cy="200"
                r="146"
                fill="#22d3ee"
                fillOpacity="0.035"
                stroke="#67e8f9"
                strokeOpacity="0.6"
                strokeWidth="2"
              />
              <circle
                cx="380"
                cy="200"
                r="146"
                fill="#a78bfa"
                fillOpacity="0.035"
                stroke="#c4b5fd"
                strokeOpacity="0.6"
                strokeWidth="2"
              />

              <text
                x="154"
                y="66"
                fill="#67e8f9"
                fontFamily="monospace"
                fontSize="19"
                fontWeight="700"
              >
                A
              </text>
              <text
                x="448"
                y="66"
                fill="#c4b5fd"
                fontFamily="monospace"
                fontSize="19"
                fontWeight="700"
              >
                B
              </text>
              <text
                x="38"
                y="52"
                fill="#94a3b8"
                fillOpacity="0.52"
                fontFamily="monospace"
                fontSize="11"
              >
                U
              </text>

              {positionedMembers.map((member) => {
                const active = result.includes(member.value);
                return (
                  <g key={member.value}>
                    <rect
                      x={member.x - 31}
                      y={member.y - 17}
                      width="62"
                      height="34"
                      rx="10"
                      fill={active ? "#f8fafc" : "#0f172a"}
                      fillOpacity={active ? "0.94" : "0.76"}
                      stroke={active ? "#fcd34d" : "#64748b"}
                      strokeOpacity={active ? "0.78" : "0.32"}
                    />
                    <text
                      x={member.x}
                      y={member.y + 4}
                      fill={active ? "#0f172a" : "#94a3b8"}
                      fillOpacity={active ? "1" : "0.74"}
                      fontFamily="monospace"
                      fontSize={member.value.length > 5 ? "10" : "12"}
                      fontWeight="700"
                      textAnchor="middle"
                    >
                      {member.value}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
            <div className="border border-amber-200/[0.15] bg-amber-300/[0.045] px-4 py-3">
              <div className="text-amber-100/58 text-[11px] font-semibold uppercase tracking-[0.13em]">
                Result roster
              </div>
              <div className="mt-1 font-mono text-[15px] leading-7 text-amber-50 [overflow-wrap:anywhere]">
                {roster(result)}
              </div>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <Braces size={14} className="text-cyan-200/60" />
              {result.length} distinct{" "}
              {result.length === 1 ? "element" : "elements"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
