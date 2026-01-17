import { useState, useEffect } from "react";
import { INITIAL_PLANTS, PlantUsage } from "./botany-data";

export interface PlantRecord {
  id: string;
  title: string;
  extract: string;
  thumbnail: string;
  usage: PlantUsage;
  sun: string;
  water: string;
}

export const useWikiBotany = (category: 'ALL' | PlantUsage) => {
  const [data, setData] = useState<PlantRecord[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const targets = category === 'ALL' 
        ? INITIAL_PLANTS 
        : INITIAL_PLANTS.filter(p => p.category === category);

      const promises = targets.map(async (plant) => {
        try {
          const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${plant.query}`);
          const json = await res.json();
          return {
            id: plant.id,
            title: json.title,
            extract: json.extract,
            thumbnail: json.thumbnail?.source || null,
            usage: plant.category as PlantUsage,
            sun: plant.sun,
            water: plant.water
          };
        } catch {
          return null;
        }
      });

      const results = await Promise.all(promises);
      setData(results.filter((p): p is PlantRecord => p !== null));
      setLoading(false);
    };

    fetchData();
  }, [category]);

  return { data, loading };
};