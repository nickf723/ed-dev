"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const LS_LAST = "kw:lastVisited";
const LS_RECENTS = "kw:recents";

type RecentLink = { href: string; label: string; ts: number };

function formatLabelFromHref(href: string): string {
  const cleaned = href.replace(/^\/+/, "").replace(/[-_]/g, " ");
  if (!cleaned) return "Home";
  return cleaned
    .split("/")
    .map((p) => p.replace(/\b\w/g, (c) => c.toUpperCase()))
    .join(" → ");
}

export default function RouteLogger() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;

    // Don’t log the homepage itself as “last visited” unless you want it.
    // If you DO want it, delete this guard.
    if (pathname === "/") return;

    try {
      localStorage.setItem(LS_LAST, pathname);

      const raw = localStorage.getItem(LS_RECENTS);
      const list: RecentLink[] = raw ? JSON.parse(raw) : [];

      const entry: RecentLink = {
        href: pathname,
        label: formatLabelFromHref(pathname),
        ts: Date.now(),
      };

      // de-dupe by href, keep newest first
      const next = [entry, ...list.filter((x) => x.href !== pathname)].slice(0, 8);
      localStorage.setItem(LS_RECENTS, JSON.stringify(next));
    } catch {
      // ignore storage errors
    }
  }, [pathname]);

  return null;
}
