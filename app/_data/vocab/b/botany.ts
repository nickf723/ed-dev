import type { VocabTerm } from "@/app/_data/vocab/types";

export const botanyVocab: VocabTerm[] = [
  {
    id: "botany-stoma",
    word: "Stoma",
    definition:
      "A regulated pore in the epidermis of a leaf or other plant organ through which carbon dioxide, oxygen, and water vapor diffuse.",
    domain: "Botany",
    tags: ["Plant Physiology", "Gas Exchange"],
    isAdult: false,
  },
  {
    id: "botany-guard-cell",
    word: "Guard Cell",
    definition:
      "One of the specialized cells bordering a stoma whose changing shape helps regulate the pore's aperture.",
    domain: "Botany",
    tags: ["Plant Physiology", "Leaf Anatomy"],
    relatedTerms: ["botany-stoma"],
    isAdult: false,
  },
  {
    id: "botany-transpiration",
    word: "Transpiration",
    definition:
      "The loss of water vapor from plant surfaces, especially through stomata, coupled to water movement through the soil–plant–atmosphere pathway.",
    domain: "Botany",
    tags: ["Plant Physiology", "Water Relations"],
    relatedTerms: ["botany-stoma", "botany-xylem"],
    isAdult: false,
  },
  {
    id: "botany-xylem",
    word: "Xylem",
    definition:
      "Vascular tissue that conducts water and dissolved minerals and also contributes structural support in vascular plants.",
    domain: "Botany",
    tags: ["Plant Anatomy", "Transport"],
    isAdult: false,
  },
  {
    id: "botany-phloem",
    word: "Phloem",
    definition:
      "Living vascular tissue that transports sugars and other compounds between source and sink tissues.",
    domain: "Botany",
    tags: ["Plant Anatomy", "Transport"],
    relatedTerms: ["botany-source", "botany-sink"],
    isAdult: false,
  },
  {
    id: "botany-source",
    word: "Source",
    definition:
      "A plant tissue that exports transported compounds because it is producing or mobilizing more than it currently uses.",
    domain: "Botany",
    tags: ["Plant Physiology", "Transport"],
    relatedTerms: ["botany-sink", "botany-phloem"],
    isAdult: false,
  },
  {
    id: "botany-sink",
    word: "Sink",
    definition:
      "A plant tissue that imports transported compounds for growth, metabolism, reproduction, or storage.",
    domain: "Botany",
    tags: ["Plant Physiology", "Transport"],
    relatedTerms: ["botany-source", "botany-phloem"],
    isAdult: false,
  },
  {
    id: "botany-meristem",
    word: "Meristem",
    definition:
      "A region of actively dividing, relatively undifferentiated plant cells that produces new tissues and organs.",
    domain: "Botany",
    tags: ["Development", "Plant Anatomy"],
    isAdult: false,
  },
  {
    id: "botany-alternation-generations",
    word: "Alternation of Generations",
    definition:
      "A plant life-cycle pattern alternating multicellular haploid gametophyte and multicellular diploid sporophyte stages.",
    domain: "Botany",
    tags: ["Reproduction", "Life Cycles"],
    isAdult: false,
  },
  {
    id: "botany-herbarium",
    word: "Herbarium",
    definition:
      "An organized scientific collection of preserved plant specimens and their associated identity, place, time, and collector data.",
    domain: "Botany",
    tags: ["Collections", "Plant Systematics"],
    isAdult: false,
  },
];
