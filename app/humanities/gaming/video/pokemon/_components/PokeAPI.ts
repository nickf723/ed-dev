export type PokemonData = {
    id: number;
    name: string;
    types: string[];
    spriteUrl: string;
    abilities: { name: string; isHidden: boolean; }[];
    stats: { hp: number; attack: number; defense: number; spAtk: number; spDef: number; speed: number; };
};

export type PokemonDetails = {
    lore: string;
    alternateForms: PokemonData[];
    evolutionChain: PokemonData[]; 
};

// Map each generation to its exact PokeAPI offset and limit
const GENERATIONS: Record<string, { limit: number, offset: number }> = {
    "1": { limit: 151, offset: 0 },   // Kanto
    "2": { limit: 100, offset: 151 }, // Johto
    "3": { limit: 135, offset: 251 }, // Hoenn
    "4": { limit: 107, offset: 386 }, // Sinnoh
    "5": { limit: 156, offset: 493 }, // Unova
    "6": { limit: 72, offset: 649 },  // Kalos
    "7": { limit: 88, offset: 721 },  // Alola
    "8": { limit: 96, offset: 809 },  // Galar
    "9": { limit: 120, offset: 905 }  // Paldea
};

export async function fetchPokedexByGen(gen: string): Promise<PokemonData[]> {
    const config = GENERATIONS[gen];
    if (!config) return []; // Fallback if an invalid gen is passed

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${config.limit}&offset=${config.offset}`);
        const data = await response.json();

        const detailedPromises = data.results.map(async (pokemon: { url: string }) => {
            const detailRes = await fetch(pokemon.url);
            const detailData = await detailRes.json();

            return {
                id: detailData.id,
                name: detailData.name,
                types: detailData.types.map((t: any) => t.type.name),
                spriteUrl: detailData.sprites.other['official-artwork'].front_default || detailData.sprites.front_default,
                abilities: detailData.abilities.map((a: any) => ({ name: a.ability.name, isHidden: a.is_hidden })),
                stats: {
                    hp: detailData.stats.find((s: any) => s.stat.name === 'hp').base_stat,
                    attack: detailData.stats.find((s: any) => s.stat.name === 'attack').base_stat,
                    defense: detailData.stats.find((s: any) => s.stat.name === 'defense').base_stat,
                    spAtk: detailData.stats.find((s: any) => s.stat.name === 'special-attack').base_stat,
                    spDef: detailData.stats.find((s: any) => s.stat.name === 'special-defense').base_stat,
                    speed: detailData.stats.find((s: any) => s.stat.name === 'speed').base_stat,
                }
            };
        });

        return await Promise.all(detailedPromises);
    } catch (error) {
        console.error("Error fetching from PokeAPI:", error);
        return [];
    }
}

export async function fetchPokemonDetails(id: number): Promise<PokemonDetails> {
    try {
        const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
        const speciesData = await speciesRes.json();
        
        // Extract Lore
        const englishEntry = speciesData.flavor_text_entries.find((entry: any) => entry.language.name === 'en');
        const lore = englishEntry ? englishEntry.flavor_text.replace(/[\n\f]/g, ' ') : "No intel available.";

        // Extract Evolutions (Requires a second hop to the evolution-chain URL)
        let evolutionChain: PokemonData[] = [];
        if (speciesData.evolution_chain?.url) {
            const evoRes = await fetch(speciesData.evolution_chain.url);
            const evoData = await evoRes.json();
            // Flatten the nested tree into a clean array of unique names
            const evoNames = Array.from(new Set(flattenEvoTree(evoData.chain)));
            const evoPromises = evoNames.map(async (name: string) => {
                const evoDetailRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
                const evoDetail = await evoDetailRes.json();
                return {
                    id: evoDetail.id,
                    name: evoDetail.name,
                    types: evoDetail.types.map((t: any) => t.type.name),
                    spriteUrl: evoDetail.sprites.other['official-artwork'].front_default || evoDetail.sprites.front_default || '',
                    abilities: evoDetail.abilities.map((a: any) => ({ name: a.ability.name, isHidden: a.is_hidden })),
                    stats: {
                        hp: evoDetail.stats.find((s: any) => s.stat.name === 'hp').base_stat,
                        attack: evoDetail.stats.find((s: any) => s.stat.name === 'attack').base_stat,
                        defense: evoDetail.stats.find((s: any) => s.stat.name === 'defense').base_stat,
                        spAtk: evoDetail.stats.find((s: any) => s.stat.name === 'special-attack').base_stat,
                        spDef: evoDetail.stats.find((s: any) => s.stat.name === 'special-defense').base_stat,
                        speed: evoDetail.stats.find((s: any) => s.stat.name === 'speed').base_stat,
                    }
                };
            });
            evolutionChain = await Promise.all(evoPromises);
        }

        // Extract Alternate Forms
        const altVarieties = speciesData.varieties.filter((v: any) => !v.is_default);
        const altFormsPromises = altVarieties.map(async (v: any) => {
            const formRes = await fetch(v.pokemon.url);
            const formData = await formRes.json();

            return {
                id: formData.id,
                name: formData.name,
                types: formData.types.map((t: any) => t.type.name),
                spriteUrl: formData.sprites.other['official-artwork'].front_default || formData.sprites.front_default || '', 
                abilities: formData.abilities.map((a: any) => ({ name: a.ability.name, isHidden: a.is_hidden })),
                stats: {
                    hp: formData.stats.find((s: any) => s.stat.name === 'hp').base_stat,
                    attack: formData.stats.find((s: any) => s.stat.name === 'attack').base_stat,
                    defense: formData.stats.find((s: any) => s.stat.name === 'defense').base_stat,
                    spAtk: formData.stats.find((s: any) => s.stat.name === 'special-attack').base_stat,
                    spDef: formData.stats.find((s: any) => s.stat.name === 'special-defense').base_stat,
                    speed: formData.stats.find((s: any) => s.stat.name === 'speed').base_stat,
                }
            };
        });

        const alternateForms = await Promise.all(altFormsPromises);

        return { lore, alternateForms, evolutionChain };
    } catch (error) {
        return { lore: "Database connection error.", alternateForms: [], evolutionChain: [] };
    }
}

const flattenEvoTree = (chain: any): string[] => {
    let evos: string[] = [chain.species.name];
    if (chain.evolves_to.length > 0) {
        // If it branches (like Eevee), we map over all branches. If linear, it just maps the one.
        chain.evolves_to.forEach((evo: any) => {
            evos = evos.concat(flattenEvoTree(evo));
        });
    }
    return evos;
}

export async function fetchRandomPokemon(): Promise<PokemonData | null> {
    // As of Gen 9, there are 1025 Pokémon in the National Dex
    const randomId = Math.floor(Math.random() * 1025) + 1;
    
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        const detailData = await res.json();
        
        return {
            id: detailData.id,
            name: detailData.name,
            types: detailData.types.map((t: any) => t.type.name),
            spriteUrl: detailData.sprites.other['official-artwork'].front_default || detailData.sprites.front_default || '',
            abilities: detailData.abilities.map((a: any) => ({ name: a.ability.name, isHidden: a.is_hidden })),
            stats: {
                hp: detailData.stats.find((s: any) => s.stat.name === 'hp').base_stat,
                attack: detailData.stats.find((s: any) => s.stat.name === 'attack').base_stat,
                defense: detailData.stats.find((s: any) => s.stat.name === 'defense').base_stat,
                spAtk: detailData.stats.find((s: any) => s.stat.name === 'special-attack').base_stat,
                spDef: detailData.stats.find((s: any) => s.stat.name === 'special-defense').base_stat,
                speed: detailData.stats.find((s: any) => s.stat.name === 'speed').base_stat,
            }
        };
    } catch (error) {
        console.error("Error fetching random Pokemon:", error);
        return null;
    }
}

