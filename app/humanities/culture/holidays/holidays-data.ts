import { hr } from "framer-motion/client";
import { Snowflake, Heart, Trophy, Sprout, Sun, Flag, Ghost, Drumstick, Gift, Star, Flower } from "lucide-react";

export type Season = "WINTER" | "SPRING" | "SUMMER" | "AUTUMN" | "HALLOWEEN";

export const SEASONS: Record<Season, { color: string, bg: string, accent: string }> = {
    WINTER: { color: "text-cyan-300", bg: "from-cyan-950 to-slate-950", accent: "border-cyan-500" },
    SPRING: { color: "text-pink-300", bg: "from-pink-950 to-slate-950", accent: "border-pink-500" },
    SUMMER: { color: "text-yellow-300", bg: "from-yellow-950 to-slate-950", accent: "border-yellow-500" },
    AUTUMN: { color: "text-orange-300", bg: "from-orange-950 to-slate-950", accent: "border-orange-500" },
    //Holiday Seasons
    HALLOWEEN: { color: "text-orange-400", bg: "from-orange-950 to-black", accent: "border-orange-600" },
};

export const HOLIDAYS = [
  // WINTER
  {
    id: "nye",
    name: "New Year's Eve",
    date: "Dec 31 - Jan 1",
    season: "WINTER",
    icon: Star,
    desc: "The ball drop in Times Square. Champagne toasts, resolutions, and the global reset button.",
    imageQuery: "Times Square New Years Eve ball drop crowd",
    href: "/humanities/culture/holidays/new-years-eve"
  },
  {
    id: "mlk",
    name: "Martin Luther King Jr. Day",
    date: "3rd Mon of Jan",
    season: "WINTER",
    icon: Flag,
    desc: "Honoring the civil rights leader with marches, speeches, and community service.",
    imageQuery: "Martin Luther King Jr. march civil rights",
    href: "/humanities/culture/holidays/mlk-day"
  },
  {
    id: "superbowl",
    name: "The Super Bowl",
    date: "Early Feb",
    season: "WINTER",
    icon: Trophy,
    desc: "The de facto national holiday of television. Commercials, halftime shows, and casual gambling.",
    imageQuery: "Super Bowl",
    href: "/humanities/culture/holidays/super-bowl"
  },
  {
    id: "valentines",
    name: "Valentine's Day",
    date: "Feb 14",
    season: "WINTER",
    icon: Heart,
    desc: "A celebration of romance and commercialism. Red roses, chocolate boxes, and dinner reservations.",
    imageQuery: "Valentines day aesthetics roses chocolate",
    href: "/humanities/culture/holidays/valentines-day"
  },
  {
    id: "stpatricks",
    name: "St. Patrick's Day",
    date: "March 17",
    season: "WINTER",
    icon: Snowflake,
    desc: "All things green and Irish for a day. Parades, shamrocks, and plenty of Guinness.",
    imageQuery: "St Patricks Day parade green decorations celebration",
    href: "/humanities/culture/holidays/st-patricks-day"
  },

  // SPRING
  {
    id: "spring",
    name: "The First Day of Spring",
    date: "March 20/21",
    season: "SPRING",
    icon: Sprout,
    desc: "Blossoms, longer days, and the promise of warmer weather ahead.",
    imageQuery: "First day of spring blooming flowers sunny day",
    href: "/humanities/culture/holidays/first-day-of-spring"
  },
  {
    id: "easter",
    name: "Easter / Spring",
    date: "Late March/April",
    season: "SPRING",
    icon: Sprout,
    desc: "Pastel colors, egg hunts, and the symbolic awakening of the earth after winter.",
    imageQuery: "Easter egg hunt spring flowers aesthetics",
    href: "/humanities/culture/holidays/easter"
  },
  {
    id: "mothers",
    name: "Mother's Day",
    date: "2nd Sun of May",
    season: "SPRING",
    icon: Flower,
    desc: "Brunches, flowers, and heartfelt (or last-minute) gifts to honor moms everywhere.",
    imageQuery: "Mothers day brunch flowers gift",
    href: "/humanities/culture/holidays/mothers-day"
  },
  {
    id: "memorial",
    name: "Memorial Day",
    date: "Last Mon of May",
    season: "SPRING",
    icon: Flag,
    desc: "The unofficial start of summer. Barbecues, pool openings, and remembrance.",
    imageQuery: "Memorial day barbecue american flag picnic",
    href: "/humanities/culture/holidays/memorial-day"
  },
  {
    id: "junepride",
    name: "Pride Month",
    date: "June",
    season: "SPRING",
    icon: Star,
    desc: "Celebrating LGBTQ+ culture, history, and rights with parades, parties, and activism.",
    imageQuery: "Pride month parade rainbow flags celebration",
    href: "/humanities/culture/holidays/pride-month"
  },
  {
    id: "fathers",
    name: "Father's Day",
    date: "3rd Sun of June",
    season: "SPRING",
    icon: Trophy,
    desc: "Grilling, gadgets, and the occasional tie. A day to appreciate dads and father figures.",
    imageQuery: "Fathers day barbecue grilling celebration",
    href: "/humanities/culture/holidays/fathers-day"
  },
  {
    id: "juneteenth",
    name: "Juneteenth",
    date: "June 19",
    season: "SPRING",
    icon: Heart,
    desc: "Commemorating the emancipation of enslaved African Americans in the United States.",
    imageQuery: "Juneteenth celebration african american culture",
    href: "/humanities/culture/holidays/juneteenth"
  },
  

  // SUMMER
  {
    id: "summer",
    name: "The First Day of Summer",
    date: "June 20/21",
    season: "SUMMER",
    icon: Sun,
    desc: "Long days, beach trips, and the official start of the sunny season.",
    imageQuery: "First day of summer beach sunny day",
    href: "/humanities/culture/holidays/first-day-of-summer"
  },
  {
    id: "july4",
    name: "Independence Day",
    date: "July 4",
    season: "SUMMER",
    icon: Sun,
    desc: "Fireworks, hot dogs, and peak Americana. The height of the summer season.",
    imageQuery: "Fourth of July fireworks night sky",
    href: "/humanities/culture/holidays/independence-day"
  },
  {
    id: "laborday",
    name: "Labor Day",
    date: "1st Mon of Sept",
    season: "SUMMER",
    icon: Flag,
    desc: "Marking the end of summer with barbecues, parades, and a nod to workers' rights.",
    imageQuery: "Labor Day barbecue parade celebration",
    href: "/humanities/culture/holidays/labor-day"
  },
  {
    id: "backtoschool",
    name: "Back to School",
    date: "Late Aug/Early Sept",
    season: "SUMMER",
    icon: Star,
    desc: "Shopping for supplies, new clothes, and the bittersweet end of summer vacation.",
    imageQuery: "Back to school shopping supplies new clothes",
    href: "/humanities/culture/holidays/back-to-school"
  },
  // AUTUMN
  {
    id: "autumn",
    name: "The First Day of Autumn",
    date: "Sept 22/23",
    season: "AUTUMN",
    icon: Sprout,
    desc: "Crisp air, falling leaves, and the start of sweater weather.",
    imageQuery: "First day of autumn fall leaves crisp air",
    href: "/humanities/culture/holidays/first-day-of-autumn"
  },
  {
    id: "indigenous",
    name: "Indigenous Peoples' Day",
    date: "2nd Mon of Oct",
    season: "AUTUMN",
    icon: Sprout,
    desc: "Honoring Native American history and culture as an alternative to Columbus Day.",
    imageQuery: "Indigenous Peoples Day celebration cultural event",
    href: "/humanities/culture/holidays/indigenous-peoples-day",
  },
  {
    id: "halloween",
    name: "Halloween",
    date: "Oct 31",
    season: "AUTUMN",
    icon: Ghost,
    desc: "The spookiest night of the year. Costumes, candy corn, and the thinning of the veil.",
    imageQuery: "Halloween jack o lanterns spooky atmosphere",
    href: "/humanities/culture/holidays/halloween"
  },
  {
    id: "thanksgiving",
    name: "Thanksgiving",
    date: "4th Thurs of Nov",
    season: "AUTUMN",
    icon: Drumstick,
    desc: "Feasting, football, and family tension. The Macy's Parade and the prelude to shopping madness.",
    imageQuery: "Thanksgiving dinner table turkey feast",
    href: "/humanities/culture/holidays/thanksgiving"
  },
  {
    id: "blackfriday",
    name: "Black Friday",
    date: "Day after Thanksgiving",
    season: "AUTUMN",
    icon: Star,
    desc: "The retail frenzy kicks off the holiday shopping season with doorbusters and long lines.",
    imageQuery: "Black Friday shopping crowd store deals",
    href: "/humanities/culture/holidays/black-friday"
  },
  {
    id: "winter",
    name: "The First Day of Winter",
    date: "Dec 21/22",
    season: "WINTER",
    icon: Snowflake,
    desc: "The shortest day of the year. Cozy fires, early nights, and the official start of winter.",
    imageQuery: "First day of winter snowy landscape cozy fire",
    href: "/humanities/culture/holidays/first-day-of-winter"
  },
  {
    id: "christmas",
    name: "The Holiday Season",
    date: "December",
    season: "WINTER",
    icon: Gift, // Looping back to Winter for the visual cycle, though visually distinct
    desc: "Lights, trees, and gift-giving. A month-long cultural phenomenon encompassing Xmas, Hanukkah, and Kwanzaa.",
    imageQuery: "Christmas lights snowy street scene",
    href: "/humanities/culture/holidays/christmas"
  },
  {
    id: "newyears",
    name: "New Year's Eve",
    date: "Dec 31 - Jan 1",
    season: "WINTER",
    icon: Flag,
    desc: "Ringing in the new year with celebrations, resolutions, and fireworks.",
    imageQuery: "New Year's Eve fireworks celebration",
    href: "/humanities/culture/holidays/new-years-eve"
  }
];