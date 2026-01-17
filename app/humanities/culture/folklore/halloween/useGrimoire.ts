import { useState, useEffect } from "react";
import { MONSTER_QUERY_LIST } from "./halloween-data";

export interface MonsterRecord {
  id: string;
  title: string;
  wikiTitle: string;
  extract: string;
  thumbnail: string | null;
  label: string;
  icon: any;
}

export const useGrimoire = () => {
  const [data, setData] = useState<MonsterRecord[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const summonMonsters = async () => {
      setLoading(true);
      const promises = MONSTER_QUERY_LIST.map(async (target) => {
        try {
          const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${target.query}`);
          const json = await res.json();
          return {
            id: target.id,
            title: target.label, // Use our cool label instead of Wiki title
            wikiTitle: json.title,
            extract: json.extract,
            thumbnail: json.thumbnail?.source || null,
            label: target.label,
            icon: target.icon
          };
        } catch {
          return null;
        }
      });

      const results = await Promise.all(promises);
      setData(results.filter((m): m is MonsterRecord => m !== null));
      setLoading(false);
    };

    summonMonsters();
  }, []);

  return { data, loading };
};