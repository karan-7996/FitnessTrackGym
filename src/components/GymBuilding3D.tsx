import React from 'react';
import { Branch } from '../data/branches';
import { MapPin, Compass } from 'lucide-react';

interface GymBuilding3DProps {
  branch: Branch;
  isCenter: boolean;
  onExploreInterior?: () => void;
}

export const GymBuilding3D: React.FC<GymBuilding3DProps> = ({
  branch,
  isCenter,
  onExploreInterior,
}) => {
  const { buildingName, isHeadOffice, buildingImage } = branch;

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-end select-none group">
      {/* Dynamic 3D Architecture Container */}
      <div className="relative w-full h-full flex flex-col items-center justify-end pb-1 sm:pb-2 transition-transform duration-700">
        
        {/* Subtle Ambient Radial Glow behind the active color building only */}
        <div
          className={`absolute inset-x-[10%] top-[8%] h-[76%] rounded-full blur-3xl pointer-events-none transition-opacity duration-700 ${
            isCenter ? 'opacity-50' : 'opacity-0'
          }`}
          style={{ background: `radial-gradient(circle, ${branch.panel} 0%, transparent 72%)` }}
        />

        {/* Floating Building Badge in Center View */}
        {isCenter && (
          <div className="mb-1.5 sm:mb-2 z-30 flex items-center gap-2 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/25 text-white text-xs shadow-2xl shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-semibold tracking-wider text-[10px] sm:text-[11px] uppercase whitespace-nowrap">
              {branch.floor} · {buildingName}
            </span>
          </div>
        )}

        {/* Real Building PNG Architectural Photo with Ground Shadow */}
        <div className="relative w-full flex-1 min-h-0 flex flex-col items-center justify-end px-1 sm:px-2">
          {/* Perspective Ground Contact Shadow */}
          <div
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[82%] h-5 sm:h-7 rounded-[100%] pointer-events-none blur-md transition-opacity duration-500 ${
              isCenter ? 'opacity-80' : 'opacity-55'
            }`}
            style={{
              background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.45) 55%, transparent 80%)',
            }}
          />

          <img
            src={buildingImage}
            alt={`${branch.name} - ${buildingName}`}
            draggable={false}
            className={`relative z-10 w-full h-full object-contain object-bottom transition-all duration-500 ${
              isCenter
                ? 'drop-shadow-[0_24px_38px_rgba(0,0,0,0.8)]'
                : 'drop-shadow-[0_14px_22px_rgba(0,0,0,0.65)] group-hover:brightness-110'
            }`}
          />
        </div>

        {/* Building Info Card Tag at the bottom of the structure (center focus) */}
        <div
          className={`w-full max-w-[380px] sm:max-w-[440px] px-3 py-2 mt-1.5 sm:mt-2 rounded-xl bg-neutral-950/85 backdrop-blur-md border border-white/15 shadow-2xl flex items-center justify-between gap-2 z-20 shrink-0 transition-opacity duration-300 ${
            isCenter ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="min-w-0 flex-1 flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-white p-0.5 border border-white/30 shadow flex items-center justify-center shrink-0">
              <img
                src="/assets/aistudio/Stylized_Navy_Longhorn_Skull_Emblem_1bf15f81.png"
                alt="FTG"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 text-xs text-white/70">
                <span className="font-semibold text-white truncate text-[12px] sm:text-[13px]">
                  {buildingName}
                </span>
                {isHeadOffice && (
                  <span className="text-[10px] bg-rose-500/20 text-rose-300 border border-rose-500/40 px-1.5 py-0.2 rounded font-bold uppercase tracking-wider shrink-0">
                    HQ
                  </span>
                )}
              </div>
              <div className="text-[11px] text-white/55 truncate flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-white/40 shrink-0" />
                <span>{branch.locality}, Vadodara</span>
                <span>·</span>
                <span className="text-rose-300 font-medium">{branch.floor}</span>
              </div>
            </div>
          </div>

          {onExploreInterior && isCenter && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onExploreInterior();
              }}
              className="px-2.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 active:scale-95 text-white text-[11px] sm:text-xs font-semibold tracking-wide whitespace-nowrap transition-all shadow-md flex items-center gap-1 shrink-0 cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Tour Interior</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

