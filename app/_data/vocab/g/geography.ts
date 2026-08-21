import type { VocabTerm } from "../types";

export const geographyVocab: VocabTerm[] = [
  {
    id: "geo-geography",
    word: "Geography",
    definition:
      "The study of Earth’s places, environments, people, landscapes, and the spatial relationships and changes that connect them.",
    domain: "Geography",
    tags: ["Discipline", "Spatial Reasoning"],
    isAdult: false,
  },
  {
    id: "geo-location",
    word: "Location",
    definition:
      "The position of a feature or event, described absolutely with a reference system or relatively through its connections to other places.",
    domain: "Geography",
    tags: ["Position", "Reference"],
    relatedTerms: ["geo-place", "geo-scale"],
    isAdult: false,
  },
  {
    id: "geo-spatial-distribution",
    word: "Spatial Distribution",
    definition:
      "The arrangement of a phenomenon across space, including its density, concentration, and pattern of spread.",
    domain: "Geography",
    tags: ["Pattern", "Distribution"],
    relatedTerms: ["geo-spatial-pattern", "geo-scale"],
    isAdult: false,
  },
  {
    id: "geo-spatial-pattern",
    word: "Spatial Pattern",
    definition:
      "A recognizable arrangement such as clustering, dispersion, a gradient, a corridor, a boundary, or a network.",
    domain: "Geography",
    tags: ["Pattern", "Evidence"],
    relatedTerms: ["geo-spatial-distribution", "geo-flow"],
    isAdult: false,
  },
  {
    id: "geo-scale",
    word: "Geographic Scale",
    definition:
      "The spatial extent or unit of analysis used to observe a process, from a site or neighborhood to a region or the globe.",
    domain: "Geography",
    tags: ["Analysis", "Representation"],
    relatedTerms: ["geo-region", "geo-location"],
    isAdult: false,
  },
  {
    id: "geo-place",
    word: "Place",
    definition:
      "A location understood through its material setting, environment, history, activity, meaning, and lived experience.",
    domain: "Geography",
    tags: ["Meaning", "Landscape"],
    relatedTerms: ["geo-location", "geo-region"],
    isAdult: false,
  },
  {
    id: "geo-region",
    word: "Region",
    definition:
      "An area grouped for a geographic purpose because it shares selected traits, relationships, functions, or perceptions.",
    domain: "Geography",
    tags: ["Classification", "Scale"],
    relatedTerms: ["geo-place", "geo-scale"],
    isAdult: false,
  },
  {
    id: "geo-flow",
    word: "Flow",
    definition:
      "Movement between places—such as people, goods, money, information, energy, water, or risk—through routes and networks.",
    domain: "Geography",
    tags: ["Movement", "Networks"],
    relatedTerms: ["geo-spatial-pattern"],
    isAdult: false,
  },
  {
    id: "geo-gis",
    word: "Geographic Information System (GIS)",
    definition:
      "A system for storing, relating, analyzing, and visualizing data tied to geographic locations.",
    domain: "Geography",
    tags: ["Methods", "Spatial Data"],
    relatedTerms: ["geo-scale", "geo-spatial-distribution"],
    isAdult: false,
  },
  {
    id: "geo-population-pyramid",
    word: "Population Pyramid",
    definition:
      "A paired bar chart that displays a population’s age structure, commonly with one sex on each side and younger ages at the base.",
    domain: "Geography",
    tags: ["Demography", "Data Visualization"],
    isAdult: false,
  },
];
