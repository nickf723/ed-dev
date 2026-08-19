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
 * The blocks organize a lesson, but never gate access to later content.
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
      <div className="mb-3 flex items-center gap-3 font-mono text-[10px] font-semibold uppercase tracking-[0.13em] sm:text-[11px]">
        <span style={{ color: `rgba(${accentRgb},0.88)` }}>{NUMBERS[kind]}</span>
        <span className="h-px w-9" style={{ background: `rgba(${accentRgb},0.42)` }} />
        <span style={{ color: `rgba(${accentRgb},0.86)` }}>[{LABELS[kind]}]</span>
      </div>
      {children}
    </section>
  );
}
