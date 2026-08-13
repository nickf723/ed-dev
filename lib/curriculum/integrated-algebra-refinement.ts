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
  ),
  lesson(
    "formal.mathematics.algebra.elementary-algebra.inequalities.systems",
    "Systems of Inequalities",
    "/formal-science/mathematics/algebra/elementary-algebra/inequalities/systems",
    "Graph multiple linear inequalities and identify the intersection of their feasible regions.",
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

  return node.children
    ? { ...node, children: node.children.map(refine) }
    : node;
}

/**
 * Transitional refinement of the Integrated Algebra branch.
 *
 * The base Algebra module remains the source for the rest of Algebra. This
 * adapter only corrects page depth for the three Integrated Algebra topics
 * that had grown into units before their child lessons were modeled.
 */
export const REFINED_ALGEBRA_CURRICULUM = refine(ALGEBRA_CURRICULUM);
