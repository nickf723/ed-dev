"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { Disc3, ExternalLink, Filter, LoaderCircle, RotateCcw, Search, ShieldCheck, Sparkles, TriangleAlert, X } from "lucide-react";
import MediaShelfTopology from "@/app/_page-system/topologies/MediaShelfTopology";
import MediaDetailDrawer from "@/app/_page-system/widgets/MediaDetailDrawer";
import { queryCollection } from "@/lib/collections/query.mjs";
import type {
  CollectionFacetDefinition,
  CollectionMediaRecord,
  CollectionPagination,
  CollectionProvenance,
  ProviderCollectionSearchPayload,
} from "@/lib/collections/schema";

const FEATURED: CollectionMediaRecord[] = [
  record("kind-of-blue", "Kind of Blue", "Miles Davis", "1959", ["Jazz", "Modal jazz"], "A landmark modal jazz album whose spacious harmonic framework leaves exceptional room for melodic improvisation."),
  record("abbey-road", "Abbey Road", "The Beatles", "1969", ["Rock", "Studio craft"], "A studio-centered album whose production, sequencing, harmony, and medley form make recording technique part of the composition."),
  record("whats-going-on", "What's Going On", "Marvin Gaye", "1971", ["Soul", "Concept album"], "A continuous soul cycle combining layered vocals, social observation, orchestration, and recurring musical motives."),
  record("songs-in-key", "Songs in the Key of Life", "Stevie Wonder", "1976", ["Soul", "R&B", "Pop"], "A wide-ranging double album connecting groove, harmony, synthesis, songwriting, and social commentary."),
  record("rumours", "Rumours", "Fleetwood Mac", "1977", ["Rock", "Pop"], "A tightly arranged pop-rock record where vocal harmony, production polish, and interpersonal tension reinforce one another."),
  record("miseducation", "The Miseducation of Lauryn Hill", "Lauryn Hill", "1998", ["Hip hop", "R&B", "Soul"], "A genre-crossing album joining rap, singing, live instrumentation, sampling, and autobiographical songwriting."),
  record("discovery", "Discovery", "Daft Punk", "2001", ["Electronic", "House", "Sampling"], "A bright electronic album built from filtered samples, synthesis, repetition, and highly controlled timbral transformation."),
  record("to-pimp-a-butterfly", "To Pimp a Butterfly", "Kendrick Lamar", "2015", ["Hip hop", "Jazz rap", "Funk"], "A conceptually dense album linking rap narrative with jazz, funk, spoken word, recurring motifs, and large-scale formal design."),
];

const SUGGESTIONS = ["Nina Simone", "Radiohead", "Björk", "Miles Davis", "Beyoncé", "Prince", "Joni Mitchell"];

const CURATED_PROVENANCE: CollectionProvenance = {
  state: "curated",
  reviewedAt: "2026-08-20",
  version: "1.0",
  sources: [
    {
      label: "Education Station curated listening shelf",
      kind: "curated",
      scope: "Starter selection and interpretive descriptions",
    },
  ],
  note: "A stable teaching shelf remains available without a provider request.",
};

const CURATED_PAGINATION: CollectionPagination = {
  total: FEATURED.length,
  returned: FEATURED.length,
};

type CollectionMetadata = {
  source: string;
  provenance: CollectionProvenance;
  pagination: CollectionPagination;
};

const INITIAL_METADATA: CollectionMetadata = {
  source: "Curated listening shelf",
  provenance: CURATED_PROVENANCE,
  pagination: CURATED_PAGINATION,
};

export default function MusicLibrary() {
  const [query, setQuery] = useState("");
  const [records, setRecords] = useState<CollectionMediaRecord[]>(FEATURED);
  const [selected, setSelected] = useState<CollectionMediaRecord | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<CollectionMetadata>(INITIAL_METADATA);
  const [selectedFacets, setSelectedFacets] = useState<Record<string, readonly string[]>>({});
  const requestSequence = useRef(0);
  const activeRequest = useRef<AbortController | null>(null);

  useEffect(() => () => activeRequest.current?.abort(), []);

  const facets = useMemo(() => buildMusicFacets(records), [records]);
  const result = useMemo(
    () => queryCollection({
      records,
      query: { text: "", facets: selectedFacets },
      facets,
      getSearchText: musicSearchText,
    }),
    [facets, records, selectedFacets],
  );

  async function search(event?: FormEvent, override?: string) {
    event?.preventDefault();
    const value = (override ?? query).trim();
    if (!value) return;

    activeRequest.current?.abort();
    const controller = new AbortController();
    activeRequest.current = controller;
    const requestId = ++requestSequence.current;
    setQuery(value);
    setLoading(true);
    setError(null);
    setSelected(null);
    setSelectedFacets({});

    try {
      const response = await fetch(`/api/music/albums?q=${encodeURIComponent(value)}`, { signal: controller.signal });
      const payload = (await response.json()) as ProviderCollectionSearchPayload;
      if (requestId !== requestSequence.current) return;
      if (!response.ok) {
        applyFallback(payload.error || "Unable to search MusicBrainz.", payload.provenance.state);
        return;
      }
      setRecords([...payload.records]);
      setMetadata({
        source: payload.source,
        provenance: payload.provenance,
        pagination: payload.pagination,
      });
    } catch (reason) {
      if (requestId !== requestSequence.current || controller.signal.aborted) return;
      applyFallback(reason instanceof Error ? reason.message : "Unable to search MusicBrainz.", "failed");
    } finally {
      if (requestId === requestSequence.current) {
        setLoading(false);
        activeRequest.current = null;
      }
    }
  }

  function applyFallback(message: string, providerState: string) {
    setRecords(FEATURED);
    setSelected(null);
    setSelectedFacets({});
    setError(message);
    setMetadata({
      source: "Curated fallback shelf",
      provenance: {
        ...CURATED_PROVENANCE,
        state: "fallback",
        note: `The provider reported ${providerState}; the stable curated shelf is shown instead.`,
      },
      pagination: CURATED_PAGINATION,
    });
  }

  function reset() {
    activeRequest.current?.abort();
    activeRequest.current = null;
    requestSequence.current += 1;
    setQuery("");
    setRecords(FEATURED);
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
    <section aria-busy={loading} className="overflow-hidden rounded-[30px] border border-white/[0.08] bg-black/[0.12] shadow-[0_32px_110px_rgba(0,0,0,0.24)] backdrop-blur-xl">
      <div className="grid gap-5 border-b border-white/[0.07] p-5 xl:grid-cols-[minmax(0,1fr)_520px] xl:items-end sm:p-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-rose-200/70"><Disc3 size={13} /> Recorded works</div>
          <h2 className="mt-2 text-[clamp(1.8rem,3vw,2.8rem)] font-semibold tracking-[-0.045em] text-white">Use the catalog as evidence, not decoration.</h2>
          <p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400/75">Search release groups by artist or album, then refine the sample by release type and decade. MusicBrainz connects editions to an underlying release group; the Cover Art Archive supplies community-curated images when available.</p>
        </div>
        <form onSubmit={(event) => void search(event)} className="relative">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
          <input aria-label="Search albums or artists" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search artist or album…" className="h-12 w-full rounded-[15px] border border-white/[0.08] bg-black/[0.26] pl-11 pr-12 text-[13px] text-white outline-none placeholder:text-slate-600 focus:border-rose-300/[0.22]" />
          {query ? <button type="button" onClick={reset} aria-label="Clear music search" className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-slate-500 hover:bg-white/[0.04] hover:text-white"><X size={13} /></button> : null}
        </form>
      </div>

      <div className="border-b border-white/[0.07] px-5 py-3 sm:px-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 font-mono text-[10px] uppercase tracking-[0.07em] text-slate-500">Try</span>
          {SUGGESTIONS.map((suggestion) => <button key={suggestion} type="button" onClick={() => void search(undefined, suggestion)} className="rounded-full border border-white/[0.06] bg-white/[0.015] px-3 py-1.5 text-[10px] text-slate-500 transition hover:text-rose-200">{suggestion}</button>)}
        </div>

        {facets.length > 0 ? (
          <div className="mt-3 flex flex-wrap items-end gap-2 border-t border-white/[0.05] pt-3">
            <span className="mr-1 flex h-10 items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-600"><Filter size={12} /> Refine shelf</span>
            {facets.map((facet) => (
              <MusicFacetSelect
                key={facet.id}
                facet={facet}
                value={selectedFacets[facet.id]?.[0] ?? ""}
                counts={result.facetCounts[facet.id] ?? {}}
                onChange={(value) => selectFacet(facet.id, value)}
              />
            ))}
            {result.activeFilterCount > 0 ? <button type="button" onClick={clearFacets} className="flex h-10 items-center gap-2 rounded-[12px] border border-white/[0.07] px-3 text-[10px] font-semibold text-slate-500 transition hover:border-white/20 hover:text-white"><RotateCcw size={11} /> Clear filters</button> : null}
          </div>
        ) : null}
      </div>

      <div className="relative p-4 sm:p-5">
        {loading ? <div className="absolute inset-0 z-20 flex items-center justify-center rounded-[20px] bg-black/[0.62] backdrop-blur-sm"><span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.08em] text-rose-100/75"><LoaderCircle size={15} className="animate-spin" /> searching catalog</span></div> : null}
        <CollectionStatus metadata={metadata} visible={result.matched} />
        {error ? <div role="alert" className="mb-4 rounded-[14px] border border-red-300/[0.12] bg-red-400/[0.035] px-4 py-3 text-[11px] leading-5 text-red-100/70">{error} The curated listening shelf is active instead.</div> : null}
        {!result.records.length && !loading ? (
          <div className="rounded-[20px] border border-dashed border-white/[0.08] p-10 text-center">
            <Sparkles size={19} className="mx-auto text-slate-600" />
            <p className="mt-3 text-[12px] text-slate-500">{records.length ? "No release groups remain under those filters." : "No MusicBrainz release groups matched that search."}</p>
            <button type="button" onClick={records.length ? clearFacets : reset} className="mx-auto mt-4 flex items-center gap-2 rounded-full border border-rose-100/[0.12] px-4 py-2 text-[10px] font-semibold text-rose-100/65 transition hover:border-rose-100/30 hover:text-white"><RotateCcw size={11} /> {records.length ? "Clear shelf filters" : "Return to the curated shelf"}</button>
          </div>
        ) : <MediaShelfTopology records={result.records} selectedId={selected?.id} onSelect={setSelected} accentRgb="244, 114, 182" />}
      </div>

      {selected ? <MediaDetailDrawer record={selected} accentRgb="244, 114, 182" onClose={() => setSelected(null)} /> : null}
    </section>
  );
}

function record(id: string, title: string, artist: string, year: string, tags: string[], description: string): CollectionMediaRecord {
  return {
    id,
    title,
    primaryCreator: artist,
    year,
    subtitle: "Album",
    tags,
    description,
    facts: { artist, firstRelease: year, primaryType: "Album" },
    sources: [{ label: "Education Station curated listening record", kind: "curated", scope: "Interpretive starter description" }],
  };
}

function musicSearchText(record: CollectionMediaRecord): readonly string[] {
  return [record.title, record.primaryCreator ?? "", record.subtitle ?? "", record.description ?? "", ...record.tags];
}

function buildMusicFacets(records: readonly CollectionMediaRecord[]): CollectionFacetDefinition<CollectionMediaRecord>[] {
  const candidates: Array<{
    id: string;
    label: string;
    value(record: CollectionMediaRecord): string | undefined;
  }> = [
    {
      id: "release-type",
      label: "Release type",
      value: (record) => fact(record, "primaryType") ?? record.subtitle,
    },
    {
      id: "decade",
      label: "Decade",
      value: (record) => record.year ? decade(record.year) : undefined,
    },
  ];

  return candidates.flatMap((candidate) => {
    const values = Array.from(new Set(records.map(candidate.value).filter((value): value is string => Boolean(value)))).sort(compareFacetValues);
    if (values.length < 2) return [];
    return [{
      id: candidate.id,
      label: candidate.label,
      selection: "single" as const,
      options: values.map((value) => ({ id: value, label: value })),
      values: (record: CollectionMediaRecord) => {
        const value = candidate.value(record);
        return value ? [value] : [];
      },
    }];
  });
}

function compareFacetValues(left: string, right: string) {
  const leftDigits = left.replace(/\D/g, "");
  const rightDigits = right.replace(/\D/g, "");
  if (leftDigits && rightDigits) return Number(leftDigits) - Number(rightDigits);
  return left.localeCompare(right);
}

function decade(year: string): string | undefined {
  const match = year.match(/\d{4}/);
  if (!match) return undefined;
  return `${Math.floor(Number(match[0]) / 10) * 10}s`;
}

function fact(record: CollectionMediaRecord, key: string): string | undefined {
  const value = record.facts[key];
  return value === undefined || value === "" ? undefined : String(value);
}

function MusicFacetSelect({
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
      <span className="sr-only">Filter by {facet.label.toLocaleLowerCase()}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="h-10 min-w-0 rounded-[12px] border border-white/[0.08] bg-[#120b11] px-3 text-[10px] text-slate-400 outline-none transition focus:border-rose-200/25">
        <option value="">Any {facet.label.toLocaleLowerCase()}</option>
        {facet.options.map((option) => <option key={option.id} value={option.id} disabled={counts[option.id] === 0 && value !== option.id}>{option.label} ({counts[option.id] ?? 0})</option>)}
      </select>
    </label>
  );
}

function CollectionStatus({ metadata, visible }: { metadata: CollectionMetadata; visible: number }) {
  const caution = ["fallback", "partial", "stale", "rate-limited", "failed"].includes(metadata.provenance.state);
  const Icon = caution ? TriangleAlert : ShieldCheck;
  const sampled = metadata.pagination.returned;
  const total = metadata.pagination.total;

  return (
    <div className="mb-4 grid gap-3 rounded-[15px] border border-white/[0.07] bg-white/[0.012] px-4 py-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-center" role="status">
      <div>
        <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-500">
          <Icon size={12} className={caution ? "text-amber-200/60" : "text-emerald-200/60"} />
          {stateLabel(metadata.provenance.state)}
          <span className="text-slate-700">·</span>
          <span className="flex flex-wrap items-center gap-x-2 gap-y-1 normal-case tracking-normal">
            {metadata.provenance.sources.map((source) => source.url ? <a key={source.label} href={source.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-rose-100/55 transition hover:text-white">{source.label}<ExternalLink size={10} /></a> : <span key={source.label} className="text-slate-600">{source.label}</span>)}
          </span>
        </div>
        {metadata.provenance.note ? <p className="mt-1.5 text-[10px] leading-5 text-slate-600">{metadata.provenance.note}</p> : null}
      </div>
      <div className="font-mono text-[10px] uppercase tracking-[0.06em] text-slate-600 md:text-right">
        <div>{visible} visible · {sampled} sampled</div>
        <div className="mt-1 text-slate-700">{total.toLocaleString("en-US")} {metadata.provenance.state === "curated" || metadata.provenance.state === "fallback" ? "teaching records" : "provider matches"}</div>
        {metadata.provenance.retrievedAt ? <div className="mt-1 text-[9px] text-slate-700">Retrieved {metadata.provenance.retrievedAt.replace("T", " ").slice(0, 16)} UTC</div> : null}
      </div>
    </div>
  );
}

function stateLabel(state: CollectionProvenance["state"]): string {
  return {
    live: "Live provider result",
    cached: "Cached provider sample",
    curated: "Curated listening set",
    fallback: "Curated fallback active",
    partial: "Partial provider sample",
    stale: "Stale provider sample",
    "rate-limited": "Provider rate limited",
    failed: "Provider unavailable",
  }[state];
}
