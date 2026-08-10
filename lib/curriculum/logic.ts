import type { CurriculumNode } from "@/lib/curriculum/types";

function node(
  id: string,
  label: string,
  href: string,
  description: string,
  status: CurriculumNode["status"] = "active",
): CurriculumNode {
  return {
    id,
    label,
    href,
    description,
    domainId: "formal",
    status,
  };
}

export const LOGIC_CURRICULUM: CurriculumNode = {
  id: "formal.logic",
  label: "Logic",
  href: "/formal-science/logic",
  description: "Reasoning, inference, truth, and proof.",
  domainId: "formal",
  status: "active",
  children: [
    node(
      "formal.logic.propositional",
      "Propositional Logic",
      "/formal-science/logic/propositional-logic",
      "Boolean connectives, truth tables, implication, equivalence, and the algebra of true and false statements.",
    ),
    node(
      "formal.logic.first-order",
      "First-Order Logic",
      "/formal-science/logic/first-order-logic",
      "Predicates, variables, quantifiers, and formal statements about objects and relationships.",
    ),
    node(
      "formal.logic.set-theory",
      "Set Theory",
      "/formal-science/logic/set-theory",
      "Membership, unions, intersections, infinity, and the foundational language of mathematical collections.",
      "placeholder",
    ),
    node(
      "formal.logic.fallacies",
      "Cognitive Biases & Fallacies",
      "/formal-science/logic/fallacies",
      "Common structural failures in everyday reasoning, including ad hominem, straw-man arguments, and related fallacies.",
      "placeholder",
    ),
  ],
};
