import { findGraphNode } from "./knowledge-graph";
import type { KnowledgeNode } from "./ontology";

export type KnowledgeRelationKind =
  | "part-of"
  | "prerequisite-for"
  | "related-to"
  | "contrasts-with"
  | "applied-in";

export type KnowledgeRelation = {
  sourceId: string;
  targetId: string;
  kind: KnowledgeRelationKind;
  note?: string;
};

export type ResolvedKnowledgeRelation = {
  relation: KnowledgeRelation;
  direction: "outgoing" | "incoming";
  other: KnowledgeNode;
};

/**
 * Cross-links complement the canonical parent-child tree. They describe
 * conceptual relationships without changing where a node canonically lives.
 * Keep this list evidence-driven and intentionally sparse.
 */
export const knowledgeRelations: KnowledgeRelation[] = [
  {
    sourceId: "motion",
    targetId: "forces",
    kind: "prerequisite-for",
    note: "Mechanics introduces motion as the language used before explaining changes through forces.",
  },
  {
    sourceId: "forces",
    targetId: "mechanical-energy",
    kind: "related-to",
    note: "Mechanics connects interaction-based explanations with energy and momentum reasoning across change.",
  },
  {
    sourceId: "coefficient",
    targetId: "term",
    kind: "part-of",
  },
  {
    sourceId: "variable",
    targetId: "term",
    kind: "part-of",
  },
  {
    sourceId: "exponent",
    targetId: "term",
    kind: "part-of",
  },
  {
    sourceId: "membership",
    targetId: "set-union",
    kind: "prerequisite-for",
    note: "Union is presented as a filter on element membership.",
  },
  {
    sourceId: "membership",
    targetId: "set-intersection",
    kind: "prerequisite-for",
    note: "Intersection is presented as a filter on element membership.",
  },
  {
    sourceId: "membership",
    targetId: "set-difference",
    kind: "prerequisite-for",
    note: "Difference is presented as a filter on element membership.",
  },
  {
    sourceId: "element",
    targetId: "subset",
    kind: "contrasts-with",
    note: "Set Theory explicitly distinguishes object-to-set membership from set-to-set containment.",
  },
  {
    sourceId: "xylem",
    targetId: "transpiration",
    kind: "related-to",
  },
  {
    sourceId: "stomata",
    targetId: "transpiration",
    kind: "related-to",
  },
  {
    sourceId: "phloem",
    targetId: "source-sink",
    kind: "related-to",
  },
];

export function knowledgeRelationsFor(nodeId: string): ResolvedKnowledgeRelation[] {
  return knowledgeRelations.flatMap((relation) => {
    if (relation.sourceId === nodeId) {
      const other = findGraphNode(relation.targetId);
      return other ? [{ relation, direction: "outgoing" as const, other }] : [];
    }
    if (relation.targetId === nodeId) {
      const other = findGraphNode(relation.sourceId);
      return other ? [{ relation, direction: "incoming" as const, other }] : [];
    }
    return [];
  });
}

export function relationLabel(
  kind: KnowledgeRelationKind,
  direction: ResolvedKnowledgeRelation["direction"],
): string {
  if (kind === "part-of") return direction === "outgoing" ? "part of" : "contains part";
  if (kind === "prerequisite-for") return direction === "outgoing" ? "prepares for" : "builds on";
  if (kind === "applied-in") return direction === "outgoing" ? "applied in" : "uses";
  if (kind === "contrasts-with") return "contrasts with";
  return "related to";
}
