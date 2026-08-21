export const COMPUTER_SCIENCE_DIRECT_BRANCH_IDS = [
  "formal.computer-science.hardware",
  "formal.computer-science.software",
  "formal.computer-science.algorithms",
  "formal.computer-science.artificial-intelligence",
  "formal.computer-science.theory",
  "formal.computer-science.security",
] as const;

export function calculateBitPatterns(bits: number): number {
  if (!Number.isSafeInteger(bits) || bits < 0 || bits > 52) return 0;
  return 2 ** bits;
}

export const COMPUTER_SCIENCE_EVIDENCE_CASES = [
  {
    id: "representation",
    eyebrow: "Trace 01 · exact practice",
    label: "Count the state space",
    prompt:
      "An unsigned field contains 8 independent bits. How many distinct bit patterns can it represent?",
    options: [
      {
        id: "256-patterns",
        label:
          "2⁸ = 256 patterns; a format still has to define what those patterns mean.",
      },
      {
        id: "eight-values",
        label: "Eight values, because the field has eight bits.",
      },
      { id: "sixty-four-values", label: "64 values, because 8 × 8 = 64." },
    ],
    correctOptionId: "256-patterns",
    success:
      "Correct. Each independent bit doubles the state space, so 8 bits give 256 patterns. Encoding semantics determine whether those patterns mean integers, characters, flags, colors, or something else.",
    correction:
      "Count combinations, not symbols: every new binary position doubles the number of possible patterns. Then separate the pattern from its interpretation.",
  },
  {
    id: "correctness",
    eyebrow: "Trace 02 · procedure",
    label: "Test the contract",
    prompt:
      "A sorting function returns every input item in nondecreasing order. What else must be shown before the result is correct?",
    options: [
      {
        id: "same-multiset",
        label:
          "The output contains exactly the same items with the same multiplicities as the input.",
      },
      { id: "fast-once", label: "It ran quickly on one sample input." },
      {
        id: "short-code",
        label: "Its implementation uses fewer lines of code.",
      },
    ],
    correctOptionId: "same-multiset",
    success:
      "Correct. Order alone is insufficient: a sorter must also preserve the input multiset. Correctness is measured against a full contract, not visual plausibility.",
    correction:
      "Ask what the procedure is allowed to change. Sorting may change position, but it must not lose, invent, or duplicate values.",
  },
  {
    id: "interface",
    eyebrow: "Trace 03 · composition",
    label: "Respect the boundary",
    prompt:
      "A client relies on an API documented to return stable record IDs and paginated results. Which integration best preserves that contract?",
    options: [
      {
        id: "explicit-contract",
        label:
          "Store provider and stable ID, follow pagination, pin the API version where supported, and tolerate documented optional fields.",
      },
      {
        id: "screen-scrape",
        label:
          "Parse whichever text happens to be visible on the website today.",
      },
      {
        id: "assume-complete",
        label: "Treat the first response page as the complete collection.",
      },
    ],
    correctOptionId: "explicit-contract",
    success:
      "Correct. Composition works when both sides honor an explicit interface, including identity, pagination, version, optionality, errors, and refresh context.",
    correction:
      "An interface is more than a URL. Preserve identity and version, implement pagination and error states, and distinguish optional data from guaranteed data.",
  },
  {
    id: "security",
    eyebrow: "Trace 04 · threat model",
    label: "Name the protected property",
    prompt:
      "An attacker can alter a message in transit but cannot read it. Which security property has failed most directly?",
    options: [
      {
        id: "integrity",
        label:
          "Integrity—the message can be changed without detection or rejection.",
      },
      {
        id: "confidentiality",
        label: "Confidentiality—the message contents became readable.",
      },
      {
        id: "availability",
        label: "Availability—the service cannot be reached.",
      },
    ],
    correctOptionId: "integrity",
    success:
      "Correct. Confidentiality, integrity, and availability answer different questions. A threat model identifies the asset, adversary capabilities, trust boundaries, and required property before choosing controls.",
    correction:
      "Match the failure to the property: reading concerns confidentiality, unauthorized change concerns integrity, and loss of usable access concerns availability.",
  },
] as const;

export function isComputerScienceEvidenceAnswerCorrect(
  caseId: string,
  optionId: string
): boolean {
  return (
    COMPUTER_SCIENCE_EVIDENCE_CASES.find((item) => item.id === caseId)
      ?.correctOptionId === optionId
  );
}
