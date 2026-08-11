import { useEffect, useState } from "react";

export type MarketMode = "INGREDIENTS" | "PACKAGED" | "PRODUCE";

export type IngredientItem = {
  id: string;
  name: string;
  type: "RAW";
  image: string;
  description: string;
};

export type PackagedItem = {
  id: string;
  name: string;
  type: "PACKAGED";
  image: string;
  brand: string;
  calories: number;
  grade: string;
};

export type MarketItem = IngredientItem | PackagedItem;

type MealDbIngredient = {
  idIngredient?: string;
  strIngredient?: string;
  strDescription?: string | null;
};

type OpenFoodFactsProduct = {
  code?: string;
  product_name?: string;
  brands?: string;
  image_front_url?: string;
  nutriments?: { "energy-kcal_100g"?: number };
  nutriscore_grade?: string;
};

let ingredientCatalogPromise: Promise<IngredientItem[]> | null = null;

function loadIngredientCatalog(): Promise<IngredientItem[]> {
  if (!ingredientCatalogPromise) {
    ingredientCatalogPromise = fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
      .then((response) => {
        if (!response.ok) throw new Error(`Ingredient service returned ${response.status}`);
        return response.json() as Promise<{ meals?: MealDbIngredient[] | null }>;
      })
      .then((json) =>
        (json.meals ?? [])
          .filter((item) => item.idIngredient && item.strIngredient)
          .map((item) => ({
            id: item.idIngredient ?? item.strIngredient ?? "",
            name: item.strIngredient ?? "Unknown ingredient",
            type: "RAW" as const,
            image: `https://www.themealdb.com/images/ingredients/${encodeURIComponent(item.strIngredient ?? "")}.png`,
            description: item.strDescription?.trim() ?? "",
          }))
          .sort((left, right) => left.name.localeCompare(right.name)),
      );
  }

  return ingredientCatalogPromise;
}

export const useMarket = (mode: MarketMode, search: string) => {
  const [items, setItems] = useState<MarketItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const ingredientMode = mode === "INGREDIENTS" || mode === "PRODUCE";

    const fetchItems = async () => {
      setLoading(true);
      setError(null);

      try {
        if (ingredientMode) {
          const catalog = await loadIngredientCatalog();
          const query = search.trim().toLowerCase();
          const filtered = query
            ? catalog.filter((item) => item.name.toLowerCase().includes(query))
            : catalog;
          if (!cancelled) setItems(filtered);
        } else {
          const term = search.trim() || "snacks";
          const response = await fetch(
            `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(term)}&search_simple=1&action=process&json=1&page_size=36&sort_by=popularity`,
          );
          if (!response.ok) throw new Error(`Prepared-food service returned ${response.status}`);
          const json = (await response.json()) as { products?: OpenFoodFactsProduct[] };
          const products: PackagedItem[] = (json.products ?? [])
            .filter((product) => product.code && product.image_front_url && product.product_name)
            .map((product) => ({
              id: product.code ?? product.product_name ?? "",
              name: product.product_name ?? "Unknown product",
              brand: product.brands?.split(",")[0]?.trim() || "Unknown brand",
              image: product.image_front_url ?? "",
              calories: Math.round(product.nutriments?.["energy-kcal_100g"] ?? 0),
              grade: product.nutriscore_grade?.toUpperCase() || "?",
              type: "PACKAGED" as const,
            }));
          if (!cancelled) setItems(products);
        }
      } catch (caught) {
        console.error(caught);
        if (!cancelled) {
          setItems([]);
          setError("This pantry source could not be loaded right now.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    const timeout = window.setTimeout(() => void fetchItems(), ingredientMode ? 80 : 280);
    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, [mode, search]);

  return { items, loading, error };
};
