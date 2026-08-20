import type { CurriculumNode } from "@/lib/curriculum/types";

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

function plannedGraphTheoryLesson(
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

function plannedCombinatoricsLesson(
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

function plannedRecursionLesson(
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

const GRAPH_THEORY_CURRICULUM: CurriculumNode = {
  id: "formal.mathematics.discrete.graph-theory",
  label: "Graph Theory",
  href: "/formal-science/mathematics/discrete/graph-theory",
  description:
    "Model pairwise relationships with vertices and edges, then study degree, routes, connectivity, trees, direction, weight, coloring, and network structure.",
  domainId: "formal",
  status: "active",
  pageKind: "unit",
  children: [
    plannedGraphTheoryLesson(
      "formal.mathematics.discrete.graph-theory.vertices-edges-degree",
      "Vertices, Edges & Degree",
      "/formal-science/mathematics/discrete/graph-theory/vertices-edges-degree",
      "Translate a real relationship into vertices and edges, then measure local structure with adjacency and degree."
    ),
    plannedGraphTheoryLesson(
      "formal.mathematics.discrete.graph-theory.walks-trails-paths",
      "Walks, Trails & Paths",
      "/formal-science/mathematics/discrete/graph-theory/walks-trails-paths",
      "Distinguish repeated vertices from repeated edges and use those constraints to describe routes precisely."
    ),
    plannedGraphTheoryLesson(
      "formal.mathematics.discrete.graph-theory.connectivity-components",
      "Connectivity & Components",
      "/formal-science/mathematics/discrete/graph-theory/connectivity-components",
      "Decide which vertices can reach one another and identify the separate components of a graph."
    ),
    plannedGraphTheoryLesson(
      "formal.mathematics.discrete.graph-theory.trees-spanning",
      "Trees & Spanning Structure",
      "/formal-science/mathematics/discrete/graph-theory/trees-spanning",
      "Study connected graphs without cycles and choose spanning trees that retain every vertex with fewer edges."
    ),
    plannedGraphTheoryLesson(
      "formal.mathematics.discrete.graph-theory.directed-weighted",
      "Directed & Weighted Graphs",
      "/formal-science/mathematics/discrete/graph-theory/directed-weighted",
      "Add one-way relations and edge costs so graphs can model flow, distance, time, capacity, and preference."
    ),
    plannedGraphTheoryLesson(
      "formal.mathematics.discrete.graph-theory.coloring-planarity-networks",
      "Coloring, Planarity & Networks",
      "/formal-science/mathematics/discrete/graph-theory/coloring-planarity-networks",
      "Use color and layout constraints to reason about conflicts, crossings, maps, schedules, and large network models."
    ),
  ],
};

const COMBINATORICS_CURRICULUM: CurriculumNode = {
  id: "formal.mathematics.discrete.combinatorics",
  label: "Combinatorics",
  href: "/formal-science/mathematics/discrete/combinatorics",
  description:
    "Count and compare finite arrangements, selections, distributions, and possibilities without listing every case.",
  domainId: "formal",
  status: "active",
  pageKind: "unit",
  children: [
    plannedCombinatoricsLesson(
      "formal.mathematics.discrete.combinatorics.sum-product",
      "Sum & Product Rules",
      "/formal-science/mathematics/discrete/combinatorics/sum-product",
      "Add counts across disjoint alternatives and multiply counts across successive independent choices."
    ),
    plannedCombinatoricsLesson(
      "formal.mathematics.discrete.combinatorics.permutations",
      "Permutations & Symmetry",
      "/formal-science/mathematics/discrete/combinatorics/permutations",
      "Count ordered arrangements, then use symmetry to recognize when several orders represent one outcome."
    ),
    plannedCombinatoricsLesson(
      "formal.mathematics.discrete.combinatorics.combinations",
      "Combinations & Binomial Coefficients",
      "/formal-science/mathematics/discrete/combinatorics/combinations",
      "Count unordered selections and connect those counts to Pascal's triangle and binomial expansion."
    ),
    plannedCombinatoricsLesson(
      "formal.mathematics.discrete.combinatorics.distribution",
      "Distribution & Occupancy",
      "/formal-science/mathematics/discrete/combinatorics/distribution",
      "Count ways to place objects into containers while tracking repetition, capacity, and whether objects or containers are distinct."
    ),
    plannedCombinatoricsLesson(
      "formal.mathematics.discrete.combinatorics.inclusion-exclusion",
      "Inclusion–Exclusion",
      "/formal-science/mathematics/discrete/combinatorics/inclusion-exclusion",
      "Correct overcounting when cases overlap by subtracting intersections and restoring higher-order overlap when needed."
    ),
    plannedCombinatoricsLesson(
      "formal.mathematics.discrete.combinatorics.pigeonhole",
      "Pigeonhole Principle",
      "/formal-science/mathematics/discrete/combinatorics/pigeonhole",
      "Prove that a collision or concentration must exist when more objects are assigned to fewer containers."
    ),
  ],
};

const RECURSION_CURRICULUM: CurriculumNode = {
  id: "formal.mathematics.discrete.recursion-theory",
  label: "Recursion & Recurrence",
  href: "/formal-science/mathematics/discrete/recursion-theory",
  description:
    "Define structures and procedures through smaller cases, guarantee a reachable base case, trace pending returns, and measure the resulting work with recurrence relations.",
  domainId: "formal",
  status: "active",
  pageKind: "unit",
  children: [
    plannedRecursionLesson(
      "formal.mathematics.discrete.recursion-theory.definitions",
      "Recursive Definitions",
      "/formal-science/mathematics/discrete/recursion-theory/definitions",
      "Define sequences, functions, and structures through directly known cases and smaller instances of the same kind."
    ),
    plannedRecursionLesson(
      "formal.mathematics.discrete.recursion-theory.termination",
      "Base Cases & Termination",
      "/formal-science/mathematics/discrete/recursion-theory/termination",
      "Choose reachable base cases and prove that every recursive descent makes progress toward stopping."
    ),
    plannedRecursionLesson(
      "formal.mathematics.discrete.recursion-theory.calls-returns",
      "Calls, Returns & the Stack",
      "/formal-science/mathematics/discrete/recursion-theory/calls-returns",
      "Trace active calls, pending work, stack frames, and the reverse-order return that assembles a result."
    ),
    plannedRecursionLesson(
      "formal.mathematics.discrete.recursion-theory.recurrences",
      "Recurrence Relations",
      "/formal-science/mathematics/discrete/recursion-theory/recurrences",
      "Translate recursive growth and work into equations that relate each term or cost to earlier cases."
    ),
    plannedRecursionLesson(
      "formal.mathematics.discrete.recursion-theory.divide-conquer",
      "Divide & Conquer",
      "/formal-science/mathematics/discrete/recursion-theory/divide-conquer",
      "Split a problem into smaller subproblems, solve them recursively, and combine their results without losing work."
    ),
    plannedRecursionLesson(
      "formal.mathematics.discrete.recursion-theory.structures-induction",
      "Recursive Structures & Induction",
      "/formal-science/mathematics/discrete/recursion-theory/structures-induction",
      "Build trees, lists, and expressions recursively, then align their structure with inductive reasoning."
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
    GRAPH_THEORY_CURRICULUM,
    COMBINATORICS_CURRICULUM,
    RECURSION_CURRICULUM,
  ],
};
