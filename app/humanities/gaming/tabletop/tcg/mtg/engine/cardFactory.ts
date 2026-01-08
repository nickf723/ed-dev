// app/humanities/gaming/tabletop/tcg/mtg/engine/cardFactory.ts
import { ScryfallData, CardState } from "./types";

export function createCardInstance(data: ScryfallData, ownerId: string): CardState {
    
    // Logic Heuristics
    const text = (data.oracleText || "").toLowerCase();
    const type = (data.typeLine || "").toLowerCase();
    
    const isLand = type.includes("land");
    const isCreature = type.includes("creature");
    const isArtifact = type.includes("artifact");
    const isInstant = type.includes("instant");
    const hasFlash = data.keywords.includes("Flash");

    // "Interaction" = Destroys, Exiles, or Counters
    const isInteraction = text.includes("destroy") || text.includes("exile") || text.includes("counter target");
    
    // "Ramp" = Adds mana or searches land (and isn't a land itself)
    const producesMana = data.produced_mana && data.produced_mana.length > 0;
    const searchesLand = text.includes("search your library") && text.includes("land");
    const isRamp = !isLand && (producesMana || searchesLand);

    return {
        ...data,
        instanceId: crypto.randomUUID(),
        ownerId,
        zone: 'library', // Default start
        tapped: false,
        counters: 0,
        notes: "", // Initialize empty
        
        mechanics: {
            isInstantSpeed: isInstant || hasFlash,
            isLand,
            isCreature,
            isArtifact,
            isInteraction,
            isRamp: !!isRamp
        }
    };
}