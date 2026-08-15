import type { StudioSelection } from "@/app/_page-system/types";
import { moveInArray, uniqueId } from "@/app/studio/_components/studio-types";
import type {
  CaseStudyColumn,
  CaseStudySection,
  LensItem,
  ModelChoice,
  ModelGuideSection,
  PageRecipe,
  RecipeLink,
  RegimeGroup,
} from "@/lib/page-system/schema";

export type UpdateRecipe = (mutator: (next: PageRecipe) => void) => void;

export function confirmRemoval(label: string) {
  return window.confirm(`Delete ${label}? This can still be undone with Ctrl+Z.`);
}

export function addLens(recipe: PageRecipe, update: UpdateRecipe, onSelect: (selection: StudioSelection) => void) {
  if (recipe.organization.kind !== "multiple-lenses") return;
  const id = uniqueId("new-lens", recipe.organization.items.map((item) => item.id));
  update((next) => {
    if (next.organization.kind !== "multiple-lenses") return;
    next.organization.items.push({ id, label: "New lens", question: "What should this reveal?", summary: "Explain what relationships this lens keeps visible.", icon: "BookOpen", accentRgb: next.theme.accentRgb, visual: "network", status: "planned" });
  });
  onSelect({ kind: "lens", id });
}

export function addRegime(recipe: PageRecipe, update: UpdateRecipe, onSelect: (selection: StudioSelection) => void) {
  if (recipe.organization.kind !== "split-regimes") return;
  const id = uniqueId("new-regime", recipe.organization.groups.map((group) => group.id));
  update((next) => {
    if (next.organization.kind !== "split-regimes") return;
    next.organization.groups.push({ id, label: "New regime", kicker: "Model family", condition: "Describe when this regime applies.", description: "Explain what this model family adds or preserves.", accentRgb: next.theme.accentRgb, visual: "neutral", items: [{ id: "first-field", label: "First field", summary: "Describe this field.", icon: "Circle", accentRgb: next.theme.accentRgb, status: "planned" }] });
  });
  onSelect({ kind: "regime", id });
}

export function addField(group: RegimeGroup, update: UpdateRecipe, onSelect: (selection: StudioSelection) => void) {
  const id = uniqueId("new-field", group.items.map((item) => item.id));
  update((next) => {
    if (next.organization.kind !== "split-regimes") return;
    const target = next.organization.groups.find((candidate) => candidate.id === group.id);
    target?.items.push({ id, label: "New field", summary: "Describe what this field studies.", icon: "Circle", accentRgb: group.accentRgb, status: "planned", tags: [] });
  });
  onSelect({ kind: "navigation-item", groupId: group.id, id });
}

export function addSection(recipe: PageRecipe, type: "case-study" | "model-guide", update: UpdateRecipe, onSelect: (selection: StudioSelection) => void) {
  const id = uniqueId(type, recipe.sections.map((section) => section.id));
  update((next) => {
    if (type === "case-study") {
      next.sections.push({ id, type, eyebrow: "Apply the structure", title: "New case study", summary: "Use a concrete example to show why the organization matters.", icon: "BookOpen", columns: [{ id: "perspective-1", label: "Perspective 1", question: "What should the learner ask?", answer: "Add the first explanatory answer.", accentRgb: next.theme.accentRgb }] });
    } else {
      next.sections.push({ id, type, eyebrow: "Choose a model", title: "New model guide", summary: "Help the learner decide which model or branch applies.", icon: "Gauge", choices: [{ id: "choice-1", question: "When does this option apply?", answer: "Choose this model.", detail: "Explain the boundary or condition.", icon: "Circle", accentRgb: next.theme.accentRgb }] });
    }
  });
  onSelect({ kind: "section", id });
}

export function addCaseColumn(section: CaseStudySection, update: UpdateRecipe, onSelect: (selection: StudioSelection) => void) {
  const id = uniqueId("new-column", section.columns.map((column) => column.id));
  update((next) => { const target = next.sections.find((candidate) => candidate.id === section.id); if (target?.type === "case-study") target.columns.push({ id, label: "New perspective", question: "What should the learner ask?", answer: "Explain this perspective.", accentRgb: "56, 189, 248" }); });
  onSelect({ kind: "case-column", sectionId: section.id, id });
}

export function addModelChoice(section: ModelGuideSection, update: UpdateRecipe, onSelect: (selection: StudioSelection) => void) {
  const id = uniqueId("new-choice", section.choices.map((choice) => choice.id));
  update((next) => { const target = next.sections.find((candidate) => candidate.id === section.id); if (target?.type === "model-guide") target.choices.push({ id, question: "When does this option apply?", answer: "Choose this model.", detail: "Explain the condition.", icon: "Circle", accentRgb: "56, 189, 248" }); });
  onSelect({ kind: "model-choice", sectionId: section.id, id });
}

export function duplicateLens(recipe: PageRecipe, item: LensItem, update: UpdateRecipe, onSelect: (selection: StudioSelection) => void) {
  if (recipe.organization.kind !== "multiple-lenses") return;
  const id = uniqueId(`${item.id}-copy`, recipe.organization.items.map((candidate) => candidate.id));
  update((next) => { if (next.organization.kind !== "multiple-lenses") return; const index = next.organization.items.findIndex((candidate) => candidate.id === item.id); const copy = structuredClone(item); Object.assign(copy, { id, nodeId: undefined, href: undefined, status: "planned", label: `${item.label} copy` }); next.organization.items.splice(index + 1, 0, copy); });
  onSelect({ kind: "lens", id });
}

export function deleteLens(recipe: PageRecipe, id: string, update: UpdateRecipe, onSelect: (selection: StudioSelection) => void) {
  if (recipe.organization.kind !== "multiple-lenses" || recipe.organization.items.length <= 1 || !confirmRemoval("this lens")) return;
  update((next) => { if (next.organization.kind === "multiple-lenses") next.organization.items = next.organization.items.filter((item) => item.id !== id); });
  onSelect({ kind: "page" });
}

export function duplicateRegime(recipe: PageRecipe, group: RegimeGroup, update: UpdateRecipe, onSelect: (selection: StudioSelection) => void) {
  if (recipe.organization.kind !== "split-regimes") return;
  const id = uniqueId(`${group.id}-copy`, recipe.organization.groups.map((candidate) => candidate.id));
  update((next) => { if (next.organization.kind !== "split-regimes") return; const index = next.organization.groups.findIndex((candidate) => candidate.id === group.id); const copy = structuredClone(group); copy.id = id; copy.label = `${group.label} copy`; copy.items = copy.items.map((item, itemIndex) => ({ ...item, id: uniqueId(`${item.id}-copy`, copy.items.slice(0, itemIndex).map((candidate) => candidate.id)), nodeId: undefined, href: undefined, status: "planned" })); next.organization.groups.splice(index + 1, 0, copy); });
  onSelect({ kind: "regime", id });
}

export function deleteRegime(recipe: PageRecipe, id: string, update: UpdateRecipe, onSelect: (selection: StudioSelection) => void) {
  if (recipe.organization.kind !== "split-regimes" || recipe.organization.groups.length <= 1 || !confirmRemoval("this regime")) return;
  update((next) => { if (next.organization.kind === "split-regimes") next.organization.groups = next.organization.groups.filter((group) => group.id !== id); });
  onSelect({ kind: "page" });
}

export function duplicateField(group: RegimeGroup, item: RecipeLink, update: UpdateRecipe, onSelect: (selection: StudioSelection) => void) {
  const id = uniqueId(`${item.id}-copy`, group.items.map((candidate) => candidate.id));
  update((next) => { if (next.organization.kind !== "split-regimes") return; const target = next.organization.groups.find((candidate) => candidate.id === group.id); if (!target) return; const index = target.items.findIndex((candidate) => candidate.id === item.id); target.items.splice(index + 1, 0, { ...structuredClone(item), id, label: `${item.label} copy`, nodeId: undefined, href: undefined, status: "planned" }); });
  onSelect({ kind: "navigation-item", groupId: group.id, id });
}

export function deleteField(group: RegimeGroup, id: string, update: UpdateRecipe, onSelect: (selection: StudioSelection) => void) {
  if (group.items.length <= 1 || !confirmRemoval("this field")) return;
  update((next) => { if (next.organization.kind !== "split-regimes") return; const target = next.organization.groups.find((candidate) => candidate.id === group.id); if (target) target.items = target.items.filter((item) => item.id !== id); });
  onSelect({ kind: "regime", id: group.id });
}

export function duplicateSection(recipe: PageRecipe, sectionId: string, update: UpdateRecipe, onSelect: (selection: StudioSelection) => void) {
  const section = recipe.sections.find((candidate) => candidate.id === sectionId); if (!section) return;
  const id = uniqueId(`${section.id}-copy`, recipe.sections.map((candidate) => candidate.id));
  update((next) => { const index = next.sections.findIndex((candidate) => candidate.id === sectionId); next.sections.splice(index + 1, 0, { ...structuredClone(section), id, title: `${section.title} copy` }); });
  onSelect({ kind: "section", id });
}

export function deleteSection(recipe: PageRecipe, sectionId: string, update: UpdateRecipe, onSelect: (selection: StudioSelection) => void) {
  const section = recipe.sections.find((candidate) => candidate.id === sectionId); if (!section || !confirmRemoval(`“${section.title}”`)) return;
  update((next) => { next.sections = next.sections.filter((candidate) => candidate.id !== sectionId); });
  onSelect({ kind: "page" });
}

export function duplicateCaseColumn(section: CaseStudySection, column: CaseStudyColumn, update: UpdateRecipe, onSelect: (selection: StudioSelection) => void) {
  const id = uniqueId(`${column.id}-copy`, section.columns.map((candidate) => candidate.id));
  update((next) => { const target = next.sections.find((candidate) => candidate.id === section.id); if (target?.type !== "case-study") return; const index = target.columns.findIndex((candidate) => candidate.id === column.id); target.columns.splice(index + 1, 0, { ...structuredClone(column), id, label: `${column.label} copy` }); });
  onSelect({ kind: "case-column", sectionId: section.id, id });
}

export function deleteCaseColumn(section: CaseStudySection, id: string, update: UpdateRecipe, onSelect: (selection: StudioSelection) => void) {
  if (section.columns.length <= 1 || !confirmRemoval("this case-study column")) return;
  update((next) => { const target = next.sections.find((candidate) => candidate.id === section.id); if (target?.type === "case-study") target.columns = target.columns.filter((column) => column.id !== id); });
  onSelect({ kind: "section", id: section.id });
}

export function duplicateModelChoice(section: ModelGuideSection, choice: ModelChoice, update: UpdateRecipe, onSelect: (selection: StudioSelection) => void) {
  const id = uniqueId(`${choice.id}-copy`, section.choices.map((candidate) => candidate.id));
  update((next) => { const target = next.sections.find((candidate) => candidate.id === section.id); if (target?.type !== "model-guide") return; const index = target.choices.findIndex((candidate) => candidate.id === choice.id); target.choices.splice(index + 1, 0, { ...structuredClone(choice), id, answer: `${choice.answer} copy` }); });
  onSelect({ kind: "model-choice", sectionId: section.id, id });
}

export function deleteModelChoice(section: ModelGuideSection, id: string, update: UpdateRecipe, onSelect: (selection: StudioSelection) => void) {
  if (section.choices.length <= 1 || !confirmRemoval("this model choice")) return;
  update((next) => { const target = next.sections.find((candidate) => candidate.id === section.id); if (target?.type === "model-guide") target.choices = target.choices.filter((choice) => choice.id !== id); });
  onSelect({ kind: "section", id: section.id });
}

export function updateLens(update: UpdateRecipe, id: string, mutator: (item: LensItem) => void) { update((next) => { if (next.organization.kind !== "multiple-lenses") return; const item = next.organization.items.find((candidate) => candidate.id === id); if (item) mutator(item); }); }
export function updateRegime(update: UpdateRecipe, id: string, mutator: (group: RegimeGroup) => void) { update((next) => { if (next.organization.kind !== "split-regimes") return; const group = next.organization.groups.find((candidate) => candidate.id === id); if (group) mutator(group); }); }
export function updateNavigationItem(update: UpdateRecipe, groupId: string, id: string, mutator: (item: RecipeLink) => void) { update((next) => { if (next.organization.kind !== "split-regimes") return; const item = next.organization.groups.find((group) => group.id === groupId)?.items.find((candidate) => candidate.id === id); if (item) mutator(item); }); }
export function updateSection(update: UpdateRecipe, id: string, mutator: (section: PageRecipe["sections"][number]) => void) { update((next) => { const section = next.sections.find((candidate) => candidate.id === id); if (section) mutator(section); }); }
export function updateCaseColumn(update: UpdateRecipe, sectionId: string, id: string, mutator: (column: CaseStudyColumn) => void) { update((next) => { const section = next.sections.find((candidate) => candidate.id === sectionId); if (section?.type !== "case-study") return; const column = section.columns.find((candidate) => candidate.id === id); if (column) mutator(column); }); }
export function updateModelChoice(update: UpdateRecipe, sectionId: string, id: string, mutator: (choice: ModelChoice) => void) { update((next) => { const section = next.sections.find((candidate) => candidate.id === sectionId); if (section?.type !== "model-guide") return; const choice = section.choices.find((candidate) => candidate.id === id); if (choice) mutator(choice); }); }
