import { FunctionSquare } from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import ClassroomRouteList from "@/app/classroom/_components/ClassroomRouteList";
import { getClassroomSubjectPresentation } from "@/app/classroom/_components/classroom-subjects";
import { getCourse, getUnitNavigation } from "@/lib/courses/catalog";
import type { ClassroomRouteAccent } from "@/app/classroom/_components/classroom-accents";

function requireAlgebraOneCourse() {
  const course = getCourse("math", "algebra-1");
  if (!course) throw new Error("The classroom Algebra I course is missing.");
  return course;
}

const course = requireAlgebraOneCourse();
const presentation = getClassroomSubjectPresentation("math");
const UNIT_ACCENTS: readonly ClassroomRouteAccent[] = [
  "red",
  "orange",
  "yellow",
  "green",
  "cyan",
  "violet",
  "pink",
];

export default function AlgebraOneCoursePage() {
  const units = getUnitNavigation("math", "algebra-1").map((unit, index) => ({
    id: unit.id,
    label: String(unit.number).padStart(2, "0"),
    title: unit.title,
    description: unit.summary,
    status: unit.status,
    href: unit.href,
    accent: UNIT_ACCENTS[index] ?? "red",
  }));

  return (
    <main className="min-h-[calc(100vh-3.5rem)]">
      <div className="mx-auto w-full max-w-[1240px] px-4 py-5 sm:px-6 lg:px-8">
        <DomainPageHeader
          breadcrumbs={[
            { label: "Classroom", href: "/classroom" },
            { label: "Math", href: "/classroom/math" },
            { label: course.shortTitle },
          ]}
          eyebrow="Math · Course"
          icon={FunctionSquare}
          title={<span>{course.shortTitle}</span>}
          subtitle={course.description}
          accentRgb={presentation.accentRgb}
          titleClassName="font-mono text-[clamp(2.7rem,5.8vw,5.8rem)] font-semibold uppercase leading-[0.88] tracking-[-0.06em] text-[#f4fff9]"
          metadataTextClassName="text-[11px]"
          iconClassName="rounded-[16px]"
          headerClassName="border-white/[0.12]"
        />

        <section className="mt-5" aria-labelledby="algebra-unit-map-title">
          <div className="mb-4 flex items-center gap-3">
            <span className={`h-px w-10 ${presentation.line}`} />
            <h2
              id="algebra-unit-map-title"
              className={`text-[12px] font-semibold uppercase tracking-[0.14em] ${presentation.accentText}`}
            >
              Unit map
            </h2>
          </div>
          <ClassroomRouteList
            items={units}
            subjectTone="math"
            ariaLabel="Algebra I units"
          />
        </section>
      </div>
    </main>
  );
}
