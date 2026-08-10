"use client";

import { Check, LockKeyhole } from "lucide-react";
import { useSyncExternalStore } from "react";
import {
  isNodeMastered,
  isNodeUnlocked,
  setNodeMastered,
  subscribeToMastery,
} from "@/lib/progress/mastery";

export default function MasteryToggle({
  nodeId,
  className = "",
}: {
  nodeId: string;
  className?: string;
}) {
  const mastered = useSyncExternalStore(
    subscribeToMastery,
    () => isNodeMastered(nodeId),
    () => false,
  );
  const unlocked = useSyncExternalStore(
    subscribeToMastery,
    () => isNodeUnlocked(nodeId),
    () => true,
  );

  return (
    <button
      type="button"
      disabled={!unlocked && !mastered}
      aria-pressed={mastered}
      onClick={() => setNodeMastered(nodeId, !mastered)}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold transition-all ${
        mastered
          ? "border-emerald-400/40 bg-emerald-400/15 text-emerald-200"
          : unlocked
            ? "border-white/15 bg-white/5 text-slate-300 hover:border-white/30 hover:bg-white/10"
            : "cursor-not-allowed border-white/5 bg-white/[0.025] text-slate-600"
      } ${className}`}
    >
      {mastered ? <Check size={14} /> : unlocked ? <span className="h-2 w-2 rounded-full border border-current" /> : <LockKeyhole size={13} />}
      {mastered ? "Mastered" : unlocked ? "Mark as mastered" : "Prerequisites locked"}
    </button>
  );
}
