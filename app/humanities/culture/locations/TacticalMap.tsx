"use client";
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { LOCATIONS } from './locationsData';
import { Wind, Thermometer, Wifi, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import './map-styles.css';

// Fix icons
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

function MapController({ target, isGlobal }: { target: [number, number], isGlobal: boolean }) {
  const map = useMap();
  useEffect(() => {
    if (isGlobal) {
        map.flyTo([25, 0], 2, { duration: 1.5 });
    } else {
        // Zoom to 8 (closer) and center EXACTLY on target.
        // This ensures the marker is dead-center, giving the popup maximum room.
        map.flyTo(target, 8, { duration: 1.5 });
    }
  }, [target, isGlobal, map]);
  return null;
}

function WeatherPopup({ lat, lng, name, link, status }: any) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        setError(false);
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`)
            .then(res => {
                if(!res.ok) throw new Error("Offline");
                return res.json();
            })
            .then(d => {
                if(d.current_weather) setData(d.current_weather);
                else setError(true);
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    }, [lat, lng]);

    return (
        <div className="w-56 font-sans bg-slate-900 text-slate-200">
            <div className="flex justify-between items-center border-b border-slate-700 pb-2 mb-3">
                <h3 className="font-black text-white uppercase text-sm tracking-wide">{name}</h3>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${status === 'Online' ? 'bg-green-900/30 text-green-400 border-green-500/30' : 'bg-red-900/30 text-red-400 border-red-500/30'}`}>
                    {status}
                </span>
            </div>
            
            {loading ? (
                <div className="flex items-center gap-2 text-[10px] text-cyan-400 animate-pulse py-2">
                    <Loader2 size={12} className="animate-spin" /> SCANNING ATMOSPHERE...
                </div>
            ) : error ? (
                <div className="text-[10px] text-red-400 py-2">Telemetry Offline</div>
            ) : (
                <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="bg-slate-800/50 p-2 rounded border border-slate-700">
                        <div className="flex items-center gap-1 text-[9px] text-slate-500 uppercase font-bold mb-1">
                            <Thermometer size={10} className="text-red-500" /> Temp
                        </div>
                        <div className="text-lg font-mono font-bold text-white leading-none">
                            {data?.temperature ?? '--'}°
                        </div>
                    </div>
                    <div className="bg-slate-800/50 p-2 rounded border border-slate-700">
                        <div className="flex items-center gap-1 text-[9px] text-slate-500 uppercase font-bold mb-1">
                            <Wind size={10} className="text-blue-500" /> Wind
                        </div>
                        <div className="text-lg font-mono font-bold text-white leading-none">
                            {data?.windspeed ?? '--'} <span className="text-[9px] text-slate-400">km/h</span>
                        </div>
                    </div>
                </div>
            )}

            {status === 'Online' && (
                <Link 
                    href={link}
                    className="flex items-center justify-center gap-2 w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-[10px] font-bold uppercase rounded transition-all shadow-[0_0_15px_rgba(8,145,178,0.4)] hover:shadow-[0_0_20px_rgba(8,145,178,0.6)]"
                >
                    Enter System <ArrowRight size={12} />
                </Link>
            )}
        </div>
    );
}

export default function TacticalMap({ activeId, onSelect }: { activeId: string | null, onSelect: (id: string) => void }) {
  const activeLoc = LOCATIONS.find(l => l.id === activeId);
  const isGlobal = activeId === 'global' || !activeId;
  const center: [number, number] = activeLoc ? activeLoc.coords : [0, 0];

  return (
    <MapContainer 
        center={[20, 0]} 
        zoom={2} 
        scrollWheelZoom={true} 
        className="w-full h-full z-0 bg-[#020617]"
    >
      <TileLayer
        attribution='&copy; CARTO'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      
      <MapController target={center} isGlobal={isGlobal} />

      {LOCATIONS.map(loc => (
        <Marker 
            key={loc.id} 
            position={loc.coords} 
            icon={icon}
            eventHandlers={{
                click: () => onSelect(loc.id)
            }}
        >
          <Popup 
             className="dark-popup" 
             // FIX: High padding forces the map to pan if the popup is anywhere near the edge
             autoPanPadding={[100, 100]}
             closeButton={false}
             // Offset moves the popup slightly higher so it doesn't cover the pin
             offset={[0, -25]}
          >
              <WeatherPopup {...loc} />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}