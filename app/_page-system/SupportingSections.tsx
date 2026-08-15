"use client";

import type { MouseEvent as ReactMouseEvent } from "react";
import { resolvePageIcon } from "@/app/_page-system/icon-registry";
import {
  DENSITY_PADDING,
  SURFACE_BLUR,
  borderAlpha,
  columnGridClass,
  headingClass,
  labelFontClass,
  panelShadow,
  regionRing,
  surfaceColor,
} from "@/app/_page-system/page-style";
import {
  selectionKey,
  type RendererStudioProps,
} from "@/app/_page-system/types";
import type {
  CaseStudySection,
  ModelGuideSection,
  PageRecipe,
} from "@/lib/page-system/schema";

type SectionStudioProps = RendererStudioProps & {
  recipe: PageRecipe;
};

export function CaseStudy({
  recipe,
  section,
  selected,
  showGuides,
  onSelect,
}: SectionStudioProps & { section: CaseStudySection }) {
  const Icon = resolvePageIcon(section.icon);
  return (
    <section
      className={`overflow-hidden border ${SURFACE_BLUR[recipe.theme.surface]} ${panelShadow(recipe)}`}
      style={{
        borderRadius: "var(--recipe-radius)",
        borderColor: `rgba(255,255,255,${borderAlpha(recipe, 0.09)})`,
        background: surfaceColor(recipe),
      }}
    >
      <div className="grid lg:grid-cols-[330px_1fr]">
        <div
          className={`border-b border-white/[0.07] lg:border-b-0 lg:border-r ${DENSITY_PADDING[recipe.theme.density]}`}
        >
          <div
            className={`${labelFontClass(recipe)} text-[10px] font-semibold uppercase tracking-[0.15em]`}
            style={{ color: `rgba(${recipe.theme.accentRgb},0.70)` }}
          >
            {section.eyebrow}
          </div>
          <h2 className={`mt-2 text-[24px] text-white ${headingClass(recipe)}`}>
            {section.title}
          </h2>
          <p className="mt-3 text-[12px] leading-6 text-slate-400">
            {section.summary}
          </p>
          <div
            className="mt-5 flex h-12 w-12 items-center justify-center rounded-[16px] border"
            style={{
              borderColor: `rgba(${recipe.theme.accentRgb},0.18)`,
              background: `rgba(${recipe.theme.accentRgb},0.055)`,
              color: `rgb(${recipe.theme.accentRgb})`,
            }}
          >
            <Icon size={20} />
          </div>
        </div>
        <div className={`grid ${columnGridClass(section.columns.length)}`}>
          {section.columns.map((column, index) => {
            const selectedColumn =
              selectionKey(selected) ===
              `case-column:${section.id}:${column.id}`;
            return (
              <div
                key={column.id}
                className={`${DENSITY_PADDING[recipe.theme.density]} ${
                  index < section.columns.length - 1
                    ? "border-b border-white/[0.07] md:border-b-0 md:border-r"
                    : ""
                } ${regionRing(showGuides, selectedColumn)}`}
                data-studio-region={`case-column:${section.id}:${column.id}`}
                onClick={
                  onSelect
                    ? (event: ReactMouseEvent<HTMLDivElement>) => {
                        event.stopPropagation();
                        onSelect({
                          kind: "case-column",
                          sectionId: section.id,
                          id: column.id,
                        });
                      }
                    : undefined
                }
              >
                <div
                  className={`${labelFontClass(recipe)} text-[9px] font-semibold uppercase tracking-[0.13em]`}
                  style={{ color: `rgba(${column.accentRgb},0.70)` }}
                >
                  {column.label}
                </div>
                <p className="mt-4 text-[13px] font-medium leading-6 text-slate-300">
                  {column.question}
                </p>
                <p className="mt-3 text-[11px] leading-5 text-slate-500">
                  {column.answer}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ModelGuide({
  recipe,
  section,
  selected,
  showGuides,
  onSelect,
}: SectionStudioProps & { section: ModelGuideSection }) {
  const Icon = resolvePageIcon(section.icon);
  return (
    <section
      className={`overflow-hidden border ${SURFACE_BLUR[recipe.theme.surface]} ${panelShadow(recipe)}`}
      style={{
        borderRadius: "var(--recipe-radius)",
        borderColor: `rgba(255,255,255,${borderAlpha(recipe, 0.09)})`,
        background: surfaceColor(recipe),
      }}
    >
      <div className="grid lg:grid-cols-[310px_1fr]">
        <div
          className={`border-b border-white/[0.07] lg:border-b-0 lg:border-r ${DENSITY_PADDING[recipe.theme.density]}`}
        >
          <div
            className={`${labelFontClass(recipe)} flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em]`}
            style={{ color: `rgba(${recipe.theme.accentRgb},0.72)` }}
          >
            <Icon size={13} /> {section.eyebrow}
          </div>
          <h2 className={`mt-2 text-[24px] text-white ${headingClass(recipe)}`}>
            {section.title}
          </h2>
          <p className="mt-3 text-[12px] leading-6 text-slate-400">
            {section.summary}
          </p>
        </div>
        <div className={`grid ${columnGridClass(section.choices.length)}`}>
          {section.choices.map((choice, index) => {
            const ChoiceIcon = resolvePageIcon(choice.icon);
            const selectedChoice =
              selectionKey(selected) ===
              `model-choice:${section.id}:${choice.id}`;
            return (
              <div
                key={choice.id}
                className={`${DENSITY_PADDING[recipe.theme.density]} ${
                  index < section.choices.length - 1
                    ? "border-b border-white/[0.07] md:border-b-0 md:border-r"
                    : ""
                } ${regionRing(showGuides, selectedChoice)}`}
                data-studio-region={`model-choice:${section.id}:${choice.id}`}
                onClick={
                  onSelect
                    ? (event: ReactMouseEvent<HTMLDivElement>) => {
                        event.stopPropagation();
                        onSelect({
                          kind: "model-choice",
                          sectionId: section.id,
                          id: choice.id,
                        });
                      }
                    : undefined
                }
              >
                <div
                  className={`${labelFontClass(recipe)} flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.13em]`}
                  style={{ color: `rgba(${choice.accentRgb},0.68)` }}
                >
                  <ChoiceIcon size={13} /> condition
                </div>
                <p className="mt-4 text-[13px] font-medium leading-6 text-slate-300">
                  {choice.question}
                </p>
                <div
                  className={`mt-4 text-[17px] ${headingClass(recipe)}`}
                  style={{ color: `rgba(${choice.accentRgb},0.9)` }}
                >
                  {choice.answer}
                </div>
                <p className="mt-2 text-[11px] leading-5 text-slate-500">
                  {choice.detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
