"use client";

import { useMemo, useState } from "react";
import { Grid3X3, ImageIcon, Rows3 } from "lucide-react";
import type { CollectionMediaRecord } from "@/lib/collections/schema";

export default function GalleryWallTopology({
  records,
  selectedId,
  onSelect,
  accentRgb = "251, 146, 60",
}: {
  records: CollectionMediaRecord[];
  selectedId?: string;
  onSelect: (record: CollectionMediaRecord) => void;
  accentRgb?: string;
}) {
  const [layout, setLayout] = useState<"salon" | "catalog">("salon");
  const departments = useMemo(
    () => Array.from(new Set(records.map((record) => String(record.facts.department ?? "Collection")).filter(Boolean))),
    [records],
  );

  return (
    <div className="overflow-hidden rounded-[30px] border border-white/[0.08] bg-[#0c0908]/[0.70] shadow-[0_32px_110px_rgba(0,0,0,0.28)] backdrop-blur-xl">
      <div className="flex flex-col gap-4 border-b border-white/[0.07] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div>
          <div className="flex items-center gap-2 font-mono text-[8px] font-semibold uppercase tracking-[0.14em]" style={{ color: `rgba(${accentRgb},0.68)` }}><ImageIcon size={12} /> Gallery surface</div>
          <div className="mt-1 text-[13px] font-medium text-stone-300">{records.length} objects · {departments.length || 1} collection context{departments.length === 1 ? "" : "s"}</div>
        </div>
        <div className="flex gap-1 rounded-full border border-white/[0.07] bg-black/20 p-1">
          <button type="button" onClick={() => setLayout("salon")} className={`flex items-center gap-1.5 rounded-full px-3 py-2 font-mono text-[7px] uppercase tracking-[0.08em] ${layout === "salon" ? "bg-white/[0.07] text-white" : "text-stone-600"}`}><Grid3X3 size={11} /> salon wall</button>
          <button type="button" onClick={() => setLayout("catalog")} className={`flex items-center gap-1.5 rounded-full px-3 py-2 font-mono text-[7px] uppercase tracking-[0.08em] ${layout === "catalog" ? "bg-white/[0.07] text-white" : "text-stone-600"}`}><Rows3 size={11} /> catalog</button>
        </div>
      </div>

      {layout === "salon" ? (
        <div className="columns-1 gap-4 p-4 sm:columns-2 lg:columns-3 xl:columns-4 sm:p-5">
          {records.map((record, index) => (
            <ArtworkFrame
              key={record.id}
              record={record}
              index={index}
              active={selectedId === record.id}
              accentRgb={accentRgb}
              onSelect={onSelect}
            />
          ))}
        </div>
      ) : (
        <div className="divide-y divide-white/[0.06] p-4 sm:p-5">
          {records.map((record) => (
            <button key={record.id} type="button" onClick={() => onSelect(record)} className={`grid w-full gap-4 py-4 text-left transition sm:grid-cols-[84px_minmax(0,1fr)_120px] sm:items-center ${selectedId === record.id ? "bg-white/[0.02]" : "hover:bg-white/[0.012]"}`}>
              <div className="h-20 w-20 overflow-hidden rounded-[8px] border border-white/[0.08] bg-[#19120f]">
                {record.imageUrl ? <img src={record.imageUrl} alt="" className="h-full w-full object-cover" referrerPolicy="no-referrer" onError={(event) => { event.currentTarget.style.display = "none"; }} /> : null}
              </div>
              <div className="min-w-0"><strong className="block text-[11px] text-stone-200">{record.title}</strong><span className="mt-1 block truncate text-[9px] text-stone-600">{record.primaryCreator ?? record.subtitle}</span><p className="mt-2 line-clamp-2 text-[8px] leading-4 text-stone-700">{record.description}</p></div>
              <div className="font-mono text-[8px] text-stone-700 sm:text-right"><div>{record.year ?? "undated"}</div><div className="mt-1 truncate">{String(record.facts.medium ?? record.facts.objectName ?? "")}</div></div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ArtworkFrame({
  record,
  index,
  active,
  accentRgb,
  onSelect,
}: {
  record: CollectionMediaRecord;
  index: number;
  active: boolean;
  accentRgb: string;
  onSelect: (record: CollectionMediaRecord) => void;
}) {
  const mat = index % 3 === 0 ? "p-3" : index % 3 === 1 ? "p-2" : "p-4";
  return (
    <button type="button" onClick={() => onSelect(record)} className="group mb-4 block w-full break-inside-avoid text-left transition hover:-translate-y-1">
      <div className={`rounded-[7px] border bg-[#17110e] ${mat}`} style={{ borderColor: active ? `rgba(${accentRgb},0.38)` : "rgba(255,255,255,0.09)", boxShadow: active ? `0 0 42px rgba(${accentRgb},0.11),0 18px 48px rgba(0,0,0,0.32)` : "0 16px 40px rgba(0,0,0,0.26)" }}>
        <div className="relative min-h-[170px] overflow-hidden border border-black/40 bg-[linear-gradient(145deg,#241a14,#0b0908)]">
          {record.imageUrl ? <img src={record.imageUrl} alt="" className="h-auto max-h-[460px] w-full object-contain transition duration-500 group-hover:scale-[1.015]" referrerPolicy="no-referrer" onError={(event) => { event.currentTarget.style.display = "none"; }} /> : <div className="flex h-48 items-center justify-center"><ImageIcon size={28} className="text-stone-800" /></div>}
        </div>
      </div>
      <div className="mx-2 mt-2 border-l border-white/[0.07] pl-3">
        <strong className="line-clamp-2 block text-[10px] leading-4 text-stone-300">{record.title}</strong>
        <span className="mt-1 block truncate font-serif text-[8px] italic text-stone-600">{record.primaryCreator ?? "Unknown maker"}{record.year ? ` · ${record.year}` : ""}</span>
      </div>
    </button>
  );
}
