"use client";
import { useState, useEffect } from "react";
import { useGameEngine } from "./useGameEngine";
import { Layers, RotateCw, Plus, Minus, Download, Skull, Ghost, Reply, ArrowUpCircle } from "lucide-react";

export default function GameTable() {
  const { game, addPlayer, drawCard, tapCard, playCard, moveCard, loading } = useGameEngine();
  
  // Setup State
  const [setupMode, setSetupMode] = useState(true);
  const [deckInput, setDeckInput] = useState("1 Sol Ring\n1 Arcane Signet\n1 Command Tower\n1 Lightning Bolt\n1 Counterspell\n1 Birds of Paradise\n1 Wrath of God\n1 Llanowar Elves\n5 Mountain\n5 Island");
  const [playerName, setPlayerName] = useState("Planeswalker");
  
  // Context Menu State
  const [contextMenu, setContextMenu] = useState<{ x: number, y: number, cardId: string, ownerId: string, currentZone: string } | null>(null);

  // Close context menu on click elsewhere
  useEffect(() => {
    const closeMenu = () => setContextMenu(null);
    window.addEventListener('click', closeMenu);
    return () => window.removeEventListener('click', closeMenu);
  }, []);

  // --- CARD COMPONENT ---
  const CardView = ({ card, playerId, inHand = false }: { card: any, playerId: string, inHand?: boolean }) => {
      
      const handleRightClick = (e: React.MouseEvent) => {
          e.preventDefault();
          setContextMenu({ 
              x: e.clientX, 
              y: e.clientY, 
              cardId: card.id, 
              ownerId: playerId,
              currentZone: card.zone 
          });
      };

      return (
        <div 
            onClick={(e) => {
                e.stopPropagation();
                if (inHand) playCard(playerId, card.id);
                else tapCard(playerId, card.id);
            }}
            onContextMenu={handleRightClick}
            className={`
                relative rounded-[4.5%] bg-[#171717] select-none
                shadow-[0_4px_10px_rgba(0,0,0,0.5)] cursor-pointer transition-all duration-300 ease-out group
                ${inHand ? "w-32 h-44 hover:-translate-y-12 hover:z-50 hover:scale-110 -ml-12 first:ml-0 border-2 border-black hover:border-[#fbbf24]" : "w-24 h-32"}
                ${!inHand && card.tapped ? "rotate-90 ring-1 ring-zinc-500 opacity-80 shadow-none translate-y-2" : !inHand ? "hover:-translate-y-2 hover:z-20 hover:shadow-[0_10px_20px_rgba(0,0,0,0.8)]" : ""}
            `}
        >
            {/* CARD ART / FRAME */}
            <div className="w-full h-full rounded-[4%] overflow-hidden relative">
                {card.imageUrl ? (
                    <img src={card.imageUrl} alt={card.name} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex flex-col p-2 bg-zinc-800 border-4 border-zinc-600">
                         <div className="text-[10px] font-bold text-zinc-300 border-b border-zinc-600 pb-1 mb-1">{card.name}</div>
                         <div className="flex-1 bg-zinc-900/50 rounded flex items-center justify-center text-[8px] text-zinc-500">No Image</div>
                    </div>
                )}
                
                {/* FOIL SHEEN (CSS Only) */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none mix-blend-overlay" />
                
                {/* TAP ICON OVERLAY */}
                {card.tapped && !inHand && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <RotateCw size={24} className="text-white drop-shadow-lg" />
                    </div>
                )}
            </div>
        </div>
      );
  };

  // --- RENDER ---
  return (
    <div className="w-full min-h-[700px] bg-[#0c0a09] border border-[#b45309]/30 rounded-xl relative font-sans overflow-hidden flex flex-col shadow-2xl">
        
        {/* CONTEXT MENU */}
        {contextMenu && (
            <div 
                className="fixed z-[100] bg-zinc-900 border border-zinc-700 shadow-2xl rounded-lg p-1 min-w-[160px] animate-in fade-in zoom-in-95 duration-100"
                style={{ top: contextMenu.y, left: contextMenu.x }}
            >
                <div className="px-2 py-1 text-[10px] text-zinc-500 font-bold uppercase border-b border-zinc-800 mb-1">Move To...</div>
                
                {contextMenu.currentZone !== 'hand' && (
                    <button onClick={() => moveCard(contextMenu.ownerId, contextMenu.cardId, contextMenu.currentZone as any, 'hand')} className="w-full text-left px-2 py-1.5 text-xs text-zinc-300 hover:bg-blue-600 hover:text-white rounded flex items-center gap-2">
                        <Reply size={12}/> Hand
                    </button>
                )}
                {contextMenu.currentZone !== 'graveyard' && (
                    <button onClick={() => moveCard(contextMenu.ownerId, contextMenu.cardId, contextMenu.currentZone as any, 'graveyard')} className="w-full text-left px-2 py-1.5 text-xs text-zinc-300 hover:bg-red-900 hover:text-white rounded flex items-center gap-2">
                        <Skull size={12}/> Graveyard
                    </button>
                )}
                {contextMenu.currentZone !== 'exile' && (
                    <button onClick={() => moveCard(contextMenu.ownerId, contextMenu.cardId, contextMenu.currentZone as any, 'exile')} className="w-full text-left px-2 py-1.5 text-xs text-zinc-300 hover:bg-zinc-700 hover:text-white rounded flex items-center gap-2">
                        <Ghost size={12}/> Exile
                    </button>
                )}
                {contextMenu.currentZone !== 'battlefield' && (
                    <button onClick={() => moveCard(contextMenu.ownerId, contextMenu.cardId, contextMenu.currentZone as any, 'battlefield')} className="w-full text-left px-2 py-1.5 text-xs text-zinc-300 hover:bg-green-700 hover:text-white rounded flex items-center gap-2">
                        <ArrowUpCircle size={12}/> Battlefield
                    </button>
                )}
            </div>
        )}

        {/* LOADING OVERLAY */}
        {loading && (
            <div className="absolute inset-0 z-[60] bg-black/80 backdrop-blur flex items-center justify-center flex-col gap-4">
                <div className="w-12 h-12 border-4 border-[#b45309] border-t-transparent rounded-full animate-spin"/>
                <div className="text-[#fbbf24] font-mono animate-pulse">SUMMONING LIBRARY...</div>
            </div>
        )}

        {/* SETUP SCREEN */}
        {setupMode && !loading && (
            <div className="absolute inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
                <div className="bg-zinc-900 border border-[#b45309] p-8 rounded-xl w-full max-w-2xl shadow-[0_0_50px_rgba(180,83,9,0.2)]">
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <Download className="text-[#fbbf24]" /> Initialize Engine
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs text-zinc-400 font-bold uppercase">Player Name</label>
                                <input value={playerName} onChange={e => setPlayerName(e.target.value)} className="w-full bg-black border border-zinc-700 p-3 rounded text-white focus:border-[#fbbf24] outline-none transition-colors" />
                            </div>
                            <div>
                                <label className="text-xs text-zinc-400 font-bold uppercase">Decklist (Text Format)</label>
                                <textarea 
                                    value={deckInput} 
                                    onChange={e => setDeckInput(e.target.value)} 
                                    className="w-full h-40 bg-black border border-zinc-700 p-3 rounded text-white font-mono text-xs focus:border-[#fbbf24] outline-none transition-colors resize-none" 
                                    placeholder="1 Sol Ring..."
                                />
                            </div>
                        </div>
                        <div className="bg-zinc-800/50 p-4 rounded border border-white/5 flex flex-col justify-between">
                            <div className="space-y-2">
                                <h4 className="text-white font-bold text-sm">Instructions</h4>
                                <ul className="text-xs text-zinc-400 list-disc list-inside space-y-1">
                                    <li>Paste a decklist from Moxfield/Archidekt.</li>
                                    <li>Format: <code className="bg-black px-1 rounded">Qty Name</code></li>
                                    <li>Engine will fetch art automatically.</li>
                                </ul>
                            </div>
                            <button 
                                onClick={() => { addPlayer(playerName, deckInput); setSetupMode(false); }}
                                className="w-full py-3 bg-gradient-to-r from-[#b45309] to-[#d97706] hover:from-[#d97706] hover:to-[#f59e0b] text-white font-bold rounded shadow-lg transform active:scale-95 transition-all"
                            >
                                START GAME
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* --- ACTIVE GAME VIEW --- */}
        {game.players.map(player => {
            // Split Battlefield: Lands go to back row, Non-lands go to front row
            const lands = player.battlefield.filter((c: any) => c.typeLine.toLowerCase().includes('land'));
            const nonLands = player.battlefield.filter((c: any) => !c.typeLine.toLowerCase().includes('land'));

            return (
                <div key={player.id} className="flex-1 flex flex-col relative h-full">
                    
                    {/* BATTLEFIELD (3D PERSPECTIVE) */}
                    <div className="flex-1 bg-[#151515] relative overflow-hidden perspective-1000 flex flex-col">
                        
                        {/* DECORATION */}
                        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none" />
                        
                        {/* Front Row (Creatures/Artifacts) */}
                        <div className="flex-1 flex items-end justify-center gap-2 p-4 pb-2 z-10">
                            {nonLands.length === 0 && <div className="text-zinc-700 font-bold uppercase tracking-widest text-sm border-2 border-dashed border-zinc-800 px-4 py-2 rounded">Combat Zone</div>}
                            {nonLands.map(c => <CardView key={c.id} card={c} playerId={player.id} />)}
                        </div>

                        {/* Back Row (Lands) - Slightly darker background to separate */}
                        <div className="h-1/3 bg-[#0f0f0f] border-t border-white/5 flex items-center justify-center gap-2 p-4 pt-2 z-0">
                            {lands.length === 0 && <div className="text-zinc-800 font-bold uppercase tracking-widest text-xs">Mana Zone</div>}
                            {lands.map(c => <CardView key={c.id} card={c} playerId={player.id} />)}
                        </div>

                    </div>

                    {/* PLAYER HUD */}
                    <div className="h-40 bg-[#0c0a09] border-t border-[#b45309] flex relative z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
                        
                        {/* AVATAR & STATS */}
                        <div className="w-48 bg-[#1c1917] p-4 flex flex-col justify-between border-r border-white/10">
                            <div>
                                <div className="text-xs text-[#fbbf24] font-bold uppercase tracking-widest mb-1">Player</div>
                                <div className="text-white font-bold truncate">{player.name}</div>
                            </div>
                            
                            {/* Life Counter */}
                            <div className="flex items-center justify-between bg-black/50 rounded-lg p-1 border border-white/10">
                                <button className="w-8 h-8 flex items-center justify-center bg-red-900/30 hover:bg-red-500/20 text-red-500 rounded transition-colors"><Minus size={14}/></button>
                                <div className="text-2xl font-black text-white">{player.life}</div>
                                <button className="w-8 h-8 flex items-center justify-center bg-green-900/30 hover:bg-green-500/20 text-green-500 rounded transition-colors"><Plus size={14}/></button>
                            </div>

                            <div className="flex justify-between text-[9px] text-zinc-500 font-mono uppercase">
                                <div>GY: {player.graveyard.length}</div>
                                <div>EX: {player.exile.length}</div>
                            </div>
                        </div>

                        {/* HAND ZONE */}
                        <div className="flex-1 relative flex items-center px-12 overflow-x-auto overflow-y-visible">
                            <div className="absolute top-2 left-2 text-[9px] font-bold text-zinc-600 uppercase tracking-widest">Hand ({player.hand.length})</div>
                            <div className="flex items-center pt-8 pl-8 pr-8 mx-auto">
                                {player.hand.length === 0 && <div className="text-zinc-700 text-sm font-mono">NO CARDS</div>}
                                {player.hand.map(c => <CardView key={c.id} card={c} playerId={player.id} inHand={true} />)}
                            </div>
                        </div>

                        {/* DECK ACTIONS */}
                        <div className="w-32 bg-[#1c1917] border-l border-white/10 flex flex-col items-center justify-center gap-2 p-2">
                             <div className="w-20 h-24 bg-[#1e1b4b] rounded border-2 border-zinc-700 flex flex-col items-center justify-center cursor-pointer hover:border-[#fbbf24] transition-colors group" onClick={() => drawCard(player.id)}>
                                 <div className="text-2xl font-black text-zinc-600 group-hover:text-white transition-colors">{player.library.length}</div>
                                 <div className="text-[9px] text-zinc-500 font-bold uppercase">Library</div>
                             </div>
                             <div className="text-[9px] text-zinc-500">Click to Draw</div>
                        </div>

                    </div>
                </div>
            );
        })}

    </div>
  );
}