import type { CurriculumNode } from "@/lib/curriculum/types";

function branch(
  id: string,
  label: string,
  href: string,
  description: string,
  status: CurriculumNode["status"] = "placeholder",
): CurriculumNode {
  return { id, label, href, description, domainId: "formal", status, pageKind: "unit" };
}

export const SOFTWARE_CURRICULUM: CurriculumNode = {
  id: "formal.computer-science.software",
  label: "Software",
  href: "/formal-science/computer-science/software",
  description:
    "Programming abstractions, languages, runtime systems, modular design, testing, interfaces, and the organization of executable software.",
  domainId: "formal",
  status: "active",
  pageKind: "hub",
  children: [
    branch(
      "formal.computer-science.software.fundamentals",
      "Programming Fundamentals",
      "/formal-science/computer-science/software/fundamentals",
      "Values, variables, data structures, control flow, functions, state, errors, and the basic abstractions used to express computation in programs.",
      "active",
    ),
    branch(
      "formal.computer-science.software.languages",
      "Programming Languages & Compilers",
      "/formal-science/computer-science/software/languages",
      "Syntax, semantics, type systems, interpretation, compilation, intermediate representations, optimization, and the design of programming languages.",
    ),
    branch(
      "formal.computer-science.software.design",
      "Software Design & Architecture",
      "/formal-science/computer-science/software/design",
      "Modules, interfaces, abstraction boundaries, dependencies, state ownership, design principles, architecture, and techniques for managing software complexity.",
    ),
    branch(
      "formal.computer-science.software.runtime",
      "Runtime & Operating Systems",
      "/formal-science/computer-science/software/runtime",
      "Processes, threads, scheduling, virtual memory, files, system calls, runtimes, resource management, and the software layer coordinating programs with hardware.",
    ),
    branch(
      "formal.computer-science.software.distributed-web",
      "Distributed & Web Systems",
      "/formal-science/computer-science/software/distributed-web",
      "Clients, servers, protocols, APIs, concurrency, partial failure, replication, consistency, browsers, and software that spans machines and networks.",
    ),
    branch(
      "formal.computer-science.software.testing-reliability",
      "Testing & Reliability",
      "/formal-science/computer-science/software/testing-reliability",
      "Specifications, tests, debugging, static analysis, observability, fault handling, reliability, and evidence that software behaves as intended.",
    ),
  ],
};
