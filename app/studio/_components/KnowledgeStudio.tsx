"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import PageRenderer, { type StudioSelection } from "@/app/_page-system/PageRenderer";
import StyleGuideCanvas from "@/app/studio/_components/StyleGuideCanvas";
import ParameterMatrix from "@/app/studio/_components/ParameterMatrix";
import StudioInspector from "@/app/studio/_components/StudioInspector";
import StudioSidebar from "@/app/studio/_components/StudioSidebar";
import StudioToolbar from "@/app/studio/_components/StudioToolbar";
import { applyGlobalDesign } from "@/lib/design-system/resolve";
import type { GlobalDesignSystem } from "@/lib/design-system/schema";
import {
  VIEWPORT_WIDTH,
  cloneDesignSystem,
  cloneRecipe,
  createDesignSystemDraftState,
  createDraftState,
  designSystemIsDirty,
  recipeIsDirty,
  type DesignSystemDraftState,
  type DraftState,
  type ParameterSheet,
  type SaveState,
  type StudioView,
  type Viewport,
} from "@/app/studio/_components/studio-types";
import type { PageRecipeCatalogEntry } from "@/lib/page-system/catalog";
import type { PageRecipe } from "@/lib/page-system/schema";

type KnowledgeStudioProps = {
  initialRecipes: PageRecipe[];
  initialDesignSystem: GlobalDesignSystem;
  catalog: readonly PageRecipeCatalogEntry[];
};

export default function KnowledgeStudio({
  initialRecipes,
  initialDesignSystem,
  catalog,
}: KnowledgeStudioProps) {
  const [drafts, setDrafts] = useState<Record<string, DraftState>>(() =>
    Object.fromEntries(
      initialRecipes.map((recipe) => [recipe.id, createDraftState(recipe)]),
    ),
  );
  const [designDraft, setDesignDraft] = useState<DesignSystemDraftState>(() =>
    createDesignSystemDraftState(initialDesignSystem),
  );
  const [selectedRecipeId, setSelectedRecipeId] = useState(
    initialRecipes[0]?.id ?? "",
  );
  const [selection, setSelection] = useState<StudioSelection>({ kind: "page" });
  const [view, setView] = useState<StudioView>("page");
  const [parameterSheet, setParameterSheet] =
    useState<ParameterSheet>("palettes");
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [zoom, setZoom] = useState(0.8);
  const [showGuides, setShowGuides] = useState(false);
  const [motionEnabled, setMotionEnabled] = useState(true);
  const [showTree, setShowTree] = useState(true);
  const [showInspector, setShowInspector] = useState(true);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [saveMessage, setSaveMessage] = useState("");

  const draft = drafts[selectedRecipeId];
  const recipe = draft?.present;
  const resolvedRecipe = useMemo(
    () =>
      recipe ? applyGlobalDesign(recipe, designDraft.present) : undefined,
    [recipe, designDraft.present],
  );

  const dirtyRecipeIds = Object.entries(drafts)
    .filter(([, state]) => recipeIsDirty(state))
    .map(([id]) => id);
  const globalDirty = designSystemIsDirty(designDraft);
  const dirtyCount = dirtyRecipeIds.length + (globalDirty ? 1 : 0);
  const globalHistoryContext =
    view === "parameters" &&
    (parameterSheet === "palettes" || parameterSheet === "typography");
  const canUndo = globalHistoryContext
    ? designDraft.past.length > 0
    : Boolean(draft?.past.length);
  const canRedo = globalHistoryContext
    ? designDraft.future.length > 0
    : Boolean(draft?.future.length);

  useEffect(() => {
    function handleBeforeUnload(event: BeforeUnloadEvent) {
      if (dirtyCount === 0) return;
      event.preventDefault();
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [dirtyCount]);

  useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      const modifier = event.ctrlKey || event.metaKey;
      if (!modifier) return;
      if (event.key.toLowerCase() === "s") {
        event.preventDefault();
        void saveAll();
      } else if (event.key.toLowerCase() === "z") {
        event.preventDefault();
        if (event.shiftKey) redo();
        else undo();
      } else if (event.key === "0") {
        event.preventDefault();
        setZoom(1);
      } else if (event.key === "-") {
        event.preventDefault();
        setZoom((value) =>
          Math.max(0.5, Number((value - 0.1).toFixed(2))),
        );
      } else if (event.key === "=" || event.key === "+") {
        event.preventDefault();
        setZoom((value) =>
          Math.min(1.2, Number((value + 0.1).toFixed(2))),
        );
      }
    }
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  });

  function switchRecipe(id: string) {
    setSelectedRecipeId(id);
    setSelection(
      view === "style-guide"
        ? { kind: "design-category", id: "palette" }
        : { kind: "page" },
    );
    setSaveState("idle");
    setSaveMessage("");
  }

  function switchView(nextView: StudioView) {
    setView(nextView);
    if (nextView === "page") setSelection({ kind: "page" });
    if (
      nextView === "style-guide" &&
      selection.kind !== "design-category"
    ) {
      setSelection({ kind: "design-category", id: "palette" });
    }
  }

  function updateCurrent(mutator: (next: PageRecipe) => void) {
    updateRecipeById(selectedRecipeId, mutator);
  }

  function updateRecipeById(
    id: string,
    mutator: (next: PageRecipe) => void,
  ) {
    setSelectedRecipeId(id);
    setSaveState("idle");
    setSaveMessage("");
    setDrafts((current) => {
      const state = current[id];
      if (!state) return current;
      const next = cloneRecipe(state.present);
      mutator(next);
      return {
        ...current,
        [id]: {
          ...state,
          past: [...state.past, state.present].slice(-80),
          present: next,
          future: [],
        },
      };
    });
  }

  function updateDesignSystem(
    mutator: (next: GlobalDesignSystem) => void,
  ) {
    setSaveState("idle");
    setSaveMessage("");
    setDesignDraft((current) => {
      const next = cloneDesignSystem(current.present);
      mutator(next);
      return {
        ...current,
        past: [...current.past, current.present].slice(-80),
        present: next,
        future: [],
      };
    });
  }

  function undo() {
    if (globalHistoryContext) {
      setDesignDraft((current) => {
        if (current.past.length === 0) return current;
        const previous = current.past[current.past.length - 1];
        return {
          ...current,
          past: current.past.slice(0, -1),
          present: previous,
          future: [current.present, ...current.future],
        };
      });
      return;
    }
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
    if (globalHistoryContext) {
      setDesignDraft((current) => {
        if (current.future.length === 0) return current;
        const next = current.future[0];
        return {
          ...current,
          past: [...current.past, current.present],
          present: next,
          future: current.future.slice(1),
        };
      });
      return;
    }
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
    if (globalHistoryContext) {
      setDesignDraft((current) => ({
        ...current,
        past: [...current.past, current.present],
        present: cloneDesignSystem(current.baseline),
        future: [],
      }));
      return;
    }
    if (!draft) return;
    setDrafts((current) => ({
      ...current,
      [selectedRecipeId]: {
        ...draft,
        past: [...draft.past, draft.present],
        present: cloneRecipe(draft.baseline),
        future: [],
      },
    }));
    setSelection({ kind: "page" });
  }

  async function saveAll() {
    if (dirtyCount === 0 || saveState === "saving") return;
    setSaveState("saving");
    setSaveMessage(
      `Validating and saving ${dirtyCount} changed file${
        dirtyCount === 1 ? "" : "s"
      }…`,
    );

    try {
      for (const id of dirtyRecipeIds) {
        const state = drafts[id];
        const response = await fetch("/api/studio/pages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, recipe: state.present }),
        });
        const payload = (await response.json()) as {
          ok?: boolean;
          error?: string;
          errors?: string[];
        };
        if (!response.ok || !payload.ok) {
          throw new Error(
            payload.errors?.join("\n") ||
              payload.error ||
              `Unable to save ${id}`,
          );
        }
      }

      if (globalDirty) {
        const response = await fetch("/api/studio/design-system", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ designSystem: designDraft.present }),
        });
        const payload = (await response.json()) as {
          ok?: boolean;
          error?: string;
        };
        if (!response.ok || !payload.ok) {
          throw new Error(
            payload.error || "Unable to save global design system",
          );
        }
      }

      setDrafts((current) => {
        const next: Record<string, DraftState> = {};
        for (const [id, state] of Object.entries(current)) {
          next[id] = dirtyRecipeIds.includes(id)
            ? { ...state, baseline: cloneRecipe(state.present) }
            : state;
        }
        return next;
      });
      if (globalDirty) {
        setDesignDraft((current) => ({
          ...current,
          baseline: cloneDesignSystem(current.present),
        }));
      }
      setSaveState("saved");
      setSaveMessage(
        "Saved. GitHub Desktop will show the global registry and recipe changes as readable files.",
      );
    } catch (error) {
      setSaveState("error");
      setSaveMessage(
        error instanceof Error ? error.message : "Save failed",
      );
    }
  }

  function openRecipe(
    id: string,
    target: "page" | "style-guide" = "page",
  ) {
    setSelectedRecipeId(id);
    setView(target);
    setSelection(
      target === "style-guide"
        ? { kind: "design-category", id: "palette" }
        : { kind: "page" },
    );
  }

  if (!recipe || !draft || !resolvedRecipe) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-400">
        No page recipes found.
      </div>
    );
  }

  const canvasStyle = {
    width: VIEWPORT_WIDTH[viewport],
    zoom,
  } as CSSProperties;
  const canvasMode = view !== "parameters";
  const inspectorVisible = canvasMode && showInspector;
  const recipeList: PageRecipe[] = Object.values(drafts).map(
    (state) => state.present,
  );

  return (
    <div className="bg-[#080a0f] text-slate-100">
      <div
        className="grid h-screen overflow-hidden transition-[grid-template-columns] duration-200"
        style={{
          gridTemplateColumns: `${showTree ? "260px" : "0px"} minmax(0, 1fr) ${
            inspectorVisible ? "370px" : "0px"
          }`,
        }}
      >
        <StudioSidebar
          catalog={catalog}
          drafts={drafts}
          recipe={recipe}
          selectedRecipeId={selectedRecipeId}
          selection={selection}
          view={view}
          onSwitchRecipe={switchRecipe}
          onSelect={setSelection}
          onView={switchView}
        />

        <section className="flex min-h-0 min-w-0 flex-col bg-[#07090d]">
          <StudioToolbar
            view={view}
            viewport={viewport}
            zoom={zoom}
            showTree={showTree}
            showInspector={showInspector}
            showGuides={showGuides}
            motionEnabled={motionEnabled}
            canUndo={canUndo}
            canRedo={canRedo}
            dirtyCount={dirtyCount}
            saveState={saveState}
            onView={switchView}
            onViewport={setViewport}
            onZoom={setZoom}
            onToggleTree={() => setShowTree((value) => !value)}
            onToggleInspector={() =>
              setShowInspector((value) => !value)
            }
            onToggleGuides={() => setShowGuides((value) => !value)}
            onToggleMotion={() =>
              setMotionEnabled((value) => !value)
            }
            onUndo={undo}
            onRedo={redo}
            onReset={resetCurrent}
            onSave={() => void saveAll()}
          />

          {view === "parameters" ? (
            <ParameterMatrix
              sheet={parameterSheet}
              recipes={recipeList}
              designSystem={designDraft.present}
              onSheet={setParameterSheet}
              updateDesignSystem={updateDesignSystem}
              updateRecipe={updateRecipeById}
              openRecipe={openRecipe}
            />
          ) : (
            <div className="flex min-h-0 flex-1 flex-col">
              <div className="flex h-9 shrink-0 items-center justify-between border-b border-white/[0.06] bg-[#090b10] px-4 font-mono text-[9px] uppercase tracking-[0.10em] text-slate-600">
                <span>{recipe.route}</span>
                <span
                  className={
                    dirtyCount
                      ? "text-amber-300/80"
                      : "text-emerald-300/65"
                  }
                >
                  {dirtyCount
                    ? `${dirtyCount} unsaved file${
                        dirtyCount === 1 ? "" : "s"
                      }`
                    : "all files saved"}
                </span>
              </div>

              <div className="min-h-0 flex-1 overflow-auto p-5">
                <div
                  className="mx-auto min-h-full overflow-hidden rounded-[14px] border border-white/[0.09] bg-black shadow-[0_30px_100px_rgba(0,0,0,0.36)] transition-[width] duration-300"
                  style={canvasStyle}
                >
                  {view === "page" ? (
                    <PageRenderer
                      recipe={resolvedRecipe}
                      preview
                      selected={selection}
                      showGuides={showGuides}
                      motionEnabled={motionEnabled}
                      onSelect={setSelection}
                    />
                  ) : (
                    <StyleGuideCanvas
                      recipe={resolvedRecipe}
                      selected={selection}
                      showGuides={showGuides}
                      motionEnabled={motionEnabled}
                      onSelect={setSelection}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </section>

        {inspectorVisible ? (
          <StudioInspector
            recipe={recipe}
            resolvedRecipe={resolvedRecipe}
            designSystem={designDraft.present}
            selection={selection}
            saveState={saveState}
            saveMessage={saveMessage}
            update={updateCurrent}
            onSelect={setSelection}
            onOpenParameters={(sheet) => {
              setParameterSheet(sheet);
              setView("parameters");
            }}
          />
        ) : null}
      </div>
    </div>
  );
}
