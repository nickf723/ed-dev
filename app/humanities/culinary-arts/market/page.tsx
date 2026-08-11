"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Carrot,
  ChefHat,
  Flame,
  FlaskConical,
  PackageOpen,
  Search,
  Snowflake,
  Sparkles,
  X,
} from "lucide-react";
import CulinaryBackground from "../CulinaryBackground";
import {
  useMarket,
  type IngredientItem,
  type MarketItem,
  type MarketMode,
  type PackagedItem,
} from "./useMarket";

type IngredientFamily =
  | "Produce"
  | "Aromatics"
  | "Meat"
  | "Seafood"
  | "Dairy & Eggs"
  | "Grains & Starches"
  | "Legumes & Nuts"
  | "Herbs & Spices"
  | "Baking & Sweet"
  | "Pantry";

type IngredientProfile = {
  flavor: string;
  texture: string;
  roles: readonly string[];
  techniques: readonly string[];
  pairings: readonly string[];
  storage: string;
  transformations: readonly { method: string; result: string }[];
};

const FAMILIES: readonly ("All" | IngredientFamily)[] = [
  "All",
  "Produce",
  "Aromatics",
  "Meat",
  "Seafood",
  "Dairy & Eggs",
  "Grains & Starches",
  "Legumes & Nuts",
  "Herbs & Spices",
  "Baking & Sweet",
  "Pantry",
];

const FAMILY_META: Record<IngredientFamily, { rgb: string; short: string }> = {
  Produce: { rgb: "74, 222, 128", short: "fresh plant foods" },
  Aromatics: { rgb: "163, 230, 53", short: "fragrant foundations" },
  Meat: { rgb: "248, 113, 113", short: "animal proteins" },
  Seafood: { rgb: "96, 165, 250", short: "fish & shellfish" },
  "Dairy & Eggs": { rgb: "253, 224, 71", short: "richness & structure" },
  "Grains & Starches": { rgb: "251, 191, 36", short: "staples & structure" },
  "Legumes & Nuts": { rgb: "192, 132, 252", short: "protein & texture" },
  "Herbs & Spices": { rgb: "45, 212, 191", short: "aroma & seasoning" },
  "Baking & Sweet": { rgb: "244, 114, 182", short: "pastry & sweetness" },
  Pantry: { rgb: "251, 146, 60", short: "oils, sauces & staples" },
};

const GENERIC_PROFILES: Record<IngredientFamily, IngredientProfile> = {
  Produce: {
    flavor: "fresh · vegetal · naturally sweet",
    texture: "crisp → tender",
    roles: ["base", "side", "garnish"],
    techniques: ["roast", "steam", "sauté", "pickle"],
    pairings: ["olive oil", "garlic", "herbs", "acid"],
    storage: "Usually cool and dry or refrigerated, depending on the plant and ripeness.",
    transformations: [
      { method: "Raw", result: "crisp structure + brightest aroma" },
      { method: "Roast", result: "water loss + concentrated sweetness" },
      { method: "Purée", result: "structure collapses into body and sauce" },
    ],
  },
  Aromatics: {
    flavor: "pungent · fragrant · savory",
    texture: "crisp → soft / jammy",
    roles: ["aromatic base", "seasoning", "finisher"],
    techniques: ["sweat", "sauté", "roast", "infuse"],
    pairings: ["fat", "salt", "tomato", "herbs"],
    storage: "Keep dry aromatics ventilated; refrigerate tender aromatics and cut pieces.",
    transformations: [
      { method: "Raw", result: "sharp volatile aroma" },
      { method: "Sweat", result: "softened bite + rounded sweetness" },
      { method: "Brown", result: "deep savory and caramel notes" },
    ],
  },
  Meat: {
    flavor: "savory · rich · protein-forward",
    texture: "firm → tender",
    roles: ["centerpiece", "stock", "filling"],
    techniques: ["sear", "roast", "braise", "grill"],
    pairings: ["salt", "alliums", "herbs", "acid"],
    storage: "Keep refrigerated and cold; freeze for longer storage and thaw safely.",
    transformations: [
      { method: "Sear", result: "Maillard crust + roasted aroma" },
      { method: "Roast", result: "browned exterior + controlled doneness" },
      { method: "Braise", result: "connective tissue softens over time" },
    ],
  },
  Seafood: {
    flavor: "briny · delicate · savory",
    texture: "tender → flaky / firm",
    roles: ["centerpiece", "stock", "raw preparation"],
    techniques: ["poach", "steam", "sear", "cure"],
    pairings: ["citrus", "herbs", "butter", "chili"],
    storage: "Keep very cold and use quickly; quality declines faster than most proteins.",
    transformations: [
      { method: "Cure", result: "firmer texture + seasoned moisture loss" },
      { method: "Steam", result: "gentle protein setting" },
      { method: "Sear", result: "browned surface + moist interior" },
    ],
  },
  "Dairy & Eggs": {
    flavor: "rich · creamy · mild",
    texture: "fluid / tender → set",
    roles: ["binder", "emulsion", "enrichment"],
    techniques: ["whisk", "emulsify", "bake", "culture"],
    pairings: ["salt", "herbs", "fruit", "starch"],
    storage: "Refrigerate and protect from temperature swings and strong odors.",
    transformations: [
      { method: "Whip", result: "air becomes structure" },
      { method: "Heat", result: "proteins set or fats melt" },
      { method: "Culture", result: "acidification adds tang and complexity" },
    ],
  },
  "Grains & Starches": {
    flavor: "mild · nutty · comforting",
    texture: "dry / firm → tender / gelatinized",
    roles: ["staple", "thickener", "dough"],
    techniques: ["boil", "toast", "bake", "steam"],
    pairings: ["stock", "butter", "cheese", "herbs"],
    storage: "Keep dry staples sealed from moisture; refrigerate cooked starches promptly.",
    transformations: [
      { method: "Toast", result: "nutty aroma + dry surface" },
      { method: "Hydrate", result: "starch absorbs water and softens" },
      { method: "Bake", result: "structure sets while surfaces brown" },
    ],
  },
  "Legumes & Nuts": {
    flavor: "earthy · nutty · savory",
    texture: "firm / crunchy → creamy / tender",
    roles: ["protein", "purée", "crunch"],
    techniques: ["soak", "simmer", "toast", "grind"],
    pairings: ["garlic", "cumin", "acid", "greens"],
    storage: "Keep dried foods sealed and dry; refrigerate cooked legumes and opened nut products.",
    transformations: [
      { method: "Toast", result: "deeper aroma + crisp texture" },
      { method: "Simmer", result: "cell walls soften and starches cream" },
      { method: "Grind", result: "texture becomes paste, flour, or butter" },
    ],
  },
  "Herbs & Spices": {
    flavor: "aromatic · concentrated · distinctive",
    texture: "leafy / seed / bark / powder",
    roles: ["seasoning", "infusion", "finish"],
    techniques: ["toast", "grind", "bloom", "infuse"],
    pairings: ["fat", "salt", "acid", "other aromatics"],
    storage: "Protect dried spices from light, heat, and moisture; keep tender herbs cool.",
    transformations: [
      { method: "Toast", result: "volatile aromas intensify" },
      { method: "Bloom", result: "fat extracts aromatic compounds" },
      { method: "Infuse", result: "flavor migrates into liquid" },
    ],
  },
  "Baking & Sweet": {
    flavor: "sweet · toasted · aromatic",
    texture: "powder / crystal / solid → structured dessert",
    roles: ["sweetener", "structure", "leavening"],
    techniques: ["cream", "whisk", "caramelize", "bake"],
    pairings: ["vanilla", "butter", "fruit", "salt"],
    storage: "Keep dry ingredients sealed; protect chocolate and fats from heat and odors.",
    transformations: [
      { method: "Cream", result: "air is trapped in fat and sugar" },
      { method: "Caramelize", result: "sugars darken into bitter-sweet complexity" },
      { method: "Bake", result: "starch, protein, gas, and heat build structure" },
    ],
  },
  Pantry: {
    flavor: "concentrated · supporting · variable",
    texture: "liquid / paste / dry staple",
    roles: ["seasoning", "cooking medium", "sauce base"],
    techniques: ["reduce", "emulsify", "deglaze", "season"],
    pairings: ["aromatics", "proteins", "vegetables", "starches"],
    storage: "Follow the ingredient's fat, moisture, acidity, and package requirements.",
    transformations: [
      { method: "Reduce", result: "water leaves and flavor concentrates" },
      { method: "Emulsify", result: "normally separate liquids become one texture" },
      { method: "Deglaze", result: "browned flavor dissolves into a sauce" },
    ],
  },
};

const PROFILE_OVERRIDES: Record<string, Partial<IngredientProfile>> = {
  potato: {
    flavor: "earthy · mild · starchy",
    texture: "waxy / floury → creamy or crisp",
    roles: ["staple", "side", "thickener"],
    techniques: ["roast", "boil", "fry", "mash"],
    pairings: ["butter", "garlic", "rosemary", "cheese", "onion"],
    transformations: [
      { method: "Boil", result: "starch gelatinizes and the interior turns tender" },
      { method: "Fry", result: "surface dehydration creates a crisp shell" },
      { method: "Mash", result: "ruptured cells become a creamy starch network" },
    ],
  },
  tomato: {
    flavor: "sweet · acidic · savory",
    texture: "juicy → jammy",
    roles: ["sauce base", "fresh element", "umami source"],
    techniques: ["roast", "stew", "grill", "dry"],
    pairings: ["basil", "garlic", "olive oil", "cheese", "chili"],
  },
  egg: {
    flavor: "rich · mild · sulfurous",
    texture: "fluid → tender set / firm set",
    roles: ["binder", "emulsifier", "foam", "centerpiece"],
    techniques: ["poach", "fry", "whisk", "bake"],
    pairings: ["butter", "cheese", "herbs", "potato", "bread"],
  },
  garlic: {
    flavor: "sharp · sulfurous → sweet · nutty",
    texture: "crisp → soft / paste-like",
    roles: ["aromatic base", "seasoning", "condiment"],
    techniques: ["mince", "sauté", "roast", "confit"],
    pairings: ["olive oil", "onion", "tomato", "herbs", "chili"],
  },
  mushroom: {
    flavor: "earthy · umami · woodsy",
    texture: "spongy → meaty / browned",
    roles: ["umami source", "centerpiece", "sauce base"],
    techniques: ["sear", "roast", "grill", "dry"],
    pairings: ["butter", "garlic", "thyme", "cream", "soy"],
  },
  chicken: {
    flavor: "mild · savory · adaptable",
    texture: "tender → firm / crisp-skinned",
    roles: ["centerpiece", "stock", "filling"],
    techniques: ["roast", "grill", "braise", "poach"],
    pairings: ["lemon", "garlic", "thyme", "chili", "butter"],
  },
  salmon: {
    flavor: "rich · oily · oceanic",
    texture: "silky → flaky",
    roles: ["centerpiece", "raw preparation", "smoked food"],
    techniques: ["sear", "roast", "cure", "poach"],
    pairings: ["lemon", "dill", "mustard", "soy", "ginger"],
  },
  rice: {
    flavor: "mild · grainy · lightly nutty",
    texture: "dry grain → fluffy / creamy / crisp",
    roles: ["staple", "carrier", "porridge"],
    techniques: ["steam", "simmer", "toast", "fry"],
    pairings: ["stock", "soy", "herbs", "beans", "egg"],
  },
};

function singularizeWord(word: string) {
  if (word.length <= 3) return word;
  if (word.endsWith("ies")) return `${word.slice(0, -3)}y`;
  if (word.endsWith("oes")) return word.slice(0, -2);
  if (word.endsWith("s") && !/(ss|us|is)$/.test(word)) return word.slice(0, -1);
  return word;
}

function ingredientKey(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean)
    .map(singularizeWord)
    .join(" ");
}

function classifyIngredient(name: string): IngredientFamily {
  const key = ingredientKey(name);
  if (/(salmon|tuna|cod|haddock|trout|fish|shrimp|prawn|crab|lobster|mussel|clam|oyster|squid|anchovy|sardine)/.test(key)) return "Seafood";
  if (/(chicken|beef|pork|lamb|turkey|duck|bacon|ham|sausage|veal|venison|goat)/.test(key)) return "Meat";
  if (/(milk|cream|cheese|butter|yogurt|yoghurt|egg|mascarpone|ricotta)/.test(key)) return "Dairy & Eggs";
  if (/(rice|flour|bread|pasta|noodle|oat|quinoa|couscous|barley|polenta|cornmeal|tortilla|potato|yam)/.test(key)) return "Grains & Starches";
  if (/(bean|chickpea|lentil|pea|peanut|almond|walnut|cashew|pistachio|hazelnut|pecan)/.test(key)) return "Legumes & Nuts";
  if (/(garlic|onion|shallot|leek|ginger|scallion|spring onion)/.test(key)) return "Aromatics";
  if (/(basil|thyme|rosemary|parsley|cilantro|coriander|cumin|paprika|pepper|cinnamon|nutmeg|clove|oregano|sage|mint|dill|turmeric|cardamom|chili|chilli|bay leaf|tarragon)/.test(key)) return "Herbs & Spices";
  if (/(sugar|chocolate|cocoa|vanilla|yeast|baking powder|baking soda|gelatin|marzipan|icing|syrup)/.test(key)) return "Baking & Sweet";
  if (/(oil|vinegar|sauce|stock|broth|wine|beer|spirit|honey|mustard|ketchup|mayonnaise|paste|water|salt)/.test(key)) return "Pantry";
  if (/(apple|banana|berry|berries|orange|lemon|lime|mango|pear|peach|melon|grape|pineapple|tomato|carrot|cabbage|spinach|lettuce|broccoli|cauliflower|pepper|courgette|zucchini|aubergine|eggplant|mushroom|celery|cucumber|avocado|pumpkin|squash|corn)/.test(key)) return "Produce";
  return "Pantry";
}

function profileFor(item: IngredientItem): IngredientProfile {
  const family = classifyIngredient(item.name);
  const generic = GENERIC_PROFILES[family];
  const key = ingredientKey(item.name);
  const overrideEntry = Object.entries(PROFILE_OVERRIDES).find(([profileKey]) =>
    key === profileKey || key.includes(profileKey),
  );
  return { ...generic, ...(overrideEntry?.[1] ?? {}) };
}

function MarketContent() {
  const searchParams = useSearchParams();
  const oldAisle = searchParams.get("aisle");
  const initialMode: MarketMode = oldAisle === "PACKAGED" ? "PACKAGED" : "INGREDIENTS";
  const [mode, setMode] = useState<MarketMode>(initialMode);
  const [query, setQuery] = useState(searchParams.get("search") ?? "");
  const [family, setFamily] = useState<"All" | IngredientFamily>("All");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { items, loading, error } = useMarket(mode, query);

  useEffect(() => {
    const nextSearch = searchParams.get("search");
    const nextAisle = searchParams.get("aisle");
    if (nextSearch !== null) setQuery(nextSearch);
    if (nextAisle === "PACKAGED") setMode("PACKAGED");
    if (nextAisle === "PRODUCE") setMode("INGREDIENTS");
  }, [searchParams]);

  const visibleItems = useMemo(() => {
    if (mode !== "INGREDIENTS" || family === "All") return items;
    return items.filter(
      (item) => item.type === "RAW" && classifyIngredient(item.name) === family,
    );
  }, [family, items, mode]);

  useEffect(() => {
    if (visibleItems.length === 0) {
      setSelectedId(null);
      return;
    }
    if (!selectedId || !visibleItems.some((item) => item.id === selectedId)) {
      setSelectedId(visibleItems[0].id);
    }
  }, [selectedId, visibleItems]);

  const selected = visibleItems.find((item) => item.id === selectedId) ?? visibleItems[0];

  const switchMode = (nextMode: MarketMode) => {
    setMode(nextMode);
    setQuery("");
    setFamily("All");
    setSelectedId(null);
  };

  return (
    <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1640px] flex-col px-4 py-4 sm:px-6 lg:px-8 xl:h-screen xl:min-h-0 xl:overflow-hidden">
      <header className="flex flex-col gap-3 border-b border-emerald-200/10 pb-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            href="/humanities/culinary-arts"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-emerald-300/15 bg-black/25 text-emerald-300/70 transition-colors hover:text-emerald-200"
            aria-label="Back to Culinary Arts"
          >
            <ArrowLeft size={14} />
          </Link>
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-300/18 bg-emerald-400/[0.07] text-emerald-300">
            <Carrot size={20} strokeWidth={1.5} />
          </span>
          <div className="min-w-0">
            <div className="font-mono text-[7px] uppercase tracking-[0.18em] text-emerald-300/50">Culinary Arts</div>
            <h1 className="truncate font-serif text-3xl font-semibold tracking-[-0.04em] text-[#f7fff7] sm:text-4xl">Ingredient Atlas</h1>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="flex rounded-xl border border-white/[0.07] bg-black/25 p-1">
            <ModeButton active={mode === "INGREDIENTS"} onClick={() => switchMode("INGREDIENTS")} icon={Carrot}>
              Ingredients
            </ModeButton>
            <ModeButton active={mode === "PACKAGED"} onClick={() => switchMode("PACKAGED")} icon={PackageOpen}>
              Prepared Foods
            </ModeButton>
          </div>
          <div className="relative sm:w-[300px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-600" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={mode === "INGREDIENTS" ? "Search ingredients..." : "Search prepared foods..."}
              className="h-10 w-full rounded-xl border border-white/[0.08] bg-black/35 pl-9 pr-9 text-[12px] text-white outline-none placeholder:text-stone-700 focus:border-emerald-300/25"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-stone-600 hover:text-white"
                aria-label="Clear search"
              >
                <X size={12} />
              </button>
            ) : null}
          </div>
        </div>
      </header>

      {mode === "INGREDIENTS" ? (
        <div className="mt-3 flex shrink-0 gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
          {FAMILIES.map((itemFamily) => {
            const active = family === itemFamily;
            const rgb = itemFamily === "All" ? "74, 222, 128" : FAMILY_META[itemFamily].rgb;
            return (
              <button
                key={itemFamily}
                type="button"
                onClick={() => setFamily(itemFamily)}
                className="h-8 shrink-0 rounded-lg border px-2.5 font-mono text-[7px] uppercase tracking-[0.09em] transition-colors"
                style={{
                  color: active ? `rgb(${rgb})` : "rgb(120 113 108)",
                  borderColor: active ? `rgba(${rgb},0.30)` : "rgba(255,255,255,0.055)",
                  background: active ? `rgba(${rgb},0.07)` : "rgba(0,0,0,0.16)",
                }}
              >
                {itemFamily}
              </button>
            );
          })}
        </div>
      ) : null}

      <section className="mt-3 grid min-h-0 flex-1 gap-4 xl:grid-cols-[minmax(0,1fr)_390px]">
        <div className="relative flex min-h-[520px] min-w-0 flex-col overflow-hidden rounded-[24px] border border-emerald-200/12 bg-black/[0.24] shadow-[inset_0_1px_0_rgba(255,255,255,0.035),0_24px_70px_rgba(0,0,0,0.22)] backdrop-blur-xl xl:min-h-0">
          <div className="flex shrink-0 items-center justify-between border-b border-white/[0.06] px-4 py-2.5">
            <div>
              <span className="font-mono text-[8px] uppercase tracking-[0.13em] text-stone-600">
                {loading ? "Loading pantry" : `${visibleItems.length} ${mode === "INGREDIENTS" ? "ingredients" : "products"}`}
              </span>
              {mode === "INGREDIENTS" && family !== "All" ? (
                <span className="ml-2 text-[8px] text-stone-700">· {FAMILY_META[family].short}</span>
              ) : null}
            </div>
            {error ? <span className="text-[8px] text-rose-400">{error}</span> : null}
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-3 custom-scrollbar">
            {loading ? (
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
                {Array.from({ length: 15 }, (_, index) => (
                  <div key={index} className="h-36 animate-pulse rounded-2xl border border-white/[0.05] bg-white/[0.025]" />
                ))}
              </div>
            ) : visibleItems.length > 0 ? (
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
                {visibleItems.map((item) => (
                  <PantryCard
                    key={item.id}
                    item={item}
                    selected={selected?.id === item.id}
                    onClick={() => setSelectedId(item.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="flex min-h-64 flex-col items-center justify-center text-center text-stone-700">
                <Search size={26} strokeWidth={1.2} />
                <div className="mt-3 font-mono text-[9px] uppercase tracking-[0.16em]">Nothing in this drawer</div>
                <p className="mt-2 max-w-sm text-[11px] leading-5 text-stone-600">Try a broader search or a different ingredient family.</p>
              </div>
            )}
          </div>
        </div>

        <aside className="min-h-[520px] overflow-y-auto rounded-[24px] border border-emerald-200/12 bg-[#07100b]/78 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.22)] backdrop-blur-xl custom-scrollbar xl:min-h-0">
          {selected?.type === "RAW" ? (
            <IngredientInspector item={selected} onPairing={(pairing) => {
              setMode("INGREDIENTS");
              setFamily("All");
              setQuery(pairing);
            }} />
          ) : selected?.type === "PACKAGED" ? (
            <PackagedInspector item={selected} />
          ) : (
            <div className="flex h-full items-center justify-center text-stone-700">
              <Sparkles size={24} strokeWidth={1.2} />
            </div>
          )}
        </aside>
      </section>
    </div>
  );
}

function PantryCard({ item, selected, onClick }: { item: MarketItem; selected: boolean; onClick: () => void }) {
  const raw = item.type === "RAW";
  const family = raw ? classifyIngredient(item.name) : null;
  const rgb = family ? FAMILY_META[family].rgb : "244, 114, 182";

  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative flex min-h-[145px] flex-col overflow-hidden rounded-[18px] border p-3 text-left transition-all hover:-translate-y-0.5"
      style={{
        borderColor: selected ? `rgba(${rgb},0.42)` : "rgba(255,255,255,0.055)",
        background: selected
          ? `linear-gradient(145deg, rgba(${rgb},0.10), rgba(8,9,8,0.72))`
          : "rgba(0,0,0,0.20)",
        boxShadow: selected ? `0 0 24px rgba(${rgb},0.07)` : undefined,
      }}
    >
      <div className="flex min-h-0 flex-1 items-center justify-center">
        <img
          src={item.image}
          alt=""
          className="h-20 w-20 object-contain drop-shadow-[0_10px_18px_rgba(0,0,0,0.32)] transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="mt-2 min-w-0">
        <div className="truncate text-[10px] font-semibold text-stone-200">{item.name}</div>
        <div className="mt-1 truncate font-mono text-[6px] uppercase tracking-[0.1em]" style={{ color: `rgba(${rgb},0.66)` }}>
          {raw ? family : item.brand}
        </div>
      </div>
    </button>
  );
}

function IngredientInspector({ item, onPairing }: { item: IngredientItem; onPairing: (pairing: string) => void }) {
  const family = classifyIngredient(item.name);
  const meta = FAMILY_META[family];
  const profile = profileFor(item);

  return (
    <div className="flex min-h-full flex-col">
      <div className="flex items-start gap-4">
        <div
          className="flex h-28 w-28 shrink-0 items-center justify-center rounded-[24px] border"
          style={{
            borderColor: `rgba(${meta.rgb},0.22)`,
            background: `radial-gradient(circle, rgba(${meta.rgb},0.10), rgba(0,0,0,0.12) 68%)`,
          }}
        >
          <img src={item.image} alt="" className="h-24 w-24 object-contain drop-shadow-xl" />
        </div>
        <div className="min-w-0 pt-1">
          <div className="font-mono text-[7px] uppercase tracking-[0.16em]" style={{ color: `rgba(${meta.rgb},0.72)` }}>{family}</div>
          <h2 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-white">{item.name}</h2>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {profile.roles.map((role) => (
              <span key={role} className="rounded-full border border-white/[0.07] bg-white/[0.02] px-2 py-1 font-mono text-[6px] uppercase tracking-[0.09em] text-stone-500">{role}</span>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-5 text-[11px] leading-5 text-stone-500">
        {item.description || `${item.name} is used across the kitchen as a ${meta.short}. Its culinary behavior changes with heat, moisture, cutting, and time.`}
      </p>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <InspectorMetric label="Flavor" value={profile.flavor} />
        <InspectorMetric label="Texture" value={profile.texture} />
      </div>

      <section className="mt-5 border-t border-white/[0.07] pt-4">
        <div className="flex items-center gap-2 font-mono text-[7px] uppercase tracking-[0.15em] text-emerald-300/55">
          <Flame size={11} /> Techniques
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {profile.techniques.map((technique) => (
            <span key={technique} className="rounded-lg border border-orange-300/12 bg-orange-400/[0.035] px-2.5 py-1.5 text-[8px] font-semibold text-orange-100/70">{technique}</span>
          ))}
        </div>
      </section>

      <section className="mt-5 border-t border-white/[0.07] pt-4">
        <div className="flex items-center gap-2 font-mono text-[7px] uppercase tracking-[0.15em] text-emerald-300/55">
          <FlaskConical size={11} /> Transformations
        </div>
        <div className="mt-3 space-y-2">
          {profile.transformations.map((step, index) => (
            <div key={step.method} className="grid grid-cols-[26px_70px_minmax(0,1fr)] items-center gap-2 rounded-xl border border-white/[0.055] bg-white/[0.015] px-2.5 py-2">
              <span className="font-mono text-[7px] text-stone-700">{String(index + 1).padStart(2, "0")}</span>
              <strong className="text-[9px] text-stone-300">{step.method}</strong>
              <span className="text-[8px] leading-4 text-stone-600">{step.result}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-5 border-t border-white/[0.07] pt-4">
        <div className="font-mono text-[7px] uppercase tracking-[0.15em] text-emerald-300/55">Pairings</div>
        <div className="mt-3 flex flex-wrap gap-2">
          {profile.pairings.map((pairing) => (
            <button
              key={pairing}
              type="button"
              onClick={() => onPairing(pairing)}
              className="rounded-lg border border-emerald-300/12 bg-emerald-400/[0.035] px-2.5 py-1.5 text-[8px] text-emerald-100/65 transition-colors hover:bg-emerald-400/[0.07] hover:text-emerald-100"
            >
              {pairing}
            </button>
          ))}
        </div>
      </section>

      <div className="mt-5 rounded-xl border border-cyan-300/10 bg-cyan-400/[0.025] p-3">
        <div className="flex items-center gap-2 font-mono text-[7px] uppercase tracking-[0.14em] text-cyan-300/50">
          <Snowflake size={10} /> Storage
        </div>
        <p className="mt-2 text-[8px] leading-4 text-stone-600">{profile.storage}</p>
      </div>

      <Link
        href="/humanities/culinary-arts/recipes"
        className="group mt-5 flex items-center justify-between rounded-xl border border-orange-300/14 bg-orange-400/[0.04] px-3 py-3 text-[10px] font-semibold text-orange-100/80 transition-colors hover:bg-orange-400/[0.08]"
      >
        Browse the Recipe Library
        <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}

function PackagedInspector({ item }: { item: PackagedItem }) {
  const gradeRgb = item.grade === "A" ? "74, 222, 128" : item.grade === "B" ? "163, 230, 53" : item.grade === "C" ? "253, 224, 71" : "248, 113, 113";
  return (
    <div className="flex min-h-full flex-col">
      <div className="flex h-48 items-center justify-center rounded-[24px] border border-pink-300/12 bg-white/[0.025] p-4">
        <img src={item.image} alt="" className="h-full w-full object-contain drop-shadow-xl" />
      </div>
      <div className="mt-5 font-mono text-[7px] uppercase tracking-[0.15em] text-pink-300/55">Prepared food reference</div>
      <h2 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-white">{item.name}</h2>
      <p className="mt-1 text-[10px] text-stone-600">{item.brand}</p>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <InspectorMetric label="Energy / 100g" value={`${item.calories} kcal`} />
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
          <div className="font-mono text-[6px] uppercase tracking-[0.12em] text-stone-700">Nutri-Score</div>
          <div className="mt-2 inline-flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-sm font-black" style={{ color: `rgb(${gradeRgb})`, background: `rgba(${gradeRgb},0.08)`, border: `1px solid rgba(${gradeRgb},0.18)` }}>{item.grade}</div>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-white/[0.06] bg-white/[0.018] p-4">
        <div className="flex items-center gap-2 text-[9px] font-semibold text-stone-300"><BookOpen size={12} /> Why this tab exists</div>
        <p className="mt-2 text-[9px] leading-5 text-stone-600">Prepared foods are useful reference material for studying formulation, processing, branding, nutrition labels, and the distance between an ingredient and a finished commercial product. They are no longer the center of the pantry.</p>
      </div>
    </div>
  );
}

function InspectorMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
      <div className="font-mono text-[6px] uppercase tracking-[0.12em] text-stone-700">{label}</div>
      <div className="mt-1 text-[10px] font-semibold leading-4 text-stone-300">{value}</div>
    </div>
  );
}

function ModeButton({ active, onClick, icon: Icon, children }: { active: boolean; onClick: () => void; icon: typeof ChefHat; children: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-[8px] font-semibold transition-colors ${active ? "bg-white/[0.07] text-white" : "text-stone-600 hover:text-stone-300"}`}
    >
      <Icon size={11} /> {children}
    </button>
  );
}

export default function MarketPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#07100b] text-stone-100 selection:bg-emerald-400/25 xl:h-screen xl:overflow-hidden">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-55">
        <CulinaryBackground />
      </div>
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_18%_18%,rgba(74,222,128,0.10),transparent_26%),radial-gradient(circle_at_82%_76%,rgba(251,146,60,0.06),transparent_28%),linear-gradient(to_bottom,rgba(7,16,11,0.28),rgba(5,9,7,0.80))]" />
      <div className="pointer-events-none fixed inset-0 z-[1] opacity-25 [background-image:linear-gradient(rgba(74,222,128,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(74,222,128,0.025)_1px,transparent_1px)] [background-size:44px_44px]" />
      <Suspense fallback={<div className="relative z-10 p-8 text-stone-500">Opening pantry…</div>}>
        <MarketContent />
      </Suspense>
    </main>
  );
}
