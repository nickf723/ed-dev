export const ECONOMICS_BRANCH_IDS = [
  "social.economics.microeconomics",
  "social.economics.macroeconomics",
  "social.economics.econometrics",
  "social.economics.behavioral",
  "social.economics.international",
  "social.economics.public",
  "social.economics.development",
] as const;

export type EconomicShift = -2 | -1 | 0 | 1 | 2;

export type MarketEquilibrium = {
  quantity: number;
  price: number;
  demandIntercept: number;
  supplyIntercept: number;
};

export const BASELINE_MARKET_EQUILIBRIUM = {
  quantity: 40,
  price: 50,
} as const;

/**
 * A normalized teaching market: P = 90 + 10d - Q and
 * P = 10 - 10s + Q. The index has no currency or quantity unit.
 */
export function calculateMarketEquilibrium(
  demandShift: EconomicShift,
  supplyShift: EconomicShift
): MarketEquilibrium {
  const demandIntercept = 90 + demandShift * 10;
  const supplyIntercept = 10 - supplyShift * 10;
  const quantity = (demandIntercept - supplyIntercept) / 2;
  const price = supplyIntercept + quantity;

  return { quantity, price, demandIntercept, supplyIntercept };
}

export function interpretMarketShift(
  demandShift: EconomicShift,
  supplyShift: EconomicShift
): string {
  const equilibrium = calculateMarketEquilibrium(demandShift, supplyShift);
  const priceDelta = equilibrium.price - BASELINE_MARKET_EQUILIBRIUM.price;
  const quantityDelta =
    equilibrium.quantity - BASELINE_MARKET_EQUILIBRIUM.quantity;
  const price = direction(priceDelta);
  const quantity = direction(quantityDelta);

  if (demandShift === 0 && supplyShift === 0) {
    return "The baseline equilibrium is where the current supply and demand relationships are simultaneously satisfied.";
  }

  if (
    demandShift !== 0 &&
    supplyShift !== 0 &&
    Math.sign(demandShift) !== Math.sign(supplyShift)
  ) {
    return `Both curves moved in ways that reinforce the price effect: equilibrium price is ${price}. Their effects on quantity partly offset, leaving quantity ${quantity}.`;
  }

  if (demandShift !== 0 && supplyShift !== 0) {
    return `Demand and supply both shifted. Quantity is ${quantity}, while the price effects partly offset and leave price ${price}.`;
  }

  if (demandShift !== 0) {
    return `Only demand shifted. With supply held fixed, equilibrium moves to a ${price} price and ${quantity} quantity.`;
  }

  return `Only supply shifted. With demand held fixed, equilibrium moves to a ${price} price and ${quantity} quantity.`;
}

function direction(delta: number) {
  if (delta > 0) return "higher";
  if (delta < 0) return "lower";
  return "unchanged";
}

export function calculateExpenditureGdp({
  consumption,
  investment,
  government,
  exports,
  imports,
}: {
  consumption: number;
  investment: number;
  government: number;
  exports: number;
  imports: number;
}): number {
  return consumption + investment + government + exports - imports;
}

export const ECONOMICS_EVIDENCE_CASES = [
  {
    id: "gdp-ledger",
    label: "Balance the output ledger",
    eyebrow: "Practice 01 · exact identity",
    evidence:
      "A teaching economy records consumption 500, investment 120, government purchases 160, exports 90, and imports 110. All values use the same period and unit.",
    prompt: "What expenditure measure of gross domestic product follows?",
    visual: "ledger",
    options: [
      { id: "gdp-760", label: "500 + 120 + 160 + 90 − 110 = 760." },
      { id: "gdp-980", label: "500 + 120 + 160 + 90 + 110 = 980." },
      {
        id: "gdp-670",
        label: "500 + 120 + 160 − 110 = 670 because exports are excluded.",
      },
    ],
    correctOptionId: "gdp-760",
    success:
      "Correct. The expenditure identity is C + I + G + X − M. Imports are subtracted because their spending is already included elsewhere but their production occurred outside the domestic boundary.",
    correction:
      "Use C + I + G + X − M. Add exports because they are domestic production purchased abroad; subtract imports to keep foreign production outside domestic output.",
  },
  {
    id: "crossing-shifts",
    label: "Read two curve shifts",
    eyebrow: "Practice 02 · simultaneous change",
    evidence:
      "In the page's normalized linear model, demand shifts one step right and supply shifts one step right. The baseline equilibrium is price 50 and quantity 40.",
    prompt: "What does the shared model calculate after both shifts?",
    visual: "curves",
    options: [
      {
        id: "quantity-50-price-50",
        label: "Quantity rises to 50 while price remains 50.",
      },
      { id: "both-rise-60", label: "Price and quantity both rise to 60." },
      {
        id: "forecast",
        label:
          "The model proves every real market will reach price 50 and quantity 50.",
      },
    ],
    correctOptionId: "quantity-50-price-50",
    success:
      "Exactly. Both rightward shifts raise quantity in this symmetric teaching case, while their price effects offset. The result belongs to this model—not every real market.",
    correction:
      "Calculate the new intersection from both relationships. Then keep the inference inside the model boundary: it is a comparative-static result, not a universal forecast.",
  },
  {
    id: "price-index",
    label: "Separate one price from inflation",
    eyebrow: "Practice 03 · measurement",
    evidence:
      "The price of gasoline rises 18% in one month. No representative basket, expenditure weights, or prices for other goods and services are supplied.",
    prompt: "What can the observation establish about inflation?",
    visual: "basket",
    options: [
      {
        id: "one-price-insufficient",
        label:
          "It establishes a gasoline-price increase; a broad price measure is needed to infer the change in the overall price level.",
      },
      {
        id: "inflation-18",
        label: "It proves the economy's inflation rate is exactly 18%.",
      },
      {
        id: "no-inflation",
        label:
          "It proves inflation is zero because only one price is reported.",
      },
    ],
    correctOptionId: "one-price-insufficient",
    success:
      "Right. Inflation concerns change in an overall price level. A price index combines many items with an explicit population, basket, weighting, and time boundary.",
    correction:
      "Do not promote one item into an overall index. The gasoline observation may contribute to a measured basket, but it cannot determine the full price-level change by itself.",
  },
  {
    id: "causal-policy",
    label: "Refuse causal overreach",
    eyebrow: "Practice 04 · econometric design",
    evidence:
      "Regions with higher minimum wages also show higher employment in a cross-sectional table. The regions differ in industry mix, growth, population, policy timing, and labor demand.",
    prompt: "Which conclusion is defensible from this comparison alone?",
    visual: "comparison",
    options: [
      {
        id: "association-needs-design",
        label:
          "The table shows an association worth investigating; a credible comparison strategy is needed to estimate a causal effect.",
      },
      {
        id: "wage-caused-employment",
        label:
          "Higher minimum wages caused the higher employment in every region.",
      },
      {
        id: "employment-caused-wage",
        label:
          "Higher employment definitively caused every wage policy change.",
      },
    ],
    correctOptionId: "association-needs-design",
    success:
      "Correct. The table describes co-variation. Causal estimation needs a design that addresses timing, selection, comparison groups, confounding, measurement, and uncertainty.",
    correction:
      "An observed association does not identify direction or isolate alternative explanations. Ask what comparison could approximate the missing counterfactual.",
  },
] as const;

export type EconomicsEvidenceCaseId =
  (typeof ECONOMICS_EVIDENCE_CASES)[number]["id"];

export function isEconomicsEvidenceAnswerCorrect(
  caseId: string,
  optionId: string
): boolean {
  const evidenceCase = ECONOMICS_EVIDENCE_CASES.find(
    (item) => item.id === caseId
  );
  return evidenceCase?.correctOptionId === optionId;
}
