import type { PageRecipe, PageTheme } from "@/lib/page-system/schema";

export const STYLE_PRESETS = [
  {
    id: "focused",
    label: "Focused",
    description:
      "Tighter composition, restrained effects, and clear surfaces for information-dense editing.",
  },
  {
    id: "balanced",
    label: "Balanced",
    description:
      "The general-purpose Education Station rhythm: visible atmosphere, comfortable spacing, and glass surfaces.",
  },
  {
    id: "showcase",
    label: "Showcase",
    description:
      "Large title, generous spacing, stronger background, and dramatic depth for flagship hubs.",
  },
] as const;

export const PAGE_PALETTES = [
  { label: "Amber archive", rgb: "217, 119, 6" },
  { label: "Cyan field", rgb: "56, 189, 248" },
  { label: "Violet theory", rgb: "167, 139, 250" },
  { label: "Emerald atlas", rgb: "16, 185, 129" },
  { label: "Rose signal", rgb: "244, 114, 182" },
  { label: "Neutral silver", rgb: "148, 163, 184" },
] as const;

export const SYSTEM_PALETTES = [
  {
    id: "math-red",
    label: "Mathematics red",
    description: "Red primary with orange, rose, and cool neutral supporting roles.",
    colors: ["220, 38, 38", "251, 146, 60", "244, 114, 182", "148, 163, 184"],
  },
  {
    id: "physics-cyan",
    label: "Physics field",
    description: "Cyan primary with violet, blue, and silver supporting roles.",
    colors: ["56, 189, 248", "167, 139, 250", "96, 165, 250", "148, 163, 184"],
  },
  {
    id: "history-archive",
    label: "History archive",
    description: "Amber primary with emerald, indigo, and parchment-neutral accents.",
    colors: ["217, 119, 6", "16, 185, 129", "129, 140, 248", "180, 167, 148"],
  },
  {
    id: "biology-green",
    label: "Biology growth",
    description: "Green primary with lime, teal, and soft slate supporting roles.",
    colors: ["34, 197, 94", "132, 204, 22", "45, 212, 191", "148, 163, 184"],
  },
  {
    id: "social-blue",
    label: "Social systems",
    description: "Blue primary with sky, indigo, and cool neutral supporting roles.",
    colors: ["59, 130, 246", "14, 165, 233", "99, 102, 241", "148, 163, 184"],
  },
  {
    id: "humanities-rose",
    label: "Humanities rose",
    description: "Rose primary with amber, violet, and warm neutral supporting roles.",
    colors: ["244, 114, 182", "251, 146, 60", "167, 139, 250", "180, 167, 148"],
  },
] as const;

export function applyStylePreset(recipe: PageRecipe, presetId: string) {
  const patch: Partial<PageTheme> =
    presetId === "focused"
      ? {
          density: "compact",
          sectionGap: "sm",
          panelRadius: "lg",
          surface: "clear",
          surfaceOpacity: 0.08,
          backgroundStrength: 0.58,
          motion: "subtle",
          contentWidth: "focused",
          headerScale: "compact",
          borderStrength: "subtle",
          shadow: "none",
        }
      : presetId === "showcase"
        ? {
            density: "spacious",
            sectionGap: "lg",
            panelRadius: "xl",
            surface: "glass",
            surfaceOpacity: 0.13,
            backgroundStrength: 1.15,
            motion: "expressive",
            contentWidth: "wide",
            headerScale: "display",
            borderStrength: "strong",
            shadow: "dramatic",
          }
        : {
            density: "balanced",
            sectionGap: "md",
            panelRadius: "xl",
            surface: "glass",
            surfaceOpacity: 0.11,
            backgroundStrength: 0.85,
            motion: "subtle",
            contentWidth: "standard",
            headerScale: "standard",
            borderStrength: "standard",
            shadow: "soft",
          };

  Object.assign(recipe.theme, patch);
}

export function applyPalettePreset(recipe: PageRecipe, presetId: string) {
  const preset = SYSTEM_PALETTES.find((candidate) => candidate.id === presetId);
  if (!preset) return;

  const colors = [...preset.colors];
  recipe.theme.accentRgb = colors[0];

  if (recipe.organization.kind === "multiple-lenses") {
    recipe.organization.items.forEach((item, index) => {
      item.accentRgb = colors[index % 3];
    });
  } else {
    recipe.organization.groups.forEach((group, groupIndex) => {
      group.accentRgb = colors[groupIndex % 3];
      group.items.forEach((item, itemIndex) => {
        item.accentRgb = colors[(groupIndex + itemIndex) % 3];
      });
    });
  }

  recipe.sections.forEach((section, sectionIndex) => {
    const start = sectionIndex % 3;
    if (section.type === "case-study") {
      section.columns.forEach((column, index) => {
        column.accentRgb = colors[(start + index) % 3];
      });
    } else {
      section.choices.forEach((choice, index) => {
        choice.accentRgb = colors[(start + index) % 3];
      });
    }
  });
}
