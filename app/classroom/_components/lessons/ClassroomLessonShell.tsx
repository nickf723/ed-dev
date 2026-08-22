import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, type LucideIcon } from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import LessonUtilityBar from "@/app/_components/LessonUtilityBar";
import type { ClassroomSubjectTone } from "@/app/classroom/_components/classroom-subjects";

export type ClassroomLessonNavItem = {
  label: string;
  href: string;
};

export type ClassroomLessonShellProps = {
  subjectTone: ClassroomSubjectTone;
  breadcrumbs: readonly { label: string; href?: string }[];
  eyebrow: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  stages: readonly string[];
  practiceTargetId: string;
  unitHref: string;
  previous?: ClassroomLessonNavItem;
  next?: ClassroomLessonNavItem;
  lessonPosition: string;
  background: React.ReactNode;
  children: React.ReactNode;
};

const TONES: Record<
  ClassroomSubjectTone,
  {
    accentRgb: string;
    main: string;
    text: string;
    border: string;
    surface: string;
    ring: string;
    title: string;
  }
> = {
  math: {
    accentRgb: "248, 113, 113",
    main: "bg-[#170706]",
    text: "text-red-200",
    border: "border-red-200/[0.14]",
    surface: "bg-red-300/[0.035]",
    ring: "focus-visible:ring-red-300/60",
    title:
      "font-mono text-[clamp(2.05rem,4.1vw,4rem)] font-semibold uppercase leading-[0.9] tracking-[-0.055em] text-[#fff7f5]",
  },
  science: {
    accentRgb: "74, 222, 128",
    main: "bg-[#03170f]",
    text: "text-green-200",
    border: "border-green-200/[0.14]",
    surface: "bg-green-300/[0.035]",
    ring: "focus-visible:ring-green-300/60",
    title:
      "text-[clamp(2.15rem,4.3vw,4.1rem)] font-semibold uppercase leading-[0.9] tracking-[-0.05em] text-[#f2fff6]",
  },
  "social-studies": {
    accentRgb: "96, 165, 250",
    main: "bg-[#05101c]",
    text: "text-blue-200",
    border: "border-blue-200/[0.14]",
    surface: "bg-blue-300/[0.035]",
    ring: "focus-visible:ring-blue-300/60",
    title:
      "font-serif text-[clamp(2.15rem,4.3vw,4.1rem)] font-semibold leading-[0.9] tracking-[-0.045em] text-[#f5f9ff]",
  },
  english: {
    accentRgb: "250, 204, 21",
    main: "bg-[#171205]",
    text: "text-yellow-200",
    border: "border-yellow-200/[0.14]",
    surface: "bg-yellow-300/[0.035]",
    ring: "focus-visible:ring-yellow-300/60",
    title:
      "font-serif text-[clamp(2.15rem,4.3vw,4.1rem)] font-semibold leading-[0.9] tracking-[-0.045em] text-[#fffbea]",
  },
};

export default function ClassroomLessonShell({
  subjectTone,
  breadcrumbs,
  eyebrow,
  icon,
  title,
  subtitle,
  stages,
  practiceTargetId,
  unitHref,
  previous,
  next,
  lessonPosition,
  background,
  children,
}: ClassroomLessonShellProps) {
  const tone = TONES[subjectTone];

  return (
    <main
      className={`relative min-h-screen overflow-x-hidden text-stone-100 ${tone.main}`}
    >
      {background}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.10),rgba(0,0,0,0.62))]" />

      <div className="relative z-10 mx-auto w-full max-w-[1050px] px-4 py-4 sm:px-6 xl:py-5">
        <DomainPageHeader
          breadcrumbs={breadcrumbs}
          eyebrow={eyebrow}
          icon={icon}
          title={<span>{title}</span>}
          subtitle={subtitle}
          accentRgb={tone.accentRgb}
          titleClassName={tone.title}
          metadataTextClassName="text-[11px]"
          iconClassName="rounded-[16px]"
          headerClassName="border-white/[0.12]"
        />

        <LessonUtilityBar
          practiceTargetId={practiceTargetId}
          vocabulary={false}
          accentRgb={tone.accentRgb}
          labelClassName="text-[11px]"
        />

        <ol
          aria-label="Lesson flow"
          className="mt-3 grid grid-cols-2 gap-1.5 rounded-[18px] border border-white/[0.08] bg-black/[0.18] p-2 backdrop-blur-2xl sm:grid-cols-4 lg:grid-cols-7"
        >
          {stages.map((stage, index) => (
            <li
              key={stage}
              className="flex min-h-10 items-center gap-2 rounded-[12px] border border-white/[0.055] bg-white/[0.018] px-2.5 py-2"
            >
              <span
                className={`font-mono text-[12px] font-semibold ${tone.text}`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-[12px] font-semibold text-stone-300">
                {stage}
              </span>
            </li>
          ))}
        </ol>

        {children}

        <nav className="mt-4 pb-8" aria-label="Lesson navigation">
          <div className="mb-2 flex justify-end">
            <span className="font-mono text-[11px] text-stone-600">
              {lessonPosition}
            </span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {previous ? (
              <LessonDestination
                item={previous}
                direction="previous"
                tone={tone}
              />
            ) : (
              <Link
                href={unitHref}
                className={`group flex min-h-[68px] items-center gap-3 rounded-[16px] border px-4 py-3 focus-visible:outline-none focus-visible:ring-2 ${tone.border} ${tone.surface} ${tone.ring}`}
              >
                <ArrowLeft size={15} className={tone.text} aria-hidden="true" />
                <span>
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-stone-500">
                    Unit overview
                  </span>
                  <strong className="mt-1 block text-[14px] text-stone-200">
                    Return to the lesson line
                  </strong>
                </span>
              </Link>
            )}

            {next ? (
              <LessonDestination item={next} direction="next" tone={tone} />
            ) : (
              <Link
                href={unitHref}
                className={`group flex min-h-[68px] items-center rounded-[16px] border px-4 focus-visible:outline-none focus-visible:ring-2 ${tone.border} ${tone.surface} ${tone.ring}`}
              >
                <span className="min-w-0 flex-1 text-right">
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-stone-500">
                    Current frontier
                  </span>
                  <strong className="mt-1 block text-[14px] text-stone-200">
                    Preview the rest of Unit 1
                  </strong>
                </span>
                <Check
                  size={15}
                  className={`ml-3 ${tone.text}`}
                  aria-hidden="true"
                />
              </Link>
            )}
          </div>
        </nav>
      </div>
    </main>
  );
}

function LessonDestination({
  item,
  direction,
  tone,
}: {
  item: ClassroomLessonNavItem;
  direction: "previous" | "next";
  tone: (typeof TONES)[ClassroomSubjectTone];
}) {
  const previous = direction === "previous";

  return (
    <Link
      href={item.href}
      className={`group flex min-h-[68px] items-center gap-3 rounded-[16px] border px-4 py-3 focus-visible:outline-none focus-visible:ring-2 ${tone.border} ${tone.surface} ${tone.ring}`}
    >
      {previous ? (
        <ArrowLeft size={15} className={tone.text} aria-hidden="true" />
      ) : null}
      <span className={`min-w-0 flex-1 ${previous ? "" : "text-right"}`}>
        <span className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-stone-500">
          {previous ? "Previous lesson" : "Next lesson"}
        </span>
        <strong className="mt-1 block text-[14px] text-stone-200">
          {item.label}
        </strong>
      </span>
      {!previous ? (
        <ArrowRight size={15} className={tone.text} aria-hidden="true" />
      ) : null}
    </Link>
  );
}
