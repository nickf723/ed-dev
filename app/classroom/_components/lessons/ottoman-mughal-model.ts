export type ComparisonLens = "government" | "geography" | "exchange" | "change";

export type EmpireId = "ottoman" | "mughal";

export type EmpireComparisonRecord = {
  id: EmpireId;
  name: string;
  capital: string;
  mapColor: string;
  evidence: Record<ComparisonLens, string>;
};

export type ClaimVerdict = "supported" | "overgeneralized" | "not-shown";

export type ComparisonClaim = {
  id: string;
  claim: string;
  verdict: ClaimVerdict;
  explanation: string;
};

export type ComparisonSummary = {
  similarity: string;
  difference: string;
};

export const COMPARISON_LENSES: readonly {
  id: ComparisonLens;
  label: string;
  question: string;
}[] = [
  {
    id: "government",
    label: "Government",
    question: "How did authority travel from the court into a large empire?",
  },
  {
    id: "geography",
    label: "Geography",
    question: "Which regions, routes, and physical settings shaped rule?",
  },
  {
    id: "exchange",
    label: "Exchange",
    question:
      "How were cities, producers, merchants, and distant markets linked?",
  },
  {
    id: "change",
    label: "Change by 1750",
    question:
      "Why is a historical footprint not the same as unchanging control?",
  },
] as const;

export const COMPARISON_EMPIRES: Record<EmpireId, EmpireComparisonRecord> = {
  ottoman: {
    id: "ottoman",
    name: "Ottoman Empire",
    capital: "Istanbul",
    mapColor: "#60a5fa",
    evidence: {
      government:
        "The sultan and imperial court stood at the center, while officials, provinces, and local arrangements carried rule across varied regions.",
      geography:
        "Its position joined southeastern Europe, Anatolia, the eastern Mediterranean, Black Sea routes, and parts of North Africa and West Asia.",
      exchange:
        "Ports, cities, overland corridors, and merchant communities connected several regional commercial systems.",
      change:
        "The empire remained extensive, but military, fiscal, provincial, and diplomatic pressures kept its power in motion rather than frozen.",
    },
  },
  mughal: {
    id: "mughal",
    name: "Mughal Empire",
    capital: "Delhi",
    mapColor: "#a78bfa",
    evidence: {
      government:
        "The emperor and court worked through ranked service, revenue administration, regional elites, and negotiated authority across a diverse population.",
      geography:
        "Its core included the fertile Indo-Gangetic plain, major inland cities, Deccan territories, and access to Indian Ocean ports.",
      exchange:
        "Agricultural revenue, textile production, urban markets, inland routes, and maritime trade linked South Asia to wider networks.",
      change:
        "After 1707, central imperial authority weakened as regional powers gained autonomy, so a broad footprint can overstate control near 1750.",
    },
  },
};

export const COMPARISON_CLAIMS: readonly ComparisonClaim[] = [
  {
    id: "shared-challenge",
    claim:
      "Both empires had to connect a central court to distant and diverse regions.",
    verdict: "supported",
    explanation:
      "The government evidence supports a genuine similarity without claiming that the institutions were identical.",
  },
  {
    id: "same-system",
    claim:
      "Because both were empires, they used the same administrative system.",
    verdict: "overgeneralized",
    explanation:
      "A shared challenge does not prove identical institutions, officials, or relationships with regional power holders.",
  },
  {
    id: "map-control",
    claim:
      "Every place inside each colored footprint experienced equal day-to-day control from the capital.",
    verdict: "not-shown",
    explanation:
      "The map supports location and broad footprint. It cannot by itself measure administrative reach or local autonomy.",
  },
  {
    id: "networked",
    claim:
      "Both empires participated in commercial networks that extended beyond one city or region.",
    verdict: "supported",
    explanation:
      "The exchange evidence names cities, producers, merchants, ports, and routes spanning multiple regions.",
  },
] as const;

export const COMPARISON_SUMMARIES: Record<ComparisonLens, ComparisonSummary> = {
  government: {
    similarity:
      "Both courts had to extend authority through officials and relationships beyond the capital.",
    difference:
      "Their administrative institutions and mid-eighteenth-century political conditions were not identical.",
  },
  geography: {
    similarity:
      "Both ruled large, internally varied land empires connected to important regional routes.",
    difference:
      "The Ottoman realm linked Mediterranean, European, African, and West Asian zones; the Mughal realm centered on South Asian plains, cities, and ocean access.",
  },
  exchange: {
    similarity:
      "Both depended on networks connecting producers, cities, merchants, and distant markets.",
    difference:
      "The routes and major commodities differed with each empire's geography and regional economy.",
  },
  change: {
    similarity:
      "Neither empire was a fixed block; authority changed across time and place.",
    difference:
      "By 1750 Mughal central authority had fragmented more sharply, while the Ottoman state remained extensive despite mounting pressures.",
  },
};

export function getComparisonEmpire(id: EmpireId) {
  return COMPARISON_EMPIRES[id];
}

export function getComparisonLens(id: ComparisonLens) {
  return (
    COMPARISON_LENSES.find((lens) => lens.id === id) ?? COMPARISON_LENSES[0]
  );
}
