"use client";

import { Plus } from "lucide-react";
import type { FoundryPageBrief } from "@/lib/page-foundry/schema";
import { Panel } from "./FoundryFields";

export default function FoundryQueueRail({
  items,
  selectedId,
  metrics,
  onSelect,
  onAdd,
}: {
  items: FoundryPageBrief[];
  selectedId: string;
  metrics: { queued: number; active: number; complete: number; blocked: number };
  onSelect: (id: string) => void;
  onAdd: () => void;
}) {
  return (
    <aside className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <Metric label="Queued" value={metrics.queued} tone="251, 191, 36" />
        <Metric label="Active" value={metrics.active} tone="34, 211, 238" />
        <Metric label="Complete" value={metrics.complete} tone="52, 211, 153" />
        <Metric label="Blocked" value={metrics.blocked} tone="248, 113, 113" />
      </div>
      <Panel title="Production queue" note={`${items.length} briefs`}>
        <div className="space-y-2">
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              className={`w-full rounded-[12px] border p-3 text-left transition ${
                selectedId === item.id
                  ? "border-amber-300/20 bg-amber-400/[0.055]"
                  : "border-white/[0.06] bg-black/20 hover:bg-white/[0.025]"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[7px] text-slate-700">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="rounded-full border border-white/[0.07] bg-white/[0.025] px-2 py-1 font-mono text-[7px] uppercase tracking-[0.08em] text-slate-500">
                  {item.status}
                </span>
              </div>
              <strong className="mt-2 block text-[11px] text-white">{item.title}</strong>
              <span className="mt-1 block truncate text-[8px] text-slate-600">{item.route}</span>
              {item.blockers.length ? (
                <span className="mt-2 block text-[8px] text-red-300/70">
                  {item.blockers.length} blocker{item.blockers.length === 1 ? "" : "s"}
                </span>
              ) : null}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-[10px] border border-dashed border-white/[0.09] text-[9px] text-slate-500"
        >
          <Plus size={12} /> Add page brief
        </button>
      </Panel>
    </aside>
  );
}

function Metric({ label, value, tone }: { label: string; value: number; tone: string }) {
  return (
    <div className="rounded-[13px] border border-white/[0.06] bg-black/20 p-3">
      <div className="font-mono text-[18px] font-semibold" style={{ color: `rgb(${tone})` }}>
        {value}
      </div>
      <div className="mt-1 font-mono text-[7px] uppercase tracking-[0.1em] text-slate-700">
        {label}
      </div>
    </div>
  );
}
