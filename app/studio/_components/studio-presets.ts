import type { PageRecipe, PageTheme } from "@/lib/page-system/schema";

export const STYLE_PRESETS = [
  {
    id: "focused",
    label: "Focused",
    description: "Tighter composition, restrained effects, and clear surfaces for information-dense editing.",
  },
  {
    id: "balanced",
    label: "Balanced",
    description: "The general-purpose Education Station rhythm: visible atmosphere, comfortable spacing, and glass surfaces.",
  },
  {
    id: "showcase",
    label: "Showcase",
    description: "Large title, generous spacing, stronger background, and dramatic depth for flagship hubs.",
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
