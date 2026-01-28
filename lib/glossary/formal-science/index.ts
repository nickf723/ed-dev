import { mathematicsVocabulary } from "./mathematics/index";
import { GlossaryDatabase, termCategories } from "../types";

// Let's assume you'd have a similar structure for CS and Logic
// import { csVocabulary } from "./computer-science";

const generalFormal: GlossaryDatabase = {
  "Logic": {
    definition: "The study of correct reasoning.",
    category: termCategories.LOGIC,
    href: "/formal-science/logic"
  }
};

export const formalVocabulary: GlossaryDatabase = {
  ...generalFormal,
  ...mathematicsVocabulary,
  // ...csVocabulary
};