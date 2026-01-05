// Define the valid keys strictly
export type ManaColor = 'W' | 'U' | 'B' | 'R' | 'G' | 'C';

export interface ScryfallData {
  scryfallId: string;
  name: string;
  manaCost?: string;
  typeLine?: string;
  oracleText?: string;
  power?: string;
  toughness?: string;
  imageUrl: string | null;
  colors?: string[];
}

export interface CardState extends ScryfallData {
  instanceId: string;
  ownerId: string;
  zone: 'battlefield' | 'graveyard' | 'exile' | 'hand' | 'library' | 'command';
  tapped: boolean;
  counters: number;
  notes?: string;
}

export interface PlayerState {
  id: string;
  name: string;
  life: number;
  poison: number;
  handSize: number;
  
  // COMMANDER SPECIFIC
  commanderTax: number; 
  commanderDamage: { [sourcePlayerId: string]: number };
  
  // Strict Mana Pool Type
  manaPool: Record<ManaColor, number>;

  // ZONES
  library: CardState[];
  board: CardState[];
  graveyard: CardState[];
  exile: CardState[];
  command: CardState[];
  commander: CardState | null;
}