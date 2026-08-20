"use client";

import { useMemo, useState } from "react";
import { Compass, Eye, Layers3, ShieldCheck } from "lucide-react";
import { Surface } from "@/app/_page-system/scene";

type ScenarioKey = "patchwork" | "headroom" | "strained" | "managed";

type Scenario = {
  key: ScenarioKey;
  label: string;
  rgb: string;
  pressure: "lower" | "higher";
  coordination: "fragmented" | "coordinated";
  summary: string;
  assumptions: readonly string[];
  signals: readonly string[];
  stresses: readonly string[];
};

const SCENARIOS: readonly Scenario[] = [
  {
    key: "patchwork",
    label: "Comfortable Patchwork",
    rgb: "103,232,249",
    pressure: "lower",
    coordination: "fragmented",
    summary: "Resource pressure remains relatively manageable, but organizations and communities solve problems through loosely connected local systems rather than strong shared coordination.",
    assumptions: ["resource costs remain comparatively manageable", "local actors retain substantial autonomy", "shared standards develop slowly", "redundancy emerges unevenly"],
    signals: ["more local procurement", "incompatible infrastructure standards", "stable resource prices", "strong neighborhood-scale initiatives"],
    stresses: ["uneven service quality", "duplication", "coordination during cross-boundary disruptions"],
  },
  {
    key: "headroom",
    label: "Shared Headroom",
    rgb: "94,234,212",
    pressure: "lower",
    coordination: "coordinated",
    summary: "Moderate resource pressure combines with strong coordination, creating room for shared infrastructure, long-horizon planning, and deliberate investment choices.",
    assumptions: ["resource constraints ease or remain manageable", "institutions can coordinate across boundaries", "data and standards are broadly interoperable", "long-horizon projects retain support"],
    signals: ["shared procurement systems", "cross-jurisdiction infrastructure plans", "stable reserve margins", "longer investment horizons"],
    stresses: ["complacency", "centralized failure modes", "whose priorities define shared plans"],
  },
  {
    key: "strained",
    label: "Strained Patchwork",
    rgb: "248,113,113",
    pressure: "higher",
    coordination: "fragmented",
    summary: "High pressure on resources meets weak coordination. Local adaptation can be inventive, but shortages, unequal capacity, incompatible responses, and cascading failures become more consequential.",
    assumptions: ["resource costs or availability become volatile", "coordination remains limited", "local coping capacity varies widely", "short-term responses dominate"],
    signals: ["frequent emergency procurement", "service interruptions", "local substitution and repair cultures", "widening differences in system reliability"],
    stresses: ["cascading outages", "inequality in adaptive capacity", "competition for scarce inputs"],
  },
  {
    key: "managed",
    label: "Managed Constraint",
    rgb: "192,132,252",
    pressure: "higher",
    coordination: "coordinated",
    summary: "Resource pressure is high, but institutions coordinate strongly. The region emphasizes allocation, efficiency, shared contingency planning, and collective choices about priorities.",
    assumptions: ["resource pressure stays high", "coordination mechanisms remain legitimate enough to function", "shared monitoring is strong", "allocation rules become more explicit"],
    signals: ["common reserve standards", "demand-management programs", "coordinated rationing or prioritization protocols", "rapid cross-system data sharing"],
    stresses: ["legitimacy of allocation", "bureaucratic rigidity", "distribution of burdens and benefits"],
  },
] as const;

const ROBUST_MOVES = [
  "Maintain visibility into dependencies and changing conditions.",
  "Design critical systems with repair paths, redundancy, and graceful failure.",
  "Keep plans revisable when assumptions fail instead of locking every decision to one forecast.",
  "Include people affected by decisions when defining priorities, tradeoffs, and acceptable risk.",
] as const;

export default function ScenarioMatrixLab() {
  const [scenarioKey, setScenarioKey] = useState<ScenarioKey>("managed");
  const scenario = useMemo(() => SCENARIOS.find((item) => item.key === scenarioKey) ?? SCENARIOS[3], [scenarioKey]);

  return (
    <Surface variant="glass" className="overflow-hidden rounded-[28px] border-cyan-100/[0.12]" style={{ background: "rgba(7,16,25,0.21)" }}>
      <div className="grid border-b border-white/[0.07] lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-cyan-200/66"><Compass size={14} /> Scenario planning · fictional case</div>
          <h3 className="mt-2 text-[clamp(1.7rem,2.9vw,2.65rem)] font-semibold tracking-[-0.045em] text-white">Four futures. Zero pretend probabilities.</h3>
          <p className="mt-3 max-w-3xl text-[14px] leading-6 text-slate-300/78">Imagine a fictional metropolitan region planning for 2045. Two critical uncertainties are held apart: future resource pressure and future coordination capacity. The matrix explores combinations of those uncertainties. It does not predict which quadrant will occur.</p>
        </div>
        <div className="border-t border-white/[0.07] bg-black/[0.06] p-5 backdrop-blur-[10px] lg:border-l lg:border-t-0">
          <span className="font-mono text-[10px] uppercase tracking-[0.07em] text-slate-500">Selected scenario</span>
          <strong className="mt-2 block text-[19px]" style={{ color: `rgba(${scenario.rgb},0.90)` }}>{scenario.label}</strong>
          <p className="mt-2 text-[12px] leading-5 text-slate-400">A scenario is useful when its assumptions are visible enough to question and its consequences are coherent enough to stress-test decisions.</p>
        </div>
      </div>

      <div className="grid gap-5 p-4 sm:p-5 xl:grid-cols-[minmax(360px,0.95fr)_minmax(0,1.2fr)_300px]">
        <div>
          <div className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-500">Critical uncertainties</div>
          <div className="relative aspect-square overflow-hidden border border-white/[0.07] bg-[#08111c]/48 p-10 backdrop-blur-[8px]">
            <div className="absolute inset-x-10 top-1/2 h-px bg-slate-300/15" />
            <div className="absolute inset-y-10 left-1/2 w-px bg-slate-300/15" />
            <span className="absolute left-1/2 top-3 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.05em] text-red-200/52">higher resource pressure</span>
            <span className="absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.05em] text-cyan-200/50">lower resource pressure</span>
            <span className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 font-mono text-[10px] uppercase tracking-[0.05em] text-amber-200/46">fragmented</span>
            <span className="absolute right-1 top-1/2 -translate-y-1/2 rotate-90 font-mono text-[10px] uppercase tracking-[0.05em] text-violet-200/50">coordinated</span>
            <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-2">
              <Quadrant scenario={SCENARIOS[2]} selected={scenarioKey === "strained"} onClick={() => setScenarioKey("strained")} />
              <Quadrant scenario={SCENARIOS[3]} selected={scenarioKey === "managed"} onClick={() => setScenarioKey("managed")} />
              <Quadrant scenario={SCENARIOS[0]} selected={scenarioKey === "patchwork"} onClick={() => setScenarioKey("patchwork")} />
              <Quadrant scenario={SCENARIOS[1]} selected={scenarioKey === "headroom"} onClick={() => setScenarioKey("headroom")} />
            </div>
          </div>
        </div>

        <div className="border border-white/[0.07] bg-black/[0.04] p-4 sm:p-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.07em]" style={{ color: `rgba(${scenario.rgb},0.68)` }}>{scenario.pressure} pressure · {scenario.coordination} coordination</span>
          <h4 className="mt-2 text-[24px] font-semibold tracking-[-0.035em] text-white">{scenario.label}</h4>
          <p className="mt-3 text-[14px] leading-6 text-slate-300/78">{scenario.summary}</p>
          <div className="mt-5 grid gap-3 lg:grid-cols-3">
            <EvidenceList icon={Layers3} title="Assumptions" items={scenario.assumptions} rgb={scenario.rgb} />
            <EvidenceList icon={Eye} title="Signals to watch" items={scenario.signals} rgb="103,232,249" />
            <EvidenceList icon={ShieldCheck} title="Stress points" items={scenario.stresses} rgb="248,113,113" />
          </div>
        </div>

        <aside className="xl:sticky xl:top-[172px] xl:self-start">
          <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-500">Robust across several futures</div>
          <div className="mt-3 divide-y divide-white/[0.06] border-y border-white/[0.07]">
            {ROBUST_MOVES.map((move, index) => <div key={move} className="grid grid-cols-[32px_minmax(0,1fr)] gap-2 py-3"><span className="font-mono text-[10px] text-cyan-200/48">0{index + 1}</span><p className="text-[12px] leading-5 text-slate-400">{move}</p></div>)}
          </div>
          <div className="mt-4 border-l-2 border-violet-300/28 bg-violet-300/[0.025] px-3 py-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.07em] text-violet-200/58">Method boundary</span>
            <p className="mt-2 text-[12px] leading-5 text-slate-400">Scenario planning is not a substitute for forecasting when reliable quantitative prediction is possible. It is especially useful when several important uncertainties interact and a decision should survive more than one plausible future.</p>
          </div>
        </aside>
      </div>
    </Surface>
  );
}

function Quadrant({ scenario, selected, onClick }: { scenario: Scenario; selected: boolean; onClick: () => void }) {
  return <button type="button" onClick={onClick} className="relative flex min-h-0 flex-col justify-end border p-3 text-left transition" style={{ borderColor: selected ? `rgba(${scenario.rgb},0.42)` : "rgba(255,255,255,0.055)", background: selected ? `rgba(${scenario.rgb},0.085)` : `rgba(${scenario.rgb},0.022)` }}><span className="font-mono text-[9px] uppercase tracking-[0.05em]" style={{ color: `rgba(${scenario.rgb},0.62)` }}>{scenario.pressure} / {scenario.coordination}</span><strong className="mt-1 text-[12px] leading-4 text-white/84">{scenario.label}</strong>{selected ? <span className="absolute right-2 top-2 h-2 w-2 rounded-full" style={{ background: `rgb(${scenario.rgb})`, boxShadow: `0 0 10px rgba(${scenario.rgb},0.42)` }} /> : null}</button>;
}

function EvidenceList({ icon: Icon, title, items, rgb }: { icon: typeof Layers3; title: string; items: readonly string[]; rgb: string }) {
  return <div className="border border-white/[0.06] bg-black/[0.035] p-3"><div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.05em]" style={{ color: `rgba(${rgb},0.66)` }}><Icon size={12} /> {title}</div><div className="mt-3 space-y-2">{items.map((item) => <div key={item} className="flex gap-2 text-[11px] leading-5 text-slate-400"><span style={{ color: `rgba(${rgb},0.52)` }}>•</span><span>{item}</span></div>)}</div></div>;
}
