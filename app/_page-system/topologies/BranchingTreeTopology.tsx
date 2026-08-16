"use client";

import { GitBranch, Pin, PinOff } from "lucide-react";
import type { ReactNode } from "react";

export type BranchingTreeNode = {
  id: string;
  label: string;
  subtitle?: string;
  note?: string;
  accentRgb?: string;
  children?: BranchingTreeNode[];
};

export default function BranchingTreeTopology({
  root,
  maxDepth,
  selectedId,
  pinnedIds = [],
  onSelect,
  onPin,
}: {
  root: BranchingTreeNode;
  maxDepth: number;
  selectedId?: string;
  pinnedIds?: string[];
  onSelect?: (node: BranchingTreeNode) => void;
  onPin?: (node: BranchingTreeNode) => void;
}) {
  return (
    <div className="relative overflow-x-auto rounded-[30px] border border-white/[0.08] bg-black/[0.16] p-4 shadow-[0_34px_120px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:p-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_24%_46%,rgba(52,211,153,0.08),transparent_34%),radial-gradient(circle_at_78%_36%,rgba(34,211,238,0.05),transparent_30%)]" />
      <div className="relative min-w-[940px]">
        <TreeLevel
          node={root}
          depth={0}
          maxDepth={maxDepth}
          selectedId={selectedId}
          pinnedIds={pinnedIds}
          onSelect={onSelect}
          onPin={onPin}
        />
      </div>
    </div>
  );
}

function TreeLevel({
  node,
  depth,
  maxDepth,
  selectedId,
  pinnedIds,
  onSelect,
  onPin,
}: {
  node: BranchingTreeNode;
  depth: number;
  maxDepth: number;
  selectedId?: string;
  pinnedIds: string[];
  onSelect?: (node: BranchingTreeNode) => void;
  onPin?: (node: BranchingTreeNode) => void;
}) {
  const children = depth < maxDepth ? node.children ?? [] : [];
  const accent = node.accentRgb ?? "52, 211, 153";
  const selected = selectedId === node.id;
  const pinned = pinnedIds.includes(node.id);

  return (
    <div className="grid grid-cols-[210px_48px_minmax(0,1fr)] items-center gap-0 py-2">
      <NodeButton
        node={node}
        accent={accent}
        selected={selected}
        pinned={pinned}
        onSelect={onSelect}
        onPin={onPin}
      />

      {children.length ? (
        <div className="relative h-full min-h-[64px]">
          <div
            className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2"
            style={{ background: `linear-gradient(90deg, rgba(${accent},0.44), rgba(${accent},0.12))` }}
          />
          <div
            className="absolute right-0 top-[12%] bottom-[12%] w-px"
            style={{ background: `rgba(${accent},0.20)` }}
          />
          <span
            className="absolute left-1/2 top-1/2 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border bg-[#07100d]"
            style={{ color: `rgb(${accent})`, borderColor: `rgba(${accent},0.28)` }}
          >
            <GitBranch size={12} />
          </span>
        </div>
      ) : (
        <div />
      )}

      {children.length ? (
        <div className="space-y-1">
          {children.map((child) => (
            <TreeLevel
              key={child.id}
              node={child}
              depth={depth + 1}
              maxDepth={maxDepth}
              selectedId={selectedId}
              pinnedIds={pinnedIds}
              onSelect={onSelect}
              onPin={onPin}
            />
          ))}
        </div>
      ) : (
        <div className="font-mono text-[8px] uppercase tracking-[0.12em] text-slate-700">
          visible tip
        </div>
      )}
    </div>
  );
}

function NodeButton({
  node,
  accent,
  selected,
  pinned,
  onSelect,
  onPin,
}: {
  node: BranchingTreeNode;
  accent: string;
  selected: boolean;
  pinned: boolean;
  onSelect?: (node: BranchingTreeNode) => void;
  onPin?: (node: BranchingTreeNode) => void;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-[17px] border transition-all duration-300 ${selected ? "-translate-y-0.5" : ""}`}
      style={{
        borderColor: `rgba(${accent},${selected ? 0.42 : 0.16})`,
        background: selected
          ? `linear-gradient(135deg, rgba(${accent},0.15), rgba(4,12,9,0.92))`
          : `linear-gradient(135deg, rgba(${accent},0.045), rgba(3,9,7,0.80))`,
        boxShadow: selected ? `0 18px 50px rgba(${accent},0.10)` : undefined,
      }}
    >
      <button type="button" onClick={() => onSelect?.(node)} className="w-full px-4 py-3 pr-10 text-left">
        <strong className="block text-[11px] font-semibold text-white">{node.label}</strong>
        {node.subtitle ? (
          <span className="mt-1 block font-serif text-[9px] italic text-slate-500">{node.subtitle}</span>
        ) : null}
        {node.note ? (
          <span className="mt-2 block text-[8px] leading-4 text-slate-600">{node.note}</span>
        ) : null}
      </button>
      {onPin ? (
        <button
          type="button"
          title={pinned ? "Unpin lineage" : "Pin lineage for comparison"}
          onClick={() => onPin(node)}
          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-[9px] border border-white/[0.06] bg-black/20 text-slate-600 transition hover:text-white"
        >
          {pinned ? <PinOff size={11} /> : <Pin size={11} />}
        </button>
      ) : null}
    </div>
  );
}

export function BranchingTreeLegend({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-[18px] border border-white/[0.07] bg-black/[0.16] p-4 text-[10px] leading-5 text-slate-500 backdrop-blur-lg">
      {children}
    </div>
  );
}
