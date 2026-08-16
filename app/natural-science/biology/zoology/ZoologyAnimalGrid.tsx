"use client";

import { Activity, ArrowRight, Database, Dna, Network } from "lucide-react";
import type { AnimalRecord } from "./zoology-data";

export default function ZoologyAnimalGrid({ animals, loading, error, accentRgb, onSelect }: { animals: AnimalRecord[]; loading: boolean; error: string | null; accentRgb: string; onSelect: (animal: AnimalRecord) => void }) {
  if (loading && animals.length === 0) return <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">{Array.from({ length: 6 }, (_, index) => <Skeleton key={index} />)}</div>;
  if (error && animals.length === 0) return <div className="rounded-[24px] border border-red-300/[0.12] bg-red-400/[0.035] p-10 text-center"><strong className="text-sm text-red-200">The live collection could not load.</strong><p className="mt-2 text-[10px] text-red-200/[0.55]">{error}</p></div>;
  if (!animals.length) return <div className="rounded-[24px] border border-dashed border-white/[0.09] bg-black/[0.15] p-12 text-center"><Dna size={26} className="mx-auto text-slate-700" /><p className="mt-3 text-[11px] text-slate-500">No species match this view.</p></div>;

  return (
    <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
      {animals.map((animal) => <AnimalCard key={String(animal.id)} animal={animal} accentRgb={accentRgb} onSelect={onSelect} />)}
    </div>
  );
}

function AnimalCard({ animal, accentRgb, onSelect }: { animal: AnimalRecord; accentRgb: string; onSelect: (animal: AnimalRecord) => void }) {
  const memberships = animal.collectionIds.length;
  return (
    <button type="button" onClick={() => onSelect(animal)} className="group flex min-h-[430px] flex-col overflow-hidden rounded-[24px] border border-white/[0.075] bg-black/[0.22] text-left shadow-[0_22px_80px_rgba(0,0,0,0.18)] backdrop-blur-lg transition hover:-translate-y-1 hover:border-white/[0.15]">
      <div className="relative aspect-[4/3] overflow-hidden bg-white/[0.025]">
        {animal.imageUrl ? <img src={animal.imageUrl} alt={animal.commonName} className="h-full-w-full object-cover opacity-85 transition duration-700 group-hover:scale-105 group-hover:opacity-100" referrerPolicy="no-referrer" /> : <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_center,rgba(52,211,153,0.10),transparent_62%)]"><Dna size={44} className="text-emerald-300/[0.18]" strokeWidth={1.2} /></div>}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07100c] via-transparent to-black/[0.14]" />
        <div className="absolute left-3 top-3 flex gap-2">
          {animal.taxonomy.className ? <Chip>{animal.taxonomy.className}</Chip> : null}
          {animal.conservationStatus ? <Chip>{shortStatus(animal.conservationStatus)}</Chip> : null}
        </div>
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full border border-white/[0.12] bg-black/[0.42] px-2.5 py-1 font-mono text-[7px] uppercase tracking-[0.08em] text-white/[0.62] backdrop-blur-md"><Database size={9} /> {animal.source === "iNaturalist" ? "live" : "curated"}</div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[22px] font-semibold leading-tight tracking-[-0.035em] text-white group-hover:text-emerald-100">{animal.commonName}</h3>
        <p className="mt-1.5 font-serif text-[12px] italic text-slate-500">{animal.scientificName}</p>
        <p className="mt-4 line-clamp-3 text-[11px] leading-5 text-slate-400">{animal.summary}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">{[...(animal.diet ? [animal.diet] : []), ...animal.ecologicalRoles, ...animal.traits].slice(0, 4).map((tag) => <span key={tag} className="rounded-full border border-white/[0.065] bg-white/[0.02] px-2.5 py-1 text-[7px] capitalize text-slate-500">{tag}</span>)}</div>
        <div className="mt-auto flex items-center justify-between border-t border-white/[0.06] pt-4 font-mono text-[7px] uppercase tracking-[0.08em] text-slate-600">
          <span className="flex items-center gap-3"><span className="flex items-center gap-1"><Activity size={9} /> {animal.observationsCount === undefined ? "—" : compact(animal.observationsCount)}</span>{memberships ? <span className="flex items-center gap-1"><Network size={9} /> {memberships} sets</span> : null}</span>
          <ArrowRight size={12} style={{ color: `rgba(${accentRgb},0.7)` }} className="transition group-hover:translate-x-1" />
        </div>
      </div>
    </button>
  );
}

function Skeleton() { return <div className="min-h-[430px] overflow-hidden rounded-[24px] border border-white/[0.06] bg-white/[0.015]"><div className="aspect-[4/3] animate-pulse bg-white/[0.04]" /><div className="space-y-3 p-5"><div className="h-5 w-2/3 animate-pulse rounded bg-white/[0.05]" /><div className="h-3 w-1/2 animate-pulse rounded bg-white/[0.035]" /><div className="mt-5 h-16 animate-pulse rounded bg-white/[0.025]" /></div></div>; }
function Chip({ children }: { children: string }) { return <span className="rounded-full border border-white/[0.12] bg-black/[0.44] px-2.5 py-1 font-mono text-[7px] uppercase tracking-[0.08em] text-white/[0.68] backdrop-blur-md">{children}</span>; }
function compact(value: number) { return new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(value); }
function shortStatus(value: string) { const words = value.trim().split(/\s+/); return words.length > 3 ? words.slice(0, 3).join(" ") : value; }
