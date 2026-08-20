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

export const HARDWARE_ARCHITECTURE_CURRICULUM: CurriculumNode = {
  id: "formal.computer-science.hardware",
  label: "Hardware Architecture",
  href: "/formal-science/computer-science/hardware",
  description:
    "Digital logic, processor organization, memory hierarchy, instruction execution, and the physical state changes that implement computation.",
  domainId: "formal",
  status: "active",
  pageKind: "hub",
  children: [
    branch(
      "formal.computer-science.hardware.circuits",
      "Digital Logic & Circuits",
      "/formal-science/computer-science/hardware/circuits",
      "Bits, Boolean operations, combinational and sequential logic, gates, latches, registers, and the circuits that implement digital state transformation.",
      "active",
    ),
    branch(
      "formal.computer-science.hardware.architecture",
      "Processor Architecture",
      "/formal-science/computer-science/hardware/architecture",
      "Instruction sets, datapaths, control units, registers, arithmetic logic, pipelining, parallelism, and the organization of processor execution.",
    ),
    branch(
      "formal.computer-science.hardware.memory",
      "Memory Hierarchy",
      "/formal-science/computer-science/hardware/memory",
      "Registers, caches, main memory, persistent storage, locality, latency, bandwidth, capacity, and the movement of data between memory levels.",
    ),
  ],
};
