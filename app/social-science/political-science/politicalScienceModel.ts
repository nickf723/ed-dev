export const POLITICAL_SCIENCE_DIRECT_BRANCH_IDS = [
  "social.political-science.theory",
  "social.political-science.comparative",
  "social.political-science.institutions",
  "social.political-science.behavior",
  "social.political-science.policy",
  "social.political-science.international-relations",
  "social.political-science.political-economy",
  "social.political-science.methods",
] as const;

export type PoliticalScienceBranchId =
  (typeof POLITICAL_SCIENCE_DIRECT_BRANCH_IDS)[number];

export type PoliticalParty = {
  id: string;
  label: string;
  seats: number;
  rgb: string;
};

export const POLITICAL_PARTIES: readonly PoliticalParty[] = [
  { id: "civic", label: "Civic Labor", seats: 25, rgb: "239,68,68" },
  { id: "reform", label: "Liberal Reform", seats: 35, rgb: "250,204,21" },
  { id: "green", label: "Green Alliance", seats: 15, rgb: "34,197,94" },
  { id: "union", label: "Conservative Union", seats: 40, rgb: "59,130,246" },
  { id: "regional", label: "Regional Voice", seats: 10, rgb: "168,85,247" },
] as const;

export const POLITICAL_TOTAL_SEATS = POLITICAL_PARTIES.reduce(
  (sum, party) => sum + party.seats,
  0
);

export const POLITICAL_MAJORITY = Math.floor(POLITICAL_TOTAL_SEATS / 2) + 1;

export function calculateCoalitionSeats(partyIds: readonly string[]): number {
  const selected = new Set(partyIds);
  return POLITICAL_PARTIES.filter((party) => selected.has(party.id)).reduce(
    (sum, party) => sum + party.seats,
    0
  );
}

export function hasPoliticalMajority(partyIds: readonly string[]): boolean {
  return calculateCoalitionSeats(partyIds) >= POLITICAL_MAJORITY;
}

export function buildPoliticalHemicycle(
  parties: readonly PoliticalParty[] = POLITICAL_PARTIES
) {
  const total = parties.reduce((sum, party) => sum + party.seats, 0);
  const dots: Array<{
    key: string;
    x: number;
    y: number;
    rgb: string;
    partyId: string;
  }> = [];
  const centerX = 350;
  const centerY = 292;
  const rings = [112, 148, 184, 220, 254];
  let seatIndex = 0;

  for (const party of parties) {
    for (let index = 0; index < party.seats; index += 1) {
      const fraction = total <= 1 ? 0.5 : seatIndex / (total - 1);
      const ringIndex = seatIndex % rings.length;
      const angle = Math.PI - fraction * Math.PI;
      const radius = rings[ringIndex];
      dots.push({
        key: `${party.id}-${index}`,
        x: centerX + Math.cos(angle) * radius,
        y: centerY - Math.sin(angle) * radius,
        rgb: party.rgb,
        partyId: party.id,
      });
      seatIndex += 1;
    }
  }

  return dots;
}

export const POLITICAL_EVIDENCE_CASES = [
  {
    id: "coalition",
    eyebrow: "Case 01 · exact practice",
    label: "Count a possible majority",
    prompt:
      "Conservative Union holds 40 seats and Civic Labor holds 25 in the 125-seat chamber. What does their combined total establish?",
    options: [
      {
        id: "numeric-majority",
        label:
          "They hold 65 seats, two above the 63-seat threshold; the coalition is numerically possible, not automatically plausible or stable.",
      },
      {
        id: "minority",
        label:
          "They hold 55 seats, so the chamber cannot produce a majority government.",
      },
      {
        id: "automatic-government",
        label:
          "Their 65 seats prove the parties will agree, form a lawful government, and remain united.",
      },
    ],
    correctOptionId: "numeric-majority",
    success:
      "Correct. 40 + 25 = 65 and 65 ≥ 63. Seat arithmetic identifies a feasible majority; rules, bargaining, policy distance, discipline, and political context still shape formation and survival.",
    correction:
      "First compute the seats and threshold. Then stop at the boundary of the model: a numerical majority is a constraint, not a complete theory of coalition behavior.",
  },
  {
    id: "representation",
    eyebrow: "Case 02 · translation rule",
    label: "Keep votes and seats distinct",
    prompt:
      "A party receives 30% of votes but 38% of seats. Which explanation stays inside the available evidence?",
    options: [
      {
        id: "rules-matter",
        label:
          "Votes were translated into seats through an electoral system; district boundaries, district magnitude, thresholds, turnout, and allocation rules may explain the difference and must be examined.",
      },
      {
        id: "fraud-proven",
        label: "The mismatch alone proves the election was fraudulent.",
      },
      {
        id: "same-quantity",
        label:
          "Vote share and seat share are the same quantity, so one of the reported numbers must be a typo.",
      },
    ],
    correctOptionId: "rules-matter",
    success:
      "Correct. Representation is an institutional translation. A discrepancy is a question to explain with the actual rules and geography, not proof of one cause by itself.",
    correction:
      "Do not collapse vote share into seat share or infer fraud from a difference alone. Identify the electoral formula, districts, threshold, turnout, and denominator first.",
  },
  {
    id: "causation",
    eyebrow: "Case 03 · causal design",
    label: "Separate sequence from cause",
    prompt:
      "A government adopts a policy one week after a large protest. What is the strongest justified claim?",
    options: [
      {
        id: "sequence-needs-design",
        label:
          "The protest preceded adoption, but causal attribution requires evidence about the agenda, decision process, competing pressures, timing, and a research design that tests rival explanations.",
      },
      {
        id: "protest-proves-cause",
        label:
          "The timing proves the protest was the sole cause of the policy.",
      },
      {
        id: "no-possible-effect",
        label: "Temporal proximity proves the protest had no effect at all.",
      },
    ],
    correctOptionId: "sequence-needs-design",
    success:
      "Correct. Sequence is relevant evidence, but a causal claim needs a mechanism and a design capable of distinguishing the protest from prior commitments and other pressures.",
    correction:
      "A before-and-after sequence does not identify a unique cause. Ask what changed, through which decision channel, relative to what comparison, and with what alternative explanations.",
  },
  {
    id: "implementation",
    eyebrow: "Case 04 · outcome boundary",
    label: "Follow policy beyond adoption",
    prompt:
      "A legislature passes a housing benefit. Which record would best test whether eligible residents actually received it?",
    options: [
      {
        id: "implementation-records",
        label:
          "Combine the enacted text with administrative eligibility rules, appropriations, application and payment records, coverage denominators, appeals, timing, and outcome evidence.",
      },
      {
        id: "bill-title",
        label:
          "Use only the title of the enacted bill; adoption guarantees uniform delivery and effects.",
      },
      {
        id: "speech-only",
        label:
          "Use one sponsor’s speech as a complete measure of implementation and impact.",
      },
    ],
    correctOptionId: "implementation-records",
    success:
      "Correct. Adoption, implementation, uptake, distribution, and outcome are separate stages. Each requires records with its own unit, denominator, time, and uncertainty.",
    correction:
      "Formal adoption is neither delivery nor effect. Trace the rule through budgets, agencies, eligibility, access, uptake, appeals, and measured outcomes.",
  },
] as const;

export function isPoliticalEvidenceAnswerCorrect(
  caseId: string,
  optionId: string
): boolean {
  return (
    POLITICAL_EVIDENCE_CASES.find((item) => item.id === caseId)
      ?.correctOptionId === optionId
  );
}
