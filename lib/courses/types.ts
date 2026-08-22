export type CourseStatus = "active" | "planned";

export type PlannedCourse = {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
};

export type PlannedCourseUnit = {
  id: string;
  slug: string;
  number: number;
  title: string;
  summary: string;
};

export type StandardAlignment = {
  code: string;
  emphasis: "primary" | "supporting";
  note: string;
};

export type StandardDefinition = {
  code: string;
  label: string;
  summary: string;
  sourcePage: number;
};

export type StandardsFramework = {
  id: string;
  label: string;
  issuer: string;
  sourceUrl: string;
  courseSourceUrl: string;
  assessmentNote: string;
  independenceNote: string;
  standards: readonly StandardDefinition[];
};

export type CourseLesson = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  outcome: string;
  durationMinutes: number;
  status: CourseStatus;
  href: string;
  knowledgeNodeId: string;
  alignment: readonly StandardAlignment[];
  teacher: {
    warmUp: string;
    misconception: string;
    exitTicket: string;
  };
};

export type CourseUnit = {
  id: string;
  slug: string;
  number: number;
  title: string;
  summary: string;
  essentialQuestion: string;
  status: CourseStatus;
  href: string;
  pacing: string;
  prerequisites: readonly string[];
  lessons: readonly CourseLesson[];
  teacherGuide: {
    openingRoutine: string;
    evidencePlan: readonly string[];
    differentiation: readonly string[];
  };
};

export type Course = {
  id: string;
  slug: string;
  subjectId: string;
  title: string;
  shortTitle: string;
  description: string;
  gradeBand: string;
  status: CourseStatus;
  href: string;
  framework: StandardsFramework;
  units: readonly CourseUnit[];
  plannedUnits: readonly PlannedCourseUnit[];
};

export type CourseSubject = {
  id: string;
  slug: string;
  title: string;
  description: string;
  status: CourseStatus;
  href: string;
  courses: readonly Course[];
  plannedCourses: readonly PlannedCourse[];
};
