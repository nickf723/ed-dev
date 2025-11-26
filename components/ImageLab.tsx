"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Sliders, Image as ImageIcon, Maximize, Sun, Contrast, Save, X } from "lucide-react";

type ImageLabProps = {
  src: string | null;
  onClose: () => void;
};

export default function ImageLab({ src, onClose }: ImageLabProps) {
  const [zoom, setZoom] = useState(100);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [grayscale, setGrayscale] = useState(0);

  if (!src) return null;

  return (
    <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
        className="glass rounded-xl border border-white/10 bg-neutral-900/95 overflow-hidden flex flex-col h-[500px]"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/5">
          <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-pink-400">
              <Sliders size={14} /> Image Lab
          </h3>
          <button onClick={onClose} className="p-1 hover:text-white text-neutral-500 transition-colors"><X size={16} /></button>
      </div>

      <div className="flex-1 flex overflow-hidden">
          
          {/* Main Viewport */}
          <div className="flex-1 bg-[url('/grid.svg')] bg-center relative overflow-hidden flex items-center justify-center p-8">
              <motion.img 
                  src={src}
                  alt="Lab Subject"
                  className="max-w-full max-h-full shadow-2xl rounded-sm object-contain"
                  style={{
                      filter: `brightness(${brightness}%) contrast(${contrast}%) grayscale(${grayscale}%)`,
                      scale: zoom / 100
                  }}
              />
              {/* HUD Overlay */}
              <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/50 backdrop-blur rounded text-[10px] font-mono text-neutral-400 border border-white/10">
                  RES: {zoom}% | B: {brightness} | C: {contrast}
              </div>
          </div>

          {/* Controls Sidebar */}
          <div className="w-64 border-l border-white/5 bg-neutral-900 p-6 space-y-6 z-10">
              
              {/* Zoom */}
              <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold text-neutral-400 uppercase">
                      <span className="flex items-center gap-1"><Maximize size={10}/> Scale</span>
                      <span>{zoom}%</span>
                  </div>
                  <input 
                      type="range" min="50" max="200" value={zoom} 
                      onChange={(e) => setZoom(Number(e.target.value))}
                      className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
                  />
              </div>

              {/* Brightness */}
              <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold text-neutral-400 uppercase">
                      <span className="flex items-center gap-1"><Sun size={10}/> Brightness</span>
                      <span>{brightness}%</span>
                  </div>
                  <input 
                      type="range" min="0" max="200" value={brightness} 
                      onChange={(e) => setBrightness(Number(e.target.value))}
                      className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                  />
              </div>

              {/* Contrast */}
              <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold text-neutral-400 uppercase">
                      <span className="flex items-center gap-1"><Contrast size={10}/> Contrast</span>
                      <span>{contrast}%</span>
                  </div>
                  <input 
                      type="range" min="0" max="200" value={contrast} 
                      onChange={(e) => setContrast(Number(e.target.value))}
                      className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-violet-500"
                  />
              </div>

              {/* Filters */}
              <div className="pt-4 border-t border-white/5">
                  <label className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-4 h-4 rounded border transition-colors flex items-center justify-center ${grayscale ? "bg-white border-white" : "border-neutral-600 bg-transparent"}`}>
                          {grayscale ? <div className="w-2 h-2 bg-black" /> : null}
                      </div>
                      <input 
                          type="checkbox" checked={!!grayscale} 
                          onChange={() => setGrayscale(grayscale ? 0 : 100)} 
                          className="hidden"
                      />
                      <span className="text-xs font-medium text-neutral-400 group-hover:text-white transition-colors">B&W Mode</span>
                  </label>
              </div>

              {/* Action */}
              <button className="w-full py-3 mt-4 rounded-lg bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2">
                  <Save size={14} /> Save Asset
              </button>

          </div>
      </div>
    </motion.div>
  );
}