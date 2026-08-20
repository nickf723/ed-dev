"use client";

import { useMemo, useState } from "react";
import {
  ArrowDownUp,
  Building2,
  Coins,
  Factory,
  Globe2,
  Landmark,
  Users,
  type LucideIcon,
} from "lucide-react";

export type ResourceFlowMode = "micro" | "macro" | "policy";

type NodeId = "households" | "firms" | "government" | "world";

type FlowNode = {
  id: NodeId;
  label: string;
  subtitle: string;
  icon: LucideIcon;
  rgb: string;
};

type Flow = {
  from: NodeId;
  to: NodeId;
  label: string;
  micro: string;
  macro: string;
  policy: string;
  rgb: string;
};

const NODES: FlowNode[] = [
  { id: "households", label: "Households", subtitle: "people · labor · consumption · saving", icon: Users, rgb: "34, 197, 94" },
  { id: "firms", label: "Firms", subtitle: "production · hiring · investment · prices", icon: Factory, rgb: "59, 130, 246" },
  { id: "government", label: "Government", subtitle: "taxes · spending · rules · transfers", icon: Landmark, rgb: "250, 204, 21" },
  { id: "world", label: "Rest of world", subtitle: "trade · capital · exchange · migration", icon: Globe2, rgb: "139, 92, 246" },
];

const FLOWS: Flow[] = [
  {
    from: "households",
    to: "firms",
    label: "Spending",
    micro: "Demand communicates willingness and ability to buy at different prices.",
    macro: "Consumption is a large component of aggregate expenditure.",
    policy: "Taxes, transfers, and interest rates can alter disposable income and spending.",
    rgb: "34, 197, 94",
  },
  {
    from: "firms",
    to: "households",
    label: "Income & goods",
    micro: "Firms hire labor, pay income, and supply goods and services.",
    macro: "Production creates income while employment links output to households.",
    policy: "Labor rules, subsidies, and public investment can change costs and hiring.",
    rgb: "59, 130, 246",
  },
  {
    from: "households",
    to: "government",
    label: "Taxes & votes",
    micro: "Rules and taxes change incentives facing individual choices.",
    macro: "Tax revenue finances public spending and changes aggregate demand.",
    policy: "Political institutions determine who pays, who receives, and which goals matter.",
    rgb: "250, 204, 21",
  },
  {
    from: "government",
    to: "firms",
    label: "Contracts & rules",
    micro: "Standards, taxes, and subsidies reshape firm costs and market entry.",
    macro: "Government purchases and regulation affect output, investment, and employment.",
    policy: "Policy tries to alter outcomes when markets or institutions produce unwanted results.",
    rgb: "245, 158, 11",
  },
  {
    from: "firms",
    to: "world",
    label: "Trade & capital",
    micro: "Firms compare domestic and foreign prices, suppliers, and customers.",
    macro: "Exports, imports, exchange rates, and capital flows connect national economies.",
    policy: "Tariffs, quotas, capital rules, and treaties redistribute gains and losses.",
    rgb: "139, 92, 246",
  },
  {
    from: "world",
    to: "households",
    label: "Imports & remittances",
    micro: "Consumers gain new choices while local producers face new competition.",
    macro: "Trade balances and cross-border income affect national accounts.",
    policy: "Migration, exchange rates, and trade agreements change household opportunities.",
    rgb: "20, 184, 166",
  },
];

export default function ResourceFlowTopology() {
  const [mode, setMode] = useState<ResourceFlowMode>("micro");
  const [selectedFlow, setSelectedFlow] = useState(FLOWS[0]);
  const nodeMap = useMemo(() => new Map(NODES.map((node) => [node.id, node])), []);

  return (
    <div className="overflow-hidden rounded-[30px] border border-white/[0.09] bg-black/[0.14] shadow-[0_32px_110px_rgba(0,0,0,0.24)] backdrop-blur-xl">
      <div className="grid gap-5 border-b border-white/[0.07] p-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end sm:p-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-emerald-200/70">
            <ArrowDownUp size={12} /> One economy · different scales
          </div>
          <h2 className="mt-2 text-[clamp(1.8rem,3vw,2.8rem)] font-semibold tracking-[-0.045em] text-white">
            Economics follows choices through a connected flow of resources, income, and institutions.
          </h2>
          <p className="mt-3 max-w-3xl text-[11px] leading-5 text-slate-400">
            Microeconomics zooms into individual decisions and markets. Macroeconomics zooms out to totals and feedback across the whole system. Policy asks how institutions change the flow.
          </p>
        </div>
        <div className="flex gap-2 rounded-full border border-white/[0.07] bg-black/20 p-1">
          {(["micro", "macro", "policy"] as ResourceFlowMode[]).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setMode(item)}
              className={`rounded-full px-3 py-2 font-mono text-[8px] uppercase tracking-[0.1em] transition ${
                mode === item ? "bg-white/[0.08] text-white" : "text-slate-600 hover:text-slate-300"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 p-5 xl:grid-cols-[minmax(0,1fr)_340px] sm:p-6">
        <div className="relative min-h-[540px] overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#050b09]/72">
          <div
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                "linear-gradient(rgba(34,197,94,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.04) 1px,transparent 1px)",
              backgroundSize: "52px 52px",
            }}
          />

          <svg viewBox="0 0 820 540" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
            {FLOWS.map((flow, index) => {
              const path = flowPath(flow.from, flow.to);
              const active = selectedFlow.label === flow.label;
              return (
                <g key={`${flow.from}-${flow.to}`}>
                  <path
                    d={path}
                    fill="none"
                    stroke={`rgba(${flow.rgb},${active ? 0.5 : 0.13})`}
                    strokeWidth={active ? 3 : 1.4}
                    strokeDasharray={active ? undefined : "4 8"}
                  />
                  <circle r={active ? 5 : 3.5} fill={`rgba(${flow.rgb},${active ? 0.95 : 0.5})`}>
                    <animateMotion dur={`${6 + index * 0.8}s`} repeatCount="indefinite" path={path} />
                  </circle>
                </g>
              );
            })}
          </svg>

          {NODES.map((node) => {
            const Icon = node.icon;
            const pos = nodePosition(node.id);
            return (
              <div
                key={node.id}
                className="absolute w-[210px] -translate-x-1/2 -translate-y-1/2 rounded-[22px] border bg-black/[0.50] p-4 shadow-[0_18px_65px_rgba(0,0,0,0.28)] backdrop-blur-lg"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  borderColor: `rgba(${node.rgb},0.2)`,
                  boxShadow: `0 18px 65px rgba(0,0,0,.28),0 0 38px rgba(${node.rgb},0.06)`,
                }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-[13px] border"
                    style={{ color: `rgb(${node.rgb})`, borderColor: `rgba(${node.rgb},0.22)`, background: `rgba(${node.rgb},0.055)` }}
                  >
                    <Icon size={16} />
                  </span>
                  <div>
                    <strong className="block text-[12px] text-white">{node.label}</strong>
                    <span className="mt-1 block font-mono text-[7px] uppercase tracking-[0.08em] text-slate-700">{node.subtitle}</span>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="absolute inset-x-3 bottom-3 grid grid-cols-2 gap-2 md:grid-cols-3">
            {FLOWS.map((flow) => (
              <button
                key={`${flow.from}-${flow.to}`}
                type="button"
                onClick={() => setSelectedFlow(flow)}
                className={`rounded-[12px] border px-3 py-2 text-left transition ${
                  selectedFlow.label === flow.label ? "bg-white/[0.06]" : "bg-black/[0.24] hover:bg-white/[0.025]"
                }`}
                style={{ borderColor: `rgba(${flow.rgb},${selectedFlow.label === flow.label ? 0.24 : 0.08})` }}
              >
                <span className="font-mono text-[7px] uppercase tracking-[0.09em]" style={{ color: `rgba(${flow.rgb},0.72)` }}>
                  {nodeMap.get(flow.from)?.label} → {nodeMap.get(flow.to)?.label}
                </span>
                <strong className="mt-1 block text-[9px] text-slate-300">{flow.label}</strong>
              </button>
            ))}
          </div>
        </div>

        <aside className="rounded-[24px] border border-white/[0.07] bg-white/[0.016] p-5">
          <div className="font-mono text-[8px] font-semibold uppercase tracking-[0.14em] text-slate-600">Selected flow</div>
          <h3 className="mt-2 text-[22px] font-semibold tracking-[-0.035em] text-white">{selectedFlow.label}</h3>
          <div className="mt-4 flex items-center gap-2 text-[9px] text-slate-500">
            <span className="rounded-full border border-white/[0.07] px-2.5 py-1">{nodeMap.get(selectedFlow.from)?.label}</span>
            <ArrowDownUp size={12} className="rotate-90 text-slate-700" />
            <span className="rounded-full border border-white/[0.07] px-2.5 py-1">{nodeMap.get(selectedFlow.to)?.label}</span>
          </div>
          <div className="mt-6 rounded-[18px] border border-white/[0.07] bg-black/[0.2] p-4">
            <div className="font-mono text-[8px] uppercase tracking-[0.11em] text-emerald-200/65">{mode} view</div>
            <p className="mt-2 text-[11px] leading-6 text-slate-400">{selectedFlow[mode]}</p>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-2">
            <TinyMetric icon={Coins} label="Money" text="Prices coordinate exchange." />
            <TinyMetric icon={Building2} label="Institutions" text="Rules shape incentives." />
          </div>
        </aside>
      </div>
    </div>
  );
}

function TinyMetric({ icon: Icon, label, text }: { icon: LucideIcon; label: string; text: string }) {
  return (
    <div className="rounded-[14px] border border-white/[0.06] bg-black/[0.17] p-3">
      <Icon size={13} className="text-slate-600" />
      <div className="mt-3 text-[9px] font-semibold text-slate-300">{label}</div>
      <p className="mt-1 text-[8px] leading-4 text-slate-700">{text}</p>
    </div>
  );
}

function nodePosition(id: NodeId) {
  if (id === "households") return { x: 22, y: 31 };
  if (id === "firms") return { x: 72, y: 31 };
  if (id === "government") return { x: 31, y: 67 };
  return { x: 69, y: 67 };
}

function flowPath(from: NodeId, to: NodeId) {
  const p = {
    households: [180, 165],
    firms: [590, 165],
    government: [255, 360],
    world: [565, 360],
  } as const;
  const [x1, y1] = p[from];
  const [x2, y2] = p[to];
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const curve = from === "households" && to === "firms" ? -55 : from === "firms" && to === "households" ? 55 : 0;
  return `M${x1} ${y1} Q${mx} ${my + curve} ${x2} ${y2}`;
}
