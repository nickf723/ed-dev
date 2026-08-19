import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";
import type { CurriculumNode } from "@/lib/curriculum/types";

export default function CurriculumSiblingNav({
  previous,
  parent,
  next,
  accentRgb = "148, 163, 184",
}: {
  previous?: CurriculumNode;
  parent?: CurriculumNode;
  next?: CurriculumNode;
  accentRgb?: string;
}) {
  return (
    <nav aria-label="Curriculum sequence" className="mt-8 grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
      {previous ? (
        <SequenceLink node={previous} direction="previous" accentRgb={accentRgb} />
      ) : <div aria-hidden="true" />}

      {parent ? (
        <Link href={parent.href} className="group flex min-h-[68px] items-center justify-center gap-2 rounded-[16px] border border-white/[0.07] bg-black/[0.10] px-4 py-3 font-mono text-[8px] uppercase tracking-[0.10em] text-slate-600 transition hover:bg-white/[0.025] hover:text-slate-400">
          <ArrowUp size={11} className="transition group-hover:-translate-y-0.5" />
          {parent.label}
        </Link>
      ) : <div aria-hidden="true" />}

      {next ? (
        <SequenceLink node={next} direction="next" accentRgb={accentRgb} />
      ) : <div aria-hidden="true" />}
    </nav>
  );
}

function SequenceLink({ node, direction, accentRgb }: { node: CurriculumNode; direction: "previous" | "next"; accentRgb: string }) {
  const previous = direction === "previous";
  return (
    <Link href={node.href} className={`group flex min-h-[68px] items-center gap-3 rounded-[16px] border border-white/[0.07] bg-black/[0.10] px-4 py-3 transition hover:bg-white/[0.025] ${previous ? "justify-start" : "justify-end text-right"}`}>
      {previous ? <ArrowLeft size={12} className="shrink-0 text-slate-600 transition group-hover:-translate-x-1" /> : null}
      <span className="min-w-0">
        <span className="block font-mono text-[7px] uppercase tracking-[0.10em]" style={{ color: `rgba(${accentRgb},0.48)` }}>{previous ? "previous" : "next"}</span>
        <strong className="mt-1 block truncate text-[11px] text-white/80">{node.label}</strong>
      </span>
      {!previous ? <ArrowRight size={12} className="shrink-0 text-slate-600 transition group-hover:translate-x-1" /> : null}
    </Link>
  );
}
