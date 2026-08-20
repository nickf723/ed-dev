import {
  paletteById,
  typographyById,
  type DesignAccentRole,
  type GlobalDesignSystem,
} from "@/lib/design-system/schema";
import type {
  CaseStudyColumn,
  ModelChoice,
  PageRecipe,
  RecipeLink,
  RegimeGroup,
} from "@/lib/page-system/schema";

function roleColor(
  role: DesignAccentRole | undefined,
  fallback: string,
  designSystem: GlobalDesignSystem,
  paletteId: string | undefined,
) {
  const palette = paletteById(designSystem, paletteId);
  return role && palette ? palette.roles[role] : fallback;
}

function resolveLink<T extends RecipeLink>(
  link: T,
  designSystem: GlobalDesignSystem,
  paletteId: string | undefined,
): T {
  return {
    ...link,
    accentRgb: roleColor(
      link.colorRole,
      link.accentRgb,
      designSystem,
      paletteId,
    ),
  } as T;
}

function resolveRegime(
  group: RegimeGroup,
  designSystem: GlobalDesignSystem,
  paletteId: string | undefined,
): RegimeGroup {
  return {
    ...group,
    accentRgb: roleColor(
      group.colorRole,
      group.accentRgb,
      designSystem,
      paletteId,
    ),
    items: group.items.map((item) =>
      resolveLink(item, designSystem, paletteId),
    ),
  };
}

function resolveCaseColumn(
  column: CaseStudyColumn,
  designSystem: GlobalDesignSystem,
  paletteId: string | undefined,
): CaseStudyColumn {
  return {
    ...column,
    accentRgb: roleColor(
      column.colorRole,
      column.accentRgb,
      designSystem,
      paletteId,
    ),
  };
}

function resolveModelChoice(
  choice: ModelChoice,
  designSystem: GlobalDesignSystem,
  paletteId: string | undefined,
): ModelChoice {
  return {
    ...choice,
    accentRgb: roleColor(
      choice.colorRole,
      choice.accentRgb,
      designSystem,
      paletteId,
    ),
  };
}

/**
 * Compile global palette and typography references into a renderable recipe.
 * The source recipe remains small and readable; resolved colors are transient.
 */
export function applyGlobalDesign(
  recipe: PageRecipe,
  designSystem: GlobalDesignSystem,
): PageRecipe {
  const next = structuredClone(recipe);
  const palette = paletteById(designSystem, next.theme.paletteId);
  const typography = typographyById(designSystem, next.theme.typographyId);

  if (palette) {
    next.theme.accentRgb = palette.roles.primary;
    next.theme.resolvedPalette = structuredClone(palette.roles);
  }

  if (typography) {
    next.theme.displayFont = typography.displayFont;
    next.theme.bodyFont = typography.bodyFont;
    next.theme.titleCase = typography.titleCase;
    next.theme.eyebrowStyle = typography.eyebrowStyle;
  }

  if (next.organization.kind === "multiple-lenses") {
    next.organization.items = next.organization.items.map((item) =>
      resolveLink(item, designSystem, next.theme.paletteId),
    );
  } else {
    next.organization.groups = next.organization.groups.map((group) =>
      resolveRegime(group, designSystem, next.theme.paletteId),
    );
  }

  next.sections = next.sections.map((section) =>
    section.type === "case-study"
      ? {
          ...section,
          columns: section.columns.map((column) =>
            resolveCaseColumn(column, designSystem, next.theme.paletteId),
          ),
        }
      : {
          ...section,
          choices: section.choices.map((choice) =>
            resolveModelChoice(choice, designSystem, next.theme.paletteId),
          ),
        },
  );

  return next;
}
