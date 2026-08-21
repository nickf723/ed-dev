import Link from "next/link";
import { ArrowUpRight, BookOpen, School } from "lucide-react";

export default function ClassroomTopbar() {
  return (
    <header className="sticky top-0 z-[60] border-b border-slate-900/10 bg-[#fbfaf6]/92 text-slate-950 shadow-[0_8px_30px_rgba(15,23,42,0.05)] backdrop-blur-xl">
      <div className="mx-auto flex min-h-14 w-full max-w-[1500px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/classroom"
          className="flex min-w-0 items-center gap-3 font-semibold tracking-[-0.02em]"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-white">
            <School size={16} />
          </span>
          <span className="truncate">
            Education Station <span className="text-emerald-700">Classroom</span>
          </span>
        </Link>

        <nav aria-label="Classroom navigation" className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/classroom"
            className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-[12px] font-semibold text-slate-600 transition-colors hover:bg-slate-900/[0.05] hover:text-slate-950"
          >
            <BookOpen size={14} />
            <span className="hidden sm:inline">Courses</span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-[12px] font-semibold text-slate-600 transition-colors hover:bg-slate-900/[0.05] hover:text-slate-950"
          >
            <span className="hidden sm:inline">Knowledge atlas</span>
            <span className="sm:hidden">Atlas</span>
            <ArrowUpRight size={13} />
          </Link>
        </nav>
      </div>
    </header>
  );
}
