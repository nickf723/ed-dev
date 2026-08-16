"use client";

import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import type { DesignPaletteRoles } from "@/lib/design-system/schema";
import { Activity, ArrowRight, BookOpen, Bone, Check, CircleDashed, Database, Dna, GitBranch, Globe2, Network, PawPrint, Search, Sparkles } from "lucide-react";
import ZoologyBackground from "./ZoologyBackground";
import ZoologyModal from "./ZoologyModal";
import ZoologyCollectionRail from "./ZoologyCollectionRail";
import ZoologyControls, { type SortMode } from "./ZoologyControls";
import ZoologyAnimalGrid from "./ZoologyAnimalGrid";
import { useAnimalAtlas } from "./useAnimalAtlas";
import { ANIMAL_SEEDS, ZOOLOGY_COLLECTIONS, ZOOLOGY_COLLECTION_BY_ID, ZOOLOGY_LENSES, type AnimalRecord, type ZoologyCollection, type ZoologyLens } from "./zoology-data";

type Branch = { id: string; label: string; href: string; description?: string; status: "active" | "placeholder" };
type Props = { palette: DesignPaletteRoles; branches: Branch[] };

export default function ZoologyAtlas({ palette, branches }: Props) {
  const [lens, setLens] = useState<ZoologyLens>("habitat");
  const [collectionId, setCollectionId] = useState("rainforest");
  const [query, setQuery] = useState("");
  const [classFilter, setClassFilter] = useState("all");
  const [sort, setSort] = useState<SortMode>("curated");
  const [selected, setSelected] = useState<AnimalRecord | null>(null);
  const collection = ZOOLOGY_COLLECTION_BY_ID.get(collectionId) ?? ZOOLOGY_COLLECTIONS[0];
  const collections = ZOOLOGY_COLLECTIONS.filter((item) => item.lens === lens);
  const { animals, loading, error, mode, search, clearSearch, refresh } = useAnimalAtlas(collection.id);

  const classes = useMemo(() => Array.from(new Set(animals.map((animal) => animal.taxonomy.className ?? animal.iconicTaxonName).filter((value): value is string => Boolean(value)))).sort(), [animals]);
  const visible = useMemo(() => {
    const local = query.trim().toLowerCase();
    const order = new Map(collection.speciesIds.map((id, index) => [id, index]));
    return animals
      .filter((animal) => {
        const animalClass = animal.taxonomy.className ?? animal.iconicTaxonName ?? "";
        if (classFilter !== "all" && animalClass !== classFilter) return false;
        if (mode.kind === "search" || !local) return true;
        return [animal.commonName, animal.scientificName, animal.summary, ...animal.traits, ...animal.ecologicalRoles].join(" ").toLowerCase().includes(local);
      })
      .sort((a, b) => {
        if (sort === "name") return a.commonName.localeCompare(b.commonName);
        if (sort === "observations") return (b.observationsCount ?? -1) - (a.observationsCount ?? -1);
        if (sort === "taxonomy") return (a.taxonomy.className ?? "").localeCompare(b.taxonomy.className ?? "");
        return (order.get(a.seedId ?? "") ?? 999) - (order.get(b.seedId ?? "") ?? 999);
      });
  }, [animals, classFilter, collection.speciesIds, mode, query, sort]);

  const overlaps = useMemo(() => {
    const ids = new Set(collection.speciesIds);
    return ZOOLOGY_COLLECTIONS.filter((item) => item.id !== collection.id && item.lens !== collection.lens)
      .map((item) => ({ item, count: item.speciesIds.filter((id) => ids.has(id)).length }))
      .filter((entry) => entry.count > 0)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [collection]);

  const related = useMemo(() => selected ? animals.filter((animal) => animal.id !== selected.id).sort((a, b) => relationScore(selected, b) - relationScore(selected, a)) : [], [animals, selected]);
  const liveCount = animals.filter((animal) => animal.source === "iNaturalist").length;
  const activeLens = ZOOLOGY_LENSES.find((item) => item.id === lens) ?? ZOOLOGY_LENSES[0];

  function chooseLens(next: ZoologyLens) {
    const first = ZOOLOGY_COLLECTIONS.find((item) => item.lens === next);
    if (!first) return;
    setLens(next); setCollectionId(first.id); setQuery(""); setClassFilter("all"); setSort("curated"); setSelected(null);
  }
  function chooseCollection(next: ZoologyCollection) {
    setCollectionId(next.id); setQuery(""); setClassFilter("all"); setSort("curated"); setSelected(null);
  }
  async function submitSearch(event: FormEvent<HTMLFormElement>) { event.preventDefault(); if (!query.trim()) return; setClassFilter("all"); setSort("observations"); setSelected(null); await search(query); }
  async function resetSearch() { setQuery(""); setClassFilter("all"); setSort("curated"); await clearSearch(); }

  return (
    <main className="relative min-h-screen overflow-x-hidden selection:bg-emerald-400/[0.24]" style={{ background: `rgb(${palette.background})`, color: `rgb(${palette.text})` }}>
      <ZoologyBackground accentRgb={collection.accentRgb} environment={collection.environment} />
      <div className="relative z-10 mx-auto w-full max-w-[1640px] px-4 pb-14 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-40 -mx-4 border-b border-white/[0.07] px-4 pb-3 pt-5 shadow-[0_18px_55px_rgba(0,0,0,0.22)] backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8" style={{ background: `rgba(${palette.background},0.82)` }}>
          <DomainPageHeader breadcrumbs={[{ label: "Natural Science", href: "/natural-science" }, { label: "Biology", href: "/natural-science/biology" }, { label: "Zoology" }]} eyebrow="Diversity · classification · behavior · ecology" eyebrowStyle="rule" icon={PawPrint} title={<span>Zoology</span>} subtitle="Explore the animal kingdom as a living collection. The same species can be grouped by habitat, lineage, or ecological role—and each grouping reveals a different biological pattern." accentRgb={palette.primary} titleClassName="text-[clamp(2.8rem,5.4vw,6.2rem)] font-semibold leading-[0.82] tracking-[-0.065em] text-[#f4fff7]" headerClassName="border-white/[0.08]" />
        </div>

        <section className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,1fr)_390px] xl:items-end">
          <div>
            <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-emerald-200/[0.68]">Three coordinates for one kingdom</div>
            <h2 className="mt-2 max-w-4xl text-[clamp(1.8rem,3.4vw,3.2rem)] font-semibold leading-[0.96] tracking-[-0.045em] text-white">An animal is never only one kind of thing.</h2>
            <p className="mt-3 max-w-3xl text-[12px] leading-6 text-slate-400">A jaguar is simultaneously a rainforest animal, a mammal, and an apex predator. Switch the organizing lens to see which similarities become visible.</p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <MiniStat label="Curated species" value={String(ANIMAL_SEEDS.length)} rgb={palette.primary} /><MiniStat label="Collections" value={String(ZOOLOGY_COLLECTIONS.length)} rgb={palette.secondary} /><MiniStat label="Live records" value={String(liveCount)} rgb={palette.tertiary} />
          </div>
        </section>

        <section className="mt-5 grid gap-4 xl:grid-cols-[260px_minmax(0,1fr)]">
          <ZoologyCollectionRail lenses={ZOOLOGY_LENSES} lens={lens} collections={collections} activeId={collection.id} onLens={chooseLens} onCollection={chooseCollection} />
          <div className="min-w-0">
            <CollectionHeader collection={collection} lensQuestion={activeLens.question} count={animals.length} liveCount={liveCount} overlaps={overlaps} onOverlap={(next) => { setLens(next.lens); chooseCollection(next); }} />
            <div className="mt-4"><ZoologyControls query={query} classFilter={classFilter} classes={classes} sort={sort} searching={loading} onQuery={setQuery} onSearch={submitSearch} onClear={() => void resetSearch()} onClass={setClassFilter} onSort={setSort} onRefresh={() => refresh()} /></div>
            {mode.kind === "search" ? <div className="mt-3 flex items-center justify-between rounded-[14px] border border-cyan-300/[0.10] bg-cyan-400/[0.025] px-4 py-3"><span className="flex items-center gap-2 text-[9px] text-cyan-100/[0.66]"><Search size={12} /> Global animal search · {animals.length} taxon records</span><button type="button" onClick={() => void resetSearch()} className="text-[8px] font-semibold uppercase tracking-[0.12em] text-cyan-200">Return to {collection.label}</button></div> : null}
            <div className="mt-4"><ZoologyAnimalGrid animals={visible} loading={loading} error={error} accentRgb={collection.accentRgb} onSelect={setSelected} /></div>
          </div>
        </section>

        <BranchSection branches={branches} palette={palette} />
      </div>

      {selected ? <ZoologyModal animal={selected} related={related} onClose={() => setSelected(null)} onSelectRelated={setSelected} /> : null}
    </main>
  );
}

function CollectionHeader({ collection, lensQuestion, count, liveCount, overlaps, onOverlap }: { collection: ZoologyCollection; lensQuestion: string; count: number; liveCount: number; overlaps: { item: ZoologyCollection; count: number }[]; onOverlap: (collection: ZoologyCollection) => void }) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-white/[0.09] bg-black/[0.19] shadow-[0_30px_100px_rgba(0,0,0,0.20)] backdrop-blur-xl">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="p-6 sm:p-7">
          <div className="flex items-center gap-2 font-mono text-[8px] font-semibold uppercase tracking-[0.15em]" style={{ color: `rgba(${collection.accentRgb},0.72)` }}><Sparkles size={11} /> {lensQuestion}</div>
          <h2 className="mt-3 text-[clamp(2rem,4vw,4.4rem)] font-semibold leading-[0.9] tracking-[-0.055em] text-white">{collection.label}</h2>
          <p className="mt-3 max-w-3xl text-[12px] leading-6 text-slate-400">{collection.description}</p>
          <div className="mt-5 flex flex-wrap gap-2 font-mono text-[7px] uppercase tracking-[0.1em] text-slate-600"><span>{count} records</span><span>·</span><span>{liveCount} live</span><span>·</span><span>{collection.speciesIds.length} curated members</span></div>
        </div>
        <div className="border-t border-white/[0.07] p-5 lg:border-l lg:border-t-0">
          <div className="font-mono text-[8px] font-semibold uppercase tracking-[0.14em] text-slate-600">Strong overlaps</div>
          <p className="mt-2 text-[9px] leading-4 text-slate-600">Switch dimensions without losing the species relationship.</p>
          <div className="mt-3 space-y-1.5">{overlaps.length ? overlaps.map(({ item, count: overlapCount }) => <button key={item.id} type="button" onClick={() => onOverlap(item)} className="group flex w-full items-center justify-between rounded-[10px] border border-white/[0.065] bg-white/[0.018] px-3 py-2.5 text-left hover:bg-white/[0.04]"><span className="text-[9px] text-slate-400 group-hover:text-white">{item.label}</span><span className="font-mono text-[8px]" style={{ color: `rgb(${item.accentRgb})` }}>{overlapCount} shared</span></button>) : <span className="text-[9px] text-slate-700">No curated overlap yet.</span>}</div>
        </div>
      </div>
    </div>
  );
}

function BranchSection({ branches, palette }: { branches: Branch[]; palette: DesignPaletteRoles }) {
  return (
    <section className="mt-8 border-t border-white/[0.08] pt-7">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"><div><div className="font-mono text-[8px] font-semibold uppercase tracking-[0.15em] text-emerald-200/[0.62]">Study the animal kingdom</div><h2 className="mt-1 text-[25px] font-semibold tracking-[-0.035em] text-white">Collections open into deeper zoology.</h2></div><p className="max-w-lg text-[10px] leading-5 text-slate-500">The atlas is a browsing surface. These branches organize the explanatory content beneath it.</p></div>
      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">{branches.map((branch) => <BranchCard key={branch.id} branch={branch} palette={palette} />)}</div>
    </section>
  );
}
function BranchCard({ branch, palette }: { branch: Branch; palette: DesignPaletteRoles }) {
  const active = branch.status !== "placeholder";
  const Icon = branch.id.endsWith("paleozoology") ? Bone : branch.id.endsWith("ethology") ? Activity : branch.id.includes("taxonomy") ? GitBranch : BookOpen;
  const body = <article className={`group flex min-h-[190px] flex-col rounded-[20px] border p-5 ${active ? "border-white/[0.08] bg-white/[0.022] transition hover:-translate-y-1 hover:border-emerald-300/[0.16]" : "border-white/[0.05] bg-black/[0.12] opacity-55"}`}><div className="flex items-start justify-between"><span className="flex h-10 w-10 items-center justify-center rounded-[12px] border" style={{ color: `rgb(${palette.primary})`, borderColor: `rgba(${palette.primary},0.16)`, background: `rgba(${palette.primary},0.045)` }}><Icon size={16} /></span>{active ? <ArrowRight size={13} className="text-slate-700 group-hover:text-emerald-300" /> : <CircleDashed size={13} className="text-slate-700" />}</div><h3 className="mt-5 text-[14px] font-semibold text-white">{branch.label}</h3><p className="mt-2 text-[9px] leading-5 text-slate-600">{branch.description}</p><span className="mt-auto pt-4 font-mono text-[7px] uppercase tracking-[0.1em] text-slate-700">{active ? "Open branch" : "Planned"}</span></article>;
  return active ? <Link href={branch.href}>{body}</Link> : <div aria-disabled="true">{body}</div>;
}
function MiniStat({ label, value, rgb }: { label: string; value: string; rgb: string }) { return <div className="rounded-[16px] border border-white/[0.07] bg-black/[0.18] p-3 text-center"><div className="font-mono text-[18px] font-semibold" style={{ color: `rgb(${rgb})` }}>{value}</div><div className="mt-1 font-mono text-[7px] uppercase tracking-[0.09em] text-slate-600">{label}</div></div>; }
function relationScore(a: AnimalRecord, b: AnimalRecord) { let score = 0; if (a.taxonomy.className && a.taxonomy.className === b.taxonomy.className) score += 4; if (a.diet && a.diet === b.diet) score += 2; score += a.ecologicalRoles.filter((role) => b.ecologicalRoles.includes(role)).length * 3; score += a.habitats.filter((habitat) => b.habitats.includes(habitat)).length * 2; return score; }
