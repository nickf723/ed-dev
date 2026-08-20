import type { CurriculumNode } from "@/lib/curriculum/types";

function branch(
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
    domainId: "applied",
    status,
    pageKind: "unit",
  };
}

export const ENGINEERING_CURRICULUM: CurriculumNode = {
  id: "applied.engineering",
  label: "Engineering",
  href: "/applied-science/engineering",
  description:
    "Design reliable structures, machines, circuits, processes, software, and vehicles by translating requirements into models, prototypes, tests, and iterated systems.",
  domainId: "applied",
  status: "active",
  pageKind: "hub",
  children: [
    branch(
      "applied.engineering.mechanical",
      "Mechanical Engineering",
      "/applied-science/engineering/mechanical",
      "Forces, motion, energy, mechanisms, machines, thermal systems, manufacturing, controls, and the physical behavior of engineered devices.",
    ),
    branch(
      "applied.engineering.civil",
      "Civil Engineering",
      "/applied-science/engineering/civil",
      "Structures, transportation, water, geotechnical systems, construction, infrastructure, resilience, and the built systems shared by communities.",
    ),
    branch(
      "applied.engineering.electrical",
      "Electrical Engineering",
      "/applied-science/engineering/electrical",
      "Circuits, electronics, power, signals, control, communications, embedded systems, electromagnetism, and electrical information processing.",
    ),
    branch(
      "applied.engineering.software",
      "Software Engineering",
      "/applied-science/engineering/software",
      "Requirements, architecture, implementation, testing, reliability, deployment, maintenance, and coordination in large software systems.",
    ),
    branch(
      "applied.engineering.aerospace",
      "Aerospace Engineering",
      "/applied-science/engineering/aerospace",
      "Aerodynamics, propulsion, structures, stability, control, orbital systems, flight vehicles, spacecraft, and operation in demanding environments.",
    ),
    branch(
      "applied.engineering.chemical",
      "Chemical Engineering",
      "/applied-science/engineering/chemical",
      "Transport, thermodynamics, reaction engineering, separations, process design, scale-up, safety, and the controlled transformation of materials.",
    ),
  ],
};
