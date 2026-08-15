"use client";

import Link from "next/link";
import {
  ChevronRight,
  Circle,
  Columns3,
  History,
  LayoutPanelTop,
  Sparkles,
} from "lucide-react";
import type { ReactNode } from "react";
import type { StudioSelection } from "@/app/_page-system/types";
import type { PageRecipeCatalogEntry } from "@/lib/page-system/catalog";
import type { PageRecipe } from "@/lib/page-system/schema";
import type { DraftState } from "@/app/studio/_components/studio-types";

export default function StudioSidebar({
  catalog,
  drafts,
  recipe,
  selectedRecipeId,
  selection,
  onSwitchRecipe,
  onSelect,
}: {
  catalog: readonly PageRecipeCatalogEntry[];
  drafts: Record<string, DraftState>;
  recipe: PageRecipe;
  selectedRecipeId: string;
  selection: StudioSelection;
  onSwitchRecipe: (id: string) => void;
  onSelect: (selection: StudioSelection) => void;
}) {
  const catalogEntry = catalog.find((entry) => entry.id === selectedRecipeId);

  return (
    <aside className="flex min-h-0 min-w-0 flex-col overflow-hidden border-r border-white/[0.08] bg-[#0c0f16]">
      <div className="border-b border-white/[0.08] px-4 py-4">
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan-200">
          <Sparkles size={15} /> Knowledge Studio
        </div>
        <p className="mt-2 text-[10px] leading-4 text-slate-500">
          Local authoring environment · recipe files · no Vercel deployment
        </p>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-3 py-4">
        <div className="px-2 text-[9px] font-semibold uppercase tracking-[0.15em] text-slate-600">
          Ontology pilots
        </div>
        <div className="mt-2 space-y-1">
          {catalog.map((entry) => {
            const state = drafts[entry.id];
            const dirty = state
              ? JSON.stringify(state.present) !== JSON.stringify(state.baseline)
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
                  {entry.domain === "Humanities" ? <History size={15} /> : <Circle size={15} />}
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
                  <span className="h-2 w-2 rounded-full bg-amber-300" title="Unsaved changes" />
                ) : null}
              </button>
            );
          })}
        </div>

        <StructureTree recipe={recipe} selection={selection} onSelect={onSelect} />
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
          <div className="ml-3 border-l border-white/[0.07] pl-2">
            {recipe.organization.items.map((item) => (
              <TreeButton
                key={item.id}
                active={selection.kind === "lens" && selection.id === item.id}
                label={item.label}
                icon={<ChevronRight size={12} />}
                onClick={() => onSelect({ kind: "lens", id: item.id })}
              />
            ))}
          </div>
        ) : (
          <div className="ml-3 border-l border-white/[0.07] pl-2">
            {recipe.organization.groups.map((group) => (
              <div key={group.id} className="mb-1">
                <TreeButton
                  active={selection.kind === "regime" && selection.id === group.id}
                  label={group.label}
                  icon={<Columns3 size={12} />}
                  onClick={() => onSelect({ kind: "regime", id: group.id })}
                />
                <div className="ml-3 border-l border-white/[0.06] pl-2">
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
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="ml-3 border-l border-white/[0.07] pl-2">
          {recipe.sections.map((section) => (
            <TreeButton
              key={section.id}
              active={selection.kind === "section" && selection.id === section.id}
              label={section.title}
              icon={<ChevronRight size={12} />}
              onClick={() => onSelect({ kind: "section", id: section.id })}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function TreeButton({
  active,
  label,
  icon,
  onClick,
}: {
  active: boolean;
  label: string;
  icon: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-2 rounded-[9px] px-2 py-2 text-left text-[10px] transition ${
        active
          ? "bg-cyan-400/[0.07] text-cyan-100"
          : "text-slate-500 hover:bg-white/[0.025] hover:text-slate-300"
      }`}
    >
      <span className="text-slate-700">{icon}</span>
      <span className="truncate">{label}</span>
    </button>
  );
}
