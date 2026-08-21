"use client";

import { useState } from "react";
import { Atom, Rotate3D } from "lucide-react";
import {
  CHEMISTRY_MOLECULES,
  getChemistryMolecule,
  projectMolecule,
  type ChemistryMoleculeId,
} from "../chemistryModel";

export default function MoleculeViewer() {
  const [activeId, setActiveId] = useState<ChemistryMoleculeId>(
    CHEMISTRY_MOLECULES[0].id
  );
  const [quarterTurn, setQuarterTurn] = useState(0);
  const active = getChemistryMolecule(activeId);
  const projected = projectMolecule(active.id, quarterTurn);
  const ordered = projected
    .map((atom, index) => ({ atom, index }))
    .sort((left, right) => left.atom.z - right.atom.z);

  return (
    <article
      data-model="deterministic-molecule-projection"
      className="overflow-hidden rounded-[24px] border border-cyan-100/[0.10] bg-black/[0.24] shadow-[0_24px_85px_rgba(0,0,0,0.22)] backdrop-blur-xl"
    >
      <div className="flex flex-col gap-3 border-b border-white/[0.08] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-cyan-200/72 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em]">
            <Atom size={14} aria-hidden="true" /> Molecular geometry
          </div>
          <p className="text-slate-400/68 mt-1 text-[13px]">
            Rotate a fixed structure to separate formula from arrangement.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setQuarterTurn((current) => (current + 1) % 4)}
          className="hover:border-cyan-100/28 inline-flex items-center justify-center gap-2 rounded-full border border-cyan-100/[0.12] bg-cyan-300/[0.035] px-4 py-2.5 text-[12px] font-semibold text-cyan-100/65 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/60"
        >
          <Rotate3D size={15} aria-hidden="true" /> Quarter-turn view
        </button>
      </div>

      <svg
        viewBox="0 0 620 330"
        className="block h-[330px] w-full border-b border-white/[0.08] bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.075),rgba(2,6,8,0.72)_68%)]"
        role="img"
        aria-labelledby={`molecule-${active.id}-title`}
      >
        <title id={`molecule-${active.id}-title`}>
          Ball-and-stick projection of {active.name}, {active.formula}, viewed
          at quarter turn {quarterTurn}
        </title>
        <g strokeLinecap="round">
          {active.bonds.map(([first, second], index) => {
            const a = projected[first];
            const b = projected[second];
            return (
              <g key={`${first}-${second}`}>
                <line
                  x1={a.screenX}
                  y1={a.screenY}
                  x2={b.screenX}
                  y2={b.screenY}
                  stroke="rgba(2,6,8,0.84)"
                  strokeWidth="17"
                />
                <line
                  x1={a.screenX}
                  y1={a.screenY}
                  x2={b.screenX}
                  y2={b.screenY}
                  stroke={
                    index % 2
                      ? "rgba(125,211,252,0.48)"
                      : "rgba(226,232,240,0.42)"
                  }
                  strokeWidth="10"
                />
              </g>
            );
          })}
        </g>
        {ordered.map(({ atom, index }) => (
          <g key={`${active.id}-${index}`}>
            <defs>
              <radialGradient
                id={`atom-${active.id}-${index}`}
                cx="32%"
                cy="28%"
              >
                <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
                <stop offset="28%" stopColor={atom.color} />
                <stop offset="100%" stopColor="rgba(0,0,0,0.86)" />
              </radialGradient>
            </defs>
            <circle
              cx={atom.screenX}
              cy={atom.screenY}
              r={atom.screenRadius * 1.75}
              fill={atom.color}
              opacity="0.10"
            />
            <circle
              cx={atom.screenX}
              cy={atom.screenY}
              r={atom.screenRadius}
              fill={`url(#atom-${active.id}-${index})`}
              stroke="rgba(255,255,255,0.20)"
            />
            <text
              x={atom.screenX}
              y={atom.screenY + 5}
              textAnchor="middle"
              fill="rgba(255,255,255,0.82)"
              fontSize="14"
              fontWeight="700"
              fontFamily="monospace"
            >
              {atom.element}
            </text>
          </g>
        ))}
        <text
          x="22"
          y="304"
          fill="rgba(148,163,184,0.48)"
          fontSize="11"
          fontFamily="monospace"
        >
          schematic geometry · atom radii and bond lengths are not to scale
        </text>
      </svg>

      <div className="p-5 sm:p-6">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {CHEMISTRY_MOLECULES.map((molecule) => {
            const selected = active.id === molecule.id;
            return (
              <button
                key={molecule.id}
                type="button"
                onClick={() => {
                  setActiveId(molecule.id);
                  setQuarterTurn(0);
                }}
                aria-pressed={selected}
                className={`min-h-[42px] whitespace-nowrap rounded-[12px] border px-3 py-2 text-[12px] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/60 ${
                  selected
                    ? "border-cyan-200/[0.30] bg-cyan-300/[0.09] text-cyan-100"
                    : "border-white/[0.07] bg-white/[0.018] text-slate-400 hover:bg-white/[0.05] hover:text-white"
                }`}
              >
                {molecule.formula}
              </button>
            );
          })}
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-[minmax(0,1fr)_220px]">
          <div>
            <h3 className="text-[24px] font-semibold tracking-[-0.035em] text-white">
              {active.name}{" "}
              <span className="text-cyan-100/62">{active.formula}</span>
            </h3>
            <p className="mt-2 text-[14px] leading-6 text-slate-300/70">
              {active.description}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-1">
            <Readout label="Geometry" value={active.geometry} />
            <Readout label="Polarity" value={active.polarity} />
          </div>
        </div>
      </div>
    </article>
  );
}

function Readout({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[13px] border border-white/[0.07] bg-white/[0.018] p-3">
      <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-slate-500">
        {label}
      </div>
      <div className="mt-1 text-[13px] font-medium text-slate-200">{value}</div>
    </div>
  );
}
