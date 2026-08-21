export const ORGANIZATION_LEVELS = [
  {
    id: "chemical",
    label: "Chemical",
    shortLabel: "Molecule",
    description:
      "Atoms and molecules provide the material and chemical interactions of life.",
    example: "collagen molecule",
  },
  {
    id: "cellular",
    label: "Cellular",
    shortLabel: "Cell",
    description:
      "A cell is the smallest independently functioning unit of a living organism.",
    example: "bone-forming osteoblast",
  },
  {
    id: "tissue",
    label: "Tissue",
    shortLabel: "Tissue",
    description:
      "Related cells and extracellular material coordinate a shared set of functions.",
    example: "osseous tissue",
  },
  {
    id: "organ",
    label: "Organ",
    shortLabel: "Organ",
    description:
      "Two or more tissue types combine into a structure with recognizable jobs.",
    example: "femur",
  },
  {
    id: "organ-system",
    label: "Organ system",
    shortLabel: "System",
    description:
      "Several organs coordinate functions that extend across regions of the body.",
    example: "skeletal system",
  },
  {
    id: "organism",
    label: "Organism",
    shortLabel: "Organism",
    description:
      "All organ systems interact to sustain one living human being.",
    example: "whole person",
  },
] as const;

export type OrganizationLevelId = (typeof ORGANIZATION_LEVELS)[number]["id"];

export const REGION_PROFILES = [
  {
    id: "head-neck",
    label: "Head & neck",
    cue: "sensation · control · airway · swallowing",
    systems: [
      "Nervous",
      "Endocrine",
      "Respiratory",
      "Digestive",
      "Musculoskeletal",
    ],
    structures: [
      "Brain",
      "eyes",
      "upper airway",
      "thyroid",
      "tongue and pharynx",
    ],
    boundary:
      "A region groups structures by location. It does not mean those structures belong to one physiological system.",
    accent: "34,211,238",
  },
  {
    id: "thorax",
    label: "Thorax",
    cue: "ventilation · circulation · protection",
    systems: [
      "Cardiovascular",
      "Respiratory",
      "Lymphatic",
      "Musculoskeletal",
      "Nervous",
    ],
    structures: ["Heart", "lungs", "great vessels", "trachea", "thoracic cage"],
    boundary:
      "The rib cage is skeletal, breathing uses muscles, gas exchange is respiratory, and transport is cardiovascular. One region hosts several coordinated systems.",
    accent: "248,113,113",
  },
  {
    id: "abdomen-pelvis",
    label: "Abdomen & pelvis",
    cue: "digestion · filtration · reproduction · load transfer",
    systems: [
      "Digestive",
      "Urinary",
      "Reproductive",
      "Endocrine",
      "Musculoskeletal",
    ],
    structures: ["Liver", "stomach", "intestines", "kidneys", "pelvic organs"],
    boundary:
      "Location helps describe anatomy, but function also depends on vessels, nerves, ducts, connective tissue, and distant regulatory organs.",
    accent: "251,191,36",
  },
  {
    id: "limbs",
    label: "Limbs",
    cue: "support · leverage · sensation · circulation",
    systems: [
      "Skeletal",
      "Muscular",
      "Nervous",
      "Cardiovascular",
      "Integumentary",
    ],
    structures: [
      "Long bones",
      "joints",
      "skeletal muscles",
      "peripheral nerves",
      "vessels",
    ],
    boundary:
      "Movement is integrated: bone transmits load, joints constrain motion, muscles generate force, nerves coordinate it, and vessels sustain the tissues.",
    accent: "167,139,250",
  },
] as const;

export type RegionProfileId = (typeof REGION_PROFILES)[number]["id"];

export const ANATOMY_EVIDENCE_CASES = [
  {
    id: "alveolus",
    eyebrow: "Fresh structure–function case",
    prompt:
      "An alveolus has a very thin exchange barrier and belongs to a branching network with enormous total surface area. What is the best physiological inference?",
    options: [
      {
        id: "diffusion",
        label:
          "Its geometry supports rapid gas diffusion between air and blood.",
      },
      {
        id: "storage",
        label:
          "Its main job is to store a large reserve of oxygen inside the wall.",
      },
      {
        id: "pumping",
        label:
          "Its thin wall generates the pressure that pumps blood through the lungs.",
      },
    ],
    correctOptionId: "diffusion",
    success:
      "Exactly. Short diffusion distance and large area support exchange; ventilation and blood flow must also keep supplying the two sides.",
    correction:
      "Use the visible structure as evidence: a thin barrier and large area favor exchange across the barrier, not storage or pumping.",
  },
  {
    id: "thoracic-motion",
    eyebrow: "Region versus system",
    prompt:
      "A painful rib injury restricts expansion of the thorax even though the lung tissue was not the first structure injured. Why can ventilation still fall?",
    options: [
      {
        id: "systems-meet",
        label:
          "Ventilation depends on skeletal geometry, joints, respiratory muscles, nerves, and lungs working across the same region.",
      },
      {
        id: "region-is-system",
        label:
          "Every structure inside the thorax is part of the respiratory system by definition.",
      },
      {
        id: "lungs-alone",
        label: "It cannot fall unless lung tissue itself is directly damaged.",
      },
    ],
    correctOptionId: "systems-meet",
    success:
      "Right. A region is where structures meet; ventilation is an integrated action rather than the output of lung tissue alone.",
    correction:
      "The thorax is a location, not one system. Breathing mechanics cross skeletal, muscular, nervous, and respiratory structures.",
  },
  {
    id: "bone-organ",
    eyebrow: "Organization scale",
    prompt:
      "Why is a femur classified as an organ rather than simply a piece of mineral material?",
    options: [
      {
        id: "several-tissues",
        label:
          "It combines several tissues—including bone tissue, marrow, vessels, nerves, and connective coverings—into coordinated functions.",
      },
      {
        id: "hardness",
        label:
          "Any structure hard enough to support weight is automatically an organ.",
      },
      {
        id: "single-cell",
        label: "It is one enormous living cell surrounded by calcium crystals.",
      },
    ],
    correctOptionId: "several-tissues",
    success:
      "Correct. An organ integrates multiple tissue types; bone's mineralized matrix is only part of the living structure.",
    correction:
      "Organ status comes from several tissues working together, not from hardness. A bone contains living cells, matrix, marrow, vessels, nerves, and coverings.",
  },
] as const;

export type AnatomyEvidenceCaseId =
  (typeof ANATOMY_EVIDENCE_CASES)[number]["id"];

export function isEvidenceAnswerCorrect(
  caseId: string,
  optionId: string
): boolean {
  const evidenceCase = ANATOMY_EVIDENCE_CASES.find(
    (item) => item.id === caseId
  );
  return evidenceCase?.correctOptionId === optionId;
}
