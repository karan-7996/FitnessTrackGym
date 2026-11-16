import React, { useState } from 'react';
import { BRANCHES, Branch } from '../data/branches';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Phone,
  User,
  Target,
  Sparkles,
  MessageCircle,
  ShieldCheck,
  CalendarCheck,
} from 'lucide-react';

interface AppointmentModalProps {
  initialBranchId?: string;
  onClose: () => void;
}

const SERVICES = [
  {
    id: 'free-trial',
    name: '1-Day Free Workout Pass',
    badge: '100% Free Trial',
    desc: 'Full-day access to gym equipment, cardio deck & locker rooms.',
  },
  {
    id: 'pt-eval',
    name: '1-on-1 Certified Trainer Assessment',
    badge: 'Complimentary',
    desc: 'Strength screening & movement analysis with certified master coach.',
  },
  {
    id: 'inbody-scan',
    name: 'InBody Body Composition & BMI Scan',
    badge: 'Free with Tour',
    desc: 'Medical-grade body fat %, visceral fat & segmental muscle report.',
  },
  {
    id: 'group-class',
    name: 'Zumba / Yoga / HIIT Group Class',
    badge: 'Free Guest Pass',
    desc: 'High energy group choreography or restorative yoga session.',
  },
];

const TIME_SLOTS = {
  morning: ['06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM'],
  evening: ['04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM'],
};

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  initialBranchId,
  onClose,
}) => {
  const [selectedBranchId, setSelectedBranchId] = useState<string>(
    initialBranchId || BRANCHES[0].id
  );
  const [selectedService, setSelectedService] = useState<string>('free-trial');
  const [selectedDate, setSelectedDate] = useState<string>('Today');
  const [selectedTime, setSelectedTime] = useState<string>('07:00 AM');
  const [fullName, setFullName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [fitnessGoal, setFitnessGoal] = useState<string>('Fat Loss & Lean Muscle');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [bookingId, setBookingId] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const currentBranch = BRANCHES.find((b) => b.id === selectedBranchId) || BRANCHES[0];

  // Generate upcoming 6 days
  const today = new Date();
  const dateOptions = Array.from({ length: 6 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dayName = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' });
    const formatted = `${d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    return {
      label: `${dayName} (${formatted})`,
      value: `${dayName}, ${formatted}`,
    };
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setErrorMsg('Please enter your full name');
      return;
    }
    const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number');
      return;
    }

    const randomCode = `FTG-${currentBranch.name.substring(0, 3)}-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingId(randomCode);
    setIsSubmitted(true);
    setErrorMsg('');
  };

  const handleOpenWhatsAppConfirm = () => {
    const serviceName = SERVICES.find((s) => s.id === selectedService)?.name || 'Gym Trial';
    const msg = encodeURIComponent(
      `Hello Fitness Track Gym! I have scheduled an appointment:\n` +
      `• Booking ID: ${bookingId}\n` +
      `• Name: ${fullName}\n` +
      `• Branch: ${currentBranch.name} (${currentBranch.buildingName}, ${currentBranch.floor})\n` +
      `• Service: ${serviceName}\n` +
      `• Date: ${selectedDate}\n` +
      `• Time: ${selectedTime}\n` +
      `• Goal: ${fitnessGoal}\n` +
      `Please confirm my slot. Thank you!`
    );
    window.open(`https://wa.me/${currentBranch.whatsappNumber}?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-xl animate-fade-in">
      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl max-h-[92vh] bg-neutral-950 border border-white/15 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="px-5 sm:px-7 py-4 border-b border-white/10 flex items-center justify-between bg-neutral-900/90 shrink-0">
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
                <span className="text-[11px] uppercase font-bold tracking-wider text-rose-400">
                  Instant Appointment
                </span>
                <span className="text-neutral-500">·</span>
                <span className="text-[11px] text-neutral-300 font-semibold">
                  13 Years Fitness Track Gym
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-anton tracking-wide text-white uppercase">
                {isSubmitted ? 'APPOINTMENT CONFIRMED' : 'SCHEDULE YOUR VISIT'}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-5">
          {isSubmitted ? (
            /* Confirmation View */
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold">
                  BOOKING CONFIRMATION: {bookingId}
                </span>
                <h3 className="text-2xl font-anton text-white uppercase mt-2">
                  YOU ARE ALL SET, {fullName.toUpperCase()}!
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto mt-1">
                  Your appointment at <strong>{currentBranch.name} Branch</strong> has been reserved in real-time.
                </p>
              </div>

              {/* Summary Details Box */}
              <div className="p-4 rounded-2xl bg-neutral-900 border border-white/10 text-left space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-neutral-400">Branch Location:</span>
                  <span className="text-white font-semibold">
                    {currentBranch.floor}, {currentBranch.buildingName} ({currentBranch.locality})
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-neutral-400">Date & Slot:</span>
                  <span className="text-rose-400 font-semibold">{selectedDate} @ {selectedTime}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-neutral-400">Selected Service:</span>
                  <span className="text-white font-semibold">
                    {SERVICES.find((s) => s.id === selectedService)?.name}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-neutral-400">Branch Helpline:</span>
                  <span className="text-white font-mono">{currentBranch.phones[0]}</span>
                </div>
              </div>

              {/* Direct WhatsApp Action Button */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleOpenWhatsAppConfirm}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-xl active:scale-95 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Confirmation to Branch WhatsApp</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-neutral-300 text-xs font-medium transition-colors cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Branch Selector */}
              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  <span>Choose Branch (8 Vadodara Locations):</span>
                </label>
                <select
                  value={selectedBranchId}
                  onChange={(e) => setSelectedBranchId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/15 text-white text-xs font-semibold focus:outline-none focus:border-rose-500"
                >
                  {BRANCHES.map((b) => (
                    <option key={b.id} value={b.id} className="bg-neutral-900 text-white">
                      {b.label} — {b.buildingName} ({b.floor})
                    </option>
                  ))}
                </select>
              </div>

              {/* Service Selection */}
              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                  Select Appointment Goal:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {SERVICES.map((srv) => (
                    <div
                      key={srv.id}
                      onClick={() => setSelectedService(srv.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        selectedService === srv.id
                          ? 'bg-rose-600/15 border-rose-500 text-white shadow'
                          : 'bg-neutral-900/60 border-white/10 text-neutral-300 hover:bg-neutral-900 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold">{srv.name}</span>
                        <span className="text-[10px] text-rose-400 font-semibold">{srv.badge}</span>
                      </div>
                      <p className="text-[11px] text-neutral-400 mt-1 leading-snug">
                        {srv.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Date */}
                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-rose-500" />
                    <span>Select Date:</span>
                  </label>
                  <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/15 text-white text-xs font-medium focus:outline-none focus:border-rose-500"
                  >
                    {dateOptions.map((opt, i) => (
                      <option key={i} value={opt.value} className="bg-neutral-900 text-white">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Time Slot */}
                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-rose-500" />
                    <span>Preferred Slot:</span>
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/15 text-white text-xs font-medium focus:outline-none focus:border-rose-500"
                  >
                    <optgroup label="Morning (6:00 AM - 12:00 PM)" className="bg-neutral-900">
                      {TIME_SLOTS.morning.map((t) => (
                        <option key={t} value={t} className="bg-neutral-900 text-white">
                          {t} (Morning)
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Evening (4:00 PM - 10:00 PM)" className="bg-neutral-900">
                      {TIME_SLOTS.evening.map((t) => (
                        <option key={t} value={t} className="bg-neutral-900 text-white">
                          {t} (Evening)
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>
              </div>

              {/* Member Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-rose-500" />
                    <span>Your Full Name:</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Karan Patel"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/15 text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-rose-500" />
                    <span>Mobile Phone (+91):</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/15 text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              {/* Fitness Goal */}
              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-rose-500" />
                  <span>Primary Fitness Goal:</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Fat Loss & Toning',
                    'Muscle Mass & Strength',
                    'Cardio & Stamina',
                    'General Wellness',
                    'PCOD / Thyroid Management',
                  ].map((goal) => (
                    <button
                      type="button"
                      key={goal}
                      onClick={() => setFitnessGoal(goal)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                        fitnessGoal === goal
                          ? 'bg-rose-600 text-white font-bold'
                          : 'bg-neutral-900 text-neutral-400 hover:text-white border border-white/10'
                      }`}
                    >
                      {goal}
                    </button>
                  ))}
                </div>
              </div>

              {/* Error Message */}
              {errorMsg && (
                <div className="p-3 rounded-lg bg-rose-500/20 border border-rose-500/40 text-xs text-rose-300">
                  {errorMsg}
                </div>
              )}

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-xl active:scale-95 cursor-pointer"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Confirm Free Appointment at {currentBranch.name}</span>
                </button>
                <p className="text-[11px] text-center text-neutral-400 mt-2">
                  No credit card or upfront payment needed. Instant confirmation code provided.
                </p>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
