export type CentralizationCaseId = "tokugawa" | "bourbon";
export type CentralizationLens =
  | "center"
  | "elite-control"
  | "administration"
  | "limit";

export type CentralizationCase = {
  id: CentralizationCaseId;
  name: string;
  dateLabel: string;
  center: string;
  mapColor: string;
  evidence: Record<CentralizationLens, string>;
};

export const CENTRALIZATION_LENSES: readonly {
  id: CentralizationLens;
  label: string;
  question: string;
}[] = [
  {
    id: "center",
    label: "Political center",
    question: "Where were rulers, officials, and elites drawn together?",
  },
  {
    id: "elite-control",
    label: "Elite control",
    question: "How did the regime shape the choices of powerful elites?",
  },
  {
    id: "administration",
    label: "Administrative reach",
    question: "Which people and institutions carried decisions outward?",
  },
  {
    id: "limit",
    label: "Limit",
    question: "What kept centralization from becoming total control?",
  },
] as const;

export const CENTRALIZATION_CASES: Record<
  CentralizationCaseId,
  CentralizationCase
> = {
  tokugawa: {
    id: "tokugawa",
    name: "Tokugawa Japan",
    dateLabel: "c. 1750",
    center: "Edo",
    mapColor: "#38bdf8",
    evidence: {
      center:
        "The shogun's government operated from Edo, which became the required second residence and political meeting point for domain lords.",
      "elite-control":
        "Under alternate attendance, daimyo regularly moved between their domains and Edo while maintaining residences and family ties there. The travel and residence system kept regional lords visible and invested in shogunal order.",
      administration:
        "The bakufu set broad rules and supervised strategic affairs while daimyo governments continued to administer their own domains.",
      limit:
        "The shogunate did not erase the domains. Daimyo retained local institutions and resources, so authority remained layered and negotiated.",
    },
  },
  bourbon: {
    id: "bourbon",
    name: "Bourbon France",
    dateLabel: "c. 1750",
    center: "Versailles",
    mapColor: "#a78bfa",
    evidence: {
      center:
        "The royal court and government operated at Versailles, concentrating ceremony, access, patronage, and high political life around the king.",
      "elite-control":
        "Court attendance tied many nobles to royal favor and competition for offices, honors, and access, even as noble status and regional influence continued.",
      administration:
        "Royal councils, officeholders, provincial intendants, taxation systems, and military institutions carried decisions beyond the court.",
      limit:
        "Privileges, venal offices, provincial institutions, uneven taxation, and local resistance prevented administration from becoming perfectly uniform.",
    },
  },
};

export const CENTRALIZATION_CLAIMS = [
  {
    id: "shared-center",
    claim:
      "Both governments drew powerful elites toward a political center as one way to strengthen rule.",
    verdict: "supported",
    explanation:
      "Edo and Versailles worked differently, but each made proximity to the center politically important.",
  },
  {
    id: "identical",
    claim:
      "Because both controlled elites through attendance, their institutions were identical.",
    verdict: "overgeneralized",
    explanation:
      "A useful similarity does not erase differences between alternate attendance, court culture, domains, offices, and provincial administration.",
  },
  {
    id: "absolute",
    claim:
      "Centralization gave each ruler complete and uniform control over every locality.",
    verdict: "overgeneralized",
    explanation:
      "Both cases retained layered institutions, privileges, regional power, and practical limits on central decisions.",
  },
  {
    id: "map-proof",
    claim:
      "The colored map footprints prove how effectively each government administered every place.",
    verdict: "not-shown",
    explanation:
      "The map supports location and approximate footprint. Administrative reach requires institutional evidence.",
  },
] as const;

export function getCentralizationCase(id: CentralizationCaseId) {
  return CENTRALIZATION_CASES[id];
}

export function getCentralizationLens(id: CentralizationLens) {
  return (
    CENTRALIZATION_LENSES.find((lens) => lens.id === id) ??
    CENTRALIZATION_LENSES[0]
  );
}
