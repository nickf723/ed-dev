export const PAGE_RECIPE_CATALOG = [
  {
    id: "humanities.history",
    label: "History",
    domain: "Humanities",
    route: "/humanities/history",
    file: "content/pages/humanities/history.json",
  },
  {
    id: "natural.physics",
    label: "Physics",
    domain: "Natural Science",
    route: "/natural-science/physics",
    file: "content/pages/natural/physics.json",
  },
] as const;

export type PageRecipeCatalogEntry = (typeof PAGE_RECIPE_CATALOG)[number];
export type PageRecipeId = PageRecipeCatalogEntry["id"];

export function getPageRecipeCatalogEntry(id: string) {
  return PAGE_RECIPE_CATALOG.find((entry) => entry.id === id);
}
