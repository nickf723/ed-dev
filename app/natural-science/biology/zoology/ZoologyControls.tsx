"use client";

import { ListFilter, RefreshCw, Search, X } from "lucide-react";
import type { ChangeEvent, FormEvent } from "react";

export type SortMode = "curated" | "name" | "observations" | "taxonomy";

export default function ZoologyControls({
  query,
  classFilter,
  classes,
  sort,
  searching,
  onQuery,
  onSearch,
  onClear,
  onClass,
  onSort,
  onRefresh,
}: {
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
    <div className="flex flex-col gap-3 rounded-[21px] border border-white/[0.09] bg-black/[0.18] p-3.5 backdrop-blur-xl lg:flex-row lg:items-center">
      <form onSubmit={onSearch} className="relative min-w-0 flex-1">
        <Search
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
        />
        <input
          value={query}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            onQuery(event.target.value)
          }
          placeholder="Search any animal species…"
          className="h-12 w-full rounded-[13px] border border-white/[0.09] bg-black/[0.24] pl-10 pr-11 text-[13px] text-white outline-none placeholder:text-slate-600 focus:border-emerald-300/[0.28]"
        />
        {query ? (
          <button
            type="button"
            onClick={onClear}
            aria-label="Clear search"
            className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-[9px] text-slate-500 hover:bg-white/[0.06] hover:text-white"
          >
            <X size={14} />
          </button>
        ) : null}
      </form>

      <label className="flex h-12 items-center gap-2 rounded-[12px] border border-white/[0.08] bg-black/[0.20] px-3.5">
        <ListFilter size={14} className="text-slate-500" />
        <select
          value={classFilter}
          onChange={(event: ChangeEvent<HTMLSelectElement>) =>
            onClass(event.target.value)
          }
          aria-label="Filter by taxonomic class"
          className="h-full min-w-[150px] bg-transparent text-[12px] text-slate-300 outline-none"
        >
          <option value="all">All taxonomic classes</option>
          {classes.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>

      <select
        value={sort}
        onChange={(event: ChangeEvent<HTMLSelectElement>) =>
          onSort(event.target.value as SortMode)
        }
        aria-label="Sort animal records"
        className="h-12 rounded-[12px] border border-white/[0.08] bg-black/[0.20] px-3.5 text-[12px] text-slate-300 outline-none"
      >
        <option value="curated">Curated order</option>
        <option value="name">Name</option>
        <option value="observations">Most observed</option>
        <option value="taxonomy">Taxonomic class</option>
      </select>

      <button
        type="button"
        onClick={onRefresh}
        disabled={searching}
        className="flex h-12 items-center justify-center gap-2 rounded-[12px] border border-white/[0.08] bg-white/[0.03] px-4 text-[12px] font-semibold text-slate-400 hover:text-white disabled:opacity-[0.35]"
      >
        <RefreshCw size={14} className={searching ? "animate-spin" : ""} />
        Refresh
      </button>
    </div>
  );
}
