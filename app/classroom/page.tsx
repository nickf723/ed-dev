import Link from "next/link";
import { ArrowRight, School } from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { getClassroomSubjectPresentation } from "@/app/classroom/_components/classroom-subjects";
import { COURSE_SUBJECTS, getCourseNavigation } from "@/lib/courses/catalog";

export default function ClassroomPage() {
  return (
    <main className="min-h-[calc(100vh-3.5rem)]">
      <div className="mx-auto w-full max-w-[1380px] px-4 py-5 sm:px-6 lg:px-8">
        <DomainPageHeader
          breadcrumbs={[{ label: "Classroom" }]}
          eyebrow="Education Station"
          icon={School}
          title={<span>High School</span>}
          subtitle="Math, science, social studies, and English."
          accentRgb="226, 232, 240"
          titleClassName="font-mono text-[clamp(2.7rem,5.8vw,5.8rem)] font-semibold uppercase leading-[0.88] tracking-[-0.06em] text-[#f4fff9]"
          metadataTextClassName="text-[11px]"
          iconClassName="rounded-[16px]"
          headerClassName="border-white/[0.12]"
        />

        <section className="mt-5" aria-labelledby="classroom-subjects-title">
          <h2 id="classroom-subjects-title" className="sr-only">
            Subjects and courses
          </h2>
          <div className="space-y-3">
            {COURSE_SUBJECTS.map((subject) => {
              const presentation = getClassroomSubjectPresentation(subject.id);
              const courses = getCourseNavigation(subject.slug);
              const Icon = presentation.Icon;

              return (
                <article
                  key={subject.id}
                  className={`relative overflow-hidden rounded-[26px] border p-5 backdrop-blur-2xl sm:p-6 ${presentation.border} ${presentation.surface}`}
                >
                  <div className={`absolute bottom-0 left-0 top-0 w-1 ${presentation.line}`} />
                  <div className="grid gap-5 lg:grid-cols-[260px_minmax(0,1fr)_auto] lg:items-center">
                    <div className="flex items-center gap-4">
                      <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${presentation.marker}`}>
                        <Icon size={21} />
                      </span>
                      <div>
                        <h2 className="text-[24px] font-semibold tracking-[-0.035em] text-stone-100">
                          {subject.title}
                        </h2>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2" aria-label={`${subject.title} courses`}>
                      {courses.map((course) => (
                        <span
                          key={course.id}
                          className={`rounded-full border px-3 py-2 text-[12px] font-semibold ${
                            course.status === "active"
                              ? `${presentation.border} ${presentation.accentText} bg-black/[0.13]`
                              : "border-white/[0.07] bg-black/[0.10] text-stone-500"
                          }`}
                        >
                          {course.shortTitle}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={subject.href}
                      aria-label={`Open ${subject.title} courses`}
                      className={`inline-flex h-11 items-center justify-center gap-2 rounded-full border px-4 text-[12px] font-semibold transition-colors hover:bg-white/[0.045] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-4 focus-visible:ring-offset-[#031912] ${presentation.border} ${presentation.accentText}`}
                    >
                      Courses
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
