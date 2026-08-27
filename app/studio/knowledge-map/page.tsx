import { notFound } from "next/navigation";
import KnowledgeMapPreview from "@/app/studio/_components/KnowledgeMapPreview";

export const metadata = {
  title: "Knowledge Map Preview",
  robots: { index: false, follow: false },
};

export default function KnowledgeMapPreviewPage() {
  if (process.env.NODE_ENV !== "development") notFound();
  return <KnowledgeMapPreview />;
}
