import { useEffect, useRef, useState } from "react";

const API_ROOT = "https://www.themealdb.com/api/json/v1/1";

export interface MealRecord {
  id: string;
  name: string;
  thumbnail: string;
  category: string;
  area: string;
  instructions?: string;
  tags?: string[];
  youtube?: string;
  ingredients?: { item: string; measure: string }[];
}

export type CulinaryFilters = {
  category: string;
  area: string;
  ingredient: string;
  query: string;
};

type RawMeal = Record<string, string | null | undefined>;

type FilterSource = {
  kind: "category" | "area" | "ingredient";
  meals: RawMeal[];
};

function transformMeal(
  meal: RawMeal,
  fallback: Partial<Pick<MealRecord, "category" | "area">> = {},
): MealRecord {
  return {
    id: meal.idMeal ?? "",
    name: meal.strMeal ?? "Untitled recipe",
    thumbnail: meal.strMealThumb ?? "",
    category: meal.strCategory ?? fallback.category ?? "",
    area: meal.strArea ?? fallback.area ?? "",
  };
}

async function fetchMeals(url: string): Promise<RawMeal[]> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Recipe service returned ${response.status}`);
  const json = await response.json();
  return (json.meals ?? []) as RawMeal[];
}

function normalizeIngredient(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function mealHasIngredient(meal: RawMeal, ingredient: string): boolean {
  const target = normalizeIngredient(ingredient);
  if (!target) return true;

  for (let index = 1; index <= 20; index += 1) {
    const value = normalizeIngredient(String(meal[`strIngredient${index}`] ?? ""));
    if (value && value.includes(target)) return true;
  }

  return false;
}

function intersectSources(sources: readonly FilterSource[]): RawMeal[] {
  if (sources.length === 0) return [];

  const maps = sources.map(
    (source) => new Map(source.meals.map((meal) => [meal.idMeal ?? "", meal])),
  );

  return sources[0].meals
    .filter((meal) => {
      const id = meal.idMeal ?? "";
      return id && maps.every((map) => map.has(id));
    })
    .map((meal) => {
      const id = meal.idMeal ?? "";
      return maps.reduce<RawMeal>(
        (merged, map) => ({ ...merged, ...(map.get(id) ?? {}) }),
        meal,
      );
    });
}

async function fetchDiscovery(count = 12): Promise<RawMeal[]> {
  const responses = await Promise.all(
    Array.from({ length: count }, () => fetchMeals(`${API_ROOT}/random.php`)),
  );
  const unique = new Map<string, RawMeal>();
  responses.flat().forEach((meal) => {
    if (meal.idMeal) unique.set(meal.idMeal, meal);
  });
  return [...unique.values()];
}

export const useCulinary = (initialCategory = "Beef") => {
  const [data, setData] = useState<MealRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<CulinaryFilters>({
    category: initialCategory,
    area: "",
    ingredient: "",
    query: "",
  });
  const [refreshToken, setRefreshToken] = useState(0);
  const requestIdRef = useRef(0);

  useEffect(() => {
    const requestId = ++requestIdRef.current;

    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        const category = filters.category.trim();
        const area = filters.area.trim();
        const ingredient = filters.ingredient.trim();
        const query = filters.query.trim();

        let meals: RawMeal[] = [];

        if (query) {
          const searched = await fetchMeals(
            `${API_ROOT}/search.php?s=${encodeURIComponent(query)}`,
          );

          meals = searched.filter((meal) => {
            if (category && meal.strCategory !== category) return false;
            if (area && meal.strArea !== area) return false;
            if (ingredient && !mealHasIngredient(meal, ingredient)) return false;
            return true;
          });
        } else {
          const requests: Promise<FilterSource>[] = [];

          if (category) {
            requests.push(
              fetchMeals(`${API_ROOT}/filter.php?c=${encodeURIComponent(category)}`).then(
                (sourceMeals) => ({ kind: "category" as const, meals: sourceMeals }),
              ),
            );
          }

          if (area) {
            requests.push(
              fetchMeals(`${API_ROOT}/filter.php?a=${encodeURIComponent(area)}`).then(
                (sourceMeals) => ({ kind: "area" as const, meals: sourceMeals }),
              ),
            );
          }

          if (ingredient) {
            const apiIngredient = ingredient.trim().replace(/\s+/g, "_");
            requests.push(
              fetchMeals(`${API_ROOT}/filter.php?i=${encodeURIComponent(apiIngredient)}`).then(
                (sourceMeals) => ({ kind: "ingredient" as const, meals: sourceMeals }),
              ),
            );
          }

          if (requests.length === 0) {
            meals = await fetchDiscovery();
          } else {
            const sources = await Promise.all(requests);
            meals = intersectSources(sources);
          }
        }

        if (requestId !== requestIdRef.current) return;

        const records = meals
          .map((meal) =>
            transformMeal(meal, {
              category: category || undefined,
              area: area || undefined,
            }),
          )
          .filter((meal) => meal.id)
          .sort((left, right) => left.name.localeCompare(right.name));

        setData(records);
      } catch (caught) {
        if (requestId !== requestIdRef.current) return;
        console.error(caught);
        setData([]);
        setError("The recipe service could not complete this filter combination.");
      } finally {
        if (requestId === requestIdRef.current) setLoading(false);
      }
    };

    void load();
  }, [filters.category, filters.area, filters.ingredient, filters.query, refreshToken]);

  const setCategory = (category: string) => {
    setFilters((current) => ({
      ...current,
      category: current.category === category ? "" : category,
    }));
  };

  const setArea = (area: string) => {
    setFilters((current) => ({
      ...current,
      area: current.area === area ? "" : area,
    }));
  };

  const setIngredient = (ingredient: string) => {
    setFilters((current) => ({
      ...current,
      ingredient: current.ingredient === ingredient ? "" : ingredient,
    }));
  };

  const searchRecipe = (query: string) => {
    setFilters((current) => ({ ...current, query: query.trim() }));
  };

  const clearSearch = () => {
    setFilters((current) => ({ ...current, query: "" }));
  };

  const clearAll = () => {
    setFilters({ category: "", area: "", ingredient: "", query: "" });
  };

  const fetchRandom = () => {
    setFilters({ category: "", area: "", ingredient: "", query: "" });
    setRefreshToken((current) => current + 1);
  };

  const getRecipeDetails = async (id: string): Promise<MealRecord | null> => {
    try {
      const meals = await fetchMeals(`${API_ROOT}/lookup.php?i=${encodeURIComponent(id)}`);
      const meal = meals[0];
      if (!meal) return null;

      const ingredients: { item: string; measure: string }[] = [];
      for (let index = 1; index <= 20; index += 1) {
        const item = String(meal[`strIngredient${index}`] ?? "").trim();
        const measure = String(meal[`strMeasure${index}`] ?? "").trim();
        if (item) ingredients.push({ item, measure });
      }

      return {
        id: meal.idMeal ?? id,
        name: meal.strMeal ?? "Untitled recipe",
        thumbnail: meal.strMealThumb ?? "",
        category: meal.strCategory ?? "",
        area: meal.strArea ?? "",
        instructions: meal.strInstructions ?? "",
        tags: meal.strTags ? meal.strTags.split(",").map((tag) => tag.trim()) : [],
        youtube: meal.strYoutube ?? "",
        ingredients,
      };
    } catch (caught) {
      console.error(caught);
      return null;
    }
  };

  return {
    data,
    loading,
    error,
    filters,
    setCategory,
    setArea,
    setIngredient,
    searchRecipe,
    clearSearch,
    clearAll,
    fetchRandom,
    getRecipeDetails,
  };
};
