"use client";

import { ChevronDown, MoveDown, MoveUp } from "lucide-react";
import type { ChangeEvent, ReactNode } from "react";
import { hexToRgb, rgbToHex } from "@/app/studio/_components/studio-types";

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
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[9px] font-medium text-slate-500">{label}</span>
      <input
        value={value}
        onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
        className="w-full rounded-[10px] border border-white/[0.08] bg-black/25 px-3 py-2 text-[11px] text-slate-200 outline-none transition focus:border-cyan-300/30"
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
      <span className="mb-1.5 block text-[9px] font-medium text-slate-500">{label}</span>
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
