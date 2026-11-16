import React, { useState } from 'react';
import {
  MEMBERSHIP_PLANS,
  PT_PLANS,
  NUTRITION_PRODUCTS,
  GYM_SERVICES,
  INSTRUMENT_BRANDS,
} from '../data/branches';
import {
  X,
  Trophy,
  CheckCircle2,
  Dumbbell,
  Clock,
  Sparkles,
  Phone,
  CalendarCheck,
  ShieldCheck,
  Award,
} from 'lucide-react';

interface FlyerPlansDrawerProps {
  onClose: () => void;
  onBookAppointment: () => void;
}

export const FlyerPlansDrawer: React.FC<FlyerPlansDrawerProps> = ({
  onClose,
  onBookAppointment,
}) => {
  const [activeTab, setActiveTab] = useState<'membership' | 'pt' | 'nutrition' | 'services'>('membership');

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-xl animate-fade-in">
      {/* Modal Dialog */}
      <div className="relative w-full max-w-5xl h-[92vh] max-h-[880px] bg-neutral-950 border border-white/15 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="px-5 sm:px-8 py-4 border-b border-white/10 flex items-center justify-between bg-neutral-900/90 shrink-0">
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
                <span className="text-[11px] uppercase font-bold tracking-wider text-amber-400">
                  Official FTG Plans & Offerings
                </span>
                <span className="text-neutral-500">·</span>
                <span className="text-[11px] text-neutral-300 font-semibold">
                  Sahil Khan Merit Award Winner
                </span>
              </div>
              <h2 className="text-lg sm:text-2xl font-anton tracking-wide text-white uppercase">
                13 YEARS KEEPING VADODARA FIT
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onBookAppointment}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold uppercase tracking-wider transition-all shadow cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Claim Free Trial</span>
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="px-5 sm:px-8 py-3 bg-neutral-900/40 border-b border-white/5 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
          {[
            { id: 'membership', label: 'Membership Plans' },
            { id: 'pt', label: 'Personal Trainer' },
            { id: 'nutrition', label: 'FTG Nutrition' },
            { id: 'services', label: 'All Services & Equipment' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-rose-600 text-white shadow-lg font-bold'
                  : 'bg-white/5 text-neutral-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 min-h-0 overflow-y-auto p-5 sm:p-8">
          
          {/* TAB 1: MEMBERSHIP PLANS */}
          {activeTab === 'membership' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-xl font-anton text-white uppercase tracking-wide">
                    FITNESS PLANS & SUBSCRIPTIONS
                  </h3>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Includes basic gym membership + access to all 8 Vadodara branches with group activities.
                  </p>
                </div>
                <div className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold w-fit">
                  ✓ Add-ons Included: Zumba, Yoga, ABS Class & HIIT
                </div>
              </div>

              {/* Plans Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
                {MEMBERSHIP_PLANS.map((plan, idx) => (
                  <div
                    key={idx}
                    className={`relative p-5 rounded-2xl border flex flex-col justify-between transition-all ${
                      plan.popular
                        ? 'bg-gradient-to-b from-rose-950/60 to-neutral-900 border-rose-500 shadow-xl shadow-rose-950/50 scale-102'
                        : 'bg-neutral-900/60 border-white/10 hover:border-white/20'
                    }`}
                  >
                    {plan.popular && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-bold uppercase tracking-wider shadow">
                        Most Popular
                      </span>
                    )}

                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                        {plan.badge}
                      </span>
                      <h4 className="text-lg font-bold text-white mt-1">{plan.duration}</h4>
                      <div className="text-2xl font-anton text-rose-400 mt-2">
                        {plan.price}/-
                      </div>
                      <p className="text-[11px] text-neutral-400 mt-2 leading-relaxed">
                        Unlimited workout access, cardio zone, lockers & shower suite.
                      </p>
                    </div>

                    <button
                      onClick={onBookAppointment}
                      className={`mt-4 w-full py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        plan.popular
                          ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-md'
                          : 'bg-white/10 hover:bg-white/20 text-white'
                      }`}
                    >
                      Enquire Now
                    </button>
                  </div>
                ))}
              </div>

              {/* Add-ons banner from flyer */}
              <div className="p-4 rounded-2xl bg-neutral-900 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-600/20 text-rose-400 flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white uppercase tracking-wider">
                      Included Add-ons in All Plans:
                    </h5>
                    <p className="text-xs text-neutral-300 mt-0.5">
                      Zumba Class, Yoga Class, ABS Class, Extra Group Activities, HIIT & Cross Fit.
                    </p>
                  </div>
                </div>
                <button
                  onClick={onBookAppointment}
                  className="px-4 py-2 rounded-xl bg-white text-neutral-950 hover:bg-neutral-200 text-xs font-bold uppercase tracking-wider transition-colors shrink-0 cursor-pointer"
                >
                  Book 1-Day Pass
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: PERSONAL TRAINER */}
          {activeTab === 'pt' && (
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-xl font-anton text-white uppercase tracking-wide">
                  #PERSONAL TRAINER PACKAGES
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  12 Sessions per month with certified master trainers (3 PT sessions alternate days: MFW or TTS).
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {PT_PLANS.map((pt, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-neutral-900/80 border border-white/10 hover:border-rose-500/50 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400">
                        Certified PT Program
                      </span>
                      <h4 className="text-2xl font-anton text-white uppercase mt-1">{pt.duration}</h4>
                      <div className="text-3xl font-anton text-rose-400 mt-2">{pt.price}/-</div>
                      <div className="mt-4 p-3 rounded-xl bg-neutral-950 border border-white/5 text-xs text-neutral-300">
                        {pt.sessions}
                      </div>
                      <ul className="mt-4 space-y-2 text-xs text-neutral-300">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>Customized Workout Regimen</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>Calorie & Macro Diet Plan</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>Body Composition & Progress Tracking</span>
                        </li>
                      </ul>
                    </div>

                    <button
                      onClick={onBookAppointment}
                      className="mt-6 w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold uppercase tracking-wider transition-all shadow cursor-pointer"
                    >
                      Book PT Consultation
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: NUTRITION */}
          {activeTab === 'nutrition' && (
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-xl font-anton text-white uppercase tracking-wide">
                  #NUTRITION FTG SUPPLEMENT LINE
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Scientifically formulated high-bioavailability supplements available across all 8 branches.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {NUTRITION_PRODUCTS.map((prod, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-neutral-900 border border-white/10 flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center mb-3">
                        <Dumbbell className="w-5 h-5" />
                      </div>
                      <h4 className="text-lg font-bold text-white">{prod.name}</h4>
                      <p className="text-xs text-rose-300 font-semibold mt-1">{prod.subtitle}</p>
                      <p className="text-xs text-neutral-300 mt-3 leading-relaxed">{prod.desc}</p>
                      <div className="mt-4 p-3 rounded-xl bg-neutral-950 border border-white/5">
                        <span className="text-[10px] text-neutral-400 uppercase font-bold">
                          Available Flavours:
                        </span>
                        <p className="text-xs text-white font-medium mt-0.5">{prod.flavours}</p>
                      </div>
                    </div>

                    <a
                      href="https://wa.me/919909909698?text=Hello%20FTG!%20I%20would%20like%20to%20order%20FTG%20Nutrition%20supplements."
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold text-center transition-colors block"
                    >
                      Enquire via WhatsApp
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SERVICES & INSTRUMENTS */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-anton text-white uppercase tracking-wide mb-3">
                  #SERVICES FTG
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {GYM_SERVICES.map((s) => (
                    <div
                      key={s.id}
                      className="p-4 rounded-xl bg-neutral-900/60 border border-white/10"
                    >
                      <h5 className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                        {s.title}
                      </h5>
                      <p className="text-xs text-neutral-300 mt-1 leading-snug">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <h3 className="text-xl font-anton text-white uppercase tracking-wide mb-3">
                  #INSTRUMENTS & CERTIFIED EQUIPMENT BRANDS
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {INSTRUMENT_BRANDS.map((brand, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 rounded-xl bg-neutral-900 border border-white/15 text-xs font-bold tracking-wider text-white"
                    >
                      {brand}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer info */}
        <div className="px-5 sm:px-8 py-3 bg-neutral-900 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-neutral-400 shrink-0">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-neutral-400" />
            <span>Gym Timings: Mon-Sat 6 AM - 12 PM & 4 PM - 10 PM | Sun 8 AM - 12 PM</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:+919909909698" className="hover:text-white flex items-center gap-1 font-mono">
              <Phone className="w-3.5 h-3.5 text-rose-500" />
              <span>+91 990 990 9698</span>
            </a>
            <span>www.fitnesstrackgyms.com</span>
          </div>
        </div>

      </div>
    </div>
  );
};
