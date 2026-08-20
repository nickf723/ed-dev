import type { CurriculumNode } from "@/lib/curriculum/types";

function branch(
  id: string,
  label: string,
  href: string,
  description: string
): CurriculumNode {
  return {
    id,
    label,
    href,
    description,
    domainId: "formal",
    status: "active",
    pageKind: "hub",
  };
}

export const DISCRETE_MATHEMATICS_CURRICULUM: CurriculumNode = {
  id: "formal.mathematics.discrete",
  label: "Discrete Mathematics",
  href: "/formal-science/mathematics/discrete",
  description:
    "The study of distinct mathematical objects and structures through membership, relation, enumeration, and recursive construction.",
  domainId: "formal",
  status: "active",
  pageKind: "hub",
  children: [
    branch(
      "formal.mathematics.discrete.set-theory",
      "Set Theory",
      "/formal-science/mathematics/discrete/set-theory",
      "Study collections through membership, containment, union, intersection, difference, and other operations on sets."
    ),
    branch(
      "formal.mathematics.discrete.graph-theory",
      "Graph Theory",
      "/formal-science/mathematics/discrete/graph-theory",
      "Model pairwise relationships with vertices and edges, then study paths, connectivity, degree, and network structure."
    ),
    branch(
      "formal.mathematics.discrete.combinatorics",
      "Combinatorics",
      "/formal-science/mathematics/discrete/combinatorics",
      "Count and compare finite arrangements, selections, distributions, and possibilities without listing every case."
    ),
    branch(
      "formal.mathematics.discrete.recursion-theory",
      "Recursion Theory",
      "/formal-science/mathematics/discrete/recursion-theory",
      "Describe structures and procedures in terms of smaller instances, base cases, recursive cases, and recurrence relations."
    ),
  ],
};
