import { useState, useEffect } from "react";
import { CUSTOM_RACES, CUSTOM_RACE_DETAILS } from "./custom-content";

const BASE_URL = "https://www.dnd5eapi.co/api";

export interface APIReference {
  index: string;
  name: string;
  url: string;
}

export interface ClassDetail {
  index: string;
  name: string;
  hit_die: number;
  proficiencies: APIReference[];
  saving_throws: APIReference[];
  spellcasting?: {
      spellcasting_ability: { name: string };
  }
}

export interface ClassFeature {
  index: string;
  name: string;
  level: number;
  desc: string[];
}

export interface Spell {
  index: string;
  name: string;
  level: number;
  desc: string[];
  range: string;
  duration: string;
}

export const useDnD = () => {
  const [classes, setClasses] = useState<APIReference[]>([]);
  const [races, setRaces] = useState<APIReference[]>([]);
  const [loading, setLoading] = useState(false);
const getClassFeatures = async (classIndex: string, level: number) => {
    // The API endpoint /classes/{index}/levels/{level}/features exists, 
    // but to get ALL features up to level X, we fetch all levels and filter.
    try {
        const res = await fetch(`https://www.dnd5eapi.co/api/classes/${classIndex}/levels/features`);
        const json = await res.json();
        // Filter features that are <= current character level
        const features = json.results.filter((f: any) => f.level <= level);
        return features.reverse(); // Show newest features first
    } catch {
        return [];
    }
};

  // Initial Load: Get Indexes
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        const [cRes, rRes] = await Promise.all([
            fetch(`${BASE_URL}/classes`),
            fetch(`${BASE_URL}/races`)
        ]);
        const cJson = await cRes.json();
        const rJson = await rRes.json();
        setClasses(cJson.results);
        setRaces([...rJson.results, ...CUSTOM_RACES]);
      } catch (e) { console.error(e); }
      setLoading(false);
    };
    init();
  }, []);

  const getRaceDetail = async (index: string) => {
      // Check Custom First
      if (CUSTOM_RACE_DETAILS[index]) {
          return CUSTOM_RACE_DETAILS[index];
      }
      // Fallback to API
      try {
          const res = await fetch(`${BASE_URL}/races/${index}`);
          return await res.json();
      } catch { return null; }
  };

  // Fetch Specific Class Details
  const getClassDetail = async (index: string) => {
      try {
          const res = await fetch(`${BASE_URL}/classes/${index}`);
          return await res.json();
      } catch { return null; }
  };

  // Fetch Spells for a Class (Level 1 only for starter chars)
  const getClassSpells = async (classIndex: string) => {
      setLoading(true);
      try {
          // Get list
          const res = await fetch(`${BASE_URL}/classes/${classIndex}/spells`);
          const json = await res.json();
          // Filter for Level 1 spells (Cantrips are lvl 0)
          const lvl1 = json.results.slice(0, 15); // Limit for demo speed
          
          // Hydrate details (API requires individual calls for details, usually you'd cache this)
          const detailedSpells = await Promise.all(
              lvl1.map(async (s: any) => {
                  const r = await fetch(`${BASE_URL}/spells/${s.index}`);
                  return await r.json();
              })
          );
          setLoading(false);
          return detailedSpells;
      } catch { 
          setLoading(false);
          return []; 
      }
  };

  return { classes, races, loading, getClassDetail, getClassSpells, getRaceDetail, getClassFeatures };
};