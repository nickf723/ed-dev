import {
  educationStationOntology,
  type KnowledgeNode,
} from "./ontology";
import { expansionFor } from "./ontology-expansions";
import { appliedExpansionFor } from "./ontology-expansions-applied";
import { formalExpansionFor } from "./ontology-expansions-formal";
import { humanitiesExpansionFor } from "./ontology-expansions-humanities";
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
    ...naturalExpansionFor(node.id),
    ...socialExpansionFor(node.id),
    ...humanitiesExpansionFor(node.id),
    ...appliedExpansionFor(node.id),
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

export function graphChildren(id: string): KnowledgeNode[] {
  return findGraphNode(id)?.children ?? [];
}
