import type { CurriculumNode } from "@/lib/curriculum/types";

function node(
  id: string,
  label: string,
  href: string,
  description: string,
  children?: readonly CurriculumNode[],
): CurriculumNode {
  return {
    id,
    label,
    href,
    description,
    domainId: "formal",
    status: "active",
    children,
  };
}

export const COMPUTER_SCIENCE_CURRICULUM: CurriculumNode = node(
  "formal.computer-science",
  "Computer Science",
  "/formal-science/computer-science",
  "Algorithms, systems, software, and computation.",
  [
    node(
      "formal.computer-science.hardware",
      "Hardware Architecture",
      "/formal-science/computer-science/hardware",
      "Processors, logic gates, memory, instruction sets, and the physical machinery of computation.",
    ),
    node(
      "formal.computer-science.software",
      "Software",
      "/formal-science/computer-science/software",
      "Programming languages, source code, software systems, and the architecture of the virtual world.",
    ),
    node(
      "formal.computer-science.algorithms",
      "Algorithms & Data",
      "/formal-science/computer-science/algorithms",
      "Efficient procedures for sorting, searching, traversing graphs, and transforming data.",
      [
        node(
          "formal.computer-science.algorithms.sorting",
          "Sorting",
          "/formal-science/computer-science/algorithms/sorting",
          "Algorithms that arrange data into useful order, from simple swaps to efficient divide-and-conquer methods.",
        ),
        node(
          "formal.computer-science.algorithms.search",
          "Search",
          "/formal-science/computer-science/algorithms/search",
          "Strategies for locating values and states efficiently across ordered and unordered spaces.",
        ),
        node(
          "formal.computer-science.algorithms.graphs",
          "Graph Theory",
          "/formal-science/computer-science/algorithms/graphs",
          "Vertices, edges, traversal, paths, and network algorithms for connected structures.",
        ),
      ],
    ),
    node(
      "formal.computer-science.artificial-intelligence",
      "Artificial Intelligence",
      "/formal-science/computer-science/artificial-intelligence",
      "Symbolic reasoning, machine learning, neural networks, search, and systems that perform intelligent tasks.",
    ),
    node(
      "formal.computer-science.theory",
      "Computation Theory",
      "/formal-science/computer-science/theory",
      "Automata, Turing machines, complexity, computability, and the mathematical limits of computation.",
    ),
    node(
      "formal.computer-science.security",
      "Networks & Security",
      "/formal-science/computer-science/security-cryptography",
      "Cryptography, secure communication, network protocols, authentication, and information security.",
    ),
  ],
);
