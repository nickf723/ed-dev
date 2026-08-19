import type { CurriculumNode } from "@/lib/curriculum/types";

function branch(
  id: string,
  label: string,
  href: string,
  description: string,
  status: CurriculumNode["status"] = "active",
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

export const STATISTICS_CURRICULUM: CurriculumNode = {
  id: "formal.mathematics.statistics",
  label: "Statistics",
  href: "/formal-science/mathematics/statistics",
  description:
    "The study of data, variability, uncertainty, sampling, models, estimation, and evidence-based inference.",
  domainId: "formal",
  status: "active",
  pageKind: "hub",
  children: [
    branch(
      "formal.mathematics.statistics.descriptive",
      "Descriptive Statistics",
      "/formal-science/mathematics/statistics/descriptive",
      "Summarize the center, spread, shape, and structure of observed data without extending conclusions beyond the data at hand.",
    ),
    branch(
      "formal.mathematics.statistics.probability",
      "Probability Theory",
      "/formal-science/mathematics/statistics/probability",
      "Model uncertainty mathematically through events, random variables, distributions, expectation, conditional probability, and long-run behavior.",
    ),
    branch(
      "formal.mathematics.statistics.inferential",
      "Statistical Inference",
      "/formal-science/mathematics/statistics/inferential",
      "Use samples and probability models to estimate population quantities, quantify uncertainty, test claims, and compare explanations.",
    ),
    branch(
      "formal.mathematics.statistics.bayesian",
      "Bayesian Statistics",
      "/formal-science/mathematics/statistics/bayesian",
      "Represent uncertainty with probability distributions and update beliefs about unknown quantities as evidence is observed.",
      "placeholder",
    ),
  ],
};
