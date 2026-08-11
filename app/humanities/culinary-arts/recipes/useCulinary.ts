import { useEffect, useMemo, useRef, useState } from "react";

const API_ROOT = "https://www.themealdb.com/api/json/v1/1";
const LETTERS = "abcdefghijklmnopqrstuvwxyz".split("");

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

type MealPayload = {
  meals?: RawMeal[] | null;
};

let catalogPromise: Promise<RawMeal[]> | null = null;

async function fetchMeals(url: string): Promise<RawMeal[]> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Recipe service returned ${response.status}`);
  const json = (await response.json()) as MealPayload;
  return json.meals ?? [];
}

function normalizeIngredient(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function singularizeWord(word: string): string {
  if (word.length <= 3) return word;
  if (word.endsWith("ies")) return `${word.slice(0, -3)}y`;
  if (word.endsWith("oes")) return word.slice(0, -2);
  if (/(ches|shes|xes|zes)$/.test(word)) return word.slice(0, -2);
  if (word.endsWith("s") && !/(ss|us|is)$/.test(word)) return word.slice(0, -1);
  return word;
}

function ingredientKey(value: string): string {
  return normalizeIngredient(value)
    .split(" ")
    .filter(Boolean)
    .map(singularizeWord)
    .join(" ");
}

function ingredientMatches(value: string, target: string): boolean {
  const candidate = ingredientKey(value);
  const wanted = ingredientKey(target);
  if (!candidate || !wanted) return false;
  return candidate === wanted || candidate.includes(wanted) || wanted.includes(candidate);
}

function mealHasIngredient(meal: RawMeal, ingredient: string): boolean {
  if (!ingredient.trim()) return true;
  for (let index = 1; index <= 20; index += 1) {
    const value = String(meal[`strIngredient${index}`] ?? "");
    if (ingredientMatches(value, ingredient)) return true;
  }
  return false;
}

function parseIngredients(meal: RawMeal) {
  const ingredients: { item: string; measure: string }[] = [];
  for (let index = 1; index <= 20; index += 1) {
    const item = String(meal[`strIngredient${index}`] ?? "").trim();
    const measure = String(meal[`strMeasure${index}`] ?? "").trim();
    if (item) ingredients.push({ item, measure });
  }
  return ingredients;
}

function toMealRecord(meal: RawMeal, includeDetails = false): MealRecord {
  return {
    id: meal.idMeal ?? "",
    name: meal.strMeal ?? "Untitled recipe",
    thumbnail: meal.strMealThumb ?? "",
    category: meal.strCategory ?? "",
    area: meal.strArea ?? "",
    ...(includeDetails
      ? {
          instructions: meal.strInstructions ?? "",
          tags: meal.strTags
            ? meal.strTags.split(",").map((tag) => tag.trim()).filter(Boolean)
            : [],
          youtube: meal.strYoutube ?? "",
          ingredients: parseIngredients(meal),
        }
      : {}),
  };
}

async function fetchCatalog(): Promise<RawMeal[]> {
  if (!catalogPromise) {
    catalogPromise = Promise.all(
      LETTERS.map((letter) =>
        fetchMeals(`${API_ROOT}/search.php?f=${letter}`).catch(() => []),
      ),
    ).then((groups) => {
      const unique = new Map<string, RawMeal>();
      groups.flat().forEach((meal) => {
        if (meal.idMeal) unique.set(meal.idMeal, meal);
      });
      return [...unique.values()];
    });
  }
  return catalogPromise;
}

function shuffledSample<T>(values: readonly T[], count: number): T[] {
  const copy = [...values];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy.slice(0, count);
}

export const useCulinary = (initialCategory = "") => {
  const [data, setData] = useState<MealRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<CulinaryFilters>({
    category: initialCategory,
    area: "",
    ingredient: "",
    query: "",
  });
  const [randomMode, setRandomMode] = useState(false);
  const [randomSeed, setRandomSeed] = useState(0);
  const requestIdRef = useRef(0);

  const hasFilters = useMemo(
    () => Boolean(filters.category || filters.area || filters.ingredient || filters.query),
    [filters],
  );

  useEffect(() => {
    const requestId = ++requestIdRef.current;

    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        const catalog = await fetchCatalog();
        let meals = [...catalog];

        if (randomMode) {
          meals = shuffledSample(meals, 18);
        } else {
          const category = filters.category.trim().toLowerCase();
          const area = filters.area.trim().toLowerCase();
          const ingredient = filters.ingredient.trim();
          const query = filters.query.trim().toLowerCase();

          if (category) {
            meals = meals.filter(
              (meal) => String(meal.strCategory ?? "").toLowerCase() === category,
            );
          }

          if (area) {
            meals = meals.filter(
              (meal) => String(meal.strArea ?? "").toLowerCase() === area,
            );
          }

          if (ingredient) {
            meals = meals.filter((meal) => mealHasIngredient(meal, ingredient));
          }

          if (query) {
            meals = meals.filter((meal) =>
              String(meal.strMeal ?? "").toLowerCase().includes(query),
            );
          }

          meals.sort((left, right) =>
            String(left.strMeal ?? "").localeCompare(String(right.strMeal ?? "")),
          );
        }

        if (requestId !== requestIdRef.current) return;
        setData(meals.map((meal) => toMealRecord(meal)).filter((meal) => meal.id));
      } catch (caught) {
        if (requestId !== requestIdRef.current) return;
        console.error(caught);
        setData([]);
        setError("The recipe catalog could not be loaded.");
      } finally {
        if (requestId === requestIdRef.current) setLoading(false);
      }
    };

    void load();
  }, [filters.category, filters.area, filters.ingredient, filters.query, randomMode, randomSeed]);

  const updateFilters = (next: (current: CulinaryFilters) => CulinaryFilters) => {
    setRandomMode(false);
    setFilters(next);
  };

  const setCategory = (category: string) => {
    updateFilters((current) => ({
      ...current,
      category: current.category === category ? "" : category,
    }));
  };

  const setArea = (area: string) => {
    updateFilters((current) => ({
      ...current,
      area: current.area === area ? "" : area,
    }));
  };

  const setIngredient = (ingredient: string) => {
    updateFilters((current) => ({
      ...current,
      ingredient: current.ingredient === ingredient ? "" : ingredient,
    }));
  };

  const searchRecipe = (query: string) => {
    updateFilters((current) => ({ ...current, query: query.trim() }));
  };

  const clearSearch = () => {
    updateFilters((current) => ({ ...current, query: "" }));
  };

  const clearAll = () => {
    setRandomMode(false);
    setFilters({ category: "", area: "", ingredient: "", query: "" });
  };

  const fetchRandom = () => {
    setFilters({ category: "", area: "", ingredient: "", query: "" });
    setRandomMode(true);
    setRandomSeed((current) => current + 1);
  };

  const getRecipeDetails = async (id: string): Promise<MealRecord | null> => {
    try {
      const catalog = await fetchCatalog();
      let meal = catalog.find((candidate) => candidate.idMeal === id);

      if (!meal) {
        const lookup = await fetchMeals(`${API_ROOT}/lookup.php?i=${encodeURIComponent(id)}`);
        meal = lookup[0];
      }

      return meal ? toMealRecord(meal, true) : null;
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
    hasFilters,
    randomMode,
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
