import type { ArgumentNode } from "@/app/_page-system/widgets/ArgumentMap";

export const PHILOSOPHY_DIRECT_BRANCH_IDS = [
  "humanities.philosophy.metaphysics",
  "humanities.philosophy.epistemology",
  "humanities.philosophy.mind",
  "humanities.philosophy.ethics",
  "humanities.philosophy.political",
  "humanities.philosophy.aesthetics",
  "humanities.philosophy.science",
] as const;

export const PHILOSOPHY_ARGUMENT_NODES: readonly ArgumentNode[] = [
  { id: "q", type: "question", text: "When is a belief justified?" },
  {
    id: "c",
    type: "claim",
    text: "A justified belief should be supported by evidence the believer can responsibly rely on.",
    parentId: "q",
  },
  {
    id: "r1",
    type: "reason",
    text: "Evidence connects belief to features of the world rather than mere wish or guesswork.",
    parentId: "c",
  },
  {
    id: "r2",
    type: "reason",
    text: "Responsibility matters because two people can possess the same information but handle it differently.",
    parentId: "c",
  },
  {
    id: "o",
    type: "objection",
    text: "What about reliable beliefs formed without conscious access to reasons, such as ordinary perception?",
    parentId: "c",
  },
  {
    id: "reply",
    type: "reply",
    text: "The claim may need to distinguish accessible reasons from reliable belief-forming processes.",
    parentId: "o",
  },
] as const;

export function validatePhilosophyArgument(
  nodes: readonly ArgumentNode[] = PHILOSOPHY_ARGUMENT_NODES
) {
  const ids = new Set(nodes.map((node) => node.id));
  return (
    ids.size === nodes.length &&
    nodes.every((node) => !node.parentId || ids.has(node.parentId)) &&
    nodes.filter((node) => !node.parentId).length === 1
  );
}

export const PHILOSOPHY_EVIDENCE_CASES = [
  {
    id: "valid-sound",
    prompt:
      "Premise 1: If a process is reliable, beliefs produced by it are justified. Premise 2: This process is reliable. Conclusion: This belief is justified. What has been shown?",
    options: [
      {
        id: "valid-form",
        label:
          "The inference has a valid modus-ponens form; soundness still depends on whether both premises are true.",
      },
      {
        id: "true-conclusion",
        label: "The conclusion is automatically true in the actual world.",
      },
      {
        id: "invalid",
        label: "The inference is invalid because a premise could be disputed.",
      },
    ],
    correctOptionId: "valid-form",
    success:
      "Correct. Validity asks whether true premises would guarantee the conclusion; soundness adds actual premise truth.",
    correction:
      "Separate inferential form from premise truth. A premise may be controversial even when the conclusion follows from it validly.",
  },
  {
    id: "counterexample",
    prompt:
      "A claim says, “Every artwork is made by exactly one artist.” What would a genuinely relevant collaborative film provide?",
    options: [
      {
        id: "counterexample",
        label:
          "A counterexample to the universal claim, provided the film is an artwork and genuinely has multiple makers.",
      },
      {
        id: "insult",
        label: "A reason to criticize the claimant's personality.",
      },
      {
        id: "proof-opposite",
        label: "A proof that no artwork is ever made by one artist.",
      },
    ],
    correctOptionId: "counterexample",
    success:
      "Correct. One qualifying case can refute a universal claim without establishing the universal opposite.",
    correction:
      "Test the quantifier. A universal is defeated by one genuine exception, but that exception does not prove that all cases work the other way.",
  },
  {
    id: "conditions",
    prompt:
      "Every square is a rectangle, but not every rectangle is a square. Which relation is correct?",
    options: [
      {
        id: "square-sufficient",
        label:
          "Being a square is sufficient for being a rectangle; being a rectangle is necessary but not sufficient for being a square.",
      },
      {
        id: "rectangle-sufficient",
        label: "Being a rectangle is sufficient for being a square.",
      },
      {
        id: "unrelated",
        label: "Neither property is necessary or sufficient for the other.",
      },
    ],
    correctOptionId: "square-sufficient",
    success:
      "Correct. Square guarantees rectangle; rectangle is required for square but does not guarantee it.",
    correction:
      "Ask which direction guarantees which: square → rectangle. Then translate each direction into sufficient and necessary conditions.",
  },
  {
    id: "objection",
    prompt:
      "An objection shows that a reason supports a conclusion only if an unstated assumption is added. What does it target?",
    options: [
      {
        id: "support",
        label:
          "The support relation between reason and conclusion, while leaving open whether a revised argument could succeed.",
      },
      {
        id: "person",
        label: "The intelligence or character of the person who offered it.",
      },
      {
        id: "whole-field",
        label: "Every claim in the branch of philosophy containing it.",
      },
    ],
    correctOptionId: "support",
    success:
      "Correct. A strong objection states its target precisely and makes room for reply, qualification, or revision.",
    correction:
      "Keep the target local. An argument-level objection need not become a personal attack or a rejection of an entire subject.",
  },
] as const;

export function isPhilosophyEvidenceAnswerCorrect(
  caseId: string,
  optionId: string
) {
  return (
    PHILOSOPHY_EVIDENCE_CASES.find((item) => item.id === caseId)
      ?.correctOptionId === optionId
  );
}
