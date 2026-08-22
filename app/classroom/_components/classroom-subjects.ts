import {
  BookMarked,
  FlaskConical,
  Landmark,
  Sigma,
  type LucideIcon,
} from "lucide-react";

export type ClassroomSubjectTone = "math" | "science" | "social-studies" | "english";

export type ClassroomSubjectPresentation = {
  Icon: LucideIcon;
  routeAccent: "red" | "green" | "blue" | "yellow";
  accentRgb: string;
  courseMapLabel: string;
  titleClassName: string;
  accentText: string;
  border: string;
  surface: string;
  marker: string;
  line: string;
};

export const CLASSROOM_SUBJECT_PRESENTATIONS: Record<
  ClassroomSubjectTone,
  ClassroomSubjectPresentation
> = {
  math: {
    Icon: Sigma,
    routeAccent: "red",
    accentRgb: "248, 113, 113",
    courseMapLabel: "Course axis",
    titleClassName:
      "font-mono text-[clamp(2.7rem,5.8vw,5.8rem)] font-semibold uppercase leading-[0.88] tracking-[-0.06em] text-[#f4fff9]",
    accentText: "text-red-200",
    border: "border-red-200/[0.16]",
    surface:
      "bg-[linear-gradient(135deg,rgba(248,113,113,0.11),rgba(239,68,68,0.03)_52%,rgba(3,18,13,0.72))]",
    marker:
      "border-red-200/[0.28] bg-red-400/[0.15] text-red-100",
    line: "bg-red-300/[0.48]",
  },
  science: {
    Icon: FlaskConical,
    routeAccent: "green",
    accentRgb: "74, 222, 128",
    courseMapLabel: "Course lab",
    titleClassName:
      "text-[clamp(2.7rem,5.8vw,5.8rem)] font-semibold uppercase leading-[0.9] tracking-[-0.055em] text-[#f4fff9]",
    accentText: "text-green-200",
    border: "border-green-200/[0.15]",
    surface:
      "bg-[linear-gradient(135deg,rgba(74,222,128,0.10),rgba(34,197,94,0.025)_52%,rgba(3,18,13,0.72))]",
    marker:
      "border-green-200/[0.26] bg-green-300/[0.14] text-green-100",
    line: "bg-green-300/[0.45]",
  },
  "social-studies": {
    Icon: Landmark,
    routeAccent: "blue",
    accentRgb: "96, 165, 250",
    courseMapLabel: "Course timeline",
    titleClassName:
      "font-serif text-[clamp(2.7rem,5.8vw,5.8rem)] font-semibold leading-[0.9] tracking-[-0.045em] text-[#f4fff9]",
    accentText: "text-blue-200",
    border: "border-blue-200/[0.15]",
    surface:
      "bg-[linear-gradient(135deg,rgba(96,165,250,0.10),rgba(59,130,246,0.025)_52%,rgba(3,18,13,0.72))]",
    marker:
      "border-blue-200/[0.26] bg-blue-400/[0.14] text-blue-100",
    line: "bg-blue-300/[0.45]",
  },
  english: {
    Icon: BookMarked,
    routeAccent: "yellow",
    accentRgb: "250, 204, 21",
    courseMapLabel: "Reading shelf",
    titleClassName:
      "font-serif text-[clamp(2.7rem,5.8vw,5.8rem)] font-semibold leading-[0.9] tracking-[-0.045em] text-[#f4fff9]",
    accentText: "text-yellow-200",
    border: "border-yellow-200/[0.15]",
    surface:
      "bg-[linear-gradient(135deg,rgba(250,204,21,0.10),rgba(234,179,8,0.025)_52%,rgba(3,18,13,0.72))]",
    marker:
      "border-yellow-200/[0.26] bg-yellow-300/[0.14] text-yellow-100",
    line: "bg-yellow-300/[0.45]",
  },
};

export function getClassroomSubjectPresentation(subjectId: string) {
  return CLASSROOM_SUBJECT_PRESENTATIONS[
    subjectId as ClassroomSubjectTone
  ] ?? CLASSROOM_SUBJECT_PRESENTATIONS.math;
}
