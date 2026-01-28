import { artsTerms } from "./arts";
import { historyTerms } from "./history";
import { GlossaryDatabase, termCategories } from "../types";

// 1. Define Generic Humanities Terms here
const genericHumanities: GlossaryDatabase = {
  "Humanism": {
    definition: "An outlook or system of thought attaching prime importance to human rather than divine or supernatural matters.",
    category: termCategories.PHILOSOPHY,
    href: "/humanities"
  },
  "Culture": {
    definition: "The ideas, customs, and social behavior of a particular people or society.",
    category: termCategories.SOCIAL_SCIENCE,
    href: "/humanities/culture"
  }
};

// 2. Export the Ontology (Generic + Children)
export const humanitiesVocabulary: GlossaryDatabase = {
  ...genericHumanities,
  ...artsTerms,
  ...historyTerms
};