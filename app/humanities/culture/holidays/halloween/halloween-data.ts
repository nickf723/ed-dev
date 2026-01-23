// Map Wikipedia Titles -> Spooky Stats
export const MONSTER_META: Record<string, { origin: string, type: string, weakness: string, quote: string }> = {
    "Count Dracula": { 
        origin: "Transylvania (Bram Stoker)", 
        type: "Vampire Lord", 
        weakness: "Sunlight, Wooden Stakes, Garlic",
        quote: "Listen to them, the children of the night. What music they make!"
    },
    "Frankenstein's monster": { 
        origin: "Ingolstadt (Mary Shelley)", 
        type: "Reanimated Construct", 
        weakness: "Fire, Psychological Trauma",
        quote: "I ought to be thy Adam, but I am rather the fallen angel."
    },
    "Werewolf": { 
        origin: "Global Folklore", 
        type: "Lycanthrope", 
        weakness: "Silver Bullets, Wolfsbane",
        quote: "Even a man who is pure in heart may become a wolf when the wolfbane blooms."
    },
    "Mummy (undead)": { 
        origin: "Ancient Egypt", 
        type: "Cursed Undead", 
        weakness: "Fire, Cats, The Book of Amun-Ra",
        quote: "Death is but the doorway to new life."
    },
    "Headless Horseman": { 
        origin: "Sleepy Hollow (Washington Irving)", 
        type: "Vengeful Spirit", 
        weakness: "Running Water, Sunrise",
        quote: "They say he rides forth nightly in quest of his head."
    },
    "Stingy Jack": { 
        origin: "Irish Folklore", 
        type: "Wandering Soul", 
        weakness: "Barred from Heaven & Hell",
        quote: "A coal to light his way in the eternal darkness."
    },
    "Gill-man": { 
        origin: "The Black Lagoon", 
        type: "Prehistoric Amphibian", 
        weakness: "Rotenone, Dry Environments",
        quote: "We've just discovered a living fossil."
    },
    "Zombie": { 
        origin: "Haitian Folklore / Romero", 
        type: "Reanimated Corpse", 
        weakness: "Head Trauma",
        quote: "When there is no more room in hell, the dead will walk the earth."
    },
    "Witch": { 
        origin: "Historical / Folklore", 
        type: "Magic User", 
        weakness: "Iron, Salt, Purification",
        quote: "Double, double toil and trouble; Fire burn and caldron bubble."
    },
    "Ghost": { 
        origin: "Universal", 
        type: "Spectral Entity", 
        weakness: "Salt, Iron, Exorcism",
        quote: "I am thy father's spirit, doomed for a certain term to walk the night."
    }
};