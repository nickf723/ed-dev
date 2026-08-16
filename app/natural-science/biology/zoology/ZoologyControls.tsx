"use client";

import { ListFilter, RefreshCw, Search, X } from "lucide-react";
import type { ChangeEvent, FormEvent } from "react";

export type SortMode = "curated" | "name" | "observations" | "taxonomy";

export default function ZoologyControls({ query, classFilter, classes, sort, searching, onQuery, onSearch, onClear, onClass, onSort, onRefresh }: {
  query: string;
  classFilter: string;
  classes: string[];
  sort: SortMode;
  searching: boolean;
  onQuery: (value: string) => void;
  onSearch: (event: FormEvent<HTMLFormElement>) => void;
  onClear: () => void;
  onClass: (value: string) => void;
  onSort: (value: SortMode) => void;
  onRefresh: () => void;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-[20px] border border-white/[0.08] bg-black/[0.18] p-3 backdrop-blur-xl lg:flex-row lg:items-center">
      <form onSubmit={onSearch} className="relative min-w-0 flex-1">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
        <input value={query} onChange={(event: ChangeEvent<HTMLInputElement>) => onQuery(event.target.value)} placeholder="Search any animal species…" className="h-10 w-full rounded-[12px] border border-white/[0.08] bg-black/[0.24] pl-9 pr-10 text-[10px] text-white outline-none placeholder:text-slate-700 focus:border-emerald-300/[0.22]" />
        {query ? <button type="button" onClick={onClear} aria-label="Clear search" className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-[8px] text-slate-600 hover:bg-white/[0.05] hover:text-white"><X size={12} /></button> : null}
      </form>
      <label className="flex items-center gap-2 rounded-[11px] border border-white/[0.07] bg-black/[0.20] px-3">
        <ListFilter size={12} className="text-slate-600" />
        <select value={classFilter} onChange={(event: ChangeEvent<HTMLSelectElement>) => onClass(event.target.value)} className="h-10 bg-transparent text-[9px] text-slate-400 outline-none">
          <option value="all">All classes</option>
          {classes.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
      </label>
      <select value={sort} onChange={(event: ChangeEvent<HTMLSelectElement>) => onSort(event.target.value as SortMode)} className="h-10 rounded-[11px] border border-white/[0.07] bg-black/[0.20] px-3 text-[9px] text-slate-400 outline-none">
        <option value="curated">Curated order</option><option value="name">Name</option><option value="observations">Most observed</option><option value="taxonomy">Taxonomic class</option>
      </select>
      <button type="button" onClick={onRefresh} disabled={searching} className="flex h-10 items-center justify-center gap-2 rounded-[11px] border border-white/[0.07] bg-white/[0.025] px-3 text-[9px] text-slate-500 hover:text-white disabled:opacity-35">
        <RefreshCw size={12} className={searching ? "animate-spin" : ""} /> Refresh
      </button>
    </div>
  );
}
