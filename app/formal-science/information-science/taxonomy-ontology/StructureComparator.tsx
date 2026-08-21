"use client";

import { useState } from "react";
import { FolderTree, Network } from "lucide-react";
import {
  HARBOR_ROUTES_TAXONOMY,
  HARBOR_ROUTES_TRIPLES,
} from "./taxonomyOntologyModel";

type Mode = "taxonomy" | "ontology";

const GRAPH_NODES = [
  { id: "game", label: "Harbor Routes", x: 50, y: 48, kind: "instance" },
  { id: "board", label: "Board game", x: 18, y: 18, kind: "class" },
  { id: "genre", label: "Network strategy", x: 80, y: 18, kind: "concept" },
  { id: "designer", label: "M. Rivera", x: 17, y: 80, kind: "person" },
  { id: "players", label: "2–4 players", x: 50, y: 84, kind: "value" },
  { id: "mechanic", label: "Route building", x: 83, y: 76, kind: "concept" },
] as const;

const GRAPH_EDGES = [
  { from: "game", to: "board", label: "is a" },
  { from: "game", to: "genre", label: "has genre" },
  { from: "game", to: "designer", label: "designed by" },
  { from: "game", to: "players", label: "supports" },
  { from: "game", to: "mechanic", label: "uses mechanic" },
] as const;

export default function StructureComparator() {
  const [mode, setMode] = useState<Mode>("taxonomy");

  return (
    <section className="overflow-hidden rounded-[30px] border border-indigo-100/[0.13] bg-[#080b1c]/68 backdrop-blur-2xl">
      <div className="grid border-b border-white/[0.07] lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-indigo-100/58">
            {mode === "taxonomy" ? <FolderTree size={14} aria-hidden="true" /> : <Network size={14} aria-hidden="true" />}
            Same game · different organizing commitments
          </div>
          <h2 className="mt-2 max-w-4xl text-[clamp(1.9rem,3.4vw,3.15rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-white">
            A taxonomy supplies a browse path. An ontology names multiple kinds of relationship.
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-1 border-t border-white/[0.07] p-3 lg:border-l lg:border-t-0" aria-label="Representation mode">
          <ModeButton mode="taxonomy" current={mode} onSelect={setMode} icon={FolderTree}>Taxonomy</ModeButton>
          <ModeButton mode="ontology" current={mode} onSelect={setMode} icon={Network}>Ontology</ModeButton>
        </div>
      </div>

      <div className="grid xl:grid-cols-[minmax(0,1.25fr)_minmax(280px,0.75fr)]">
        <div className="relative min-h-[520px] overflow-hidden border-b border-white/[0.07] bg-[#030615]/72 xl:border-b-0 xl:border-r">
          <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(165,180,252,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(165,180,252,0.08)_1px,transparent_1px)] [background-size:48px_48px]" />
          {mode === "taxonomy" ? <TaxonomyView /> : <OntologyView />}
        </div>

        <div className="p-5 sm:p-6">
          <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.10em] text-amber-100/50">
            {mode === "taxonomy" ? "Broader → narrower" : "Subject → predicate → object"}
          </div>
          <p className="mt-3 text-[13px] leading-6 text-slate-400/78">
            {mode === "taxonomy"
              ? "The fictional game receives one illustrative browse path. Real taxonomies can permit multiple parents, alternative labels, mappings, and locally defined category policy; a tree is common, not mandatory."
              : "The graph uses the same fictional record but separates class membership, genre, creator, player range, and mechanic. A formal ontology can also define domains, ranges, cardinality, disjointness, and inference rules."}
          </p>

          <div className="mt-6 border-y border-white/[0.07] py-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.09em] text-slate-600">What remains the same</div>
            <strong className="mt-2 block text-[16px] text-white/82">The described object: Harbor Routes</strong>
            <p className="mt-2 text-[11px] leading-5 text-slate-500">The interface changes what relationships are explicit and which questions are easy to answer; it does not turn the fictional game into a different object.</p>
          </div>

          <div className="mt-6 space-y-2">
            {(mode === "taxonomy" ? HARBOR_ROUTES_TAXONOMY : HARBOR_ROUTES_TRIPLES).map((item, index) => (
              <div key={typeof item === "string" ? item : item.predicate} className="grid grid-cols-[28px_minmax(0,1fr)] gap-2 border-b border-white/[0.055] pb-2 last:border-b-0">
                <span className="font-mono text-[9px] text-indigo-200/40">0{index + 1}</span>
                <span className="text-[11px] leading-5 text-slate-500">
                  {typeof item === "string" ? item : <><strong className="text-slate-300/75">{item.subject}</strong> <span className="text-amber-200/55">{item.predicate}</span> {item.object}</>}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ModeButton({ mode, current, onSelect, icon: Icon, children }: { mode: Mode; current: Mode; onSelect: (mode: Mode) => void; icon: typeof FolderTree; children: string }) {
  const selected = mode === current;
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={() => onSelect(mode)}
      className={`flex min-w-[132px] items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-[11px] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200/60 ${selected ? "border-indigo-200/32 bg-indigo-300/[0.10] text-indigo-50" : "border-white/[0.07] bg-black/10 text-slate-500 hover:border-white/[0.16] hover:text-slate-300"}`}
    >
      <Icon size={13} aria-hidden="true" /> {children}
    </button>
  );
}

function TaxonomyView() {
  return (
    <svg viewBox="0 0 760 520" className="relative block min-h-[520px] w-full" role="img" aria-labelledby="taxonomy-view-title">
      <title id="taxonomy-view-title">A broader-to-narrower taxonomy path from Games to the fictional game Harbor Routes</title>
      <path d="M116 76H238V160H360V244H482V328H604V412" fill="none" stroke="rgba(165,180,252,0.30)" strokeWidth="2" />
      {HARBOR_ROUTES_TAXONOMY.map((label, index) => {
        const x = 116 + index * 122;
        const y = 76 + index * 84;
        return (
          <g key={label} transform={`translate(${x} ${y})`}>
            <rect x="-82" y="-28" width="164" height="56" rx="16" fill={index === HARBOR_ROUTES_TAXONOMY.length - 1 ? "rgba(251,191,36,0.10)" : "rgba(99,102,241,0.08)"} stroke={index === HARBOR_ROUTES_TAXONOMY.length - 1 ? "rgba(253,230,138,0.48)" : "rgba(165,180,252,0.24)"} />
            <text textAnchor="middle" y="4" fill={index === HARBOR_ROUTES_TAXONOMY.length - 1 ? "rgba(254,243,199,0.90)" : "rgba(224,231,255,0.76)"} fontSize="12" fontWeight="600">{label}</text>
          </g>
        );
      })}
      <text x="44" y="484" fill="rgba(148,163,184,0.40)" fontSize="10" fontFamily="monospace" letterSpacing="1.3">ONE ILLUSTRATIVE BROWSE PATH · CATEGORY POLICY MUST BE DOCUMENTED</text>
    </svg>
  );
}

function OntologyView() {
  const byId = new Map(GRAPH_NODES.map((node) => [node.id, node]));
  return (
    <svg viewBox="0 0 760 520" className="relative block min-h-[520px] w-full" role="img" aria-labelledby="ontology-view-title">
      <title id="ontology-view-title">An ontology graph connecting the fictional game Harbor Routes to its class, genre, designer, player range, and mechanic</title>
      <defs>
        <marker id="ontology-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="rgba(253,230,138,0.44)" /></marker>
      </defs>
      {GRAPH_EDGES.map((edge) => {
        const from = byId.get(edge.from)!;
        const to = byId.get(edge.to)!;
        const x1 = (from.x / 100) * 760;
        const y1 = (from.y / 100) * 520;
        const x2 = (to.x / 100) * 760;
        const y2 = (to.y / 100) * 520;
        return (
          <g key={edge.label}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(253,230,138,0.28)" strokeWidth="1.5" markerEnd="url(#ontology-arrow)" />
            <rect x={(x1 + x2) / 2 - 45} y={(y1 + y2) / 2 - 11} width="90" height="22" rx="11" fill="rgba(3,6,21,0.92)" stroke="rgba(253,230,138,0.13)" />
            <text x={(x1 + x2) / 2} y={(y1 + y2) / 2 + 4} textAnchor="middle" fill="rgba(253,230,138,0.66)" fontSize="9" fontFamily="monospace">{edge.label}</text>
          </g>
        );
      })}
      {GRAPH_NODES.map((node) => {
        const cx = (node.x / 100) * 760;
        const cy = (node.y / 100) * 520;
        const central = node.id === "game";
        return (
          <g key={node.id} transform={`translate(${cx} ${cy})`}>
            <circle r={central ? 56 : 46} fill={central ? "rgba(99,102,241,0.18)" : "rgba(15,23,42,0.84)"} stroke={central ? "rgba(165,180,252,0.56)" : "rgba(196,181,253,0.26)"} strokeWidth={central ? 2 : 1} />
            <text textAnchor="middle" y="-4" fill={central ? "rgba(238,242,255,0.95)" : "rgba(226,232,240,0.78)"} fontSize={central ? 12 : 10} fontWeight="600">{node.label}</text>
            <text textAnchor="middle" y="14" fill="rgba(148,163,184,0.45)" fontSize="8" fontFamily="monospace">{node.kind}</text>
          </g>
        );
      })}
    </svg>
  );
}
