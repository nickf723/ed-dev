import { APIReference } from "./useDnD";

// We mimic the API structure so the app treats them the same
export const CUSTOM_RACES: APIReference[] = [
  {
    index: "owlin",
    name: "Owlin",
    url: "/custom/owlin" // Internal marker
  },
  {
    index: "leonin",
    name: "Leonin",
    url: "/custom/leonin"
  },
  {
    index: "warforged",
    name: "Warforged",
    url: "/custom/warforged"
  }
];

// Detail definitions for when we "fetch" a custom race
export const CUSTOM_RACE_DETAILS: Record<string, any> = {
  "owlin": {
    index: "owlin",
    name: "Owlin",
    speed: 30,
    alignment: "Tend toward neutral or good.",
    age: "Mature at the same rate as humans.",
    size: "Medium or Small",
    language_desc: "You can speak, read, and write Common and one other language.",
    traits: [
      { name: "Darkvision (120ft)" },
      { name: "Flight (Silent Feathers)" },
      { name: "Magic Sight" }
    ]
  }
};