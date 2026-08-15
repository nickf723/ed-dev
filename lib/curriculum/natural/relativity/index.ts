import type { CurriculumNode } from "@/lib/curriculum/types";

function node(
  id: string,
  label: string,
  href: string,
  description: string,
  children?: readonly CurriculumNode[],
  status: CurriculumNode["status"] = "active",
): CurriculumNode {
  return { id, label, href, description, domainId: "natural", status, children };
}

export const RELATIVITY_CURRICULUM: CurriculumNode = node(
  "natural.physics.relativity",
  "Relativity",
  "/natural-science/physics/relativity",
  "The structure of spacetime, invariant physical laws, high-speed motion, gravity, and curved geometry.",
  [
    node(
      "natural.physics.relativity.special",
      "Special Relativity",
      "/natural-science/physics/relativity/special",
      "Spacetime physics for inertial observers: invariant light speed, simultaneity, Lorentz transformations, time dilation, length contraction, and relativistic energy-momentum.",
      [
        node("natural.physics.relativity.special.frames", "Frames & Postulates", "/natural-science/physics/relativity/special/frames-postulates", "Establish inertial frames and the two postulates that force classical space and time to be revised."),
        node("natural.physics.relativity.special.simultaneity", "Relativity of Simultaneity", "/natural-science/physics/relativity/special/simultaneity", "Show why spatially separated events that are simultaneous in one inertial frame need not be simultaneous in another."),
        node("natural.physics.relativity.special.interval", "Spacetime Interval", "/natural-science/physics/relativity/special/spacetime-interval", "Use invariant spacetime intervals to classify event separation and connect different observers' coordinates.", undefined, "placeholder"),
        node("natural.physics.relativity.special.time-dilation", "Time Dilation", "/natural-science/physics/relativity/special/time-dilation", "Relate proper time to coordinate time and understand moving clocks without treating time as mechanically slowed.", undefined, "placeholder"),
        node("natural.physics.relativity.special.length-contraction", "Length Contraction", "/natural-science/physics/relativity/special/length-contraction", "Connect proper length, simultaneity, and frame-dependent spatial measurement.", undefined, "placeholder"),
        node("natural.physics.relativity.special.energy-momentum", "Relativistic Energy & Momentum", "/natural-science/physics/relativity/special/energy-momentum", "Replace Newtonian momentum and kinetic energy with the relativistic energy-momentum relationship.", undefined, "placeholder"),
      ],
    ),
    node(
      "natural.physics.relativity.general",
      "General Relativity",
      "/natural-science/physics/relativity/general",
      "Gravity as spacetime geometry: equivalence, geodesics, gravitational time effects, lensing, and black holes.",
      [
        node("natural.physics.relativity.general.equivalence", "Equivalence Principle", "/natural-science/physics/relativity/general/equivalence-principle", "Connect locally uniform gravity and accelerated motion as the conceptual doorway to geometric gravity.", undefined, "placeholder"),
        node("natural.physics.relativity.general.geodesics", "Curved Spacetime & Geodesics", "/natural-science/physics/relativity/general/geodesics", "Interpret free fall as inertial motion along geodesics of curved spacetime.", undefined, "placeholder"),
        node("natural.physics.relativity.general.time", "Gravitational Time Dilation", "/natural-science/physics/relativity/general/gravitational-time-dilation", "Understand why clocks at different gravitational potentials accumulate different proper times.", undefined, "placeholder"),
        node("natural.physics.relativity.general.black-holes", "Black Holes & Lensing", "/natural-science/physics/relativity/general/black-holes-lensing", "Explore event horizons, photon paths, gravitational lensing, and strong-field spacetime geometry.", undefined, "placeholder"),
      ],
    ),
  ],
);
