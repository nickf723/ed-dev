"use client";

import { Check } from "lucide-react";
import { resolvePageIcon } from "@/app/_page-system/icon-registry";

export function IconGridField({
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
    <div>
      <span className="mb-2 block text-[9px] font-medium text-slate-500">
        {label}
      </span>
      <div className="grid max-h-[238px] grid-cols-5 gap-1.5 overflow-y-auto rounded-[12px] border border-white/[0.07] bg-black/20 p-2">
        {options.map((name) => {
          const Icon = resolvePageIcon(name);
          const active = value === name;
          return (
            <button
              key={name}
              type="button"
              title={name}
              aria-label={name}
              onClick={() => onChange(name)}
              className={`relative flex aspect-square items-center justify-center rounded-[9px] border transition ${
                active
                  ? "border-cyan-300/26 bg-cyan-400/[0.09] text-cyan-100"
                  : "border-white/[0.06] bg-white/[0.018] text-slate-600 hover:border-white/[0.13] hover:text-slate-300"
              }`}
            >
              <Icon size={15} />
              {active ? (
                <span className="absolute right-1 top-1 flex h-3 w-3 items-center justify-center rounded-full bg-cyan-300 text-slate-950">
                  <Check size={8} strokeWidth={3} />
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
      <div className="mt-1.5 truncate font-mono text-[8px] text-slate-700">
        {value}
      </div>
    </div>
  );
}

export function PaletteSystemField({
  value,
  presets,
  onApply,
}: {
  value: string;
  presets: readonly {
    id: string;
    label: string;
    description: string;
    colors: readonly string[];
  }[];
  onApply: (id: string) => void;
}) {
  return (
    <div className="grid gap-2">
      {presets.map((preset) => {
        const active = preset.colors[0] === value;
        return (
          <button
            key={preset.id}
            type="button"
            onClick={() => onApply(preset.id)}
            className={`rounded-[12px] border px-3 py-3 text-left transition ${
              active
                ? "border-cyan-300/20 bg-cyan-400/[0.045]"
                : "border-white/[0.07] bg-white/[0.018] hover:border-white/[0.13] hover:bg-white/[0.03]"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex -space-x-1">
                {preset.colors.slice(0, 4).map((rgb, index) => (
                  <span
                    key={`${preset.id}-${rgb}-${index}`}
                    className="h-7 w-7 rounded-full border-2 border-[#0c0f16]"
                    style={{ background: `rgb(${rgb})` }}
                  />
                ))}
              </div>
              {active ? (
                <span className="rounded-full border border-cyan-300/15 bg-cyan-400/[0.07] px-2 py-1 font-mono text-[7px] uppercase tracking-[0.1em] text-cyan-200">
                  active
                </span>
              ) : null}
            </div>
            <strong className="mt-2 block text-[10px] text-slate-200">
              {preset.label}
            </strong>
            <span className="mt-0.5 block text-[8px] leading-4 text-slate-600">
              {preset.description}
            </span>
          </button>
        );
      })}
    </div>
  );
}
