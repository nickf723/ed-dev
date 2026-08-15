"use client";

import { PanelRight } from "lucide-react";
import type { StudioSelection } from "@/app/_page-system/types";
import PageInspector from "@/app/studio/_components/PageInspector";
import {
  LensInspector,
  NavigationItemInspector,
  RegimeInspector,
} from "@/app/studio/_components/NavigationInspectors";
import {
  CaseColumnInspector,
  ModelChoiceInspector,
  SectionInspector,
} from "@/app/studio/_components/SectionInspectors";
import type { UpdateRecipe } from "@/app/studio/_components/studio-operations";
import { selectionTitle, type SaveState } from "@/app/studio/_components/studio-types";
import type { PageRecipe } from "@/lib/page-system/schema";

export default function StudioInspector({
  recipe,
  selection,
  saveState,
  saveMessage,
  update,
  onSelect,
}: {
  recipe: PageRecipe;
  selection: StudioSelection;
  saveState: SaveState;
  saveMessage: string;
  update: UpdateRecipe;
  onSelect: (selection: StudioSelection) => void;
}) {
  return (
    <aside className="flex min-h-0 min-w-0 flex-col overflow-hidden border-l border-white/[0.08] bg-[#0c0f16]">
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-white/[0.08] px-4">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.13em] text-slate-300">Inspector</div>
          <div className="mt-0.5 text-[9px] text-slate-600">{selectionTitle(recipe, selection)}</div>
        </div>
        <PanelRight size={15} className="text-slate-600" />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
        <Inspector recipe={recipe} selection={selection} update={update} onSelect={onSelect} />
      </div>

      <div className="border-t border-white/[0.08] p-3">
        <div
          className={`whitespace-pre-wrap rounded-[12px] border px-3 py-2.5 text-[9px] leading-4 ${
            saveState === "error"
              ? "border-red-300/15 bg-red-400/[0.035] text-red-200/80"
              : saveState === "saved"
                ? "border-emerald-300/15 bg-emerald-400/[0.035] text-emerald-200/75"
                : "border-white/[0.06] bg-black/20 text-slate-600"
          }`}
        >
          {saveMessage || "Ctrl+S saves the current recipe. Ctrl+Z undoes the last editor change."}
        </div>
      </div>
    </aside>
  );
}

function Inspector({
  recipe,
  selection,
  update,
  onSelect,
}: {
  recipe: PageRecipe;
  selection: StudioSelection;
  update: UpdateRecipe;
  onSelect: (selection: StudioSelection) => void;
}) {
  if (selection.kind === "page") {
    return <PageInspector recipe={recipe} update={update} onSelect={onSelect} />;
  }

  if (selection.kind === "lens" && recipe.organization.kind === "multiple-lenses") {
    const item = recipe.organization.items.find((candidate) => candidate.id === selection.id);
    return item ? (
      <LensInspector recipe={recipe} item={item} update={update} onSelect={onSelect} />
    ) : (
      <MissingSelection />
    );
  }

  if (selection.kind === "regime" && recipe.organization.kind === "split-regimes") {
    const group = recipe.organization.groups.find((candidate) => candidate.id === selection.id);
    return group ? (
      <RegimeInspector recipe={recipe} group={group} update={update} onSelect={onSelect} />
    ) : (
      <MissingSelection />
    );
  }

  if (selection.kind === "navigation-item" && recipe.organization.kind === "split-regimes") {
    const group = recipe.organization.groups.find((candidate) => candidate.id === selection.groupId);
    const item = group?.items.find((candidate) => candidate.id === selection.id);
    return group && item ? (
      <NavigationItemInspector group={group} item={item} update={update} onSelect={onSelect} />
    ) : (
      <MissingSelection />
    );
  }

  if (selection.kind === "section") {
    const section = recipe.sections.find((candidate) => candidate.id === selection.id);
    return section ? (
      <SectionInspector recipe={recipe} section={section} update={update} onSelect={onSelect} />
    ) : (
      <MissingSelection />
    );
  }

  if (selection.kind === "case-column") {
    const section = recipe.sections.find((candidate) => candidate.id === selection.sectionId);
    const column = section?.type === "case-study"
      ? section.columns.find((candidate) => candidate.id === selection.id)
      : undefined;
    return section?.type === "case-study" && column ? (
      <CaseColumnInspector section={section} column={column} update={update} onSelect={onSelect} />
    ) : (
      <MissingSelection />
    );
  }

  if (selection.kind === "model-choice") {
    const section = recipe.sections.find((candidate) => candidate.id === selection.sectionId);
    const choice = section?.type === "model-guide"
      ? section.choices.find((candidate) => candidate.id === selection.id)
      : undefined;
    return section?.type === "model-guide" && choice ? (
      <ModelChoiceInspector section={section} choice={choice} update={update} onSelect={onSelect} />
    ) : (
      <MissingSelection />
    );
  }

  return <MissingSelection />;
}

function MissingSelection() {
  return (
    <div className="rounded-[14px] border border-white/[0.07] bg-black/20 p-4 text-[10px] leading-5 text-slate-500">
      That region no longer exists. Select another region in the canvas or structure tree.
    </div>
  );
}
