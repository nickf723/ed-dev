export type PagePatternKind = "topology" | "widget" | "background" | "adapter" | "card-grammar" | "instrument";

export type PagePattern = {
  id: string;
  label: string;
  kind: PagePatternKind;
  description: string;
  sourcePage: string;
  scope: "global" | "domain" | "branch" | "page";
  component?: string;
  parameters: string[];
};

/**
 * Reusable page grammars extracted from finished pages.
 * Knowledge Studio can surface this registry without coupling recipes to a
 * specific renderer implementation.
 */
export const PAGE_PATTERN_LIBRARY: PagePattern[] = [
  {
    id: "branching-tree-topology",
    label: "Branching tree",
    kind: "topology",
    description: "A recursive hierarchy for ancestry, dependencies, prerequisites, or any structure where forks matter more than a flat list.",
    sourcePage: "/natural-science/biology/zoology/diversity",
    scope: "global",
    component: "BranchingTreeTopology",
    parameters: ["root", "maxDepth", "selectedId", "pinnedIds", "onSelect", "onPin"],
  },
  {
    id: "taxonomic-path-widget",
    label: "Parallel rank path",
    kind: "widget",
    description: "Shows one or two hierarchical paths with explicit rank labels so parallel branches can be compared without flattening ancestry.",
    sourcePage: "/natural-science/biology/zoology/diversity",
    scope: "global",
    component: "TaxonomicPath",
    parameters: ["primary", "secondary"],
  },
  {
    id: "phylogenetic-canopy-background",
    label: "Phylogenetic canopy",
    kind: "background",
    description: "A vivid branching field where roots imply older ancestry, forks imply divergence, and pulses travel toward living tips.",
    sourcePage: "/natural-science/biology/zoology/diversity",
    scope: "domain",
    component: "PhylogeneticCanopyBackground",
    parameters: ["accentRgb"],
  },
  {
    id: "synchronized-comparison-topology",
    label: "Synchronized comparison",
    kind: "topology",
    description: "Runs several specimens or systems on one shared phase so differences in implementation stay aligned around the same functional question.",
    sourcePage: "/natural-science/biology/zoology/comparative",
    scope: "global",
    component: "SynchronizedComparisonTopology",
    parameters: ["specimens", "phase", "functionLabel", "selectedId", "onSelect"],
  },
  {
    id: "trait-matrix-widget",
    label: "Trait matrix",
    kind: "widget",
    description: "A compact row-aligned comparison matrix that shares column identities and semantic colors with a visual comparison surface.",
    sourcePage: "/natural-science/biology/zoology/comparative",
    scope: "global",
    component: "TraitMatrix",
    parameters: ["columns", "rows", "accentByColumn"],
  },
  {
    id: "anatomical-layer-background",
    label: "Anatomical layer field",
    kind: "background",
    description: "Translucent body silhouettes, scanning bands, and synchronized system pulses make parallel internal structures part of the page environment.",
    sourcePage: "/natural-science/biology/zoology/comparative",
    scope: "domain",
    component: "AnatomicalLayerBackground",
    parameters: ["accentRgb"],
  },
];
