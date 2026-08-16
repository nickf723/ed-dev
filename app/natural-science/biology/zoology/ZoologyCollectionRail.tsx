"use client";

import {
  Bird,
  Bug,
  CloudFog,
  Crown,
  Dna,
  Droplets,
  Fish,
  Flower2,
  GitBranch,
  Globe2,
  Hammer,
  HeartHandshake,
  Leaf,
  MapPinned,
  Mountain,
  Network,
  PawPrint,
  Shell,
  Signpost,
  Snowflake,
  Sun,
  ThermometerSun,
  Trees,
  Users,
  Waves,
  type LucideIcon,
} from "lucide-react";
import type {
  ZoologyCollection,
  ZoologyLens,
  ZoologyLensDefinition,
} from "./zoology-data";

const ICONS: Record<string, LucideIcon> = {
  Bird,
  Bug,
  CloudFog,
  Crown,
  Dna,
  Droplets,
  Fish,
  Flower2,
  GitBranch,
  Globe2,
  Hammer,
  HeartHandshake,
  Leaf,
  Mountain,
  Network,
  PawPrint,
  Shell,
  Snowflake,
  Sun,
  ThermometerSun,
  Trees,
  Users,
  Waves,
};

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
    <aside className="overflow-hidden rounded-[26px] border border-amber-100/[0.14] bg-[#1a2419]/[0.92] shadow-[0_26px_90px_rgba(0,0,0,0.30)] xl:sticky xl:top-[188px] xl:max-h-[calc(100vh-214px)] xl:overflow-y-auto">
      <div className="border-b border-amber-100/[0.10] bg-[#2a3020]/85 px-4 py-4">
        <div className="flex items-center gap-2 font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-amber-100/55">
          <Signpost size={12} /> Exhibit guide
        </div>
        <p className="mt-2 text-[9px] leading-4 text-amber-50/34">
          Choose a district, then follow its trail of habitats, lineages, or ecological roles.
        </p>
      </div>

      <div className="p-3">
        <div className="grid gap-2">
          {lenses.map((item) => {
            const Icon = ICONS[item.icon] ?? Dna;
            const active = item.id === lens;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onLens(item.id)}
                className={`relative overflow-hidden rounded-[15px] border px-3 py-3 text-left transition ${
                  active
                    ? "border-amber-100/[0.20] bg-[#36402b] shadow-[0_12px_30px_rgba(0,0,0,0.22)]"
                    : "border-transparent bg-black/[0.08] hover:border-amber-100/[0.10] hover:bg-black/[0.15]"
                }`}
              >
                {active ? <span className="absolute inset-y-2 left-0 w-1 rounded-r-full bg-emerald-300/60" /> : null}
                <div className="flex items-center gap-2.5">
                  <span className={`flex h-8 w-8 items-center justify-center rounded-[10px] border ${active ? "border-emerald-100/[0.18] bg-emerald-300/[0.07] text-emerald-100" : "border-white/[0.06] text-amber-50/28"}`}>
                    <Icon size={14} />
                  </span>
                  <strong className={active ? "text-[10px] text-amber-50" : "text-[10px] text-amber-50/46"}>{item.label}</strong>
                </div>
                <p className="mt-2 pl-[42px] text-[8px] leading-4 text-amber-50/30">{item.question}</p>
              </button>
            );
          })}
        </div>

        <div className="my-4 flex items-center gap-3 px-1">
          <div className="h-px flex-1 bg-amber-100/[0.08]" />
          <MapPinned size={11} className="text-amber-100/28" />
          <div className="h-px flex-1 bg-amber-100/[0.08]" />
        </div>

        <div className="space-y-1.5">
          {collections.map((collection, index) => {
            const Icon = ICONS[collection.icon] ?? Dna;
            const active = collection.id === activeId;
            return (
              <button
                key={collection.id}
                type="button"
                onClick={() => onCollection(collection)}
                className={`group relative flex w-full items-center gap-3 rounded-[13px] border px-3 py-2.5 text-left transition ${
                  active
                    ? "border-amber-100/[0.16] bg-[#2c3324]"
                    : "border-transparent hover:border-amber-100/[0.08] hover:bg-black/[0.12]"
                }`}
              >
                <span className="w-5 text-center font-mono text-[7px] text-amber-50/22">{String(index + 1).padStart(2, "0")}</span>
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] border"
                  style={{
                    color: `rgb(${collection.accentRgb})`,
                    borderColor: `rgba(${collection.accentRgb},${active ? 0.32 : 0.14})`,
                    background: `rgba(${collection.accentRgb},${active ? 0.10 : 0.035})`,
                  }}
                >
                  <Icon size={15} />
                </span>
                <span className="min-w-0 flex-1">
                  <strong className={`block truncate text-[9px] ${active ? "text-amber-50" : "text-amber-50/42 group-hover:text-amber-50/70"}`}>{collection.label}</strong>
                  <span className="mt-0.5 block font-mono text-[7px] uppercase tracking-[0.08em] text-amber-50/22">{collection.speciesIds.length} specimens</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
