export type CountingMode = "permutation" | "combination";

export type CountingToken = {
  id: string;
  label: string;
  tone: "amber" | "cyan" | "violet" | "rose" | "emerald" | "sky" | "orange";
  shape:
    | "diamond"
    | "circle"
    | "square"
    | "hexagon"
    | "triangle"
    | "star"
    | "bar";
};

export const COUNTING_TOKENS: readonly CountingToken[] = [
  { id: "A", label: "A", tone: "amber", shape: "diamond" },
  { id: "B", label: "B", tone: "cyan", shape: "circle" },
  { id: "C", label: "C", tone: "violet", shape: "square" },
  { id: "D", label: "D", tone: "rose", shape: "hexagon" },
  { id: "E", label: "E", tone: "emerald", shape: "triangle" },
  { id: "F", label: "F", tone: "sky", shape: "star" },
  { id: "G", label: "G", tone: "orange", shape: "bar" },
] as const;

export const CANONICAL_COUNTING_CASE = {
  n: 4,
  k: 2,
  tokenIds: COUNTING_TOKENS.slice(0, 4).map((token) => token.id),
} as const;

export function factorial(value: number): number {
  if (!Number.isInteger(value) || value < 0) {
    throw new Error("Factorial requires a nonnegative integer.");
  }

  let result = 1;
  for (let factor = 2; factor <= value; factor += 1) {
    result *= factor;
  }
  return result;
}

export function permutationCount(n: number, k: number): number {
  assertCountingInputs(n, k);
  return factorial(n) / factorial(n - k);
}

export function combinationCount(n: number, k: number): number {
  assertCountingInputs(n, k);
  return permutationCount(n, k) / factorial(k);
}

export function countOutcomes(
  mode: CountingMode,
  n: number,
  k: number
): number {
  return mode === "permutation"
    ? permutationCount(n, k)
    : combinationCount(n, k);
}

export function enumerateOutcomes(
  tokenIds: readonly string[],
  k: number,
  mode: CountingMode
): readonly (readonly string[])[] {
  if (k < 0 || k > tokenIds.length) return [];

  if (mode === "combination") {
    return enumerateCombinations(tokenIds, k);
  }

  if (k === 0) return [[]];

  return tokenIds.flatMap((tokenId, index) =>
    enumerateOutcomes(
      [...tokenIds.slice(0, index), ...tokenIds.slice(index + 1)],
      k - 1,
      "permutation"
    ).map((tail) => [tokenId, ...tail])
  );
}

function enumerateCombinations(
  tokenIds: readonly string[],
  k: number,
  start = 0,
  prefix: readonly string[] = []
): readonly (readonly string[])[] {
  if (prefix.length === k) return [prefix];

  const remainingNeeded = k - prefix.length;
  const outcomes: (readonly string[])[] = [];

  for (
    let index = start;
    index <= tokenIds.length - remainingNeeded;
    index += 1
  ) {
    outcomes.push(
      ...enumerateCombinations(tokenIds, k, index + 1, [
        ...prefix,
        tokenIds[index],
      ])
    );
  }

  return outcomes;
}

function assertCountingInputs(n: number, k: number) {
  if (!Number.isInteger(n) || !Number.isInteger(k) || n < 0 || k < 0 || k > n) {
    throw new Error("Counting requires integers with 0 ≤ k ≤ n.");
  }
}

export type CountingPracticeCase = {
  mode: CountingMode;
  n: number;
  k: number;
  prompt: string;
  answer: number;
  factorText: string;
};

const PERMUTATION_SCENARIOS = [
  (n: number, k: number) =>
    `A signal displays ${k} distinct flags chosen from ${n}. Reversing the flags changes the message.`,
  (n: number, k: number) =>
    `A final awards ${k} ranked places to ${n} competitors. No competitor can hold two places.`,
  (n: number, k: number) =>
    `A code uses ${k} different symbols selected from ${n}, and each position has a different meaning.`,
] as const;

const COMBINATION_SCENARIOS = [
  (n: number, k: number) =>
    `A panel selects ${k} members from ${n} candidates. Every selected member has the same role.`,
  (n: number, k: number) =>
    `A field guide chooses ${k} distinct specimens from ${n}. Rearranging the chosen specimens does not create a new set.`,
  (n: number, k: number) =>
    `A café chooses ${k} different teas from ${n} for one sampler. Serving order does not matter.`,
] as const;

export function generatedPracticeCase(seed: number): CountingPracticeCase {
  const normalizedSeed = ((seed % 97) + 97) % 97;
  const mode: CountingMode =
    normalizedSeed % 2 === 0 ? "permutation" : "combination";
  const n = 5 + (normalizedSeed % 4);
  const k = 2 + (Math.floor(normalizedSeed / 2) % 3);
  const scenarios =
    mode === "permutation" ? PERMUTATION_SCENARIOS : COMBINATION_SCENARIOS;
  const prompt = scenarios[normalizedSeed % scenarios.length](n, k);
  const answer = countOutcomes(mode, n, k);
  const descendingFactors = Array.from({ length: k }, (_, index) => n - index);
  const factorText =
    mode === "permutation"
      ? `${descendingFactors.join(" × ")} = ${answer}`
      : `(${descendingFactors.join(" × ")}) ÷ ${k}! = ${answer}`;

  return { mode, n, k, prompt, answer, factorText };
}
