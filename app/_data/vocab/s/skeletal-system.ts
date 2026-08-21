import type { VocabTerm } from "../types";

export const skeletalSystemVocab: VocabTerm[] = [
  {
    id: "skel-axial-skeleton",
    word: "Axial Skeleton",
    definition:
      "The skull, vertebral column, and thoracic cage forming the body's central longitudinal framework.",
    domain: "Skeletal System",
    tags: ["Organization", "Protection"],
    relatedTerms: ["skel-appendicular-skeleton"],
    isAdult: false,
  },
  {
    id: "skel-appendicular-skeleton",
    word: "Appendicular Skeleton",
    definition:
      "The pectoral and pelvic girdles together with the bones of the upper and lower limbs.",
    domain: "Skeletal System",
    tags: ["Organization", "Movement"],
    relatedTerms: ["skel-axial-skeleton"],
    isAdult: false,
  },
  {
    id: "skel-cortical-bone",
    word: "Cortical Bone",
    definition:
      "Dense bone tissue forming strong outer shells and much of the shafts of long bones; also called compact bone.",
    domain: "Skeletal System",
    tags: ["Bone Tissue", "Material"],
    relatedTerms: ["skel-trabecular-bone"],
    isAdult: false,
  },
  {
    id: "skel-trabecular-bone",
    word: "Trabecular Bone",
    definition:
      "Porous bone tissue organized as an internal lattice of trabeculae; also called spongy or cancellous bone.",
    domain: "Skeletal System",
    tags: ["Bone Tissue", "Architecture"],
    relatedTerms: ["skel-cortical-bone"],
    isAdult: false,
  },
  {
    id: "skel-synovial-joint",
    word: "Synovial Joint",
    definition:
      "A freely movable joint whose articulating bones are separated by a fluid-containing joint cavity and supported by a capsule and other structures.",
    domain: "Skeletal System",
    tags: ["Joint", "Movement"],
    isAdult: false,
  },
  {
    id: "skel-bone-remodeling",
    word: "Bone Remodeling",
    definition:
      "The continuing coupled removal and formation of bone tissue that renews bone and responds to mechanical, hormonal, nutritional, and other influences.",
    domain: "Skeletal System",
    tags: ["Living Tissue", "Adaptation"],
    isAdult: false,
  },
];
