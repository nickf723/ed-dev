export type Strategy = "bfs" | "dfs";

export type TraversalState = {
  frontier: string[];
  discovered: string[];
  visited: string[];
  current: string | null;
  done: boolean;
};

export type GraphNode = {
  id: string;
  x: number;
  y: number;
};

export const GRAPH_NODES: GraphNode[] = [
  { id: "A", x: 78, y: 154 },
  { id: "B", x: 218, y: 72 },
  { id: "C", x: 218, y: 236 },
  { id: "D", x: 372, y: 42 },
  { id: "E", x: 372, y: 132 },
  { id: "F", x: 372, y: 250 },
  { id: "G", x: 532, y: 178 },
];

export const GRAPH_EDGES: Array<[string, string]> = [
  ["A", "B"],
  ["A", "C"],
  ["B", "D"],
  ["B", "E"],
  ["C", "F"],
  ["E", "G"],
  ["F", "G"],
];

const ADJACENCY: Record<string, string[]> = {
  A: ["B", "C"],
  B: ["A", "D", "E"],
  C: ["A", "F"],
  D: ["B"],
  E: ["B", "G"],
  F: ["C", "G"],
  G: ["E", "F"],
};

export function initialTraversal(start: string): TraversalState {
  return {
    frontier: [start],
    discovered: [start],
    visited: [],
    current: null,
    done: false,
  };
}

export function advanceTraversal(
  state: TraversalState,
  strategy: Strategy,
): TraversalState {
  if (state.done || state.frontier.length === 0) {
    return { ...state, current: null, done: true };
  }

  const frontier = [...state.frontier];
  const current = strategy === "bfs" ? frontier.shift() : frontier.pop();
  if (!current) return { ...state, current: null, done: true };

  const discovered = new Set(state.discovered);
  const neighbors = (ADJACENCY[current] ?? []).filter(
    (neighbor) => !discovered.has(neighbor),
  );
  const additions = strategy === "dfs" ? [...neighbors].reverse() : neighbors;
  additions.forEach((neighbor) => discovered.add(neighbor));
  frontier.push(...additions);
  const visited = [...state.visited, current];

  return {
    frontier,
    discovered: [...discovered],
    visited,
    current,
    done: frontier.length === 0 && visited.length === GRAPH_NODES.length,
  };
}

export type SortState = {
  values: number[];
  pass: number;
  index: number;
  comparisons: number;
  swaps: number;
  active: [number, number] | null;
  done: boolean;
};

export const DEFAULT_VALUES = [7, 2, 9, 4, 1, 8, 3, 6];

export function initialSort(values: number[]): SortState {
  return {
    values: [...values],
    pass: 0,
    index: 0,
    comparisons: 0,
    swaps: 0,
    active: [0, 1],
    done: false,
  };
}

export function advanceBubbleSort(state: SortState): SortState {
  if (state.done) return state;

  const values = [...state.values];
  const left = state.index;
  const right = left + 1;
  let swaps = state.swaps;

  if (values[left] > values[right]) {
    [values[left], values[right]] = [values[right], values[left]];
    swaps += 1;
  }

  let pass = state.pass;
  let index = state.index + 1;
  if (index >= values.length - 1 - pass) {
    pass += 1;
    index = 0;
  }

  const done = pass >= values.length - 1;
  return {
    values,
    pass,
    index,
    comparisons: state.comparisons + 1,
    swaps,
    active: done ? null : [index, index + 1],
    done,
  };
}

export function shuffleValues(values: number[]): number[] {
  const next = [...values];
  for (let index = next.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [next[index], next[swapIndex]] = [next[swapIndex], next[index]];
  }
  return next;
}

export type GrowthKind =
  | "constant"
  | "log"
  | "linear"
  | "nlogn"
  | "quadratic";

export type GrowthOption = {
  id: GrowthKind;
  label: string;
  notation: string;
  rgb: string;
  count: (n: number) => number;
};

export const GROWTH_OPTIONS: GrowthOption[] = [
  {
    id: "constant",
    label: "Constant",
    notation: "O(1)",
    rgb: "52,211,153",
    count: () => 1,
  },
  {
    id: "log",
    label: "Logarithmic",
    notation: "O(log n)",
    rgb: "34,211,238",
    count: (n) => Math.ceil(Math.log2(Math.max(2, n))),
  },
  {
    id: "linear",
    label: "Linear",
    notation: "O(n)",
    rgb: "96,165,250",
    count: (n) => n,
  },
  {
    id: "nlogn",
    label: "Linearithmic",
    notation: "O(n log n)",
    rgb: "167,139,250",
    count: (n) => Math.ceil(n * Math.log2(Math.max(2, n))),
  },
  {
    id: "quadratic",
    label: "Quadratic",
    notation: "O(n²)",
    rgb: "244,114,182",
    count: (n) => n * n,
  },
];

export function growthOption(kind: GrowthKind): GrowthOption {
  return (
    GROWTH_OPTIONS.find((option) => option.id === kind) ?? GROWTH_OPTIONS[0]
  );
}

export function formatCount(value: number): string {
  return value >= 1000 ? value.toLocaleString() : String(value);
}
