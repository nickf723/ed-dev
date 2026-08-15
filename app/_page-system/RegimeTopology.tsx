"use client";

import type { MouseEvent as ReactMouseEvent } from "react";
import { ArrowRight, CircleDashed } from "lucide-react";
import { resolvePageIcon } from "@/app/_page-system/icon-registry";
import { RegimeArtwork } from "@/app/_page-system/RecipeDiagrams";
import RecipeLinkFrame from "@/app/_page-system/RecipeLinkFrame";
import { DENSITY_PADDING, SECTION_GAP, fieldEdgeClass, regionRing, surfaceColor } from "@/app/_page-system/page-style";
import { selectionKey, type RendererStudioProps } from "@/app/_page-system/types";
import type { PageRecipe, RecipeLink, RegimeGroup } from "@/lib/page-system/schema";

export default function RegimeTopology({
  recipe,
  selected,
  showGuides,
  preview,
  onSelect,
}: { recipe: PageRecipe } & RendererStudioProps) {
  if (recipe.organization.kind !== "split-regimes") return null;

  return (
    <section className={`${SECTION_GAP[recipe.theme.sectionGap]} grid items-stretch gap-5 xl:grid-cols-2`}>
      {recipe.organization.groups.map((group) => (
        <RegimePanel
          key={group.id}
          recipe={recipe}
          group={group}
          selected={selected}
          showGuides={showGuides}
          preview={preview}
          onSelect={onSelect}
        />
      ))}
    </section>
  );
}

function RegimePanel({
  recipe,
  group,
  selected,
  showGuides,
  preview,
  onSelect,
}: {
  recipe: PageRecipe;
  group: RegimeGroup;
} & RendererStudioProps) {
  const selectedGroup = selectionKey(selected) === `regime:${group.id}`;

  return (
    <section
      className={`relative flex h-full flex-col overflow-hidden border shadow-[0_34px_100px_rgba(0,0,0,0.20)] ${regionRing(showGuides, selectedGroup)}`}
      style={{
        borderRadius: "var(--recipe-radius)",
        borderColor: `rgba(${group.accentRgb},0.16)`,
        background:
          group.visual === "classical"
            ? `linear-gradient(145deg, rgba(${group.accentRgb},0.055), ${surfaceColor(recipe)} 48%, rgba(34,211,238,0.025))`
            : `linear-gradient(145deg, rgba(${group.accentRgb},0.055), ${surfaceColor(recipe)} 48%, rgba(232,121,249,0.03))`,
      }}
      data-studio-region={`regime:${group.id}`}
      onClick={
        onSelect
          ? (event: ReactMouseEvent<HTMLElement>) => {
              event.stopPropagation();
              onSelect({ kind: "regime", id: group.id });
            }
          : undefined
      }
    >
      <RegimeArtwork visual={group.visual} accentRgb={group.accentRgb} />
      <div className={`relative z-10 min-h-[238px] border-b border-white/[0.07] ${DENSITY_PADDING[recipe.theme.density]}`}>
        <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em]" style={{ color: `rgba(${group.accentRgb},0.78)` }}>
          {group.kicker}
        </div>
        <h2 className="mt-2 text-[clamp(1.9rem,3vw,2.7rem)] font-semibold tracking-[-0.045em] text-white">{group.label}</h2>
        <p
          className="mt-4 flex min-h-[42px] max-w-xl items-center border-l-2 pl-3 font-mono text-[9px] uppercase leading-5 tracking-[0.10em]"
          style={{ color: `rgba(${group.accentRgb},0.72)`, borderColor: `rgba(${group.accentRgb},0.42)` }}
        >
          {group.condition}
        </p>
        <p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-300/78">{group.description}</p>
      </div>

      <nav aria-label={`${group.label} fields`} className="relative z-10 grid flex-1 sm:grid-cols-2">
        {group.items.map((item, index) => (
          <FieldLink
            key={item.id}
            item={item}
            groupId={group.id}
            edgeClass={fieldEdgeClass(index)}
            isSelected={selectionKey(selected) === `navigation-item:${group.id}:${item.id}`}
            showGuides={showGuides}
            preview={preview}
            onSelect={onSelect}
          />
        ))}
      </nav>
    </section>
  );
}

function FieldLink({
  item,
  groupId,
  edgeClass,
  isSelected,
  showGuides,
  preview,
  onSelect,
}: {
  item: RecipeLink;
  groupId: string;
  edgeClass: string;
  isSelected: boolean;
} & Omit<RendererStudioProps, "selected">) {
  const Icon = resolvePageIcon(item.icon);
  const active = item.status !== "planned";
  const body = (
    <article
      className={`group relative flex min-h-[205px] flex-col overflow-hidden p-5 transition-colors duration-300 sm:p-6 ${edgeClass} ${regionRing(showGuides, isSelected)}`}
      style={{ borderColor: "rgba(255,255,255,0.07)" }}
      data-studio-region={`navigation-item:${groupId}:${item.id}`}
    >
      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: `radial-gradient(circle at 24% 20%, rgba(${item.accentRgb},0.105), transparent 56%)` }} />
      <div className="relative z-10 flex items-start justify-between gap-4">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-[15px] border"
          style={{
            color: `rgb(${item.accentRgb})`,
            borderColor: `rgba(${item.accentRgb},0.23)`,
            background: `rgba(${item.accentRgb},0.055)`,
            boxShadow: `0 0 28px rgba(${item.accentRgb},0.08)`,
          }}
        >
          <Icon size={19} />
        </div>
        {active ? (
          <ArrowRight size={15} className="mt-2 transition-transform duration-300 group-hover:translate-x-1" style={{ color: `rgba(${item.accentRgb},0.58)` }} />
        ) : (
          <CircleDashed size={15} className="mt-2" style={{ color: `rgba(${item.accentRgb},0.42)` }} />
        )}
      </div>
      <div className="relative z-10 mt-5">
        <h3 className="text-[19px] font-semibold tracking-[-0.025em] text-white">{item.label}</h3>
        <p className="mt-2 text-[12px] leading-5 text-slate-400">{item.summary}</p>
      </div>
      {item.tags?.length ? (
        <div className="relative z-10 mt-auto pt-5 font-mono text-[9px] uppercase tracking-[0.11em]" style={{ color: `rgba(${item.accentRgb},0.64)` }}>
          {item.tags.join(" · ")}
        </div>
      ) : null}
    </article>
  );

  return (
    <RecipeLinkFrame
      href={item.href}
      active={active}
      preview={preview}
      onSelect={
        onSelect
          ? () => onSelect({ kind: "navigation-item", groupId, id: item.id })
          : undefined
      }
    >
      {body}
    </RecipeLinkFrame>
  );
}
