import { formalVocabulary } from "./glossary/formal-science/index";
import { humanitiesVocabulary } from "./glossary/humanities/index";
// import { naturalVocabulary } from "./glossary/natural-science";
// import { appliedVocabulary } from "./glossary/applied-science";

import { termCategories as cats, GlossaryDatabase, GlossaryItem } from "./glossary/types";

// Re-export types for the UI
export const termCategories = cats;
export type { GlossaryItem };
export type GlossaryTermKey = string;

// THE GLOBAL MERGE
export const glossaryTerms: GlossaryDatabase = {
  ...formalVocabulary,
  ...humanitiesVocabulary,
  // ...naturalVocabulary,
  // ...appliedVocabulary
  
  // You can still add truly global terms here if needed
  "Knowledge Graph": {
    definition: "A network of entities and their interrelationships, used to represent information.",
    category: "General",
  }
};