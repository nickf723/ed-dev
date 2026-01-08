// app/humanities/gaming/tabletop/tcg/mtg/engine/scryfall.ts
import { ScryfallData } from './types';
import { createCardInstance } from './cardFactory';

export async function fetchCardData(cardName: string): Promise<ScryfallData> {
  try {
    const response = await fetch(`https://api.scryfall.com/cards/named?fuzzy=${encodeURIComponent(cardName)}`);
    if (!response.ok) throw new Error("Card not found");
    const data = await response.json();
    
    const face = data.card_faces ? data.card_faces[0] : data;
    
    return {
        scryfallId: data.id,
        name: data.name,
        manaCost: face.mana_cost,
        cmc: data.cmc || 0,
        typeLine: data.type_line,
        oracleText: face.oracle_text,
        power: face.power,
        toughness: face.toughness,
        imageUrl: data.image_uris?.normal || data.card_faces?.[0]?.image_uris?.normal || null,
        colors: data.colors || face.colors,
        
        // NEW FIELDS
        keywords: data.keywords || face.keywords || [],
        produced_mana: data.produced_mana,
        is_legendary: data.type_line.includes("Legendary"),
    };
  } catch (e) {
    return {
        scryfallId: "token-" + crypto.randomUUID(),
        name: cardName,
        imageUrl: null,
        typeLine: "Token",
        cmc: 0,
        keywords: [],
        is_legendary: false
    };
  }
}

// Updated Parser to use the new Factory pattern internally if needed, 
// or just return raw data for the hook to use.
export async function parseAndFetchDeck(decklist: string) {
    const lines = decklist.split('\n').filter(l => l.trim().length > 0);
    const deck: ScryfallData[] = []; // Now returns Data, not State
    
    const limitedLines = lines.slice(0, 20); 

    for (const line of limitedLines) {
        const match = line.trim().match(/^(\d+)[xX]?\s+(.+)$/);
        if (match) {
            const count = parseInt(match[1]);
            const name = match[2];
            
            const cardData = await fetchCardData(name);
            
            for(let i=0; i<count; i++) {
                deck.push(cardData);
            }
        }
    }
    return deck;
}