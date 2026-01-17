import { useState, useEffect } from "react";
import { ORGANELLES, OrganelleType } from "./cytology-data";

export interface CellRecord {
  title: string;
  extract: string;
  thumbnail: string;
  url: string;
}

export const useWikiCytology = (activeId: string | null) => {
  const [data, setData] = useState<CellRecord | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!activeId) {
      setData(null);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      const organelle = ORGANELLES.find(o => o.id === activeId);
      if (!organelle) return;

      try {
        const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${organelle.wikiQuery}`);
        const json = await res.json();
        
        setData({
          title: json.title,
          extract: json.extract,
          thumbnail: json.thumbnail?.source || null,
          url: json.content_urls?.desktop?.page
        });
      } catch {
        // Silent fail
      }
      setLoading(false);
    };

    const timeout = setTimeout(fetchData, 200);
    return () => clearTimeout(timeout);
  }, [activeId]);

  return { data, loading };
};