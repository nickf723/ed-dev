import type { VocabTerm } from "../types";

export const materialsScienceVocab: VocabTerm[] = [
  {
    id: "mat-microstructure",
    word: "Microstructure",
    definition:
      "The organization of phases, grains, defects, pores, interfaces, reinforcements, and other features at scales larger than individual atoms but smaller than the whole component.",
    domain: "Materials Science",
    tags: ["Structure", "Characterization"],
    relatedTerms: ["mat-phase", "mat-grain", "mat-defect"],
    isAdult: false,
  },
  {
    id: "mat-crystal-structure",
    word: "Crystal Structure",
    definition:
      "A repeating three-dimensional arrangement of atoms, ions, or molecules described by a lattice and a basis.",
    domain: "Materials Science",
    tags: ["Structure", "Crystallography"],
    relatedTerms: ["mat-amorphous", "mat-defect"],
    isAdult: false,
  },
  {
    id: "mat-amorphous",
    word: "Amorphous",
    definition:
      "Describing a solid without the long-range periodic atomic order of a crystal, although local order may remain.",
    domain: "Materials Science",
    tags: ["Structure", "Glasses"],
    relatedTerms: ["mat-crystal-structure"],
    isAdult: false,
  },
  {
    id: "mat-phase",
    word: "Phase",
    definition:
      "A region of material with a sufficiently uniform structure, composition, and state that is distinct from neighboring regions.",
    domain: "Materials Science",
    tags: ["Structure", "Thermodynamics"],
    relatedTerms: ["mat-microstructure", "mat-processing"],
    isAdult: false,
  },
  {
    id: "mat-grain",
    word: "Grain",
    definition:
      "An individual crystal within a polycrystalline material, usually distinguished from its neighbors by crystallographic orientation.",
    domain: "Materials Science",
    tags: ["Microstructure", "Crystallography"],
    relatedTerms: ["mat-grain-boundary"],
    isAdult: false,
  },
  {
    id: "mat-grain-boundary",
    word: "Grain Boundary",
    definition:
      "An interface between neighboring grains where crystallographic orientation changes.",
    domain: "Materials Science",
    tags: ["Microstructure", "Interfaces"],
    relatedTerms: ["mat-grain", "mat-corrosion"],
    isAdult: false,
  },
  {
    id: "mat-defect",
    word: "Crystal Defect",
    definition:
      "A departure from ideal periodic crystal order, including point defects, dislocations, stacking faults, and interfaces.",
    domain: "Materials Science",
    tags: ["Structure", "Crystallography"],
    relatedTerms: ["mat-dislocation", "mat-crystal-structure"],
    isAdult: false,
  },
  {
    id: "mat-dislocation",
    word: "Dislocation",
    definition:
      "A line defect in a crystal whose motion is a central mechanism of plastic deformation in many crystalline materials.",
    domain: "Materials Science",
    tags: ["Defects", "Deformation"],
    relatedTerms: ["mat-defect", "mat-ductility"],
    isAdult: false,
  },
  {
    id: "mat-processing",
    word: "Processing",
    definition:
      "The controlled thermal, mechanical, chemical, or deposition history used to create a material and its internal structure.",
    domain: "Materials Science",
    tags: ["Manufacturing", "Structure"],
    relatedTerms: ["mat-microstructure", "mat-phase"],
    isAdult: false,
  },
  {
    id: "mat-characterization",
    word: "Characterization",
    definition:
      "The use of measurements and observations to determine a material's composition, structure, properties, defects, or response.",
    domain: "Materials Science",
    tags: ["Measurement", "Evidence"],
    relatedTerms: ["mat-microstructure"],
    isAdult: false,
  },
  {
    id: "mat-stiffness",
    word: "Stiffness",
    definition:
      "Resistance to elastic deformation under load; for a material in uniaxial linear elasticity, the stress-to-strain ratio is Young's modulus.",
    domain: "Materials Science",
    tags: ["Mechanical Properties", "Elasticity"],
    relatedTerms: ["mat-strength", "mat-ductility"],
    isAdult: false,
  },
  {
    id: "mat-strength",
    word: "Strength",
    definition:
      "The stress level associated with a specified limit such as yielding, fracture, compression failure, or another defined test outcome.",
    domain: "Materials Science",
    tags: ["Mechanical Properties", "Testing"],
    relatedTerms: ["mat-stiffness", "mat-toughness"],
    isAdult: false,
  },
  {
    id: "mat-ductility",
    word: "Ductility",
    definition:
      "The capacity for plastic deformation before fracture under specified loading and test conditions.",
    domain: "Materials Science",
    tags: ["Mechanical Properties", "Deformation"],
    relatedTerms: ["mat-dislocation", "mat-fracture"],
    isAdult: false,
  },
  {
    id: "mat-toughness",
    word: "Toughness",
    definition:
      "The ability to absorb energy through deformation and resist fracture under specified conditions; it is not synonymous with stiffness or strength.",
    domain: "Materials Science",
    tags: ["Mechanical Properties", "Failure"],
    relatedTerms: ["mat-strength", "mat-fracture"],
    isAdult: false,
  },
  {
    id: "mat-fracture",
    word: "Fracture",
    definition:
      "The separation of a material through crack initiation and propagation under mechanical, thermal, chemical, or coupled driving forces.",
    domain: "Materials Science",
    tags: ["Failure", "Mechanics"],
    relatedTerms: ["mat-toughness", "mat-fatigue"],
    isAdult: false,
  },
  {
    id: "mat-fatigue",
    word: "Fatigue",
    definition:
      "Progressive damage and possible failure caused by repeated or fluctuating loading, often at stresses below a monotonic failure level.",
    domain: "Materials Science",
    tags: ["Failure", "Cyclic Loading"],
    relatedTerms: ["mat-fracture", "mat-creep"],
    isAdult: false,
  },
  {
    id: "mat-creep",
    word: "Creep",
    definition:
      "Time-dependent deformation under sustained stress, commonly important at elevated homologous temperature and over long service periods.",
    domain: "Materials Science",
    tags: ["Failure", "Time Dependence"],
    relatedTerms: ["mat-fatigue"],
    isAdult: false,
  },
  {
    id: "mat-corrosion",
    word: "Corrosion",
    definition:
      "Material degradation through chemical or electrochemical interaction with an environment.",
    domain: "Materials Science",
    tags: ["Degradation", "Environment"],
    relatedTerms: ["mat-grain-boundary"],
    isAdult: false,
  },
  {
    id: "mat-composite",
    word: "Composite",
    definition:
      "A material system combining distinct constituents or phases so their geometry and interfaces produce a designed collective response.",
    domain: "Materials Science",
    tags: ["Material Classes", "Interfaces"],
    relatedTerms: ["mat-anisotropy"],
    isAdult: false,
  },
  {
    id: "mat-anisotropy",
    word: "Anisotropy",
    definition:
      "Dependence of a material property on measurement or loading direction.",
    domain: "Materials Science",
    tags: ["Properties", "Direction"],
    relatedTerms: ["mat-composite", "mat-characterization"],
    isAdult: false,
  },
];
