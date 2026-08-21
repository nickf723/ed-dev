import type { VocabTerm } from "../types";

export const economicsVocab: VocabTerm[] = [
  {
    id: "econ-scarcity",
    word: "Scarcity",
    definition:
      "The condition that available time, labor, attention, land, materials, or other resources cannot satisfy every possible use at once.",
    domain: "Economics",
    tags: ["Choice", "Constraint"],
    relatedTerms: ["econ-opportunity-cost", "econ-incentive"],
    isAdult: false,
  },
  {
    id: "econ-opportunity-cost",
    word: "Opportunity Cost",
    definition:
      "The value of the best alternative forgone when a choice commits resources to one use rather than another.",
    domain: "Economics",
    tags: ["Choice", "Tradeoff"],
    relatedTerms: ["econ-scarcity", "econ-marginal-analysis"],
    isAdult: false,
  },
  {
    id: "econ-marginal-analysis",
    word: "Marginal Analysis",
    definition:
      "Comparing the additional benefit and additional cost associated with one more unit or a small change in an action.",
    domain: "Economics",
    tags: ["Decision Making", "Change"],
    relatedTerms: ["econ-opportunity-cost"],
    isAdult: false,
  },
  {
    id: "econ-incentive",
    word: "Incentive",
    definition:
      "A feature of a choice environment that changes the expected benefits, costs, or constraints facing an economic actor.",
    domain: "Economics",
    tags: ["Behavior", "Institutions"],
    relatedTerms: ["econ-institution"],
    isAdult: false,
  },
  {
    id: "econ-institution",
    word: "Institution",
    definition:
      "A durable rule, norm, organization, or enforcement arrangement that structures economic interaction.",
    domain: "Economics",
    tags: ["Rules", "Organization"],
    relatedTerms: ["econ-incentive", "econ-market"],
    isAdult: false,
  },
  {
    id: "econ-market",
    word: "Market",
    definition:
      "An arrangement through which buyers and sellers exchange, seek exchange, or communicate offers for a good, service, resource, or claim.",
    domain: "Economics",
    tags: ["Exchange", "Coordination"],
    relatedTerms: ["econ-supply", "econ-demand", "econ-equilibrium"],
    isAdult: false,
  },
  {
    id: "econ-supply",
    word: "Supply",
    definition:
      "The relationship between possible prices and the quantities sellers are willing and able to offer, holding specified other conditions fixed.",
    domain: "Economics",
    tags: ["Markets", "Relationship"],
    relatedTerms: ["econ-demand", "econ-equilibrium"],
    isAdult: false,
  },
  {
    id: "econ-demand",
    word: "Demand",
    definition:
      "The relationship between possible prices and the quantities buyers are willing and able to purchase, holding specified other conditions fixed.",
    domain: "Economics",
    tags: ["Markets", "Relationship"],
    relatedTerms: ["econ-supply", "econ-equilibrium"],
    isAdult: false,
  },
  {
    id: "econ-equilibrium",
    word: "Equilibrium",
    definition:
      "A model state in which specified economic conditions are simultaneously satisfied; it need not be fair, efficient, stable, or socially preferred.",
    domain: "Economics",
    tags: ["Models", "Markets"],
    relatedTerms: [
      "econ-supply",
      "econ-demand",
      "econ-shortage",
      "econ-surplus",
    ],
    isAdult: false,
  },
  {
    id: "econ-shortage",
    word: "Shortage",
    definition:
      "A market condition in which quantity demanded exceeds quantity supplied at the specified price and time.",
    domain: "Economics",
    tags: ["Markets", "Disequilibrium"],
    relatedTerms: ["econ-surplus", "econ-equilibrium"],
    isAdult: false,
  },
  {
    id: "econ-surplus",
    word: "Surplus",
    definition:
      "A market condition in which quantity supplied exceeds quantity demanded at the specified price and time.",
    domain: "Economics",
    tags: ["Markets", "Disequilibrium"],
    relatedTerms: ["econ-shortage", "econ-equilibrium"],
    isAdult: false,
  },
  {
    id: "econ-elasticity",
    word: "Elasticity",
    definition:
      "A unit-free measure of responsiveness, commonly calculated as the percentage change in one variable divided by the percentage change in another.",
    domain: "Economics",
    tags: ["Measurement", "Response"],
    relatedTerms: ["econ-supply", "econ-demand"],
    isAdult: false,
  },
  {
    id: "econ-externality",
    word: "Externality",
    definition:
      "A cost or benefit from an activity that affects people outside the decision or exchange without being fully reflected in its terms.",
    domain: "Economics",
    tags: ["Market Failure", "Spillover"],
    relatedTerms: ["econ-public-good", "econ-institution"],
    isAdult: false,
  },
  {
    id: "econ-public-good",
    word: "Public Good",
    definition:
      "A good characterized by nonrival use and difficulty excluding nonpayers, creating distinctive provision and financing problems.",
    domain: "Economics",
    tags: ["Public Economics", "Market Failure"],
    relatedTerms: ["econ-externality"],
    isAdult: false,
  },
  {
    id: "econ-gdp",
    word: "Gross Domestic Product (GDP)",
    definition:
      "The market value of final goods and services produced within a country during a specified period, measured under a defined accounting framework.",
    domain: "Economics",
    tags: ["Macroeconomics", "National Accounts"],
    relatedTerms: ["econ-productivity", "econ-real-value"],
    isAdult: false,
  },
  {
    id: "econ-inflation",
    word: "Inflation",
    definition:
      "A sustained increase in an overall price level, measured with an explicit basket, population, weighting method, and time period.",
    domain: "Economics",
    tags: ["Macroeconomics", "Prices"],
    relatedTerms: ["econ-price-index", "econ-real-value"],
    isAdult: false,
  },
  {
    id: "econ-price-index",
    word: "Price Index",
    definition:
      "A measure that summarizes how the prices of a defined collection of goods and services change relative to a reference period.",
    domain: "Economics",
    tags: ["Measurement", "Prices"],
    relatedTerms: ["econ-inflation", "econ-real-value"],
    isAdult: false,
  },
  {
    id: "econ-real-value",
    word: "Real Value",
    definition:
      "A monetary measure adjusted for changes in a price level so quantities or purchasing power can be compared more meaningfully across time.",
    domain: "Economics",
    tags: ["Measurement", "Prices"],
    relatedTerms: ["econ-price-index", "econ-gdp"],
    isAdult: false,
  },
  {
    id: "econ-productivity",
    word: "Productivity",
    definition:
      "The amount of output produced per specified unit of input, such as output per hour worked.",
    domain: "Economics",
    tags: ["Production", "Growth"],
    relatedTerms: ["econ-gdp"],
    isAdult: false,
  },
  {
    id: "econ-causal-effect",
    word: "Causal Effect",
    definition:
      "The change in an outcome attributable to an intervention or exposure relative to a well-defined counterfactual comparison.",
    domain: "Economics",
    tags: ["Econometrics", "Evidence"],
    relatedTerms: ["econ-incentive"],
    isAdult: false,
  },
];
