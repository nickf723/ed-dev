"use client";

import Link from "next/link";
import type { MouseEvent as ReactMouseEvent, ReactNode } from "react";

export default function RecipeLinkFrame({
  href,
  active,
  preview,
  onSelect,
  children,
}: {
  href?: string;
  active: boolean;
  preview?: boolean;
  onSelect?: () => void;
  children: ReactNode;
}) {
  if (preview || onSelect) {
    return (
      <button
        type="button"
        className="h-full w-full text-left"
        onClick={(event: ReactMouseEvent<HTMLButtonElement>) => {
          event.stopPropagation();
          onSelect?.();
        }}
      >
        {children}
      </button>
    );
  }

  if (active && href) return <Link href={href}>{children}</Link>;
  return <div aria-disabled="true">{children}</div>;
}
