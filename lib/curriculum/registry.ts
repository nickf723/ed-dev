import { ALGEBRA_CURRICULUM } from "@/lib/curriculum/algebra";
import { COMPUTER_SCIENCE_CURRICULUM } from "@/lib/curriculum/computer-science";
import { GROUP_THEORY_CURRICULUM } from "@/lib/curriculum/group-theory";
import { LOGIC_CURRICULUM } from "@/lib/curriculum/logic";
import { CURRICULUM_NODE_METADATA } from "@/lib/curriculum/metadata";
import { BIOLOGY_CURRICULUM } from "@/lib/curriculum/natural/biology";
import { CURRICULUM_DOMAINS } from "@/lib/curriculum/tree";
import type {
  CurriculumDomain,
  CurriculumNode,
  CurriculumRegistrySnapshot,
} from "@/lib/curriculum/types";

function replaceNode(
  nodes: readonly CurriculumNode[],
  replacement: CurriculumNode,
): readonly CurriculumNode[] {
  return nodes.map((node) => {
    if (node.id === replacement.id) return replacement;
    if (!node.children) return node;
    return { ...node, children: replaceNode(node.children, replacement) };
  });
}

function applyMetadata(nodes: readonly CurriculumNode[]): readonly CurriculumNode[] {
  return nodes.map((node) => ({
    ...node,
    ...CURRICULUM_NODE_METADATA[node.id],
    children: node.children ? applyMetadata(node.children) : undefined,
  }));
}

const curriculumReplacements = [
  ALGEBRA_CURRICULUM,
  GROUP_THEORY_CURRICULUM,
  LOGIC_CURRICULUM,
  COMPUTER_SCIENCE_CURRICULUM,
  BIOLOGY_CURRICULUM,
] as const;

const domainRootAdditions: Partial<
  Record<CurriculumDomain["domainId"], readonly CurriculumNode[]>
> = {
  social: [
    {
      id: "social.communications",
      label: "Communications",
      href: "/social-science/communications",
      domainId: "social",
    },
    {
      id: "social.law",
      label: "Law",
      href: "/social-science/law",
      domainId: "social",
    },
    {
      id: "social.geography",
      label: "Human Geography",
      href: "/social-science/geography",
      domainId: "social",
    },
  ],
  applied: [
    {
      id: "applied.education",
      label: "Education",
      href: "/applied-science/education",
      domainId: "applied",
    },
    {
      id: "applied.library-science",
      label: "Library Science",
      href: "/applied-science/library-science",
      domainId: "applied",
    },
  ],
};

const nodeChildAdditions: Record<string, readonly CurriculumNode[]> = {
  "humanities.culinary-arts": [
    {
      id: "humanities.culinary-arts.recipes",
      label: "Recipes",
      href: "/humanities/culinary-arts/recipes",
      domainId: "humanities",
    },
    {
      id: "humanities.culinary-arts.market",
      label: "Ingredient Index",
      href: "/humanities/culinary-arts/market",
      domainId: "humanities",
    },
  ],
};

function appendMissingRoots(domain: CurriculumDomain): readonly CurriculumNode[] {
  const additions = domainRootAdditions[domain.domainId] ?? [];
  if (additions.length === 0) return domain.children;

  const existingIds = new Set(domain.children.map((node) => node.id));
  return [
    ...domain.children,
    ...additions.filter((node) => !existingIds.has(node.id)),
  ];
}

function appendMissingChildren(nodes: readonly CurriculumNode[]): readonly CurriculumNode[] {
  return nodes.map((node) => {
    const existingChildren = node.children ?? [];
    const additions = nodeChildAdditions[node.id] ?? [];
    const existingIds = new Set(existingChildren.map((child) => child.id));
    const children = [
      ...existingChildren,
      ...additions.filter((child) => !existingIds.has(child.id)),
    ];

    return {
      ...node,
      children: children.length > 0 ? appendMissingChildren(children) : undefined,
    };
  });
}

function composeCurriculum(nodes: readonly CurriculumNode[]): readonly CurriculumNode[] {
  const withMetadata = applyMetadata(nodes);
  const withReplacements = curriculumReplacements.reduce<readonly CurriculumNode[]>(
    (current, replacement) => replaceNode(current, replacement),
    withMetadata,
  );
  return appendMissingChildren(withReplacements);
}

/**
 * Dense curriculum branches can live in focused modules while still composing
 * into one validated registry. `tree.ts` remains the broad academic map; this
 * composition layer swaps in richer subtrees as they are migrated and can also
 * restore live roots and child routes that have not yet been migrated into the
 * broad tree.
 */
const curriculumDomains: readonly CurriculumDomain[] = CURRICULUM_DOMAINS.map(
  (domain) => ({
    ...domain,
    children: composeCurriculum(appendMissingRoots(domain)),
  }),
);

function flatten(nodes: readonly CurriculumNode[]): CurriculumNode[] {
  return nodes.flatMap((node) => [node, ...flatten(node.children ?? [])]);
}

const nodes = curriculumDomains.flatMap((domain) => flatten(domain.children));
const byId = new Map(nodes.map((node) => [node.id, node]));
const byHref = new Map(nodes.map((node) => [node.href, node]));
const parentById = new Map<string, CurriculumNode>();

function indexParents(parent: CurriculumNode) {
  for (const child of parent.children ?? []) {
    parentById.set(child.id, parent);
    indexParents(child);
  }
}

for (const domain of curriculumDomains) {
  for (const root of domain.children) indexParents(root);
}

function assertUnique(values: readonly string[], label: string) {
  const seen = new Set<string>();
  for (const value of values) {
    if (seen.has(value)) throw new Error(`Duplicate curriculum ${label}: ${value}`);
    seen.add(value);
  }
}

function validatePrerequisites() {
  for (const node of nodes) {
    for (const prerequisiteId of node.prerequisiteIds ?? []) {
      if (!byId.has(prerequisiteId)) {
        throw new Error(
          `Curriculum node ${node.id} references unknown prerequisite ${prerequisiteId}`,
        );
      }
      if (prerequisiteId === node.id) {
        throw new Error(`Curriculum node ${node.id} cannot require itself`);
      }
    }
  }

  const visiting = new Set<string>();
  const visited = new Set<string>();

  const visit = (nodeId: string) => {
    if (visited.has(nodeId)) return;
    if (visiting.has(nodeId)) {
      throw new Error(`Prerequisite cycle detected at curriculum node ${nodeId}`);
    }

    visiting.add(nodeId);
    const node = byId.get(nodeId);
    for (const prerequisiteId of node?.prerequisiteIds ?? []) visit(prerequisiteId);
    visiting.delete(nodeId);
    visited.add(nodeId);
  };

  for (const node of nodes) visit(node.id);
}

assertUnique(nodes.map((node) => node.id), "id");
assertUnique(nodes.map((node) => node.href), "href");
validatePrerequisites();

export const curriculumRegistry = {
  snapshot(): CurriculumRegistrySnapshot {
    return { domains: curriculumDomains, nodes };
  },

  allDomains(): readonly CurriculumDomain[] {
    return curriculumDomains;
  },

  allNodes(): readonly CurriculumNode[] {
    return nodes;
  },

  getNode(id: string): CurriculumNode | undefined {
    return byId.get(id);
  },

  getNodeByHref(href: string): CurriculumNode | undefined {
    return byHref.get(href);
  },

  parentFor(id: string): CurriculumNode | undefined {
    return parentById.get(id);
  },

  prerequisitesFor(id: string): readonly CurriculumNode[] {
    const node = byId.get(id);
    if (!node) return [];
    return (node.prerequisiteIds ?? []).flatMap((prerequisiteId) => {
      const prerequisite = byId.get(prerequisiteId);
      return prerequisite ? [prerequisite] : [];
    });
  },
};
