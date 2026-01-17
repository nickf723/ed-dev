import { useState, useEffect } from "react";

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

export const useCulinary = (initialCategory: string) => {
  const [data, setData] = useState<MealRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>(initialCategory);

  const transform = (meals: any[], cat?: string, area?: string) => {
    return meals.map((m: any) => ({
        id: m.idMeal, name: m.strMeal, thumbnail: m.strMealThumb,
        category: cat || m.strCategory || "Unknown", area: area || m.strArea || "Unknown"
    }));
  };

  const fetchCategory = async (cat: string) => {
      setLoading(true); setActiveFilter(cat);
      try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`);
        const json = await res.json();
        if (json.meals) setData(transform(json.meals, cat));
      } catch (e) { console.error(e); }
      setLoading(false);
  };

  const fetchArea = async (area: string) => {
      setLoading(true); setActiveFilter(area);
      try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
        const json = await res.json();
        if (json.meals) setData(transform(json.meals, undefined, area));
      } catch (e) { console.error(e); }
      setLoading(false);
  };

  const fetchRandom = async () => {
      setLoading(true); setActiveFilter("Chef's Special");
      try {
        const promises = Array(8).fill(null).map(() => fetch('https://www.themealdb.com/api/json/v1/1/random.php').then(r => r.json()));
        const results = await Promise.all(promises);
        const meals = results.map(r => r.meals[0]);
        setData(transform(meals));
      } catch (e) { console.error(e); }
      setLoading(false);
  };

  const searchRecipe = async (query: string) => {
    setLoading(true);
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      const json = await res.json();
      if(json.meals) setData(transform(json.meals));
      else setData([]);
    } catch {}
    setLoading(false);
  };

  const getRecipeDetails = async (id: string): Promise<MealRecord | null> => {
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const json = await res.json();
      const m = json.meals?.[0];
      if (!m) return null;

      const ingredients = [];
      for(let i=1; i<=20; i++) {
          const item = m[`strIngredient${i}`];
          const measure = m[`strMeasure${i}`];
          if(item && item.trim() !== "") ingredients.push({ item, measure });
      }

      return {
        id: m.idMeal, name: m.strMeal, thumbnail: m.strMealThumb,
        category: m.strCategory, area: m.strArea, instructions: m.strInstructions,
        tags: m.strTags ? m.strTags.split(',') : [], youtube: m.strYoutube, ingredients
      };
    } catch { return null; }
  };

  useEffect(() => { fetchCategory(initialCategory); }, []);

  return { data, loading, activeFilter, fetchCategory, fetchArea, fetchRandom, searchRecipe, getRecipeDetails };
};