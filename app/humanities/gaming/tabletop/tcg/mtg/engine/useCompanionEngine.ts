import { useState, useEffect } from 'react';
import { parseAndFetchDeck, fetchCardData } from './scryfall';
import { analyzeMechanics } from './mechanics';
import { PlayerState, CardState, ManaColor } from './types';
const STORAGE_KEY = 'mtg-companion-state-v1';

export const useCompanionEngine = () => {
  const [players, setPlayers] = useState<PlayerState[]>(() => {
    if (typeof window !== 'undefined') {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error("Failed to load save", e);
            }
        }
    }
    return [];
  });
  const [loading, setLoading] = useState(false);
  const [activePlayerIndex, setActivePlayerIndex] = useState(0);
  const [phase, setPhase] = useState<string>("Main 1");
  

  // --- ACTIONS ---

  const addPlayer = async (name: string, decklistText: string) => {
    setLoading(true);
    
    // Parse deck
    const rawDeck = await parseAndFetchDeck(decklistText);
    
    // Convert to CardState and Tag
    const library: CardState[] = rawDeck.map((c: any) => {
        const cardState: CardState = {
            ...c,
            instanceId: c.id, 
            ownerId: "", 
            zone: 'library',
            tapped: false,
            counters: 0,
            notes: ""
        };
        cardState.notes = analyzeMechanics(cardState).join(", ");
        return cardState;
    });

    const newPlayer: PlayerState = {
        id: crypto.randomUUID(),
        name,
        life: 40,
        poison: 0,
        handSize: 7,
        // --- MISSING INITIALIZATIONS FIXED HERE ---
        commanderTax: 0,
        commanderDamage: {},
        manaPool: { W: 0, U: 0, B: 0, R: 0, G: 0, C: 0 },
        commander: null,
        // ------------------------------------------
        board: [], graveyard: [], exile: [], command: [],
        library: library
    };

    // Assign IDs
    newPlayer.library.forEach(c => c.ownerId = newPlayer.id);

    setPlayers(prev => [...prev, newPlayer]);
    setLoading(false);
  };

  const summonCard = async (playerId: string, cardName: string) => {
      const data = await fetchCardData(cardName);
      const newCard: CardState = {
          ...data,
          instanceId: crypto.randomUUID(),
          ownerId: playerId,
          zone: 'battlefield',
          tapped: false,
          counters: 0,
          notes: "" 
      };
      
      setPlayers(prev => prev.map(p => 
          p.id === playerId ? { ...p, board: [...p.board, newCard] } : p
      ));
  };

  const createToken = async (playerId: string, tokenName: string, power?: string, toughness?: string) => {
    const data = await fetchCardData(tokenName); 
    const newToken: CardState = {
        ...data,
        instanceId: crypto.randomUUID(),
        ownerId: playerId,
        zone: 'battlefield',
        tapped: false,
        counters: 0,
        notes: "TOKEN",
        power: power || data.power || "",
        toughness: toughness || data.toughness || ""
    };
    
    setPlayers(prev => prev.map(p => 
        p.id === playerId ? { ...p, board: [...p.board, newToken] } : p
    ));
  };

  const toggleTap = (playerId: string, instanceId: string) => {
      setPlayers(prev => prev.map(p => 
          p.id === playerId ? {
              ...p, 
              board: p.board.map(c => c.instanceId === instanceId ? { ...c, tapped: !c.tapped } : c)
          } : p
      ));
  };

  const playFromLibrary = (playerId: string, cardId: string) => {
      setPlayers(prev => prev.map(p => {
          if (p.id !== playerId) return p;
          const card = p.library.find(c => c.instanceId === cardId);
          if (!card) return p;

          const newLib = p.library.filter(c => c.instanceId !== cardId);
          const playedCard = { ...card, zone: 'battlefield' as const };

          return { ...p, library: newLib, board: [...p.board, playedCard] };
      }));
  };

  const moveCard = (playerId: string, instanceId: string, toZone: 'graveyard' | 'exile' | 'hand' | 'battlefield') => {
      setPlayers(prev => prev.map(p => {
          if (p.id !== playerId) return p;

          const fromBoard = p.board.find(c => c.instanceId === instanceId);
          const fromGrave = p.graveyard.find(c => c.instanceId === instanceId);
          const fromExile = p.exile.find(c => c.instanceId === instanceId);
          
          const card = fromBoard || fromGrave || fromExile;
          if (!card) return p; 

          const newBoard = p.board.filter(c => c.instanceId !== instanceId);
          const newGrave = p.graveyard.filter(c => c.instanceId !== instanceId);
          const newExile = p.exile.filter(c => c.instanceId !== instanceId);

          const updatedCard = { ...card, zone: toZone, tapped: false };

          if (toZone === 'hand') {
              return { ...p, board: newBoard, graveyard: newGrave, exile: newExile, handSize: p.handSize + 1 };
          }
          
          const targetArray = toZone === 'battlefield' ? newBoard : toZone === 'graveyard' ? newGrave : newExile;
          
          return {
              ...p,
              board: toZone === 'battlefield' ? [...targetArray, updatedCard] : newBoard,
              graveyard: toZone === 'graveyard' ? [...targetArray, updatedCard] : newGrave,
              exile: toZone === 'exile' ? [...targetArray, updatedCard] : newExile,
          };
      }));
  };

  const modifyLife = (playerId: string, amount: number) => {
      setPlayers(prev => prev.map(p => p.id === playerId ? { ...p, life: p.life + amount } : p));
  };

  const modifyHandSize = (playerId: string, amount: number) => {
      setPlayers(prev => prev.map(p => p.id === playerId ? { ...p, handSize: Math.max(0, p.handSize + amount) } : p));
  };

  const modifyCounters = (playerId: string, instanceId: string, amount: number) => {
      setPlayers(prev => prev.map(p => p.id === playerId ? { ...p, board: p.board.map(c => c.instanceId === instanceId ? { ...c, counters: Math.max(0, c.counters + amount) } : c) } : p));
  };

  const modifyMana = (playerId: string, color: ManaColor, amount: number) => {
      setPlayers(prev => prev.map(p => {
          if (p.id !== playerId) return p;
          const newVal = Math.max(0, p.manaPool[color] + amount);
          return { 
              ...p, 
              manaPool: { ...p.manaPool, [color]: newVal } 
          };
      }));
  };

  const playCommander = (playerId: string) => {
      setPlayers(prev => prev.map(p => {
          if (p.id !== playerId || !p.commander) return p;
          const newCommanderCard = { ...p.commander, zone: 'battlefield' as const, tapped: false };
          return {
              ...p,
              commanderTax: p.commanderTax + 2,
              command: [],
              board: [...p.board, newCommanderCard]
          };
      }));
  };

  const returnCommanderToZone = (playerId: string) => {
      setPlayers(prev => prev.map(p => {
          if (p.id !== playerId || !p.commander) return p;
          const newBoard = p.board.filter(c => c.scryfallId !== p.commander?.scryfallId);
          const newGrave = p.graveyard.filter(c => c.scryfallId !== p.commander?.scryfallId);
          const newExile = p.exile.filter(c => c.scryfallId !== p.commander?.scryfallId);
          const resetCommander = { ...p.commander, zone: 'command' as const, tapped: false, counters: 0 };
          return {
              ...p,
              board: newBoard, graveyard: newGrave, exile: newExile,
              command: [resetCommander]
          };
      }));
  };

  const modifyCommanderDamage = (targetPlayerId: string, sourcePlayerId: string, amount: number) => {
      setPlayers(prev => prev.map(p => {
          if (p.id !== targetPlayerId) return p;
          const currentDmg = p.commanderDamage[sourcePlayerId] || 0;
          const newDmg = Math.max(0, currentDmg + amount);
          return {
              ...p,
              commanderDamage: { ...p.commanderDamage, [sourcePlayerId]: newDmg },
              life: p.life - amount
          };
      }));
  };

  const passTurn = () => {
      const nextIndex = (activePlayerIndex + 1) % players.length;
      setActivePlayerIndex(nextIndex);
      const nextPlayerId = players[nextIndex].id;
      setPhase("Untap");

      setPlayers(prev => prev.map(p => {
          const clearedMana = { W:0, U:0, B:0, R:0, G:0, C:0 };
          if (p.id !== nextPlayerId) return { ...p, manaPool: clearedMana };
          return {
              ...p,
              manaPool: clearedMana,
              board: p.board.map(c => ({ ...c, tapped: false })),
          };
      }));
  };

  useEffect(() => {
    if (players.length > 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(players));
    }
  }, [players]);

  // NEW: Reset Game (Clear Save)
  const resetGame = () => {
      if (confirm("Are you sure? This will delete the current game state.")) {
          localStorage.removeItem(STORAGE_KEY);
          setPlayers([]);
          setActivePlayerIndex(0);
          setPhase("Main 1");
      }
  };

  return { 
      players, addPlayer, summonCard, playFromLibrary, createToken, toggleTap, moveCard, 
      modifyLife, modifyHandSize, modifyCounters, modifyMana, 
      playCommander, returnCommanderToZone, modifyCommanderDamage, 
      activePlayerIndex, phase, setPhase, passTurn, resetGame,
      loading 
  };
};