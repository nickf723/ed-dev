import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  BookOpenCheck,
  Microscope,
  Route,
  type LucideIcon,
} from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import ClassroomLessonMap from "@/app/classroom/_components/ClassroomLessonMap";
import type { ClassroomRouteAccent } from "@/app/classroom/_components/classroom-accents";
import {
  getClassroomSubjectPresentation,
  type ClassroomSubjectTone,
} from "@/app/classroom/_components/classroom-subjects";
import {
  COURSE_SUBJECTS,
  getCourse,
  getCourseUnit,
} from "@/lib/courses/catalog";

type PageProps = {
  params: Promise<{ subject: string; course: string; unit: string }>;
};

const SHARED_UNITS = COURSE_SUBJECTS.flatMap((subject) =>
  subject.id === "math"
    ? []
    : subject.courses.flatMap((course) =>
        course.units.map((unit) => ({
          subject: subject.slug,
          course: course.slug,
          unit: unit.slug,
        }))
      )
);

const UNIT_ICONS: Record<ClassroomSubjectTone, LucideIcon> = {
  math: Route,
  science: Microscope,
  "social-studies": Route,
  english: BookOpenCheck,
};

const LESSON_ACCENTS: Record<
  ClassroomSubjectTone,
  readonly ClassroomRouteAccent[]
> = {
  math: ["red"],
  science: ["green", "cyan", "yellow", "violet", "blue", "pink", "orange"],
  "social-studies": ["blue", "cyan", "violet", "orange", "red"],
  english: ["yellow", "orange", "pink", "violet", "blue", "cyan"],
};

export const dynamicParams = false;

export function generateStaticParams() {
  return SHARED_UNITS;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const {
    subject: subjectSlug,
    course: courseSlug,
    unit: unitSlug,
  } = await params;
  const course = getCourse(subjectSlug, courseSlug);
  const unit = getCourseUnit(subjectSlug, courseSlug, unitSlug);
  if (!course || !unit || subjectSlug === "math") return {};

  return {
    title: `${unit.title} · ${course.shortTitle}`,
    description: unit.summary,
  };
}

export default async function ClassroomUnitPage({ params }: PageProps) {
  const {
    subject: subjectSlug,
    course: courseSlug,
    unit: unitSlug,
  } = await params;
  const subject = COURSE_SUBJECTS.find((item) => item.slug === subjectSlug);
  const course = getCourse(subjectSlug, courseSlug);
  const unit = getCourseUnit(subjectSlug, courseSlug, unitSlug);
  if (!subject || !course || !unit || subjectSlug === "math") notFound();

  const tone = subject.id as ClassroomSubjectTone;
  const presentation = getClassroomSubjectPresentation(tone);
  const Icon = UNIT_ICONS[tone];
  const accents = LESSON_ACCENTS[tone];
  const lessons = unit.lessons.map((lesson, index) => ({
    id: lesson.id,
    slug: lesson.slug,
    label: String(index + 1).padStart(2, "0"),
    title: lesson.title,
    description: lesson.summary,
    status: lesson.status,
    href: lesson.href,
    accent: accents[index] ?? presentation.routeAccent,
  }));

  return (
    <main className="min-h-[calc(100vh-3.5rem)]">
      <div className="mx-auto w-full max-w-[1100px] px-4 py-5 sm:px-6">
        <DomainPageHeader
          breadcrumbs={[
            { label: "Classroom", href: "/classroom" },
            { label: subject.title, href: subject.href },
            { label: course.shortTitle, href: course.href },
            { label: `Unit ${unit.number}` },
          ]}
          eyebrow={`${course.shortTitle} · Unit ${unit.number}`}
          icon={Icon}
          title={<span>{unit.title}</span>}
          subtitle={unit.summary}
          accentRgb={presentation.accentRgb}
          titleClassName={presentation.titleClassName}
          metadataTextClassName="text-[11px]"
          iconClassName="rounded-[16px]"
          headerClassName="border-white/[0.12]"
        />

        <section
          className="mt-5"
          aria-labelledby={`${unit.slug}-lesson-map-title`}
        >
          <div className="mb-4 flex items-center gap-3">
            <span className={`h-px w-10 ${presentation.line}`} />
            <h2
              id={`${unit.slug}-lesson-map-title`}
              className={`text-[12px] font-semibold uppercase tracking-[0.14em] ${presentation.accentText}`}
            >
              Lesson line
            </h2>
          </div>
          <ClassroomLessonMap
            items={lessons}
            ariaLabel={`${unit.title} lessons`}
          />
        </section>
      </div>
    </main>
  );
}
