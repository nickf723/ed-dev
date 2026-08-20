import type { VocabTerm } from "@/app/_data/vocab/types";

export const planetaryAstronomyVocab: VocabTerm[] = [
  {
    id: "astro-planetary-exoplanet",
    word: "Exoplanet",
    definition:
      "A planet that orbits a star other than the Sun, or that remains unbound after leaving a planetary system.",
    domain: "Planetary Astronomy",
    tags: ["Planetary Systems", "Observation"],
    isAdult: false,
  },
  {
    id: "astro-planetary-orbit",
    word: "Orbit",
    definition:
      "The curved path of an object moving under gravity around another object or a shared center of mass.",
    domain: "Planetary Astronomy",
    tags: ["Orbital Mechanics", "Gravity"],
    relatedTerms: [
      "astro-planetary-orbital-period",
      "astro-planetary-semi-major-axis",
    ],
    isAdult: false,
  },
  {
    id: "astro-planetary-orbital-period",
    word: "Orbital Period",
    definition:
      "The time an orbiting body takes to complete one revolution around its host.",
    domain: "Planetary Astronomy",
    tags: ["Orbital Mechanics", "Time"],
    relatedTerms: ["astro-planetary-orbit"],
    isAdult: false,
  },
  {
    id: "astro-planetary-semi-major-axis",
    word: "Semi-Major Axis",
    definition:
      "Half the longest diameter of an ellipse; in orbital astronomy it is a standard measure of an orbit's overall size.",
    domain: "Planetary Astronomy",
    tags: ["Orbital Mechanics", "Geometry"],
    relatedTerms: ["astro-planetary-ellipse"],
    isAdult: false,
  },
  {
    id: "astro-planetary-ellipse",
    word: "Ellipse",
    definition:
      "A closed curve whose points have a constant combined distance from two focal points; a bound two-body orbit can trace this shape.",
    domain: "Planetary Astronomy",
    tags: ["Orbital Mechanics", "Geometry"],
    relatedTerms: ["astro-planetary-semi-major-axis"],
    isAdult: false,
  },
  {
    id: "astro-planetary-transit",
    word: "Transit Method",
    definition:
      "A way to detect an exoplanet by measuring the repeated dimming produced when the planet crosses in front of its host star.",
    domain: "Planetary Astronomy",
    tags: ["Exoplanet Detection", "Photometry"],
    isAdult: false,
  },
  {
    id: "astro-planetary-radial-velocity",
    word: "Radial Velocity Method",
    definition:
      "A way to infer an orbiting planet by measuring the host star's repeating motion toward and away from the observer.",
    domain: "Planetary Astronomy",
    tags: ["Exoplanet Detection", "Spectroscopy"],
    isAdult: false,
  },
  {
    id: "astro-planetary-equilibrium-temperature",
    word: "Equilibrium Temperature",
    definition:
      "An estimated planetary temperature obtained by balancing absorbed stellar energy with emitted thermal energy under stated assumptions.",
    domain: "Planetary Astronomy",
    tags: ["Planetary Climate", "Radiation"],
    isAdult: false,
  },
];
