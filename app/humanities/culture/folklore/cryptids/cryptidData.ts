export interface Cryptid {
  id: string;
  code: string;
  name: string;
  location: string;
  status: 'ACTIVE' | 'DORMANT' | 'CONTAINED' | 'UNKNOWN';
  dangerLevel: 1 | 2 | 3 | 4 | 5; // 5 is Critical
  frequency: number; // For the Tuner Widget
  description: string;
  image: string;
}

export const CRYPTID_DATA: Cryptid[] = [
  {
    id: 'mothman',
    code: 'CASE-1966-WV',
    name: 'Mothman',
    location: 'Point Pleasant, WV',
    status: 'UNKNOWN',
    dangerLevel: 4,
    frequency: 23.4,
    description: "Large, winged humanoid with glowing red eyes. Sightings often precede major infrastructure failures (See: Silver Bridge Collapse). Entity displays ability to fly at speeds exceeding 100mph without flapping wings. Do not approach light sources if sighted.",
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Mothman_Artist_Impression.png'
  },
  {
    id: 'bigfoot',
    code: 'CASE-1967-CA',
    name: 'Sasquatch',
    location: 'Pacific Northwest',
    status: 'ACTIVE',
    dangerLevel: 2,
    frequency: 89.1,
    description: "Bipedal North American Ape. Height: 7-9ft. Evidence includes dermal ridges on footprints consistent with primates but sized 2x human average. Generally elusive but territorial. High concentrations in the 'Emerald Triangle'.",
    image: 'https://upload.wikimedia.org/wikipedia/en/9/99/Patterson%E2%80%93Gimlin_film_frame_352.jpg'
  },
  {
    id: 'nessie',
    code: 'CASE-1933-UK',
    name: 'Nessie',
    location: 'Loch Ness, Scotland',
    status: 'DORMANT',
    dangerLevel: 1,
    frequency: 14.2,
    description: "Potential Plesiosaur survival. Sonar contacts indicate large biological mass at depth. Geological surveys suggest underground cavern systems connect the loch to the ocean, explaining intermittent sightings.",
    image: 'https://upload.wikimedia.org/wikipedia/en/7/79/Lochnessmonster.jpg'
  },
  {
    id: 'chupacabra',
    code: 'CASE-1995-PR',
    name: 'El Chupacabra',
    location: 'Puerto Rico / Mexico',
    status: 'ACTIVE',
    dangerLevel: 3,
    frequency: 66.6,
    description: "The 'Goat Sucker'. Reports vary between reptilian (Puerto Rico) and canid (Mexico) morphology. Distinctive puncture wounds found on livestock. Biological samples suggest mange-infested coyote or unknown chimera.",
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/86/Chupacabra_%28artist%27s_rendition%29.jpg'
  },
  {
    id: 'jersey_devil',
    code: 'CASE-1735-NJ',
    name: 'Jersey Devil',
    location: 'Pine Barrens, NJ',
    status: 'ACTIVE',
    dangerLevel: 4,
    frequency: 13.0,
    description: "Chimera entity: Horse head, bat wings, cloven hooves. Legend dates to the 18th century 'Leeds Family' curse. High-pitched screaming reported in dense forests. Unpredictable and highly aggressive.",
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Jersey_Devil_Philadelphia_Post_1909.jpg'
  },
  {
    id: 'mongolian_worm',
    code: 'CASE-1920-MN',
    name: 'Olgoi-Khorkhoi',
    location: 'Gobi Desert, Mongolia',
    status: 'UNKNOWN',
    dangerLevel: 5,
    frequency: 98.5,
    description: "The 'Intestine Worm'. Reportedly spits corrosive yellow acid and can discharge electric shocks capable of killing a camel. Operates underground. Extreme caution advised in southern Gobi regions.",
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Allghoi_Khorkhoi.jpg'
  },
  {
    id: 'wendigo',
    code: 'CASE-1800-NA',
    name: 'Wendigo',
    location: 'Great Lakes Region',
    status: 'CONTAINED',
    dangerLevel: 5,
    frequency: 44.4,
    description: "Malevolent spirit associated with cannibalism, greed, and winter. Physical manifestation involves emaciation and ash-grey skin. WARNING: Psychoreactive entity. Knowledge of the name may trigger manifestation.",
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Windigo_ice_sculpture_2.jpg/800px-Windigo_ice_sculpture_2.jpg'
  },
  {
    id: 'yeti',
    code: 'CASE-1951-NP',
    name: 'Yeti',
    location: 'Himalayas, Tibet',
    status: 'DORMANT',
    dangerLevel: 3,
    frequency: 105.2, // Off standard dial?
    description: "The 'Abominable Snowman'. Similar to Sasquatch but adapted for high-altitude survival. Famous 'Shipton Footprint' shows distinct toe structure. DNA samples from monasteries often match ancient polar bear subspecies.",
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Yeti_drawing.jpg'
  },
  {
    id: 'thunderbird',
    code: 'CASE-1890-AZ',
    name: 'Thunderbird',
    location: 'North America',
    status: 'ACTIVE',
    dangerLevel: 2,
    frequency: 77.7,
    description: "Avian entity with wingspan exceeding 20ft. Capable of creating sonic booms. Often sighted during severe storms. Historical records from indigenous tribes suggest creature has existed for millennia.",
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Thunderbird_mythology.jpg'
  }
];