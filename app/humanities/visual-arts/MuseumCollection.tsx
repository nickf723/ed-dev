"use client";

import { useMemo, useRef, useState, type FormEvent } from "react";
import {
  ExternalLink,
  Filter,
  ImageIcon,
  LoaderCircle,
  RotateCcw,
  Search,
  ShieldCheck,
  Sparkles,
  TriangleAlert,
  X,
} from "lucide-react";
import GalleryWallTopology from "@/app/_page-system/topologies/GalleryWallTopology";
import MediaDetailDrawer from "@/app/_page-system/widgets/MediaDetailDrawer";
import { queryCollection } from "@/lib/collections/query.mjs";
import type {
  CollectionFacetDefinition,
  CollectionMediaRecord,
  CollectionPagination,
  CollectionProvenance,
  ProviderCollectionSearchPayload,
} from "@/lib/collections/schema";

const STARTER: CollectionMediaRecord[] = [
  curated(
    "starry-night",
    "The Starry Night",
    "Vincent van Gogh",
    "1889",
    "Painting",
    ["Post-Impressionism", "Landscape"],
    "A painted night landscape organized through repeated directional brushwork, exaggerated color, and a strong contrast between the moving sky and quiet village."
  ),
  curated(
    "wave-kanagawa",
    "Under the Wave off Kanagawa",
    "Katsushika Hokusai",
    "c. 1830–32",
    "Woodblock print",
    ["Ukiyo-e", "Printmaking"],
    "A woodblock print balancing an enormous breaking wave, tiny boats, and distant Mount Fuji through cropping, repetition, scale contrast, and graphic contour."
  ),
  curated(
    "seated-scribe",
    "Seated Scribe",
    "Unknown Egyptian artist",
    "c. 2620–2500 BCE",
    "Sculpture",
    ["Ancient Egypt", "Portraiture"],
    "A painted limestone figure whose posture, gaze, materials, and social role make portrait sculpture a record of both body and status."
  ),
  curated(
    "vermeer",
    "Young Woman with a Water Pitcher",
    "Johannes Vermeer",
    "c. 1662",
    "Painting",
    ["Dutch Golden Age", "Interior"],
    "An interior scene structured by window light, restrained geometry, reflective surfaces, and a carefully staged relationship between figure and room."
  ),
  curated(
    "armor",
    "Armor for Man and Horse",
    "German armorer",
    "16th century",
    "Armor",
    ["Metalwork", "Design"],
    "A functional object that is also a highly controlled visual surface, joining engineering, ornament, status, craft, and bodily movement."
  ),
  curated(
    "textile",
    "Andean Tunic",
    "Andean artist",
    "15th–16th century",
    "Textile",
    ["Textile", "Pattern"],
    "A woven garment in which material, color, repeated pattern, technical process, identity, and social context are inseparable."
  ),
];

const SUGGESTIONS = [
  "van Gogh",
  "Japanese prints",
  "Egyptian",
  "portrait",
  "textile",
  "armor",
  "landscape",
];

const CURATED_PROVENANCE: CollectionProvenance = {
  state: "curated",
  reviewedAt: "2026-08-20",
  version: "1.0",
  sources: [
    {
      label: "Education Station curated teaching wall",
      kind: "curated",
      scope: "Starter selection and interpretive descriptions",
    },
  ],
  note: "A stable starter wall remains available without a provider request.",
};

const CURATED_PAGINATION: CollectionPagination = {
  total: STARTER.length,
  returned: STARTER.length,
};

type CollectionMetadata = {
  source: string;
  provenance: CollectionProvenance;
  pagination: CollectionPagination;
};

const INITIAL_METADATA: CollectionMetadata = {
  source: "Curated teaching wall",
  provenance: CURATED_PROVENANCE,
  pagination: CURATED_PAGINATION,
};

export default function MuseumCollection() {
  const [query, setQuery] = useState("");
  const [records, setRecords] = useState<CollectionMediaRecord[]>(STARTER);
  const [selected, setSelected] = useState<CollectionMediaRecord | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [metadata, setMetadata] =
    useState<CollectionMetadata>(INITIAL_METADATA);
  const [selectedFacets, setSelectedFacets] = useState<
    Record<string, readonly string[]>
  >({});
  const requestSequence = useRef(0);

  const facets = useMemo(() => buildMuseumFacets(records), [records]);
  const result = useMemo(
    () =>
      queryCollection({
        records,
        query: { text: "", facets: selectedFacets },
        facets,
        getSearchText: museumSearchText,
      }),
    [facets, records, selectedFacets]
  );

  async function search(event?: FormEvent, override?: string) {
    event?.preventDefault();
    const value = (override ?? query).trim();
    if (!value) return;
    const requestId = ++requestSequence.current;
    setQuery(value);
    setLoading(true);
    setError(null);
    setSelected(null);
    setSelectedFacets({});
    try {
      const response = await fetch(
        `/api/art/met?q=${encodeURIComponent(value)}`
      );
      const payload =
        (await response.json()) as ProviderCollectionSearchPayload;
      if (requestId !== requestSequence.current) return;
      if (!response.ok) {
        applyFallback(
          payload.error || "Unable to search the museum collection.",
          payload.provenance.state
        );
        return;
      }
      setRecords(payload.records);
      setMetadata({
        source: payload.source,
        provenance: payload.provenance,
        pagination: payload.pagination,
      });
    } catch (reason) {
      if (requestId !== requestSequence.current) return;
      applyFallback(
        reason instanceof Error
          ? reason.message
          : "Unable to search the museum collection.",
        "failed"
      );
    } finally {
      if (requestId === requestSequence.current) setLoading(false);
    }
  }

  function applyFallback(message: string, providerState: string) {
    setRecords(STARTER);
    setSelected(null);
    setSelectedFacets({});
    setError(message);
    setMetadata({
      source: "Curated fallback wall",
      provenance: {
        ...CURATED_PROVENANCE,
        state: "fallback",
        note: `The provider reported ${providerState}; the stable curated wall is shown instead.`,
      },
      pagination: CURATED_PAGINATION,
    });
  }

  function reset() {
    requestSequence.current += 1;
    setQuery("");
    setRecords(STARTER);
    setSelected(null);
    setSelectedFacets({});
    setLoading(false);
    setError(null);
    setMetadata(INITIAL_METADATA);
  }

  function selectFacet(facetId: string, value: string) {
    setSelected(null);
    setSelectedFacets((current) => ({
      ...current,
      [facetId]: value ? [value] : [],
    }));
  }

  function clearFacets() {
    setSelected(null);
    setSelectedFacets({});
  }

  return (
    <section
      aria-busy={loading}
      className="overflow-hidden rounded-[30px] border border-white/[0.08] bg-black/[0.11] shadow-[0_32px_110px_rgba(0,0,0,0.25)] backdrop-blur-xl"
    >
      <div className="grid gap-5 border-b border-white/[0.07] p-5 sm:p-6 xl:grid-cols-[minmax(0,1fr)_520px] xl:items-end">
        <div>
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-orange-200/70">
            <ImageIcon size={13} /> Museum collection
          </div>
          <h2 className="mt-2 text-[clamp(1.8rem,3vw,2.8rem)] font-semibold tracking-[-0.045em] text-white">
            Look at objects before sorting them into movements.
          </h2>
          <p className="mt-3 max-w-3xl text-[13px] leading-6 text-stone-400">
            Search museum records, then inspect medium, maker, date, culture,
            dimensions, department, and collection context. A work of art is
            simultaneously an image, a physical object, a made thing, and a
            historical artifact.
          </p>
        </div>
        <form
          onSubmit={(event) => void search(event)}
          className="grid grid-cols-[minmax(0,1fr)_auto] gap-2"
        >
          <div className="relative">
            <Search
              size={15}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500"
              aria-hidden="true"
            />
            <input
              aria-label="Search the museum collection"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search the museum collection…"
              className="h-12 w-full rounded-[15px] border border-white/[0.08] bg-black/[0.26] pl-11 pr-12 text-[13px] text-white outline-none placeholder:text-stone-600 focus:border-orange-300/[0.22]"
            />
            {query ? (
              <button
                type="button"
                onClick={reset}
                aria-label="Clear museum search"
                className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-stone-500 hover:bg-white/[0.04] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-200/60"
              >
                <X size={13} />
              </button>
            ) : null}
          </div>
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="h-12 rounded-[15px] border border-orange-200/[0.16] bg-orange-300/[0.055] px-4 text-[12px] font-semibold text-orange-100/75 transition hover:border-orange-200/35 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-200/60 disabled:cursor-not-allowed disabled:opacity-35"
          >
            Search
          </button>
        </form>
      </div>

      <div className="border-b border-white/[0.07] px-5 py-3 sm:px-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 font-mono text-[10px] uppercase tracking-[0.07em] text-stone-500">
            Try
          </span>
          {SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => void search(undefined, suggestion)}
              className="rounded-full border border-white/[0.06] bg-white/[0.015] px-3 py-1.5 text-[11px] text-stone-500 transition hover:text-orange-200"
            >
              {suggestion}
            </button>
          ))}
        </div>

        {facets.length > 0 ? (
          <div className="mt-3 flex flex-wrap items-end gap-2 border-t border-white/[0.05] pt-3">
            <span className="mr-1 flex h-10 items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-stone-600">
              <Filter size={12} /> Refine sample
            </span>
            {facets.map((facet) => (
              <MuseumFacetSelect
                key={facet.id}
                facet={facet}
                value={selectedFacets[facet.id]?.[0] ?? ""}
                counts={result.facetCounts[facet.id] ?? {}}
                onChange={(value) => selectFacet(facet.id, value)}
              />
            ))}
            {result.activeFilterCount > 0 ? (
              <button
                type="button"
                onClick={clearFacets}
                className="flex h-10 items-center gap-2 rounded-[12px] border border-white/[0.07] px-3 text-[11px] font-semibold text-stone-500 transition hover:border-white/20 hover:text-white"
              >
                <RotateCcw size={11} /> Clear filters
              </button>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="relative p-4 sm:p-5">
        {loading ? (
          <div className="absolute inset-0 z-20 flex items-center justify-center rounded-[20px] bg-black/[0.62] backdrop-blur-sm">
            <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.08em] text-orange-100/75">
              <LoaderCircle size={15} className="animate-spin" /> opening
              storage
            </span>
          </div>
        ) : null}
        <CollectionStatus metadata={metadata} visible={result.matched} />
        {error ? (
          <div
            role="alert"
            className="mb-4 rounded-[14px] border border-red-300/[0.12] bg-red-400/[0.035] px-4 py-3 text-[11px] leading-5 text-red-100/70"
          >
            {error} The curated teaching wall is active instead.
          </div>
        ) : null}
        {!result.records.length && !loading ? (
          <div className="rounded-[20px] border border-dashed border-white/[0.08] p-10 text-center">
            <Sparkles size={19} className="mx-auto text-stone-600" />
            <p className="mt-3 text-[12px] text-stone-500">
              {records.length
                ? "No objects remain under those filters."
                : "No image-bearing objects matched that provider search."}
            </p>
            <button
              type="button"
              onClick={records.length ? clearFacets : reset}
              className="mx-auto mt-4 flex items-center gap-2 rounded-full border border-orange-100/[0.12] px-4 py-2 text-[11px] font-semibold text-orange-100/65 transition hover:border-orange-100/30 hover:text-white"
            >
              <RotateCcw size={11} />{" "}
              {records.length
                ? "Clear sample filters"
                : "Return to the curated wall"}
            </button>
          </div>
        ) : (
          <GalleryWallTopology
            records={result.records}
            selectedId={selected?.id}
            onSelect={setSelected}
            accentRgb="251, 146, 60"
          />
        )}
      </div>

      {selected ? (
        <MediaDetailDrawer
          record={selected}
          accentRgb="251, 146, 60"
          onClose={() => setSelected(null)}
        />
      ) : null}
    </section>
  );
}

function curated(
  id: string,
  title: string,
  creator: string,
  year: string,
  medium: string,
  tags: string[],
  description: string
): CollectionMediaRecord {
  return {
    id,
    title,
    primaryCreator: creator,
    year,
    subtitle: medium,
    description,
    tags,
    facts: {
      medium,
      maker: creator,
      date: year,
      source: "Curated teaching record",
    },
    sources: [
      {
        label: "Education Station curated teaching record",
        kind: "curated",
        scope: "Interpretive starter description",
      },
    ],
  };
}

function museumSearchText(record: CollectionMediaRecord): readonly string[] {
  return [
    record.title,
    record.primaryCreator ?? "",
    record.subtitle ?? "",
    record.description ?? "",
    ...record.tags,
  ];
}

function buildMuseumFacets(
  records: readonly CollectionMediaRecord[]
): CollectionFacetDefinition<CollectionMediaRecord>[] {
  const candidates: Array<{
    id: string;
    label: string;
    value(record: CollectionMediaRecord): string | undefined;
  }> = [
    {
      id: "department",
      label: "Department",
      value: (record) => fact(record, "department"),
    },
    {
      id: "medium",
      label: "Medium",
      value: (record) =>
        fact(record, "medium") ?? fact(record, "objectName") ?? record.subtitle,
    },
    {
      id: "rights",
      label: "Image rights",
      value: (record) => fact(record, "publicDomain"),
    },
  ];

  return candidates.flatMap((candidate) => {
    const values = Array.from(
      new Set(
        records
          .map(candidate.value)
          .filter((value): value is string => Boolean(value))
      )
    ).sort((left, right) => left.localeCompare(right));
    if (values.length < 2) return [];
    return [
      {
        id: candidate.id,
        label: candidate.label,
        selection: "single" as const,
        options: values.map((value) => ({ id: value, label: value })),
        values: (record: CollectionMediaRecord) => {
          const value = candidate.value(record);
          return value ? [value] : [];
        },
      },
    ];
  });
}

function fact(record: CollectionMediaRecord, key: string): string | undefined {
  const value = record.facts[key];
  return value === undefined || value === "" ? undefined : String(value);
}

function MuseumFacetSelect({
  facet,
  value,
  counts,
  onChange,
}: {
  facet: CollectionFacetDefinition<CollectionMediaRecord>;
  value: string;
  counts: Record<string, number>;
  onChange(value: string): void;
}) {
  return (
    <label className="grid min-w-[150px] max-w-[260px] flex-1 gap-1">
      <span className="sr-only">
        Filter by {facet.label.toLocaleLowerCase()}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 min-w-0 rounded-[12px] border border-white/[0.08] bg-[#110d0b] px-3 text-[11px] text-stone-400 outline-none transition focus:border-orange-200/25"
      >
        <option value="">Any {facet.label.toLocaleLowerCase()}</option>
        {facet.options.map((option) => (
          <option
            key={option.id}
            value={option.id}
            disabled={counts[option.id] === 0 && value !== option.id}
          >
            {option.label} ({counts[option.id] ?? 0})
          </option>
        ))}
      </select>
    </label>
  );
}

function CollectionStatus({
  metadata,
  visible,
}: {
  metadata: CollectionMetadata;
  visible: number;
}) {
  const caution = [
    "fallback",
    "partial",
    "stale",
    "rate-limited",
    "failed",
  ].includes(metadata.provenance.state);
  const Icon = caution ? TriangleAlert : ShieldCheck;
  const source = metadata.provenance.sources[0];
  const sampled = metadata.pagination.returned;
  const total = metadata.pagination.total;

  return (
    <div
      className="mb-4 grid gap-3 rounded-[15px] border border-white/[0.07] bg-white/[0.012] px-4 py-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-center"
      role="status"
    >
      <div>
        <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-stone-500">
          <Icon
            size={12}
            className={caution ? "text-amber-200/58" : "text-emerald-200/58"}
          />
          {stateLabel(metadata.provenance.state)}
          <span className="text-stone-700">·</span>
          {source?.url ? (
            <a
              href={source.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 normal-case tracking-normal text-orange-100/55 transition hover:text-white"
            >
              {source.label}
              <ExternalLink size={10} />
            </a>
          ) : (
            <span className="normal-case tracking-normal text-stone-600">
              {source?.label ?? metadata.source}
            </span>
          )}
        </div>
        {metadata.provenance.note ? (
          <p className="mt-1.5 text-[11px] leading-5 text-stone-600">
            {metadata.provenance.note}
          </p>
        ) : null}
      </div>
      <div className="font-mono text-[10px] uppercase tracking-[0.06em] text-stone-600 md:text-right">
        <div>
          {visible} visible · {sampled} sampled
        </div>
        <div className="mt-1 text-stone-700">
          {total.toLocaleString("en-US")}{" "}
          {metadata.provenance.state === "curated" ||
          metadata.provenance.state === "fallback"
            ? "teaching records"
            : "provider matches"}
        </div>
        {metadata.provenance.retrievedAt ? (
          <div className="mt-1 text-[9px] text-stone-800">
            Retrieved{" "}
            {metadata.provenance.retrievedAt.replace("T", " ").slice(0, 16)} UTC
          </div>
        ) : null}
      </div>
    </div>
  );
}

function stateLabel(state: CollectionProvenance["state"]): string {
  return {
    live: "Live provider result",
    cached: "Cached provider sample",
    curated: "Curated teaching set",
    fallback: "Curated fallback active",
    partial: "Partial provider sample",
    stale: "Stale provider sample",
    "rate-limited": "Provider rate limited",
    failed: "Provider unavailable",
  }[state];
}
