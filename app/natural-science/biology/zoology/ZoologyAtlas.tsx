"use client";

import { useMemo, useState, type FormEvent } from "react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import ExhibitCampusTopology, {
  type ExhibitDestination,
} from "@/app/_page-system/topologies/ExhibitCampusTopology";
import type { DesignPaletteRoles } from "@/lib/design-system/schema";
import {
  Activity,
  Bone,
  Dna,
  GitBranch,
  Map,
  Microscope,
  PawPrint,
  Search,
  Sparkles,
} from "lucide-react";
import ZoologyBackground from "./ZoologyBackground";
import ZoologyModal from "./ZoologyModal";
import ZoologyCollectionRail from "./ZoologyCollectionRail";
import ZoologyControls, { type SortMode } from "./ZoologyControls";
import ZoologyAnimalGrid from "./ZoologyAnimalGrid";
import { useAnimalAtlas } from "./useAnimalAtlas";
import {
  ANIMAL_SEEDS,
  ZOOLOGY_COLLECTIONS,
  ZOOLOGY_COLLECTION_BY_ID,
  ZOOLOGY_LENSES,
  type AnimalRecord,
  type ZoologyCollection,
  type ZoologyLens,
} from "./zoology-data";

type Branch = {
  id: string;
  label: string;
  href: string;
  description?: string;
  status: "active" | "placeholder";
};

type Props = {
  palette: DesignPaletteRoles;
  branches: Branch[];
};

const BRANCH_STYLE = [
  { match: "diversity", icon: GitBranch, rgb: "52, 211, 153" },
  { match: "comparative", icon: Microscope, rgb: "34, 211, 238" },
  { match: "ethology", icon: Activity, rgb: "250, 204, 21" },
  { match: "paleozoology", icon: Bone, rgb: "244, 114, 182" },
];

export default function ZoologyAtlas({ palette, branches }: Props) {
  const [lens, setLens] = useState<ZoologyLens>("habitat");
  const [collectionId, setCollectionId] = useState("rainforest");
  const [query, setQuery] = useState("");
  const [classFilter, setClassFilter] = useState("all");
  const [sort, setSort] = useState<SortMode>("curated");
  const [selected, setSelected] = useState<AnimalRecord | null>(null);

  const collection =
    ZOOLOGY_COLLECTION_BY_ID.get(collectionId) ?? ZOOLOGY_COLLECTIONS[0];
  const collections = ZOOLOGY_COLLECTIONS.filter((item) => item.lens === lens);
  const {
    animals,
    loading,
    error,
    mode,
    search,
    clearSearch,
    refresh,
  } = useAnimalAtlas(collection.id);

  const classes = useMemo(
    () =>
      Array.from(
        new Set(
          animals
            .map(
              (animal) =>
                animal.taxonomy.className ?? animal.iconicTaxonName,
            )
            .filter((value): value is string => Boolean(value)),
        ),
      ).sort(),
    [animals],
  );

  const visible = useMemo(() => {
    const local = query.trim().toLowerCase();
    const order = new Map(
      collection.speciesIds.map((id, index) => [id, index]),
    );

    return animals
      .filter((animal) => {
        const animalClass =
          animal.taxonomy.className ?? animal.iconicTaxonName ?? "";
        if (classFilter !== "all" && animalClass !== classFilter) return false;
        if (mode.kind === "search" || !local) return true;
        return [
          animal.commonName,
          animal.scientificName,
          animal.summary,
          ...animal.traits,
          ...animal.ecologicalRoles,
        ]
          .join(" ")
          .toLowerCase()
          .includes(local);
      })
      .sort((a, b) => {
        if (sort === "name") return a.commonName.localeCompare(b.commonName);
        if (sort === "observations") {
          return (b.observationsCount ?? -1) - (a.observationsCount ?? -1);
        }
        if (sort === "taxonomy") {
          return (a.taxonomy.className ?? "").localeCompare(
            b.taxonomy.className ?? "",
          );
        }
        return (
          (order.get(a.seedId ?? "") ?? 999) -
          (order.get(b.seedId ?? "") ?? 999)
        );
      });
  }, [animals, classFilter, collection.speciesIds, mode, query, sort]);

  const overlaps = useMemo(() => {
    const ids = new Set(collection.speciesIds);
    return ZOOLOGY_COLLECTIONS.filter(
      (item) => item.id !== collection.id && item.lens !== collection.lens,
    )
      .map((item) => ({
        item,
        count: item.speciesIds.filter((id) => ids.has(id)).length,
      }))
      .filter((entry) => entry.count > 0)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [collection]);

  const related = useMemo(
    () =>
      selected
        ? animals
            .filter((animal) => animal.id !== selected.id)
            .sort(
              (a, b) =>
                relationScore(selected, b) - relationScore(selected, a),
            )
        : [],
    [animals, selected],
  );

  const liveCount = animals.filter(
    (animal) => animal.source === "iNaturalist",
  ).length;
  const activeLens =
    ZOOLOGY_LENSES.find((item) => item.id === lens) ?? ZOOLOGY_LENSES[0];
  const destinations = useMemo<ExhibitDestination[]>(
    () =>
      branches.map((branch) => {
        const style =
          BRANCH_STYLE.find((item) => branch.id.includes(item.match)) ??
          BRANCH_STYLE[0];
        return {
          id: branch.id,
          label: branch.label,
          summary: branch.description ?? "A deeper zoology research pavilion.",
          href: branch.href,
          status: branch.status === "placeholder" ? "planned" : "active",
          icon: style.icon,
          accentRgb: style.rgb,
        };
      }),
    [branches],
  );

  function chooseLens(next: ZoologyLens) {
    const first = ZOOLOGY_COLLECTIONS.find((item) => item.lens === next);
    if (!first) return;
    setLens(next);
    setCollectionId(first.id);
    setQuery("");
    setClassFilter("all");
    setSort("curated");
    setSelected(null);
  }

  function chooseCollection(next: ZoologyCollection) {
    setLens(next.lens);
    setCollectionId(next.id);
    setQuery("");
    setClassFilter("all");
    setSort("curated");
    setSelected(null);
  }

  async function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!query.trim()) return;
    setClassFilter("all");
    setSort("observations");
    setSelected(null);
    await search(query);
  }

  async function resetSearch() {
    setQuery("");
    setClassFilter("all");
    setSort("curated");
    await clearSearch();
  }

  return (
    <main
      className="relative min-h-screen overflow-x-hidden selection:bg-emerald-400/[0.24]"
      style={{
        background: `rgb(${palette.background})`,
        color: `rgb(${palette.text})`,
      }}
    >
      <ZoologyBackground
        accentRgb={collection.accentRgb}
        environment={collection.environment}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1640px] px-4 pb-14 sm:px-6 xl:px-8">
        <div
          className="sticky top-0 z-40 -mx-4 border-b border-emerald-50/[0.08] px-4 pb-3 pt-5 shadow-[0_18px_55px_rgba(0,0,0,0.26)] backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8"
          style={{ background: `rgba(${palette.background},0.78)` }}
        >
          <DomainPageHeader
            breadcrumbs={[
              { label: "Natural Science", href: "/natural-science" },
              { label: "Biology", href: "/natural-science/biology" },
              { label: "Zoology" },
            ]}
            eyebrow="Living collection · research pavilions · field evidence"
            eyebrowStyle="rule"
            icon={PawPrint}
            title={<span>Zoology</span>}
            subtitle="Enter the animal kingdom as a conservation park: direct research branches form the pavilions, while the central atlas lets the same species reappear across habitats, lineages, and ecological roles."
            accentRgb={palette.primary}
            titleClassName="font-sans text-[clamp(2.8rem,5.4vw,6.2rem)] font-semibold leading-[0.82] tracking-[-0.065em] text-[#f4fff7]"
            headerClassName="border-white/[0.08]"
          />
        </div>

        <section className="mt-5">
          <ExhibitCampusTopology
            title="Choose a zoology pavilion before entering the exhibits."
            description="Animal Diversity, Comparative Zoology, Ethology, and Paleozoology are the direct academic branches. Their placement around one shared habitat makes the hierarchy visible before the collection browser begins."
            centerLabel="Living Animal Atlas"
            centerSummary="Browse species as overlapping sets. Habitat shows environmental constraints; lineage shows inherited structure; ecology shows the work an animal performs in a community."
            destinations={destinations}
            accentRgb={palette.primary}
          />
        </section>

        <section className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,1fr)_390px] xl:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-amber-100/60">
              <Map size={12} /> Exhibit districts
            </div>
            <h2 className="mt-2 max-w-4xl text-[clamp(1.8rem,3.4vw,3.2rem)] font-semibold leading-[0.96] tracking-[-0.045em] text-white">
              The same animal belongs in several parts of the park.
            </h2>
            <p className="mt-3 max-w-3xl text-[12px] leading-6 text-emerald-50/52">
              A jaguar is simultaneously a rainforest animal, a mammal, and an apex predator. Change the district map to reveal a different biological relationship without changing the animal itself.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <MiniStat label="Curated species" value={String(ANIMAL_SEEDS.length)} rgb={palette.primary} />
            <MiniStat label="Exhibits" value={String(ZOOLOGY_COLLECTIONS.length)} rgb={palette.secondary} />
            <MiniStat label="Live records" value={String(liveCount)} rgb={palette.tertiary} />
          </div>
        </section>

        <section className="mt-5 grid gap-4 xl:grid-cols-[280px_minmax(0,1fr)]">
          <ZoologyCollectionRail
            lenses={ZOOLOGY_LENSES}
            lens={lens}
            collections={collections}
            activeId={collection.id}
            onLens={chooseLens}
            onCollection={chooseCollection}
          />

          <div className="min-w-0">
            <CollectionHeader
              collection={collection}
              lensQuestion={activeLens.question}
              count={animals.length}
              liveCount={liveCount}
              overlaps={overlaps}
              onOverlap={chooseCollection}
            />

            <div className="mt-4">
              <ZoologyControls
                query={query}
                classFilter={classFilter}
                classes={classes}
                sort={sort}
                searching={loading}
                onQuery={setQuery}
                onSearch={submitSearch}
                onClear={() => void resetSearch()}
                onClass={setClassFilter}
                onSort={setSort}
                onRefresh={() => refresh()}
              />
            </div>

            {mode.kind === "search" ? (
              <div className="mt-3 flex flex-col gap-2 rounded-[14px] border border-cyan-300/[0.12] bg-[#071b1d]/75 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="flex items-center gap-2 text-[9px] text-cyan-100/[0.68]">
                  <Search size={12} /> Global animal search · {animals.length} taxon records
                </span>
                <button type="button" onClick={() => void resetSearch()} className="text-left text-[8px] font-semibold uppercase tracking-[0.12em] text-cyan-200 sm:text-right">
                  Return to {collection.label}
                </button>
              </div>
            ) : null}

            <div className="mt-4">
              <ZoologyAnimalGrid
                animals={visible}
                loading={loading}
                error={error}
                accentRgb={collection.accentRgb}
                onSelect={setSelected}
              />
            </div>
          </div>
        </section>
      </div>

      {selected ? (
        <ZoologyModal
          animal={selected}
          related={related}
          onClose={() => setSelected(null)}
          onSelectRelated={setSelected}
        />
      ) : null}
    </main>
  );
}

function CollectionHeader({
  collection,
  lensQuestion,
  count,
  liveCount,
  overlaps,
  onOverlap,
}: {
  collection: ZoologyCollection;
  lensQuestion: string;
  count: number;
  liveCount: number;
  overlaps: { item: ZoologyCollection; count: number }[];
  onOverlap: (collection: ZoologyCollection) => void;
}) {
  return (
    <div className="overflow-hidden rounded-[30px] border border-amber-100/[0.12] bg-[#16231a]/[0.88] shadow-[0_30px_100px_rgba(0,0,0,0.28)]">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="relative p-6 sm:p-7">
          <div className="absolute inset-x-0 top-0 h-1" style={{ background: `linear-gradient(90deg,rgba(${collection.accentRgb},0.82),transparent)` }} />
          <div className="flex items-center gap-2 font-mono text-[8px] font-semibold uppercase tracking-[0.15em]" style={{ color: `rgba(${collection.accentRgb},0.74)` }}>
            <Sparkles size={11} /> {lensQuestion}
          </div>
          <h2 className="mt-3 text-[clamp(2rem,4vw,4.4rem)] font-semibold leading-[0.9] tracking-[-0.055em] text-[#fff9e8]">
            {collection.label}
          </h2>
          <p className="mt-3 max-w-3xl text-[12px] leading-6 text-emerald-50/48">
            {collection.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-2 font-mono text-[7px] uppercase tracking-[0.1em] text-amber-50/30">
            <span>{count} records</span><span>·</span><span>{liveCount} live</span><span>·</span><span>{collection.speciesIds.length} curated members</span>
          </div>
        </div>

        <div className="border-t border-amber-100/[0.10] bg-[#222719]/70 p-5 lg:border-l lg:border-t-0">
          <div className="font-mono text-[8px] font-semibold uppercase tracking-[0.14em] text-amber-100/48">Trail connections</div>
          <p className="mt-2 text-[9px] leading-4 text-amber-50/32">Take a cross-trail into another district without losing the shared species.</p>
          <div className="mt-3 space-y-1.5">
            {overlaps.length ? overlaps.map(({ item, count: overlapCount }) => (
              <button key={item.id} type="button" onClick={() => onOverlap(item)} className="group flex w-full items-center justify-between rounded-[10px] border border-amber-100/[0.08] bg-black/[0.16] px-3 py-2.5 text-left hover:border-amber-100/[0.16] hover:bg-black/[0.24]">
                <span className="text-[9px] text-amber-50/44 group-hover:text-amber-50/78">{item.label}</span>
                <span className="font-mono text-[8px]" style={{ color: `rgb(${item.accentRgb})` }}>{overlapCount} shared</span>
              </button>
            )) : <span className="text-[9px] text-amber-50/25">No curated cross-trail yet.</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniStat({
  label,
  value,
  rgb,
}: {
  label: string;
  value: string;
  rgb: string;
}) {
  return (
    <div className="rounded-[16px] border border-amber-100/[0.10] bg-[#1c2419]/80 p-3 text-center shadow-[0_14px_36px_rgba(0,0,0,0.22)]">
      <div className="font-mono text-[18px] font-semibold" style={{ color: `rgb(${rgb})` }}>{value}</div>
      <div className="mt-1 font-mono text-[7px] uppercase tracking-[0.09em] text-amber-50/32">{label}</div>
    </div>
  );
}

function relationScore(a: AnimalRecord, b: AnimalRecord) {
  let score = 0;
  if (
    a.taxonomy.className &&
    a.taxonomy.className === b.taxonomy.className
  ) score += 4;
  if (a.diet && a.diet === b.diet) score += 2;
  score += a.ecologicalRoles.filter((role) => b.ecologicalRoles.includes(role)).length * 3;
  score += a.habitats.filter((habitat) => b.habitats.includes(habitat)).length * 2;
  return score;
}
