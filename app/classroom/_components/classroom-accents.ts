export type ClassroomRouteAccent =
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "cyan"
  | "blue"
  | "violet"
  | "pink";

export type ClassroomRouteAccentPresentation = {
  text: string;
  border: string;
  surface: string;
  marker: string;
  line: string;
};

export const CLASSROOM_ROUTE_ACCENTS: Record<
  ClassroomRouteAccent,
  ClassroomRouteAccentPresentation
> = {
  red: {
    text: "text-red-200",
    border: "border-red-200/[0.18]",
    surface:
      "bg-[linear-gradient(135deg,rgba(248,113,113,0.12),rgba(239,68,68,0.035)_56%,rgba(3,18,13,0.74))]",
    marker: "border-red-200/[0.32] bg-red-400/[0.16] text-red-100",
    line: "bg-red-300/[0.48]",
  },
  orange: {
    text: "text-orange-200",
    border: "border-orange-200/[0.18]",
    surface:
      "bg-[linear-gradient(135deg,rgba(251,146,60,0.12),rgba(249,115,22,0.035)_56%,rgba(3,18,13,0.74))]",
    marker:
      "border-orange-200/[0.30] bg-orange-400/[0.15] text-orange-100",
    line: "bg-orange-300/[0.46]",
  },
  yellow: {
    text: "text-yellow-200",
    border: "border-yellow-200/[0.17]",
    surface:
      "bg-[linear-gradient(135deg,rgba(250,204,21,0.11),rgba(234,179,8,0.03)_56%,rgba(3,18,13,0.74))]",
    marker:
      "border-yellow-200/[0.28] bg-yellow-300/[0.14] text-yellow-100",
    line: "bg-yellow-300/[0.45]",
  },
  green: {
    text: "text-green-200",
    border: "border-green-200/[0.17]",
    surface:
      "bg-[linear-gradient(135deg,rgba(74,222,128,0.11),rgba(34,197,94,0.03)_56%,rgba(3,18,13,0.74))]",
    marker:
      "border-green-200/[0.28] bg-green-300/[0.14] text-green-100",
    line: "bg-green-300/[0.45]",
  },
  cyan: {
    text: "text-cyan-200",
    border: "border-cyan-200/[0.17]",
    surface:
      "bg-[linear-gradient(135deg,rgba(34,211,238,0.11),rgba(6,182,212,0.03)_56%,rgba(3,18,13,0.74))]",
    marker: "border-cyan-200/[0.28] bg-cyan-300/[0.14] text-cyan-100",
    line: "bg-cyan-300/[0.45]",
  },
  blue: {
    text: "text-blue-200",
    border: "border-blue-200/[0.18]",
    surface:
      "bg-[linear-gradient(135deg,rgba(96,165,250,0.12),rgba(59,130,246,0.035)_56%,rgba(3,18,13,0.74))]",
    marker: "border-blue-200/[0.30] bg-blue-400/[0.15] text-blue-100",
    line: "bg-blue-300/[0.46]",
  },
  violet: {
    text: "text-violet-200",
    border: "border-violet-200/[0.18]",
    surface:
      "bg-[linear-gradient(135deg,rgba(167,139,250,0.12),rgba(139,92,246,0.035)_56%,rgba(3,18,13,0.74))]",
    marker:
      "border-violet-200/[0.30] bg-violet-400/[0.15] text-violet-100",
    line: "bg-violet-300/[0.46]",
  },
  pink: {
    text: "text-pink-200",
    border: "border-pink-200/[0.18]",
    surface:
      "bg-[linear-gradient(135deg,rgba(244,114,182,0.12),rgba(236,72,153,0.035)_56%,rgba(3,18,13,0.74))]",
    marker: "border-pink-200/[0.30] bg-pink-400/[0.15] text-pink-100",
    line: "bg-pink-300/[0.46]",
  },
};

export function getClassroomRouteAccent(accent: ClassroomRouteAccent) {
  return CLASSROOM_ROUTE_ACCENTS[accent];
}
