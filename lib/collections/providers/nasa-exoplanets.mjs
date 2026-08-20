export const NASA_EXOPLANET_ARCHIVE_SOURCE = Object.freeze({
  label: "NASA Exoplanet Archive · Planetary Systems Composite Parameters",
  url: "https://exoplanetarchive.ipac.caltech.edu/docs/API_PS_columns.html",
  kind: "provider",
  scope:
    "Confirmed planet names, host systems, discovery context, orbital parameters, size, mass, temperature, and distance",
});

const FIELDS = [
  "pl_name",
  "hostname",
  "discoverymethod",
  "disc_year",
  "disc_facility",
  "pl_orbper",
  "pl_rade",
  "pl_bmasse",
  "pl_eqt",
  "sy_dist",
  "sy_pnum",
  "st_spectype",
];

export function buildExoplanetTapUrl({
  search = "",
  limit = 48,
  count = false,
} = {}) {
  const phrase = String(search)
    .trim()
    .slice(0, 80)
    .replaceAll("%", "")
    .replaceAll("_", "")
    .trim();
  const size = Math.min(
    60,
    Math.max(1, Number.parseInt(String(limit), 10) || 48)
  );
  const where = phrase ? ` where ${searchClause(phrase)}` : "";
  const query = count
    ? `select count(*) as total from pscomppars${where}`
    : `select top ${size} ${FIELDS.join(",")} from pscomppars${where} order by disc_year desc,pl_name`;
  const url = new URL("https://exoplanetarchive.ipac.caltech.edu/TAP/sync");
  url.searchParams.set("query", query);
  url.searchParams.set("format", "json");
  return url;
}

export function normalizeNASAExoplanet(row) {
  const name = required(row?.pl_name, "planet name");
  const hostName = clean(row?.hostname) ?? "Unknown host";
  const radiusEarth = optionalNumber(row?.pl_rade);
  return {
    id: slug(name),
    name,
    hostName,
    discoveryMethod: clean(row?.discoverymethod) ?? "Unknown method",
    discoveryYear: optionalInteger(row?.disc_year),
    discoveryFacility: clean(row?.disc_facility),
    orbitalPeriodDays: optionalNumber(row?.pl_orbper),
    radiusEarth,
    massEarth: optionalNumber(row?.pl_bmasse),
    equilibriumTemperatureK: optionalNumber(row?.pl_eqt),
    distanceParsecs: optionalNumber(row?.sy_dist),
    planetsInSystem: optionalInteger(row?.sy_pnum),
    stellarSpectralType: clean(row?.st_spectype),
    sizeClass: classifyPlanetRadius(radiusEarth),
    sourceUrl: `https://exoplanetarchive.ipac.caltech.edu/overview/${encodeURIComponent(name)}`,
    source: "NASA Exoplanet Archive",
    sources: [
      {
        label: `${name} · NASA Exoplanet Archive`,
        url: `https://exoplanetarchive.ipac.caltech.edu/overview/${encodeURIComponent(name)}`,
        kind: "provider",
        scope: "Composite confirmed-planet parameters and discovery context",
      },
    ],
  };
}

export function classifyPlanetRadius(radiusEarth) {
  if (!Number.isFinite(radiusEarth) || radiusEarth <= 0) return "Unclassified";
  if (radiusEarth < 1.25) return "Earth-sized";
  if (radiusEarth < 2) return "Super-Earth";
  if (radiusEarth < 4) return "Sub-Neptune";
  if (radiusEarth < 10) return "Giant";
  return "Super-Jupiter";
}

function searchClause(phrase) {
  const escaped = phrase.toLocaleLowerCase().replaceAll("'", "''");
  return `(lower(pl_name) like '%${escaped}%' or lower(hostname) like '%${escaped}%' or lower(discoverymethod) like '%${escaped}%')`;
}

function slug(value) {
  return value
    .toLocaleLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function required(value, label) {
  const result = clean(value);
  if (!result) throw new Error(`NASA exoplanet row is missing ${label}`);
  return result;
}

function clean(value) {
  const result = typeof value === "string" ? value.trim() : "";
  return result || undefined;
}

function optionalNumber(value) {
  if (value === null || value === undefined || value === "") return undefined;
  const result = Number(value);
  return Number.isFinite(result) ? result : undefined;
}

function optionalInteger(value) {
  const result = optionalNumber(value);
  return result === undefined ? undefined : Math.trunc(result);
}
