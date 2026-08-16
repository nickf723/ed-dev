"use client";

import { useEffect, useMemo, useState } from "react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import BranchingTreeTopology, {
  type BranchingTreeNode,
} from "@/app/_page-system/topologies/BranchingTreeTopology";
import TaxonomicPath, {
  type TaxonomicRankStep,
} from "@/app/_page-system/widgets/TaxonomicPath";
import PhylogeneticCanopyBackground from "@/app/_page-system/backgrounds/PhylogeneticCanopyBackground";
import type { DesignPaletteRoles } from "@/lib/design-system/schema";
import {
  Activity,
  ArrowLeftRight,
  CircleDot,
  Dna,
  GitBranch,
  Lightbulb,
  Network,
  PawPrint,
  Pin,
  Search,
  Sparkles,
} from "lucide-react";
import type { AnimalRecord } from "../zoology-data";

type Clade = BranchingTreeNode & {
  rank: string;
  features: string[];
  path: TaxonomicRankStep[];
  representative?: { common: string; scientific: string };
};

const CLADE_META: Record<string, Omit<Clade, keyof BranchingTreeNode>> = {};

function clade(
  node: BranchingTreeNode,
  meta: Omit<Clade, keyof BranchingTreeNode>,
): BranchingTreeNode {
  CLADE_META[node.id] = meta;
  return node;
}

const TREE: BranchingTreeNode = clade(
  {
    id: "animalia",
    label: "Animalia",
    subtitle: "animal kingdom",
    note: "Multicellular heterotrophs with embryonic development through a blastula stage.",
    accentRgb: "52, 211, 153",
    children: [
      clade(
        {
          id: "porifera",
          label: "Porifera",
          subtitle: "sponges",
          accentRgb: "45, 212, 191",
          children: [
            clade(
              {
                id: "demospongiae",
                label: "Demospongiae",
                subtitle: "demosponges",
                accentRgb: "45, 212, 191",
                children: [
                  clade({ id: "bath-sponge", label: "Bath sponge", subtitle: "Spongia officinalis", accentRgb: "45, 212, 191" }, {
                    rank: "species", features: ["Porous body", "Choanocyte feeding", "No true tissues"], path: [], representative: { common: "Bath sponge", scientific: "Spongia officinalis" },
                  }),
                ],
              },
              { rank: "class", features: ["Spongin or silica skeleton", "Filter feeding"], path: [] },
            ),
          ],
        },
        { rank: "phylum", features: ["No true tissues", "Aquiferous canal system", "Choanocytes"], path: [] },
      ),
      clade(
        {
          id: "cnidaria",
          label: "Cnidaria",
          subtitle: "jellies, corals, anemones",
          accentRgb: "244, 114, 182",
          children: [
            clade(
              {
                id: "anthozoa",
                label: "Anthozoa",
                subtitle: "corals & anemones",
                accentRgb: "244, 114, 182",
                children: [
                  clade({ id: "star-coral", label: "Star coral", subtitle: "Orbicella annularis", accentRgb: "244, 114, 182" }, {
                    rank: "species", features: ["Cnidocytes", "Colonial polyps", "Photosymbiosis"], path: [], representative: { common: "Boulder star coral", scientific: "Orbicella annularis" },
                  }),
                ],
              },
              { rank: "class", features: ["Polyp-dominant body", "Radial symmetry", "Cnidocytes"], path: [] },
            ),
          ],
        },
        { rank: "phylum", features: ["True tissues", "Radial symmetry", "Cnidocytes", "Gastrovascular cavity"], path: [] },
      ),
      clade(
        {
          id: "mollusca",
          label: "Mollusca",
          subtitle: "mollusks",
          accentRgb: "192, 132, 252",
          children: [
            clade(
              {
                id: "cephalopoda",
                label: "Cephalopoda",
                subtitle: "octopuses, squid, nautiluses",
                accentRgb: "192, 132, 252",
                children: [
                  clade({ id: "giant-pacific-octopus", label: "Giant Pacific octopus", subtitle: "Enteroctopus dofleini", accentRgb: "192, 132, 252" }, {
                    rank: "species", features: ["Eight muscular arms", "Camera-like eyes", "Chromatophore camouflage", "Large nervous system"], path: [], representative: { common: "Giant Pacific octopus", scientific: "Enteroctopus dofleini" },
                  }),
                ],
              },
              { rank: "class", features: ["Foot transformed into arms", "Closed circulation", "Large brain", "Jet propulsion"], path: [] },
            ),
            clade(
              {
                id: "bivalvia",
                label: "Bivalvia",
                subtitle: "clams, oysters, mussels",
                accentRgb: "167, 139, 250",
                children: [
                  clade({ id: "giant-clam", label: "Giant clam", subtitle: "Tridacna gigas", accentRgb: "167, 139, 250" }, {
                    rank: "species", features: ["Two-valved shell", "Filter feeding", "Photosymbiosis"], path: [], representative: { common: "Giant clam", scientific: "Tridacna gigas" },
                  }),
                ],
              },
              { rank: "class", features: ["Paired shell valves", "Reduced head", "Gill filter feeding"], path: [] },
            ),
          ],
        },
        { rank: "phylum", features: ["Mantle", "Muscular foot", "Visceral mass", "Radula ancestral condition"], path: [] },
      ),
      clade(
        {
          id: "arthropoda",
          label: "Arthropoda",
          subtitle: "joint-legged animals",
          accentRgb: "250, 204, 21",
          children: [
            clade(
              {
                id: "insecta",
                label: "Insecta",
                subtitle: "insects",
                accentRgb: "250, 204, 21",
                children: [
                  clade({ id: "monarch", label: "Monarch butterfly", subtitle: "Danaus plexippus", accentRgb: "250, 204, 21" }, {
                    rank: "species", features: ["Six legs", "Two wing pairs", "Complete metamorphosis", "Long migration"], path: [], representative: { common: "Monarch butterfly", scientific: "Danaus plexippus" },
                  }),
                ],
              },
              { rank: "class", features: ["Six legs", "Three body regions", "One antenna pair", "Tracheal respiration"], path: [] },
            ),
          ],
        },
        { rank: "phylum", features: ["Jointed appendages", "Exoskeleton", "Molting", "Segmented body"], path: [] },
      ),
      clade(
        {
          id: "chordata",
          label: "Chordata",
          subtitle: "chordates",
          accentRgb: "96, 165, 250",
          children: [
            clade(
              {
                id: "mammalia",
                label: "Mammalia",
                subtitle: "mammals",
                accentRgb: "248, 113, 113",
                children: [
                  clade({ id: "jaguar", label: "Jaguar", subtitle: "Panthera onca", accentRgb: "248, 113, 113" }, {
                    rank: "species", features: ["Hair", "Milk", "Endothermy", "Carnassial teeth"], path: [], representative: { common: "Jaguar", scientific: "Panthera onca" },
                  }),
                ],
              },
              { rank: "class", features: ["Hair", "Mammary glands", "Three middle-ear bones", "Endothermy"], path: [] },
            ),
            clade(
              {
                id: "aves",
                label: "Aves",
                subtitle: "birds",
                accentRgb: "250, 204, 21",
                children: [
                  clade({ id: "harpy-eagle", label: "Harpy eagle", subtitle: "Harpia harpyja", accentRgb: "250, 204, 21" }, {
                    rank: "species", features: ["Feathers", "Air sacs", "Flight feathers", "Talons"], path: [], representative: { common: "Harpy eagle", scientific: "Harpia harpyja" },
                  }),
                ],
              },
              { rank: "class", features: ["Feathers", "Beak", "Air-sac respiratory system", "Endothermy"], path: [] },
            ),
            clade(
              {
                id: "reptilia",
                label: "Reptilia",
                subtitle: "reptiles",
                accentRgb: "74, 222, 128",
                children: [
                  clade({ id: "green-anaconda", label: "Green anaconda", subtitle: "Eunectes murinus", accentRgb: "74, 222, 128" }, {
                    rank: "species", features: ["Scales", "Elongate body", "Constriction", "Aquatic locomotion"], path: [], representative: { common: "Green anaconda", scientific: "Eunectes murinus" },
                  }),
                ],
              },
              { rank: "class", features: ["Amniotic egg ancestry", "Keratinized scales", "Lungs"], path: [] },
            ),
            clade(
              {
                id: "amphibia",
                label: "Amphibia",
                subtitle: "amphibians",
                accentRgb: "45, 212, 191",
                children: [
                  clade({ id: "axolotl", label: "Axolotl", subtitle: "Ambystoma mexicanum", accentRgb: "45, 212, 191" }, {
                    rank: "species", features: ["Permeable skin", "External gills", "Neoteny", "Regeneration"], path: [], representative: { common: "Axolotl", scientific: "Ambystoma mexicanum" },
                  }),
                ],
              },
              { rank: "class", features: ["Permeable skin", "Metamorphic ancestry", "Aquatic eggs"], path: [] },
            ),
          ],
        },
        { rank: "phylum", features: ["Notochord", "Dorsal hollow nerve cord", "Pharyngeal slits", "Post-anal tail"], path: [] },
      ),
    ],
  },
  { rank: "kingdom", features: ["Multicellularity", "Heterotrophy", "Blastula development", "Motility in life cycle"], path: [] },
);

const RANK_DEPTH = { phylum: 1, class: 2, species: 3 } as const;

function hydratePaths(node: BranchingTreeNode, parent: TaxonomicRankStep[] = []) {
  const meta = CLADE_META[node.id];
  if (meta) {
    meta.path = [...parent, { rank: meta.rank, label: node.label, accentRgb: node.accentRgb }];
  }
  for (const child of node.children ?? []) hydratePaths(child, meta?.path ?? parent);
}
hydratePaths(TREE);

export default function DiversityLab({ palette }: { palette: DesignPaletteRoles }) {
  const [rankDepth, setRankDepth] = useState<keyof typeof RANK_DEPTH>("class");
  const [selectedId, setSelectedId] = useState("chordata");
  const [pinnedIds, setPinnedIds] = useState<string[]>(["arthropoda", "chordata"]);
  const [liveTaxon, setLiveTaxon] = useState<AnimalRecord | null>(null);
  const [liveLoading, setLiveLoading] = useState(false);

  const selectedNode = useMemo(() => findNode(TREE, selectedId) ?? TREE, [selectedId]);
  const selectedMeta = CLADE_META[selectedNode.id];
  const pinned = pinnedIds.map((id) => findNode(TREE, id)).filter((node): node is BranchingTreeNode => Boolean(node));

  useEffect(() => {
    const representative = selectedMeta?.representative;
    if (!representative) {
      setLiveTaxon(null);
      return;
    }
    const controller = new AbortController();
    setLiveLoading(true);
    fetch(`/api/zoology/taxa?q=${encodeURIComponent(representative.scientific)}`, { signal: controller.signal })
      .then((response) => response.json())
      .then((payload: { animals?: AnimalRecord[] }) => setLiveTaxon(payload.animals?.[0] ?? null))
      .catch(() => setLiveTaxon(null))
      .finally(() => setLiveLoading(false));
    return () => controller.abort();
  }, [selectedMeta?.representative?.scientific]);

  function togglePin(node: BranchingTreeNode) {
    setPinnedIds((current) => {
      if (current.includes(node.id)) return current.filter((id) => id !== node.id);
      return [...current.slice(-1), node.id];
    });
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden" style={{ background: `rgb(${palette.background})`, color: `rgb(${palette.text})` }}>
      <PhylogeneticCanopyBackground accentRgb={palette.primary} />
      <div className="relative z-10 mx-auto w-full max-w-[1560px] px-4 pb-16 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-40 -mx-4 border-b border-white/[0.07] bg-[#020b08]/80 px-4 pb-3 pt-5 backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={[
              { label: "Natural Science", href: "/natural-science" },
              { label: "Biology", href: "/natural-science/biology" },
              { label: "Zoology", href: "/natural-science/biology/zoology" },
              { label: "Animal Diversity & Taxonomy" },
            ]}
            eyebrow="Ancestry · divergence · body plans · classification"
            eyebrowStyle="rule"
            icon={GitBranch}
            title={<span>Animal Diversity & Taxonomy</span>}
            subtitle="Classification is a map of hypotheses about relationship. Follow branches from shared ancestry, zoom through ranks, and compare which traits are inherited, transformed, or independently reinvented."
            accentRgb={palette.primary}
            titleClassName="text-[clamp(2.7rem,5vw,6rem)] font-semibold leading-[0.84] tracking-[-0.06em] text-[#f4fff7]"
            headerClassName="border-white/[0.08]"
          />
        </div>

        <section className="mt-5 grid gap-4 xl:grid-cols-[1fr_360px]">
          <div className="rounded-[28px] border border-white/[0.08] bg-black/[0.16] p-5 backdrop-blur-xl sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-emerald-200/65">Rank-aware zoom</div>
                <h2 className="mt-2 text-[clamp(1.8rem,3vw,3rem)] font-semibold tracking-[-0.045em] text-white">A tree, not a ladder.</h2>
                <p className="mt-2 max-w-3xl text-[11px] leading-5 text-slate-400">Every fork represents divergence from a shared ancestor. Living groups at the tips are cousins—not stages on a march toward a “higher” animal.</p>
              </div>
              <div className="flex rounded-[12px] border border-white/[0.08] bg-black/25 p-1">
                {(Object.keys(RANK_DEPTH) as (keyof typeof RANK_DEPTH)[]).map((rank) => (
                  <button key={rank} type="button" onClick={() => setRankDepth(rank)} className={`rounded-[9px] px-3 py-2 font-mono text-[8px] uppercase tracking-[0.1em] transition ${rankDepth === rank ? "bg-emerald-400/[0.10] text-emerald-100" : "text-slate-600 hover:text-slate-300"}`}>{rank}</button>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Stat icon={GitBranch} value="5" label="major phyla" rgb={palette.primary} />
            <Stat icon={Dna} value="3" label="rank levels" rgb={palette.secondary} />
            <Stat icon={Pin} value={String(pinned.length)} label="pinned" rgb={palette.tertiary} />
          </div>
        </section>

        <section className="mt-4 grid gap-4 2xl:grid-cols-[minmax(0,1fr)_380px]">
          <BranchingTreeTopology
            root={TREE}
            maxDepth={RANK_DEPTH[rankDepth]}
            selectedId={selectedId}
            pinnedIds={pinnedIds}
            onSelect={(node) => setSelectedId(node.id)}
            onPin={togglePin}
          />
          <CladeInspector node={selectedNode} meta={selectedMeta} liveTaxon={liveTaxon} liveLoading={liveLoading} palette={palette} />
        </section>

        <section className="mt-4 grid gap-4 xl:grid-cols-[1fr_430px]">
          <div>
            <div className="mb-3 flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-cyan-200/65"><ArrowLeftRight size={12} /> Pinned lineage comparison</div>
            <TaxonomicPath primary={pathFor(pinned[0])} secondary={pathFor(pinned[1])} />
          </div>
          <LineageComparison nodes={pinned} />
        </section>

        <section className="mt-8 grid gap-3 md:grid-cols-3">
          <ConceptCard icon={Dna} label="Homology" title="Same inheritance, different use" text="A whale flipper, bat wing, and human arm are remodeled versions of the same tetrapod forelimb architecture." rgb={palette.primary} />
          <ConceptCard icon={Activity} label="Analogy" title="Same job, different origin" text="Bird wings and insect wings both produce flight, but they arise from very different ancestral structures." rgb={palette.secondary} />
          <ConceptCard icon={Sparkles} label="Convergence" title="Similar pressures can rediscover solutions" text="Streamlined bodies evolved independently in sharks, ichthyosaurs, and dolphins because moving through water imposes similar constraints." rgb={palette.tertiary} />
        </section>

        <section className="mt-8 rounded-[30px] border border-white/[0.08] bg-black/[0.15] p-6 backdrop-blur-xl sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
            <div>
              <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-lime-200/65">Classification is provisional</div>
              <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.04em] text-white">Ranks are labels. Branches are hypotheses.</h2>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              <SmallIdea title="Species" text="Different species concepts emphasize reproduction, ancestry, ecology, or diagnosable lineages." />
              <SmallIdea title="Rank" text="A family in one branch is not guaranteed to contain the same age or diversity as a family elsewhere." />
              <SmallIdea title="Revision" text="New fossils, genomes, and analyses can move a lineage without changing the organisms themselves." />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function CladeInspector({ node, meta, liveTaxon, liveLoading, palette }: { node: BranchingTreeNode; meta?: Omit<Clade, keyof BranchingTreeNode>; liveTaxon: AnimalRecord | null; liveLoading: boolean; palette: DesignPaletteRoles }) {
  const accent = node.accentRgb ?? palette.primary;
  return (
    <aside className="rounded-[28px] border bg-black/[0.20] p-5 backdrop-blur-xl" style={{ borderColor: `rgba(${accent},0.18)` }}>
      <div className="flex items-start justify-between gap-4">
        <div><div className="font-mono text-[8px] uppercase tracking-[0.14em]" style={{ color: `rgba(${accent},0.68)` }}>{meta?.rank ?? "clade"}</div><h3 className="mt-1 text-[26px] font-semibold tracking-[-0.04em] text-white">{node.label}</h3><p className="mt-1 font-serif text-[11px] italic text-slate-500">{node.subtitle}</p></div>
        <span className="flex h-11 w-11 items-center justify-center rounded-[14px] border" style={{ color: `rgb(${accent})`, borderColor: `rgba(${accent},0.22)`, background: `rgba(${accent},0.055)` }}><CircleDot size={18} /></span>
      </div>
      <p className="mt-4 text-[11px] leading-5 text-slate-400">{node.note ?? "Select a deeper branch to expose more specific inherited traits."}</p>
      <div className="mt-5 space-y-2">
        {(meta?.features ?? []).map((feature) => <div key={feature} className="flex items-center gap-2 rounded-[11px] border border-white/[0.06] bg-white/[0.018] px-3 py-2 text-[9px] text-slate-400"><span className="h-1.5 w-1.5 rounded-full" style={{ background: `rgb(${accent})` }} />{feature}</div>)}
      </div>
      {meta?.representative ? (
        <div className="mt-6 border-t border-white/[0.07] pt-5">
          <div className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.12em] text-slate-600"><Search size={11} /> live representative</div>
          {liveLoading ? <div className="mt-3 h-20 animate-pulse rounded-[14px] bg-white/[0.035]" /> : liveTaxon ? (
            <div className="mt-3 rounded-[14px] border border-white/[0.07] bg-white/[0.02] p-3">
              <div className="flex items-center gap-3">
                {liveTaxon.imageUrl ? <img src={liveTaxon.imageUrl} alt="" className="h-14 w-14 rounded-[11px] object-cover" referrerPolicy="no-referrer" /> : <div className="flex h-14 w-14 items-center justify-center rounded-[11px] bg-white/[0.035]"><PawPrint size={18} className="text-slate-700" /></div>}
                <div className="min-w-0"><strong className="block truncate text-[11px] text-white">{liveTaxon.commonName}</strong><span className="mt-1 block truncate font-serif text-[9px] italic text-slate-500">{liveTaxon.scientificName}</span><span className="mt-2 block font-mono text-[7px] uppercase text-emerald-300/55">{liveTaxon.observationsCount ? `${new Intl.NumberFormat("en", { notation: "compact" }).format(liveTaxon.observationsCount)} observations` : "live taxon record"}</span></div>
              </div>
            </div>
          ) : <p className="mt-3 text-[9px] leading-4 text-slate-600">Curated lineage data remains available even when the live taxon source does not return a record.</p>}
        </div>
      ) : null}
    </aside>
  );
}

function LineageComparison({ nodes }: { nodes: BranchingTreeNode[] }) {
  if (nodes.length < 2) return <div className="rounded-[22px] border border-dashed border-white/[0.08] bg-black/[0.12] p-5 text-[10px] leading-5 text-slate-600">Pin two branches in the tree to compare inherited features side by side.</div>;
  const [a, b] = nodes;
  const featuresA = CLADE_META[a.id]?.features ?? [];
  const featuresB = CLADE_META[b.id]?.features ?? [];
  const shared = featuresA.filter((feature) => featuresB.includes(feature));
  return (
    <div className="rounded-[22px] border border-white/[0.08] bg-black/[0.18] p-5 backdrop-blur-xl">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3"><strong className="text-[12px] text-white">{a.label}</strong><Network size={13} className="text-slate-700" /><strong className="text-right text-[12px] text-white">{b.label}</strong></div>
      <div className="mt-4 border-t border-white/[0.06] pt-4"><div className="font-mono text-[8px] uppercase tracking-[0.12em] text-slate-600">shared listed traits</div>{shared.length ? <div className="mt-2 flex flex-wrap gap-1.5">{shared.map((feature) => <span key={feature} className="rounded-full border border-emerald-300/[0.12] bg-emerald-400/[0.035] px-2.5 py-1 text-[8px] text-emerald-100/65">{feature}</span>)}</div> : <p className="mt-2 text-[9px] leading-4 text-slate-600">Their shared traits lie deeper in the tree than the currently listed defining features. Follow both paths toward their most recent shared branch.</p>}</div>
    </div>
  );
}

function Stat({ icon: Icon, value, label, rgb }: { icon: typeof GitBranch; value: string; label: string; rgb: string }) { return <div className="flex flex-col items-center justify-center rounded-[17px] border border-white/[0.07] bg-black/[0.16] p-3 text-center backdrop-blur-xl"><Icon size={13} style={{ color: `rgb(${rgb})` }} /><strong className="mt-2 font-mono text-[17px]" style={{ color: `rgb(${rgb})` }}>{value}</strong><span className="mt-1 text-[7px] uppercase tracking-[0.1em] text-slate-600">{label}</span></div>; }
function ConceptCard({ icon: Icon, label, title, text, rgb }: { icon: typeof Dna; label: string; title: string; text: string; rgb: string }) { return <article className="rounded-[22px] border bg-black/[0.16] p-5 backdrop-blur-xl" style={{ borderColor: `rgba(${rgb},0.13)` }}><div className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.12em]" style={{ color: `rgba(${rgb},0.70)` }}><Icon size={12} />{label}</div><h3 className="mt-3 text-[16px] font-semibold text-white">{title}</h3><p className="mt-2 text-[10px] leading-5 text-slate-500">{text}</p></article>; }
function SmallIdea({ title, text }: { title: string; text: string }) { return <div className="rounded-[17px] border border-white/[0.07] bg-white/[0.018] p-4"><strong className="text-[11px] text-slate-200">{title}</strong><p className="mt-2 text-[9px] leading-4 text-slate-600">{text}</p></div>; }
function findNode(node: BranchingTreeNode, id: string): BranchingTreeNode | undefined { if (node.id === id) return node; for (const child of node.children ?? []) { const found = findNode(child, id); if (found) return found; } return undefined; }
function pathFor(node?: BranchingTreeNode): TaxonomicRankStep[] { return node ? CLADE_META[node.id]?.path ?? [] : []; }
