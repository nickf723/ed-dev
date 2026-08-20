"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  CircleDot,
  Filter,
  Grid3X3,
  Search,
  Sparkles,
  Target,
  type LucideIcon,
} from "lucide-react";
import {
  BOARD_GAMES,
  boardGameHref,
  type BoardGameFamily,
  type BoardGameRecord,
} from "./board-game-data";

const FAMILY_ICONS: Record<BoardGameFamily, LucideIcon> = {
  alignment: Grid3X3,
  connection: Target,
  sowing: CircleDot,
};

const FILTERS: readonly { id: "all" | BoardGameFamily; label: string }[] = [
  { id: "all", label: "All games" },
  { id: "alignment", label: "Alignment" },
  { id: "connection", label: "Connection" },
  { id: "sowing", label: "Sowing" },
];

export default function BoardGameBrowser() {
  const [query, setQuery] = useState("");
  const [family, setFamily] = useState<(typeof FILTERS)[number]["id"]>("all");

  const games = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    return BOARD_GAMES.filter((game) => {
      if (family !== "all" && game.family !== family) return false;
      if (!needle) return true;
      const searchable = [
        game.title,
        ...game.aliases,
        game.subtitle,
        game.summary,
        game.familyLabel,
        ...game.mechanics,
      ].join(" ").toLocaleLowerCase();
      return searchable.includes(needle);
    });
  }, [family, query]);

  return (
    <div>
      <div className="grid gap-3 border-b border-white/[0.07] pb-5 lg:grid-cols-[minmax(280px,1fr)_auto] lg:items-center">
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

        <div className="flex flex-wrap items-center gap-2" aria-label="Filter board games">
          <span className="mr-1 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-600">
            <Filter size={12} /> family
          </span>
          {FILTERS.map((filter) => {
            const selected = filter.id === family;
            return (
              <button
                key={filter.id}
                type="button"
                aria-pressed={selected}
                onClick={() => setFamily(filter.id)}
                className="rounded-full border px-3 py-2 text-[11px] font-semibold transition"
                style={{
                  color: selected ? "rgb(255,251,235)" : "rgb(148,163,184)",
                  borderColor: selected ? "rgba(251,191,36,0.28)" : "rgba(255,255,255,0.07)",
                  background: selected ? "rgba(251,191,36,0.07)" : "rgba(255,255,255,0.015)",
                }}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-[12px] text-slate-500" role="status">
          {games.length === 1 ? "1 playable record" : `${games.length} playable records`}
        </p>
        <p className="hidden font-mono text-[11px] uppercase tracking-[0.07em] text-slate-700 sm:block">
          rules · components · simulation
        </p>
      </div>

      {games.length > 0 ? (
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {games.map((game) => <GameRecordCard key={game.slug} game={game} />)}
        </div>
      ) : (
        <div className="mt-4 rounded-[22px] border border-dashed border-white/[0.09] bg-black/[0.10] px-5 py-16 text-center">
          <Search size={24} className="mx-auto text-slate-700" />
          <h2 className="mt-4 text-[17px] font-semibold text-white">No records match that search.</h2>
          <p className="mt-2 text-[12px] text-slate-500">Try a title, alternate name, family, or mechanic such as capture or gravity.</p>
        </div>
      )}
    </div>
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
