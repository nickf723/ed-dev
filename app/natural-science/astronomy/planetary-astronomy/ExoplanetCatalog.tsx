"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";
import {
  AlertTriangle,
  Database,
  ExternalLink,
  Filter,
  LoaderCircle,
  Orbit,
  RotateCcw,
  Search,
  ShieldCheck,
  Telescope,
  X,
} from "lucide-react";
import { queryCollection } from "@/lib/collections/query.mjs";
import type {
  CollectionFacetDefinition,
  CollectionPagination,
  CollectionProvenance,
  ProviderCollectionSearchPayload,
} from "@/lib/collections/schema";
import type { ExoplanetRecord } from "./exoplanet-types";

type CatalogMetadata = {
  provenance: CollectionProvenance;
  pagination: CollectionPagination;
};

const SUGGESTIONS = ["TRAPPIST-1", "Kepler", "Transit", "Radial Velocity"];

export default function ExoplanetCatalog() {
  const [draft, setDraft] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [records, setRecords] = useState<ExoplanetRecord[]>([]);
  const [metadata, setMetadata] = useState<CatalogMetadata | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedFacets, setSelectedFacets] = useState<
    Record<string, readonly string[]>
  >({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const activeRequest = useRef<AbortController | null>(null);
  const requestSequence = useRef(0);

  const loadArchive = useCallback(async (query: string) => {
    activeRequest.current?.abort();
    const controller = new AbortController();
    activeRequest.current = controller;
    const requestId = ++requestSequence.current;
    setLoading(true);
    setError(null);
    setSelectedId(null);
    setSelectedFacets({});

    try {
      const suffix = query ? "?q=" + encodeURIComponent(query) : "";
      const response = await fetch("/api/astronomy/exoplanets" + suffix, {
        signal: controller.signal,
      });
      const payload =
        (await response.json()) as ProviderCollectionSearchPayload<ExoplanetRecord>;
      if (requestId !== requestSequence.current) return;
      if (!response.ok) {
        throw new Error(
          payload.error ?? "Unable to search the exoplanet archive."
        );
      }

      setRecords([...payload.records]);
      setMetadata({
        provenance: payload.provenance,
        pagination: payload.pagination,
      });
      setError(payload.error ?? null);
      setActiveSearch(query);
    } catch (reason) {
      if (controller.signal.aborted || requestId !== requestSequence.current)
        return;
      setRecords([]);
      setMetadata(null);
      setError(
        reason instanceof Error
          ? reason.message
          : "Unable to search the exoplanet archive."
      );
    } finally {
      if (requestId === requestSequence.current) {
        setLoading(false);
        activeRequest.current = null;
      }
    }
  }, []);

  useEffect(() => {
    void loadArchive("");
    return () => activeRequest.current?.abort();
  }, [loadArchive]);

  const facets = useMemo(() => buildExoplanetFacets(records), [records]);
  const result = useMemo(
    () =>
      queryCollection({
        records,
        query: { text: "", facets: selectedFacets },
        facets,
        getSearchText: exoplanetSearchText,
      }),
    [facets, records, selectedFacets]
  );
  const selected = records.find((record) => record.id === selectedId) ?? null;

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void loadArchive(draft.trim());
  }

  function searchSuggestion(value: string) {
    setDraft(value);
    void loadArchive(value);
  }

  function resetArchive() {
    setDraft("");
    void loadArchive("");
  }

  function selectFacet(facetId: string, value: string) {
    setSelectedId(null);
    setSelectedFacets((current) => ({
      ...current,
      [facetId]: value ? [value] : [],
    }));
  }

  return (
    <section
      aria-busy={loading}
      className="overflow-hidden rounded-[30px] border border-cyan-200/[0.1] bg-[#020711]/[0.74] shadow-[0_34px_120px_rgba(0,0,0,0.38)] backdrop-blur-2xl"
    >
      <div className="grid gap-6 border-b border-white/[0.07] p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_minmax(320px,500px)] lg:items-end">
        <div>
          <p className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-cyan-200/65">
            <Telescope size={13} /> Confirmed-world observatory
          </p>
          <h2 className="mt-2 text-[clamp(1.8rem,3.4vw,3rem)] font-semibold tracking-[-0.05em] text-white">
            Compare the model with measured worlds.
          </h2>
          <p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400">
            Search NASA&apos;s confirmed-planet archive, then refine the
            returned sample by discovery method, decade, or inferred size band.
          </p>
        </div>

        <form onSubmit={submitSearch} className="relative">
          <Search
            size={15}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-cyan-200/45"
          />
          <input
            aria-label="Search confirmed exoplanets"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Planet, host star, or discovery method…"
            className="h-12 w-full rounded-[15px] border border-white/[0.09] bg-black/[0.28] pl-11 pr-24 text-[13px] text-white outline-none placeholder:text-slate-600 focus:border-cyan-300/[0.3]"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1/2 h-9 -translate-y-1/2 rounded-[11px] bg-cyan-300 px-4 text-[11px] font-bold text-slate-950 transition hover:bg-cyan-200"
          >
            Search
          </button>
        </form>
      </div>

      <div className="border-b border-white/[0.07] px-5 py-3 sm:px-7">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 font-mono text-[9px] uppercase tracking-[0.12em] text-slate-600">
            Try
          </span>
          {SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => searchSuggestion(suggestion)}
              className="rounded-full border border-white/[0.07] bg-white/[0.02] px-3 py-1.5 text-[10px] text-slate-500 transition hover:border-cyan-200/[0.2] hover:text-cyan-100"
            >
              {suggestion}
            </button>
          ))}
        </div>

        {facets.length ? (
          <div className="mt-3 flex flex-wrap items-end gap-2 border-t border-white/[0.05] pt-3">
            <span className="mr-1 flex h-10 items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-slate-600">
              <Filter size={11} /> Refine sample
            </span>
            {facets.map((facet) => (
              <ExoplanetFacetSelect
                key={facet.id}
                facet={facet}
                value={selectedFacets[facet.id]?.[0] ?? ""}
                counts={result.facetCounts[facet.id] ?? {}}
                onChange={(value) => selectFacet(facet.id, value)}
              />
            ))}
            {result.activeFilterCount ? (
              <button
                type="button"
                onClick={() => {
                  setSelectedFacets({});
                  setSelectedId(null);
                }}
                className="flex h-10 items-center gap-2 rounded-[12px] border border-white/[0.08] px-3 text-[10px] font-semibold text-slate-500 transition hover:text-white"
              >
                <RotateCcw size={11} /> Clear filters
              </button>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="relative p-4 sm:p-6">
        {loading ? (
          <div className="absolute inset-0 z-30 flex min-h-72 items-center justify-center bg-[#020711]/80 backdrop-blur-sm">
            <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-cyan-100/75">
              <LoaderCircle size={15} className="animate-spin" /> Querying
              archive
            </span>
          </div>
        ) : null}

        <CatalogStatus
          metadata={metadata}
          visible={result.matched}
          loaded={records.length}
          activeSearch={activeSearch}
        />

        {error ? (
          <div
            role="alert"
            className="mb-4 flex items-start gap-3 rounded-[14px] border border-amber-200/[0.13] bg-amber-300/[0.04] px-4 py-3 text-[11px] leading-5 text-amber-100/70"
          >
            <AlertTriangle size={14} className="mt-0.5 shrink-0" />
            <span>
              {error}.{" "}
              {records.length
                ? "The reviewed waypoint set remains available."
                : "Try the archive again in a moment."}
            </span>
          </div>
        ) : null}

        {result.records.length ? (
          <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
            <div className="grid content-start gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3">
              {result.records.map((record) => (
                <PlanetCard
                  key={record.id}
                  record={record}
                  selected={record.id === selectedId}
                  onSelect={() => setSelectedId(record.id)}
                />
              ))}
            </div>
            <PlanetDetail
              record={selected}
              onClose={() => setSelectedId(null)}
            />
          </div>
        ) : !loading ? (
          <div className="rounded-[22px] border border-dashed border-white/[0.09] px-6 py-14 text-center">
            <Orbit size={24} className="mx-auto text-slate-700" />
            <p className="mt-3 text-[12px] text-slate-500">
              {records.length
                ? "No worlds remain under that combination of filters."
                : "No confirmed planets matched that archive search."}
            </p>
            <button
              type="button"
              onClick={
                records.length ? () => setSelectedFacets({}) : resetArchive
              }
              className="mx-auto mt-4 flex items-center gap-2 rounded-full border border-cyan-100/[0.14] px-4 py-2 text-[10px] font-semibold text-cyan-100/70"
            >
              <RotateCcw size={11} />
              {records.length
                ? "Clear filters"
                : "Return to recent discoveries"}
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function PlanetCard({
  record,
  selected,
  onSelect,
}: {
  record: ExoplanetRecord;
  selected: boolean;
  onSelect(): void;
}) {
  const className =
    "group grid min-h-48 grid-rows-[auto_1fr_auto] rounded-[20px] border p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/70 " +
    (selected
      ? "border-cyan-200/[0.38] bg-cyan-200/[0.07]"
      : "border-white/[0.08] bg-black/[0.22] hover:border-cyan-200/[0.2] hover:bg-cyan-200/[0.035]");
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={className}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-cyan-200/50">
            {record.discoveryYear ?? "Year not reported"}
          </span>
          <h3 className="mt-1 truncate text-[17px] font-semibold tracking-[-0.025em] text-white">
            {record.name}
          </h3>
          <p className="mt-1 truncate text-[11px] text-slate-500">
            orbits {record.hostName}
          </p>
        </div>
        <OrbitGlyph />
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3">
        <Fact label="Method" value={record.discoveryMethod} />
        <Fact label="Period" value={formatDays(record.orbitalPeriodDays)} />
        <Fact
          label="Radius"
          value={formatEarthUnits(record.radiusEarth, "R⊕")}
        />
        <Fact label="System" value={formatSystem(record.planetsInSystem)} />
      </dl>

      <span className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-3 font-mono text-[9px] uppercase tracking-[0.08em] text-slate-600">
        {record.sizeClass}
        <span className="text-cyan-200/50 transition group-hover:text-cyan-100">
          inspect →
        </span>
      </span>
    </button>
  );
}

function PlanetDetail({
  record,
  onClose,
}: {
  record: ExoplanetRecord | null;
  onClose(): void;
}) {
  if (!record) {
    return (
      <aside className="flex min-h-72 items-center justify-center rounded-[22px] border border-dashed border-white/[0.08] bg-black/[0.14] p-7 text-center xl:sticky xl:top-48 xl:h-[420px]">
        <div>
          <Database size={22} className="mx-auto text-cyan-200/25" />
          <p className="mt-3 text-[12px] leading-5 text-slate-600">
            Select a world to inspect its archive parameters and the evidence
            behind its classification.
          </p>
        </div>
      </aside>
    );
  }

  return (
    <aside
      aria-live="polite"
      className="rounded-[22px] border border-cyan-200/[0.16] bg-[#06101c]/85 p-5 xl:sticky xl:top-48 xl:self-start"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.13em] text-cyan-200/55">
            Archive record
          </p>
          <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">
            {record.name}
          </h3>
          <p className="mt-1 text-[12px] text-slate-500">
            Host: {record.hostName}
          </p>
        </div>
        <button
          type="button"
          aria-label="Close exoplanet details"
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.07] text-slate-600 transition hover:text-white"
        >
          <X size={13} />
        </button>
      </div>

      <dl className="mt-6 divide-y divide-white/[0.06] border-y border-white/[0.06]">
        <DetailFact label="Discovery" value={discoveryLabel(record)} />
        <DetailFact
          label="Orbital period"
          value={formatDays(record.orbitalPeriodDays)}
        />
        <DetailFact
          label="Planet radius"
          value={formatEarthUnits(record.radiusEarth, "Earth radii")}
        />
        <DetailFact
          label="Planet mass"
          value={formatEarthUnits(record.massEarth, "Earth masses")}
        />
        <DetailFact
          label="Equilibrium temperature"
          value={formatTemperature(record.equilibriumTemperatureK)}
        />
        <DetailFact
          label="Distance"
          value={formatDistance(record.distanceParsecs)}
        />
        <DetailFact
          label="Host spectrum"
          value={record.stellarSpectralType ?? "Not reported"}
        />
      </dl>

      <div className="mt-5 rounded-[14px] border border-cyan-100/[0.08] bg-cyan-200/[0.025] p-4">
        <p className="text-[11px] font-semibold text-cyan-100/80">
          Reading the evidence
        </p>
        <p className="mt-2 text-[11px] leading-5 text-slate-400">
          {interpretRecord(record)} The size band is an interface inference from
          reported radius, not an official NASA planet class.
        </p>
      </div>

      <a
        href={record.sourceUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-5 flex items-center justify-between rounded-[13px] border border-white/[0.08] px-4 py-3 text-[11px] font-semibold text-slate-300 transition hover:border-cyan-200/[0.2] hover:text-white"
      >
        Open NASA archive record <ExternalLink size={13} />
      </a>
    </aside>
  );
}

function CatalogStatus({
  metadata,
  visible,
  loaded,
  activeSearch,
}: {
  metadata: CatalogMetadata | null;
  visible: number;
  loaded: number;
  activeSearch: string;
}) {
  if (!metadata) return null;
  const providerTotal = metadata.pagination.total.toLocaleString();
  const searchLabel = activeSearch ? " for “" + activeSearch + "”" : "";
  const fallback =
    metadata.provenance.state === "fallback" ||
    metadata.provenance.state === "rate-limited";
  return (
    <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
      <div>
        <p role="status" className="text-[12px] text-slate-300/75">
          {fallback ? (
            <>
              {visible} shown from {loaded} reviewed waypoint
              {loaded === 1 ? "" : "s"}
              {searchLabel}
            </>
          ) : (
            <>
              {visible} shown from {loaded} loaded · {providerTotal} archive
              match{metadata.pagination.total === 1 ? "" : "es"}
              {searchLabel}
            </>
          )}
        </p>
        <p className="mt-1 flex max-w-4xl items-start gap-1.5 text-[10px] leading-4 text-slate-600">
          <ShieldCheck size={11} className="mt-0.5 shrink-0 text-cyan-200/45" />
          {metadata.provenance.note}
        </p>
      </div>
      <span className="rounded-full border border-white/[0.07] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.08em] text-slate-600">
        {metadata.provenance.state}
      </span>
    </div>
  );
}

function ExoplanetFacetSelect({
  facet,
  value,
  counts,
  onChange,
}: {
  facet: CollectionFacetDefinition<ExoplanetRecord>;
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
        className="h-10 rounded-[12px] border border-white/[0.08] bg-[#06101b] px-3 text-[11px] text-slate-300 outline-none focus:border-cyan-200/[0.3]"
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

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[8px] uppercase tracking-[0.11em] text-slate-700">
        {label}
      </dt>
      <dd className="mt-1 truncate text-[11px] text-slate-300">{value}</dd>
    </div>
  );
}

function DetailFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-5 py-3 text-[11px]">
      <dt className="text-slate-600">{label}</dt>
      <dd className="text-right text-slate-300">{value}</dd>
    </div>
  );
}

function OrbitGlyph() {
  return (
    <span
      aria-hidden="true"
      className="relative mt-1 block h-11 w-11 shrink-0 rounded-full border border-cyan-200/[0.16]"
    >
      <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-200 shadow-[0_0_12px_rgba(253,230,138,0.7)]" />
      <span className="absolute right-0.5 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.7)]" />
    </span>
  );
}

function buildExoplanetFacets(
  records: readonly ExoplanetRecord[]
): CollectionFacetDefinition<ExoplanetRecord>[] {
  const definitions = [
    {
      id: "method",
      label: "Method",
      value: (record: ExoplanetRecord) => record.discoveryMethod,
    },
    {
      id: "decade",
      label: "Discovery decade",
      value: (record: ExoplanetRecord) =>
        record.discoveryYear
          ? String(Math.floor(record.discoveryYear / 10) * 10) + "s"
          : undefined,
    },
    {
      id: "size",
      label: "Radius band",
      value: (record: ExoplanetRecord) => record.sizeClass,
    },
  ];

  return definitions
    .map((definition) => {
      const values = Array.from(
        new Set(
          records
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
        options: values.map((value) => ({ id: value, label: value })),
        values: (record: ExoplanetRecord) => {
          const value = definition.value(record);
          return value ? [value] : [];
        },
      };
    })
    .filter((facet) => facet.options.length > 1);
}

function exoplanetSearchText(record: ExoplanetRecord): readonly string[] {
  return [
    record.name,
    record.hostName,
    record.discoveryMethod,
    record.discoveryFacility ?? "",
    record.sizeClass,
    record.stellarSpectralType ?? "",
  ];
}

function formatDays(value?: number) {
  if (value === undefined) return "Not reported";
  return (
    value.toLocaleString(undefined, { maximumFractionDigits: 2 }) + " days"
  );
}

function formatEarthUnits(value: number | undefined, unit: string) {
  if (value === undefined) return "Not reported";
  return (
    value.toLocaleString(undefined, { maximumFractionDigits: 2 }) + " " + unit
  );
}

function formatSystem(value?: number) {
  if (value === undefined) return "Not reported";
  return String(value) + " known planet" + (value === 1 ? "" : "s");
}

function formatTemperature(value?: number) {
  if (value === undefined) return "Not reported";
  return Math.round(value).toLocaleString() + " K";
}

function formatDistance(value?: number) {
  if (value === undefined) return "Not reported";
  const parsecs = value.toLocaleString(undefined, { maximumFractionDigits: 1 });
  const lightYears = (value * 3.26156).toLocaleString(undefined, {
    maximumFractionDigits: 1,
  });
  return parsecs + " pc · " + lightYears + " ly";
}

function discoveryLabel(record: ExoplanetRecord) {
  return [
    record.discoveryMethod,
    record.discoveryYear,
    record.discoveryFacility,
  ]
    .filter(Boolean)
    .join(" · ");
}

function interpretRecord(record: ExoplanetRecord) {
  if (record.orbitalPeriodDays !== undefined) {
    return (
      "Its reported " +
      formatDays(record.orbitalPeriodDays) +
      " period is the direct bridge back to Kepler's third law."
    );
  }
  return "Its archive record shows which measurements are available—and which remain unreported.";
}
