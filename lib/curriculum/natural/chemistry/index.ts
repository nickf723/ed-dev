import type { CurriculumNode } from "@/lib/curriculum/types";

function node(
  id: string,
  label: string,
  href: string,
  description: string,
  children?: readonly CurriculumNode[],
  status: CurriculumNode["status"] = "placeholder",
): CurriculumNode {
  return {
    id,
    label,
    href,
    description,
    domainId: "natural",
    status,
    pageKind: children?.length ? "hub" : "unit",
    children,
  };
}

export const CHEMISTRY_CURRICULUM: CurriculumNode = {
  id: "natural.chemistry",
  label: "Chemistry",
  href: "/natural-science/chemistry",
  description:
    "Matter organized by composition, electronic structure, bonding, energy, reaction, equilibrium, measurement, and molecular transformation.",
  domainId: "natural",
  status: "active",
  pageKind: "hub",
  children: [
    node(
      "natural.chemistry.general",
      "General Chemistry",
      "/natural-science/chemistry/general",
      "Foundational atomic structure, periodicity, bonding, stoichiometry, reactions, energy, kinetics, equilibrium, acids and bases, and electrochemistry.",
      [
        node("natural.chemistry.general.atomic", "Atomic Structure & Periodicity", "/natural-science/chemistry/general/atomic-structure", "Atoms, isotopes, electron configurations, periodic organization, and trends in elemental properties."),
        node("natural.chemistry.general.bonding", "Bonding & Molecular Structure", "/natural-science/chemistry/general/bonding", "Ionic, covalent, and metallic bonding; molecular geometry; polarity; intermolecular forces; and structure-property relationships."),
        node("natural.chemistry.general.stoichiometry", "Stoichiometry & Reactions", "/natural-science/chemistry/general/stoichiometry", "Chemical equations, conservation, moles, limiting reactants, yields, solutions, and quantitative reaction relationships."),
        node("natural.chemistry.general.thermochemistry", "Thermochemistry", "/natural-science/chemistry/general/thermochemistry", "Energy transfer, enthalpy, calorimetry, bond energy, entropy, and the energetic direction of chemical processes."),
        node("natural.chemistry.general.kinetics-equilibrium", "Kinetics & Equilibrium", "/natural-science/chemistry/general/kinetics-equilibrium", "Reaction rates, mechanisms, activation energy, catalysts, reversible reactions, equilibrium constants, and shifts in equilibrium."),
        node("natural.chemistry.general.acids-bases", "Acids & Bases", "/natural-science/chemistry/general/acids-bases", "Acid-base models, pH, buffers, titration, equilibria, and proton-transfer chemistry."),
        node("natural.chemistry.general.electrochemistry", "Electrochemistry", "/natural-science/chemistry/general/electrochemistry", "Oxidation-reduction, electrochemical cells, potentials, batteries, electrolysis, and electron-transfer processes."),
      ],
    ),
    node(
      "natural.chemistry.organic",
      "Organic Chemistry",
      "/natural-science/chemistry/organic",
      "Carbon compounds, functional groups, stereochemistry, mechanisms, synthesis, spectroscopy, and the logic of organic reactions.",
    ),
    node(
      "natural.chemistry.inorganic",
      "Inorganic Chemistry",
      "/natural-science/chemistry/inorganic",
      "Metals, minerals, coordination compounds, solid-state structures, main-group chemistry, and compounds beyond the organic domain.",
    ),
    node(
      "natural.chemistry.physical",
      "Physical Chemistry",
      "/natural-science/chemistry/physical",
      "Thermodynamics, kinetics, statistical mechanics, spectroscopy, surfaces, and physical models connecting microscopic states to chemical behavior.",
    ),
    node(
      "natural.chemistry.analytical",
      "Analytical Chemistry",
      "/natural-science/chemistry/analytical",
      "Chemical measurement, separation, calibration, uncertainty, spectroscopy, chromatography, electroanalysis, and identifying composition from signals.",
    ),
    node(
      "natural.chemistry.biochemistry",
      "Biochemistry",
      "/natural-science/chemistry/biochemistry",
      "Chemical structures and reactions of proteins, nucleic acids, lipids, carbohydrates, metabolism, signaling, and molecular life.",
    ),
    node(
      "natural.chemistry.quantum",
      "Quantum Chemistry",
      "/natural-science/chemistry/quantum",
      "Quantum states, orbitals, electronic structure, molecular wavefunctions, approximation methods, and the quantum basis of bonding and spectroscopy.",
      undefined,
      "active",
    ),
  ],
};
