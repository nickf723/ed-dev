"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  CircleDot,
  Filter,
  Grid3X3,
  RotateCcw,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  type LucideIcon,
} from "lucide-react";
import { queryCollection } from "@/lib/collections/query.mjs";
import type { CollectionFacetDefinition } from "@/lib/collections/schema";
import {
  BOARD_GAMES,
  BOARD_GAME_COLLECTION_PROVENANCE,
  BOARD_GAME_FACETS,
  boardGameHref,
  type BoardGameFamily,
  type BoardGameRecord,
} from "./board-game-data";

const FAMILY_ICONS: Record<BoardGameFamily, LucideIcon> = {
  alignment: Grid3X3,
  connection: Target,
  sowing: CircleDot,
};

const FAMILY_FACET = BOARD_GAME_FACETS.find((facet) => facet.id === "family")!;
const COMPLEXITY_FACET = BOARD_GAME_FACETS.find((facet) => facet.id === "complexity")!;
const MECHANIC_FACET = BOARD_GAME_FACETS.find((facet) => facet.id === "mechanic")!;

function searchText(game: BoardGameRecord): readonly string[] {
  return [
    game.title,
    ...game.aliases,
    game.subtitle,
    game.summary,
    game.familyLabel,
    game.complexity,
    game.duration,
    ...game.mechanics,
  ];
}

export default function BoardGameBrowser() {
  const [query, setQuery] = useState("");
  const [selectedFacets, setSelectedFacets] = useState<Record<string, readonly string[]>>({});

  const result = useMemo(
    () =>
      queryCollection({
        records: BOARD_GAMES,
        query: { text: query, facets: selectedFacets },
        facets: BOARD_GAME_FACETS,
        getSearchText: searchText,
      }),
    [query, selectedFacets],
  );

  const selectedFamily = selectedFacets.family?.[0] ?? "";

  function selectFacet(facetId: string, value: string) {
    setSelectedFacets((current) => ({
      ...current,
      [facetId]: value ? [value] : [],
    }));
  }

  function resetQuery() {
    setQuery("");
    setSelectedFacets({});
  }

  return (
    <div>
      <div className="grid gap-3 border-b border-white/[0.07] pb-5 lg:grid-cols-[minmax(280px,1fr)_190px_220px] lg:items-center">
        <label className="relative block">
          <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-amber-200/48" />
          <span className="sr-only">Search board games</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search titles, aliases, or mechanics…"
            className="h-12 w-full rounded-[16px] border border-amber-100/[0.11] bg-black/[0.18] pl-11 pr-4 text-[14px] text-white outline-none transition placeholder:text-slate-600 focus:border-amber-200/30 focus:bg-black/[0.24]"
          />
        </label>

        <FacetSelect
          facet={COMPLEXITY_FACET}
          value={selectedFacets.complexity?.[0] ?? ""}
          counts={result.facetCounts.complexity}
          onChange={(value) => selectFacet("complexity", value)}
        />
        <FacetSelect
          facet={MECHANIC_FACET}
          value={selectedFacets.mechanic?.[0] ?? ""}
          counts={result.facetCounts.mechanic}
          onChange={(value) => selectFacet("mechanic", value)}
        />

        <fieldset className="flex flex-wrap items-center gap-2 lg:col-span-3">
          <legend className="sr-only">Filter board games by family</legend>
          <span className="mr-1 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-600">
            <Filter size={12} /> family
          </span>
          <button
            type="button"
            aria-pressed={!selectedFamily}
            onClick={() => selectFacet("family", "")}
            className="rounded-full border px-3 py-2 text-[11px] font-semibold transition"
            style={{
              color: !selectedFamily ? "rgb(255,251,235)" : "rgb(148,163,184)",
              borderColor: !selectedFamily ? "rgba(251,191,36,0.28)" : "rgba(255,255,255,0.07)",
              background: !selectedFamily ? "rgba(251,191,36,0.07)" : "rgba(255,255,255,0.015)",
            }}
          >
            All games <span className="ml-1 text-slate-600">{result.total}</span>
          </button>
          {FAMILY_FACET.options.map((option) => {
            const selected = option.id === selectedFamily;
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={selected}
                onClick={() => selectFacet("family", option.id)}
                className="rounded-full border px-3 py-2 text-[11px] font-semibold transition"
                style={{
                  color: selected ? "rgb(255,251,235)" : "rgb(148,163,184)",
                  borderColor: selected ? "rgba(251,191,36,0.28)" : "rgba(255,255,255,0.07)",
                  background: selected ? "rgba(251,191,36,0.07)" : "rgba(255,255,255,0.015)",
                }}
              >
                {option.label} <span className="ml-1 text-slate-600">{result.facetCounts.family[option.id]}</span>
              </button>
            );
          })}
        </fieldset>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[12px] text-slate-400" role="status">
            {result.matched === 1 ? "1 playable record" : `${result.matched} playable records`}
            {result.matched !== result.total ? ` of ${result.total}` : ""}
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-600">
            <ShieldCheck size={11} className="text-emerald-200/48" />
            Curated rulesets · reviewed <time dateTime={BOARD_GAME_COLLECTION_PROVENANCE.reviewedAt}>Aug 20, 2026</time> · {BOARD_GAME_COLLECTION_PROVENANCE.sources.length} named references
          </p>
        </div>
        {result.activeFilterCount > 0 ? (
          <button type="button" onClick={resetQuery} className="flex items-center gap-2 rounded-full border border-white/[0.07] px-3 py-2 text-[11px] font-semibold text-slate-500 transition hover:border-white/20 hover:text-white">
            <RotateCcw size={11} /> Reset search and filters
          </button>
        ) : (
          <p className="hidden font-mono text-[11px] uppercase tracking-[0.07em] text-slate-700 sm:block">
            rules · components · simulation
          </p>
        )}
      </div>

      {result.records.length > 0 ? (
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {result.records.map((game) => <GameRecordCard key={game.slug} game={game} />)}
        </div>
      ) : (
        <div className="mt-4 rounded-[22px] border border-dashed border-white/[0.09] bg-black/[0.10] px-5 py-16 text-center">
          <Search size={24} className="mx-auto text-slate-700" />
          <h2 className="mt-4 text-[17px] font-semibold text-white">No records match that search.</h2>
          <p className="mt-2 text-[12px] text-slate-500">Try a title, alternate name, family, or mechanic such as capture or gravity.</p>
          <button type="button" onClick={resetQuery} className="mx-auto mt-5 flex items-center gap-2 rounded-full border border-amber-100/[0.13] bg-amber-200/[0.035] px-4 py-2.5 text-[11px] font-semibold text-amber-100/72 transition hover:border-amber-100/30 hover:text-white">
            <RotateCcw size={12} /> Show the full shelf
          </button>
        </div>
      )}
    </div>
  );
}

function FacetSelect({
  facet,
  value,
  counts,
  onChange,
}: {
  facet: CollectionFacetDefinition<BoardGameRecord>;
  value: string;
  counts: Record<string, number>;
  onChange(value: string): void;
}) {
  return (
    <label className="grid gap-1.5">
      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-600">{facet.label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 rounded-[16px] border border-amber-100/[0.11] bg-[#0d0a07] px-3 text-[12px] text-slate-300 outline-none transition focus:border-amber-200/30"
      >
        <option value="">Any {facet.label.toLocaleLowerCase()}</option>
        {facet.options.map((option) => (
          <option key={option.id} value={option.id} disabled={counts[option.id] === 0 && option.id !== value}>
            {option.label} ({counts[option.id]})
          </option>
        ))}
      </select>
    </label>
  );
}

function GameRecordCard({ game }: { game: BoardGameRecord }) {
  const Icon = FAMILY_ICONS[game.family];

  return (
    <Link
      href={boardGameHref(game.slug)}
      className="group flex min-h-[350px] flex-col rounded-[23px] border p-5 backdrop-blur-xl transition hover:-translate-y-0.5"
      style={{
        borderColor: `rgba(${game.accentRgb},0.17)`,
        background: `linear-gradient(145deg,rgba(${game.accentRgb},0.05),rgba(8,6,4,0.22))`,
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className="flex h-11 w-11 items-center justify-center rounded-[14px] border"
          style={{
            color: `rgb(${game.accentRgb})`,
            borderColor: `rgba(${game.accentRgb},0.27)`,
            background: `rgba(${game.accentRgb},0.05)`,
          }}
        >
          <Icon size={19} />
        </span>
        <span className="flex items-center gap-1.5 rounded-full border border-emerald-200/[0.10] bg-emerald-300/[0.025] px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.06em] text-emerald-200/58">
          <Sparkles size={10} /> playable
        </span>
      </div>

      <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.07em]" style={{ color: `rgba(${game.accentRgb},0.68)` }}>
        {game.familyLabel} · {game.players} players · {game.duration}
      </div>
      <h2 className="mt-1 text-[23px] font-semibold tracking-[-0.035em] text-white">{game.title}</h2>
      <p className="mt-1 text-[11px] text-slate-500">{game.subtitle}</p>
      <p className="mt-4 text-[13px] leading-6 text-slate-400">{game.summary}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {game.mechanics.slice(0, 3).map((mechanic) => (
          <span key={mechanic} className="rounded-full border border-white/[0.06] bg-black/[0.12] px-2.5 py-1.5 text-[11px] text-slate-500">
            {mechanic}
          </span>
        ))}
      </div>

      <span className="mt-auto flex items-center justify-between border-t border-white/[0.06] pt-5 text-[11px] font-semibold text-white/76">
        Open game record
        <ArrowRight size={13} className="transition group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
