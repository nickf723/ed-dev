"use client";

import { useState } from "react";
import { ArrowRight, RefreshCw } from "lucide-react";

type LensMode = "scene" | "model";

const PROOF_EXAMPLES = [
  {
    label: "Modus ponens",
    rule: "P → Q",
    fact: "P",
    result: "Q",
  },
  {
    label: "Definition",
    rule: "square → 4 sides",
    fact: "this is a square",
    result: "4 sides",
  },
  {
    label: "Parity",
    rule: "n = 2k",
    fact: "n is even",
    result: "n² is even",
  },
] as const;

export function AbstractionLens() {
  const [mode, setMode] = useState<LensMode>("scene");

  return (
    <section className="relative flex min-h-0 flex-col overflow-hidden rounded-[20px] border border-rose-500/20 bg-[linear-gradient(145deg,rgba(35,8,18,0.72),rgba(4,4,7,0.78))] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_18px_45px_rgba(0,0,0,0.32)] backdrop-blur-2xl">
      <PanelScrews />
      <header className="flex items-center justify-between gap-3 border-b border-rose-500/20 px-4 py-3">
        <div>
          <h2 className="text-sm font-semibold text-white">Abstraction lens</h2>
          <p className="mt-0.5 text-[11px] text-slate-500">Keep the structure. Remove the scenery.</p>
        </div>
        <div className="flex rounded-lg border border-white/10 bg-black/30 p-1 font-mono text-[10px]">
          {(["scene", "model"] as LensMode[]).map((option) => (
            <button
              type="button"
              key={option}
              aria-pressed={mode === option}
              onClick={() => setMode(option)}
              className={`rounded-md px-2.5 py-1.5 uppercase tracking-wider transition-colors ${
                mode === option
                  ? "bg-rose-500/20 text-rose-100 shadow-[inset_0_0_12px_rgba(244,63,94,0.12)]"
                  : "text-slate-600 hover:text-slate-300"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </header>

      <div className="flex min-h-[178px] flex-1 items-center justify-center p-3">
        <div className="relative h-full min-h-[166px] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-[inset_0_0_30px_rgba(0,0,0,0.68)]">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(244,63,94,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(244,63,94,0.025)_1px,transparent_1px)] bg-[size:18px_18px]" />
          <svg
            viewBox="0 0 260 170"
            className="relative h-full w-full"
            role="img"
            aria-label={
              mode === "scene"
                ? "Four land regions connected by seven bridges"
                : "The same connections represented as a graph with four vertices"
            }
          >
            {mode === "scene" ? <BridgeScene /> : <GraphModel />}
          </svg>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-black/70 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500 backdrop-blur">
            {mode === "scene" ? "detail-rich world" : "connection-only model"}
          </div>
        </div>
      </div>
    </section>
  );
}

export function DeductionDeck() {
  const [exampleIndex, setExampleIndex] = useState(0);
  const example = PROOF_EXAMPLES[exampleIndex];

  const nextExample = () => {
    setExampleIndex((current) => (current + 1) % PROOF_EXAMPLES.length);
  };

  return (
    <section className="relative flex min-h-0 flex-col overflow-hidden rounded-[20px] border border-rose-500/20 bg-[linear-gradient(145deg,rgba(31,7,16,0.74),rgba(3,4,7,0.82))] shadow-[inset_0_1px_0_rgba(255,255,255,0.045),0_18px_45px_rgba(0,0,0,0.30)] backdrop-blur-2xl">
      <PanelScrews />
      <header className="flex items-center justify-between gap-3 border-b border-rose-500/20 px-4 py-3">
        <div>
          <h2 className="text-sm font-semibold text-white">Deduction stack</h2>
          <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-rose-300/60">
            {example.label}
          </p>
        </div>
        <button
          type="button"
          onClick={nextExample}
          aria-label="Show another deduction example"
          className="rounded-lg border border-white/10 bg-black/30 p-2 text-slate-500 transition-colors hover:border-rose-500/30 hover:bg-rose-500/10 hover:text-rose-200"
        >
          <RefreshCw size={14} aria-hidden="true" />
        </button>
      </header>

      <div className="flex flex-1 flex-col justify-center">
        <div className="grid grid-cols-[1fr_auto_1fr] items-stretch gap-2 p-4">
          <ProofCard label="Rule" value={example.rule} />
          <div className="flex items-center justify-center text-rose-400/60" aria-hidden="true">
            <span className="font-mono text-lg">+</span>
          </div>
          <ProofCard label="Fact" value={example.fact} />
        </div>

        <div className="relative mx-4 h-5" aria-hidden="true">
          <div className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-rose-500/40" />
          <div className="absolute left-1/2 top-3 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-rose-400/60 to-transparent" />
        </div>

        <div className="mx-4 mb-4 flex items-center gap-3 rounded-xl border border-rose-400/25 bg-rose-500/10 px-4 py-3 shadow-[inset_0_0_20px_rgba(244,63,94,0.055)]">
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-rose-300/60">
            therefore
          </span>
          <ArrowRight size={14} className="text-rose-300" aria-hidden="true" />
          <span className="min-w-0 flex-1 text-right text-sm font-semibold text-rose-100">
            {example.result}
          </span>
        </div>
      </div>
    </section>
  );
}

function ProofCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-xl border border-white/10 bg-black/30 px-3 py-3 shadow-[inset_0_0_16px_rgba(255,255,255,0.015)]">
      <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-slate-600">{label}</div>
      <div className="mt-2 break-words text-xs font-medium leading-5 text-slate-200">{value}</div>
    </div>
  );
}

function BridgeScene() {
  return (
    <g>
      <path d="M0 16 C38 3 65 12 86 39 C71 58 63 78 61 107 C34 115 12 111 0 99 Z" fill="rgba(244,63,94,0.18)" stroke="rgba(251,113,133,0.48)" />
      <path d="M95 0 C125 5 143 22 147 49 C137 67 122 76 98 76 C87 53 87 25 95 0 Z" fill="rgba(34,211,238,0.14)" stroke="rgba(103,232,249,0.42)" />
      <path d="M84 91 C103 75 133 75 151 91 C157 115 146 139 126 155 C101 153 84 135 84 91 Z" fill="rgba(52,211,153,0.13)" stroke="rgba(110,231,183,0.40)" />
      <path d="M165 23 C197 9 230 16 260 36 L260 142 C225 159 191 155 163 136 C174 106 174 69 165 23 Z" fill="rgba(251,191,36,0.13)" stroke="rgba(252,211,77,0.40)" />

      <Bridge x1={64} y1={44} x2={99} y2={37} />
      <Bridge x1={60} y1={67} x2={101} y2={61} />
      <Bridge x1={61} y1={98} x2={89} y2={104} />
      <Bridge x1={132} y1={66} x2={176} y2={59} />
      <Bridge x1={145} y1={97} x2={177} y2={88} />
      <Bridge x1={143} y1={124} x2={173} y2={121} />
      <Bridge x1={124} y1={76} x2={123} y2={91} />

      <SceneLabel x={25} y={66} value="A" />
      <SceneLabel x={115} y={39} value="B" />
      <SceneLabel x={115} y={120} value="C" />
      <SceneLabel x={213} y={87} value="D" />
    </g>
  );
}

function Bridge({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(235,230,222,0.72)" strokeWidth="5" strokeLinecap="round" />
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(41,24,28,0.95)" strokeWidth="1" strokeDasharray="3 3" />
    </g>
  );
}

function SceneLabel({ x, y, value }: { x: number; y: number; value: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r="10" fill="rgba(3,3,5,0.76)" stroke="rgba(255,255,255,0.17)" />
      <text x={x} y={y + 3.5} textAnchor="middle" fill="rgba(255,255,255,0.72)" fontSize="10" fontFamily="monospace">
        {value}
      </text>
    </g>
  );
}

function GraphModel() {
  const nodes = {
    a: { x: 45, y: 85, label: "A" },
    b: { x: 125, y: 38, label: "B" },
    c: { x: 125, y: 132, label: "C" },
    d: { x: 218, y: 85, label: "D" },
  };

  const edges: Array<[keyof typeof nodes, keyof typeof nodes, number]> = [
    ["a", "b", -5],
    ["a", "b", 5],
    ["a", "c", 0],
    ["b", "c", 0],
    ["b", "d", 0],
    ["c", "d", -5],
    ["c", "d", 5],
  ];

  return (
    <g>
      {edges.map(([from, to, offset], index) => {
        const start = nodes[from];
        const end = nodes[to];
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        const length = Math.sqrt(dx * dx + dy * dy) || 1;
        const ox = (-dy / length) * offset;
        const oy = (dx / length) * offset;
        return (
          <line
            key={`${from}-${to}-${index}`}
            x1={start.x + ox}
            y1={start.y + oy}
            x2={end.x + ox}
            y2={end.y + oy}
            stroke="rgba(251,113,133,0.58)"
            strokeWidth="2"
          />
        );
      })}

      {Object.values(nodes).map((node) => (
        <g key={node.label}>
          <circle cx={node.x} cy={node.y} r="18" fill="rgba(31,7,16,0.92)" stroke="rgba(251,113,133,0.72)" strokeWidth="2" />
          <circle cx={node.x} cy={node.y} r="10" fill="rgba(244,63,94,0.12)" />
          <text x={node.x} y={node.y + 4} textAnchor="middle" fill="rgba(255,228,230,0.95)" fontSize="12" fontWeight="700" fontFamily="monospace">
            {node.label}
          </text>
        </g>
      ))}
    </g>
  );
}

function PanelScrews() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <span className="absolute left-2 top-2 h-1.5 w-1.5 rounded-full border border-white/20 bg-black/70" />
      <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full border border-white/20 bg-black/70" />
      <span className="absolute bottom-2 left-2 h-1.5 w-1.5 rounded-full border border-white/20 bg-black/70" />
      <span className="absolute bottom-2 right-2 h-1.5 w-1.5 rounded-full border border-white/20 bg-black/70" />
    </div>
  );
}
