import { notFound } from "next/navigation";
import KnowledgeStudio from "@/app/studio/_components/KnowledgeStudio";
import { PAGE_RECIPE_CATALOG } from "@/lib/page-system/catalog";
import { readAllPageRecipes } from "@/lib/page-system/server";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Knowledge Studio",
  robots: { index: false, follow: false },
};

export default async function StudioPage() {
  if (process.env.NODE_ENV !== "development") notFound();

  const recipes = await readAllPageRecipes();
  return <KnowledgeStudio initialRecipes={recipes} catalog={PAGE_RECIPE_CATALOG} />;
}
