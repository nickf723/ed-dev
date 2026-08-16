export const PAGE_FOUNDRY_VERSION = 1 as const;

export const FOUNDRY_STATUSES = [
  "queued",
  "briefing",
  "building",
  "extracting",
  "validating",
  "committed",
  "review",
  "released",
  "paused",
  "blocked",
] as const;
export const FOUNDRY_PRIORITIES = ["urgent", "high", "normal", "low"] as const;
export const FOUNDRY_PAGE_TYPES = [
  "subject-hub",
  "branch-hub",
  "unit",
  "lesson",
  "reference",
  "collection",
  "tool",
] as const;
export const FOUNDRY_DATA_KINDS = ["none", "curated", "api", "hybrid"] as const;
export const FOUNDRY_CONTRIBUTION_KINDS = [
  "topology",
  "background",
  "widget",
  "adapter",
  "card-grammar",
  "instrument",
  "design-token",
] as const;
export const FOUNDRY_SCOPES = ["page", "branch", "domain", "global"] as const;
export const FOUNDRY_CONTRIBUTION_STATUSES = [
  "planned",
  "extracted",
  "registered",
  "page-specific",
] as const;

export type FoundryStatus = (typeof FOUNDRY_STATUSES)[number];
export type FoundryPriority = (typeof FOUNDRY_PRIORITIES)[number];
export type FoundryPageType = (typeof FOUNDRY_PAGE_TYPES)[number];
export type FoundryDataKind = (typeof FOUNDRY_DATA_KINDS)[number];
export type FoundryContributionKind = (typeof FOUNDRY_CONTRIBUTION_KINDS)[number];
export type FoundryScope = (typeof FOUNDRY_SCOPES)[number];
export type FoundryContributionStatus =
  (typeof FOUNDRY_CONTRIBUTION_STATUSES)[number];

export type FoundryDataSource = {
  kind: FoundryDataKind;
  label: string;
  provider?: string;
  endpoint?: string;
  adapter?: string;
};

export type FoundryVisualBrief = {
  topology: string;
  evocation: string;
  backgroundMood: string;
  backgroundMeaning: string;
  backgroundMotion: string;
  avoid: string[];
  interaction: string;
};

export type FoundryContribution = {
  id: string;
  kind: FoundryContributionKind;
  label: string;
  description: string;
  scope: FoundryScope;
  status: FoundryContributionStatus;
};

export type FoundryPageBrief = {
  id: string;
  title: string;
  parentNodeId: string;
  parentLabel: string;
  route: string;
  status: FoundryStatus;
  priority: FoundryPriority;
  pageType: FoundryPageType;
  organizingPrinciple: string;
  learnerQuestion: string;
  contentScope: string[];
  dataSource: FoundryDataSource;
  visual: FoundryVisualBrief;
  studioContributions: FoundryContribution[];
  qualityGates: string[];
  blockers: string[];
  notes: string;
  commit?: string;
  createdAt: string;
  updatedAt?: string;
};

export type FoundryPattern = {
  id: string;
  label: string;
  kind: FoundryContributionKind;
  sourcePage: string;
  scope: FoundryScope;
  status: "candidate" | "registered" | "deprecated";
  description: string;
};

export type FoundrySettings = {
  batchSize: 1 | 3 | 5;
  pauseAfterEach: boolean;
  continueThroughNonBlocked: boolean;
  commitPerPage: boolean;
  previewAfterBatch: boolean;
  stopConditions: string[];
};

export type FoundryActiveRun = {
  id: string;
  itemIds: string[];
  status: "prepared" | "running" | "paused" | "complete";
  preparedAt: string;
  command: string;
};

export type PageFoundryQueue = {
  version: typeof PAGE_FOUNDRY_VERSION;
  title: string;
  description: string;
  settings: FoundrySettings;
  items: FoundryPageBrief[];
  patterns: FoundryPattern[];
  activeRun?: FoundryActiveRun;
};

export type FoundryValidation = { ok: boolean; errors: string[] };

function record(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function text(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}
function strings(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(text);
}
function oneOf(value: unknown, choices: readonly string[]) {
  return choices.includes(String(value));
}
function uniqueIds(values: unknown[], path: string, errors: string[]) {
  const ids = values
    .filter(record)
    .map((value) => value.id)
    .filter((id): id is string => typeof id === "string");
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  for (const id of new Set(duplicates)) errors.push(`${path} contains duplicate id "${id}"`);
}

function validateContribution(value: unknown, path: string, errors: string[]) {
  if (!record(value)) return errors.push(`${path} must be an object`);
  for (const key of ["id", "label", "description"] as const) {
    if (!text(value[key])) errors.push(`${path}.${key} must be a non-empty string`);
  }
  if (!oneOf(value.kind, FOUNDRY_CONTRIBUTION_KINDS)) errors.push(`${path}.kind is invalid`);
  if (!oneOf(value.scope, FOUNDRY_SCOPES)) errors.push(`${path}.scope is invalid`);
  if (!oneOf(value.status, FOUNDRY_CONTRIBUTION_STATUSES)) errors.push(`${path}.status is invalid`);
}

function validateBrief(value: unknown, index: number, errors: string[]) {
  const path = `items[${index}]`;
  if (!record(value)) return errors.push(`${path} must be an object`);
  for (const key of [
    "id",
    "title",
    "parentNodeId",
    "parentLabel",
    "route",
    "organizingPrinciple",
    "learnerQuestion",
  ] as const) {
    if (!text(value[key])) errors.push(`${path}.${key} must be a non-empty string`);
  }
  if (!oneOf(value.status, FOUNDRY_STATUSES)) errors.push(`${path}.status is invalid`);
  if (!oneOf(value.priority, FOUNDRY_PRIORITIES)) errors.push(`${path}.priority is invalid`);
  if (!oneOf(value.pageType, FOUNDRY_PAGE_TYPES)) errors.push(`${path}.pageType is invalid`);
  if (!strings(value.contentScope)) errors.push(`${path}.contentScope must be a string array`);
  if (!strings(value.qualityGates)) errors.push(`${path}.qualityGates must be a string array`);
  if (!strings(value.blockers)) errors.push(`${path}.blockers must be a string array`);
  if (typeof value.notes !== "string") errors.push(`${path}.notes must be a string`);
  if (value.commit !== undefined && !text(value.commit)) errors.push(`${path}.commit must be non-empty when provided`);
  if (!text(value.createdAt)) errors.push(`${path}.createdAt is required`);
  if (value.updatedAt !== undefined && !text(value.updatedAt)) errors.push(`${path}.updatedAt must be non-empty when provided`);

  if (!record(value.dataSource)) {
    errors.push(`${path}.dataSource must be an object`);
  } else {
    if (!oneOf(value.dataSource.kind, FOUNDRY_DATA_KINDS)) errors.push(`${path}.dataSource.kind is invalid`);
    if (!text(value.dataSource.label)) errors.push(`${path}.dataSource.label is required`);
  }

  if (!record(value.visual)) {
    errors.push(`${path}.visual must be an object`);
  } else {
    for (const key of [
      "topology",
      "evocation",
      "backgroundMood",
      "backgroundMeaning",
      "backgroundMotion",
      "interaction",
    ] as const) {
      if (!text(value.visual[key])) errors.push(`${path}.visual.${key} is required`);
    }
    if (!strings(value.visual.avoid)) errors.push(`${path}.visual.avoid must be a string array`);
  }

  if (!Array.isArray(value.studioContributions)) {
    errors.push(`${path}.studioContributions must be an array`);
  } else {
    value.studioContributions.forEach((item, itemIndex) =>
      validateContribution(item, `${path}.studioContributions[${itemIndex}]`, errors),
    );
    uniqueIds(value.studioContributions, `${path}.studioContributions`, errors);
  }
}

export function validatePageFoundryQueue(input: unknown): FoundryValidation {
  const errors: string[] = [];
  if (!record(input)) return { ok: false, errors: ["Foundry queue must be an object"] };
  if (input.version !== PAGE_FOUNDRY_VERSION) errors.push(`version must equal ${PAGE_FOUNDRY_VERSION}`);
  if (!text(input.title)) errors.push("title is required");
  if (!text(input.description)) errors.push("description is required");

  if (!record(input.settings)) {
    errors.push("settings must be an object");
  } else {
    if (![1, 3, 5].includes(Number(input.settings.batchSize))) errors.push("settings.batchSize must be 1, 3, or 5");
    for (const key of [
      "pauseAfterEach",
      "continueThroughNonBlocked",
      "commitPerPage",
      "previewAfterBatch",
    ] as const) {
      if (typeof input.settings[key] !== "boolean") errors.push(`settings.${key} must be boolean`);
    }
    if (!strings(input.settings.stopConditions)) errors.push("settings.stopConditions must be a string array");
  }

  if (!Array.isArray(input.items)) {
    errors.push("items must be an array");
  } else {
    input.items.forEach((item, index) => validateBrief(item, index, errors));
    uniqueIds(input.items, "items", errors);
  }

  if (!Array.isArray(input.patterns)) {
    errors.push("patterns must be an array");
  } else {
    input.patterns.forEach((pattern, index) => {
      const path = `patterns[${index}]`;
      if (!record(pattern)) return errors.push(`${path} must be an object`);
      for (const key of ["id", "label", "sourcePage", "description"] as const) {
        if (!text(pattern[key])) errors.push(`${path}.${key} is required`);
      }
      if (!oneOf(pattern.kind, FOUNDRY_CONTRIBUTION_KINDS)) errors.push(`${path}.kind is invalid`);
      if (!oneOf(pattern.scope, FOUNDRY_SCOPES)) errors.push(`${path}.scope is invalid`);
      if (!oneOf(pattern.status, ["candidate", "registered", "deprecated"])) errors.push(`${path}.status is invalid`);
    });
    uniqueIds(input.patterns, "patterns", errors);
  }

  return { ok: errors.length === 0, errors };
}

export function parsePageFoundryQueue(input: unknown): PageFoundryQueue {
  const validation = validatePageFoundryQueue(input);
  if (!validation.ok) {
    throw new Error(`Invalid Page Foundry queue:\n${validation.errors.map((error) => `- ${error}`).join("\n")}`);
  }
  return input as PageFoundryQueue;
}
