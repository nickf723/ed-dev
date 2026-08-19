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
    domainId: "formal",
    status,
    pageKind: "hub",
  };
}

export const APPLIED_MATHEMATICS_CURRICULUM: CurriculumNode = {
  id: "formal.mathematics.applied",
  label: "Applied Mathematics",
  href: "/formal-science/mathematics/applied",
  description:
    "Mathematical modeling, optimization, strategic interaction, computation, uncertainty, and domain-specific methods used to study real systems and decisions.",
  domainId: "formal",
  status: "active",
  pageKind: "hub",
  children: [
    node(
      "formal.mathematics.applied.optimization",
      "Optimization & Operations Research",
      "/formal-science/mathematics/applied/optimization",
      "Choose decisions that maximize or minimize an objective while respecting constraints, tradeoffs, resources, and uncertainty.",
    ),
    node(
      "formal.mathematics.applied.game-theory",
      "Game Theory",
      "/formal-science/mathematics/applied/game-theory",
      "Model strategic situations in which each participant's outcome depends on the actions, information, and incentives of others.",
      "active",
    ),
    node(
      "formal.mathematics.applied.modeling",
      "Mathematical Modeling",
      "/formal-science/mathematics/applied/modeling",
      "Translate physical, biological, social, or engineered systems into variables, relationships, assumptions, and equations that can be analyzed or simulated.",
    ),
    node(
      "formal.mathematics.applied.numerical",
      "Numerical & Scientific Computing",
      "/formal-science/mathematics/applied/numerical",
      "Approximate solutions when exact symbolic methods are unavailable, using algorithms for roots, integration, differential equations, linear systems, and simulation.",
    ),
    node(
      "formal.mathematics.applied.financial-risk",
      "Financial & Risk Mathematics",
      "/formal-science/mathematics/applied/financial-risk",
      "Use probability, stochastic processes, optimization, and time-value models to study pricing, portfolios, uncertainty, and risk.",
    ),
    node(
      "formal.mathematics.applied.cryptography",
      "Cryptography",
      "/formal-science/mathematics/applied/cryptography",
      "Apply number theory, algebra, probability, and discrete mathematics to confidentiality, integrity, authentication, and secure communication.",
    ),
  ],
};
