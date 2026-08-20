import type { CurriculumNode } from "@/lib/curriculum/types";

function branch(
  id: string,
  label: string,
  href: string,
  description: string,
): CurriculumNode {
  return {
    id,
    label,
    href,
    description,
    domainId: "formal",
    status: "placeholder",
    pageKind: "unit",
  };
}

export const DATA_SCIENCE_CURRICULUM: CurriculumNode = {
  id: "formal.data-science",
  label: "Data Science",
  href: "/formal-science/data-science",
  description:
    "Turn data into defensible descriptions, inferences, predictions, decisions, and communication through collection, wrangling, exploration, statistics, modeling, computation, evaluation, and responsible interpretation.",
  domainId: "formal",
  status: "active",
  pageKind: "hub",
  children: [
    branch(
      "formal.data-science.collection-wrangling",
      "Data Collection & Wrangling",
      "/formal-science/data-science/collection-wrangling",
      "Measurement, sampling, schemas, missingness, joins, cleaning, validation, transformation, documentation, provenance, and the preparation of analysis-ready data.",
    ),
    branch(
      "formal.data-science.exploration",
      "Exploratory Data Analysis",
      "/formal-science/data-science/exploration",
      "Distributions, summaries, relationships, anomalies, grouping, visualization, dimensionality, and the iterative process of discovering what a dataset can and cannot reveal.",
    ),
    branch(
      "formal.data-science.statistics",
      "Statistical Modeling & Inference",
      "/formal-science/data-science/statistics",
      "Probability models, estimation, uncertainty, regression, hypothesis testing, model assumptions, sampling variation, and statistical reasoning from data.",
    ),
    branch(
      "formal.data-science.machine-learning",
      "Machine Learning",
      "/formal-science/data-science/machine-learning",
      "Supervised and unsupervised learning, features, objectives, optimization, generalization, validation, clustering, trees, ensembles, neural networks, and predictive evaluation.",
    ),
    branch(
      "formal.data-science.data-engineering",
      "Data Engineering",
      "/formal-science/data-science/data-engineering",
      "Databases, storage, pipelines, batch and streaming systems, orchestration, distributed computation, reliability, data quality, and analytical infrastructure.",
    ),
    branch(
      "formal.data-science.visualization-communication",
      "Visualization & Communication",
      "/formal-science/data-science/visualization-communication",
      "Visual encoding, chart selection, uncertainty communication, dashboards, explanatory graphics, audience, annotation, narrative, and truthful presentation of quantitative evidence.",
    ),
    branch(
      "formal.data-science.causal-experiments",
      "Experiments & Causal Inference",
      "/formal-science/data-science/causal-experiments",
      "Randomized experiments, confounding, treatment effects, observational designs, matching, natural experiments, causal diagrams, identification, and the difference between prediction and causation.",
    ),
    branch(
      "formal.data-science.responsible-evaluation",
      "Responsible Data Science & Evaluation",
      "/formal-science/data-science/responsible-evaluation",
      "Measurement validity, leakage, fairness, privacy, robustness, calibration, distribution shift, reproducibility, documentation, model monitoring, and the social consequences of data-driven systems.",
    ),
  ],
};
