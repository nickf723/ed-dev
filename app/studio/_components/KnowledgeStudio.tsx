"use client";

import { useEffect, useState } from "react";
import PageRenderer, { type StudioSelection } from "@/app/_page-system/PageRenderer";
import StudioInspector from "@/app/studio/_components/StudioInspector";
import StudioSidebar from "@/app/studio/_components/StudioSidebar";
import StudioToolbar from "@/app/studio/_components/StudioToolbar";
import {
  VIEWPORT_WIDTH,
  cloneRecipe,
  createDraftState,
  type DraftState,
  type SaveState,
  type Viewport,
} from "@/app/studio/_components/studio-types";
import type { PageRecipeCatalogEntry } from "@/lib/page-system/catalog";
import type { PageRecipe } from "@/lib/page-system/schema";

type KnowledgeStudioProps = {
  initialRecipes: PageRecipe[];
  catalog: readonly PageRecipeCatalogEntry[];
};

export default function KnowledgeStudio({ initialRecipes, catalog }: KnowledgeStudioProps) {
  const [drafts, setDrafts] = useState<Record<string, DraftState>>(() =>
    Object.fromEntries(
      initialRecipes.map((recipe) => [recipe.id, createDraftState(recipe)]),
    ),
  );
  const [selectedRecipeId, setSelectedRecipeId] = useState(
    initialRecipes[0]?.id ?? "",
  );
  const [selection, setSelection] = useState<StudioSelection>({ kind: "page" });
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [showGuides, setShowGuides] = useState(false);
  const [motionEnabled, setMotionEnabled] = useState(true);
  const [showTree, setShowTree] = useState(false);
  const [showInspector, setShowInspector] = useState(true);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [saveMessage, setSaveMessage] = useState("");

  const draft = drafts[selectedRecipeId];
  const recipe = draft?.present;
  const dirty = draft
    ? JSON.stringify(draft.present) !== JSON.stringify(draft.baseline)
    : false;

  useEffect(() => {
    function handleBeforeUnload(event: BeforeUnloadEvent) {
      const anyDirty = Object.values(drafts).some(
        (entry) =>
          JSON.stringify(entry.present) !== JSON.stringify(entry.baseline),
      );
      if (!anyDirty) return;
      event.preventDefault();
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [drafts]);

  useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      const modifier = event.ctrlKey || event.metaKey;
      if (!modifier) return;
      if (event.key.toLowerCase() === "s") {
        event.preventDefault();
        void saveCurrent();
      } else if (event.key.toLowerCase() === "z") {
        event.preventDefault();
        if (event.shiftKey) redo();
        else undo();
      }
    }
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  });

  function switchRecipe(id: string) {
    setSelectedRecipeId(id);
    setSelection({ kind: "page" });
    setSaveState("idle");
    setSaveMessage("");
  }

  function updateCurrent(mutator: (next: PageRecipe) => void) {
    if (!recipe) return;
    setSaveState("idle");
    setSaveMessage("");
    setDrafts((current) => {
      const state = current[selectedRecipeId];
      if (!state) return current;
      const next = cloneRecipe(state.present);
      mutator(next);
      return {
        ...current,
        [selectedRecipeId]: {
          ...state,
          past: [...state.past, state.present].slice(-60),
          present: next,
          future: [],
        },
      };
    });
  }

  function undo() {
    setDrafts((current) => {
      const state = current[selectedRecipeId];
      if (!state || state.past.length === 0) return current;
      const previous = state.past[state.past.length - 1];
      return {
        ...current,
        [selectedRecipeId]: {
          ...state,
          past: state.past.slice(0, -1),
          present: previous,
          future: [state.present, ...state.future],
        },
      };
    });
  }

  function redo() {
    setDrafts((current) => {
      const state = current[selectedRecipeId];
      if (!state || state.future.length === 0) return current;
      const next = state.future[0];
      return {
        ...current,
        [selectedRecipeId]: {
          ...state,
          past: [...state.past, state.present],
          present: next,
          future: state.future.slice(1),
        },
      };
    });
  }

  function resetCurrent() {
    if (!draft) return;
    updateCurrent((next) => Object.assign(next, cloneRecipe(draft.baseline)));
    setSelection({ kind: "page" });
  }

  async function saveCurrent() {
    if (!recipe || saveState === "saving") return;
    setSaveState("saving");
    setSaveMessage("Validating and writing recipe…");

    try {
      const response = await fetch("/api/studio/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: recipe.id, recipe }),
      });
      const payload = (await response.json()) as {
        ok?: boolean;
        error?: string;
        errors?: string[];
      };
      if (!response.ok || !payload.ok) {
        throw new Error(
          payload.errors?.join("\n") || payload.error || "Save failed",
        );
      }

      setDrafts((current) => {
        const state = current[selectedRecipeId];
        if (!state) return current;
        return {
          ...current,
          [selectedRecipeId]: {
            ...state,
            baseline: cloneRecipe(state.present),
          },
        };
      });
      setSaveState("saved");
      setSaveMessage(
        "Saved to the recipe file. GitHub Desktop will show the change.",
      );
    } catch (error) {
      setSaveState("error");
      setSaveMessage(error instanceof Error ? error.message : "Save failed");
    }
  }

  if (!recipe || !draft) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-400">
        No page recipes found.
      </div>
    );
  }

  return (
    <div className="bg-[#080a0f] text-slate-100">
      <div
        className="grid h-screen overflow-hidden transition-[grid-template-columns] duration-200"
        style={{
          gridTemplateColumns: `${showTree ? "240px" : "0px"} minmax(0, 1fr) ${showInspector ? "330px" : "0px"}`,
        }}
      >
        <StudioSidebar
          catalog={catalog}
          drafts={drafts}
          recipe={recipe}
          selectedRecipeId={selectedRecipeId}
          selection={selection}
          onSwitchRecipe={switchRecipe}
          onSelect={setSelection}
        />

        <section className="flex min-h-0 min-w-0 flex-col bg-[#07090d]">
          <StudioToolbar
            viewport={viewport}
            showTree={showTree}
            showInspector={showInspector}
            showGuides={showGuides}
            motionEnabled={motionEnabled}
            canUndo={draft.past.length > 0}
            canRedo={draft.future.length > 0}
            dirty={dirty}
            saveState={saveState}
            onViewport={setViewport}
            onToggleTree={() => setShowTree((value) => !value)}
            onToggleInspector={() => setShowInspector((value) => !value)}
            onToggleGuides={() => setShowGuides((value) => !value)}
            onToggleMotion={() => setMotionEnabled((value) => !value)}
            onUndo={undo}
            onRedo={redo}
            onReset={resetCurrent}
            onSave={() => void saveCurrent()}
          />

          <div className="flex min-h-0 flex-1 flex-col">
            <div className="flex h-9 shrink-0 items-center justify-between border-b border-white/[0.06] bg-[#090b10] px-4 font-mono text-[9px] uppercase tracking-[0.10em] text-slate-600">
              <span>{recipe.route}</span>
              <span className={dirty ? "text-amber-300/80" : "text-emerald-300/65"}>
                {dirty ? "unsaved recipe changes" : "matches saved recipe"}
              </span>
            </div>

            <div className="min-h-0 flex-1 overflow-auto p-5">
              <div
                className="mx-auto min-h-full overflow-hidden rounded-[14px] border border-white/[0.09] bg-black shadow-[0_30px_100px_rgba(0,0,0,0.36)] transition-[width] duration-300"
                style={{ width: VIEWPORT_WIDTH[viewport] }}
              >
                <PageRenderer
                  recipe={recipe}
                  preview
                  selected={selection}
                  showGuides={showGuides}
                  motionEnabled={motionEnabled}
                  onSelect={setSelection}
                />
              </div>
            </div>
          </div>
        </section>

        <StudioInspector
          recipe={recipe}
          selection={selection}
          saveState={saveState}
          saveMessage={saveMessage}
          update={updateCurrent}
        />
      </div>
    </div>
  );
}
