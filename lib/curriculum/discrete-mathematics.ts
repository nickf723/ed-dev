import type { CurriculumNode } from "@/lib/curriculum/types";

function branch(
  id: string,
  label: string,
  href: string,
  description: string,
  pageKind: CurriculumNode["pageKind"] = "hub"
): CurriculumNode {
  return {
    id,
    label,
    href,
    description,
    domainId: "formal",
    status: "active",
    pageKind,
  };
}

function plannedSetTheoryLesson(
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
    status: "placeholder",
    pageKind: "lesson",
  };
}

const SET_THEORY_CURRICULUM: CurriculumNode = {
  id: "formal.mathematics.discrete.set-theory",
  label: "Set Theory",
  href: "/formal-science/mathematics/discrete/set-theory",
  description:
    "Study collections through membership, containment, operations, relations, partitions, and the foundations that make sets precise.",
  domainId: "formal",
  status: "active",
  pageKind: "unit",
  children: [
    plannedSetTheoryLesson(
      "formal.mathematics.discrete.set-theory.language",
      "The Language of Sets",
      "/formal-science/mathematics/discrete/set-theory/language",
      "Describe sets with membership, roster and set-builder notation, the empty and universal sets, and cardinality."
    ),
    plannedSetTheoryLesson(
      "formal.mathematics.discrete.set-theory.containment",
      "Containment & Power Sets",
      "/formal-science/mathematics/discrete/set-theory/containment",
      "Compare equality, proper and improper subsets, and the complete collection of subsets called a power set."
    ),
    plannedSetTheoryLesson(
      "formal.mathematics.discrete.set-theory.operations",
      "Operations & Identities",
      "/formal-science/mathematics/discrete/set-theory/operations",
      "Build union, intersection, difference, complement, and symmetric difference, then explain the laws they obey."
    ),
    plannedSetTheoryLesson(
      "formal.mathematics.discrete.set-theory.relations",
      "Products, Relations & Functions",
      "/formal-science/mathematics/discrete/set-theory/relations",
      "Use ordered pairs and Cartesian products to see relations and functions as carefully constrained sets."
    ),
    plannedSetTheoryLesson(
      "formal.mathematics.discrete.set-theory.partitions",
      "Partitions & Equivalence",
      "/formal-science/mathematics/discrete/set-theory/partitions",
      "Split a set into non-overlapping blocks and connect those partitions to equivalence relations."
    ),
    plannedSetTheoryLesson(
      "formal.mathematics.discrete.set-theory.foundations",
      "Infinity, Paradoxes & Foundations",
      "/formal-science/mathematics/discrete/set-theory/foundations",
      "Later, compare sizes of infinity, diagnose paradoxes, and ask why axiomatic foundations are needed."
    ),
  ],
};

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
    SET_THEORY_CURRICULUM,
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
