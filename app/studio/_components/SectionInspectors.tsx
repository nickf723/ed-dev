"use client";

import type { StudioSelection } from "@/app/_page-system/types";
import { PAGE_ICON_OPTIONS } from "@/app/_page-system/icon-registry";
import { DESIGN_ACCENT_ROLES, type DesignAccentRole } from "@/lib/design-system/schema";
import {
  AddButton,
  ChoiceField,
  ColorField,
  InspectorGroup,
  ItemActions,
  OrderControls,
  SelectField,
  TextArea,
  TextField,
  ToggleField,
} from "@/app/studio/_components/InspectorFields";
import {
  addCaseColumn,
  addModelChoice,
  deleteCaseColumn,
  deleteModelChoice,
  deleteSection,
  duplicateCaseColumn,
  duplicateModelChoice,
  duplicateSection,
  updateCaseColumn,
  updateModelChoice,
  updateSection,
  type UpdateRecipe,
} from "@/app/studio/_components/studio-operations";
import { moveInArray } from "@/app/studio/_components/studio-types";
import type {
  CaseStudyColumn,
  CaseStudySection,
  ModelChoice,
  ModelGuideSection,
  PageRecipe,
  PageSection,
} from "@/lib/page-system/schema";

const COLOR_ROLE_OPTIONS = ["custom", ...DESIGN_ACCENT_ROLES] as const;

export function SectionInspector({ recipe, section, update, onSelect }: { recipe: PageRecipe; section: PageSection; update: UpdateRecipe; onSelect: (selection: StudioSelection) => void }) {
  const index = recipe.sections.findIndex((candidate) => candidate.id === section.id);
  return (
    <div className="space-y-6">
      <InspectorGroup title="Supporting section" note={section.type}>
        <ToggleField label="Visible on the page" checked={!section.hidden} description="Hidden sections remain in the recipe and can be restored later." onChange={(checked) => updateSection(update, section.id, (next) => { next.hidden = !checked; })} />
        <TextField label="Eyebrow" value={section.eyebrow} onChange={(value) => updateSection(update, section.id, (next) => { next.eyebrow = value; })} />
        <TextField label="Title" value={section.title} onChange={(value) => updateSection(update, section.id, (next) => { next.title = value; })} />
        <TextArea label="Summary" value={section.summary} rows={5} onChange={(value) => updateSection(update, section.id, (next) => { next.summary = value; })} />
        <SelectField label="Icon" value={section.icon} options={PAGE_ICON_OPTIONS} onChange={(value) => updateSection(update, section.id, (next) => { next.icon = value; })} />
        {section.type === "case-study" ? <AddButton label="Add a case-study column" onClick={() => addCaseColumn(section, update, onSelect)} /> : <AddButton label="Add a model choice" onClick={() => addModelChoice(section, update, onSelect)} />}
      </InspectorGroup>
      <OrderControls index={index} count={recipe.sections.length} move={(direction) => update((next) => moveInArray(next.sections, index, direction))} />
      <ItemActions duplicateLabel="Duplicate section" deleteLabel="Delete section" onDuplicate={() => duplicateSection(recipe, section.id, update, onSelect)} onDelete={() => deleteSection(recipe, section.id, update, onSelect)} />
    </div>
  );
}

export function CaseColumnInspector({ section, column, update, onSelect }: { section: CaseStudySection; column: CaseStudyColumn; update: UpdateRecipe; onSelect: (selection: StudioSelection) => void }) {
  const index = section.columns.findIndex((candidate) => candidate.id === column.id);
  return (
    <div className="space-y-6">
      <InspectorGroup title="Case-study column" note={section.title}>
        <TextField label="Label" value={column.label} onChange={(value) => updateCaseColumn(update, section.id, column.id, (next) => { next.label = value; })} />
        <TextArea label="Question" value={column.question} rows={4} onChange={(value) => updateCaseColumn(update, section.id, column.id, (next) => { next.question = value; })} />
        <TextArea label="Answer" value={column.answer} rows={5} onChange={(value) => updateCaseColumn(update, section.id, column.id, (next) => { next.answer = value; })} />
        <ChoiceField label="Global color role" value={column.colorRole ?? "custom"} options={COLOR_ROLE_OPTIONS} columns={3} onChange={(value) => updateCaseColumn(update, section.id, column.id, (next) => { next.colorRole = value === "custom" ? undefined : value as DesignAccentRole; })} />
        <ColorField label="Custom accent" rgb={column.accentRgb} onChange={(value) => updateCaseColumn(update, section.id, column.id, (next) => { next.accentRgb = value; next.colorRole = undefined; })} />
      </InspectorGroup>
      <OrderControls index={index} count={section.columns.length} move={(direction) => update((next) => { const target = next.sections.find((candidate) => candidate.id === section.id); if (target?.type === "case-study") moveInArray(target.columns, index, direction); })} />
      <ItemActions onDuplicate={() => duplicateCaseColumn(section, column, update, onSelect)} onDelete={() => deleteCaseColumn(section, column.id, update, onSelect)} deleteDisabled={section.columns.length <= 1} />
    </div>
  );
}

export function ModelChoiceInspector({ section, choice, update, onSelect }: { section: ModelGuideSection; choice: ModelChoice; update: UpdateRecipe; onSelect: (selection: StudioSelection) => void }) {
  const index = section.choices.findIndex((candidate) => candidate.id === choice.id);
  return (
    <div className="space-y-6">
      <InspectorGroup title="Model choice" note={section.title}>
        <TextArea label="Condition / question" value={choice.question} rows={4} onChange={(value) => updateModelChoice(update, section.id, choice.id, (next) => { next.question = value; })} />
        <TextField label="Recommendation" value={choice.answer} onChange={(value) => updateModelChoice(update, section.id, choice.id, (next) => { next.answer = value; })} />
        <TextArea label="Explanation" value={choice.detail} rows={5} onChange={(value) => updateModelChoice(update, section.id, choice.id, (next) => { next.detail = value; })} />
        <SelectField label="Icon" value={choice.icon} options={PAGE_ICON_OPTIONS} onChange={(value) => updateModelChoice(update, section.id, choice.id, (next) => { next.icon = value; })} />
        <ChoiceField label="Global color role" value={choice.colorRole ?? "custom"} options={COLOR_ROLE_OPTIONS} columns={3} onChange={(value) => updateModelChoice(update, section.id, choice.id, (next) => { next.colorRole = value === "custom" ? undefined : value as DesignAccentRole; })} />
        <ColorField label="Custom accent" rgb={choice.accentRgb} onChange={(value) => updateModelChoice(update, section.id, choice.id, (next) => { next.accentRgb = value; next.colorRole = undefined; })} />
      </InspectorGroup>
      <OrderControls index={index} count={section.choices.length} move={(direction) => update((next) => { const target = next.sections.find((candidate) => candidate.id === section.id); if (target?.type === "model-guide") moveInArray(target.choices, index, direction); })} />
      <ItemActions onDuplicate={() => duplicateModelChoice(section, choice, update, onSelect)} onDelete={() => deleteModelChoice(section, choice.id, update, onSelect)} deleteDisabled={section.choices.length <= 1} />
    </div>
  );
}
