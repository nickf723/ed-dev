"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  Carrot,
  ChefHat,
  Flame,
  Globe2,
  RefreshCw,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
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
    setCategory,
    setArea,
    setIngredient,
    searchRecipe,
    clearSearch,
    clearAll,
    fetchRandom,
    getRecipeDetails,
  } = useCulinary("Beef");

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

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    searchRecipe(searchInput);
  };

  const handleIngredient = (event: React.FormEvent) => {
    event.preventDefault();
    const ingredient = ingredientInput.trim();
    if (ingredient) setIngredient(ingredient);
  };

  const handleReset = () => {
    clearAll();
    setSearchInput("");
    setIngredientInput("");
  };

  const handleRandom = () => {
    fetchRandom();
    setSearchInput("");
    setIngredientInput("");
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#130c07] text-stone-100 selection:bg-orange-400/25">
      <CulinaryBackground />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_78%_14%,rgba(251,146,60,0.14),transparent_28%),radial-gradient(circle_at_16%_80%,rgba(163,230,53,0.05),transparent_28%),linear-gradient(to_bottom,rgba(19,12,7,0.18),rgba(8,6,5,0.78))]" />
      <div className="pointer-events-none fixed inset-0 z-[1] opacity-25 [background-image:linear-gradient(rgba(251,146,60,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(251,146,60,0.03)_1px,transparent_1px)] [background-size:46px_46px]" />

      <div className="relative z-10 mx-auto min-h-screen w-full max-w-[1600px] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
        <header className="grid gap-6 border-b border-orange-200/12 pb-6 xl:grid-cols-[minmax(0,1fr)_520px] xl:items-end">
          <div>
            <Link
              href="/humanities/culinary-arts"
              className="inline-flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.18em] text-orange-300/60 transition-colors hover:text-orange-200"
            >
              <ArrowLeft size={11} /> Culinary Arts
            </Link>
            <div className="mt-4 flex items-start gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] border border-orange-300/20 bg-orange-400/[0.07] text-orange-300">
                <ChefHat size={25} strokeWidth={1.5} />
              </span>
              <div>
                <div className="font-mono text-[8px] uppercase tracking-[0.22em] text-orange-300/55">
                  Kitchen index
                </div>
                <h1 className="mt-1 font-serif text-[clamp(3.2rem,6vw,5.8rem)] font-semibold leading-[0.84] tracking-[-0.055em] text-[#fff8ef]">
                  Recipe Library
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-400">
                  Build a search from cuisine, station, ingredient, and dish name. Each layer narrows the same service ticket.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
            <form onSubmit={handleSearch} className="relative">
              <Search
                size={15}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-600"
              />
              <input
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                placeholder="Search dish name..."
                className="h-12 w-full rounded-xl border border-white/[0.08] bg-black/35 pl-11 pr-11 text-sm text-white outline-none transition-colors placeholder:text-stone-700 focus:border-orange-300/30"
              />
              {filters.query ? (
                <button
                  type="button"
                  onClick={() => {
                    clearSearch();
                    setSearchInput("");
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-stone-600 transition-colors hover:bg-white/[0.05] hover:text-white"
                  aria-label="Clear title search"
                >
                  <X size={13} />
                </button>
              ) : null}
            </form>
            <button
              type="button"
              onClick={handleRandom}
              className="flex h-12 items-center justify-center gap-2 rounded-xl border border-orange-300/20 bg-orange-400/[0.08] px-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-orange-200 transition-colors hover:bg-orange-400/[0.13]"
            >
              <Sparkles size={14} /> Surprise me
            </button>
          </div>
        </header>

        <section className="mt-5 overflow-hidden rounded-[24px] border border-orange-200/14 bg-black/[0.25] shadow-[inset_0_1px_0_rgba(255,255,255,0.035),0_20px_55px_rgba(0,0,0,0.18)] backdrop-blur-xl">
          <div className="grid border-b border-white/[0.06] lg:grid-cols-[132px_minmax(0,1fr)]">
            <div className="flex items-center gap-2 border-b border-white/[0.05] px-4 py-3 text-stone-500 lg:border-b-0 lg:border-r">
              <Flame size={14} className="text-orange-300/65" />
              <span className="font-mono text-[8px] uppercase tracking-[0.16em]">Station</span>
            </div>
            <div className="flex flex-wrap gap-2 p-3">
              <FilterButton
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
                    className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-[9px] font-semibold transition-all ${
                      active
                        ? "border-orange-300/32 bg-orange-400/[0.10] text-orange-100"
                        : "border-white/[0.06] bg-black/15 text-stone-500 hover:border-white/[0.12] hover:text-stone-300"
                    }`}
                  >
                    <Icon size={13} />
                    {station.label.replace(" (Red)", "")}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid border-b border-white/[0.06] lg:grid-cols-[132px_minmax(0,1fr)]">
            <div className="flex items-center gap-2 border-b border-white/[0.05] px-4 py-3 text-stone-500 lg:border-b-0 lg:border-r">
              <Globe2 size={14} className="text-amber-300/65" />
              <span className="font-mono text-[8px] uppercase tracking-[0.16em]">Cuisine</span>
            </div>
            <div className="flex flex-wrap gap-2 p-3">
              <FilterButton
                label="Anywhere"
                active={!filters.area}
                onClick={() => filters.area && setArea(filters.area)}
              />
              {CUISINES.map((area) => (
                <FilterButton
                  key={area}
                  label={area}
                  active={filters.area === area}
                  onClick={() => setArea(area)}
                />
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-[132px_minmax(0,1fr)]">
            <div className="flex items-center gap-2 border-b border-white/[0.05] px-4 py-3 text-stone-500 lg:border-b-0 lg:border-r">
              <Carrot size={14} className="text-emerald-300/65" />
              <span className="font-mono text-[8px] uppercase tracking-[0.16em]">Ingredient</span>
            </div>
            <div className="grid gap-3 p-3 xl:grid-cols-[330px_minmax(0,1fr)]">
              <form onSubmit={handleIngredient} className="relative">
                <input
                  value={ingredientInput}
                  onChange={(event) => setIngredientInput(event.target.value)}
                  placeholder="e.g. chickpeas, garlic, salmon..."
                  className="h-10 w-full rounded-xl border border-white/[0.07] bg-black/20 px-3 pr-20 text-[11px] text-white outline-none placeholder:text-stone-700 focus:border-emerald-300/25"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 h-7 rounded-lg border border-emerald-300/16 bg-emerald-400/[0.06] px-2.5 font-mono text-[7px] uppercase tracking-[0.12em] text-emerald-300"
                >
                  Add
                </button>
              </form>
              <div className="flex flex-wrap gap-1.5">
                {INGREDIENT_SHORTCUTS.map((ingredient) => (
                  <button
                    key={ingredient}
                    type="button"
                    onClick={() => {
                      setIngredientInput(ingredient);
                      setIngredient(ingredient);
                    }}
                    className={`rounded-lg border px-2.5 py-2 font-mono text-[7px] uppercase tracking-[0.08em] transition-colors ${
                      filters.ingredient === ingredient
                        ? "border-emerald-300/30 bg-emerald-400/[0.09] text-emerald-200"
                        : "border-white/[0.05] bg-black/15 text-stone-600 hover:text-stone-300"
                    }`}
                  >
                    {ingredient}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="mt-4 flex min-h-10 flex-wrap items-center gap-2">
          <div className="mr-1 flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.14em] text-stone-600">
            <SlidersHorizontal size={12} />
            {loading ? "Working ticket" : `${data.length} recipe${data.length === 1 ? "" : "s"}`}
          </div>

          {activeTickets.map((ticket) => (
            <button
              key={ticket.key}
              type="button"
              onClick={ticket.clear}
              className="inline-flex items-center gap-1.5 rounded-full border border-orange-300/14 bg-orange-400/[0.045] px-2.5 py-1.5 text-[8px] font-medium text-orange-100/80 transition-colors hover:bg-orange-400/[0.08]"
            >
              {ticket.label}
              <X size={9} className="text-orange-300/55" />
            </button>
          ))}

          {activeTickets.length > 0 ? (
            <button
              type="button"
              onClick={handleReset}
              className="ml-auto inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 font-mono text-[7px] uppercase tracking-[0.12em] text-stone-600 transition-colors hover:bg-white/[0.04] hover:text-stone-300"
            >
              <RefreshCw size={10} /> Clear ticket
            </button>
          ) : null}
        </div>

        {error ? (
          <div className="mt-2 rounded-xl border border-red-400/15 bg-red-400/[0.05] px-4 py-3 text-sm text-red-200/70">
            {error}
          </div>
        ) : null}

        <section className="mt-3 grid grid-cols-1 gap-4 pb-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {loading
            ? Array.from({ length: 10 }, (_, index) => (
                <div
                  key={index}
                  className="aspect-[4/5] animate-pulse rounded-[20px] border border-white/[0.05] bg-white/[0.035]"
                />
              ))
            : data.map((meal) => (
                <button
                  key={meal.id}
                  type="button"
                  onClick={() => setSelectedMealId(meal.id)}
                  className="group relative aspect-[4/5] overflow-hidden rounded-[20px] border border-white/[0.06] bg-[#211711] text-left shadow-[0_14px_35px_rgba(0,0,0,0.16)] transition-all duration-300 hover:-translate-y-1 hover:border-orange-300/24"
                >
                  {meal.thumbnail ? (
                    <img
                      src={meal.thumbnail}
                      alt={meal.name}
                      className="absolute inset-0 h-full w-full object-cover opacity-72 transition-all duration-700 group-hover:scale-105 group-hover:opacity-90"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090605] via-[#090605]/28 to-black/5" />

                  <div className="absolute inset-x-0 top-0 flex flex-wrap gap-1.5 p-3">
                    {meal.category ? (
                      <span className="rounded-full border border-orange-200/16 bg-black/45 px-2 py-1 font-mono text-[7px] uppercase tracking-[0.08em] text-orange-100/75 backdrop-blur-md">
                        {meal.category}
                      </span>
                    ) : null}
                    {meal.area ? (
                      <span className="rounded-full border border-white/[0.10] bg-black/45 px-2 py-1 font-mono text-[7px] uppercase tracking-[0.08em] text-stone-300/75 backdrop-blur-md">
                        {meal.area}
                      </span>
                    ) : null}
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <h2 className="text-lg font-semibold leading-tight tracking-[-0.025em] text-white">
                      {meal.name}
                    </h2>
                    <div className="mt-3 flex items-center justify-between border-t border-white/[0.08] pt-3 font-mono text-[7px] uppercase tracking-[0.12em] text-stone-600">
                      <span>Open recipe</span>
                      <Flame
                        size={11}
                        className="text-orange-300/60 transition-transform group-hover:scale-110"
                      />
                    </div>
                  </div>
                </button>
              ))}
        </section>

        {!loading && !error && data.length === 0 ? (
          <div className="py-20 text-center">
            <ChefHat size={30} className="mx-auto text-stone-700" strokeWidth={1.2} />
            <h2 className="mt-4 text-lg font-semibold text-stone-400">Nothing on this ticket</h2>
            <p className="mt-2 text-sm text-stone-600">
              Remove one filter or try a broader ingredient.
            </p>
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

function FilterButton({
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
      className={`rounded-xl border px-3 py-2 text-[9px] font-semibold transition-all ${
        active
          ? "border-amber-300/28 bg-amber-400/[0.08] text-amber-100"
          : "border-white/[0.06] bg-black/15 text-stone-500 hover:border-white/[0.12] hover:text-stone-300"
      }`}
    >
      {label}
    </button>
  );
}
