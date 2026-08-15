"use client";

import type { MouseEvent as ReactMouseEvent, ReactNode } from "react";
import {
  Boxes,
  CheckCircle2,
  LayoutPanelTop,
  Palette,
  Shapes,
  Type,
} from "lucide-react";
import RecipeBackground from "@/app/_page-system/RecipeBackground";
import { resolvePageIcon } from "@/app/_page-system/icon-registry";
import {
  bodyFontClass,
  borderAlpha,
  contentWidth,
  displayFontClass,
  headingClass,
  labelFontClass,
  panelShadow,
  regionRing,
  surfaceColor,
  titleClass,
} from "@/app/_page-system/page-style";
import {
  selectionKey,
  type DesignGuideCategory,
  type StudioSelection,
} from "@/app/_page-system/types";
import type { PageRecipe, RecipeLink } from "@/lib/page-system/schema";

type StyleGuideCanvasProps = {
  recipe: PageRecipe;
  selected: StudioSelection;
  showGuides: boolean;
  motionEnabled: boolean;
  onSelect: (selection: StudioSelection) => void;
};

type ChildEntry = {
  item: RecipeLink;
  selection: StudioSelection;
};

export default function StyleGuideCanvas({
  recipe,
  selected,
  showGuides,
  motionEnabled,
  onSelect,
}: StyleGuideCanvasProps) {
  const children = childEntries(recipe);
  const palette = paletteEntries(recipe, children);

  return (
    <main
      className={`relative min-h-screen overflow-x-hidden text-slate-100 ${bodyFontClass(recipe)}`}
      style={{
        background: recipe.theme.family === "history" ? "#070503" : "#03070d",
      }}
    >
      <RecipeBackground
        recipe={recipe}
        preview
        motion={motionEnabled && recipe.theme.motion !== "off"}
      />

      <div
        className={`relative z-10 mx-auto w-full px-5 pb-12 pt-7 sm:px-7 ${contentWidth(recipe)}`}
      >
        <div className="flex flex-col gap-4 border-b border-white/[0.08] pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div
              className={`${labelFontClass(recipe)} text-[9px] font-semibold uppercase tracking-[0.18em]`}
              style={{ color: `rgba(${recipe.theme.accentRgb},0.78)` }}
            >
              Parameterized style guide
            </div>
            <h1 className={`mt-2 ${displayFontClass(recipe)} text-[clamp(2.2rem,4.2vw,4.6rem)] font-semibold tracking-[-0.05em] text-white`}>
              {recipe.identity.title} component workbench
            </h1>
          </div>
          <p className="max-w-xl text-[12px] leading-6 text-slate-400">
            Each specimen is generated from the same recipe as the page. Change a parameter once, then inspect how it propagates through identity, navigation, and supporting widgets.
          </p>
        </div>

        <div className="mt-5 grid gap-4 xl:grid-cols-[0.82fr_1.18fr]">
          <GuidePanel
            category="palette"
            icon={<Palette size={15} />}
            title="Color palette"
            note="Page and component accents"
            recipe={recipe}
            selected={selected}
            showGuides={showGuides}
            onSelect={onSelect}
          >
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-2">
              {palette.map((color) => (
                <div
                  key={color.label}
                  className="overflow-hidden rounded-[16px] border border-white/[0.08] bg-black/20"
                >
                  <div
                    className="h-20"
                    style={{
                      background: `linear-gradient(145deg, rgba(${color.rgb},0.98), rgba(${color.rgb},0.42))`,
                    }}
                  />
                  <div className="px-3 py-2.5">
                    <strong className="block text-[10px] text-slate-200">
                      {color.label}
                    </strong>
                    <span className="mt-0.5 block font-mono text-[8px] text-slate-600">
                      {color.rgb}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </GuidePanel>

          <GuidePanel
            category="typography"
            icon={<Type size={15} />}
            title="Typography & eyebrows"
            note="Display, body, and labels"
            recipe={recipe}
            selected={selected}
            showGuides={showGuides}
            onSelect={onSelect}
          >
            <div className="rounded-[20px] border border-white/[0.07] bg-black/20 p-5 sm:p-6">
              <EyebrowSpecimen recipe={recipe} />
              <div className={`mt-5 ${titleClass(recipe)}`}>
                {recipe.identity.title}
              </div>
              <h2 className={`mt-6 text-[25px] text-white ${headingClass(recipe)}`}>
                A section heading establishes the next idea.
              </h2>
              <p className="mt-3 max-w-2xl text-[13px] leading-7 text-slate-400">
                {recipe.identity.subtitle}
              </p>
              <div className={`mt-5 ${labelFontClass(recipe)} text-[9px] uppercase tracking-[0.15em] text-slate-600`}>
                labels · metadata · compact notation
              </div>
            </div>
          </GuidePanel>
        </div>

        <div className="mt-4 grid gap-4 xl:grid-cols-[0.72fr_1.28fr]">
          <GuidePanel
            category="iconography"
            icon={<Shapes size={15} />}
            title="Iconography"
            note="Page identity and child symbols"
            recipe={recipe}
            selected={selected}
            showGuides={showGuides}
            onSelect={onSelect}
          >
            <IconSpecimens
              recipe={recipe}
              children={children}
              onSelect={onSelect}
            />
          </GuidePanel>

          <GuidePanel
            category="children"
            icon={<Boxes size={15} />}
            title="Children & navigation"
            note={`${children.length} direct destinations`}
            recipe={recipe}
            selected={selected}
            showGuides={showGuides}
            onSelect={onSelect}
          >
            <ChildSpecimens
              recipe={recipe}
              children={children}
              onSelect={onSelect}
            />
          </GuidePanel>
        </div>

        <div className="mt-4">
          <GuidePanel
            category="widgets"
            icon={<LayoutPanelTop size={15} />}
            title="Supporting widgets"
            note={`${recipe.sections.length} recipe sections`}
            recipe={recipe}
            selected={selected}
            showGuides={showGuides}
            onSelect={onSelect}
          >
            <WidgetSpecimens recipe={recipe} onSelect={onSelect} />
          </GuidePanel>
        </div>
      </div>
    </main>
  );
}

function GuidePanel({
  category,
  icon,
  title,
  note,
  recipe,
  selected,
  showGuides,
  onSelect,
  children,
}: {
  category: DesignGuideCategory;
  icon: ReactNode;
  title: string;
  note: string;
  recipe: PageRecipe;
  selected: StudioSelection;
  showGuides: boolean;
  onSelect: (selection: StudioSelection) => void;
  children: ReactNode;
}) {
  const active =
    selectionKey(selected) === `design-category:${category}`;

  return (
    <section
      className={`overflow-hidden border ${panelShadow(recipe)} ${regionRing(showGuides, active)}`}
      style={{
        borderRadius: "var(--recipe-radius, 28px)",
        borderColor: `rgba(255,255,255,${borderAlpha(recipe, 0.09)})`,
        background: surfaceColor(recipe),
      }}
      onClick={() => onSelect({ kind: "design-category", id: category })}
      data-studio-region={`design-category:${category}`}
    >
      <div className="flex items-center justify-between gap-4 border-b border-white/[0.07] px-5 py-4">
        <div className="flex items-center gap-3">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-[10px] border"
            style={{
              color: `rgb(${recipe.theme.accentRgb})`,
              borderColor: `rgba(${recipe.theme.accentRgb},0.18)`,
              background: `rgba(${recipe.theme.accentRgb},0.045)`,
            }}
          >
            {icon}
          </span>
          <div>
            <h2 className="text-[13px] font-semibold text-white">{title}</h2>
            <p className="mt-0.5 text-[9px] text-slate-600">{note}</p>
          </div>
        </div>
        <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-slate-700">
          edit parameters
        </span>
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

function EyebrowSpecimen({ recipe }: { recipe: PageRecipe }) {
  const style =
    recipe.theme.eyebrowStyle ??
    (recipe.theme.family === "history" ? "rule" : "dot");
  const base = `${labelFontClass(recipe)} flex w-fit items-center gap-2 text-[9px] uppercase tracking-[0.18em]`;

  if (style === "pill") {
    return (
      <div
        className={`${base} rounded-full border px-3 py-1.5`}
        style={{
          color: `rgba(${recipe.theme.accentRgb},0.78)`,
          borderColor: `rgba(${recipe.theme.accentRgb},0.18)`,
          background: `rgba(${recipe.theme.accentRgb},0.045)`,
        }}
      >
        {recipe.identity.eyebrow}
      </div>
    );
  }

  return (
    <div className={base} style={{ color: `rgba(${recipe.theme.accentRgb},0.72)` }}>
      {style === "dot" ? (
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: `rgb(${recipe.theme.accentRgb})` }}
        />
      ) : null}
      {style === "rule" ? (
        <span
          className="h-px w-8"
          style={{ background: `rgb(${recipe.theme.accentRgb})` }}
        />
      ) : null}
      {recipe.identity.eyebrow}
    </div>
  );
}

function IconSpecimens({
  recipe,
  children,
  onSelect,
}: {
  recipe: PageRecipe;
  children: ChildEntry[];
  onSelect: (selection: StudioSelection) => void;
}) {
  const PageIcon = resolvePageIcon(recipe.identity.icon);

  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 xl:grid-cols-3">
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onSelect({ kind: "page" });
        }}
        className="flex min-h-[112px] flex-col items-center justify-center rounded-[16px] border border-white/[0.08] bg-black/20 text-center transition hover:border-white/[0.16]"
      >
        <span
          className="flex h-12 w-12 items-center justify-center rounded-[15px] border"
          style={{
            color: `rgb(${recipe.theme.accentRgb})`,
            borderColor: `rgba(${recipe.theme.accentRgb},0.24)`,
            background: `rgba(${recipe.theme.accentRgb},0.055)`,
          }}
        >
          <PageIcon size={21} />
        </span>
        <span className="mt-2 text-[9px] font-medium text-slate-300">Page icon</span>
      </button>

      {children.slice(0, 5).map(({ item, selection }) => {
        const Icon = resolvePageIcon(item.icon);
        return (
          <button
            key={item.id}
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onSelect(selection);
            }}
            className="flex min-h-[112px] flex-col items-center justify-center rounded-[16px] border border-white/[0.08] bg-black/20 text-center transition hover:border-white/[0.16]"
          >
            <span
              className="flex h-11 w-11 items-center justify-center rounded-[14px] border"
              style={{
                color: `rgb(${item.accentRgb})`,
                borderColor: `rgba(${item.accentRgb},0.22)`,
                background: `rgba(${item.accentRgb},0.05)`,
              }}
            >
              <Icon size={19} />
            </span>
            <span className="mt-2 max-w-[90px] truncate text-[8px] text-slate-500">
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function ChildSpecimens({
  recipe,
  children,
  onSelect,
}: {
  recipe: PageRecipe;
  children: ChildEntry[];
  onSelect: (selection: StudioSelection) => void;
}) {
  if (children.length === 0) {
    return (
      <div className="rounded-[16px] border border-dashed border-white/[0.09] p-8 text-center text-[10px] text-slate-600">
        This recipe does not expose child navigation yet.
      </div>
    );
  }

  return (
    <div className="grid gap-3 md:grid-cols-3">
      {children.slice(0, 3).map(({ item, selection }) => {
        const Icon = resolvePageIcon(item.icon);
        return (
          <button
            key={item.id}
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onSelect(selection);
            }}
            className="group min-h-[210px] rounded-[18px] border p-4 text-left transition hover:-translate-y-0.5"
            style={{
              borderColor: `rgba(${item.accentRgb},0.16)`,
              background: `linear-gradient(145deg, rgba(${item.accentRgb},0.05), rgba(0,0,0,0.18))`,
            }}
          >
            <div className="flex items-start justify-between gap-3">
              <span
                className="flex h-10 w-10 items-center justify-center rounded-[13px] border"
                style={{
                  color: `rgb(${item.accentRgb})`,
                  borderColor: `rgba(${item.accentRgb},0.23)`,
                  background: `rgba(${item.accentRgb},0.055)`,
                }}
              >
                <Icon size={18} />
              </span>
              <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-slate-700">
                child
              </span>
            </div>
            <h3 className={`mt-5 text-[17px] text-white ${headingClass(recipe)}`}>
              {item.label}
            </h3>
            <p className="mt-2 text-[10px] leading-5 text-slate-500">
              {item.summary}
            </p>
            {item.tags?.length ? (
              <div
                className="mt-4 font-mono text-[8px] uppercase tracking-[0.1em]"
                style={{ color: `rgba(${item.accentRgb},0.62)` }}
              >
                {item.tags.join(" · ")}
              </div>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

function WidgetSpecimens({
  recipe,
  onSelect,
}: {
  recipe: PageRecipe;
  onSelect: (selection: StudioSelection) => void;
}) {
  if (recipe.sections.length === 0) {
    return (
      <div className="rounded-[16px] border border-dashed border-white/[0.09] p-8 text-center text-[10px] text-slate-600">
        Add a case study or model guide from the inspector to establish a widget family.
      </div>
    );
  }

  return (
    <div className="grid gap-3 lg:grid-cols-2">
      {recipe.sections.slice(0, 4).map((section) => {
        const Icon = resolvePageIcon(section.icon);
        const count =
          section.type === "case-study"
            ? section.columns.length
            : section.choices.length;
        return (
          <button
            key={section.id}
            type="button"
            onClick={(event: ReactMouseEvent<HTMLButtonElement>) => {
              event.stopPropagation();
              onSelect({ kind: "section", id: section.id });
            }}
            className="min-h-[205px] rounded-[18px] border border-white/[0.08] bg-black/20 p-5 text-left transition hover:border-white/[0.16]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div
                  className={`${labelFontClass(recipe)} text-[8px] font-semibold uppercase tracking-[0.14em]`}
                  style={{ color: `rgba(${recipe.theme.accentRgb},0.68)` }}
                >
                  {section.eyebrow}
                </div>
                <h3 className={`mt-2 text-[18px] text-white ${headingClass(recipe)}`}>
                  {section.title}
                </h3>
              </div>
              <span
                className="flex h-9 w-9 items-center justify-center rounded-[12px] border"
                style={{
                  color: `rgb(${recipe.theme.accentRgb})`,
                  borderColor: `rgba(${recipe.theme.accentRgb},0.18)`,
                  background: `rgba(${recipe.theme.accentRgb},0.045)`,
                }}
              >
                <Icon size={16} />
              </span>
            </div>
            <p className="mt-3 text-[10px] leading-5 text-slate-500">
              {section.summary}
            </p>
            <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-3">
              <span className="font-mono text-[8px] uppercase tracking-[0.11em] text-slate-700">
                {section.type === "case-study" ? "case study" : "model guide"}
              </span>
              <span className="inline-flex items-center gap-1 text-[8px] text-emerald-200/55">
                <CheckCircle2 size={11} /> {count} parts
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

function childEntries(recipe: PageRecipe): ChildEntry[] {
  if (recipe.organization.kind === "multiple-lenses") {
    return recipe.organization.items.map((item) => ({
      item,
      selection: { kind: "lens", id: item.id },
    }));
  }

  return recipe.organization.groups.flatMap((group) =>
    group.items.map((item) => ({
      item,
      selection: {
        kind: "navigation-item" as const,
        groupId: group.id,
        id: item.id,
      },
    })),
  );
}

function paletteEntries(recipe: PageRecipe, children: ChildEntry[]) {
  const fallback = [
    recipe.theme.accentRgb,
    "148, 163, 184",
    "100, 116, 139",
  ];
  const accents = children.map(({ item }) => item.accentRgb);
  return [
    { label: "Page accent", rgb: recipe.theme.accentRgb },
    { label: "Component 1", rgb: accents[0] ?? fallback[0] },
    { label: "Component 2", rgb: accents[1] ?? fallback[1] },
    { label: "Component 3", rgb: accents[2] ?? fallback[2] },
  ];
}
