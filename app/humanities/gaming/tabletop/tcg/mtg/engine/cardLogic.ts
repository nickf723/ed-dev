import { PlayerState, CardState } from "./types";

type EffectFunction = (
    players: PlayerState[], 
    sourcePlayerId: string, 
    sourceCardId: string, 
    targetId?: string
) => PlayerState[];

export const CARD_LOGIC: Record<string, EffectFunction> = {
    
    // --- LATHRIL: Create Tokens ---
    "LATHRIL_CREATE_TOKENS": (players, pid, cid) => {
        return players.map(p => {
            if (p.id !== pid) return p;
            
            // 1. Find Lathril to check power
            const card = p.board.find(c => c.instanceId === cid);
            const amount = card ? parseInt(card.power || "2") : 2;
            
            // 2. Create strict CardState tokens
            const tokens: CardState[] = Array(amount).fill(null).map(() => ({
                instanceId: crypto.randomUUID(),
                name: "Elf Warrior",
                typeLine: "Token Creature — Elf Warrior",
                power: "1",
                toughness: "1",
                ownerId: pid,
                zone: 'battlefield' as const,
                tapped: false,
                counters: 0,
                // MISSING FIELDS FIXED HERE:
                cmc: 0,
                keywords: [],
                produced_mana: [],
                is_legendary: false,
                mechanics: { isCreature: true, isLand: false, isArtifact: false, isInstantSpeed: false, isInteraction: false, isRamp: false },
                abilities: [],
                scryfallId: "token-elf-" + crypto.randomUUID(),
                imageUrl: "https://cards.scryfall.io/large/front/4/5/45f94d24-3435-4299-a299-6e3e1dfb9e73.jpg"
            }));

            return { ...p, board: [...p.board, ...tokens] };
        });
    },
    
    // --- LATHRIL: Drain Life ---
    "LATHRIL_DRAIN": (players, pid) => {
        return players.map(p => {
            if (p.id === pid) return { ...p, life: p.life + 10 }; 
            return { ...p, life: p.life - 10 }; 
        });
    },

    // --- URZA: Create Construct ---
    "URZA_TOKEN": (players, pid) => {
        const token: CardState = {
            instanceId: crypto.randomUUID(),
            name: "Construct",
            typeLine: "Token Artifact Creature — Construct",
            power: "0", 
            toughness: "0",
            ownerId: pid,
            zone: 'battlefield' as const,
            tapped: false,
            counters: 0,
            // MISSING FIELDS FIXED:
            cmc: 0,
            keywords: [],
            produced_mana: [],
            is_legendary: false,
            mechanics: { isCreature: true, isLand: false, isArtifact: true, isInstantSpeed: false, isInteraction: false, isRamp: false },
            abilities: [],
            scryfallId: "token-construct-" + crypto.randomUUID(),
            imageUrl: "https://cards.scryfall.io/large/front/2/d/2d22a8c3-4409-409e-994f-8a623a886d06.jpg" 
        };
        return players.map(p => p.id === pid ? { ...p, board: [...p.board, token] } : p);
    },

    // --- SCARAB GOD: Scry/Drain ---
    "SCARAB_DRAIN": (players, pid) => {
        const player = players.find(p => p.id === pid);
        if (!player) return players;
        const zombies = player.board.filter(c => c.typeLine.toLowerCase().includes("zombie") || c.name.includes("Zombie")).length;
        
        return players.map(p => {
            if (p.id === pid) return p; 
            return { ...p, life: p.life - zombies };
        });
    },

    // --- SOL RING ---
    "SOL_RING_MANA": (players, pid) => {
        return players.map(p => {
            if (p.id !== pid) return p;
            return { ...p, manaPool: { ...p.manaPool, C: p.manaPool.C + 2 } };
        });
    }
};