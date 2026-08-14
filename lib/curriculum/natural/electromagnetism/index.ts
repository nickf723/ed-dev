import type { CurriculumNode } from "@/lib/curriculum/types";

function lesson(id: string, label: string, href: string, description: string): CurriculumNode {
  return {
    id,
    label,
    href,
    description,
    domainId: "natural",
    status: "active",
  };
}

export const ELECTROMAGNETISM_CURRICULUM: CurriculumNode = {
  id: "natural.physics.electromagnetism",
  label: "Electromagnetism",
  href: "/natural-science/physics/electromagnetism",
  description: "Charge, electric and magnetic fields, potential, circuits, induction, and electromagnetic radiation.",
  domainId: "natural",
  status: "active",
  children: [
    lesson(
      "natural.physics.electromagnetism.charge-fields",
      "Charge & Electric Fields",
      "/natural-science/physics/electromagnetism/charge-fields",
      "Build electric fields from charge, read field direction and strength, and connect fields to electric force.",
    ),
    lesson(
      "natural.physics.electromagnetism.potential",
      "Electric Potential",
      "/natural-science/physics/electromagnetism/electric-potential",
      "Interpret electric potential and voltage as energy-per-charge and connect equipotentials to electric fields.",
    ),
    lesson(
      "natural.physics.electromagnetism.circuits",
      "Circuits",
      "/natural-science/physics/electromagnetism/circuits",
      "Model current, voltage, resistance, power, and energy transfer in simple electric circuits.",
    ),
    lesson(
      "natural.physics.electromagnetism.magnetic-fields",
      "Magnetic Fields",
      "/natural-science/physics/electromagnetism/magnetic-fields",
      "Connect moving charge and current to magnetic fields and model magnetic force on charges and wires.",
    ),
    lesson(
      "natural.physics.electromagnetism.induction",
      "Electromagnetic Induction",
      "/natural-science/physics/electromagnetism/induction",
      "Relate changing magnetic flux to induced electric fields and emf through Faraday's law.",
    ),
    lesson(
      "natural.physics.electromagnetism.waves",
      "Electromagnetic Waves",
      "/natural-science/physics/electromagnetism/electromagnetic-waves",
      "Understand light and other electromagnetic radiation as self-propagating coupled electric and magnetic fields.",
    ),
  ],
};
