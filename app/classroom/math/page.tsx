import DomainPageHeader from "@/app/_components/DomainPageHeader";
import ClassroomRouteList from "@/app/classroom/_components/ClassroomRouteList";
import { getClassroomSubjectPresentation } from "@/app/classroom/_components/classroom-subjects";
import { getCourseNavigation, getCourseSubject } from "@/lib/courses/catalog";

function requireMathSubject() {
  const subject = getCourseSubject("math");
  if (!subject) throw new Error("The classroom Math subject is missing.");
  return subject;
}

const subject = requireMathSubject();
const presentation = getClassroomSubjectPresentation("math");

export default function MathClassroomPage() {
  const courses = getCourseNavigation("math").map((course, index) => ({
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

        <section className="mt-5" aria-labelledby="math-course-map-title">
          <div className="mb-4 flex items-center gap-3">
            <span className={`h-px w-10 ${presentation.line}`} />
            <h2
              id="math-course-map-title"
              className={`text-[12px] font-semibold uppercase tracking-[0.14em] ${presentation.accentText}`}
            >
              Course map
            </h2>
          </div>
          <ClassroomRouteList
            items={courses}
            subjectTone="math"
            ariaLabel="Math courses"
          />
        </section>
      </div>
    </main>
  );
}
