"use client";
import { useState, useEffect } from "react";
import { useCompanionEngine } from "../engine/useCompanionEngine";
import { CardState } from "../engine/types";
import { PRECONS } from "../engine/./precons"; // Ensure you created this file!

// SUB-COMPONENTS
import LibraryBrowser from "../engine/LibraryBrowser";
import TokenFoundry from "../engine/TokenFoundry";
import DamageMatrix from "../engine/DamageMatrix";
import ZoneBrowser from "../engine/ZoneBrowser";
import ManaPool from "../engine/ManaPool";
import PhaseTracker from "../engine/PhaseTracker";
import DiceTray from "../engine/DiceTray";

// ICONS
import { 
    Search, Plus, Minus, RotateCw, Skull, 
    Ghost, Reply, ArrowUpCircle, Eye, Users, 
    Sword, Shield, Dices, Crown, Sun, Moon,
    Trash2, PlayCircle
} from "lucide-react";

// --- VISUAL PHYSICS & ANIMATIONS ---
const PHYSICS_STYLES = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-6px); }
  }
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-4px); }
    75% { transform: translateX(4px); }
  }
  @keyframes pulse-red {
    0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
    70% { box-shadow: 0 0 0 6px rgba(239, 68, 68, 0); }
  }
  @keyframes shield-glow {
    0%, 100% { box-shadow: 0 0 5px rgba(59, 130, 246, 0.5); }
    50% { box-shadow: 0 0 15px rgba(59, 130, 246, 0.8); }
  }
  .animate-float { animation: float 3s ease-in-out infinite; }
  .animate-shake { animation: shake 0.3s ease-in-out; }
  .animate-haste { animation: pulse-red 2s infinite; }
  .animate-vigilance { animation: shield-glow 3s infinite; }
  .animate-bounce-short { animation: float 1s ease-in-out 1; }
`;

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
      modifyMana,
      createToken,
      playCommander,
      modifyCommanderDamage,
      activePlayerIndex,
      phase,
      setPhase,
      passTurn,
      resetGame,
      loading 
  } = useCompanionEngine();
  
  // --- GLOBAL UI STATE ---
  const [setup, setSetup] = useState(true);
  const [deckInput, setDeckInput] = useState("1 Sol Ring\n1 Command Tower\n1 Arcane Signet");
  
  // --- GAMEPLAY VISUALS ---
  const [stormCount, setStormCount] = useState(0);
  const [isNight, setIsNight] = useState(false);
  const [shakePlayerId, setShakePlayerId] = useState<string | null>(null);
  
  // --- MODAL STATES ---
  const [browsingPlayerId, setBrowsingPlayerId] = useState<string | null>(null);
  const [foundryPlayerId, setFoundryPlayerId] = useState<string | null>(null);
  const [activePlayerId, setActivePlayerId] = useState<string | null>(null); 
  const [damageMatrixOpen, setDamageMatrixOpen] = useState(false);
  const [zoneBrowser, setZoneBrowser] = useState<{ pid: string, zone: 'graveyard' | 'exile' } | null>(null);
  const [diceTrayOpen, setDiceTrayOpen] = useState(false);

  // --- INTERACTION STATE ---
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [contextMenu, setContextMenu] = useState<{ x: number, y: number, card: CardState } | null>(null);

  // Close context menu
  useEffect(() => {
    const handleClick = () => setContextMenu(null);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  // VISUAL LOGIC: Handle Life Change with Feedback
  const handleLifeChange = (pid: string, amount: number) => {
    modifyLife(pid, amount);
    if (amount < 0) {
        setShakePlayerId(pid);
        setTimeout(() => setShakePlayerId(null), 300);
    }
  };

  // --- SUB-COMPONENT: CARD TOKEN ---
  const CardToken = ({ card }: { card: CardState }) => {
      const handleContextMenu = (e: React.MouseEvent) => {
          e.preventDefault();
          setContextMenu({ x: e.clientX, y: e.clientY, card });
      };

      // VISUAL MECHANIC FLAGS
      const isFlying = card.notes?.includes("FLYING");
      const isVigilance = card.notes?.includes("VIGILANCE");
      const isHaste = card.notes?.includes("HASTE");
      const isLegend = card.notes?.includes("LEGEND") || card.typeLine?.includes("Legendary");
      const isCommander = card.notes?.includes("Commander");

      return (
        <div 
            onClick={(e) => { e.stopPropagation(); toggleTap(card.ownerId, card.instanceId); }}
            onContextMenu={handleContextMenu}
            onMouseEnter={() => setHoveredCard(card.imageUrl)}
            onMouseLeave={() => setHoveredCard(null)}
            className={`
                relative w-24 h-32 rounded-[5%] cursor-pointer transition-all duration-300 group select-none shadow-lg
                bg-[#171717]
                
                /* TAPPED STATE */
                ${card.tapped 
                    ? "rotate-90 ring-1 ring-zinc-500 opacity-60 translate-y-2 grayscale-[0.5]" 
                    : "hover:-translate-y-2 hover:z-50 hover:ring-2 ring-[#fbbf24] hover:shadow-[0_10px_25px_rgba(251,191,36,0.2)]"
                }

                /* ANIMATIONS (Only when untapped) */
                ${!card.tapped && isFlying ? "animate-float shadow-xl z-10" : ""}
                ${!card.tapped && isHaste ? "animate-haste" : ""}
                ${!card.tapped && isVigilance ? "animate-vigilance border-blue-400/30" : ""}

                /* BORDERS */
                ${isCommander ? "border-2 border-[#fbbf24] shadow-[0_0_10px_rgba(251,191,36,0.1)]" : "border border-white/5"}
                ${isLegend && !isCommander ? "border border-[#fbbf24]/50" : ""}
                
                active:scale-95
            `}
        >
            {/* KEYWORD BADGES */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex gap-1 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                {isFlying && <div className="text-[7px] font-bold bg-sky-600 text-white px-1.5 rounded-full shadow border border-white/10">FLY</div>}
                {isVigilance && <div className="text-[7px] font-bold bg-white text-black px-1.5 rounded-full shadow">VIG</div>}
                {isHaste && <div className="text-[7px] font-bold bg-red-600 text-white px-1.5 rounded-full shadow border border-white/10">HST</div>}
            </div>

            <div className="w-full h-full rounded-[4%] overflow-hidden relative">
                {card.imageUrl ? (
                    <img src={card.imageUrl} className="w-full h-full object-cover" alt={card.name} />
                ) : (
                    <div className="w-full h-full flex flex-col p-2 items-center justify-center text-center bg-zinc-900">
                        <div className="text-[9px] font-bold text-white leading-tight">{card.name}</div>
                        <div className="text-[8px] text-zinc-500 mt-1">{card.power}/{card.toughness}</div>
                        {card.notes && <div className="text-[7px] text-[#fbbf24] mt-1 uppercase truncate max-w-full px-1">{card.notes}</div>}
                    </div>
                )}
                
                {/* GLOSS EFFECT */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                {/* COUNTER BADGE */}
                {card.counters > 0 && (
                    <div className="absolute top-1 right-1 min-w-[1.5rem] h-6 px-1 bg-white/90 rounded text-black font-bold flex items-center justify-center text-xs shadow-lg z-10 animate-in zoom-in">
                        {card.counters}
                    </div>
                )}
            </div>
        </div>
      );
  };

  return (
    <div className={`w-full h-[850px] border border-[#b45309]/30 rounded-xl relative font-sans overflow-hidden flex shadow-2xl transition-colors duration-1000 ${isNight ? "bg-[#020617]" : "bg-[#0c0a09]"}`}>
        
        {/* INJECT STYLES */}
        <style>{PHYSICS_STYLES}</style>

        {/* DAY/NIGHT OVERLAY */}
        <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${isNight ? "bg-blue-900/10" : "bg-orange-500/5"}`} />

        {/* --- TOP FLOATING UI --- */}
        {players.length > 0 && (
            <>
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40">
                    <PhaseTracker 
                        activePlayerName={players[activePlayerIndex]?.name || "Setup"}
                        phase={phase}
                        onNextPhase={setPhase}
                        onPassTurn={passTurn}
                    />
                </div>
                <div className="absolute top-4 right-4 z-40 flex gap-2">
                     <button onClick={() => setDiceTrayOpen(true)} className="bg-zinc-800 hover:text-white text-zinc-400 p-2 rounded-full border border-zinc-700 shadow-lg" title="Dice Tray">
                        <Dices size={16}/>
                     </button>
                     <button onClick={resetGame} className="bg-red-900/20 hover:bg-red-900 text-red-500 hover:text-white p-2 rounded-full border border-red-900/50 shadow-lg" title="Reset Game">
                        <Trash2 size={16}/>
                     </button>
                </div>
            </>
        )}

        {/* --- LEFT SIDEBAR --- */}
        <div className="w-64 bg-[#1c1917] border-r border-white/10 flex flex-col p-4 relative z-30 shadow-xl">
            {/* INSPECTOR */}
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

            {/* BUTTONS */}
            <div className="space-y-3 border-t border-white/5 pt-4">
                <button 
                    onClick={() => setDamageMatrixOpen(true)}
                    className="w-full py-2 bg-red-900/20 hover:bg-red-900/40 text-red-400 border border-red-900/50 rounded flex items-center justify-center gap-2 text-xs font-bold transition-all"
                >
                    <Sword size={14} /> COMMANDER DMG
                </button>
            </div>

            {/* TRACKERS */}
            <div className="space-y-3 border-t border-white/5 pt-4">
                {/* STORM */}
                <div className="flex items-center justify-between bg-black/40 p-2 rounded border border-white/5">
                    <div className="flex flex-col">
                        <span className="text-[9px] font-bold text-zinc-500 uppercase">Storm Count</span>
                        <span className="text-xl font-mono text-[#fbbf24] font-bold leading-none">{stormCount}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <button onClick={() => setStormCount(s => s + 1)} className="px-2 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-xs text-white rounded">+</button>
                        <button onClick={() => setStormCount(0)} className="px-2 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-[8px] text-zinc-500 rounded">RST</button>
                    </div>
                </div>

                {/* DAY/NIGHT */}
                <button 
                    onClick={() => setIsNight(!isNight)}
                    className={`w-full py-2 border rounded flex items-center justify-center gap-2 text-xs font-bold transition-all duration-500
                    ${isNight ? "bg-indigo-950 border-indigo-500 text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.3)]" : "bg-orange-950/30 border-orange-500/50 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.1)]"}
                    `}
                >
                    {isNight ? <Moon size={14} className="fill-current"/> : <Sun size={14} className="fill-current"/>}
                    {isNight ? "NIGHTBOUND" : "DAYBOUND"}
                </button>
            </div>
            
            {/* FOOTER */}
            <div className="mt-auto border-t border-white/5 pt-4">
                <h4 className="text-zinc-500 font-bold text-[10px] uppercase mb-2">Controls</h4>
                <div className="space-y-1 text-[10px] text-zinc-600 font-mono">
                    <div className="flex justify-between"><span>Tap</span> <span>Click</span></div>
                    <div className="flex justify-between"><span>Menu</span> <span>R-Click</span></div>
                    <div className="flex justify-between"><span>Summon</span> <span>(+)</span></div>
                </div>
            </div>
        </div>


        {/* --- MAIN BATTLEFIELD (GRID) --- */}
        <div className="flex-1 flex flex-wrap relative bg-[#0f0f0f]">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none" />

            {players.map((p, i) => (
                <div 
                    key={p.id} 
                    className={`
                        w-1/2 h-1/2 border-r border-b border-white/5 last:border-0 relative flex flex-col group
                        ${i === activePlayerIndex ? "ring-2 ring-inset ring-[#fbbf24]/30" : ""}
                        ${shakePlayerId === p.id ? "animate-shake bg-red-900/10" : ""}
                    `}
                >
                    
                    {/* PLAYER HUD */}
                    <div className="h-14 bg-[#0c0a09]/90 border-b border-white/5 flex items-center justify-between px-4 z-20">
                        <div className="flex items-center gap-3 min-w-0">
                            <div className={`w-2 h-2 rounded-full ${i===activePlayerIndex ? "bg-[#fbbf24] animate-pulse" : "bg-zinc-600"}`} />
                            <span className="font-bold text-white text-xs truncate">{p.name}</span>
                            
                            {/* MANA POOL */}
                            <div className="ml-2 hidden xl:block">
                                <ManaPool pool={p.manaPool} onModify={(c, a) => modifyMana(p.id, c, a)} />
                            </div>
                        </div>
                        
                        {/* COUNTERS */}
                        <div className="flex items-center gap-4">
                            <div className="flex flex-col items-center">
                                <span className="text-[8px] text-zinc-500 uppercase font-bold">LIFE</span>
                                <div className="flex items-center bg-black/40 rounded border border-white/10">
                                    <button onClick={() => handleLifeChange(p.id, -1)} className="px-1.5 hover:text-white text-red-500">-</button>
                                    <span className="w-8 text-center font-mono font-bold text-white text-sm">{p.life}</span>
                                    <button onClick={() => handleLifeChange(p.id, 1)} className="px-1.5 hover:text-white text-green-500">+</button>
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
                    </div>

                    {/* BOARD */}
                    <div className="flex-1 p-4 flex flex-wrap content-start gap-3 overflow-y-auto bg-[url('/noise.png')] bg-opacity-5 relative">
                        {p.board.length === 0 && <div className="w-full text-center text-zinc-800 text-xs font-bold uppercase mt-10">Empty Board</div>}
                        {p.board.map(c => <CardToken key={c.instanceId} card={c} />)}
                    </div>
                    
                    {/* ZONE TOGGLES */}
                    <div className="absolute bottom-2 left-4 flex gap-3 text-[9px] font-mono text-zinc-600 z-20">
                         <button onClick={() => setZoneBrowser({ pid: p.id, zone: 'graveyard' })} className="hover:text-zinc-300 flex items-center gap-1">
                            <Skull size={10} /> GY: {p.graveyard.length}
                         </button>
                         <button onClick={() => setZoneBrowser({ pid: p.id, zone: 'exile' })} className="hover:text-zinc-300 flex items-center gap-1">
                            <Ghost size={10} /> EX: {p.exile.length}
                         </button>
                    </div>

                    {/* FLOATING COMMAND ZONE */}
                    {p.command.length > 0 && (
                        <div className="absolute top-16 right-4 z-20 flex flex-col items-center animate-in slide-in-from-right">
                             <div className="text-[9px] font-bold text-[#fbbf24] bg-black/60 px-2 rounded-t border-t border-x border-[#fbbf24]/30">
                                TAX: {p.commanderTax}
                             </div>
                             <div 
                                onClick={() => playCommander(p.id)}
                                className="w-16 h-20 rounded border-2 border-[#fbbf24] bg-zinc-900 cursor-pointer hover:scale-105 transition-transform shadow-[0_0_15px_rgba(251,191,36,0.3)] relative group overflow-hidden"
                             >
                                {p.command[0].imageUrl ? <img src={p.command[0].imageUrl} className="w-full h-full object-cover opacity-80 group-hover:opacity-100" alt="Commander"/> : <div className="p-1 text-[8px] text-center text-[#fbbf24]">{p.command[0].name}</div>}
                                <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity font-bold text-[10px] text-white">
                                    CAST
                                </div>
                             </div>
                        </div>
                    )}

                    {/* HOVER ACTIONS */}
                    <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30">
                        <button onClick={() => setBrowsingPlayerId(p.id)} className="bg-zinc-800 hover:bg-zinc-700 text-white p-2 rounded-full shadow-lg border border-zinc-600" title="Library"><Search size={16}/></button>
                        <button onClick={() => setFoundryPlayerId(p.id)} className="bg-zinc-800 hover:bg-zinc-700 text-white p-2 rounded-full shadow-lg border border-zinc-600" title="Tokens"><Dices size={16}/></button>
                        <button onClick={() => { setActivePlayerId(p.id); setSearchQuery(""); }} className="bg-[#b45309] hover:bg-[#d97706] text-white p-2 rounded-full shadow-lg shadow-orange-900/20" title="Summon"><Plus size={16}/></button>
                    </div>

                </div>
            ))}
        </div>


        {/* --- MODALS --- */}

        {/* 1. SETUP */}
        {setup && !loading && (
            <div className="absolute inset-0 z-[60] bg-black/90 flex items-center justify-center p-4">
                <div className="bg-zinc-900 border border-[#b45309] p-8 rounded-xl w-full max-w-lg shadow-2xl">
                    <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-2 font-serif uppercase tracking-widest">
                        <Users className="text-[#fbbf24]"/> Initialize Pod
                    </h2>
                    
                    {/* PRECON LOADER BUTTON */}
                    <button 
                        onClick={() => {
                            addPlayer("The Ur-Dragon", PRECONS.DRAGONS.deck);
                            addPlayer("The Scarab God", PRECONS.ZOMBIES.deck);
                            addPlayer("Urza", PRECONS.ARTIFACTS.deck);
                            addPlayer("Lathril", PRECONS.ELVES.deck);
                            setSetup(false);
                        }}
                        className="w-full mb-6 py-3 bg-zinc-800 hover:bg-zinc-700 border border-[#fbbf24]/50 text-[#fbbf24] font-bold rounded flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-[1.02]"
                    >
                        <PlayCircle size={18}/> LOAD COMMANDER PRECONS
                    </button>

                    <div className="relative border-t border-white/10 my-6">
                        <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-zinc-900 px-2 text-xs text-zinc-500">OR CUSTOM</span>
                    </div>

                    <div className="mb-6">
                        <label className="text-xs text-zinc-400 font-bold uppercase mb-2 block">Custom Decklist (For all players)</label>
                        <textarea value={deckInput} onChange={e => setDeckInput(e.target.value)} className="w-full h-24 bg-black border border-zinc-700 p-2 rounded text-white font-mono text-xs focus:border-[#fbbf24] outline-none" />
                    </div>
                    
                    <button onClick={() => {
                        addPlayer("Player 1", deckInput); addPlayer("Player 2", deckInput);
                        addPlayer("Player 3", deckInput); addPlayer("Player 4", deckInput);
                        setSetup(false);
                    }} className="w-full py-4 bg-[#b45309] hover:bg-[#d97706] text-white font-bold rounded text-lg transition-transform hover:scale-[1.02]">
                        START CUSTOM GAME
                    </button>
                </div>
            </div>
        )}

        {/* 2. LOADING */}
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
                
                <div className="grid grid-cols-2 gap-1 px-2 py-1 mb-1 border-b border-zinc-800">
                    <button onClick={() => { modifyCounters(contextMenu.card.ownerId, contextMenu.card.instanceId, 1); setContextMenu(null); }} className="bg-zinc-800 hover:bg-zinc-700 text-white text-[10px] rounded py-1 flex items-center justify-center gap-1"><Plus size={10}/> Cnt</button>
                    <button onClick={() => { modifyCounters(contextMenu.card.ownerId, contextMenu.card.instanceId, -1); setContextMenu(null); }} className="bg-zinc-800 hover:bg-zinc-700 text-white text-[10px] rounded py-1 flex items-center justify-center gap-1"><Minus size={10}/> Cnt</button>
                </div>

                <button onClick={() => { moveCard(contextMenu.card.ownerId, contextMenu.card.instanceId, 'graveyard'); setContextMenu(null); }} className="w-full text-left px-2 py-1.5 text-xs text-zinc-300 hover:bg-red-900 hover:text-white rounded flex items-center gap-2"><Skull size={12}/> Destroy</button>
                <button onClick={() => { moveCard(contextMenu.card.ownerId, contextMenu.card.instanceId, 'exile'); setContextMenu(null); }} className="w-full text-left px-2 py-1.5 text-xs text-zinc-300 hover:bg-zinc-700 hover:text-white rounded flex items-center gap-2"><Ghost size={12}/> Exile</button>
                <button onClick={() => { moveCard(contextMenu.card.ownerId, contextMenu.card.instanceId, 'hand'); setContextMenu(null); }} className="w-full text-left px-2 py-1.5 text-xs text-zinc-300 hover:bg-blue-900 hover:text-white rounded flex items-center gap-2"><Reply size={12}/> Bounce</button>
                <button onClick={() => { moveCard(contextMenu.card.ownerId, contextMenu.card.instanceId, 'command'); setContextMenu(null); }} className="w-full text-left px-2 py-1.5 text-xs text-[#fbbf24] hover:bg-[#fbbf24]/20 rounded flex items-center gap-2 mt-1 border-t border-zinc-800"><Crown size={12}/> To Command</button>
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

        {/* 9. DICE TRAY */}
        {diceTrayOpen && <DiceTray onClose={() => setDiceTrayOpen(false)} />}

    </div>
  );
}