export const SOCIOLOGY_DIRECT_BRANCH_IDS = [
  "social.sociology.interaction",
  "social.sociology.groups-networks",
  "social.sociology.institutions",
  "social.sociology.stratification",
  "social.sociology.demography",
  "social.sociology.social-change",
  "social.sociology.theory-methods",
] as const;

export type SociologyCell = 0 | 1 | 2;

export type SociologyGridMetrics = {
  satisfiedPercent: number;
  localSimilarityPercent: number;
  dissatisfied: number;
  agents: number;
};

export const SCHELLING_GRID_SIZE = 20;
export const SCHELLING_VACANCY_RATE = 0.12;
export const SCHELLING_INITIAL_SEED = 64;

function seededRandom(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

export function createSchellingGrid(
  seed = SCHELLING_INITIAL_SEED
): SociologyCell[] {
  const random = seededRandom(seed);
  return Array.from(
    { length: SCHELLING_GRID_SIZE * SCHELLING_GRID_SIZE },
    () => {
      const roll = random();
      if (roll < SCHELLING_VACANCY_RATE) return 0;
      return roll < SCHELLING_VACANCY_RATE + (1 - SCHELLING_VACANCY_RATE) / 2
        ? 1
        : 2;
    }
  );
}

export function analyzeSchellingGrid(
  grid: readonly SociologyCell[],
  threshold: number
): SociologyGridMetrics {
  let agents = 0;
  let satisfied = 0;
  let similaritySum = 0;
  let similarityCount = 0;
  let dissatisfied = 0;

  for (let index = 0; index < grid.length; index += 1) {
    const cell = grid[index];
    if (cell === 0) continue;
    agents += 1;
    const ratio = localSimilarity(grid, index, cell);
    if (ratio === null || ratio >= threshold) satisfied += 1;
    else dissatisfied += 1;
    if (ratio !== null) {
      similaritySum += ratio;
      similarityCount += 1;
    }
  }

  return {
    agents,
    dissatisfied,
    satisfiedPercent:
      agents === 0 ? 100 : Math.round((satisfied / agents) * 100),
    localSimilarityPercent:
      similarityCount === 0
        ? 100
        : Math.round((similaritySum / similarityCount) * 100),
  };
}

export function stepSchellingGrid(
  grid: readonly SociologyCell[],
  threshold: number,
  seed: number
): SociologyCell[] {
  const random = seededRandom(seed);
  const next = [...grid];
  const vacant = grid
    .map((cell, index) => (cell === 0 ? index : -1))
    .filter((index) => index >= 0);
  const movers = grid
    .map((cell, index) => {
      if (cell === 0) return -1;
      const ratio = localSimilarity(grid, index, cell);
      return ratio !== null && ratio < threshold ? index : -1;
    })
    .filter((index) => index >= 0);

  shuffleInPlace(movers, random);
  for (const source of movers) {
    if (vacant.length === 0) break;
    const agent = next[source];
    if (agent === 0) continue;
    const vacancyIndex = Math.floor(random() * vacant.length);
    const target = vacant[vacancyIndex];
    next[target] = agent;
    next[source] = 0;
    vacant[vacancyIndex] = source;
  }
  return next;
}

function localSimilarity(
  grid: readonly SociologyCell[],
  index: number,
  cell: Exclude<SociologyCell, 0>
) {
  const row = Math.floor(index / SCHELLING_GRID_SIZE);
  const column = index % SCHELLING_GRID_SIZE;
  let occupiedNeighbors = 0;
  let sameNeighbors = 0;

  for (let rowOffset = -1; rowOffset <= 1; rowOffset += 1) {
    for (let columnOffset = -1; columnOffset <= 1; columnOffset += 1) {
      if (rowOffset === 0 && columnOffset === 0) continue;
      const neighborRow = row + rowOffset;
      const neighborColumn = column + columnOffset;
      if (
        neighborRow < 0 ||
        neighborRow >= SCHELLING_GRID_SIZE ||
        neighborColumn < 0 ||
        neighborColumn >= SCHELLING_GRID_SIZE
      ) {
        continue;
      }
      const neighbor = grid[neighborRow * SCHELLING_GRID_SIZE + neighborColumn];
      if (neighbor === 0) continue;
      occupiedNeighbors += 1;
      if (neighbor === cell) sameNeighbors += 1;
    }
  }
  return occupiedNeighbors === 0 ? null : sameNeighbors / occupiedNeighbors;
}

function shuffleInPlace(values: number[], random: () => number) {
  for (let index = values.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [values[index], values[swapIndex]] = [values[swapIndex], values[index]];
  }
}

export const SOCIOLOGY_EVIDENCE_CASES = [
  {
    id: "emergence",
    prompt:
      "A clustered pattern appears after many local moves. What does the model establish?",
    options: [
      {
        id: "possibility",
        label:
          "It demonstrates one possible mechanism by which local rules can generate an aggregate pattern, not the unique cause of real segregation.",
      },
      {
        id: "attitudes",
        label: "It measures the actual attitudes of every household in a city.",
      },
      {
        id: "single-cause",
        label:
          "It proves institutions, law, wealth, and discrimination are irrelevant.",
      },
    ],
    correctOptionId: "possibility",
    success:
      "Correct. Generative models clarify possible mechanisms and implications under stated assumptions; empirical causal claims need additional evidence.",
    correction:
      "Keep the toy rule and real-world claim separate. A model can show sufficiency under assumptions without measuring attitudes or excluding other causes.",
  },
  {
    id: "rate-count",
    prompt:
      "Neighborhood A has 80 moves among 800 residents; B has 120 among 2,400. Which comparison is supported?",
    options: [
      {
        id: "rates",
        label:
          "A's move rate is 10% and B's is 5%, although B has the larger count.",
      },
      {
        id: "b-rate",
        label:
          "B necessarily has the larger move rate because 120 is larger than 80.",
      },
      { id: "causal", label: "The counts identify why residents moved." },
    ],
    correctOptionId: "rates",
    success:
      "Correct. Counts answer how many; rates attach the count to a population at risk. Neither alone identifies a cause.",
    correction:
      "Use the relevant denominator: 80/800 and 120/2,400. Then keep description separate from causal explanation.",
  },
  {
    id: "ecological",
    prompt:
      "A county with higher average income has higher association membership. What may be concluded about individuals?",
    options: [
      {
        id: "aggregate-only",
        label:
          "The county-level association is descriptive at that scale; it does not by itself show that higher-income individuals are the members.",
      },
      {
        id: "individual",
        label: "Every higher-income individual belongs to more associations.",
      },
      { id: "mechanism", label: "Income is proven to be the sole mechanism." },
    ],
    correctOptionId: "aggregate-only",
    success:
      "Correct. Avoid an ecological inference from an aggregate relationship to individual behavior without individual-level evidence.",
    correction:
      "Match the inference to the unit of analysis. County averages cannot alone identify which individuals hold the measured trait or behavior.",
  },
  {
    id: "network",
    prompt:
      "Two people are connected in a network dataset. What must be specified before interpreting the edge?",
    options: [
      {
        id: "relation",
        label:
          "The relation, direction, weight, time window, sampling boundary, and missing-tie rules.",
      },
      { id: "friendship", label: "Every edge means mutual friendship." },
      {
        id: "influence",
        label: "The edge proves influence flows in both directions.",
      },
    ],
    correctOptionId: "relation",
    success:
      "Correct. A network edge is a measured or coded relation, not a universal social fact with one meaning.",
    correction:
      "Define what an edge records and which nodes and ties could enter the dataset before reasoning about cohesion, diffusion, or influence.",
  },
] as const;

export function isSociologyEvidenceAnswerCorrect(
  caseId: string,
  optionId: string
) {
  return (
    SOCIOLOGY_EVIDENCE_CASES.find((item) => item.id === caseId)
      ?.correctOptionId === optionId
  );
}
