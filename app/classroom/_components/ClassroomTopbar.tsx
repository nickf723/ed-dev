import Link from "next/link";
import { ArrowUpRight, BookOpen, School } from "lucide-react";

export default function ClassroomTopbar() {
  return (
    <header className="sticky top-0 z-[60] border-b border-white/[0.07] bg-[#07101a]/82 text-slate-100 shadow-[0_12px_40px_rgba(0,0,0,0.16)] backdrop-blur-2xl">
      <div className="mx-auto flex min-h-14 w-full max-w-[1500px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/classroom"
          className="flex min-w-0 items-center gap-3 font-semibold tracking-[-0.02em]"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-cyan-200/15 bg-gradient-to-br from-cyan-300/15 to-emerald-300/10 text-cyan-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
            <School size={16} />
          </span>
          <span className="truncate">
            Education Station <span className="text-cyan-200">Classroom</span>
          </span>
        </Link>

        <nav aria-label="Classroom navigation" className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/classroom"
            className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-[12px] font-semibold text-slate-400 transition-colors hover:bg-white/[0.05] hover:text-white"
          >
            <BookOpen size={14} />
            <span className="hidden sm:inline">Courses</span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-[12px] font-semibold text-slate-400 transition-colors hover:bg-white/[0.05] hover:text-white"
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
