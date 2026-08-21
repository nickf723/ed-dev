import type { VocabTerm } from "../types";

export const dataScienceVocab: VocabTerm[] = [
  {
    id: "ds-dataset",
    word: "Dataset",
    definition:
      "An organized collection of recorded observations, measurements, labels, and metadata assembled for a purpose.",
    domain: "Data Science",
    tags: ["Data", "Measurement"],
    relatedTerms: ["ds-observation", "ds-feature", "ds-provenance"],
    isAdult: false,
  },
  {
    id: "ds-observation",
    word: "Observation",
    definition:
      "One recorded case, event, unit, or measurement in a dataset; its meaning depends on how the data were produced.",
    domain: "Data Science",
    tags: ["Data", "Measurement"],
    relatedTerms: ["ds-dataset", "ds-sample"],
    isAdult: false,
  },
  {
    id: "ds-feature",
    word: "Feature",
    definition:
      "A measured or constructed input variable supplied to an analytical or predictive procedure.",
    domain: "Data Science",
    tags: ["Modeling", "Representation"],
    relatedTerms: ["ds-target", "ds-data-leakage"],
    isAdult: false,
  },
  {
    id: "ds-target",
    word: "Target",
    definition:
      "The outcome, label, quantity, or category that a supervised model is trained to estimate.",
    domain: "Data Science",
    tags: ["Modeling", "Prediction"],
    relatedTerms: ["ds-feature", "ds-data-leakage"],
    isAdult: false,
  },
  {
    id: "ds-sample",
    word: "Sample",
    definition:
      "The observed units selected from a larger population or process and used to support an analysis.",
    domain: "Data Science",
    tags: ["Statistics", "Inference"],
    relatedTerms: ["ds-observation", "ds-distribution-shift"],
    isAdult: false,
  },
  {
    id: "ds-missingness",
    word: "Missingness",
    definition:
      "The pattern and data-generating reasons by which intended values are absent from recorded observations.",
    domain: "Data Science",
    tags: ["Wrangling", "Data Quality"],
    relatedTerms: ["ds-provenance"],
    isAdult: false,
  },
  {
    id: "ds-provenance",
    word: "Data Provenance",
    definition:
      "A traceable record of where data came from and how collection, transformation, joining, and processing produced its current form.",
    domain: "Data Science",
    tags: ["Documentation", "Data Quality"],
    relatedTerms: ["ds-dataset", "ds-missingness"],
    isAdult: false,
  },
  {
    id: "ds-training-set",
    word: "Training Set",
    definition:
      "The data used to estimate a model's learned parameters or fitted structure.",
    domain: "Data Science",
    tags: ["Machine Learning", "Evaluation"],
    relatedTerms: ["ds-validation-set", "ds-test-set"],
    isAdult: false,
  },
  {
    id: "ds-validation-set",
    word: "Validation Set",
    definition:
      "Data kept outside direct fitting and used to compare model choices, tune settings, or decide when to stop development.",
    domain: "Data Science",
    tags: ["Machine Learning", "Evaluation"],
    relatedTerms: ["ds-training-set", "ds-test-set"],
    isAdult: false,
  },
  {
    id: "ds-test-set",
    word: "Test Set",
    definition:
      "Data reserved from fitting and model selection to estimate final performance on relevant unseen cases.",
    domain: "Data Science",
    tags: ["Machine Learning", "Evaluation"],
    relatedTerms: ["ds-validation-set", "ds-generalization"],
    isAdult: false,
  },
  {
    id: "ds-data-leakage",
    word: "Data Leakage",
    definition:
      "Use of information during model development that would be unavailable at prediction time or that improperly transfers evaluation evidence into training or selection.",
    domain: "Data Science",
    tags: ["Evaluation", "Data Quality"],
    relatedTerms: ["ds-feature", "ds-test-set"],
    isAdult: false,
  },
  {
    id: "ds-generalization",
    word: "Generalization",
    definition:
      "A model's ability to perform usefully on relevant cases not used to fit or select it.",
    domain: "Data Science",
    tags: ["Machine Learning", "Evaluation"],
    relatedTerms: ["ds-overfitting", "ds-test-set"],
    isAdult: false,
  },
  {
    id: "ds-overfitting",
    word: "Overfitting",
    definition:
      "Learning patterns particular to development data so closely that performance fails to carry over to relevant unseen cases.",
    domain: "Data Science",
    tags: ["Machine Learning", "Evaluation"],
    relatedTerms: ["ds-generalization", "ds-validation-set"],
    isAdult: false,
  },
  {
    id: "ds-clustering",
    word: "Clustering",
    definition:
      "An unsupervised modeling task that partitions or groups observations according to a specified representation, similarity rule, and objective.",
    domain: "Data Science",
    tags: ["Machine Learning", "Unsupervised Learning"],
    relatedTerms: ["ds-feature", "ds-k-means"],
    isAdult: false,
  },
  {
    id: "ds-k-means",
    word: "K-means",
    definition:
      "A clustering procedure that alternates nearest-centroid assignment and centroid recentering to reduce within-cluster squared Euclidean distance for a chosen number of clusters.",
    domain: "Data Science",
    tags: ["Machine Learning", "Clustering"],
    relatedTerms: ["ds-clustering"],
    isAdult: false,
  },
  {
    id: "ds-calibration",
    word: "Calibration",
    definition:
      "The agreement between predicted probabilities and observed outcome frequencies among comparable predictions.",
    domain: "Data Science",
    tags: ["Evaluation", "Prediction"],
    relatedTerms: ["ds-generalization", "ds-distribution-shift"],
    isAdult: false,
  },
  {
    id: "ds-distribution-shift",
    word: "Distribution Shift",
    definition:
      "A change between development and use in the population, environment, measurement process, inputs, outcomes, or their relationships.",
    domain: "Data Science",
    tags: ["Evaluation", "Deployment"],
    relatedTerms: ["ds-generalization", "ds-calibration"],
    isAdult: false,
  },
  {
    id: "ds-confounding",
    word: "Confounding",
    definition:
      "Mixing of an exposure–outcome relationship with the influence of other variables that affect or help explain both.",
    domain: "Data Science",
    tags: ["Causal Inference", "Evidence"],
    isAdult: false,
  },
];
