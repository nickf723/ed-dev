import type { VocabTerm } from "../types";

export const visualArtsVocab: VocabTerm[] = [
  {
    id: "art-medium",
    word: "Medium",
    definition:
      "The material, process, or technical means through which an artwork is made and encountered.",
    domain: "Visual Arts",
    tags: ["Material", "Process"],
    relatedTerms: ["art-form", "art-edition"],
    isAdult: false,
  },
  {
    id: "art-form",
    word: "Form",
    definition:
      "The perceptible organization of an artwork, including relationships among line, shape, color, value, texture, space, scale, rhythm, and emphasis.",
    domain: "Visual Arts",
    tags: ["Visual Analysis", "Composition"],
    relatedTerms: ["art-medium", "art-composition"],
    isAdult: false,
  },
  {
    id: "art-composition",
    word: "Composition",
    definition:
      "The arrangement and relationship of visual elements within an image, object, space, or time-based work.",
    domain: "Visual Arts",
    tags: ["Form", "Design"],
    relatedTerms: ["art-form", "art-negative-space"],
    isAdult: false,
  },
  {
    id: "art-value",
    word: "Value",
    definition: "The relative lightness or darkness of a color or tone.",
    domain: "Visual Arts",
    tags: ["Color", "Form"],
    relatedTerms: ["art-hue", "art-chiaroscuro"],
    isAdult: false,
  },
  {
    id: "art-hue",
    word: "Hue",
    definition:
      "A family of color commonly described by names such as red, orange, blue, or green and represented by an angle in many digital color models.",
    domain: "Visual Arts",
    tags: ["Color", "Digital Model"],
    relatedTerms: ["art-saturation", "art-value"],
    isAdult: false,
  },
  {
    id: "art-saturation",
    word: "Saturation",
    definition:
      "A color dimension describing intensity or distance from a neutral gray within a specified color model.",
    domain: "Visual Arts",
    tags: ["Color", "Digital Model"],
    relatedTerms: ["art-hue", "art-value"],
    isAdult: false,
  },
  {
    id: "art-negative-space",
    word: "Negative Space",
    definition:
      "The intervals and areas around, between, or within depicted or physical forms.",
    domain: "Visual Arts",
    tags: ["Composition", "Space"],
    relatedTerms: ["art-composition", "art-form"],
    isAdult: false,
  },
  {
    id: "art-visual-analysis",
    word: "Visual Analysis",
    definition:
      "Close description and interpretation grounded in inspectable features and relationships within an artwork.",
    domain: "Visual Arts",
    tags: ["Evidence", "Interpretation"],
    relatedTerms: ["art-form", "art-provenance"],
    isAdult: false,
  },
  {
    id: "art-provenance",
    word: "Provenance",
    definition:
      "The documented history of an object's ownership, custody, or movement across time.",
    domain: "Visual Arts",
    tags: ["Museum", "Evidence"],
    relatedTerms: ["art-visual-analysis"],
    isAdult: false,
  },
  {
    id: "art-edition",
    word: "Edition",
    definition:
      "A set of impressions or objects produced from the same matrix, process, or authorized design, often identified by numbering or other records.",
    domain: "Visual Arts",
    tags: ["Printmaking", "Process"],
    relatedTerms: ["art-medium"],
    isAdult: false,
  },
  {
    id: "art-chiaroscuro",
    word: "Chiaroscuro",
    definition:
      "The organization of strong light-and-dark contrasts, often used to model volume, direct attention, or create spatial drama.",
    domain: "Visual Arts",
    tags: ["Painting", "Value"],
    relatedTerms: ["art-value"],
    isAdult: false,
  },
  {
    id: "art-impasto",
    word: "Impasto",
    definition:
      "Paint applied thickly enough for raised strokes, ridges, or tool marks to remain visibly present on the surface.",
    domain: "Visual Arts",
    tags: ["Painting", "Texture"],
    relatedTerms: ["art-medium"],
    isAdult: false,
  },
  {
    id: "art-avant-garde",
    word: "Avant-garde",
    definition:
      "A historically situated label for artists, groups, or works understood as experimental or challenging established artistic conventions.",
    domain: "Visual Arts",
    tags: ["Art History", "Movements"],
    relatedTerms: ["art-provenance"],
    isAdult: false,
  },
];
