import type {
  PageBorderStrength,
  PageCardHeight,
  PageContentWidth,
  PageHeaderScale,
  PageRecipe,
  PageShadow,
} from "@/lib/page-system/schema";

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

export const CONTENT_WIDTH: Record<PageContentWidth, string> = {
  focused: "max-w-[1180px]",
  standard: "max-w-[1480px]",
  wide: "max-w-[1720px]",
};

export const PANEL_SHADOW: Record<PageShadow, string> = {
  none: "shadow-none",
  soft: "shadow-[0_28px_90px_rgba(0,0,0,0.18)]",
  dramatic: "shadow-[0_40px_130px_rgba(0,0,0,0.34)]",
};

export const LENS_CARD_HEIGHT: Record<PageCardHeight, string> = {
  compact: "min-h-[390px]",
  standard: "min-h-[470px]",
  tall: "min-h-[560px]",
};

export const LENS_COLUMNS = {
  1: "xl:grid-cols-1",
  2: "xl:grid-cols-2",
  3: "xl:grid-cols-3",
} as const;

export const REGIME_COLUMNS = {
  1: "xl:grid-cols-1",
  2: "xl:grid-cols-2",
} as const;

export const ITEM_COLUMNS = {
  1: "grid-cols-1",
  2: "sm:grid-cols-2",
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

export function borderAlpha(recipe: PageRecipe, base = 0.09) {
  const strength: PageBorderStrength = recipe.theme.borderStrength ?? "standard";
  if (strength === "subtle") return base * 0.62;
  if (strength === "strong") return Math.min(0.42, base * 1.7);
  return base;
}

export function panelShadow(recipe: PageRecipe) {
  return PANEL_SHADOW[recipe.theme.shadow ?? "soft"];
}

export function contentWidth(recipe: PageRecipe) {
  return CONTENT_WIDTH[recipe.theme.contentWidth ?? "standard"];
}

export function titleClass(recipe: PageRecipe) {
  const scale: PageHeaderScale = recipe.theme.headerScale ?? "standard";
  if (recipe.theme.family === "history") {
    if (scale === "compact") {
      return "font-serif text-[clamp(2.35rem,4.3vw,4.8rem)] font-semibold leading-[0.88] tracking-[-0.05em] text-[#fffaf0]";
    }
    if (scale === "display") {
      return "font-serif text-[clamp(3.5rem,6.4vw,7rem)] font-semibold leading-[0.8] tracking-[-0.06em] text-[#fffaf0]";
    }
    return "font-serif text-[clamp(3rem,5.4vw,6rem)] font-semibold leading-[0.84] tracking-[-0.055em] text-[#fffaf0]";
  }

  if (scale === "compact") {
    return "font-mono text-[clamp(2rem,3.8vw,4.1rem)] font-semibold uppercase leading-[0.9] tracking-[-0.05em] text-[#f7fbff]";
  }
  if (scale === "display") {
    return "font-mono text-[clamp(3.1rem,5.7vw,6.3rem)] font-semibold uppercase leading-[0.82] tracking-[-0.064em] text-[#f7fbff]";
  }
  return "font-mono text-[clamp(2.6rem,4.6vw,5rem)] font-semibold uppercase leading-[0.86] tracking-[-0.058em] text-[#f7fbff]";
}

export function regionRing(showGuides = false, selected = false) {
  if (selected) return "outline outline-2 outline-cyan-200/90 outline-offset-[-2px]";
  if (showGuides) return "outline outline-1 outline-cyan-300/30 outline-offset-[-1px]";
  return "";
}

export function columnGridClass(count: number) {
  if (count <= 1) return "md:grid-cols-1";
  if (count === 2) return "md:grid-cols-2";
  if (count === 3) return "md:grid-cols-3";
  return "md:grid-cols-2 xl:grid-cols-4";
}

export function itemEdgeClass(index: number, count: number, columns: 1 | 2) {
  if (columns === 1) return index < count - 1 ? "border-b" : "";
  const lastRowStart = Math.floor((count - 1) / 2) * 2;
  const bottom = index < lastRowStart ? "border-b" : "";
  const right = index % 2 === 0 && index < count - 1 ? "sm:border-r" : "";
  return `${bottom} ${right}`.trim();
}
