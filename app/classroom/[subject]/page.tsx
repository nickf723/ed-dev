import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import ClassroomRouteList from "@/app/classroom/_components/ClassroomRouteList";
import {
  getClassroomSubjectPresentation,
  type ClassroomSubjectTone,
} from "@/app/classroom/_components/classroom-subjects";
import {
  COURSE_SUBJECTS,
  getCourseNavigation,
  getCourseSubject,
} from "@/lib/courses/catalog";

const SHARED_SUBJECT_SLUGS = COURSE_SUBJECTS
  .filter((subject) => subject.slug !== "math")
  .map((subject) => subject.slug);

export const dynamicParams = false;

export function generateStaticParams() {
  return SHARED_SUBJECT_SLUGS.map((subject) => ({ subject }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string }>;
}): Promise<Metadata> {
  const { subject: subjectSlug } = await params;
  const subject = getCourseSubject(subjectSlug);
  if (!subject || subject.slug === "math") return {};

  return {
    title: `${subject.title} Courses`,
    description: subject.description,
  };
}

export default async function ClassroomSubjectPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject: subjectSlug } = await params;
  const subject = getCourseSubject(subjectSlug);
  if (!subject || subject.slug === "math") notFound();

  const tone = subject.id as ClassroomSubjectTone;
  const presentation = getClassroomSubjectPresentation(tone);
  const courses = getCourseNavigation(subject.slug).map((course, index) => ({
    id: course.id,
    label: String(index + 1).padStart(2, "0"),
    title: course.shortTitle,
    description: course.description,
    status: course.status,
    href: course.href,
  }));

  return (
    <main className="min-h-[calc(100vh-3.5rem)]">
      <div className="mx-auto w-full max-w-[1240px] px-4 py-5 sm:px-6 lg:px-8">
        <DomainPageHeader
          breadcrumbs={[
            { label: "Classroom", href: "/classroom" },
            { label: subject.title },
          ]}
          eyebrow="Subject"
          icon={presentation.Icon}
          title={<span>{subject.title}</span>}
          subtitle={subject.description}
          accentRgb={presentation.accentRgb}
          titleClassName="font-mono text-[clamp(2.7rem,5.8vw,5.8rem)] font-semibold uppercase leading-[0.88] tracking-[-0.06em] text-[#f4fff9]"
          metadataTextClassName="text-[11px]"
          iconClassName="rounded-[16px]"
          headerClassName="border-white/[0.12]"
        />

        <section className="mt-5" aria-labelledby={`${subject.slug}-course-map-title`}>
          <div className="mb-4 flex items-center gap-3">
            <span className={`h-px w-10 ${presentation.line}`} />
            <h2
              id={`${subject.slug}-course-map-title`}
              className={`text-[12px] font-semibold uppercase tracking-[0.14em] ${presentation.accentText}`}
            >
              Course map
            </h2>
          </div>
          <ClassroomRouteList
            items={courses}
            subjectTone={tone}
            ariaLabel={`${subject.title} courses`}
          />
        </section>
      </div>
    </main>
  );
}
