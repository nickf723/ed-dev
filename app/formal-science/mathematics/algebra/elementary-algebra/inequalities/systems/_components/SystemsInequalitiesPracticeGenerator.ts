import type { GeneratedPracticeQuestion } from "@/app/_components/GeneratedPractice";

type Relation = "<" | "≤" | ">" | "≥";

const RELATIONS: readonly Relation[] = ["<", "≤", ">", "≥"];

export function generateSystemsInequalitiesPracticeQuestion(): GeneratedPracticeQuestion {
  const mode = randomInt(0, 2);
  if (mode === 0) return generateRegionReadingQuestion();
  if (mode === 1) return generateSingleMembershipQuestion();
  return generateSystemMembershipQuestion();
}

function generateRegionReadingQuestion(): GeneratedPracticeQuestion {
  const relation = pick(RELATIONS);
  const correctAnswer = `${isGreater(relation) ? "above" : "below"} · ${isInclusive(relation) ? "solid" : "dashed"}`;
  const choices = shuffle([
    "above · solid",
    "above · dashed",
    "below · solid",
    "below · dashed",
  ]);

  return {
    id: `region-${relation}-${Math.random()}`,
    eyebrow: "Read the half-plane",
    prompt: `For y ${relation} x + 2, where do you shade and how do you draw the boundary?`,
    choices,
    correctAnswer,
    explanation: `${isGreater(relation) ? "Greater-than shades above the boundary line." : "Less-than shades below the boundary line."} ${isInclusive(relation) ? "The equality bar includes the boundary, so the line is solid." : "A strict inequality excludes the boundary, so the line is dashed."}`,
  };
}

function generateSingleMembershipQuestion(): GeneratedPracticeQuestion {
  const slope = pick([-1, 0, 1] as const);
  const intercept = randomInt(-3, 3);
  const relation = pick(RELATIONS);
  const x = randomInt(-4, 4);
  const y = randomInt(-4, 4);
  const boundary = slope * x + intercept;
  const belongs = compare(y, boundary, relation);
  const correctAnswer = belongs ? "Yes · inside" : "No · outside";

  return {
    id: `single-${slope}-${intercept}-${relation}-${x}-${y}-${Math.random()}`,
    eyebrow: "Test one point",
    prompt: `Does (${x}, ${y}) satisfy y ${relation} ${formatLine(slope, intercept)}?`,
    choices: shuffle(["Yes · inside", "No · outside"]),
    correctAnswer,
    explanation: `Substitute x = ${x}: the boundary value is ${formatNumber(boundary)}. Then compare ${y} ${relation} ${formatNumber(boundary)}, which is ${belongs ? "true" : "false"}.`,
  };
}

function generateSystemMembershipQuestion(): GeneratedPracticeQuestion {
  const x = randomInt(-2, 4);
  const y = randomInt(-1, 6);
  const passesA = compare(y, x + 1, "≥");
  const passesB = compare(y, -x + 5, "≤");
  const correctAnswer = passesA && passesB
    ? "Both constraints"
    : passesA
      ? "Only A"
      : passesB
        ? "Only B"
        : "Neither";

  return {
    id: `system-${x}-${y}-${Math.random()}`,
    eyebrow: "Test a system",
    prompt: `For A: y ≥ x + 1 and B: y ≤ −x + 5, what does (${x}, ${y}) satisfy?`,
    choices: shuffle(["Both constraints", "Only A", "Only B", "Neither"]),
    correctAnswer,
    explanation: `A gives ${y} ≥ ${x + 1}, which is ${passesA ? "true" : "false"}. B gives ${y} ≤ ${-x + 5}, which is ${passesB ? "true" : "false"}. A point belongs to the system only when both are true.`,
  };
}

function compare(left: number, right: number, relation: Relation) {
  if (relation === "<") return left < right;
  if (relation === "≤") return left <= right;
  if (relation === ">") return left > right;
  return left >= right;
}

function isGreater(relation: Relation) {
  return relation === ">" || relation === "≥";
}

function isInclusive(relation: Relation) {
  return relation === "≤" || relation === "≥";
}

function formatLine(slope: number, intercept: number) {
  const slopePart =
    slope === 0
      ? ""
      : slope === 1
        ? "x"
        : slope === -1
          ? "−x"
          : `${slope}x`;

  if (slope === 0) return String(intercept);
  if (intercept === 0) return slopePart;
  return `${slopePart} ${intercept > 0 ? "+" : "−"} ${Math.abs(intercept)}`;
}

function formatNumber(value: number) {
  return Number.isInteger(value) ? String(value) : Number(value.toFixed(2)).toString();
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick<T>(values: readonly T[]): T {
  return values[Math.floor(Math.random() * values.length)];
}

function shuffle<T>(values: readonly T[]): T[] {
  const copy = [...values];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}
