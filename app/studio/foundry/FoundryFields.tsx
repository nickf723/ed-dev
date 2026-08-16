"use client";

import type { ChangeEvent, ReactNode } from "react";

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[8px] font-semibold uppercase tracking-[0.12em] text-slate-600">
        {label}
      </span>
      {children}
    </label>
  );
}

export function TextInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      value={value}
      placeholder={placeholder}
      onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
      className="h-10 w-full rounded-[10px] border border-white/[0.07] bg-black/25 px-3 text-[10px] text-slate-300 outline-none placeholder:text-slate-700 focus:border-cyan-300/20"
    />
  );
}

export function TextArea({
  value,
  onChange,
  rows = 3,
}: {
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      rows={rows}
      onChange={(event: ChangeEvent<HTMLTextAreaElement>) => onChange(event.target.value)}
      className="w-full resize-y rounded-[10px] border border-white/[0.07] bg-black/25 px-3 py-2.5 text-[10px] leading-5 text-slate-300 outline-none focus:border-cyan-300/20"
    />
  );
}

export function Select({
  value,
  options,
  onChange,
}: {
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}) {
  return (
    <select
      value={value}
      onChange={(event: ChangeEvent<HTMLSelectElement>) => onChange(event.target.value)}
      className="h-10 w-full rounded-[10px] border border-white/[0.07] bg-[#0b0e14] px-3 text-[9px] text-slate-400 outline-none focus:border-cyan-300/20"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export function StringList({
  value,
  onChange,
  placeholder = "One item per line",
  rows = 4,
}: {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      value={value.join("\n")}
      placeholder={placeholder}
      rows={rows}
      onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
        onChange(
          event.target.value
            .split("\n")
            .map((item: string) => item.trim())
            .filter(Boolean),
        )
      }
      className="w-full resize-y rounded-[10px] border border-white/[0.07] bg-black/25 px-3 py-2.5 text-[9px] leading-5 text-slate-400 outline-none placeholder:text-slate-700 focus:border-cyan-300/20"
    />
  );
}

export function Panel({
  title,
  note,
  children,
}: {
  title: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[16px] border border-white/[0.07] bg-white/[0.018] p-4">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h3 className="text-[10px] font-semibold uppercase tracking-[0.11em] text-slate-300">
          {title}
        </h3>
        {note ? <span className="font-mono text-[7px] uppercase text-slate-700">{note}</span> : null}
      </div>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

export function Toggle({
  checked,
  label,
  onChange,
}: {
  checked: boolean;
  label: string;
  onChange: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-4 rounded-[10px] border border-white/[0.06] bg-black/20 px-3 py-2.5 text-left"
    >
      <span className="text-[9px] text-slate-500">{label}</span>
      <span
        className={`h-5 w-9 rounded-full p-0.5 transition ${checked ? "bg-cyan-400/35" : "bg-white/[0.08]"}`}
      >
        <span
          className={`block h-4 w-4 rounded-full bg-white transition ${checked ? "translate-x-4" : ""}`}
        />
      </span>
    </button>
  );
}
