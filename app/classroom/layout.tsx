import type { Metadata } from "next";
import ClassroomTopbar from "@/app/classroom/_components/ClassroomTopbar";

export const metadata: Metadata = {
  title: {
    default: "Classroom Courses · Education Station 64",
    template: "%s · Education Station Classroom",
  },
  description:
    "Standards-aligned high school courses organized into units, lessons, practice, and teaching resources.",
};

export default function ClassroomLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#07101a] text-slate-100 selection:bg-cyan-300/20">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_8%_0%,rgba(34,211,238,0.10),transparent_28%),radial-gradient(circle_at_92%_12%,rgba(52,211,153,0.09),transparent_30%),radial-gradient(circle_at_72%_100%,rgba(139,92,246,0.07),transparent_34%),linear-gradient(180deg,#08131f_0%,#07101a_58%,#060c15_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:linear-gradient(to_bottom,black,transparent_72%)]"
      />
      <ClassroomTopbar />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
