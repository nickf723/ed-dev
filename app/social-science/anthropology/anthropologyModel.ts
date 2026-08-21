export const ANTHROPOLOGY_DIRECT_BRANCH_IDS = [
  "social.anthropology.cultural",
  "social.anthropology.biological",
  "social.anthropology.archaeology",
  "social.anthropology.linguistic",
] as const;

export const HOMININ_SPECIMENS = [
  {
    id: "afarensis",
    name: "Australopithecus afarensis",
    time: "~3.9–2.9 million years ago",
    brain: "~400–500 cc",
    clue: "habitual bipedalism",
    icon: "footprints",
    description:
      "A well-known australopith with a small brain and clear adaptations for upright walking. It is one branch among several early hominins, not a guaranteed direct ancestor of later Homo.",
  },
  {
    id: "habilis",
    name: "Early Homo / H. habilis",
    time: "~2.4–1.4 million years ago",
    brain: "~500–700 cc",
    clue: "tool association",
    icon: "tool",
    description:
      "Fossils grouped as Homo habilis show a mosaic of traits. Oldowan stone tools overlap this period, but stone-tool making began before the earliest fossils usually assigned to H. habilis.",
  },
  {
    id: "erectus",
    name: "Homo erectus",
    time: "~1.9 million–110,000 years ago",
    brain: "~600–1,100 cc",
    clue: "wide dispersal",
    icon: "globe",
    description:
      "A long-lived and geographically widespread lineage with human-like body proportions, major dispersals beyond Africa, and diverse stone-tool traditions across its range.",
  },
  {
    id: "neanderthal",
    name: "Homo neanderthalensis",
    time: "~400,000–40,000 years ago",
    brain: "often ~1,200–1,750 cc",
    clue: "Eurasian adaptation",
    icon: "skull",
    description:
      "Neanderthals were a closely related Eurasian lineage with sophisticated technologies, care for injured group members, symbolic behavior in some contexts, and genetic exchange with Homo sapiens.",
  },
  {
    id: "sapiens",
    name: "Homo sapiens",
    time: "~300,000 years ago–present",
    brain: "commonly ~1,200–1,500 cc",
    clue: "global expansion",
    icon: "brain",
    description:
      "Our species emerged within Africa and later expanded globally while interacting with other hominin populations. Cultural complexity accumulated unevenly across many communities and environments.",
  },
] as const;

export function calculateObservedShare(
  observedPart: number,
  observedTotal: number
): number {
  if (
    !Number.isFinite(observedPart) ||
    !Number.isFinite(observedTotal) ||
    observedPart < 0 ||
    observedTotal <= 0
  ) {
    return 0;
  }
  return (
    Math.round((Math.min(observedPart, observedTotal) / observedTotal) * 1000) /
    10
  );
}

export function formatObservedPercent(value: number): string {
  const rounded = Math.round(value * 10) / 10;
  return `${Number.isInteger(rounded) ? rounded.toFixed(0) : rounded.toFixed(1)}%`;
}

export const ANTHROPOLOGY_EVIDENCE_CASES = [
  {
    id: "tally",
    eyebrow: "Field record 01 · exact practice",
    label: "Keep the denominator",
    prompt:
      "In a bounded observation log, 18 of 48 recorded meal-preparation events involved people preparing food together. Which statement is supported?",
    options: [
      {
        id: "observed-share",
        label:
          "37.5% of the recorded events involved shared preparation; the result describes this observation log and needs its sampling frame.",
      },
      {
        id: "whole-culture",
        label:
          "Exactly 37.5% of all meals in the entire culture are collaborative.",
      },
      {
        id: "no-denominator",
        label:
          "Eighteen observations prove collaboration is the dominant value.",
      },
    ],
    correctOptionId: "observed-share",
    success:
      "Correct. 18 ÷ 48 = 0.375 = 37.5%. The arithmetic is exact for the log; generalization depends on who, where, when, and how observations were sampled.",
    correction:
      "Calculate the observed share, then keep its boundary. A count does not by itself establish a community-wide frequency, meaning, motive, or value.",
  },
  {
    id: "fieldnote",
    eyebrow: "Field record 02 · observation",
    label: "Separate record from inference",
    prompt:
      "A field note records that three households alternated cooking duties during four observed weeks. Which next claim is best disciplined?",
    options: [
      {
        id: "ask-meaning",
        label:
          "The rotation is an observed pattern; interviews, longer observation, history, and participant interpretation can test what it means and how stable it is.",
      },
      {
        id: "universal-rule",
        label:
          "The note proves every household follows an ancient, universal rule of reciprocity.",
      },
      {
        id: "researcher-meaning",
        label:
          "The researcher's first interpretation is the participants' meaning.",
      },
    ],
    correctOptionId: "ask-meaning",
    success:
      "Correct. Ethnographic interpretation grows through context, dialogue, comparison, reflexivity, and revision; observation and explanation remain distinguishable.",
    correction:
      "Keep behavior, participant accounts, researcher interpretation, historical context, and generalization as separate evidentiary moves.",
  },
  {
    id: "variation",
    eyebrow: "Field record 03 · human variation",
    label: "Reject fixed typology",
    prompt:
      "A biological-anthropology dataset shows a trait varies continuously and overlaps across sampled populations. What interpretation fits the evidence?",
    options: [
      {
        id: "overlap-history",
        label:
          "Describe the distribution, overlap, ancestry, environment, development, sampling, and history without forcing people into fixed biological races.",
      },
      {
        id: "discrete-races",
        label:
          "Any average difference proves natural humanity is divided into discrete, internally uniform races.",
      },
      {
        id: "culture-only",
        label:
          "Biological variation cannot be studied because only culture affects bodies.",
      },
    ],
    correctOptionId: "overlap-history",
    success:
      "Correct. Human biological variation is patterned but overlapping, historically connected, and shaped by evolutionary, developmental, environmental, and social processes.",
    correction:
      "Do not convert a sample average into an essential type. Inspect distributions, within-group variation, overlap, ancestry, environment, and measurement boundaries.",
  },
  {
    id: "provenience",
    eyebrow: "Field record 04 · material context",
    label: "Protect the context chain",
    prompt:
      "A ceramic fragment has no recorded coordinates, layer, feature association, recovery method, or collection history. What can it securely establish about a site?",
    options: [
      {
        id: "limited-claim",
        label:
          "Its material and form may still be examined, but site date, activity, association, and ownership claims are sharply limited without provenience and documentation.",
      },
      {
        id: "exact-date",
        label: "Its appearance alone gives the exact date of the entire site.",
      },
      {
        id: "free-display",
        label:
          "Missing collection history means it is automatically ethical and legal to display or publish.",
      },
    ],
    correctOptionId: "limited-claim",
    success:
      "Correct. An object is not the whole record. Provenience, association, formation processes, stewardship, rights, and consultation shape what can be inferred and what should be done.",
    correction:
      "Treat contextual loss as evidentiary loss, not as permission. Description, interpretation, possession, access, and publication are separate questions.",
  },
] as const;

export function isAnthropologyEvidenceAnswerCorrect(
  caseId: string,
  optionId: string
): boolean {
  return (
    ANTHROPOLOGY_EVIDENCE_CASES.find((item) => item.id === caseId)
      ?.correctOptionId === optionId
  );
}
