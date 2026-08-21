import type { VocabTerm } from "../types";

export const agronomyVocab: VocabTerm[] = [
  {
    id: "agriculture-crop-rotation",
    word: "Crop Rotation",
    definition:
      "A planned sequence of crops or crop groups on the same land through time, designed around production, soil, pest, nutrient, labor, and market objectives.",
    domain: "Agronomy & Crop Science",
    tags: ["Sequence", "Crops"],
    relatedTerms: ["agriculture-season"],
    isAdult: false,
  },
  {
    id: "agriculture-crop-physiology",
    word: "Crop Physiology",
    definition:
      "The study of crop growth and function, including development, photosynthesis, water and nutrient relations, allocation, stress, and yield formation.",
    domain: "Agronomy & Crop Science",
    tags: ["Growth", "Function"],
    relatedTerms: ["agriculture-yield"],
    isAdult: false,
  },
];

export const soilNutrientsVocab: VocabTerm[] = [
  {
    id: "agriculture-soil-texture",
    word: "Soil Texture",
    definition:
      "The relative proportions of sand, silt, and clay in a soil sample, used with structure and other properties to interpret water, aeration, workability, and nutrient behavior.",
    domain: "Soil Science & Nutrient Management",
    tags: ["Soil", "Particles"],
    relatedTerms: ["agriculture-soil-organic-matter"],
    isAdult: false,
  },
  {
    id: "agriculture-soil-organic-matter",
    word: "Soil Organic Matter",
    definition:
      "Carbon-containing soil material derived from organisms across decomposition stages, influencing aggregation, nutrient cycling, water relations, habitat, and other functions.",
    domain: "Soil Science & Nutrient Management",
    tags: ["Soil", "Carbon"],
    relatedTerms: ["agriculture-residue"],
    isAdult: false,
  },
];

export const horticultureVocab: VocabTerm[] = [
  {
    id: "agriculture-propagation",
    word: "Plant Propagation",
    definition:
      "The production of new plants through seeds, spores, cuttings, grafting, division, tissue culture, or other sexual and asexual methods.",
    domain: "Horticulture",
    tags: ["Plants", "Reproduction"],
    relatedTerms: ["agriculture-production-system"],
    isAdult: false,
  },
  {
    id: "agriculture-postharvest-quality",
    word: "Postharvest Quality",
    definition:
      "The physical, chemical, sensory, nutritional, safety, and market characteristics of a product after harvest as shaped by handling, time, temperature, atmosphere, and damage.",
    domain: "Horticulture",
    tags: ["Quality", "Storage"],
    relatedTerms: ["agriculture-harvest"],
    isAdult: false,
  },
];

export const animalScienceVocab: VocabTerm[] = [
  {
    id: "agriculture-animal-welfare",
    word: "Animal Welfare",
    definition:
      "The physical and mental state of an animal in relation to the conditions in which it lives and dies, evaluated through species-appropriate health, behavior, comfort, and affective evidence.",
    domain: "Animal Science & Livestock Systems",
    tags: ["Animals", "Care"],
    relatedTerms: ["agriculture-management"],
    isAdult: false,
  },
  {
    id: "agriculture-grazing-system",
    word: "Grazing System",
    definition:
      "The planned relationship among grazing animals, forage, land units, timing, stocking, recovery, water, infrastructure, and management objectives.",
    domain: "Animal Science & Livestock Systems",
    tags: ["Animals", "Land"],
    relatedTerms: ["agriculture-farm-system"],
    isAdult: false,
  },
];

export const aquacultureVocab: VocabTerm[] = [
  {
    id: "agriculture-stocking-density",
    word: "Stocking Density",
    definition:
      "The number or biomass of cultured organisms per stated area or volume at a stated time, interpreted with species, life stage, water quality, system, and management.",
    domain: "Aquaculture",
    tags: ["Density", "Aquatic"],
    relatedTerms: ["agriculture-yield"],
    isAdult: false,
  },
  {
    id: "agriculture-biosecurity",
    word: "Aquaculture Biosecurity",
    definition:
      "Coordinated practices that reduce the introduction, establishment, or spread of pathogens and pests among aquatic organisms, facilities, water, equipment, and environments.",
    domain: "Aquaculture",
    tags: ["Health", "Prevention"],
    relatedTerms: ["agriculture-risk"],
    isAdult: false,
  },
];

export const forestryAgroforestryVocab: VocabTerm[] = [
  {
    id: "agriculture-silviculture",
    word: "Silviculture",
    definition:
      "The theory and practice of establishing, tending, composing, regenerating, and harvesting forest stands to meet stated ecological and human objectives.",
    domain: "Forestry & Agroforestry",
    tags: ["Forests", "Management"],
    relatedTerms: ["agriculture-stewardship"],
    isAdult: false,
  },
  {
    id: "agriculture-agroforestry",
    word: "Agroforestry",
    definition:
      "The deliberate integration of trees or shrubs with crops, livestock, or both so their spatial and temporal interactions provide combined products or services.",
    domain: "Forestry & Agroforestry",
    tags: ["Trees", "Integration"],
    relatedTerms: ["agriculture-farm-system"],
    isAdult: false,
  },
];

export const agroecologyVocab: VocabTerm[] = [
  {
    id: "agriculture-agroecosystem",
    word: "Agroecosystem",
    definition:
      "An ecosystem shaped by agricultural management, including organisms, soils, water, climate, energy, material flows, people, institutions, and surrounding landscapes.",
    domain: "Agroecology & Sustainable Agriculture",
    tags: ["Ecology", "System"],
    relatedTerms: ["agriculture-farm-system"],
    isAdult: false,
  },
  {
    id: "agriculture-integrated-pest-management",
    word: "Integrated Pest Management",
    definition:
      "A decision process that combines monitoring, thresholds, prevention, biological, cultural, physical, and when appropriate chemical tactics to manage pests while accounting for risks and context.",
    domain: "Agroecology & Sustainable Agriculture",
    tags: ["Pests", "Decision"],
    relatedTerms: ["agriculture-tradeoff"],
    isAdult: false,
  },
];

export const agricultureEngineeringVocab: VocabTerm[] = [
  {
    id: "agriculture-precision-agriculture",
    word: "Precision Agriculture",
    definition:
      "The use of positioned observations, sensing, models, variable-rate actions, automation, and records to manage spatial or temporal variability at an appropriate scale.",
    domain: "Agricultural Engineering & Technology",
    tags: ["Data", "Technology"],
    relatedTerms: ["agriculture-field"],
    isAdult: false,
  },
  {
    id: "agriculture-irrigation-efficiency",
    word: "Irrigation Efficiency",
    definition:
      "A family of ratios comparing useful water delivery, storage, or crop use with supplied water; the numerator, denominator, boundary, and time period must be stated.",
    domain: "Agricultural Engineering & Technology",
    tags: ["Water", "Ratio"],
    relatedTerms: ["agriculture-input"],
    isAdult: false,
  },
];

export const agricultureEconomicsVocab: VocabTerm[] = [
  {
    id: "agriculture-price-risk",
    word: "Price Risk",
    definition:
      "Uncertainty about future input or output prices that changes expected margins, cash flow, timing, contracting, storage, and other farm decisions.",
    domain: "Agricultural Economics & Food Systems",
    tags: ["Market", "Uncertainty"],
    relatedTerms: ["agriculture-risk"],
    isAdult: false,
  },
  {
    id: "agriculture-supply-chain",
    word: "Agricultural Supply Chain",
    definition:
      "The changing network of input, production, aggregation, storage, processing, transport, wholesale, retail, service, information, and finance relationships surrounding a product.",
    domain: "Agricultural Economics & Food Systems",
    tags: ["Network", "Market"],
    relatedTerms: ["agriculture-food-system"],
    isAdult: false,
  },
];

export const agricultureBranchVocab = [
  ...agronomyVocab,
  ...soilNutrientsVocab,
  ...horticultureVocab,
  ...animalScienceVocab,
  ...aquacultureVocab,
  ...forestryAgroforestryVocab,
  ...agroecologyVocab,
  ...agricultureEngineeringVocab,
  ...agricultureEconomicsVocab,
];
