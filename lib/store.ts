import { create } from 'zustand';

// 1. Define the Background Theme Interface (Optional, but good for safety)
export interface BackgroundTheme {
  id: string;
  name: string;
  value: string;
  type: 'css' | 'image';
}

interface AppState {
  // SYSTEM STATE
  ui: {
    sidebarOpen: boolean;
    debugMode: boolean;
    activeBackgroundId: string; // <--- FIX: Ensure this is "active", not "activate"
  };

  // ACTIONS
  toggleSidebar: () => void;
  toggleDebug: () => void;
  setBackground: (id: string) => void;

  // SCANNER STATE (Keep this if you still have the scanner code)
  scanner: {
    history: any[]; 
  };
  addCard: (card: any) => void;
  clearHistory: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  // System Defaults
  ui: { 
    sidebarOpen: true, 
    debugMode: false,
    activeBackgroundId: "default-void" // <--- FIX: Initialize it here
  },

  toggleSidebar: () => set((state) => ({ ui: { ...state.ui, sidebarOpen: !state.ui.sidebarOpen } })),
  toggleDebug: () => set((state) => ({ ui: { ...state.ui, debugMode: !state.ui.debugMode } })),
  
  // FIX: Action to update the background
  setBackground: (id) => set((state) => ({ 
    ui: { ...state.ui, activeBackgroundId: id } 
  })),

  // Scanner Defaults
  scanner: { history: [] },
  addCard: (card) => set((state) => ({ scanner: { ...state.scanner, history: [card, ...state.scanner.history] } })),
  clearHistory: () => set({ scanner: { history: [] } }),
}));