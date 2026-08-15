"use client";

import { ArrowRight } from "lucide-react";
import type { DesignGuideCategory, StudioSelection } from "@/app/_page-system/types";
import { PAGE_ICON_OPTIONS } from "@/app/_page-system/icon-registry";
import { IconGridField } from "@/app/studio/_components/DesignFields";
import {
  AddButton,
  ChoiceField,
  ColorField,
  InspectorGroup,
  RangeField,
  TextField,
} from "@/app/studio/_components/InspectorFields";
import { addLens, addRegime, addSection, type UpdateRecipe } from "@/app/studio/_components/studio-operations";
import type { ParameterSheet } from "@/app/studio/_components/studio-types";
import type { GlobalDesignSystem } from "@/lib/design-system/schema";
import type {
  PageCardHeight,
  PageDensity,
  PagePanelRadius,
  PageRecipe,
  PageSectionGap,
  PageSurface,
} from "@/lib/page-system/schema";

export default function DesignGuideInspector({
  recipe,
  resolvedRecipe,
  designSystem,
  category,
  update,
  onSelect,
  onOpenParameters,
}: {
  recipe: PageRecipe;
  resolvedRecipe: PageRecipe;
  designSystem: GlobalDesignSystem;
  category: DesignGuideCategory;
  update: UpdateRecipe;
  onSelect: (selection: StudioSelection) => void;
  onOpenParameters: (sheet: ParameterSheet) => void;
}) {
  if (category === "palette") {
    return (
      <PaletteInspector
        recipe={recipe}
        resolvedRecipe={resolvedRecipe}
        designSystem={designSystem}
        update={update}
        onOpenParameters={onOpenParameters}
      />
    );
  }
  if (category === "typography") {
    return (
      <TypographyInspector
        recipe={recipe}
        designSystem={designSystem}
        update={update}
        onOpenParameters={onOpenParameters}
      />
    );
  }
  if (category === "iconography") {
    return <IconographyInspector recipe={recipe} update={update} onSelect={onSelect} />;
  }
  if (category === "children") {
    return <ChildrenInspector recipe={recipe} update={update} onSelect={onSelect} onOpenParameters={onOpenParameters} />;
  }
  return <WidgetsInspector recipe={recipe} update={update} onSelect={onSelect} onOpenParameters={onOpenParameters} />;
}

function PaletteInspector({
  recipe,
  resolvedRecipe,
  designSystem,
  update,
  onOpenParameters,
}: {
  recipe: PageRecipe;
  resolvedRecipe: PageRecipe;
  designSystem: GlobalDesignSystem;
  update: UpdateRecipe;
  onOpenParameters: (sheet: ParameterSheet) => void;
}) {
  const palette = designSystem.palettes.find((item) => item.id === recipe.theme.paletteId);
  return (
    <div className="space-y-6">
      <InspectorGroup title="Global palette" note="Shared registry">
        <div className="space-y-2">
          {designSystem.palettes.map((item) => {
            const active = recipe.theme.paletteId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => update((next) => { next.theme.paletteId = item.id; })}
                className={`w-full rounded-[12px] border p-3 text-left transition ${active ? "border-cyan-300/24 bg-cyan-400/[0.055]" : "border-white/[0.07] bg-white/[0.018] hover:bg-white/[0.035]"}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex -space-x-1">
                    {[item.roles.primary, item.roles.secondary, item.roles.tertiary, item.roles.quaternary].map((rgb, index) => (
                      <span key={`${item.id}-${index}`} className="h-7 w-7 rounded-full border-2 border-[#0c0f16]" style={{ background: `rgb(${rgb})` }} />
                    ))}
                  </div>
                  {active ? <span className="font-mono text-[7px] uppercase text-cyan-200">linked</span> : null}
                </div>
                <strong className="mt-2 block text-[10px] text-slate-200">{item.label}</strong>
                <span className="mt-1 block text-[8px] leading-4 text-slate-600">{item.description}</span>
              </button>
            );
          })}
        </div>
        <button type="button" onClick={() => onOpenParameters("palettes")} className="flex w-full items-center justify-between rounded-[10px] border border-cyan-300/14 bg-cyan-400/[0.03] px-3 py-2.5 text-[9px] text-cyan-100/75">
          Edit all palette roles <ArrowRight size={12} />
        </button>
      </InspectorGroup>

      <InspectorGroup title="Resolved roles" note={palette?.label ?? "Custom colors"}>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(resolvedRecipe.theme.resolvedPalette ?? { primary: resolvedRecipe.theme.accentRgb }).map(([role, rgb]) => (
            <div key={role} className="rounded-[10px] border border-white/[0.07] bg-black/20 p-2.5">
              <div className="h-7 rounded-[7px]" style={{ background: `rgb(${rgb})` }} />
              <div className="mt-2 font-mono text-[7px] uppercase text-slate-600">{role}</div>
            </div>
          ))}
        </div>
      </InspectorGroup>

      <InspectorGroup title="Page fallback" note="Used without a palette">
        <ColorField label="Custom primary" rgb={recipe.theme.accentRgb} onChange={(value) => update((next) => { next.theme.accentRgb = value; next.theme.paletteId = undefined; })} />
        <RangeField label="Background strength" value={recipe.theme.backgroundStrength} min={0.2} max={1.5} step={0.05} format={(value) => value.toFixed(2)} onChange={(value) => update((next) => { next.theme.backgroundStrength = value; })} />
      </InspectorGroup>
    </div>
  );
}

function TypographyInspector({
  recipe,
  designSystem,
  update,
  onOpenParameters,
}: {
  recipe: PageRecipe;
  designSystem: GlobalDesignSystem;
  update: UpdateRecipe;
  onOpenParameters: (sheet: ParameterSheet) => void;
}) {
  return (
    <div className="space-y-6">
      <InspectorGroup title="Global typography" note="Shared registry">
        <div className="space-y-2">
          {designSystem.typography.map((preset) => {
            const active = recipe.theme.typographyId === preset.id;
            return (
              <button key={preset.id} type="button" onClick={() => update((next) => { next.theme.typographyId = preset.id; })} className={`w-full rounded-[12px] border p-3 text-left transition ${active ? "border-cyan-300/24 bg-cyan-400/[0.055]" : "border-white/[0.07] bg-white/[0.018] hover:bg-white/[0.035]"}`}>
                <strong className={`block text-[13px] text-white ${preset.displayFont === "serif" ? "font-serif" : preset.displayFont === "mono" ? "font-mono" : "font-sans"} ${preset.titleCase === "uppercase" ? "uppercase" : ""}`}>{preset.label}</strong>
                <span className="mt-1 block text-[8px] leading-4 text-slate-600">{preset.description}</span>
                <span className="mt-2 block font-mono text-[7px] uppercase text-slate-700">{preset.displayFont} · {preset.bodyFont} · {preset.eyebrowStyle}</span>
              </button>
            );
          })}
        </div>
        <button type="button" onClick={() => onOpenParameters("typography")} className="flex w-full items-center justify-between rounded-[10px] border border-cyan-300/14 bg-cyan-400/[0.03] px-3 py-2.5 text-[9px] text-cyan-100/75">
          Edit typography registry <ArrowRight size={12} />
        </button>
      </InspectorGroup>
      <InspectorGroup title="Page context" note="Text content">
        <TextField label="Eyebrow" value={recipe.identity.eyebrow} onChange={(value) => update((next) => { next.identity.eyebrow = value; })} />
      </InspectorGroup>
    </div>
  );
}

function IconographyInspector({ recipe, update, onSelect }: { recipe: PageRecipe; update: UpdateRecipe; onSelect: (selection: StudioSelection) => void }) {
  const children = childEntries(recipe);
  return (
    <div className="space-y-6">
      <InspectorGroup title="Page icon" note="Identity symbol">
        <IconGridField label="Page icon" value={recipe.identity.icon} options={PAGE_ICON_OPTIONS} onChange={(value) => update((next) => { next.identity.icon = value; })} />
      </InspectorGroup>
      <InspectorGroup title="Child symbols" note={`${children.length} destinations`}>
        <div className="space-y-1.5">
          {children.map((child) => (
            <button key={child.key} type="button" onClick={() => onSelect(child.selection)} className="flex w-full items-center justify-between rounded-[10px] border border-white/[0.07] bg-white/[0.018] px-3 py-2.5 text-left hover:bg-white/[0.035]">
              <span className="truncate text-[9px] text-slate-400">{child.label}</span>
              <span className="flex items-center gap-2 font-mono text-[8px] text-slate-700">{child.icon}<ArrowRight size={10} /></span>
            </button>
          ))}
        </div>
      </InspectorGroup>
    </div>
  );
}

function ChildrenInspector({ recipe, update, onSelect, onOpenParameters }: { recipe: PageRecipe; update: UpdateRecipe; onSelect: (selection: StudioSelection) => void; onOpenParameters: (sheet: ParameterSheet) => void }) {
  const children = childEntries(recipe);
  return (
    <div className="space-y-6">
      <InspectorGroup title="Topology" note={`${children.length} direct children`}>
        {recipe.organization.kind === "multiple-lenses" ? (
          <>
            <ChoiceField label="Columns" value={String(recipe.organization.columns ?? 3)} options={["1", "2", "3"]} columns={3} onChange={(value) => update((next) => { if (next.organization.kind === "multiple-lenses") next.organization.columns = Number(value) as 1 | 2 | 3; })} />
            <ChoiceField label="Card height" value={recipe.organization.cardHeight ?? "standard"} options={["compact", "standard", "tall"]} columns={3} onChange={(value) => update((next) => { if (next.organization.kind === "multiple-lenses") next.organization.cardHeight = value as PageCardHeight; })} />
            <AddButton label="Add lens" onClick={() => addLens(recipe, update, onSelect)} />
          </>
        ) : (
          <>
            <ChoiceField label="Regime columns" value={String(recipe.organization.groupColumns ?? 2)} options={["1", "2"]} onChange={(value) => update((next) => { if (next.organization.kind === "split-regimes") next.organization.groupColumns = Number(value) as 1 | 2; })} />
            <ChoiceField label="Fields per row" value={String(recipe.organization.itemColumns ?? 2)} options={["1", "2"]} onChange={(value) => update((next) => { if (next.organization.kind === "split-regimes") next.organization.itemColumns = Number(value) as 1 | 2; })} />
            <AddButton label="Add regime" onClick={() => addRegime(recipe, update, onSelect)} />
          </>
        )}
        <button type="button" onClick={() => onOpenParameters("children")} className="flex w-full items-center justify-between rounded-[10px] border border-cyan-300/14 bg-cyan-400/[0.03] px-3 py-2.5 text-[9px] text-cyan-100/75">Open children matrix <ArrowRight size={12} /></button>
      </InspectorGroup>
      <InspectorGroup title="Inventory" note="Select to edit">
        <div className="space-y-1.5">
          {children.map((child, index) => (
            <button key={child.key} type="button" onClick={() => onSelect(child.selection)} className="flex w-full items-center gap-3 rounded-[10px] border border-white/[0.07] bg-white/[0.018] px-3 py-2.5 text-left hover:bg-white/[0.035]">
              <span className="font-mono text-[8px] text-slate-700">{String(index + 1).padStart(2, "0")}</span>
              <span className="min-w-0 flex-1 truncate text-[9px] text-slate-400">{child.label}</span>
              <ArrowRight size={10} className="text-slate-700" />
            </button>
          ))}
        </div>
      </InspectorGroup>
    </div>
  );
}

function WidgetsInspector({ recipe, update, onSelect, onOpenParameters }: { recipe: PageRecipe; update: UpdateRecipe; onSelect: (selection: StudioSelection) => void; onOpenParameters: (sheet: ParameterSheet) => void }) {
  return (
    <div className="space-y-6">
      <InspectorGroup title="Widget shell" note="Shared section grammar">
        <ChoiceField label="Density" value={recipe.theme.density} options={["compact", "balanced", "spacious"]} columns={3} onChange={(value) => update((next) => { next.theme.density = value as PageDensity; })} />
        <ChoiceField label="Section gap" value={recipe.theme.sectionGap} options={["sm", "md", "lg"]} columns={3} onChange={(value) => update((next) => { next.theme.sectionGap = value as PageSectionGap; })} />
        <ChoiceField label="Radius" value={recipe.theme.panelRadius} options={["md", "lg", "xl"]} columns={3} onChange={(value) => update((next) => { next.theme.panelRadius = value as PagePanelRadius; })} />
        <ChoiceField label="Surface" value={recipe.theme.surface} options={["clear", "glass", "dense-glass"]} columns={3} onChange={(value) => update((next) => { next.theme.surface = value as PageSurface; })} />
        <button type="button" onClick={() => onOpenParameters("widgets")} className="flex w-full items-center justify-between rounded-[10px] border border-cyan-300/14 bg-cyan-400/[0.03] px-3 py-2.5 text-[9px] text-cyan-100/75">Open widgets matrix <ArrowRight size={12} /></button>
      </InspectorGroup>
      <InspectorGroup title="Widget inventory" note={`${recipe.sections.length} sections`}>
        <div className="space-y-1.5">
          {recipe.sections.map((section) => (
            <button key={section.id} type="button" onClick={() => onSelect({ kind: "section", id: section.id })} className="flex w-full items-center justify-between rounded-[10px] border border-white/[0.07] bg-white/[0.018] px-3 py-2.5 text-left hover:bg-white/[0.035]">
              <span className="truncate text-[9px] text-slate-400">{section.title}</span>
              <span className="font-mono text-[7px] uppercase text-slate-700">{section.type}</span>
            </button>
          ))}
        </div>
        <AddButton label="Add case study" onClick={() => addSection(recipe, "case-study", update, onSelect)} />
        <AddButton label="Add model guide" onClick={() => addSection(recipe, "model-guide", update, onSelect)} />
      </InspectorGroup>
    </div>
  );
}

function childEntries(recipe: PageRecipe) {
  if (recipe.organization.kind === "multiple-lenses") {
    return recipe.organization.items.map((item) => ({ key: item.id, label: item.label, icon: item.icon, selection: { kind: "lens" as const, id: item.id } }));
  }
  return recipe.organization.groups.flatMap((group) => group.items.map((item) => ({ key: `${group.id}:${item.id}`, label: item.label, icon: item.icon, selection: { kind: "navigation-item" as const, groupId: group.id, id: item.id } })));
}
