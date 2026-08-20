export type HanoiPeg = "A" | "B" | "C";

export type HanoiMove = {
  index: number;
  disk: number;
  from: HanoiPeg;
  to: HanoiPeg;
  depth: number;
  phase: "base" | "transfer";
};

export type HanoiDisk = {
  size: number;
  label: string;
  tone: "cyan" | "violet" | "rose" | "amber" | "emerald";
};

export type HanoiTowers = Record<HanoiPeg, readonly number[]>;

export const HANOI_PEGS: readonly HanoiPeg[] = ["A", "B", "C"];

export const HANOI_DISKS: readonly HanoiDisk[] = [
  { size: 1, label: "1", tone: "cyan" },
  { size: 2, label: "2", tone: "violet" },
  { size: 3, label: "3", tone: "rose" },
  { size: 4, label: "4", tone: "amber" },
  { size: 5, label: "5", tone: "emerald" },
] as const;

export const CANONICAL_RECURSION_CASE = {
  diskCount: 3,
  source: "A" as HanoiPeg,
  auxiliary: "B" as HanoiPeg,
  target: "C" as HanoiPeg,
};

export function hanoiMoveCount(diskCount: number): number {
  assertDiskCount(diskCount, 1, 30);
  return 2 ** diskCount - 1;
}

export function generateHanoiMoves(
  diskCount: number,
  source: HanoiPeg = "A",
  auxiliary: HanoiPeg = "B",
  target: HanoiPeg = "C"
): readonly HanoiMove[] {
  assertDiskCount(diskCount, 1, 12);

  const moves: HanoiMove[] = [];

  const moveStack = (
    count: number,
    from: HanoiPeg,
    spare: HanoiPeg,
    to: HanoiPeg,
    depth: number
  ) => {
    if (count === 1) {
      moves.push({
        index: moves.length + 1,
        disk: 1,
        from,
        to,
        depth,
        phase: "base",
      });
      return;
    }

    moveStack(count - 1, from, to, spare, depth + 1);
    moves.push({
      index: moves.length + 1,
      disk: count,
      from,
      to,
      depth,
      phase: "transfer",
    });
    moveStack(count - 1, spare, from, to, depth + 1);
  };

  moveStack(diskCount, source, auxiliary, target, 0);
  return moves;
}

export const CANONICAL_HANOI_MOVES = generateHanoiMoves(
  CANONICAL_RECURSION_CASE.diskCount,
  CANONICAL_RECURSION_CASE.source,
  CANONICAL_RECURSION_CASE.auxiliary,
  CANONICAL_RECURSION_CASE.target
);

export function createHanoiTowers(diskCount: number): HanoiTowers {
  assertDiskCount(diskCount, 1, 12);
  return {
    A: Array.from({ length: diskCount }, (_, index) => diskCount - index),
    B: [],
    C: [],
  };
}

export function applyHanoiMove(
  towers: HanoiTowers,
  move: Pick<HanoiMove, "disk" | "from" | "to">
): HanoiTowers {
  const next = cloneTowers(towers);
  const disk = next[move.from].at(-1);

  if (disk !== move.disk) {
    throw new Error(
      `Move expected disk ${move.disk} on peg ${move.from}, found ${String(disk)}.`
    );
  }

  const destinationTop = next[move.to].at(-1);
  if (destinationTop !== undefined && destinationTop < disk) {
    throw new Error("A larger disk cannot be placed on a smaller disk.");
  }

  next[move.from].pop();
  next[move.to].push(disk);
  return next;
}

export function towersAfterMoves(
  diskCount: number,
  moves: readonly HanoiMove[],
  completedMoves: number
): HanoiTowers {
  if (!Number.isInteger(completedMoves) || completedMoves < 0) {
    throw new Error("Completed move count must be a nonnegative integer.");
  }

  return moves
    .slice(0, completedMoves)
    .reduce<HanoiTowers>(
      (towers, move) => applyHanoiMove(towers, move),
      createHanoiTowers(diskCount)
    );
}

export function tryManualHanoiMove(
  towers: HanoiTowers,
  from: HanoiPeg,
  to: HanoiPeg
):
  | { ok: true; towers: HanoiTowers; disk: number }
  | { ok: false; reason: "empty" | "same-peg" | "larger-on-smaller" } {
  if (from === to) return { ok: false, reason: "same-peg" };

  const disk = towers[from].at(-1);
  if (disk === undefined) return { ok: false, reason: "empty" };

  const destinationTop = towers[to].at(-1);
  if (destinationTop !== undefined && destinationTop < disk) {
    return { ok: false, reason: "larger-on-smaller" };
  }

  return {
    ok: true,
    towers: applyHanoiMove(towers, { disk, from, to }),
    disk,
  };
}

export type RecursionPracticeCase = {
  seed: number;
  diskCount: number;
  prompt: string;
  answer: number;
  explanation: string;
};

const PRACTICE_PROMPTS = [
  (diskCount: number) =>
    `A Tower of Hanoi puzzle begins with ${diskCount} disks. What is the minimum number of legal moves?`,
  (diskCount: number) =>
    `The recursive solver receives a stack of ${diskCount} disks. How many disk transfers appear in its complete trace?`,
  (diskCount: number) =>
    `For H(${diskCount}), count both H(${diskCount - 1}) subproblems and the one largest-disk move. What total do you get?`,
] as const;

export function generatedRecursionPracticeCase(
  seed: number
): RecursionPracticeCase {
  if (!Number.isInteger(seed)) {
    throw new Error("Practice seed must be an integer.");
  }

  const normalizedSeed = ((seed % 97) + 97) % 97;
  const diskCount = 2 + (normalizedSeed % 7);
  const answer = hanoiMoveCount(diskCount);
  const prior = hanoiMoveCount(diskCount - 1);

  return {
    seed: normalizedSeed,
    diskCount,
    prompt:
      PRACTICE_PROMPTS[normalizedSeed % PRACTICE_PROMPTS.length](diskCount),
    answer,
    explanation: `T(${diskCount}) = 2 · T(${diskCount - 1}) + 1 = 2 · ${prior} + 1 = ${answer}.`,
  };
}

function cloneTowers(towers: HanoiTowers): Record<HanoiPeg, number[]> {
  return {
    A: [...towers.A],
    B: [...towers.B],
    C: [...towers.C],
  };
}

function assertDiskCount(value: number, minimum: number, maximum: number) {
  if (!Number.isInteger(value) || value < minimum || value > maximum) {
    throw new Error(
      `Disk count must be an integer from ${minimum} through ${maximum}.`
    );
  }
}
