import Link from "next/link";
import {
  ArrowRight,
  BookMarked,
  CircleDashed,
  FlaskConical,
  Landmark,
  Sigma,
} from "lucide-react";
import type { ClassroomSubjectTone } from "@/app/classroom/_components/classroom-subjects";

export type ClassroomCourseMapItem = {
  id: string;
  shortTitle: string;
  description: string;
  status: "active" | "planned";
  href?: string;
};

function CourseDestination({
  item,
  className,
  children,
}: {
  item: ClassroomCourseMapItem;
  className: string;
  children: React.ReactNode;
}) {
  const live = item.status === "active" && Boolean(item.href);

  if (live && item.href) {
    return (
      <Link href={item.href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <div aria-disabled="true" className={className}>
      {children}
    </div>
  );
}

function CourseState({ live }: { live: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] opacity-65">
      {live ? <ArrowRight size={13} aria-hidden="true" /> : <CircleDashed size={12} aria-hidden="true" />}
      {live ? "Open" : "Planned"}
    </span>
  );
}

function MathCourseMap({ items }: { items: readonly ClassroomCourseMapItem[] }) {
  return (
    <nav aria-label="Math courses">
      <ol className="grid gap-3 md:grid-cols-2">
        {items.map((item, index) => {
          const live = item.status === "active" && Boolean(item.href);
          const number = String(index + 1).padStart(2, "0");

          return (
            <li key={item.id}>
              <CourseDestination
                item={item}
                className={`group relative block min-h-[172px] overflow-hidden rounded-[20px] border p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-200/60 ${
                  live
                    ? "border-red-200/[0.20] bg-[linear-gradient(145deg,rgba(248,113,113,0.14),rgba(3,18,13,0.74)_62%)] shadow-[0_20px_60px_rgba(0,0,0,0.16)]"
                    : "border-red-200/[0.09] bg-black/[0.17]"
                }`}
              >
                <span aria-hidden="true" className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(248,113,113,0.11)_1px,transparent_1px),linear-gradient(90deg,rgba(248,113,113,0.11)_1px,transparent_1px)] [background-size:28px_28px]" />
                <span aria-hidden="true" className="absolute -bottom-7 -right-2 font-mono text-[96px] font-bold leading-none text-red-100/[0.055]">
                  {number}
                </span>
                <span className="relative flex h-full flex-col justify-between gap-7">
                  <span className="flex items-center justify-between gap-4 font-mono text-red-200">
                    <span className="inline-flex items-center gap-2 text-[12px] font-semibold">
                      <Sigma size={15} aria-hidden="true" /> {number}
                    </span>
                    <CourseState live={live} />
                  </span>
                  <span>
                    <strong className={`block text-[24px] tracking-[-0.04em] ${live ? "text-stone-100" : "text-stone-500"}`}>
                      {item.shortTitle}
                    </strong>
                    <span className={`mt-2 block text-[13px] leading-5 ${live ? "text-stone-400" : "text-stone-600"}`}>
                      {item.description}
                    </span>
                  </span>
                </span>
              </CourseDestination>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function ScienceCourseMap({ items }: { items: readonly ClassroomCourseMapItem[] }) {
  return (
    <nav aria-label="Science courses">
      <ol className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item, index) => {
          const live = item.status === "active" && Boolean(item.href);
          const number = String(index + 1).padStart(2, "0");

          return (
            <li key={item.id}>
              <CourseDestination
                item={item}
                className={`group relative block min-h-[205px] overflow-hidden rounded-[30px_30px_18px_18px] border p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-200/60 ${
                  live
                    ? "border-green-200/[0.20] bg-[radial-gradient(circle_at_78%_18%,rgba(74,222,128,0.18),transparent_24%),linear-gradient(160deg,rgba(74,222,128,0.10),rgba(3,18,13,0.78)_62%)]"
                    : "border-green-200/[0.09] bg-black/[0.17]"
                }`}
              >
                <span aria-hidden="true" className="absolute right-5 top-5 h-14 w-14 rounded-full border border-green-200/[0.11] bg-green-300/[0.04] shadow-[0_0_0_10px_rgba(74,222,128,0.025)]" />
                <span aria-hidden="true" className="absolute right-14 top-16 h-4 w-4 rounded-full border border-green-200/[0.10]" />
                <span className="relative flex h-full flex-col">
                  <span className="flex items-center gap-2 font-mono text-[12px] font-semibold text-green-200">
                      <FlaskConical size={15} aria-hidden="true" /> {number}
                  </span>
                  <strong className={`mt-8 block text-[23px] tracking-[-0.04em] ${live ? "text-stone-100" : "text-stone-500"}`}>
                    {item.shortTitle}
                  </strong>
                  <span className={`mt-2 block text-[13px] leading-5 ${live ? "text-stone-400" : "text-stone-600"}`}>
                    {item.description}
                  </span>
                  <span className={`mt-auto pt-5 ${live ? "text-green-200" : "text-green-200/40"}`}>
                    <CourseState live={live} />
                  </span>
                </span>
              </CourseDestination>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function SocialStudiesCourseMap({ items }: { items: readonly ClassroomCourseMapItem[] }) {
  return (
    <nav aria-label="Social Studies courses">
      <ol className="relative space-y-3 before:absolute before:bottom-12 before:left-[26px] before:top-12 before:w-px before:bg-blue-300/[0.22] sm:before:left-[39px]">
        {items.map((item, index) => {
          const live = item.status === "active" && Boolean(item.href);
          const number = String(index + 1).padStart(2, "0");

          return (
            <li key={item.id} className="relative grid grid-cols-[54px_minmax(0,1fr)] gap-3 sm:grid-cols-[80px_minmax(0,1fr)] sm:gap-4">
              <span className="z-10 mt-6 flex h-[54px] w-[54px] items-center justify-center rounded-full border border-blue-200/[0.22] bg-[#061612] font-mono text-[12px] font-semibold text-blue-200 sm:h-20 sm:w-20">
                {number}
              </span>
              <CourseDestination
                item={item}
                className={`group relative block min-h-[132px] overflow-hidden rounded-[8px_24px_24px_8px] border px-5 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200/60 sm:px-6 ${
                  live
                    ? "border-blue-200/[0.20] bg-[linear-gradient(90deg,rgba(96,165,250,0.14),rgba(3,18,13,0.76)_58%)]"
                    : "border-blue-200/[0.09] bg-black/[0.17]"
                }`}
              >
                <span aria-hidden="true" className="absolute bottom-0 left-0 top-0 w-1 bg-blue-300/[0.45]" />
                <span className="relative grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
                  <span>
                    <strong className={`flex items-start gap-2 text-[24px] tracking-[-0.04em] ${live ? "text-stone-100" : "text-stone-500"}`}>
                      <Landmark className="mt-1 shrink-0 text-blue-200/65" size={17} aria-hidden="true" />
                      <span>{item.shortTitle}</span>
                    </strong>
                    <span className={`mt-2 block max-w-3xl text-[13px] leading-5 ${live ? "text-stone-400" : "text-stone-600"}`}>
                      {item.description}
                    </span>
                  </span>
                  <span className={live ? "text-blue-200" : "text-blue-200/40"}>
                    <CourseState live={live} />
                  </span>
                </span>
              </CourseDestination>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function EnglishCourseMap({ items }: { items: readonly ClassroomCourseMapItem[] }) {
  return (
    <nav aria-label="English courses">
      <ol className="space-y-2 border-b-[10px] border-yellow-950/45 pb-3 shadow-[0_18px_30px_rgba(0,0,0,0.22)]">
        {items.map((item, index) => {
          const live = item.status === "active" && Boolean(item.href);
          const number = String(index + 1).padStart(2, "0");

          return (
            <li key={item.id} className={index % 2 === 0 ? "pr-0 sm:pr-8" : "pl-0 sm:pl-8"}>
              <CourseDestination
                item={item}
                className={`group relative block overflow-hidden rounded-[7px_20px_20px_7px] border py-4 pl-7 pr-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-200/60 ${
                  live
                    ? "border-yellow-200/[0.22] bg-[linear-gradient(90deg,rgba(250,204,21,0.16),rgba(3,18,13,0.80)_34%)]"
                    : "border-yellow-200/[0.09] bg-black/[0.17]"
                }`}
              >
                <span aria-hidden="true" className="absolute bottom-0 left-0 top-0 w-3 border-r border-yellow-100/[0.14] bg-yellow-300/[0.20]" />
                <span className="grid gap-3 sm:grid-cols-[62px_minmax(0,1fr)_auto] sm:items-center">
                  <span className="inline-flex items-center gap-2 font-serif text-[14px] font-semibold text-yellow-200">
                    <BookMarked size={15} aria-hidden="true" /> {number}
                  </span>
                  <span>
                    <strong className={`block font-serif text-[23px] tracking-[-0.025em] ${live ? "text-stone-100" : "text-stone-500"}`}>
                      {item.shortTitle}
                    </strong>
                    <span className={`mt-1 block text-[13px] leading-5 ${live ? "text-stone-400" : "text-stone-600"}`}>
                      {item.description}
                    </span>
                  </span>
                  <span className={live ? "text-yellow-200" : "text-yellow-200/40"}>
                    <CourseState live={live} />
                  </span>
                </span>
              </CourseDestination>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default function ClassroomCourseMap({
  items,
  subjectTone,
}: {
  items: readonly ClassroomCourseMapItem[];
  subjectTone: ClassroomSubjectTone;
}) {
  if (subjectTone === "science") return <ScienceCourseMap items={items} />;
  if (subjectTone === "social-studies") {
    return <SocialStudiesCourseMap items={items} />;
  }
  if (subjectTone === "english") return <EnglishCourseMap items={items} />;
  return <MathCourseMap items={items} />;
}
