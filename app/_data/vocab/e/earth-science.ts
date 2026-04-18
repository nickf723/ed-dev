import { VocabTerm } from '../_registry';

export const earthScienceVocab: VocabTerm[] = [
    {
        id: "earth-lithosphere",
        word: "Lithosphere",
        definition: "The rigid outer part of the earth, consisting of the crust and upper mantle.",
        domain: "Earth Science",
        tags: ["Geology", "Planetary Structure"],
        relatedTerms: ["earth-subduction"],
        isAdult: false
    },
    {
        id: "earth-subduction",
        word: "Subduction",
        definition: "A geological process that takes place at convergent boundaries of tectonic plates where one plate moves under another and is forced to sink due to high gravitational potential energy into the mantle.",
        domain: "Earth Science",
        tags: ["Geology", "Tectonics"],
        relatedTerms: ["earth-lithosphere"],
        isAdult: false
    },
    {
        id: "earth-albedo",
        word: "Albedo",
        definition: "The proportion of the incident light or radiation that is reflected by a surface, typically that of a planet or moon. Ice has a high albedo, while oceans have a low albedo.",
        domain: "Earth Science",
        tags: ["Climate Science", "Thermodynamics"],
        isAdult: false
    },
    {
        id: "earth-troposphere",
        word: "Troposphere",
        definition: "The lowest region of the atmosphere, extending from the earth's surface to a height of about 6–10 km, which is the lower boundary of the stratosphere. Almost all weather occurs here.",
        domain: "Earth Science",
        tags: ["Meteorology", "Atmosphere"],
        isAdult: false
    }
];