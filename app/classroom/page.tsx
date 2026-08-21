import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BookMarked,
  FlaskConical,
  GraduationCap,
  Landmark,
  Sigma,
} from "lucide-react";
import { COURSE_SUBJECTS } from "@/lib/courses/catalog";

type SubjectPresentation = {
  Icon: LucideIcon;
  accent: string;
  icon: string;
  surface: string;
};

const SUBJECT_PRESENTATIONS: Record<string, SubjectPresentation> = {
  math: {
    Icon: Sigma,
    accent: "text-cyan-200",
    icon: "border-cyan-200/15 bg-cyan-300/[0.08] text-cyan-200",
    surface:
      "border-cyan-200/[0.12] bg-[linear-gradient(145deg,rgba(34,211,238,0.08),rgba(10,20,33,0.68)_48%)]",
  },
  science: {
    Icon: FlaskConical,
    accent: "text-lime-200/80",
    icon: "border-lime-200/10 bg-lime-300/[0.06] text-lime-200/80",
    surface:
      "border-lime-200/[0.09] bg-[linear-gradient(145deg,rgba(163,230,53,0.055),rgba(10,20,33,0.68)_48%)]",
  },
  "social-studies": {
    Icon: Landmark,
    accent: "text-orange-200/80",
    icon: "border-orange-200/10 bg-orange-300/[0.06] text-orange-200/80",
    surface:
      "border-orange-200/[0.09] bg-[linear-gradient(145deg,rgba(251,146,60,0.055),rgba(10,20,33,0.68)_48%)]",
  },
  english: {
    Icon: BookMarked,
    accent: "text-violet-200/80",
    icon: "border-violet-200/10 bg-violet-300/[0.06] text-violet-200/80",
    surface:
      "border-violet-200/[0.09] bg-[linear-gradient(145deg,rgba(167,139,250,0.06),rgba(10,20,33,0.68)_48%)]",
  },
};

export default function ClassroomPage() {
  const activeSubject = COURSE_SUBJECTS.find((subject) => subject.status === "active");
  const activeCourse = activeSubject?.courses[0];
  const activeUnit = activeCourse?.units[0];
  const firstLesson = activeUnit?.lessons[0];
  const activePath = activeSubject && activeCourse && activeUnit && firstLesson
    ? [
        { label: "Subject", title: activeSubject.title, href: activeSubject.href },
        { label: "Course", title: activeCourse.shortTitle, href: activeCourse.href },
        { label: "Unit 1", title: activeUnit.title, href: activeUnit.href },
        { label: "Lesson 1", title: firstLesson.title, href: firstLesson.href },
      ]
    : [];

  return (
    <main className="min-h-[calc(100vh-3.5rem)]">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <section className="grid gap-6 border-b border-white/[0.07] pb-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(340px,0.72fr)] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200/10 bg-cyan-300/[0.05] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-cyan-200/80">
              <GraduationCap size={14} />
              Classroom
            </div>
            <h1 className="mt-5 max-w-4xl text-[clamp(2.9rem,6vw,5.8rem)] font-semibold leading-[0.9] tracking-[-0.065em] text-white">
              High school courses.
            </h1>
            <p className="mt-5 max-w-2xl text-[15px] leading-7 text-slate-400 sm:text-[17px]">
              Standards-aligned units, interactive lessons, practice, and teaching resources.
            </p>
          </div>

          {activeUnit && activeCourse ? (
            <Link
              href={activeUnit.href}
              className="group relative overflow-hidden rounded-[28px] border border-cyan-200/[0.13] bg-[linear-gradient(145deg,rgba(34,211,238,0.11),rgba(52,211,153,0.045)_45%,rgba(8,18,31,0.78))] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_24px_70px_rgba(0,0,0,0.20)] backdrop-blur-2xl transition-colors hover:border-cyan-200/25"
            >
              <div
                aria-hidden="true"
                className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-cyan-300/[0.07] blur-3xl"
              />
              <div className="relative flex items-center justify-between gap-4">
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan-200/75">
                  {activeCourse.shortTitle} · Unit {activeUnit.number}
                </span>
                <ArrowRight
                  size={18}
                  className="text-cyan-100 transition-transform group-hover:translate-x-1"
                />
              </div>
              <div className="relative mt-12 text-[30px] font-semibold tracking-[-0.04em] text-white">
                {activeUnit.title}
              </div>
              <p className="relative mt-2 text-[13px] leading-6 text-slate-400">
                {activeUnit.lessons.length} lessons · {activeUnit.pacing}
              </p>
            </Link>
          ) : null}
        </section>

        <section className="py-10">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan-200/70">
            Subjects
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {COURSE_SUBJECTS.map((subject) => {
              const active = subject.status === "active";
              const presentation = SUBJECT_PRESENTATIONS[subject.id];
              const Icon = presentation.Icon;
              const body = (
                <div
                  className={`flex min-h-[235px] flex-col rounded-[24px] border p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.035),0_16px_50px_rgba(0,0,0,0.14)] backdrop-blur-xl ${presentation.surface}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-2xl border ${presentation.icon}`}
                    >
                      <Icon size={18} />
                    </span>
                    <span
                      className={`text-[11px] font-semibold uppercase tracking-[0.12em] ${
                        active ? presentation.accent : "text-slate-600"
                      }`}
                    >
                      {active ? "Open" : "Later"}
                    </span>
                  </div>
                  <h2 className="mt-8 text-[25px] font-semibold tracking-[-0.035em] text-slate-100">
                    {subject.title}
                  </h2>
                  <p className="mt-2 text-[13px] leading-6 text-slate-400">
                    {subject.description}
                  </p>
                  {active ? (
                    <div className="mt-auto flex items-center gap-2 pt-5 text-[11px] font-semibold text-cyan-200/75">
                      {subject.courses[0]?.shortTitle}
                      <ArrowRight size={13} />
                    </div>
                  ) : null}
                </div>
              );

              return active ? (
                <Link
                  key={subject.id}
                  href={subject.href}
                  className="group transition-transform hover:-translate-y-0.5"
                >
                  {body}
                </Link>
              ) : (
                <div key={subject.id} aria-disabled="true">
                  {body}
                </div>
              );
            })}
          </div>
        </section>

        {activePath.length > 0 ? (
          <section className="border-t border-white/[0.07] py-10">
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan-200/70">
              Algebra I path
            </div>
            <nav
              aria-label="Current Algebra I course path"
              className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4"
            >
              {activePath.map((item, index) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group rounded-[20px] border border-white/[0.08] bg-[#0b1725]/58 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] backdrop-blur-xl transition-colors hover:border-cyan-200/16 hover:bg-[#0d1b2b]/70"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                      {String(index + 1).padStart(2, "0")} · {item.label}
                    </span>
                    <ArrowRight
                      size={13}
                      className="text-slate-600 transition-transform group-hover:translate-x-1 group-hover:text-cyan-200"
                    />
                  </div>
                  <div className="mt-3 text-[15px] font-semibold text-slate-200">
                    {item.title}
                  </div>
                </Link>
              ))}
            </nav>
          </section>
        ) : null}
      </div>
    </main>
  );
}
