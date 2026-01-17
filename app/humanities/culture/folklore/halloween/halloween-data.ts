import { Flame, Skull, Moon, Scroll, Ghost, Bird, Cat, Sword } from "lucide-react";

export type GrimoireTab = 'ORIGINS' | 'BESTIARY' | 'RITUALS';

export const GRIMOIRE_CONFIG = {
  ORIGINS: { label: 'The Ancient Roots', icon: Flame, color: 'text-orange-500' },
  BESTIARY: { label: 'Liber Monstrorum', icon: Skull, color: 'text-red-500' },
  RITUALS: { label: 'Rites & Traditions', icon: Scroll, color: 'text-purple-500' },
};

// Static Content for non-API tabs
export const STATIC_PAGES = {
  ORIGINS: {
    title: "Samhain: The Thin Veil",
    Subtitle: "31 October – 1 November",
    content: [
      "Before it was All Hallows' Eve, it was Samhain (pronounced SOW-in), the Celtic festival marking the end of the harvest and the beginning of the 'dark half' of the year.",
      "It was believed that during this liminal time, the boundary between this world and the Otherworld could more easily be crossed. The Aos Sí (spirits and fairies) needed to be propitiated to ensure the people and their livestock survived the winter.",
      "Great bonfires were lit, and the bones of slaughtered livestock were cast into the flames. Domestic fires were extinguished and re-lit from the sacred bonfire, symbolizing communal bonding."
    ]
  },
  RITUALS: {
    title: "Protection & Divination",
    Subtitle: "Customs of the Night",
    content: [
      "**Guising (Trick-or-Treating):** Going door-to-door in disguise has roots in mumming and souling. By dressing as the spirits they feared, people believed they could blend in and avoid being targetted.",
      "**Jack-o'-Lanterns:** Originally carved from turnips, these lanterns represent wandering spirits or were used to ward them off. The name comes from the folklore of 'Stingy Jack', a man who tricked the Devil and was doomed to roam the earth with only a burning coal inside a carved turnip to light his way.",
      "**Divination:** Apple bobbing was a form of marriage divination. The first person to bite an apple would be the next to marry. Mirror gazing was another darker tradition, where one hoped to see their future spouse in the reflection behind them—or a skull, indicating death before marriage."
    ]
  }
};

// Targets for the API to fetch
export const MONSTER_QUERY_LIST = [
  { id: 'vampire', query: 'Vampire', icon: Bird, label: 'The Sanguine Lords' },
  { id: 'werewolf', query: 'Werewolf', icon: Moon, label: 'The Lycanthropes' },
  { id: 'ghost', query: 'Ghost', icon: Ghost, label: 'Spectral Entities' },
  { id: 'witch', query: 'Witchcraft', icon: Cat, label: 'Practitioners of the Craft' },
  { id: 'demon', query: 'Demon', icon: Skull, label: 'Infernal Beings' },
  { id: 'dulahan', query: 'Dullahan', icon: Sword, label: 'The Headless Horseman' },
];