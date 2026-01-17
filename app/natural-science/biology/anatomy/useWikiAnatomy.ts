import { useState, useEffect } from "react";
import { ANATOMY_DATA, SystemType } from "./anatomy-data";

export interface AnatomyRecord {
  title: string;
  extract: string;
  image: string | null;
  url: string;
}

export const useWikiAnatomy = (activeSystem: SystemType | null) => {
  const [data, setData] = useState<AnatomyRecord | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!activeSystem) {
      setData(null);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      const system = ANATOMY_DATA.find(s => s.type === activeSystem);
      if (!system) return;

      try {
        const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${system.wikiQuery}`);
        const json = await res.json();
        
        setData({
          title: json.title,
          extract: json.extract,
          image: json.thumbnail?.source || null,
          url: json.content_urls?.desktop?.page
        });
      } catch (err) {
        console.warn("Anatomy fetch failed", err);
      }
      setLoading(false);
    };

    // Debounce slightly to prevent thrashing if user mouses over quickly
    const timeout = setTimeout(fetchData, 200);
    return () => clearTimeout(timeout);

  }, [activeSystem]);

  return { data, loading };
};