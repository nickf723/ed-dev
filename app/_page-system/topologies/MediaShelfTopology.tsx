"use client";

import { useMemo, useState } from "react";
import { Grid3X3, LibraryBig, Rows3 } from "lucide-react";
import type { CollectionMediaRecord } from "@/lib/collections/schema";

export default function MediaShelfTopology({
  records,
  selectedId,
  onSelect,
  accentRgb = "244, 114, 182",
}: {
  records: CollectionMediaRecord[];
  selectedId?: string;
  onSelect: (record: CollectionMediaRecord) => void;
  accentRgb?: string;
}) {
  const [layout, setLayout] = useState<"shelf" | "mosaic">("shelf");
  const groups = useMemo(() => {
    const map = new Map<string, CollectionMediaRecord[]>();
    for (const record of records) {
      const key = record.year ? decade(record.year) : "Undated";
      const list = map.get(key) ?? [];
      list.push(record);
      map.set(key, list);
    }
    return [...map.entries()].sort(([a], [b]) => (a === "Undated" ? 1 : b === "Undated" ? -1 : a.localeCompare(b)));
  }, [records]);

  return (
    <div className="overflow-hidden rounded-[30px] border border-white/[0.08] bg-black/[0.14] shadow-[0_30px_100px_rgba(0,0,0,0.24)] backdrop-blur-xl">
      <div className="flex flex-col gap-4 border-b border-white/[0.07] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div>
          <div className="flex items-center gap-2 font-mono text-[8px] font-semibold uppercase tracking-[0.14em]" style={{ color: `rgba(${accentRgb},0.68)` }}><LibraryBig size={12} /> Collection surface</div>
          <div className="mt-1 text-[13px] font-medium text-slate-300">{records.length} records · organized without flattening them into identical cards</div>
        </div>
        <div className="flex gap-1 rounded-full border border-white/[0.07] bg-black/20 p-1">
          <button type="button" onClick={() => setLayout("shelf")} className={`flex items-center gap-1.5 rounded-full px-3 py-2 font-mono text-[7px] uppercase tracking-[0.08em] ${layout === "shelf" ? "bg-white/[0.07] text-white" : "text-slate-600"}`}><Rows3 size={11} /> shelves</button>
          <button type="button" onClick={() => setLayout("mosaic")} className={`flex items-center gap-1.5 rounded-full px-3 py-2 font-mono text-[7px] uppercase tracking-[0.08em] ${layout === "mosaic" ? "bg-white/[0.07] text-white" : "text-slate-600"}`}><Grid3X3 size={11} /> mosaic</button>
        </div>
      </div>

      {layout === "mosaic" ? (
        <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:p-5">
          {records.map((record) => (
            <MediaTile key={record.id} record={record} active={record.id === selectedId} accentRgb={accentRgb} onSelect={onSelect} />
          ))}
        </div>
      ) : (
        <div className="space-y-5 p-4 sm:p-5">
          {groups.map(([group, items]) => (
            <section key={group}>
              <div className="mb-2 flex items-center gap-3">
                <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.13em] text-slate-600">{group}</span>
                <div className="h-px flex-1 bg-gradient-to-r from-white/[0.08] to-transparent" />
                <span className="font-mono text-[7px] text-slate-800">{items.length}</span>
              </div>
              <div className="relative overflow-x-auto pb-4">
                <div className="flex min-w-max items-end gap-3 border-b border-white/[0.09] px-2 pb-3">
                  {items.map((record, index) => (
                    <ShelfRecord
                      key={record.id}
                      record={record}
                      index={index}
                      active={record.id === selectedId}
                      accentRgb={accentRgb}
                      onSelect={onSelect}
                    />
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

function ShelfRecord({
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
  const wide = index % 4 === 0;
  return (
    <button
      type="button"
      onClick={() => onSelect(record)}
      className="group relative shrink-0 overflow-hidden rounded-[14px] border bg-[radial-gradient(circle_at_30%_20%,rgba(244,114,182,0.13),transparent_40%),linear-gradient(145deg,#17101b,#07070b)] text-left transition duration-300 hover:-translate-y-2"
      style={{
        width: wide ? 146 : 118,
        height: wide ? 146 : 132,
        borderColor: active ? `rgba(${accentRgb},0.36)` : "rgba(255,255,255,0.08)",
        boxShadow: active ? `0 0 36px rgba(${accentRgb},0.11)` : undefined,
      }}
    >
      {record.imageUrl ? (
        <img
          src={record.imageUrl}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-75 transition duration-500 group-hover:scale-105 group-hover:opacity-95"
          referrerPolicy="no-referrer"
          onError={(event) => { event.currentTarget.style.display = "none"; }}
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-3">
        <strong className="line-clamp-2 block text-[10px] leading-4 text-white">{record.title}</strong>
        <span className="mt-1 block truncate font-mono text-[7px] text-white/45">{record.primaryCreator ?? record.subtitle ?? ""}</span>
      </div>
    </button>
  );
}

function MediaTile({
  record,
  active,
  accentRgb,
  onSelect,
}: {
  record: CollectionMediaRecord;
  active: boolean;
  accentRgb: string;
  onSelect: (record: CollectionMediaRecord) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(record)}
      className="group overflow-hidden rounded-[20px] border bg-white/[0.018] text-left transition hover:-translate-y-1"
      style={{ borderColor: active ? `rgba(${accentRgb},0.32)` : "rgba(255,255,255,0.07)" }}
    >
      <div className="aspect-square overflow-hidden bg-[radial-gradient(circle_at_30%_20%,rgba(244,114,182,0.13),transparent_42%),linear-gradient(145deg,#17101b,#07070b)]">
        {record.imageUrl ? <img src={record.imageUrl} alt="" className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100" referrerPolicy="no-referrer" onError={(event) => { event.currentTarget.style.display = "none"; }} /> : null}
      </div>
      <div className="p-3">
        <strong className="line-clamp-1 block text-[11px] text-white">{record.title}</strong>
        <span className="mt-1 block truncate text-[8px] text-slate-600">{record.primaryCreator ?? record.subtitle}</span>
      </div>
    </button>
  );
}

function decade(year: string) {
  const number = Number(year.slice(0, 4));
  if (!Number.isFinite(number)) return year;
  return `${Math.floor(number / 10) * 10}s`;
}
