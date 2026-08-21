"use client";

import { BookOpen, ClipboardCheck, TableProperties } from "lucide-react";
import { OPEN_PAGE_VOCABULARY_EVENT } from "@/app/_components/VocabularyDrawer";

type LessonUtilityBarProps = {
  referenceTargetId?: string;
  practiceTargetId?: string;
  vocabulary?: boolean;
  accentRgb?: string;
  labelClassName?: string;
};

function scrollToTarget(targetId: string) {
  document.getElementById(targetId)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

export default function LessonUtilityBar({
  referenceTargetId,
  practiceTargetId,
  vocabulary = false,
  accentRgb = "34, 211, 238",
  labelClassName = "text-[9px]",
}: LessonUtilityBarProps) {
  return (
    <nav
      aria-label="Lesson utilities"
      className="sticky top-3 z-30 mt-3 flex flex-wrap items-center gap-2 rounded-2xl border border-white/[0.07] bg-[#050b13]/88 p-2 shadow-[0_14px_44px_rgba(0,0,0,0.24)] backdrop-blur-xl"
    >
      <span className={`px-2 font-semibold uppercase tracking-[0.14em] text-slate-600 ${labelClassName}`}>
        Lesson tools
      </span>

      {referenceTargetId ? (
        <UtilityButton
          label="Reference"
          icon={<TableProperties size={14} />}
          accentRgb={accentRgb}
          onClick={() => scrollToTarget(referenceTargetId)}
        />
      ) : null}

      {vocabulary ? (
        <UtilityButton
          label="Vocabulary"
          icon={<BookOpen size={14} />}
          accentRgb={accentRgb}
          onClick={() => window.dispatchEvent(new Event(OPEN_PAGE_VOCABULARY_EVENT))}
        />
      ) : null}

      {practiceTargetId ? (
        <UtilityButton
          label="Practice"
          icon={<ClipboardCheck size={14} />}
          accentRgb={accentRgb}
          onClick={() => scrollToTarget(practiceTargetId)}
        />
      ) : null}
    </nav>
  );
}

function UtilityButton({
  label,
  icon,
  accentRgb,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  accentRgb: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 rounded-xl border px-3 py-2 text-[11px] font-semibold text-slate-300 transition-colors hover:text-white"
      style={{
        borderColor: `rgba(${accentRgb},0.14)`,
        background: `rgba(${accentRgb},0.035)`,
      }}
    >
      <span style={{ color: `rgb(${accentRgb})` }}>{icon}</span>
      {label}
    </button>
  );
}
