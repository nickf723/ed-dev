import type { KnowledgeNode } from "./ontology";

/** Verified routed branches for Formal Science disciplines outside the core algebra/CS catalog. */
export const formalScienceOntologyExpansions: Record<string, KnowledgeNode[]> = {
  calculus: [
    {
      id: "limits",
      label: "Limits",
      slug: "/formal-science/mathematics/calculus/limits",
      kind: "branch",
      status: "live",
    },
  ],

  "discrete-mathematics": [
    {
      id: "combinatorics",
      label: "Combinatorics",
      slug: "/formal-science/mathematics/discrete/combinatorics",
      kind: "branch",
      status: "live",
    },
    {
      id: "graph-theory",
      label: "Graph Theory",
      slug: "/formal-science/mathematics/discrete/graph-theory",
      kind: "branch",
      status: "live",
    },
    {
      id: "recursion-theory",
      label: "Recursion Theory",
      slug: "/formal-science/mathematics/discrete/recursion-theory",
      kind: "branch",
      status: "live",
    },
    {
      id: "set-theory",
      label: "Set Theory",
      slug: "/formal-science/mathematics/discrete/set-theory",
      kind: "branch",
      status: "live",
    },
  ],

  "foundations-of-mathematics": [
    { id: "arithmetic-foundations", label: "Arithmetic", slug: "/formal-science/mathematics/foundations/arithmetic", kind: "branch", status: "live" },
    { id: "fraction-foundations", label: "Fractions", slug: "/formal-science/mathematics/foundations/fractions", kind: "branch", status: "live" },
    { id: "geometry-foundations", label: "Geometry Foundations", slug: "/formal-science/mathematics/foundations/geometry", kind: "branch", status: "live" },
    { id: "grouping-foundations", label: "Grouping", slug: "/formal-science/mathematics/foundations/grouping", kind: "branch", status: "live" },
    { id: "inequality-foundations", label: "Inequalities", slug: "/formal-science/mathematics/foundations/inequalities", kind: "branch", status: "live" },
    { id: "measurement-foundations", label: "Measurement", slug: "/formal-science/mathematics/foundations/measurement", kind: "branch", status: "live" },
    { id: "statistics-foundations", label: "Statistics Foundations", slug: "/formal-science/mathematics/foundations/statistics", kind: "branch", status: "live" },
  ],

  geometry: [
    {
      id: "euclidean-geometry",
      label: "Euclidean Geometry",
      slug: "/formal-science/mathematics/geometry/euclidean",
      kind: "branch",
      status: "live",
    },
  ],

  "number-theory": [
    {
      id: "diophantine-equations",
      label: "Diophantine Equations",
      slug: "/formal-science/mathematics/number-theory/diophantine",
      kind: "branch",
      status: "live",
    },
  ],

  statistics: [
    {
      id: "descriptive-statistics",
      label: "Descriptive Statistics",
      slug: "/formal-science/mathematics/statistics/descriptive",
      kind: "branch",
      status: "live",
    },
    {
      id: "probability",
      label: "Probability",
      slug: "/formal-science/mathematics/statistics/probability",
      kind: "branch",
      status: "live",
    },
  ],
};

export function formalExpansionFor(nodeId: string): KnowledgeNode[] {
  return formalScienceOntologyExpansions[nodeId] ?? [];
}
