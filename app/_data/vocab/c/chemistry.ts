import type { VocabTerm } from "../types";

export const chemistryVocab: VocabTerm[] = [
  {
    id: "chem-matter",
    word: "Matter",
    definition:
      "Anything described as having mass and occupying space, including substances, mixtures, atoms, ions, and molecular or extended structures.",
    domain: "Chemistry",
    tags: ["Foundations", "Composition"],
    relatedTerms: ["chem-element", "chem-compound"],
    isAdult: false,
  },
  {
    id: "chem-element",
    word: "Chemical Element",
    definition:
      "A class of atoms whose nuclei contain the same number of protons, identified by a unique atomic number.",
    domain: "Chemistry",
    tags: ["Elements", "Identity"],
    relatedTerms: ["chem-atom", "chem-atomic-number", "chem-isotope"],
    isAdult: false,
  },
  {
    id: "chem-atom",
    word: "Atom",
    definition:
      "The smallest unit that retains the identity of an element, consisting of a nucleus and surrounding electrons.",
    domain: "Chemistry",
    tags: ["Atomic Structure", "Matter"],
    relatedTerms: ["chem-element", "chem-ion"],
    isAdult: false,
  },
  {
    id: "chem-atomic-number",
    word: "Atomic Number",
    definition:
      "The number of protons in an atomic nucleus; it uniquely identifies the chemical element.",
    domain: "Chemistry",
    tags: ["Atomic Structure", "Periodic Table"],
    relatedTerms: ["chem-element", "chem-isotope"],
    isAdult: false,
  },
  {
    id: "chem-isotope",
    word: "Isotope",
    definition:
      "One of two or more nuclides of the same element that share a proton count but differ in neutron count and mass number.",
    domain: "Chemistry",
    tags: ["Atomic Structure", "Nuclei"],
    relatedTerms: ["chem-atomic-number"],
    isAdult: false,
  },
  {
    id: "chem-ion",
    word: "Ion",
    definition:
      "An atom or connected group of atoms with a net electric charge because its electron count does not balance its proton count.",
    domain: "Chemistry",
    tags: ["Charge", "Atomic Structure"],
    relatedTerms: ["chem-atom", "chem-chemical-bond"],
    isAdult: false,
  },
  {
    id: "chem-electron-configuration",
    word: "Electron Configuration",
    definition:
      "A notation describing how an atom's or ion's electrons occupy specified shells, subshells, and orbitals in a model.",
    domain: "Chemistry",
    tags: ["Electronic Structure", "Notation"],
    relatedTerms: ["chem-periodicity", "chem-valence-electron"],
    isAdult: false,
  },
  {
    id: "chem-periodicity",
    word: "Periodicity",
    definition:
      "The recurrence of chemical and physical trends when elements are ordered by atomic number and electronic structure.",
    domain: "Chemistry",
    tags: ["Periodic Table", "Patterns"],
    relatedTerms: ["chem-electron-configuration", "chem-atomic-number"],
    isAdult: false,
  },
  {
    id: "chem-valence-electron",
    word: "Valence Electron",
    definition:
      "An electron in an atom's outer occupied region that can participate in bonding or chemical transformation under a specified model.",
    domain: "Chemistry",
    tags: ["Electronic Structure", "Bonding"],
    relatedTerms: ["chem-electron-configuration", "chem-chemical-bond"],
    isAdult: false,
  },
  {
    id: "chem-chemical-bond",
    word: "Chemical Bond",
    definition:
      "A stabilizing interaction that connects atoms or ions within a molecular or extended chemical structure.",
    domain: "Chemistry",
    tags: ["Bonding", "Structure"],
    relatedTerms: ["chem-molecule", "chem-valence-electron"],
    isAdult: false,
  },
  {
    id: "chem-molecule",
    word: "Molecule",
    definition:
      "An electrically neutral entity containing more than one atom connected in a definite arrangement by chemical bonds.",
    domain: "Chemistry",
    tags: ["Structure", "Bonding"],
    relatedTerms: ["chem-chemical-bond", "chem-compound"],
    isAdult: false,
  },
  {
    id: "chem-compound",
    word: "Chemical Compound",
    definition:
      "A substance composed of two or more elements in a defined chemical relationship, whether molecular or extended.",
    domain: "Chemistry",
    tags: ["Composition", "Substances"],
    relatedTerms: ["chem-element", "chem-molecule"],
    isAdult: false,
  },
  {
    id: "chem-mole",
    word: "Mole",
    definition:
      "The SI amount-of-substance unit containing exactly 6.02214076 × 10²³ specified elementary entities.",
    domain: "Chemistry",
    tags: ["Measurement", "Amount"],
    relatedTerms: ["chem-stoichiometry"],
    isAdult: false,
  },
  {
    id: "chem-stoichiometry",
    word: "Stoichiometry",
    definition:
      "Quantitative relationships among reactants and products derived from a balanced chemical equation and specified amounts of substance.",
    domain: "Chemistry",
    tags: ["Reactions", "Measurement"],
    relatedTerms: ["chem-mole", "chem-chemical-equation"],
    isAdult: false,
  },
  {
    id: "chem-reactant",
    word: "Reactant",
    definition:
      "A chemical species represented as being consumed or transformed in the forward direction of a written reaction.",
    domain: "Chemistry",
    tags: ["Reactions", "Chemical Equations"],
    relatedTerms: ["chem-product", "chem-chemical-equation"],
    isAdult: false,
  },
  {
    id: "chem-product",
    word: "Product",
    definition:
      "A chemical species represented as being formed in the forward direction of a written reaction.",
    domain: "Chemistry",
    tags: ["Reactions", "Chemical Equations"],
    relatedTerms: ["chem-reactant", "chem-chemical-equation"],
    isAdult: false,
  },
  {
    id: "chem-chemical-equation",
    word: "Chemical Equation",
    definition:
      "A symbolic representation of a chemical transformation that identifies species and uses coefficients to express their stoichiometric relationship.",
    domain: "Chemistry",
    tags: ["Reactions", "Representation"],
    relatedTerms: ["chem-reactant", "chem-product", "chem-stoichiometry"],
    isAdult: false,
  },
  {
    id: "chem-catalyst",
    word: "Catalyst",
    definition:
      "A substance that changes a reaction's rate through an alternative mechanism and is regenerated overall rather than consumed stoichiometrically.",
    domain: "Chemistry",
    tags: ["Kinetics", "Mechanism"],
    relatedTerms: ["chem-activation-energy", "chem-equilibrium"],
    isAdult: false,
  },
  {
    id: "chem-activation-energy",
    word: "Activation Energy",
    definition:
      "The energy barrier associated with reaching the transition-state region along a specified reaction pathway.",
    domain: "Chemistry",
    tags: ["Kinetics", "Energy"],
    relatedTerms: ["chem-catalyst"],
    isAdult: false,
  },
  {
    id: "chem-equilibrium",
    word: "Chemical Equilibrium",
    definition:
      "A dynamic state in which forward and reverse reaction rates are equal, so macroscopic composition remains constant under fixed conditions.",
    domain: "Chemistry",
    tags: ["Equilibrium", "Reactions"],
    relatedTerms: ["chem-catalyst", "chem-chemical-equation"],
    isAdult: false,
  },
];
