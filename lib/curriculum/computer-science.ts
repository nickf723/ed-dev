import type { CurriculumNode } from "@/lib/curriculum/types";

function node(
  id: string,
  label: string,
  href: string,
  description: string,
  children?: readonly CurriculumNode[],
  status: CurriculumNode["status"] = "active",
): CurriculumNode {
  return {
    id,
    label,
    href,
    description,
    domainId: "formal",
    status,
    children,
  };
}

export const COMPUTER_SCIENCE_CURRICULUM: CurriculumNode = {
  ...node(
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
        [
          node(
            "formal.computer-science.software.fundamentals",
            "Programming Fundamentals",
            "/formal-science/computer-science/software/fundamentals",
            "Variables, control flow, functions, and basic data structures: the building blocks of programming.",
          ),
          node(
            "formal.computer-science.software.languages",
            "Languages & Compilers",
            "/formal-science/computer-science/software/languages",
            "Syntax, semantics, compilation, and the tradeoffs between low-level and high-level programming languages.",
            undefined,
            "placeholder",
          ),
          node(
            "formal.computer-science.software.algorithms",
            "Algorithms & Data",
            "/formal-science/computer-science/software/algorithms",
            "Software-facing study of algorithmic thinking, data structures, complexity, sorting, searching, and traversal.",
            undefined,
            "placeholder",
          ),
          node(
            "formal.computer-science.software.web",
            "Web Engineering",
            "/formal-science/computer-science/software/web",
            "HTTP, browsers, frontend systems, backend services, and scalable web architecture.",
            undefined,
            "placeholder",
          ),
          node(
            "formal.computer-science.software.security",
            "Cybersecurity",
            "/formal-science/computer-science/software/security",
            "Encryption, penetration testing, secure coding, and protecting software systems from attack.",
            undefined,
            "placeholder",
          ),
          node(
            "formal.computer-science.software.architecture",
            "System Architecture",
            "/formal-science/computer-science/software/architecture",
            "Design patterns, services, containers, cloud infrastructure, and architectural tradeoffs at scale.",
            undefined,
            "placeholder",
          ),
        ],
      ),
      node(
        "formal.computer-science.algorithms",
        "Algorithms & Data",
        "/formal-science/computer-science/algorithms",
        "Procedures, representations, correctness arguments, and resource growth for transforming and exploring data.",
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
            "Strategies for locating values and states efficiently across ordered, unordered, and implicit spaces.",
            undefined,
            "placeholder",
          ),
          node(
            "formal.computer-science.algorithms.graphs",
            "Graphs & Traversal",
            "/formal-science/computer-science/algorithms/graphs",
            "Vertices, edges, traversal frontiers, paths, connectivity, and algorithms for connected structures.",
            undefined,
            "placeholder",
          ),
          node(
            "formal.computer-science.algorithms.complexity",
            "Complexity Analysis",
            "/formal-science/computer-science/algorithms/complexity",
            "Time, space, asymptotic bounds, amortized analysis, lower bounds, and the models used to count work.",
            undefined,
            "placeholder",
          ),
          node(
            "formal.computer-science.algorithms.dynamic-programming",
            "Dynamic Programming",
            "/formal-science/computer-science/algorithms/dynamic-programming",
            "Overlapping subproblems, optimal substructure, recurrences, memoization, tabulation, and solution reconstruction.",
            undefined,
            "placeholder",
          ),
          node(
            "formal.computer-science.algorithms.design-paradigms",
            "Algorithm Design Paradigms",
            "/formal-science/computer-science/algorithms/design-paradigms",
            "Greedy choice, divide-and-conquer, backtracking, randomized methods, and matching a decomposition strategy to a problem.",
            undefined,
            "placeholder",
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
  ),
  pageKind: "hub",
};
