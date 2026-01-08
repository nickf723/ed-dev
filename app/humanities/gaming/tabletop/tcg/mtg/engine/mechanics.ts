import { CardState } from './types';

const KEYWORDS = [
  { tag: "RAMP", regex: /add \{|search your library for a (basic )?land/i },  { tag: "DRAW", regex: /draw \w+ card/i },
  { tag: "REMOVAL", regex: /destroy|exile|deal \d+ damage to any target/i },
  { tag: "WIPE", regex: /destroy all|exile all|each creature/i },
  { tag: "TUTOR", regex: /search your library for a card/i },
  { tag: "COUNTER", regex: /counter target spell/i },
  { tag: "TOKEN", regex: /create (a|\d+) .+ token/i },
  { tag: "FLYING", regex: /\bFlying\b/i },
  { tag: "VIGILANCE", regex: /\bVigilance\b/i },
  { tag: "TRAMPLE", regex: /\bTrample\b/i },
  { tag: "HASTE", regex: /\bHaste\b/i },
  { tag: "DEATHTOUCH", regex: /\bDeathtouch\b/i },
  { tag: "LIFELINK", regex: /\bLifelink\b/i },
];

export function analyzeMechanics(card: CardState): string[] {
  const tags: Set<string> = new Set();
  const text = (card.oracleText || "") + " " + (card.typeLine || "");

  KEYWORDS.forEach(m => {
    if (m.regex.test(text)) {
      tags.add(m.tag);
    }
  });

  // Role Logic
  if (card.typeLine?.includes("Land")) tags.add("LAND");
  if (card.typeLine?.includes("Commander") || card.typeLine?.includes("Legendary Creature")) tags.add("LEGEND");
  if (card.typeLine?.includes("Artifact") && text.includes("Add {")) tags.add("ROCK"); // Mana Rock

  return Array.from(tags);
}