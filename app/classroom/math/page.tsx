import DomainPageHeader from "@/app/_components/DomainPageHeader";
import ClassroomCourseMap from "@/app/classroom/_components/ClassroomCourseMap";
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
  const courses = getCourseNavigation("math");

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
          titleClassName={presentation.titleClassName}
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
              {presentation.courseMapLabel}
            </h2>
          </div>
          <ClassroomCourseMap items={courses} subjectTone="math" />
        </section>
      </div>
    </main>
  );
}
