import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type ClassroomCrumb = {
  label: string;
  href?: string;
};

export default function ClassroomBreadcrumbs({
  crumbs,
}: {
  crumbs: readonly ClassroomCrumb[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-[12px] text-slate-500">
      {crumbs.map((crumb, index) => {
        const current = index === crumbs.length - 1;
        return (
          <span key={`${crumb.label}-${index}`} className="contents">
            {index > 0 ? <ChevronRight size={13} className="text-slate-700" /> : null}
            {crumb.href && !current ? (
              <Link href={crumb.href} className="font-medium transition-colors hover:text-cyan-200">
                {crumb.label}
              </Link>
            ) : (
              <span className={current ? "font-semibold text-slate-200" : undefined}>
                {crumb.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
