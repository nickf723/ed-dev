import { useState } from 'react';
import { parseAndFetchDeck } from './scryfall';

// Types (Simplified for brevity)
export type Zone = 'library' | 'hand' | 'battlefield' | 'graveyard' | 'exile' | 'command';
export type Card = any; // Using the shape from scryfall.ts
export type Player = { 
    id: string; name: string; life: number; 
    library: Card[]; hand: Card[]; battlefield: Card[]; graveyard: Card[]; exile: Card[]; 
};

export const useGameEngine = () => {
  const [game, setGame] = useState<{ players: Player[], turn: number }>({ players: [], turn: 1 });
  const [loading, setLoading] = useState(false);

  const addPlayer = async (name: string, decklist: string) => {
    setLoading(true);
    const realDeck = await parseAndFetchDeck(decklist);
    
    const newPlayer: Player = {
      id: crypto.randomUUID(),
      name,
      life: 40,
      library: realDeck.sort(() => Math.random() - 0.5), // Shuffle
      hand: [], battlefield: [], graveyard: [], exile: []
    };
    
    // Assign owner
    newPlayer.library.forEach(c => c.ownerId = newPlayer.id);

    setGame(prev => ({ ...prev, players: [...prev.players, newPlayer] }));
    setLoading(false);
  };

  const drawCard = (playerId: string) => {
    setGame(prev => ({
        ...prev,
        players: prev.players.map(p => {
            if (p.id !== playerId || p.library.length === 0) return p;
            const card = { ...p.library[0], zone: 'hand' };
            return { ...p, library: p.library.slice(1), hand: [...p.hand, card] };
        })
    }));
  };

  const playCard = (playerId: string, cardId: string) => {
    setGame(prev => ({
        ...prev,
        players: prev.players.map(p => {
            if (p.id !== playerId) return p;
            const idx = p.hand.findIndex(c => c.id === cardId);
            if (idx === -1) return p;
            const card = { ...p.hand[idx], zone: 'battlefield' };
            return { ...p, hand: p.hand.filter(c => c.id !== cardId), battlefield: [...p.battlefield, card] };
        })
    }));
  };

  const tapCard = (playerId: string, cardId: string) => {
    setGame(prev => ({
        ...prev,
        players: prev.players.map(p => {
            if (p.id !== playerId) return p;
            return {
                ...p,
                battlefield: p.battlefield.map(c => c.id === cardId ? { ...c, tapped: !c.tapped } : c)
            };
        })
    }));
  };

  const moveCard = (playerId: string, cardId: string, fromZone: Zone, toZone: Zone) => {
      setGame(prev => ({
          ...prev,
          players: prev.players.map(p => {
              if (p.id !== playerId) return p;
              // Remove from old zone
              // @ts-ignore (Dynamic access)
              const card = p[fromZone].find(c => c.id === cardId);
              if (!card) return p;
              
              // @ts-ignore
              const newFrom = p[fromZone].filter(c => c.id !== cardId);
              
              // Add to new zone
              const newCard = { ...card, zone: toZone, tapped: false };
              // @ts-ignore
              const newTo = [...p[toZone], newCard];

              return { ...p, [fromZone]: newFrom, [toZone]: newTo };
          })
      }));
  };

  return { game, addPlayer, drawCard, playCard, tapCard, moveCard, loading };
};