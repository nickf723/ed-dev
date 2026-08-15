"use client";

import {
  AlignJustify,
  Check,
  Eye,
  EyeOff,
  Monitor,
  PanelLeft,
  PanelRight,
  Redo2,
  RefreshCcw,
  Save,
  Smartphone,
  Tablet,
  Undo2,
} from "lucide-react";
import type { ReactNode } from "react";
import type { SaveState, Viewport } from "@/app/studio/_components/studio-types";

export default function StudioToolbar({
  viewport,
  showTree,
  showInspector,
  showGuides,
  motionEnabled,
  canUndo,
  canRedo,
  dirty,
  saveState,
  onViewport,
  onToggleTree,
  onToggleInspector,
  onToggleGuides,
  onToggleMotion,
  onUndo,
  onRedo,
  onReset,
  onSave,
}: {
  viewport: Viewport;
  showTree: boolean;
  showInspector: boolean;
  showGuides: boolean;
  motionEnabled: boolean;
  canUndo: boolean;
  canRedo: boolean;
  dirty: boolean;
  saveState: SaveState;
  onViewport: (viewport: Viewport) => void;
  onToggleTree: () => void;
  onToggleInspector: () => void;
  onToggleGuides: () => void;
  onToggleMotion: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onReset: () => void;
  onSave: () => void;
}) {
  return (
    <div className="flex h-14 shrink-0 items-center gap-4 overflow-x-auto border-b border-white/[0.08] bg-[#0b0e14] px-4">
      <div className="flex shrink-0 items-center gap-2">
        <ToolbarButton label={showTree ? "Hide structure" : "Show structure"} active={showTree} onClick={onToggleTree}>
          <PanelLeft size={14} />
        </ToolbarButton>
        <div className="mx-1 h-5 w-px bg-white/[0.08]" />
        <ToolbarButton label="Undo" onClick={onUndo} disabled={!canUndo}>
          <Undo2 size={14} />
        </ToolbarButton>
        <ToolbarButton label="Redo" onClick={onRedo} disabled={!canRedo}>
          <Redo2 size={14} />
        </ToolbarButton>
        <div className="mx-1 h-5 w-px bg-white/[0.08]" />
        <ViewportButton active={viewport === "desktop"} label="Desktop" onClick={() => onViewport("desktop")}>
          <Monitor size={14} />
        </ViewportButton>
        <ViewportButton active={viewport === "tablet"} label="Tablet" onClick={() => onViewport("tablet")}>
          <Tablet size={14} />
        </ViewportButton>
        <ViewportButton active={viewport === "mobile"} label="Mobile" onClick={() => onViewport("mobile")}>
          <Smartphone size={14} />
        </ViewportButton>
      </div>

      <div className="ml-auto flex shrink-0 items-center gap-2">
        <ToolbarButton label={showInspector ? "Hide inspector" : "Show inspector"} active={showInspector} onClick={onToggleInspector}>
          <PanelRight size={14} />
        </ToolbarButton>
        <ToolbarButton label={showGuides ? "Hide alignment guides" : "Show alignment guides"} active={showGuides} onClick={onToggleGuides}>
          <AlignJustify size={14} />
        </ToolbarButton>
        <ToolbarButton label={motionEnabled ? "Freeze motion" : "Enable motion"} active={motionEnabled} onClick={onToggleMotion}>
          {motionEnabled ? <Eye size={14} /> : <EyeOff size={14} />}
        </ToolbarButton>
        <ToolbarButton label="Reset to saved" onClick={onReset} disabled={!dirty}>
          <RefreshCcw size={14} />
        </ToolbarButton>
        <button
          type="button"
          onClick={onSave}
          disabled={!dirty || saveState === "saving"}
          className="ml-1 inline-flex h-9 items-center gap-2 rounded-[11px] border border-cyan-300/20 bg-cyan-400/[0.08] px-3 text-[10px] font-semibold text-cyan-100 transition hover:bg-cyan-400/[0.13] disabled:cursor-not-allowed disabled:opacity-35"
        >
          {saveState === "saving" ? (
            <RefreshCcw size={13} className="animate-spin" />
          ) : saveState === "saved" && !dirty ? (
            <Check size={13} />
          ) : (
            <Save size={13} />
          )}
          Save recipe
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
