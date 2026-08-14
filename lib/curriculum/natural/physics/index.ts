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
    domainId: "natural",
    status,
    children,
  };
}

export const PHYSICS_CURRICULUM: CurriculumNode = node(
  "natural.physics",
  "Physics",
  "/natural-science/physics",
  "Matter, motion, energy, fields, spacetime, and the physical laws used to model change and interaction.",
  [
    node(
      "natural.physics.mechanics",
      "Mechanics",
      "/natural-science/physics/mechanics",
      "Motion, forces, momentum, rotation, and energy in physical systems.",
      [
        node(
          "natural.physics.mechanics.motion",
          "Motion",
          "/natural-science/physics/motion",
          "Position, displacement, velocity, acceleration, trajectories, and reference frames.",
          [
            node(
              "natural.physics.mechanics.motion.kinematics",
              "Kinematics",
              "/natural-science/physics/motion/kinematics",
              "Describe motion through position, displacement, velocity, and acceleration without yet modeling its causes.",
            ),
            node(
              "natural.physics.mechanics.motion.projectile-motion",
              "Projectile Motion",
              "/natural-science/physics/motion/projectile-motion",
              "Combine independent horizontal and vertical motion into a two-dimensional trajectory.",
              undefined,
              "placeholder",
            ),
            node(
              "natural.physics.mechanics.motion.relative-motion",
              "Relative Motion",
              "/natural-science/physics/motion/relative-motion",
              "Describe how measured motion depends on the chosen observer and reference frame.",
              undefined,
              "placeholder",
            ),
          ],
        ),
        node(
          "natural.physics.mechanics.forces",
          "Forces & Dynamics",
          "/natural-science/physics/mechanics/forces",
          "Interactions, inertia, Newton's laws, constraints, and free-body diagrams.",
          undefined,
          "placeholder",
        ),
        node(
          "natural.physics.mechanics.energy",
          "Energy & Momentum",
          "/natural-science/physics/mechanics/energy",
          "Work, energy transfer, momentum, impulse, collisions, and conservation laws.",
          undefined,
          "placeholder",
        ),
      ],
    ),
    node(
      "natural.physics.thermodynamics",
      "Thermodynamics",
      "/natural-science/physics/thermodynamics",
      "Temperature, heat, entropy, equilibrium, and the statistical direction of physical processes.",
    ),
    node(
      "natural.physics.electromagnetism",
      "Electromagnetism",
      "/natural-science/physics/electromagnetism",
      "Charge, electric and magnetic fields, circuits, induction, and electromagnetic radiation.",
    ),
    node(
      "natural.physics.waves-optics",
      "Waves & Optics",
      "/natural-science/physics/waves-optics",
      "Oscillation, waves, interference, sound, light, reflection, refraction, diffraction, and imaging.",
    ),
    node(
      "natural.physics.relativity",
      "Relativity",
      "/natural-science/physics/relativity",
      "Spacetime, invariant laws, high-speed motion, gravity, and curved geometry.",
    ),
    node(
      "natural.physics.quantum-mechanics",
      "Quantum Physics",
      "/natural-science/physics/quantum-mechanics",
      "Quantum states, amplitudes, quantization, uncertainty, measurement, and nonclassical behavior.",
    ),
    node(
      "natural.physics.atomic",
      "Atomic Physics",
      "/natural-science/physics/atomic",
      "Electron structure, spectra, transitions, energy levels, and atom-light interactions.",
    ),
    node(
      "natural.physics.nuclear",
      "Nuclear Physics",
      "/natural-science/physics/nuclear",
      "Nuclei, binding energy, radioactivity, fission, fusion, and nuclear reactions.",
    ),
  ],
);
