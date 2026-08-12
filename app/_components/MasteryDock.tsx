"use client";

import MasteryToggle from "@/app/_components/MasteryToggle";
import { usePagePolicyContext } from "@/app/_components/PagePolicyProvider";

export default function MasteryDock() {
  const { nodeId, nodeLabel, policy } = usePagePolicyContext();

  if (policy.masterySurface !== "global" || !nodeId) return null;

  return (
    <div className="fixed bottom-4 left-4 z-[65] flex items-center gap-3 rounded-2xl border border-white/10 bg-neutral-950/90 p-2.5 pl-3 shadow-[0_16px_45px_rgba(0,0,0,0.45)] backdrop-blur-xl md:bottom-5 md:left-auto md:right-5">
      <div className="hidden sm:block">
        <div className="text-[9px] font-black uppercase tracking-[0.18em] text-neutral-500">Mastery</div>
        <div className="max-w-32 truncate text-xs font-semibold text-neutral-200">{nodeLabel ?? nodeId}</div>
      </div>
      <MasteryToggle nodeId={nodeId} />
    </div>
  );
}
