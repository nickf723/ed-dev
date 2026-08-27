import {
  educationStationOntology,
  type KnowledgeNode,
} from "./ontology";
import { expansionFor } from "./ontology-expansions";
import { appliedExpansionFor } from "./ontology-expansions-applied";
import { dataScienceExpansionFor } from "./ontology-expansions-data-science";
import { formalExpansionFor } from "./ontology-expansions-formal";
import { humanitiesExpansionFor } from "./ontology-expansions-humanities";
import { interdisciplinaryExpansionFor } from "./ontology-expansions-interdisciplines";
import { naturalExpansionFor } from "./ontology-expansions-natural";
import { socialExpansionFor } from "./ontology-expansions-social";

function mergeChildren(base: KnowledgeNode[], additions: KnowledgeNode[]): KnowledgeNode[] {
  const byId = new Map<string, KnowledgeNode>();

  for (const node of [...base, ...additions]) {
    const existing = byId.get(node.id);
    byId.set(node.id, existing ? { ...existing, ...node } : node);
  }

  return [...byId.values()];
}

function materializeNode(node: KnowledgeNode): KnowledgeNode {
  const verifiedChildren = [
    ...expansionFor(node.id),
    ...formalExpansionFor(node.id),
    ...dataScienceExpansionFor(node.id),
    ...naturalExpansionFor(node.id),
    ...socialExpansionFor(node.id),
    ...humanitiesExpansionFor(node.id),
    ...appliedExpansionFor(node.id),
    ...interdisciplinaryExpansionFor(node.id),
  ];
  const children = mergeChildren(node.children ?? [], verifiedChildren).map(materializeNode);

  return {
    ...node,
    ...(children.length ? { children } : {}),
  };
}

/**
 * The materialized graph combines the stable domain skeleton with deeper
 * branches verified from routed studio content. New branches can be audited
 * and added incrementally without forcing a navigation rewrite.
 */
export const educationStationKnowledgeGraph = materializeNode(educationStationOntology);

export function flattenKnowledgeGraph(
  root: KnowledgeNode = educationStationKnowledgeGraph,
): KnowledgeNode[] {
  return [root, ...(root.children ?? []).flatMap((child) => flattenKnowledgeGraph(child))];
}

export function findGraphNode(id: string): KnowledgeNode | undefined {
  return flattenKnowledgeGraph().find((node) => node.id === id);
}

export function findGraphNodeBySlug(slug: string): KnowledgeNode | undefined {
  return flattenKnowledgeGraph().find((node) => node.slug === slug);
}

export function findGraphPath(id: string): KnowledgeNode[] | undefined {
  const walk = (node: KnowledgeNode, path: KnowledgeNode[]): KnowledgeNode[] | undefined => {
    const next = [...path, node];
    if (node.id === id) return next;

    for (const child of node.children ?? []) {
      const result = walk(child, next);
      if (result) return result;
    }

    return undefined;
  };

  return walk(educationStationKnowledgeGraph, []);
}

/**
 * Returns the nearest routed node that contains or represents this knowledge.
 * Routed nodes host themselves; embedded nodes inherit the closest routed
 * ancestor. This lets concept nodes navigate back to the page that teaches them.
 */
export function findKnowledgeHostPage(id: string): KnowledgeNode | undefined {
  const path = findGraphPath(id);
  if (!path) return undefined;
  return [...path].reverse().find((node) => Boolean(node.slug));
}

export function graphChildren(id: string): KnowledgeNode[] {
  return findGraphNode(id)?.children ?? [];
}

export function graphDescendants(id: string): KnowledgeNode[] {
  const node = findGraphNode(id);
  if (!node) return [];
  return (node.children ?? []).flatMap((child) => [child, ...flattenKnowledgeGraph(child).slice(1)]);
}

export function graphDescendantCount(id: string): number {
  return graphDescendants(id).length;
}

export function searchKnowledgeGraph(query: string, limit = 12): KnowledgeNode[] {
  const normalized = query.trim().toLocaleLowerCase();
  if (!normalized || limit <= 0) return [];

  const terms = normalized.split(/\s+/).filter(Boolean);
  const score = (node: KnowledgeNode) => {
    const label = node.label.toLocaleLowerCase();
    const id = node.id.toLocaleLowerCase();
    const slug = node.slug?.toLocaleLowerCase() ?? "";
    const path = findGraphPath(node.id) ?? [];
    const pathText = path
      .flatMap((part) => [part.label, part.id])
      .join(" ")
      .toLocaleLowerCase();
    const searchable = `${label} ${id} ${slug} ${pathText}`;
    let value = 0;

    if (label === normalized) value += 100;
    if (id === normalized) value += 90;
    if (label.startsWith(normalized)) value += 60;
    if (id.startsWith(normalized)) value += 50;
    if (label.includes(normalized)) value += 35;
    if (slug.includes(normalized)) value += 20;
    if (pathText.includes(normalized)) value += 15;
    if (terms.every((term) => searchable.includes(term))) value += 24;

    for (const term of terms) {
      if (label.includes(term)) value += 8;
      if (id.includes(term)) value += 5;
      if (slug.includes(term)) value += 3;
      if (pathText.includes(term)) value += 2;
    }

    return value;
  };

  return flattenKnowledgeGraph()
    .map((node) => ({ node, score: score(node) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.node.label.localeCompare(b.node.label) || a.node.id.localeCompare(b.node.id))
    .slice(0, limit)
    .map(({ node }) => node);
}
