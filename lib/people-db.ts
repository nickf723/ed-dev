// lib/people-db.ts

export type PersonEntry = {
  id: string;
  name: string;
  dates: string; // "1643–1727"
  role: string;  // "Physicist, Mathematician"
  zone: "Formal" | "Natural" | "Social" | "Humanities";
  image?: string; // URL (or use WikiPortal to fetch)
  bio: string;
  // RELATIONS
  axioms?: string[];    // IDs from axiom-db
  events?: string[];    // IDs from chronicle-db
  rivals?: string[];    // Other Person IDs
};

export const PANTHEON: PersonEntry[] = [
  {
    id: "newton",
    name: "Isaac Newton",
    dates: "1643–1727",
    role: "Physicist & Mathematician",
    zone: "Natural",
    bio: "The giant upon whose shoulders modern science stands. He formulated the laws of motion and universal gravitation.",
    axioms: ["newton-2", "gravity"], // Links to your interactive widgets
    events: ["principia-pub"],
    rivals: ["leibniz"]
  },
  {
    id: "darwin",
    name: "Charles Darwin",
    dates: "1809–1882",
    role: "Naturalist",
    zone: "Natural",
    bio: "Proposed the theory of evolution by natural selection, fundamentally changing how we understand life.",
    events: ["origin-species"],
    axioms: ["natural-selection"]
  },
  {
    id: "plato",
    name: "Plato",
    dates: "428–348 BC",
    role: "Philosopher",
    zone: "Humanities",
    bio: "Founder of the Academy in Athens. Proposed that the visible world is a shadow of a higher, intelligible reality (Forms).",
    rivals: ["aristotle"] // The classic debate
  }
];