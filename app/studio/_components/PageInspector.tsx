"use client";

import { ArrowRight } from "lucide-react";
import type { StudioSelection } from "@/app/_page-system/types";
import { PAGE_ICON_OPTIONS } from "@/app/_page-system/icon-registry";
import {
  AddButton,
  ChoiceField,
  InspectorGroup,
  PaletteField,
  PresetGrid,
  RangeField,
  SelectField,
  TextArea,
  TextField,
} from "@/app/studio/_components/InspectorFields";
import {
  PAGE_PALETTES,
  STYLE_PRESETS,
  applyStylePreset,
} from "@/app/studio/_components/studio-presets";
import {
  addLens,
  addRegime,
  addSection,
  type UpdateRecipe,
} from "@/app/studio/_components/studio-operations";
import type { ParameterSheet } from "@/app/studio/_components/studio-types";
import type { GlobalDesignSystem } from "@/lib/design-system/schema";
import type {
  PageBorderStrength,
  PageCardHeight,
  PageContentWidth,
  PageDensity,
  PageHeaderScale,
  PageMotion,
  PagePanelRadius,
  PageRecipe,
  PageSectionGap,
  PageShadow,
  PageSurface,
} from "@/lib/page-system/schema";

export default function PageInspector({
  recipe,
  designSystem,
  update,
  onSelect,
  onOpenParameters,
}: {
  recipe: PageRecipe;
  designSystem: GlobalDesignSystem;
  update: UpdateRecipe;
  onSelect: (selection: StudioSelection) => void;
  onOpenParameters: (sheet: ParameterSheet) => void;
}) {
  return (
    <div className="space-y-6">
      <InspectorGroup title="Quick style" note="Whole-page presets">
        <PresetGrid
          presets={STYLE_PRESETS}
          onApply={(id) => update((next) => applyStylePreset(next, id))}
        />
      </InspectorGroup>

      <InspectorGroup title="Global links" note="Inherited systems">
        <SelectField
          label="Palette"
          value={recipe.theme.paletteId ?? ""}
          options={["", ...designSystem.palettes.map((palette) => palette.id)]}
          onChange={(value) => update((next) => { next.theme.paletteId = value || undefined; })}
        />
        <SelectField
          label="Typography"
          value={recipe.theme.typographyId ?? ""}
          options={["", ...designSystem.typography.map((preset) => preset.id)]}
          onChange={(value) => update((next) => { next.theme.typographyId = value || undefined; })}
        />
        <button
          type="button"
          onClick={() => onOpenParameters("pages")}
          className="inline-flex w-full items-center justify-center gap-2 rounded-[10px] border border-dashed border-cyan-300/15 bg-cyan-400/[0.025] px-3 py-2.5 text-[9px] text-cyan-100/70"
        >
          Compare every page in the parameter matrix <ArrowRight size={11} />
        </button>
      </InspectorGroup>

      <InspectorGroup title="Identity" note="Page override">
        <TextField label="Title" value={recipe.identity.title} onChange={(value) => update((next) => { next.identity.title = value; })} />
        <TextField label="Eyebrow" value={recipe.identity.eyebrow} onChange={(value) => update((next) => { next.identity.eyebrow = value; })} />
        <TextArea label="Subtitle" value={recipe.identity.subtitle} rows={5} onChange={(value) => update((next) => { next.identity.subtitle = value; })} />
        <SelectField label="Icon" value={recipe.identity.icon} options={PAGE_ICON_OPTIONS} onChange={(value) => update((next) => { next.identity.icon = value; })} />
      </InspectorGroup>

      <InspectorGroup title="Composition" note="Semantic tokens">
        <ChoiceField label="Content width" value={recipe.theme.contentWidth ?? "standard"} options={["focused", "standard", "wide"]} columns={3} onChange={(value) => update((next) => { next.theme.contentWidth = value as PageContentWidth; })} />
        <ChoiceField label="Header scale" value={recipe.theme.headerScale ?? "standard"} options={["compact", "standard", "display"]} columns={3} onChange={(value) => update((next) => { next.theme.headerScale = value as PageHeaderScale; })} />
        <ChoiceField label="Density" value={recipe.theme.density} options={["compact", "balanced", "spacious"]} columns={3} onChange={(value) => update((next) => { next.theme.density = value as PageDensity; })} />
        <ChoiceField label="Section gap" value={recipe.theme.sectionGap} options={["sm", "md", "lg"]} columns={3} onChange={(value) => update((next) => { next.theme.sectionGap = value as PageSectionGap; })} />
        <ChoiceField label="Panel radius" value={recipe.theme.panelRadius} options={["md", "lg", "xl"]} columns={3} onChange={(value) => update((next) => { next.theme.panelRadius = value as PagePanelRadius; })} />
      </InspectorGroup>

      <InspectorGroup title="Surfaces" note="Depth and emphasis">
        <ChoiceField label="Surface" value={recipe.theme.surface} options={["clear", "glass", "dense-glass"]} columns={3} onChange={(value) => update((next) => { next.theme.surface = value as PageSurface; })} />
        <ChoiceField label="Border" value={recipe.theme.borderStrength ?? "standard"} options={["subtle", "standard", "strong"]} columns={3} onChange={(value) => update((next) => { next.theme.borderStrength = value as PageBorderStrength; })} />
        <ChoiceField label="Shadow" value={recipe.theme.shadow ?? "soft"} options={["none", "soft", "dramatic"]} columns={3} onChange={(value) => update((next) => { next.theme.shadow = value as PageShadow; })} />
        <RangeField label="Surface opacity" value={recipe.theme.surfaceOpacity} min={0.02} max={0.5} step={0.01} format={(value) => `${Math.round(value * 100)}%`} onChange={(value) => update((next) => { next.theme.surfaceOpacity = value; })} />
      </InspectorGroup>

      <InspectorGroup title="Atmosphere" note="Page-level fallback">
        <PaletteField label="Custom accent fallback" value={recipe.theme.accentRgb} colors={PAGE_PALETTES} onChange={(value) => update((next) => { next.theme.accentRgb = value; next.theme.paletteId = undefined; })} />
        <ChoiceField label="Motion" value={recipe.theme.motion} options={["off", "subtle", "expressive"]} columns={3} onChange={(value) => update((next) => { next.theme.motion = value as PageMotion; })} />
        <RangeField label="Background strength" value={recipe.theme.backgroundStrength} min={0.2} max={1.5} step={0.05} format={(value) => value.toFixed(2)} onChange={(value) => update((next) => { next.theme.backgroundStrength = value; })} />
      </InspectorGroup>

      {recipe.organization.kind === "multiple-lenses" ? (
        <InspectorGroup title="Lens layout" note="Navigation topology">
          <TextField label="Section eyebrow" value={recipe.organization.eyebrow} onChange={(value) => update((next) => { if (next.organization.kind === "multiple-lenses") next.organization.eyebrow = value; })} />
          <TextField label="Section title" value={recipe.organization.title} onChange={(value) => update((next) => { if (next.organization.kind === "multiple-lenses") next.organization.title = value; })} />
          <TextArea label="Section description" value={recipe.organization.description} rows={4} onChange={(value) => update((next) => { if (next.organization.kind === "multiple-lenses") next.organization.description = value; })} />
          <ChoiceField label="Columns" value={String(recipe.organization.columns ?? 3)} options={["1", "2", "3"]} columns={3} onChange={(value) => update((next) => { if (next.organization.kind === "multiple-lenses") next.organization.columns = Number(value) as 1 | 2 | 3; })} />
          <ChoiceField label="Card height" value={recipe.organization.cardHeight ?? "standard"} options={["compact", "standard", "tall"]} columns={3} onChange={(value) => update((next) => { if (next.organization.kind === "multiple-lenses") next.organization.cardHeight = value as PageCardHeight; })} />
          <AddButton label="Add a lens" onClick={() => addLens(recipe, update, onSelect)} />
        </InspectorGroup>
      ) : (
        <InspectorGroup title="Regime layout" note="Navigation topology">
          <ChoiceField label="Regime columns" value={String(recipe.organization.groupColumns ?? 2)} options={["1", "2"]} onChange={(value) => update((next) => { if (next.organization.kind === "split-regimes") next.organization.groupColumns = Number(value) as 1 | 2; })} />
          <ChoiceField label="Fields per row" value={String(recipe.organization.itemColumns ?? 2)} options={["1", "2"]} onChange={(value) => update((next) => { if (next.organization.kind === "split-regimes") next.organization.itemColumns = Number(value) as 1 | 2; })} />
          <AddButton label="Add a regime" onClick={() => addRegime(recipe, update, onSelect)} />
        </InspectorGroup>
      )}

      <InspectorGroup title="Supporting sections" note={`${recipe.sections.length} sections`}>
        <AddButton label="Add case study" onClick={() => addSection(recipe, "case-study", update, onSelect)} />
        <AddButton label="Add model guide" onClick={() => addSection(recipe, "model-guide", update, onSelect)} />
      </InspectorGroup>
    </div>
  );
}
