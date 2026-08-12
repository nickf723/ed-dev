import type { GeneratedPracticeQuestion } from "@/app/_components/GeneratedPractice";

type Relation = "<" | "≤" | ">" | "≥";

const RELATIONS: readonly Relation[] = ["<", "≤", ">", "≥"];
const COEFFICIENTS = [-4, -3, -2, 2, 3, 4] as const;

export function generateInequalityPracticeQuestion(): GeneratedPracticeQuestion {
  const mode = randomInt(0, 2);
  if (mode === 0) return generateSolveQuestion();
  if (mode === 1) return generateIntervalQuestion();
  return generateMembershipQuestion();
}

function generateSolveQuestion(): GeneratedPracticeQuestion {
  const coefficient = pick(COEFFICIENTS);
  const boundary = randomInt(-6, 6);
  const constant = randomInt(-5, 5);
  const relation = pick(RELATIONS);
  const rightSide = coefficient * boundary + constant;
  const solvedRelation = coefficient < 0 ? flipDirection(relation) : relation;
  const correctAnswer = `x ${solvedRelation} ${formatNumber(boundary)}`;

  const choices = makeChoices(correctAnswer, [
    `x ${flipDirection(solvedRelation)} ${formatNumber(boundary)}`,
    `x ${relation} ${formatNumber(boundary)}`,
    `x ${solvedRelation} ${formatNumber(-boundary)}`,
    `x ${flipDirection(solvedRelation)} ${formatNumber(-boundary)}`,
    `x ${solvedRelation} ${formatNumber(boundary + 1)}`,
    `x ${flipDirection(solvedRelation)} ${formatNumber(boundary + 1)}`,
    `x ${solvedRelation} ${formatNumber(boundary - 1)}`,
  ]);

  const moveText = constant === 0
    ? "The constant is already zero."
    : constant > 0
      ? `Subtract ${constant} from both sides.`
      : `Add ${Math.abs(constant)} to both sides.`;
  const reversal = coefficient < 0
    ? ` Dividing by ${coefficient} reverses ${relation} to ${solvedRelation}.`
    : ` Dividing by ${coefficient} keeps the inequality direction.`;

  return {
    id: `solve-${coefficient}-${constant}-${relation}-${rightSide}-${Math.random()}`,
    eyebrow: "Solve an inequality",
    prompt: `${formatLinearExpression(coefficient, constant)} ${relation} ${rightSide}`,
    choices,
    correctAnswer,
    explanation: `${moveText}${reversal} The boundary is ${formatNumber(boundary)}, so the solution is ${correctAnswer}.`,
  };
}

function generateIntervalQuestion(): GeneratedPracticeQuestion {
  const boundary = randomInt(-7, 7);
  const relation = pick(RELATIONS);
  const correctAnswer = intervalFor(boundary, relation);
  const choices = makeChoices(correctAnswer, [
    intervalFor(boundary, toggleInclusion(relation)),
    intervalFor(boundary, flipDirection(relation)),
    intervalFor(boundary, toggleInclusion(flipDirection(relation))),
    intervalFor(-boundary, relation),
    intervalFor(boundary + 1, relation),
  ]);

  return {
    id: `interval-${boundary}-${relation}-${Math.random()}`,
    eyebrow: "Translate the representation",
    prompt: `x ${relation} ${formatNumber(boundary)}  →  interval notation`,
    choices,
    correctAnswer,
    explanation: `${relation === "<" || relation === "≤" ? "The region extends left" : "The region extends right"}. ${relation === "≤" || relation === "≥" ? "The boundary is included, so it gets a bracket." : "The boundary is excluded, so it gets a parenthesis."}`,
  };
}

function generateMembershipQuestion(): GeneratedPracticeQuestion {
  const boundary = randomInt(-6, 6);
  const relation = pick(RELATIONS);
  const offset = pick([-3, -1, 0, 1, 3] as const);
  const candidate = boundary + offset;
  const belongs = compare(candidate, boundary, relation);
  const correctAnswer = belongs ? "Yes · belongs" : "No · outside";

  return {
    id: `member-${candidate}-${relation}-${boundary}-${Math.random()}`,
    eyebrow: "Test membership",
    prompt: `Does x = ${candidate} satisfy x ${relation} ${boundary}?`,
    choices: shuffle(["Yes · belongs", "No · outside"]),
    correctAnswer,
    explanation: `${candidate} ${relation} ${boundary} is ${belongs ? "true" : "false"}. ${candidate === boundary ? (relation === "≤" || relation === "≥" ? "This relation includes the boundary." : "A strict inequality excludes the boundary.") : "The candidate is simply tested against the stated region."}`,
  };
}

function intervalFor(boundary: number, relation: Relation) {
  const value = formatNumber(boundary);
  if (relation === ">") return `(${value}, ∞)`;
  if (relation === "≥") return `[${value}, ∞)`;
  if (relation === "<") return `(−∞, ${value})`;
  return `(−∞, ${value}]`;
}

function makeChoices(correct: string, candidates: string[]) {
  const choices = new Set<string>([correct]);
  for (const candidate of candidates) {
    if (choices.size >= 4) break;
    choices.add(candidate);
  }
  return shuffle(Array.from(choices));
}

function flipDirection(relation: Relation): Relation {
  if (relation === "<") return ">";
  if (relation === "≤") return "≥";
  if (relation === ">") return "<";
  return "≤";
}

function toggleInclusion(relation: Relation): Relation {
  if (relation === "<") return "≤";
  if (relation === "≤") return "<";
  if (relation === ">") return "≥";
  return ">";
}

function compare(left: number, right: number, relation: Relation) {
  if (relation === "<") return left < right;
  if (relation === "≤") return left <= right;
  if (relation === ">") return left > right;
  return left >= right;
}

function formatLinearExpression(a: number, c: number) {
  const ax = a === 1 ? "x" : a === -1 ? "−x" : `${a}x`;
  if (c === 0) return ax;
  return `${ax} ${c > 0 ? "+" : "−"} ${Math.abs(c)}`;
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
