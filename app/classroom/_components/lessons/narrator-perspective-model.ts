export type TellingId = "mara" | "limited" | "outside";
export type AccessLevel = "direct" | "inferred" | "withheld";

export type AccessFact = {
  id: "mara-plan" | "theo-suspicion" | "envelope-contents";
  label: string;
};

export type Telling = {
  id: TellingId;
  label: string;
  voice: "first person" | "third person";
  perspective: string;
  text: readonly string[];
  access: Record<AccessFact["id"], AccessLevel>;
};

export const ACCESS_FACTS: readonly AccessFact[] = [
  { id: "mara-plan", label: "Mara's plan" },
  { id: "theo-suspicion", label: "Theo's suspicion" },
  { id: "envelope-contents", label: "What the envelope contains" },
] as const;

export const TELLINGS: Record<TellingId, Telling> = {
  mara: {
    id: "mara",
    label: "Mara tells it",
    voice: "first person",
    perspective: "Mara",
    text: [
      "I slid the sealed envelope beneath the library atlas before Theo reached the table.",
      "He glanced at the atlas, then at me. I kept both hands around my water bottle.",
      "If he asked, I would say I had come to study maps.",
    ],
    access: {
      "mara-plan": "direct",
      "theo-suspicion": "inferred",
      "envelope-contents": "withheld",
    },
  },
  limited: {
    id: "limited",
    label: "Theo perceives it",
    voice: "third person",
    perspective: "Theo",
    text: [
      "Theo reached the table as Mara pulled her hand away from the library atlas.",
      "She gripped her water bottle with both hands and looked past him toward the exit.",
      "Something under that atlas mattered to her. He decided not to ask—not yet.",
    ],
    access: {
      "mara-plan": "inferred",
      "theo-suspicion": "direct",
      "envelope-contents": "withheld",
    },
  },
  outside: {
    id: "outside",
    label: "An outside observer",
    voice: "third person",
    perspective: "no inner access",
    text: [
      "Mara placed a sealed envelope beneath the library atlas.",
      "When Theo reached the table, she held her water bottle with both hands.",
      "He looked at the atlas. Neither of them spoke.",
    ],
    access: {
      "mara-plan": "inferred",
      "theo-suspicion": "inferred",
      "envelope-contents": "withheld",
    },
  },
};

export const ACCESS_LABELS: Record<AccessLevel, string> = {
  direct: "Reader enters it",
  inferred: "Reader must infer it",
  withheld: "Reader cannot know yet",
};

export function getTelling(id: TellingId) {
  return TELLINGS[id];
}

export function accessCount(id: TellingId, level: AccessLevel) {
  return Object.values(TELLINGS[id].access).filter((value) => value === level)
    .length;
}

export function classifyVoice(id: TellingId) {
  return TELLINGS[id].voice;
}
