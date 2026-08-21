import type { VocabTerm } from "../types";

export const stellarAstronomyVocab: VocabTerm[] = [
  {
    id: "astro-stellar-star",
    word: "Star",
    definition:
      "A self-gravitating astronomical body whose interior has, or once had, sustained nuclear fusion and whose observable properties change across its evolution.",
    domain: "Stellar Astronomy",
    tags: ["Stars", "Stellar Evolution"],
    relatedTerms: ["astro-event-horizon"],
    isAdult: false,
  },
  {
    id: "astro-event-horizon",
    word: "Event Horizon",
    definition:
      "A causal boundary around a black hole beyond which signals cannot reach a distant outside observer.",
    domain: "Stellar Astronomy",
    tags: ["Compact Objects", "Black Holes"],
    relatedTerms: ["astro-stellar-star"],
    isAdult: false,
  },
];

export const galacticAstronomyVocab: VocabTerm[] = [
  {
    id: "astro-galactic-galaxy",
    word: "Galaxy",
    definition:
      "A gravitationally bound system containing stars, stellar remnants, gas, dust, dark matter, and often a central massive black hole.",
    domain: "Galactic Astronomy",
    tags: ["Galaxies", "Structure"],
    relatedTerms: ["astro-galactic-interstellar-medium"],
    isAdult: false,
  },
  {
    id: "astro-galactic-interstellar-medium",
    word: "Interstellar Medium",
    definition:
      "The gas, dust, cosmic rays, radiation, and magnetic fields occupying the space between stars within a galaxy.",
    domain: "Galactic Astronomy",
    tags: ["Galaxies", "Matter"],
    relatedTerms: ["astro-galactic-galaxy"],
    isAdult: false,
  },
];

export const extragalacticAstronomyVocab: VocabTerm[] = [
  {
    id: "astro-extragalactic-active-galactic-nucleus",
    word: "Active Galactic Nucleus",
    definition:
      "A compact, unusually luminous galactic center powered by matter accreting onto a supermassive black hole.",
    domain: "Extragalactic Astronomy",
    tags: ["Galaxies", "Black Holes"],
    relatedTerms: ["astro-extragalactic-galaxy-cluster"],
    isAdult: false,
  },
  {
    id: "astro-extragalactic-galaxy-cluster",
    word: "Galaxy Cluster",
    definition:
      "A gravitationally bound population of galaxies embedded in hot gas and a much larger dark-matter distribution.",
    domain: "Extragalactic Astronomy",
    tags: ["Large-Scale Structure", "Galaxies"],
    relatedTerms: ["astro-extragalactic-active-galactic-nucleus"],
    isAdult: false,
  },
];

export const cosmologyVocab: VocabTerm[] = [
  {
    id: "astro-cmb",
    word: "Cosmic Microwave Background",
    definition:
      "Thermal radiation released when the early universe became transparent, now observed as a microwave background across the sky.",
    domain: "Cosmology",
    tags: ["Early Universe", "Radiation"],
    relatedTerms: ["astro-cosmology-expansion"],
    isAdult: false,
  },
  {
    id: "astro-cosmology-expansion",
    word: "Cosmic Expansion",
    definition:
      "The modeled increase of distance between sufficiently separated, unbound regions as the scale of the universe changes with cosmic time.",
    domain: "Cosmology",
    tags: ["Universe", "Cosmic History"],
    relatedTerms: ["astro-cmb", "astro-redshift"],
    isAdult: false,
  },
];

export const astronomicalMethodsVocab: VocabTerm[] = [
  {
    id: "astro-methods-observation",
    word: "Astronomical Observation",
    definition:
      "A recorded measurement of an arriving astronomical signal together with its instrument, calibration, time, position, uncertainty, and observing conditions.",
    domain: "Astronomical Methods",
    tags: ["Evidence", "Measurement"],
    relatedTerms: ["astro-physical-model"],
    isAdult: false,
  },
  {
    id: "astro-physical-model",
    word: "Physical Model",
    definition:
      "A stated set of physical relationships and assumptions used to predict or explain astronomical measurements within a defined regime.",
    domain: "Astronomical Methods",
    tags: ["Inference", "Theory"],
    relatedTerms: ["astro-methods-observation"],
    isAdult: false,
  },
];

export const astronomyBranchVocab: VocabTerm[] = [
  ...stellarAstronomyVocab,
  ...galacticAstronomyVocab,
  ...extragalacticAstronomyVocab,
  ...cosmologyVocab,
  ...astronomicalMethodsVocab,
];
