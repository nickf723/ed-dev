import type { CurriculumNode } from "@/lib/curriculum/types";

function node(
  id: string,
  label: string,
  href: string,
  description: string,
  status: CurriculumNode["status"] = "placeholder",
  pageKind: CurriculumNode["pageKind"] = "unit",
  children?: readonly CurriculumNode[],
): CurriculumNode {
  return {
    id,
    label,
    href,
    description,
    domainId: "humanities",
    status,
    pageKind,
    children,
  };
}

const NORMATIVE_ETHICS: CurriculumNode = node(
  "humanities.philosophy.ethics.normative",
  "Normative Ethics",
  "/humanities/philosophy/ethics/normative-ethics",
  "Theories and arguments about what people ought to do, which reasons matter morally, what makes actions right or wrong, and what good character requires.",
  "active",
  "hub",
  [
    node(
      "humanities.philosophy.ethics.normative.reasoning",
      "Ethical Reasoning",
      "/humanities/philosophy/ethics/normative-ethics/reasoning",
      "Classify moral reasons, compare influential normative lenses, build an argument, and stress-test it from competing perspectives.",
      "active",
      "lesson",
    ),
    node(
      "humanities.philosophy.ethics.normative.consequentialism",
      "Consequentialist Ethics",
      "/humanities/philosophy/ethics/normative-ethics/consequentialism",
      "Approaches that evaluate actions, rules, or policies through the value and distribution of their consequences.",
    ),
    node(
      "humanities.philosophy.ethics.normative.deontology",
      "Deontological Ethics",
      "/humanities/philosophy/ethics/normative-ethics/deontology",
      "Approaches centered on duties, rights, permissions, prohibitions, respect for persons, and constraints on action.",
    ),
    node(
      "humanities.philosophy.ethics.normative.virtue",
      "Virtue Ethics",
      "/humanities/philosophy/ethics/normative-ethics/virtue-ethics",
      "Approaches centered on character, flourishing, habituation, virtues, vices, and practical wisdom.",
    ),
    node(
      "humanities.philosophy.ethics.normative.care",
      "Care & Relational Ethics",
      "/humanities/philosophy/ethics/normative-ethics/care-relational",
      "Approaches emphasizing relationships, dependency, care, context, vulnerability, and responsibilities that arise through connection.",
    ),
    node(
      "humanities.philosophy.ethics.normative.thought-experiments",
      "Ethical Thought Experiments",
      "/humanities/philosophy/ethics/normative-ethics/thought-experiments",
      "Structured cases used to isolate moral tensions, compare reasons, test principles, and expose where intuitions or theories come apart.",
    ),
  ],
);

const ETHICS: CurriculumNode = node(
  "humanities.philosophy.ethics",
  "Ethics",
  "/humanities/philosophy/ethics",
  "Philosophical inquiry into value, right action, character, obligation, responsibility, moral language, and how reasons for action can be justified.",
  "active",
  "hub",
  [
    node(
      "humanities.philosophy.ethics.metaethics",
      "Metaethics",
      "/humanities/philosophy/ethics/metaethics",
      "What moral claims mean, whether moral facts exist, how moral knowledge is possible, and what makes a reason genuinely normative.",
      "placeholder",
      "hub",
    ),
    NORMATIVE_ETHICS,
    node(
      "humanities.philosophy.ethics.applied",
      "Applied Ethics",
      "/humanities/philosophy/ethics/applied-ethics",
      "Ethical reasoning applied to medicine, technology, environment, war, animals, business, public policy, research, and other concrete domains.",
      "placeholder",
      "hub",
    ),
    node(
      "humanities.philosophy.ethics.responsibility",
      "Moral Responsibility & Psychology",
      "/humanities/philosophy/ethics/moral-responsibility",
      "Agency, intention, blame, praise, moral luck, emotion, motivation, weakness of will, and the psychological conditions of responsibility.",
      "placeholder",
      "hub",
    ),
  ],
);

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
    ETHICS,
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
