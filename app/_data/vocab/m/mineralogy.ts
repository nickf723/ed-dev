import type { VocabTerm } from "../types";

export const mineralogyVocab: VocabTerm[] = [
  {
    id: "mineralogy-mineral",
    word: "Mineral",
    definition:
      "A naturally formed solid with an ordered crystalline structure and a characteristic chemical composition.",
    domain: "Mineralogy",
    tags: ["Earth Materials", "Classification"],
    relatedTerms: [
      "mineralogy-mineral-species",
      "mineralogy-crystal-structure",
      "mineralogy-gem",
    ],
    isAdult: false,
  },
  {
    id: "mineralogy-mineral-species",
    word: "Mineral Species",
    definition:
      "A formally recognized mineral defined by a particular combination of chemical composition and crystal structure.",
    domain: "Mineralogy",
    tags: ["Classification", "Chemistry"],
    relatedTerms: ["mineralogy-mineral", "mineralogy-crystal-structure"],
    isAdult: false,
  },
  {
    id: "mineralogy-crystal-structure",
    word: "Crystal Structure",
    definition:
      "The ordered three-dimensional arrangement of atoms, ions, or molecules in a crystalline material.",
    domain: "Mineralogy",
    tags: ["Structure", "Crystallography"],
    relatedTerms: ["mineralogy-crystal-habit", "mineralogy-cleavage"],
    isAdult: false,
  },
  {
    id: "mineralogy-mohs-hardness",
    word: "Mohs Hardness",
    definition:
      "A relative scale from 1 to 10 that ranks a mineral by which reference minerals it can scratch or be scratched by.",
    domain: "Mineralogy",
    tags: ["Identification", "Physical Properties"],
    relatedTerms: ["mineralogy-cleavage", "mineralogy-fracture"],
    isAdult: false,
  },
  {
    id: "mineralogy-streak",
    word: "Streak",
    definition:
      "The color of a mineral in powdered form, commonly observed by rubbing it on an unglazed porcelain plate.",
    domain: "Mineralogy",
    tags: ["Identification", "Physical Properties"],
    relatedTerms: ["mineralogy-luster"],
    isAdult: false,
  },
  {
    id: "mineralogy-cleavage",
    word: "Cleavage",
    definition:
      "A mineral's tendency to break repeatedly along planes of weaker bonding in its crystal structure.",
    domain: "Mineralogy",
    tags: ["Identification", "Structure"],
    relatedTerms: ["mineralogy-fracture", "mineralogy-crystal-structure"],
    isAdult: false,
  },
  {
    id: "mineralogy-fracture",
    word: "Fracture",
    definition:
      "The way a mineral breaks when the break does not follow a cleavage plane.",
    domain: "Mineralogy",
    tags: ["Identification", "Physical Properties"],
    relatedTerms: ["mineralogy-cleavage"],
    isAdult: false,
  },
  {
    id: "mineralogy-luster",
    word: "Luster",
    definition:
      "The way light reflects from a mineral surface, described with terms such as metallic, vitreous, pearly, or resinous.",
    domain: "Mineralogy",
    tags: ["Identification", "Optical Properties"],
    relatedTerms: ["mineralogy-streak"],
    isAdult: false,
  },
  {
    id: "mineralogy-crystal-habit",
    word: "Crystal Habit",
    definition:
      "The characteristic external form or growth shape that a mineral crystal or aggregate commonly develops.",
    domain: "Mineralogy",
    tags: ["Crystallography", "Growth"],
    relatedTerms: ["mineralogy-crystal-structure"],
    isAdult: false,
  },
  {
    id: "mineralogy-gem",
    word: "Gem",
    definition:
      "A natural or manufactured material selected and fashioned for beauty, durability, rarity, or cultural value; many gems are minerals, but some are not.",
    domain: "Mineralogy",
    tags: ["Gemology", "Materials"],
    relatedTerms: ["mineralogy-mineral"],
    isAdult: false,
  },
];
