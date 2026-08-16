"use client";

import { ExternalLink, X } from "lucide-react";
import { useEffect } from "react";
import type { CollectionMediaRecord } from "@/lib/collections/schema";

export default function MediaDetailDrawer({
  record,
  accentRgb = "244, 114, 182",
  onClose,
}: {
  record: CollectionMediaRecord;
  accentRgb?: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <button type="button" aria-label="Close details" onClick={onClose} className="absolute inset-0 bg-black/[0.78] backdrop-blur-sm" />
      <aside className="relative z-10 h-full w-full max-w-[620px] overflow-y-auto border-l border-white/[0.09] bg-[#08070d]/[0.97] shadow-[-30px_0_100px_rgba(0,0,0,0.45)]">
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-white/[0.08] bg-[#08070d]/90 px-5 py-4 backdrop-blur-xl">
          <div className="font-mono text-[8px] uppercase tracking-[0.12em]" style={{ color: `rgba(${accentRgb},0.7)` }}>Collection record</div>
          <button type="button" onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] text-slate-600 hover:text-white"><X size={15} /></button>
        </div>

        <div className="p-5 sm:p-7">
          <div className="grid gap-5 sm:grid-cols-[190px_minmax(0,1fr)]">
            <div className="aspect-square overflow-hidden rounded-[20px] border border-white/[0.08] bg-black/30 shadow-[0_20px_70px_rgba(0,0,0,0.28)]">
              {record.imageUrl ? <img src={record.imageUrl} alt="" className="h-full w-full object-cover" referrerPolicy="no-referrer" /> : <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(244,114,182,0.15),transparent_42%),linear-gradient(145deg,#18101b,#050508)]" />}
            </div>
            <div className="self-end">
              {record.year ? <div className="font-mono text-[8px] uppercase tracking-[0.1em] text-slate-700">{record.year}</div> : null}
              <h2 className="mt-1 text-[clamp(2rem,5vw,3.7rem)] font-semibold leading-[0.92] tracking-[-0.055em] text-white">{record.title}</h2>
              {record.primaryCreator ? <p className="mt-3 text-[13px] text-slate-400">{record.primaryCreator}</p> : null}
              {record.subtitle ? <p className="mt-1 font-serif text-[11px] italic text-slate-600">{record.subtitle}</p> : null}
            </div>
          </div>

          {record.description ? <p className="mt-7 text-[11px] leading-6 text-slate-400">{record.description}</p> : null}

          {record.tags.length ? (
            <div className="mt-5 flex flex-wrap gap-1.5">
              {record.tags.map((tag) => <span key={tag} className="rounded-full border border-white/[0.07] bg-white/[0.018] px-2.5 py-1 text-[8px] text-slate-500">{tag}</span>)}
            </div>
          ) : null}

          <section className="mt-8">
            <div className="font-mono text-[8px] font-semibold uppercase tracking-[0.13em] text-slate-600">Record facts</div>
            <div className="mt-3 divide-y divide-white/[0.06] rounded-[16px] border border-white/[0.07] bg-white/[0.014] px-4">
              {Object.entries(record.facts).filter(([, value]) => value !== undefined && value !== "").map(([label, value]) => (
                <div key={label} className="grid grid-cols-[130px_minmax(0,1fr)] gap-4 py-3 text-[9px]">
                  <span className="capitalize text-slate-700">{humanize(label)}</span>
                  <span className="text-right text-slate-400">{String(value)}</span>
                </div>
              ))}
            </div>
          </section>

          {record.sources.length ? (
            <section className="mt-8">
              <div className="font-mono text-[8px] font-semibold uppercase tracking-[0.13em] text-slate-600">Sources</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {record.sources.map((source) => source.url ? (
                  <a key={source.label} href={source.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.018] px-3 py-2 text-[9px] text-slate-500 hover:text-white">{source.label}<ExternalLink size={10} /></a>
                ) : <span key={source.label} className="rounded-full border border-white/[0.07] px-3 py-2 text-[9px] text-slate-600">{source.label}</span>)}
              </div>
            </section>
          ) : null}
        </div>
      </aside>
    </div>
  );
}

function humanize(value: string) {
  return value.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ");
}
