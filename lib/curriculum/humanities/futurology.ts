import type { CurriculumNode } from "@/lib/curriculum/types";

function planned(id: string, label: string, href: string, description: string): CurriculumNode {
  return { id, label, href, description, domainId: "humanities", status: "placeholder", pageKind: "unit" };
}

export const FUTUROLOGY_CURRICULUM: CurriculumNode = {
  id: "humanities.futurology",
  label: "Futurology",
  href: "/humanities/futurology",
  description:
    "Study possible, plausible, probable, and preferred futures using horizon scanning, scenarios, forecasting, systems thinking, technology assessment, risk analysis, imagination, history, and explicit uncertainty rather than unsupported prophecy.",
  domainId: "humanities",
  status: "active",
  pageKind: "hub",
  children: [
    planned("humanities.futurology.methods", "Futures Methods & Epistemology", "/humanities/futurology/methods", "Study what can and cannot be known about the future, how assumptions enter forecasts, how uncertainty is represented, and how exploratory, predictive, and normative approaches differ."),
    planned("humanities.futurology.horizon-scanning", "Horizon Scanning & Weak Signals", "/humanities/futurology/horizon-scanning", "Collect emerging signals, trends, discontinuities, anomalies, policy changes, research developments, social practices, and other evidence that may matter before their significance is clear."),
    planned("humanities.futurology.scenarios", "Scenario Planning", "/humanities/futurology/scenarios", "Construct multiple internally coherent future contexts to test assumptions, expose strategic choices, and explore how uncertain drivers could interact without assigning unsupported probabilities."),
    planned("humanities.futurology.forecasting", "Forecasting & Calibration", "/humanities/futurology/forecasting", "Study base rates, reference classes, time horizons, probabilistic forecasts, scoring, calibration, updating, aggregation, and the conditions under which quantitative prediction is useful."),
    planned("humanities.futurology.technology-assessment", "Technology Assessment", "/humanities/futurology/technology-assessment", "Examine emerging technologies through capability, adoption, infrastructure, cost, regulation, social use, unintended effects, lock-in, complementary systems, and distributional consequences."),
    planned("humanities.futurology.risk-resilience", "Risk, Resilience & Existential Futures", "/humanities/futurology/risk-resilience", "Study hazards, vulnerabilities, exposure, cascading failure, resilience, precaution, recovery, tail risks, catastrophic possibilities, and how uncertainty changes decision-making."),
    planned("humanities.futurology.social-demographic", "Social & Demographic Futures", "/humanities/futurology/social-demographic", "Explore aging, migration, urbanization, family structure, education, work, inequality, institutions, identity, cultural change, and demographic transitions without treating current trends as destiny."),
    planned("humanities.futurology.environment-resources", "Environmental & Resource Futures", "/humanities/futurology/environment-resources", "Explore climate, land, water, energy, biodiversity, food systems, infrastructure, adaptation, mitigation, resource demand, and technological-social responses across alternative futures."),
    planned("humanities.futurology.governance-ethics", "Governance, Ethics & Preferred Futures", "/humanities/futurology/governance-ethics", "Study who defines desirable futures, whose interests are represented, how institutions act under long horizons, intergenerational ethics, participation, power, and how values differ from predictions."),
  ],
};
