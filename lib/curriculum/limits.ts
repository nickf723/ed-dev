import type { CurriculumNode } from "@/lib/curriculum/types";

function lesson(id: string, label: string, href: string, description: string): CurriculumNode {
  return { id, label, href, description, domainId: "formal", status: "active", pageKind: "lesson" };
}

export const LIMITS_CURRICULUM: CurriculumNode = {
  id: "formal.mathematics.calculus.limits",
  label: "Limits & Continuity",
  href: "/formal-science/mathematics/calculus/limits",
  description:
    "Approach behavior, algebraic limit laws, infinite behavior, continuity, formal epsilon-delta definitions, and derivative-based tools for indeterminate limits.",
  domainId: "formal",
  status: "active",
  pageKind: "hub",
  children: [
    lesson(
      "formal.mathematics.calculus.limits.laws",
      "Limit Laws",
      "/formal-science/mathematics/calculus/limits/laws",
      "Use algebraic rules for sums, products, quotients, powers, and composition to evaluate limits when component limits behave appropriately.",
    ),
    lesson(
      "formal.mathematics.calculus.limits.infinity",
      "Infinite Limits",
      "/formal-science/mathematics/calculus/limits/infinity",
      "Describe unbounded function behavior near a finite input, distinguish one-sided behavior, and interpret vertical asymptotes without treating infinity as an ordinary number.",
    ),
    lesson(
      "formal.mathematics.calculus.limits.continuity",
      "Continuity",
      "/formal-science/mathematics/calculus/limits/continuity",
      "Connect function value, two-sided limit, one-sided limits, discontinuities, and interval-level consequences such as the Intermediate Value Theorem.",
    ),
    lesson(
      "formal.mathematics.calculus.limits.epsilon-delta",
      "Epsilon–Delta Definition",
      "/formal-science/mathematics/calculus/limits/epsilon-delta",
      "Make limit statements precise by relating every requested output tolerance epsilon to a sufficiently small input tolerance delta.",
    ),
    lesson(
      "formal.mathematics.calculus.limits.lhopital",
      "L’Hôpital’s Rule",
      "/formal-science/mathematics/calculus/limits/lhopital",
      "Use derivative information to evaluate certain 0/0 and infinity/infinity indeterminate forms when the rule's hypotheses are satisfied.",
    ),
  ],
};
