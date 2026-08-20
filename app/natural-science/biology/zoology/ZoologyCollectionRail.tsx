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
    <aside className="overflow-hidden rounded-[27px] border border-amber-100/[0.15] bg-[#1a2419]/[0.66] shadow-[0_26px_90px_rgba(0,0,0,0.26)] backdrop-blur-xl xl:sticky xl:top-[196px] xl:max-h-[calc(100vh_-_222px)] xl:overflow-y-auto">
      <div className="border-b border-amber-100/[0.10] bg-[#2a3020]/[0.54] px-5 py-5">
        <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-100/[0.64]">
          <Signpost size={13} /> Atlas lens
        </div>
        <p className="mt-2 text-[12px] leading-5 text-amber-50/[0.50]">
          First choose the biological relationship, then choose a collection inside
          that view.
        </p>
      </div>

      <div className="p-3.5">
        <div className="grid gap-2.5">
          {lenses.map((item) => {
            const Icon = ICONS[item.icon] ?? Dna;
            const active = item.id === lens;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onLens(item.id)}
                className={`relative overflow-hidden rounded-[16px] border px-4 py-4 text-left transition ${
                  active
                    ? "border-amber-100/[0.22] bg-[#36402b]/[0.78] shadow-[0_12px_30px_rgba(0,0,0,0.20)]"
                    : "border-transparent bg-black/[0.07] hover:border-amber-100/[0.12] hover:bg-black/[0.14]"
                }`}
              >
                {active ? (
                  <span className="absolute inset-y-3 left-0 w-1 rounded-r-full bg-emerald-300/[0.70]" />
                ) : null}
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-[11px] border ${
                      active
                        ? "border-emerald-100/[0.20] bg-emerald-300/[0.08] text-emerald-100"
                        : "border-white/[0.07] text-amber-50/[0.34]"
                    }`}
                  >
                    <Icon size={16} />
                  </span>
                  <strong
                    className={
                      active
                        ? "text-[13px] text-amber-50"
                        : "text-[13px] text-amber-50/[0.58]"
                    }
                  >
                    {item.label}
                  </strong>
                </div>
                <p className="mt-2 pl-[52px] text-[11px] leading-5 text-amber-50/[0.44]">
                  {item.question}
                </p>
              </button>
            );
          })}
        </div>

        <div className="my-5 flex items-center gap-3 px-1">
          <div className="h-px flex-1 bg-amber-100/[0.09]" />
          <MapPinned size={13} className="text-amber-100/[0.34]" />
          <div className="h-px flex-1 bg-amber-100/[0.09]" />
        </div>

        <div className="space-y-2">
          {collections.map((collection, index) => {
            const Icon = ICONS[collection.icon] ?? Dna;
            const active = collection.id === activeId;
            return (
              <button
                key={collection.id}
                type="button"
                onClick={() => onCollection(collection)}
                className={`group relative flex min-h-[64px] w-full items-center gap-3 rounded-[14px] border px-3 py-3 text-left transition ${
                  active
                    ? "border-amber-100/[0.18] bg-[#2c3324]/[0.76]"
                    : "border-transparent hover:border-amber-100/[0.10] hover:bg-black/[0.12]"
                }`}
              >
                <span className="w-6 text-center font-mono text-[11px] text-amber-50/[0.30]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] border"
                  style={{
                    color: `rgb(${collection.accentRgb})`,
                    borderColor: `rgba(${collection.accentRgb},${active ? 0.34 : 0.16})`,
                    background: `rgba(${collection.accentRgb},${active ? 0.11 : 0.045})`,
                  }}
                >
                  <Icon size={16} />
                </span>
                <span className="min-w-0 flex-1">
                  <strong
                    className={`block text-[12px] leading-5 ${
                      active
                        ? "text-amber-50"
                        : "text-amber-50/[0.54] group-hover:text-amber-50/[0.78]"
                    }`}
                  >
                    {collection.label}
                  </strong>
                  <span className="mt-0.5 block text-[11px] text-amber-50/[0.34]">
                    {collection.speciesIds.length} curated species
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
