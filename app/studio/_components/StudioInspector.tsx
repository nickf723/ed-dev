"use client";

import { PanelRight } from "lucide-react";
import type { StudioSelection } from "@/app/_page-system/types";
import { PAGE_ICON_OPTIONS } from "@/app/_page-system/icon-registry";
import {
  ColorField,
  InspectorGroup,
  OrderControls,
  RangeField,
  SelectField,
  TextArea,
  TextField,
} from "@/app/studio/_components/InspectorFields";
import { moveInArray, selectionTitle, type SaveState } from "@/app/studio/_components/studio-types";
import type {
  LensItem,
  PageDensity,
  PageMotion,
  PagePanelRadius,
  PageRecipe,
  PageSectionGap,
  PageSurface,
  RecipeLink,
  RegimeGroup,
} from "@/lib/page-system/schema";

export default function StudioInspector({
  recipe,
  selection,
  saveState,
  saveMessage,
  update,
}: {
  recipe: PageRecipe;
  selection: StudioSelection;
  saveState: SaveState;
  saveMessage: string;
  update: (mutator: (next: PageRecipe) => void) => void;
}) {
  return (
    <aside className="flex min-h-0 min-w-0 flex-col overflow-hidden border-l border-white/[0.08] bg-[#0c0f16]">
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-white/[0.08] px-4">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.13em] text-slate-300">Inspector</div>
          <div className="mt-0.5 text-[9px] text-slate-600">{selectionTitle(recipe, selection)}</div>
        </div>
        <PanelRight size={15} className="text-slate-600" />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
        <Inspector recipe={recipe} selection={selection} update={update} />
      </div>

      <div className="border-t border-white/[0.08] p-3">
        <div
          className={`rounded-[12px] border px-3 py-2.5 text-[9px] leading-4 ${
            saveState === "error"
              ? "border-red-300/15 bg-red-400/[0.035] text-red-200/80"
              : saveState === "saved"
                ? "border-emerald-300/15 bg-emerald-400/[0.035] text-emerald-200/75"
                : "border-white/[0.06] bg-black/20 text-slate-600"
          }`}
        >
          {saveMessage || "Ctrl+S saves the current recipe. Ctrl+Z undoes the last editor change."}
        </div>
      </div>
    </aside>
  );
}

function Inspector({
  recipe,
  selection,
  update,
}: {
  recipe: PageRecipe;
  selection: StudioSelection;
  update: (mutator: (next: PageRecipe) => void) => void;
}) {
  if (selection.kind === "page") return <PageInspector recipe={recipe} update={update} />;

  if (selection.kind === "lens" && recipe.organization.kind === "multiple-lenses") {
    const item = recipe.organization.items.find((candidate) => candidate.id === selection.id);
    return item ? <LensInspector recipe={recipe} item={item} update={update} /> : <MissingSelection />;
  }

  if (selection.kind === "regime" && recipe.organization.kind === "split-regimes") {
    const group = recipe.organization.groups.find((candidate) => candidate.id === selection.id);
    return group ? <RegimeInspector recipe={recipe} group={group} update={update} /> : <MissingSelection />;
  }

  if (selection.kind === "navigation-item" && recipe.organization.kind === "split-regimes") {
    const group = recipe.organization.groups.find((candidate) => candidate.id === selection.groupId);
    const item = group?.items.find((candidate) => candidate.id === selection.id);
    return group && item ? (
      <NavigationItemInspector group={group} item={item} update={update} />
    ) : (
      <MissingSelection />
    );
  }

  if (selection.kind === "section") {
    return recipe.sections.some((section) => section.id === selection.id) ? (
      <SectionInspector recipe={recipe} sectionId={selection.id} update={update} />
    ) : (
      <MissingSelection />
    );
  }

  return <MissingSelection />;
}

function PageInspector({
  recipe,
  update,
}: {
  recipe: PageRecipe;
  update: (mutator: (next: PageRecipe) => void) => void;
}) {
  return (
    <div className="space-y-6">
      <InspectorGroup title="Identity" note="Page override">
        <TextField label="Title" value={recipe.identity.title} onChange={(value) => update((next) => { next.identity.title = value; })} />
        <TextField label="Eyebrow" value={recipe.identity.eyebrow} onChange={(value) => update((next) => { next.identity.eyebrow = value; })} />
        <TextArea label="Subtitle" value={recipe.identity.subtitle} rows={5} onChange={(value) => update((next) => { next.identity.subtitle = value; })} />
        <SelectField label="Icon" value={recipe.identity.icon} options={PAGE_ICON_OPTIONS} onChange={(value) => update((next) => { next.identity.icon = value; })} />
      </InspectorGroup>

      <InspectorGroup title="Semantic layout" note="Constrained tokens">
        <SelectField label="Density" value={recipe.theme.density} options={["compact", "balanced", "spacious"]} onChange={(value) => update((next) => { next.theme.density = value as PageDensity; })} />
        <SelectField label="Section gap" value={recipe.theme.sectionGap} options={["sm", "md", "lg"]} onChange={(value) => update((next) => { next.theme.sectionGap = value as PageSectionGap; })} />
        <SelectField label="Panel radius" value={recipe.theme.panelRadius} options={["md", "lg", "xl"]} onChange={(value) => update((next) => { next.theme.panelRadius = value as PagePanelRadius; })} />
        <SelectField label="Surface" value={recipe.theme.surface} options={["clear", "glass", "dense-glass"]} onChange={(value) => update((next) => { next.theme.surface = value as PageSurface; })} />
        <SelectField label="Motion" value={recipe.theme.motion} options={["off", "subtle", "expressive"]} onChange={(value) => update((next) => { next.theme.motion = value as PageMotion; })} />
      </InspectorGroup>

      <InspectorGroup title="Atmosphere" note="Page theme">
        <ColorField label="Accent" rgb={recipe.theme.accentRgb} onChange={(value) => update((next) => { next.theme.accentRgb = value; })} />
        <RangeField label="Surface opacity" value={recipe.theme.surfaceOpacity} min={0.02} max={0.5} step={0.01} format={(value) => `${Math.round(value * 100)}%`} onChange={(value) => update((next) => { next.theme.surfaceOpacity = value; })} />
        <RangeField label="Background strength" value={recipe.theme.backgroundStrength} min={0.2} max={1.5} step={0.05} format={(value) => value.toFixed(2)} onChange={(value) => update((next) => { next.theme.backgroundStrength = value; })} />
      </InspectorGroup>
    </div>
  );
}

function LensInspector({
  recipe,
  item,
  update,
}: {
  recipe: PageRecipe;
  item: LensItem;
  update: (mutator: (next: PageRecipe) => void) => void;
}) {
  const index = recipe.organization.kind === "multiple-lenses"
    ? recipe.organization.items.findIndex((candidate) => candidate.id === item.id)
    : -1;
  return (
    <div className="space-y-6">
      <InspectorGroup title="Lens content" note="Navigation item">
        <TextField label="Label" value={item.label} onChange={(value) => updateLens(update, item.id, (next) => { next.label = value; })} />
        <TextField label="Question" value={item.question} onChange={(value) => updateLens(update, item.id, (next) => { next.question = value; })} />
        <TextArea label="Summary" value={item.summary} rows={5} onChange={(value) => updateLens(update, item.id, (next) => { next.summary = value; })} />
        <SelectField label="Diagram" value={item.visual} options={["timeline", "map", "network"]} onChange={(value) => updateLens(update, item.id, (next) => { next.visual = value as LensItem["visual"]; })} />
        <SelectField label="Icon" value={item.icon} options={PAGE_ICON_OPTIONS} onChange={(value) => updateLens(update, item.id, (next) => { next.icon = value; })} />
        <ColorField label="Accent" rgb={item.accentRgb} onChange={(value) => updateLens(update, item.id, (next) => { next.accentRgb = value; })} />
      </InspectorGroup>
      <OrderControls
        index={index}
        count={recipe.organization.kind === "multiple-lenses" ? recipe.organization.items.length : 0}
        move={(direction) => update((next) => {
          if (next.organization.kind !== "multiple-lenses") return;
          moveInArray(next.organization.items, index, direction);
        })}
      />
    </div>
  );
}

function RegimeInspector({
  recipe,
  group,
  update,
}: {
  recipe: PageRecipe;
  group: RegimeGroup;
  update: (mutator: (next: PageRecipe) => void) => void;
}) {
  const index = recipe.organization.kind === "split-regimes"
    ? recipe.organization.groups.findIndex((candidate) => candidate.id === group.id)
    : -1;
  return (
    <div className="space-y-6">
      <InspectorGroup title="Regime" note="Parallel region">
        <TextField label="Label" value={group.label} onChange={(value) => updateRegime(update, group.id, (next) => { next.label = value; })} />
        <TextField label="Kicker" value={group.kicker} onChange={(value) => updateRegime(update, group.id, (next) => { next.kicker = value; })} />
        <TextArea label="Condition" value={group.condition} rows={3} onChange={(value) => updateRegime(update, group.id, (next) => { next.condition = value; })} />
        <TextArea label="Description" value={group.description} rows={5} onChange={(value) => updateRegime(update, group.id, (next) => { next.description = value; })} />
        <SelectField label="Visual grammar" value={group.visual} options={["classical", "modern", "neutral"]} onChange={(value) => updateRegime(update, group.id, (next) => { next.visual = value as RegimeGroup["visual"]; })} />
        <ColorField label="Accent" rgb={group.accentRgb} onChange={(value) => updateRegime(update, group.id, (next) => { next.accentRgb = value; })} />
      </InspectorGroup>
      <OrderControls
        index={index}
        count={recipe.organization.kind === "split-regimes" ? recipe.organization.groups.length : 0}
        move={(direction) => update((next) => {
          if (next.organization.kind !== "split-regimes") return;
          moveInArray(next.organization.groups, index, direction);
        })}
      />
    </div>
  );
}

function NavigationItemInspector({
  group,
  item,
  update,
}: {
  group: RegimeGroup;
  item: RecipeLink;
  update: (mutator: (next: PageRecipe) => void) => void;
}) {
  const index = group.items.findIndex((candidate) => candidate.id === item.id);
  return (
    <div className="space-y-6">
      <InspectorGroup title="Field" note={group.label}>
        <TextField label="Label" value={item.label} onChange={(value) => updateNavigationItem(update, group.id, item.id, (next) => { next.label = value; })} />
        <TextArea label="Summary" value={item.summary} rows={5} onChange={(value) => updateNavigationItem(update, group.id, item.id, (next) => { next.summary = value; })} />
        <TextField label="Tags" value={(item.tags ?? []).join(" · ")} onChange={(value) => updateNavigationItem(update, group.id, item.id, (next) => { next.tags = value.split(/[·,]/).map((tag) => tag.trim()).filter(Boolean); })} />
        <SelectField label="Icon" value={item.icon} options={PAGE_ICON_OPTIONS} onChange={(value) => updateNavigationItem(update, group.id, item.id, (next) => { next.icon = value; })} />
        <ColorField label="Accent" rgb={item.accentRgb} onChange={(value) => updateNavigationItem(update, group.id, item.id, (next) => { next.accentRgb = value; })} />
      </InspectorGroup>
      <OrderControls
        index={index}
        count={group.items.length}
        move={(direction) => update((next) => {
          if (next.organization.kind !== "split-regimes") return;
          const target = next.organization.groups.find((candidate) => candidate.id === group.id);
          if (target) moveInArray(target.items, index, direction);
        })}
      />
    </div>
  );
}

function SectionInspector({
  recipe,
  sectionId,
  update,
}: {
  recipe: PageRecipe;
  sectionId: string;
  update: (mutator: (next: PageRecipe) => void) => void;
}) {
  const section = recipe.sections.find((candidate) => candidate.id === sectionId);
  if (!section) return <MissingSelection />;
  const index = recipe.sections.findIndex((candidate) => candidate.id === sectionId);
  return (
    <div className="space-y-6">
      <InspectorGroup title="Supporting section" note={section.type}>
        <TextField label="Eyebrow" value={section.eyebrow} onChange={(value) => updateSection(update, sectionId, (next) => { next.eyebrow = value; })} />
        <TextField label="Title" value={section.title} onChange={(value) => updateSection(update, sectionId, (next) => { next.title = value; })} />
        <TextArea label="Summary" value={section.summary} rows={5} onChange={(value) => updateSection(update, sectionId, (next) => { next.summary = value; })} />
        <SelectField label="Icon" value={section.icon} options={PAGE_ICON_OPTIONS} onChange={(value) => updateSection(update, sectionId, (next) => { next.icon = value; })} />
      </InspectorGroup>
      <OrderControls index={index} count={recipe.sections.length} move={(direction) => update((next) => moveInArray(next.sections, index, direction))} />
      <div className="rounded-[14px] border border-white/[0.07] bg-black/20 p-3 text-[10px] leading-5 text-slate-500">
        Nested column and choice editing is the next inspector layer. The section shell, order, title, summary, and icon are already recipe-controlled.
      </div>
    </div>
  );
}

function MissingSelection() {
  return (
    <div className="rounded-[14px] border border-white/[0.07] bg-black/20 p-4 text-[10px] leading-5 text-slate-500">
      That region no longer exists in the current recipe. Select another region in the canvas or structure tree.
    </div>
  );
}

function updateLens(
  update: (mutator: (next: PageRecipe) => void) => void,
  id: string,
  mutator: (item: LensItem) => void,
) {
  update((next) => {
    if (next.organization.kind !== "multiple-lenses") return;
    const item = next.organization.items.find((candidate) => candidate.id === id);
    if (item) mutator(item);
  });
}

function updateRegime(
  update: (mutator: (next: PageRecipe) => void) => void,
  id: string,
  mutator: (group: RegimeGroup) => void,
) {
  update((next) => {
    if (next.organization.kind !== "split-regimes") return;
    const group = next.organization.groups.find((candidate) => candidate.id === id);
    if (group) mutator(group);
  });
}

function updateNavigationItem(
  update: (mutator: (next: PageRecipe) => void) => void,
  groupId: string,
  id: string,
  mutator: (item: RecipeLink) => void,
) {
  update((next) => {
    if (next.organization.kind !== "split-regimes") return;
    const group = next.organization.groups.find((candidate) => candidate.id === groupId);
    const item = group?.items.find((candidate) => candidate.id === id);
    if (item) mutator(item);
  });
}

function updateSection(
  update: (mutator: (next: PageRecipe) => void) => void,
  id: string,
  mutator: (section: PageRecipe["sections"][number]) => void,
) {
  update((next) => {
    const section = next.sections.find((candidate) => candidate.id === id);
    if (section) mutator(section);
  });
}
