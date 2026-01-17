import { useState, useEffect } from "react";
import { INITIAL_FUNGI, Edibility } from "./mycology-data";

export interface FungiRecord {
  id: string;
  title: string;
  extract: string;
  thumbnail: string;
  edibility: Edibility;
  substrate: string;
}

export const useWikiMycology = () => {
  const [data, setData] = useState<FungiRecord[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const promises = INITIAL_FUNGI.map(async (fungi) => {
        try {
          const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${fungi.query}`);
          const json = await res.json();
          return {
            id: fungi.id,
            title: json.title,
            extract: json.extract,
            thumbnail: json.thumbnail?.source || null,
            edibility: fungi.edibility as Edibility,
            substrate: fungi.substrate
          };
        } catch {
          return null;
        }
      });

      const results = await Promise.all(promises);
      setData(results.filter((p): p is FungiRecord => p !== null));
      setLoading(false);
    };

    fetchData();
  }, []);

  return { data, loading };
};