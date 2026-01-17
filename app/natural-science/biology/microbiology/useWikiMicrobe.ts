import { useState, useEffect } from "react";
import { INITIAL_MICROBES, MicrobeType, BSLLevel } from "./microbiology-data";

export interface MicrobeRecord {
  id: string;
  title: string;
  extract: string;
  thumbnail: string;
  type: MicrobeType;
  bsl: BSLLevel;
  shape: string;
}

export const useWikiMicrobe = (category: 'ALL' | MicrobeType) => {
  const [data, setData] = useState<MicrobeRecord[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const targets = category === 'ALL' 
        ? INITIAL_MICROBES 
        : INITIAL_MICROBES.filter(m => m.type === category);

      const promises = targets.map(async (item) => {
        try {
          const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${item.query}`);
          const json = await res.json();
          return {
            id: item.id,
            title: json.title,
            extract: json.extract,
            thumbnail: json.thumbnail?.source || null,
            type: item.type as MicrobeType,
            bsl: item.bsl as BSLLevel,
            shape: item.shape
          };
        } catch {
          return null;
        }
      });

      const results = await Promise.all(promises);
      setData(results.filter((p): p is MicrobeRecord => p !== null));
      setLoading(false);
    };

    fetchData();
  }, [category]);

  return { data, loading };
};