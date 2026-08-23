import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EvidenceInferenceLesson from "@/app/classroom/_components/lessons/EvidenceInferenceLesson";
import ElementsOfLifeLesson from "@/app/classroom/_components/lessons/ElementsOfLifeLesson";
import NarratorPerspectiveLesson from "@/app/classroom/_components/lessons/NarratorPerspectiveLesson";
import OttomanMughalLesson from "@/app/classroom/_components/lessons/OttomanMughalLesson";
import PolymerReactionsLesson from "@/app/classroom/_components/lessons/PolymerReactionsLesson";
import TokugawaBourbonLesson from "@/app/classroom/_components/lessons/TokugawaBourbonLesson";
import WaterHydrogenBondingLesson from "@/app/classroom/_components/lessons/WaterHydrogenBondingLesson";
import WorldIn1750Lesson from "@/app/classroom/_components/lessons/WorldIn1750Lesson";
import {
  COURSE_SUBJECTS,
  getCourse,
  getCourseLesson,
  getCourseUnit,
} from "@/lib/courses/catalog";

type PageProps = {
  params: Promise<{
    subject: string;
    course: string;
    unit: string;
    lesson: string;
  }>;
};

const ACTIVE_SHARED_LESSONS = COURSE_SUBJECTS.flatMap((subject) =>
  subject.id === "math"
    ? []
    : subject.courses.flatMap((course) =>
        course.units.flatMap((unit) =>
          unit.lessons
            .filter((lesson) => lesson.status === "active")
            .map((lesson) => ({
              subject: subject.slug,
              course: course.slug,
              unit: unit.slug,
              lesson: lesson.slug,
            }))
        )
      )
);

export const dynamicParams = false;

export function generateStaticParams() {
  return ACTIVE_SHARED_LESSONS;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const {
    subject: subjectSlug,
    course: courseSlug,
    unit: unitSlug,
    lesson: lessonSlug,
  } = await params;
  const course = getCourse(subjectSlug, courseSlug);
  const lesson = getCourseLesson(subjectSlug, courseSlug, unitSlug, lessonSlug);
  if (!course || !lesson || lesson.status !== "active") return {};

  return {
    title: `${lesson.title} · ${course.shortTitle}`,
    description: lesson.outcome,
  };
}

export default async function ClassroomLessonPage({ params }: PageProps) {
  const {
    subject: subjectSlug,
    course: courseSlug,
    unit: unitSlug,
    lesson: lessonSlug,
  } = await params;
  const subject = COURSE_SUBJECTS.find((item) => item.slug === subjectSlug);
  const course = getCourse(subjectSlug, courseSlug);
  const unit = getCourseUnit(subjectSlug, courseSlug, unitSlug);
  const lesson = getCourseLesson(subjectSlug, courseSlug, unitSlug, lessonSlug);
  if (
    !subject ||
    !course ||
    !unit ||
    !lesson ||
    subjectSlug === "math" ||
    lesson.status !== "active"
  ) {
    notFound();
  }

  const lessonIndex = unit.lessons.findIndex((item) => item.id === lesson.id);
  const previousLesson = unit.lessons
    .slice(0, lessonIndex)
    .reverse()
    .find((item) => item.status === "active");
  const nextLesson = unit.lessons
    .slice(lessonIndex + 1)
    .find((item) => item.status === "active");
  const navigation = {
    previous: previousLesson
      ? { label: previousLesson.title, href: previousLesson.href }
      : undefined,
    next: nextLesson
      ? { label: nextLesson.title, href: nextLesson.href }
      : undefined,
    unitHref: unit.href,
  };
  const breadcrumbs = [
    { label: "Classroom", href: "/classroom" },
    { label: subject.title, href: subject.href },
    { label: course.shortTitle, href: course.href },
    { label: `Unit ${unit.number}`, href: unit.href },
    { label: lesson.title },
  ] as const;

  if (lesson.id === "ap-biology.unit-1.water-hydrogen-bonding") {
    return (
      <WaterHydrogenBondingLesson breadcrumbs={breadcrumbs} {...navigation} />
    );
  }

  if (lesson.id === "ap-biology.unit-1.elements-of-life") {
    return <ElementsOfLifeLesson breadcrumbs={breadcrumbs} {...navigation} />;
  }

  if (lesson.id === "ap-biology.unit-1.building-breaking-polymers") {
    return <PolymerReactionsLesson breadcrumbs={breadcrumbs} {...navigation} />;
  }

  if (lesson.id === "nys.global-2.unit-1.world-in-1750") {
    return <WorldIn1750Lesson breadcrumbs={breadcrumbs} {...navigation} />;
  }

  if (lesson.id === "nys.global-2.unit-1.ottoman-mughal") {
    return <OttomanMughalLesson breadcrumbs={breadcrumbs} {...navigation} />;
  }

  if (lesson.id === "nys.global-2.unit-1.tokugawa-bourbon") {
    return <TokugawaBourbonLesson breadcrumbs={breadcrumbs} {...navigation} />;
  }

  if (lesson.id === "nys.literature.unit-1.evidence-inference") {
    return (
      <EvidenceInferenceLesson breadcrumbs={breadcrumbs} {...navigation} />
    );
  }

  if (lesson.id === "nys.literature.unit-1.narrator-perspective") {
    return (
      <NarratorPerspectiveLesson breadcrumbs={breadcrumbs} {...navigation} />
    );
  }

  notFound();
}
