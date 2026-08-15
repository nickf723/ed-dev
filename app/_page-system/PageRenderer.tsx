"use client";

import type { CSSProperties, MouseEvent as ReactMouseEvent } from "react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { resolvePageIcon } from "@/app/_page-system/icon-registry";
import LensTopology from "@/app/_page-system/LensTopology";
import RecipeBackground from "@/app/_page-system/RecipeBackground";
import RegimeTopology from "@/app/_page-system/RegimeTopology";
import { CaseStudy, ModelGuide } from "@/app/_page-system/SupportingSections";
import { RADIUS, SECTION_GAP, headerColor, regionRing } from "@/app/_page-system/page-style";
import { selectionKey, type PageRendererProps } from "@/app/_page-system/types";

export type { StudioSelection } from "@/app/_page-system/types";

type RecipeStyle = CSSProperties & {
  "--recipe-accent": string;
  "--recipe-radius": string;
};

export default function PageRenderer({
  recipe,
  preview = false,
  selected,
  showGuides = false,
  motionEnabled,
  onSelect,
}: PageRendererProps) {
  const Icon = resolvePageIcon(recipe.identity.icon);
  const familyBackground = recipe.theme.family === "history" ? "#070503" : "#03070d";
  const motion = motionEnabled ?? recipe.theme.motion !== "off";
  const style: RecipeStyle = {
    "--recipe-accent": `rgb(${recipe.theme.accentRgb})`,
    "--recipe-radius": RADIUS[recipe.theme.panelRadius],
  };

  return (
    <main
      className={`relative min-h-screen overflow-x-hidden text-slate-100 selection:bg-white/20 ${preview ? "isolate" : ""}`}
      style={{ ...style, background: familyBackground }}
      data-page-recipe={recipe.id}
      data-page-family={recipe.theme.family}
    >
      <RecipeBackground recipe={recipe} preview={preview} motion={motion} />
      {showGuides ? <GuideOverlay /> : null}

      <div
        className={`relative z-10 mx-auto w-full max-w-[1480px] px-4 pb-12 sm:px-6 xl:px-8 ${regionRing(false, selectionKey(selected) === "page")}`}
        data-studio-region="page"
        onClick={onSelect ? () => onSelect({ kind: "page" }) : undefined}
      >
        <div
          className="sticky top-0 z-30 -mx-4 border-b border-white/[0.06] px-4 pb-3 pt-5 shadow-[0_18px_50px_rgba(0,0,0,0.20)] backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8"
          style={{ background: headerColor(recipe) }}
        >
          <DomainPageHeader
            breadcrumbs={recipe.identity.breadcrumbs ?? [{ label: recipe.identity.title }]}
            eyebrow={recipe.identity.eyebrow}
            icon={Icon}
            title={<span>{recipe.identity.title}</span>}
            subtitle={recipe.identity.subtitle}
            accentRgb={recipe.theme.accentRgb}
            titleClassName={
              recipe.theme.family === "history"
                ? "font-serif text-[clamp(3rem,5.4vw,6rem)] font-semibold leading-[0.84] tracking-[-0.055em] text-[#fffaf0]"
                : "font-mono text-[clamp(2.6rem,4.6vw,5rem)] font-semibold uppercase leading-[0.86] tracking-[-0.058em] text-[#f7fbff]"
            }
            headerClassName="border-white/[0.08]"
          />
        </div>

        <LensTopology recipe={recipe} selected={selected} showGuides={showGuides} preview={preview} onSelect={onSelect} />
        <RegimeTopology recipe={recipe} selected={selected} showGuides={showGuides} preview={preview} onSelect={onSelect} />

        {recipe.sections.map((section) => {
          const selectedSection = selectionKey(selected) === `section:${section.id}`;
          return (
            <div
              key={section.id}
              className={`${SECTION_GAP[recipe.theme.sectionGap]} ${regionRing(showGuides, selectedSection)}`}
              style={{ borderRadius: "var(--recipe-radius)" }}
              data-studio-region={`section:${section.id}`}
              onClick={
                onSelect
                  ? (event: ReactMouseEvent<HTMLDivElement>) => {
                      event.stopPropagation();
                      onSelect({ kind: "section", id: section.id });
                    }
                  : undefined
              }
            >
              {section.type === "case-study" ? (
                <CaseStudy recipe={recipe} section={section} />
              ) : (
                <ModelGuide recipe={recipe} section={section} />
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}

function GuideOverlay() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[60] opacity-40"
      aria-hidden="true"
      style={{
        backgroundImage:
          "linear-gradient(rgba(34,211,238,0.16) 1px,transparent 1px),linear-gradient(90deg,rgba(34,211,238,0.16) 1px,transparent 1px)",
        backgroundSize: "8px 8px",
      }}
    />
  );
}
