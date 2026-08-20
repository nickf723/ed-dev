"use client";

import { useMemo, useState } from "react";
import { GitBranch, Network, ScanSearch, Sprout } from "lucide-react";
import { Surface } from "@/app/_page-system/scene";

type StrategyKey = "exploratory" | "balanced" | "branched";
type ResourceKey = "dispersed" | "clustered";

type Segment = { x1: number; y1: number; x2: number; y2: number; depth: number };
type Patch = { x: number; y: number; r: number; label: string };

const STRATEGIES = {
  exploratory: {
    label: "Long exploratory branches",
    note: "Longer, sparser paths reach farther with fewer branch points.",
    length: 17,
    depth: 4,
    spread: 0.34,
    rgb: "192,132,252",
  },
  balanced: {
    label: "Mixed architecture",
    note: "Intermediate branch length and branching density create a mixed geometry.",
    length: 13,
    depth: 5,
    spread: 0.48,
    rgb: "74,222,128",
  },
  branched: {
    label: "Dense local branching",
    note: "Shorter branches create more local contact and more branch tips near the origin.",
    length: 9.5,
    depth: 6,
    spread: 0.62,
    rgb: "251,191,36",
  },
} as const;

const RESOURCE_MAPS: Record<ResourceKey, readonly Patch[]> = {
  dispersed: [
    { x: 17, y: 23, r: 8, label: "A" },
    { x: 78, y: 19, r: 7, label: "B" },
    { x: 87, y: 68, r: 9, label: "C" },
    { x: 23, y: 78, r: 8, label: "D" },
  ],
  clustered: [
    { x: 66, y: 33, r: 8, label: "A" },
    { x: 77, y: 43, r: 7, label: "B" },
    { x: 68, y: 56, r: 9, label: "C" },
    { x: 39, y: 75, r: 7, label: "D" },
  ],
};

export default function MyceliumLab() {
  const [strategyKey, setStrategyKey] = useState<StrategyKey>("balanced");
  const [resourceKey, setResourceKey] = useState<ResourceKey>("dispersed");
  const strategy = STRATEGIES[strategyKey];
  const patches = RESOURCE_MAPS[resourceKey];
  const segments = useMemo(() => buildNetwork(strategyKey), [strategyKey]);
  const totalLength = segments.reduce((sum, segment) => sum + Math.hypot(segment.x2 - segment.x1, segment.y2 - segment.y1), 0);
  const tips = segments.filter((segment) => segment.depth === strategy.depth).length;
  const reached = patches.filter((patch) => segments.some((segment) => distanceToSegment(patch.x, patch.y, segment) <= patch.r)).length;

  return (
    <Surface variant="glass" className="overflow-hidden rounded-[30px] border-purple-100/[0.11]" style={{ background: "rgba(9,6,13,0.30)" }}>
      <div className="grid border-b border-white/[0.07] lg:grid-cols-[minmax(0,1fr)_350px]">
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2 font-mono text-[12px] font-semibold uppercase tracking-[0.09em] text-purple-200/64"><Network size={14} /> Mycelium architecture model</div>
          <h3 className="mt-2 text-[clamp(1.8rem,3vw,2.9rem)] font-semibold tracking-[-0.045em] text-white">A fungus can explore substrate with a branching body that is mostly hidden from view.</h3>
          <p className="mt-3 max-w-3xl text-[14px] leading-6 text-slate-300/74">Compare three toy network geometries against two resource maps. The model describes geometry only. It does not predict growth rate, nutrient uptake, fitness, species behavior, or which architecture a real fungus would choose.</p>
        </div>
        <div className="border-t border-white/[0.07] bg-black/[0.055] p-5 lg:border-l lg:border-t-0">
          <span className="font-mono text-[11px] uppercase tracking-[0.07em] text-slate-500">Selected architecture</span>
          <strong className="mt-2 block text-[20px]" style={{ color: `rgb(${strategy.rgb})` }}>{strategy.label}</strong>
          <p className="mt-2 text-[12px] leading-5 text-slate-400/72">{strategy.note}</p>
        </div>
      </div>

      <div className="grid gap-5 p-4 sm:p-5 xl:grid-cols-[230px_minmax(0,1fr)_300px] xl:items-start">
        <div>
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.07em] text-slate-500">Network architecture</div>
          <div className="mt-3 space-y-2">
            {(Object.keys(STRATEGIES) as StrategyKey[]).map((key) => {
              const item = STRATEGIES[key];
              const active = key === strategyKey;
              return <button key={key} type="button" onClick={() => setStrategyKey(key)} className="w-full rounded-[15px] border p-3 text-left transition" style={{ borderColor: active ? `rgba(${item.rgb},0.34)` : "rgba(255,255,255,0.06)", background: active ? `rgba(${item.rgb},0.05)` : "rgba(0,0,0,0.05)" }}><strong className="text-[12px]" style={{ color: active ? `rgb(${item.rgb})` : "rgb(203,213,225)" }}>{item.label}</strong><span className="mt-1 block text-[11px] leading-5 text-slate-500">{item.note}</span></button>;
            })}
          </div>

          <div className="mt-5 font-mono text-[11px] font-semibold uppercase tracking-[0.07em] text-slate-500">Resource map</div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {(["dispersed", "clustered"] as ResourceKey[]).map((key) => <button key={key} type="button" onClick={() => setResourceKey(key)} className={`rounded-[13px] border px-3 py-2.5 text-[11px] font-semibold capitalize transition ${resourceKey === key ? "border-emerald-200/[0.24] bg-emerald-300/[0.04] text-emerald-100" : "border-white/[0.06] bg-black/[0.05] text-slate-400"}`}>{key}</button>)}
          </div>
        </div>

        <div>
          <div className="relative overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#08060b]/76 p-3 sm:p-4">
            <svg viewBox="0 0 100 100" className="aspect-[1.2/1] h-auto w-full" role="img" aria-label="Toy branching mycelium network over resource patches">
              <defs>
                <radialGradient id="myco-resource" cx="40%" cy="40%" r="65%"><stop offset="0%" stopColor="rgba(217,249,157,0.22)" /><stop offset="100%" stopColor="rgba(74,222,128,0.025)" /></radialGradient>
              </defs>
              {patches.map((patch) => <g key={patch.label}><circle cx={patch.x} cy={patch.y} r={patch.r} fill="url(#myco-resource)" stroke="rgba(134,239,172,0.16)" strokeDasharray="1.5 1.5" /><text x={patch.x} y={patch.y + 1.2} textAnchor="middle" fill="rgba(217,249,157,0.45)" fontSize="3">{patch.label}</text></g>)}
              <circle cx="50" cy="52" r="3.5" fill={`rgba(${strategy.rgb},0.12)`} stroke={`rgba(${strategy.rgb},0.42)`} />
              {segments.map((segment, index) => <line key={index} x1={segment.x1} y1={segment.y1} x2={segment.x2} y2={segment.y2} stroke={`rgba(${strategy.rgb},${0.28 + segment.depth * 0.05})`} strokeWidth={Math.max(0.35, 1.3 - segment.depth * 0.13)} strokeLinecap="round" />)}
              {segments.filter((segment) => segment.depth === strategy.depth).map((segment, index) => <circle key={`tip-${index}`} cx={segment.x2} cy={segment.y2} r="0.7" fill={`rgb(${strategy.rgb})`} fillOpacity="0.58" />)}
            </svg>
            <div className="absolute bottom-3 left-3 rounded-full border border-white/[0.06] bg-black/55 px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.05em] text-slate-500 backdrop-blur-md">geometry only · not a biological forecast</div>
          </div>

          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            <Readout label="Modeled hyphal length" value={Math.round(totalLength).toString()} note="arbitrary geometry units" rgb={strategy.rgb} />
            <Readout label="Terminal tips" value={tips.toString()} note="tips at final recursion depth" rgb="216,180,254" />
            <Readout label="Patches reached" value={`${reached} / ${patches.length}`} note="geometric contact only" rgb="134,239,172" />
          </div>
        </div>

        <aside className="xl:sticky xl:top-[172px] xl:self-start">
          <div className="rounded-[20px] border border-white/[0.07] bg-black/[0.07] p-4">
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.07em] text-emerald-200/52"><GitBranch size={13} /> What to notice</div>
            <p className="mt-3 text-[13px] leading-6 text-slate-300/72">Long sparse branches can cross more distance per branch. Dense branching creates more nearby tips and more local contact. Real fungal networks can change architecture in response to species traits, substrate, competition, damage, resource distribution, symbiosis, and many other conditions.</p>
          </div>

          <div className="mt-3 rounded-[17px] border border-purple-100/[0.08] bg-purple-300/[0.025] p-4">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.06em] text-purple-200/52"><Sprout size={11} /> Body-plan insight</div>
            <p className="mt-2 text-[12px] leading-5 text-slate-400/72">Hyphae are tubular cells or cell compartments that grow at tips and branch. A mycelium is the resulting network. The visible mushroom, when present, is a reproductive structure rather than the entire fungal organism.</p>
          </div>

          <div className="mt-3 rounded-[17px] border border-amber-100/[0.08] bg-amber-200/[0.02] p-4">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.06em] text-amber-200/48"><ScanSearch size={11} /> Model boundary</div>
            <p className="mt-2 text-[11px] leading-5 text-slate-500">The resource circles and branching rules are invented for geometric comparison. Reaching a patch does not equal successful uptake, and more branches are not automatically better.</p>
          </div>
        </aside>
      </div>
    </Surface>
  );
}

function buildNetwork(key: StrategyKey) {
  const strategy = STRATEGIES[key];
  const segments: Segment[] = [];
  const queue = [{ x: 50, y: 52, angle: -Math.PI / 2, depth: 1 }];

  while (queue.length > 0) {
    const branch = queue.shift()!;
    const scale = Math.pow(0.79, branch.depth - 1);
    const length = strategy.length * scale;
    const x2 = clamp(branch.x + Math.cos(branch.angle) * length, 4, 96);
    const y2 = clamp(branch.y + Math.sin(branch.angle) * length, 4, 96);
    segments.push({ x1: branch.x, y1: branch.y, x2, y2, depth: branch.depth });

    if (branch.depth >= strategy.depth) continue;
    const asymmetry = branch.depth % 2 === 0 ? 0.08 : -0.08;
    queue.push(
      { x: x2, y: y2, angle: branch.angle - strategy.spread + asymmetry, depth: branch.depth + 1 },
      { x: x2, y: y2, angle: branch.angle + strategy.spread + asymmetry, depth: branch.depth + 1 },
    );
    if (key === "branched" && branch.depth % 2 === 1) {
      queue.push({ x: x2, y: y2, angle: branch.angle + (branch.depth % 4 === 1 ? 0.08 : -0.08), depth: branch.depth + 1 });
    }
  }
  return segments;
}

function distanceToSegment(px: number, py: number, segment: Segment) {
  const dx = segment.x2 - segment.x1;
  const dy = segment.y2 - segment.y1;
  const lengthSquared = dx * dx + dy * dy;
  if (lengthSquared === 0) return Math.hypot(px - segment.x1, py - segment.y1);
  const t = clamp(((px - segment.x1) * dx + (py - segment.y1) * dy) / lengthSquared, 0, 1);
  return Math.hypot(px - (segment.x1 + t * dx), py - (segment.y1 + t * dy));
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function Readout({ label, value, note, rgb }: { label: string; value: string; note: string; rgb: string }) {
  return <div className="rounded-[15px] border border-white/[0.06] bg-black/[0.08] p-3"><div className="font-mono text-[10px] uppercase tracking-[0.06em] text-slate-500">{label}</div><div className="mt-1 text-[20px] font-semibold" style={{ color: `rgb(${rgb})` }}>{value}</div><p className="mt-1 text-[11px] leading-4 text-slate-500">{note}</p></div>;
}
