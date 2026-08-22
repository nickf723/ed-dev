import Link from "next/link";
import { ArrowRight, CircleDashed } from "lucide-react";
import {
  getClassroomRouteAccent,
  type ClassroomRouteAccent,
} from "@/app/classroom/_components/classroom-accents";
import {
  getClassroomSubjectPresentation,
  type ClassroomSubjectTone,
} from "@/app/classroom/_components/classroom-subjects";

export type ClassroomRouteStop = {
  id: string;
  label: string;
  title: string;
  description: string;
  status: "active" | "planned";
  href?: string;
  accent?: ClassroomRouteAccent;
};

export default function ClassroomRouteList({
  items,
  subjectTone,
  ariaLabel,
}: {
  items: readonly ClassroomRouteStop[];
  subjectTone: ClassroomSubjectTone;
  ariaLabel: string;
}) {
  const subjectPresentation = getClassroomSubjectPresentation(subjectTone);

  return (
    <nav aria-label={ariaLabel}>
      <ol className="relative space-y-3 before:absolute before:bottom-9 before:left-[23px] before:top-9 before:w-px before:bg-white/[0.10] sm:before:left-[27px]">
        {items.map((item) => {
          const live = item.status === "active" && Boolean(item.href);
          const presentation = getClassroomRouteAccent(
            item.accent ?? subjectPresentation.routeAccent,
          );
          const card = (
            <span
              className={`grid min-h-[118px] gap-4 rounded-[24px] border px-5 py-5 backdrop-blur-2xl transition-transform duration-200 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:px-6 ${
                live
                  ? `${presentation.border} ${presentation.surface} shadow-[inset_0_1px_0_rgba(255,255,255,0.045),0_18px_52px_rgba(0,0,0,0.15)] group-hover:translate-x-1`
                  : `${presentation.border} bg-black/[0.16]`
              }`}
            >
              <span className="min-w-0">
                <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <strong
                    className={`text-[clamp(1.25rem,2.4vw,1.75rem)] tracking-[-0.035em] ${
                      live ? "text-stone-100" : "text-stone-500"
                    }`}
                  >
                    {item.title}
                  </strong>
                  <span
                    className={`text-[11px] font-semibold uppercase tracking-[0.12em] ${presentation.text} ${
                      live ? "" : "opacity-45"
                    }`}
                  >
                    {live ? "Open" : "In development"}
                  </span>
                </span>
                <span
                  className={`mt-2 block max-w-3xl text-[14px] leading-6 ${
                    live ? "text-stone-400" : "text-stone-600"
                  }`}
                >
                  {item.description}
                </span>
              </span>

              <span
                className={`flex h-10 w-10 items-center justify-center rounded-full border ${presentation.border} ${presentation.text} ${
                  live ? "" : "opacity-35"
                }`}
              >
                {live ? <ArrowRight size={17} /> : <CircleDashed size={15} />}
              </span>
            </span>
          );

          return (
            <li key={item.id} className="relative pl-[66px] sm:pl-[78px]">
              <span
                className={`absolute left-0 top-6 z-10 flex h-12 w-12 items-center justify-center rounded-full border font-mono text-[12px] font-semibold shadow-[0_0_0_7px_rgba(3,13,10,0.78)] sm:h-14 sm:w-14 ${presentation.marker} ${
                  live ? "" : "opacity-45"
                }`}
              >
                {item.label}
              </span>
              {live && item.href ? (
                <Link
                  href={item.href}
                  className="group block rounded-[24px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-4 focus-visible:ring-offset-[#031912]"
                >
                  {card}
                </Link>
              ) : (
                <div aria-disabled="true">{card}</div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
