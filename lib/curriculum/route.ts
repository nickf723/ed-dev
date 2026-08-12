export function normalizeCurriculumPath(pathname: string): string {
  const rawPath = pathname.split(/[?#]/, 1)[0]?.trim() || "/";
  const withLeadingSlash = rawPath.startsWith("/") ? rawPath : `/${rawPath}`;
  const collapsedSlashes = withLeadingSlash.replace(/\/{2,}/g, "/");

  if (collapsedSlashes === "/") return "/";
  return collapsedSlashes.replace(/\/+$/, "");
}
