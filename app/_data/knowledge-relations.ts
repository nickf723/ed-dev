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
  { sourceId: "coefficient", targetId: "term", kind: "part-of" },
  { sourceId: "variable", targetId: "term", kind: "part-of" },
  { sourceId: "exponent", targetId: "term", kind: "part-of" },
  {
    sourceId: "set-membership",
    targetId: "set-union",
    kind: "prerequisite-for",
    note: "Union is presented as a filter on element membership.",
  },
  {
    sourceId: "set-membership",
    targetId: "set-intersection",
    kind: "prerequisite-for",
    note: "Intersection is presented as a filter on element membership.",
  },
  {
    sourceId: "set-membership",
    targetId: "set-difference",
    kind: "prerequisite-for",
    note: "Difference is presented as a filter on element membership.",
  },
  {
    sourceId: "set-element",
    targetId: "subset",
    kind: "contrasts-with",
    note: "Set Theory explicitly distinguishes object-to-set membership from set-to-set containment.",
  },
  { sourceId: "xylem", targetId: "transpiration", kind: "related-to" },
  { sourceId: "stomata", targetId: "transpiration", kind: "related-to" },
  { sourceId: "phloem", targetId: "source-sink", kind: "related-to" },
  {
    sourceId: "political-authority",
    targetId: "political-theory",
    kind: "related-to",
    note: "Political Theory asks what makes authority legitimate, just, free, equal, or binding.",
  },
  {
    sourceId: "political-institutions-question",
    targetId: "political-institutions",
    kind: "related-to",
    note: "The recurring institutions question asks which formal and informal rules structure incentives, veto points, representation, enforcement, and accountability.",
  },
  {
    sourceId: "collective-choice",
    targetId: "political-behavior",
    kind: "related-to",
    note: "Political behavior studies how citizens, parties, campaigns, identities, and information shape participation entering collective choice.",
  },
  {
    sourceId: "collective-choice",
    targetId: "political-institutions",
    kind: "related-to",
    note: "Political Science presents preferences and participation meeting institutional rules before producing collective outcomes.",
  },
  {
    sourceId: "collective-choice",
    targetId: "public-policy",
    kind: "related-to",
    note: "Public policy follows how collective problems reach agendas, become policy, and survive implementation.",
  },
  {
    sourceId: "data-measure",
    targetId: "data-describe",
    kind: "prerequisite-for",
    note: "The Data Science hub begins with what rows, fields, labels, and missing values represent before describing patterns.",
  },
  {
    sourceId: "data-measure",
    targetId: "data-infer",
    kind: "prerequisite-for",
    note: "Inference depends on understanding how observations were measured and sampled.",
  },
  {
    sourceId: "data-measure",
    targetId: "data-predict",
    kind: "prerequisite-for",
    note: "Prediction quality depends on a defensible measurement process before model fitting begins.",
  },
  {
    sourceId: "data-description",
    targetId: "data-prediction",
    kind: "contrasts-with",
    note: "The Data Science page explicitly separates describing observed patterns from predicting relevant unseen cases.",
  },
  {
    sourceId: "data-description",
    targetId: "data-causal-claim",
    kind: "contrasts-with",
    note: "Observed patterns and intervention effects answer different questions.",
  },
  {
    sourceId: "data-prediction",
    targetId: "data-causal-claim",
    kind: "contrasts-with",
    note: "Predictive accuracy does not by itself identify what would happen under an intervention.",
  },
  {
    sourceId: "narrative-story",
    targetId: "narrative-plot",
    kind: "contrasts-with",
    note: "Narrative Fiction distinguishes reconstructed chronological and causal events from the selection and arrangement through which the reader encounters them.",
  },
  {
    sourceId: "narrator",
    targetId: "author",
    kind: "contrasts-with",
    note: "The page explicitly warns that narrator is a constructed speaking position, not the author.",
  },
  {
    sourceId: "narrative-order",
    targetId: "narrative-plot",
    kind: "part-of",
    note: "Plot controls the order through which story material is disclosed to the reader.",
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
