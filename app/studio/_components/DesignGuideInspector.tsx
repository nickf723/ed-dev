"use client";

import {
  ArrowRight,
  Boxes,
  LayoutPanelTop,
  Palette,
  Shapes,
  Type,
} from "lucide-react";
import type {
  DesignGuideCategory,
  StudioSelection,
} from "@/app/_page-system/types";
import { PAGE_ICON_OPTIONS } from "@/app/_page-system/icon-registry";
import {
  AddButton,
  ChoiceField,
  ColorField,
  InspectorGroup,
  RangeField,
  TextField,
} from "@/app/studio/_components/InspectorFields";
import {
  IconGridField,
  PaletteSystemField,
} from "@/app/studio/_components/DesignFields";
import {
  addLens,
  addRegime,
  addSection,
  type UpdateRecipe,
} from "@/app/studio/_components/studio-operations";
import {
  SYSTEM_PALETTES,
  applyPalettePreset,
} from "@/app/studio/_components/studio-presets";
import type {
  PageCardHeight,
  PageDensity,
  PageEyebrowStyle,
  PageFontFamily,
  PageHeaderScale,
  PagePanelRadius,
  PageRecipe,
  PageSectionGap,
  PageSurface,
  PageTitleCase,
} from "@/lib/page-system/schema";

export default function DesignGuideInspector({
  recipe,
  category,
  update,
  onSelect,
}: {
  recipe: PageRecipe;
  category: DesignGuideCategory;
  update: UpdateRecipe;
  onSelect: (selection: StudioSelection) => void;
}) {
  if (category === "palette") {
    return <PaletteInspector recipe={recipe} update={update} />;
  }
  if (category === "typography") {
    return <TypographyInspector recipe={recipe} update={update} />;
  }
  if (category === "iconography") {
    return (
      <IconographyInspector
        recipe={recipe}
        update={update}
        onSelect={onSelect}
      />
    );
  }
  if (category === "children") {
    return (
      <ChildrenInspector
        recipe={recipe}
        update={update}
        onSelect={onSelect}
      />
    );
  }
  return (
    <WidgetsInspector
      recipe={recipe}
      update={update}
      onSelect={onSelect}
    />
  );
}

function PaletteInspector({
  recipe,
  update,
}: {
  recipe: PageRecipe;
  update: UpdateRecipe;
}) {
  return (
    <div className="space-y-6">
      <InspectorGroup title="System palette" note="Propagates through recipe">
        <PaletteSystemField
          value={recipe.theme.accentRgb}
          presets={SYSTEM_PALETTES}
          onApply={(id) => update((next) => applyPalettePreset(next, id))}
        />
      </InspectorGroup>

      <InspectorGroup title="Custom primary" note="Page accent">
        <ColorField
          label="Primary accent"
          rgb={recipe.theme.accentRgb}
          onChange={(value) =>
            update((next) => {
              next.theme.accentRgb = value;
            })
          }
        />
        <RangeField
          label="Background strength"
          value={recipe.theme.backgroundStrength}
          min={0.2}
          max={1.5}
          step={0.05}
          format={(value) => value.toFixed(2)}
          onChange={(value) =>
            update((next) => {
              next.theme.backgroundStrength = value;
            })
          }
        />
        <div className="rounded-[12px] border border-white/[0.07] bg-black/20 p-3 text-[9px] leading-5 text-slate-600">
          A system palette updates the page accent, child accents, regime accents, and nested widget accents together. Individual colors remain editable afterward.
        </div>
      </InspectorGroup>
    </div>
  );
}

function TypographyInspector({
  recipe,
  update,
}: {
  recipe: PageRecipe;
  update: UpdateRecipe;
}) {
  const defaultDisplay = recipe.theme.family === "history" ? "serif" : "mono";
  const defaultCase = recipe.theme.family === "history" ? "natural" : "uppercase";
  const defaultEyebrow = recipe.theme.family === "history" ? "rule" : "dot";

  return (
    <div className="space-y-6">
      <InspectorGroup title="Font roles" note="Semantic typography">
        <ChoiceField
          label="Display font"
          value={recipe.theme.displayFont ?? defaultDisplay}
          options={["serif", "sans", "mono"]}
          columns={3}
          onChange={(value) =>
            update((next) => {
              next.theme.displayFont = value as PageFontFamily;
            })
          }
        />
        <ChoiceField
          label="Body font"
          value={recipe.theme.bodyFont ?? "sans"}
          options={["serif", "sans", "mono"]}
          columns={3}
          onChange={(value) =>
            update((next) => {
              next.theme.bodyFont = value as PageFontFamily;
            })
          }
        />
        <ChoiceField
          label="Title case"
          value={recipe.theme.titleCase ?? defaultCase}
          options={[
            { value: "natural", label: "Natural" },
            { value: "uppercase", label: "Uppercase" },
          ]}
          onChange={(value) =>
            update((next) => {
              next.theme.titleCase = value as PageTitleCase;
            })
          }
        />
        <ChoiceField
          label="Header scale"
          value={recipe.theme.headerScale ?? "standard"}
          options={["compact", "standard", "display"]}
          columns={3}
          onChange={(value) =>
            update((next) => {
              next.theme.headerScale = value as PageHeaderScale;
            })
          }
        />
      </InspectorGroup>

      <InspectorGroup title="Eyebrow" note="Context label">
        <TextField
          label="Eyebrow text"
          value={recipe.identity.eyebrow}
          onChange={(value) =>
            update((next) => {
              next.identity.eyebrow = value;
            })
          }
        />
        <ChoiceField
          label="Eyebrow style"
          value={recipe.theme.eyebrowStyle ?? defaultEyebrow}
          options={["dot", "rule", "pill", "plain"]}
          onChange={(value) =>
            update((next) => {
              next.theme.eyebrowStyle = value as PageEyebrowStyle;
            })
          }
        />
      </InspectorGroup>
    </div>
  );
}

function IconographyInspector({
  recipe,
  update,
  onSelect,
}: {
  recipe: PageRecipe;
  update: UpdateRecipe;
  onSelect: (selection: StudioSelection) => void;
}) {
  const children = childSelections(recipe);

  return (
    <div className="space-y-6">
      <InspectorGroup title="Page symbol" note="Identity icon">
        <IconGridField
          label="Page icon"
          value={recipe.identity.icon}
          options={PAGE_ICON_OPTIONS}
          onChange={(value) =>
            update((next) => {
              next.identity.icon = value;
            })
          }
        />
      </InspectorGroup>

      <InspectorGroup title="Child iconography" note={`${children.length} children`}>
        <div className="space-y-1.5">
          {children.map((child) => (
            <button
              key={child.id}
              type="button"
              onClick={() => onSelect(child.selection)}
              className="flex w-full items-center justify-between rounded-[10px] border border-white/[0.07] bg-white/[0.018] px-3 py-2.5 text-left transition hover:border-white/[0.14] hover:bg-white/[0.035]"
            >
              <span className="min-w-0 truncate text-[9px] text-slate-400">
                {child.label}
              </span>
              <span className="flex items-center gap-1 font-mono text-[8px] text-slate-700">
                {child.icon} <ArrowRight size={10} />
              </span>
            </button>
          ))}
        </div>
        <div className="rounded-[12px] border border-white/[0.07] bg-black/20 p-3 text-[9px] leading-5 text-slate-600">
          Select a child to change its icon, status, route, summary, tags, and individual accent.
        </div>
      </InspectorGroup>
    </div>
  );
}

function ChildrenInspector({
  recipe,
  update,
  onSelect,
}: {
  recipe: PageRecipe;
  update: UpdateRecipe;
  onSelect: (selection: StudioSelection) => void;
}) {
  const children = childSelections(recipe);

  return (
    <div className="space-y-6">
      {recipe.organization.kind === "multiple-lenses" ? (
        <InspectorGroup title="Lens topology" note={`${children.length} children`}>
          <ChoiceField
            label="Columns"
            value={String(recipe.organization.columns ?? 3)}
            options={["1", "2", "3"]}
            columns={3}
            onChange={(value) =>
              update((next) => {
                if (next.organization.kind === "multiple-lenses") {
                  next.organization.columns = Number(value) as 1 | 2 | 3;
                }
              })
            }
          />
          <ChoiceField
            label="Card height"
            value={recipe.organization.cardHeight ?? "standard"}
            options={["compact", "standard", "tall"]}
            columns={3}
            onChange={(value) =>
              update((next) => {
                if (next.organization.kind === "multiple-lenses") {
                  next.organization.cardHeight = value as PageCardHeight;
                }
              })
            }
          />
          <AddButton
            label="Add another lens"
            onClick={() => addLens(recipe, update, onSelect)}
          />
        </InspectorGroup>
      ) : (
        <InspectorGroup title="Regime topology" note={`${children.length} fields`}>
          <ChoiceField
            label="Regime columns"
            value={String(recipe.organization.groupColumns ?? 2)}
            options={["1", "2"]}
            onChange={(value) =>
              update((next) => {
                if (next.organization.kind === "split-regimes") {
                  next.organization.groupColumns = Number(value) as 1 | 2;
                }
              })
            }
          />
          <ChoiceField
            label="Fields per row"
            value={String(recipe.organization.itemColumns ?? 2)}
            options={["1", "2"]}
            onChange={(value) =>
              update((next) => {
                if (next.organization.kind === "split-regimes") {
                  next.organization.itemColumns = Number(value) as 1 | 2;
                }
              })
            }
          />
          <AddButton
            label="Add another regime"
            onClick={() => addRegime(recipe, update, onSelect)}
          />
        </InspectorGroup>
      )}

      <InspectorGroup title="Child inventory" note="Select to edit">
        <div className="space-y-1.5">
          {children.map((child, index) => (
            <button
              key={child.id}
              type="button"
              onClick={() => onSelect(child.selection)}
              className="flex w-full items-center gap-3 rounded-[10px] border border-white/[0.07] bg-white/[0.018] px-3 py-2.5 text-left transition hover:border-white/[0.14] hover:bg-white/[0.035]"
            >
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[7px] font-mono text-[8px]"
                style={{
                  color: `rgb(${child.accentRgb})`,
                  background: `rgba(${child.accentRgb},0.07)`,
                }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0 flex-1 truncate text-[9px] text-slate-400">
                {child.label}
              </span>
              <ArrowRight size={11} className="text-slate-700" />
            </button>
          ))}
        </div>
      </InspectorGroup>
    </div>
  );
}

function WidgetsInspector({
  recipe,
  update,
  onSelect,
}: {
  recipe: PageRecipe;
  update: UpdateRecipe;
  onSelect: (selection: StudioSelection) => void;
}) {
  return (
    <div className="space-y-6">
      <InspectorGroup title="Widget shell" note="Shared section language">
        <ChoiceField
          label="Density"
          value={recipe.theme.density}
          options={["compact", "balanced", "spacious"]}
          columns={3}
          onChange={(value) =>
            update((next) => {
              next.theme.density = value as PageDensity;
            })
          }
        />
        <ChoiceField
          label="Section gap"
          value={recipe.theme.sectionGap}
          options={["sm", "md", "lg"]}
          columns={3}
          onChange={(value) =>
            update((next) => {
              next.theme.sectionGap = value as PageSectionGap;
            })
          }
        />
        <ChoiceField
          label="Panel radius"
          value={recipe.theme.panelRadius}
          options={["md", "lg", "xl"]}
          columns={3}
          onChange={(value) =>
            update((next) => {
              next.theme.panelRadius = value as PagePanelRadius;
            })
          }
        />
        <ChoiceField
          label="Surface"
          value={recipe.theme.surface}
          options={["clear", "glass", "dense-glass"]}
          columns={3}
          onChange={(value) =>
            update((next) => {
              next.theme.surface = value as PageSurface;
            })
          }
        />
        <RangeField
          label="Surface opacity"
          value={recipe.theme.surfaceOpacity}
          min={0.02}
          max={0.5}
          step={0.01}
          format={(value) => `${Math.round(value * 100)}%`}
          onChange={(value) =>
            update((next) => {
              next.theme.surfaceOpacity = value;
            })
          }
        />
      </InspectorGroup>

      <InspectorGroup title="Widget inventory" note={`${recipe.sections.length} sections`}>
        <div className="space-y-1.5">
          {recipe.sections.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => onSelect({ kind: "section", id: section.id })}
              className="flex w-full items-center justify-between rounded-[10px] border border-white/[0.07] bg-white/[0.018] px-3 py-2.5 text-left transition hover:border-white/[0.14] hover:bg-white/[0.035]"
            >
              <span className="min-w-0 truncate text-[9px] text-slate-400">
                {section.title}
              </span>
              <span className="flex items-center gap-1 font-mono text-[8px] text-slate-700">
                {section.type} <ArrowRight size={10} />
              </span>
            </button>
          ))}
        </div>
        <AddButton
          label="Add case-study widget"
          onClick={() => addSection(recipe, "case-study", update, onSelect)}
        />
        <AddButton
          label="Add model-guide widget"
          onClick={() => addSection(recipe, "model-guide", update, onSelect)}
        />
      </InspectorGroup>
    </div>
  );
}

function childSelections(recipe: PageRecipe) {
  if (recipe.organization.kind === "multiple-lenses") {
    return recipe.organization.items.map((item) => ({
      id: item.id,
      label: item.label,
      icon: item.icon,
      accentRgb: item.accentRgb,
      selection: { kind: "lens" as const, id: item.id },
    }));
  }

  return recipe.organization.groups.flatMap((group) =>
    group.items.map((item) => ({
      id: `${group.id}:${item.id}`,
      label: item.label,
      icon: item.icon,
      accentRgb: item.accentRgb,
      selection: {
        kind: "navigation-item" as const,
        groupId: group.id,
        id: item.id,
      },
    })),
  );
}

export const DESIGN_CATEGORY_META: Record<
  DesignGuideCategory,
  { label: string; description: string; icon: typeof Palette }
> = {
  palette: {
    label: "Palette",
    description: "Page, child, and widget color roles",
    icon: Palette,
  },
  typography: {
    label: "Typography",
    description: "Fonts, title case, scale, and eyebrows",
    icon: Type,
  },
  iconography: {
    label: "Iconography",
    description: "Page identity and child symbols",
    icon: Shapes,
  },
  children: {
    label: "Children",
    description: "Direct destinations and topology",
    icon: Boxes,
  },
  widgets: {
    label: "Widgets",
    description: "Supporting sections and shared shell",
    icon: LayoutPanelTop,
  },
};
