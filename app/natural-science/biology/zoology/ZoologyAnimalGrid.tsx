"use client";

import { Activity, ArrowRight, Database, Dna, Network } from "lucide-react";
import type { AnimalRecord } from "./zoology-data";

export default function ZoologyAnimalGrid({
  animals,
  loading,
  error,
  accentRgb,
  onSelect,
}: {
  animals: AnimalRecord[];
  loading: boolean;
  error: string | null;
  accentRgb: string;
  onSelect: (animal: AnimalRecord) => void;
}) {
  if (loading && animals.length === 0) {
    return (
      <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <Skeleton key={index} />
        ))}
      </div>
    );
  }

  if (error && animals.length === 0) {
    return (
      <div className="rounded-[24px] border border-red-300/[0.14] bg-red-400/[0.04] p-10 text-center">
        <strong className="text-[15px] text-red-200">
          The live collection could not load.
        </strong>
        <p className="mt-2 text-[12px] leading-5 text-red-200/[0.60]">
          {error}
        </p>
      </div>
    );
  }

  if (!animals.length) {
    return (
      <div className="rounded-[24px] border border-dashed border-white/[0.10] bg-black/[0.16] p-12 text-center">
        <Dna size={28} className="mx-auto text-slate-600" />
        <p className="mt-3 text-[13px] text-slate-400">
          No species match this view.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
      {animals.map((animal) => (
        <AnimalCard
          key={String(animal.id)}
          animal={animal}
          accentRgb={accentRgb}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

function AnimalCard({
  animal,
  accentRgb,
  onSelect,
}: {
  animal: AnimalRecord;
  accentRgb: string;
  onSelect: (animal: AnimalRecord) => void;
}) {
  const memberships = animal.collectionIds.length;
  const tags = [
    ...(animal.diet ? [animal.diet] : []),
    ...animal.ecologicalRoles,
    ...animal.traits,
  ].slice(0, 4);

  return (
    <button
      type="button"
      onClick={() => onSelect(animal)}
      className="group flex min-h-[460px] flex-col overflow-hidden rounded-[25px] border border-white/[0.08] bg-black/[0.16] text-left shadow-[0_22px_80px_rgba(0,0,0,0.18)] backdrop-blur-lg transition hover:-translate-y-1 hover:border-white/[0.16]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-white/[0.025]">
        {animal.imageUrl ? (
          // Provider-hosted, variably licensed field-guide media stays direct so
          // a missing image can degrade locally without incurring image transforms.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={animal.imageUrl}
            alt={animal.commonName}
            className="h-full w-full object-cover opacity-[0.88] transition duration-700 group-hover:scale-105 group-hover:opacity-100"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_center,rgba(52,211,153,0.11),transparent_62%)]">
            <Dna
              size={46}
              className="text-emerald-300/[0.20]"
              strokeWidth={1.2}
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07100c] via-transparent to-black/[0.14]" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {animal.taxonomy.className ? (
            <Chip>{animal.taxonomy.className}</Chip>
          ) : null}
          {animal.conservationStatus ? (
            <Chip>{shortStatus(animal.conservationStatus)}</Chip>
          ) : null}
        </div>
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full border border-white/[0.14] bg-black/[0.46] px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.07em] text-white/[0.72] backdrop-blur-md">
          <Database size={10} />
          {animal.source === "iNaturalist" ? "live record" : "curated record"}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-[24px] font-semibold leading-tight tracking-[-0.035em] text-white group-hover:text-emerald-100">
          {animal.commonName}
        </h3>
        <p className="mt-1.5 font-serif text-[13px] italic text-slate-400">
          {animal.scientificName}
        </p>
        <p className="mt-4 line-clamp-3 text-[13px] leading-6 text-slate-300/[0.72]">
          {animal.summary}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/[0.08] bg-white/[0.025] px-3 py-1.5 text-[11px] capitalize text-slate-400"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-white/[0.07] pt-4 font-mono text-[11px] font-semibold uppercase tracking-[0.07em] text-slate-500">
          <span className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1.5">
              <Activity size={11} />
              {animal.observationsCount === undefined
                ? "no count"
                : `${compact(animal.observationsCount)} observations`}
            </span>
            {memberships ? (
              <span className="flex items-center gap-1.5">
                <Network size={11} /> {memberships} atlas sets
              </span>
            ) : null}
          </span>
          <ArrowRight
            size={14}
            style={{ color: `rgba(${accentRgb},0.78)` }}
            className="shrink-0 transition group-hover:translate-x-1"
          />
        </div>
      </div>
    </button>
  );
}

function Skeleton() {
  return (
    <div className="min-h-[460px] overflow-hidden rounded-[25px] border border-white/[0.07] bg-white/[0.016]">
      <div className="aspect-[4/3] animate-pulse bg-white/[0.045]" />
      <div className="space-y-3 p-6">
        <div className="h-6 w-2/3 animate-pulse rounded bg-white/[0.055]" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-white/[0.04]" />
        <div className="mt-5 h-16 animate-pulse rounded bg-white/[0.03]" />
      </div>
    </div>
  );
}

function Chip({ children }: { children: string }) {
  return (
    <span className="rounded-full border border-white/[0.14] bg-black/[0.48] px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.07em] text-white/[0.74] backdrop-blur-md">
      {children}
    </span>
  );
}

function compact(value: number) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function shortStatus(value: string) {
  const words = value.trim().split(/\s+/);
  return words.length > 3 ? words.slice(0, 3).join(" ") : value;
}
