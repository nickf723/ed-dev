import type { ReactNode } from "react";

export type DiscoveryLessonBlockKind =
  | "phenomenon"
  | "sandbox"
  | "bridge"
  | "formal"
  | "pitfall"
  | "application";

const LABELS: Record<DiscoveryLessonBlockKind, string> = {
  phenomenon: "THE PHENOMENON",
  sandbox: "INTERACTIVE SANDBOX",
  bridge: "CONCEPTUAL BRIDGE",
  formal: "FORMAL STRUCTURE",
  pitfall: "COMMON PITFALL",
  application: "APPLICATION",
};

const NUMBERS: Record<DiscoveryLessonBlockKind, string> = {
  phenomenon: "01",
  sandbox: "02",
  bridge: "03",
  formal: "04",
  pitfall: "05",
  application: "06",
};

type Props = {
  kind: DiscoveryLessonBlockKind;
  accentRgb: string;
  children: ReactNode;
  className?: string;
  id?: string;
};

/**
 * Shared visual grammar for discovery-first lessons.
 *
 * The content contract is deliberately narrow: phenomenon -> sandbox -> bridge
 * -> formal structure -> pitfall -> application. Individual lessons own their
 * interactions and progressive reveal state; this component only keeps the
 * sequence recognizable across subjects.
 */
export default function DiscoveryLessonBlock({
  kind,
  accentRgb,
  children,
  className = "",
  id,
}: Props) {
  return (
    <section id={id} className={`scroll-mt-24 ${className}`}>
      <div className="mb-2 flex items-center gap-3 font-mono text-[9px] font-semibold uppercase tracking-[0.14em]">
        <span style={{ color: `rgba(${accentRgb},0.74)` }}>{NUMBERS[kind]}</span>
        <span className="h-px w-8" style={{ background: `rgba(${accentRgb},0.34)` }} />
        <span style={{ color: `rgba(${accentRgb},0.72)` }}>[{LABELS[kind]}]</span>
      </div>
      {children}
    </section>
  );
}
