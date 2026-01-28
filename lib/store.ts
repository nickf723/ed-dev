import { create } from 'zustand';

// 1. Define the Shape of a "Rich Card"
export interface CardData {
  id: string;
  name: string;
  cmc: number; // Converted Mana Cost (for the curve)
  price: number; // USD Price (for the ticker)
  image: string;
  type: string;
}

interface AppState {
  ui: {
    sidebarOpen: boolean;
    debugMode: boolean;
  };
  toggleSidebar: () => void;
  toggleDebug: () => void;

  scanner: {
    history: CardData[]; // <--- NOW STORES FULL OBJECTS
  };
  
  // 2. Updated Actions
  addCard: (card: CardData) => void;
  clearHistory: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  ui: { sidebarOpen: true, debugMode: false },
  toggleSidebar: () => set((state) => ({ ui: { ...state.ui, sidebarOpen: !state.ui.sidebarOpen } })),
  toggleDebug: () => set((state) => ({ ui: { ...state.ui, debugMode: !state.ui.debugMode } })),

  scanner: { history: [] },
  
  addCard: (card) => set((state) => {
    // Prevent duplicates based on ID
    if (state.scanner.history.find(c => c.id === card.id)) return state;
    return { 
      scanner: { ...state.scanner, history: [card, ...state.scanner.history] } 
    };
  }),
  
  clearHistory: () => set({ scanner: { history: [] } }),
}));