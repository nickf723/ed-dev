import type { CurriculumNode } from "@/lib/curriculum/types";

function branch(
  id: string,
  label: string,
  href: string,
  description: string,
  status: CurriculumNode["status"] = "active",
): CurriculumNode {
  return { id, label, href, description, domainId: "formal", status, pageKind: "hub" };
}

export const CALCULUS_CURRICULUM: CurriculumNode = {
  id: "formal.mathematics.calculus",
  label: "Calculus",
  href: "/formal-science/mathematics/calculus",
  description:
    "Limits, derivatives, integrals, multivariable change, vector fields, and differential equations for describing local change and accumulated effect.",
  domainId: "formal",
  status: "active",
  pageKind: "hub",
  children: [
    branch(
      "formal.mathematics.calculus.limits",
      "Limits & Continuity",
      "/formal-science/mathematics/calculus/limits",
      "Approach behavior, one-sided limits, continuity, infinite behavior, and the local ideas used to define derivatives and definite integrals rigorously.",
    ),
    branch(
      "formal.mathematics.calculus.differential",
      "Differential Calculus",
      "/formal-science/mathematics/calculus/differential",
      "Derivatives, tangent approximation, rates of change, derivative rules, extrema, optimization, and local sensitivity.",
    ),
    branch(
      "formal.mathematics.calculus.integral",
      "Integral Calculus",
      "/formal-science/mathematics/calculus/integral",
      "Accumulation, definite and indefinite integrals, Riemann sums, antiderivatives, integral techniques, and the Fundamental Theorem of Calculus.",
    ),
    branch(
      "formal.mathematics.calculus.multivariate",
      "Multivariable Calculus",
      "/formal-science/mathematics/calculus/multivariate",
      "Partial derivatives, gradients, directional change, multiple integrals, constrained optimization, and calculus on functions with several variables.",
    ),
    branch(
      "formal.mathematics.calculus.vector",
      "Vector Calculus",
      "/formal-science/mathematics/calculus/vector",
      "Vector fields, divergence, curl, line and surface integrals, and the integral theorems connecting local field behavior to boundaries.",
      "placeholder",
    ),
    branch(
      "formal.mathematics.calculus.differential-equations",
      "Differential Equations",
      "/formal-science/mathematics/calculus/differential-equations",
      "Equations whose unknowns are functions, connecting rates of change to trajectories, growth, oscillation, transport, feedback, and dynamical systems.",
    ),
  ],
};
