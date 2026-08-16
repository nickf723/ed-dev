import type { CurriculumNode } from "@/lib/curriculum/types";

function node(
  id: string,
  label: string,
  href: string,
  description: string,
  status: CurriculumNode["status"] = "placeholder",
): CurriculumNode {
  return {
    id,
    label,
    href,
    description,
    domainId: "humanities",
    status,
    pageKind: "unit",
  };
}

export const PHILOSOPHY_CURRICULUM: CurriculumNode = {
  id: "humanities.philosophy",
  label: "Philosophy",
  href: "/humanities/philosophy",
  description:
    "Systematic inquiry into reality, knowledge, mind, value, action, society, art, and the reasons supporting competing answers.",
  domainId: "humanities",
  status: "active",
  pageKind: "hub",
  children: [
    node(
      "humanities.philosophy.metaphysics",
      "Metaphysics",
      "/humanities/philosophy/metaphysics",
      "What exists, what kinds of things are fundamental, and how identity, time, causation, possibility, and dependence structure reality.",
      "active",
    ),
    node(
      "humanities.philosophy.epistemology",
      "Epistemology",
      "/humanities/philosophy/epistemology",
      "Knowledge, belief, justification, evidence, testimony, skepticism, rational disagreement, and the limits of inquiry.",
    ),
    node(
      "humanities.philosophy.mind",
      "Philosophy of Mind",
      "/humanities/philosophy/mind",
      "Consciousness, perception, thought, emotion, personal identity, mental causation, embodiment, and the relation between mind and world.",
    ),
    node(
      "humanities.philosophy.ethics",
      "Ethics",
      "/humanities/philosophy/ethics",
      "Right action, character, obligation, consequence, virtue, care, flourishing, moral responsibility, and the good life.",
      "active",
    ),
    node(
      "humanities.philosophy.political",
      "Political Philosophy",
      "/humanities/philosophy/political",
      "Justice, authority, liberty, equality, rights, property, legitimacy, democracy, coercion, and how people ought to live together.",
    ),
    node(
      "humanities.philosophy.aesthetics",
      "Aesthetics",
      "/humanities/philosophy/aesthetics",
      "Art, beauty, taste, expression, interpretation, aesthetic value, artistic intention, and the nature of aesthetic experience.",
      "active",
    ),
    node(
      "humanities.philosophy.science",
      "Philosophy of Science",
      "/humanities/philosophy/science",
      "Explanation, evidence, models, causation, laws, scientific realism, theory change, measurement, and the structure of scientific knowledge.",
    ),
  ],
};
