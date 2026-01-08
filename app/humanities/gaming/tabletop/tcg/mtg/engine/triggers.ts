import { CardState, PlayerState } from "./types";

export type TriggerType = 'ETB' | 'DEATH' | 'UPKEEP' | 'SPELL_CAST';

export interface GameEvent {
    type: TriggerType;
    sourceCard?: CardState;
    playerID: string;
}

// Simple Regex patterns for common triggers
const PATTERNS = [
    { type: 'ETB', regex: /whenever another creature enters/i, effect: 'LIFE_GAIN' },
    { type: 'DEATH', regex: /whenever a creature dies/i, effect: 'DRAIN_1' },
    // We can add more complex ones later!
];

export function checkTriggers(event: GameEvent, players: PlayerState[]): string[] {
    const logs: string[] = [];

    // Scan EVERY card on the battlefield for a reaction
    players.forEach(p => {
        p.board.forEach(card => {
            if (!card.oracleText) return;

            // 1. Soul Warden Logic (ETB Life Gain)
            if (event.type === 'ETB' && card.oracleText.match(/whenever another creature enters/i)) {
                if (card.oracleText.includes("gain 1 life")) {
                    logs.push(`TRIGGER: ${card.name} (Gain 1 Life)`);
                    // In a full implementation, we would queue an automatic state update here.
                    // For now, we return logs to show the user "Hey, don't forget this!"
                }
            }

            // 2. Blood Artist Logic (Death Drain)
            if (event.type === 'DEATH' && card.oracleText.match(/whenever a creature dies/i)) {
                 logs.push(`TRIGGER: ${card.name} (Drain 1 Life)`);
            }
        });
    });

    return logs;
}