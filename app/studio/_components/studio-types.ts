import type {
  DesignGuideCategory,
  StudioSelection,
} from "@/app/_page-system/types";
import type { PageRecipe } from "@/lib/page-system/schema";

export type Viewport = "desktop" | "tablet" | "mobile";
export type StudioView = "page" | "style-guide";
export type SaveState = "idle" | "saving" | "saved" | "error";

export type DraftState = {
  past: PageRecipe[];
  present: PageRecipe;
  future: PageRecipe[];
  baseline: PageRecipe;
};

export const VIEWPORT_WIDTH: Record<Viewport, number> = {
  desktop: 1280,
  tablet: 900,
  mobile: 390,
};

export const DESIGN_CATEGORY_LABELS: Record<DesignGuideCategory, string> = {
  palette: "Palette",
  typography: "Typography & eyebrows",
  iconography: "Iconography",
  children: "Children & navigation",
  widgets: "Supporting widgets",
};

export function cloneRecipe(recipe: PageRecipe): PageRecipe {
  return structuredClone(recipe);
}

export function createDraftState(recipe: PageRecipe): DraftState {
  return {
    past: [],
    present: cloneRecipe(recipe),
    future: [],
    baseline: cloneRecipe(recipe),
  };
}

export function selectionTitle(
  recipe: PageRecipe,
  selection: StudioSelection,
) {
  if (selection.kind === "page") return `${recipe.identity.title} · page`;
  if (selection.kind === "design-category") {
    return `Style guide · ${DESIGN_CATEGORY_LABELS[selection.id]}`;
  }
  if (
    selection.kind === "lens" &&
    recipe.organization.kind === "multiple-lenses"
  ) {
    return (
      recipe.organization.items.find((item) => item.id === selection.id)
        ?.label ?? "Lens"
    );
  }
  if (
    selection.kind === "regime" &&
    recipe.organization.kind === "split-regimes"
  ) {
    return (
      recipe.organization.groups.find((group) => group.id === selection.id)
        ?.label ?? "Regime"
    );
  }
  if (
    selection.kind === "navigation-item" &&
    recipe.organization.kind === "split-regimes"
  ) {
    return (
      recipe.organization.groups
        .flatMap((group) => group.items)
        .find((item) => item.id === selection.id)?.label ?? "Field"
    );
  }
  if (selection.kind === "section") {
    return (
      recipe.sections.find((section) => section.id === selection.id)?.title ??
      "Section"
    );
  }
  if (selection.kind === "case-column") {
    const section = recipe.sections.find(
      (candidate) => candidate.id === selection.sectionId,
    );
    return section?.type === "case-study"
      ? section.columns.find((column) => column.id === selection.id)?.label ??
          "Case-study column"
      : "Case-study column";
  }
  if (selection.kind === "model-choice") {
    const section = recipe.sections.find(
      (candidate) => candidate.id === selection.sectionId,
    );
    return section?.type === "model-guide"
      ? section.choices.find((choice) => choice.id === selection.id)?.answer ??
          "Model choice"
      : "Model choice";
  }
  return "Selection";
}

export function moveInArray<T>(
  array: T[],
  index: number,
  direction: -1 | 1,
) {
  const target = index + direction;
  if (index < 0 || target < 0 || target >= array.length) return;
  const [item] = array.splice(index, 1);
  array.splice(target, 0, item);
}

export function rgbToHex(rgb: string) {
  const parts = rgb
    .split(",")
    .map((part) => Math.max(0, Math.min(255, Number(part.trim()) || 0)));
  while (parts.length < 3) parts.push(0);
  return `#${parts
    .slice(0, 3)
    .map((part) => Math.round(part).toString(16).padStart(2, "0"))
    .join("")}`;
}

export function hexToRgb(hex: string) {
  const normalized = hex.replace("#", "").padEnd(6, "0");
  return [0, 2, 4]
    .map((index) => parseInt(normalized.slice(index, index + 2), 16))
    .join(", ");
}
