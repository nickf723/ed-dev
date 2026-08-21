import type { Metadata } from "next";
import PageRenderer from "@/app/_page-system/PageRenderer";
import { HISTORY_PAGE_RECIPE } from "@/lib/page-system/recipes";
import { resolvePageRecipe } from "@/lib/page-system/resolve";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import HistoryRootExtension from "./HistoryRootExtension";
import { HISTORY_DIRECT_LENS_IDS } from "./historyModel";

export const metadata: Metadata = {
  title: "History | Education Station 64",
  description:
    "Study the past through time, place, theme, source context, chronology arithmetic, corroboration, and evidence-bounded explanation.",
};

export default function HistoryPage() {
  const context = requireCurriculumPageContext("humanities.history");
  const directIds = context.children.map((child) => child.id);
  if (
    directIds.length !== HISTORY_DIRECT_LENS_IDS.length ||
    directIds.some((id, index) => id !== HISTORY_DIRECT_LENS_IDS[index])
  ) {
    throw new Error("History lenses must match the curriculum registry");
  }

  return (
    <PageRenderer recipe={resolvePageRecipe(HISTORY_PAGE_RECIPE)}>
      <HistoryRootExtension />
    </PageRenderer>
  );
}
