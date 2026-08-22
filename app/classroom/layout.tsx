import type { Metadata } from "next";
import ClassroomRouteField from "@/app/classroom/_components/ClassroomRouteField";
import ClassroomTopbar from "@/app/classroom/_components/ClassroomTopbar";

export const metadata: Metadata = {
  title: {
    default: "Classroom Courses · Education Station 64",
    template: "%s · Education Station Classroom",
  },
  description:
    "High school courses organized into clear subjects, units, lessons, and practice.",
};

export default function ClassroomLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#031912] text-stone-100 selection:bg-emerald-300/20">
      <ClassroomRouteField />
      <ClassroomTopbar />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
