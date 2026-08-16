"use client";

import { useState } from "react";
import { ArrowRight, Check, CornerDownRight, GitFork, MessageCircleQuestion, ShieldQuestion } from "lucide-react";

export type ArgumentNode = {
  id: string;
  type: "question" | "claim" | "reason" | "objection" | "reply";
  text: string;
  parentId?: string;
};

const DEFAULT_NODES: ArgumentNode[] = [
  { id: "q", type: "question", text: "When is a belief justified?" },
  { id: "c", type: "claim", text: "A justified belief should be supported by evidence the believer can responsibly rely on.", parentId: "q" },
  { id: "r1", type: "reason", text: "Evidence connects belief to features of the world rather than mere wish or guesswork.", parentId: "c" },
  { id: "r2", type: "reason", text: "Responsibility matters because two people can possess the same information but handle it differently.", parentId: "c" },
  { id: "o", type: "objection", text: "What about reliable beliefs formed without access to reasons, such as ordinary perception?", parentId: "c" },
  { id: "reply", type: "reply", text: "The claim may need to distinguish internal reasons from reliable belief-forming processes.", parentId: "o" },
];

export default function ArgumentMap({ nodes = DEFAULT_NODES }: { nodes?: ArgumentNode[] }) {
  const [selectedId, setSelectedId] = useState(nodes[0]?.id ?? "");
  const selected = nodes.find((node) => node.id === selectedId) ?? nodes[0];
  const roots = nodes.filter((node) => !node.parentId);

  return (
    <div className="overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/[0.13] backdrop-blur-xl">
      <div className="grid gap-4 border-b border-white/[0.07] p-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-end sm:p-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-amber-200/65"><GitFork size={12} /> Argument map</div>
          <h2 className="mt-2 text-[22px] font-semibold tracking-[-0.035em] text-white">A position is not the same thing as the reasons for it.</h2>
          <p className="mt-2 max-w-3xl text-[10px] leading-5 text-slate-500">Map the question, claim, support, objection, and reply separately. This makes disagreement inspectable: people may reject the conclusion, one premise, the inference, or the framing of the question.</p>
        </div>
        <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-slate-700">{nodes.length} nodes</span>
      </div>

      <div className="grid gap-4 p-5 xl:grid-cols-[minmax(0,1fr)_330px] sm:p-6">
        <div className="space-y-3 rounded-[22px] border border-white/[0.06] bg-[#08070d]/65 p-4">
          {roots.map((root) => <ArgumentBranch key={root.id} node={root} nodes={nodes} selectedId={selectedId} onSelect={setSelectedId} depth={0} />)}
        </div>
        {selected ? <Inspector node={selected} /> : null}
      </div>
    </div>
  );
}

function ArgumentBranch({ node, nodes, selectedId, onSelect, depth }: { node: ArgumentNode; nodes: ArgumentNode[]; selectedId: string; onSelect: (id: string) => void; depth: number }) {
  const children = nodes.filter((candidate) => candidate.parentId === node.id);
  const tone = nodeTone(node.type);
  const active = selectedId === node.id;
  return (
    <div className={depth ? "ml-6 border-l border-white/[0.06] pl-4" : ""}>
      <button type="button" onClick={() => onSelect(node.id)} className="group w-full rounded-[15px] border p-3 text-left transition hover:bg-white/[0.025]" style={{ borderColor: `rgba(${tone.rgb},${active ? 0.3 : 0.09})`, background: active ? `rgba(${tone.rgb},0.045)` : undefined }}>
        <div className="flex items-start gap-3">
          <tone.icon size={13} className="mt-0.5 shrink-0" style={{ color: `rgb(${tone.rgb})` }} />
          <div className="min-w-0 flex-1">
            <div className="font-mono text-[7px] uppercase tracking-[0.1em]" style={{ color: `rgba(${tone.rgb},0.62)` }}>{tone.label}</div>
            <p className="mt-1 text-[9px] leading-4 text-slate-400">{node.text}</p>
          </div>
          {children.length ? <CornerDownRight size={11} className="mt-1 text-slate-800" /> : null}
        </div>
      </button>
      {children.length ? <div className="mt-2 space-y-2">{children.map((child) => <ArgumentBranch key={child.id} node={child} nodes={nodes} selectedId={selectedId} onSelect={onSelect} depth={depth + 1} />)}</div> : null}
    </div>
  );
}

function Inspector({ node }: { node: ArgumentNode }) {
  const tone = nodeTone(node.type);
  const Icon = tone.icon;
  const prompts = {
    question: ["What would count as an answer?", "Is the question hiding an assumption?"],
    claim: ["Exactly what is being asserted?", "Would changing one word alter the position?"],
    reason: ["Does this support the claim?", "Is the premise independently plausible?"],
    objection: ["What does the objection target?", "Does it refute, qualify, or merely complicate the claim?"],
    reply: ["Does the reply answer the objection?", "Did the original position need revision?"],
  }[node.type];

  return (
    <aside className="rounded-[22px] border border-white/[0.07] bg-white/[0.014] p-5">
      <div className="flex h-11 w-11 items-center justify-center rounded-[14px] border" style={{ color: `rgb(${tone.rgb})`, borderColor: `rgba(${tone.rgb},0.2)`, background: `rgba(${tone.rgb},0.04)` }}><Icon size={17} /></div>
      <div className="mt-4 font-mono text-[8px] uppercase tracking-[0.12em]" style={{ color: `rgba(${tone.rgb},0.68)` }}>{tone.label}</div>
      <p className="mt-2 text-[12px] leading-6 text-slate-300">{node.text}</p>
      <div className="mt-5 space-y-2">
        {prompts.map((prompt) => <div key={prompt} className="flex gap-2 rounded-[13px] border border-white/[0.06] bg-black/[0.16] p-3 text-[8px] leading-4 text-slate-600"><ArrowRight size={10} className="mt-0.5 shrink-0 text-slate-800" />{prompt}</div>)}
      </div>
    </aside>
  );
}

function nodeTone(type: ArgumentNode["type"]) {
  if (type === "question") return { label: "Question", rgb: "34, 211, 238", icon: MessageCircleQuestion };
  if (type === "claim") return { label: "Claim", rgb: "251, 191, 36", icon: Check };
  if (type === "reason") return { label: "Reason", rgb: "52, 211, 153", icon: ArrowRight };
  if (type === "objection") return { label: "Objection", rgb: "248, 113, 113", icon: ShieldQuestion };
  return { label: "Reply / revision", rgb: "192, 132, 252", icon: CornerDownRight };
}
