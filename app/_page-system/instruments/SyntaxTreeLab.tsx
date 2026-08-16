"use client";

import { useMemo, useState } from "react";
import { Braces, ChevronDown, GitBranch, MousePointer2 } from "lucide-react";

type TreeNode = {
  id: string;
  label: string;
  gloss: string;
  children?: TreeNode[];
};

type Example = {
  id: string;
  sentence: string;
  tree: TreeNode;
};

const EXAMPLES: Example[] = [
  {
    id: "simple",
    sentence: "The fox crossed the road.",
    tree: {
      id: "s",
      label: "S",
      gloss: "sentence",
      children: [
        { id: "np-subj", label: "NP", gloss: "subject noun phrase", children: [{ id: "det1", label: "Det", gloss: "the" }, { id: "n1", label: "N", gloss: "fox" }] },
        { id: "vp", label: "VP", gloss: "verb phrase", children: [{ id: "v", label: "V", gloss: "crossed" }, { id: "np-obj", label: "NP", gloss: "object noun phrase", children: [{ id: "det2", label: "Det", gloss: "the" }, { id: "n2", label: "N", gloss: "road" }] }] },
      ],
    },
  },
  {
    id: "modifier",
    sentence: "The curious fox crossed the quiet road.",
    tree: {
      id: "s",
      label: "S",
      gloss: "sentence",
      children: [
        { id: "np-subj", label: "NP", gloss: "subject noun phrase", children: [{ id: "det1", label: "Det", gloss: "the" }, { id: "adj1", label: "Adj", gloss: "curious" }, { id: "n1", label: "N", gloss: "fox" }] },
        { id: "vp", label: "VP", gloss: "verb phrase", children: [{ id: "v", label: "V", gloss: "crossed" }, { id: "np-obj", label: "NP", gloss: "object noun phrase", children: [{ id: "det2", label: "Det", gloss: "the" }, { id: "adj2", label: "Adj", gloss: "quiet" }, { id: "n2", label: "N", gloss: "road" }] }] },
      ],
    },
  },
  {
    id: "embedded",
    sentence: "The book on the table fell.",
    tree: {
      id: "s",
      label: "S",
      gloss: "sentence",
      children: [
        { id: "np-subj", label: "NP", gloss: "subject noun phrase", children: [{ id: "det1", label: "Det", gloss: "the" }, { id: "n1", label: "N", gloss: "book" }, { id: "pp", label: "PP", gloss: "prepositional phrase", children: [{ id: "p", label: "P", gloss: "on" }, { id: "np-inner", label: "NP", gloss: "noun phrase", children: [{ id: "det2", label: "Det", gloss: "the" }, { id: "n2", label: "N", gloss: "table" }] }] }] },
        { id: "vp", label: "VP", gloss: "verb phrase", children: [{ id: "v", label: "V", gloss: "fell" }] },
      ],
    },
  },
];

export default function SyntaxTreeLab() {
  const [exampleId, setExampleId] = useState(EXAMPLES[0].id);
  const [selectedId, setSelectedId] = useState("s");
  const [collapsed, setCollapsed] = useState<string[]>([]);
  const example = EXAMPLES.find((item) => item.id === exampleId) ?? EXAMPLES[0];
  const flat = useMemo(() => flatten(example.tree), [example]);
  const selected = flat.find((item) => item.id === selectedId) ?? example.tree;

  function chooseExample(id: string) {
    setExampleId(id);
    setSelectedId("s");
    setCollapsed([]);
  }

  return (
    <div className="overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/[0.14] backdrop-blur-xl">
      <div className="grid gap-4 border-b border-white/[0.07] p-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end sm:p-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-lime-200/70"><GitBranch size={12} /> Constituency tree</div>
          <h2 className="mt-2 text-[22px] font-semibold tracking-[-0.035em] text-white">A sentence is hierarchical, not merely a row of words.</h2>
          <p className="mt-2 max-w-3xl text-[10px] leading-5 text-slate-500">Words form constituents that behave as units. The tree makes grouping explicit, so the same linear sequence can be analyzed in terms of nested phrases and grammatical relationships.</p>
        </div>
        <select value={example.id} onChange={(event) => chooseExample(event.target.value)} className="h-10 rounded-[12px] border border-white/[0.08] bg-black/25 px-3 text-[9px] text-slate-400 outline-none">
          {EXAMPLES.map((item) => <option key={item.id} value={item.id}>{item.sentence}</option>)}
        </select>
      </div>

      <div className="grid gap-4 p-5 xl:grid-cols-[minmax(0,1fr)_300px] sm:p-6">
        <div className="overflow-x-auto rounded-[22px] border border-white/[0.06] bg-[#030806]/72 p-5">
          <div className="min-w-[720px]">
            <div className="mb-6 text-center font-serif text-[17px] text-slate-300">{example.sentence}</div>
            <TreeLevel node={example.tree} selectedId={selectedId} collapsed={collapsed} onSelect={setSelectedId} onToggle={(id) => setCollapsed((current) => current.includes(id) ? current.filter((value) => value !== id) : [...current, id])} />
          </div>
        </div>

        <aside className="rounded-[22px] border border-white/[0.07] bg-white/[0.014] p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-[13px] border border-lime-200/[0.13] bg-lime-300/[0.035] text-lime-200/70"><Braces size={16} /></div>
          <div className="mt-4 font-mono text-[8px] uppercase tracking-[0.12em] text-lime-200/60">Selected constituent</div>
          <h3 className="mt-1 text-[26px] font-semibold text-white">{selected.label}</h3>
          <p className="mt-2 text-[10px] leading-5 text-slate-400">{selected.gloss}</p>
          <div className="mt-5 rounded-[15px] border border-white/[0.06] bg-black/[0.16] p-3 text-[8px] leading-4 text-slate-700"><MousePointer2 size={11} className="mb-2" />Click a node to inspect it. Collapse phrases to see that a multi-word constituent can function as one larger unit in the surrounding structure.</div>
        </aside>
      </div>
    </div>
  );
}

function TreeLevel({ node, selectedId, collapsed, onSelect, onToggle }: { node: TreeNode; selectedId: string; collapsed: string[]; onSelect: (id: string) => void; onToggle: (id: string) => void }) {
  const isCollapsed = collapsed.includes(node.id);
  const hasChildren = Boolean(node.children?.length);
  return (
    <div className="flex flex-col items-center">
      <div className="relative flex items-center gap-1">
        <button type="button" onClick={() => onSelect(node.id)} className={`min-w-[48px] rounded-[11px] border px-2.5 py-2 text-center font-mono text-[9px] transition ${selectedId === node.id ? "border-lime-200/[0.28] bg-lime-300/[0.06] text-lime-100" : "border-white/[0.08] bg-black/20 text-slate-500 hover:text-white"}`}>{node.label}</button>
        {hasChildren ? <button type="button" onClick={() => onToggle(node.id)} aria-label={isCollapsed ? "Expand constituent" : "Collapse constituent"} className="flex h-7 w-7 items-center justify-center rounded-full text-slate-700 hover:bg-white/[0.03] hover:text-slate-300"><ChevronDown size={11} className={isCollapsed ? "-rotate-90" : ""} /></button> : null}
      </div>
      {hasChildren && !isCollapsed ? (
        <div className="relative mt-8 flex w-full items-start justify-center gap-6">
          <div className="absolute left-[10%] right-[10%] top-[-16px] h-px bg-white/[0.09]" />
          {node.children!.map((child) => (
            <div key={child.id} className="relative flex flex-1 justify-center">
              <div className="absolute left-1/2 top-[-16px] h-4 w-px -translate-x-1/2 bg-white/[0.09]" />
              <TreeLevel node={child} selectedId={selectedId} collapsed={collapsed} onSelect={onSelect} onToggle={onToggle} />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function flatten(root: TreeNode): TreeNode[] {
  return [root, ...(root.children?.flatMap(flatten) ?? [])];
}
