import { GlossaryDatabase, termCategories } from "./types";

export const humanitiesTerms: GlossaryDatabase = {
  // --- SOCIAL SCIENCE ---
  "Microeconomics": {
    definition: "The branch of economics that studies how individual households and firms make decisions and allocate resources.",
    category: termCategories.SOCIAL_SCIENCE,
    href: "/social-science/economics/microeconomics"
  },
  "Functionalism": {
    definition: "A theory that views society as a complex system whose parts work together to promote solidarity and stability.",
    category: termCategories.SOCIAL_SCIENCE,
    href: "/social-science/sociology"
  },
  "Game Theory": {
    definition: "The study of mathematical models of strategic interaction among rational decision-makers.",
    category: termCategories.SOCIAL_SCIENCE,
    href: "/interdisciplines/game-studies/science"
  },

  // --- ARTS & CULTURE ---
  "Aesthetics": {
    definition: "A set of principles concerned with the nature and appreciation of beauty, especially in art.",
    category: termCategories.ARTS,
    href: "/humanities/philosophy/aesthetics"
  },
  "Harmony": {
    definition: "The combination of simultaneously sounded musical notes to produce chords and chord progressions having a pleasing effect.",
    category: termCategories.ARTS,
    href: "/humanities/music/harmony"
  },
  "Archetype": {
    definition: "A recurrent symbol or motif in literature, art, or mythology.",
    category: termCategories.ARTS,
    href: "/humanities/literature"
  }
};