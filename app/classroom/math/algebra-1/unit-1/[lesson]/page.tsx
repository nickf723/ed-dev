import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AlgebraicPropertiesLessonExperience from "@/app/formal-science/mathematics/algebra/elementary-algebra/fundamentals/_components/AlgebraicPropertiesLessonExperience";
import EquationLessonExperience from "@/app/formal-science/mathematics/algebra/elementary-algebra/fundamentals/_components/EquationLessonExperience";
import ExpressionsVariablesLessonExperience from "@/app/formal-science/mathematics/algebra/elementary-algebra/fundamentals/_components/ExpressionsVariablesLessonExperience";
import NumberSystemsLessonExperience from "@/app/formal-science/mathematics/algebra/elementary-algebra/fundamentals/_components/NumberSystemsLessonExperience";
import VariablesChangingQuantitiesLessonExperience from "@/app/formal-science/mathematics/algebra/elementary-algebra/fundamentals/_components/VariablesChangingQuantitiesLessonExperience";
import {
  getCourse,
  getCourseLesson,
  getCourseUnit,
} from "@/lib/courses/catalog";

type PageProps = {
  params: Promise<{ lesson: string }>;
};

function requireUnitContext() {
  const course = getCourse("math", "algebra-1");
  const unit = getCourseUnit("math", "algebra-1", "unit-1");
  if (!course || !unit) {
    throw new Error("The classroom Algebra I Unit 1 catalog is missing.");
  }
  return { course, unit };
}

const { course, unit } = requireUnitContext();

export function generateStaticParams() {
  return unit.lessons.map((lesson) => ({ lesson: lesson.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lesson: lessonSlug } = await params;
  const lesson = getCourseLesson("math", "algebra-1", "unit-1", lessonSlug);
  if (!lesson) return {};

  return {
    title: `${lesson.title} · Algebra I Unit 1`,
    description: lesson.outcome,
  };
}

export default async function ClassroomLessonPage({ params }: PageProps) {
  const { lesson: lessonSlug } = await params;
  const lesson = getCourseLesson("math", "algebra-1", "unit-1", lessonSlug);
  if (!lesson) notFound();

  const lessonIndex = unit.lessons.findIndex((item) => item.id === lesson.id);
  const previousLesson = lessonIndex > 0 ? unit.lessons[lessonIndex - 1] : undefined;
  const nextLesson = lessonIndex < unit.lessons.length - 1 ? unit.lessons[lessonIndex + 1] : undefined;
  const previous = previousLesson
    ? { label: previousLesson.title, href: previousLesson.href }
    : undefined;
  const next = nextLesson
    ? { label: nextLesson.title, href: nextLesson.href }
    : undefined;
  const breadcrumbs = [
    { label: "Classroom", href: "/classroom" },
    { label: "Math", href: "/classroom/math" },
    { label: course.shortTitle, href: course.href },
    { label: `Unit ${unit.number}`, href: unit.href },
    { label: lesson.title },
  ] as const;

  if (lesson.slug === "variables-changing-quantities") {
    return (
      <VariablesChangingQuantitiesLessonExperience
        breadcrumbs={breadcrumbs}
        previous={previous}
        next={next}
        unitHref={unit.href}
        showVocabulary={false}
      />
    );
  }

  if (lesson.slug === "expressions-variables") {
    return (
      <ExpressionsVariablesLessonExperience
        breadcrumbs={breadcrumbs}
        previous={previous}
        next={next}
        unitHref={unit.href}
        showVocabulary={false}
      />
    );
  }

  if (lesson.slug === "one-step-equations" || lesson.slug === "two-step-equations") {
    return (
      <EquationLessonExperience
        lesson={lesson.slug}
        breadcrumbs={breadcrumbs}
        previous={previous}
        next={next}
        unitHref={unit.href}
        showVocabulary={false}
      />
    );
  }

  if (lesson.slug === "algebraic-properties") {
    return (
      <AlgebraicPropertiesLessonExperience
        breadcrumbs={breadcrumbs}
        previous={previous}
        next={next}
        unitHref={unit.href}
        showVocabulary={false}
      />
    );
  }

  if (lesson.slug === "number-systems") {
    return (
      <NumberSystemsLessonExperience
        breadcrumbs={breadcrumbs}
        previous={previous}
        next={next}
        unitHref={unit.href}
        showVocabulary={false}
      />
    );
  }

  notFound();
}
