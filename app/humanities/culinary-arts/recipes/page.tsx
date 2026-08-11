"use client";

import Link from "next/link";
import { useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowLeft,
  Carrot,
  ChefHat,
  Flame,
  Globe2,
  Search,
  Sparkles,
  X,
  type LucideIcon,
} from "lucide-react";
import CulinaryBackground from "../CulinaryBackground";
import { CUISINES, KITCHEN_STATIONS } from "../culinary-data";
import RecipeModal from "./RecipeModal";
import { useCulinary } from "./useCulinary";

const INGREDIENT_SHORTCUTS = [
  "chicken",
  "salmon",
  "tomato",
  "potato",
  "rice",
  "garlic",
  "cheese",
  "mushroom",
] as const;

export default function RecipesPage() {
  const [selectedMealId, setSelectedMealId] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const [ingredientInput, setIngredientInput] = useState("");
  const {
    data,
    loading,
    error,
    filters,
    hasFilters,
    randomMode,
    setCategory,
    setArea,
    setIngredient,
    searchRecipe,
    clearSearch,
    clearAll,
    fetchRandom,
    getRecipeDetails,
  } = useCulinary();

  const activeTickets = [
    filters.category
      ? { key: "category", label: filters.category, clear: () => setCategory(filters.category) }
      : null,
    filters.area
      ? { key: "area", label: filters.area, clear: () => setArea(filters.area) }
      : null,
    filters.ingredient
      ? {
          key: "ingredient",
          label: `with ${filters.ingredient}`,
          clear: () => {
            setIngredient(filters.ingredient);
            setIngredientInput("");
          },
        }
      : null,
    filters.query
      ? {
          key: "query",
          label: `“${filters.query}”`,
          clear: () => {
            clearSearch();
            setSearchInput("");
          },
        }
      : null,
  ].filter(Boolean) as { key: string; label: string; clear: () => void }[];

  const handleSearch = (event: FormEvent) => {
    event.preventDefault();
    searchRecipe(searchInput);
  };

  const handleIngredient = (event: FormEvent) => {
    event.preventDefault();
    const ingredient = ingredientInput.trim();
    if (ingredient) setIngredient(ingredient);
  };

  const reset = () => {
    clearAll();
    setSearchInput("");
    setIngredientInput("");
  };

  const surprise = () => {
    fetchRandom();
    setSearchInput("");
    setIngredientInput("");
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#130c07] text-stone-100 selection:bg-orange-400/25">
      <CulinaryBackground />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_80%_10%,rgba(251,146,60,0.12),transparent_24%),linear-gradient(to_bottom,rgba(19,12,7,0.12),rgba(8,6,5,0.74))]" />

      <div className="relative z-10 mx-auto min-h-screen w-full max-w-[1640px] px-4 py-4 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-3 border-b border-orange-200/12 pb-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              href="/humanities/culinary-arts"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-orange-300/15 bg-black/25 text-orange-300/70 transition-colors hover:text-orange-200"
              aria-label="Back to Culinary Arts"
            >
              <ArrowLeft size={14} />
            </Link>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-orange-300/18 bg-orange-400/[0.07] text-orange-300">
              <ChefHat size={20} strokeWidth={1.5} />
            </span>
            <div className="min-w-0">
              <div className="font-mono text-[7px] uppercase tracking-[0.18em] text-orange-300/50">Culinary Arts</div>
              <h1 className="truncate font-serif text-3xl font-semibold tracking-[-0.04em] text-[#fff8ef] sm:text-4xl">Recipe Library</h1>
            </div>
          </div>

          <div className="flex w-full flex-col gap-2 sm:flex-row xl:w-auto">
            <form onSubmit={handleSearch} className="relative min-w-0 flex-1 xl:w-[360px]">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-600" />
              <input
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                placeholder="Search dish name..."
                className="h-10 w-full rounded-xl border border-white/[0.08] bg-black/35 pl-9 pr-9 text-[12px] text-white outline-none placeholder:text-stone-700 focus:border-orange-300/30"
              />
              {filters.query ? (
                <button
                  type="button"
                  onClick={() => {
                    clearSearch();
                    setSearchInput("");
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-stone-600 hover:text-white"
                  aria-label="Clear search"
                >
                  <X size={12} />
                </button>
              ) : null}
            </form>
            <button
              type="button"
              onClick={surprise}
              className="flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl border border-orange-300/18 bg-orange-400/[0.08] px-3 text-[9px] font-semibold uppercase tracking-[0.1em] text-orange-200 hover:bg-orange-400/[0.13]"
            >
              <Sparkles size={13} /> Surprise me
            </button>
          </div>
        </header>

        <section className="mt-3 overflow-hidden rounded-[18px] border border-orange-200/12 bg-black/[0.22] backdrop-blur-xl">
          <FilterRow icon={Flame} label="Station" rgb="251,146,60">
            <FilterPill
              label="Any"
              active={!filters.category}
              onClick={() => filters.category && setCategory(filters.category)}
            />
            {KITCHEN_STATIONS.map((station) => {
              const Icon = station.icon;
              const active = filters.category === station.id;
              return (
                <button
                  key={station.id}
                  type="button"
                  onClick={() => setCategory(station.id)}
                  className={`flex h-8 shrink-0 items-center gap-1.5 rounded-lg border px-2.5 text-[8px] font-semibold transition-colors ${
                    active
                      ? "border-orange-300/32 bg-orange-400/[0.10] text-orange-100"
                      : "border-white/[0.055] bg-black/15 text-stone-500 hover:border-white/[0.12] hover:text-stone-300"
                  }`}
                >
                  <Icon size={11} /> {station.label.replace(" (Red)", "")}
                </button>
              );
            })}
          </FilterRow>

          <FilterRow icon={Globe2} label="Cuisine" rgb="251,191,36">
            <FilterPill
              label="Anywhere"
              active={!filters.area}
              onClick={() => filters.area && setArea(filters.area)}
            />
            {CUISINES.map((area) => (
              <FilterPill
                key={area}
                label={area}
                active={filters.area === area}
                onClick={() => setArea(area)}
              />
            ))}
          </FilterRow>

          <FilterRow icon={Carrot} label="Ingredient" rgb="74,222,128" last>
            <form onSubmit={handleIngredient} className="relative w-[210px] shrink-0">
              <input
                value={ingredientInput}
                onChange={(event) => setIngredientInput(event.target.value)}
                placeholder="potato, garlic, salmon..."
                className="h-8 w-full rounded-lg border border-white/[0.06] bg-black/20 px-2.5 pr-12 text-[9px] text-white outline-none placeholder:text-stone-700 focus:border-emerald-300/25"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 h-6 rounded-md border border-emerald-300/15 bg-emerald-400/[0.06] px-2 font-mono text-[6px] uppercase tracking-[0.1em] text-emerald-300"
              >
                Add
              </button>
            </form>
            {INGREDIENT_SHORTCUTS.map((ingredient) => (
              <FilterPill
                key={ingredient}
                label={ingredient}
                active={filters.ingredient === ingredient}
                onClick={() => {
                  setIngredientInput(ingredient);
                  setIngredient(ingredient);
                }}
              />
            ))}
          </FilterRow>
        </section>

        <div className="mt-2.5 flex min-h-9 flex-wrap items-center gap-2 rounded-xl border border-white/[0.055] bg-black/20 px-3 py-2 backdrop-blur-md">
          <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-stone-600">
            {loading ? "Loading catalog" : `${data.length} recipes`}
          </span>
          <span className="h-3 w-px bg-white/[0.07]" />

          {randomMode ? (
            <span className="rounded-md border border-orange-300/16 bg-orange-400/[0.05] px-2 py-1 font-mono text-[7px] uppercase tracking-[0.1em] text-orange-300/75">
              Chef's shuffle
            </span>
          ) : activeTickets.length > 0 ? (
            activeTickets.map((ticket) => (
              <button
                key={ticket.key}
                type="button"
                onClick={ticket.clear}
                className="flex items-center gap-1 rounded-md border border-orange-300/13 bg-orange-400/[0.04] px-2 py-1 text-[8px] text-stone-400 hover:text-white"
              >
                {ticket.label} <X size={8} />
              </button>
            ))
          ) : (
            <span className="font-mono text-[7px] uppercase tracking-[0.1em] text-orange-300/55">Full catalog</span>
          )}

          {hasFilters || randomMode ? (
            <button
              type="button"
              onClick={reset}
              className="ml-auto font-mono text-[7px] uppercase tracking-[0.1em] text-stone-600 hover:text-orange-300"
            >
              Show all
            </button>
          ) : null}
        </div>

        {error ? (
          <div className="mt-4 rounded-2xl border border-red-400/15 bg-red-500/[0.05] p-5 text-sm text-red-200/70">{error}</div>
        ) : null}

        <section className="mt-3 grid grid-cols-1 gap-3 pb-12 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {loading
            ? Array.from({ length: 15 }, (_, index) => (
                <div key={index} className="aspect-[4/3] animate-pulse rounded-2xl border border-white/[0.05] bg-white/[0.035]" />
              ))
            : data.map((meal) => (
                <button
                  key={meal.id}
                  type="button"
                  onClick={() => setSelectedMealId(meal.id)}
                  className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/[0.06] bg-[#201711] text-left transition-all hover:-translate-y-0.5 hover:border-orange-300/25"
                >
                  <img
                    src={meal.thumbnail}
                    alt={meal.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/12 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-3.5">
                    <div className="mb-1.5 flex flex-wrap gap-1.5">
                      {meal.category ? (
                        <span className="rounded-full border border-orange-300/20 bg-black/45 px-2 py-0.5 font-mono text-[6px] uppercase tracking-[0.09em] text-orange-200/80">{meal.category}</span>
                      ) : null}
                      {meal.area ? (
                        <span className="rounded-full border border-white/[0.10] bg-black/45 px-2 py-0.5 font-mono text-[6px] uppercase tracking-[0.09em] text-stone-300/75">{meal.area}</span>
                      ) : null}
                    </div>
                    <h2 className="line-clamp-2 text-base font-semibold leading-tight tracking-[-0.02em] text-white">{meal.name}</h2>
                  </div>
                </button>
              ))}
        </section>

        {!loading && !error && data.length === 0 ? (
          <div className="py-20 text-center">
            <ChefHat size={28} className="mx-auto text-stone-700" />
            <h2 className="mt-4 text-lg font-semibold text-stone-300">Nothing matches this ticket</h2>
            <button type="button" onClick={reset} className="mt-3 text-xs font-semibold text-orange-300">Show the full catalog</button>
          </div>
        ) : null}

        {selectedMealId ? (
          <RecipeModal
            mealId={selectedMealId}
            fetchDetails={getRecipeDetails}
            onClose={() => setSelectedMealId(null)}
          />
        ) : null}
      </div>
    </main>
  );
}

function FilterRow({
  icon: Icon,
  label,
  rgb,
  last = false,
  children,
}: {
  icon: LucideIcon;
  label: string;
  rgb: string;
  last?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={`grid min-w-0 lg:grid-cols-[94px_minmax(0,1fr)] ${last ? "" : "border-b border-white/[0.05]"}`}>
      <div className="flex h-10 items-center gap-2 border-b border-white/[0.04] px-3 text-stone-600 lg:border-b-0 lg:border-r">
        <Icon size={12} style={{ color: `rgba(${rgb},0.72)` }} />
        <span className="font-mono text-[7px] uppercase tracking-[0.13em]">{label}</span>
      </div>
      <div className="flex min-w-0 items-center gap-1.5 overflow-x-auto p-1.5 custom-scrollbar">{children}</div>
    </div>
  );
}

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-8 shrink-0 rounded-lg border px-2.5 text-[8px] font-semibold transition-colors ${
        active
          ? "border-orange-300/28 bg-orange-400/[0.08] text-orange-100"
          : "border-white/[0.055] bg-black/15 text-stone-500 hover:border-white/[0.12] hover:text-stone-300"
      }`}
    >
      {label}
    </button>
  );
}
