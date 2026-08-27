import type { KnowledgeNode } from "./ontology";

/**
 * Explicit concepts already taught on the current Data Science hub.
 * Planned curriculum branches are intentionally excluded until routed pages exist.
 */
export const dataScienceOntologyExpansions: Record<string, KnowledgeNode[]> = {
  "data-science": [
    {
      id: "data-science-questions",
      label: "Core Data Questions",
      kind: "concept",
      status: "live",
      children: [
        { id: "data-measure", label: "Measure", kind: "concept", status: "live" },
        { id: "data-describe", label: "Describe", kind: "concept", status: "live" },
        { id: "data-infer", label: "Infer", kind: "concept", status: "live" },
        { id: "data-predict", label: "Predict", kind: "concept", status: "live" },
        { id: "data-causation", label: "Explain Cause", kind: "concept", status: "live" },
        { id: "data-communicate", label: "Communicate", kind: "concept", status: "live" },
      ],
    },
    {
      id: "data-evaluation-discipline",
      label: "Evaluation Discipline",
      kind: "concept",
      status: "live",
      children: [
        { id: "data-provenance", label: "Provenance", kind: "concept", status: "live" },
        { id: "data-leakage", label: "Leakage", kind: "concept", status: "live" },
        { id: "data-baseline", label: "Baseline", kind: "concept", status: "live" },
        { id: "held-out-evidence", label: "Held-out Evidence", kind: "concept", status: "live" },
        { id: "distribution-shift", label: "Distribution Shift", kind: "concept", status: "live" },
        { id: "decision-cost", label: "Decision Cost", kind: "concept", status: "live" },
      ],
    },
    {
      id: "data-claim-types",
      label: "Claim Types",
      kind: "concept",
      status: "live",
      children: [
        { id: "data-description", label: "Description", kind: "concept", status: "live" },
        { id: "data-prediction", label: "Prediction", kind: "concept", status: "live" },
        { id: "data-causal-claim", label: "Causation", kind: "concept", status: "live" },
      ],
    },
  ],
};

export function dataScienceExpansionFor(nodeId: string): KnowledgeNode[] {
  return dataScienceOntologyExpansions[nodeId] ?? [];
}
