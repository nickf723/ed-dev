import type { KnowledgeNode } from "./ontology";
import {
  educationStationKnowledgeGraph,
  findGraphNode,
  findGraphNodeBySlug,
  findGraphPath,
} from "./knowledge-graph";

export type KnowledgeNavigationContext = {
  current: KnowledgeNode;
  breadcrumb: KnowledgeNode[];
  parent?: KnowledgeNode;
  siblings: KnowledgeNode[];
  children: KnowledgeNode[];
};

function contextForNode(node: KnowledgeNode): KnowledgeNavigationContext | undefined {
  const path = findGraphPath(node.id);
  if (!path) return undefined;

  const parent = path.at(-2);
  const siblings = parent
    ? (parent.children ?? []).filter((candidate) => candidate.id !== node.id)
    : [];

  return {
    current: node,
    breadcrumb: path,
    ...(parent ? { parent } : {}),
    siblings,
    children: node.children ?? [],
  };
}

/** Resolve graph-driven navigation from a stable ontology id. */
export function navigationForKnowledgeNode(id: string): KnowledgeNavigationContext | undefined {
  const node = findGraphNode(id);
  return node ? contextForNode(node) : undefined;
}

/** Resolve graph-driven navigation directly from an academic route. */
export function navigationForKnowledgeSlug(slug: string): KnowledgeNavigationContext | undefined {
  const normalized = slug === "/" ? slug : slug.replace(/\/+$/, "");
  const node = findGraphNodeBySlug(normalized);
  return node ? contextForNode(node) : undefined;
}

export function knowledgeBreadcrumbForSlug(slug: string): KnowledgeNode[] {
  return navigationForKnowledgeSlug(slug)?.breadcrumb ?? [];
}

export function knowledgeDomainForNode(id: string): KnowledgeNode | undefined {
  const path = findGraphPath(id);
  return path?.find((node) => node.kind === "domain");
}

export function knowledgeDomainForSlug(slug: string): KnowledgeNode | undefined {
  const node = findGraphNodeBySlug(slug === "/" ? slug : slug.replace(/\/+$/, ""));
  return node ? knowledgeDomainForNode(node.id) : undefined;
}

export function knowledgeRoot(): KnowledgeNode {
  return educationStationKnowledgeGraph;
}
