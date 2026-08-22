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
  accentRgb: string;
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
    accentRgb: "52, 211, 153",
    accentText: "text-emerald-200",
    border: "border-emerald-200/[0.15]",
    surface:
      "bg-[linear-gradient(135deg,rgba(52,211,153,0.09),rgba(34,211,238,0.035)_52%,rgba(3,18,13,0.72))]",
    marker:
      "border-emerald-200/[0.25] bg-emerald-300/[0.14] text-emerald-100",
    line: "bg-emerald-300/[0.45]",
  },
  science: {
    Icon: FlaskConical,
    accentRgb: "163, 230, 53",
    accentText: "text-lime-200",
    border: "border-lime-200/[0.13]",
    surface:
      "bg-[linear-gradient(135deg,rgba(163,230,53,0.075),rgba(52,211,153,0.025)_52%,rgba(3,18,13,0.72))]",
    marker: "border-lime-200/[0.20] bg-lime-300/[0.12] text-lime-100",
    line: "bg-lime-300/[0.38]",
  },
  "social-studies": {
    Icon: Landmark,
    accentRgb: "251, 146, 60",
    accentText: "text-orange-200",
    border: "border-orange-200/[0.13]",
    surface:
      "bg-[linear-gradient(135deg,rgba(251,146,60,0.075),rgba(245,158,11,0.025)_52%,rgba(3,18,13,0.72))]",
    marker:
      "border-orange-200/[0.20] bg-orange-300/[0.12] text-orange-100",
    line: "bg-orange-300/[0.38]",
  },
  english: {
    Icon: BookMarked,
    accentRgb: "167, 139, 250",
    accentText: "text-violet-200",
    border: "border-violet-200/[0.14]",
    surface:
      "bg-[linear-gradient(135deg,rgba(167,139,250,0.085),rgba(244,114,182,0.025)_52%,rgba(3,18,13,0.72))]",
    marker:
      "border-violet-200/[0.22] bg-violet-300/[0.12] text-violet-100",
    line: "bg-violet-300/[0.40]",
  },
};

export function getClassroomSubjectPresentation(subjectId: string) {
  return CLASSROOM_SUBJECT_PRESENTATIONS[
    subjectId as ClassroomSubjectTone
  ] ?? CLASSROOM_SUBJECT_PRESENTATIONS.math;
}
