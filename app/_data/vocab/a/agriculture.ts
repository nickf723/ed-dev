import type { VocabTerm } from "../types";

export const agricultureVocab: VocabTerm[] = [
  {
    id: "agriculture-agriculture",
    word: "Agriculture",
    definition:
      "The applied study and practice of managing biological production, land, water, labor, technology, and food or fiber systems under ecological, economic, and social constraints.",
    domain: "Agriculture",
    tags: ["Production", "Systems"],
    relatedTerms: ["agriculture-farm-system"],
    isAdult: false,
  },
  {
    id: "agriculture-farm-system",
    word: "Farm System",
    definition:
      "A managed whole in which organisms, soils, water, climate, labor, equipment, knowledge, finance, infrastructure, markets, and institutions interact.",
    domain: "Agriculture",
    tags: ["System", "Management"],
    relatedTerms: ["agriculture-management"],
    isAdult: false,
  },
  {
    id: "agriculture-management",
    word: "Agricultural Management",
    definition:
      "The selection, timing, coordination, monitoring, and revision of actions within a production system under incomplete control and uncertainty.",
    domain: "Agriculture",
    tags: ["Decision", "Practice"],
    relatedTerms: ["agriculture-risk"],
    isAdult: false,
  },
  {
    id: "agriculture-production-system",
    word: "Production System",
    definition:
      "An organized combination of organisms, resources, practices, infrastructure, labor, and objectives used to produce agricultural goods or services.",
    domain: "Agriculture",
    tags: ["Production", "Organization"],
    relatedTerms: ["agriculture-input"],
    isAdult: false,
  },
  {
    id: "agriculture-yield",
    word: "Yield",
    definition:
      "The harvested output per stated unit such as area, animal, water volume, plant, or production cycle, with commodity, quality, time, and measurement method attached.",
    domain: "Agriculture",
    tags: ["Output", "Rate"],
    relatedTerms: ["agriculture-harvest"],
    isAdult: false,
  },
  {
    id: "agriculture-input",
    word: "Agricultural Input",
    definition:
      "A resource used in production, such as seed, feed, nutrients, water, energy, labor, capital, information, biological control, or machinery.",
    domain: "Agriculture",
    tags: ["Resource", "Production"],
    relatedTerms: ["agriculture-output"],
    isAdult: false,
  },
  {
    id: "agriculture-output",
    word: "Agricultural Output",
    definition:
      "A product, service, byproduct, residue, emission, or other result leaving or remaining within a managed agricultural process.",
    domain: "Agriculture",
    tags: ["Result", "Flow"],
    relatedTerms: ["agriculture-input"],
    isAdult: false,
  },
  {
    id: "agriculture-tradeoff",
    word: "Agricultural Tradeoff",
    definition:
      "A decision relationship in which improving one valued outcome can reduce, delay, risk, or increase the cost of another outcome at a stated scale and time.",
    domain: "Agriculture",
    tags: ["Decision", "Constraint"],
    relatedTerms: ["agriculture-externality"],
    isAdult: false,
  },
  {
    id: "agriculture-risk",
    word: "Agricultural Risk",
    definition:
      "Uncertainty about biological, weather, market, labor, policy, equipment, health, or other outcomes that can change the consequences of a decision.",
    domain: "Agriculture",
    tags: ["Uncertainty", "Decision"],
    relatedTerms: ["agriculture-resilience"],
    isAdult: false,
  },
  {
    id: "agriculture-resilience",
    word: "Agricultural Resilience",
    definition:
      "The capacity of a managed system to prepare for, absorb, adapt to, or recover from disturbances while retaining or deliberately transforming important functions.",
    domain: "Agriculture",
    tags: ["Disturbance", "Adaptation"],
    relatedTerms: ["agriculture-risk"],
    isAdult: false,
  },
  {
    id: "agriculture-stewardship",
    word: "Resource Stewardship",
    definition:
      "Care for soil, water, biodiversity, animals, infrastructure, knowledge, and other resources so present use accounts for long-term capacity and effects beyond the operator.",
    domain: "Agriculture",
    tags: ["Resources", "Time"],
    relatedTerms: ["agriculture-externality"],
    isAdult: false,
  },
  {
    id: "agriculture-food-system",
    word: "Food System",
    definition:
      "The connected activities, people, institutions, environments, infrastructure, and rules involved in producing, processing, distributing, acquiring, consuming, and disposing of food.",
    domain: "Agriculture",
    tags: ["Network", "Food"],
    relatedTerms: ["agriculture-farm-gate"],
    isAdult: false,
  },
  {
    id: "agriculture-externality",
    word: "Agricultural Externality",
    definition:
      "A cost or benefit from agricultural activity that affects others without being fully represented in the decision maker's market transaction.",
    domain: "Agriculture",
    tags: ["Effect", "Economics"],
    relatedTerms: ["agriculture-tradeoff"],
    isAdult: false,
  },
  {
    id: "agriculture-harvest",
    word: "Harvest",
    definition:
      "The timed removal or collection of a crop, animal product, forest product, or aquatic product at a defined maturity, quality, and destination.",
    domain: "Agriculture",
    tags: ["Timing", "Output"],
    relatedTerms: ["agriculture-yield"],
    isAdult: false,
  },
  {
    id: "agriculture-residue",
    word: "Agricultural Residue",
    definition:
      "Plant, animal, processing, or other material remaining after a production step whose form, location, handling, and transformation affect later pathways.",
    domain: "Agriculture",
    tags: ["Material", "Cycle"],
    relatedTerms: ["agriculture-output"],
    isAdult: false,
  },
  {
    id: "agriculture-season",
    word: "Production Season",
    definition:
      "A biologically and operationally meaningful interval whose weather, growth stages, work windows, pests, prices, and resource conditions shape management.",
    domain: "Agriculture",
    tags: ["Time", "Cycle"],
    relatedTerms: ["agriculture-management"],
    isAdult: false,
  },
  {
    id: "agriculture-field",
    word: "Field",
    definition:
      "A managed spatial unit whose boundaries, soils, terrain, history, organisms, water movement, and internal variability matter to agricultural evidence and action.",
    domain: "Agriculture",
    tags: ["Place", "Scale"],
    relatedTerms: ["agriculture-farm-system"],
    isAdult: false,
  },
  {
    id: "agriculture-farm-gate",
    word: "Farm Gate",
    definition:
      "The conceptual boundary between on-farm production and downstream or upstream parts of a wider supply and food system.",
    domain: "Agriculture",
    tags: ["Boundary", "Supply Chain"],
    relatedTerms: ["agriculture-food-system"],
    isAdult: false,
  },
];
