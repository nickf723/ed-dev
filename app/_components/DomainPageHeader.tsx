import Link from "next/link";
import { ChevronRight, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export type DomainHeaderCrumb = {
  label: string;
  href?: string;
};

type DomainPageHeaderProps = {
  breadcrumbs: readonly DomainHeaderCrumb[];
  eyebrow: string;
  icon: LucideIcon;
  title: ReactNode;
  subtitle: string;
  accentRgb: string;
  aside?: ReactNode;
  titleClassName?: string;
  subtitleClassName?: string;
  iconClassName?: string;
  headerClassName?: string;
};

export default function DomainPageHeader({
  breadcrumbs,
  eyebrow,
  icon: Icon,
  title,
  subtitle,
  accentRgb,
  aside,
  titleClassName = "text-[clamp(3.2rem,5.8vw,6rem)] font-semibold leading-[0.86] tracking-[-0.06em] text-white",
  subtitleClassName = "text-sm leading-6 text-slate-400 sm:text-base",
  iconClassName = "rounded-[22px]",
  headerClassName = "",
}: DomainPageHeaderProps) {
  return (
    <header
      className={`shrink-0 border-b pb-4 ${headerClassName}`}
      style={{ borderColor: `rgba(${accentRgb},0.14)` }}
    >
      <div className="flex items-center justify-between gap-4">
        <div
          className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em]"
          style={{ color: `rgba(${accentRgb},0.68)` }}
        >
          <span
            className="h-1.5 w-1.5 shrink-0 rounded-full"
            style={{
              background: `rgb(${accentRgb})`,
              boxShadow: `0 0 10px rgba(${accentRgb},0.75)`,
            }}
          />
          {eyebrow}
        </div>

        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 rounded-full border border-white/[0.07] bg-black/20 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.13em] text-slate-500 backdrop-blur-lg"
        >
          {breadcrumbs.map((crumb, index) => {
            const current = index === breadcrumbs.length - 1;
            return (
              <span key={`${crumb.label}-${index}`} className="contents">
                {index > 0 ? <ChevronRight size={11} className="text-slate-700" /> : null}
                {crumb.href && !current ? (
                  <Link
                    href={crumb.href}
                    className="transition-colors hover:text-slate-200"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span style={current ? { color: `rgb(${accentRgb})` } : undefined}>
                    {crumb.label}
                  </span>
                )}
              </span>
            );
          })}
        </nav>
      </div>

      <div className="mt-4 flex items-end gap-5 sm:gap-6">
        <div
          className={`hidden h-16 w-16 shrink-0 items-center justify-center border sm:flex ${iconClassName}`}
          style={{
            color: `rgb(${accentRgb})`,
            borderColor: `rgba(${accentRgb},0.28)`,
            background: `rgba(${accentRgb},0.09)`,
            boxShadow: `inset 0 1px 0 rgba(255,255,255,0.06), 0 0 34px rgba(${accentRgb},0.10)`,
          }}
        >
          <Icon size={30} strokeWidth={1.55} />
        </div>

        <div className="min-w-0 flex-1">
          <h1 className={titleClassName}>{title}</h1>
          <p className={`mt-3 max-w-3xl ${subtitleClassName}`}>{subtitle}</p>
        </div>

        {aside ? <div className="hidden shrink-0 lg:block">{aside}</div> : null}
      </div>
    </header>
  );
}
