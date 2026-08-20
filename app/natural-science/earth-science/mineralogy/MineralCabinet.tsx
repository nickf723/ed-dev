"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronDown,
  FlaskConical,
  Gem,
  RotateCcw,
  Search,
  Sparkles,
} from "lucide-react";
import { queryCollection } from "@/lib/collections/query.mjs";
import type { CollectionFacetDefinition } from "@/lib/collections/schema";
import {
  MINERAL_CABINET_PROVENANCE,
  MINERAL_FACETS,
  MINERAL_SPECIMENS,
  mineralSearchText,
  type CrystalMotif,
  type MineralRecord,
} from "./mineral-data";

type DiagnosticKey = "hardness" | "streak" | "cleavage" | "fracture" | "luster";

const DIAGNOSTICS: readonly {
  id: DiagnosticKey;
  label: string;
  question: string;
}[] = [
  { id: "hardness", label: "Hardness", question: "What can scratch what?" },
  { id: "streak", label: "Streak", question: "What color is the powder?" },
  {
    id: "cleavage",
    label: "Cleavage",
    question: "Does it break along repeated planes?",
  },
  {
    id: "fracture",
    label: "Fracture",
    question: "How does an irregular break look?",
  },
  {
    id: "luster",
    label: "Luster",
    question: "How does the surface reflect light?",
  },
] as const;

const GEM_LABELS = {
  "major-gem": "Major gem material",
  "ornamental-collector": "Ornamental / collector",
  "not-typically-gem": "Not typically a gem",
} as const;

const MINERAL_IDS = new Set(MINERAL_SPECIMENS.map((record) => record.id));

export default function MineralCabinet() {
  const [query, setQuery] = useState("");
  const [selectedFacets, setSelectedFacets] = useState<
    Record<string, readonly string[]>
  >({});
  const [selectedId, setSelectedId] = useState("quartz");
  const [comparisonId, setComparisonId] = useState("calcite");
  const [diagnostic, setDiagnostic] = useState<DiagnosticKey>("hardness");

  const result = useMemo(
    () =>
      queryCollection({
        records: MINERAL_SPECIMENS,
        query: { text: query, facets: selectedFacets },
        facets: MINERAL_FACETS,
        getSearchText: mineralSearchText,
      }),
    [query, selectedFacets]
  );

  const selected =
    MINERAL_SPECIMENS.find((record) => record.id === selectedId) ??
    MINERAL_SPECIMENS[0];
  const comparison =
    MINERAL_SPECIMENS.find((record) => record.id === comparisonId) ??
    MINERAL_SPECIMENS[1];

  useEffect(() => {
    function readAddressedSpecimen() {
      const id = window.location.hash.replace(/^#specimen-/, "");
      if (!MINERAL_IDS.has(id)) return;
      setSelectedId(id);
      setComparisonId((current) =>
        current === id ? (id === "calcite" ? "quartz" : "calcite") : current
      );
    }

    readAddressedSpecimen();
    window.addEventListener("hashchange", readAddressedSpecimen);
    return () =>
      window.removeEventListener("hashchange", readAddressedSpecimen);
  }, []);

  function selectFacet(facetId: string, value: string) {
    setSelectedFacets((current) => ({
      ...current,
      [facetId]: value ? [value] : [],
    }));
  }

  function clearFilters() {
    setQuery("");
    setSelectedFacets({});
  }

  function selectSpecimen(id: string) {
    setSelectedId(id);
    if (comparisonId === id) {
      setComparisonId(id === "calcite" ? "quartz" : "calcite");
    }
    window.history.replaceState(null, "", `#specimen-${id}`);
  }

  function selectComparison(id: string) {
    if (id !== selected.id) setComparisonId(id);
  }

  return (
    <section aria-labelledby="cabinet-title" className="relative">
      <div className="bg-[#090710]/36 grid gap-5 border-y border-white/[0.07] px-5 py-6 backdrop-blur-xl sm:px-7 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end xl:px-8">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-fuchsia-100/70">
            <Gem size={14} /> Curated teaching cabinet
          </div>
          <h2
            id="cabinet-title"
            className="mt-2 max-w-5xl text-[clamp(2.2rem,4.7vw,4.8rem)] font-semibold leading-[0.9] tracking-[-0.06em] text-[#fff8ff]"
          >
            Identify by evidence,
            <br className="hidden sm:block" /> not by color.
          </h2>
        </div>
        <div className="border-l border-fuchsia-100/[0.14] pl-4">
          <p className="text-slate-300/78 text-[14px] leading-6">
            Natural color varies. Search the cabinet, select a specimen, then
            compare several properties that follow from composition, bonding,
            and crystal structure.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[9px] uppercase tracking-[0.08em] text-slate-500">
            <span>{MINERAL_SPECIMENS.length} reviewed records</span>
            <span>Curated · no live API</span>
          </div>
        </div>
      </div>

      <div className="mt-7 grid items-start gap-5 xl:grid-cols-[280px_minmax(270px,0.78fr)_minmax(440px,1.22fr)]">
        <aside
          aria-label="Mineral cabinet filters"
          className="bg-[#0b0710]/64 overflow-hidden rounded-[24px] border border-fuchsia-100/[0.11] shadow-[0_30px_100px_rgba(0,0,0,0.3)] backdrop-blur-2xl xl:sticky xl:top-[174px]"
        >
          <div className="border-b border-white/[0.07] px-4 py-4">
            <div className="text-fuchsia-100/58 font-mono text-[9px] font-semibold uppercase tracking-[0.12em]">
              Cabinet index
            </div>
            <label className="relative mt-3 block">
              <span className="sr-only">Search mineral records</span>
              <Search
                size={15}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Name, formula, property…"
                className="h-11 w-full rounded-[13px] border border-white/[0.09] bg-black/25 pl-9 pr-3 text-[13px] text-white outline-none transition placeholder:text-slate-600 focus:border-fuchsia-200/35 focus:ring-2 focus:ring-fuchsia-300/10"
              />
            </label>
          </div>

          <div className="space-y-4 px-4 py-4">
            {MINERAL_FACETS.map((facet) => (
              <MineralFacetSelect
                key={facet.id}
                facet={facet}
                value={selectedFacets[facet.id]?.[0] ?? ""}
                counts={result.facetCounts[facet.id] ?? {}}
                onChange={(value) => selectFacet(facet.id, value)}
              />
            ))}
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-white/[0.07] px-4 py-4">
            <div>
              <strong className="block text-[18px] text-white">
                {result.matched}
              </strong>
              <span className="font-mono text-[8px] uppercase tracking-[0.08em] text-slate-600">
                of {result.total} specimens
              </span>
            </div>
            {result.activeFilterCount > 0 ? (
              <button
                type="button"
                onClick={clearFilters}
                className="flex min-h-10 items-center gap-2 rounded-full border border-white/[0.09] px-3 text-[10px] font-semibold text-slate-400 transition hover:border-fuchsia-100/25 hover:text-white"
              >
                <RotateCcw size={12} /> Clear
              </button>
            ) : null}
          </div>
        </aside>

        <div className="bg-[#07070b]/52 min-w-0 overflow-hidden rounded-[28px] border border-white/[0.09] shadow-[0_30px_100px_rgba(0,0,0,0.28)] backdrop-blur-xl [scrollbar-color:rgba(216,180,254,0.18)_transparent] [scrollbar-width:thin] xl:max-h-[calc(100vh-174px)] xl:overflow-y-auto">
          <div className="flex flex-wrap items-end justify-between gap-3 border-b border-white/[0.07] px-5 py-4 sm:px-6">
            <div>
              <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-slate-500">
                Specimen drawers
              </div>
              <h3 className="mt-1 text-[21px] font-semibold tracking-[-0.035em] text-white">
                A small cabinet built for comparison
              </h3>
            </div>
            <p className="max-w-md text-[11px] leading-5 text-slate-500">
              This is a teaching selection across major classes and diagnostic
              behaviors, not a complete catalog of named mineral species.
            </p>
          </div>

          {result.records.length > 0 ? (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(145px,1fr))]">
              {result.records.map((record) => (
                <SpecimenDrawer
                  key={record.id}
                  record={record}
                  selected={record.id === selected.id}
                  onSelect={() => selectSpecimen(record.id)}
                />
              ))}
            </div>
          ) : (
            <div className="px-6 py-14 text-center">
              <Search size={22} className="mx-auto text-fuchsia-100/35" />
              <h3 className="mt-3 text-[18px] font-semibold text-white">
                No specimen matches that evidence.
              </h3>
              <p className="mx-auto mt-2 max-w-lg text-[12px] leading-5 text-slate-500">
                An empty result can be informative: the selected property
                combination does not occur in this curated cabinet.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mx-auto mt-5 flex min-h-11 items-center gap-2 rounded-full border border-fuchsia-100/[0.18] px-4 text-[11px] font-semibold text-fuchsia-50/80 transition hover:border-fuchsia-100/40 hover:text-white"
              >
                <RotateCcw size={13} /> Reopen every drawer
              </button>
            </div>
          )}
        </div>

        <article
          id={`specimen-${selected.id}`}
          className="bg-[#09070e]/66 scroll-mt-44 overflow-hidden rounded-[30px] border border-fuchsia-100/[0.12] shadow-[0_38px_120px_rgba(0,0,0,0.34)] backdrop-blur-2xl [scrollbar-color:rgba(216,180,254,0.18)_transparent] [scrollbar-width:thin] xl:sticky xl:top-[174px] xl:max-h-[calc(100vh-174px)] xl:self-start xl:overflow-y-auto"
        >
          <div>
            <div className="relative min-h-[350px] overflow-hidden border-b border-white/[0.08] px-5 py-6 sm:px-6">
              <div
                className="pointer-events-none absolute inset-0 opacity-70"
                style={{
                  background: `radial-gradient(circle at 50% 35%, rgba(${selected.rgb},0.16), transparent 43%), linear-gradient(145deg,rgba(${selected.rgb},0.05),transparent 48%)`,
                }}
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.13] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:100%_42px]"
                aria-hidden="true"
              />
              <div className="relative flex h-full flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div
                      className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em]"
                      style={{ color: `rgba(${selected.rgb},0.78)` }}
                    >
                      {selected.mineralClassLabel} ·{" "}
                      {selected.crystalSystemLabel}
                    </div>
                    <h3 className="mt-1 text-[clamp(2rem,4vw,3.8rem)] font-semibold leading-none tracking-[-0.06em] text-white">
                      {selected.name}
                    </h3>
                    <div className="text-slate-300/72 mt-2 font-mono text-[16px]">
                      {selected.formula}
                    </div>
                  </div>
                  <span className="rounded-full border border-white/[0.08] bg-black/20 px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.09em] text-slate-500">
                    Mohs {selected.hardnessLabel}
                  </span>
                </div>

                <div className="my-auto flex min-h-[190px] items-center justify-center py-5">
                  <SpecimenGlyph record={selected} size="large" />
                </div>

                <p className="text-slate-300/78 max-w-lg text-[13px] leading-6">
                  {selected.diagnosticCue}
                </p>
              </div>
            </div>

            <div className="min-w-0 p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="text-fuchsia-100/58 flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.11em]">
                    <FlaskConical size={13} /> Diagnostic ledger
                  </div>
                  <h3 className="mt-1 text-[24px] font-semibold tracking-[-0.04em] text-white">
                    Compare independent observations.
                  </h3>
                </div>
                <label className="min-w-[220px]">
                  <span className="mb-1.5 block font-mono text-[8px] uppercase tracking-[0.1em] text-slate-600">
                    Compare against
                  </span>
                  <span className="relative block">
                    <select
                      value={comparison.id}
                      onChange={(event) => selectComparison(event.target.value)}
                      className="h-10 w-full appearance-none rounded-[12px] border border-white/[0.09] bg-black/25 pl-3 pr-8 text-[11px] font-semibold text-slate-300 outline-none focus:border-fuchsia-200/35 focus:ring-2 focus:ring-fuchsia-300/10"
                    >
                      {MINERAL_SPECIMENS.filter(
                        (record) => record.id !== selected.id
                      ).map((record) => (
                        <option key={record.id} value={record.id}>
                          {record.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={13}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                    />
                  </span>
                </label>
              </div>

              <div className="mt-5 grid gap-2 sm:grid-cols-5">
                {DIAGNOSTICS.map((item) => {
                  const active = item.id === diagnostic;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setDiagnostic(item.id)}
                      className={`min-h-[66px] rounded-[13px] border px-2.5 py-2 text-left transition ${
                        active
                          ? "border-fuchsia-200/[0.30] bg-fuchsia-200/[0.07] text-fuchsia-50"
                          : "border-white/[0.07] bg-black/15 text-slate-500 hover:border-white/[0.14] hover:text-slate-300"
                      }`}
                    >
                      <span className="block text-[10px] font-semibold">
                        {item.label}
                      </span>
                      <span className="leading-3.5 mt-1 block text-[8px] opacity-65">
                        {item.question}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 overflow-x-auto rounded-[18px] border border-white/[0.08] bg-black/20">
                <table className="w-full min-w-[620px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-white/[0.08]">
                      <th className="w-[150px] px-4 py-3 font-mono text-[8px] uppercase tracking-[0.1em] text-slate-600">
                        Observation
                      </th>
                      <th className="px-4 py-3 text-[12px] font-semibold text-white">
                        {selected.name}
                      </th>
                      <th className="px-4 py-3 text-[12px] font-semibold text-white">
                        {comparison.name}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {DIAGNOSTICS.map((item) => (
                      <DiagnosticRow
                        key={item.id}
                        label={item.label}
                        active={diagnostic === item.id}
                        selected={diagnosticValue(selected, item.id)}
                        comparison={diagnosticValue(comparison, item.id)}
                        selectedRgb={selected.rgb}
                        comparisonRgb={comparison.rgb}
                      />
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-5 grid gap-3 2xl:grid-cols-2">
                <EvidenceNote
                  record={selected}
                  comparison={comparison}
                  diagnostic={diagnostic}
                />
                <div className="rounded-[17px] border border-white/[0.08] bg-black/15 p-4">
                  <div className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.1em] text-slate-600">
                    <BookOpen size={12} /> Why it matters
                  </div>
                  <p className="mt-2 text-[11px] leading-5 text-slate-400">
                    {selected.significance}
                  </p>
                  <p className="mt-2 border-t border-white/[0.06] pt-2 text-[10px] leading-5 text-slate-500">
                    {selected.gemNote}
                  </p>
                </div>
              </div>

              <div className="mt-5 border-t border-white/[0.07] pt-4">
                <div className="font-mono text-[8px] uppercase tracking-[0.1em] text-slate-600">
                  Record sources
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selected.sources.map((source) => (
                    <a
                      key={`${selected.id}-${source.url}`}
                      href={source.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-9 items-center gap-2 rounded-full border border-white/[0.08] px-3 text-[9px] font-semibold text-slate-400 transition hover:border-fuchsia-100/25 hover:text-white"
                      title={source.scope}
                    >
                      {source.label} <ArrowUpRight size={11} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>

      <div className="mt-7 flex flex-col justify-between gap-4 border-y border-white/[0.07] bg-black/20 px-5 py-4 backdrop-blur-xl sm:flex-row sm:items-center sm:px-7">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-emerald-200/[0.15] bg-emerald-200/[0.035] text-emerald-200/70">
            <Check size={14} />
          </span>
          <p className="max-w-3xl text-[11px] leading-5 text-slate-400">
            <strong className="text-slate-200">Curated reference state.</strong>{" "}
            {MINERAL_CABINET_PROVENANCE.note}
          </p>
        </div>
        <span className="shrink-0 font-mono text-[8px] uppercase tracking-[0.09em] text-slate-600">
          Reviewed {MINERAL_CABINET_PROVENANCE.reviewedAt}
        </span>
      </div>
    </section>
  );
}

function MineralFacetSelect({
  facet,
  value,
  counts,
  onChange,
}: {
  facet: CollectionFacetDefinition<MineralRecord>;
  value: string;
  counts: Readonly<Record<string, number>>;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[8px] font-semibold uppercase tracking-[0.11em] text-slate-600">
        {facet.label}
      </span>
      <span className="relative block">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-10 w-full appearance-none rounded-[12px] border border-white/[0.08] bg-black/25 pl-3 pr-8 text-[11px] font-semibold text-slate-300 outline-none transition focus:border-fuchsia-200/35 focus:ring-2 focus:ring-fuchsia-300/10"
        >
          <option value="">All</option>
          {facet.options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label} · {counts[option.id] ?? 0}
            </option>
          ))}
        </select>
        <ChevronDown
          size={13}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
        />
      </span>
    </label>
  );
}

function SpecimenDrawer({
  record,
  selected,
  onSelect,
}: {
  record: MineralRecord;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className="group relative min-h-[220px] border-b border-r border-white/[0.065] p-4 text-left transition hover:bg-white/[0.025] focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-200/40"
      style={{
        background: selected
          ? `linear-gradient(145deg,rgba(${record.rgb},0.10),rgba(0,0,0,0.08))`
          : undefined,
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className="font-mono text-[8px] font-semibold uppercase tracking-[0.1em]"
          style={{ color: `rgba(${record.rgb},0.72)` }}
        >
          {record.mineralClassLabel}
        </span>
        <span className="font-mono text-[8px] text-slate-600">
          H {record.hardnessLabel}
        </span>
      </div>
      <div className="flex h-[106px] items-center justify-center">
        <SpecimenGlyph record={record} size="small" />
      </div>
      <div className="flex items-end justify-between gap-3">
        <span className="min-w-0">
          <strong className="block truncate text-[14px] font-semibold text-white/90">
            {record.name}
          </strong>
          <span className="mt-1 block font-mono text-[9px] text-slate-500">
            {record.formula}
          </span>
        </span>
        <span
          className="h-2.5 w-2.5 shrink-0 rounded-full border"
          style={{
            borderColor: `rgba(${record.rgb},0.7)`,
            background: selected ? `rgb(${record.rgb})` : "transparent",
            boxShadow: selected ? `0 0 18px rgba(${record.rgb},0.45)` : "none",
          }}
          aria-hidden="true"
        />
      </div>
    </button>
  );
}

function SpecimenGlyph({
  record,
  size,
}: {
  record: MineralRecord;
  size: "small" | "large";
}) {
  const dimension = size === "large" ? 210 : 92;
  const gradientId = `mineral-gradient-${record.id}-${size}`;
  const glowId = `mineral-glow-${record.id}-${size}`;

  return (
    <svg
      width={dimension}
      height={dimension}
      viewBox="0 0 120 120"
      aria-hidden="true"
      className="drop-shadow-[0_22px_34px_rgba(0,0,0,0.32)] transition-transform duration-300 group-hover:scale-[1.03]"
    >
      <defs>
        <linearGradient id={gradientId} x1="12" y1="10" x2="105" y2="112">
          <stop offset="0" stopColor={`rgba(${record.rgb},0.92)`} />
          <stop offset="0.58" stopColor={`rgba(${record.rgb},0.32)`} />
          <stop offset="1" stopColor={`rgba(${record.rgb},0.07)`} />
        </linearGradient>
        <filter id={glowId} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g
        fill={`url(#${gradientId})`}
        stroke={`rgba(${record.rgb},0.82)`}
        strokeWidth="1.35"
        strokeLinejoin="round"
        filter={`url(#${glowId})`}
      >
        <CrystalShape motif={record.motif} />
      </g>
      <path
        d="M24 94 C43 103 80 105 101 91"
        fill="none"
        stroke={`rgba(${record.rgb},0.22)`}
        strokeWidth="1"
      />
    </svg>
  );
}

function CrystalShape({ motif }: { motif: CrystalMotif }) {
  switch (motif) {
    case "sheet":
      return (
        <>
          <path d="M18 77 35 34 96 29 82 72 44 95Z" />
          <path d="m24 68 61-8M29 56l61-8M34 44l61-8" fill="none" />
        </>
      );
    case "blade":
      return (
        <>
          <path d="m28 91 14-66 18 7-5 62Z" />
          <path d="m53 94 12-78 19 12 7 62Z" />
          <path d="m80 91 7-49 13 17-4 31Z" />
        </>
      );
    case "cube":
      return (
        <>
          <path d="M25 40 62 22 96 42 59 61Z" />
          <path d="m25 40 34 21-1 38-34-22Z" />
          <path d="m59 61 37-19-1 37-37 20Z" />
        </>
      );
    case "rhombohedron":
      return (
        <>
          <path d="m25 44 47-22 25 29-46 23Z" />
          <path d="m25 44 26 30-5 27-26-30Z" />
          <path d="m51 74 46-23-5 28-46 22Z" />
        </>
      );
    case "octahedron":
      return (
        <>
          <path d="M60 13 101 58 60 105 19 58Z" />
          <path d="m60 13 9 45-9 47-9-47Z" />
          <path d="M19 58h82" fill="none" />
        </>
      );
    case "hex-prism":
      return (
        <>
          <path d="m37 24 23-12 23 12 9 65-32 18-32-18Z" />
          <path d="m37 24 23 13 23-13M60 37v70M28 89l32-17 32 17" fill="none" />
        </>
      );
    case "block":
      return (
        <>
          <path d="m22 42 43-21 35 21-42 22Z" />
          <path d="m22 42 36 22-7 37-36-23Z" />
          <path d="m58 64 42-22-4 38-45 21Z" />
          <path d="m38 52 3 39M79 53l-5 39" fill="none" />
        </>
      );
    case "pyritohedron":
      return (
        <>
          <path d="m60 13 31 17 15 34-22 35-43 8-28-29 7-42Z" />
          <path
            d="m60 13 2 47 44 4M62 60l22 39M62 60l-21 47M62 60 13 78M62 60 20 36"
            fill="none"
          />
        </>
      );
    case "point":
      return (
        <>
          <path d="M32 94 29 42 48 13l17 29-4 52Z" />
          <path d="m58 94 3-39 18-28 13 31-5 36Z" />
          <path d="m29 42 19 10 17-10M61 55l18 9 13-6" fill="none" />
        </>
      );
    case "barrel":
      return (
        <>
          <path d="m43 16 33 3 17 24-8 46-28 17-30-19-3-45Z" />
          <path
            d="m43 16 14 28 19-25M57 44v62M24 42l33 2 36-1M27 87l30-18 28 20"
            fill="none"
          />
        </>
      );
    case "mass":
      return (
        <>
          <path d="m17 84 13-39 24-12 16 8 24-14 11 35-15 34-48 10Z" />
          <path
            d="m30 45 24 22 16-26 20 55M54 67l-12 39M54 67l36-5"
            fill="none"
          />
        </>
      );
    case "prism":
    default:
      return <path d="m36 18 30-6 20 25 4 55-36 16-27-25Z" />;
  }
}

function DiagnosticRow({
  label,
  active,
  selected,
  comparison,
  selectedRgb,
  comparisonRgb,
}: {
  label: string;
  active: boolean;
  selected: string;
  comparison: string;
  selectedRgb: string;
  comparisonRgb: string;
}) {
  return (
    <tr
      className={active ? "bg-white/[0.035]" : "border-t border-white/[0.055]"}
    >
      <th className="px-4 py-3 font-mono text-[8px] font-semibold uppercase tracking-[0.09em] text-slate-600">
        {label}
      </th>
      <td className="px-4 py-3 text-[11px] leading-5 text-slate-300">
        <span
          className="mr-2 inline-block h-1.5 w-1.5 rounded-full align-middle"
          style={{ background: `rgb(${selectedRgb})` }}
          aria-hidden="true"
        />
        {selected}
      </td>
      <td className="px-4 py-3 text-[11px] leading-5 text-slate-300">
        <span
          className="mr-2 inline-block h-1.5 w-1.5 rounded-full align-middle"
          style={{ background: `rgb(${comparisonRgb})` }}
          aria-hidden="true"
        />
        {comparison}
      </td>
    </tr>
  );
}

function EvidenceNote({
  record,
  comparison,
  diagnostic,
}: {
  record: MineralRecord;
  comparison: MineralRecord;
  diagnostic: DiagnosticKey;
}) {
  const same =
    diagnosticValue(record, diagnostic) ===
    diagnosticValue(comparison, diagnostic);
  return (
    <div className="rounded-[17px] border border-fuchsia-100/[0.10] bg-fuchsia-100/[0.025] p-4">
      <div className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.1em] text-fuchsia-100/55">
        <Sparkles size={12} /> Evidence reading
      </div>
      <p className="mt-2 text-[11px] leading-5 text-slate-400">
        {same
          ? `${record.name} and ${comparison.name} share this recorded ${diagnostic} description, so this observation alone does not separate them. Add another test.`
          : `${capitalize(diagnostic)} separates these two records in the cabinet. Keep checking other properties before treating the comparison as an identification.`}
      </p>
      <div className="mt-3 border-t border-white/[0.06] pt-3 font-mono text-[8px] uppercase tracking-[0.08em] text-slate-600">
        {GEM_LABELS[record.gemRelationship]}
      </div>
    </div>
  );
}

function diagnosticValue(record: MineralRecord, key: DiagnosticKey): string {
  if (key === "hardness") return `${record.hardnessLabel} on the Mohs scale`;
  return record[key];
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
