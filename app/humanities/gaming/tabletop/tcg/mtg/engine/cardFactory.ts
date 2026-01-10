import { ScryfallData, CardState, CardAbility } from "./types";

export function createCardInstance(data: ScryfallData, ownerId: string): CardState {
    const text = (data.oracleText || "").toLowerCase();
    const type = (data.typeLine || "").toLowerCase();
    
    // LOGIC FLAGS
    const isLand = type.includes("land");
    const isCreature = type.includes("creature");
    const isArtifact = type.includes("artifact");
    const isInstant = type.includes("instant");
    const hasFlash = data.keywords.includes("Flash");
    const isInteraction = text.includes("destroy") || text.includes("exile") || text.includes("counter target");
    const producesMana = data.produced_mana && data.produced_mana.length > 0;
    const searchesLand = text.includes("search your library") && text.includes("land");
    
    // DEFINE ABILITIES
    const abilities: CardAbility[] = [];

    // --- HARDCODED ABILITY MAPPING ---
    if (data.name.includes("Lathril, Blade of the Elves")) {
        abilities.push({
            id: `lathril-1-${crypto.randomUUID()}`, 
            type: "TRIGGERED", 
            text: "Combat Dmg -> Create Elves", 
            effectId: "LATHRIL_CREATE_TOKENS"
        });
        abilities.push({
            id: `lathril-2-${crypto.randomUUID()}`, 
            type: "ACTIVATED", 
            cost: "{T}, Tap 10 Elves", 
            text: "Drain 10 Life", 
            effectId: "LATHRIL_DRAIN"
        });
    }

    if (data.name.includes("Urza, Lord High Artificer")) {
        abilities.push({
            id: `urza-1-${crypto.randomUUID()}`, 
            type: "TRIGGERED",
            text: "ETB -> Create Construct",
            effectId: "URZA_TOKEN"
        });
    }

    if (data.name.includes("The Scarab God")) {
        abilities.push({
            id: `scarab-1-${crypto.randomUUID()}`, 
            type: "TRIGGERED",
            text: "Upkeep -> Drain X",
            effectId: "SCARAB_DRAIN"
        });
    }

    if (data.name === "Sol Ring") {
        abilities.push({
            id: `sol-ring-${crypto.randomUUID()}`, 
            type: "ACTIVATED", 
            cost: "{T}",
            text: "Add {C}{C}",
            effectId: "SOL_RING_MANA"
        });
    }

    return {
        ...data,
        instanceId: crypto.randomUUID(),
        ownerId,
        zone: 'library',
        tapped: false,
        counters: 0,
        notes: "",
        abilities: abilities, // Attach abilities
        mechanics: {
            isInstantSpeed: isInstant || hasFlash,
            isLand,
            isCreature,
            isArtifact,
            isInteraction,
            isRamp: !!(!isLand && (producesMana || searchesLand))
        }
    };
}