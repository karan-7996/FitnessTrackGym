import React, { useState } from 'react';
import { BRANCHES, Branch } from '../data/branches';
import {
  MapPin,
  Navigation,
  Phone,
  MessageCircle,
  ExternalLink,
  Building2,
  CheckCircle2,
  Compass,
  X,
  CalendarCheck,
  Sparkles,
} from 'lucide-react';

interface InteractiveVadodaraMapProps {
  activeBranchId: string;
  onSelectBranch: (branch: Branch) => void;
  onBookAppointment: (branchId: string) => void;
  onClose?: () => void;
}

export const InteractiveVadodaraMap: React.FC<InteractiveVadodaraMapProps> = ({
  activeBranchId,
  onSelectBranch,
  onBookAppointment,
  onClose,
}) => {
  const [selectedBranchId, setSelectedBranchId] = useState<string>(activeBranchId);
  const selectedBranch = BRANCHES.find((b) => b.id === selectedBranchId) || BRANCHES[0];

  const handleOpenGoogleMaps = (branch: Branch) => {
    const query = encodeURIComponent(`Fitness Track Gym ${branch.name} ${branch.buildingName} Vadodara`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  const handleOpenWhatsApp = (branch: Branch) => {
    const text = encodeURIComponent(
      `Hello Fitness Track Gym (${branch.name} Branch)! I am inquiring about memberships and booking a free workout tour at your ${branch.buildingName} location.`
    );
    window.open(`https://wa.me/${branch.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-xl animate-fade-in">
      {/* Modal Card */}
      <div className="relative w-full max-w-6xl h-[92vh] max-h-[880px] bg-neutral-950 border border-white/15 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header Bar */}
        <div className="px-4 sm:px-8 py-4 border-b border-white/10 flex items-center justify-between bg-neutral-900/90 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-white p-1 border border-white/40 shadow-md flex items-center justify-center shrink-0">
              <img
                src="/assets/aistudio/Stylized_Navy_Longhorn_Skull_Emblem_1bf15f81.png"
                alt="FTG"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-bold tracking-wider text-rose-400">
                  Interactive City Map
                </span>
                <span className="text-neutral-500">·</span>
                <span className="text-xs text-neutral-300 font-semibold">
                  Vadodara Smart City (8 Prime Branches)
                </span>
              </div>
              <h2 className="text-lg sm:text-2xl font-anton tracking-wide text-white uppercase">
                FITNESS TRACK GYM LOCATIONS
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {onClose && (
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close Map"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Content Layout: Left interactive SVG map, Right detailed branch info card */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 overflow-y-auto">
          
          {/* Interactive Map Visual (Cols 1-7) */}
          <div className="lg:col-span-7 bg-neutral-900/60 p-4 sm:p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 relative overflow-hidden">
            
            {/* Map Top Status */}
            <div className="flex items-center justify-between text-xs text-neutral-400 mb-2 z-10">
              <span className="flex items-center gap-1.5 font-semibold text-neutral-200">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                Select any pin across Vadodara to view branch details
              </span>
              <span className="text-[11px] bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded font-mono font-medium">
                8 SITES CONNECTED
              </span>
            </div>

            {/* Interactive Vector Vadodara Map */}
            <div className="relative w-full flex-1 min-h-[300px] sm:min-h-[420px] rounded-2xl bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 border border-white/10 overflow-hidden shadow-inner flex items-center justify-center">
              
              {/* Radar Grid Backdrop */}
              <div
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)`,
                  backgroundSize: '24px 24px',
                }}
              />

              {/* Stylized Vadodara Road Network & River Vishwamitri */}
              <svg
                viewBox="0 0 800 600"
                className="absolute inset-0 w-full h-full pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="riverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0284C7" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#0369A1" stopOpacity="0.1" />
                  </linearGradient>
                </defs>

                {/* Vishwamitri River Curving through Vadodara */}
                <path
                  d="M 500,0 C 480,120 420,200 460,320 C 500,440 430,520 400,600"
                  fill="none"
                  stroke="url(#riverGrad)"
                  strokeWidth="20"
                  strokeLinecap="round"
                />

                {/* Ring Roads Network */}
                <ellipse cx="400" cy="300" rx="320" ry="240" fill="none" stroke="#27272A" strokeWidth="3" strokeDasharray="6 4" />
                <ellipse cx="400" cy="300" rx="220" ry="160" fill="none" stroke="#3F3F46" strokeWidth="2.5" />
                <ellipse cx="400" cy="300" rx="110" ry="80" fill="none" stroke="#52525B" strokeWidth="1.5" />

                {/* Major Highways / Arteries connecting branches */}
                <line x1="80" y1="300" x2="720" y2="300" stroke="#3F3F46" strokeWidth="2" opacity="0.6" />
                <line x1="400" y1="60" x2="400" y2="540" stroke="#3F3F46" strokeWidth="2" opacity="0.6" />
                <line x1="180" y1="120" x2="620" y2="480" stroke="#27272A" strokeWidth="2" />
                <line x1="180" y1="480" x2="620" y2="120" stroke="#27272A" strokeWidth="2" />

                {/* Central Landmarks Text Labels */}
                <text x="390" y="275" fill="#71717A" fontSize="11" fontWeight="700" letterSpacing="1">
                  CENTRAL VADODARA
                </text>
                <text x="490" y="100" fill="#0284C7" fontSize="10" fontWeight="600" opacity="0.6">
                  SAMA TALAV
                </text>
                <text x="340" y="325" fill="#71717A" fontSize="10" fontWeight="600" opacity="0.6">
                  CENTRAL BUS STATION
                </text>
                <text x="560" y="380" fill="#71717A" fontSize="10" fontWeight="600" opacity="0.5">
                  DABHOI RING RD
                </text>
                <text x="120" y="360" fill="#71717A" fontSize="10" fontWeight="600" opacity="0.5">
                  VASNA-GOTRI 30M RD
                </text>
              </svg>

              {/* 8 Interactive Branch Pins placed at smart coordinates */}
              {BRANCHES.map((b) => {
                const isSelected = b.id === selectedBranchId;
                const { xPercent, yPercent } = b.coordinates;

                return (
                  <div
                    key={b.id}
                    onClick={() => {
                      setSelectedBranchId(b.id);
                      onSelectBranch(b);
                    }}
                    style={{
                      left: `${xPercent}%`,
                      top: `${yPercent}%`,
                    }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 z-20 group ${
                      isSelected ? 'scale-125 z-40' : 'hover:scale-110'
                    }`}
                  >
                    {/* Pulsing Beacon Ring */}
                    {isSelected && (
                      <span
                        className="absolute inset-0 rounded-full animate-ping opacity-75"
                        style={{ backgroundColor: b.panel }}
                      />
                    )}

                    {/* Pin Bubble */}
                    <div
                      className={`relative flex items-center justify-center rounded-full shadow-2xl border transition-all ${
                        isSelected
                          ? 'w-10 h-10 border-white text-white shadow-rose-500/50'
                          : 'w-8 h-8 border-white/40 bg-neutral-900/90 text-neutral-300 hover:text-white'
                      }`}
                      style={{
                        backgroundColor: isSelected ? b.bg : undefined,
                      }}
                    >
                      <MapPin className={`w-4 h-4 ${isSelected ? 'animate-bounce' : ''}`} />
                    </div>

                    {/* Branch Label Box */}
                    <div
                      className={`absolute top-full mt-1.5 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider whitespace-nowrap shadow-xl border backdrop-blur-md transition-all ${
                        isSelected
                          ? 'bg-white text-neutral-950 border-white'
                          : 'bg-neutral-950/90 text-neutral-300 border-white/10 group-hover:bg-neutral-900 group-hover:text-white'
                      }`}
                    >
                      {b.name}
                      {b.isHeadOffice && (
                        <span className="ml-1 text-[9px] text-rose-600 font-extrabold">(HQ)</span>
                      )}
                    </div>
                  </div>
                );
              })}

            </div>

            {/* Bottom Quick-Jump Strip */}
            <div className="mt-3 flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              {BRANCHES.map((b) => (
                <button
                  key={b.id}
                  onClick={() => {
                    setSelectedBranchId(b.id);
                    onSelectBranch(b);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap transition-all cursor-pointer ${
                    b.id === selectedBranchId
                      ? 'bg-rose-600 text-white font-bold shadow'
                      : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {b.name}
                </button>
              ))}
            </div>

          </div>

          {/* Right Selected Branch Card & Actions (Cols 8-12) */}
          <div className="lg:col-span-5 p-5 sm:p-7 flex flex-col justify-between bg-neutral-950 overflow-y-auto">
            <div>
              
              {/* Branch Title & Building Info */}
              <div className="flex items-center gap-2">
                <span
                  className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-white"
                  style={{ backgroundColor: selectedBranch.bg }}
                >
                  {selectedBranch.floor}
                </span>
                {selectedBranch.isHeadOffice && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    Vadodara HQ
                  </span>
                )}
              </div>

              <h3 className="text-2xl sm:text-3xl font-anton tracking-wide text-white uppercase mt-2">
                {selectedBranch.label}
              </h3>

              <div className="flex items-center gap-2 text-xs text-rose-300 font-semibold mt-1">
                <Building2 className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{selectedBranch.buildingName}</span>
              </div>

              {/* Branch Real Building PNG Showcase */}
              <div
                className="mt-3 relative h-32 sm:h-36 rounded-xl border border-white/10 overflow-hidden flex items-end justify-center p-2"
                style={{
                  background: `radial-gradient(circle at 50% 80%, ${selectedBranch.panel}55 0%, #09090B 80%)`,
                }}
              >
                <img
                  src={selectedBranch.buildingImage}
                  alt={selectedBranch.buildingName}
                  className="w-full h-full object-contain object-bottom drop-shadow-[0_10px_18px_rgba(0,0,0,0.8)]"
                />
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 mt-3 leading-relaxed">
                {selectedBranch.description}
              </p>

              {/* Exact Address from Flyer */}
              <div className="mt-5 p-3.5 rounded-xl bg-neutral-900 border border-white/10">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-[11px] uppercase font-bold text-neutral-400 tracking-wider">
                      Full Physical Address:
                    </h5>
                    <p className="text-xs text-white font-medium mt-0.5 leading-snug">
                      {selectedBranch.fullAddress}
                    </p>
                  </div>
                </div>
              </div>

              {/* Flyer Phone Numbers */}
              <div className="mt-4">
                <h5 className="text-[11px] uppercase font-bold text-neutral-400 tracking-wider mb-2">
                  Direct Branch Contacts:
                </h5>
                <div className="space-y-1.5">
                  {selectedBranch.phones.map((p, idx) => (
                    <a
                      key={idx}
                      href={`tel:${p.replace(/[^0-9+]/g, '')}`}
                      className="flex items-center justify-between px-3 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-white/5 text-xs text-white transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-rose-400" />
                        <span className="font-semibold">{p}</span>
                      </div>
                      <span className="text-[10px] text-neutral-400 uppercase">Call Now</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Key Amenities */}
              <div className="mt-5">
                <h5 className="text-[11px] uppercase font-bold text-neutral-400 tracking-wider mb-2">
                  Branch Amenities & Features:
                </h5>
                <div className="grid grid-cols-2 gap-1.5 text-xs text-neutral-300">
                  {selectedBranch.amenities.map((am, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{am}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="mt-6 pt-5 border-t border-white/10 space-y-2.5">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleOpenGoogleMaps(selectedBranch)}
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-white/15 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
                  <span>Google Maps</span>
                </button>

                <button
                  onClick={() => handleOpenWhatsApp(selectedBranch)}
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-700/80 hover:bg-emerald-600 border border-emerald-500/40 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-white" />
                  <span>WhatsApp Chat</span>
                </button>
              </div>

              <button
                onClick={() => onBookAppointment(selectedBranch.id)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-xl active:scale-95 cursor-pointer"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Book Free Workout Session at {selectedBranch.name}</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
