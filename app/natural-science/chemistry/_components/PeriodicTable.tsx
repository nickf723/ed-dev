"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  Filter,
  RefreshCw,
  RotateCcw,
  Search,
  ShieldCheck,
} from "lucide-react";
import { queryCollection } from "@/lib/collections/query.mjs";
import type {
  CollectionFacetDefinition,
  CollectionProvenance,
} from "@/lib/collections/schema";
import { fetchPeriodicTable, type APIElement } from "./chemistry-api";

const CATEGORY_COLORS: Record<string, string> = {
  nonmetal: "border-emerald-400/45 text-emerald-200",
  "noble gas": "border-cyan-400/45 text-cyan-200",
  "alkali metal": "border-rose-400/45 text-rose-200",
  "alkaline earth metal": "border-orange-400/45 text-orange-200",
  metalloid: "border-yellow-400/45 text-yellow-200",
  halogen: "border-teal-400/45 text-teal-200",
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
  const [provenance, setProvenance] = useState<CollectionProvenance | null>(
    null
  );
  const [query, setQuery] = useState("");
  const [selectedFacets, setSelectedFacets] = useState<
    Record<string, readonly string[]>
  >({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (signal?: AbortSignal) => {
    setIsLoading(true);
    setError(null);
    try {
      const payload = await fetchPeriodicTable(signal);
      setElements([...payload.records]);
      setProvenance(payload.provenance);
      setError(payload.error ?? null);
    } catch (reason) {
      if (signal?.aborted) return;
      setError(
        reason instanceof Error
          ? reason.message
          : "Unable to load elemental records."
      );
    } finally {
      if (!signal?.aborted) setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    void load(controller.signal);
    return () => controller.abort();
  }, [load]);

  const facets = useMemo(() => buildElementFacets(elements), [elements]);
  const result = useMemo(
    () =>
      queryCollection({
        records: elements,
        query: { text: query, facets: selectedFacets },
        facets,
        getSearchText: elementSearchText,
      }),
    [elements, facets, query, selectedFacets]
  );

  function selectFacet(id: string, value: string) {
    setSelectedFacets((current) => ({
      ...current,
      [id]: value ? [value] : [],
    }));
  }

  function resetFilters() {
    setQuery("");
    setSelectedFacets({});
  }

  if (isLoading && !elements.length) {
    return (
      <div className="flex min-h-[430px] w-full flex-col items-center justify-center">
        <RefreshCw size={30} className="mb-4 animate-spin text-emerald-300" />
        <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.13em] text-slate-400">
          Loading elemental records
        </span>
      </div>
    );
  }

  if (error && !elements.length) {
    return (
      <div className="flex min-h-[430px] flex-col items-center justify-center rounded-[20px] border border-amber-200/[0.12] bg-amber-300/[0.025] p-8 text-center">
        <AlertTriangle size={30} className="text-amber-200/72" />
        <strong className="mt-4 text-[16px] text-white">
          Periodic data is temporarily unavailable.
        </strong>
        <p className="mt-2 max-w-md text-[14px] leading-6 text-slate-400">
          {error}
        </p>
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
    <div>
      <div className="grid gap-3 border-b border-white/[0.07] pb-4 lg:grid-cols-[minmax(250px,1fr)_170px_210px_150px]">
        <label className="relative block">
          <span className="sr-only">Search elements</span>
          <Search
            size={15}
            className="text-emerald-200/42 pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2"
          />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search name, symbol, family…"
            className="h-11 w-full rounded-[13px] border border-white/[0.08] bg-black/[0.22] pl-10 pr-3 text-[13px] text-white outline-none placeholder:text-slate-600 focus:border-emerald-300/[0.25]"
          />
        </label>
        {facets.map((facet) => (
          <ElementFacetSelect
            key={facet.id}
            facet={facet}
            value={selectedFacets[facet.id]?.[0] ?? ""}
            counts={result.facetCounts[facet.id] ?? {}}
            onChange={(value) => selectFacet(facet.id, value)}
          />
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 py-3">
        <div>
          <p role="status" className="text-slate-300/72 text-[12px]">
            {result.matched} shown of {elements.length} loaded elements
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-500">
            <ShieldCheck size={11} className="text-emerald-200/55" />
            {provenance?.note ?? "Element provenance unavailable."}
          </p>
        </div>
        {result.activeFilterCount ? (
          <button
            type="button"
            onClick={resetFilters}
            className="flex items-center gap-2 rounded-full border border-white/[0.08] px-3 py-2 text-[11px] font-semibold text-slate-500 transition hover:border-white/20 hover:text-white"
          >
            <RotateCcw size={11} /> Reset element filters
          </button>
        ) : (
          <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-slate-600">
            <Filter size={11} /> period · family · phase
          </span>
        )}
      </div>

      {error ? (
        <div
          role="alert"
          className="text-amber-100/68 mb-3 rounded-[13px] border border-amber-200/[0.12] bg-amber-300/[0.035] px-4 py-3 text-[11px] leading-5"
        >
          {error} The reviewed local element spine is active.
        </div>
      ) : null}

      {result.records.length ? (
        <div className="relative w-full overflow-x-auto pb-4">
          <div
            className="grid min-w-[1120px] gap-1.5"
            style={{
              gridTemplateColumns: "repeat(18, minmax(48px, 1fr))",
              gridTemplateRows: "repeat(10, minmax(48px, 1fr))",
            }}
          >
            {result.records.map((element) => {
              const tone =
                CATEGORY_COLORS[element.category] ??
                "border-slate-500/35 text-slate-300";
              const active = activeZ === element.number;
              return (
                <button
                  key={element.id}
                  type="button"
                  onClick={() => onSelect(element)}
                  aria-label={`${element.name}, atomic number ${element.number}`}
                  className={`group relative aspect-square rounded-[9px] border bg-black/[0.28] p-1.5 text-left transition hover:z-10 hover:-translate-y-0.5 hover:scale-[1.08] hover:bg-black/[0.48] ${tone} ${active ? "z-10 scale-[1.06] bg-white/[0.08] ring-2 ring-white/70" : ""}`}
                  style={{ gridColumn: element.xpos, gridRow: element.ypos }}
                >
                  <span className="text-white/48 block font-mono text-[11px] leading-none">
                    {element.number}
                  </span>
                  <span className="mt-1 block text-center text-[16px] font-semibold leading-none">
                    {element.symbol}
                  </span>
                  <span className="text-white/44 mt-1 hidden truncate text-center text-[11px] leading-none 2xl:block">
                    {element.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="rounded-[20px] border border-dashed border-white/[0.09] px-5 py-16 text-center">
          <Search size={24} className="mx-auto text-slate-700" />
          <p className="mt-3 text-[13px] text-slate-400">
            No elements match that combination.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="text-emerald-100/68 mx-auto mt-4 flex items-center gap-2 rounded-full border border-emerald-100/[0.13] px-4 py-2 text-[11px] font-semibold"
          >
            <RotateCcw size={11} /> Show all elements
          </button>
        </div>
      )}
    </div>
  );
}

function elementSearchText(element: APIElement): readonly string[] {
  return [
    element.name,
    element.symbol,
    String(element.number),
    element.category,
    element.phase ?? "",
    element.electron_configuration,
    element.oxidationStates ?? "",
  ];
}

function buildElementFacets(
  elements: readonly APIElement[]
): CollectionFacetDefinition<APIElement>[] {
  const definitions = [
    {
      id: "period",
      label: "Period",
      value: (element: APIElement) => String(element.period),
    },
    {
      id: "family",
      label: "Family",
      value: (element: APIElement) => element.category,
    },
    {
      id: "phase",
      label: "Standard state",
      value: (element: APIElement) => element.phase?.toLocaleLowerCase(),
    },
  ];
  return definitions.map((definition) => {
    const values = Array.from(
      new Set(
        elements
          .map(definition.value)
          .filter((value): value is string => Boolean(value))
      )
    ).sort((left, right) =>
      left.localeCompare(right, undefined, { numeric: true })
    );
    return {
      id: definition.id,
      label: definition.label,
      selection: "single" as const,
      options: values.map((value) => ({
        id: value,
        label: value.replace(/^./, (letter) => letter.toLocaleUpperCase()),
      })),
      values: (element: APIElement) => {
        const value = definition.value(element);
        return value ? [value] : [];
      },
    };
  });
}

function ElementFacetSelect({
  facet,
  value,
  counts,
  onChange,
}: {
  facet: CollectionFacetDefinition<APIElement>;
  value: string;
  counts: Record<string, number>;
  onChange(value: string): void;
}) {
  return (
    <label className="grid gap-1">
      <span className="sr-only">
        Filter by {facet.label.toLocaleLowerCase()}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 rounded-[13px] border border-white/[0.08] bg-[#07100c] px-3 text-[12px] text-slate-300 outline-none focus:border-emerald-300/[0.25]"
      >
        <option value="">Any {facet.label.toLocaleLowerCase()}</option>
        {facet.options.map((option) => (
          <option
            key={option.id}
            value={option.id}
            disabled={counts[option.id] === 0 && option.id !== value}
          >
            {option.label} ({counts[option.id]})
          </option>
        ))}
      </select>
    </label>
  );
}
