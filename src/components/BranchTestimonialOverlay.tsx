import React, { useState, useEffect, useRef } from 'react';
import { Branch, Testimonial } from '../data/branches';
import {
  Quote,
  Star,
  CheckCircle,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  UserCheck,
  CalendarCheck,
  X,
} from 'lucide-react';

interface BranchTestimonialOverlayProps {
  branch: Branch;
  isOpen: boolean;
  onToggle: () => void;
  onBookAppointment: (branchId: string) => void;
}

export const BranchTestimonialOverlay: React.FC<BranchTestimonialOverlayProps> = ({
  branch,
  isOpen,
  onToggle,
  onBookAppointment,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isFading, setIsFading] = useState(false);

  const testimonials = branch.testimonials && branch.testimonials.length > 0
    ? branch.testimonials
    : [
        {
          id: 'default',
          author: 'Vadodara Fitness Member',
          role: 'Active Gym Athlete',
          outcome: 'Consistent Fitness & High Energy',
          quote: `Training at ${branch.name} (${branch.buildingName}) has been a transformative experience with certified trainers and world-class equipment.`,
          rating: 5,
          memberDuration: 'Member for 2 Years',
        },
      ];

  const total = testimonials.length;

  // Reset index when active branch changes
  useEffect(() => {
    setCurrentIndex(0);
    setIsFading(false);
  }, [branch.id]);

  // Auto-sliding interval (every 5 seconds when open and not paused)
  useEffect(() => {
    if (!isOpen || isPaused || total <= 1) return;

    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % total);
        setIsFading(false);
      }, 250);
    }, 5200);

    return () => clearInterval(interval);
  }, [isOpen, isPaused, total, branch.id]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + total) % total);
      setIsFading(false);
    }, 150);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
      setIsFading(false);
    }, 150);
  };

  if (!isOpen) return null;

  const current = testimonials[currentIndex];

  return (
    <div
      className="absolute top-[116px] sm:top-24 inset-x-2.5 sm:inset-x-auto sm:right-8 md:right-12 z-55 sm:w-full sm:max-w-[390px] pointer-events-auto transition-all duration-300"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative rounded-2xl bg-neutral-950/90 backdrop-blur-xl border border-white/20 shadow-2xl p-3 sm:p-5 overflow-hidden group">
        
        {/* Animated Progress Bar along the top edge */}
        {!isPaused && (
          <div
            key={`${branch.id}-${currentIndex}`}
            className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-400 via-rose-500 to-amber-300 origin-left"
            style={{
              animation: 'testimonialProgress 5.2s linear infinite',
            }}
          />
        )}

        {/* Ambient Top Glow */}
        <div
          className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-25 blur-2xl pointer-events-none"
          style={{ backgroundColor: branch.panel }}
        />

        {/* Header Strip */}
        <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-white p-0.5 border border-white/40 shadow-sm flex items-center justify-center shrink-0">
              <img
                src="/assets/aistudio/Stylized_Navy_Longhorn_Skull_Emblem_1bf15f81.png"
                alt="FTG"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-white/90">
              {branch.name} Member Stories
            </span>
            <span className="text-white/40">·</span>
            <span className="text-[10px] font-mono text-white/60">
              {currentIndex + 1} / {total}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Play/Pause Toggle */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsPaused((p) => !p);
              }}
              className="p-1 rounded-md text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title={isPaused ? 'Resume Auto-Slide' : 'Pause Auto-Slide'}
              aria-label={isPaused ? 'Resume' : 'Pause'}
            >
              {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            </button>

            {/* Prev / Next Buttons */}
            <button
              onClick={handlePrev}
              className="p-1 rounded-md text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Previous Story"
              aria-label="Previous Story"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleNext}
              className="p-1 rounded-md text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Next Story"
              aria-label="Next Story"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            {/* Close Overlay */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}
              className="p-1 rounded-md text-white/50 hover:text-white hover:bg-white/10 transition-colors ml-1 cursor-pointer"
              title="Hide Reviews"
              aria-label="Hide Reviews"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Testimonial Content with Crossfade */}
        <div
          className={`space-y-3 transition-opacity duration-200 ${
            isFading ? 'opacity-0 scale-98' : 'opacity-100 scale-100'
          }`}
        >
          {/* Rating Stars & Transformation Outcome Pill */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-1">
              {Array.from({ length: current.rating }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-[10px] font-mono font-bold text-white/70 ml-1">5.0</span>
            </div>

            <div className="px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-bold uppercase tracking-wider truncate max-w-[200px]">
              {current.outcome}
            </div>
          </div>

          {/* Testimonial Quote */}
          <div className="relative pl-6 pr-1">
            <Quote className="absolute left-0 top-0.5 w-4 h-4 text-white/30 rotate-180" />
            <p className="text-xs sm:text-[13px] text-white/95 leading-relaxed italic font-normal">
              "{current.quote}"
            </p>
          </div>

          {/* Member Author Details */}
          <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-white truncate text-xs sm:text-[13px]">
                  {current.author}
                </span>
                <span title="Verified Member" className="inline-flex items-center">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                </span>
              </div>
              <p className="text-[11px] text-white/60 truncate mt-0.5">
                {current.role} · <span className="text-white/80">{current.memberDuration}</span>
              </p>
            </div>

            <button
              onClick={() => onBookAppointment(branch.id)}
              className="shrink-0 px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-rose-600 text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-wider transition-all flex items-center gap-1 active:scale-95 cursor-pointer"
            >
              <CalendarCheck className="w-3 h-3" />
              <span>Train Here</span>
            </button>
          </div>
        </div>

        {/* Carousel quick story dots */}
        <div className="flex items-center justify-center gap-1.5 mt-3 pt-1">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setIsFading(true);
                setTimeout(() => {
                  setCurrentIndex(i);
                  setIsFading(false);
                }, 150);
              }}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                currentIndex === i
                  ? 'w-5 bg-white shadow-sm'
                  : 'w-1.5 bg-white/30 hover:bg-white/60'
              }`}
              aria-label={`Jump to review ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </div>
  );
};
