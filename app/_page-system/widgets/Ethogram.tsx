"use client";

import { Check, CircleDashed, TimerReset } from "lucide-react";
import type { ReactNode } from "react";

export type EthogramEntry = {
  id: string;
  start: number;
  end: number;
  actor: string;
  behavior: string;
  expectedCode: string;
};

export default function Ethogram({
  entries,
  codes,
  assignments,
  onAssign,
}: {
  entries: EthogramEntry[];
  codes: string[];
  assignments: Record<string, string | undefined>;
  onAssign?: (entryId: string, code: string) => void;
}) {
  const coded = entries.filter((entry) => assignments[entry.id]).length;
  const correct = entries.filter((entry) => assignments[entry.id] === entry.expectedCode).length;

  return (
    <div className="overflow-hidden rounded-[24px] border border-white/[0.08] bg-black/[0.18] backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] px-4 py-3.5">
        <div className="flex items-center gap-2 font-mono text-[8px] font-semibold uppercase tracking-[0.13em] text-violet-100/60">
          <TimerReset size={11} /> observation ethogram
        </div>
        <div className="font-mono text-[8px] uppercase tracking-[0.1em] text-slate-600">
          {coded}/{entries.length} coded · <span className="text-emerald-300/65">{correct} matched</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-[760px] w-full border-collapse text-left">
          <thead>
            <tr>
              <Head>time</Head><Head>actor</Head><Head>observation</Head><Head>your code</Head><Head>check</Head>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => {
              const assigned = assignments[entry.id];
              const correctAssignment = assigned === entry.expectedCode;
              return (
                <tr key={entry.id}>
                  <Cell><span className="font-mono text-[8px] text-slate-600">{entry.start}–{entry.end}s</span></Cell>
                  <Cell><span className="text-[9px] text-slate-400">{entry.actor}</span></Cell>
                  <Cell><span className="text-[9px] leading-4 text-slate-400">{entry.behavior}</span></Cell>
                  <Cell>
                    <select
                      value={assigned ?? ""}
                      onChange={(event) => onAssign?.(entry.id, event.target.value)}
                      className="h-8 min-w-[130px] rounded-[9px] border border-white/[0.07] bg-black/25 px-2 text-[8px] text-slate-400 outline-none"
                    >
                      <option value="">Choose code…</option>
                      {codes.map((code) => <option key={code} value={code}>{code}</option>)}
                    </select>
                  </Cell>
                  <Cell>
                    {assigned ? (
                      <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full border ${correctAssignment ? "border-emerald-300/[0.18] bg-emerald-400/[0.05] text-emerald-200" : "border-amber-300/[0.16] bg-amber-400/[0.04] text-amber-200"}`}>
                        {correctAssignment ? <Check size={11} /> : <CircleDashed size={11} />}
                      </span>
                    ) : <span className="text-slate-800">—</span>}
                  </Cell>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Head({ children }: { children: ReactNode }) {
  return <th className="border-b border-r border-white/[0.07] bg-white/[0.018] px-4 py-3 font-mono text-[7px] uppercase tracking-[0.12em] text-slate-700 last:border-r-0">{children}</th>;
}
function Cell({ children }: { children: ReactNode }) {
  return <td className="border-b border-r border-white/[0.055] px-4 py-3 align-middle last:border-r-0">{children}</td>;
}
