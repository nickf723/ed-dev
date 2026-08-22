import { Route } from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import ClassroomRouteList from "@/app/classroom/_components/ClassroomRouteList";
import { getClassroomSubjectPresentation } from "@/app/classroom/_components/classroom-subjects";
import { getCourse, getCourseUnit } from "@/lib/courses/catalog";

function requireUnitContext() {
  const course = getCourse("math", "algebra-1");
  const unit = getCourseUnit("math", "algebra-1", "unit-1");
  if (!course || !unit) {
    throw new Error("The classroom Algebra I Unit 1 catalog is missing.");
  }
  return { course, unit };
}

const { course, unit } = requireUnitContext();
const presentation = getClassroomSubjectPresentation("math");

export default function AlgebraOneUnitOnePage() {
  const lessons = unit.lessons.map((lesson, index) => ({
    id: lesson.id,
    label: String(index + 1).padStart(2, "0"),
    title: lesson.title,
    description: lesson.summary,
    status: lesson.status,
    href: lesson.href,
  }));

  return (
    <main className="min-h-[calc(100vh-3.5rem)]">
      <div className="mx-auto w-full max-w-[1240px] px-4 py-5 sm:px-6 lg:px-8">
        <DomainPageHeader
          breadcrumbs={[
            { label: "Classroom", href: "/classroom" },
            { label: "Math", href: "/classroom/math" },
            { label: course.shortTitle, href: course.href },
            { label: `Unit ${unit.number}` },
          ]}
          eyebrow={`${course.shortTitle} · Unit ${unit.number}`}
          icon={Route}
          title={<span>{unit.title}</span>}
          subtitle={unit.summary}
          accentRgb={presentation.accentRgb}
          titleClassName="font-mono text-[clamp(2.5rem,5.4vw,5.2rem)] font-semibold uppercase leading-[0.9] tracking-[-0.06em] text-[#f4fff9]"
          metadataTextClassName="text-[11px]"
          iconClassName="rounded-[16px]"
          headerClassName="border-white/[0.12]"
        />

        <section className="mt-5" aria-labelledby="unit-lesson-route-title">
          <div className="mb-4 flex items-center gap-3">
            <span className={`h-px w-10 ${presentation.line}`} />
            <h2
              id="unit-lesson-route-title"
              className={`text-[12px] font-semibold uppercase tracking-[0.14em] ${presentation.accentText}`}
            >
              Lesson line
            </h2>
          </div>
          <ClassroomRouteList
            items={lessons}
            subjectTone="math"
            ariaLabel="Foundations of Algebra lessons"
          />
        </section>
      </div>
    </main>
  );
}
