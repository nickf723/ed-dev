import type { VocabTerm } from "../types";

export const earthScienceVocab: VocabTerm[] = [
  {
    id: "earth-system",
    word: "Earth System",
    definition:
      "Earth understood as interacting physical, chemical, and biological reservoirs and processes that exchange matter and energy across space and time.",
    domain: "Earth Science",
    tags: ["Systems", "Planet"],
    relatedTerms: ["earth-reservoir", "earth-flux", "earth-feedback"],
    isAdult: false,
  },
  {
    id: "earth-geosphere",
    word: "Geosphere",
    definition:
      "The solid portions of Earth, including the core, mantle, crust, rocks, sediments, soils, and landforms.",
    domain: "Earth Science",
    tags: ["Geology", "Earth System"],
    relatedTerms: ["earth-lithosphere", "earth-rock-cycle"],
    isAdult: false,
  },
  {
    id: "earth-atmosphere",
    word: "Atmosphere",
    definition:
      "The envelope of gases surrounding Earth, structured into layers and continually exchanging energy, moisture, particles, and trace gases with other Earth-system reservoirs.",
    domain: "Earth Science",
    tags: ["Meteorology", "Earth System"],
    relatedTerms: ["earth-troposphere", "earth-weather", "earth-climate"],
    isAdult: false,
  },
  {
    id: "earth-hydrosphere",
    word: "Hydrosphere",
    definition:
      "Earth's water in oceans, rivers, lakes, groundwater, soils, organisms, and other liquid reservoirs, often considered together with vapor and ice in the full water cycle.",
    domain: "Earth Science",
    tags: ["Hydrology", "Earth System"],
    relatedTerms: ["earth-cryosphere", "earth-water-budget"],
    isAdult: false,
  },
  {
    id: "earth-cryosphere",
    word: "Cryosphere",
    definition:
      "The parts of the Earth system where water is frozen, including seasonal snow, glaciers, ice sheets, sea ice, lake and river ice, and permafrost.",
    domain: "Earth Science",
    tags: ["Ice", "Earth System"],
    relatedTerms: ["earth-hydrosphere", "earth-albedo", "earth-climate"],
    isAdult: false,
  },
  {
    id: "earth-biosphere",
    word: "Biosphere",
    definition:
      "Living organisms and the regions of Earth they inhabit, considered as participants in exchanges of water, carbon, nutrients, energy, and material.",
    domain: "Earth Science",
    tags: ["Life", "Earth System"],
    relatedTerms: ["earth-system", "earth-evapotranspiration"],
    isAdult: false,
  },
  {
    id: "earth-reservoir",
    word: "Reservoir",
    definition:
      "A defined location or component in which matter or energy is stored for some interval, such as an ocean, aquifer, glacier, soil layer, or atmospheric pool.",
    domain: "Earth Science",
    tags: ["Systems", "Storage"],
    relatedTerms: ["earth-flux", "earth-water-budget"],
    isAdult: false,
  },
  {
    id: "earth-flux",
    word: "Flux",
    definition:
      "The rate at which matter or energy crosses a stated boundary, expressed with a direction, quantity, area or system extent, and time interval.",
    domain: "Earth Science",
    tags: ["Systems", "Rate"],
    relatedTerms: ["earth-reservoir", "earth-water-budget"],
    isAdult: false,
  },
  {
    id: "earth-feedback",
    word: "Feedback",
    definition:
      "A process in which a system response alters the driver or process that produced it, amplifying or damping subsequent change.",
    domain: "Earth Science",
    tags: ["Systems", "Response"],
    relatedTerms: ["earth-forcing", "earth-albedo"],
    isAdult: false,
  },
  {
    id: "earth-forcing",
    word: "Forcing",
    definition:
      "An imposed influence that changes a system's energy or material balance and can produce a response, with the exact definition depending on the model and field.",
    domain: "Earth Science",
    tags: ["Systems", "Climate"],
    relatedTerms: ["earth-feedback", "earth-climate"],
    isAdult: false,
  },
  {
    id: "earth-watershed",
    word: "Watershed",
    definition:
      "A land area defined by topography and drainage through which surface water flows toward a shared outlet, while groundwater boundaries may differ.",
    domain: "Earth Science",
    tags: ["Hydrology", "Boundary"],
    relatedTerms: ["earth-water-budget", "earth-runoff"],
    isAdult: false,
  },
  {
    id: "earth-weathering",
    word: "Weathering",
    definition:
      "Physical, chemical, and biological alteration or breakdown of rock and minerals at or near Earth's surface without requiring transport away from the site.",
    domain: "Earth Science",
    tags: ["Geology", "Surface Process"],
    relatedTerms: ["earth-erosion", "earth-deposition"],
    isAdult: false,
  },
  {
    id: "earth-erosion",
    word: "Erosion",
    definition:
      "The removal and transport of soil, sediment, or rock by water, ice, wind, waves, gravity, or other agents.",
    domain: "Earth Science",
    tags: ["Geomorphology", "Transport"],
    relatedTerms: ["earth-weathering", "earth-deposition"],
    isAdult: false,
  },
  {
    id: "earth-deposition",
    word: "Deposition",
    definition:
      "The accumulation of transported sediment or precipitated material when transport or chemical conditions favor settling or formation.",
    domain: "Earth Science",
    tags: ["Geomorphology", "Sediment"],
    relatedTerms: ["earth-erosion", "earth-weathering"],
    isAdult: false,
  },
  {
    id: "earth-lithosphere",
    word: "Lithosphere",
    definition:
      "Earth's rigid outer mechanical layer, consisting of the crust and the uppermost mantle and divided into moving tectonic plates.",
    domain: "Earth Science",
    tags: ["Geology", "Planetary Structure"],
    relatedTerms: ["earth-tectonic-plate", "earth-subduction"],
    isAdult: false,
  },
  {
    id: "earth-tectonic-plate",
    word: "Tectonic Plate",
    definition:
      "A coherent region of lithosphere that moves relative to other plates over the weaker asthenosphere and interacts along plate boundaries.",
    domain: "Earth Science",
    tags: ["Geology", "Tectonics"],
    relatedTerms: ["earth-lithosphere", "earth-subduction"],
    isAdult: false,
  },
  {
    id: "earth-subduction",
    word: "Subduction",
    definition:
      "The descent of one tectonic plate beneath another into the mantle at a convergent boundary, commonly involving oceanic lithosphere.",
    domain: "Earth Science",
    tags: ["Geology", "Tectonics"],
    relatedTerms: ["earth-lithosphere", "earth-tectonic-plate"],
    isAdult: false,
  },
  {
    id: "earth-rock-cycle",
    word: "Rock Cycle",
    definition:
      "A network of processes through which rocks form and transform among igneous, sedimentary, and metamorphic states through melting, cooling, weathering, burial, deformation, and uplift.",
    domain: "Earth Science",
    tags: ["Geology", "Material Cycle"],
    relatedTerms: ["earth-geosphere", "earth-weathering"],
    isAdult: false,
  },
  {
    id: "earth-water-budget",
    word: "Water Budget",
    definition:
      "An accounting of water inputs, outputs, and storage change for a stated system boundary and time interval.",
    domain: "Earth Science",
    tags: ["Hydrology", "Accounting"],
    relatedTerms: ["earth-reservoir", "earth-flux", "earth-watershed"],
    isAdult: false,
  },
  {
    id: "earth-evapotranspiration",
    word: "Evapotranspiration",
    definition:
      "The combined transfer of water to the atmosphere through evaporation from surfaces and transpiration from plants.",
    domain: "Earth Science",
    tags: ["Hydrology", "Atmosphere"],
    relatedTerms: ["earth-water-budget", "earth-biosphere"],
    isAdult: false,
  },
  {
    id: "earth-runoff",
    word: "Runoff",
    definition:
      "Water that moves across the land surface or through relatively shallow pathways toward channels and other receiving waters.",
    domain: "Earth Science",
    tags: ["Hydrology", "Flow"],
    relatedTerms: ["earth-watershed", "earth-water-budget"],
    isAdult: false,
  },
  {
    id: "earth-weather",
    word: "Weather",
    definition:
      "The short-term state and events of the atmosphere at a particular time and place, including temperature, precipitation, pressure, humidity, wind, and clouds.",
    domain: "Earth Science",
    tags: ["Meteorology", "Time"],
    relatedTerms: ["earth-climate", "earth-troposphere"],
    isAdult: false,
  },
  {
    id: "earth-climate",
    word: "Climate",
    definition:
      "The statistical distribution and characteristic range of weather conditions for a defined place, region, or system over a long period.",
    domain: "Earth Science",
    tags: ["Climatology", "Time"],
    relatedTerms: ["earth-weather", "earth-forcing", "earth-feedback"],
    isAdult: false,
  },
  {
    id: "earth-proxy",
    word: "Proxy",
    definition:
      "A preserved measurement or indicator used to infer an environmental quantity that was not observed directly, such as past temperature or precipitation.",
    domain: "Earth Science",
    tags: ["Reconstruction", "Evidence"],
    relatedTerms: ["earth-climate", "earth-deposition"],
    isAdult: false,
  },
  {
    id: "earth-albedo",
    word: "Albedo",
    definition:
      "The fraction of incoming radiation reflected by a surface or body, with the value depending on wavelength, angle, material, and surface condition.",
    domain: "Earth Science",
    tags: ["Climate", "Energy"],
    relatedTerms: ["earth-cryosphere", "earth-feedback"],
    isAdult: false,
  },
  {
    id: "earth-troposphere",
    word: "Troposphere",
    definition:
      "The lowest major layer of Earth's atmosphere, extending from the surface to the tropopause and containing most atmospheric water vapor and most weather.",
    domain: "Earth Science",
    tags: ["Meteorology", "Atmosphere"],
    relatedTerms: ["earth-atmosphere", "earth-weather"],
    isAdult: false,
  },
];
