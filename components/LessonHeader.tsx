// components/LessonHeader.tsx
import React from "react";
import { LucideIcon } from "lucide-react";

type LessonHeaderProps = {
  icon: LucideIcon;
  title: string;
};

export default function LessonHeader({
  icon: Icon,
  title,
}: LessonHeaderProps) {
  return (
    // 👇 UPDATED: Removed hard-coded text-cyan-300
    <h2
      className="!mt-12 !mb-4 flex items-center gap-3 border-b border-neutral-800 pb-2 text-3xl font-bold"
      style={{ color: "var(--color-text-header)" }} // Use CSS variable
    >
      {/* 👇 UPDATED: Removed hard-coded text-cyan-400/70 */}
      <Icon
        className="h-7 w-7 flex-shrink-0"
        style={{ color: "var(--color-text-icon)" }} // Use CSS variable
      />
      <span>{title}</span>
    </h2>
  );
}