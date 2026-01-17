import { useState, useEffect } from "react";

export interface Monster {
  name: string;
  size: string;
  type: string;
  alignment: string;
  ac: number;
  hp: number;
  cr: string;
}

export const useOpen5e = () => {
  const [monster, setMonster] = useState<Monster | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch a random monster based on a Challenge Rating (CR) range
  const rollEncounter = async () => {
    setLoading(true);
    try {
        // Random page to get variety
        const page = Math.floor(Math.random() * 5) + 1; 
        const res = await fetch(`https://api.open5e.com/monsters/?page=${page}&limit=50`);
        const json = await res.json();
        
        if (json.results && json.results.length > 0) {
            const randomIdx = Math.floor(Math.random() * json.results.length);
            const m = json.results[randomIdx];
            setMonster({
                name: m.name,
                size: m.size,
                type: m.type,
                alignment: m.alignment,
                ac: m.armor_class,
                hp: m.hit_points,
                cr: m.challenge_rating
            });
        }
    } catch (e) {
        console.error("The Dungeon is silent...", e);
    }
    setLoading(false);
  };

  useEffect(() => {
    rollEncounter();
  }, []);

  return { monster, loading, rollEncounter };
};