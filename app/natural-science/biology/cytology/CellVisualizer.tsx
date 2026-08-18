"use client";

import { useMemo, useState } from "react";
import { ArrowRight, CircleDot, Microscope, Network, ScanSearch } from "lucide-react";
import { Surface } from "@/app/_page-system/scene";
import { CELL_STRUCTURES, getCellStructure, type CellStructureId } from "./cytology-data";

const DEFAULT_ID: CellStructureId = "nucleus";

export default function CellVisualizer() {
  const [selectedId, setSelectedId] = useState<CellStructureId>(DEFAULT_ID);
  const selected = useMemo(() => getCellStructure(selectedId) ?? CELL_STRUCTURES[0], [selectedId]);

  return (
    <Surface variant="glass" className="overflow-hidden rounded-[30px] border-emerald-100/[0.12]" style={{ background: "rgba(3,16,12,0.21)" }}>
      <div className="grid border-b border-white/[0.07] lg:grid-cols-[minmax(0,1fr)_330px]">
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-emerald-200/62"><Microscope size={14} /> Explorable cell · schematic animal-cell view</div>
          <h3 className="mt-2 text-[clamp(1.65rem,2.8vw,2.55rem)] font-semibold tracking-[-0.045em] text-white">How do cellular structures divide work and exchange material?</h3>
          <p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400/78">Select a structure to connect its local role to the rest of the cell. The drawing emphasizes relationships, not literal scale, abundance, shape, or position. Real cells vary strongly across cell type, organism, developmental state, activity, and experimental preparation.</p>
        </div>
        <div className="border-t border-white/[0.07] bg-black/[0.06] p-5 backdrop-blur-[10px] lg:border-l lg:border-t-0">
          <span className="font-mono text-[10px] uppercase tracking-[0.07em] text-slate-600">Selected structure</span>
          <strong className="mt-2 block text-[18px]" style={{ color: `rgba(${selected.rgb},0.88)` }}>{selected.label}</strong>
          <p className="mt-2 text-[11px] leading-5 text-slate-500">{selected.kind}</p>
        </div>
      </div>

      <div className="grid gap-5 p-4 sm:p-5 xl:grid-cols-[210px_minmax(0,1fr)_300px]">
        <div>
          <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-600">Structure index</div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
            {CELL_STRUCTURES.map((structure) => {
              const active = structure.id === selectedId;
              return (
                <button
                  key={structure.id}
                  type="button"
                  onClick={() => setSelectedId(structure.id)}
                  className="flex items-center gap-3 border px-3 py-2.5 text-left transition"
                  style={{ borderColor: active ? `rgba(${structure.rgb},0.34)` : "rgba(255,255,255,0.06)", background: active ? `rgba(${structure.rgb},0.06)` : "rgba(0,0,0,0.035)" }}
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border" style={{ borderColor: `rgba(${structure.rgb},0.25)`, color: `rgb(${structure.rgb})` }}><CircleDot size={12} /></span>
                  <span className="min-w-0"><strong className="block truncate text-[11px] text-white/80">{structure.label}</strong><span className="mt-0.5 block truncate text-[9px] text-slate-600">{structure.kind}</span></span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative min-h-[420px] overflow-hidden border border-white/[0.07] bg-[#03110d]/48 backdrop-blur-[8px]">
          <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:radial-gradient(circle,rgba(52,211,153,0.08)_1px,transparent_1px)] [background-size:24px_24px]" />
          <CellDiagram selectedId={selectedId} onSelect={setSelectedId} />
          <div className="absolute inset-x-4 bottom-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] pt-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.06em] text-slate-600">generalized animal-cell schematic · not to scale</span>
            <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.06em] text-emerald-200/42"><ScanSearch size={11} /> click a structure</span>
          </div>
        </div>

        <div>
          <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-600">Local role</div>
          <p className="mt-3 text-[12px] leading-6 text-slate-400/82">{selected.function}</p>

          <div className="mt-5">
            <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.07em]" style={{ color: `rgba(${selected.rgb},0.58)` }}><CircleDot size={10} /> Processes</div>
            <div className="mt-2 flex flex-wrap gap-1.5">{selected.processes.map((process) => <span key={process} className="border px-2 py-1 text-[9px] text-slate-400" style={{ borderColor: `rgba(${selected.rgb},0.16)`, background: `rgba(${selected.rgb},0.025)` }}>{process}</span>)}</div>
          </div>

          <div className="mt-5 border-t border-white/[0.07] pt-4">
            <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.07em] text-cyan-200/45"><Network size={10} /> Connections</div>
            <div className="mt-2 space-y-2">{selected.connections.map((connection) => <div key={connection} className="flex gap-2 text-[10px] leading-4 text-slate-500"><ArrowRight size={10} className="mt-0.5 shrink-0 text-cyan-200/35" /><span>{connection}</span></div>)}</div>
          </div>

          {selected.caution ? <div className="mt-4 border-l-2 border-amber-300/22 bg-amber-300/[0.025] px-3 py-3 text-[10px] leading-5 text-slate-500">{selected.caution}</div> : null}

          <div className="mt-4 border-l-2 border-emerald-300/22 bg-emerald-300/[0.025] px-3 py-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.07em] text-emerald-200/44">Scale boundary</span>
            <p className="mt-2 text-[10px] leading-5 text-slate-600">The diagram combines structures that operate across very different spatial scales. A ribosome, membrane bilayer, Golgi stack, mitochondrion, and nucleus cannot be drawn together at one truthful scale and remain readable.</p>
          </div>
        </div>
      </div>
    </Surface>
  );
}

function CellDiagram({ selectedId, onSelect }: { selectedId: CellStructureId; onSelect: (id: CellStructureId) => void }) {
  const selectKey = (event: React.KeyboardEvent<SVGGElement>, id: CellStructureId) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect(id);
    }
  };

  return (
    <svg className="absolute inset-[4%_3%_18%_3%] h-[78%] w-[94%]" viewBox="0 0 760 500" role="img" aria-label="Schematic animal cell with selectable cellular structures">
      <defs>
        <radialGradient id="cyto-cell" cx="43%" cy="42%" r="64%"><stop offset="0%" stopColor="rgba(52,211,153,0.045)" /><stop offset="100%" stopColor="rgba(16,185,129,0.015)" /></radialGradient>
        <radialGradient id="cyto-nucleus" cx="38%" cy="36%" r="70%"><stop offset="0%" stopColor="rgba(216,180,254,0.18)" /><stop offset="100%" stopColor="rgba(88,28,135,0.05)" /></radialGradient>
      </defs>

      <path d="M88 260 C93 122 212 66 369 80 C537 50 677 135 686 270 C694 392 568 440 389 426 C214 449 77 394 88 260 Z" fill="url(#cyto-cell)" stroke={selectedId === "membrane" ? "rgba(52,211,153,0.92)" : "rgba(52,211,153,0.44)"} strokeWidth={selectedId === "membrane" ? 5 : 3} className="cursor-pointer outline-none" onClick={() => onSelect("membrane")} />
      <path d="M97 260 C102 132 218 76 369 89 C529 61 666 143 677 270 C683 382 562 429 389 416 C221 438 88 386 97 260 Z" fill="none" stroke="rgba(110,231,183,0.11)" strokeWidth="1" />

      <g role="button" tabIndex={0} aria-label="Nucleus" onClick={() => onSelect("nucleus")} onKeyDown={(event) => selectKey(event, "nucleus")} className="cursor-pointer outline-none">
        <circle cx="313" cy="252" r="91" fill="url(#cyto-nucleus)" stroke={selectedId === "nucleus" ? "rgba(192,132,252,0.92)" : "rgba(192,132,252,0.42)"} strokeWidth={selectedId === "nucleus" ? 5 : 3} />
        <circle cx="313" cy="252" r="82" fill="none" stroke="rgba(216,180,254,0.11)" strokeWidth="1" />
        <circle cx="334" cy="229" r="23" fill="rgba(233,213,255,0.09)" stroke="rgba(216,180,254,0.12)" />
        {[0,1,2,3].map((strand) => <path key={strand} d={`M255 ${219 + strand * 19} C276 ${205 + strand * 18}, 306 ${239 + strand * 10}, 350 ${215 + strand * 18}`} fill="none" stroke="rgba(216,180,254,0.09)" strokeWidth="2" />)}
      </g>

      <g role="button" tabIndex={0} aria-label="Rough endoplasmic reticulum" onClick={() => onSelect("rough-er")} onKeyDown={(event) => selectKey(event, "rough-er")} className="cursor-pointer outline-none" stroke={selectedId === "rough-er" ? "rgba(96,165,250,0.85)" : "rgba(96,165,250,0.32)"} fill="none" strokeWidth={selectedId === "rough-er" ? 4 : 2.5}>
        {[0,1,2,3,4].map((band) => <path key={band} d={`M383 ${176 + band * 23} C422 ${148 + band * 25}, 466 ${212 + band * 13}, 512 ${181 + band * 23}`} />)}
        {Array.from({ length: 22 }, (_, index) => {
          const x = 397 + (index % 6) * 20 + Math.floor(index / 6) * 4;
          const y = 165 + Math.floor(index / 6) * 27 + (index % 2) * 5;
          return <circle key={index} cx={x} cy={y} r="2.7" fill={selectedId === "ribosome" ? "rgba(163,230,53,0.88)" : "rgba(190,242,100,0.38)"} stroke="none" />;
        })}
      </g>

      <g role="button" tabIndex={0} aria-label="Ribosomes" onClick={() => onSelect("ribosome")} onKeyDown={(event) => selectKey(event, "ribosome")} className="cursor-pointer outline-none">
        {[[203,153],[225,351],[382,372],[531,132],[578,299],[467,344],[167,292],[552,222]].map(([x,y], index) => <circle key={index} cx={x} cy={y} r={selectedId === "ribosome" ? 6 : 4} fill={selectedId === "ribosome" ? "rgba(163,230,53,0.88)" : "rgba(190,242,100,0.28)"} stroke="rgba(217,249,157,0.18)" />)}
      </g>

      <g role="button" tabIndex={0} aria-label="Golgi apparatus" onClick={() => onSelect("golgi")} onKeyDown={(event) => selectKey(event, "golgi")} className="cursor-pointer outline-none" fill="none" stroke={selectedId === "golgi" ? "rgba(244,114,182,0.92)" : "rgba(244,114,182,0.42)"} strokeWidth={selectedId === "golgi" ? 5 : 3} strokeLinecap="round">
        {[0,1,2,3,4].map((layer) => <path key={layer} d={`M526 ${230 + layer * 16} C548 ${214 + layer * 17}, 584 ${214 + layer * 17}, 606 ${230 + layer * 16}`} />)}
        <circle cx="517" cy="249" r="7" fill="rgba(244,114,182,0.12)" /><circle cx="615" cy="276" r="8" fill="rgba(244,114,182,0.12)" />
      </g>

      <g role="button" tabIndex={0} aria-label="Mitochondria" onClick={() => onSelect("mitochondrion")} onKeyDown={(event) => selectKey(event, "mitochondrion")} className="cursor-pointer outline-none">
        <Mito x={498} y={350} angle={-14} active={selectedId === "mitochondrion"} />
        <Mito x={192} y={361} angle={12} active={selectedId === "mitochondrion"} />
        <Mito x={541} y={127} angle={-24} active={selectedId === "mitochondrion"} />
      </g>

      <g role="button" tabIndex={0} aria-label="Lysosomes" onClick={() => onSelect("lysosome")} onKeyDown={(event) => selectKey(event, "lysosome")} className="cursor-pointer outline-none">
        {[[157,211,16],[585,345,18],[431,120,14]].map(([x,y,r], index) => <circle key={index} cx={x} cy={y} r={r} fill="rgba(248,113,113,0.055)" stroke={selectedId === "lysosome" ? "rgba(248,113,113,0.88)" : "rgba(248,113,113,0.34)"} strokeWidth={selectedId === "lysosome" ? 4 : 2} />)}
      </g>

      <g role="button" tabIndex={0} aria-label="Cytoskeleton" onClick={() => onSelect("cytoskeleton")} onKeyDown={(event) => selectKey(event, "cytoskeleton")} className="cursor-pointer outline-none" fill="none" stroke={selectedId === "cytoskeleton" ? "rgba(34,211,238,0.62)" : "rgba(34,211,238,0.13)"} strokeWidth={selectedId === "cytoskeleton" ? 3 : 1.5}>
        <path d="M318 335 Q410 385 617 340" /><path d="M315 335 Q222 388 138 314" /><path d="M330 328 Q425 267 625 187" /><path d="M300 330 Q231 242 156 146" /><path d="M329 340 Q372 402 430 413" />
      </g>

      <path d="M450 202 C484 177 518 193 550 232" fill="none" stroke="rgba(244,114,182,0.16)" strokeWidth="2" strokeDasharray="6 7" />
      <circle cx="486" cy="188" r="5" fill="rgba(244,114,182,0.35)" />
      <text x="458" y="172" fill="rgba(249,168,212,0.35)" fontSize="11">example biosynthetic traffic</text>
    </svg>
  );
}

function Mito({ x, y, angle, active }: { x: number; y: number; angle: number; active: boolean }) {
  return <g transform={`translate(${x} ${y}) rotate(${angle})`}><rect x="-42" y="-19" width="84" height="38" rx="19" fill="rgba(251,191,36,0.055)" stroke={active ? "rgba(251,191,36,0.92)" : "rgba(251,191,36,0.38)"} strokeWidth={active ? 4 : 2} /><path d="M-28 0 C-17 -13,-8 13,2 0 C12 -13,21 13,30 0" fill="none" stroke="rgba(253,230,138,0.34)" strokeWidth="2" /></g>;
}
