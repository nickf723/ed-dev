import { useState, useEffect } from "react";
import { COLLECTIONS } from "./zoology-data";

export interface AnimalRecord {
  id: number;
  title: string;
  extract: string;
  thumbnail: string;
  description: string;
  status: string; 
}

export const useWikiZoo = (biomeId: keyof typeof COLLECTIONS) => {
  const [data, setData] = useState<AnimalRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCollection = async () => {
      setLoading(true);
      setError(null);
      
      const targets = COLLECTIONS[biomeId] || [];

      const promises = targets.map(async (query) => {
        try {
          const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${query}`);
          if (!res.ok) return null;
          const json = await res.json();
          
          return {
            id: json.pageid,
            title: json.title,
            extract: json.extract,
            thumbnail: json.thumbnail?.source || null,
            description: json.description,
            status: "LC" 
          };
        } catch (err) {
          console.warn(`Failed to fetch ${query}`, err);
          return null;
        }
      });

      const results = await Promise.all(promises);
      setData(results.filter((a): a is AnimalRecord => a !== null));
      setLoading(false);
    };

    fetchCollection();
  }, [biomeId]);

  // Search Function
  const searchAnimal = async (query: string) => {
    setLoading(true);
    try {
      const searchRes = await fetch(`https://en.wikipedia.org/w/api.php?action=opensearch&search=${query}&limit=1&namespace=0&format=json&origin=*`);
      const searchJson = await searchRes.json();
      const exactTitle = searchJson[1][0]; 

      if (!exactTitle) {
        setError("Specimen not found in archive.");
        setLoading(false);
        return;
      }

      const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${exactTitle}`);
      const json = await res.json();
      
      const newAnimal = {
        id: json.pageid,
        title: json.title,
        extract: json.extract,
        thumbnail: json.thumbnail?.source || null,
        description: json.description,
        status: "Unknown"
      };

      setData([newAnimal]); 
    } catch (err) {
      setError("Connection lost.");
    }
    setLoading(false);
  };

  return { data, loading, error, searchAnimal };
};