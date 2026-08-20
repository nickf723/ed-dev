import type { CurriculumNode } from "@/lib/curriculum/types";

function branch(
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
    pageKind: "unit",
  };
}

export const COMPUTATION_THEORY_CURRICULUM: CurriculumNode = {
  id: "formal.computer-science.theory",
  label: "Computation Theory",
  href: "/formal-science/computer-science/theory",
  description:
    "Mathematical models of computation, the boundary between computable and non-computable problems, and the resources required to solve computable problems.",
  domainId: "formal",
  status: "active",
  pageKind: "hub",
  children: [
    branch(
      "formal.computer-science.theory.automata",
      "Automata & Formal Languages",
      "/formal-science/computer-science/theory/automata",
      "Finite-state and related machine models, formal languages, grammars, recognition, and the relationship between machine memory and expressive power.",
      "active",
    ),
    branch(
      "formal.computer-science.theory.computability",
      "Computability",
      "/formal-science/computer-science/theory/computability",
      "Turing machines, decidability, recognizability, reductions, the halting problem, and the boundary of what algorithms can compute in principle.",
    ),
    branch(
      "formal.computer-science.theory.complexity",
      "Complexity Theory",
      "/formal-science/computer-science/theory/complexity-theory",
      "Time and space complexity classes, tractability, reductions, completeness, and the resource cost of solving problems that are computable.",
    ),
  ],
};
