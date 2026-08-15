"use client";

import type { StudioSelection } from "@/app/_page-system/types";
import { PAGE_ICON_OPTIONS } from "@/app/_page-system/icon-registry";
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
} from "@/app/studio/_components/InspectorFields";
import {
  addField,
  deleteField,
  deleteLens,
  deleteRegime,
  duplicateField,
  duplicateLens,
  duplicateRegime,
  updateLens,
  updateNavigationItem,
  updateRegime,
  type UpdateRecipe,
} from "@/app/studio/_components/studio-operations";
import { moveInArray } from "@/app/studio/_components/studio-types";
import type { LensItem, PageRecipe, RecipeLink, RegimeGroup } from "@/lib/page-system/schema";

export function LensInspector({ recipe, item, update, onSelect }: { recipe: PageRecipe; item: LensItem; update: UpdateRecipe; onSelect: (selection: StudioSelection) => void }) {
  const items = recipe.organization.kind === "multiple-lenses" ? recipe.organization.items : [];
  const index = items.findIndex((candidate) => candidate.id === item.id);
  return (
    <div className="space-y-6">
      <InspectorGroup title="Lens content" note="Navigation item">
        <TextField label="Label" value={item.label} onChange={(value) => updateLens(update, item.id, (next) => { next.label = value; })} />
        <TextField label="Question" value={item.question} onChange={(value) => updateLens(update, item.id, (next) => { next.question = value; })} />
        <TextArea label="Summary" value={item.summary} rows={5} onChange={(value) => updateLens(update, item.id, (next) => { next.summary = value; })} />
        <ChoiceField label="Status" value={item.status ?? "active"} options={["active", "planned"]} onChange={(value) => updateLens(update, item.id, (next) => { next.status = value as "active" | "planned"; })} />
        <TextField label="Route override" value={item.href ?? ""} placeholder="Derived from curriculum when blank" onChange={(value) => updateLens(update, item.id, (next) => { next.href = value || undefined; })} />
        <ChoiceField label="Diagram" value={item.visual} options={["timeline", "map", "network"]} columns={3} onChange={(value) => updateLens(update, item.id, (next) => { next.visual = value as LensItem["visual"]; })} />
        <SelectField label="Icon" value={item.icon} options={PAGE_ICON_OPTIONS} onChange={(value) => updateLens(update, item.id, (next) => { next.icon = value; })} />
        <ColorField label="Accent" rgb={item.accentRgb} onChange={(value) => updateLens(update, item.id, (next) => { next.accentRgb = value; })} />
      </InspectorGroup>
      <OrderControls index={index} count={items.length} move={(direction) => update((next) => { if (next.organization.kind === "multiple-lenses") moveInArray(next.organization.items, index, direction); })} />
      <ItemActions onDuplicate={() => duplicateLens(recipe, item, update, onSelect)} onDelete={() => deleteLens(recipe, item.id, update, onSelect)} deleteDisabled={items.length <= 1} />
    </div>
  );
}

export function RegimeInspector({ recipe, group, update, onSelect }: { recipe: PageRecipe; group: RegimeGroup; update: UpdateRecipe; onSelect: (selection: StudioSelection) => void }) {
  const groups = recipe.organization.kind === "split-regimes" ? recipe.organization.groups : [];
  const index = groups.findIndex((candidate) => candidate.id === group.id);
  return (
    <div className="space-y-6">
      <InspectorGroup title="Regime" note="Parallel region">
        <TextField label="Label" value={group.label} onChange={(value) => updateRegime(update, group.id, (next) => { next.label = value; })} />
        <TextField label="Kicker" value={group.kicker} onChange={(value) => updateRegime(update, group.id, (next) => { next.kicker = value; })} />
        <TextArea label="Condition" value={group.condition} rows={3} onChange={(value) => updateRegime(update, group.id, (next) => { next.condition = value; })} />
        <TextArea label="Description" value={group.description} rows={5} onChange={(value) => updateRegime(update, group.id, (next) => { next.description = value; })} />
        <ChoiceField label="Visual grammar" value={group.visual} options={["classical", "modern", "neutral"]} columns={3} onChange={(value) => updateRegime(update, group.id, (next) => { next.visual = value as RegimeGroup["visual"]; })} />
        <ColorField label="Accent" rgb={group.accentRgb} onChange={(value) => updateRegime(update, group.id, (next) => { next.accentRgb = value; })} />
        <AddButton label="Add a field to this regime" onClick={() => addField(group, update, onSelect)} />
      </InspectorGroup>
      <OrderControls index={index} count={groups.length} move={(direction) => update((next) => { if (next.organization.kind === "split-regimes") moveInArray(next.organization.groups, index, direction); })} />
      <ItemActions onDuplicate={() => duplicateRegime(recipe, group, update, onSelect)} onDelete={() => deleteRegime(recipe, group.id, update, onSelect)} deleteDisabled={groups.length <= 1} />
    </div>
  );
}

export function NavigationItemInspector({ group, item, update, onSelect }: { group: RegimeGroup; item: RecipeLink; update: UpdateRecipe; onSelect: (selection: StudioSelection) => void }) {
  const index = group.items.findIndex((candidate) => candidate.id === item.id);
  return (
    <div className="space-y-6">
      <InspectorGroup title="Field" note={group.label}>
        <TextField label="Label" value={item.label} onChange={(value) => updateNavigationItem(update, group.id, item.id, (next) => { next.label = value; })} />
        <TextArea label="Summary" value={item.summary} rows={5} onChange={(value) => updateNavigationItem(update, group.id, item.id, (next) => { next.summary = value; })} />
        <TextField label="Tags" value={(item.tags ?? []).join(" · ")} onChange={(value) => updateNavigationItem(update, group.id, item.id, (next) => { next.tags = value.split(/[·,]/).map((tag) => tag.trim()).filter(Boolean); })} />
        <ChoiceField label="Status" value={item.status ?? "active"} options={["active", "planned"]} onChange={(value) => updateNavigationItem(update, group.id, item.id, (next) => { next.status = value as "active" | "planned"; })} />
        <TextField label="Route override" value={item.href ?? ""} placeholder="Derived from curriculum when blank" onChange={(value) => updateNavigationItem(update, group.id, item.id, (next) => { next.href = value || undefined; })} />
        <SelectField label="Icon" value={item.icon} options={PAGE_ICON_OPTIONS} onChange={(value) => updateNavigationItem(update, group.id, item.id, (next) => { next.icon = value; })} />
        <ColorField label="Accent" rgb={item.accentRgb} onChange={(value) => updateNavigationItem(update, group.id, item.id, (next) => { next.accentRgb = value; })} />
      </InspectorGroup>
      <OrderControls index={index} count={group.items.length} move={(direction) => update((next) => { if (next.organization.kind !== "split-regimes") return; const target = next.organization.groups.find((candidate) => candidate.id === group.id); if (target) moveInArray(target.items, index, direction); })} />
      <ItemActions onDuplicate={() => duplicateField(group, item, update, onSelect)} onDelete={() => deleteField(group, item.id, update, onSelect)} deleteDisabled={group.items.length <= 1} />
    </div>
  );
}
