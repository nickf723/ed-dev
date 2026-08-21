import { agricultureVocab } from "./a/agriculture";
import {
  agricultureEconomicsVocab,
  agricultureEngineeringVocab,
  agronomyVocab,
  agroecologyVocab,
  animalScienceVocab,
  aquacultureVocab,
  forestryAgroforestryVocab,
  horticultureVocab,
  soilNutrientsVocab,
} from "./a/agriculture-branches";
import type { NodeVocabularyRegistration } from "./aggregate.mjs";

export const AGRICULTURE_VOCABULARY_REGISTRATIONS = [
  { nodeId: "applied.agriculture", terms: agricultureVocab },
  { nodeId: "applied.agriculture.agronomy", terms: agronomyVocab },
  { nodeId: "applied.agriculture.soil-nutrients", terms: soilNutrientsVocab },
  { nodeId: "applied.agriculture.horticulture", terms: horticultureVocab },
  { nodeId: "applied.agriculture.animal-science", terms: animalScienceVocab },
  { nodeId: "applied.agriculture.aquaculture", terms: aquacultureVocab },
  {
    nodeId: "applied.agriculture.forestry-agroforestry",
    terms: forestryAgroforestryVocab,
  },
  { nodeId: "applied.agriculture.agroecology", terms: agroecologyVocab },
  {
    nodeId: "applied.agriculture.engineering-technology",
    terms: agricultureEngineeringVocab,
  },
  {
    nodeId: "applied.agriculture.economics-food-systems",
    terms: agricultureEconomicsVocab,
  },
] as const satisfies readonly NodeVocabularyRegistration[];
