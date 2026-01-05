import { CardState } from './types';

const MECHANICS = [
  { tag: "RAMP", regex: /search your library for a (basic )?land|add \{/i },
  { tag: "DRAW", regex: /draw \w+ card/i },
  { tag: "REMOVAL", regex: /destroy|exile|deal \d+ damage to any target/i },
  { tag: "WIPE", regex: /destroy all|exile all|each creature/i },
  { tag: "TUTOR", regex: /search your library for a card/i },
  { tag: "COUNTER", regex: /counter target spell/i },
  { tag: "TOKEN", regex: /create (a|\d+) .+ token/i },
  { tag: "FLYING", regex: /\bflying\b/i },
];

export function analyzeMechanics(card: CardState): string[] {
  const tags: string[] = [];
  if (!card.oracleText) return tags;

  MECHANICS.forEach(m => {
    if (m.regex.test(card.oracleText || "")) {
      tags.push(m.tag);
    }
  });

  if (card.typeLine?.includes("Land")) tags.push("LAND");
  if (card.typeLine?.includes("Commander") || card.typeLine?.includes("Legendary Creature")) tags.push("LEGEND");

  return tags;
}