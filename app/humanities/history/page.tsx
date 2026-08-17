import PageRenderer from "@/app/_page-system/PageRenderer";
import { HISTORY_PAGE_RECIPE } from "@/lib/page-system/recipes";
import { resolvePageRecipe } from "@/lib/page-system/resolve";

export default function HistoryPage() {
  return <PageRenderer recipe={resolvePageRecipe(HISTORY_PAGE_RECIPE)} />;
}
