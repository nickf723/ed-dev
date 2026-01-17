import { Utensils, Coffee, Carrot, Beef, Fish, Wheat, Flame, IceCream } from "lucide-react";

export const KITCHEN_STATIONS = [
  { id: 'Beef', label: 'Butcher (Red)', icon: Beef, color: 'text-red-400', border: 'border-red-500/30' },
  { id: 'Chicken', label: 'Poultry', icon: Utensils, color: 'text-orange-300', border: 'border-orange-500/30' },
  { id: 'Seafood', label: 'Fishmonger', icon: Fish, color: 'text-blue-400', border: 'border-blue-500/30' },
  { id: 'Vegetarian', label: 'Garden', icon: Carrot, color: 'text-emerald-400', border: 'border-emerald-500/30' },
  { id: 'Pasta', label: 'Grains & Pasta', icon: Wheat, color: 'text-yellow-200', border: 'border-yellow-500/30' },
  { id: 'Dessert', label: 'Patisserie', icon: IceCream, color: 'text-pink-300', border: 'border-pink-500/30' },
  { id: 'Starter', label: 'Appetizers', icon: Coffee, color: 'text-amber-400', border: 'border-amber-500/30' },
];

export const CUISINES = ['Italian', 'Japanese', 'French', 'American', 'Indian', 'Mexican', 'Chinese', 'Greek', 'Thai', 'Spanish'];