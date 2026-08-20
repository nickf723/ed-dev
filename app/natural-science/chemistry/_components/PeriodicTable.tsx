"use client";

import { useCallback, useEffect, useState } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { fetchPeriodicTable, type APIElement } from "./chemistry-api";

const CATEGORY_COLORS: Record<string, string> = {
  "diatomic nonmetal": "border-emerald-400/45 text-emerald-200",
  "polyatomic nonmetal": "border-emerald-400/45 text-emerald-200",
  "noble gas": "border-cyan-400/45 text-cyan-200",
  "alkali metal": "border-rose-400/45 text-rose-200",
  "alkaline earth metal": "border-orange-400/45 text-orange-200",
  metalloid: "border-yellow-400/45 text-yellow-200",
  "post-transition metal": "border-sky-400/45 text-sky-200",
  "transition metal": "border-indigo-400/45 text-indigo-200",
  lanthanide: "border-purple-400/45 text-purple-200",
  actinide: "border-fuchsia-400/45 text-fuchsia-200",
};

export default function PeriodicTable({
  onSelect,
  activeZ,
}: {
  onSelect: (element: APIElement) => void;
  activeZ: number;
}) {
  const [elements, setElements] = useState<APIElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const data = await fetchPeriodicTable();
    if (!data.length) setError("The live periodic-table source did not respond.");
    setElements(data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  if (isLoading) {
    return (
      <div className="flex min-h-[430px] w-full flex-col items-center justify-center">
        <RefreshCw size={30} className="mb-4 animate-spin text-emerald-300" />
        <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.13em] text-slate-400">
          Loading elemental records
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[430px] flex-col items-center justify-center rounded-[20px] border border-amber-200/[0.12] bg-amber-300/[0.025] p-8 text-center">
        <AlertTriangle size={30} className="text-amber-200/72" />
        <strong className="mt-4 text-[16px] text-white">Periodic data is temporarily unavailable.</strong>
        <p className="mt-2 max-w-md text-[14px] leading-6 text-slate-400">{error}</p>
        <button
          type="button"
          onClick={() => void load()}
          className="mt-5 inline-flex items-center gap-2 rounded-[12px] border border-white/[0.09] bg-white/[0.03] px-4 py-2.5 text-[13px] font-medium text-slate-200 transition hover:bg-white/[0.07]"
        >
          <RefreshCw size={14} /> Retry
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-x-auto pb-4">
      <div
        className="grid min-w-[1120px] gap-1.5"
        style={{
          gridTemplateColumns: "repeat(18, minmax(48px, 1fr))",
          gridTemplateRows: "repeat(10, minmax(48px, 1fr))",
        }}
      >
        {elements.map((element) => {
          const tone = CATEGORY_COLORS[element.category] ?? "border-slate-500/35 text-slate-300";
          const active = activeZ === element.number;
          return (
            <button
              key={element.number}
              type="button"
              onClick={() => onSelect(element)}
              aria-label={`${element.name}, atomic number ${element.number}`}
              className={`group relative aspect-square rounded-[9px] border bg-black/[0.28] p-1.5 text-left transition hover:z-10 hover:-translate-y-0.5 hover:scale-[1.08] hover:bg-black/[0.48] ${tone} ${
                active ? "z-10 scale-[1.06] ring-2 ring-white/70 bg-white/[0.08]" : ""
              }`}
              style={{ gridColumn: element.xpos, gridRow: element.ypos }}
            >
              <span className="block font-mono text-[11px] leading-none text-white/48">
                {element.number}
              </span>
              <span className="mt-1 block text-center text-[16px] font-semibold leading-none">
                {element.symbol}
              </span>
              <span className="mt-1 hidden truncate text-center text-[11px] leading-none text-white/44 2xl:block">
                {element.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
