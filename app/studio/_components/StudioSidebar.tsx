"use client";

import Link from "next/link";
import {
  ChevronRight,
  Circle,
  Columns3,
  EyeOff,
  History,
  LayoutPanelTop,
  ListTree,
  Palette,
  Sparkles,
} from "lucide-react";
import type { ReactNode } from "react";
import type {
  DesignGuideCategory,
  StudioSelection,
} from "@/app/_page-system/types";
import { DESIGN_CATEGORY_META } from "@/app/studio/_components/DesignGuideInspector";
import type { PageRecipeCatalogEntry } from "@/lib/page-system/catalog";
import type { PageRecipe } from "@/lib/page-system/schema";
import type {
  DraftState,
  StudioView,
} from "@/app/studio/_components/studio-types";

const DESIGN_CATEGORIES = Object.keys(
  DESIGN_CATEGORY_META,
) as DesignGuideCategory[];

export default function StudioSidebar({
  catalog,
  drafts,
  recipe,
  selectedRecipeId,
  selection,
  view,
  onSwitchRecipe,
  onSelect,
  onView,
}: {
  catalog: readonly PageRecipeCatalogEntry[];
  drafts: Record<string, DraftState>;
  recipe: PageRecipe;
  selectedRecipeId: string;
  selection: StudioSelection;
  view: StudioView;
  onSwitchRecipe: (id: string) => void;
  onSelect: (selection: StudioSelection) => void;
  onView: (view: StudioView) => void;
}) {
  const catalogEntry = catalog.find((entry) => entry.id === selectedRecipeId);

  return (
    <aside className="flex min-h-0 min-w-0 flex-col overflow-hidden border-r border-white/[0.08] bg-[#0c0f16]">
      <div className="border-b border-white/[0.08] px-4 py-4">
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan-200">
          <Sparkles size={15} /> Knowledge Studio
        </div>
        <p className="mt-2 text-[10px] leading-4 text-slate-500">
          Select structure on the left, edit meaning on the right, and save one readable recipe.
        </p>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-3 py-4">
        <div className="px-2 text-[9px] font-semibold uppercase tracking-[0.15em] text-slate-600">
          Recipe pilots
        </div>
        <div className="mt-2 space-y-1">
          {catalog.map((entry) => {
            const state = drafts[entry.id];
            const dirty = state
              ? JSON.stringify(state.present) !==
                JSON.stringify(state.baseline)
              : false;
            return (
              <button
                key={entry.id}
                type="button"
                onClick={() => onSwitchRecipe(entry.id)}
                className={`flex w-full items-center gap-3 rounded-[13px] border px-3 py-3 text-left transition ${
                  selectedRecipeId === entry.id
                    ? "border-cyan-300/20 bg-cyan-400/[0.06]"
                    : "border-transparent hover:border-white/[0.07] hover:bg-white/[0.025]"
                }`}
              >
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-[10px] border ${
                    entry.domain === "Humanities"
                      ? "border-amber-300/16 bg-amber-400/[0.04] text-amber-200"
                      : "border-cyan-300/16 bg-cyan-400/[0.04] text-cyan-200"
                  }`}
                >
                  {entry.domain === "Humanities" ? (
                    <History size={15} />
                  ) : (
                    <Circle size={15} />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block truncate text-[11px] font-semibold text-white">
                    {entry.label}
                  </span>
                  <span className="block truncate text-[9px] text-slate-600">
                    {entry.domain}
                  </span>
                </div>
                {dirty ? (
                  <span
                    className="h-2 w-2 rounded-full bg-amber-300"
                    title="Unsaved changes"
                  />
                ) : null}
              </button>
            );
          })}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onView("page")}
            className={`rounded-[11px] border px-3 py-2.5 text-[9px] font-medium transition ${
              view === "page"
                ? "border-cyan-300/18 bg-cyan-400/[0.06] text-cyan-100"
                : "border-white/[0.07] bg-white/[0.018] text-slate-600 hover:text-slate-300"
            }`}
          >
            Page canvas
          </button>
          <button
            type="button"
            onClick={() => onView("style-guide")}
            className={`rounded-[11px] border px-3 py-2.5 text-[9px] font-medium transition ${
              view === "style-guide"
                ? "border-cyan-300/18 bg-cyan-400/[0.06] text-cyan-100"
                : "border-white/[0.07] bg-white/[0.018] text-slate-600 hover:text-slate-300"
            }`}
          >
            Style guide
          </button>
        </div>

        {view === "style-guide" ? (
          <DesignTree selection={selection} onSelect={onSelect} />
        ) : (
          <StructureTree
            recipe={recipe}
            selection={selection}
            onSelect={onSelect}
          />
        )}
      </div>

      <div className="border-t border-white/[0.08] p-3">
        <Link
          href={catalogEntry?.route ?? recipe.route}
          target="_blank"
          className="flex items-center justify-between rounded-[12px] border border-white/[0.07] bg-white/[0.02] px-3 py-2.5 text-[10px] text-slate-400 hover:text-white"
        >
          Open local route <ChevronRight size={13} />
        </Link>
      </div>
    </aside>
  );
}

function DesignTree({
  selection,
  onSelect,
}: {
  selection: StudioSelection;
  onSelect: (selection: StudioSelection) => void;
}) {
  return (
    <div className="mt-6">
      <div className="flex items-center gap-2 px-2 text-[9px] font-semibold uppercase tracking-[0.15em] text-slate-600">
        <Palette size={12} /> Parameter groups
      </div>
      <div className="mt-2 space-y-1">
        {DESIGN_CATEGORIES.map((category) => {
          const meta = DESIGN_CATEGORY_META[category];
          const Icon = meta.icon;
          return (
            <TreeButton
              key={category}
              active={
                selection.kind === "design-category" &&
                selection.id === category
              }
              label={meta.label}
              icon={<Icon size={12} />}
              onClick={() =>
                onSelect({ kind: "design-category", id: category })
              }
            />
          );
        })}
      </div>
    </div>
  );
}

function StructureTree({
  recipe,
  selection,
  onSelect,
}: {
  recipe: PageRecipe;
  selection: StudioSelection;
  onSelect: (selection: StudioSelection) => void;
}) {
  return (
    <div className="mt-6">
      <div className="px-2 text-[9px] font-semibold uppercase tracking-[0.15em] text-slate-600">
        Page structure
      </div>
      <div className="mt-2 space-y-1">
        <TreeButton
          active={selection.kind === "page"}
          label="Page identity & theme"
          icon={<LayoutPanelTop size={13} />}
          onClick={() => onSelect({ kind: "page" })}
        />

        {recipe.organization.kind === "multiple-lenses" ? (
          <TreeBranch>
            {recipe.organization.items.map((item) => (
              <TreeButton
                key={item.id}
                active={
                  selection.kind === "lens" && selection.id === item.id
                }
                label={item.label}
                icon={<ChevronRight size={12} />}
                onClick={() => onSelect({ kind: "lens", id: item.id })}
              />
            ))}
          </TreeBranch>
        ) : (
          <TreeBranch>
            {recipe.organization.groups.map((group) => (
              <div key={group.id} className="mb-1">
                <TreeButton
                  active={
                    selection.kind === "regime" &&
                    selection.id === group.id
                  }
                  label={group.label}
                  icon={<Columns3 size={12} />}
                  onClick={() =>
                    onSelect({ kind: "regime", id: group.id })
                  }
                />
                <TreeBranch subtle>
                  {group.items.map((item) => (
                    <TreeButton
                      key={item.id}
                      active={
                        selection.kind === "navigation-item" &&
                        selection.groupId === group.id &&
                        selection.id === item.id
                      }
                      label={item.label}
                      icon={<ChevronRight size={11} />}
                      onClick={() =>
                        onSelect({
                          kind: "navigation-item",
                          groupId: group.id,
                          id: item.id,
                        })
                      }
                    />
                  ))}
                </TreeBranch>
              </div>
            ))}
          </TreeBranch>
        )}

        <TreeBranch>
          {recipe.sections.map((section) => (
            <div key={section.id} className="mb-1">
              <TreeButton
                active={
                  selection.kind === "section" &&
                  selection.id === section.id
                }
                label={section.title}
                icon={
                  section.hidden ? (
                    <EyeOff size={12} />
                  ) : (
                    <ListTree size={12} />
                  )
                }
                muted={section.hidden}
                onClick={() =>
                  onSelect({ kind: "section", id: section.id })
                }
              />
              <TreeBranch subtle>
                {section.type === "case-study"
                  ? section.columns.map((column) => (
                      <TreeButton
                        key={column.id}
                        active={
                          selection.kind === "case-column" &&
                          selection.sectionId === section.id &&
                          selection.id === column.id
                        }
                        label={column.label}
                        icon={<ChevronRight size={11} />}
                        onClick={() =>
                          onSelect({
                            kind: "case-column",
                            sectionId: section.id,
                            id: column.id,
                          })
                        }
                      />
                    ))
                  : section.choices.map((choice) => (
                      <TreeButton
                        key={choice.id}
                        active={
                          selection.kind === "model-choice" &&
                          selection.sectionId === section.id &&
                          selection.id === choice.id
                        }
                        label={choice.answer}
                        icon={<ChevronRight size={11} />}
                        onClick={() =>
                          onSelect({
                            kind: "model-choice",
                            sectionId: section.id,
                            id: choice.id,
                          })
                        }
                      />
                    ))}
              </TreeBranch>
            </div>
          ))}
        </TreeBranch>
      </div>
    </div>
  );
}

function TreeBranch({
  children,
  subtle = false,
}: {
  children: ReactNode;
  subtle?: boolean;
}) {
  return (
    <div
      className={`ml-3 border-l pl-2 ${
        subtle ? "border-white/[0.045]" : "border-white/[0.07]"
      }`}
    >
      {children}
    </div>
  );
}

function TreeButton({
  active,
  label,
  icon,
  onClick,
  muted = false,
}: {
  active: boolean;
  label: string;
  icon: ReactNode;
  onClick: () => void;
  muted?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-2 rounded-[9px] px-2 py-2 text-left text-[10px] transition ${
        active
          ? "bg-cyan-400/[0.07] text-cyan-100"
          : muted
            ? "text-slate-700 hover:bg-white/[0.02] hover:text-slate-500"
            : "text-slate-500 hover:bg-white/[0.025] hover:text-slate-300"
      }`}
    >
      <span className="text-slate-700">{icon}</span>
      <span className="truncate">{label}</span>
    </button>
  );
}
