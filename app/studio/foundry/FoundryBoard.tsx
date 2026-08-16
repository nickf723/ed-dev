"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Check,
  Clipboard,
  Copy,
  Hammer,
  Play,
  RotateCcw,
  Save,
  Trash2,
  type LucideIcon,
} from "lucide-react";
import type { FoundryPageBrief, PageFoundryQueue } from "@/lib/page-foundry/schema";
import FoundryBriefEditor from "./FoundryBriefEditor";
import FoundryQueueRail from "./FoundryQueueRail";
import FoundryRunPanel from "./FoundryRunPanel";
import { blankBrief, buildRunCommand, uniqueId } from "./foundry-utils";

const ACTIVE = new Set(["briefing", "building", "extracting", "validating"]);
const DONE = new Set(["committed", "review", "released"]);
type SaveState = "idle" | "saving" | "saved" | "error";

export default function FoundryBoard({ initialQueue }: { initialQueue: PageFoundryQueue }) {
  const [queue, setQueue] = useState(() => structuredClone(initialQueue));
  const [baseline, setBaseline] = useState(() => structuredClone(initialQueue));
  const [selectedId, setSelectedId] = useState(initialQueue.items[0]?.id ?? "");
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [message, setMessage] = useState("");
  const selected = queue.items.find((item) => item.id === selectedId);
  const dirty = JSON.stringify(queue) !== JSON.stringify(baseline);
  const metrics = useMemo(
    () => ({
      queued: queue.items.filter((item) => item.status === "queued").length,
      active: queue.items.filter((item) => ACTIVE.has(item.status)).length,
      complete: queue.items.filter((item) => DONE.has(item.status)).length,
      blocked: queue.items.filter((item) => item.status === "blocked").length,
    }),
    [queue.items],
  );

  useEffect(() => {
    function shortcut(event: KeyboardEvent) {
      if (!(event.ctrlKey || event.metaKey) || event.key.toLowerCase() !== "s") return;
      event.preventDefault();
      void save();
    }
    window.addEventListener("keydown", shortcut);
    return () => window.removeEventListener("keydown", shortcut);
  });

  useEffect(() => {
    function beforeUnload(event: BeforeUnloadEvent) {
      if (dirty) event.preventDefault();
    }
    window.addEventListener("beforeunload", beforeUnload);
    return () => window.removeEventListener("beforeunload", beforeUnload);
  }, [dirty]);

  function updateQueue(mutator: (next: PageFoundryQueue) => void) {
    setSaveState("idle");
    setMessage("");
    setQueue((current) => {
      const next = structuredClone(current);
      mutator(next);
      return next;
    });
  }

  function updateBrief(id: string, mutator: (brief: FoundryPageBrief) => void) {
    updateQueue((next) => {
      const brief = next.items.find((item) => item.id === id);
      if (brief) mutator(brief);
    });
  }

  async function save() {
    if (!dirty || saveState === "saving") return;
    setSaveState("saving");
    setMessage("Validating and saving the Foundry queue…");
    try {
      const response = await fetch("/api/studio/foundry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ queue }),
      });
      const payload = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !payload.ok) throw new Error(payload.error || "Unable to save Foundry queue");
      setBaseline(structuredClone(queue));
      setSaveState("saved");
      setMessage("Saved to content/page-foundry/queue.json");
    } catch (error) {
      setSaveState("error");
      setMessage(error instanceof Error ? error.message : "Save failed");
    }
  }

  function addBrief() {
    const id = uniqueId("new-page", queue.items.map((item) => item.id));
    updateQueue((next) => next.items.push(blankBrief(id)));
    setSelectedId(id);
  }

  function duplicateBrief() {
    if (!selected) return;
    const id = uniqueId(`${selected.id}-copy`, queue.items.map((item) => item.id));
    updateQueue((next) => {
      const index = next.items.findIndex((item) => item.id === selected.id);
      next.items.splice(index + 1, 0, {
        ...structuredClone(selected),
        id,
        title: `${selected.title} copy`,
        route: `${selected.route}-copy`,
        status: "queued",
        commit: undefined,
      });
    });
    setSelectedId(id);
  }

  function deleteBrief() {
    if (!selected || queue.items.length <= 1) return;
    if (!window.confirm(`Delete “${selected.title}” from the queue?`)) return;
    const index = queue.items.findIndex((item) => item.id === selected.id);
    updateQueue((next) => {
      next.items = next.items.filter((item) => item.id !== selected.id);
    });
    setSelectedId(queue.items[Math.max(0, index - 1)]?.id ?? "");
  }

  function move(direction: -1 | 1) {
    if (!selected) return;
    updateQueue((next) => {
      const index = next.items.findIndex((item) => item.id === selected.id);
      const target = index + direction;
      if (index < 0 || target < 0 || target >= next.items.length) return;
      const [item] = next.items.splice(index, 1);
      next.items.splice(target, 0, item);
    });
  }

  function prepareRun(count = queue.settings.batchSize) {
    const items = queue.items
      .filter((item) => item.status === "queued" && item.blockers.length === 0)
      .slice(0, count);
    if (!items.length) return setMessage("No unblocked queued pages are ready.");
    const command = buildRunCommand(queue, items);
    updateQueue((next) => {
      next.activeRun = {
        id: `run-${Date.now()}`,
        itemIds: items.map((item) => item.id),
        status: "prepared",
        preparedAt: new Date().toISOString(),
        command,
      };
    });
    void navigator.clipboard?.writeText(command);
    setMessage(`Prepared ${items.length} page${items.length === 1 ? "" : "s"}; command copied.`);
  }

  return (
    <main className="min-h-screen bg-[#07090d] text-slate-100">
      <header className="sticky top-0 z-30 border-b border-white/[0.08] bg-[#090c12]/90 px-5 py-4 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-[1720px] flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-amber-200/70">
              <Hammer size={13} /> Knowledge Studio · Page Foundry
            </div>
            <h1 className="mt-1 text-[24px] font-semibold tracking-[-0.04em] text-white">{queue.title}</h1>
            <p className="mt-1 max-w-3xl text-[10px] leading-5 text-slate-500">{queue.description}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Action icon={Play} label={`Prepare next ${queue.settings.batchSize}`} onClick={() => prepareRun()} />
            <Action icon={Clipboard} label="Copy command" onClick={() => queue.activeRun?.command && void navigator.clipboard?.writeText(queue.activeRun.command)} disabled={!queue.activeRun} />
            <Action icon={RotateCcw} label="Reset" onClick={() => { setQueue(structuredClone(baseline)); setMessage("Reset to saved queue."); }} disabled={!dirty} />
            <button type="button" onClick={() => void save()} disabled={!dirty || saveState === "saving"} className="inline-flex h-9 items-center gap-2 rounded-[10px] border border-cyan-300/20 bg-cyan-400/[0.07] px-3 text-[9px] font-semibold text-cyan-100 disabled:opacity-30">
              {saveState === "saved" && !dirty ? <Check size={12} /> : <Save size={12} />} Save queue
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1720px] gap-5 px-4 py-5 lg:grid-cols-[300px_minmax(0,1fr)] 2xl:grid-cols-[300px_minmax(0,1fr)_310px]">
        <FoundryQueueRail items={queue.items} selectedId={selectedId} metrics={metrics} onSelect={setSelectedId} onAdd={addBrief} />
        <section className="min-w-0">
          {selected ? (
            <>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-[14px] border border-white/[0.07] bg-white/[0.018] p-3">
                <div>
                  <strong className="text-[12px] text-white">{selected.title}</strong>
                  <span className="ml-2 font-mono text-[8px] text-slate-700">{selected.id}</span>
                </div>
                <div className="flex gap-1">
                  <IconAction label="Move up" icon={ArrowUp} onClick={() => move(-1)} />
                  <IconAction label="Move down" icon={ArrowDown} onClick={() => move(1)} />
                  <IconAction label="Duplicate" icon={Copy} onClick={duplicateBrief} />
                  <IconAction label="Delete" icon={Trash2} onClick={deleteBrief} danger />
                </div>
              </div>
              <FoundryBriefEditor brief={selected} update={(mutator) => updateBrief(selected.id, mutator)} />
            </>
          ) : null}
        </section>
        <FoundryRunPanel queue={queue} message={message} error={saveState === "error"} update={updateQueue} prepareRun={prepareRun} />
      </div>
    </main>
  );
}

function Action({ icon: Icon, label, onClick, disabled }: { icon: LucideIcon; label: string; onClick: () => void; disabled?: boolean }) {
  return <button type="button" onClick={onClick} disabled={disabled} className="inline-flex h-9 items-center gap-2 rounded-[10px] border border-white/[0.07] bg-white/[0.02] px-3 text-[9px] text-slate-500 hover:text-white disabled:opacity-30"><Icon size={12} />{label}</button>;
}
function IconAction({ icon: Icon, label, onClick, danger }: { icon: LucideIcon; label: string; onClick: () => void; danger?: boolean }) {
  return <button type="button" title={label} aria-label={label} onClick={onClick} className={`flex h-8 w-8 items-center justify-center rounded-[8px] border ${danger ? "border-red-300/10 text-red-300/55" : "border-white/[0.07] text-slate-600 hover:text-white"}`}><Icon size={12} /></button>;
}
