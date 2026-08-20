"use client";

import { useMemo, useState, type FormEvent } from "react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import SceneFrame from "@/app/_page-system/scene/SceneFrame";
import Surface from "@/app/_page-system/scene/Surface";
import WorldWindow from "@/app/_page-system/scene/WorldWindow";
import ExhibitCampusTopology, {
  type ExhibitDestination,
} from "@/app/_page-system/topologies/ExhibitCampusTopology";
import type { DesignPaletteRoles } from "@/lib/design-system/schema";
import {
  Activity,
  Bone,
  GitBranch,
  Map as MapIcon,
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

const ZOOLOGY_SCENES = [
  {
    id: "habitat",
    label: "Habitat",
    description:
      "Follow movement through climate, terrain, water, and available resources.",
    accentRgb: "52, 211, 153",
  },
  {
    id: "lineage",
    label: "Lineage",
    description:
      "Reveal inherited structure as a branching history of shared traits.",
    accentRgb: "34, 211, 238",
  },
  {
    id: "ecology",
    label: "Ecology",
    description:
      "Watch energy, predation, mutualism, and decomposition connect a community.",
    accentRgb: "250, 204, 21",
  },
] as const;

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
    provenance,
    pagination,
  } = useAnimalAtlas(collection.id);

  const classes = useMemo(
    () =>
      Array.from(
        new Set(
          animals
            .map(
              (animal) => animal.taxonomy.className ?? animal.iconicTaxonName
            )
            .filter((value): value is string => Boolean(value))
        )
      ).sort(),
    [animals]
  );

  const visible = useMemo(() => {
    const local = query.trim().toLowerCase();
    const order = new Map(
      collection.speciesIds.map((id, index) => [id, index])
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
            b.taxonomy.className ?? ""
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
      (item) => item.id !== collection.id && item.lens !== collection.lens
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
              (a, b) => relationScore(selected, b) - relationScore(selected, a)
            )
        : [],
    [animals, selected]
  );

  const liveCount = animals.filter(
    (animal) => animal.source === "iNaturalist"
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
    [branches]
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
    <SceneFrame
      background={
        <ZoologyBackground
          accentRgb={collection.accentRgb}
          environment={collection.environment}
        />
      }
      className="selection:bg-emerald-400/[0.24]"
      maxWidthClassName="max-w-[1640px]"
      headerBackground={`rgba(${palette.background},0.56)`}
      style={{
        background: `rgb(${palette.background})`,
        color: `rgb(${palette.text})`,
      }}
      header={
        <DomainPageHeader
          breadcrumbs={[
            { label: "Natural Science", href: "/natural-science" },
            { label: "Biology", href: "/natural-science/biology" },
            { label: "Zoology" },
          ]}
          eyebrow="Animal diversity · anatomy · behavior · ecological relationships"
          eyebrowStyle="rule"
          icon={PawPrint}
          title={<span>Zoology</span>}
          subtitle="Study animals through the structures they inherit, the environments they inhabit, and the relationships they create inside living communities."
          accentRgb={palette.primary}
          titleClassName="font-sans text-[clamp(3rem,5.6vw,6.4rem)] font-semibold leading-[0.82] tracking-[-0.065em] text-[#f4fff7]"
          headerClassName="border-white/[0.08]"
        />
      }
    >
      <section className="mt-5">
        <WorldWindow
          eyebrow="Living world · research pavilions · overlapping biological maps"
          title="Enter zoology through a living system, not a filing cabinet."
          description="The pavilions are direct academic branches. The central atlas reorganizes the same animals through habitat, lineage, and ecology without burying the living simulation behind another wall of cards."
          scenes={[...ZOOLOGY_SCENES]}
          activeScene={lens}
          onSceneChange={(scene) => chooseLens(scene as ZoologyLens)}
        >
          <ExhibitCampusTopology
            title="Enter one of zoology’s research pavilions."
            description="Animal Diversity, Comparative Zoology, Ethology, and Paleozoology are the direct branches."
            centerLabel="Living Animal Atlas"
            centerSummary="Browse the same species through habitat, lineage, and ecological role. Each lens reveals a different relationship while preserving the animal itself."
            destinations={destinations}
            accentRgb={palette.primary}
            presentation="world"
          />
        </WorldWindow>
      </section>

      <section className="mt-10 max-w-5xl">
        <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.13em] text-amber-100/[0.72]">
          <MapIcon size={14} /> One animal, several biological maps
        </div>
        <h2 className="mt-3 text-[clamp(2rem,3.8vw,3.7rem)] font-semibold leading-[0.96] tracking-[-0.048em] text-white">
          Change the organizing question, not the animal.
        </h2>
        <p className="mt-4 max-w-4xl text-[16px] leading-7 text-emerald-50/[0.72]">
          A jaguar is simultaneously a rainforest animal, a mammal, and an apex
          predator. The atlas lets those memberships overlap instead of forcing
          every species into one permanent drawer.
        </p>
      </section>

      <section className="mt-7 grid gap-5 xl:grid-cols-[310px_minmax(0,1fr)]">
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
            lensLabel={activeLens.label}
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
            <div className="mt-3 flex flex-col gap-2 rounded-[15px] border border-cyan-300/[0.14] bg-[#071b1d]/[0.58] px-4 py-3 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
              <span className="flex items-center gap-2 text-[13px] text-cyan-100/[0.76]">
                <Search size={14} /> Global animal search · {animals.length}{" "}
                shown
                {pagination && pagination.total > pagination.returned
                  ? ` of ${pagination.total.toLocaleString()} matches`
                  : ""}
              </span>
              <button
                type="button"
                onClick={() => void resetSearch()}
                className="text-left text-[12px] font-semibold text-cyan-200 sm:text-right"
              >
                Return to {collection.label}
              </button>
            </div>
          ) : null}

          {provenance ? (
            <div className="mt-3 flex flex-col gap-1 rounded-[15px] border border-emerald-300/[0.12] bg-[#07150f]/[0.56] px-4 py-3 text-[12px] leading-5 text-emerald-50/[0.62] sm:flex-row sm:items-center sm:justify-between">
              <span>{provenance.note}</span>
              <span className="shrink-0 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-emerald-200/[0.58]">
                {provenance.state} · iNaturalist + reviewed atlas
              </span>
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

      {selected ? (
        <ZoologyModal
          animal={selected}
          related={related}
          onClose={() => setSelected(null)}
          onSelectRelated={setSelected}
        />
      ) : null}
    </SceneFrame>
  );
}

function CollectionHeader({
  collection,
  lensLabel,
  lensQuestion,
  count,
  liveCount,
  overlaps,
  onOverlap,
}: {
  collection: ZoologyCollection;
  lensLabel: string;
  lensQuestion: string;
  count: number;
  liveCount: number;
  overlaps: { item: ZoologyCollection; count: number }[];
  onOverlap: (collection: ZoologyCollection) => void;
}) {
  return (
    <Surface
      variant="glass"
      className="overflow-hidden rounded-[30px] border-amber-100/[0.14] bg-[#16231a]/[0.58]"
    >
      <div className="grid lg:grid-cols-[minmax(0,1fr)_370px]">
        <div className="relative p-6 sm:p-8">
          <div
            className="absolute inset-x-0 top-0 h-1"
            style={{
              background: `linear-gradient(90deg,rgba(${collection.accentRgb},0.88),transparent)`,
            }}
          />
          <div
            className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.13em]"
            style={{ color: `rgba(${collection.accentRgb},0.78)` }}
          >
            <Sparkles size={13} /> {lensLabel} · {lensQuestion}
          </div>
          <h2 className="mt-3 text-[clamp(2.4rem,4.5vw,4.8rem)] font-semibold leading-[0.9] tracking-[-0.055em] text-[#fff9e8]">
            {collection.label}
          </h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-7 text-emerald-50/[0.68]">
            {collection.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-amber-50/[0.42]">
            <span>{count} records</span>
            <span>·</span>
            <span>{liveCount} live records</span>
            <span>·</span>
            <span>{collection.speciesIds.length} curated members</span>
          </div>
        </div>

        <div className="border-t border-amber-100/[0.10] bg-[#222719]/[0.62] p-5 lg:border-l lg:border-t-0 lg:p-6">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.13em] text-amber-100/[0.58]">
            Cross-lens connections
          </div>
          <p className="mt-2 text-[12px] leading-5 text-amber-50/[0.48]">
            Follow a shared species into another biological view without losing
            the relationship that connected it here.
          </p>
          <div className="mt-4 space-y-2">
            {overlaps.length ? (
              overlaps.map(({ item, count: overlapCount }) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onOverlap(item)}
                  className="group flex min-h-11 w-full items-center justify-between gap-3 rounded-[12px] border border-amber-100/[0.09] bg-black/[0.14] px-3 py-2.5 text-left hover:border-amber-100/[0.18] hover:bg-black/[0.22]"
                >
                  <span className="text-[12px] text-amber-50/[0.58] group-hover:text-amber-50/[0.86]">
                    {item.label}
                  </span>
                  <span
                    className="shrink-0 font-mono text-[11px] font-semibold"
                    style={{ color: `rgb(${item.accentRgb})` }}
                  >
                    {overlapCount} shared
                  </span>
                </button>
              ))
            ) : (
              <span className="text-[12px] text-amber-50/[0.34]">
                No curated cross-lens trail yet.
              </span>
            )}
          </div>
        </div>
      </div>
    </Surface>
  );
}

function relationScore(a: AnimalRecord, b: AnimalRecord) {
  let score = 0;
  if (a.taxonomy.className && a.taxonomy.className === b.taxonomy.className)
    score += 4;
  if (a.diet && a.diet === b.diet) score += 2;
  score +=
    a.ecologicalRoles.filter((role) => b.ecologicalRoles.includes(role))
      .length * 3;
  score +=
    a.habitats.filter((habitat) => b.habitats.includes(habitat)).length * 2;
  return score;
}
