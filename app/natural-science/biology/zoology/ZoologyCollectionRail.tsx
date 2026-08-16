"use client";

import { Bird, Bug, CloudFog, Crown, Dna, Droplets, Fish, Flower2, GitBranch, Globe2, Hammer, HeartHandshake, Leaf, Mountain, Network, PawPrint, Shell, Snowflake, Sun, ThermometerSun, Trees, Users, Waves, type LucideIcon } from "lucide-react";
import type { ZoologyCollection, ZoologyLens, ZoologyLensDefinition } from "./zoology-data";

const ICONS: Record<string, LucideIcon> = { Bird, Bug, CloudFog, Crown, Dna, Droplets, Fish, Flower2, GitBranch, Globe2, Hammer, HeartHandshake, Leaf, Mountain, Network, PawPrint, Shell, Snowflake, Sun, ThermometerSun, Trees, Users, Waves };

export default function ZoologyCollectionRail({
  lenses,
  lens,
  collections,
  activeId,
  onLens,
  onCollection,
}: {
  lenses: ZoologyLensDefinition[];
  lens: ZoologyLens;
  collections: ZoologyCollection[];
  activeId: string;
  onLens: (lens: ZoologyLens) => void;
  onCollection: (collection: ZoologyCollection) => void;
}) {
  return (
    <aside className="rounded-[26px] border border-white/[0.08] bg-black/[0.18] p-3 shadow-[0_24px_90px_rgba(0,0,0,0.22)] backdrop-blur-xl xl:sticky xl:top-[188px] xl:max-h-[calc(100vh-214px)] xl:overflow-y-auto">
      <div className="px-2 pb-2 pt-1 font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-slate-600">
        Organize the kingdom
      </div>
      <div className="grid gap-1.5">
        {lenses.map((item) => {
          const Icon = ICONS[item.icon] ?? Dna;
          const active = item.id === lens;
          return (
            <button key={item.id} type="button" onClick={() => onLens(item.id)} className={`rounded-[14px] border px-3 py-3 text-left transition ${active ? "border-emerald-300/[0.18] bg-emerald-400/[0.07]" : "border-transparent hover:border-white/[0.07] hover:bg-white/[0.025]"}`}>
              <div className="flex items-center gap-2">
                <Icon size={14} className={active ? "text-emerald-200" : "text-slate-600"} />
                <strong className={active ? "text-[10px] text-white" : "text-[10px] text-slate-400"}>{item.label}</strong>
              </div>
              <p className="mt-1.5 text-[8px] leading-4 text-slate-600">{item.question}</p>
            </button>
          );
        })}
      </div>

      <div className="my-4 h-px bg-white/[0.07]" />
      <div className="space-y-1">
        {collections.map((collection) => {
          const Icon = ICONS[collection.icon] ?? Dna;
          const active = collection.id === activeId;
          return (
            <button key={collection.id} type="button" onClick={() => onCollection(collection)} className={`group flex w-full items-center gap-3 rounded-[13px] border px-3 py-2.5 text-left transition ${active ? "border-white/[0.12] bg-white/[0.055]" : "border-transparent hover:border-white/[0.07] hover:bg-white/[0.025]"}`}>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] border" style={{ color: `rgb(${collection.accentRgb})`, borderColor: `rgba(${collection.accentRgb},${active ? 0.28 : 0.12})`, background: `rgba(${collection.accentRgb},${active ? 0.08 : 0.025})` }}>
                <Icon size={14} />
              </span>
              <span className="min-w-0 flex-1">
                <strong className={`block truncate text-[9px] ${active ? "text-white" : "text-slate-500 group-hover:text-slate-300"}`}>{collection.label}</strong>
                <span className="mt-0.5 block font-mono text-[7px] uppercase tracking-[0.08em] text-slate-700">{collection.speciesIds.length} specimens</span>
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
