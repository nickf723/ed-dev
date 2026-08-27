import type { KnowledgeNode } from "./ontology";

/** Verified routed branches plus explicit concepts taught inside Formal Science pages. */
export const formalScienceOntologyExpansions: Record<string, KnowledgeNode[]> = {
  "algebra-fundamentals": [
    { id: "algebraic-properties", label: "Algebraic Properties", slug: "/formal-science/mathematics/algebra/elementary-algebra/fundamentals/algebraic-properties", kind: "topic", status: "live" },
    { id: "equality-equations", label: "Equality & Equations", slug: "/formal-science/mathematics/algebra/elementary-algebra/fundamentals/equality-equations", kind: "topic", status: "live" },
    { id: "expressions-variables", label: "Expressions & Variables", slug: "/formal-science/mathematics/algebra/elementary-algebra/fundamentals/expressions-variables", kind: "topic", status: "live" },
    { id: "number-systems", label: "Number Systems", slug: "/formal-science/mathematics/algebra/elementary-algebra/fundamentals/number-systems", kind: "topic", status: "live" },
    { id: "one-step-equations", label: "One-Step Equations", slug: "/formal-science/mathematics/algebra/elementary-algebra/fundamentals/one-step-equations", kind: "topic", status: "live" },
    { id: "two-step-equations", label: "Two-Step Equations", slug: "/formal-science/mathematics/algebra/elementary-algebra/fundamentals/two-step-equations", kind: "topic", status: "live" },
    { id: "variables-changing-quantities", label: "Variables as Changing Quantities", slug: "/formal-science/mathematics/algebra/elementary-algebra/fundamentals/variables-changing-quantities", kind: "topic", status: "live" },
  ],

  "expressions-variables": [
    { id: "term", label: "Term", kind: "concept", status: "live" },
    { id: "coefficient", label: "Coefficient", kind: "concept", status: "live" },
    { id: "variable", label: "Variable", kind: "concept", status: "live" },
    { id: "exponent", label: "Exponent", kind: "concept", status: "live" },
    { id: "constant", label: "Constant", kind: "concept", status: "live" },
    { id: "like-terms", label: "Like Terms", kind: "concept", status: "live" },
  ],

  calculus: [
    {
      id: "limits",
      label: "Limits",
      slug: "/formal-science/mathematics/calculus/limits",
      kind: "branch",
      status: "live",
      children: [
        { id: "continuity", label: "Continuity", slug: "/formal-science/mathematics/calculus/limits/continuity", kind: "topic", status: "live" },
        { id: "epsilon-delta", label: "Epsilon–Delta", slug: "/formal-science/mathematics/calculus/limits/epsilon-delta", kind: "topic", status: "live" },
        { id: "infinite-limits", label: "Infinite Limits", slug: "/formal-science/mathematics/calculus/limits/infinity", kind: "topic", status: "live" },
        { id: "limit-laws", label: "Limit Laws", slug: "/formal-science/mathematics/calculus/limits/laws", kind: "topic", status: "live" },
        { id: "lhopitals-rule", label: "L’Hôpital’s Rule", slug: "/formal-science/mathematics/calculus/limits/lhopital", kind: "topic", status: "live" },
      ],
    },
  ],

  "discrete-mathematics": [
    { id: "combinatorics", label: "Combinatorics", slug: "/formal-science/mathematics/discrete/combinatorics", kind: "branch", status: "live" },
    { id: "graph-theory", label: "Graph Theory", slug: "/formal-science/mathematics/discrete/graph-theory", kind: "branch", status: "live" },
    { id: "recursion-theory", label: "Recursion Theory", slug: "/formal-science/mathematics/discrete/recursion-theory", kind: "branch", status: "live" },
    { id: "set-theory", label: "Set Theory", slug: "/formal-science/mathematics/discrete/set-theory", kind: "branch", status: "live" },
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
      children: [
        { id: "points-lines", label: "Points & Lines", slug: "/formal-science/mathematics/geometry/euclidean/points-lines", kind: "topic", status: "live" },
        { id: "angles-intersections", label: "Angles & Intersections", slug: "/formal-science/mathematics/geometry/euclidean/angles-intersections", kind: "topic", status: "live" },
        { id: "classic-constructions", label: "Classic Constructions", slug: "/formal-science/mathematics/geometry/euclidean/classic-constructions", kind: "topic", status: "live" },
        { id: "geometry-logic-proofs", label: "Logic & Proofs", slug: "/formal-science/mathematics/geometry/euclidean/logic-proofs", kind: "topic", status: "live" },
        { id: "polygons-circles", label: "Polygons & Circles", slug: "/formal-science/mathematics/geometry/euclidean/polygons-circles", kind: "topic", status: "live" },
        { id: "triangle-congruence", label: "Triangle Congruence", slug: "/formal-science/mathematics/geometry/euclidean/triangle-congruence", kind: "topic", status: "live" },
      ],
    },
  ],

  "number-theory": [
    { id: "diophantine-equations", label: "Diophantine Equations", slug: "/formal-science/mathematics/number-theory/diophantine", kind: "branch", status: "live" },
  ],

  statistics: [
    { id: "descriptive-statistics", label: "Descriptive Statistics", slug: "/formal-science/mathematics/statistics/descriptive", kind: "branch", status: "live" },
    { id: "probability", label: "Probability", slug: "/formal-science/mathematics/statistics/probability", kind: "branch", status: "live" },
  ],
};

export function formalExpansionFor(nodeId: string): KnowledgeNode[] {
  return formalScienceOntologyExpansions[nodeId] ?? [];
}
