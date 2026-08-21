export const RELIGION_DIRECT_BRANCH_IDS = [
  "humanities.religion.methods",
  "humanities.religion.traditions",
  "humanities.religion.texts-interpretation",
  "humanities.religion.ritual-practice",
  "humanities.religion.material-place",
  "humanities.religion.society-politics",
  "humanities.religion.theology-philosophy",
  "humanities.religion.mythology",
] as const;

export function calculateSourceShare(part: number, total: number): number {
  if (
    !Number.isFinite(part) ||
    !Number.isFinite(total) ||
    part < 0 ||
    total <= 0
  ) {
    return 0;
  }
  return Math.round((Math.min(part, total) / total) * 1000) / 10;
}

export function formatSourcePercent(value: number): string {
  const rounded = Math.round(value * 10) / 10;
  return `${Number.isInteger(rounded) ? rounded.toFixed(0) : rounded.toFixed(1)}%`;
}

export const RELIGION_EVIDENCE_CASES = [
  {
    id: "denominator",
    eyebrow: "Dossier 01 · exact practice",
    label: "Keep the source packet bounded",
    prompt:
      "In a curated packet, 9 of 24 independently cataloged records mention a procession. Which statement follows?",
    options: [
      {
        id: "packet-share",
        label:
          "37.5% of this packet mentions a procession; the source-selection and cataloging rules still bound the claim.",
      },
      {
        id: "tradition-share",
        label:
          "Exactly 37.5% of all members of the tradition participate in processions.",
      },
      {
        id: "universal-belief",
        label:
          "Nine records prove that procession is the tradition's one essential belief.",
      },
    ],
    correctOptionId: "packet-share",
    success:
      "Correct. 9 ÷ 24 = 0.375 = 37.5%. The arithmetic describes this packet; it does not erase selection, genre, date, place, community, authorship, or missing records.",
    correction:
      "Calculate the packet share, then stop at the packet boundary. A document count is not automatically a population frequency, universal meaning, or essential belief.",
  },
  {
    id: "text",
    eyebrow: "Dossier 02 · text and reception",
    label: "Do not let one passage speak for everyone",
    prompt:
      "A translated passage prescribes a practice, but interviews show several current interpretations. What is the strongest claim?",
    options: [
      {
        id: "reception-history",
        label:
          "The passage is one source whose genre, translation, authority, reception history, and present interpretations should be studied together.",
      },
      {
        id: "uniform-obedience",
        label:
          "The passage proves every member has always understood and practiced it identically.",
      },
      {
        id: "ignore-text",
        label:
          "Current disagreement means the text has never mattered to anyone.",
      },
    ],
    correctOptionId: "reception-history",
    success:
      "Correct. Text, translation, canon, commentary, performance, authority, disagreement, and lived practice are related evidence streams rather than interchangeable facts.",
    correction:
      "Avoid both textual determinism and dismissal. Ask how a source was produced, transmitted, authorized, interpreted, and used by particular people in particular contexts.",
  },
  {
    id: "comparison",
    eyebrow: "Dossier 03 · comparison",
    label: "Name the dimension",
    prompt:
      "Two communities both use fasting. What comparison is academically disciplined?",
    options: [
      {
        id: "bounded-dimensions",
        label:
          "Compare timing, foods, participants, purposes, authority, bodily experience, and local history without assuming global equivalence.",
      },
      {
        id: "same-religion",
        label:
          "The shared word fasting proves the communities have the same religion and worldview.",
      },
      {
        id: "no-comparison",
        label:
          "Any comparison across traditions is automatically impossible or unethical.",
      },
    ],
    correctOptionId: "bounded-dimensions",
    success:
      "Correct. Comparison is a designed research operation. Similarity and difference become meaningful only when the compared dimensions, cases, scale, and purpose are explicit.",
    correction:
      "A shared label is a starting question, not a conclusion. State what is comparable and preserve differences in history, authority, practice, and meaning.",
  },
  {
    id: "collection",
    eyebrow: "Dossier 04 · collection ethics",
    label: "Separate access from permission",
    prompt:
      "A museum API exposes metadata for a ceremonial object, but the image-rights field is absent and the community context is sparse. What should a repository do?",
    options: [
      {
        id: "metadata-boundary",
        label:
          "Preserve the source record and uncertainty, withhold unsupported media reuse, and seek rights, provenance, sensitivity, and community context before interpretation or display.",
      },
      {
        id: "public-means-free",
        label:
          "A public endpoint makes every image and cultural use unrestricted.",
      },
      {
        id: "fill-gaps",
        label:
          "Infer the missing community, meaning, date, and permission from the object title.",
      },
    ],
    correctOptionId: "metadata-boundary",
    success:
      "Correct. Technical access, descriptive metadata, copyright, cultural sensitivity, consent, provenance, possession, and interpretive authority are separate fields.",
    correction:
      "Do not turn missing metadata into permission or invented certainty. Represent incomplete rights and context as incomplete, and support restricted or no-media records.",
  },
] as const;

export function isReligionEvidenceAnswerCorrect(
  caseId: string,
  optionId: string
): boolean {
  return (
    RELIGION_EVIDENCE_CASES.find((item) => item.id === caseId)
      ?.correctOptionId === optionId
  );
}
