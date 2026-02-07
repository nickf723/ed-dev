"use client";
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Search, MapPin, Navigation, Info } from 'lucide-react';
import { UB_BUILDINGS, type Building, type Campus } from './ubBuildings';

// Fix for default Leaflet marker icons in Next.js
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// --- CONTROLLER COMPONENT (Handles Panning) ---
function MapController({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.5 });
  }, [center, zoom, map]);
  return null;
}

export default function UBCampusMap() {
  const [activeCampus, setActiveCampus] = useState<Campus>('North');
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Default Centers
  const centers: Record<Campus, [number, number]> = {
    'North': [43.0008, -78.7890],
    'South': [42.9530, -78.8177],
    'Downtown': [42.8950, -78.8700] // Medical Campus
  };

  // Filter Logic
  const filteredBuildings = UB_BUILDINGS.filter(b => 
    (b.campus === activeCampus) && 
    (b.name.toLowerCase().includes(searchQuery.toLowerCase()) || b.type.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleBuildingSelect = (b: Building) => {
      setSelectedBuilding(b);
      // We don't automatically zoom in too close, just center
  };

  return (
    <div className="w-full h-[600px] bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl relative">
      
      {/* SIDEBAR CONTROL PANEL */}
      <div className="w-full md:w-80 bg-slate-900 border-r border-slate-800 flex flex-col z-10">
          
          {/* Header & Campus Switcher */}
          <div className="p-4 border-b border-slate-800 bg-slate-950">
              <div className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Navigation size={14} /> UB Navigator
              </div>
              <div className="flex gap-2">
                  {(['North', 'South', 'Downtown'] as Campus[]).map(c => (
                      <button 
                        key={c}
                        onClick={() => { setActiveCampus(c); setSelectedBuilding(null); }}
                        className={`flex-1 py-1.5 rounded text-[10px] font-bold uppercase transition-all border ${activeCampus === c ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'}`}
                      >
                          {c} Campus
                      </button>
                  ))}
              </div>
          </div>

          {/* Search */}
          <div className="p-4 border-b border-slate-800">
              <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input 
                    type="text" 
                    placeholder="Find building..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 pl-9 pr-4 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                  />
              </div>
          </div>

          {/* Building List */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
              {filteredBuildings.length === 0 ? (
                  <div className="p-8 text-center text-slate-600 text-xs">No locations found.</div>
              ) : (
                  filteredBuildings.map(b => (
                      <button
                        key={b.id}
                        onClick={() => handleBuildingSelect(b)}
                        className={`w-full text-left p-4 border-b border-slate-800 hover:bg-slate-800/50 transition-all group ${selectedBuilding?.id === b.id ? 'bg-blue-900/20 border-l-4 border-l-blue-500' : 'border-l-4 border-l-transparent'}`}
                      >
                          <div className="flex justify-between items-start mb-1">
                              <span className={`font-bold text-sm ${selectedBuilding?.id === b.id ? 'text-blue-400' : 'text-slate-300 group-hover:text-white'}`}>{b.name}</span>
                              <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-500 uppercase">{b.type}</span>
                          </div>
                          <div className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed">
                              {b.desc}
                          </div>
                      </button>
                  ))
              )}
          </div>
      </div>

      {/* MAP AREA */}
      <div className="flex-1 relative z-0">
          <MapContainer 
            center={centers['North']} 
            zoom={15} 
            style={{ height: "100%", width: "100%", background: '#020617' }}
            zoomControl={false}
          >
              {/* Dark Mode Map Tiles (CartoDB Dark Matter) */}
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              />

              {/* FlyTo Controller */}
              <MapController 
                center={selectedBuilding ? [selectedBuilding.lat, selectedBuilding.lng] : centers[activeCampus]} 
                zoom={selectedBuilding ? 17 : 15} 
              />

              {/* Markers */}
              {filteredBuildings.map(b => (
                  <Marker 
                    key={b.id} 
                    position={[b.lat, b.lng]} 
                    icon={icon}
                    eventHandlers={{
                        click: () => handleBuildingSelect(b)
                    }}
                  >
                      <Popup className="custom-popup">
                          <div className="text-slate-900">
                              <strong className="block text-sm mb-1">{b.name}</strong>
                              <span className="text-xs text-slate-600">{b.type}</span>
                          </div>
                      </Popup>
                  </Marker>
              ))}
          </MapContainer>

          {/* Map Overlay Info (Floating Card) */}
          <div className="absolute top-4 right-4 z-[400] bg-slate-900/90 backdrop-blur-md border border-slate-700 p-3 rounded-lg shadow-xl max-w-xs hidden md:block">
              <div className="flex items-center gap-2 text-xs font-bold text-white mb-1">
                  <MapPin size={12} className="text-blue-500" />
                  {activeCampus} Campus
              </div>
              <div className="text-[10px] text-slate-400 font-mono">
                  {filteredBuildings.length} Active Nodes
              </div>
          </div>
          
      </div>
    </div>
  );
}