"use client";

import {
  Check,
  ChevronDown,
  Copy,
  Eye,
  EyeOff,
  MoveDown,
  MoveUp,
  Plus,
  Trash2,
} from "lucide-react";
import type { ChangeEvent, ReactNode } from "react";
import { hexToRgb, rgbToHex } from "@/app/studio/_components/studio-types";

export type ChoiceOption = {
  value: string;
  label?: string;
  description?: string;
};

export function InspectorGroup({
  title,
  note,
  children,
}: {
  title: string;
  note: string;
  children: ReactNode;
}) {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-[10px] font-semibold uppercase tracking-[0.13em] text-slate-300">{title}</h3>
        <span className="font-mono text-[8px] uppercase tracking-[0.10em] text-slate-700">{note}</span>
      </div>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

export function TextField({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center justify-between text-[9px] font-medium text-slate-500">
        <span>{label}</span>
        <span className="font-mono text-[8px] text-slate-700">{value.length}</span>
      </span>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
        className="w-full rounded-[10px] border border-white/[0.08] bg-black/25 px-3 py-2 text-[11px] text-slate-200 outline-none transition placeholder:text-slate-700 focus:border-cyan-300/30"
      />
    </label>
  );
}

export function TextArea({
  label,
  value,
  rows,
  onChange,
}: {
  label: string;
  value: string;
  rows: number;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center justify-between text-[9px] font-medium text-slate-500">
        <span>{label}</span>
        <span className="font-mono text-[8px] text-slate-700">{value.length}</span>
      </span>
      <textarea
        value={value}
        rows={rows}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => onChange(event.target.value)}
        className="w-full resize-y rounded-[10px] border border-white/[0.08] bg-black/25 px-3 py-2 text-[11px] leading-5 text-slate-200 outline-none transition focus:border-cyan-300/30"
      />
    </label>
  );
}

export function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[9px] font-medium text-slate-500">{label}</span>
      <div className="relative">
        <select
          value={value}
          onChange={(event: ChangeEvent<HTMLSelectElement>) => onChange(event.target.value)}
          className="w-full appearance-none rounded-[10px] border border-white/[0.08] bg-black/25 px-3 py-2 pr-8 text-[11px] text-slate-200 outline-none transition focus:border-cyan-300/30"
        >
          {options.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <ChevronDown size={12} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-600" />
      </div>
    </label>
  );
}

export function ChoiceField({
  label,
  value,
  options,
  columns = 2,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly (string | ChoiceOption)[];
  columns?: 2 | 3;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <span className="mb-1.5 block text-[9px] font-medium text-slate-500">{label}</span>
      <div className={`grid gap-1.5 ${columns === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
        {options.map((raw) => {
          const option = typeof raw === "string" ? { value: raw, label: raw } : raw;
          const active = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              title={option.description}
              onClick={() => onChange(option.value)}
              className={`relative min-h-9 rounded-[9px] border px-2 py-2 text-left text-[9px] transition ${
                active
                  ? "border-cyan-300/24 bg-cyan-400/[0.08] text-cyan-100"
                  : "border-white/[0.07] bg-white/[0.018] text-slate-500 hover:bg-white/[0.04] hover:text-slate-300"
              }`}
            >
              <span className="block capitalize">{option.label ?? option.value}</span>
              {active ? <Check size={10} className="absolute right-1.5 top-1.5 text-cyan-300" /> : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function RangeField({
  label,
  value,
  min,
  max,
  step,
  format,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (value: number) => string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center justify-between text-[9px] font-medium text-slate-500">
        <span>{label}</span><span className="font-mono text-slate-300">{format(value)}</span>
      </span>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(Number(event.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-cyan-400"
      />
    </label>
  );
}

export function ColorField({
  label,
  rgb,
  onChange,
}: {
  label: string;
  rgb: string;
  onChange: (rgb: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[9px] font-medium text-slate-500">{label}</span>
      <div className="flex items-center gap-2 rounded-[10px] border border-white/[0.08] bg-black/25 p-2">
        <input
          type="color"
          value={rgbToHex(rgb)}
          onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(hexToRgb(event.target.value))}
          className="h-7 w-9 cursor-pointer rounded border-0 bg-transparent p-0"
        />
        <input
          value={rgb}
          onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
          className="min-w-0 flex-1 bg-transparent font-mono text-[10px] text-slate-300 outline-none"
        />
      </div>
    </label>
  );
}

export function PaletteField({
  label,
  value,
  colors,
  onChange,
}: {
  label: string;
  value: string;
  colors: readonly { label: string; rgb: string }[];
  onChange: (rgb: string) => void;
}) {
  return (
    <div>
      <span className="mb-1.5 block text-[9px] font-medium text-slate-500">{label}</span>
      <div className="flex flex-wrap gap-2">
        {colors.map((color) => {
          const active = color.rgb === value;
          return (
            <button
              key={`${color.label}-${color.rgb}`}
              type="button"
              title={color.label}
              aria-label={color.label}
              onClick={() => onChange(color.rgb)}
              className={`h-8 w-8 rounded-[9px] border p-1 transition ${active ? "border-white/55 scale-105" : "border-white/[0.10] hover:border-white/30"}`}
            >
              <span className="block h-full w-full rounded-[6px]" style={{ background: `rgb(${color.rgb})` }} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function PresetGrid({
  presets,
  onApply,
}: {
  presets: readonly { id: string; label: string; description: string }[];
  onApply: (id: string) => void;
}) {
  return (
    <div className="grid gap-2">
      {presets.map((preset) => (
        <button
          key={preset.id}
          type="button"
          onClick={() => onApply(preset.id)}
          className="rounded-[11px] border border-white/[0.07] bg-white/[0.02] px-3 py-2.5 text-left transition hover:border-cyan-300/16 hover:bg-cyan-400/[0.035]"
        >
          <strong className="block text-[10px] text-slate-200">{preset.label}</strong>
          <span className="mt-0.5 block text-[8px] leading-4 text-slate-600">{preset.description}</span>
        </button>
      ))}
    </div>
  );
}

export function ToggleField({
  label,
  checked,
  description,
  onChange,
}: {
  label: string;
  checked: boolean;
  description?: string;
  onChange: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex w-full items-center gap-3 rounded-[10px] border border-white/[0.07] bg-white/[0.018] px-3 py-2.5 text-left"
    >
      <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] border ${checked ? "border-cyan-300/20 bg-cyan-400/[0.08] text-cyan-200" : "border-white/[0.08] text-slate-700"}`}>
        {checked ? <Eye size={13} /> : <EyeOff size={13} />}
      </span>
      <span className="min-w-0">
        <strong className="block text-[9px] font-medium text-slate-300">{label}</strong>
        {description ? <span className="mt-0.5 block text-[8px] leading-4 text-slate-600">{description}</span> : null}
      </span>
    </button>
  );
}

export function OrderControls({
  index,
  count,
  move,
}: {
  index: number;
  count: number;
  move: (direction: -1 | 1) => void;
}) {
  return (
    <InspectorGroup title="Order" note="Stable geometry">
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          disabled={index <= 0}
          onClick={() => move(-1)}
          className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-white/[0.08] bg-white/[0.025] px-3 py-2 text-[10px] text-slate-400 disabled:opacity-25"
        >
          <MoveUp size={13} /> Earlier
        </button>
        <button
          type="button"
          disabled={index < 0 || index >= count - 1}
          onClick={() => move(1)}
          className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-white/[0.08] bg-white/[0.025] px-3 py-2 text-[10px] text-slate-400 disabled:opacity-25"
        >
          <MoveDown size={13} /> Later
        </button>
      </div>
    </InspectorGroup>
  );
}

export function AddButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex w-full items-center justify-center gap-2 rounded-[10px] border border-dashed border-cyan-300/15 bg-cyan-400/[0.025] px-3 py-2.5 text-[9px] font-medium text-cyan-100/70 hover:bg-cyan-400/[0.05]"
    >
      <Plus size={12} /> {label}
    </button>
  );
}

export function ItemActions({
  duplicateLabel = "Duplicate",
  deleteLabel = "Delete",
  onDuplicate,
  onDelete,
  deleteDisabled,
}: {
  duplicateLabel?: string;
  deleteLabel?: string;
  onDuplicate: () => void;
  onDelete: () => void;
  deleteDisabled?: boolean;
}) {
  return (
    <InspectorGroup title="Actions" note="Recipe structure">
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={onDuplicate}
          className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-white/[0.08] bg-white/[0.025] px-3 py-2 text-[9px] text-slate-400 hover:text-white"
        >
          <Copy size={12} /> {duplicateLabel}
        </button>
        <button
          type="button"
          onClick={onDelete}
          disabled={deleteDisabled}
          className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-red-300/10 bg-red-400/[0.025] px-3 py-2 text-[9px] text-red-200/65 hover:bg-red-400/[0.05] disabled:cursor-not-allowed disabled:opacity-25"
        >
          <Trash2 size={12} /> {deleteLabel}
        </button>
      </div>
    </InspectorGroup>
  );
}
