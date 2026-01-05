"use client";
import { useState, useEffect } from "react";
import { useCompanionEngine } from "./useCompanionEngine";
import { CardState } from "./types";
import DiceTray from "./DiceTray";

// SUB-COMPONENTS
import LibraryBrowser from "./LibraryBrowser";
import TokenFoundry from "./TokenFoundry";
import DamageMatrix from "./DamageMatrix";
import ZoneBrowser from "./ZoneBrowser";
import ManaPool from "./ManaPool";
import PhaseTracker from "./PhaseTracker";

// ICONS
import { 
    Search, Plus, Minus, RotateCw, Skull, 
    Ghost, Reply, ArrowUpCircle, Eye, Users, 
    Sword, Shield, Dices, Crown, Trash2
} from "lucide-react";

export default function CommanderTable() {
  const { 
      players, 
      addPlayer, 
      summonCard, 
      playFromLibrary, 
      toggleTap, 
      moveCard, 
      modifyLife, 
      modifyHandSize, 
      modifyCounters, 
      createToken,
      playCommander,
      modifyCommanderDamage,
      loading,
      passTurn,
      modifyMana,
      phase,
      setPhase,
      activePlayerIndex,
      returnCommanderToZone,
      resetGame
  } = useCompanionEngine();
  const [diceOpen, setDiceOpen] = useState(false);
  const [monarchId, setMonarchId] = useState<string | null>(null)

  // --- UI STATE ---
  const [setup, setSetup] = useState(true);
  const [deckInput, setDeckInput] = useState("1 Sol Ring\n1 Command Tower\n1 Arcane Signet");
  
  // MODAL STATES
  const [browsingPlayerId, setBrowsingPlayerId] = useState<string | null>(null);
  const [foundryPlayerId, setFoundryPlayerId] = useState<string | null>(null);
  const [activePlayerId, setActivePlayerId] = useState<string | null>(null); // For Oracle Summoner
  const [damageMatrixOpen, setDamageMatrixOpen] = useState(false);
  const [zoneBrowser, setZoneBrowser] = useState<{ pid: string, zone: 'graveyard' | 'exile' } | null>(null);

  // INTERACTION STATE
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [contextMenu, setContextMenu] = useState<{ x: number, y: number, card: CardState } | null>(null);

  // Close context menu on click elsewhere
  useEffect(() => {
    const handleClick = () => setContextMenu(null);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  // --- SUB-RENDER: CARD TOKEN ---
  const CardToken = ({ card }: { card: CardState }) => {
      const handleContextMenu = (e: React.MouseEvent) => {
          e.preventDefault();
          setContextMenu({ x: e.clientX, y: e.clientY, card });
      };

      return (
        <div 
            onClick={(e) => { e.stopPropagation(); toggleTap(card.ownerId, card.instanceId); }}
            onContextMenu={handleContextMenu}
            onMouseEnter={() => setHoveredCard(card.imageUrl)}
            onMouseLeave={() => setHoveredCard(null)}
            className={`
                relative w-24 h-32 bg-[#171717] rounded-[5%] cursor-pointer transition-all duration-300 group select-none shadow-lg
                ${card.tapped ? "rotate-90 ring-2 ring-zinc-500 opacity-80 translate-y-2" : "hover:-translate-y-2 hover:z-20 hover:ring-2 ring-[#fbbf24]"}
                ${card.notes?.includes("Commander") ? "border-2 border-[#fbbf24]" : "border border-white/5"}
            `}
        >
            <div className="w-full h-full rounded-[4%] overflow-hidden relative">
                {card.imageUrl ? (
                    <img src={card.imageUrl} className="w-full h-full object-cover" alt={card.name} />
                ) : (
                    <div className="w-full h-full flex flex-col p-2 items-center justify-center text-center">
                        <div className="text-[9px] font-bold text-white leading-tight">{card.name}</div>
                        <div className="text-[8px] text-zinc-500 mt-1">{card.power}/{card.toughness}</div>
                        {card.notes && <div className="text-[7px] text-[#fbbf24] mt-1 uppercase">{card.notes}</div>}
                    </div>
                )}
                
                {/* COUNTER BADGE */}
                {card.counters > 0 && (
                    <div className="absolute top-1 right-1 w-6 h-6 bg-white/90 rounded text-black font-bold flex items-center justify-center text-xs shadow-lg z-10 animate-bounce-short">
                        {card.counters}
                    </div>
                )}
            </div>
        </div>
      );
  };

  return (
    <div className="w-full h-[850px] bg-[#0c0a09] border border-[#b45309]/30 rounded-xl relative font-sans overflow-hidden flex shadow-2xl">
        
        {/* --- LEFT SIDEBAR: INSPECTOR & GLOBAL TOOLS --- */}
        <div className="w-64 bg-[#1c1917] border-r border-white/10 flex flex-col p-4 relative z-30 shadow-xl">
            {/* INSPECTOR VIEW */}
            <h3 className="text-xs font-bold text-[#fbbf24] uppercase tracking-widest mb-4 flex items-center gap-2">
                <Eye size={14}/> Oracle Eye
            </h3>
            <div className="w-full aspect-[2.5/3.5] bg-black/50 rounded-lg border border-zinc-700 flex items-center justify-center overflow-hidden shadow-2xl relative mb-4">
                {hoveredCard ? (
                    <img src={hoveredCard} className="w-full h-full object-contain" alt="Preview" />
                ) : (
                    <div className="text-zinc-600 text-xs text-center px-4">Hover over a card to inspect</div>
                )}
                {/* Holo Scanline */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none" />
            </div>

            {/* GLOBAL BUTTONS */}
            <div className="space-y-3 border-t border-white/5 pt-4">
                <button 
                    onClick={() => setDamageMatrixOpen(true)}
                    className="w-full py-2 bg-red-900/20 hover:bg-red-900/40 text-red-400 border border-red-900/50 rounded flex items-center justify-center gap-2 text-xs font-bold transition-all"
                >
                    <Sword size={14} /> COMMANDER DMG
                </button>
            </div>

            {/* GUIDE */}
            <div className="mt-auto border-t border-white/5 pt-4">
                <h4 className="text-zinc-500 font-bold text-[10px] uppercase mb-2">Shortcuts</h4>
                <div className="space-y-1 text-[10px] text-zinc-600 font-mono">
                    <div className="flex justify-between"><span>Tap/Untap</span> <span>L-Click</span></div>
                    <div className="flex justify-between"><span>Context Menu</span> <span>R-Click</span></div>
                    <div className="flex justify-between"><span>Oracle</span> <span>(+) Btn</span></div>
                </div>
            </div>
        </div>

        {/* --- TOP BAR: PHASE TRACKER --- */}
            {players.length > 0 && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40">
                    <PhaseTracker 
                        activePlayerName={players[activePlayerIndex]?.name || "Setup"}
                        phase={phase}
                        onNextPhase={setPhase}
                        onPassTurn={passTurn}
                    />
                </div>
            )}
            <div className="absolute top-4 right-4 z-40 flex gap-2">
                 <button onClick={() => setDiceOpen(true)} className="bg-zinc-800 hover:text-white text-zinc-400 p-2 rounded-full border border-zinc-700 shadow-lg" title="Dice Tray">
                    <Dices size={16}/>
                 </button>
                 <button onClick={resetGame} className="bg-red-900/20 hover:bg-red-900 text-red-500 hover:text-white p-2 rounded-full border border-red-900/50 shadow-lg" title="Reset Game">
                    <Trash2 size={16}/>
                 </button>
            </div>

        {/* --- MAIN BATTLEFIELD (4-PLAYER GRID) --- */}
        <div className="flex-1 flex flex-wrap relative bg-[#0f0f0f]">
            {/* GRID BACKGROUND */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none" />

            {players.map((p, i) => (
                <div key={p.id} className="w-1/2 h-1/2 border-r border-b border-white/5 last:border-0 relative flex flex-col group">
                    
                    {/* PLAYER HUD */}
                    <div className="h-12 bg-[#0c0a09]/90 border-b border-white/5 flex items-center justify-between px-4 z-20">
                        <div className="flex items-center gap-3 min-w-0">
                            <div className={`w-2 h-2 rounded-full ${i===0 ? "bg-[#fbbf24]" : "bg-zinc-600"}`} />
                            <span className="font-bold text-white text-xs truncate">{p.name}</span>
                        </div>

                        
                        
                        {/* Life / Hand Counters */}
                        <div className="flex items-center gap-4">
                            <div className="flex flex-col items-center">
                                <span className="text-[8px] text-zinc-500 uppercase font-bold">LIFE</span>
                                <div className="flex items-center bg-black/40 rounded border border-white/10">
                                    <button onClick={() => modifyLife(p.id, -1)} className="px-1.5 hover:text-white text-red-500">-</button>
                                    <span className="w-6 text-center font-mono font-bold text-white text-sm">{p.life}</span>
                                    <button onClick={() => modifyLife(p.id, 1)} className="px-1.5 hover:text-white text-green-500">+</button>
                                </div>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-[8px] text-zinc-500 uppercase font-bold">HAND</span>
                                <div className="flex items-center bg-black/40 rounded border border-white/10">
                                    <button onClick={() => modifyHandSize(p.id, -1)} className="px-1.5 hover:text-white text-zinc-500">-</button>
                                    <span className="w-6 text-center font-mono font-bold text-zinc-300 text-sm">{p.handSize}</span>
                                    <button onClick={() => modifyHandSize(p.id, 1)} className="px-1.5 hover:text-white text-zinc-500">+</button>
                                </div>
                            </div>
                        </div>

                        {/* Mana Pool */}
                        <ManaPool
                            pool={p.manaPool}
                            onModify={(color, amt) => modifyMana(p.id, color, amt)}
                            />
                    </div>

                    {/* BOARD AREA */}
                    <div className="flex-1 p-4 flex flex-wrap content-start gap-3 overflow-y-auto bg-[url('/noise.png')] bg-opacity-5">
                        {p.board.map(c => <CardToken key={c.instanceId} card={c} />)}
                    </div>
                    
                    {/* BOTTOM BAR: GRAVEYARD / EXILE TOGGLES */}
                    <div className="absolute bottom-2 left-4 flex gap-3 text-[9px] font-mono text-zinc-600 z-20">
                         <button onClick={() => setZoneBrowser({ pid: p.id, zone: 'graveyard' })} className="hover:text-zinc-300 flex items-center gap-1">
                            <Skull size={10} /> GY: {p.graveyard.length}
                         </button>
                         <button onClick={() => setZoneBrowser({ pid: p.id, zone: 'exile' })} className="hover:text-zinc-300 flex items-center gap-1">
                            <Ghost size={10} /> EX: {p.exile.length}
                         </button>
                    </div>

                    {/* COMMAND ZONE (Floating) */}
                    {p.command.length > 0 && (
                        <div className="absolute top-14 right-4 z-20 flex flex-col items-center animate-in slide-in-from-right">
                             <div className="text-[9px] font-bold text-[#fbbf24] bg-black/60 px-2 rounded-t border-t border-x border-[#fbbf24]/30">
                                TAX: {p.commanderTax}
                             </div>
                             <div 
                                onClick={() => playCommander(p.id)}
                                className="w-16 h-20 rounded border-2 border-[#fbbf24] bg-zinc-900 cursor-pointer hover:scale-105 transition-transform shadow-[0_0_15px_rgba(251,191,36,0.3)] relative group overflow-hidden"
                             >
                                {p.command[0].imageUrl ? <img src={p.command[0].imageUrl} className="w-full h-full object-cover opacity-80 group-hover:opacity-100"/> : <div className="p-1 text-[8px] text-center text-[#fbbf24]">{p.command[0].name}</div>}
                                <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity font-bold text-[10px] text-white">
                                    CAST
                                </div>
                             </div>
                        </div>
                    )}

                    {/* ACTION BUTTONS (Hover Reveal) */}
                    <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30">
                        <button onClick={() => setBrowsingPlayerId(p.id)} className="bg-zinc-800 hover:bg-zinc-700 text-white p-2 rounded-full shadow-lg border border-zinc-600" title="Search Library"><Search size={16}/></button>
                        <button onClick={() => setFoundryPlayerId(p.id)} className="bg-zinc-800 hover:bg-zinc-700 text-white p-2 rounded-full shadow-lg border border-zinc-600" title="Create Token"><Dices size={16}/></button>
                        <button onClick={() => { setActivePlayerId(p.id); setSearchQuery(""); }} className="bg-[#b45309] hover:bg-[#d97706] text-white p-2 rounded-full shadow-lg shadow-orange-900/20" title="Oracle Summon"><Plus size={16}/></button>
                    </div>

                </div>
            ))}
        </div>


        {/* --- MODALS & OVERLAYS --- */}

        {/* 1. SETUP MODAL */}
        {setup && !loading && (
            <div className="absolute inset-0 z-[60] bg-black/90 flex items-center justify-center p-4">
                <div className="bg-zinc-900 border border-[#b45309] p-8 rounded-xl w-full max-w-lg shadow-2xl">
                    <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-2 font-serif uppercase tracking-widest">
                        <Users className="text-[#fbbf24]"/> Initialize Pod
                    </h2>
                    <div className="mb-6 space-y-4">
                        <div>
                            <label className="text-xs text-zinc-400 font-bold uppercase mb-2 block">Default Decklist (Optional)</label>
                            <textarea value={deckInput} onChange={e => setDeckInput(e.target.value)} className="w-full h-24 bg-black border border-zinc-700 p-2 rounded text-white font-mono text-xs focus:border-[#fbbf24] outline-none" />
                        </div>
                        <div className="p-4 bg-zinc-800/50 rounded border border-white/5 text-xs text-zinc-400">
                            Pro Tip: You can add Commanders later via the Oracle Summoner (add them to board, then right-click to move to Command Zone if needed, or simply summon directly).
                        </div>
                    </div>
                    <button onClick={() => {
                        addPlayer("Player 1", deckInput); addPlayer("Player 2", deckInput);
                        addPlayer("Player 3", deckInput); addPlayer("Player 4", deckInput);
                        setSetup(false);
                    }} className="w-full py-4 bg-[#b45309] hover:bg-[#d97706] text-white font-bold rounded text-lg transition-transform hover:scale-[1.02]">
                        START 4-PLAYER GAME
                    </button>
                </div>
            </div>
        )}

        {/* 2. LOADING SPINNER */}
        {loading && (
            <div className="absolute inset-0 z-[70] bg-black/80 backdrop-blur flex items-center justify-center flex-col gap-4">
                <div className="w-12 h-12 border-4 border-[#b45309] border-t-transparent rounded-full animate-spin"/>
                <div className="text-[#fbbf24] font-mono animate-pulse">SUMMONING LIBRARY...</div>
            </div>
        )}

        {/* 3. CONTEXT MENU */}
        {contextMenu && (
            <div 
                className="fixed z-[100] bg-zinc-900 border border-zinc-700 shadow-2xl rounded-lg p-1 min-w-[160px] animate-in fade-in zoom-in-95 duration-100"
                style={{ top: contextMenu.y, left: contextMenu.x }}
                onClick={e => e.stopPropagation()}
            >
                <div className="px-2 py-1 text-[10px] text-zinc-500 font-bold uppercase border-b border-zinc-800 mb-1 truncate">{contextMenu.card.name}</div>
                
                {/* Counter Controls */}
                <div className="grid grid-cols-2 gap-1 px-2 py-1 mb-1 border-b border-zinc-800">
                    <button onClick={() => { modifyCounters(contextMenu.card.ownerId, contextMenu.card.instanceId, 1); setContextMenu(null); }} className="bg-zinc-800 hover:bg-zinc-700 text-white text-[10px] rounded py-1 flex items-center justify-center gap-1"><Plus size={10}/> Cnt</button>
                    <button onClick={() => { modifyCounters(contextMenu.card.ownerId, contextMenu.card.instanceId, -1); setContextMenu(null); }} className="bg-zinc-800 hover:bg-zinc-700 text-white text-[10px] rounded py-1 flex items-center justify-center gap-1"><Minus size={10}/> Cnt</button>
                </div>

                {/* Move Controls */}
                <button onClick={() => { moveCard(contextMenu.card.ownerId, contextMenu.card.instanceId, 'graveyard'); setContextMenu(null); }} className="w-full text-left px-2 py-1.5 text-xs text-zinc-300 hover:bg-red-900 hover:text-white rounded flex items-center gap-2"><Skull size={12}/> Destroy</button>
                <button onClick={() => { moveCard(contextMenu.card.ownerId, contextMenu.card.instanceId, 'exile'); setContextMenu(null); }} className="w-full text-left px-2 py-1.5 text-xs text-zinc-300 hover:bg-zinc-700 hover:text-white rounded flex items-center gap-2"><Ghost size={12}/> Exile</button>
                <button onClick={() => { moveCard(contextMenu.card.ownerId, contextMenu.card.instanceId, 'hand'); setContextMenu(null); }} className="w-full text-left px-2 py-1.5 text-xs text-zinc-300 hover:bg-blue-900 hover:text-white rounded flex items-center gap-2"><Reply size={12}/> Bounce</button>
                
                {/* Make Commander (if needed) */}
                <button onClick={() => { /* Logic to set as commander would go here */ setContextMenu(null); }} className="w-full text-left px-2 py-1.5 text-xs text-[#fbbf24] hover:bg-[#fbbf24]/20 rounded flex items-center gap-2 mt-1 border-t border-zinc-800"><Crown size={12}/> Set Cmdr</button>
            </div>
        )}

        {/* 4. ORACLE SEARCH */}
        {activePlayerId && (
            <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-32" onClick={() => setActivePlayerId(null)}>
                <div className="bg-[#1c1917] border border-zinc-700 p-4 rounded-xl w-full max-w-md shadow-2xl animate-in slide-in-from-top-4" onClick={e => e.stopPropagation()}>
                    <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2"><Search size={14} className="text-[#fbbf24]"/> Oracle Summoner</h3>
                    <div className="flex gap-2">
                        <input autoFocus placeholder="Card Name..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { summonCard(activePlayerId, searchQuery); setActivePlayerId(null); } }} className="flex-1 bg-black border border-zinc-700 p-2 rounded text-white text-sm focus:border-[#fbbf24] outline-none"/>
                        <button onClick={() => { summonCard(activePlayerId, searchQuery); setActivePlayerId(null); }} className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 rounded text-xs font-bold">CAST</button>
                    </div>
                </div>
            </div>
        )}

        {/* 5. LIBRARY BROWSER */}
        {browsingPlayerId && (
            <LibraryBrowser 
                playerId={browsingPlayerId} 
                library={players.find(p => p.id === browsingPlayerId)?.library || []} 
                onPlay={(pid, cid) => playFromLibrary(pid, cid)} 
                onClose={() => setBrowsingPlayerId(null)} 
            />
        )}

        {/* 6. TOKEN FOUNDRY */}
        {foundryPlayerId && (
            <TokenFoundry 
                playerId={foundryPlayerId}
                onCreate={createToken}
                onClose={() => setFoundryPlayerId(null)}
            />
        )}

        {/* 7. DAMAGE MATRIX */}
        {damageMatrixOpen && (
            <DamageMatrix 
                players={players}
                onModify={modifyCommanderDamage}
                onClose={() => setDamageMatrixOpen(false)}
            />
        )}

        {/* 8. ZONE BROWSER */}
        {zoneBrowser && (
            <ZoneBrowser 
                title={`${zoneBrowser.zone} Viewer`}
                cards={players.find(p => p.id === zoneBrowser.pid)?.[zoneBrowser.zone] || []}
                onClose={() => setZoneBrowser(null)}
                onMove={(cid, dest) => { moveCard(zoneBrowser.pid, cid, dest); }}
            />
        )}

        {diceOpen && <DiceTray onClose={() => setDiceOpen(false)} />}
    </div>
  );
}