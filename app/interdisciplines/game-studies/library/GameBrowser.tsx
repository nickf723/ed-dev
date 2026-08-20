"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Dices,
  Filter,
  Gamepad2,
  Layers3,
  Sparkles,
  Sword,
  Users,
  type LucideIcon,
} from "lucide-react";

type GameRecord = {
  id: string;
  title: string;
  genre: string;
  family: "tabletop" | "cards" | "roleplay" | "digital";
  icon: LucideIcon;
  rgb: string;
  lenses: readonly string[];
  description: string;
  href?: string;
};

const GAMES: readonly GameRecord[] = [
  {
    id: "mtg",
    title: "Magic: The Gathering",
    genre: "Trading card game",
    family: "cards",
    icon: Sword,
    rgb: "251,191,36",
    lenses: ["resource systems", "hidden information", "deck construction", "metagame"],
    description: "A customizable card game useful for studying resource conversion, combinatorial interactions, deck construction, probability, strategic adaptation, and changing metagames.",
    href: "/interdisciplines/game-studies/library/magic-the-gathering",
  },
  {
    id: "dnd",
    title: "Dungeons & Dragons",
    genre: "Tabletop role-playing game",
    family: "roleplay",
    icon: Dices,
    rgb: "248,113,113",
    lenses: ["shared fiction", "probability", "roles", "negotiated rules"],
    description: "A tabletop role-playing system where procedures, probability, character roles, improvisation, and collaborative fiction interact across a long-running social play session.",
  },
  {
    id: "monopoly",
    title: "Monopoly",
    genre: "Board game",
    family: "tabletop",
    icon: Users,
    rgb: "74,222,128",
    lenses: ["property control", "negotiation", "positive feedback", "player elimination"],
    description: "A property-trading board game useful for examining asset accumulation, negotiation, spatial movement, positive feedback, bankruptcy, and the length of elimination-based play.",
  },
  {
    id: "uno",
    title: "UNO",
    genre: "Shedding card game",
    family: "cards",
    icon: Layers3,
    rgb: "250,204,21",
    lenses: ["matching rules", "hand information", "turn order", "random draw"],
    description: "A shedding card game with simple matching rules, changing hand information, action cards, turn-order effects, and a strong role for draw uncertainty.",
  },
  {
    id: "mario",
    title: "Super Mario Bros.",
    genre: "Platform game",
    family: "digital",
    icon: Gamepad2,
    rgb: "96,165,250",
    lenses: ["movement model", "level geometry", "timing", "feedback"],
    description: "A platform game useful for studying movement rules, obstacle spacing, timing, audiovisual feedback, level sequencing, player learning, and the relationship between control and challenge.",
  },
] as const;

const FILTERS: readonly { id: "all" | GameRecord["family"]; label: string }[] = [
  { id: "all", label: "All specimens" },
  { id: "cards", label: "Card games" },
  { id: "tabletop", label: "Board games" },
  { id: "roleplay", label: "Role-playing" },
  { id: "digital", label: "Digital games" },
] as const;

export default function GameBrowser() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");
  const filteredGames = useMemo(() => filter === "all" ? GAMES : GAMES.filter((game) => game.family === filter), [filter]);

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center gap-2 border-b border-white/[0.07] pb-4">
        <span className="mr-1 flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-500"><Filter size={13} /> specimen shelf</span>
        {FILTERS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setFilter(item.id)}
            className="rounded-full border px-3 py-2 text-[10px] font-semibold transition"
            style={{
              borderColor: filter === item.id ? "rgba(167,139,250,0.26)" : "rgba(255,255,255,0.07)",
              background: filter === item.id ? "rgba(167,139,250,0.07)" : "rgba(255,255,255,0.015)",
              color: filter === item.id ? "rgb(237,233,254)" : "rgb(148,163,184)",
            }}
          >
            {item.label}
          </button>
        ))}
        <span className="ml-auto hidden font-mono text-[9px] uppercase tracking-[0.06em] text-slate-600 sm:block">live analyses open · planned specimens stay visible</span>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredGames.map((game) => <GameCard key={game.id} game={game} />)}
      </div>
    </div>
  );
}

function GameCard({ game }: { game: GameRecord }) {
  const Icon = game.icon;
  const live = Boolean(game.href);
  const body = (
    <article
      className={`group flex min-h-[330px] flex-col rounded-[22px] border p-5 backdrop-blur-xl ${live ? "transition hover:-translate-y-0.5" : "opacity-66"}`}
      style={{
        borderColor: `rgba(${game.rgb},0.16)`,
        background: `linear-gradient(145deg,rgba(${game.rgb},0.04),rgba(7,5,13,0.20))`,
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-[14px] border" style={{ color: `rgb(${game.rgb})`, borderColor: `rgba(${game.rgb},0.26)`, background: `rgba(${game.rgb},0.045)` }}><Icon size={19} /></span>
        <span className="rounded-full border border-white/[0.07] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.06em] text-slate-500">{live ? "open analysis" : "planned"}</span>
      </div>

      <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.07em]" style={{ color: `rgba(${game.rgb},0.66)` }}>{game.genre}</div>
      <h3 className="mt-1 text-[20px] font-semibold tracking-[-0.025em] text-white">{game.title}</h3>
      <p className="mt-3 text-[13px] leading-6 text-slate-400">{game.description}</p>

      <div className="mt-5 border-t border-white/[0.06] pt-4">
        <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.06em] text-violet-200/55"><Sparkles size={11} /> study lenses</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {game.lenses.map((lens) => <span key={lens} className="rounded-full border border-white/[0.06] bg-black/[0.12] px-2.5 py-1.5 text-[10px] text-slate-400">{lens}</span>)}
        </div>
      </div>

      <div className="mt-auto pt-5">
        {live ? (
          <span className="flex items-center justify-between rounded-[13px] border border-violet-200/[0.12] bg-violet-300/[0.035] px-3 py-2.5 text-[11px] font-semibold text-violet-100/82">Open specimen <ArrowRight size={12} className="transition group-hover:translate-x-1" /></span>
        ) : (
          <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.06em] text-slate-600"><Sparkles size={10} /> analysis route not built yet</span>
        )}
      </div>
    </article>
  );

  return live && game.href ? <Link href={game.href}>{body}</Link> : <div aria-disabled="true">{body}</div>;
}
