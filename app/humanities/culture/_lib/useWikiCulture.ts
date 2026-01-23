"use client";
import { useState, useEffect } from "react";
import { CULTURE_COLLECTIONS } from "./culture-collections";

export interface CultureRecord {
  id: number;
  title: string;
  extract: string; // The first paragraph summary
  thumbnail: string | null;
  description: string;
}

export const useWikiCulture = (collectionId: keyof typeof CULTURE_COLLECTIONS) => {
  const [data, setData] = useState<CultureRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCollection = async () => {
      setLoading(true);
      setError(null);
      
      const targets = CULTURE_COLLECTIONS[collectionId] || [];

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
            description: json.description || "Folklore Entity"
          };
        } catch (err) {
          console.warn(`Failed to fetch ${query}`, err);
          return null;
        }
      });

      const results = await Promise.all(promises);
      // Filter out failures and set data
      setData(results.filter((a): a is CultureRecord => a !== null));
      setLoading(false);
    };

    fetchCollection();
  }, [collectionId]);

  // Search Function (for manual lookups)
  const searchEntry = async (query: string) => {
    setLoading(true);
    try {
      // 1. OpenSearch to get the exact Wikipedia title
      const searchRes = await fetch(`https://en.wikipedia.org/w/api.php?action=opensearch&search=${query}&limit=1&namespace=0&format=json&origin=*`);
      const searchJson = await searchRes.json();
      const exactTitle = searchJson[1][0]; 

      if (!exactTitle) {
        setError("Entry not found in the archives.");
        setLoading(false);
        return;
      }

      // 2. Fetch Summary for that title
      const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${exactTitle}`);
      const json = await res.json();
      
      const newEntry = {
        id: json.pageid,
        title: json.title,
        extract: json.extract,
        thumbnail: json.thumbnail?.source || null,
        description: json.description || "Archived Record"
      };

      // Replace current list with search result (or you could append it)
      setData([newEntry]); 
    } catch (err) {
      setError("Connection to the Archives lost.");
    }
    setLoading(false);
  };

  return { data, loading, error, searchEntry };
};