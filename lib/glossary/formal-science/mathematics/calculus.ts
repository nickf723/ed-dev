import { GlossaryDatabase, termCategories } from "../../types";

export const calculusTerms: GlossaryDatabase = {
  "Derivative": {
    definition: "The instantaneous rate of change of a function with respect to one of its variables. Geometrically, the slope of the tangent line.",
    category: termCategories.MATH,
    tags: ["Differential", "Rate of Change"]
  },
  "Integral": {
    definition: "The mathematical operator that calculates the area under a curve. It is the fundamental object of accumulation.",
    category: termCategories.MATH,
    tags: ["Accumulation", "Area"]
  },
  "Limit": {
    definition: "The value that a function (or sequence) approaches as the input (or index) approaches some value.",
    category: termCategories.MATH,
    tags: ["Foundation", "Approximation"]
  },
  "Chain Rule": {
    definition: "A formula to compute the derivative of a composite function.",
    category: termCategories.MATH,
    tags: ["Technique", "Composition"]
  }
};