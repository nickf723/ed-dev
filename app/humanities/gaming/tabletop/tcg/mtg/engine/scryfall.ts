import { ScryfallData } from './types';

// Fetch single card data
export async function fetchCardData(cardName: string): Promise<ScryfallData> {
  try {
    const response = await fetch(`https://api.scryfall.com/cards/named?fuzzy=${encodeURIComponent(cardName)}`);
    if (!response.ok) throw new Error("Card not found");
    const data = await response.json();
    
    return {
        scryfallId: data.id,
        name: data.name,
        manaCost: data.mana_cost,
        typeLine: data.type_line,
        oracleText: data.oracle_text,
        power: data.power,
        toughness: data.toughness,
        imageUrl: data.image_uris?.normal || data.card_faces?.[0]?.image_uris?.normal || null,
        colors: data.colors
    };
  } catch (e) {
    // Fallback for tokens or errors
    return {
        scryfallId: "token-" + crypto.randomUUID(),
        name: cardName,
        imageUrl: null,
        typeLine: "Token / Placeholder",
        oracleText: "Could not fetch data.",
        power: "", 
        toughness: ""
    };
  }
}

// Parse a full decklist string
export async function parseAndFetchDeck(decklist: string) {
    const lines = decklist.split('\n').filter(l => l.trim().length > 0);
    const deck: any[] = [];
    
    // Limit to 20 cards for demo performance. 
    // In production, you'd use the Scryfall Collection API for batching.
    const limitedLines = lines.slice(0, 20); 

    for (const line of limitedLines) {
        const match = line.trim().match(/^(\d+)[xX]?\s+(.+)$/);
        if (match) {
            const count = parseInt(match[1]);
            const name = match[2];
            
            // Wait for fetch before continuing (Sequentially)
            const cardData = await fetchCardData(name);
            
            for(let i=0; i<count; i++) {
                deck.push({
                    ...cardData,
                    id: crypto.randomUUID(),
                    zone: 'library',
                    tapped: false,
                    counters: 0,
                    notes: ""
                });
            }
        }
    }
    return deck;
}