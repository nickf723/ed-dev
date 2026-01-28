"use client";
import * as React from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { 
  Calculator, 
  Calendar, 
  CreditCard, 
  Settings, 
  User, 
  Layout, 
  Search,
  Zap,
  Home,
  Layers,
  Activity
} from "lucide-react";
import { useAppStore } from "../lib/store";

export function CommandMenu() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { toggleDebug, toggleSidebar } = useAppStore();

  // TOGGLE LOGIC (Ctrl + K or Cmd + K)
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // HELPER: Run action and close menu
  const run = (fn: () => void) => {
    setOpen(false);
    fn();
  };

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Global Command Menu"
      className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/60 backdrop-blur-sm transition-all animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div className="w-full max-w-xl rounded-xl border border-white/10 bg-neutral-900/90 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
        
        {/* SEARCH INPUT */}
        <div className="flex items-center border-b border-white/5 px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 text-slate-500" />
          <Command.Input 
            placeholder="Type a command or search..."
            className="flex h-12 w-full bg-transparent py-3 text-sm outline-none placeholder:text-slate-500 text-white"
          />
          <div className="flex items-center gap-1">
             <span className="text-[10px] font-mono text-slate-600 bg-white/5 px-2 py-0.5 rounded border border-white/5">ESC</span>
          </div>
        </div>

        {/* LIST */}
        <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2 scrollbar-thin scrollbar-thumb-white/10">
          <Command.Empty className="py-6 text-center text-xs text-slate-500">
            No results found.
          </Command.Empty>

          <Command.Group heading="Navigation" className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 px-2">
            <Item icon={Home} onSelect={() => run(() => router.push("/"))}>
              Dashboard
            </Item>
            <Item icon={Layers} onSelect={() => run(() => router.push("/mtg"))}>
              NFC Commander
            </Item>
            <Item icon={Activity} onSelect={() => run(() => router.push("/system-test"))}>
              System Diagnostic
            </Item>
          </Command.Group>

          <Command.Separator className="my-1 h-px bg-white/5" />

          <Command.Group heading="System Controls" className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 px-2">
            <Item icon={Layout} onSelect={() => run(toggleSidebar)}>
              Toggle Sidebar
            </Item>
            <Item icon={Zap} onSelect={() => run(toggleDebug)}>
              Toggle Debug Mode
            </Item>
          </Command.Group>

        </Command.List>
        
        {/* FOOTER */}
        <div className="border-t border-white/5 bg-black/20 px-4 py-2 flex justify-between items-center">
            <span className="text-[10px] text-slate-600">ProTip: Use arrows to navigate</span>
            <span className="text-[10px] font-mono text-cyan-900">OMNI-OS v1.0</span>
        </div>

      </div>
    </Command.Dialog>
  );
}

// HELPER COMPONENT FOR ITEMS
function Item({ children, icon: Icon, onSelect }: any) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="relative flex cursor-pointer select-none items-center rounded-lg px-2 py-2 text-sm text-slate-300 outline-none data-[selected=true]:bg-cyan-500/20 data-[selected=true]:text-cyan-400 transition-colors"
    >
      <Icon className="mr-2 h-4 w-4 opacity-70" />
      <span>{children}</span>
    </Command.Item>
  );
}