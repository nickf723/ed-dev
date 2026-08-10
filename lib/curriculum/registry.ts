import { ALGEBRA_CURRICULUM } from "@/lib/curriculum/algebra";
import { GROUP_THEORY_CURRICULUM } from "@/lib/curriculum/group-theory";
import { CURRICULUM_NODE_METADATA } from "@/lib/curriculum/metadata";
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

const curriculumReplacements = [ALGEBRA_CURRICULUM, GROUP_THEORY_CURRICULUM] as const;

function composeCurriculum(nodes: readonly CurriculumNode[]): readonly CurriculumNode[] {
  const withMetadata = applyMetadata(nodes);
  return curriculumReplacements.reduce<readonly CurriculumNode[]>(
    (current, replacement) => replaceNode(current, replacement),
    withMetadata,
  );
}

/**
 * Dense curriculum branches can live in focused modules while still composing
 * into one validated registry. `tree.ts` remains the broad academic map; this
 * composition layer swaps in richer subtrees as they are migrated.
 */
const curriculumDomains: readonly CurriculumDomain[] = CURRICULUM_DOMAINS.map((domain) => ({
  ...domain,
  children: composeCurriculum(domain.children),
}));

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
