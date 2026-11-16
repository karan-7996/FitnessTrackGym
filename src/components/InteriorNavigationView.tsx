import React, { useState } from 'react';
import { Branch, InteriorZone } from '../data/branches';
import {
  X,
  Compass,
  Layers,
  Dumbbell,
  HeartPulse,
  Flame,
  Music,
  Sparkles,
  Phone,
  Clock,
  MapPin,
  ChevronRight,
  Maximize2,
  CalendarCheck,
  ShieldCheck,
  Info,
} from 'lucide-react';

interface InteriorNavigationViewProps {
  branch: Branch;
  onClose: () => void;
  onBookAppointment: (branchId: string) => void;
}

export const InteriorNavigationView: React.FC<InteriorNavigationViewProps> = ({
  branch,
  onClose,
  onBookAppointment,
}) => {
  const [activeZoneIndex, setActiveZoneIndex] = useState(0);
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);

  const zones = branch.interiorZones;
  const currentZone = zones[activeZoneIndex] || zones[0];

  const getCategoryIcon = (category: InteriorZone['category']) => {
    switch (category) {
      case 'strength':
        return <Dumbbell className="w-4 h-4 text-rose-400" />;
      case 'cardio':
        return <HeartPulse className="w-4 h-4 text-sky-400" />;
      case 'functional':
        return <Flame className="w-4 h-4 text-orange-400" />;
      case 'studio':
        return <Music className="w-4 h-4 text-emerald-400" />;
      case 'wellness':
        return <Sparkles className="w-4 h-4 text-purple-400" />;
      default:
        return <Layers className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-xl animate-fade-in">
      {/* Modal Container */}
      <div className="relative w-full max-w-6xl h-[92vh] max-h-[880px] bg-neutral-950 border border-white/15 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header Bar */}
        <div className="px-4 sm:px-8 py-4 border-b border-white/10 flex items-center justify-between bg-neutral-900/90 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-white p-1 border border-white/40 shadow-md flex items-center justify-center shrink-0">
              <img
                src="/assets/aistudio/Stylized_Navy_Longhorn_Skull_Emblem_1bf15f81.png"
                alt="FTG"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-bold tracking-wider text-rose-400">
                  Interior Navigation Tour
                </span>
                <span className="text-neutral-500">·</span>
                <span className="text-xs text-neutral-300 font-semibold truncate">
                  {branch.floor} · {branch.buildingName}
                </span>
              </div>
              <h2 className="text-lg sm:text-2xl font-anton tracking-wide text-white uppercase truncate">
                {branch.name} BRANCH INTERIOR
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onBookAppointment(branch.id)}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-lg active:scale-95 cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Book Trial Here</span>
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close interior navigation"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Zone Navigation Pills / Tabs */}
        <div className="px-4 sm:px-8 py-3 bg-neutral-900/40 border-b border-white/5 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
          <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest shrink-0 mr-2">
            ZONES:
          </span>
          {zones.map((zone, idx) => (
            <button
              key={zone.id}
              onClick={() => {
                setActiveZoneIndex(idx);
                setSelectedHotspot(null);
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                activeZoneIndex === idx
                  ? 'bg-white text-neutral-950 font-bold shadow-md scale-102'
                  : 'bg-white/5 text-neutral-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {getCategoryIcon(zone.category)}
              <span>{zone.name}</span>
            </button>
          ))}
        </div>

        {/* Main Body Grid */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 overflow-y-auto">
          
          {/* Left / Center: Interactive 3D Perspective Visual Viewport (Cols 1-7) */}
          <div className="lg:col-span-7 bg-neutral-900/60 p-4 sm:p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 relative overflow-hidden">
            
            {/* Top Viewport Telemetry Bar */}
            <div className="flex items-center justify-between text-xs text-neutral-400 mb-3 z-10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-neutral-200 uppercase font-semibold">
                  3D View · {currentZone.name}
                </span>
              </div>
              <div className="flex items-center gap-3 text-[11px]">
                <span>Area: <strong className="text-white">{currentZone.floorArea}</strong></span>
                <span>·</span>
                <span>Capacity: <strong className="text-white">{currentZone.capacity}</strong></span>
              </div>
            </div>

            {/* Interactive SVG/Canvas Perspective Render of the Gym Zone */}
            <div className="relative w-full flex-1 min-h-[260px] sm:min-h-[340px] rounded-2xl bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 border border-white/10 shadow-inner overflow-hidden flex items-center justify-center p-4">
              
              {/* Perspective Grid Floor */}
              <div
                className="absolute inset-0 opacity-25"
                style={{
                  backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)`,
                  backgroundSize: '40px 40px',
                  transform: 'perspective(400px) rotateX(45deg) translateY(-20px)',
                  transformOrigin: 'bottom center',
                }}
              />

              {/* Ambient Accent Glow based on Zone */}
              <div
                className="absolute inset-x-12 top-6 h-40 rounded-full opacity-30 blur-3xl pointer-events-none"
                style={{
                  background:
                    currentZone.category === 'strength'
                      ? 'radial-gradient(circle, #EF4444 0%, transparent 70%)'
                      : currentZone.category === 'cardio'
                      ? 'radial-gradient(circle, #0284C7 0%, transparent 70%)'
                      : currentZone.category === 'functional'
                      ? 'radial-gradient(circle, #EA580C 0%, transparent 70%)'
                      : 'radial-gradient(circle, #10B981 0%, transparent 70%)',
                }}
              />

              {/* Architectural Wall Mirrors with Ambient Reflections */}
              <div className="absolute top-4 inset-x-8 h-28 border border-white/15 bg-gradient-to-b from-white/10 to-transparent rounded-lg backdrop-blur-sm flex items-center justify-around px-4">
                <span className="text-[10px] font-anton text-white/40 tracking-widest uppercase">
                  FITNESS TRACK GYM · {branch.name} ARENA
                </span>
                <span className="text-[10px] font-anton text-white/30 tracking-widest uppercase hidden sm:inline">
                  NO EXCUSES · 13 YEARS EXCELLENCE
                </span>
              </div>

              {/* 3D Interactive Hotspots Overlay in the scene */}
              <div className="relative z-10 w-full max-w-lg h-56 flex items-center justify-around">
                {currentZone.equipment.slice(0, 3).map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center group cursor-pointer"
                    onClick={() => setSelectedHotspot(item)}
                  >
                    {/* Hotspot Pulse Node */}
                    <div className="relative flex items-center justify-center">
                      <span className="absolute w-8 h-8 rounded-full bg-rose-500/30 animate-ping" />
                      <button className="relative w-9 h-9 rounded-full bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center shadow-lg border border-white/40 transition-transform group-hover:scale-115">
                        <Dumbbell className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Hotspot Label Box */}
                    <div className="mt-3 px-3 py-1.5 rounded-lg bg-neutral-950/90 border border-white/20 text-center shadow-xl backdrop-blur-md group-hover:border-rose-400 transition-colors">
                      <p className="text-[11px] font-bold text-white whitespace-nowrap">
                        {item}
                      </p>
                      <p className="text-[9px] text-rose-300 uppercase tracking-wider">
                        Inspect Spec
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Telemetry Overlay */}
              <div className="absolute bottom-3 inset-x-4 flex items-center justify-between text-[11px] text-white/60 bg-neutral-950/80 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-md">
                <span className="truncate">
                  Click any station node to inspect biomechanics and equipment specs
                </span>
                <span className="font-mono text-emerald-400 shrink-0 font-semibold">
                  LIVE STATUS: ACTIVE
                </span>
              </div>
            </div>

            {/* Selected Hotspot Detailed Flyout */}
            {selectedHotspot && (
              <div className="mt-4 p-3.5 rounded-xl bg-neutral-900 border border-rose-500/40 flex items-start justify-between gap-3 animate-fade-in">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-rose-600/20 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Info className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Selected Station: {selectedHotspot}
                    </h4>
                    <p className="text-xs text-neutral-300 mt-0.5">
                      Premium commercial station with biomechanical weight stacks and ergonomic safety stops. Maintained weekly by FTG certified equipment technicians.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedHotspot(null)}
                  className="text-neutral-400 hover:text-white p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Interactive Floorplan Mini-Map */}
            <div className="mt-4 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-neutral-400" />
                <span className="text-xs text-neutral-300 font-semibold">
                  Floor Layout ({branch.floor}, {branch.buildingName})
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {zones.map((z, idx) => (
                  <button
                    key={z.id}
                    onClick={() => {
                      setActiveZoneIndex(idx);
                      setSelectedHotspot(null);
                    }}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      activeZoneIndex === idx
                        ? 'w-8 bg-rose-500'
                        : 'w-3 bg-white/20 hover:bg-white/40'
                    }`}
                    title={z.name}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right: Zone Details, Equipment Specs & Branch Info (Cols 8-12) */}
          <div className="lg:col-span-5 p-5 sm:p-7 flex flex-col justify-between bg-neutral-950">
            <div>
              {/* Zone Category & Headline */}
              <div className="flex items-center gap-2 text-xs text-rose-400 font-semibold uppercase tracking-wider">
                {getCategoryIcon(currentZone.category)}
                <span>{currentZone.category} ZONE</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                {currentZone.headline}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 mt-2 leading-relaxed">
                {currentZone.description}
              </p>

              {/* Station Equipment Inventory List */}
              <div className="mt-5">
                <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2.5">
                  Featured Stations & Equipment:
                </h4>
                <div className="space-y-1.5">
                  {currentZone.equipment.map((eq, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-900 border border-white/5 text-xs text-neutral-200"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span className="font-medium">{eq}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Engineering Specs */}
              <div className="mt-5">
                <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
                  Zone Specifications:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentZone.specs.map((sp, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg bg-neutral-900/60 border border-white/5"
                    >
                      <p className="text-[10px] text-neutral-400 uppercase">{sp.label}</p>
                      <p className="text-xs font-semibold text-white mt-0.5">{sp.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Contact & Action Box */}
            <div className="mt-6 pt-5 border-t border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Mon-Sat: 6 AM - 12 PM & 4 PM - 10 PM</span>
                </div>
                <span className="text-emerald-400 font-semibold">Open Today</span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`tel:${branch.phones[0].replace(/[^0-9+]/g, '')}`}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-white/15 text-white text-xs font-semibold transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-rose-400" />
                  <span>Call {branch.phones[0]}</span>
                </a>

                <button
                  onClick={() => onBookAppointment(branch.id)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-lg active:scale-95 cursor-pointer"
                >
                  <CalendarCheck className="w-3.5 h-3.5" />
                  <span>Book Free Pass</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
