import type { PageRecipe } from "@/lib/page-system/schema";

export const DENSITY_PADDING = {
  compact: "p-4 sm:p-5",
  balanced: "p-5 sm:p-6",
  spacious: "p-6 sm:p-8",
} as const;

export const SECTION_GAP = {
  sm: "mt-3",
  md: "mt-5",
  lg: "mt-8",
} as const;

export const RADIUS = {
  md: "18px",
  lg: "24px",
  xl: "32px",
} as const;

export const SURFACE_BLUR = {
  clear: "backdrop-blur-none",
  glass: "backdrop-blur-md",
  "dense-glass": "backdrop-blur-2xl",
} as const;

export function surfaceColor(recipe: PageRecipe) {
  const opacity =
    recipe.theme.surface === "clear"
      ? recipe.theme.surfaceOpacity * 0.42
      : recipe.theme.surface === "dense-glass"
        ? Math.min(0.8, recipe.theme.surfaceOpacity * 1.55)
        : recipe.theme.surfaceOpacity;
  return recipe.theme.family === "history"
    ? `rgba(10,7,5,${opacity})`
    : `rgba(3,7,13,${opacity})`;
}

export function headerColor(recipe: PageRecipe) {
  const base = recipe.theme.family === "history" ? "7,5,3" : "3,7,13";
  return `rgba(${base},${Math.min(0.94, 0.58 + recipe.theme.surfaceOpacity)})`;
}

export function regionRing(showGuides = false, selected = false) {
  if (selected) return "outline outline-2 outline-cyan-200/90 outline-offset-[-2px]";
  if (showGuides) return "outline outline-1 outline-cyan-300/30 outline-offset-[-1px]";
  return "";
}

export function columnGridClass(count: number) {
  if (count <= 1) return "md:grid-cols-1";
  if (count === 2) return "md:grid-cols-2";
  return "md:grid-cols-3";
}

export function fieldEdgeClass(index: number) {
  if (index === 0) return "border-b sm:border-r";
  if (index === 1) return "border-b";
  if (index === 2) return "border-b sm:border-b-0 sm:border-r";
  return "";
}
