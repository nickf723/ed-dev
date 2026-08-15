"use client";

import { ArrowRight, CircleDashed } from "lucide-react";
import { resolvePageIcon } from "@/app/_page-system/icon-registry";
import { MapLens, NetworkLens, TimelineLens } from "@/app/_page-system/RecipeDiagrams";
import RecipeLinkFrame from "@/app/_page-system/RecipeLinkFrame";
import { DENSITY_PADDING, SECTION_GAP, SURFACE_BLUR, regionRing, surfaceColor } from "@/app/_page-system/page-style";
import { selectionKey, type RendererStudioProps } from "@/app/_page-system/types";
import type { LensItem, PageRecipe } from "@/lib/page-system/schema";

export default function LensTopology({
  recipe,
  selected,
  showGuides,
  preview,
  onSelect,
}: { recipe: PageRecipe } & RendererStudioProps) {
  if (recipe.organization.kind !== "multiple-lenses") return null;

  return (
    <>
      <section className={`${SECTION_GAP[recipe.theme.sectionGap]} flex flex-col gap-2 px-1 sm:flex-row sm:items-end sm:justify-between`}>
        <div>
          <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em]" style={{ color: `rgba(${recipe.theme.accentRgb},0.72)` }}>
            {recipe.organization.eyebrow}
          </div>
          <h2 className="mt-1 text-[clamp(1.7rem,3vw,2.55rem)] font-semibold tracking-[-0.04em] text-white">
            {recipe.organization.title}
          </h2>
        </div>
        <p className="max-w-xl text-[12px] leading-6 text-slate-400">{recipe.organization.description}</p>
      </section>

      <nav aria-label={recipe.organization.title} className={`${SECTION_GAP[recipe.theme.sectionGap]} grid items-stretch gap-4 xl:grid-cols-3`}>
        {recipe.organization.items.map((item, index) => (
          <LensCard
            key={item.id}
            recipe={recipe}
            item={item}
            index={index}
            isSelected={selectionKey(selected) === `lens:${item.id}`}
            showGuides={showGuides}
            preview={preview}
            onSelect={onSelect}
          />
        ))}
      </nav>
    </>
  );
}

function LensCard({
  recipe,
  item,
  index,
  isSelected,
  showGuides,
  preview,
  onSelect,
}: {
  recipe: PageRecipe;
  item: LensItem;
  index: number;
  isSelected: boolean;
} & Omit<RendererStudioProps, "selected">) {
  const Icon = resolvePageIcon(item.icon);
  const live = item.status !== "planned";
  const body = (
    <article
      className={`group relative flex h-full min-h-[470px] flex-col overflow-hidden border ${DENSITY_PADDING[recipe.theme.density]} ${SURFACE_BLUR[recipe.theme.surface]} ${regionRing(showGuides, isSelected)}`}
      style={{
        borderRadius: "var(--recipe-radius)",
        borderColor: `rgba(${item.accentRgb},${live ? "0.18" : "0.08"})`,
        background: `linear-gradient(155deg, rgba(${item.accentRgb},0.055), ${surfaceColor(recipe)} 44%, rgba(0,0,0,0.22))`,
      }}
      data-studio-region={`lens:${item.id}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(circle at 52% 40%, rgba(${item.accentRgb},0.11), transparent 58%)` }}
      />
      <div className="relative z-10 flex items-start justify-between gap-4">
        <div>
          <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em]" style={{ color: `rgba(${item.accentRgb},0.70)` }}>
            {String(index + 1).padStart(2, "0")} · {item.question}
          </div>
          <h3 className="mt-2 text-[25px] font-semibold tracking-[-0.035em] text-white">{item.label}</h3>
        </div>
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[15px] border"
          style={{
            color: `rgb(${item.accentRgb})`,
            borderColor: `rgba(${item.accentRgb},0.24)`,
            background: `rgba(${item.accentRgb},0.055)`,
          }}
        >
          <Icon size={19} />
        </div>
      </div>
      <p className="relative z-10 mt-3 min-h-[72px] text-[12px] leading-6 text-slate-400">{item.summary}</p>
      <div className="relative z-10 mt-5 flex-1">
        {item.visual === "timeline" ? <TimelineLens accentRgb={item.accentRgb} /> : null}
        {item.visual === "map" ? <MapLens accentRgb={item.accentRgb} /> : null}
        {item.visual === "network" ? <NetworkLens accentRgb={item.accentRgb} /> : null}
      </div>
      <div className="relative z-10 mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4">
        <span className="font-mono text-[9px] uppercase tracking-[0.12em]" style={{ color: `rgba(${item.accentRgb},0.62)` }}>
          {live ? "Open this lens" : "Planned lens"}
        </span>
        {live ? (
          <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" style={{ color: `rgba(${item.accentRgb},0.72)` }} />
        ) : (
          <CircleDashed size={15} style={{ color: `rgba(${item.accentRgb},0.42)` }} />
        )}
      </div>
    </article>
  );

  return (
    <RecipeLinkFrame
      href={item.href}
      active={live}
      preview={preview}
      onSelect={onSelect ? () => onSelect({ kind: "lens", id: item.id }) : undefined}
    >
      {body}
    </RecipeLinkFrame>
  );
}
