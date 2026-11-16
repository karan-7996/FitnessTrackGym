/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { BRANCHES, Branch } from './data/branches';
import { GymBuilding3D } from './components/GymBuilding3D';
import { InteriorNavigationView } from './components/InteriorNavigationView';
import { InteractiveVadodaraMap } from './components/InteractiveVadodaraMap';
import { AppointmentModal } from './components/AppointmentModal';
import { FlyerPlansDrawer } from './components/FlyerPlansDrawer';
import { BranchTestimonialOverlay } from './components/BranchTestimonialOverlay';
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Compass,
  CalendarCheck,
  Trophy,
  Phone,
  Building2,
  Sparkles,
  Info,
  MessageSquareQuote,
  Volume2,
  VolumeX,
} from 'lucide-react';

export default function App() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== 'undefined' ? window.innerWidth < 640 : false
  );

  // Dynamic Video Background & Audio state
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);

  const toggleSound = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.muted = false;
        videoRef.current.play().catch(() => {});
        setIsMuted(false);
      } else {
        videoRef.current.muted = true;
        setIsMuted(true);
      }
    }
  };

  // Active Modals / Drawers
  const [showInteriorTour, setShowInteriorTour] = useState<boolean>(false);
  const [showCityMap, setShowCityMap] = useState<boolean>(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState<boolean>(false);
  const [showFlyerPlans, setShowFlyerPlans] = useState<boolean>(false);
  const [showTestimonials, setShowTestimonials] = useState<boolean>(true);
  const [appointmentBranchId, setAppointmentBranchId] = useState<string>(BRANCHES[0].id);

  // Touch Swipe Gestures for Mobile Devices
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;
    // Check if horizontal swipe and exceeded minimum swipe threshold (40px)
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        navigate('next');
      } else {
        navigate('prev');
      }
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  // Window Resize Listener
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Preload all 8 branch building PNG images on mount
  useEffect(() => {
    BRANCHES.forEach((b) => {
      const img = new Image();
      img.src = b.buildingImage;
    });
  }, []);

  const totalBranches = BRANCHES.length;
  const currentBranch = BRANCHES[activeIndex];

  // Navigate Carousel
  const navigate = useCallback(
    (direction: 'next' | 'prev') => {
      if (isAnimating) return;
      setIsAnimating(true);
      if (direction === 'next') {
        setActiveIndex((prev) => (prev + 1) % totalBranches);
      } else {
        setActiveIndex((prev) => (prev - 1 + totalBranches) % totalBranches);
      }
      setTimeout(() => {
        setIsAnimating(false);
      }, 650);
    },
    [isAnimating, totalBranches]
  );

  const jumpToBranch = useCallback(
    (idx: number) => {
      if (isAnimating || activeIndex === idx) return;
      setIsAnimating(true);
      setActiveIndex(idx);
      setTimeout(() => {
        setIsAnimating(false);
      }, 650);
    },
    [isAnimating, activeIndex]
  );

  const progressPercent = ((activeIndex + 1) / totalBranches) * 100;
  const thumbPercent = totalBranches > 1 ? (activeIndex / (totalBranches - 1)) * 100 : 0;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showInteriorTour || showCityMap || showAppointmentModal || showFlyerPlans) return;
      if (e.key === 'ArrowLeft') {
        navigate('prev');
      } else if (e.key === 'ArrowRight') {
        navigate('next');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, showInteriorTour, showCityMap, showAppointmentModal, showFlyerPlans]);

  // Determine Item Role Style
  const getItemRole = (index: number) => {
    const diff = (index - activeIndex + totalBranches) % totalBranches;
    if (diff === 0) return 'center';
    if (diff === 1) return 'right';
    if (diff === totalBranches - 1) return 'left';
    if (diff === 2) return 'farRight';
    if (diff === totalBranches - 2) return 'farLeft';
    return 'back';
  };

  const getItemStyle = (role: string) => {
    const cubicBezier = 'cubic-bezier(0.4, 0, 0.2, 1)';
    const transition = `transform 650ms ${cubicBezier}, filter 650ms ${cubicBezier}, opacity 650ms ${cubicBezier}, left 650ms ${cubicBezier}, bottom 650ms ${cubicBezier}`;
    const baseWidth = isMobile ? '92vw' : 'min(58vw, 720px)';
    const baseHeight = isMobile ? '45%' : '56%';

    switch (role) {
      case 'center':
        return {
          width: baseWidth,
          height: baseHeight,
          transformOrigin: 'bottom center',
          transform: `translateX(-50%) scale(${isMobile ? 1.0 : 1.05})`,
          filter: 'blur(0px) grayscale(0%) saturate(1.1) contrast(1.03) brightness(1.04)',
          opacity: 1,
          zIndex: 25,
          left: '50%',
          bottom: isMobile ? '22.5%' : '14%',
          transition,
          willChange: 'transform, filter, opacity, left',
        };
      case 'left':
        return {
          width: baseWidth,
          height: baseHeight,
          transformOrigin: 'bottom center',
          transform: `translateX(-50%) scale(${isMobile ? 0.4 : 0.48})`,
          filter: 'blur(0.75px) grayscale(100%) saturate(0) contrast(1.12) brightness(0.84)',
          opacity: isMobile ? 0.72 : 0.92,
          zIndex: 10,
          left: isMobile ? '12%' : '20%',
          bottom: isMobile ? '31%' : '22%',
          transition,
          willChange: 'transform, filter, opacity, left',
        };
      case 'right':
        return {
          width: baseWidth,
          height: baseHeight,
          transformOrigin: 'bottom center',
          transform: `translateX(-50%) scale(${isMobile ? 0.4 : 0.48})`,
          filter: 'blur(0.75px) grayscale(100%) saturate(0) contrast(1.12) brightness(0.84)',
          opacity: isMobile ? 0.72 : 0.92,
          zIndex: 10,
          left: isMobile ? '88%' : '80%',
          bottom: isMobile ? '31%' : '22%',
          transition,
          willChange: 'transform, filter, opacity, left',
        };
      case 'farLeft':
        return {
          width: baseWidth,
          height: baseHeight,
          transformOrigin: 'bottom center',
          transform: 'translateX(-50%) scale(0.34)',
          filter: 'blur(1.75px) grayscale(100%) saturate(0) contrast(1.08) brightness(0.74)',
          opacity: isMobile ? 0 : 0.65,
          zIndex: 6,
          left: isMobile ? '-12%' : '7%',
          bottom: isMobile ? '34%' : '27%',
          pointerEvents: isMobile ? ('none' as const) : undefined,
          transition,
          willChange: 'transform, filter, opacity, left',
        };
      case 'farRight':
        return {
          width: baseWidth,
          height: baseHeight,
          transformOrigin: 'bottom center',
          transform: 'translateX(-50%) scale(0.34)',
          filter: 'blur(1.75px) grayscale(100%) saturate(0) contrast(1.08) brightness(0.74)',
          opacity: isMobile ? 0 : 0.65,
          zIndex: 6,
          left: isMobile ? '112%' : '93%',
          bottom: isMobile ? '34%' : '27%',
          pointerEvents: isMobile ? ('none' as const) : undefined,
          transition,
          willChange: 'transform, filter, opacity, left',
        };
      default:
        // back
        return {
          width: baseWidth,
          height: baseHeight,
          transformOrigin: 'bottom center',
          transform: 'translateX(-50%) scale(0.26)',
          filter: 'blur(3.5px) grayscale(100%) saturate(0) contrast(1.05) brightness(0.65)',
          opacity: 0,
          zIndex: 3,
          left: '50%',
          bottom: isMobile ? '35%' : '29%',
          pointerEvents: 'none' as const,
          transition,
          willChange: 'transform, filter, opacity, left',
        };
    }
  };

  const handleOpenAppointment = (branchId?: string) => {
    setAppointmentBranchId(branchId || currentBranch.id);
    setShowAppointmentModal(true);
  };

  return (
    <div
      className="relative w-full overflow-hidden select-none"
      style={{
        backgroundColor: currentBranch.bg,
        transition: 'background-color 650ms cubic-bezier(0.4, 0, 0.2, 1)',
        fontFamily: "'Inter', sans-serif",
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Full Viewport Inner Wrapper */}
      <div className="relative w-full h-screen overflow-hidden">
        
        {/* 0. Dynamic Cinematic Video Background (Cover Stage with Branch-Wise Hue Shift) */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            poster="/assets/video_thumb.jpg"
            onLoadedData={() => setIsVideoLoaded(true)}
            className="w-full h-full object-cover transition-all duration-700 ease-out"
            style={{
              filter: `hue-rotate(${currentBranch.videoHueRotate ?? 0}deg) saturate(1.4) contrast(1.1) brightness(0.85)`,
              transform: 'scale(1.02)',
              opacity: isVideoLoaded ? 0.9 : 0.65,
            }}
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261022_235442_c62146c2-3f2f-46c0-ab51-649a4aa26cf5.mp4"
          />

          {/* Branch-Wise Color Tint Overlay */}
          <div
            className="absolute inset-0 transition-colors duration-700 ease-out pointer-events-none"
            style={{
              backgroundColor: currentBranch.bg,
              mixBlendMode: 'color',
              opacity: 0.65,
            }}
          />

          {/* Horizon Floor Glow & Deep Vignette */}
          <div
            className="absolute inset-0 transition-all duration-700 ease-out pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at 50% 86%, ${currentBranch.panel}44 0%, transparent 60%), linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 40%, rgba(0,0,0,0.55) 100%)`,
            }}
          />
        </div>

        {/* 1. Grain overlay (SVG fractalNoise) */}
        <div
          className="absolute inset-0 pointer-events-none z-50 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
            backgroundRepeat: 'repeat',
          }}
        />

        {/* 2. Giant Ghost Display Text behind the carousel - refined size & mobile spacing */}
        <div
          className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none z-2"
          style={{ top: isMobile ? '17%' : '18%' }}
        >
          <span
            className="font-anton uppercase tracking-tight text-white transition-all duration-700 ease-out text-center drop-shadow-[0_12px_24px_rgba(0,0,0,0.3)] px-2"
            style={{
              fontSize: 'clamp(28px, 8vw, 125px)',
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: '-0.01em',
              whiteSpace: 'nowrap',
              opacity: 0.88,
            }}
          >
            {currentBranch.ghostTitle}
          </span>
        </div>

        {/* 3. Unified Responsive Header: Brand Lockup + CTAs + Horizontal Feature Scroll */}
        <header className="absolute top-0 inset-x-0 z-60 px-3 sm:px-6 md:px-8 pt-3 sm:pt-5 pb-2 pointer-events-none flex flex-col gap-2 sm:gap-2.5">
          {/* Top Row: Brand & Action CTAs */}
          <div className="flex items-center justify-between pointer-events-auto">
            {/* Brand Identity */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-white p-1 border border-white/40 shadow-lg flex items-center justify-center shrink-0 transition-transform hover:scale-105">
                <img
                  src="/assets/aistudio/Stylized_Navy_Longhorn_Skull_Emblem_1bf15f81.png"
                  alt="Fitness Track Gym Emblem"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-xs sm:text-base font-extrabold uppercase tracking-[0.14em] text-white font-anton truncate">
                    FITNESS TRACK GYM®
                  </span>
                  <span className="hidden md:inline-block text-[10px] font-semibold text-amber-300 uppercase tracking-widest bg-black/40 px-2 py-0.5 rounded-full border border-amber-400/30">
                    Since 2013 · Vadodara
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] text-white/70 tracking-wider font-medium hidden sm:inline truncate">
                  The Ultimate Way to Get Fit · 8 Smart City Branches
                </span>
              </div>
            </div>

            {/* Right Action Buttons */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              {/* Stage Audio Toggle */}
              <button
                onClick={toggleSound}
                className={`flex items-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full border text-[11px] backdrop-blur-md transition-all active:scale-95 cursor-pointer ${
                  isMuted
                    ? 'bg-black/40 border-white/20 text-white/70 hover:text-white'
                    : 'bg-emerald-500/25 border-emerald-400 text-emerald-200 shadow-md'
                }`}
                title={isMuted ? 'Unmute Ambient Stage Sound' : 'Mute Stage Sound'}
                aria-label={isMuted ? 'Unmute Sound' : 'Mute Sound'}
              >
                {isMuted ? (
                  <VolumeX className="w-3.5 h-3.5" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                )}
                <span className="hidden sm:inline font-mono text-[10px]">
                  {isMuted ? 'Sound' : 'Sound ON'}
                </span>
              </button>

              {/* Call Hotline */}
              <a
                href="tel:+919909909698"
                className="flex items-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full bg-black/40 text-white/90 hover:text-white border border-white/20 text-[11px] sm:text-xs font-mono backdrop-blur-md transition-colors"
                title="Helpline: +91 990 990 9698"
              >
                <Phone className="w-3.5 h-3.5 text-rose-400" />
                <span className="hidden lg:inline">+91 990 990 9698</span>
                <span className="lg:hidden">Call</span>
              </a>

              {/* Free Trial Button */}
              <button
                onClick={() => handleOpenAppointment(currentBranch.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white text-neutral-950 hover:bg-neutral-100 text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all shadow-xl active:scale-95 cursor-pointer whitespace-nowrap"
              >
                <CalendarCheck className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                <span className="hidden sm:inline">Book Free Trial</span>
                <span className="sm:hidden">Free Trial</span>
              </button>
            </div>
          </div>

          {/* Bottom Row: Quick Navigation Chips (touch-scrollable on mobile) */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pointer-events-auto py-0.5">
            <button
              onClick={() => setShowCityMap(true)}
              className="flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white text-[11px] font-medium border border-white/20 transition-all backdrop-blur-md active:scale-95 cursor-pointer shrink-0"
            >
              <MapPin className="w-3 h-3 text-rose-300" />
              <span>8 Branches Map</span>
            </button>

            <button
              onClick={() => setShowInteriorTour(true)}
              className="flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white text-[11px] font-medium border border-white/20 transition-all backdrop-blur-md active:scale-95 cursor-pointer shrink-0"
            >
              <Compass className="w-3 h-3 text-emerald-300" />
              <span>Interior 360°</span>
            </button>

            <button
              onClick={() => setShowFlyerPlans(true)}
              className="flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white text-[11px] font-medium border border-white/20 transition-all backdrop-blur-md active:scale-95 cursor-pointer shrink-0"
            >
              <Trophy className="w-3 h-3 text-amber-300" />
              <span>Plans & Nutrition</span>
            </button>

            <button
              onClick={() => setShowTestimonials((prev) => !prev)}
              className={`flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[11px] font-medium border transition-all backdrop-blur-md active:scale-95 cursor-pointer shrink-0 ${
                showTestimonials
                  ? 'bg-amber-500/25 border-amber-400 text-amber-200'
                  : 'bg-black/40 border-white/20 text-white/70 hover:text-white'
              }`}
              title="Toggle Rotating Member Testimonials Overlay"
            >
              <MessageSquareQuote className="w-3 h-3 text-amber-300" />
              <span>{showTestimonials ? 'Stories [ON]' : 'Stories [OFF]'}</span>
            </button>
          </div>
        </header>

        {/* Member Testimonial Overlay (Auto-sliding or Toggled) */}
        <BranchTestimonialOverlay
          branch={currentBranch}
          isOpen={showTestimonials}
          onToggle={() => setShowTestimonials(false)}
          onBookAppointment={(branchId) => handleOpenAppointment(branchId)}
        />

        {/* Re-open Testimonials Floating Button when hidden */}
        {!showTestimonials && (
          <button
            onClick={() => setShowTestimonials(true)}
            className="absolute top-[116px] sm:top-24 right-3 sm:right-8 z-55 flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white text-[11px] sm:text-xs border border-white/20 backdrop-blur-md transition-all shadow-lg active:scale-95 cursor-pointer"
          >
            <MessageSquareQuote className="w-3.5 h-3.5 text-amber-300" />
            <span>Show Stories</span>
          </button>
        )}

        {/* 4. 3D Architectural Building Carousel */}
        <div className="absolute inset-0 z-3 pointer-events-none">
          {BRANCHES.map((branch, index) => {
            const role = getItemRole(index);
            const style = getItemStyle(role);
            const isCenter = role === 'center';

            return (
              <div
                key={branch.id}
                style={style}
                onClick={() => {
                  if (!isCenter && !isAnimating) {
                    const diff = (index - activeIndex + totalBranches) % totalBranches;
                    if (diff === 1 || diff === 2) {
                      navigate('next');
                    } else {
                      navigate('prev');
                    }
                  }
                }}
                className={`absolute ${
                  isCenter ? 'pointer-events-auto' : 'pointer-events-auto cursor-pointer'
                }`}
              >
                <GymBuilding3D
                  branch={branch}
                  isCenter={isCenter}
                  onExploreInterior={() => setShowInteriorTour(true)}
                />
              </div>
            );
          })}
        </div>

        {/* 5A. DESKTOP Bottom-Left Information & Navigation Controls (hidden on mobile) */}
        <div className="hidden sm:block absolute bottom-24 left-4 sm:left-10 md:left-14 z-60 max-w-[320px] sm:max-w-[380px]">
          {/* Branch Number & Vadodara Indicator */}
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-white/70">
              BRANCH 0{activeIndex + 1} OF 0{totalBranches}
            </span>
            <span className="text-white/40">·</span>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-white/90">
              {currentBranch.locality}
            </span>
          </div>

          {/* Main Title: Branch Name + Building */}
          <h1
            className="text-white uppercase font-anton tracking-wide mb-1 sm:mb-2 text-xl sm:text-3xl drop-shadow-md leading-tight"
            style={{ letterSpacing: '0.02em' }}
          >
            {currentBranch.label}
          </h1>

          {/* Subtitle / Description from flyer */}
          <p className="text-xs sm:text-sm text-white/90 leading-relaxed mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3">
            {currentBranch.description}
          </p>

          {/* Navigation Controls: Circular Prev / Next Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('prev')}
              disabled={isAnimating}
              aria-label="Previous Branch"
              className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-transparent border-2 border-white text-white flex items-center justify-center transition-all duration-150 hover:scale-108 hover:bg-white/15 active:scale-95 cursor-pointer disabled:opacity-50"
            >
              <ArrowLeft size={22} strokeWidth={2.25} />
            </button>

            <button
              onClick={() => navigate('next')}
              disabled={isAnimating}
              aria-label="Next Branch"
              className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-transparent border-2 border-white text-white flex items-center justify-center transition-all duration-150 hover:scale-108 hover:bg-white/15 active:scale-95 cursor-pointer disabled:opacity-50"
            >
              <ArrowRight size={22} strokeWidth={2.25} />
            </button>

            <span className="text-[11px] font-mono uppercase tracking-widest text-white/65 ml-1">
              Use ← / → keys or track below
            </span>
          </div>
        </div>

        {/* 5B. DESKTOP Bottom-Right Action Link: "DISCOVER IT" (hidden on mobile) */}
        <div className="hidden sm:flex absolute bottom-24 right-4 sm:right-8 md:right-14 z-60 flex-col items-end gap-1 sm:gap-2">
          <button
            onClick={() => setShowInteriorTour(true)}
            className="group flex items-center gap-2 sm:gap-3 text-white uppercase font-anton tracking-tight transition-all duration-200 hover:opacity-100 hover:translate-x-1 cursor-pointer"
            style={{
              fontSize: 'clamp(22px, 4vw, 52px)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              lineHeight: 1,
              opacity: 0.95,
            }}
          >
            <span>DISCOVER IT</span>
            <ArrowRight
              className="transition-transform duration-200 group-hover:translate-x-1.5 w-6 h-6 sm:w-10 sm:h-10"
              strokeWidth={2.25}
            />
          </button>

          <div className="flex items-center gap-2 text-xs text-white/80 font-medium">
            <span className="hidden sm:inline">Tap to inspect 3D interior & equipment</span>
            <span>·</span>
            <button
              onClick={() => setShowCityMap(true)}
              className="text-white underline underline-offset-4 hover:text-white/80 cursor-pointer"
            >
              View on Map
            </button>
          </div>
        </div>

        {/* 5D. DESKTOP Smooth Animated Scroll Progress Indicator (Bottom-Center of Carousel Area) */}
        <div className="hidden sm:flex absolute bottom-4 left-1/2 -translate-x-1/2 z-60 w-[min(520px,54vw)] pointer-events-auto">
          <div className="w-full rounded-2xl bg-black/50 backdrop-blur-xl border border-white/15 px-4 py-2.5 shadow-[0_12px_32px_rgba(0,0,0,0.45)] flex flex-col gap-2">
            {/* Progress Telemetry Strip */}
            <div className="flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className={`w-2 h-2 rounded-full transition-transform duration-300 shrink-0 ${
                    isAnimating ? 'scale-150 bg-white' : 'bg-emerald-400'
                  }`}
                />
                <span className="font-mono font-bold tracking-widest text-white/90">
                  0{activeIndex + 1} / 0{totalBranches}
                </span>
                <span className="text-white/30">·</span>
                <span className="font-semibold uppercase tracking-wider text-white truncate">
                  {currentBranch.name}
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] font-mono text-white/60 uppercase tracking-wider">
                  Scroll Progress
                </span>
                <span
                  className="px-1.5 py-0.5 rounded bg-white/10 font-mono font-bold text-[10px] text-white transition-all duration-300"
                  style={{ borderColor: `${currentBranch.panel}66`, borderWidth: '1px' }}
                >
                  {Math.round(progressPercent)}%
                </span>
              </div>
            </div>

            {/* Interactive Animated Scroll Rail */}
            <div className="relative h-5 flex items-center px-2">
              {/* Outer Track */}
              <div className="relative w-full h-1.5 rounded-full bg-white/15">
                {/* Animated Progress Fill Bar */}
                <div
                  className="absolute top-0 -left-2 h-full rounded-full overflow-hidden"
                  style={{
                    width: `calc(${thumbPercent}% + 8px)`,
                    background: `linear-gradient(90deg, ${currentBranch.panel}99 0%, ${currentBranch.panel} 65%, #ffffff 100%)`,
                    boxShadow: `0 0 14px ${currentBranch.panel}aa`,
                    transition:
                      'width 650ms cubic-bezier(0.4, 0, 0.2, 1), background 650ms cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  {/* Animated Shimmer Sweep */}
                  <div
                    className="absolute inset-y-0 w-1/2 animate-progress-shimmer pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.75) 50%, transparent 100%)',
                    }}
                  />
                </div>

                {/* Branch Tick Nodes (Clickable Jump Stops) */}
                {BRANCHES.map((b, idx) => {
                  const nodePos = totalBranches > 1 ? (idx / (totalBranches - 1)) * 100 : 0;
                  const isPassed = idx <= activeIndex;
                  const isCurrent = idx === activeIndex;
                  return (
                    <button
                      key={b.id}
                      onClick={() => jumpToBranch(idx)}
                      title={`0${idx + 1} · ${b.name} (${b.locality})`}
                      aria-label={`Jump to branch ${idx + 1}: ${b.name}`}
                      style={{ left: `${nodePos}%` }}
                      className="group absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center cursor-pointer z-20 focus:outline-none"
                    >
                      <span
                        className={`rounded-full transition-all duration-300 ${
                          isCurrent
                            ? 'w-2 h-2 bg-white opacity-0'
                            : isPassed
                            ? 'w-2 h-2 bg-white/95 group-hover:scale-150'
                            : 'w-1.5 h-1.5 bg-white/35 group-hover:bg-white/80 group-hover:scale-150'
                        }`}
                      />
                      {/* Hover Branch Pill Tooltip */}
                      <span className="pointer-events-none opacity-0 group-hover:opacity-100 -translate-y-7 group-hover:-translate-y-8 transition-all duration-200 absolute whitespace-nowrap px-2 py-0.5 rounded-md bg-neutral-950/90 border border-white/20 text-[10px] font-semibold text-white shadow-xl">
                        0{idx + 1} · {b.name}
                      </span>
                    </button>
                  );
                })}

                {/* Smoothly Sliding Glowing Scroll Thumb */}
                <div
                  className={`pointer-events-none absolute top-1/2 z-30 w-4 h-4 rounded-full bg-white border-2 animate-indicator-pulse ${
                    isAnimating ? 'scale-125' : ''
                  }`}
                  style={{
                    left: `${thumbPercent}%`,
                    borderColor: currentBranch.panel,
                    transition:
                      'left 650ms cubic-bezier(0.4, 0, 0.2, 1), border-color 650ms cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 5C. MOBILE DEDICATED BOTTOM DOCK (Clean, unified, no overlaps on 320px-640px) */}
        <div className="sm:hidden absolute bottom-2.5 inset-x-2.5 z-60 pointer-events-auto">
          <div className="rounded-2xl bg-neutral-950/85 backdrop-blur-xl border border-white/20 shadow-2xl p-3 flex flex-col gap-2">
            
            {/* Row 1: Branch Indicator & Quick Map Link */}
            <div className="flex items-center justify-between text-[10px]">
              <div className="flex items-center gap-1.5">
                <span className="font-mono font-bold text-amber-300">
                  BRANCH 0{activeIndex + 1}/0{totalBranches}
                </span>
                <span className="text-white/30">·</span>
                <span className="font-semibold text-white/90 uppercase truncate max-w-[170px]">
                  {currentBranch.locality}
                </span>
              </div>
              <button
                onClick={() => setShowCityMap(true)}
                className="text-white/80 hover:text-white underline font-medium flex items-center gap-1"
              >
                <MapPin className="w-2.5 h-2.5 text-rose-400" />
                <span>Map</span>
              </button>
            </div>

            {/* Row 2: Branch Name & Building */}
            <div className="min-w-0">
              <h2 className="text-sm font-anton text-white tracking-wide uppercase truncate leading-tight">
                {currentBranch.name} · {currentBranch.buildingName}
              </h2>
              <p className="text-[10px] text-white/70 truncate mt-0.5">
                {currentBranch.floor} · {currentBranch.stats.area}
              </p>
            </div>

            {/* Row 3: Action Buttons (Touch Target >= 44px) */}
            <div className="flex items-center gap-2 pt-0.5">
              {/* Prev Button */}
              <button
                onClick={() => navigate('prev')}
                disabled={isAnimating}
                aria-label="Previous Branch"
                className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl border border-white/40 bg-white/10 active:bg-white/25 text-white flex items-center justify-center transition-all disabled:opacity-40 cursor-pointer shrink-0"
              >
                <ArrowLeft className="w-5 h-5" strokeWidth={2.25} />
              </button>

              {/* Main CTA: 3D Interior Tour */}
              <button
                onClick={() => setShowInteriorTour(true)}
                className="flex-1 h-11 px-3 rounded-xl bg-gradient-to-r from-white to-neutral-200 text-neutral-950 font-anton text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg active:scale-98 transition-transform cursor-pointer"
              >
                <Compass className="w-4 h-4 text-rose-600" />
                <span>EXPLORE 3D TOUR</span>
                <ArrowRight className="w-4 h-4 text-neutral-950" />
              </button>

              {/* Next Button */}
              <button
                onClick={() => navigate('next')}
                disabled={isAnimating}
                aria-label="Next Branch"
                className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl border border-white/40 bg-white/10 active:bg-white/25 text-white flex items-center justify-center transition-all disabled:opacity-40 cursor-pointer shrink-0"
              >
                <ArrowRight className="w-5 h-5" strokeWidth={2.25} />
              </button>
            </div>

            {/* Row 4: Mobile Smooth Animated Scroll Progress Indicator */}
            <div className="flex flex-col gap-1.5 pt-1.5 border-t border-white/10">
              <div className="relative h-4 flex items-center px-1.5">
                <div className="relative w-full h-1.5 rounded-full bg-white/15">
                  {/* Smooth Animated Fill Bar */}
                  <div
                    className="absolute top-0 -left-1.5 h-full rounded-full overflow-hidden"
                    style={{
                      width: `calc(${thumbPercent}% + 6px)`,
                      background: `linear-gradient(90deg, ${currentBranch.panel}99 0%, ${currentBranch.panel} 65%, #ffffff 100%)`,
                      boxShadow: `0 0 10px ${currentBranch.panel}aa`,
                      transition:
                        'width 650ms cubic-bezier(0.4, 0, 0.2, 1), background 650ms cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  >
                    <div
                      className="absolute inset-y-0 w-1/2 animate-progress-shimmer pointer-events-none"
                      style={{
                        background:
                          'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.75) 50%, transparent 100%)',
                      }}
                    />
                  </div>

                  {/* Tap Stops */}
                  {BRANCHES.map((b, idx) => {
                    const nodePos = totalBranches > 1 ? (idx / (totalBranches - 1)) * 100 : 0;
                    const isPassed = idx <= activeIndex;
                    return (
                      <button
                        key={b.id}
                        onClick={() => jumpToBranch(idx)}
                        title={b.name}
                        aria-label={`Jump to branch ${idx + 1}`}
                        style={{ left: `${nodePos}%` }}
                        className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center cursor-pointer z-20"
                      >
                        <span
                          className={`rounded-full transition-all duration-300 ${
                            idx === activeIndex
                              ? 'w-1.5 h-1.5 opacity-0'
                              : isPassed
                              ? 'w-1.5 h-1.5 bg-white/90'
                              : 'w-1 h-1 bg-white/35'
                          }`}
                        />
                      </button>
                    );
                  })}

                  {/* Sliding Glowing Thumb */}
                  <div
                    className={`pointer-events-none absolute top-1/2 z-30 w-3.5 h-3.5 rounded-full bg-white border-2 animate-indicator-pulse ${
                      isAnimating ? 'scale-125' : ''
                    }`}
                    style={{
                      left: `${thumbPercent}%`,
                      borderColor: currentBranch.panel,
                      transition:
                        'left 650ms cubic-bezier(0.4, 0, 0.2, 1), border-color 650ms cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-[9px] text-white/60 font-medium">
                <span className="font-mono text-white/80">
                  {Math.round(progressPercent)}% EXPLORED
                </span>
                <span>Swipe left / right to browse</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* MODAL 1: 3D Interior Navigation Tour */}
      {showInteriorTour && (
        <InteriorNavigationView
          branch={currentBranch}
          onClose={() => setShowInteriorTour(false)}
          onBookAppointment={(branchId) => {
            setShowInteriorTour(false);
            handleOpenAppointment(branchId);
          }}
        />
      )}

      {/* MODAL 2: Interactive Vadodara 8-Branch Map */}
      {showCityMap && (
        <InteractiveVadodaraMap
          activeBranchId={currentBranch.id}
          onSelectBranch={(selected) => {
            const idx = BRANCHES.findIndex((b) => b.id === selected.id);
            if (idx !== -1) setActiveIndex(idx);
          }}
          onBookAppointment={(branchId) => {
            setShowCityMap(false);
            handleOpenAppointment(branchId);
          }}
          onClose={() => setShowCityMap(false)}
        />
      )}

      {/* MODAL 3: Real-Time Appointment Scheduling */}
      {showAppointmentModal && (
        <AppointmentModal
          initialBranchId={appointmentBranchId}
          onClose={() => setShowAppointmentModal(false)}
        />
      )}

      {/* MODAL 4: Official Flyer Plans & Offerings */}
      {showFlyerPlans && (
        <FlyerPlansDrawer
          onClose={() => setShowFlyerPlans(false)}
          onBookAppointment={() => {
            setShowFlyerPlans(false);
            handleOpenAppointment(currentBranch.id);
          }}
        />
      )}

    </div>
  );
}
