export const GLOBAL_DESIGN_SYSTEM_VERSION = 1 as const;

export const DESIGN_ACCENT_ROLES = [
  "primary",
  "secondary",
  "tertiary",
  "quaternary",
  "success",
  "warning",
  "danger",
] as const;

export const DESIGN_SURFACE_ROLES = [
  "background",
  "surface",
  "text",
  "muted",
  "border",
] as const;

export type DesignAccentRole = (typeof DESIGN_ACCENT_ROLES)[number];
export type DesignSurfaceRole = (typeof DESIGN_SURFACE_ROLES)[number];
export type DesignColorRole = DesignAccentRole | DesignSurfaceRole;

export type DesignPaletteRoles = Record<DesignColorRole, string>;

export type DesignPalette = {
  id: string;
  label: string;
  description: string;
  roles: DesignPaletteRoles;
};

export type DesignFontFamily = "serif" | "sans" | "mono";
export type DesignTitleCase = "natural" | "uppercase";
export type DesignEyebrowStyle = "dot" | "rule" | "pill" | "plain";

export type DesignTypographyPreset = {
  id: string;
  label: string;
  description: string;
  displayFont: DesignFontFamily;
  bodyFont: DesignFontFamily;
  titleCase: DesignTitleCase;
  eyebrowStyle: DesignEyebrowStyle;
};

export type GlobalDesignSystem = {
  version: typeof GLOBAL_DESIGN_SYSTEM_VERSION;
  palettes: DesignPalette[];
  typography: DesignTypographyPreset[];
};

export type GlobalDesignSystemValidation = {
  ok: boolean;
  errors: string[];
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function isRgb(value: unknown): value is string {
  if (typeof value !== "string") return false;
  const parts = value.split(",").map((part) => Number(part.trim()));
  return (
    parts.length === 3 &&
    parts.every(
      (part) => Number.isInteger(part) && part >= 0 && part <= 255,
    )
  );
}

function requireString(
  value: Record<string, unknown>,
  key: string,
  path: string,
  errors: string[],
) {
  if (!isString(value[key])) {
    errors.push(`${path}.${key} must be a non-empty string`);
  }
}

function validatePalette(value: unknown, index: number, errors: string[]) {
  const path = `palettes[${index}]`;
  if (!isRecord(value)) {
    errors.push(`${path} must be an object`);
    return;
  }
  requireString(value, "id", path, errors);
  requireString(value, "label", path, errors);
  requireString(value, "description", path, errors);

  if (!isRecord(value.roles)) {
    errors.push(`${path}.roles must be an object`);
    return;
  }

  for (const role of [...DESIGN_ACCENT_ROLES, ...DESIGN_SURFACE_ROLES]) {
    if (!isRgb(value.roles[role])) {
      errors.push(
        `${path}.roles.${role} must be an RGB string such as "239, 68, 68"`,
      );
    }
  }
}

function validateTypography(
  value: unknown,
  index: number,
  errors: string[],
) {
  const path = `typography[${index}]`;
  if (!isRecord(value)) {
    errors.push(`${path} must be an object`);
    return;
  }
  requireString(value, "id", path, errors);
  requireString(value, "label", path, errors);
  requireString(value, "description", path, errors);

  if (!["serif", "sans", "mono"].includes(String(value.displayFont))) {
    errors.push(`${path}.displayFont must be serif, sans, or mono`);
  }
  if (!["serif", "sans", "mono"].includes(String(value.bodyFont))) {
    errors.push(`${path}.bodyFont must be serif, sans, or mono`);
  }
  if (!["natural", "uppercase"].includes(String(value.titleCase))) {
    errors.push(`${path}.titleCase must be natural or uppercase`);
  }
  if (!["dot", "rule", "pill", "plain"].includes(String(value.eyebrowStyle))) {
    errors.push(`${path}.eyebrowStyle must be dot, rule, pill, or plain`);
  }
}

function validateUniqueIds(
  values: readonly { id?: unknown }[],
  path: string,
  errors: string[],
) {
  const ids = values
    .map((value) => value.id)
    .filter((id): id is string => typeof id === "string");
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  for (const id of new Set(duplicates)) {
    errors.push(`${path} contains duplicate id "${id}"`);
  }
}

export function validateGlobalDesignSystem(
  input: unknown,
): GlobalDesignSystemValidation {
  const errors: string[] = [];
  if (!isRecord(input)) {
    return { ok: false, errors: ["Global design system must be an object"] };
  }

  if (input.version !== GLOBAL_DESIGN_SYSTEM_VERSION) {
    errors.push(`version must equal ${GLOBAL_DESIGN_SYSTEM_VERSION}`);
  }

  if (!Array.isArray(input.palettes) || input.palettes.length === 0) {
    errors.push("palettes must contain at least one palette");
  } else {
    input.palettes.forEach((palette, index) =>
      validatePalette(palette, index, errors),
    );
    validateUniqueIds(input.palettes, "palettes", errors);
  }

  if (!Array.isArray(input.typography) || input.typography.length === 0) {
    errors.push("typography must contain at least one preset");
  } else {
    input.typography.forEach((preset, index) =>
      validateTypography(preset, index, errors),
    );
    validateUniqueIds(input.typography, "typography", errors);
  }

  return { ok: errors.length === 0, errors };
}

export function parseGlobalDesignSystem(input: unknown): GlobalDesignSystem {
  const validation = validateGlobalDesignSystem(input);
  if (!validation.ok) {
    throw new Error(
      `Invalid global design system:\n${validation.errors
        .map((error) => `- ${error}`)
        .join("\n")}`,
    );
  }
  return input as GlobalDesignSystem;
}

export function paletteById(
  designSystem: GlobalDesignSystem,
  id: string | undefined,
) {
  return id
    ? designSystem.palettes.find((palette) => palette.id === id)
    : undefined;
}

export function typographyById(
  designSystem: GlobalDesignSystem,
  id: string | undefined,
) {
  return id
    ? designSystem.typography.find((preset) => preset.id === id)
    : undefined;
}
