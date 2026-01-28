import { algebraTerms } from "./algebra";
import { calculusTerms } from "./calculus";
import { GlossaryDatabase, termCategories } from "../../types";

const generalMath: GlossaryDatabase = {
  "Proof": {
    definition: "A logical argument establishing the truth of a mathematical statement.",
    category: termCategories.MATH,
    href: "/formal-science/mathematics/foundations"
  }
};

export const mathematicsVocabulary: GlossaryDatabase = {
  ...generalMath,
  ...algebraTerms,
  ...calculusTerms
};