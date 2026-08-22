import { AP_BIOLOGY_COURSE } from "@/lib/courses/ap-biology";
import { NYS_ALGEBRA_I_COURSE } from "@/lib/courses/nys-algebra-1";
import { NYS_GLOBAL_II_COURSE } from "@/lib/courses/nys-global-history-2";
import { NYS_LITERATURE_COURSE } from "@/lib/courses/nys-literature";
import { curriculumRegistry } from "@/lib/curriculum/registry";
import type {
  Course,
  CourseLesson,
  CourseSubject,
  CourseUnit,
  PlannedCourse,
} from "@/lib/courses/types";

export type CourseNavigationItem = {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  status: "active" | "planned";
  href?: string;
};

export type UnitNavigationItem = {
  id: string;
  slug: string;
  number: number;
  title: string;
  summary: string;
  status: "active" | "planned";
  href?: string;
};

const MATH_COURSE_MAP: readonly PlannedCourse[] = [
  {
    id: "course.geometry",
    slug: "geometry",
    title: "Geometry",
    shortTitle: "Geometry",
    description: "Shape, proof, similarity, measurement, and coordinate relationships.",
  },
  {
    id: "course.algebra-2",
    slug: "algebra-2",
    title: "Algebra II",
    shortTitle: "Algebra II",
    description: "Polynomial, rational, exponential, logarithmic, and complex-number models.",
  },
  {
    id: "course.precalculus",
    slug: "precalculus",
    title: "Precalculus",
    shortTitle: "Precalculus",
    description: "Function families, trigonometry, sequences, and preparation for calculus.",
  },
  {
    id: "course.ap-statistics",
    slug: "ap-statistics",
    title: "AP Statistics",
    shortTitle: "AP Statistics",
    description: "Data, probability, sampling, inference, and statistical communication.",
  },
  {
    id: "course.ap-calculus-ab",
    slug: "ap-calculus-ab",
    title: "AP Calculus AB",
    shortTitle: "AP Calculus AB",
    description: "Limits, derivatives, integrals, accumulation, and differential equations.",
  },
];

const SCIENCE_COURSE_MAP: readonly PlannedCourse[] = [
  {
    id: "course.biology",
    slug: "biology",
    title: "Biology",
    shortTitle: "Biology",
    description: "Cells, inheritance, evolution, organisms, and ecosystems.",
  },
  {
    id: "course.chemistry",
    slug: "chemistry",
    title: "Chemistry",
    shortTitle: "Chemistry",
    description: "Matter, atomic structure, bonding, reactions, and energy.",
  },
  {
    id: "course.earth-space-science",
    slug: "earth-space-science",
    title: "Earth & Space Science",
    shortTitle: "Earth & Space",
    description: "Earth systems, weather, geology, astronomy, and changing environments.",
  },
  {
    id: "course.physics",
    slug: "physics",
    title: "Physics",
    shortTitle: "Physics",
    description: "Motion, forces, energy, waves, electricity, and models of matter.",
  },
  {
    id: "course.ap-chemistry",
    slug: "ap-chemistry",
    title: "AP Chemistry",
    shortTitle: "AP Chemistry",
    description: "Structure, properties, reactions, kinetics, equilibrium, and thermodynamics.",
  },
  {
    id: "course.ap-physics-1",
    slug: "ap-physics-1",
    title: "AP Physics 1",
    shortTitle: "AP Physics 1",
    description: "Algebra-based mechanics, energy, momentum, rotation, and oscillation.",
  },
];

const SOCIAL_STUDIES_COURSE_MAP: readonly PlannedCourse[] = [
  {
    id: "course.global-history-1",
    slug: "global-history-1",
    title: "Global History I",
    shortTitle: "Global I",
    description: "Early societies, belief systems, exchange, states, and global connections.",
  },
  {
    id: "course.us-history-government",
    slug: "us-history-government",
    title: "U.S. History & Government",
    shortTitle: "U.S. History",
    description: "Institutions, expansion, conflict, reform, rights, and public policy.",
  },
  {
    id: "course.economics",
    slug: "economics",
    title: "Economics",
    shortTitle: "Economics",
    description: "Choice, markets, institutions, public policy, and economic evidence.",
  },
  {
    id: "course.civics-government",
    slug: "civics-government",
    title: "Civics & Government",
    shortTitle: "Civics",
    description: "Power, participation, institutions, rights, and civic decision-making.",
  },
  {
    id: "course.ap-world-history-modern",
    slug: "ap-world-history-modern",
    title: "AP World History: Modern",
    shortTitle: "AP World History",
    description: "Global developments, comparison, causation, continuity, and source analysis.",
  },
  {
    id: "course.ap-us-history",
    slug: "ap-us-history",
    title: "AP United States History",
    shortTitle: "AP U.S. History",
    description: "U.S. history through primary sources, argument, context, and historical reasoning.",
  },
];

const ENGLISH_COURSE_MAP: readonly PlannedCourse[] = [
  {
    id: "course.english-9",
    slug: "english-9",
    title: "English 9",
    shortTitle: "English 9",
    description: "Close reading, evidence, narrative craft, discussion, and composition.",
  },
  {
    id: "course.english-10",
    slug: "english-10",
    title: "English 10",
    shortTitle: "English 10",
    description: "Literary analysis, rhetoric, research, revision, and language choices.",
  },
  {
    id: "course.english-11",
    slug: "english-11",
    title: "English 11",
    shortTitle: "English 11",
    description: "Argument, American texts, source synthesis, and sustained writing.",
  },
  {
    id: "course.ap-language",
    slug: "ap-language",
    title: "AP English Language",
    shortTitle: "AP Language",
    description: "Rhetorical analysis, argument, synthesis, style, and evidence.",
  },
  {
    id: "course.ap-literature",
    slug: "ap-literature",
    title: "AP English Literature",
    shortTitle: "AP Literature",
    description: "Close reading, literary interpretation, analytical writing, and comparison.",
  },
];

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
    plannedCourses: MATH_COURSE_MAP,
  },
  {
    id: "science",
    slug: "science",
    title: "Science",
    description:
      "Laboratory investigation, evidence, modeling, and scientific explanation organized by course.",
    status: "active",
    href: "/classroom/science",
    courses: [AP_BIOLOGY_COURSE],
    plannedCourses: SCIENCE_COURSE_MAP,
  },
  {
    id: "social-studies",
    slug: "social-studies",
    title: "Social Studies",
    description:
      "Sources, chronology, geography, historical claims, and civic evidence organized by course.",
    status: "active",
    href: "/classroom/social-studies",
    courses: [NYS_GLOBAL_II_COURSE],
    plannedCourses: SOCIAL_STUDIES_COURSE_MAP,
  },
  {
    id: "english",
    slug: "english",
    title: "English",
    description:
      "Close reading, composition, speaking, language, and text-based reasoning organized by course.",
    status: "active",
    href: "/classroom/english",
    courses: [NYS_LITERATURE_COURSE],
    plannedCourses: ENGLISH_COURSE_MAP,
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

export function getCourseNavigation(subjectSlug: string): readonly CourseNavigationItem[] {
  const subject = getCourseSubject(subjectSlug);
  if (!subject) return [];

  return [
    ...subject.courses.map((course) => ({
      id: course.id,
      slug: course.slug,
      title: course.title,
      shortTitle: course.shortTitle,
      description: course.description,
      status: course.status,
      href: course.href,
    })),
    ...subject.plannedCourses.map((course) => ({
      ...course,
      status: "planned" as const,
    })),
  ];
}

export function getUnitNavigation(
  subjectSlug: string,
  courseSlug: string,
): readonly UnitNavigationItem[] {
  const course = getCourse(subjectSlug, courseSlug);
  if (!course) return [];

  return [
    ...course.units.map((unit) => ({
      id: unit.id,
      slug: unit.slug,
      number: unit.number,
      title: unit.title,
      summary: unit.summary,
      status: unit.status,
      href: unit.href,
    })),
    ...course.plannedUnits.map((unit) => ({
      ...unit,
      status: "planned" as const,
    })),
  ];
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

      for (const unit of course.plannedUnits) {
        claimId(unit.id);
      }
    }

    for (const course of subject.plannedCourses) {
      claimId(course.id);
    }
  }
}

validateCourseCatalog();
