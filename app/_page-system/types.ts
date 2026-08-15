import type { PageRecipe } from "@/lib/page-system/schema";

export type StudioSelection =
  | { kind: "page" }
  | { kind: "lens"; id: string }
  | { kind: "regime"; id: string }
  | { kind: "navigation-item"; groupId?: string; id: string }
  | { kind: "section"; id: string }
  | { kind: "case-column"; sectionId: string; id: string }
  | { kind: "model-choice"; sectionId: string; id: string };

export type RendererStudioProps = {
  preview?: boolean;
  selected?: StudioSelection;
  showGuides?: boolean;
  motionEnabled?: boolean;
  onSelect?: (selection: StudioSelection) => void;
};

export type PageRendererProps = RendererStudioProps & {
  recipe: PageRecipe;
};

export function selectionKey(selection: StudioSelection | undefined) {
  if (!selection) return "";
  if (selection.kind === "page") return "page";
  if (selection.kind === "navigation-item") {
    return `navigation-item:${selection.groupId ?? "root"}:${selection.id}`;
  }
  if (selection.kind === "case-column") {
    return `case-column:${selection.sectionId}:${selection.id}`;
  }
  if (selection.kind === "model-choice") {
    return `model-choice:${selection.sectionId}:${selection.id}`;
  }
  return `${selection.kind}:${selection.id}`;
}
