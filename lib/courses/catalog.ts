import { NYS_ALGEBRA_I_COURSE } from "@/lib/courses/nys-algebra-1";
import { curriculumRegistry } from "@/lib/curriculum/registry";
import type {
  Course,
  CourseLesson,
  CourseSubject,
  CourseUnit,
} from "@/lib/courses/types";

export const COURSE_SUBJECTS: readonly CourseSubject[] = [
  {
    id: "math",
    slug: "math",
    title: "Math",
    description:
      "Expressions, equations, functions, statistics, and mathematical modeling organized by course.",
    status: "active",
    href: "/classroom/math",
    courses: [NYS_ALGEBRA_I_COURSE],
  },
  {
    id: "science",
    slug: "science",
    title: "Science",
    description:
      "Laboratory investigation, evidence, modeling, and scientific explanation organized by course.",
    status: "planned",
    href: "/classroom/science",
    courses: [],
  },
  {
    id: "social-studies",
    slug: "social-studies",
    title: "Social Studies",
    description:
      "Sources, chronology, geography, historical claims, and civic evidence organized by course.",
    status: "planned",
    href: "/classroom/social-studies",
    courses: [],
  },
  {
    id: "english",
    slug: "english",
    title: "English",
    description:
      "Close reading, composition, speaking, language, and text-based reasoning organized by course.",
    status: "planned",
    href: "/classroom/english",
    courses: [],
  },
] as const;

export function getCourseSubject(slug: string): CourseSubject | undefined {
  return COURSE_SUBJECTS.find((subject) => subject.slug === slug);
}

export function getCourse(subjectSlug: string, courseSlug: string): Course | undefined {
  return getCourseSubject(subjectSlug)?.courses.find(
    (course) => course.slug === courseSlug,
  );
}

export function getCourseUnit(
  subjectSlug: string,
  courseSlug: string,
  unitSlug: string,
): CourseUnit | undefined {
  return getCourse(subjectSlug, courseSlug)?.units.find(
    (unit) => unit.slug === unitSlug,
  );
}

export function getCourseLesson(
  subjectSlug: string,
  courseSlug: string,
  unitSlug: string,
  lessonSlug: string,
): CourseLesson | undefined {
  return getCourseUnit(subjectSlug, courseSlug, unitSlug)?.lessons.find(
    (lesson) => lesson.slug === lessonSlug,
  );
}

export function validateCourseCatalog(): void {
  const ids = new Set<string>();
  const activeHrefs = new Set<string>();

  function claimId(id: string) {
    if (ids.has(id)) throw new Error(`Duplicate course catalog ID: ${id}`);
    ids.add(id);
  }

  function claimActiveHref(href: string) {
    if (activeHrefs.has(href)) {
      throw new Error(`Duplicate active course route: ${href}`);
    }
    activeHrefs.add(href);
  }

  for (const subject of COURSE_SUBJECTS) {
    claimId(subject.id);
    if (subject.status === "active") claimActiveHref(subject.href);

    for (const course of subject.courses) {
      claimId(course.id);
      if (course.subjectId !== subject.id) {
        throw new Error(`${course.id} points to unknown subject ${course.subjectId}`);
      }
      if (course.status === "active") claimActiveHref(course.href);

      const standardCodes = new Set(
        course.framework.standards.map((standard) => standard.code),
      );

      for (const unit of course.units) {
        claimId(unit.id);
        if (unit.status === "active") claimActiveHref(unit.href);

        for (const lesson of unit.lessons) {
          claimId(lesson.id);
          if (lesson.status === "active") claimActiveHref(lesson.href);
          if (!curriculumRegistry.getNode(lesson.knowledgeNodeId)) {
            throw new Error(
              `${lesson.id} references unknown knowledge node ${lesson.knowledgeNodeId}`,
            );
          }
          if (!lesson.alignment.some((alignment) => alignment.emphasis === "primary")) {
            throw new Error(`${lesson.id} has no primary standards alignment`);
          }
          for (const alignment of lesson.alignment) {
            if (!standardCodes.has(alignment.code)) {
              throw new Error(
                `${lesson.id} references unknown standard ${alignment.code}`,
              );
            }
          }
        }
      }
    }
  }
}

validateCourseCatalog();
