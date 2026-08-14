import { ALGEBRA_CURRICULUM } from "@/lib/curriculum/algebra";
import type { CurriculumNode } from "@/lib/curriculum/types";

function lesson(
  id: string,
  label: string,
  href: string,
  description: string,
  status: CurriculumNode["status"] = "placeholder",
): CurriculumNode {
  return {
    id,
    label,
    href,
    description,
    domainId: "formal",
    status,
    pageKind: "lesson",
  };
}

const graphingLinearEquationsChildren: readonly CurriculumNode[] = [
  lesson(
    "formal.mathematics.algebra.elementary-algebra.linear-equations.slope-rate",
    "Slope & Rate of Change",
    "/formal-science/mathematics/algebra/elementary-algebra/linear-equations/slope-rate",
    "Interpret slope as a constant rate of change and connect rise/run to changes in x and y.",
    "active",
  ),
  lesson(
    "formal.mathematics.algebra.elementary-algebra.linear-equations.slope-intercept",
    "Slope-Intercept Form",
    "/formal-science/mathematics/algebra/elementary-algebra/linear-equations/slope-intercept",
    "Read y = mx + b by connecting slope and y-intercept to one linear relationship.",
    "active",
  ),
  lesson(
    "formal.mathematics.algebra.elementary-algebra.linear-equations.graphing-line",
    "Graphing a Line",
    "/formal-science/mathematics/algebra/elementary-algebra/linear-equations/graphing-line",
    "Turn a linear equation into points and extend those points into the complete straight-line solution set.",
    "active",
  ),
  lesson(
    "formal.mathematics.algebra.elementary-algebra.linear-equations.forms-special-cases",
    "Line Forms & Special Cases",
    "/formal-science/mathematics/algebra/elementary-algebra/linear-equations/forms-special-cases",
    "Compare slope-intercept, point-slope, and standard forms, including horizontal and vertical lines.",
    "active",
  ),
];

const systemsOfEquationsChildren: readonly CurriculumNode[] = [
  lesson(
    "formal.mathematics.algebra.elementary-algebra.systems.solution-types",
    "Intersections & Solution Types",
    "/formal-science/mathematics/algebra/elementary-algebra/systems-of-equations/solution-types",
    "Interpret a system as shared constraints and distinguish one solution, no solution, and infinitely many solutions.",
    "active",
  ),
  lesson(
    "formal.mathematics.algebra.elementary-algebra.systems.graphing",
    "Solving by Graphing",
    "/formal-science/mathematics/algebra/elementary-algebra/systems-of-equations/graphing",
    "Find a system solution by locating the intersection of its graphs and verifying the shared ordered pair.",
    "active",
  ),
  lesson(
    "formal.mathematics.algebra.elementary-algebra.systems.substitution",
    "Substitution",
    "/formal-science/mathematics/algebra/elementary-algebra/systems-of-equations/substitution",
    "Replace one variable with an equivalent expression so the system becomes a one-variable equation.",
    "active",
  ),
  lesson(
    "formal.mathematics.algebra.elementary-algebra.systems.elimination",
    "Elimination",
    "/formal-science/mathematics/algebra/elementary-algebra/systems-of-equations/elimination",
    "Combine equivalent equations so one variable cancels and the shared solution is exposed.",
    "active",
  ),
];

const inequalitiesChildren: readonly CurriculumNode[] = [
  lesson(
    "formal.mathematics.algebra.elementary-algebra.inequalities.one-variable",
    "One-Variable Inequalities",
    "/formal-science/mathematics/algebra/elementary-algebra/inequalities/one-variable",
    "Solve one-variable inequalities and connect the isolated statement to a number-line solution region and interval notation.",
    "active",
  ),
  lesson(
    "formal.mathematics.algebra.elementary-algebra.inequalities.compound",
    "Compound Inequalities",
    "/formal-science/mathematics/algebra/elementary-algebra/inequalities/compound",
    "Combine two one-dimensional constraints using AND/intersection or OR/union.",
    "active",
  ),
  lesson(
    "formal.mathematics.algebra.elementary-algebra.inequalities.systems",
    "Systems of Inequalities",
    "/formal-science/mathematics/algebra/elementary-algebra/inequalities/systems",
    "Graph multiple linear inequalities and identify the intersection of their feasible regions.",
    "active",
  ),
];

const quadraticsChildren: readonly CurriculumNode[] = [
  lesson(
    "formal.mathematics.algebra.elementary-algebra.quadratics.patterns-parabolas",
    "Quadratic Patterns & Parabolas",
    "/formal-science/mathematics/algebra/elementary-algebra/quadratic-equations/patterns-parabolas",
    "Recognize constant second differences and connect degree-two patterns to parabolic graphs.",
    "active",
  ),
  lesson(
    "formal.mathematics.algebra.elementary-algebra.quadratics.vertex-form",
    "Vertex Form & Transformations",
    "/formal-science/mathematics/algebra/elementary-algebra/quadratic-equations/vertex-form",
    "Read y = a(x − h)² + k through opening, width, vertex, and axis of symmetry.",
    "active",
  ),
  lesson(
    "formal.mathematics.algebra.elementary-algebra.quadratics.roots-intercepts",
    "Roots & X-Intercepts",
    "/formal-science/mathematics/algebra/elementary-algebra/quadratic-equations/roots-intercepts",
    "Connect roots, zeros, solutions, and x-intercepts as the places where a quadratic output becomes zero.",
    "active",
  ),
  lesson(
    "formal.mathematics.algebra.elementary-algebra.quadratics.completing-square",
    "Completing the Square",
    "/formal-science/mathematics/algebra/elementary-algebra/quadratic-equations/completing-square",
    "Create a perfect-square trinomial while preserving equality, then solve or expose vertex form.",
    "active",
  ),
  lesson(
    "formal.mathematics.algebra.elementary-algebra.quadratics.quadratic-formula",
    "Quadratic Formula & Discriminant",
    "/formal-science/mathematics/algebra/elementary-algebra/quadratic-equations/quadratic-formula",
    "Use the general quadratic formula and interpret the discriminant as a forecast of real-root geometry.",
    "active",
  ),
];

function refine(node: CurriculumNode): CurriculumNode {
  if (node.id === "formal.mathematics.algebra.elementary-algebra.linear-equations") {
    return {
      ...node,
      description: "Slope, linear forms, graphing, and the geometry of straight-line relationships.",
      pageKind: "unit",
      children: graphingLinearEquationsChildren,
    };
  }

  if (node.id === "formal.mathematics.algebra.elementary-algebra.systems") {
    return {
      ...node,
      description: "Shared solutions, graphical intersections, substitution, and elimination.",
      pageKind: "unit",
      children: systemsOfEquationsChildren,
    };
  }

  if (node.id === "formal.mathematics.algebra.elementary-algebra.inequalities") {
    return {
      ...node,
      description: "One-variable solution regions, compound constraints, and overlapping half-planes.",
      pageKind: "unit",
      children: inequalitiesChildren,
    };
  }

  if (node.id === "formal.mathematics.algebra.elementary-algebra.quadratics") {
    return {
      ...node,
      description: "Quadratic patterns, parabolic geometry, roots, square construction, and the general solution formula.",
      pageKind: "unit",
      children: quadraticsChildren,
    };
  }

  return node.children
    ? { ...node, children: node.children.map(refine) }
    : node;
}

/**
 * Transitional refinement of the Integrated Algebra branch.
 *
 * The base Algebra module remains the source for the rest of Algebra. This
 * adapter corrects page depth for Integrated Algebra topics that have grown
 * into units before their child lessons were modeled in the base curriculum.
 */
export const REFINED_ALGEBRA_CURRICULUM = refine(ALGEBRA_CURRICULUM);
