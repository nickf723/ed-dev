// app/humanities/gaming/tabletop/tcg/mtg/engine/types.ts

export type ManaColor = 'W' | 'U' | 'B' | 'R' | 'G' | 'C';

// 1. Raw API Data
export interface ScryfallData {
  scryfallId: string;
  name: string;
  manaCost?: string;
  cmc: number;
  typeLine: string;
  oracleText?: string;
  power?: string;
  toughness?: string;
  imageUrl: string | null;
  colors?: string[];
  
  // New Fields from API
  keywords: string[]; // e.g. ["Flying", "Haste"]
  produced_mana?: string[];
  is_legendary: boolean;
}

// 2. Engine Card State
export interface CardState extends ScryfallData {
  instanceId: string;
  ownerId: string;
  zone: 'battlefield' | 'graveyard' | 'exile' | 'hand' | 'library' | 'command';
  tapped: boolean;
  counters: number;
  
  // RESTORED: For manual tags like "Token" or "Commander"
  notes?: string; 

  // NEW: Abstracted Logic Flags
  mechanics: {
      isInstantSpeed: boolean;
      isLand: boolean;
      isCreature: boolean;
      isArtifact: boolean;
      isInteraction: boolean;
      isRamp: boolean;
  }
}

export interface PlayerState {
  id: string;
  name: string;
  life: number;
  poison: number;
  handSize: number;
  
  commanderTax: number; 
  commanderDamage: { [sourcePlayerId: string]: number };
  manaPool: Record<ManaColor, number>;

  library: CardState[];
  board: CardState[];
  graveyard: CardState[];
  exile: CardState[];
  command: CardState[];
  commander: CardState | null;
  hand: CardState[];
  // Optional: Monarch/Initiative tracking
  isMonarch?: boolean;
}