import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookOpenText, Dna, Globe2, type LucideIcon } from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import ClassroomRouteList from "@/app/classroom/_components/ClassroomRouteList";
import type { ClassroomRouteAccent } from "@/app/classroom/_components/classroom-accents";
import {
  getClassroomSubjectPresentation,
  type ClassroomSubjectTone,
} from "@/app/classroom/_components/classroom-subjects";
import {
  COURSE_SUBJECTS,
  getCourse,
  getUnitNavigation,
} from "@/lib/courses/catalog";

type PageProps = {
  params: Promise<{ subject: string; course: string }>;
};

const SHARED_COURSES = COURSE_SUBJECTS.flatMap((subject) =>
  subject.id === "math"
    ? []
    : subject.courses.map((course) => ({
        subject: subject.slug,
        course: course.slug,
      }))
);

const COURSE_ICONS: Record<string, LucideIcon> = {
  "ap-biology": Dna,
  "global-history-2": Globe2,
  literature: BookOpenText,
};

const UNIT_ACCENTS: Record<
  ClassroomSubjectTone,
  readonly ClassroomRouteAccent[]
> = {
  math: ["red"],
  science: [
    "green",
    "cyan",
    "yellow",
    "violet",
    "blue",
    "pink",
    "orange",
    "red",
  ],
  "social-studies": [
    "blue",
    "cyan",
    "violet",
    "red",
    "orange",
    "yellow",
    "green",
  ],
  english: ["yellow", "orange", "pink", "violet", "blue", "cyan"],
};

export const dynamicParams = false;

export function generateStaticParams() {
  return SHARED_COURSES;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { subject: subjectSlug, course: courseSlug } = await params;
  const course = getCourse(subjectSlug, courseSlug);
  if (!course || subjectSlug === "math") return {};

  return {
    title: `${course.shortTitle} Course`,
    description: course.description,
  };
}

export default async function ClassroomCoursePage({ params }: PageProps) {
  const { subject: subjectSlug, course: courseSlug } = await params;
  const course = getCourse(subjectSlug, courseSlug);
  const subject = COURSE_SUBJECTS.find((item) => item.slug === subjectSlug);
  if (!course || !subject || subjectSlug === "math") notFound();

  const tone = subject.id as ClassroomSubjectTone;
  const presentation = getClassroomSubjectPresentation(tone);
  const Icon = COURSE_ICONS[course.slug] ?? presentation.Icon;
  const accents = UNIT_ACCENTS[tone];
  const units = getUnitNavigation(subjectSlug, courseSlug).map(
    (unit, index) => ({
      id: unit.id,
      label: String(unit.number).padStart(2, "0"),
      title: unit.title,
      description: unit.summary,
      status: unit.status,
      href: unit.href,
      accent: accents[index] ?? presentation.routeAccent,
    })
  );

  return (
    <main className="min-h-[calc(100vh-3.5rem)]">
      <div className="mx-auto w-full max-w-[1100px] px-4 py-5 sm:px-6">
        <DomainPageHeader
          breadcrumbs={[
            { label: "Classroom", href: "/classroom" },
            { label: subject.title, href: subject.href },
            { label: course.shortTitle },
          ]}
          eyebrow={`${subject.title} · Course`}
          icon={Icon}
          title={<span>{course.shortTitle}</span>}
          subtitle={course.description}
          accentRgb={presentation.accentRgb}
          titleClassName={presentation.titleClassName}
          metadataTextClassName="text-[11px]"
          iconClassName="rounded-[16px]"
          headerClassName="border-white/[0.12]"
        />

        <section
          className="mt-5"
          aria-labelledby={`${course.slug}-unit-map-title`}
        >
          <div className="mb-4 flex items-center gap-3">
            <span className={`h-px w-10 ${presentation.line}`} />
            <h2
              id={`${course.slug}-unit-map-title`}
              className={`text-[12px] font-semibold uppercase tracking-[0.14em] ${presentation.accentText}`}
            >
              Unit map
            </h2>
          </div>
          <ClassroomRouteList
            items={units}
            subjectTone={tone}
            ariaLabel={`${course.shortTitle} units`}
          />
        </section>
      </div>
    </main>
  );
}
