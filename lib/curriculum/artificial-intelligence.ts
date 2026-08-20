import type { CurriculumNode } from "@/lib/curriculum/types";

function branch(
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
    domainId: "formal",
    status,
    pageKind: "unit",
  };
}

export const ARTIFICIAL_INTELLIGENCE_CURRICULUM: CurriculumNode = {
  id: "formal.computer-science.artificial-intelligence",
  label: "Artificial Intelligence",
  href: "/formal-science/computer-science/artificial-intelligence",
  description:
    "Computational methods for perception, representation, reasoning, search, learning, decision-making, and action under uncertainty.",
  domainId: "formal",
  status: "active",
  pageKind: "hub",
  children: [
    branch(
      "formal.computer-science.artificial-intelligence.search-planning",
      "Search & Planning",
      "/formal-science/computer-science/artificial-intelligence/search-planning",
      "State spaces, heuristics, adversarial search, planning, constraint satisfaction, and methods for choosing action sequences toward goals.",
    ),
    branch(
      "formal.computer-science.artificial-intelligence.knowledge-reasoning",
      "Knowledge & Reasoning",
      "/formal-science/computer-science/artificial-intelligence/knowledge-reasoning",
      "Representations of facts, relations, rules, uncertainty, beliefs, and structured knowledge that support computational inference.",
    ),
    branch(
      "formal.computer-science.artificial-intelligence.machine-learning",
      "Machine Learning",
      "/formal-science/computer-science/artificial-intelligence/machine-learning",
      "Models that improve task performance from data by fitting parameters, representations, or decision rules and evaluating generalization beyond the training examples.",
      "active",
    ),
    branch(
      "formal.computer-science.artificial-intelligence.reinforcement-learning",
      "Reinforcement Learning",
      "/formal-science/computer-science/artificial-intelligence/reinforcement-learning",
      "Sequential decision-making in which agents learn policies from rewards, delayed consequences, exploration, and interaction with an environment.",
    ),
    branch(
      "formal.computer-science.artificial-intelligence.language-perception",
      "Language & Perception",
      "/formal-science/computer-science/artificial-intelligence/language-perception",
      "Methods for interpreting and generating language, images, audio, and other high-dimensional observations, including modern learned representations and generative models.",
    ),
  ],
};
