import type { CurriculumNode } from "@/lib/curriculum/types";

function node(
  id: string,
  label: string,
  href: string,
  description: string,
  children?: readonly CurriculumNode[],
  status: CurriculumNode["status"] = "placeholder",
): CurriculumNode {
  return {
    id,
    label,
    href,
    description,
    domainId: "social",
    status,
    pageKind: children?.length ? "hub" : "unit",
    children,
  };
}

export const ECONOMICS_CURRICULUM: CurriculumNode = {
  id: "social.economics",
  label: "Economics",
  href: "/social-science/economics",
  description:
    "How scarce resources, incentives, institutions, markets, and collective choices shape production, exchange, distribution, and wellbeing.",
  domainId: "social",
  status: "active",
  pageKind: "hub",
  children: [
    node(
      "social.economics.microeconomics",
      "Microeconomics",
      "/social-science/economics/microeconomics",
      "Individual choice, incentives, markets, firms, strategic interaction, and how prices coordinate decentralized decisions.",
      [
        node(
          "social.economics.microeconomics.choice",
          "Consumer Choice",
          "/social-science/economics/microeconomics/consumer-choice",
          "Preferences, constraints, marginal reasoning, utility, and how consumers choose among alternatives.",
        ),
        node(
          "social.economics.microeconomics.supply-demand",
          "Supply, Demand & Markets",
          "/social-science/economics/microeconomics/supply-demand",
          "How willingness to buy and sell interacts through prices, quantities, equilibrium, shortages, surpluses, and shifts.",
        ),
        node(
          "social.economics.microeconomics.firms",
          "Firms & Costs",
          "/social-science/economics/microeconomics/firms-costs",
          "Production, costs, revenue, profit, productivity, and the choices firms make at the margin.",
        ),
        node(
          "social.economics.microeconomics.market-structure",
          "Market Structures",
          "/social-science/economics/microeconomics/market-structures",
          "Competition, monopoly, oligopoly, entry, pricing power, and the structure of markets.",
        ),
        node(
          "social.economics.microeconomics.game-theory",
          "Game Theory",
          "/social-science/economics/microeconomics/game-theory",
          "Strategic decisions when outcomes depend on what other agents choose.",
        ),
        node(
          "social.economics.microeconomics.market-failure",
          "Market Failure",
          "/social-science/economics/microeconomics/market-failure",
          "Externalities, public goods, information problems, market power, and other departures from efficient exchange.",
        ),
      ],
    ),
    node(
      "social.economics.macroeconomics",
      "Macroeconomics",
      "/social-science/economics/macroeconomics",
      "National output, employment, inflation, growth, money, policy, and feedback across an economy as a whole.",
      [
        node(
          "social.economics.macroeconomics.output-growth",
          "Output & Growth",
          "/social-science/economics/macroeconomics/output-growth",
          "GDP, productivity, living standards, capital accumulation, and long-run economic growth.",
        ),
        node(
          "social.economics.macroeconomics.unemployment",
          "Employment & Unemployment",
          "/social-science/economics/macroeconomics/employment",
          "Labor markets, unemployment, participation, wages, and economy-wide employment patterns.",
        ),
        node(
          "social.economics.macroeconomics.inflation",
          "Inflation",
          "/social-science/economics/macroeconomics/inflation",
          "Changes in the overall price level, purchasing power, expectations, and the measurement of inflation.",
        ),
        node(
          "social.economics.macroeconomics.money-banking",
          "Money & Banking",
          "/social-science/economics/macroeconomics/money-banking",
          "Money, credit, banks, financial intermediation, interest rates, and monetary systems.",
        ),
        node(
          "social.economics.macroeconomics.policy",
          "Fiscal & Monetary Policy",
          "/social-science/economics/macroeconomics/policy",
          "Government spending, taxes, central banking, interest rates, and stabilization policy.",
        ),
      ],
    ),
    node(
      "social.economics.econometrics",
      "Econometrics",
      "/social-science/economics/econometrics",
      "Statistical methods for estimating economic relationships, testing explanations, and separating correlation from causal effects.",
    ),
    node(
      "social.economics.behavioral",
      "Behavioral Economics",
      "/social-science/economics/behavioral",
      "How bounded attention, heuristics, social preferences, framing, and psychology shape economic decisions.",
    ),
    node(
      "social.economics.international",
      "International Economics",
      "/social-science/economics/international",
      "Trade, exchange rates, capital flows, comparative advantage, migration, and economic relationships across borders.",
    ),
    node(
      "social.economics.public",
      "Public Economics",
      "/social-science/economics/public",
      "Taxes, public spending, redistribution, public goods, regulation, and the economic role of government.",
    ),
    node(
      "social.economics.development",
      "Development Economics",
      "/social-science/economics/development",
      "Poverty, institutions, health, education, infrastructure, structural transformation, and long-run development.",
    ),
  ],
};
