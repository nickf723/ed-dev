import type { Metadata } from "next";
import ClassroomTopbar from "@/app/classroom/_components/ClassroomTopbar";

export const metadata: Metadata = {
  title: {
    default: "Classroom Courses · Education Station 64",
    template: "%s · Education Station Classroom",
  },
  description:
    "Standards-aligned high school courses with direct units, lessons, practice, and teacher-ready context.",
};

export default function ClassroomLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f5f2ea] text-slate-950">
      <ClassroomTopbar />
      {children}
    </div>
  );
}
