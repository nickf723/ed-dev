"use client";

import Link from "next/link";
import {
  AlignJustify,
  Check,
  Eye,
  EyeOff,
  Hammer,
  LayoutTemplate,
  Minus,
  Monitor,
  Palette,
  PanelLeft,
  PanelRight,
  Plus,
  Redo2,
  RefreshCcw,
  Save,
  Smartphone,
  Table2,
  Tablet,
  Undo2,
} from "lucide-react";
import type { ReactNode } from "react";
import type {
  SaveState,
  StudioView,
  Viewport,
} from "@/app/studio/_components/studio-types";

export default function StudioToolbar({
  view,
  viewport,
  zoom,
  showTree,
  showInspector,
  showGuides,
  motionEnabled,
  canUndo,
  canRedo,
  dirtyCount,
  saveState,
  onView,
  onViewport,
  onZoom,
  onToggleTree,
  onToggleInspector,
  onToggleGuides,
  onToggleMotion,
  onUndo,
  onRedo,
  onReset,
  onSave,
}: {
  view: StudioView;
  viewport: Viewport;
  zoom: number;
  showTree: boolean;
  showInspector: boolean;
  showGuides: boolean;
  motionEnabled: boolean;
  canUndo: boolean;
  canRedo: boolean;
  dirtyCount: number;
  saveState: SaveState;
  onView: (view: StudioView) => void;
  onViewport: (viewport: Viewport) => void;
  onZoom: (zoom: number) => void;
  onToggleTree: () => void;
  onToggleInspector: () => void;
  onToggleGuides: () => void;
  onToggleMotion: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onReset: () => void;
  onSave: () => void;
}) {
  const canvasMode = view === "page" || view === "style-guide";

  return (
    <div className="flex h-14 shrink-0 items-center gap-4 overflow-x-auto border-b border-white/[0.08] bg-[#0b0e14] px-4">
      <div className="flex shrink-0 items-center gap-2">
        {canvasMode ? (
          <ToolbarButton
            label={showTree ? "Hide structure" : "Show structure"}
            active={showTree}
            onClick={onToggleTree}
          >
            <PanelLeft size={14} />
          </ToolbarButton>
        ) : null}

        <div className="flex items-center rounded-[10px] border border-white/[0.08] bg-black/20 p-1">
          <ViewButton
            active={view === "page"}
            label="Page canvas"
            onClick={() => onView("page")}
          >
            <LayoutTemplate size={13} /> Page
          </ViewButton>
          <ViewButton
            active={view === "style-guide"}
            label="Style guide"
            onClick={() => onView("style-guide")}
          >
            <Palette size={13} /> Style guide
          </ViewButton>
          <ViewButton
            active={view === "parameters"}
            label="Parameter workbook"
            onClick={() => onView("parameters")}
          >
            <Table2 size={13} /> Parameters
          </ViewButton>
          <Link
            href="/studio/foundry"
            title="Page Foundry"
            className="inline-flex h-7 items-center gap-1.5 rounded-[7px] px-2.5 text-[9px] font-medium text-amber-200/70 transition hover:bg-amber-400/[0.06] hover:text-amber-100"
          >
            <Hammer size={13} /> Foundry
          </Link>
        </div>

        <div className="mx-1 h-5 w-px bg-white/[0.08]" />
        <ToolbarButton label="Undo" onClick={onUndo} disabled={!canUndo}>
          <Undo2 size={14} />
        </ToolbarButton>
        <ToolbarButton label="Redo" onClick={onRedo} disabled={!canRedo}>
          <Redo2 size={14} />
        </ToolbarButton>

        {canvasMode ? (
          <>
            <div className="mx-1 h-5 w-px bg-white/[0.08]" />
            <ViewportButton
              active={viewport === "desktop"}
              label="Desktop"
              onClick={() => onViewport("desktop")}
            >
              <Monitor size={14} />
            </ViewportButton>
            <ViewportButton
              active={viewport === "tablet"}
              label="Tablet"
              onClick={() => onViewport("tablet")}
            >
              <Tablet size={14} />
            </ViewportButton>
            <ViewportButton
              active={viewport === "mobile"}
              label="Mobile"
              onClick={() => onViewport("mobile")}
            >
              <Smartphone size={14} />
            </ViewportButton>
            <div className="mx-1 h-5 w-px bg-white/[0.08]" />
            <ToolbarButton
              label="Zoom out"
              onClick={() =>
                onZoom(Math.max(0.5, Number((zoom - 0.1).toFixed(2))))
              }
              disabled={zoom <= 0.5}
            >
              <Minus size={14} />
            </ToolbarButton>
            <button
              type="button"
              title="Reset zoom (Ctrl+0)"
              onClick={() => onZoom(1)}
              className="h-8 min-w-[48px] rounded-[9px] border border-white/[0.07] bg-white/[0.02] px-2 font-mono text-[9px] text-slate-500 hover:text-white"
            >
              {Math.round(zoom * 100)}%
            </button>
            <ToolbarButton
              label="Zoom in"
              onClick={() =>
                onZoom(Math.min(1.2, Number((zoom + 0.1).toFixed(2))))
              }
              disabled={zoom >= 1.2}
            >
              <Plus size={14} />
            </ToolbarButton>
          </>
        ) : null}
      </div>

      <div className="ml-auto flex shrink-0 items-center gap-2">
        {canvasMode ? (
          <>
            <ToolbarButton
              label={showInspector ? "Hide inspector" : "Show inspector"}
              active={showInspector}
              onClick={onToggleInspector}
            >
              <PanelRight size={14} />
            </ToolbarButton>
            <ToolbarButton
              label={showGuides ? "Hide alignment guides" : "Show alignment guides"}
              active={showGuides}
              onClick={onToggleGuides}
            >
              <AlignJustify size={14} />
            </ToolbarButton>
            <ToolbarButton
              label={motionEnabled ? "Freeze motion" : "Enable motion"}
              active={motionEnabled}
              onClick={onToggleMotion}
            >
              {motionEnabled ? <Eye size={14} /> : <EyeOff size={14} />}
            </ToolbarButton>
          </>
        ) : null}
        <ToolbarButton
          label="Reset current context to saved"
          onClick={onReset}
          disabled={dirtyCount === 0}
        >
          <RefreshCcw size={14} />
        </ToolbarButton>
        <button
          type="button"
          onClick={onSave}
          disabled={dirtyCount === 0 || saveState === "saving"}
          className="ml-1 inline-flex h-9 items-center gap-2 rounded-[11px] border border-cyan-300/20 bg-cyan-400/[0.08] px-3 text-[10px] font-semibold text-cyan-100 transition hover:bg-cyan-400/[0.13] disabled:cursor-not-allowed disabled:opacity-35"
        >
          {saveState === "saving" ? (
            <RefreshCcw size={13} className="animate-spin" />
          ) : saveState === "saved" && dirtyCount === 0 ? (
            <Check size={13} />
          ) : (
            <Save size={13} />
          )}
          {dirtyCount > 1 ? `Save all (${dirtyCount})` : "Save"}
        </button>
      </div>
    </div>
  );
}

function ToolbarButton({
  label,
  onClick,
  disabled,
  active,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className={`flex h-8 w-8 items-center justify-center rounded-[9px] border transition ${
        active
          ? "border-cyan-300/18 bg-cyan-400/[0.07] text-cyan-200"
          : "border-transparent text-slate-500 hover:border-white/[0.07] hover:bg-white/[0.03] hover:text-slate-200"
      } disabled:cursor-not-allowed disabled:opacity-25`}
    >
      {children}
    </button>
  );
}

function ViewButton({
  active,
  label,
  onClick,
  children,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      onClick={onClick}
      className={`inline-flex h-7 items-center gap-1.5 rounded-[7px] px-2.5 text-[9px] font-medium transition ${
        active
          ? "bg-white/[0.08] text-white"
          : "text-slate-600 hover:text-slate-300"
      }`}
    >
      {children}
    </button>
  );
}

function ViewportButton({
  active,
  label,
  onClick,
  children,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={onClick}
      className={`flex h-8 w-8 items-center justify-center rounded-[9px] border transition ${
        active
          ? "border-white/[0.12] bg-white/[0.07] text-white"
          : "border-transparent text-slate-600 hover:text-slate-300"
      }`}
    >
      {children}
    </button>
  );
}
