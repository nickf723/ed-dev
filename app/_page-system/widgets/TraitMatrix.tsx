"use client";

export type TraitMatrixRow = {
  id: string;
  label: string;
  values: Record<string, string>;
  note?: string;
};

export default function TraitMatrix({
  columns,
  rows,
  accentByColumn,
}: {
  columns: { id: string; label: string }[];
  rows: TraitMatrixRow[];
  accentByColumn?: Record<string, string>;
}) {
  return (
    <div className="overflow-x-auto rounded-[24px] border border-white/[0.08] bg-black/[0.18] backdrop-blur-xl">
      <table className="min-w-[760px] w-full border-collapse text-left">
        <thead>
          <tr>
            <th className="border-b border-r border-white/[0.07] bg-white/[0.02] px-4 py-3 font-mono text-[8px] uppercase tracking-[0.12em] text-slate-600">trait</th>
            {columns.map((column) => (
              <th key={column.id} className="border-b border-r border-white/[0.07] bg-white/[0.02] px-4 py-3 text-[10px] font-semibold text-white last:border-r-0">
                <span style={{ color: `rgb(${accentByColumn?.[column.id] ?? "148,163,184"})` }}>{column.label}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="align-top">
              <th className="border-b border-r border-white/[0.06] px-4 py-3 text-[9px] font-medium text-slate-400">
                {row.label}
                {row.note ? <span className="mt-1 block text-[7px] font-normal leading-3 text-slate-700">{row.note}</span> : null}
              </th>
              {columns.map((column) => (
                <td key={column.id} className="border-b border-r border-white/[0.06] px-4 py-3 text-[9px] leading-4 text-slate-500 last:border-r-0">
                  {row.values[column.id] ?? "—"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
