import { notFound } from "next/navigation";
import KnowledgeMapPreview from "@/app/studio/_components/KnowledgeMapPreview";

export const metadata = {
  title: "Knowledge Map Preview",
  robots: { index: false, follow: false },
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function KnowledgeMapPreviewPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  if (process.env.NODE_ENV !== "development") notFound();

  const params = await searchParams;
  const focus = Array.isArray(params.focus) ? params.focus[0] : params.focus;

  return <KnowledgeMapPreview focusId={focus} />;
}
