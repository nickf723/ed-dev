export const PAGE_RECIPE_VERSION = 1 as const;

export type PageDepth =
  | "subject-hub"
  | "branch-hub"
  | "unit"
  | "lesson"
  | "reference";

export type PageDensity = "compact" | "balanced" | "spacious";
export type PageSurface = "clear" | "glass" | "dense-glass";
export type PagePanelRadius = "md" | "lg" | "xl";
export type PageSectionGap = "sm" | "md" | "lg";
export type PageMotion = "off" | "subtle" | "expressive";
export type PageLinkStatus = "active" | "planned";

export type PageBreadcrumb = {
  label: string;
  href?: string;
};

export type PageIdentity = {
  title: string;
  eyebrow: string;
  subtitle: string;
  icon: string;
  breadcrumbs?: PageBreadcrumb[];
};

export type PageTheme = {
  family: string;
  accentRgb: string;
  background: string;
  backgroundStrength: number;
  density: PageDensity;
  surface: PageSurface;
  surfaceOpacity: number;
  panelRadius: PagePanelRadius;
  sectionGap: PageSectionGap;
  motion: PageMotion;
};

export type RecipeLink = {
  id: string;
  nodeId?: string;
  label: string;
  summary: string;
  icon: string;
  accentRgb: string;
  href?: string;
  status?: PageLinkStatus;
  tags?: string[];
};

export type LensVisual = "timeline" | "map" | "network";

export type LensItem = RecipeLink & {
  question: string;
  visual: LensVisual;
};

export type MultipleLensesOrganization = {
  kind: "multiple-lenses";
  eyebrow: string;
  title: string;
  description: string;
  items: LensItem[];
};

export type RegimeVisual = "classical" | "modern" | "neutral";

export type RegimeGroup = {
  id: string;
  label: string;
  kicker: string;
  condition: string;
  description: string;
  accentRgb: string;
  visual: RegimeVisual;
  items: RecipeLink[];
};

export type SplitRegimesOrganization = {
  kind: "split-regimes";
  groups: RegimeGroup[];
};

export type PageOrganization =
  | MultipleLensesOrganization
  | SplitRegimesOrganization;

export type CaseStudyColumn = {
  id: string;
  label: string;
  question: string;
  answer: string;
  accentRgb: string;
};

export type CaseStudySection = {
  id: string;
  type: "case-study";
  eyebrow: string;
  title: string;
  summary: string;
  icon: string;
  columns: CaseStudyColumn[];
};

export type ModelChoice = {
  id: string;
  question: string;
  answer: string;
  detail: string;
  icon: string;
  accentRgb: string;
};

export type ModelGuideSection = {
  id: string;
  type: "model-guide";
  eyebrow: string;
  title: string;
  summary: string;
  icon: string;
  choices: ModelChoice[];
};

export type PageSection = CaseStudySection | ModelGuideSection;

export type PageRecipe = {
  version: typeof PAGE_RECIPE_VERSION;
  id: string;
  nodeId: string;
  route: string;
  depth: PageDepth;
  identity: PageIdentity;
  theme: PageTheme;
  organization: PageOrganization;
  sections: PageSection[];
};

export type PageRecipeValidation = {
  ok: boolean;
  errors: string[];
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function isRgb(value: unknown): value is string {
  if (typeof value !== "string") return false;
  const parts = value.split(",").map((part) => Number(part.trim()));
  return parts.length === 3 && parts.every((part) => Number.isInteger(part) && part >= 0 && part <= 255);
}

function requireString(
  value: Record<string, unknown>,
  key: string,
  path: string,
  errors: string[],
) {
  if (!isString(value[key])) errors.push(`${path}.${key} must be a non-empty string`);
}

function requireRgb(
  value: Record<string, unknown>,
  key: string,
  path: string,
  errors: string[],
) {
  if (!isRgb(value[key])) errors.push(`${path}.${key} must be an RGB string such as "217, 119, 6"`);
}

function validateRecipeLink(value: unknown, path: string, errors: string[]) {
  if (!isRecord(value)) {
    errors.push(`${path} must be an object`);
    return;
  }

  requireString(value, "id", path, errors);
  requireString(value, "label", path, errors);
  requireString(value, "summary", path, errors);
  requireString(value, "icon", path, errors);
  requireRgb(value, "accentRgb", path, errors);

  if (value.nodeId !== undefined && !isString(value.nodeId)) {
    errors.push(`${path}.nodeId must be a non-empty string when provided`);
  }
  if (value.href !== undefined && !isString(value.href)) {
    errors.push(`${path}.href must be a non-empty string when provided`);
  }
  if (value.status !== undefined && value.status !== "active" && value.status !== "planned") {
    errors.push(`${path}.status must be "active" or "planned"`);
  }
  if (value.tags !== undefined) {
    if (!Array.isArray(value.tags) || value.tags.some((tag) => !isString(tag))) {
      errors.push(`${path}.tags must be an array of non-empty strings`);
    }
  }
}

function validateOrganization(value: unknown, errors: string[]) {
  if (!isRecord(value)) {
    errors.push("organization must be an object");
    return;
  }

  if (value.kind === "multiple-lenses") {
    requireString(value, "eyebrow", "organization", errors);
    requireString(value, "title", "organization", errors);
    requireString(value, "description", "organization", errors);
    if (!Array.isArray(value.items) || value.items.length === 0) {
      errors.push("organization.items must contain at least one lens");
      return;
    }
    value.items.forEach((item, index) => {
      const path = `organization.items[${index}]`;
      validateRecipeLink(item, path, errors);
      if (!isRecord(item)) return;
      requireString(item, "question", path, errors);
      if (item.visual !== "timeline" && item.visual !== "map" && item.visual !== "network") {
        errors.push(`${path}.visual must be timeline, map, or network`);
      }
    });
    return;
  }

  if (value.kind === "split-regimes") {
    if (!Array.isArray(value.groups) || value.groups.length === 0) {
      errors.push("organization.groups must contain at least one regime");
      return;
    }
    value.groups.forEach((group, groupIndex) => {
      const path = `organization.groups[${groupIndex}]`;
      if (!isRecord(group)) {
        errors.push(`${path} must be an object`);
        return;
      }
      requireString(group, "id", path, errors);
      requireString(group, "label", path, errors);
      requireString(group, "kicker", path, errors);
      requireString(group, "condition", path, errors);
      requireString(group, "description", path, errors);
      requireRgb(group, "accentRgb", path, errors);
      if (group.visual !== "classical" && group.visual !== "modern" && group.visual !== "neutral") {
        errors.push(`${path}.visual must be classical, modern, or neutral`);
      }
      if (!Array.isArray(group.items) || group.items.length === 0) {
        errors.push(`${path}.items must contain at least one field`);
        return;
      }
      group.items.forEach((item, itemIndex) =>
        validateRecipeLink(item, `${path}.items[${itemIndex}]`, errors),
      );
    });
    return;
  }

  errors.push("organization.kind must be multiple-lenses or split-regimes");
}

function validateSections(value: unknown, errors: string[]) {
  if (!Array.isArray(value)) {
    errors.push("sections must be an array");
    return;
  }

  value.forEach((section, index) => {
    const path = `sections[${index}]`;
    if (!isRecord(section)) {
      errors.push(`${path} must be an object`);
      return;
    }
    requireString(section, "id", path, errors);
    requireString(section, "eyebrow", path, errors);
    requireString(section, "title", path, errors);
    requireString(section, "summary", path, errors);
    requireString(section, "icon", path, errors);

    if (section.type === "case-study") {
      if (!Array.isArray(section.columns) || section.columns.length === 0) {
        errors.push(`${path}.columns must contain at least one column`);
        return;
      }
      section.columns.forEach((column, columnIndex) => {
        const columnPath = `${path}.columns[${columnIndex}]`;
        if (!isRecord(column)) {
          errors.push(`${columnPath} must be an object`);
          return;
        }
        requireString(column, "id", columnPath, errors);
        requireString(column, "label", columnPath, errors);
        requireString(column, "question", columnPath, errors);
        requireString(column, "answer", columnPath, errors);
        requireRgb(column, "accentRgb", columnPath, errors);
      });
      return;
    }

    if (section.type === "model-guide") {
      if (!Array.isArray(section.choices) || section.choices.length === 0) {
        errors.push(`${path}.choices must contain at least one choice`);
        return;
      }
      section.choices.forEach((choice, choiceIndex) => {
        const choicePath = `${path}.choices[${choiceIndex}]`;
        if (!isRecord(choice)) {
          errors.push(`${choicePath} must be an object`);
          return;
        }
        requireString(choice, "id", choicePath, errors);
        requireString(choice, "question", choicePath, errors);
        requireString(choice, "answer", choicePath, errors);
        requireString(choice, "detail", choicePath, errors);
        requireString(choice, "icon", choicePath, errors);
        requireRgb(choice, "accentRgb", choicePath, errors);
      });
      return;
    }

    errors.push(`${path}.type must be case-study or model-guide`);
  });
}

export function validatePageRecipe(input: unknown): PageRecipeValidation {
  const errors: string[] = [];
  if (!isRecord(input)) return { ok: false, errors: ["Recipe must be an object"] };

  if (input.version !== PAGE_RECIPE_VERSION) {
    errors.push(`version must equal ${PAGE_RECIPE_VERSION}`);
  }

  requireString(input, "id", "recipe", errors);
  requireString(input, "nodeId", "recipe", errors);
  requireString(input, "route", "recipe", errors);

  if (
    input.depth !== "subject-hub" &&
    input.depth !== "branch-hub" &&
    input.depth !== "unit" &&
    input.depth !== "lesson" &&
    input.depth !== "reference"
  ) {
    errors.push("depth must be a supported page depth");
  }

  if (!isRecord(input.identity)) {
    errors.push("identity must be an object");
  } else {
    requireString(input.identity, "title", "identity", errors);
    requireString(input.identity, "eyebrow", "identity", errors);
    requireString(input.identity, "subtitle", "identity", errors);
    requireString(input.identity, "icon", "identity", errors);
    if (input.identity.breadcrumbs !== undefined) {
      if (!Array.isArray(input.identity.breadcrumbs)) {
        errors.push("identity.breadcrumbs must be an array");
      } else {
        input.identity.breadcrumbs.forEach((crumb, index) => {
          const path = `identity.breadcrumbs[${index}]`;
          if (!isRecord(crumb)) {
            errors.push(`${path} must be an object`);
            return;
          }
          requireString(crumb, "label", path, errors);
          if (crumb.href !== undefined && !isString(crumb.href)) {
            errors.push(`${path}.href must be a non-empty string when provided`);
          }
        });
      }
    }
  }

  if (!isRecord(input.theme)) {
    errors.push("theme must be an object");
  } else {
    requireString(input.theme, "family", "theme", errors);
    requireString(input.theme, "background", "theme", errors);
    requireRgb(input.theme, "accentRgb", "theme", errors);

    if (!isFiniteNumber(input.theme.backgroundStrength) || input.theme.backgroundStrength < 0 || input.theme.backgroundStrength > 2) {
      errors.push("theme.backgroundStrength must be between 0 and 2");
    }
    if (!isFiniteNumber(input.theme.surfaceOpacity) || input.theme.surfaceOpacity < 0 || input.theme.surfaceOpacity > 0.8) {
      errors.push("theme.surfaceOpacity must be between 0 and 0.8");
    }
    if (input.theme.density !== "compact" && input.theme.density !== "balanced" && input.theme.density !== "spacious") {
      errors.push("theme.density must be compact, balanced, or spacious");
    }
    if (input.theme.surface !== "clear" && input.theme.surface !== "glass" && input.theme.surface !== "dense-glass") {
      errors.push("theme.surface must be clear, glass, or dense-glass");
    }
    if (input.theme.panelRadius !== "md" && input.theme.panelRadius !== "lg" && input.theme.panelRadius !== "xl") {
      errors.push("theme.panelRadius must be md, lg, or xl");
    }
    if (input.theme.sectionGap !== "sm" && input.theme.sectionGap !== "md" && input.theme.sectionGap !== "lg") {
      errors.push("theme.sectionGap must be sm, md, or lg");
    }
    if (input.theme.motion !== "off" && input.theme.motion !== "subtle" && input.theme.motion !== "expressive") {
      errors.push("theme.motion must be off, subtle, or expressive");
    }
  }

  validateOrganization(input.organization, errors);
  validateSections(input.sections, errors);

  return { ok: errors.length === 0, errors };
}

export function parsePageRecipe(input: unknown): PageRecipe {
  const validation = validatePageRecipe(input);
  if (!validation.ok) {
    throw new Error(`Invalid page recipe:\n${validation.errors.map((error) => `- ${error}`).join("\n")}`);
  }
  return input as PageRecipe;
}
