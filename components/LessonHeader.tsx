import React from "react";
import { LucideIcon } from "lucide-react";

type LessonHeaderProps = {
  icon: LucideIcon;
  title: string;
};

/**
 * A reusable h2 header for lessons that includes a decorative icon.
 * Relies on the parent <article> having the `.prose` class.
 */
export default function LessonHeader({
  icon: Icon,
  title,
}: LessonHeaderProps) {
  return (
    <h2 className="!mt-12 !mb-4 flex items-center gap-3 border-b border-neutral-800 pb-2 text-3xl font-bold text-cyan-300">
      <Icon className="h-7 w-7 flex-shrink-0 text-cyan-400/70" />
      <span>{title}</span>
    </h2>
  );
}