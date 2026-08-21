export const HISTORY_DIRECT_LENS_IDS = [
  "humanities.history.chronology",
  "humanities.history.regional",
  "humanities.history.theme",
] as const;

export type HistoricalDate = {
  year: number;
  era: "BCE" | "CE";
};

export const CAESAR_AUGUSTUS_INTERVAL = {
  start: { year: 44, era: "BCE" },
  end: { year: 14, era: "CE" },
} as const satisfies { start: HistoricalDate; end: HistoricalDate };

export function toAstronomicalYear(date: HistoricalDate): number {
  if (!Number.isInteger(date.year) || date.year < 1) {
    throw new Error("Historical BCE/CE years must be positive integers");
  }
  return date.era === "BCE" ? 1 - date.year : date.year;
}

export function historicalYearDistance(
  first: HistoricalDate,
  second: HistoricalDate
): number {
  return Math.abs(toAstronomicalYear(second) - toAstronomicalYear(first));
}

export function formatHistoricalDate(date: HistoricalDate): string {
  return `${date.year.toLocaleString("en-US")} ${date.era}`;
}

export const HISTORY_EVIDENCE_CASES = [
  {
    id: "interval",
    label: "Cross the era boundary",
    eyebrow: "Inquiry file 01 · chronology",
    observation:
      "A timeline begins in 44 BCE and ends in 14 CE. The conventional BCE/CE sequence has no year zero.",
    prompt: "How many years separate the two dated points?",
    options: [
      { id: "fifty-seven", label: "57 years." },
      { id: "fifty-eight", label: "58 years, found by adding 44 + 14." },
      { id: "thirty", label: "30 years, found by subtracting 14 from 44." },
    ],
    correctOptionId: "fifty-seven",
    success:
      "Correct. Converting 44 BCE to astronomical year −43 and 14 CE to 14 gives a distance of 57 years. The conversion handles the missing year zero.",
    correction:
      "Do not count a year zero that the BCE/CE convention does not contain. The exact distance is 57 years.",
  },
  {
    id: "primary-source",
    label: "Classify by the question",
    eyebrow: "Inquiry file 02 · sources",
    observation:
      "A newspaper printed during a strike reports accusations from one employer but includes no interviews with striking workers.",
    prompt: "Which historical use is best supported?",
    options: [
      {
        id: "perspective-evidence",
        label:
          "Treat it as primary evidence of what this paper published and whose perspective it carried; corroborate before using it to reconstruct the whole strike.",
      },
      {
        id: "complete-neutral",
        label:
          "Because it is contemporary, treat it as a complete and neutral account of every participant's experience.",
      },
      {
        id: "not-evidence",
        label:
          "Because it is partial, it cannot be historical evidence for any question.",
      },
    ],
    correctOptionId: "perspective-evidence",
    success:
      "Yes. A source can be valuable precisely as evidence of perspective, publication practice, or rhetoric while remaining insufficient for broader claims.",
    correction:
      "Primary does not mean complete or unbiased. Match the source to a question it can answer, then compare it with other evidence.",
  },
  {
    id: "causation",
    label: "Keep sequence from becoming cause",
    eyebrow: "Inquiry file 03 · explanation",
    observation:
      "A new law was enacted two years before migration into a city increased. Several economic and environmental changes occurred during the same interval.",
    prompt: "What can chronology alone establish?",
    options: [
      {
        id: "precedence-only",
        label:
          "The law preceded the measured increase; causal weight requires mechanisms, comparison, source coverage, alternatives, and timing evidence.",
      },
      {
        id: "law-proves-cause",
        label: "The earlier event must be the sole cause of the later event.",
      },
      {
        id: "no-relationship-possible",
        label: "Events separated by two years can never be related.",
      },
    ],
    correctOptionId: "precedence-only",
    success:
      "Right. Sequence is necessary for many causal claims but does not identify a mechanism or eliminate competing explanations by itself.",
    correction:
      "Chronology establishes order. Historical causation needs additional evidence about mechanisms, conditions, alternatives, and scale.",
  },
  {
    id: "periodization",
    label: "Audit the era label",
    eyebrow: "Inquiry file 04 · periodization",
    observation:
      "A textbook uses 1500 as the start of an Early Modern era across a chapter covering many regions.",
    prompt: "What is the strongest interpretation of that boundary?",
    options: [
      {
        id: "analytical-boundary",
        label:
          "It is an analytical convention that may clarify some changes while fitting different regions and processes unevenly.",
      },
      {
        id: "global-switch",
        label: "Every society changed era at the same instant in 1500.",
      },
      {
        id: "meaningless",
        label:
          "Because boundaries are constructed, periodization cannot support any useful comparison.",
      },
    ],
    correctOptionId: "analytical-boundary",
    success:
      "Correct. Periods are arguments about change and continuity. Their usefulness depends on the question, scale, evidence, and region.",
    correction:
      "Avoid treating an era label as a synchronized global switch. Ask what the boundary reveals, what it obscures, and where it fits poorly.",
  },
] as const;

export function isHistoryEvidenceAnswerCorrect(
  caseId: string,
  optionId: string
): boolean {
  const evidenceCase = HISTORY_EVIDENCE_CASES.find(
    (item) => item.id === caseId
  );
  return evidenceCase?.correctOptionId === optionId;
}
